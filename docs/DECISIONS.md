# Decisions Log — SND Mini

Every significant architecture, product, or engineering decision is recorded here.
Each entry explains what was decided, why, and what was rejected.

---

## DEC-001 — Architecture: Modular Monolith

**Sprint:** 0
**Decision:** Use a modular monolith architecture instead of microservices.

**Reason:**
- This is a learning project. Microservices add infrastructure complexity that distracts from learning backend fundamentals.
- A modular monolith teaches the same separation of concerns (module boundaries, domain isolation, clear interfaces) without requiring service discovery, inter-service communication, or distributed tracing.
- If the project ever needs to scale to microservices, the module boundaries are already clean enough to extract.

**Rejected:** Microservices, serverless functions

---

## DEC-002 — Database: MongoDB

**Sprint:** 0
**Decision:** Use MongoDB as the primary database.

**Reason:**
- Classifieds listings naturally vary in structure (a vehicle listing has different fields than a clothing listing). MongoDB's flexible document model handles this well.
- Mongoose provides strong TypeScript integration and ODM-level validation.
- Good for learning because it maps directly to JSON, which the API already speaks.
- The team (learning context) is more likely to be familiar with JavaScript/JSON than SQL.

**Tradeoff:**
- MongoDB does not enforce relational integrity by default. Ownership and relationship integrity must be handled in the application layer.
- Joins (`populate`) are more expensive than SQL joins for complex relational queries.

**Rejected:** PostgreSQL (not wrong, just a different learning path), SQLite

---

## DEC-003 — Auth: JWT + Refresh Tokens in httpOnly Cookie

**Sprint:** 0
**Decision:** Use short-lived JWT access tokens (15 min) and long-lived refresh tokens (7 days) stored in httpOnly cookies.

**Reason:**
- Access tokens in memory (not localStorage) prevent XSS token theft.
- httpOnly cookies for refresh tokens prevent JavaScript access, protecting against XSS.
- Storing refresh tokens in the database enables revocation (logout that actually works).
- Token rotation on every refresh prevents replay attacks.

**Rejected:**
- Sessions with server-side session store (more infrastructure, but valid alternative)
- Access tokens in localStorage (XSS risk)
- No refresh tokens (bad UX — users have to log in every 15 minutes)

---

## DEC-004 — Image Storage: Cloudinary

**Sprint:** 0
**Decision:** Use Cloudinary for all image storage in v1. Sprint 1 may prepare environment structure only; the actual upload flow belongs to the dedicated image upload sprint.

**Reason:**
- Storing images on the server filesystem is not production-safe. Files are lost on server restarts and redeployments.
- Cloudinary provides CDN delivery, automatic format optimization, and a free tier suitable for a learning project.
- This teaches the real pattern used in production systems.
- Images are uploaded server-side (via Multer → Cloudinary) to prevent clients from uploading malicious files directly.

**Rejected:** Local disk storage, S3 (more complex setup, AWS costs), direct client upload to Cloudinary (harder to control)

---

## DEC-005 — Validation: Zod

**Sprint:** 0
**Decision:** Use Zod for all request validation (body, params, query) and environment variable validation.

**Reason:**
- Zod integrates natively with TypeScript — schemas generate types automatically.
- Composable, readable validation schemas.
- Clear error messages for API clients.
- Used in both backend (express middleware) and frontend (React Hook Form integration).
- Validates environment variables at startup to fail fast on misconfiguration.

**Rejected:** Joi (no native TypeScript inference), express-validator (more verbose, less type-safe), manual checks (error-prone)

---

## DEC-006 — Listings: Immediate Public Visibility

**Sprint:** 0
**Decision:** Listings appear publicly immediately after creation. No moderation queue in v1.

**Reason:**
- Keeps the system simple for v1.
- Admin can delete inappropriate listings after the fact.
- Moderation queue adds significant complexity (separate status flow, admin notifications, etc.).

**Risk:** Inappropriate content may appear briefly before removal.
**Mitigation:** Admin dashboard allows fast removal.

---

