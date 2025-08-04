/*
  # Fix Stories Table RLS Policy for Anonymous Submissions

  1. Security Updates
    - Drop existing problematic policies
    - Create new policies that properly allow anonymous story submissions
    - Ensure anonymous users can only insert unpublished stories
    - Maintain read access for published stories

  2. Policy Changes
    - Allow anonymous users to insert stories with published = false
    - Allow public users to insert stories with published = false  
    - Allow anonymous and public users to read published stories
    - Allow authenticated users full access
*/

-- Drop existing policies that might be conflicting
DROP POLICY IF EXISTS "Allow anonymous read of published stories" ON stories;
DROP POLICY IF EXISTS "Allow anonymous story submission" ON stories;
DROP POLICY IF EXISTS "Allow public read of published stories" ON stories;
DROP POLICY IF EXISTS "Allow public story submission" ON stories;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON stories;

-- Create new, properly configured policies

-- Allow anonymous users to read published stories
CREATE POLICY "Anonymous users can read published stories"
  ON stories
  FOR SELECT
  TO anon
  USING (published = true);

-- Allow anonymous users to insert unpublished stories
CREATE POLICY "Anonymous users can submit unpublished stories"
  ON stories
  FOR INSERT
  TO anon
  WITH CHECK (published = false);

-- Allow public users to read published stories
CREATE POLICY "Public users can read published stories"
  ON stories
  FOR SELECT
  TO public
  USING (published = true);

-- Allow public users to insert unpublished stories
CREATE POLICY "Public users can submit unpublished stories"
  ON stories
  FOR INSERT
  TO public
  WITH CHECK (published = false);

-- Allow authenticated users full access
CREATE POLICY "Authenticated users have full access"
  ON stories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);