const crypto = require("crypto");
const { setCorsHeaders, handlePreflight } = require("./_cors");

const rateLimitStore = new Map();

// This only throttles within a single warm serverless instance.
// For real production enforcement on Vercel, replace this with a shared store
// such as Upstash Redis or Vercel KV.

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function enforceRateLimit(req, res) {
  const path = req.url || "";
  if (!path.includes("/api/pcc-")) return false;

  const windowMs = parseInt(process.env.PCC_RATE_LIMIT_WINDOW_MS || "60000", 10);
  const maxRequests = parseInt(process.env.PCC_RATE_LIMIT_MAX || "60", 10);
  const bucket = `${getClientIp(req)}:${path.split("?")[0]}`;
  const now = Date.now();
  const current = rateLimitStore.get(bucket);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(bucket, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(bucket, current);
  res.setHeader("X-RateLimit-Limit", String(maxRequests));
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, maxRequests - current.count)));
  res.setHeader("X-RateLimit-Reset", String(Math.ceil(current.resetAt / 1000)));

  if (current.count <= maxRequests) return false;

  res.status(429).json({
    error: "Too many requests",
    code: "rate_limited",
    request_id: req.requestId,
  });
  return true;
}

function applySecurityHeaders(req, res) {
  setCorsHeaders(req, res);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  req.requestId = req.headers["x-request-id"] || crypto.randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
}

function beginRequest(req, res, allowedMethods) {
  if (handlePreflight(req, res)) return { preflight: true };
  applySecurityHeaders(req, res);
  if (enforceRateLimit(req, res)) return { rejected: true };
  if (allowedMethods && !allowedMethods.includes(req.method)) {
    res.setHeader("Allow", allowedMethods.join(", "));
    res.status(405).json({
      error: "Method not allowed",
      code: "method_not_allowed",
      request_id: req.requestId,
    });
    return { rejected: true };
  }
  return { requestId: req.requestId };
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim() || null;
}

async function readRawBody(req) {
  if (typeof req.body === "string") return req.body;
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8");
  if (req.body && typeof req.body === "object") return JSON.stringify(req.body);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  const rawBody = await readRawBody(req);
  if (!rawBody) return {};
  return JSON.parse(rawBody);
}

function sendError(res, requestId, status, code, message) {
  return res.status(status).json({
    error: message,
    code,
    request_id: requestId,
  });
}

module.exports = {
  beginRequest,
  getBearerToken,
  getClientIp,
  readJsonBody,
  readRawBody,
  sendError,
};
