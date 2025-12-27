import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Allowed origins - add production domain when deployed
const ALLOWED_ORIGINS = [
  Deno.env.get("ALLOWED_ORIGIN") || "http://localhost:8080",
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS_PER_WINDOW = 50; // Increased for authenticated requests
const rateLimitMap = new Map<string, { attempts: number; windowStart: number }>();

function getRateLimitKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { attempts: 1, windowStart: now });
    return { allowed: true, remaining: MAX_ATTEMPTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }
  
  if (entry.attempts >= MAX_ATTEMPTS_PER_WINDOW) {
    const resetIn = RATE_LIMIT_WINDOW_MS - (now - entry.windowStart);
    return { allowed: false, remaining: 0, resetIn };
  }
  
  entry.attempts++;
  rateLimitMap.set(key, entry);
  return { 
    allowed: true, 
    remaining: MAX_ATTEMPTS_PER_WINDOW - entry.attempts, 
    resetIn: RATE_LIMIT_WINDOW_MS - (now - entry.windowStart) 
  };
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    allowed === "*" || origin === allowed || origin.endsWith(allowed.replace("*", ""))
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

interface AnalyticsResponse {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  popularDocuments: { document_id: string; document_title: string; count: number; revenue: number }[];
  recentOrders: { order_reference: string; total_amount: number; created_at: string; item_count: number }[];
  ordersOverTime: { date: string; count: number; revenue: number }[];
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Apply rate limiting
  const rateLimitKey = getRateLimitKey(req);
  const rateLimit = checkRateLimit(rateLimitKey);
  
  if (!rateLimit.allowed) {
    console.warn(`Rate limit exceeded for ${rateLimitKey}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000))
        } 
      }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    // Extract and verify JWT token from Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Create client with user's token to verify authentication
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    // Get the user from the token
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(token);
    
    if (userError || !user) {
      console.warn("Invalid or expired token:", userError?.message);
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Authenticated user: ${user.id}`);

    // Create admin client to check role (using service role key)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if user has admin role using the has_role function
    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError) {
      console.error("Error checking admin role:", roleError);
      return new Response(
        JSON.stringify({ error: "Unable to verify permissions" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isAdmin) {
      console.warn(`User ${user.id} is not an admin`);
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Admin verified: ${user.id}, fetching analytics...`);

    // Get total orders and revenue using admin client
    const { data: ordersData, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("id, order_reference, total_amount, created_at, status");

    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      throw new Error("Failed to fetch orders");
    }

    const orders = ordersData || [];
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get order items for popular documents
    const { data: itemsData, error: itemsError } = await supabaseAdmin
      .from("order_items")
      .select("document_id, document_title, price, quantity, order_id");

    if (itemsError) {
      console.error("Error fetching order items:", itemsError);
      throw new Error("Failed to fetch order items");
    }

    const items = itemsData || [];

    // Calculate popular documents
    const documentStats: Record<string, { document_title: string; count: number; revenue: number }> = {};
    
    items.forEach(item => {
      if (!documentStats[item.document_id]) {
        documentStats[item.document_id] = {
          document_title: item.document_title,
          count: 0,
          revenue: 0,
        };
      }
      documentStats[item.document_id].count += item.quantity;
      documentStats[item.document_id].revenue += Number(item.price) * item.quantity;
    });

    const popularDocuments = Object.entries(documentStats)
      .map(([document_id, stats]) => ({
        document_id,
        ...stats,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get recent orders with item count
    const orderItemCounts: Record<string, number> = {};
    items.forEach(item => {
      orderItemCounts[item.order_id] = (orderItemCounts[item.order_id] || 0) + item.quantity;
    });

    const recentOrders = orders
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
      .map(order => ({
        order_reference: order.order_reference,
        total_amount: Number(order.total_amount),
        created_at: order.created_at,
        item_count: orderItemCounts[order.id] || 0,
      }));

    // Calculate orders over time (last 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const dailyStats: Record<string, { count: number; revenue: number }> = {};
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split("T")[0];
      dailyStats[dateKey] = { count: 0, revenue: 0 };
    }

    orders.forEach(order => {
      const dateKey = order.created_at.split("T")[0];
      if (dailyStats[dateKey]) {
        dailyStats[dateKey].count++;
        dailyStats[dateKey].revenue += Number(order.total_amount);
      }
    });

    const ordersOverTime = Object.entries(dailyStats)
      .map(([date, stats]) => ({ date, ...stats }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const analytics: AnalyticsResponse = {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      popularDocuments,
      recentOrders,
      ordersOverTime,
    };

    console.log("Analytics fetched successfully");

    return new Response(
      JSON.stringify(analytics),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in admin-analytics function:", error);
    return new Response(
      JSON.stringify({ error: "Unable to process request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
