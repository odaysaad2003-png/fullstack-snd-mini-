# Sprint Log — SND Mini

This file records every completed sprint, what was built, what was learned, and the Git commit reference.

---

## Sprint 0 — Project Planning and Documentation

**Status:** ✅ Complete and reviewed
**Date:** Sprint 0
**Goal:** Establish project foundation — architecture, documentation, decisions, and learning system before any code is written.

### Completed

- Defined MVP scope and v1 non-goals
- Designed modular monolith architecture
- Defined backend and frontend folder structures
- Defined database collections and planned favorites, reports, and audit logs
- Defined full API contract with `/api/v1` versioning
- Defined authentication and refresh token strategy
- Defined Cloudinary upload strategy
- Defined admin dashboard scope
- Defined i18n strategy (Arabic + English, RTL + LTR)
- Defined security rules and checklist
- Defined testing strategy
- Defined sprint workflow and acceptance criteria
- Created all documentation files

### Files Created

- README.md
- docs/AI_PROJECT_CONTEXT.md
- docs/PROJECT_STATE.md
- docs/ARCHITECTURE.md
- docs/API_CONTRACT.md
- docs/DATABASE_DESIGN.md
- docs/SECURITY_RULES.md
- docs/SPRINT_LOG.md
- docs/DECISIONS.md
- docs/AI_WORKFLOW.md
- docs/BACKEND_LEARNING_NOTES.md
- docs/DATABASE_LEARNING_NOTES.md
- docs/FRONTEND_QUALITY_GUIDE.md
- docs/UI_UX_DIRECTION.md
- docs/CODE_REVIEW_CHECKLIST.md
- docs/ERRORS_AND_FIXES.md
- docs/CHAT_HANDOFF.md

### Key Decisions

- Modular monolith over microservices
- MongoDB for flexible listing schema
- JWT with httpOnly cookie refresh tokens
- Cloudinary for v1 uploads
- Zod for runtime validation

### Git Commit

```
feat: sprint 0 — project planning, architecture, and documentation
```

---

## Sprint 1 — Backend Foundation

**Status:** ⬜ Not started
**Goal:** Initialize the Express + TypeScript backend with environment validation, MongoDB connection, centralized error handling, standard API response utilities, basic logger, and `/api/v1/health` endpoint.

---

## Sprint 2 — Auth Module

**Status:** ⬜ Not started
**Goal:** Implement user registration, login, token refresh, and logout with full security.

---

## Sprint 3 — Users Module

**Status:** ⬜ Not started
**Goal:** Implement user profile read, update, and account deletion.

---

## Sprint 4 — Listings Module

**Status:** ⬜ Not started
**Goal:** Implement listing CRUD with ownership checks, pagination, and search.

---

## Sprint 5 — Image Upload

**Status:** ⬜ Not started
**Goal:** Implement Multer + Cloudinary image upload and deletion.

---

## Sprint 6 — Admin Module

**Status:** ⬜ Not started
**Goal:** Implement admin dashboard backend (stats, user management, listing management).

---

## Sprint 7 — Backend Testing

**Status:** ⬜ Not started
**Goal:** Write comprehensive tests for auth, users, and listings modules.

---

## Sprint 8 — Frontend Setup

**Status:** ⬜ Not started
**Goal:** Initialize Next.js frontend with TypeScript, Tailwind, shadcn/ui, i18n, and TanStack Query.

---

## Sprint 9 — Auth UI

**Status:** ⬜ Not started
**Goal:** Build login and registration pages with React Hook Form, Zod, and TanStack Query.

---

## Sprint 10 — Listings UI

**Status:** ⬜ Not started
**Goal:** Build public listing feed, listing detail page, and create listing form.

---

## Sprint 11 — User Profile UI

**Status:** ⬜ Not started
**Goal:** Build profile page with user's listings, account settings, and delete account flow.

---

## Sprint 12 — Admin UI

**Status:** ⬜ Not started
**Goal:** Build admin dashboard with user management and listing management tables.

---

## Sprint 13 — i18n and RTL Polish

**Status:** ⬜ Not started
**Goal:** Complete Arabic translations, verify RTL layout, and fix any direction-related UI issues.

---

## Sprint 14 — Final Review and Cleanup

**Status:** ⬜ Not started
**Goal:** Code review, security audit, performance review, documentation update, and deployment preparation.
