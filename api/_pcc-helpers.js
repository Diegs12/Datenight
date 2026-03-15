const { getSupabaseAdminClient } = require("./_supabase");
const { plaidRequest } = require("./_plaid");

// ─── Shared role/profile helpers ─────────────────────────────────────────────

function isAdvisorRole(role) {
  return ["owner", "admin", "advisor"].includes(role);
}

async function getActorProfile(supabase, auth) {
  const { data, error } = await supabase
    .from("pcc_users")
    .select("user_id, email, full_name, tenant_slug, role")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (error) throw error;
  return data || {
    user_id: auth.user.id,
    email: auth.user.email,
    full_name: auth.user.user_metadata?.full_name || "",
    tenant_slug: auth.tenantSlug,
    role: auth.role,
  };
}

async function verifyClientAccess(supabase, clientId, actor) {
  let query = supabase
    .from("pcc_clients")
    .select("id, tenant_slug, advisor_user_id, user_id")
    .eq("id", clientId)
    .eq("tenant_slug", actor.tenant_slug)
    .maybeSingle();

  if (actor.role === "advisor") {
    query = supabase
      .from("pcc_clients")
      .select("id, tenant_slug, advisor_user_id, user_id")
      .eq("id", clientId)
      .eq("tenant_slug", actor.tenant_slug)
      .eq("advisor_user_id", actor.user_id)
      .maybeSingle();
  } else if (actor.role === "client") {
    query = supabase
      .from("pcc_clients")
      .select("id, tenant_slug, advisor_user_id, user_id")
      .eq("id", clientId)
      .eq("tenant_slug", actor.tenant_slug)
      .eq("user_id", actor.user_id)
      .maybeSingle();
  }

  const { data, error } = await query;
  if (error || !data) return null;
  return data;
}

// ─── Shared sync logic ──────────────────────────────────────────────────────

function buildTransactionRow(txn, tenantSlug, clientId, plaidItemId) {
  return {
    tenant_slug: tenantSlug,
    client_id: clientId,
    plaid_item_id: plaidItemId,
    plaid_account_id: txn.account_id,
    plaid_transaction_id: txn.transaction_id,
    amount: txn.amount,
    iso_currency_code: txn.iso_currency_code || "USD",
    authorized_date: txn.authorized_date || null,
    posted_date: txn.date || txn.authorized_date || new Date().toISOString().slice(0, 10),
    merchant_name: txn.merchant_name || null,
    description: txn.name || null,
    category: txn.personal_finance_category
      ? [txn.personal_finance_category.primary, txn.personal_finance_category.detailed].filter(Boolean)
      : txn.category || [],
    pending: txn.pending || false,
    removed: false,
    raw_payload: txn,
    updated_at: new Date().toISOString(),
  };
}

function buildTransactionUpdate(txn) {
  return {
    amount: txn.amount,
    authorized_date: txn.authorized_date || null,
    posted_date: txn.date || txn.authorized_date || null,
    merchant_name: txn.merchant_name || null,
    description: txn.name || null,
    category: txn.personal_finance_category
      ? [txn.personal_finance_category.primary, txn.personal_finance_category.detailed].filter(Boolean)
      : txn.category || [],
    pending: txn.pending || false,
    raw_payload: txn,
    updated_at: new Date().toISOString(),
  };
}

async function syncAccountsForItem(supabase, accessToken, plaidItemId, clientId, tenantSlug, institutionName) {
  const response = await plaidRequest("/accounts/get", { access_token: accessToken });
  const accounts = response.accounts || [];
  const now = new Date().toISOString();

  for (const account of accounts) {
    await supabase
      .from("pcc_accounts")
      .upsert({
        tenant_slug: tenantSlug,
        client_id: clientId,
        plaid_item_id: plaidItemId,
        plaid_account_id: account.account_id,
        institution_name: institutionName || null,
        name: account.name || "Unknown",
        official_name: account.official_name || null,
        mask: account.mask || null,
        type: account.type || null,
        subtype: account.subtype || null,
        status: "active",
        current_balance: account.balances?.current ?? null,
        available_balance: account.balances?.available ?? null,
        iso_currency_code: account.balances?.iso_currency_code || "USD",
        last_balance_update: now,
        updated_at: now,
      }, { onConflict: "plaid_account_id" });
  }

  return accounts.length;
}

async function syncTransactionsForItem(supabase, accessToken, plaidItemId, clientId, tenantSlug) {
  const { data: cursorRow } = await supabase
    .from("pcc_sync_cursors")
    .select("id, sync_cursor")
    .eq("plaid_item_id", plaidItemId)
    .maybeSingle();

  let cursor = cursorRow?.sync_cursor || "";
  let hasMore = true;
  let totalAdded = 0;
  let totalModified = 0;
  let totalRemoved = 0;

  while (hasMore) {
    const syncPayload = { access_token: accessToken };
    if (cursor) syncPayload.cursor = cursor;

    const response = await plaidRequest("/transactions/sync", syncPayload);

    for (const txn of response.added || []) {
      await supabase
        .from("pcc_transactions")
        .upsert(buildTransactionRow(txn, tenantSlug, clientId, plaidItemId), { onConflict: "plaid_transaction_id" });
    }
    totalAdded += (response.added || []).length;

    for (const txn of response.modified || []) {
      await supabase
        .from("pcc_transactions")
        .update(buildTransactionUpdate(txn))
        .eq("plaid_transaction_id", txn.transaction_id);
    }
    totalModified += (response.modified || []).length;

    for (const txn of response.removed || []) {
      await supabase
        .from("pcc_transactions")
        .update({ removed: true, updated_at: new Date().toISOString() })
        .eq("plaid_transaction_id", txn.transaction_id);
    }
    totalRemoved += (response.removed || []).length;

    cursor = response.next_cursor || "";
    hasMore = response.has_more === true;
  }

  // Persist cursor only after all pages succeeded
  const now = new Date().toISOString();
  if (cursorRow) {
    await supabase
      .from("pcc_sync_cursors")
      .update({ sync_cursor: cursor, last_success_at: now, last_attempt_at: now, updated_at: now })
      .eq("id", cursorRow.id);
  } else {
    await supabase
      .from("pcc_sync_cursors")
      .insert({
        tenant_slug: tenantSlug,
        client_id: clientId,
        plaid_item_id: plaidItemId,
        sync_cursor: cursor,
        last_attempt_at: now,
        last_success_at: now,
      });
  }

  return { totalAdded, totalModified, totalRemoved };
}

// Item-level errors that require user re-authentication
const ITEM_ERROR_CODES = [
  "ITEM_LOGIN_REQUIRED",
  "ITEM_LOCKED",
  "ITEM_NOT_SUPPORTED",
  "ACCESS_NOT_GRANTED",
  "INSTITUTION_NOT_RESPONDING",
  "INSTITUTION_DOWN",
  "PENDING_EXPIRATION",
];

function classifyItemHealth(errorCode) {
  return ITEM_ERROR_CODES.includes(errorCode) ? "login_required" : "error";
}

module.exports = {
  isAdvisorRole,
  getActorProfile,
  verifyClientAccess,
  buildTransactionRow,
  buildTransactionUpdate,
  syncAccountsForItem,
  syncTransactionsForItem,
  ITEM_ERROR_CODES,
  classifyItemHealth,
};
