# 🌍 **Pathfinder – Local Guide Platform (Frontend)**

A modern, responsive frontend for the **Pathfinder** platform — connecting tourists with local guides for authentic travel experiences.
Built with **Next.js 16**, **TailwindCSS 4**, **shadcn/ui**, **Radix UI**, and a modular, scalable architecture.

🔗 **Frontend Live URL:** [https://local-guide-frontend-mocha.vercel.app/](https://local-guide-frontend-mocha.vercel.app/)
🔗 **Backend API:** [https://local-jet.vercel.app/](https://local-jet.vercel.app)
🔗 **Backend Repository:** [https://github.com/istiak19/local-guide-backend](https://github.com/istiak19/local-guide-backend)
🔗 **Frontend Repository:** [https://github.com/istiak19/Pathfinder-Frontend](https://github.com/istiak19/Pathfinder-Frontend)

---

## 📌 **Table of Contents**

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [Services & API Layer](#services--api-layer)
8. [Authentication & Role System](#authentication--role-system)
9. [Dashboard Structure](#dashboard-structure)
10. [UI & Styling](#ui--styling)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)
13. [Contributors](#contributors)
14. [License](#license)

---

## 🔎 **Overview**

Pathfinder Frontend is a fully responsive web client for tourists, guides, and admins.
It integrates tightly with the Pathfinder backend to provide:

* Multi-role authentication
* Listings browsing & filtered search
* Booking management
* Payment flow initiation (SSLCommerz)
* Role-specific dashboards (Admin, Guide, Tourist)
* Review system
* Protected routing
* Fully responsive UI with shadcn/ui components

---

## ⭐ **Features**

### **1. User Authentication**

* Login & registration pages
* JWT stored securely in cookies
* Auto-session refresh
* Protected routes with middleware
* Role-based access

### **2. Multi-Role Dashboards**

* **Tourist Dashboard:** bookings, payments, history
* **Guide Dashboard:** manage listings, bookings, reviews
* **Admin Dashboard:** manage users, listings, platform data

### **3. Listings**

* Browse and filter tour listings
* Details page
* Guide listing management

### **4. Bookings**

* Tourists request a booking
* Guides approve or decline
* Admin oversight

### **5. Responsive UI**

* Built using **shadcn/ui + Radix UI**
* Custom shared components
* Dark/light theme support with `next-themes`

### **6. Payment Integration**

* Initiate payment through backend via SSLCommerz
* Auto-redirect after payment success/failure

---

## 🧰 **Tech Stack**

| Category      | Technology                          |
| ------------- | ----------------------------------- |
| Framework     | Next.js 16 (App Router)             |
| Styling       | TailwindCSS 4, shadcn/ui            |
| UI library    | Radix UI                            |
| State & Hooks | React 19                            |
| Animation     | Framer Motion                       |
| Charts        | Recharts                            |
| Forms         | Custom hooks + shadcn inputs        |
| Auth          | JSON Web Tokens                     |
| Utilities     | date-fns, clsx, Keen Slider, Swiper |
| Deployment    | Vercel                              |

---

## 📁 **Project Structure**

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   │
│   ├── (commonLayout)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── (dashboardLayout)/
│   │   ├── layout.tsx
│   │   ├── _components/
│   │   ├── (commonProtectedLayout)/
│   │   ├── admin/
│   │   ├── guide/
│   │   └── tourist/
│   │
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── loader.tsx
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── common/
│   ├── forms/
│   └── shared/
│
├── services/
│   ├── axiosInstance.ts
│   ├── auth.service.ts
│   ├── booking.service.ts
│   ├── guide.service.ts
│   ├── admin.service.ts
│   ├── payment.service.ts
│   └── user.service.ts
│
├── hook/
│   ├── useAuth.ts
│   ├── useUser.ts
│   ├── useRole.ts
│   └── useDebounce.ts
│
├── lib/
│   ├── session.ts
│   ├── token.ts
│   ├── protectRoute.ts
│   ├── helpers.ts
│   ├── validation/
│   └── constants.ts
│
├── types/
├── utility/
│   ├── fetcher.ts
│   ├── numbers.ts
│   ├── date.ts
│   ├── cn.ts
│   └── storage.ts
│
├── proxy.ts
└── .env.local
```

---

## 🔐 **Environment Variables**

Your `.env.local` file should include:

```
NEXT_PUBLIC_API_URL="https://your-backend-url.com"
JWT_SECRET="your_jwt_secret"
```

Depending on your setup, you may also include:

```
NEXT_PUBLIC_IMAGE_UPLOAD_URL=""
NEXT_PUBLIC_APP_NAME="Pathfinder"
```

---

## 🌐 **Services & API Layer**

All API communication happens through:

```
services/
├── axiosInstance.ts  // sets baseURL, interceptors
├── auth.service.ts
├── booking.service.ts
├── guide.service.ts
├── admin.service.ts
├── payment.service.ts
└── user.service.ts
```

Key features:

* Auto-inject JWT token on requests
* 401 auto-logout
* Error normalization
* Type-safe responses

---

## 🔐 **Authentication & Role System**

The frontend uses:

* JWT extracted from cookies
* `lib/session.ts` for decoding
* `useAuth`, `useUser`, `useRole` hooks
* `protectRoute.ts` to guard dashboards

Role-guarded layout folders:

```
src/app/(dashboardLayout)/admin/
src/app/(dashboardLayout)/guide/
src/app/(dashboardLayout)/tourist/
```

---

## 📊 **Dashboard Structure**

### **Admin**

* Manage users
* Manage listings
* View overall bookings
* Analytics (Recharts)

### **Guide**

* Manage own listings
* View & accept bookings
* Earnings & reviews

### **Tourist**

* Browse listings
* Book tours
* Make payments
* Track booking history

---

## 🎨 **UI & Styling**

* **Tailwind v4** used for global styling
* **shadcn/ui** for reusable components
* **Radix UI** for accessibility
* **Framer Motion** for animations
* **Swiper / Keen Slider** for carousels
* **Dark mode** support via `next-themes`

Shared UI:

```
components/ui/
components/common/
components/shared/
```

---

## 🚀 **Deployment**

The project is optimized for **Vercel deployment**.

Build command:

```
npm run build
```

Start command:

```
npm start
```

Ensure environment variables are added in **Vercel Dashboard → Settings → Environment Variables**.

---

## 🧯 **Troubleshooting**

| Issue                 | Fix                                        |
| --------------------- | ------------------------------------------ |
| CORS or 401 errors    | Check base API URL & token                 |
| Dashboard not loading | Confirm role & `protectRoute` logic        |
| Axios errors          | Verify backend is running                  |
| Images not loading    | Check Cloudinary/S3 env vars               |
| Payment failing       | Ensure backend SSLCommerz keys are correct |

---

## 👤 **Contributors**

* **Istiak Ahamed** – Full-Stack Developer