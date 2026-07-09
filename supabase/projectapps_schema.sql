-- =====================================================
-- PROJECTAPPS™ — DATABASE SCHEMA & RLS SECURITY POLICIES
-- =====================================================
-- This file is production-ready for the Supabase SQL Editor.
-- Configures the tables, triggers, indexes, and robust RLS rules.
-- NO public or anonymous policies are configured to preserve security.

-- Enable gen_random_uuid() extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
-- 1. Table: buyer_profiles
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.buyer_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    company_name TEXT,
    role TEXT DEFAULT 'buyer',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------
-- 2. Table: saved_evaluations
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    report_code TEXT,
    industry TEXT,
    business_size TEXT,
    budget TEXT,
    problems_count INTEGER DEFAULT 0,
    goals_count INTEGER DEFAULT 0,
    summary TEXT,
    executive_context TEXT,
    selected_problems JSONB DEFAULT '[]'::jsonb,
    selected_goals JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------
-- 3. Table: favorite_assets
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.favorite_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    asset_id TEXT NOT NULL,
    asset_name TEXT NOT NULL,
    asset_category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------
-- 4. Table: acquisition_requests
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.acquisition_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    asset_id TEXT,
    asset_name TEXT NOT NULL,
    status TEXT DEFAULT 'availability_requested',
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------
-- 5. Table: export_logs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.export_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    evaluation_id UUID REFERENCES public.saved_evaluations(id) ON DELETE SET NULL,
    export_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------
-- Triggers for automatic updated_at management
-- -----------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_buyer_profiles_updated_at
BEFORE UPDATE ON public.buyer_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- -----------------------------------------------------
-- Indexes for performance & query optimization
-- -----------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_buyer_profiles_id ON public.buyer_profiles(id);
CREATE INDEX IF NOT EXISTS idx_saved_evaluations_user_id ON public.saved_evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_evaluations_created_at ON public.saved_evaluations(created_at);
CREATE INDEX IF NOT EXISTS idx_favorite_assets_user_id ON public.favorite_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_favorite_assets_asset_id ON public.favorite_assets(asset_id);
CREATE INDEX IF NOT EXISTS idx_acquisition_requests_user_id ON public.acquisition_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_export_logs_user_id ON public.export_logs(user_id);

-- -----------------------------------------------------
-- Enable Row Level Security (RLS)
-- -----------------------------------------------------
ALTER TABLE public.buyer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acquisition_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------
-- Security Policies (Individual Ownership Control Only)
-- -----------------------------------------------------

-- buyer_profiles Policies
CREATE POLICY "Users can select own buyer profile" 
ON public.buyer_profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own buyer profile" 
ON public.buyer_profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own buyer profile" 
ON public.buyer_profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can delete own buyer profile" 
ON public.buyer_profiles FOR DELETE 
TO authenticated 
USING (auth.uid() = id);


-- saved_evaluations Policies
CREATE POLICY "Users can select own saved evaluations" 
ON public.saved_evaluations FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved evaluations" 
ON public.saved_evaluations FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved evaluations" 
ON public.saved_evaluations FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved evaluations" 
ON public.saved_evaluations FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);


-- favorite_assets Policies
CREATE POLICY "Users can select own favorite assets" 
ON public.favorite_assets FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorite assets" 
ON public.favorite_assets FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorite assets" 
ON public.favorite_assets FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorite assets" 
ON public.favorite_assets FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);


-- acquisition_requests Policies
CREATE POLICY "Users can select own acquisition requests" 
ON public.acquisition_requests FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own acquisition requests" 
ON public.acquisition_requests FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own acquisition requests" 
ON public.acquisition_requests FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own acquisition requests" 
ON public.acquisition_requests FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);


-- export_logs Policies
CREATE POLICY "Users can select own export logs" 
ON public.export_logs FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own export logs" 
ON public.export_logs FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own export logs" 
ON public.export_logs FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own export logs" 
ON public.export_logs FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
