# PCC Security Diligence Brief

## Product summary

PCC is being developed as a personal operations and financial visibility platform that combines life tracking and optional financial account aggregation. The intended production architecture is a Vercel-hosted frontend and API layer with Supabase-backed persistence and authentication, with Plaid planned for bank connectivity.

## Current status statement

PCC is currently in pre-institutional hardening. A white-label or wealth-management deployment should be treated as pending completion of the control set in this package. PCC should not be represented as SOC 2 certified or as having production Plaid controls until those controls are implemented and independently validated.

## Security priorities

- strong identity and access management
- tenant isolation for white-label deployment
- secure handling of financial data and Plaid tokens
- audit logging and incident response
- vendor risk management

## Planned control baseline

- MFA and SSO for all admin systems
- production RBAC and least privilege
- encrypted storage of sensitive tokens
- centralized logging and monitoring
- incident response and business continuity runbooks
- quarterly access reviews
- vulnerability management and penetration testing

## Known current limitations

- no implemented production Plaid flow in the inspected code
- no documented tenant isolation implementation
- no mature evidence program yet
- some historical public product claims were broader than the demonstrated controls and are being corrected

## Compliance position

PCC is building toward SOC 2 common-criteria readiness. This package is the operating baseline for readiness and partner diligence. It is not an attestation report.
