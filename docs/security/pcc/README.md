# PCC Security And Compliance Package

This package is the working security and SOC 2 PCC readiness set for the PCC product under `vallotaventures.com`.

It is written for three audiences:

- internal build and operations owners
- a prospective white-label wealth-management partner
- a future readiness assessor / SOC 2 auditor

## Scope

This package assumes PCC will become a multi-tenant personal finance and life-management product with:

- user accounts and authenticated sessions
- financial account balances and transaction data
- optional Plaid connectivity
- a Vercel-hosted frontend and serverless API layer
- Supabase-backed persistence and auth

## Current posture

The current codebase shows early-stage controls, but it is not yet at institutional diligence or SOC 2 PCC readiness for a white-labeled wealth-management deployment.

Use these files in order:

1. `current-state-gap-assessment.md`
2. `soc2-pcc-control-matrix.md`
3. `plaid-security-architecture.md`
4. `90-day-remediation-roadmap.md`
5. `risk-register.md`
6. `tooling-stack.md`
7. `white-label-deployment-standard.md`
8. `security-diligence-brief.md`
9. `security-questionnaire-response.md`
10. `policy-suite.md`
11. `evidence/`

## Deliverable intent

This package does not claim that PCC is already SOC 2 examined or Plaid-approved.

It gives you:

- a defensible statement of current gaps
- the exact control set to build
- the documents to operationalize those controls
- an evidence structure for diligence and audit readiness

## External references

- AICPA SOC reporting and SOC 2 resources: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
- AICPA description criteria resource: https://www.aicpa-cima.com/resources/download/get-description-criteria-for-your-organizations-soc-2-r-report
- Plaid developer policy: https://plaid.com/developer-policy/
- Plaid Link docs: https://plaid.com/docs/link/
- Plaid webhook verification docs: https://plaid.com/docs/api/webhooks/webhook-verification/
- FTC Safeguards Rule overview: https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know
- SEC Regulation S-P release page: https://www.sec.gov/rules-regulations/2024/06/s7-05-23
