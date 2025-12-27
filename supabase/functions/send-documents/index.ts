import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Allowed origins - add production domain when deployed
const ALLOWED_ORIGINS = [
  Deno.env.get("ALLOWED_ORIGIN") || "http://localhost:8080",
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS_PER_WINDOW = 20;
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

// Valid document IDs whitelist
const VALID_DOCUMENT_IDS = [
  "aml-policy", "kyc-policy", "transaction-monitoring", "sanctions-screening",
  "gdpr-privacy-policy", "ndpr-compliance", "data-processing-agreement", "cookie-policy",
  "iso27001-policy", "soc2-controls", "information-security", "risk-assessment",
  "vasp-compliance", "mica-readiness", "crypto-licensing",
  "whitepaper-review", "tokenomics-guide", "securities-compliance",
  "board-governance", "internal-compliance", "risk-management",
  "esg-policy", "sustainability-report",
  "incident-response", "penetration-testing",
  "pci-dss-compliance", "hitrust-framework",
];

// Input validation schemas
const cartItemSchema = z.object({
  id: z.string().min(1).max(100).refine(id => VALID_DOCUMENT_IDS.includes(id), {
    message: "Invalid document ID"
  }),
  title: z.string().min(1).max(200),
  price: z.number().min(0).max(10000),
  quantity: z.number().int().min(1).max(10),
});

const requestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().max(255),
  company: z.string().trim().max(100).optional(),
  items: z.array(cartItemSchema).min(1).max(20),
});

type CartItem = z.infer<typeof cartItemSchema>;
type SendDocumentsRequest = z.infer<typeof requestSchema>;

