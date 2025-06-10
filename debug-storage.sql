-- STORAGE DEBUGGING SCRIPT
-- Run this in Supabase SQL Editor to diagnose storage issues

-- 1. Check if buckets exist
SELECT 
    id,
    name,
    public,
    created_at
FROM storage.buckets 
WHERE id IN ('artist-images', 'release-assets', 'project-images', 'event-images');

-- 2. Check RLS status on storage.objects
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- 3. Check existing policies on storage.objects
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

-- 4. Check if user has a valid session (run this when logged in)
SELECT 
    auth.uid() as current_user_id,
    auth.role() as current_role;

-- 5. Test policy conditions (run when logged in)
SELECT 
    'artist-images' as bucket_test,
    (bucket_id = 'artist-images') as bucket_match
FROM storage.objects 
WHERE bucket_id = 'artist-images'
LIMIT 1;

-- If no results from query 5, it means no objects exist yet, which is normal for new buckets 