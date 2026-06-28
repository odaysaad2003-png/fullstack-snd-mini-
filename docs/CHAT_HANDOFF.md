# SND Mini — Full Project Handoff Context

This document is the official handoff context for the **SND Mini** project.

Use this file whenever starting a new chat with ChatGPT, Claude, Cursor, Codex, or any AI assistant.
The purpose is to preserve the full project context, decisions, workflow, learning goals, architecture rules, and sprint process without losing important details.

---

# 1. Project Identity

## Project Name

**SND Mini**

## Project Type

A mini community marketplace / classifieds platform.

## Bigger Vision

SND Mini is inspired by a larger future system called **SND**, which may become a real community platform for users to publish posts, offers, services, jobs, and other useful community content.

However, **SND Mini is not the final official SND platform**.

SND Mini is the learning and training version that will help the user deeply understand how real backend and full-stack systems are built before attempting to build the larger official SND system.

---

# 2. Main Goal

The main goal is not to quickly generate an app.

The main goal is to deeply learn how real full-stack systems are:

* Planned
* Architected
* Built
* Secured
* Tested
* Reviewed
* Explained
* Improved
* Prepared for real users
* Maintained sprint by sprint

The project must help the user become a stronger professional full-stack developer, especially in backend engineering.

The user wants to understand practical backend deeply, not just copy code.

---

# 3. Learning Philosophy

This project is a **backend/full-stack learning system**.

Every sprint must teach real engineering ideas.

A sprint is not complete just because the code works.

A sprint is complete only when:

1. The code runs.
2. The architecture is reviewed.
3. Security concerns are understood.
4. Backend/database flow is explainable.
5. Frontend UX quality is acceptable when frontend is involved.
6. Tests or testing instructions are clear.
7. `PROJECT_STATE.md` is updated.
8. The user can explain the important concepts before moving to the next sprint.

The assistant must always help the user understand:

* Why this code exists
* Why this structure was chosen
* What problem each file solves
* How requests move through the backend
* How data is validated
* How errors are handled
* How database operations work
* What security risks exist
* How the implementation could fail
* How the implementation would be improved in a real company project

---

# 4. Confirmed Product Scope

SND Mini allows users to:

* Register using email and password
* Log in
* Stay authenticated using access token + refresh token
* Create public posts
* Upload images
* Search and filter posts
* Favorite posts
* Report posts
* Manage their profile
* Delete their own account
* Display their phone number publicly on posts

Admins can:

* Manage users
* Manage posts
* Review reports
* Moderate content
* Use a simple full-stack admin dashboard

The app supports:

* Arabic
* English
* RTL layout for Arabic
* LTR layout for English

---

# 5. Confirmed Technical Stack

## Backend Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Zod
* JWT access tokens
* Refresh tokens
* bcrypt or argon2
* Multer
* Cloudinary
* Helmet
* CORS
* express-rate-limit
* Jest
* Supertest

## Frontend Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* React Hook Form
* Zod
* next-intl or equivalent i18n solution
* Light purposeful animation when needed

---

# 6. Confirmed Product Decisions

These decisions are already agreed and should not be changed unless the user explicitly requests a review.

* Authentication uses email and password.
* The system must include access tokens and refresh tokens.
* Refresh tokens are required because the user wants to learn real auth flows.
* Image uploads use Cloudinary from the beginning.
* Posts appear publicly immediately after creation.
* Users can delete their own accounts.
* Phone numbers can appear publicly on posts.
* The system includes a full-stack admin dashboard.
* The app supports Arabic and English.
* The architecture is a modular monolith, not microservices.
* Payments are excluded from v1.
* Donations are excluded from v1.
* Chat is excluded from v1.
* Push notifications are excluded from v1.
* Microservices are excluded from v1.
* Realtime features are excluded from v1.
* The first goal is backend depth, then frontend integration, then testing, performance, and deployment.

---

# 7. Non-Goals for Version 1

Do not include these in v1:

* Payments
* Donations
* Chat
* Push notifications
* Microservices
* Complex recommendation system
* AI moderation
* Complex maps/location system
* Multi-vendor payment logic
* Real production identity verification
* Enterprise-level scaling from day one

