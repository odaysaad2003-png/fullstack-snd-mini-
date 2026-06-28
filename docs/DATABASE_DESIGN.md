# Database Design — SND Mini

---

## Database: MongoDB

MongoDB is used because:
- Flexible schema fits classifieds well (different listing types have different fields)
- Document model maps naturally to JSON API responses
- Mongoose provides good TypeScript integration
- Strong ecosystem and learning value for JavaScript developers

---

## Collections Overview

| Collection | Purpose |
|---|---|
| `users` | All registered users |
| `listings` | All marketplace listings |
| `refreshtokens` | Stored refresh tokens for rotation/revocation |
| `categories` | Listing categories (seeded data) |
| `favorites` | Saved listings per user |
| `reports` | User reports for listing moderation |
| `auditlogs` | Admin and sensitive action logs |

---

## Collection: `users`

### Schema

```
_id           ObjectId    Auto-generated
name          String      Required
email         String      Required, unique, lowercase, indexed
password      String      Required, bcrypt/argon2 hash, never returned
phone         String      Optional, may be shown on listings
role          String      Enum: ['user', 'admin'], default: 'user'
isActive      Boolean     Default: true (admin can deactivate)
createdAt     Date        Auto (timestamps: true)
updatedAt     Date        Auto (timestamps: true)
```

### Design Decisions

- `email` is unique and indexed — it is the login identifier
- `password` is never returned in API responses (use `.select('-password')`)
- `role` is a simple string enum — no separate roles collection needed at this scale
- `isActive` allows admins to deactivate users without deleting their data
- `phone` is optional at registration but can be added to a listing separately

### What is NOT stored on User

- Profile picture (out of scope for v1)
- Address (handled per-listing)
- Favorites / saved listings embedded on the user document. Favorites are stored in a separate `favorites` collection.

---

## Collection: `listings`

### Schema

```
_id           ObjectId    Auto-generated
title         String      Required
description   String      Required
price         Number      Required, min 0
currency      String      Enum: ['SAR', 'USD', 'ILS', 'JOD'], required
category      String      Required (slug, e.g. 'electronics')
location      String      Required (city/region string for v1)
phone         String      Optional (seller's contact, shown publicly)
images        Array       Array of { url: String, publicId: String }
seller        ObjectId    Ref: 'User', required
status        String      Enum: ['active', 'sold', 'deleted'], default: 'active'
createdAt     Date        Auto
updatedAt     Date        Auto
```

### Design Decisions

- `seller` is a reference to User (ObjectId). We populate it on reads.
- `images` is embedded as an array of objects — not a separate collection. Listings have a small, bounded number of images (max 5 in v1), so embedding is correct here.
- `publicId` in each image is stored so we can call Cloudinary's delete API when a listing is removed.
- `status` instead of hard delete: when a user deletes a listing, we set `status: 'deleted'`, which hides it from public queries but preserves data for admin review. Physical deletion can be done in a cleanup job later.
- `currency` enum is intentionally small for v1. Expanding it later is easy.
- `location` is a plain string for v1. Geo queries are not in scope.
- `phone` on a listing is separate from `phone` on the user. The seller may use a different contact number per listing.

### Indexes

```
seller + status     — For "my listings" queries
status + createdAt  — For public feed (active listings, sorted by newest)
title (text)        — For search (MongoDB text index)
category + status   — For category filter
```

### What is NOT in Listing

- Views count (out of scope v1)
- Favorites count (out of scope v1)
- Expiry date (out of scope v1)
- Tags (simplified to category only for v1)

---

## Collection: `refreshtokens`

### Schema

```
_id           ObjectId    Auto-generated
token         String      Required, unique, indexed
userId        ObjectId    Ref: 'User', required
expiresAt     Date        Required (TTL index — MongoDB auto-deletes expired tokens)
createdAt     Date        Auto
```

### Design Decisions

- Storing refresh tokens in the database allows **revocation** (logout invalidates the token immediately)
- **Token rotation**: every time a refresh is used, the old token is deleted and a new one is inserted
- `expiresAt` with a MongoDB TTL index means expired tokens are automatically cleaned up without a cron job
- The `token` field stores the raw JWT string — or alternatively a hash of it for extra security (decision to make during Sprint 2)
- `userId` allows us to revoke all tokens for a specific user (useful for "logout from all devices")

### TTL Index

