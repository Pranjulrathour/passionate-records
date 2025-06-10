-- FIX FOREIGN KEY CONSTRAINTS FOR ARTIST DELETION
-- This script modifies foreign key constraints to allow proper deletion and updates

-- =============================================
-- OPTION 1: SET NULL ON DELETE (RECOMMENDED)
-- =============================================
-- This approach keeps projects but sets artist_id to NULL when artist is deleted

-- Step 1: Drop the existing foreign key constraint
ALTER TABLE projects 
DROP CONSTRAINT IF EXISTS projects_artist_id_fkey;

-- Step 2: Add the constraint back with ON DELETE SET NULL
ALTER TABLE projects 
ADD CONSTRAINT projects_artist_id_fkey 
FOREIGN KEY (artist_id) 
REFERENCES artists(id) 
ON DELETE SET NULL 
ON UPDATE CASCADE;

-- Also fix the latest_releases table if it has the same issue
ALTER TABLE latest_releases 
DROP CONSTRAINT IF EXISTS latest_releases_artist_id_fkey;

ALTER TABLE latest_releases 
ADD CONSTRAINT latest_releases_artist_id_fkey 
FOREIGN KEY (artist_id) 
REFERENCES artists(id) 
ON DELETE SET NULL 
ON UPDATE CASCADE;

-- =============================================
-- VERIFY THE CHANGES
-- =============================================

-- Check the foreign key constraints are now properly configured
SELECT 
    tc.table_name, 
    tc.constraint_name, 
    tc.constraint_type,
    rc.delete_rule,
    rc.update_rule
FROM information_schema.table_constraints tc
JOIN information_schema.referential_constraints rc 
    ON tc.constraint_name = rc.constraint_name
WHERE tc.table_name IN ('projects', 'latest_releases')
    AND tc.constraint_type = 'FOREIGN KEY'
    AND rc.delete_rule IS NOT NULL;

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
DO $$ 
BEGIN
    RAISE NOTICE '=== FOREIGN KEY CONSTRAINTS FIXED ===';
    RAISE NOTICE 'Artists can now be deleted safely';
    RAISE NOTICE 'Projects will have artist_id set to NULL when artist is deleted';
    RAISE NOTICE 'Artist updates will cascade to related tables';
END $$; 