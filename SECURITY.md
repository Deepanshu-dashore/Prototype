# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please follow these steps to report it responsibly:

1. **Do not publicly disclose** the vulnerability.
2. **Contact the maintainers** via email at <security-contact@example.com> (replace with the appropriate address).
3. Provide a clear description of the issue, including:
   - Affected component or file.
   - Steps to reproduce the vulnerability.
   - Potential impact and severity.
   - Any suggested mitigation or fix.
4. **Allow time for a fix** before any public disclosure. We aim to address reported issues promptly.

## Security Best Practices

- Keep dependencies up to date (`pnpm audit` and `pnpm update`).
- Use environment variables for secrets; never commit them to the repository.
- Enable rate limiting on authentication endpoints (already configured).
- Sanitize all user‑generated content using `DOMPurify` (see `DEVELOPMENT.md`).

## Disclosure Timeline

We will acknowledge receipt of the report within 48 hours and aim to provide a fix or mitigation within a reasonable timeframe, depending on the severity.

---

_This security policy is based on the Open Source Security Foundation (OpenSSF) recommendations._
