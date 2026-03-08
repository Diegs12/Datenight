-- Run this in your Supabase SQL editor to create the leads table
-- Supabase Dashboard → SQL Editor → New query → paste this → Run

CREATE TABLE IF NOT EXISTS leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text NOT NULL,
  partner_name text,
  quiz_answers jsonb,
  personality_type text,
  created_at  timestamptz DEFAULT now()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);

-- Optional: prevent duplicate emails
ALTER TABLE leads ADD CONSTRAINT leads_email_unique UNIQUE (email);
