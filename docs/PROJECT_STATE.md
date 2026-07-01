# PROJECT_STATE.md — SND Mini

This file is the **source of truth** for the current state of the project.
Update this file at the end of every sprint.

---

## Current Sprint

**Sprint 0 — Project Planning, Architecture, and Documentation**  
**Status:** ✅ Complete and reviewed

---

## Overall Progress

| Area | Status |
|---|---|
| Project planning | ✅ Done |
| Architecture defined | ✅ Done |
| Documentation created | ✅ Done |
| Sprint 0 senior review | ✅ Done |
| Backend — Project setup | ⬜ Not started |
| Backend — Database connection | ⬜ Not started |
| Backend — Auth module | ⬜ Not started |
| Backend — Refresh token system | ⬜ Not started |
| Backend — Users module | ⬜ Not started |
| Backend — Listings module | ⬜ Not started |
| Backend — Image upload | ⬜ Not started |
| Backend — Favorites and reports | ⬜ Not started |
| Backend — Admin module | ⬜ Not started |
| Backend — Tests | ⬜ Not started |
| Frontend — Project setup | ⬜ Not started |
| Frontend — Auth UI | ⬜ Not started |
| Frontend — Listings UI | ⬜ Not started |
| Frontend — Admin UI | ⬜ Not started |
| Frontend — i18n | ⬜ Not started |
| Deployment | ⬜ Not started |

---

## Sprint History

| Sprint | Name | Status |
|---|---|---|
| Sprint 0 | Project Planning and Documentation | ✅ Complete and reviewed |

---

## What Exists Right Now

- Documentation files created
- Architecture defined
- Folder structures defined
- Database collections planned
- API contracts planned
- Security rules documented
- AI workflow documented
- Code review checklist documented
- UI/UX direction documented
- No application code has been written yet

---

## Confirmed Naming and API Conventions

| Convention | Decision |
|---|---|
| API base path | `/api/v1` |
| Technical domain name | `listings`, not `posts` |
| User-facing Arabic label | إعلانات / منشورات حسب السياق |
| Architecture | Modular monolith |
| Backend first | Yes — backend depth before frontend |
| Code generation style | Plan first, then implement file by file |

---

## Planned Backend Modules

| Module | Status | Notes |
|---|---|---|
| Health | ⬜ Sprint 1 | Used to verify server and database status |
| Auth | ⬜ Future sprint | Register, login, access token |
| Refresh tokens | ⬜ Future sprint | httpOnly cookie, rotation, logout |
| Users | ⬜ Future sprint | Profile, update, delete account |
| Listings | ⬜ Future sprint | Marketplace listings CRUD |
| Images | ⬜ Future sprint | Multer + Cloudinary uploads |
| Favorites | ⬜ Future sprint | Save/unsave listings |
| Reports | ⬜ Future sprint | Report inappropriate listings |
| Admin | ⬜ Future sprint | Moderation and management |
| Audit logs | ⬜ Future sprint | Track sensitive admin actions |

---

## What Comes Next

**Sprint 1 — Backend Foundation**

Goal: Initialize the backend project with TypeScript, Express, MongoDB connection, environment validation, centralized error handling, standard API response utilities, a health route, a basic logger, and clean startup structure.

Sprint 1 must not implement auth, users, listings CRUD, images, favorites, reports, or admin features.

Expected files:

- `backend/package.json`
- `backend/tsconfig.json`
- `backend/.env.example`
- `backend/src/server.ts`
- `backend/src/app.ts`
- `backend/src/config/env.ts`
- `backend/src/config/db.ts`
- `backend/src/routes/health.routes.ts`
- `backend/src/middlewares/error.middleware.ts`
- `backend/src/utils/app-error.ts`
- `backend/src/utils/async-handler.ts`
- `backend/src/utils/response.util.ts`
- `backend/src/utils/logger.ts`

Expected endpoint:

```txt
GET /api/v1/health
```

---

## Known Issues

None yet.

---

## Key Decisions Made

