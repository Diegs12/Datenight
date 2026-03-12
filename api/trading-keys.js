// Securely stores and retrieves user API keys (Coinbase CDP, Anthropic).
// Keys are encrypted with AES-256-GCM before storage in Supabase.
// The encryption key lives ONLY on the server (ENCRYPTION_KEY env var).

const crypto = require('crypto');
const { setCorsHeaders, handlePreflight } = require('./_cors');

const ALGORITHM = 'aes-256-gcm';

function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (!key || key.length < 64) return null;
  return Buffer.from(key, 'hex');
}

function encrypt(text) {
  const key = getEncryptionKey();
  if (!key) throw new Error('Encryption key not configured');

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  // Store iv:authTag:ciphertext — all needed to decrypt
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(data) { // eslint-disable-line no-unused-vars
  const key = getEncryptionKey();
  if (!key) throw new Error('Encryption key not configured');

  const [ivHex, authTagHex, encrypted] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Validate user_id format — only allow UUIDs, hex strings, or prefixed IDs
function isValidUserId(id) {
  if (!id || typeof id !== 'string') return false;
  if (id.length > 128) return false;
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

module.exports = async (req, res) => {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  if (!process.env.ENCRYPTION_KEY) {
    return res.status(503).json({ error: 'Encryption not configured' });
  }

  // ── SAVE KEYS ──
  if (req.method === 'POST') {
    const { user_id, coinbase_cdp_key, coinbase_cdp_secret, anthropic_key } = req.body || {};

    if (!isValidUserId(user_id)) {
      return res.status(400).json({ error: 'Valid user_id required' });
    }

    // Encrypt each key before storage
    const encrypted = {};
    if (coinbase_cdp_key) encrypted.coinbase_cdp_key = encrypt(coinbase_cdp_key);
    if (coinbase_cdp_secret) encrypted.coinbase_cdp_secret = encrypt(coinbase_cdp_secret);
    if (anthropic_key) encrypted.anthropic_key = encrypt(anthropic_key);

    if (Object.keys(encrypted).length === 0) {
      return res.status(400).json({ error: 'No keys provided' });
    }

    // Store in Supabase
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.status(200).json({
        success: true,
        stored: Object.keys(encrypted).map((k) => k.replace(/_/g, ' ')),
      });
    }

    try {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

      // Upsert — update if user already has keys, insert if new
      const { error } = await supabase
        .from('user_api_keys')
        .upsert({
          user_id,
          ...encrypted,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) throw error;

      return res.status(200).json({
        success: true,
        stored: Object.keys(encrypted).map((k) => k.replace(/_/g, ' ')),
      });
    } catch (err) {
      console.error('Key storage failed');
      return res.status(500).json({ error: 'Failed to store keys' });
    }
  }

  // ── GET KEY STATUS (never returns actual keys, just which ones are stored) ──
  if (req.method === 'GET') {
    const user_id = req.query.user_id;
    if (!isValidUserId(user_id)) {
      return res.status(400).json({ error: 'Valid user_id required' });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.status(200).json({ coinbase_connected: false, anthropic_connected: false });
    }

    try {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

      const { data, error } = await supabase
        .from('user_api_keys')
        .select('coinbase_cdp_key, anthropic_key')
        .eq('user_id', user_id)
        .single();

      if (error || !data) {
        return res.status(200).json({ coinbase_connected: false, anthropic_connected: false });
      }

      return res.status(200).json({
        coinbase_connected: !!data.coinbase_cdp_key,
        anthropic_connected: !!data.anthropic_key,
      });
    } catch (err) {
      console.error('Key status check failed');
      return res.status(200).json({ coinbase_connected: false, anthropic_connected: false });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
