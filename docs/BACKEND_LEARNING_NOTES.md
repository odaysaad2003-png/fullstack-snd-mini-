# Backend Learning Notes — SND Mini

This file records backend engineering concepts learned during each sprint.
It grows with every sprint and becomes a personal reference guide.

---

## How to Use This File

After every backend sprint, add a new section here.
Include: what concept was introduced, why it matters, how it works in this project, and what to remember.

---

## Sprint 0 — Foundational Concepts

### Modular Monolith

A modular monolith is a single deployable application whose internal code is organized into feature-based modules. Each module owns its own routes, controller, service, model, and validation files.

**Key insight:** The separation of concerns exists inside the codebase, not across network boundaries. This is different from microservices where each feature is a separate service.

**Why it matters:** Most real applications start as monoliths. Understanding how to organize a monolith cleanly is a foundational skill. The patterns are the same whether you later extract modules into services or not.

---

### Request Lifecycle (Planned — to be verified in Sprint 1)

```
HTTP Request
  → Node.js HTTP server (server.ts)
  → Express app (app.ts)
  → Global middleware (Helmet, CORS, body parser, rate limiter)
  → API version prefix `/api/v1`
  → Router (module-level router)
  → Route-level middleware (auth check, validation)
  → Controller (reads req, calls service, sends res)
  → Service (business logic, database queries)
  → Mongoose Model (schema, query)
  → Database (MongoDB)
  → Response (JSON, standardized format)
```

---

### Why Separate Controller and Service?

**Controller** handles HTTP concerns:
- Read from `req.body`, `req.params`, `req.query`, `req.user`
- Call the appropriate service function
- Send the response with the right status code

**Service** handles business logic:
- Contains all the actual logic
- Calls the database
- Throws errors that the controller or error middleware catches
- Is testable in isolation (no HTTP dependencies)

**The key benefit:** You can test a service function by calling it directly, without spinning up an HTTP server. This makes tests faster and more focused.

---

### Centralized Error Handling

Express error handling middleware has 4 parameters: `(err, req, res, next)`.
All errors from controllers and services eventually flow to this one place.

**Why it matters:** Without centralized error handling, every route needs its own try/catch and its own error response logic. This leads to inconsistent error formats and duplicated code.

**Pattern:**
- Services throw custom error classes (`NotFoundError`, `ForbiddenError`, etc.)
- Controllers use try/catch and pass errors to `next(err)`
- The error middleware catches everything and returns a consistent JSON error response

---

### Environment Variables and Config Validation

Environment variables are the correct place for:
- Database connection strings
- JWT secrets
- API keys (Cloudinary, etc.)
- Port numbers
- Feature flags

**Why validate at startup?**
If `MONGODB_URI` is missing and the server starts anyway, the first database query will fail — but the server will appear healthy. Validating env vars with Zod at startup makes the server fail immediately with a clear error if misconfigured.

---

### Standard API Response Format

All API responses follow the same shape. This is important because:
- Frontend code can always know how to handle a response
- Error handling on the frontend is consistent
- API consumers can write predictable client code

```typescript
// Success
{ success: true, data: { ... }, message?: "..." }

// Error
{ success: false, error: { message: "...", code?: "..." } }
```

---

## Sprint 1 — Backend Foundation

*To be filled after Sprint 1 is complete.*

Expected concepts:

- Express app startup
- Difference between `server.ts` and `app.ts`
- Environment validation with Zod
- MongoDB connection lifecycle
- Centralized error handling
- Custom `AppError` class
- Async route wrapper
- Standard API response utilities
- Basic logger
- Health route at `/api/v1/health`

---

## Sprint 2 — Auth Module

*To be filled after Sprint 2 is complete.*

---

## Sprint 3 — Users Module

*To be filled after Sprint 3 is complete.*

---

## Sprint 4 — Listings Module

*To be filled after Sprint 4 is complete.*

---

## Sprint 5 — Image Upload

*To be filled after Sprint 5 is complete.*

---

## Sprint 6 — Admin Module

*To be filled after Sprint 6 is complete.*

---

## Sprint 7 — Testing

*To be filled after Sprint 7 is complete.*

---

## Reference: Key Backend Concepts

### Middleware
A function that runs between the request arriving and the controller running. Middleware can: modify the request, terminate early, or pass to the next middleware.

### Validation Middleware
Uses Zod to check request inputs. If invalid, returns 400 immediately. The controller never runs on invalid input.

### Auth Middleware
Reads the Authorization header, verifies the JWT, and attaches the decoded user payload to `req.user`. Protected routes use this middleware.

### Admin Middleware
Checks `req.user.role === 'admin'`. Always runs after auth middleware. Returns 403 if the user is not an admin.

### Error Middleware
The last middleware in the Express chain. Catches all errors passed via `next(err)` and returns a structured JSON error response.

### Rate Limiter Middleware
Counts requests per IP per time window. Returns 429 when the limit is exceeded.
