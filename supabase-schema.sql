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
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add Row Level Security (RLS) policies (Optional, depending on your setup)
-- If you want public to insert and read:
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "public"."coaches" AS PERMISSIVE FOR SELECT TO public USING (true);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON "public"."assessments" AS PERMISSIVE FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON "public"."assessments" AS PERMISSIVE FOR SELECT TO public USING (true);
