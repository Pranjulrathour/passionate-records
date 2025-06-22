-- Migration to add master_link fields and remove old social media fields
-- This migration updates both artists and latest_releases tables

-- First, add the new master_link column to artists table
ALTER TABLE artists ADD COLUMN master_link TEXT;

-- Add the new master_link column to latest_releases table  
ALTER TABLE latest_releases ADD COLUMN master_link TEXT;

-- Drop the old social media columns from artists table
ALTER TABLE artists DROP COLUMN IF EXISTS instagram_handle;
ALTER TABLE artists DROP COLUMN IF EXISTS youtube_handle;
ALTER TABLE artists DROP COLUMN IF EXISTS spotify_url;

-- Drop the old streaming_links column from latest_releases table
ALTER TABLE latest_releases DROP COLUMN IF EXISTS streaming_links;

-- Update the updated_at timestamp for good measure
UPDATE artists SET updated_at = NOW() WHERE master_link IS NULL;
UPDATE latest_releases SET updated_at = NOW() WHERE master_link IS NULL; 