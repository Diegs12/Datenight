# PCC Current-State Gap Assessment

## Executive view

PCC is not yet ready for institutional diligence as a white-labeled wealth-management product.

The codebase contains some positive controls, including:

- CORS restrictions in [`api/_cors.js`](../../../api/_cors.js)
- baseline security headers in [`vercel.json`](../../../vercel.json)
- server-side encryption logic for stored third-party API keys in [`api/trading-keys.js`](../../../api/trading-keys.js)
- basic signup validation in [`api/trading-signup.js`](../../../api/trading-signup.js)

Those controls are not sufficient for a product that will process or display financial account data through Plaid or be reviewed by a large wealth-management firm.

## Material findings

### 1. Product claims exceed demonstrated controls

The PCC marketing site currently states:

- users can create accounts without email verification
- passwords are securely hashed
- rate limiting protects accounts
- sensitive data is always encrypted

Relevant code references:

- [`src/PCCLanding.js`](../../../src/PCCLanding.js)

Risk:

- creates diligence and legal risk if a counterparty compares the claims to actual control evidence
- creates SOC 2 CC2 / CC3 governance issues around accuracy of commitments and communications

### 2. No clearly implemented PCC production auth/session model is present

The repo includes a general login page and some trading-oriented signup logic, but no clearly scoped PCC production authentication flow, session management standard, or authorization model for financial features.

Relevant code references:

- [`src/LoginPage.js`](../../../src/LoginPage.js)
- [`api/trading-signup.js`](../../../api/trading-signup.js)

Risk:

- fails PCC access-control expectations under CC6
- blocks safe rollout of financial data features

### 3. No implemented Plaid integration is present

The PCC landing page says Plaid is coming soon, but there is no production Plaid exchange flow, token storage model, webhook verification handler, consent model, or item revocation process in the code inspected.

Relevant code references:

- [`src/PCCLanding.js`](../../../src/PCCLanding.js)

Risk:

- product cannot credibly represent bank-link security architecture yet
- counterparty diligence will ask for controls that do not exist

### 4. No demonstrated tenant isolation model for white-label deployment

There is no documented or implemented tenant isolation strategy for:

- partner-level branding and configuration
- tenant-specific access boundaries
- tenant-specific data segregation
- privileged support access

Risk:

- major blocker for white-label diligence
- high-impact confidentiality and access-control gap

### 5. Logging, monitoring, and incident detection are not defined for PCC

The code inspected does not show:

- centralized audit logging
- security event detection
- privileged access logging
- financial-data access logging
- alert routing and response ownership

Risk:

- CC7 system operations gap
- unacceptable for financial-data handling and Plaid usage

### 6. Vulnerability and secure SDLC controls are partial

The repo has some good baseline hygiene:

- Dependabot
- a weekly GitHub security workflow

But there is no complete standard for:

- code review requirements
- branch protections
- remediation SLAs
- dependency triage
- secrets rotation cadence
- penetration testing

Relevant code references:

- [`.github/dependabot.yml`](../../../.github/dependabot.yml)
- [`.github/workflows/security-scan.yml`](../../../.github/workflows/security-scan.yml)

### 7. No formal data classification and retention standard

For a product handling balances, transactions, account metadata, and possibly Plaid artifacts, there is no formal definition of:

- sensitive customer data classes
- retention windows
- deletion workflows
- export workflows
- encryption requirements by data class

Risk:

- CC3 / CC8 / CC9 gap
- likely counterparty diligence blocker

### 8. No evidence package exists

There is no structured audit evidence repository for:

- access reviews
- incidents
- backups and restore tests
- vendor reviews
- training
- change approvals
- risk assessments

Risk:

- even if controls are implemented, they will not be auditable

## Overall readiness rating

- SOC 2 PCC readiness: Low
- White-label wealth-management diligence readiness: Low
- Plaid readiness: Low

## Immediate priorities

1. Stop overclaiming controls publicly.
2. Define production architecture for auth, tenancy, data flows, and Plaid.
3. Implement access control, logging, secrets management, and incident response.
4. Build a formal evidence program from day one.
