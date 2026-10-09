# CyberEvidence 21434

Automotive cybersecurity evidence workbench for ISO/SAE 21434-aligned engineering.

CyberEvidence helps OEM and supplier teams structure cybersecurity items, assets, threat scenarios, risk treatment, claims, evidence, findings, and human approvals in one traceable workflow.

## MVP capabilities

- Cybersecurity item and asset definition
- TARA-style threat scenario register
- Impact and attack-feasibility scoring
- Explainable risk classification and treatment tracking
- Cybersecurity goals and claim-to-evidence traceability
- Evidence completeness and freshness checks
- Review gates, findings, and immutable-style audit events
- Executive dashboard and downloadable JSON audit pack
- REST API, responsive web interface, tests, Docker, and Azure deployment assets

## Important limitation

This tool supports engineering evidence management. It does not certify ISO/SAE 21434 compliance and does not reproduce the standard. Organisations must use licensed standards, approved methods, competent reviewers, and independent assessment where required.

## Run

Requires Node.js 20+.

```bash
npm test
npm start
```

Open http://localhost:3000.

## API

- `GET /api/health`
- `GET|POST /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects/:id/scenarios`
- `POST /api/projects/:id/goals`
- `POST /api/projects/:id/evidence`
- `POST /api/projects/:id/reviews`
- `GET /api/projects/:id/report`

See `docs/methodology.md` for the transparent scoring and evidence model.
