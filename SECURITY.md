# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.X     | :white_check_mark: |
| 1.X     | :x:                |

## Security Measures

This project implements the following security hardening:

- **XSS Prevention**: All passage content is sanitized through [DOMPurify](https://github.com/cure53/DOMPurify) before DOM insertion, with a strict allowlist of tags and attributes.
- **Markdown Safety**: Raw HTML is disabled in the Markdown parser (`html: false` in markdown-it) to prevent injection via passage content.
- **Content Security Policy**: A CSP meta tag restricts script sources, object embeds, form targets, and base URIs.
- **Subresource Integrity**: External CDN resources include SRI hashes to prevent tampering.
- **URL Validation**: Image/resource URLs are validated to only allow `http:` and `https:` protocols, blocking `javascript:`, `data:`, and `file:` schemes.
- **Safe DOM Manipulation**: Script and style elements are created using safe DOM APIs (`document.createElement`, `textContent`) instead of HTML string interpolation.
- **Dependency Auditing**: `npm audit` is used to monitor and fix known vulnerabilities in dependencies.

## Reporting a Vulnerability

Please submit an issue or email the maintainer directly for sensitive disclosures.