| Decision | Reason |
|---|---|
| Modular monolith | Simpler to build, test, and understand for a learning project |
| MongoDB | Flexible schema, good for classifieds with varying listing structures |
| JWT + refresh tokens | Industry standard for stateless auth with session management |
| Cloudinary for v1 uploads | Avoid local file storage and teach production upload architecture |
| Zod for validation | Runtime safety, TypeScript integration, composable schemas |
| `/api/v1` base path | Supports future API versioning without breaking old clients |
| `listings` terminology | More accurate for a classifieds marketplace than `posts` |
| Favorites/reports planned | Part of v1 scope, but not part of Sprint 1 |
| Argon2 or bcrypt | Both are acceptable; final choice will be made in the auth sprint |

---

## Environment Variables Required Later

Sprint 1 should create `.env.example`, but real secrets must never be committed.

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/snd-mini
JWT_ACCESS_SECRET=replace_with_strong_access_secret
JWT_REFRESH_SECRET=replace_with_strong_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=replace_with_cloudinary_cloud_name
CLOUDINARY_API_KEY=replace_with_cloudinary_api_key
CLOUDINARY_API_SECRET=replace_with_cloudinary_api_secret
CLIENT_ORIGIN=http://localhost:3000
```

---

## Documentation Update Rule

At the end of every sprint, update at minimum:

- `docs/PROJECT_STATE.md`
- `docs/SPRINT_LOG.md`
- `docs/BACKEND_LEARNING_NOTES.md` when backend work exists
- `docs/DATABASE_LEARNING_NOTES.md` when database work exists
- `docs/FRONTEND_QUALITY_GUIDE.md` or frontend notes when frontend work exists
- `docs/DECISIONS.md` when a decision is made
- `docs/ERRORS_AND_FIXES.md` when an error happens
- `docs/CHAT_HANDOFF.md` so future chats keep full context

---

# SND Mini Backend — PROJECT STATE

## Current Date

2026-06-29

## Project

SND Mini Backend API

## Stack

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Zod Validation
* Helmet
* CORS
* Rate Limiting
* Centralized Error Middleware
* Standard Response Utility

---

## Current Working Status

The backend server is running successfully.

Confirmed terminal output:

```text
MongoDB connected
Server running on port 5000 [development]
```

TypeScript check passed successfully:

```powershell
npx tsc --noEmit
```

No TypeScript errors were reported.

---

## Completed Backend Foundation

The following base infrastructure is completed and working:

* Express app setup
* TypeScript project setup
* Environment variable configuration
* MongoDB Atlas connection
* Centralized logger
* Centralized error middleware
* Standard response utility
* Global rate limiter
* Helmet security middleware
* CORS configuration
* JSON body parser
* URL-encoded body parser
* Health route
* System status route
* 404 route fallback

---

## Important `app.ts` Status

The Auth router is now mounted correctly in `app.ts`.

Current API route mounts include:

```ts
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/system/status", routersystem);
app.use("/api/v1/auth", authRouter);
```

This fixed the previous `ROUTE_NOT_FOUND` issue for Auth endpoints.

---

## Completed Auth Module

The Auth module is completed and manually tested.

Relevant files:

```text
src/modules/auth/auth.routes.ts
src/modules/auth/auth.controller.ts
src/modules/auth/auth.service.ts
src/modules/auth/auth.validation.ts
src/middlewares/auth.middleware.ts
src/models/user.model.ts
```

Implemented endpoints:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

---

## Auth Flow Status

### Register

Endpoint:

```text
POST /api/v1/auth/register
```

Status:

* Creates a new user successfully
* Validates input
* Rejects duplicate email
* Hashes password before saving
* Returns user data without password
* Returns accessToken

Confirmed response example:

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "6a4280b456fa598b3835066c",
      "name": "Oday Test",
      "email": "oday.test1@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2026-06-29T14:27:00.600Z"
    },
    "accessToken": "JWT_ACCESS_TOKEN"
  },
  "message": "Account created successfully"
}
```

---

### Duplicate Register

Endpoint:

```text
POST /api/v1/auth/register
```

Status:

* Rejects duplicate emails successfully

Confirmed response:

```json
{
  "success": false,
  "error": {
    "message": "Email is already in use"
  }
}
```

---

### Login

Endpoint:

```text
POST /api/v1/auth/login
```

Status:

