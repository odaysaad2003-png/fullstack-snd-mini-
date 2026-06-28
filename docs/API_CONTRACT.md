# API Contract — SND Mini

This document defines the planned API surface for SND Mini v1.
All endpoints use the base path `/api/v1`.

Sprint 0 defines the planned contract only. Endpoints are implemented gradually by sprint.

---

## Standard Response Envelope

### Success
```json
{
  "success": true,
  "data": {},
  "message": "Optional"
}
```

### Error
```json
{
  "success": false,
  "error": {
    "message": "Descriptive error",
    "code": "OPTIONAL_CODE"
  }
}
```

---

## Health Module — `/api/v1/health`

### GET `/api/v1/health`
Check whether the backend is running. Sprint 1 may also include database connection status.

**Auth required:** No

**Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "snd-mini-api",
    "database": "connected"
  }
}
```

---

## Auth Module — `/api/v1/auth`

### POST `/api/v1/auth/register`
Register a new user.

**Auth required:** No  
**Rate limited:** Yes

**Request body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars)"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "role": "user",
      "createdAt": "ISO date"
    },
    "accessToken": "JWT string"
  }
}
```

**Cookie set:** `refreshToken` (httpOnly, secure in production, sameSite strict or lax depending on deployment needs)

---

### POST `/api/v1/auth/login`
Login with email and password.

**Auth required:** No  
**Rate limited:** Yes

**Request body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    },
    "accessToken": "JWT string"
  }
}
```

**Cookie set:** `refreshToken` (httpOnly)

---

### POST `/api/v1/auth/refresh`
Get a new access token using the refresh token cookie.

**Auth required:** No, uses cookie  
**Rate limited:** Moderately

**Request:** No body. Reads `refreshToken` cookie.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "JWT string"
  }
}
```

**Cookie updated:** New `refreshToken` cookie after rotation.

---

### POST `/api/v1/auth/logout`
Logout the current user.

**Auth required:** Yes

**Request:** No body.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Cookie cleared:** `refreshToken`

---

## Users Module — `/api/v1/users`

### GET `/api/v1/users/me`
Get the current authenticated user's profile.

**Auth required:** Yes

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "phone": "string | null",
      "role": "string",
      "createdAt": "ISO date"
    }
  }
}
```

---

### PATCH `/api/v1/users/me`
Update the current user's profile.

**Auth required:** Yes

**Request body, all optional:**
```json
{
  "name": "string",
  "phone": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { }
  }
}
```

---

### DELETE `/api/v1/users/me`
Delete the current user's account and soft-delete their listings.

**Auth required:** Yes

**Request body:**
```json
{
  "password": "string (required for confirmation)"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Account deleted"
}
```

---

## Listings Module — `/api/v1/listings`

`listings` is the technical domain name. In Arabic UI, it can be displayed as إعلانات or منشورات depending on context.

### GET `/api/v1/listings`
Browse public active listings. Supports search, filters, sorting, and pagination.

**Auth required:** No

**Query params:**
```txt
q         — search query (title/description)
category  — category slug
minPrice  — minimum price
maxPrice  — maximum price
page      — page number (default 1)
limit     — items per page (default 20, max 50)
sort      — newest | oldest | price_asc | price_desc
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "listings": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

---

### GET `/api/v1/listings/:id`
Get a single listing by ID.

**Auth required:** No

**Response (200):**
```json
{
  "success": true,
  "data": {
    "listing": {
      "_id": "string",
      "title": "string",
      "description": "string",
      "price": 0,
      "currency": "ILS",
      "category": "string",
      "images": [
        { "url": "string", "publicId": "string" }
      ],
      "phone": "string | null",
      "location": "string",
      "seller": {
        "_id": "string",
        "name": "string"
      },
      "status": "active",
      "createdAt": "ISO date"
    }
  }
}
```

---

### POST `/api/v1/listings`
Create a new listing.

**Auth required:** Yes

