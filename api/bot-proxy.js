// Proxies dashboard requests to the bot API on Railway.
// Adds the API_SECRET server-side so it never touches the browser.

const { setCorsHeaders, handlePreflight } = require('./_cors');

// Strict whitelist of allowed bot API endpoints
const ALLOWED_ENDPOINTS = new Set([
  'status', 'portfolio', 'trades', 'stats',
  'decision', 'reviews', 'indicators', 'research',
]);

module.exports = async (req, res) => {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const BOT_URL = process.env.BOT_API_URL;
  const SECRET = process.env.API_SECRET;

  if (!BOT_URL) {
    return res.status(503).json({ error: 'Bot API not configured' });
  }

  // Validate endpoint against strict whitelist
  const endpoint = req.query.endpoint;
  if (!endpoint || !ALLOWED_ENDPOINTS.has(endpoint)) {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  // Forward only safe query params (exclude endpoint, key, and any auth-related params)
  const params = new URLSearchParams();
  const BLOCKED_PARAMS = new Set(['endpoint', 'key', 'secret', 'token', 'auth']);
  for (const [k, v] of Object.entries(req.query)) {
    if (!BLOCKED_PARAMS.has(k.toLowerCase())) params.set(k, v);
  }
  const qs = params.toString() ? `?${params.toString()}` : '';

  try {
    const headers = {};
    if (SECRET) headers['X-API-Key'] = SECRET;

    const response = await fetch(`${BOT_URL}/api/${endpoint}${qs}`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Bot proxy failed');
    res.status(502).json({ error: 'Cannot reach bot API' });
  }
};
