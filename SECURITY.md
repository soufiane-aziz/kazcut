# Security Policy

## Supported Scope
Kazcut is a client-side financial calculation utility. Mathematical calculations execute inside the user's browser without transmitting financial figures to remote servers.

## Environment & Secrets Hygiene
- Never commit `.env`, `.env.local`, or service-role keys (`SUPABASE_SERVICE_ROLE_KEY`, API tokens, or private certificates).
- Only sanitized placeholder examples belong in `.env.example`.
- All public analytics and Supabase operations use strictly scoped client keys protected by PostgreSQL Row Level Security (RLS) policies in `schema.sql`.

## Reporting a Vulnerability
If you discover a security issue (e.g., XSS, CSP bypass, dependency vulnerability, or RLS policy flaw):
1. Please avoid disclosing exploit details publicly until a fix is available.
2. Open a private security advisory on GitHub (**Security → Advisories → Report a vulnerability**) or submit a minimal issue without sensitive proof-of-concept payloads.
3. We aim to acknowledge and remediate verified reports promptly.

