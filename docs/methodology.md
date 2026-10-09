# Methodology

CyberEvidence implements a transparent engineering workflow inspired by common automotive cybersecurity practices. It does not copy ISO/SAE 21434 text.

## Traceability model

`Item → Asset → Damage scenario → Threat scenario → Attack path → Risk → Treatment → Cybersecurity goal → Evidence → Review`

## MVP risk matrix

Impact has four levels: negligible, moderate, major, severe. Attack feasibility has four levels: very-low, low, medium, high. The MVP multiplies their ordinal values (1–4):

- 12–16: Critical
- 8–11: High
- 4–7: Medium
- 1–3: Low

This default matrix is configurable only in code in the MVP. Production versions should support approved organisational methods and calibrated parameters.

## Automated evidence-gap checks

The engine detects missing assets/scenarios, untreated high risks, unlinked goals, goals without evidence, expired evidence, and rework decisions. These checks are completeness indicators—not proof of adequacy.

## Production backlog

1. Entra/OIDC authentication, RBAC, tenant isolation, and segregation of duties.
2. PostgreSQL/Azure SQL and append-only signed audit events.
3. Evidence file storage, malware scanning, SHA-256 hashing, and provenance.
4. Configurable TARA and risk methods approved by each customer.
5. Integration with ALM, requirements, test, SBOM, vulnerability, and ticketing tools.
6. Review workflows for cybersecurity manager, safety, legal, quality, and independent assessor.
7. Signed PDF audit pack, retention, deletion, and customer-managed encryption keys.
8. Supplier portal and API integration for automotive software marketplaces.
