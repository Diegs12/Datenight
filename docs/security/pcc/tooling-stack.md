# PCC Security Tooling Stack

This is the recommended minimum stack for a small team building toward institutional diligence.

## Identity

- Workforce identity: Google Workspace or Microsoft 365 with enforced MFA
- SSO: Google Workspace or Okta into GitHub, Vercel, Supabase, and other admin tools
- Password manager: 1Password Business

## Source Control And CI

- GitHub with branch protection, required reviews, and Dependabot
- GitHub Actions for dependency scanning, secret scanning, and build checks

## Hosting And Data

- Frontend and serverless API: Vercel
- Database and auth: Supabase
- Secret management: Vercel encrypted env vars plus a managed secret inventory process

## Logging And Monitoring

- Error monitoring: Sentry
- Log aggregation: Datadog, Better Stack, or Axiom
- Uptime and alerting: Better Stack, Datadog, or Pingdom

## Endpoint And Workforce Security

- MDM: Kandji or Jamf for Apple devices
- Endpoint protection: SentinelOne, CrowdStrike, or Malwarebytes for small teams

## Vulnerability Management

- Dependency scanning: GitHub Dependabot and `npm audit`
- External scanning: Detectify, Intruder, or a lightweight monthly authenticated scan process
- Annual external penetration test: boutique appsec firm

## Ticketing And Evidence

- Ticketing: Linear, Jira, or GitHub Issues
- Evidence repository: the `docs/security/pcc/evidence/` structure in this repo plus restricted copies in cloud storage if needed

## Plaid-specific controls

- Plaid Link for customer bank auth
- webhook signature verification
- encrypted token storage
- restricted service-role access only

## Minimum acceptable implementation

If budget is constrained, the minimum acceptable first-pass stack is:

- Google Workspace with MFA
- 1Password Business
- GitHub with branch protections
- Vercel
- Supabase
- Sentry
- Better Stack or Axiom
- annual pen test