These can be considered later after the user becomes stronger in backend and full-stack architecture.

---

# 8. Architecture Decision

The project must use a **Modular Monolith** architecture.

Do not start with microservices.

Reason:

* The project is still a learning project.
* Modular monolith is easier to reason about.
* It teaches clean separation of concerns.
* It can scale enough for the learning phase.
* Modules can later be extracted if needed.
* It avoids unnecessary distributed-system complexity.

Expected backend module style:

* routes
* controllers
* services
* models
* validations
* middlewares
* utils
* config

Business logic must not be placed directly inside routes.

---

# 9. Backend Architecture Rules

The backend must follow these rules:

1. Use strict TypeScript.
2. Use Express with clear modular structure.
3. Separate routes, controllers, services, models, validation, middleware, config, and utils.
4. Do not place business logic directly inside route files.
5. Use Zod for request validation.
6. Validate body, params, and query inputs.
7. Use centralized error handling.
8. Use a consistent API response format.
9. Use environment validation.
10. Never put secrets in code.
11. Use middleware for auth, roles, validation, and errors.
12. Never trust frontend checks for security.
13. Enforce authorization on the backend.
14. Prevent BOLA by checking ownership and roles.
15. Use proper password hashing.
16. Use secure token strategy.
17. Use rate limiting on sensitive endpoints.
18. Add logging where appropriate.
19. Keep code readable and maintainable.
20. Avoid overengineering.

---

# 10. Backend Learning Rule

After every backend implementation, the assistant must explain:

## Request Lifecycle

* How the request enters the system
* Which route handles it
* Which middleware runs first
* Which controller receives it
* Which service contains the business logic
* Which model/database query is used
* How errors are handled
* How the response is returned

## File-by-File Explanation

For every created or changed file, explain:

* Why the file exists
* What problem it solves
* How it connects to other files
* Why it belongs in this folder
* How it supports maintainability

## Backend Concepts

Explain when relevant:

* Middleware
* Controllers
* Services
* Models
* DTOs or validation schemas
* Environment variables
* Centralized errors
* Async error handling
* Request validation
* Authentication
* Authorization
* Cookies
* Tokens
* Rate limiting
* Security headers
* Upload handling

## Security

Explain:

* What can go wrong
* How attackers might abuse the endpoint
* Whether ownership is checked
* Whether role-based access is needed
* How BOLA is prevented
* Whether sensitive data is exposed
* Whether inputs are validated
* Whether errors leak internals

## Testing

Explain:

* What should be tested
* Why those tests matter
* Important edge cases
* Expected success cases
* Expected failure cases

## Beginner Mistakes

Always mention beginner mistakes relevant to the sprint.

Examples:

* Putting business logic in routes
* Trusting frontend permissions
* Forgetting validation
* Returning password hashes
* Not checking ownership
* Not handling async errors
* Using localStorage incorrectly for sensitive tokens
* Uploading files without size/type limits
* Building huge endpoints without pagination

---

# 11. Database Rules

The database is MongoDB with Mongoose.

The assistant must teach MongoDB/Mongoose deeply.

Every database sprint must explain:

* Why the schema is designed this way
* Which fields are required and why
* Which fields are optional and why
* How ObjectId relationships work
* When to reference and when to embed
* What indexes are needed
* Why indexes help reads but cost writes
* How queries are built
* How pagination works
* How filtering works
* How search works
* How soft delete works when relevant
* How timestamps help
* What data should not be stored
* What should be hidden from API responses

Expected collections may include:

* users
* posts
* favorites
* reports
* admin/audit logs
* refresh tokens or refresh token metadata depending on strategy

---

# 12. Authentication Strategy

Auth uses:

* Email
* Password
* Access token
* Refresh token

The project must teach professional auth operations.

Required learning topics:

* Register
* Login
* Logout
* Access token lifetime
* Refresh token lifetime
* Refresh token rotation
* HTTP-only cookies
* Secure cookies in production
* SameSite behavior
* CORS with credentials
* Password hashing
* Auth middleware
* Protected routes
* Role-based authorization
* Token expiration
* Invalid token handling
* Logout behavior
* Stolen refresh token risk
* User deletion and session invalidation

