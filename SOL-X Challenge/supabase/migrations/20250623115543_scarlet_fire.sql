/*
  # Fix story submission policies

  1. Security Updates
    - Allow anonymous users to submit unpublished stories
    - Ensure proper RLS policies for story submission
    - Maintain security for published stories

  2. Changes
    - Update RLS policies to allow anonymous story submission
    - Stories submitted by anonymous users are unpublished by default
    - Only authenticated users (moderators) can publish stories
*/

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Allow anonymous users to submit stories" ON stories;
DROP POLICY IF EXISTS "Allow authenticated users to manage stories" ON stories;
DROP POLICY IF EXISTS "Allow public read access to published stories" ON stories;
DROP POLICY IF EXISTS "Allow anonymous read of published stories" ON stories;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON stories;
DROP POLICY IF EXISTS "Allow public read of published stories" ON stories;
DROP POLICY IF EXISTS "Allow anonymous story submission" ON stories;

-- Policy for anonymous users to submit stories (unpublished only)
CREATE POLICY "Allow anonymous story submission"
  ON stories
  FOR INSERT
  TO anon
  WITH CHECK (published = false);

-- Policy for public users to submit stories (unpublished only)
CREATE POLICY "Allow public story submission"
  ON stories
  FOR INSERT
  TO public
  WITH CHECK (published = false);

-- Policy for authenticated users to have full access (moderators)
CREATE POLICY "Allow authenticated users full access"
  ON stories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for anonymous users to read published stories
CREATE POLICY "Allow anonymous read of published stories"
  ON stories
  FOR SELECT
  TO anon
  USING (published = true);

-- Policy for public users to read published stories
CREATE POLICY "Allow public read of published stories"
  ON stories
  FOR SELECT
  TO public
  USING (published = true);

-- Ensure RLS is enabled
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;