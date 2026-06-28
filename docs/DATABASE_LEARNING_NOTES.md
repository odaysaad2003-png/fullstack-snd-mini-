# Database Learning Notes — SND Mini

This file records database engineering concepts learned during each sprint.
It grows with every sprint and becomes a personal reference guide.

---

## Sprint 0 — Foundational Concepts

### MongoDB Document Model

MongoDB stores data as **documents** — JSON-like objects in **collections**.

```
Database
  └── Collection (like a table)
        └── Document (like a row, but flexible)
```

A document in the `listings` collection might look like:
```json
{
  "_id": "ObjectId",
  "title": "iPhone 14",
  "price": 3000,
  "images": [
    { "url": "https://...", "publicId": "snd-mini/abc123" }
  ],
  "seller": "ObjectId(user)"
}
```

**Key difference from SQL:** Two documents in the same collection can have different fields. MongoDB does not enforce a fixed schema — Mongoose does.

---

### Mongoose: ODM (Object Document Mapper)

Mongoose sits between your application code and MongoDB. It provides:
- **Schema definition** — defines the shape of documents
- **Model creation** — turns schemas into objects you use to query
- **Validation** — enforces rules before saving
- **Middleware (hooks)** — run code before/after save, find, delete
- **Population** — resolves ObjectId references to full documents

```typescript
const listingSchema = new mongoose.Schema({ ... });
const Listing = mongoose.model('Listing', listingSchema);

// Now you can:
await Listing.find({ status: 'active' });
await Listing.findById(id);
await new Listing({ ... }).save();
```

---

### References vs Embedding

Two ways to relate data in MongoDB:

**Embedding** — Store the related data inside the parent document.
```json
{
  "images": [
    { "url": "...", "publicId": "..." }
  ]
}
```
Use when:
- The data always belongs to the parent
- The data is small and bounded in size
- You always need the data when you fetch the parent

**Referencing** — Store an ObjectId that points to another collection.
```json
{
  "seller": "ObjectId(user._id)"
}
```
Use when:
- The data has its own identity and is shared
- The data might be large or unbounded
- You sometimes fetch the parent without needing the related data

**In SND Mini:**
- `images` are embedded in `listings` (always needed, small, bounded)
- `seller` is a reference to `users` (users have their own identity)
- `refreshTokens` is a separate collection (users can have many tokens; not embedded)

---

### MongoDB ObjectId

Every document has an `_id` field which MongoDB auto-generates as an **ObjectId** — a 12-byte unique identifier.

ObjectId properties:
- Contains a timestamp (first 4 bytes)
- Contains a machine identifier and process ID
- Contains a random counter
- Globally unique without coordination

**In TypeScript with Mongoose:**
```typescript
import { Types } from 'mongoose';

// Check if a string is a valid ObjectId
Types.ObjectId.isValid(someString);

// Compare ObjectIds safely
listing.seller.toString() === req.user._id.toString();
```

---

### The `populate()` Method

`populate()` replaces an ObjectId reference with the actual document.

```typescript
// Without populate:
const listing = await Listing.findById(id);
// listing.seller = ObjectId('64abc...')

// With populate:
const listing = await Listing.findById(id).populate('seller', 'name email');
// listing.seller = { _id: '64abc...', name: 'Ahmad', email: 'a@a.com' }
```

**Important:** `populate()` performs an additional database query. Use it deliberately — don't populate fields you don't need.

---

### Timestamps in Mongoose

```typescript
const schema = new mongoose.Schema({ ... }, { timestamps: true });
```

This automatically adds:
- `createdAt` — set when the document is first created
- `updatedAt` — updated every time the document is saved

These are standard on almost every collection. Do not add them manually.

---

### MongoDB Indexes

An **index** is a data structure that makes certain queries faster. Without an index, MongoDB must scan every document in the collection (called a **collection scan**). With an index, it can jump directly to matching documents.

**Types used in SND Mini:**
- Single field index: `email` on users (for login lookup)
- Compound index: `seller + status` on listings (for "my active listings")
- Text index: `title + description` on listings (for search)
- TTL index: `expiresAt` on refreshTokens (auto-deletion of expired tokens)

**Creating an index in Mongoose:**
```typescript
listingSchema.index({ seller: 1, status: 1 });
listingSchema.index({ title: 'text', description: 'text' });
```

**Rule:** Index fields that appear in `find()` filters, sort operations, or are used in pagination. Do not over-index — indexes have a write cost.

---

### TTL Index (Time To Live)

A special MongoDB index that automatically deletes documents when a date field passes.

```typescript
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

MongoDB checks this index periodically (roughly every 60 seconds) and deletes any documents where `expiresAt` is in the past. This keeps the `refreshtokens` collection clean without requiring a cron job.

---

### Common Beginner Mistakes

1. **Returning the password field** — Always `.select('-password')` on user queries.
2. **Not using indexes on queried fields** — The listing feed will scan the entire collection without an index on `status`.
3. **Comparing ObjectIds with `===`** — ObjectIds are objects, not strings. Use `.toString()` on both sides.
4. **Not handling `populate()` null** — If the referenced user was deleted, `listing.seller` will be `null`. Handle this gracefully.
5. **Embedding large or unbounded arrays** — MongoDB documents have a 16MB limit. A listing with thousands of comments would break.
6. **Not using `timestamps: true`** — Adding `createdAt` manually is error-prone and inconsistent.
7. **Using `findOne()` without an indexed field** — This causes full collection scans.
8. **Not validating at the application level** — MongoDB does not enforce your schema. Mongoose does, but only if you save through the model.

---

## Sprint 1 — Database Connection

*To be filled after Sprint 1 is complete.*

---

## Sprint 2 — User Schema and Auth

*To be filled after Sprint 2 is complete.*

---

## Sprint 4 — Listing Schema

*To be filled after Sprint 4 is complete.*


---

## Planned Future Database Topics

The following database topics are planned for later sprints:

- `favorites`: unique compound index on `user + listing` to prevent duplicate favorites.
- `reports`: moderation workflow with report status and admin review fields.
- `auditlogs`: append-only admin/sensitive action records.
- `/api/v1` does not change database design directly, but it makes API evolution safer.
