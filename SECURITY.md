# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          | Notes                    |
| ------- | ------------------ | ------------------------ |
| 1.x     | :white_check_mark: | Current stable release   |
| < 1.0   | :x:                | No longer supported      |

## Reporting a Vulnerability

We take the security of TwineSpace seriously. If you discover a security vulnerability, please follow these steps:

### For Non-Critical Issues
- Open a [GitHub Issue](https://github.com/videlais/twine-space/issues) with the label "security"
- Provide as much detail as possible about the vulnerability
- Include steps to reproduce if applicable

### For Critical/Sensitive Issues
- **Do not** open a public issue
- Email the maintainer directly (check package.json for contact information)
- Allow up to 48 hours for initial response
- We will work with you to understand and address the issue

### What to Include
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)
- Your contact information for follow-up

## Security Best Practices

When using TwineSpace:

1. **Keep Dependencies Updated**: Regularly update to the latest version to receive security patches
2. **Validate User Input**: Always sanitize and validate any user-generated content in your stories
3. **CSP Headers**: Consider implementing Content Security Policy headers when hosting stories
4. **HTTPS**: Always serve your stories over HTTPS in production
5. **Review Dependencies**: Be aware that TwineSpace uses AFrame and AR.js, which have their own dependency chains

## Known Limitations

- **min-document vulnerability**: TwineSpace depends on AFrame, which includes min-document (used for server-side rendering). This package has a low-severity prototype pollution vulnerability but is not actively maintained. This does not affect browser-based usage of TwineSpace.

## Security Update Process

1. Security issues are triaged within 48 hours
2. Fixes are developed and tested
3. Security patches are released as minor or patch versions
4. Users are notified via GitHub releases and npm
5. Critical vulnerabilities will be disclosed after a patch is available

## Dependencies Security

We monitor our dependencies using:
- npm audit
- Dependabot automated updates
- GitHub Security Advisories
- Regular manual review

Current status: [![codecov](https://codecov.io/gh/videlais/twine-space/branch/main/graph/badge.svg?token=4CMUD2T89Q)](https://codecov.io/gh/videlais/twine-space)
