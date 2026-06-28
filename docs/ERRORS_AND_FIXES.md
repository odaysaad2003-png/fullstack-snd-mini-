# Errors and Fixes — SND Mini

This file records significant errors encountered during development, why they happened, and how they were fixed.
Use this as a reference when the same error appears again.

---

## How to Use This File

When you encounter an error:
1. Record the error message
2. Record which sprint / file it occurred in
3. Record why it happened
4. Record how it was fixed
5. Record what to do to prevent it in the future

---

## Sprint 0 — No Errors

Sprint 0 is documentation only. No code was written.

---

## Template Entry

```
## ERR-XXX — Short Title

**Sprint:** N
**File:** path/to/file.ts
**Error message:**
```
Paste the error message here
```

**Why it happened:**
Explanation of the root cause.

**How it was fixed:**
The change that resolved the error.

**How to prevent it:**
The rule or habit to avoid this in the future.
```

---

## Common Error Categories to Watch For

### TypeScript Errors
- Using `any` implicitly
- Accessing properties on a possibly null value without checking
- Passing wrong types to Mongoose model constructors
- Missing return types on async functions

### Mongoose Errors
- `CastError` — trying to use an invalid ObjectId
- `ValidationError` — document failed Mongoose schema validation
- `MongoServerError: E11000` — duplicate key (unique field constraint violation)
- `populate()` returning null when referenced document was deleted

### JWT Errors
- `JsonWebTokenError: invalid signature` — wrong secret used to verify
- `TokenExpiredError` — access token has expired (expected, handle gracefully)
- `JsonWebTokenError: jwt malformed` — token string is corrupted or truncated

### Express Errors
- Middleware order matters — auth middleware must run before admin middleware
- `Cannot set headers after they are sent` — sending a response twice in a handler
- Unhandled promise rejections from async route handlers without try/catch

### Environment Errors
- Server starts but crashes on first DB operation — `MONGODB_URI` not set
- JWT sign fails — secret is undefined because env var is misspelled
- Cloudinary upload fails — credentials not set or invalid

### Zod Errors
- `ZodError` in validation middleware — client sent invalid data (this is expected and handled)
- Schema mismatch between Zod and Mongoose — enum values differ

### Frontend Errors
- TanStack Query stale data after mutation — missing `queryClient.invalidateQueries`
- RTL layout broken — used `ml-` instead of `ms-`
- Form not submitting — forgot to connect `handleSubmit` from React Hook Form

---

*Entries will be added as errors are encountered during development.*
