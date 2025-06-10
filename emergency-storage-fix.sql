-- EMERGENCY STORAGE FIX
-- This temporarily disables RLS to get uploads working
-- WARNING: This makes storage less secure but will get uploads working immediately

-- Option 1: Disable RLS temporarily (LESS SECURE but will work)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS but allow everything (slightly more secure)
-- Run this instead of Option 1:
/*
-- Drop all existing policies first
DROP POLICY IF EXISTS "Public access for artist images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload for artist images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated manage artist images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete artist images" ON storage.objects;
DROP POLICY IF EXISTS "Public access for release assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload for release assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated manage release assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete release assets" ON storage.objects;
DROP POLICY IF EXISTS "Public access for project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload for project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated manage project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Public access for event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload for event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated manage event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete event images" ON storage.objects;

-- Create one simple policy that allows everything
CREATE POLICY "Allow all storage operations" ON storage.objects FOR ALL USING (true);
*/

-- After uploads work, you can re-enable RLS and create proper policies:
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY; 