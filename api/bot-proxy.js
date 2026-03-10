// Proxies dashboard requests to the bot API on Railway.
// Adds the API_SECRET server-side so it never touches the browser.

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const BOT_URL = process.env.BOT_API_URL;
  const SECRET = process.env.API_SECRET;

  if (!BOT_URL) {
    return res.status(503).json({ error: 'Bot API URL not configured' });
  }

  // Extract the endpoint from query param: /api/bot-proxy?endpoint=status
  const endpoint = req.query.endpoint;
  if (!endpoint || !/^[a-z-]+$/.test(endpoint)) {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  // Forward query params (except endpoint and key)
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(req.query)) {
    if (k !== 'endpoint' && k !== 'key') params.set(k, v);
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
    console.error('Bot proxy error:', err.message);
    res.status(502).json({ error: 'Cannot reach bot API' });
  }
};
