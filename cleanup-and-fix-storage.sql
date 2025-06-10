-- COMPREHENSIVE STORAGE POLICY CLEANUP AND FIX
-- Run this in Supabase SQL Editor to fix all storage upload issues

-- =============================================
-- STEP 1: DELETE ALL EXISTING POLICIES
-- =============================================

-- Delete all existing storage policies (this covers all the ones visible in your dashboard)
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    -- Loop through all policies on storage.objects and drop them
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_record.policyname);
        RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
    END LOOP;
END $$;

-- =============================================
-- STEP 2: CREATE SIMPLE WORKING POLICIES
-- =============================================

-- Create one simple policy per bucket that allows everything

-- ARTIST IMAGES BUCKET
CREATE POLICY "Allow all operations for artist-images"
ON storage.objects FOR ALL
TO authenticated, anon
USING (bucket_id = 'artist-images')
WITH CHECK (bucket_id = 'artist-images');

-- PROJECT IMAGES BUCKET
CREATE POLICY "Allow all operations for project-images"
ON storage.objects FOR ALL
TO authenticated, anon
USING (bucket_id = 'project-images')
WITH CHECK (bucket_id = 'project-images');

-- EVENT IMAGES BUCKET
CREATE POLICY "Allow all operations for event-images"
ON storage.objects FOR ALL
TO authenticated, anon
USING (bucket_id = 'event-images')
WITH CHECK (bucket_id = 'event-images');

-- GENERAL IMAGES BUCKET
CREATE POLICY "Allow all operations for general-images"
ON storage.objects FOR ALL
TO authenticated, anon
USING (bucket_id = 'general-images')
WITH CHECK (bucket_id = 'general-images');

-- RELEASE ASSETS BUCKET
CREATE POLICY "Allow all operations for release-assets"
ON storage.objects FOR ALL
TO authenticated, anon
USING (bucket_id = 'release-assets')
WITH CHECK (bucket_id = 'release-assets');

-- =============================================
-- STEP 3: VERIFY POLICIES CREATED
-- =============================================

-- Check what policies exist now
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
DO $$ 
BEGIN
    RAISE NOTICE '=== STORAGE POLICIES FIXED ===';
    RAISE NOTICE 'All conflicting policies removed';
    RAISE NOTICE 'Simple policies created for all buckets';
    RAISE NOTICE 'Image uploads should now work!';
END $$; 