```javascript
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

MongoDB will automatically delete documents when `expiresAt` is in the past.

---

## Collection: `categories`

### Schema

```
_id           ObjectId    Auto-generated
name          Object      { en: String, ar: String }
slug          String      Required, unique (e.g. 'electronics')
isActive      Boolean     Default: true
order         Number      For display ordering
```

### Design Decisions

- Categories are **seeded data** — not user-created in v1
- `name` stores both English and Arabic in the document to avoid translation lookup overhead
- `slug` is used in API queries and URLs (human-readable, URL-safe)
- `isActive` allows hiding a category without deleting it

### Seed Data (planned)

```
electronics   — Electronics & Devices
vehicles      — Vehicles
property      — Property & Real Estate
furniture     — Furniture & Home
clothing      — Clothing & Fashion
jobs          — Jobs
services      — Services
other         — Other
```


---

## Collection: `favorites`

### Schema

```txt
_id           ObjectId    Auto-generated
user          ObjectId    Ref: 'User', required
listing       ObjectId    Ref: 'Listing', required
createdAt     Date        Auto
updatedAt     Date        Auto
```

### Design Decisions

- Favorites are stored in a separate collection instead of embedding listing IDs in the user document.
- This prevents the user document from growing too large if a user favorites many listings.
- A compound unique index on `user + listing` prevents duplicate favorites.
- Favorites belong to authenticated users only.

### Indexes

```javascript
favoriteSchema.index({ user: 1, listing: 1 }, { unique: true });
favoriteSchema.index({ user: 1, createdAt: -1 });
```

---

## Collection: `reports`

### Schema

```txt
_id           ObjectId    Auto-generated
listing       ObjectId    Ref: 'Listing', required
reporter      ObjectId    Ref: 'User', required
reason        String      Enum: ['spam', 'scam', 'inappropriate', 'duplicate', 'other']
details       String      Optional
status        String      Enum: ['open', 'reviewed', 'dismissed', 'action_taken'], default: 'open'
reviewedBy    ObjectId    Ref: 'User', optional admin user
reviewedAt    Date        Optional
createdAt     Date        Auto
updatedAt     Date        Auto
```

### Design Decisions

- Reports are separate documents because a listing can receive multiple reports.
- Reports are not embedded in listings to avoid unbounded array growth.
- Reports do not automatically delete or hide a listing in v1. Admin review decides the action.
- `reviewedBy` references an admin user when a report is handled.

### Indexes

```javascript
reportSchema.index({ listing: 1, status: 1 });
reportSchema.index({ reporter: 1, createdAt: -1 });
reportSchema.index({ status: 1, createdAt: -1 });
```

---

## Collection: `auditlogs`

### Schema

```txt
_id           ObjectId    Auto-generated
actor         ObjectId    Ref: 'User', required
action        String      Required, e.g. 'ADMIN_DELETE_LISTING'
targetType    String      Required, e.g. 'listing', 'user', 'report'
targetId      ObjectId    Required
metadata      Object      Optional safe metadata
createdAt     Date        Auto
```

### Design Decisions

- Audit logs are useful for admin moderation and debugging sensitive actions.
- They are append-only records: normally we do not update or delete them.
- They must never store secrets, passwords, raw tokens, or private credentials.
- Full implementation can be delayed until the admin sprint.


---

## Relationships

```
User  ──< Listing       (one user has many listings)
User  ──< RefreshToken  (one user has many tokens — one per device/session)
User  ──< Favorite      (one user can favorite many listings)
User  ──< Report        (one user can report many listings)
Listing ──< Favorite    (one listing can be favorited by many users)
Listing ──< Report      (one listing can receive many reports)
Listing >── Category    (by slug string, not ObjectId reference — simpler for v1)
```

---

## MongoDB vs SQL Tradeoffs

| Concern | MongoDB choice |
|---|---|
| Flexible listing fields | ✅ MongoDB documents allow this easily |
| Embedded images array | ✅ Correct for small bounded arrays |
| Joins | ⚠️ MongoDB uses `populate()` — joins are not free |
| Transactions | ⚠️ Available but not used for v1 |
| Schema enforcement | Handled by Mongoose + Zod, not MongoDB itself |

---

## Common Beginner Mistakes (to learn from)

1. **Storing passwords in plain text** — always hash with bcrypt/argon2
2. **Returning the password field in responses** — always `.select('-password')`
3. **Not indexing frequently queried fields** — listing feed will be slow without indexes
4. **Using `any` in Mongoose types** — use proper TypeScript interfaces
5. **Not using TTL index on tokens** — expired tokens accumulate and bloat the collection
6. **Not checking if a document belongs to the requesting user** — this is BOLA
7. **Storing images directly in MongoDB** — store URLs/public IDs only, files go to Cloudinary
8. **Not handling Mongoose `populate()` nulls** — if a referenced user is deleted, `seller` can be null
