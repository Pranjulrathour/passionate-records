-- SIMPLIFIED STORAGE POLICIES - Run this in the Supabase SQL Editor
-- This script creates basic policies that allow authenticated users to upload
-- Note: First create the buckets manually through the Storage interface and set them as public

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Public can view artist images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload artist images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own artist images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their own artist images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage all artist images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view release assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload release assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own release assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their own release assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage all release assets" ON storage.objects;

DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their own project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage all project images" ON storage.objects;

DROP POLICY IF EXISTS "Public can view event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own event images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their own event images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage all event images" ON storage.objects;

-- Create simplified policies that work for all authenticated users
-- These policies don't rely on the profiles table

-- ARTIST IMAGES POLICIES
CREATE POLICY "Public access for artist images"
ON storage.objects FOR SELECT
USING (bucket_id = 'artist-images');

CREATE POLICY "Authenticated upload for artist images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'artist-images');

CREATE POLICY "Authenticated manage artist images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'artist-images');

CREATE POLICY "Authenticated delete artist images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'artist-images');

-- RELEASE ASSETS POLICIES
CREATE POLICY "Public access for release assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'release-assets');

CREATE POLICY "Authenticated upload for release assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'release-assets');

CREATE POLICY "Authenticated manage release assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'release-assets');

CREATE POLICY "Authenticated delete release assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'release-assets');

-- PROJECT IMAGES POLICIES
CREATE POLICY "Public access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated upload for project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated manage project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');

-- EVENT IMAGES POLICIES
CREATE POLICY "Public access for event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated upload for event images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Authenticated manage event images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated delete event images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'event-images');

-- Create a view to check existing policies (for diagnostic)
CREATE OR REPLACE VIEW storage_policies AS
SELECT 
    p.policyname,
    p.tablename,
    p.permissive,
    p.roles,
    p.cmd,
    p.qual,
    p.with_check
FROM pg_policies p
WHERE p.schemaname = 'storage' AND p.tablename = 'objects'; 