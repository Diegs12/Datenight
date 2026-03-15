# Plaid Security Architecture Standard

## Goal

Enable Plaid for PCC in a way that is defensible to:

- Plaid
- a white-label wealth-management partner
- a future SOC 2 auditor

## Non-negotiable rules

- Use Plaid Link. Never collect banking credentials directly.
- Store only the minimum Plaid data needed for the product.
- Keep all Plaid secrets and access tokens server-side only.
- Encrypt sensitive stored values at rest.
- Verify Plaid webhooks before processing.
- Log all privileged actions and financial-data access.
- Support revocation, deletion, and customer disconnect workflows.

## Reference architecture

### Frontend

- Launch Plaid Link from the frontend.
- Frontend requests a short-lived `link_token` from the PCC backend.
- Frontend exchanges the resulting `public_token` only with the backend.
- No Plaid secret or long-lived token is ever present in client code.

### Backend

- Server endpoint creates `link_token`.
- Server endpoint exchanges `public_token` for `access_token`.
- `access_token` is encrypted before storage.
- Backend stores mapping among:
  - tenant
  - user
  - Plaid item
  - institution
  - consent timestamp
  - data scopes enabled

### Data model

Classify Plaid-related data into:

- Restricted:
  - access tokens
  - processor tokens
  - account and routing numbers
  - identity data
- Confidential:
  - balances
  - transactions
  - institution names
  - account masks
- Internal:
  - sync timestamps
  - webhook processing metadata

### Encryption

- Use managed secrets storage for `PLAID_SECRET`.
- Encrypt stored `access_token` values with envelope encryption or an application-level key managed outside code.
- Restrict decryption capability to the service needing it.
- Rotate encryption keys on a defined schedule and after suspected compromise.

### Webhooks

- Verify webhook signatures.
- Reject requests with invalid signature, timestamp drift, or replay.
- Process webhooks idempotently.
- Log webhook type, item, tenant, processing outcome, and retry state.
- Alert on repeated verification failures.

### Access control

- Only the backend service may access Plaid secrets.
- Only defined service roles may read decrypted tokens.
- Support staff must not have standing access to raw Plaid tokens.
- Production database access must be tightly restricted and logged.

### Tenant isolation

For white-label deployments:

- every record must include a tenant identifier
- authorization must check both user identity and tenant boundary
- no cross-tenant support tooling by default
- partner-specific admin views must be explicitly scoped

## Operational requirements

- daily monitoring for webhook failures and sync anomalies
- access review for production secrets and database roles every quarter
- backup and restore test for encrypted Plaid token records
- incident runbook for suspected financial-data exposure
- annual penetration test covering auth, tenant boundaries, and Plaid flows

## Go-live checklist

- link token endpoint implemented
- public token exchange endpoint implemented
- encrypted token storage implemented
- webhook verification implemented
- audit logging implemented
- user consent and disconnect flows implemented
- data retention schedule approved
- incident response and customer notification workflow approved
