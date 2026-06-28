# Security Rules — SND Mini

This document defines the security rules that apply to every sprint.
Every rule here must be respected during implementation and code review.

---

## Core Principles

1. **Never trust the client.** Validate all inputs on the server.
2. **Principle of least privilege.** Users can only do what they are explicitly allowed to do.
3. **Defense in depth.** Apply security at multiple layers, not just at one point.
4. **Fail securely.** When something goes wrong, default to denying access.
5. **No secrets in code.** All secrets live in environment variables.

---

## Authentication Security

### Passwords
- Passwords must be hashed using bcrypt (cost factor ≥ 12) or argon2
- The plain-text password must never be logged or stored
- The password hash must never be returned in any API response
- Use `.select('-password')` on every Mongoose query that returns a user

### Access Tokens (JWT)
- Short lifetime: 15 minutes
- Signed with a strong secret (at least 32 random characters)
- Never stored in localStorage — kept in memory on the frontend
- Verified on every protected route using the `authMiddleware`
- Contain: `userId`, `role`, `iat`, `exp` — nothing sensitive

### Refresh Tokens
- Longer lifetime: 7 days
- Stored as an httpOnly, Secure, SameSite=Strict cookie
- Also stored in the database for revocation
- Rotated on every use (old token deleted, new one issued)
- Expired tokens cleaned up by MongoDB TTL index

### Token Security Checklist
- [ ] Access token secret is stored in `JWT_ACCESS_SECRET` env var
- [ ] Refresh token secret is stored in `JWT_REFRESH_SECRET` env var
- [ ] Refresh token cookie is httpOnly
- [ ] Refresh token cookie is Secure in production
- [ ] Refresh token cookie is SameSite=Strict
- [ ] Token rotation is implemented on every refresh
- [ ] Logout deletes the token from the database

---

## Authorization Security

### BOLA (Broken Object Level Authorization)
BOLA is the #1 API security vulnerability. It happens when a user can access another user's resource by simply knowing or guessing the resource ID.

**Prevention pattern:**
Every service function that reads, updates, or deletes a resource must check:
```typescript
if (listing.seller.toString() !== requestingUserId) {
  throw new ForbiddenError('You do not own this listing');
}
```

This check must be in the **service layer**, not the route.

### Role-Based Access
- Admin routes are protected by `adminMiddleware` which checks `req.user.role === 'admin'`
- Admin middleware always runs after `authMiddleware`
- Never check role inside a controller — use dedicated middleware

---

## Input Validation

- All request body, query, and params are validated using Zod
- Validation happens in `validate.middleware.ts` before the controller runs
- Invalid requests are rejected with a 400 response before reaching business logic
- Zod schemas are defined per module in `*.validation.ts` files
- Never use `req.body` directly in a controller without validation middleware applied

---

## HTTP Security

### Helmet
Helmet sets secure HTTP headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Content-Security-Policy`
- `Strict-Transport-Security` (HSTS)
- Removes `X-Powered-By: Express`

Helmet is applied globally in `app.ts`.

### CORS
- CORS is configured with an explicit origin allowlist from `CLIENT_ORIGIN` env var
- Credentials are allowed (for the cookie)
- Only allowed HTTP methods and headers are specified
- Not set to `origin: '*'` in production

### Rate Limiting
Applied on sensitive routes:
- `POST /api/v1/auth/login` — 10 requests per 15 minutes per IP
- `POST /api/v1/auth/register` — 5 requests per hour per IP
- `POST /api/v1/auth/refresh` — 20 requests per 15 minutes per IP

Applied globally:
- 100 requests per 15 minutes per IP for all other routes

---

## Data Exposure

- Never return the `password` field in any user response
- Never return the `token` field from the refreshTokens collection
- Listings return the seller's `_id` and `name` only — not their email or password
- Admin endpoints may return more user data but still never passwords

### Mongoose Response Sanitization
```typescript
// In the User model
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};
```

---

## File Upload Security

- Multer is configured with file size limits (e.g. 5MB max)
- Only image MIME types are allowed: `image/jpeg`, `image/png`, `image/webp`
- Files are processed in memory and sent to Cloudinary — not written to disk
- The Multer `fileFilter` function rejects non-image files before they reach the controller

---

## Environment Variables

Required vars and what happens if missing:
- The `config/env.ts` module validates all required env vars at startup using Zod
- If any required var is missing, the server throws an error and exits
- `.env` is never committed to Git — only `.env.example` with placeholder values

---

## NoSQL Injection

MongoDB with Mongoose and properly typed inputs is not vulnerable to classic injection. However:
- Never pass raw `req.body` directly as a MongoDB query filter
- Validate and transform inputs through Zod before using them in queries
- Be careful with `$where` queries — not used in this project

---

## Security Checklist — Per Sprint

Before closing any sprint, check:

- [ ] No secrets in code
- [ ] Passwords are hashed
- [ ] Passwords are never returned in responses
- [ ] All routes have correct middleware (auth, admin, validation)
- [ ] Ownership is checked before mutations
- [ ] Input validation is applied to all request fields
- [ ] File uploads have size and type limits
- [ ] Rate limiting is applied to auth routes
- [ ] Error messages do not leak internal implementation details
- [ ] No console.log of sensitive data

---

## What Can Go Wrong — Common Mistakes

| Mistake | Consequence | Prevention |
|---|---|---|
| Returning password hash | Password cracking | `.select('-password')` |
| Not checking ownership | User A deletes User B's listing | Service-layer ownership check |
| JWT secret too weak | Token forgery | Strong random secret in env |
| No rate limit on login | Brute force attack | express-rate-limit |
| Access token in localStorage | XSS token theft | Keep in memory |
| Refresh token not rotated | Token reuse attack | Rotate on every use |
| CORS set to `*` | CSRF from any origin | Explicit origin allowlist |
| Raw `req.body` in queries | NoSQL injection | Zod validation first |
| Plain text password in logs | Password exposure | Never log passwords |