**Request body:**
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "price": "number (required)",
  "currency": "ILS | USD | JOD | SAR (required)",
  "category": "string (required)",
  "phone": "string (optional)",
  "location": "string (required)",
  "images": [
    { "url": "string", "publicId": "string" }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "listing": { }
  }
}
```

---

### PATCH `/api/v1/listings/:id`
Update a listing. Owner only.

**Auth required:** Yes, must be listing owner

**Response (200):**
```json
{
  "success": true,
  "data": {
    "listing": { }
  }
}
```

---

### DELETE `/api/v1/listings/:id`
Delete a listing. Owner or admin only.

**Auth required:** Yes, owner or admin

**Response (200):**
```json
{
  "success": true,
  "message": "Listing deleted"
}
```

---

## Images Module — `/api/v1/images`

### POST `/api/v1/images/upload`
Upload an image to Cloudinary.

**Auth required:** Yes  
**Content-Type:** `multipart/form-data`

**Form fields:**
```txt
file — image file (required)
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "snd-mini/..."
  }
}
```

---

### DELETE `/api/v1/images/:publicId`
Delete an image from Cloudinary.

**Auth required:** Yes, must own the listing the image belongs to, or admin

**Response (200):**
```json
{
  "success": true,
  "message": "Image deleted"
}
```

---

## Favorites Module — `/api/v1/favorites`

Favorites are planned for v1 but are not part of Sprint 1.

### GET `/api/v1/favorites`
List the authenticated user's favorite listings.

**Auth required:** Yes

---

### POST `/api/v1/favorites/:listingId`
Add a listing to the authenticated user's favorites.

**Auth required:** Yes

**Expected behavior:** Prevent duplicate favorites with a unique compound index on `user + listing`.

---

### DELETE `/api/v1/favorites/:listingId`
Remove a listing from the authenticated user's favorites.

**Auth required:** Yes

---

## Reports Module — `/api/v1/reports`

Reports are planned for v1 but are not part of Sprint 1.

### POST `/api/v1/reports`
Report a listing for moderation.

**Auth required:** Yes

**Request body:**
```json
{
  "listingId": "string (required)",
  "reason": "spam | scam | inappropriate | duplicate | other",
  "details": "string (optional)"
}
```

**Expected behavior:** Store the report for admin review. Do not automatically hide the listing in v1.

---

## Admin Module — `/api/v1/admin`

All admin routes require a valid access token and `role: 'admin'`.

### GET `/api/v1/admin/stats`
Basic platform statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 0,
    "totalListings": 0,
    "activeListings": 0,
    "openReports": 0
  }
}
```

---

### GET `/api/v1/admin/users`
List all users with pagination.

**Query params:** `page`, `limit`, `q`

---

### PATCH `/api/v1/admin/users/:id/deactivate`
Deactivate a user account.

---

### GET `/api/v1/admin/listings`
List all listings with pagination and filters.

---

### DELETE `/api/v1/admin/listings/:id`
Force-delete or soft-delete any listing according to the final admin moderation decision.

---

### GET `/api/v1/admin/reports`
List submitted reports for moderation.

---

### PATCH `/api/v1/admin/reports/:id/status`
Update a report status.

**Request body:**
```json
{
  "status": "open | reviewed | dismissed | action_taken"
}
```

---

## HTTP Status Codes Used

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Bad request / validation error |
| 401 | Unauthenticated |
| 403 | Unauthorized, wrong role, or not owner |
| 404 | Not found |
| 409 | Conflict, e.g. duplicate email or duplicate favorite |
| 422 | Unprocessable entity |
| 429 | Too many requests |
| 500 | Internal server error |

---

## Notes

- All dates are ISO 8601 format in UTC.
- Passwords are never returned in any response.
- `publicId` for images is needed for Cloudinary deletion.
- Pagination is page-based offset pagination for v1.
- Ownership and role checks are enforced in the backend, never only in the frontend.
