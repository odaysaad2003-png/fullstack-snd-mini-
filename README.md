# SND Mini

A learning-focused, full-stack community marketplace and classifieds platform.

## What is SND Mini?

SND Mini is a mini version of a real-world classifieds platform — similar in concept to local buy/sell/trade communities. Users can register, post listings with images, browse listings from other users, and contact sellers directly via a public phone number.

The project is **not optimized for speed of delivery**. It is optimized for **depth of learning**. Every sprint teaches real backend architecture, database design, security patterns, frontend engineering quality, and testing discipline.

---

## Main Goal

To deeply learn how professional full-stack systems are:

- Designed and architected
- Built and secured
- Tested and reviewed
- Documented and maintained

---

## Supported Languages

- **Arabic** (primary, RTL)
- **English** (secondary, LTR)

---

## Tech Stack

### Backend

| Tool | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | HTTP framework |
| TypeScript | Type safety |
| MongoDB | Primary database |
| Mongoose | ODM |
| Zod | Schema validation |
| JWT | Access tokens |
| Refresh tokens | Session management |
| bcrypt / argon2 | Password hashing |
| Multer | File upload handling |
| Cloudinary | Image storage |
| Helmet | HTTP security headers |
| CORS | Cross-origin policy |
| express-rate-limit | Rate limiting |
| Jest + Supertest | Testing |

### Frontend

| Tool | Purpose |
|---|---|
| Next.js (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | Component library |
| TanStack Query | Server state management |
| React Hook Form | Form management |
| Zod | Client-side validation |
| next-intl | i18n (Arabic / English) |

---

## Architecture

Modular monolith. One deployable backend unit. Modules are separated by domain (auth, users, listings, images, admin). No microservices in v1.

---

## V1 Scope

- User registration and login
- JWT access tokens and refresh tokens
- Listing creation with image upload (Cloudinary)
- Public listing browsing and search
- User account management
- Favorite listings
- Report listings
- Admin dashboard and moderation tools
- Arabic and English support
- RTL and LTR layouts

## Excluded from V1

- Payments and donations
- Real-time chat
- Push notifications
- Microservices
- Email verification (planned for v2)
- OAuth / social login

---

## Project Documentation

| File | Purpose |
|---|---|
| docs/AI_PROJECT_CONTEXT.md | Full context for AI assistant sessions |
| docs/PROJECT_STATE.md | Current sprint state and progress |
| docs/ARCHITECTURE.md | System architecture decisions |
| docs/API_CONTRACT.md | API endpoints and contracts |
| docs/DATABASE_DESIGN.md | Database collections and schema design |
| docs/SECURITY_RULES.md | Security rules and checklist |
| docs/SPRINT_LOG.md | History of completed sprints |
| docs/DECISIONS.md | Architecture and product decisions log |
| docs/AI_WORKFLOW.md | How to work with AI in this project |
| docs/BACKEND_LEARNING_NOTES.md | Backend concepts learned per sprint |
| docs/DATABASE_LEARNING_NOTES.md | Database concepts learned per sprint |
| docs/FRONTEND_QUALITY_GUIDE.md | Frontend engineering and quality rules |
| docs/UI_UX_DIRECTION.md | Visual design direction and principles |
| docs/CODE_REVIEW_CHECKLIST.md | Checklist before committing code |
| docs/ERRORS_AND_FIXES.md | Errors encountered and how they were fixed |

---

## Sprint Workflow

1. Start with a plan. Never code without a plan.
2. Wait for "implement" before writing any code.
3. Generate code file by file.
4. Review each file deeply.
5. Run TypeScript checks.
6. Write and understand tests.
7. Update documentation.
8. Update PROJECT_STATE.md.
9. Prepare a clean Git commit.

---

## Sprint Acceptance Criteria

A sprint is complete only when:

1. The code runs without errors.
2. TypeScript checks pass.
3. The architecture is reviewed and understood.
4. Security concerns are understood.
5. The flow (request → route → controller → service → database → response) is understood.
6. Documentation is updated.
7. PROJECT_STATE.md reflects the new state.
8. The code is ready for a clean Git commit.


---

## API Versioning

All backend routes use the `/api/v1` base path.

Sprint 1 begins with:

```txt
GET /api/v1/health
```

---

## Current State

Sprint 0 is complete and reviewed. No application code exists yet. The next sprint is **Sprint 1 — Backend Foundation**.
