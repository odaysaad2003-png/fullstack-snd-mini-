# Code Review Checklist — SND Mini

Use this checklist before committing any code and before closing any sprint.

---

## General

- [ ] TypeScript checks pass (`tsc --noEmit`)
- [ ] No `any` types without explicit comment explaining why
- [ ] No unused imports or variables
- [ ] No commented-out code left in
- [ ] No `console.log` in production code (only in development with a condition)
- [ ] Files are in the correct module folder
- [ ] API routes use `/api/v1` base path
- [ ] File names follow the convention: `module.type.ts` (e.g. `listing.service.ts`)

---

## Architecture

- [ ] No business logic in route files
- [ ] No direct database queries in controllers (only in services)
- [ ] No `req`, `res` objects passed into service functions
- [ ] Middleware is applied at the route level, not inside controllers
- [ ] New modules follow the same folder structure as existing modules
- [ ] Utility functions are in `utils/`, not inline in services

---

## Security

- [ ] All protected routes have `authMiddleware` applied
- [ ] Admin routes have both `authMiddleware` and `adminMiddleware` applied
- [ ] All request inputs are validated with Zod middleware
- [ ] Ownership is checked before any mutation (update, delete)
- [ ] Password is never returned in any response
- [ ] No secrets hardcoded in any file
- [ ] File upload routes have file size and MIME type limits
- [ ] Error messages do not expose internal system details (e.g. no MongoDB error messages to clients)

---

## API Responses

- [ ] All success responses use the standard `{ success: true, data: ... }` format
- [ ] All error responses use the standard `{ success: false, error: { message: ... } }` format
- [ ] HTTP status codes are correct (201 for creation, 200 for reads/updates, etc.)
- [ ] No `undefined` values in response objects

---

## Database

- [ ] `.select('-password')` is used on all user queries
- [ ] Required fields are validated in the Mongoose schema
- [ ] ObjectId comparisons use `.toString()` on both sides
- [ ] New indexes are added for fields used in queries
- [ ] `populate()` is used deliberately — not on every query

---

## Validation

- [ ] Zod schema exists for every request that has a body, params, or query
- [ ] Validation middleware is applied before the controller
- [ ] Enum values in Zod match the enum values in the Mongoose schema
- [ ] Optional fields are marked with `.optional()` in Zod

---

## Error Handling

- [ ] All async route handlers use try/catch and call `next(err)` on failure
- [ ] Custom error classes are used (not raw `new Error()`) for typed error handling
- [ ] The error middleware handles all error types and returns a consistent response

---

## Testing

- [ ] Tests exist for the main happy path of every new endpoint
- [ ] Tests exist for at least one error case per endpoint
- [ ] Tests use a separate test database or in-memory MongoDB
- [ ] Tests clean up their data after each test
- [ ] No test depends on another test's data

---

## Frontend (when applicable)

- [ ] All strings are in translation files, not hardcoded
- [ ] No hardcoded `ml-`, `mr-`, `pl-`, `pr-` (use `ms-`, `me-`, `ps-`, `pe-`)
- [ ] Loading, empty, and error states are implemented
- [ ] The component works in both English (LTR) and Arabic (RTL)
- [ ] The component works on mobile and desktop
- [ ] No business logic inside components
- [ ] TanStack Query is used for all server state
- [ ] Forms use React Hook Form + Zod

---

## Documentation

- [ ] PROJECT_STATE.md is updated
- [ ] SPRINT_LOG.md has the new sprint entry
- [ ] BACKEND_LEARNING_NOTES.md is updated (if backend work was done)
- [ ] DATABASE_LEARNING_NOTES.md is updated (if database work was done)
- [ ] DECISIONS.md has any new decisions recorded
- [ ] ERRORS_AND_FIXES.md has any errors that were encountered
- [ ] CHAT_HANDOFF.md is updated with the latest sprint context

---

## Git Commit

- [ ] Commit message follows the format: `type: sprint N — description`
- [ ] Only related files are staged (no accidental changes)
- [ ] `.env` is not staged (only `.env.example`)
