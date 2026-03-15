# PCC SOC 2 PCC Control Matrix

This is the control baseline for PCC against the SOC 2 common criteria.

## CC1 Control Environment

### Objective

Security responsibilities, accountability, and governance are defined.

### Required controls

- Appoint a named security owner.
- Maintain an org chart or role matrix for engineering, product, operations, and incident command.
- Approve a written security policy suite at least annually.
- Define acceptable use and code of conduct expectations for workforce members.

### Required evidence

- security owner appointment
- annual policy approval record
- role and responsibility matrix

## CC2 Communication And Information

### Objective

Internal and external commitments are accurate and support security objectives.

### Required controls

- Review website, sales, and diligence claims before publication.
- Maintain a product security overview and architecture diagram.
- Track customer and partner commitments relating to uptime, data handling, encryption, and integrations.
- Require legal / security review for statements about Plaid, encryption, or compliance status.

### Required evidence

- published security overview
- marketing review checklist
- redlined diligence responses

## CC3 Risk Assessment

### Objective

Risks to confidentiality, integrity, and availability are identified and managed.

### Required controls

- Maintain a formal risk register.
- Perform at least annual risk assessments and upon major product changes.
- Identify fraud, abuse, third-party, and tenant-isolation risks.
- Reassess risk before enabling Plaid or white-label multi-tenancy.

### Required evidence

- risk assessment report
- risk register with owners and due dates
- architecture change review records

## CC4 Monitoring Activities

### Objective

Security control performance is monitored and deficiencies are escalated.

### Required controls

- Monitor logins, failed logins, privilege changes, configuration changes, secret access, webhook failures, and unusual API access.
- Review security alerts daily on business days.
- Track remediation to closure.
- Perform quarterly management review of control health.

### Required evidence

- alert review logs
- ticket history
- quarterly control review notes

## CC5 Control Activities

### Objective

Policies and procedures exist to reduce risk to acceptable levels.

### Required controls

- Maintain policies for access, change, incident, vulnerability, backups, vendor risk, encryption, and data retention.
- Require documented approvals for production changes.
- Require documented approvals for new vendors handling customer data.

### Required evidence

- policy suite
- production change approvals
- vendor review records

## CC6 Logical And Physical Access Controls

### Objective

Only authorized users and systems access data and infrastructure.

### Required controls

- SSO plus MFA for admin consoles, source control, hosting, database, email, and password manager.
- Role-based access control for app users, admins, support, and engineering.
- Quarterly access reviews.
- Joiner / mover / leaver procedures with same-day offboarding for privileged access.
- No shared administrator accounts.
- Production access granted only by ticket and least privilege.
- Device requirements for workforce endpoints: full-disk encryption, screen lock, MDM where feasible.

### Required evidence

- access matrix
- MFA screenshots or config exports
- quarterly access review records
- offboarding checklist

## CC7 System Operations

### Objective

Systems are operated securely and deviations are detected and handled.

### Required controls

- Centralized application and infrastructure logging.
- Endpoint protection on workforce devices.
- Vulnerability scanning and patch management with defined SLAs.
- Backup monitoring and periodic restore tests.
- Incident response plan with severity classification and communications plan.
- Rate limiting, abuse detection, and API anomaly monitoring.

### Required evidence

- vuln scan reports
- patch reports
- backup success logs
- restore test results
- incident records

## CC8 Change Management

### Objective

Changes are authorized, tested, approved, and traceable.

### Required controls

- Pull requests required for production code changes.
- Branch protections on default branch.
- Separate development and production environments.
- Security review for changes affecting auth, financial data, encryption, Plaid, or tenant boundaries.
- Rollback procedure for production releases.

### Required evidence

- branch protection settings
- PR review records
- deployment records
- rollback runbook

## CC9 Risk Mitigation

### Objective

Risks from business disruption, vendors, and new technologies are mitigated.

### Required controls

- Vendor due diligence for Vercel, Supabase, Plaid, email providers, observability tools, and support tools.
- Annual penetration test before broad wealth-management rollout.
- Business continuity and disaster recovery plan.
- Tabletop incident exercise at least annually.
- Secure secret management and rotation program.
- Data minimization and retention limits for financial data.

### Required evidence

- vendor inventory and reviews
- penetration test report
- BCDR plan
- tabletop notes
- key rotation logs

## Minimum launch gate for a wealth-management partner

Before partner pilot or white-label deployment, PCC should not launch financial data features until all of the following are complete:

- production auth and authorization model implemented
- MFA and SSO enforced for admins
- centralized audit logging and alerting in place
- incident response plan approved and exercised
- data classification and retention standard approved
- tenant isolation design approved
- Plaid architecture implemented with secure token handling and webhook verification
- penetration test completed with criticals closed
