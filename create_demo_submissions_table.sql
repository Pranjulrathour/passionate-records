-- Create demo_submissions table
CREATE TABLE demo_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    artist_name TEXT NOT NULL,
    email TEXT NOT NULL,
    genre TEXT,
    demo_link TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE demo_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to insert and authenticated access to read/update
CREATE POLICY "Allow public to insert demo submissions" ON demo_submissions
    FOR INSERT TO PUBLIC
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read demo submissions" ON demo_submissions
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to update demo submissions" ON demo_submissions
    FOR UPDATE TO authenticated
    USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic updated_at updates
CREATE TRIGGER update_demo_submissions_updated_at 
    BEFORE UPDATE ON demo_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 