## DEC-007 — Phone Numbers: Public on Listings

**Sprint:** 0
**Decision:** Phone numbers can be shown publicly on listings. They are optional.

**Reason:**
- This is standard behavior for classifieds platforms.
- The phone on a listing may differ from the phone on the user profile.
- Users explicitly add the phone and understand it is public.

---

## DEC-008 — Account Deletion: Hard Delete of User

**Sprint:** 0
**Decision:** When a user deletes their account, the user document is hard-deleted. Their listings are soft-deleted (status: 'deleted').

**Reason:**
- User data should be fully removable (GDPR principle, user trust).
- Listing data is soft-deleted to preserve audit trail for admins and prevent dangling data issues.
- After soft-delete, listings are hidden from public queries.

---

## DEC-009 — Admin: Role Field on User

**Sprint:** 0
**Decision:** Admin is a `role` field on the User document (`role: 'user' | 'admin'`). No separate admin collection.

**Reason:**
- Simple and sufficient for v1.
- Avoids over-engineering a roles/permissions system.
- Admin accounts are created manually (seeded or via a one-time script), not self-registered.

**Rejected:** Separate roles collection, permission matrix (RBAC), ACL system — all overkill for v1.

---

## DEC-010 — i18n: next-intl

**Sprint:** 0
**Decision:** Use `next-intl` for internationalization in the Next.js frontend.

**Reason:**
- First-class Next.js App Router support.
- Handles locale routing (`/en/...`, `/ar/...`) cleanly.
- RTL/LTR direction switching via locale detection.
- Good TypeScript support and active maintenance.

**Note:** Backend API returns English field names only. All translations happen on the frontend.

---

## DEC-011 — No Email Verification in V1

**Sprint:** 0
**Decision:** Email verification is excluded from v1.

**Reason:**
- Requires email sending infrastructure (SMTP, SendGrid, etc.).
- Adds onboarding friction for a learning project.
- Planned for v2.

**Risk:** Fake accounts with invalid emails.
**Mitigation:** Admin can deactivate accounts.

---

## DEC-012 — Listings Status: Soft Delete

**Sprint:** 0
**Decision:** Listings use a `status` field (`active`, `sold`, `deleted`) instead of hard deletion.

**Reason:**
- Preserves data for admin review.
- Allows recovery if a listing is deleted by mistake.
- Standard pattern in real marketplace systems.
- Public queries filter on `status: 'active'` only.


---

## DEC-013 — API Versioning: `/api/v1`

**Sprint:** 0 review  
**Decision:** Use `/api/v1` as the base path for all backend API routes.

**Reason:**
- Keeps the API versioned from the beginning.
- Allows a future `/api/v2` without breaking old clients.
- Makes backend routing conventions explicit before Sprint 1.

**Rejected:** Plain `/api` without versioning.

---

## DEC-014 — Domain Naming: Listings, Not Posts

**Sprint:** 0 review  
**Decision:** Use `listings` as the technical domain name in code, APIs, database models, and documentation.

**Reason:**
- SND Mini is a classifieds marketplace, so `listing` is more precise than `post`.
- User-facing Arabic labels can still use إعلانات or منشورات depending on the UI context.
- Consistent naming reduces confusion across backend, frontend, database, and docs.

**Rejected:** Mixing `posts` and `listings` in the same codebase.

---

## DEC-015 — Favorites and Reports Are Planned V1 Scope

**Sprint:** 0 review  
**Decision:** Favorites and reports remain part of v1, but they are not implemented in Sprint 1.

**Reason:**
- They are important product features for a community marketplace.
- They teach useful backend concepts: unique compound indexes, ownership, moderation workflow, and admin review.
- Delaying implementation keeps Sprint 1 focused on backend foundation.

---

## DEC-016 — Audit Logs for Admin Actions

**Sprint:** 0 review  
**Decision:** Add `auditlogs` as a planned collection for sensitive admin/moderation actions.

**Reason:**
- Real systems track who performed sensitive actions and when.
- Useful for debugging, accountability, and moderation history.
- Implementation can wait until the admin sprint.
