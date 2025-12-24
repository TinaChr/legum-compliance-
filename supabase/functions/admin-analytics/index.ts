import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalyticsResponse {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  popularDocuments: { document_id: string; document_title: string; count: number; revenue: number }[];
  recentOrders: { order_reference: string; total_amount: number; created_at: string; item_count: number }[];
  ordersOverTime: { date: string; count: number; revenue: number }[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin password
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPassword) {
      console.error("ADMIN_PASSWORD not configured");
      return new Response(
        JSON.stringify({ error: "Admin access not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { password } = await req.json();
    
    if (password !== adminPassword) {
      console.warn("Invalid admin password attempt");
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Fetching admin analytics...");

    // Get total orders and revenue
    const { data: ordersData, error: ordersError } = await supabase
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
    const { data: itemsData, error: itemsError } = await supabase
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
    
    // Initialize all days
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split("T")[0];
      dailyStats[dateKey] = { count: 0, revenue: 0 };
    }

    // Populate with actual data
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
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
