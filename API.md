# 📡 CC-Matting API Documentation

This document outlines the available API endpoints for the CC-Matting prototype. All API routes are prefixed with `/api`.

---

## 🔐 Authentication API

### `POST /api/auth/login`

Authenticates a user and returns a JWT token.

- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: JWT token and user details.

### `GET /api/auth/verify`

Verifies the current session token.

---

## 🏗️ Distributor API

### `POST /api/distributor`

Registers a new distributor request.

- **Body**: Company details, contact person, address, etc.

### `POST /api/distributor/login`

Login for registered distributors.

### `GET /api/distributor/me`

Fetches the authenticated distributor's profile.

### `GET /api/distributor/history`

Retrieves order history for the logged-in distributor.

---

## 📦 Products API

### `GET /api/product`

Lists all available products. Can be filtered by category or search term.

### `GET /api/product/[id]`

Fetches detailed information for a specific product.

### `POST /api/product` (Admin Only)

Creates a new product entry.

---

## 🛒 Order System

### `POST /api/order`

Submits a new order or inquiry.

- **Body**: Product ID, quantity, shipping details.

### `GET /api/order/distributor`

Returns all orders associated with the logged-in distributor.

### `PATCH /api/order/update-status` (Admin Only)

Updates the status of an order (e.g., Pending, Processing, Shipped, Delivered).

---

## 📝 Content Management (Blogs)

### `GET /api/blogs`

Returns a list of blog posts.

### `POST /api/blogs` (Admin Only)

Creates a new blog post. Supports HTML content (sanitized on server).

---

## 🛠️ Global API Standards

- **Headers**: All authenticated requests must include `Authorization: Bearer <token>`.
- **Content-Type**: `application/json`
- **Error Handling**: Standard HTTP status codes (400, 401, 403, 404, 500) with descriptive JSON bodies.
- **Security**:
  - JWT for session management.
  - Rate limiting on sensitive endpoints (login, OTP).
  - Input sanitization using `DOMPurify` for HTML content.

---

> [!TIP]
> Use the [Swagger documentation](https://prototype-alpha-six.vercel.app/api-docs) (if enabled) for interactive testing of these endpoints.
