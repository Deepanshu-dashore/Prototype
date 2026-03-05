# 🛠️ Development Guide

This guide describes the project structure, coding standards, and workflows for the CC-Matting prototype.

---

## 📁 Directory Structure

```text
/Prototype
├── app/                  # Next.js App Router (Pages, Layouts, API)
│   ├── api/              # Backend routes (Auth, Products, Orders)
│   ├── (admin)/          # Grouped routes for Admin portal
│   ├── (distributor)/    # Grouped routes for Distributor portal
│   └── lib/              # Shared server-side logic (Security, DB, Mails)
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── home/         # Home page specific components
│   │   ├── products/     # Product page components
│   │   └── share/        # Shared components (Footer, Navbar)
│   ├── utils/            # Frontend utility functions and data
│   └── context/          # React Context providers (Auth, Theme)
├── public/               # Static assets (Images, Icons)
└── .env                  # Environment variables
```

---

## 🎨 UI & Design Principles

- **Framework**: Tailwind CSS 4.0 for utility-first styling.
- **Animations**:
  - **GSAP**: Used for complex, scroll-triggered animations.
  - **Framer Motion**: Used for micro-interactions and simple state transitions.
- **Glassmorphism**: A core design element used in cards and dashboards for a premium feel.
- **Responsiveness**: All components must be mobile-first and tested across breakpoints.

---

## 🏗️ State Management

- **User Auth**: Handled via `AuthContext` to persist sessions across the app.
- **Forms**: Managed using `react-hook-form` paired with `zod` for schema validation.
- **Data Fetching**: Primarily using `axios` with custom hooks for reusability.

---

## 🔐 Security Standards

- **Input Sanitization**: All user-provided HTML (like in blogs) must be sanitized using `DOMPurify`.
- **API Security**:
  - Use `bcryptjs` for password hashing.
  - Implement rate limiting on sensitive routes.
  - Secure API routes with JWT verification middleware.
- **CORS**: Configured in `vercel.json` and API route handlers for cross-origin safety.

---

## 🔄 Git Workflow

1. **Feature Branches**: Create a branch for every new feature (`feature/login-fix`).
2. **Commit Messages**: Use descriptive prefix tags (`fix:`, `feat:`, `docs:`, `chore:`).
3. **Pull Requests**: Ensure all linting passes before merging to `main`.

---

## 🧪 Testing

- **Local testing**: Run `pnpm dev` and verify manual flows.
- **API testing**: Use `curl` or Postman to verify new endpoints against local/staged environments.

---

> [!IMPORTANT]
> Always verify that your changes do not break the Vercel serverless runtime. Refer to [FIXES_SUMMARY.md](file:///e:/Repository/CC-Matting-Next/Prototype/FIXES_SUMMARY.md) for critical deployment caveats.