The user wants to learn auth deeply, including the problems that happen in real systems.

---

# 13. Image Upload Strategy

Image uploads must use Cloudinary from the beginning.

Required learning topics:

* Why JSON is not enough for file uploads
* What multipart/form-data is
* How Multer works
* How file validation works
* File size limits
* File type validation
* Uploading to Cloudinary
* Storing image URL and public_id
* Deleting Cloudinary image when post is deleted
* Handling upload errors
* Not storing image binary data inside MongoDB
* Difference between local storage and cloud storage
* Security risks of uploads

---

# 14. Frontend Quality Rules

When frontend sprints begin, the UI must be treated like company-level work.

The UI must be:

* Responsive
* Mobile-first
* Modern
* Clean
* Professional
* Accessible
* RTL/LTR ready
* Component-driven
* Not generic
* Not a copied classic dashboard
* Not outdated
* Not a basic school project

The frontend must include:

* Loading states
* Empty states
* Error states
* Success states
* Form validation
* Protected routes
* Auth-aware UI
* Reusable components
* Clean feature structure
* API client separation
* Types separation
* Schemas separation
* Hooks separation
* Proper state management with TanStack Query
* Internationalization support
* Responsive layouts
* Light purposeful animation

Animation rules:

* Use light animation only when it improves UX
* Do not overuse animation
* Do not make the UI slow or distracting
* Animation should feel subtle and professional

Design direction:

* Modern
* Trustworthy
* Community-focused
* Friendly
* Product-level
* Startup-quality
* Not overly corporate
* Not overly playful
* Clear visual hierarchy

---

# 15. Frontend Architecture Rules

When building frontend:

* Use Next.js App Router
* Use TypeScript
* Use Tailwind CSS
* Use shadcn/ui where useful
* Use TanStack Query for server state
* Use React Hook Form for forms
* Use Zod for validation
* Use next-intl or equivalent for i18n
* Use feature-based organization
* Do not put API logic directly in visual components
* Do not put business logic directly in UI components
* Separate:

  * components
  * feature components
  * hooks
  * API clients
  * schemas
  * types
  * utils
  * constants

---

# 16. Company-Level Code Rule

Treat every sprint as if this is work for a real company.

Code must be:

* Clean
* Readable
* Maintainable
* Reusable
* Secure
* Testable
* Modular
* Scalable enough for a small real product

Avoid:

* Random file placement
* Huge files
* Duplicated logic
* Unclear names
* Weak typing
* Unsafe any
* Hardcoded secrets
* Business logic in UI components
* Business logic in Express routes
* Missing validation
* Missing error handling
* Overengineering
* Premature microservices

---

# 17. Sprint Workflow

The agreed workflow:

1. ChatGPT prepares the sprint prompt.
2. The user sends the prompt to Claude inside the Claude Project.
3. Claude must start with a plan only.
4. Claude must not write code until the user says `implement`.
5. The user reviews Claude's plan with ChatGPT.
6. ChatGPT reviews the plan like a senior engineer.
7. If the plan is good, the user asks Claude to implement step by step.
8. Claude generates code file by file.
9. The user applies the code locally.
10. The user runs the required commands.
11. The user sends the result, code, or errors back to ChatGPT.
12. ChatGPT reviews the code deeply.
13. ChatGPT explains the code and concepts.
14. If accepted, documentation is updated.
15. The user commits the sprint.
16. Only then does the project move to the next sprint.

---

# 18. AI Tool Roles

## ChatGPT Role

ChatGPT acts as:

* Architect
* Senior reviewer
* Teacher
* Prompt engineer
* System design guide
* Debugging guide
* Code review guide
* Learning coach

ChatGPT should:

* Prepare strong sprint prompts
* Review Claude output
* Explain code deeply
* Detect missing security
* Detect overengineering
* Explain backend/database/frontend concepts
* Decide whether sprint output is accepted or needs changes

