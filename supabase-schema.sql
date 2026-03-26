-- SQL Script to create tables for Coach Assessment
-- Run this in your Supabase SQL Editor

-- 1. Create 'coaches' table
CREATE TABLE coaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert some example coaches
INSERT INTO coaches (name) VALUES 
('John Doe'),
('Jane Smith'),
('Mike Johnson');

-- 2. Create 'assessments' table
CREATE TABLE assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  coach_name text NOT NULL,
  date text NOT NULL,
  data jsonb NOT NULL,
  pdf_url text, -- Store the generated PDF file URL
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add Row Level Security (RLS) policies
-- If you want public to insert and read:
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "public"."coaches" AS PERMISSIVE FOR SELECT TO public USING (true);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON "public"."assessments" AS PERMISSIVE FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON "public"."assessments" AS PERMISSIVE FOR UPDATE TO public USING (true);
CREATE POLICY "Enable read access for all users" ON "public"."assessments" AS PERMISSIVE FOR SELECT TO public USING (true);

-- 3. Create the assessment_pdfs storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assessment_pdfs', 'assessment_pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Allow public read access to the bucket
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'assessment_pdfs');

-- 5. Allow public upload (INSERT) to the bucket
CREATE POLICY "Public Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'assessment_pdfs');

-- 6. Allow public update to their own uploaded files
CREATE POLICY "Public Update Access" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'assessment_pdfs');
