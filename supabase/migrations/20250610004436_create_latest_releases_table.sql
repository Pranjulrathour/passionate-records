-- Create latest_releases table for admin-managed featured releases
CREATE TABLE latest_releases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR NOT NULL,
    artist_name VARCHAR NOT NULL,
    artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
    description TEXT,
    genre genre_type,
    release_type VARCHAR DEFAULT 'SINGLE', -- SINGLE, EP, ALBUM, MIXTAPE, etc.
    release_date DATE,
    cover_art_url TEXT,
    audio_preview_url TEXT,
    streaming_links JSONB, -- {spotify: "url", apple: "url", youtube: "url", etc.}
    is_featured BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    status VARCHAR DEFAULT 'ACTIVE', -- ACTIVE, ARCHIVED, DRAFT
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for performance
CREATE INDEX idx_latest_releases_featured ON latest_releases(is_featured, display_order);
CREATE INDEX idx_latest_releases_status ON latest_releases(status);
CREATE INDEX idx_latest_releases_artist_id ON latest_releases(artist_id);

-- Enable RLS (Row Level Security)
ALTER TABLE latest_releases ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin can manage latest_releases" ON latest_releases
    FOR ALL USING (auth.uid() IN (
        SELECT id FROM profiles WHERE role = 'admin'
    ));

-- Create policy for public read access
CREATE POLICY "Public can view active latest_releases" ON latest_releases
    FOR SELECT USING (status = 'ACTIVE');

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_latest_releases_updated_at BEFORE UPDATE ON latest_releases
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO latest_releases (title, artist_name, description, genre, release_type, release_date, is_featured, display_order, status) VALUES
('Underground Anthem', 'Shadow Collective', 'A powerful track showcasing the raw energy of underground hip-hop', 'HIP_HOP', 'SINGLE', '2024-01-15', true, 1, 'ACTIVE'),
('Neon Dreams', 'Electric Pulse', 'Synthwave masterpiece with nostalgic 80s vibes and modern production', 'SYNTHWAVE', 'SINGLE', '2024-02-01', true, 2, 'ACTIVE'),
('Rebel Heart EP', 'Urban Legends', 'Five tracks of pure rebellion and passion from the underground scene', 'ALTERNATIVE_ROCK', 'EP', '2024-03-10', true, 3, 'ACTIVE');
