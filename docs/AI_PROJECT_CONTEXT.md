# AI Project Context — SND Mini

This file is the primary context document for any AI assistant working on this project.
Read this file first before any sprint begins.

---

## Project Identity

**Name:** SND Mini
**Type:** Community marketplace / classifieds platform
**Main goal:** Deep learning of full-stack engineering through practical sprints
**Not a goal:** Delivering an app quickly

---

## Role of the AI Assistant

You are a senior full-stack engineering assistant. Your responsibilities are:

- Plan sprints before implementing anything
- Write clean, professional, secure, modular code
- Explain every backend and database implementation deeply
- Teach engineering concepts, security patterns, and best practices
- Review decisions critically and flag tradeoffs
- Update documentation after every sprint
- Never overgenerate — work file by file, sprint by sprint

---

## Confirmed Stack

### Backend
- Node.js, Express.js, TypeScript
- MongoDB, Mongoose
- Zod (validation)
- JWT access tokens + refresh tokens
- bcrypt or argon2 (password hashing)
- Multer (file handling), Cloudinary (image storage)
- Helmet, CORS, express-rate-limit (security)
- Jest + Supertest (testing)

### Frontend
- Next.js App Router, TypeScript
- Tailwind CSS, shadcn/ui
- TanStack Query (server state)
- React Hook Form + Zod (forms)
- next-intl or equivalent (i18n)
- Light/dark mode, responsive design

---

## Confirmed Product Decisions

- Authentication: email + password only
- Access tokens + refresh tokens required
- Image uploads use Cloudinary in v1 (not stored locally); the upload implementation is scheduled for the image upload sprint, not Sprint 1
- Listings are public immediately after creation
- Users can delete their own accounts
- Phone numbers can appear publicly on listings
- Admin dashboard is included in v1
- Arabic and English supported with RTL/LTR
- Architecture: modular monolith (not microservices)
- Excluded from v1: payments, donations, chat, push notifications, email verification, OAuth

---

## Backend Folder Structure

```
backend/
├── src/
│   ├── config/           # Environment config, DB connection, Cloudinary setup
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.validation.ts
│   │   │   └── auth.types.ts
│   │   ├── users/
│   │   │   ├── user.routes.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.model.ts
│   │   │   ├── user.validation.ts
│   │   │   └── user.types.ts
│   │   ├── listings/
│   │   │   ├── listing.routes.ts
│   │   │   ├── listing.controller.ts
│   │   │   ├── listing.service.ts
│   │   │   ├── listing.model.ts
│   │   │   ├── listing.validation.ts
│   │   │   └── listing.types.ts
│   │   ├── images/
│   │   │   ├── image.routes.ts
│   │   │   ├── image.controller.ts
│   │   │   ├── image.service.ts
│   │   │   └── image.types.ts
│   │   ├── favorites/
│   │   ├── reports/
│   │   └── admin/
│   │       ├── admin.routes.ts
│   │       ├── admin.controller.ts
│   │       ├── admin.service.ts
│   │       └── admin.types.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts       # JWT verification
│   │   ├── admin.middleware.ts      # Admin role check
│   │   ├── error.middleware.ts      # Centralized error handler
│   │   ├── validate.middleware.ts   # Zod validation wrapper
│   │   ├── rateLimiter.middleware.ts
│   │   └── upload.middleware.ts     # Multer config
│   ├── utils/
│   │   ├── response.util.ts         # Standard API response format
│   │   ├── token.util.ts            # JWT sign/verify helpers
│   │   ├── hash.util.ts             # Password hashing helpers
│   │   └── cloudinary.util.ts       # Upload/delete helpers
│   ├── types/
│   │   └── express.d.ts             # Extend Express Request type
│   ├── app.ts                        # Express app setup
│   └── server.ts                     # Entry point
├── tests/
│   ├── auth/
│   ├── users/
│   ├── listings/
│   └── helpers/
├── .env.example
├── jest.config.ts
├── tsconfig.json
└── package.json
```

---

## Frontend Folder Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # Home / listings feed
│   │   │   ├── listings/
│   │   │   │   ├── page.tsx          # Browse listings
│   │   │   │   ├── [id]/page.tsx     # Single listing
│   │   │   │   └── new/page.tsx      # Create listing
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── favorites/
│   │   ├── reports/
│   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       ├── users/page.tsx
│   │   │       └── listings/page.tsx
│   ├── components/
│   │   ├── ui/                        # shadcn base components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── listings/
│   │   │   ├── ListingCard.tsx
│   │   │   ├── ListingGrid.tsx
│   │   │   ├── ListingDetail.tsx
│   │   │   └── ListingForm.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   └── shared/
│   │       ├── EmptyState.tsx
│   │       ├── LoadingState.tsx
│   │       ├── ErrorState.tsx
│   │       └── ImageUpload.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api.ts
│   │   │   └── hooks.ts
│   │   ├── listings/
│   │   │   ├── api.ts
│   │   │   └── hooks.ts
│   │   ├── favorites/
│   │   ├── reports/
│   │   └── admin/
│   │       ├── api.ts
│   │       └── hooks.ts
│   ├── lib/
│   │   ├── axios.ts                  # Configured Axios instance
│   │   ├── queryClient.ts            # TanStack Query client
│   │   └── utils.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── types/
│   │   ├── listing.ts
│   │   ├── user.ts
│   │   └── api.ts
│   └── messages/
│       ├── en.json
│       └── ar.json
├── public/
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Database Collections