## Claude Chat / Claude Project Role

Claude acts as:

* Sprint planner
* Code generator
* Documentation generator
* File-by-file implementation assistant

Claude must:

* Work sprint by sprint
* Start with planning
* Generate code file by file
* Explain implementation
* Update PROJECT_STATE.md
* Not generate the whole project at once

## Cursor Agent Role

Cursor Agent may be used for:

* Small local fixes
* Debugging specific errors
* Frontend component edits
* Project-aware edits inside the codebase

Do not let Cursor change too many things at once.

## Codex CLI Role

Codex may be used for:

* Local implementation
* Refactoring
* Running commands
* Codebase-aware changes
* Comparing implementation alternatives

Use it carefully and only inside the project folder.

---

# 19. Claude Usage Rules

Inside Claude Project:

* Use Project Instructions for permanent project rules.
* Use Project Files for documentation memory.
* Use a new chat for each sprint.
* Do not use one long chat for the whole project.
* Do not ask Claude to generate the entire project.
* Ask for plan first.
* Ask for implementation only after approval.
* Ask for file-by-file implementation.
* Ask for updated PROJECT_STATE.md after every sprint.

Recommended Claude model usage:

* Sonnet 4.6 + Low is acceptable for free usage.
* Use Low for docs, summaries, simple planning, and simple code.
* Use Medium or High if available for:

  * Auth
  * Refresh tokens
  * Security
  * Cloudinary uploads
  * Architecture review
  * Testing strategy
  * Performance strategy
* If limited by free plan, reduce the task size instead of asking for a large output.

Do not solve Claude limitations by requesting huge output.
Solve them by splitting the sprint into smaller implementation steps.

---

# 20. Claude Project Setup

The Claude Project should be named:

**mini-snd**

Inside the project, use:

## Project Instructions

The instructions must include:

* Project identity
* Confirmed stack
* Product decisions
* Backend rules
* Frontend quality rules
* Learning rules
* Sprint workflow
* Acceptance criteria

## Project Files

Upload or maintain these docs:

* README.md
* docs/AI_PROJECT_CONTEXT.md
* docs/PROJECT_STATE.md
* docs/ARCHITECTURE.md
* docs/API_CONTRACT.md
* docs/DATABASE_DESIGN.md
* docs/SECURITY_RULES.md
* docs/SPRINT_LOG.md
* docs/DECISIONS.md
* docs/AI_WORKFLOW.md
* docs/BACKEND_LEARNING_NOTES.md
* docs/DATABASE_LEARNING_NOTES.md
* docs/FRONTEND_QUALITY_GUIDE.md
* docs/UI_UX_DIRECTION.md
* docs/CODE_REVIEW_CHECKLIST.md
* docs/ERRORS_AND_FIXES.md
* docs/CHAT_HANDOFF.md

Do not upload:

* node_modules
* .env
* .env.local
* dist
* build
* .next
* secrets
* large irrelevant files

---

# 21. Documentation Files and Purpose

## README.md

General project introduction, stack, setup, and roadmap.

## docs/AI_PROJECT_CONTEXT.md

Long-term AI-readable project context.

## docs/PROJECT_STATE.md

The source of truth for current progress.

Must include:

* Current sprint
* Completed work
* Existing modules
* Existing endpoints
* Existing models
* Current decisions
* Open issues
* Next sprint

## docs/ARCHITECTURE.md

System architecture and folder structure.

## docs/API_CONTRACT.md

Endpoints, request shapes, response shapes, and API conventions.

## docs/DATABASE_DESIGN.md

Collections, fields, relationships, indexes, and database decisions.

## docs/SECURITY_RULES.md

Security checklist, auth rules, authorization rules, BOLA prevention, upload security.

## docs/SPRINT_LOG.md

History of completed sprints.

## docs/DECISIONS.md

Important decisions and why they were made.

## docs/AI_WORKFLOW.md

How ChatGPT, Claude, Cursor, and Codex are used.

## docs/BACKEND_LEARNING_NOTES.md

Backend concepts learned sprint by sprint.

