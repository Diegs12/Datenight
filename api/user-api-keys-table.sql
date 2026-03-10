-- Encrypted user API keys for Vallota Trading
-- Run this in the Supabase SQL editor
-- Keys are AES-256-GCM encrypted — only the server can decrypt them

CREATE TABLE IF NOT EXISTS user_api_keys (
  id            BIGSERIAL PRIMARY KEY,
  user_id       TEXT UNIQUE NOT NULL,
  coinbase_cdp_key    TEXT,      -- encrypted
  coinbase_cdp_secret TEXT,      -- encrypted
  anthropic_key       TEXT,      -- encrypted
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_api_keys_user_id ON user_api_keys(user_id);
