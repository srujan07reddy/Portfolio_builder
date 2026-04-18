# OWASP Top 10 Security Implementation & Testing Guide

## Portfolio Builder Security Hardening

This document covers all 10 OWASP vulnerabilities and how they've been addressed in the portfolio builder application.

---

## 1. Broken Access Control (BOLA - Broken Object Level Authorization)

### Vulnerability Description
Users could potentially access other users' portfolios if they guessed the owner_id or manipulated API requests.

### Implementation
```
✅ Fixed in: src/app/api/portfolio/route.ts
✅ Fixed in: src/app/[username]/page.tsx
✅ Fixed in: src/app/dashboard/page.tsx
```

### Security Controls
- **Session Verification**: All API routes verify user session before allowing access
- **Owner Verification**: Portfolio updates verify that authenticated user owns the portfolio
- **Public/Private Flag**: Database queries check `is_public` flag for public portfolio access
- **Middleware Protection**: Protected routes validated in middleware.ts

### Testing Steps

**Test 1.1: Unauthorized Access Prevention**
```bash
# Try accessing dashboard without login
curl http://localhost:3000/dashboard
# Expected: Redirects to /login

# Try accessing API without session
curl http://localhost:3000/api/portfolio
# Expected: 401 Unauthorized response
```

**Test 1.2: Own Portfolio Only Access**
```javascript
// In browser console - Try fetching another user's portfolio
const userId = "different-user-id"; // A different user ID
fetch("/api/portfolio?user_id=" + userId)
// Expected: Returns only current user's portfolio or error
```

**Test 1.3: Public Portfolio Access Control**
```bash
# Access public portfolio (should work)
curl http://localhost:3000/portfolio/any-public-username
# Expected: Shows portfolio if public=true

# Try accessing private portfolio via direct URL (should fail)
curl http://localhost:3000/portfolio/private-username
# Expected: 404 or "Portfolio not found"
```

---

## 2. Cryptographic Failures / Sensitive Data Exposure

### Vulnerability Description
Sensitive information exposed through error messages, logs, or unencrypted transmission.

### Implementation
```
✅ Fixed in: src/app/api/auth/login/route.ts
✅ Fixed in: src/app/api/auth/signup/route.ts
✅ Fixed in: middleware.ts
```

### Security Controls
- **Generic Error Messages**: "Invalid credentials" instead of "User not found" or "Wrong password"
- **HTTPS Only**: Secure flag set on cookies (enforced in production)
- **Security Headers**:
  - X-Frame-Options: DENY (prevent clickjacking)
  - X-Content-Type-Options: nosniff (prevent MIME sniffing)
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security: max-age=31536000 (HSTS)
- **Secure Cookies**: HttpOnly, Secure, SameSite=Strict flags

### Testing Steps

**Test 2.1: Generic Error Messages**
```bash
# Test with invalid email
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid@test.com","password":"SomePass123!"}'
# Expected: Generic "Invalid credentials" message

# Test with valid email but wrong password
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"WrongPass123!"}'
# Expected: Same generic "Invalid credentials" message
```

**Test 2.2: Security Headers**
```bash
curl -I http://localhost:3000/dashboard
# Expected output includes:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Strict-Transport-Security: max-age=31536000
```

**Test 2.3: Cookie Security**
```bash
curl -v http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"Pass123!"}'
# Check Set-Cookie header for: HttpOnly; Secure; SameSite=Strict
```

---

## 3. Injection Attacks (SQL Injection, NoSQL Injection)

### Vulnerability Description
Unsanitized user input could allow attackers to inject malicious code.

### Implementation
```
✅ Fixed in: src/lib/validation.ts (input validation)
✅ Fixed in: src/app/[username]/page.tsx (username sanitization)
✅ Fixed in: src/app/api/portfolio/route.ts (Zod validation)
```

### Security Controls
- **Zod Schema Validation**: All inputs validated against strict schemas
- **Input Sanitization**: HTML entities escaped, special characters removed
- **Supabase Protection**: Uses parameterized queries (safe from SQL injection)
- **Username Whitelist**: Only alphanumeric, hyphens, underscores allowed

### Testing Steps

**Test 3.1: SQL Injection Prevention**
```bash
# Try SQL injection in username
curl "http://localhost:3000/portfolio/admin' OR '1'='1"
# Expected: 404 or validation error (not database error)

# Try SQL injection in username
curl "http://localhost:3000/portfolio/'; DROP TABLE portfolios; --"
# Expected: Validation error or not found (database remains intact)
```

**Test 3.2: XSS Prevention via Input Validation**
```bash
# Try script injection in username
curl "http://localhost:3000/portfolio/<script>alert('xss')</script>"
# Expected: Validation error or sanitized output

# Try encoded XSS
curl "http://localhost:3000/portfolio/%3Cscript%3Ealert('xss')%3C%2Fscript%3E"
# Expected: Validation error or sanitized
```

