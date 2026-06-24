Created & Developed by [Mubashir Ali](#developer-creator) (Full-Stack Healthcare Technology Engineer | AI Healthcare Solutions Builder)

# PatientIQ — AI-Powered Patient Portal

> **Healthcare system by [Med Clinic X](http://www.medclinicx.com/)**

PatientIQ is a production-quality, HIPAA-compliant healthcare SaaS platform and **AI-powered Patient Portal** built for **Med Clinic X**. Designed as an intelligent clinical operating system, it bridges the gap between patient self-management, clinician note dictation, and clinic administration.

---

## 1. Product Vision: "AI Healthcare Operating System"
Traditional patient portals are passive databases. PatientIQ transforms this experience into a dynamic, collaborative health journey:
*   **Patients** experience a visual, narrative-driven health story with automated timelines, AI clinical alerts, appointment preparation cards, a digital insurance wallet, and simulated voice chats.
*   **Clinicians** benefit from high-level patient briefing widgets and AI SOAP note dictation templates.
*   **Administrators** monitor system health via a compliance audit log, CRM business analytics, an n8n-style visual automation canvas, and API connectors for third-party systems like Epic EHR.

---

## 2. Technology Stack & Directory Structure

### Core Tech Stack
*   **Framework**: Next.js App Router (React Server Components, Server Actions)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4 (Vanilla styling with premium glassmorphic cards and micro-animations)
*   **Database**: Prisma ORM with a PostgreSQL driver (using `@prisma/adapter-pg` pool management)
*   **Authentication**: Auth.js (NextAuth.js v5 Beta) with Credentials credentials flow and edge-compatible middleware
*   **Icons**: Lucide React

### Directory Mapping
```text
PatientIQ/
├── prisma/
│   ├── schema.prisma         # Database structure & relationships
│   └── seed.ts               # Local database seed file with mockup users
├── src/
│   ├── app/                  # Next.js App Router folders
│   │   ├── admin/            # Compliance desk, CRM analytics, automation
│   │   ├── api/auth/         # Auth.js endpoint handlers
│   │   ├── doctor/           # Clinical agenda, patient files, SOAP notes
│   │   ├── patient/          # Milestones timeline, wallet, secure chat
│   │   ├── features/         # Marketing features details
│   │   ├── pricing/          # SaaS pricing details
│   │   ├── security/         # HIPAA security parameters
│   │   ├── support/          # Helpdesk & FAQ
│   │   ├── page.tsx          # Marketing home landing page
│   │   ├── layout.tsx        # HTML root layout wrapper
│   │   └── icon.svg          # Brand favicon
│   ├── components/           # Reusable React components
│   │   ├── ui/               # Base UI (Button, Card, Dialog, Table, etc.)
│   │   ├── navbar.tsx        # Sticky navigation header
│   │   └── footer.tsx        # Standard footer component
│   ├── lib/                  # Library configurations
│   │   ├── data-access.ts    # Central data querying & fail-safe fallback check
│   │   ├── db.ts             # Prisma client adapter initialization
│   │   ├── mock-db.ts        # Dynamic demo datasets
│   │   └── utils.ts          # Tailwind CSS merge utility
│   ├── auth.ts               # Credentials handler & authentication config
│   ├── auth.config.ts        # Edge-safe routing middleware configuration
│   └── middleware.ts         # Route protection middleware
├── .npmrc                    # Legacy-peer-deps resolver config for Next.js v16
├── package.json              # Project dependencies & build scripts
└── prisma.config.ts          # Prisma CLI configurations
```

---

## 3. Database Architecture & Schema
PatientIQ uses a normalized relational database schema defined in `prisma/schema.prisma`. 

### Key Database Models
*   **User**: Core identity model supporting standard roles (`ADMIN`, `DOCTOR`, `PATIENT`).
*   **Patient**: Demographics, emergency contact parameters, and connections to health files.
*   **Doctor**: Specialty registers, license numbers, and clinic calendars.
*   **MedicalRecord**: Records logged by physicians (allergies, medications, conditions, visits).
*   **Document**: Secure papers uploaded by patients (lab reports, discharge summaries).
*   **LabResult**: Numeric panel diagnostics with normal/high/critical status flags.
*   **Appointment**: Scheduled consultations between patients and doctors.
*   **Message**: End-to-end encrypted messaging records between portal users.
*   **AuditLog**: HIPAA logs recording user, action, timestamp, and client IP addresses.

### Fail-Safe Database Fallback
To ensure maximum availability, PatientIQ includes an automatic database adapter fallback ([src/lib/db.ts](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/lib/db.ts)). If the primary PostgreSQL instance is offline or inaccessible during runtime:
1. The system catches the query exception.
2. It sets an internal fallback flag (`useMock = true`).
3. The platform transparently resolves queries using an in-memory mock database ([src/lib/mock-db.ts](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/lib/mock-db.ts)).
4. This keeps the demo dashboard fully browseable and interactive for evaluation.

---

## 4. Advanced AI & SaaS Feature Modules

### AI Health Timeline & Diagnostics Panel
*   **Location**: [patient/medical-history/page.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/patient/medical-history/page.tsx)
*   **timeline**: Renders a vertical timeline showing patient diagnoses, visits, and lab panels from 2019 to 2026.
*   **Intelligence Panel**: Extracts vital metrics (e.g. LDL down 18%) and compiles a copyable **Doctor Discussion Checklist** based on uploaded PDFs.

### AI Appointment Prep Assistant
*   **Location**: [patient/appointments/appointments-client.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/patient/appointments/appointments-client.tsx)
*   **Briefing Card**: Takes current symptoms and constructs a 3-point briefing sheet to help patients prepare for checkups.

### AI Doctor Briefing & SOAP Note Dictator
*   **Location**: [doctor/patients/patients-client.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/doctor/patients/patients-client.tsx)
*   **Summary**: Concise clinical brief of patient status displayed at the top of the details panel.
*   **SOAP Dictator**: Simulated speech dictation that captures verbal notes and auto-formats them into Subjective, Objective, Assessment, and Plan columns.

### Digital Medical Wallet
*   **Location**: [patient/wallet/page.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/patient/wallet/page.tsx)
*   **Insurance Card**: Fully interactive 3D card flip rendering policy numbers, group IDs, and provider relations contacts.
*   **Registry**: Verified vaccine logs and pharmacy Rx refills.

### Secure messaging rooms
*   **Location**: [patient/messaging/page.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/patient/messaging/page.tsx) and [doctor/messaging/page.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/doctor/messaging/page.tsx)
*   **Encrypted Rooms**: Direct doctor-patient chat simulation supporting typing indicators, online statuses, and PDF file sharing.

### Admin Automation Engine & Connectors
*   **Location**: [admin/automation/page.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/admin/automation/page.tsx) and [admin/integrations/page.tsx](file:///c:/Users/Mubashir%20Ali/Desktop/PatientIQ/src/app/admin/integrations/page.tsx)
*   **Workflow Canvas**: Visual n8n-style visual node editor executing test pipelines (e.g. triggering a Twilio SMS on appointment creation).
*   **API Connectors**: Real-time webhook checkers validating connections to Stripe, Epic EHR, and Google Calendar.

---

## 5. Local Development Setup

### 1. Installation
Install the project dependencies (bypassing peer-dependency checks automatically via the `.npmrc` file):
```bash
npm install
```

### 2. Database Synchronization
Synchronize your Prisma schema definitions and push the database schema to your local PostgreSQL server:
```bash
npx prisma db push
```

### 3. Database Seeding
Seed local database tables with quick-fill users (Patient, Doctor, Admin profiles):
```bash
npx ts-node --compiler-options "{\"module\":\"commonjs\"}" prisma/seed.ts
```

### 4. Running the App
Run the local Next.js developer compilation server:
```bash
npm run dev
```

---

## 6. Vercel Deployment & Environment Variables

When deploying to Vercel, the build pipeline runs `prisma generate` automatically. 

### Mandatory Environment Configuration
Add these variables in your **Vercel Project Settings**:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `AUTH_SECRET` | Auth.js security cookie secret | `t83bA20f1e5a028590be4641fbe4641` |
| `AUTH_TRUST_HOST` | Middleware host trust flag | `true` |

---

## 7. Attribution

PatientIQ is a healthcare system built and managed by **[Med Clinic X](http://www.medclinicx.com/)**.

🌐 **Website**: [www.medclinicx.com](http://www.medclinicx.com/)

---

<a id="developer-creator"></a>
## 👤 Developer & Creator

I am a Full-Stack Healthcare Technology Developer specializing in building modern, scalable, and AI-powered healthcare platforms. I create high-performance digital solutions using React.js, Next.js, TypeScript, and Tailwind CSS to deliver fast, secure, and user-friendly experiences.

My expertise covers complete application development, from frontend architecture and responsive interfaces to backend systems powered by Node.js, REST APIs, GraphQL, PostgreSQL, and Prisma ORM. I build reliable platforms designed for scalability, performance, and long-term growth.

I work with modern cloud infrastructure including AWS, Vercel Edge, Google Cloud, Cloudflare CDN, Docker, and CI/CD pipelines to deploy secure and optimized applications.

With a strong focus on healthcare technology, I develop solutions including patient portals, AI automation systems, EHR integrations, and healthcare applications built around industry standards such as FHIR APIs and HIPAA compliance requirements.

My goal is to combine modern software engineering, cloud technologies, and healthcare innovation to help organizations build smarter digital experiences that improve patient engagement, operational efficiency, and healthcare delivery.

### 📫 Connect with Me

- 💼 **LinkedIn**: <a href="https://linkedin.com/in/mubashirali822" target="_blank" rel="noopener noreferrer">mubashirali822</a>
- 📧 **Email**: <a href="mailto:alimubashir822@gmail.com" target="_blank" rel="noopener noreferrer">alimubashir822@gmail.com</a>
- 🌐 **Website**: <a href="https://www.medclinicx.com/" target="_blank" rel="noopener noreferrer">medclinicx.com</a>
- 🏥 **View More Healthcare Solutions**: <a href="https://www.medclinicx.com/demo" target="_blank" rel="noopener noreferrer">medclinicx.com/demo</a>

⭐ *Building the next generation of digital healthcare technology.*
