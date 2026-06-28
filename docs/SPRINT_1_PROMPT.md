# Sprint 1 Prompt — Backend Foundation

Use this prompt in a new Claude chat named `01 - Backend Foundation`.

```txt
We are working on SND Mini.

Read these project files first:
- docs/AI_PROJECT_CONTEXT.md
- docs/PROJECT_STATE.md
- docs/ARCHITECTURE.md
- docs/API_CONTRACT.md
- docs/DATABASE_DESIGN.md
- docs/SECURITY_RULES.md
- docs/AI_WORKFLOW.md
- docs/CODE_REVIEW_CHECKLIST.md

Current state:
Sprint 0 is complete and reviewed. No application code exists yet.

Important project rules:
- Work sprint by sprint.
- Start with a plan only.
- Do not write code until I say `implement`.
- Generate code file by file.
- Explain every file deeply.
- Update documentation at the end of the sprint.
- Use `/api/v1` as the API base path.
- Use `listings` as the technical domain name, not `posts`.
- Favorites, reports, images, auth, users, listings CRUD, and admin are not part of Sprint 1.

Goal for this session:
Sprint 1 — Backend Foundation.

Sprint 1 purpose:
Initialize the backend project with Express, TypeScript, strict configuration, MongoDB connection, environment validation, centralized error handling, standard API response utilities, health route, basic logger, and clean startup structure.

Required behavior:
Start with a detailed sprint plan only.
Do not write code yet.
Wait until I say `implement`.

The plan must include:
1. Files to create.
2. Purpose of each file.
3. Folder structure.
4. Request lifecycle for the health endpoint.
5. Environment variables needed.
6. Security considerations.
7. Testing/check commands.
8. Documentation files to update at the end.

Expected files for Sprint 1:
- backend/package.json
- backend/tsconfig.json
- backend/.env.example
- backend/src/server.ts
- backend/src/app.ts
- backend/src/config/env.ts
- backend/src/config/db.ts
- backend/src/routes/health.routes.ts
- backend/src/middlewares/error.middleware.ts
- backend/src/utils/app-error.ts
- backend/src/utils/async-handler.ts
- backend/src/utils/response.util.ts
- backend/src/utils/logger.ts

Expected endpoint:
GET /api/v1/health

Rules:
- Use strict TypeScript.
- No `any`.
- No business logic in routes.
- Use Zod for environment validation.
- Use centralized error handling.
- Use a standard response envelope.
- Add a health endpoint under `/api/v1/health`.
- Do not overengineer.
- Do not implement auth, users, listings CRUD, images, favorites, reports, or admin in Sprint 1.
```