* Login works with valid credentials
* Returns user data without password
* Returns accessToken
* Rejects invalid password
* Rejects non-existing email using the same generic security message

Confirmed success response:

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "6a4280b456fa598b3835066c",
      "name": "Oday Test",
      "email": "oday.test1@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2026-06-29T14:27:00.600Z"
    },
    "accessToken": "JWT_ACCESS_TOKEN"
  },
  "message": "Logged in successfully"
}
```

Confirmed invalid credentials response:

```json
{
  "success": false,
  "error": {
    "message": "Invalid email or password"
  }
}
```

---

### Get Current User

Endpoint:

```text
GET /api/v1/auth/me
```

Status:

* Protected by auth middleware
* Requires Bearer token
* Returns current authenticated user
* Rejects missing token

Confirmed success response:

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "6a4280b456fa598b3835066c",
      "name": "Oday Test",
      "email": "oday.test1@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2026-06-29T14:27:00.600Z"
    }
  },
  "message": "User fetched successfully"
}
```

Confirmed missing token response:

```json
{
  "success": false,
  "error": {
    "message": "Authentication required"
  }
}
```

---

## Postman Testing Status

Manual API testing has been completed for:

* Register user
* Duplicate email
* Login valid user
* Login wrong password
* Login email not found
* Get current user with token
* Get current user without token
* Register validation errors

Recommended Postman environment variables:

```text
baseUrl = http://localhost:5000/api/v1
token = JWT_ACCESS_TOKEN
```

Recommended Auth requests:

```text
POST {{baseUrl}}/auth/register
POST {{baseUrl}}/auth/login
GET  {{baseUrl}}/auth/me
```

---

## Current Learning Checkpoint

The request lifecycle is now understood at a practical level:

```text
Postman
  ↓
Express app
  ↓
Global middleware
  ↓
Route mount in app.ts
  ↓
Module router
  ↓
Validation middleware
  ↓
Controller
  ↓
Service
  ↓
Mongoose model
  ↓
MongoDB Atlas
  ↓
Response utility
  ↓
Postman response
```

---

## Current Project Quality

The Auth module is stable enough to move forward.

Before moving to a production-ready version, future improvements may include:

* Add consistent error codes to all errors
* Add refresh token support
* Add logout support
* Add password reset flow
* Add email verification
* Add stronger role-based authorization
* Add automated tests with Jest or Vitest
* Add Swagger/OpenAPI documentation

These are not required before Sprint 3.

---

## Next Sprint

Sprint 3 should start after committing the current stable Auth state.

Recommended Sprint 3:

User Profile & Account Module

Main goals:

* Create a user/profile module
* Allow authenticated user to fetch profile
* Allow authenticated user to update profile
* Add password change endpoint
* Add account status checks
* Improve authorization structure for future modules


# PROJECT_STATE.md

## Current Status

SND Mini Backend has completed the Auth + Users foundation.

### Completed

- Backend setup with Node.js, Express, TypeScript.
- Environment validation using Zod.
- MongoDB Atlas connection using Mongoose.
- Centralized error handling.
- AppError utility.
- asyncHandler utility.
- Auth module:
  - Register
  - Login
  - Password hashing
  - JWT access token generation
- Users module:
  - Get my profile
  - Update my profile
  - Change my password
- Auth middleware:
  - Bearer token extraction
  - JWT verification
  - Expired token handling
  - Invalid token handling
  - User existence check
- Postman testing completed successfully for Auth and Users endpoints.

### Verified Manually

- Register works.
- Duplicate email is rejected.
- Login works.
- Protected profile endpoint works with valid token.
- Protected endpoints reject missing token.
- Protected endpoints reject invalid token.
- Profile update works.
- Password change works.
- Old password no longer works after password change.
- New password works after password change.
- Wrong current password is rejected.

### Known History

- MongoDB Atlas DNS/SRV connection issues occurred earlier.
- Network connectivity to MongoDB shard was later confirmed successfully using PowerShell Test-NetConnection.
- Endpoints were tested after connection was restored.

### Next Recommended Sprint

Sprint 4 should focus on connecting the Backend to a real Frontend Auth flow, so the user can learn the complete Full Stack request lifecycle.
