# Architecture — SND Mini

---

## Architecture Style: Modular Monolith

SND Mini uses a **modular monolith** architecture. This means:

- One backend application, one deployment unit
- Internally organized into feature modules (health, auth, users, listings, images, favorites, reports, admin)
- Each module owns its routes, controller, service, model, and validation
- Modules do not call each other's routes — they can share services or utilities directly

### Why Not Microservices?

Microservices add significant overhead: distributed tracing, inter-service networking, deployment complexity, and operational burden. For a learning project at this scale, a modular monolith is the correct choice. It teaches the same separation of concerns without the infrastructure complexity.

The codebase is structured so that if modules ever needed to be extracted into separate services, the separation is already there.

---

## Layer Separation

Every feature module follows the same layer pattern:

```
Request
  → Route (express router — no logic)
  → Middleware (auth check, validation, rate limit)
  → Controller (receives request, calls service, sends response)
  → Service (business logic, database queries)
  → Model (Mongoose schema)
  → Response (standardized JSON)
```

**Rules:**
- Routes only define HTTP methods and paths, and apply middleware
- Controllers only handle HTTP concerns (read req, call service, write res)
- Services contain all business logic
- Models define the database schema
- No business logic lives in routes or models

---

## Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts              # Validated environment config
│   │   ├── db.ts               # MongoDB connection
│   │   └── cloudinary.ts       # Cloudinary SDK setup
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── listings/
│   │   ├── images/
│   │   ├── favorites/
│   │   ├── reports/
│   │   └── admin/
│   ├── routes/
│   │   └── health.routes.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── admin.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── rateLimiter.middleware.ts
│   │   └── upload.middleware.ts
│   ├── utils/
│   │   ├── response.util.ts
│   │   ├── app-error.ts
│   │   ├── async-handler.ts
│   │   ├── logger.ts
│   │   ├── token.util.ts
│   │   ├── hash.util.ts
│   │   └── cloudinary.util.ts
│   ├── types/
│   │   └── express.d.ts
│   ├── app.ts
│   └── server.ts
├── tests/
└── ...
```

---

## Frontend Structure

```
frontend/
├── src/
│   ├── app/[locale]/         # Next.js App Router with locale segment
│   ├── components/           # Shared and feature-specific components
│   ├── features/             # API calls and hooks per feature
│   ├── lib/                  # Axios, query client, utilities
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── messages/             # i18n translation files
└── ...
```

---

## Authentication Architecture

### Access Token
- Format: JWT
- Lifetime: 15 minutes
- Stored: memory (in the frontend app, not localStorage)
- Sent: Authorization header as `Bearer <token>`

### Refresh Token
- Format: JWT (different secret)
- Lifetime: 7 days
- Stored: httpOnly cookie (not accessible from JavaScript)
- Also stored in the database for revocation support

### Token Rotation
- Every time a refresh token is used to get a new access token, the old refresh token is deleted from the database and a new one is issued
- This prevents refresh token reuse attacks

### Logout
- Delete the refresh token record from the database
- Clear the httpOnly cookie
- The access token expires naturally (15 min)

---

## Image Upload Architecture

1. Frontend sends multipart form data to `/api/v1/images/upload`
2. Multer middleware receives the file in memory (not disk)
3. The image is streamed directly to Cloudinary
4. Cloudinary returns a secure URL and public ID
5. The URL and public ID are stored in the listing document
6. On listing deletion, the image is also deleted from Cloudinary using the public ID

**Why Cloudinary from the start?**
Storing images locally on the server is not production-safe (images are lost on server restart/redeploy). Cloudinary teaches the real pattern used in production systems.

---

## Admin Architecture

Admin is a role on the User model (`role: 'user' | 'admin'`).

Admin routes are protected by two middlewares in sequence:
1. `authMiddleware` — verifies the access token
2. `adminMiddleware` — checks `req.user.role === 'admin'`

Admin capabilities in v1:
- View all users
- View all listings
- Delete any listing
- Deactivate any user account
- View basic platform statistics

---

## API Response Format

All API responses follow this consistent format:

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "code": "OPTIONAL_ERROR_CODE"
  }
}
```

---

## Environment Configuration

Environment variables are validated at startup using Zod. If a required variable is missing, the server refuses to start. This prevents silent failures in production.

```
NODE_ENV
PORT
MONGODB_URI
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
JWT_ACCESS_EXPIRES_IN
JWT_REFRESH_EXPIRES_IN
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CLIENT_ORIGIN
```

---

## Security Architecture

| Concern | Solution |
|---|---|
| SQL/NoSQL injection | Mongoose parameterized queries |
| XSS | Helmet + input sanitization |
| CSRF | httpOnly cookie + origin check |
| BOLA | Ownership check in service layer |
| Brute force | express-rate-limit on auth routes |
| Password exposure | bcrypt/argon2 hashing, never returned in responses |
| Token theft | Short-lived access tokens, httpOnly refresh cookie |
| Secret exposure | Environment variables only |

---

## Testing Architecture

- **Unit tests:** Service functions, utility functions
- **Integration tests:** Routes + controllers + database (using test database)
- **Framework:** Jest + Supertest
- **Database:** Separate test MongoDB instance or in-memory MongoDB
- **Coverage target:** Auth module 100%, other modules key paths

---

## i18n Architecture

- Frontend uses `next-intl` with a `[locale]` route segment
- Supported locales: `en` (English, LTR), `ar` (Arabic, RTL)
- All UI strings live in `messages/en.json` and `messages/ar.json`
- The `dir` attribute on the HTML element switches between `ltr` and `rtl`
- Backend API returns field names in English; display translations happen on the frontend

---

## Deployment Plan (future)

- Backend: Railway or Render (Node.js server)
- Frontend: Vercel (Next.js)
- Database: MongoDB Atlas
- Images: Cloudinary (already cloud-native)
- Environment variables: injected via hosting platform secrets

Not a current concern for v1 development.


---

## API Versioning Rule

All backend routes use `/api/v1` as the base path. Sprint 1 starts with:

```txt
GET /api/v1/health
```

Future modules follow the same pattern:

```txt
/api/v1/auth
/api/v1/users
/api/v1/listings
/api/v1/images
/api/v1/favorites
/api/v1/reports
/api/v1/admin
```

This keeps the API stable if a future `/api/v2` is introduced.
