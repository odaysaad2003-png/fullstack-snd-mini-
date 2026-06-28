# AI Workflow — SND Mini

This document defines how the AI assistant is used in this project.
It exists to keep every Claude session consistent, focused, and learning-oriented.

---

## Session Start Protocol

At the start of every new Claude session, provide this context:

1. Reference `docs/AI_PROJECT_CONTEXT.md` — the AI reads the full project context
2. Reference `docs/PROJECT_STATE.md` — to know the current state and what sprint comes next
3. State the goal for this session clearly

---

## Sprint Workflow

### Phase 1: Plan
- The AI proposes the sprint plan: what files will be created, what they contain, and why
- No code is written in this phase
- The human reviews and approves, or asks for changes

### Phase 2: Implement
- The human says **"implement"** to start code generation
- The AI generates code **file by file**, not all at once
- After each file, explain what it does and why

### Phase 3: Explain
- After all files are generated, provide the deep backend/database explanation
- Cover: request lifecycle, file-by-file breakdown, security concerns, testing strategy
- The human should be able to answer: "what happens when this request hits the server?"

### Phase 4: Test
- Write tests for the sprint
- Explain what each test covers and why it matters
- Run tests and fix any failures

### Phase 5: Review and Close
- Code review checklist
- Update all documentation files
- Update PROJECT_STATE.md
- Provide the Git commit message

---

## Rules for the AI

1. **Plan before code.** Never write implementation without a written plan that the human approves.
2. **One file at a time.** Never dump 10 files at once. Generate and explain each file.
3. **Explain deeply.** Assume the human is learning. Explain why, not just what.
4. **Flag tradeoffs.** When there are multiple valid approaches, explain them and recommend one.
5. **Never skip security.** Point out security implications at every step.
6. **Keep scope tight.** Do not build things outside the sprint scope.
7. **Update docs.** Documentation is not optional — it is part of every sprint.
8. **Do not overengineer.** Prefer the simplest solution that meets the requirement.
9. **Use strict TypeScript.** No `any` types without explicit justification.
10. **Consistent format.** Always use the standard API response format.

---

## What to Say to Start a Sprint

```
We are working on SND Mini.
Current state: [paste relevant section from PROJECT_STATE.md]
Goal for this session: Sprint X — [Sprint name]
Please start with the sprint plan.
```

---

## Deep Backend Explanation Template

After every backend sprint, the explanation must cover:

### 1. Request Lifecycle
- Where the request enters (`server.ts` → `app.ts` → router)
- Which middleware runs and in what order
- Which controller function handles it
- Which service function contains the logic
- Which Mongoose model and query is used
- How the response is built and returned

### 2. File-by-File Breakdown
For each file created:
- Why does this file exist?
- What problem does it solve?
- How does it connect to other files?
- What would break if this file did not exist?

### 3. Backend Concepts
- Explain any new concept introduced (middleware, service layer, etc.)
- Connect it to how real companies use this pattern

### 4. Security
- What are the risks in this endpoint?
- How does the implementation prevent them?
- What would a bad actor try to do?

### 5. Testing
- What should be tested?
- What edge cases exist?
- What would a real test file look like?

---

## Deep Database Explanation Template

After every database-related sprint:

### 1. Schema Design
- Why is the schema designed this way?
- Which fields are required and why?
- What validations are applied at the schema level?

### 2. Relationships
- How does this collection relate to others?
- When do we use `populate()` and when do we embed?
- What are the tradeoffs?

### 3. Indexes
- Which fields are indexed and why?
- What queries would be slow without these indexes?

### 4. Mongoose Behavior
- What does Mongoose add on top of raw MongoDB?
- How do virtuals, hooks, and methods work?
- What happens with `timestamps: true`?

### 5. Common Mistakes
- What does a beginner typically get wrong here?
- What would go wrong in production without this design choice?

---

## Documentation Update Checklist

At the end of every sprint, update:

- [ ] docs/PROJECT_STATE.md — current sprint, progress, what comes next
- [ ] docs/SPRINT_LOG.md — add completed sprint entry
- [ ] docs/BACKEND_LEARNING_NOTES.md — concepts learned this sprint
- [ ] docs/DATABASE_LEARNING_NOTES.md — database concepts this sprint
- [ ] docs/FRONTEND_LEARNING_NOTES.md or frontend documentation — when frontend work exists
- [ ] docs/CODE_REVIEW_CHECKLIST.md — any new checklist items
- [ ] docs/ERRORS_AND_FIXES.md — if any errors were encountered
- [ ] docs/DECISIONS.md — if any new decisions were made
- [ ] docs/CHAT_HANDOFF.md — latest complete handoff for future AI sessions

---

## Git Commit Message Format

```
type: sprint N — short description

Examples:
feat: sprint 1 — backend project setup and environment config
feat: sprint 2 — auth module with JWT and refresh tokens
test: sprint 7 — auth and listings test suite
docs: sprint 0 — project planning and documentation
fix: sprint 3 — resolve user update ownership check bug
```


---

## Sprint 1 Start Reminder

For Sprint 1, ask Claude for a plan only. Do not let it write code until the human says `implement`.

Sprint 1 must focus on backend foundation only:

- Express + TypeScript setup
- Environment validation
- MongoDB connection
- Centralized error handling
- Standard response utilities
- Basic logger
- `/api/v1/health` route

Do not implement auth, listings CRUD, images, favorites, reports, or admin features in Sprint 1.

















mkdir -p docs backend/src/{config,routes,middlewares,utils}

touch README.md \
  backend/{package.json,tsconfig.json,.env.example,.gitignore} \
  backend/src/{app.ts,server.ts} \
  backend/src/config/{env.ts,db.ts} \
  backend/src/routes/health.routes.ts \
  backend/src/middlewares/{error.middleware.ts,rate-limit.middleware.ts} \
  backend/src/utils/{app-error.ts,async-handler.ts,logger.ts,response.util.ts}