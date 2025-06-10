-- Create separate storage buckets for different image types
-- This ensures better organization and easier management

-- Create bucket for artist images (already exists, but including for completeness)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artist-images', 'artist-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for project/release images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for event images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for general/misc images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('general-images', 'general-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for artist-images bucket
CREATE POLICY "Allow public uploads to artist-images" ON storage.objects
    FOR INSERT TO PUBLIC
    WITH CHECK (bucket_id = 'artist-images');

CREATE POLICY "Allow public access to artist-images" ON storage.objects
    FOR SELECT TO PUBLIC
    USING (bucket_id = 'artist-images');

CREATE POLICY "Allow authenticated users to update artist-images" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'artist-images');

CREATE POLICY "Allow authenticated users to delete artist-images" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'artist-images');

-- Set up storage policies for project-images bucket
CREATE POLICY "Allow public uploads to project-images" ON storage.objects
    FOR INSERT TO PUBLIC
    WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Allow public access to project-images" ON storage.objects
    FOR SELECT TO PUBLIC
    USING (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated users to update project-images" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated users to delete project-images" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'project-images');

-- Set up storage policies for event-images bucket
CREATE POLICY "Allow public uploads to event-images" ON storage.objects
    FOR INSERT TO PUBLIC
    WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Allow public access to event-images" ON storage.objects
    FOR SELECT TO PUBLIC
    USING (bucket_id = 'event-images');

CREATE POLICY "Allow authenticated users to update event-images" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'event-images');

CREATE POLICY "Allow authenticated users to delete event-images" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'event-images');

-- Set up storage policies for general-images bucket
CREATE POLICY "Allow public uploads to general-images" ON storage.objects
    FOR INSERT TO PUBLIC
    WITH CHECK (bucket_id = 'general-images');

CREATE POLICY "Allow public access to general-images" ON storage.objects
    FOR SELECT TO PUBLIC
    USING (bucket_id = 'general-images');

CREATE POLICY "Allow authenticated users to update general-images" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'general-images');

CREATE POLICY "Allow authenticated users to delete general-images" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'general-images'); 