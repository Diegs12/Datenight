// Shared CORS + security helpers for all API endpoints.
// Only allows requests from the production domain.

const ALLOWED_ORIGINS = [
  'https://vallotaventures.com',
  'https://www.vallotaventures.com',
];

// In development, also allow localhost
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL_ENV !== 'production') {
  ALLOWED_ORIGINS.push('http://localhost:3000');
}

function getOrigin(req) {
  const origin = req.headers.origin || req.headers.referer || '';
  return ALLOWED_ORIGINS.find((o) => origin.startsWith(o)) || null;
}

function setCorsHeaders(req, res) {
  const origin = getOrigin(req);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function handlePreflight(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(req, res);
    res.status(204).end();
    return true;
  }
  return false;
}

module.exports = { setCorsHeaders, handlePreflight, getOrigin };
