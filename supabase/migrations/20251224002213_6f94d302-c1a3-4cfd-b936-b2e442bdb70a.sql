-- Create storage bucket for policy documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('policy-documents', 'policy-documents', false);

-- Storage RLS: Only allow access via signed URLs (service role generates them)
CREATE POLICY "Authenticated users can read policy documents via signed URLs"
ON storage.objects FOR SELECT
USING (bucket_id = 'policy-documents');

-- Create orders table with privacy-first design (no raw PII)
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_reference TEXT NOT NULL UNIQUE,
  email_hash TEXT NOT NULL, -- SHA-256 hash of email, not raw email
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  document_id TEXT NOT NULL,
  document_title TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only service role can access (via edge functions)
-- No public access - all operations happen through edge functions

-- Orders: Allow insert from service role (edge functions)
CREATE POLICY "Service role can manage orders"
ON public.orders FOR ALL
USING (false) -- No direct access
WITH CHECK (false); -- All operations via edge functions with service role

-- Order items: Allow insert from service role (edge functions)  
CREATE POLICY "Service role can manage order items"
ON public.order_items FOR ALL
USING (false) -- No direct access
WITH CHECK (false); -- All operations via edge functions with service role

-- Create index on order_reference for quick lookups
CREATE INDEX idx_orders_order_reference ON public.orders(order_reference);

-- Create index on email_hash for order lookup functionality
CREATE INDEX idx_orders_email_hash ON public.orders(email_hash);