// Generate order reference: LEG-YYYY-XXXXXX
function generateOrderReference(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LEG-${year}-${randomPart}`;
}

// Hash email using SHA-256
async function hashEmail(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Map document IDs to storage paths
function getDocumentPath(documentId: string): string {
  // Map document IDs to their storage paths
  const documentPaths: Record<string, string> = {
    // AML/KYC Documents
    "aml-policy": "aml-kyc/aml-policy.pdf",
    "kyc-policy": "aml-kyc/kyc-policy.pdf",
    "transaction-monitoring": "aml-kyc/transaction-monitoring.pdf",
    "sanctions-screening": "aml-kyc/sanctions-screening.pdf",
    
    // Data Protection Documents
    "gdpr-privacy-policy": "data-protection/gdpr-privacy-policy.pdf",
    "ndpr-compliance": "data-protection/ndpr-compliance.pdf",
    "data-processing-agreement": "data-protection/data-processing-agreement.pdf",
    "cookie-policy": "data-protection/cookie-policy.pdf",
    
    // ISMS Documents
    "iso27001-policy": "isms/iso27001-policy.pdf",
    "soc2-controls": "isms/soc2-controls.pdf",
    "information-security": "isms/information-security.pdf",
    "risk-assessment": "isms/risk-assessment.pdf",
    
    // Web3 Regulatory Documents
    "vasp-compliance": "web3-regulatory/vasp-compliance.pdf",
    "mica-readiness": "web3-regulatory/mica-readiness.pdf",
    "crypto-licensing": "web3-regulatory/crypto-licensing.pdf",
    
    // Token Governance Documents
    "whitepaper-review": "token-governance/whitepaper-review.pdf",
    "tokenomics-guide": "token-governance/tokenomics-guide.pdf",
    "securities-compliance": "token-governance/securities-compliance.pdf",
    
    // Corporate Governance Documents
    "board-governance": "corporate-governance/board-governance.pdf",
    "internal-compliance": "corporate-governance/internal-compliance.pdf",
    "risk-management": "corporate-governance/risk-management.pdf",
    
    // ESG Documents
    "esg-policy": "esg/esg-policy.pdf",
    "sustainability-report": "esg/sustainability-report.pdf",
    
    // Cybersecurity Documents
    "incident-response": "cybersecurity/incident-response.pdf",
    "penetration-testing": "cybersecurity/penetration-testing.pdf",
    
    // Industry Specific Documents
    "pci-dss-compliance": "industry-specific/pci-dss-compliance.pdf",
    "hitrust-framework": "industry-specific/hitrust-framework.pdf",
  };
  
  return documentPaths[documentId] || `documents/${documentId}.pdf`;
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
    console.warn(`[RATE_LIMIT] Exceeded for key`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
        } 
      }
    );
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("[CONFIG] Missing RESEND_API_KEY");
      throw new Error("Service configuration error");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    // Parse and validate request body
    const rawBody = await req.json();
    const parseResult = requestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.warn("[VALIDATION] Invalid request body");
      return new Response(
        JSON.stringify({ error: "Invalid request data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { name, email, company, items } = parseResult.data;

    console.log(`Processing order for ${email} with ${items.length} items`);

    // Generate order reference and hash email
    const orderReference = generateOrderReference();
    const emailHash = await hashEmail(email);
    
    // Calculate total and expiration (48 hours)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    // Generate signed URLs for each document (48-hour expiry)
    const documentLinks: { title: string; url: string; price: number }[] = [];
    
    for (const item of items) {
      const filePath = getDocumentPath(item.id);
      
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("policy-documents")
        .createSignedUrl(filePath, 48 * 60 * 60); // 48 hours in seconds
      
      if (signedUrlError) {
        console.warn("[STORAGE] Could not generate signed URL for document");
        documentLinks.push({
          title: item.title,
          url: `#document-unavailable`,
          price: item.price,
        });
      } else {
        documentLinks.push({
          title: item.title,
          url: signedUrlData.signedUrl,
          price: item.price,
        });
      }
    }

    // Store order in database (privacy-first: only hash, no raw email)
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_reference: orderReference,
        email_hash: emailHash,
        total_amount: total,
        status: "completed",
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (orderError) {
      console.error("[DB] Order creation failed");
      throw new Error("Failed to create order record");
    }

    // Store order items
    const orderItems = items.map(item => ({
      order_id: orderData.id,
      document_id: item.id,
      document_title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("[DB] Order items creation failed");
      // Continue anyway - order was created
    }

    // Build email HTML
    const documentListHtml = documentLinks.map(doc => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
          <a href="${doc.url}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
            ${doc.title}
          </a>
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          $${doc.price.toFixed(2)}
        </td>
      </tr>
    `).join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); padding: 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Legum Consulting</h1>
          <p style="color: #94a3b8; margin: 8px 0 0;">Your Policy Documents</p>
        </div>
        
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="margin: 0 0 16px;">Hello ${name},</p>
          
          <p style="margin: 0 0 24px;">
            Thank you for your order! Your policy documents are ready for download. 
            Please find your documents below.
          </p>
          
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 14px; color: #64748b;">Order Reference</p>
            <p style="margin: 4px 0 0; font-size: 18px; font-weight: 600; color: #1e3a5f;">${orderReference}</p>
          </div>
          
          <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 16px; color: #1f2937;">Your Documents</h2>
          
          <table style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="padding: 12px 16px; text-align: left; font-weight: 600; font-size: 14px; color: #64748b;">Document</th>
                <th style="padding: 12px 16px; text-align: right; font-weight: 600; font-size: 14px; color: #64748b;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${documentListHtml}
              <tr style="background: #f8fafc;">
                <td style="padding: 12px 16px; font-weight: 600;">Total</td>
                <td style="padding: 12px 16px; text-align: right; font-weight: 600; color: #2563eb;">$${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>⚠️ Important:</strong> These download links will expire in <strong>48 hours</strong>. 
              Please download your documents before the links expire.
            </p>
          </div>
          
          ${company ? `<p style="font-size: 14px; color: #64748b; margin: 16px 0 0;">Company: ${company}</p>` : ""}
        </div>
        
        <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none; text-align: center;">
          <p style="margin: 0 0 8px; font-size: 14px; color: #64748b;">Need help? Contact us at</p>
          <a href="mailto:support@legumconsulting.com" style="color: #2563eb; text-decoration: none;">support@legumconsulting.com</a>
          
          <p style="margin: 16px 0 0; font-size: 12px; color: #9ca3af;">
            © ${new Date().getFullYear()} Legum Consulting. All rights reserved.
          </p>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Legum Consulting <onboarding@resend.dev>",
      to: [email],
      subject: `Your Policy Documents - Order ${orderReference}`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("[EMAIL] Failed to send");
      throw new Error("Failed to send email");
    }

    console.log(`[SUCCESS] Order processed: ${orderReference}`);

    return new Response(
      JSON.stringify({
        success: true,
        orderReference,
        message: "Documents sent successfully",
        expiresAt,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error: unknown) {
    const errorId = crypto.randomUUID().slice(0, 8);
    console.error(`[ERROR:${errorId}] Request failed`);
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again later." }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
};

serve(handler);
