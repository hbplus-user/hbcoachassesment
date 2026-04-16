-- SQL Script to create tables for Coach Assessment
-- Run this in your Supabase SQL Editor

-- 1. Create 'coaches' table if it doesn't exist
CREATE TABLE IF NOT EXISTS coaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert example coaches only if the table is empty (optional, but safer)
INSERT INTO coaches (name)
SELECT name FROM (VALUES ('John Doe'), ('Jane Smith'), ('Mike Johnson')) AS t(name)
WHERE NOT EXISTS (SELECT 1 FROM coaches LIMIT 1);

-- 2. Create 'assessments' table if it doesn't exist
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  coach_name text NOT NULL,
  uhid text,
  date text NOT NULL,
  data jsonb NOT NULL,
  pdf_url text, -- Store the generated PDF file URL
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Add 'uhid' column to 'assessments' if it doesn't exist (in case the table already existed)
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS uhid text;

-- Add Row Level Security (RLS) policies
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;

-- Safely create policies by dropping them first if they exist
DO $$
BEGIN
    DROP POLICY IF EXISTS "Enable read access for all users" ON coaches;
    CREATE POLICY "Enable read access for all users" ON "public"."coaches" AS PERMISSIVE FOR SELECT TO public USING (true);
    
    DROP POLICY IF EXISTS "Enable insert for all users" ON assessments;
    CREATE POLICY "Enable insert for all users" ON "public"."assessments" AS PERMISSIVE FOR INSERT TO public WITH CHECK (true);
    
    DROP POLICY IF EXISTS "Enable update for all users" ON assessments;
    CREATE POLICY "Enable update for all users" ON "public"."assessments" AS PERMISSIVE FOR UPDATE TO public USING (true);
    
    DROP POLICY IF EXISTS "Enable read access for all users" ON assessments;
    CREATE POLICY "Enable read access for all users" ON "public"."assessments" AS PERMISSIVE FOR SELECT TO public USING (true);
END $$;

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- 3. Create the assessment_pdfs storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assessment_pdfs', 'assessment_pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Storage Policies
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
    CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'assessment_pdfs');
    
    DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
    CREATE POLICY "Public Upload Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'assessment_pdfs');
    
    DROP POLICY IF EXISTS "Public Update Access" ON storage.objects;
    CREATE POLICY "Public Update Access" ON storage.objects FOR UPDATE USING (bucket_id = 'assessment_pdfs');
END $$;
