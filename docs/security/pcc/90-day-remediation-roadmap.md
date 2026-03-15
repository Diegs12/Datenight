# PCC 90-Day Remediation Roadmap

## Days 1-15

- Finalize in-scope architecture for PCC, including frontend, API, auth, database, and planned Plaid components.
- Remove or revise unsupported public security claims.
- Appoint a security owner.
- Approve the policy suite.
- Turn on branch protection and mandatory PR review for the production branch.
- Enforce MFA on GitHub, Vercel, Supabase, email, domain registrar, and password manager.
- Establish a password manager and secrets inventory.
- Create a vendor inventory for Vercel, Supabase, Plaid, Resend, GitHub, and any analytics or support tooling.

## Days 16-30

- Implement production auth and session design for PCC.
- Define RBAC roles: end user, tenant admin, support, engineer, founder.
- Define tenant model for white-label deployments.
- Implement centralized logging and log retention.
- Implement alerting for auth failures, admin actions, configuration changes, and webhook failures.
- Write and approve incident response and BCDR runbooks.

## Days 31-45

- Implement Plaid Link token creation and public token exchange.
- Implement encrypted storage for Plaid access tokens.
- Implement customer consent capture and disconnect workflow.
- Implement webhook verification, replay protection, and idempotency.
- Define data classification and retention controls for financial data.

## Days 46-60

- Add quarterly access review process.
- Add joiner / mover / leaver checklist.
- Add vulnerability scanning and remediation SLA tracking.
- Implement backup monitoring and perform first restore test.
- Create evidence collection cadence and assign owners.

## Days 61-75

- Perform internal readiness review against the PCC matrix.
- Run a tabletop incident exercise involving credential compromise and financial-data exposure.
- Review vendor documentation and record risk decisions.
- Validate that no support path exposes raw Plaid tokens or cross-tenant data.

## Days 76-90

- Commission an external penetration test.
- Remediate critical and high findings.
- Prepare partner diligence packet using `security-diligence-brief.md`.
- Decide whether to start a formal SOC 2 readiness assessment or proceed directly into a Type 1 readiness cycle.

## Launch blockers

Do not enable Plaid for production partner use until:

- auth and RBAC are complete
- tenant isolation is complete
- webhook verification is complete
- logging and alerting are complete
- restore testing is complete
- IR plan is exercised
- pen test criticals are closed