**Test 3.3: Profile Input Validation**
```javascript
// Try invalid email format
fetch("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email: "not-an-email",
    password: "ValidPass123!"
  })
})
// Expected: Validation error

// Try password without special character
fetch("/api/auth/signup", {
  method: "POST",
  body: JSON.stringify({
    email: "user@test.com",
    password: "ValidPass123" // Missing special character
  })
})
// Expected: Error about password requirements
```

---

## 4. Broken Authentication

### Vulnerability Description
Weak password requirements, no rate limiting, session hijacking vulnerabilities.

### Implementation
```
✅ Fixed in: src/lib/rateLimit.ts (rate limiting)
✅ Fixed in: src/lib/validation.ts (password requirements)
✅ Fixed in: src/app/api/auth/login/route.ts
✅ Fixed in: src/app/api/auth/signup/route.ts
```

### Security Controls
- **Rate Limiting**:
  - Login: 5 attempts per 15 minutes
  - Signup: 3 attempts per hour
  - API: 100 requests per minute
- **Password Requirements**:
  - Minimum 12 characters
  - Must contain uppercase letters
  - Must contain lowercase letters
  - Must contain numbers
  - Must contain special characters (!@#$%^&*)
- **Session Management**:
  - HttpOnly cookies prevent JavaScript access
  - SameSite=Strict prevents CSRF
  - Secure flag enforces HTTPS in production

### Testing Steps

**Test 4.1: Brute Force Protection**
```bash
# Make 6 failed login attempts rapidly
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"user@test.com","password":"WrongPass123!"}'
  echo "Attempt $i"
done

# Expected: 
# First 5 attempts: "Invalid credentials"
# 6th attempt: 429 Too Many Requests
```

**Test 4.2: Password Strength Requirements**
```javascript
const testCases = [
  { password: "short", expected: "fail" }, // Too short
  { password: "nouppercase123!", expected: "fail" }, // No uppercase
  { password: "NOLOWERCASE123!", expected: "fail" }, // No lowercase
  { password: "NoNumbers!", expected: "fail" }, // No numbers
  { password: "NoSpecial123", expected: "fail" }, // No special char
  { password: "ValidPass123!", expected: "success" }, // Valid
];

testCases.forEach(async (test) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email: `test${Math.random()}@example.com`,
      password: test.password
    })
  });
  console.log(`${test.password}: ${response.status === 201 ? "success" : "fail"}`);
});
```

**Test 4.3: Session Validation**
```bash
# Get session token
LOGIN_TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"ValidPass123!"}' \
  | jq -r '.session.access_token')

# Try using token after logout
curl http://localhost:3000/api/portfolio \
  -H "Authorization: Bearer $LOGIN_TOKEN"
# Expected: 401 Unauthorized after logout
```

---

## 5. Cross-Site Scripting (XSS)

### Vulnerability Description
User-generated content rendered without sanitization could execute JavaScript.

### Implementation
```
✅ Fixed in: src/lib/validation.ts (sanitizeInput function)
✅ Fixed in: src/app/[username]/page.tsx (sanitize profile data)
✅ Fixed in: ResearcherTemplate.tsx (no direct HTML rendering)
```

### Security Controls
- **Output Encoding**: HTML entities escaped (&, <, >, ", ', /)
- **Input Sanitization**: All user inputs sanitized before storage
- **No Dangerous HTML**: Templates use React components (automatically escaped)
- **Content Security Policy**: Headers prevent inline script execution

### Testing Steps

**Test 5.1: Stored XSS Prevention**
```javascript
// Try storing XSS payload in profile
fetch("/api/portfolio", {
  method: "PUT",
  body: JSON.stringify({
    full_name: "<img src=x onerror='alert(\"XSS\")'>",
    username: "testuser",
    bio: "<script>alert('XSS')</script>",
    template_choice: "Researcher"
  })
});

// Then load the portfolio
fetch("/portfolio/testuser")
  .then(r => r.text())
  .then(html => console.log(html)) // Should show escaped HTML

// Expected: &lt;img ...&gt; in rendered output, no execution
```

**Test 5.2: Reflected XSS Prevention**
```bash
# Try XSS in URL parameter
curl "http://localhost:3000/portfolio/<img%20src=x%20onerror=alert(1)>"
# Expected: Page displays safely, no JavaScript execution
```

**Test 5.3: DOM-based XSS Prevention**
```javascript
// Open browser console and try to inject
document.querySelector('[data-bio]').innerHTML = "<script>alert('XSS')</script>";
// Expected: Rendered as text, not executed
```

---

## 6. CSRF (Cross-Site Request Forgery)

### Vulnerability Description
Attackers could perform unauthorized actions on behalf of users.

### Implementation
```
✅ Fixed in: middleware.ts (adds CSRF tokens to responses)
✅ Fixed in: src/lib/validation.ts (CSRF token verification)
```

### Security Controls
- **SameSite Cookies**: Strict mode prevents CSRF attacks
- **CSRF Tokens**: Generated and validated on state-changing operations
- **Origin Verification**: Middleware checks request origin
- **POST/PUT/DELETE Protection**: Only GET is safe, others require CSRF token

### Testing Steps

**Test 6.1: Cross-Origin Request Prevention**
```html
<!-- Create HTML file on different domain -->
<html>
  <body>
    <form action="http://localhost:3000/api/portfolio" method="POST">
      <input name="full_name" value="Hacked">
      <input name="username" value="hacked">
      <input type="submit">
    </form>
    <script>document.forms[0].submit();</script>
  </body>
</html>

<!-- Expected: Request blocked or fails without valid session -->
```

**Test 6.2: SameSite Cookie Testing**
```bash
# Make request from different origin
curl -b "session=fake-token" \
  -X PUT http://localhost:3000/api/portfolio \
  -H "Origin: http://evil.com" \
  -H "Content-Type: application/json"
# Expected: 401 or 403 response
```

---

## 7. Security Misconfiguration

### Vulnerability Description
Default credentials, unnecessary services, outdated libraries, missing security headers.

### Implementation
```
✅ Fixed in: middleware.ts (security headers)
✅ Fixed in: package.json (updated dependencies)
✅ Fixed in: next.config.ts (security settings)
```

### Security Controls
- **Security Headers**: 6 critical headers set via middleware
- **Dependency Updates**: Latest versions of all packages
- **No Debug Mode**: Environment variables properly set
- **HTTPS Enforcement**: Strict-Transport-Security header
- **Admin Paths Protected**: /admin routes require authentication

### Testing Steps

**Test 7.1: Missing Headers Detection**
```bash
curl -I http://localhost:3000/
# Verify all headers present:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Referrer-Policy: strict-origin-when-cross-origin
# Permissions-Policy: (restrictive policies)
# Strict-Transport-Security: max-age=31536000
```

**Test 7.2: Environment Variables Check**
```bash
# Verify no sensitive data in public files
grep -r "SUPABASE_SERVICE_ROLE_KEY" public/
# Expected: No results

# Check .env.local is not exposed
curl http://localhost:3000/.env.local
# Expected: 404 Not Found
```

---

## 8. Insecure Deserialization

### Vulnerability Description
Unsafe deserialization of untrusted data could lead to code execution.

### Implementation
```
✅ Fixed in: src/app/api/auth/login/route.ts (JSON parsing)
✅ Fixed in: src/app/api/auth/signup/route.ts (input validation)
✅ Fixed in: src/app/api/portfolio/route.ts (Zod validation)
```

### Security Controls
- **Zod Validation**: Strict schema validation before deserialization
- **Type Safety**: TypeScript prevents type-based attacks
- **No eval()**: Never using eval() or similar dangerous functions
- **Whitelist Deserialization**: Only known types accepted

### Testing Steps

**Test 8.1: Invalid JSON Handling**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d 'invalid json {]'
# Expected: 400 Bad Request
```

**Test 8.2: Prototype Pollution Prevention**
```javascript
fetch("/api/portfolio", {
  method: "PUT",
  body: JSON.stringify({
    "__proto__": { "admin": true },
    "full_name": "Hacker",
    "username": "hacker",
    "bio": "",
    "template_choice": "Researcher"
  })
})
// Expected: Normal update, no prototype pollution
```

---

## 9. Logging & Monitoring Failures

### Vulnerability Description
Insufficient logging makes it impossible to detect and investigate attacks.

### Implementation
```
✅ Implemented in: src/lib/securityLogger.ts
```

### Security Controls
- **Authentication Logs**: All login attempts logged with IP, timestamp
- **Access Control Logs**: Failed access attempts recorded
- **Data Access Logs**: Portfolio fetches tracked
- **Error Logs**: Application errors logged with context
- **Audit Trail**: Admin actions recorded with user and timestamp

### Testing Steps

**Test 9.1: Log Creation**
```javascript
// Check logs in application memory
import { securityLogger } from '@/lib/securityLogger';
const logs = securityLogger.getLogs();
console.log("Total logs:", logs.length);

// Filter critical logs
const criticalLogs = securityLogger.getLogs({ severity: 'critical' });
console.log("Critical events:", criticalLogs);

// Check specific event logs
const authLogs = securityLogger.getLogs({ event: 'AUTH_ATTEMPT' });
console.log("Auth attempts:", authLogs);
```

**Test 9.2: Log Persistence**
```bash
# In production, logs should be sent to monitoring service
# Verify by checking server logs or monitoring dashboard
# Expected: Logs appear with proper severity levels and timestamps
```

---

## 10. XML External Entity (XXE) Prevention

### Vulnerability Description
While this app doesn't parse XML, XXE risks are minimized through input validation and Content-Type checking.

### Implementation
```
✅ Fixed in: middleware.ts (Content-Type validation)
✅ Fixed in: API routes (JSON-only acceptance)
```

### Security Controls
- **JSON Only**: API only accepts application/json Content-Type
- **No XML Parsing**: No XML parsing libraries used
- **Type Validation**: Zod schemas enforce JSON structure
- **Request Size Limits**: Prevent billion laughs attacks

### Testing Steps

**Test 10.1: XML Rejection**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/xml" \
  -d '<?xml version="1.0"?><email>user@test.com</email>'
# Expected: 400 Bad Request (Content-Type not allowed)
```

**Test 10.2: XXE Payload Rejection**
```bash
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "<!DOCTYPE foo [<!ENTITY xxe \"text\">]>",
    "username": "test",
    "bio": "&xxe;",
    "template_choice": "Researcher"
  }'
# Expected: 400 Validation error
```

---

## Additional Security Features

### Rate Limiting Implementation

```javascript
// src/lib/rateLimit.ts
Rate limits are enforced on:
- Login: 5 attempts per 15 minutes (prevents brute force)
- Signup: 3 attempts per hour (prevents account creation spam)
- API: 100 requests per minute (prevents DoS)
```

### Security Headers

```
Middleware.ts adds:
- X-Frame-Options: DENY (prevents clickjacking)
- X-Content-Type-Options: nosniff (prevents MIME sniffing)
- X-XSS-Protection: 1; mode=block (browser XSS filter)
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: (restrictive feature access)
- Strict-Transport-Security: max-age=31536000 (HSTS)
```

### Database Security Checklist

```
Required Supabase Configuration:

1. Row-Level Security (RLS) Policies:
   ✅ portfolios table: Only owner can view/edit private portfolios
   ✅ portfolios table: Anyone can view public portfolios
   ✅ auth.users: Users can only view own email

2. Database Columns:
   ✅ Add is_public boolean (default: false)
   ✅ owner_id UUID foreign key to auth.users
   ✅ created_at timestamp
   ✅ updated_at timestamp

3. Indexes:
   ✅ owner_id index for faster lookups
   ✅ username index for public portfolio access
   ✅ is_public index for filtering
```

---

## Deployment Security Checklist

```
Before deploying to production:

□ Set SUPABASE_SERVICE_ROLE_KEY in environment variables
□ Enable HTTPS on hosting platform (Vercel/Netlify)
□ Set NODE_ENV=production
□ Configure rate limiting with Redis (not in-memory)
□ Set up error monitoring (Sentry, LogRocket)
□ Enable database backups
□ Review and test all security headers
□ Implement WAF rules if applicable
□ Set up monitoring for suspicious activity
□ Document incident response procedures
□ Perform security audit before launch
□ Enable security logging to external service
```

---

## Testing Commands Summary

```bash
# Full security test suite
npm run build
npm start

# Then run in separate terminal:

# 1. Test authentication
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"TestPass123!"}'

# 2. Test rate limiting
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"WrongPass123!"}'
done

# 3. Test injection prevention
curl "http://localhost:3000/portfolio/<img%20src=x%20onerror=alert(1)>"

# 4. Test security headers
curl -I http://localhost:3000/dashboard

# 5. Test XSS protection
curl "http://localhost:3000/portfolio/testuser'; DROP TABLE portfolios; --"
```

---

## Conclusion

This Portfolio Builder application now implements comprehensive security protections against all OWASP Top 10 vulnerabilities. All user inputs are validated, sensitive data is protected, and access control is enforced at multiple layers.

**Key Security Achievements:**
✅ Broken Access Control - Fixed with middleware and API validation
✅ Cryptographic Failures - Fixed with secure headers and generic errors
✅ Injection - Fixed with input validation and sanitization
✅ Broken Authentication - Fixed with rate limiting and strong passwords
✅ XSS - Fixed with output encoding and sanitization
✅ CSRF - Fixed with SameSite cookies and token validation
✅ Security Misconfiguration - Fixed with security headers
✅ Insecure Deserialization - Fixed with Zod validation
✅ Logging & Monitoring - Implemented with security logger
✅ XXE - Fixed by rejecting non-JSON requests

For ongoing security, regularly:
- Update dependencies
- Review security logs
- Conduct penetration testing
- Update rate limiting rules based on actual usage
- Monitor for new vulnerabilities in dependencies