<div align="center">

<img src="public/assets/logo.png" alt="Qodum Logo" width="120"/>

# Qodum

**A full-stack School Management ERP System**

Built to replace scattered spreadsheets and manual processes with one system that actually reflects how a school runs.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/status-active--development-orange)

<img src="https://res.cloudinary.com/jobook/image/upload/v1782427158/Dashboard_aa1uqs.png" alt="Admin Dashboard" width="300"/>
<img src="https://res.cloudinary.com/jobook/image/upload/v1782427241/Admission_pvlrm4.png" alt="Student Admission" width="300"/>
<img src="https://res.cloudinary.com/jobook/image/upload/v1782427753/Fee_Receipt_flgfsu.png" alt="Fee Management" width="300"/>
<img src="https://res.cloudinary.com/jobook/image/upload/v1782427383/Report_hmzsaj.png" alt="Reports Module" width="300"/>

</div>

---

## 📖 Overview

Qodum is a modular ERP system for schools, built around how a school actually operates rather than as a generic admin template.

Instead of one monolithic dashboard, Qodum is split into independent, role-aware modules — each with its own data models, server actions, and UI — that share a single authentication and permissions layer.

---

## ✨ Core Modules

| Module | What it handles |
|---|---|
| 💰 **Fees** | Fee structures, master settings, transport fees, transaction reports, fee collection |
| 📝 **Admission** | Admission workflow, global masters, master settings, admission reports |
| 📊 **Accounts** | Ledgers, account masters, global accounting settings |
| 👥 **Users** | User creation, roles, permissions, profile management |
| 💵 **Payroll** | Employee payroll, global masters, master settings |
| 📦 **Stocks** | Inventory / stock tracking |
| 🗓️ **Time Table** | Class scheduling, global masters |
| ✅ **Attendance** | Attendance tracking |
| 📈 **Marks** | Student marks and grading |
| 📚 **Library** | Library management |
| 🎓 **Examination** | Exams management |
| 🩺 **Qodum Care** | Support/helpdesk module |

Each module follows the same pattern: **global masters → master settings → day-to-day operations → reports**, so the system stays predictable as new modules get added.

---

## 🔐 Authentication & Access Control

- Custom **username/password auth** — no third-party auth provider, built directly into the app
- Passwords hashed with **bcrypt** before storage, never stored in plaintext
- **JWT-based sessions** (`JWT_SECRET`) for authenticated requests
- **Role-based permissions**, stored per user as a permissions array, with a dedicated `is_admin` flag for elevated access
- Client-side session state managed through a custom `AuthContext`

---

## 🏗️ Architecture

- **Framework:** Next.js 14 (App Router), using **server actions** to handle backend logic directly within the framework — no separate backend service to deploy or maintain
- **Language:** TypeScript throughout, including data models, validation schemas, and server actions, for type safety across a large, multi-module codebase
- **Database:** MongoDB with Mongoose, with data models organized per module (`lib/models/{fees,accounts,admission,payroll,users}`)
- **Validation:** [Zod](https://zod.dev/) schemas paired with `react-hook-form` for type-safe form handling on both client and server
- **UI Layer:** Radix UI primitives + shadcn-style components (`components/ui`) on top of Tailwind CSS
- **File Storage:** AWS S3 for uploaded files and documents
- **Payments:** Easebuzz payment gateway integration for fee collection
- **PDF Generation:** `@react-pdf/renderer` for generating printable reports, receipts, and documents
- **Data Export:** XLSX export support for reports

### Folder structure

```
qodum-web/
├─ app/
│  ├─ (auth)/        → Sign-in flow
│  └─ (root)/        → One route group per module (fees, admission, accounts, ...)
├─ components/
│  ├─ dashboards/     → Role-based dashboard views per module
│  ├─ modules/        → Module-specific UI components
│  └─ ui/             → Shared design system (Radix + shadcn-style)
├─ pagesComps/         → Page-level components, organized by module → sub-section
├─ lib/
│  ├─ actions/         → Server actions, organized per module
│  ├─ models/          → Mongoose schemas, organized per module
│  └─ validations/      → Zod validation schemas
├─ constants/           → Module configuration and static data
└─ context/              → Global client-side state (auth, app state)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB instance (Atlas or self-hosted)
- An AWS S3 bucket (for file uploads)

### Installation

```bash
git clone https://github.com/jonathanadel-dev/qodum-web.git
cd qodum-web
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
MONGO_ACCOUNTS_URL=

# Auth
JWT_SECRET=

# AWS S3
NEXT_PUBLIC_AWS_ACCESS_KEY=
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=
NEXT_PUBLIC_AWS_REGION=
NEXT_PUBLIC_AWS_BUCKET_NAME=

# Payments (Easebuzz)
NEXT_PUBLIC_EASEBUZZ_TEST_ACCESS_KEY=

# API
NEXT_PUBLIC_API_URL=
```

### Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Next.js 14, TypeScript, Tailwind CSS |
| Backend | Next.js Server Actions (no separate backend service) |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt, custom role-based permissions |
| Forms & Validation | React Hook Form, Zod |
| UI Components | Radix UI, shadcn-style components, Lucide icons |
| File Storage | AWS S3 |
| Payments | Easebuzz |
| Reports | @react-pdf/renderer, Chart.js, XLSX export |
| Deployment | Vercel |

---

## 📌 Project Status

Qodum is in **active, ongoing development**

---

<div align="center">

Built and maintained by **Jonathan Adel**

</div>
