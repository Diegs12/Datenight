-- Supabase SQL: Create trading_users table
-- Run this in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS trading_users (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  risk_profile TEXT CHECK (risk_profile IN ('conservative', 'moderate', 'aggressive')),
  quiz_answers JSONB,
  capital DECIMAL(12,2),
  bot_status TEXT DEFAULT 'inactive' CHECK (bot_status IN ('inactive', 'running', 'paused')),
  coinbase_connected BOOLEAN DEFAULT FALSE,
  anthropic_connected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_trading_users_user_id ON trading_users(user_id);
CREATE INDEX IF NOT EXISTS idx_trading_users_email ON trading_users(email);
