# PCC Security Questionnaire Response Draft

Use this as a starting point for partner diligence responses. Do not overstate status.

## Are you SOC 2 compliant?

PCC is not currently represented as SOC 2 certified. We are using the SOC 2 common criteria as the control baseline for the product and are implementing the documented controls in this package as part of readiness.

## Do you support Plaid today?

Plaid is planned for PCC. Production Plaid enablement is gated on implementation of secure token handling, webhook verification, logging, tenant isolation, and incident response controls.

## How do you protect financial data?

PCC is adopting a restricted-data model for financial account connectivity artifacts and a confidentiality model for balances and transactions. The intended production control set includes encryption at rest for sensitive tokens, TLS in transit, least-privilege access, audit logging, and monitored access to production systems.

## How do you prevent unauthorized access?

The target production control set includes managed authentication, RBAC, least privilege, MFA for administrators, quarterly access reviews, and immediate privileged offboarding.

## How do you segregate customer data for white-label deployments?

PCC is implementing tenant-scoped data segregation and authorization controls. White-label launch is gated on a completed tenant isolation model, validated authorization checks, and logging of administrative access.

## Do employees have access to customer financial credentials?

The intended architecture does not permit routine workforce access to customer banking credentials or raw Plaid tokens. Sensitive credentials are to be stored server-side only, encrypted at rest, and restricted to the services that require them.

## How do you monitor your systems?

The production target state includes centralized application and infrastructure logging, alerting for authentication failures, privilege changes, webhook failures, and abnormal API behavior, with defined incident-response ownership.

## Do you test security?

PCC uses dependency and security scanning today and plans to add periodic vulnerability review and external penetration testing before institutional rollout of financial-data features.

## What happens if there is a security incident?

PCC is formalizing an incident-response process that includes severity classification, containment, investigation, communications, remediation, and customer or partner notification where required.

## What vendors are in scope?

Current or planned key vendors include Vercel, Supabase, Plaid, GitHub, and messaging or email providers used for customer communications or operational notifications.