## docs/DATABASE_LEARNING_NOTES.md

Database concepts learned sprint by sprint.

## docs/FRONTEND_QUALITY_GUIDE.md

Frontend architecture, responsive design, i18n, UI states, component rules.

## docs/UI_UX_DIRECTION.md

Visual style, product feel, design personality, animation rules.

## docs/CODE_REVIEW_CHECKLIST.md

Checklist before accepting any sprint code.

## docs/ERRORS_AND_FIXES.md

Errors encountered and how they were fixed.

## docs/CHAT_HANDOFF.md

This file. Used to move context between chats/tools.

---

# 22. Planned Roadmap

## Sprint 0 — Project Planning, Architecture, Documentation, UI Direction, and Learning System

Purpose:

* No app code yet
* Define project documentation
* Define architecture
* Define rules
* Define learning workflow
* Define AI workflow
* Define UI quality direction

## Sprint 1 — Backend Foundation

Purpose:

* Express + TypeScript setup
* MongoDB connection
* env validation
* error handler
* response format
* logger
* health endpoint

Expected files may include:

* backend/package.json
* backend/tsconfig.json
* backend/src/app.ts
* backend/src/server.ts
* backend/src/config/env.ts
* backend/src/config/db.ts
* backend/src/middlewares/error.middleware.ts
* backend/src/utils/app-error.ts
* backend/src/utils/api-response.ts
* backend/src/routes/health.routes.ts

## Sprint 2 — Auth Core

Purpose:

* User model
* Register
* Login
* Password hashing
* Access token
* Auth middleware
* Me endpoint

Endpoints:

* POST /api/v1/auth/register
* POST /api/v1/auth/login
* GET /api/v1/auth/me

## Sprint 3 — Refresh Token System

Purpose:

* Refresh token
* HTTP-only cookie
* Token rotation
* Logout
* CORS credentials
* Session security

Endpoints:

* POST /api/v1/auth/refresh
* POST /api/v1/auth/logout

## Sprint 4 — Users Profile + Delete Account + Roles

Purpose:

* User profile
* Update profile
* Delete own account
* Role preparation
* User status

Endpoints:

* GET /api/v1/users/me
* PATCH /api/v1/users/me
* DELETE /api/v1/users/me

## Sprint 5 — Posts CRUD + Ownership

Purpose:

* Create post
* Update own post
* Delete own post
* Get post
* List posts
* Ownership checks
* Admin override later

Endpoints:

* GET /api/v1/posts
* POST /api/v1/posts
* GET /api/v1/posts/:id
* PATCH /api/v1/posts/:id
* DELETE /api/v1/posts/:id

## Sprint 6 — Cloudinary Image Upload

Purpose:

* Multer
* multipart/form-data
* Cloudinary upload
* File validation
* Store image URL and public_id
* Delete Cloudinary assets when needed

## Sprint 7 — Search + Filters + Pagination + Indexes

Purpose:

* Query params
* Search
* Filtering
* Pagination
* Sorting
* Projection
* MongoDB indexes
* Query performance

## Sprint 8 — Favorites + Reports

Purpose:

* Favorite posts
* Remove favorites
* Prevent duplicates
* Report posts
* Report reasons
* Report status

## Sprint 9 — Admin Backend + Moderation

Purpose:

* Admin role
* Admin routes
* Manage users
* Manage posts
* Review reports
* Hide posts
* Ban users
* Audit logs

## Sprint 10 — Frontend Foundation + i18n

Purpose:

* Next.js setup
* Tailwind
* shadcn/ui
* next-intl
* RTL/LTR
* basic layout
* design system base

## Sprint 11 — Auth UI + Protected Routes

Purpose:

* Login UI
* Register UI
* Auth state
* Protected pages
* Refresh token flow with frontend

## Sprint 12 — Posts UI + Upload Form

Purpose:

* Posts listing
* Post details
* Create post form
* Image upload UI
* Form validation
* Loading/error/empty states

## Sprint 13 — Admin Dashboard UI

Purpose:

* Admin layout
* Users management
* Posts management
* Reports management
* Responsive admin UI

