const crypto = require("crypto");

function getPlaidConfig() {
  const env = process.env.PLAID_ENV || "sandbox";
  const baseUrl =
    env === "production"
      ? "https://production.plaid.com"
      : env === "development"
        ? "https://development.plaid.com"
        : "https://sandbox.plaid.com";

  return {
    configured: Boolean(process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET),
    clientId: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    baseUrl,
    env,
    clientName: process.env.PCC_CLIENT_NAME || "PCC",
    products: (process.env.PLAID_PRODUCTS || "transactions")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    countryCodes: (process.env.PLAID_COUNTRY_CODES || "US")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  };
}

async function plaidRequest(path, body) {
  const config = getPlaidConfig();
  if (!config.configured) throw new Error("Plaid is not configured");

  const response = await fetch(`${config.baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Plaid-Version": "2020-09-14",
    },
    body: JSON.stringify({
      client_id: config.clientId,
      secret: config.secret,
      ...body,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    const err = new Error(data.error_message || "Plaid request failed");
    err.details = data;
    throw err;
  }
  return data;
}

function decodeJwtPart(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

async function verifyPlaidWebhookSignature(signedJwt, rawBody) {
  if (!signedJwt) return { valid: false, reason: "missing_signature" };

  const [headerPart, payloadPart, signaturePart] = signedJwt.split(".");
  if (!headerPart || !payloadPart || !signaturePart) {
    return { valid: false, reason: "invalid_jwt" };
  }

  const header = decodeJwtPart(headerPart);
  const payload = decodeJwtPart(payloadPart);
  if (!header.kid) return { valid: false, reason: "missing_kid" };

  const verificationKey = await plaidRequest("/webhook_verification_key/get", {
    key_id: header.kid,
  });

  const jwk =
    verificationKey.key?.jwk ||
    verificationKey.key?.public_key ||
    verificationKey.jwk ||
    verificationKey.public_key;

  if (!jwk) return { valid: false, reason: "missing_verification_key" };

  const publicKey = crypto.createPublicKey({ key: jwk, format: "jwk" });
  const verifier = crypto.createVerify("SHA256");
  verifier.update(`${headerPart}.${payloadPart}`);
  verifier.end();

  const signature = Buffer.from(signaturePart, "base64url");
  const signatureOk = verifier.verify(publicKey, signature);
  if (!signatureOk) return { valid: false, reason: "bad_signature" };

  const bodyHash = crypto.createHash("sha256").update(rawBody).digest("hex");
  if (payload.request_body_sha256 !== bodyHash) {
    return { valid: false, reason: "body_hash_mismatch" };
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.iat && Math.abs(now - payload.iat) > 300) {
    return { valid: false, reason: "stale_signature" };
  }

  return { valid: true, payload };
}

module.exports = {
  getPlaidConfig,
  plaidRequest,
  verifyPlaidWebhookSignature,
};
