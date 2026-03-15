const { beginRequest, readJsonBody, sendError } = require("./_security");
const { requireAuthenticatedUser } = require("./_auth");
const { recordAuditEvent } = require("./_audit");
const { getPlaidConfig, plaidRequest } = require("./_plaid");

module.exports = async (req, res) => {
  const started = beginRequest(req, res, ["POST"]);
  if (started.preflight || started.rejected) return;

  const auth = await requireAuthenticatedUser(req, res);
  if (auth.error) return;

  const plaid = getPlaidConfig();
  if (!plaid.configured) {
    return sendError(res, req.requestId, 503, "plaid_not_configured", "Plaid is not configured");
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendError(res, req.requestId, 400, "invalid_json", "Invalid request body");
  }

  try {
    const response = await plaidRequest("/link/token/create", {
      client_name: plaid.clientName,
      language: "en",
      country_codes: body.country_codes || plaid.countryCodes,
      products: body.products || plaid.products,
      user: {
        client_user_id: auth.user.id,
      },
      redirect_uri: body.redirect_uri || process.env.PLAID_REDIRECT_URI || undefined,
      webhook: process.env.PLAID_WEBHOOK_URL || undefined,
    });

    await recordAuditEvent({
      actorUserId: auth.user.id,
      tenantSlug: auth.tenantSlug,
      action: "plaid.link_token.create",
      targetType: "plaid_session",
      targetId: auth.user.id,
      requestId: req.requestId,
      ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress || null,
      userAgent: req.headers["user-agent"] || null,
      metadata: {
        products: body.products || plaid.products,
        country_codes: body.country_codes || plaid.countryCodes,
      },
    });

    return res.status(200).json({
      link_token: response.link_token,
      expiration: response.expiration,
      request_id: req.requestId,
    });
  } catch (error) {
    return sendError(res, req.requestId, 502, "plaid_link_token_failed", error.message);
  }
};
