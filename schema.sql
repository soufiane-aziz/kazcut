-- Kazcut Supabase Database Schema
-- Production-ready schema with Row Level Security (RLS) and optimized indexes

-- 1. Create table for user-saved calculations and shareable links
CREATE TABLE IF NOT EXISTS public.saved_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    share_id TEXT UNIQUE NOT NULL,
    calculator_type TEXT NOT NULL CHECK (calculator_type IN ('paypal', 'stripe', 'etsy', 'amazon', 'shopify', 'freelance')),
    title VARCHAR(120) NOT NULL DEFAULT 'Untitled Calculation',
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    inputs JSONB NOT NULL,
    results JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant lookup by share_id
CREATE INDEX IF NOT EXISTS idx_saved_calculations_share_id ON public.saved_calculations(share_id);
CREATE INDEX IF NOT EXISTS idx_saved_calculations_type ON public.saved_calculations(calculator_type);
CREATE INDEX IF NOT EXISTS idx_saved_calculations_created_at ON public.saved_calculations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.saved_calculations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read of saved calculations by share_id
CREATE POLICY "Allow public read access to saved calculations" 
ON public.saved_calculations
FOR SELECT 
USING (true);

-- Allow anonymous creation of saved calculations
CREATE POLICY "Allow public insert of saved calculations" 
ON public.saved_calculations
FOR INSERT 
WITH CHECK (
    char_length(share_id) >= 6 AND
    char_length(title) <= 120 AND
    calculator_type IN ('paypal', 'stripe', 'etsy', 'amazon', 'shopify', 'freelance')
);

-- 2. Create table for anonymous aggregate usage analytics (0 PII, strict compliance)
CREATE TABLE IF NOT EXISTS public.calculator_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calculator_type TEXT NOT NULL,
    country_code VARCHAR(10) DEFAULT 'GLOBAL',
    event_action VARCHAR(50) NOT NULL, -- e.g. 'calculate', 'export_pdf', 'share'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for aggregate reporting
CREATE INDEX IF NOT EXISTS idx_calculator_analytics_type_date ON public.calculator_analytics(calculator_type, created_at DESC);

-- Enable RLS
ALTER TABLE public.calculator_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert for analytics logging
CREATE POLICY "Allow public insert of analytics" 
ON public.calculator_analytics
FOR INSERT 
WITH CHECK (true);

-- Restrict SELECT on analytics to service role only
CREATE POLICY "Restrict analytics reads to service role" 
ON public.calculator_analytics
FOR SELECT 
USING (auth.role() = 'service_role');

