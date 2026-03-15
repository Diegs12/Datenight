# PCC Risk Register

| ID | Risk | Likelihood | Impact | Current State | Required Mitigation | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | Public security claims exceed actual controls | High | High | Open | Align website and sales language to implemented controls only | Founder / Product |
| R-02 | No production-grade auth/session model for PCC financial features | High | High | Open | Implement managed auth, secure session handling, RBAC, MFA for admins | Engineering |
| R-03 | No tenant isolation design for white-label use | High | High | Open | Define tenant model, authz checks, data partitioning, admin model | Engineering |
| R-04 | No implemented Plaid flow or secure token lifecycle | High | High | Open | Build Link, token exchange, encrypted token store, revocation, logging | Engineering |
| R-05 | Inadequate audit logging and alerting | High | High | Open | Centralize logs and security alerts for auth, admin, data access, webhooks | Engineering / Ops |
| R-06 | Secrets exposure through weak storage or handling | Medium | High | Partial | Use managed secret store, rotate keys, restrict access, add inventory | Engineering |
| R-07 | Vulnerabilities are not remediated within defined SLA | Medium | Medium | Partial | Set severity SLAs and monthly review cadence | Engineering |
| R-08 | No formal incident response process | Medium | High | Open | Approve IR plan, assign roles, run tabletop | Founder / Ops |
| R-09 | No backup restore evidence for sensitive data | Medium | High | Open | Implement backup monitoring and quarterly restore tests | Engineering |
| R-10 | Vendor risk not documented for Vercel, Supabase, Plaid, email, observability | Medium | High | Open | Create vendor inventory and reviews | Ops |
| R-11 | Lack of endpoint controls for workforce devices | Medium | Medium | Open | Require full-disk encryption, MFA, patching, endpoint protection | Founder / Ops |
| R-12 | Incomplete data retention and deletion process | Medium | High | Open | Define retention, export, deletion, and revocation rules | Product / Engineering |