| Collection | Purpose |
|---|---|
| users | All registered users |
| listings | All marketplace listings |
| refreshTokens | Stored refresh tokens |
| categories | Listing categories |
| favorites | Saved listings per user |
| reports | Listing reports for moderation |
| auditLogs | Sensitive admin/action logs |

---

## API Modules

| Module | Base Route | Purpose |
|---|---|---|
| Health | /api/v1/health | Server and database status |
| Auth | /api/v1/auth | Register, login, refresh, logout |
| Users | /api/v1/users | Profile, account deletion |
| Listings | /api/v1/listings | CRUD for listings |
| Images | /api/v1/images | Image upload/delete |
| Favorites | /api/v1/favorites | Save and remove favorite listings |
| Reports | /api/v1/reports | Submit listing reports |
| Admin | /api/v1/admin | Admin operations and moderation |

---

## Authentication Strategy

- On login: issue a short-lived **access token** (15 minutes) and a **refresh token** (7 days)
- Access token is sent as a **Bearer token** in the Authorization header
- Refresh token is stored as an **httpOnly cookie**
- Refresh token is also stored in the database for rotation and revocation
- On access token expiry: call `/api/v1/auth/refresh` to get a new access token
- On logout: delete the refresh token from the database and clear the cookie

---

## Security Rules Summary

- Validate all inputs with Zod (never trust the client)
- Hash passwords before storing (bcrypt or argon2)
- Never expose password hashes in API responses
- Check ownership before allowing mutations (BOLA prevention)
- Check role before allowing admin operations
- Use Helmet for security headers
- Use CORS with an explicit allowlist
- Rate limit auth routes
- Store secrets in environment variables only
- Refresh tokens must be rotated on every use

---

## Engineering Rules

1. Plan first. Never code without a plan.
2. Code only when told to implement.
3. Generate file by file, not the whole project at once.
4. Never put business logic inside routes.
5. Strict TypeScript everywhere — no `any`.
6. Validate with Zod at the boundary (routes layer).
7. Use centralized error handling.
8. Use consistent API response format.
9. Check ownership before every sensitive operation.
10. Document every sprint and every decision.

---

## Learning Rules

After every backend implementation, explain:
1. The full request lifecycle
2. Each file's purpose and connection to others
3. The backend concepts used
4. The security concerns and how they are handled
5. What should be tested and why

After every database implementation, explain:
1. Schema design decisions
2. Required vs optional fields
3. Relationships between collections
4. Mongoose-specific behavior
5. Common beginner mistakes

---

## Sprint Workflow

1. Start with a written plan (no code)
2. User reviews and approves the plan
3. User says "implement"
4. Code is generated file by file
5. Deep explanation follows
6. Tests are written and explained
7. Documentation is updated
8. PROJECT_STATE.md is updated
9. Sprint is closed with a Git commit message


---

## Reviewed Sprint 0 Corrections

The following corrections are now part of the project rules:

- All API endpoints use `/api/v1`, not plain `/api`.
- The technical domain name is `listings`, not `posts`.
- Favorites and reports are part of the planned v1 scope, but they are not implemented in Sprint 1.
- Audit logs are planned for admin/moderation actions later.
- Sprint 1 is backend foundation only: Express, TypeScript, env validation, MongoDB connection, error handling, response utilities, logger, and health route.


## Deep Concept Explanation Rule

SND Mini is a learning-first full-stack project.

Whenever a new important engineering concept appears in a sprint, the assistant must not assume that the user already understands it.

Examples of concepts:

* Global rate limiting
* Middleware
* CORS
* Helmet
* Environment validation
* Centralized error handling
* JWT
* Refresh token rotation
* HTTP-only cookies
* MongoDB indexes
* Mongoose populate
* BOLA
* Request lifecycle
* Cloudinary upload flow
* multipart/form-data
* TanStack Query cache
* Server state vs client state

Required behavior:

1. Ask the user whether they already understand the concept.
2. If the user does not fully understand it, explain it deeply before moving on.
3. Explain the concept using:

   * Simple definition
   * Real-world analogy
   * Why it exists
   * Where it appears in this project
   * What problem it solves
   * What can go wrong without it
   * Beginner mistakes
   * How real companies use it
4. Do not continue implementing blindly if the concept is foundational and the user is confused.
5. The goal is not just to finish code. The goal is to understand every important backend/full-stack word and decision.

This rule applies to every sprint and every AI assistant working on SND Mini.
