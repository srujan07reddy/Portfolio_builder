-- SUPABASE DATABASE SETUP SCRIPT
-- Copy and paste this into your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PORTFOLIOS TABLE
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL, -- Links to auth.users.id
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  template_choice TEXT DEFAULT 'Standard',
  professions TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '{"twitter": "", "github": "", "linkedin": "", "email": ""}',
  specialized_data JSONB DEFAULT '{}',
  sections JSONB DEFAULT '{"show_projects": true, "show_domains": true, "show_consulting": false}',
  custom_sections JSONB DEFAULT '[]',
  theme_color TEXT DEFAULT 'Cyan',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  image_url TEXT,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS)
-- Enable RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for Portfolios
CREATE POLICY "Users can create their own portfolios" ON portfolios FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can view their own portfolios" ON portfolios FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can update their own portfolios" ON portfolios FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Public can view published portfolios" ON portfolios FOR SELECT USING (is_public = true);

-- Policies for Projects
CREATE POLICY "Users can manage projects of their portfolios" ON projects FOR ALL USING (
  portfolio_id IN (SELECT id FROM portfolios WHERE owner_id = auth.uid())
);
CREATE POLICY "Public can view projects of published portfolios" ON projects FOR SELECT USING (
  portfolio_id IN (SELECT id FROM portfolios WHERE is_public = true)
);

-- 5. REALTIME CONFIGURATION
-- Enable Realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE portfolios;
ALTER PUBLICATION supabase_realtime ADD TABLE projects;

-- 6. FUNCTIONS & TRIGGERS (Auto-update updated_at)
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolios_modtime 
BEFORE UPDATE ON portfolios 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
