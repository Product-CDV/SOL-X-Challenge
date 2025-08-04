/*
  # Fix Stories Table RLS Policy

  1. Security Updates
    - Ensure proper RLS policies for story submissions
    - Allow anonymous users to submit unpublished stories
    - Allow authenticated users to manage all stories
    - Allow public users to read published stories

  2. Policy Updates
    - Drop existing policies to avoid conflicts
    - Recreate policies with proper permissions
    - Ensure anonymous story submission works correctly
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Allow anonymous users to submit stories" ON stories;
DROP POLICY IF EXISTS "Allow authenticated users to manage stories" ON stories;
DROP POLICY IF EXISTS "Allow public read access to published stories" ON stories;

-- Policy for anonymous users to submit stories (unpublished only)
CREATE POLICY "Allow anonymous story submission"
  ON stories
  FOR INSERT
  TO anon
  WITH CHECK (published = false);

-- Policy for authenticated users to have full access
CREATE POLICY "Allow authenticated users full access"
  ON stories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for public users to read published stories
CREATE POLICY "Allow public read of published stories"
  ON stories
  FOR SELECT
  TO public
  USING (published = true);

-- Policy for anonymous users to read published stories
CREATE POLICY "Allow anonymous read of published stories"
  ON stories
  FOR SELECT
  TO anon
  USING (published = true);

-- Ensure RLS is enabled
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;