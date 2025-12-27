-- Drop the incorrectly configured restrictive policies that block service role
DROP POLICY IF EXISTS "Service role can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Service role can manage order items" ON public.order_items;

-- Create proper permissive policies for service role access
-- These tables should only be accessed by service role (edge functions)
CREATE POLICY "Service role can manage orders"
ON public.orders FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can manage order items"
ON public.order_items FOR ALL
TO service_role
USING (true)
WITH CHECK (true);