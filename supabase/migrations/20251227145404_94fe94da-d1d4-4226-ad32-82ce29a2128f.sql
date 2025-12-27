-- Drop the overly permissive storage policy
DROP POLICY IF EXISTS "Authenticated users can read policy documents via signed URLs" ON storage.objects;

-- Create restrictive policy that only allows service role access
CREATE POLICY "Only service role can access policy documents"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'policy-documents');

-- Update has_role function to prevent role enumeration for other users
-- Only allow checking if the provided user_id matches the authenticated user OR if caller is admin
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow checking own roles or admin checking any role
  IF _user_id != auth.uid() THEN
    -- Check if current user is admin (can check any user's role)
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    ) THEN
      -- Non-admin trying to check another user's role - return false without error
      -- This prevents information disclosure about other users' roles
      RETURN false;
    END IF;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
END;
$$;