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

## Last Updated

Sprint 0 — reviewed and prepared for Sprint 1
