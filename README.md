# 🛡️ CC-Matting: Contamination Control Solutions

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Powered-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

Welcome to the **CC-Matting** prototype — a premium, high-performance web application designed for the contamination control industry. This platform showcases advanced industrial matting solutions with a focus on precision, durability, and technical excellence.

---

## ✨ Premium Features

### 🏢 Product Showcase

Expertly curated product lines for critical environments:

- **Heavy Duty Polymeric Mats**: 99% foot-borne contaminant removal.
- **Ergonomic Solutions**: Classic, Infinity, and Complete series designed for worker comfort and safety.
- **ESD Protection**: Specialized static-dissipative materials for sensitive electronics.

### 🔐 Multi-Role Access

A robust management system with specialized portals:

- **Admin Dashboard**: Comprehensive control over products, orders, and content.
- **Distributor Portal**: Dedicated space for authorized partners to manage requests and orders.
- **Client Interface**: Seamless browsing and discovery of matting solutions.

### 📝 Integrated Ecosystem

- **Dynamic Blog Engine**: Share industry insights and technical guides.
- **Order Management**: End-to-end tracking from request to delivery.
- **Interactive Visuals**: 3D previews and smooth GSAP-driven transitions for an immersive experience.

---

## 🛠️ Technology Stack

| Layer              | Technology                                             |
| :----------------- | :----------------------------------------------------- |
| **Frontend**       | Next.js 15 (App Router), React 19, GSAP, Framer Motion |
| **Styling**        | Tailwind CSS 4, Lucide Icons                           |
| **Backend**        | Next.js API Routes, Node.js                            |
| **Database**       | MongoDB with Mongoose                                  |
| **Authentication** | JWT, Bcrypt.js                                         |
| **Deployment**     | Vercel                                                 |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-repo/cc-matting.git
cd cc-matting/Prototype
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root and add your credentials:

```env
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
ADMIN_EMAIL=<your-admin-email>
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📚 Documentation

For more detailed information, please refer to the following guides:

- 📦 **[Product Guide](./PRODUCTS.md)** - Technical specifications and product details.
- 🏗️ **[Fixes Summary](./FIXES_SUMMARY.md)** - Overview of recent Vercel deployment fixes.
- 📡 **[API Reference](./API.md)** - Documentation for backend endpoints.
- 🛠️ **[Development Guide](./DEVELOPMENT.md)** - Architectures and coding standards.

---

## 🌐 Deployment

The application is optimized for **Vercel**.

- Automated builds via GitHub integration.
- Serverless API functions with global headers.
- Optimized image delivery and asset caching.

---

Designed with ❤️ for the Contamination Control Industry.
Design by Indidevlopers
