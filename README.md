![CC-Matting Banner](https://prototype-alpha-six.vercel.app/RedmeBanner.png)

# 🛡️ CC-Matting: Contamination Control

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

Welcome to the **CC-Matting** prototype — a premium web application designed for the contamination control industry. Focusing on precision, durability, and a top-tier user experience.

---

## ✨ Features

- **Product Showcase**: Detailed highlights of Heavy Duty, Ergonomic, and ESD Matting solutions.
- **Role-Based Access**: Dedicated portals for Administrators and Distributors.
- **Advanced UI**: Powered by **GSAP** and **Tailwind CSS 4.0** for a fluid, premium feel.
- **Dynamic Content**: Full-stack integration with MongoDB for blogs and order management.

---

## 🚀 Getting Started

```bash
# Clone and install
git clone https://github.com/your-repo/cc-matting.git
pnpm install

# Setup variables (.env)
MONGODB_URL=...
JWT_SECRET=...

# Run locally
pnpm dev
```

---

## 📁 Architectural Overview

A modular and scalable structure optimizing for performance and maintainability.

```text
Prototype/
├── app/                  # Next.js App Router
│   ├── api/              # Server-side API endpoints
│   ├── (auth)/           # Authentication routes
│   ├── admin/            # Administrative control center
│   ├── distributor/      # Partner management portal
│   ├── layout.js         # Global shell & metadata
│   └── page.js           # Interactive landing page
├── src/                  # Core Business Logic
│   ├── components/       # Component Architecture (Atomic design)
│   ├── utils/            # Logic helpers & constant definitions
│   └── data/             # Static datasets & configurations
├── public/               # Asset Pipeline (Images, Videos, Icons)
├── .env                  # Environment Variables
└── next.config.mjs       # Build & Proxy Configuration
```

---

Designed with ❤️ for the Contamination Control Industry.
Design by Indidevlopers
