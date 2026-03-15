# White-Label Deployment Standard

## Goal

PCC must support partner-branded deployments without creating cross-tenant data leakage or uncontrolled administrative access.

## Requirements

- Every partner deployment must have a unique tenant identifier.
- Every user, record, and integration artifact must be tenant-scoped.
- Authorization must evaluate both user identity and tenant membership on every sensitive request.
- Admin and support access must be role-based and logged.
- Branding configuration must be separated from financial data.

## Partner isolation controls

- no shared tenant admin accounts
- no cross-tenant queries by default
- no support tooling that exposes multiple tenant datasets without explicit break-glass controls
- no partner-visible metrics or dashboards that aggregate across tenants unless contractually approved and anonymized

## Environment strategy

Preferred model:

- shared control plane with strict tenant isolation in application and data layers
- separate staging environment
- protected production environment

Elevated-risk partner model:

- consider dedicated environment or dedicated database if contractual, regulatory, or reputational risk requires stronger separation

## Administrative access

- partner admins can access only their own tenant data
- Vallota internal admins have least-privilege support roles
- break-glass access must be time-bound, approved, and logged

## Logging

Log the following with tenant context:

- login success and failure
- privilege changes
- support access
- data export
- Plaid item link or disconnect
- webhook processing results

## Contractual readiness

Before signing a white-label partner:

- complete security questionnaire response
- complete vendor inventory
- complete incident response and notification workflow
- define data ownership and return/deletion commitments
- define subprocessor disclosures