## Sprint 14 — Testing Sprint

Purpose:

* Unit tests
* Integration tests
* Auth tests
* Protected routes tests
* Ownership tests
* Upload tests
* Admin tests

Tools:

* Jest
* Supertest
* Postman

## Sprint 15 — Performance + Load Testing

Purpose:

* Load testing
* Stress testing
* Response time analysis
* Slow query detection
* Index review
* Blocking code review
* Rate limiting validation

Tools:

* k6
* MongoDB Compass
* Node profiling basics

## Sprint 16 — Deployment + Production Basics

Purpose:

* Production env
* MongoDB Atlas
* Cloudinary production config
* CORS production
* HTTPS cookies
* Logging
* Health check
* Deployment platform
* Production checklist

---

# 23. Git Workflow

Use Git from the beginning.

Suggested flow:

1. Create project folder.
2. Initialize Git.
3. Create a branch per sprint.
4. Commit only after review and understanding.
5. Do not commit generated code before review.

Example:

```bash
git init
git checkout -b sprint-0-docs
git add .
git commit -m "docs: initialize SND Mini architecture and learning workflow"
```

For future sprints:

```bash
git checkout -b sprint-1-backend-foundation
git add .
git commit -m "feat: setup backend foundation"
```

---

# 24. Local Project Setup Status

Current status:

* No application code has been written yet.
* The next step is Sprint 0.
* Sprint 0 will generate documentation and project memory files.
* After Sprint 0 docs are generated by Claude, ChatGPT should review them before committing.

---

# 25. Sprint 0 Required Output

Sprint 0 must generate:

* README.md
* docs/AI_PROJECT_CONTEXT.md
* docs/PROJECT_STATE.md
* docs/ARCHITECTURE.md
* docs/API_CONTRACT.md
* docs/DATABASE_DESIGN.md
* docs/SECURITY_RULES.md
* docs/SPRINT_LOG.md
* docs/DECISIONS.md
* docs/AI_WORKFLOW.md
* docs/BACKEND_LEARNING_NOTES.md
* docs/DATABASE_LEARNING_NOTES.md
* docs/FRONTEND_QUALITY_GUIDE.md
* docs/UI_UX_DIRECTION.md
* docs/CODE_REVIEW_CHECKLIST.md
* docs/ERRORS_AND_FIXES.md
* docs/CHAT_HANDOFF.md

Sprint 0 must not generate application code.

---

# 26. Rule for Any New Assistant

Before giving advice or code, any assistant must first acknowledge:

* The project is SND Mini.
* The main purpose is deep backend/full-stack learning.
* We work sprint by sprint.
* We do not generate the entire project at once.
* Claude is used mainly for code generation and docs.
* ChatGPT is used as senior reviewer, architect, teacher, and prompt engineer.
* Every code result must be reviewed and deeply explained.
* PROJECT_STATE.md is the source of truth.
* The project must be treated like company-level work.
* Backend and database explanations are mandatory.
* Frontend must be modern, responsive, RTL/LTR-ready, and professional.

---

# 27. Next Action

The immediate next action is:

1. Add the final Project Instructions to Claude Project `mini-snd`.
2. Open a new Claude chat named `00 - Project Architecture`.
3. Send the final Sprint 0 prompt.
4. Copy Claude’s generated docs into the local project.
5. Send the result back to ChatGPT for senior review.
6. Do not start Sprint 1 until Sprint 0 is reviewed and accepted.
7. After approval, commit Sprint 0.

---

# 28. Important Reminder

Do not rely on chat memory only.

The real memory of the project must live inside the repository documentation files:

* PROJECT_STATE.md
* DECISIONS.md
* SPRINT_LOG.md
* CHAT_HANDOFF.md
* BACKEND_LEARNING_NOTES.md
* DATABASE_LEARNING_NOTES.md
* FRONTEND_QUALITY_GUIDE.md
* UI_UX_DIRECTION.md
* ERRORS_AND_FIXES.md

Every major decision, sprint result, error, and learning point must be documented.

This is how the project remains understandable even when moving between different AI tools or opening new chats.
