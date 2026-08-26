# 🏥 Amna Skin & Hair Clinic — Project Memory & Handoff Document

> **Last Updated:** August 26, 2026  
> **Project Directory:** `D:\skin care website`  
> **GitHub Repositories:**  
> - `https://github.com/cartify11/amna-skin.git` (Primary)  
> - `https://github.com/cartify11/skin.git` (Secondary Sync)  
> **Deployment Platform:** Vercel (Continuous Deployment on `main` branch push)  

---

## 📌 1. Project Overview & Tech Stack

| Item | Details |
| :--- | :--- |
| **Clinic Branding** | **Amna Skin & Hair Clinic** (Configurable via Admin Settings) |
| **Framework** | **React 19** (TypeScript) + **Vite 8** |
| **Routing** | **React Router DOM 7** (Multi-Page Architecture + Deep Linking) |
| **Styling** | **Tailwind CSS 4** + Custom Medical Aesthetic Palette (`#0B2521` Deep Forest Green, `#C89B7B` Luxury Gold, `#FDFBF7` Alabaster) |
| **Icons** | **Lucide React** |
| **Local Storage Sync** | Persistent offline/browser storage for Appointments, Doctors, Services, and Settings |
| **Backend Archive** | `server.zip` (Complete Express REST API with Prisma PostgreSQL schema) |

---

## 🌐 2. Multi-Page Architecture & Routes

| Route | Page File | Description & Capabilities |
| :--- | :--- | :--- |
| **`/`** | `src/pages/HomePage.tsx` | Main landing experience: Hero banner, Why Choose Us, Featured Treatments, Before/After preview, Reviews, Map snippet. |
| **`/about`** | `src/pages/AboutPage.tsx` | Clinic Heritage, 3D Diagnostic analysis, FDA-approved technology suites, 4 Medical Practice Pillars, Hospital-grade sterility. |
| **`/services`** | `src/pages/ServicesPage.tsx` | Categorized treatment catalog with live search filter, pricing tags, Full Pricing Catalog Modal, and 1-Click "Book Treatment" buttons. |
| **`/doctors`** | `src/pages/DoctorsPage.tsx` | Board-certified physician profiles, Harvard/Johns Hopkins degrees, clinical experience, specialties tags, Direct Doctor booking. |
| **`/gallery`** | `src/pages/GalleryPage.tsx` | Real patient clinical case studies with interactive Before/After comparison split sliders (Acne & Hair Loss). |
| **`/appointment`** | `src/pages/AppointmentPage.tsx` | Dedicated full-page interactive slot booking. Supports URL query params (e.g. `?service=Botox&doctor=Dr.+Sarah`) to pre-select dropdowns. |
| **`/contact`** | `src/pages/ContactPage.tsx` | Clinic location, operating hours, direct phone, WhatsApp chat, and patient inquiry consultation form. |
| **`/admin`** | `src/admin/AdminLayout.tsx` | Protected Medical Admin Control Center for appointments, doctors, services, settings, and contact messages. |

---

## 🔒 3. Admin Portal Specifications & Credentials

- **Direct Route:** `/admin` or `/#admin`
- **Floating Quick Switcher:** Bottom-left corner pill (`🔒 Admin Portal`)
- **Login Credentials:**
  - **Email:** `admin@auraskinclinic.com` (or `admin@amna.com`)
  - **Password:** `admin123`
  - **Role:** `SUPER_ADMIN`

### Admin Management Views:
1. **Appointments View (`AdminAppointmentsView.tsx`)**:
   - Displays all patient booking requests.
   - **1-Click Action Buttons**: `✓ Confirm`, `✓ Mark Completed`, `✕ Cancel`.
2. **Doctors Management (`AdminDoctorsView.tsx`)**:
   - Add new doctors or edit existing profiles (Name, Title, Degree, Experience, Specialties, Status).
   - Image upload support with live image preview.
3. **Services & Pricing (`AdminServicesView.tsx`)**:
   - Add, edit, or archive clinical treatments with pricing and session durations.
4. **Clinic Settings & Branding (`AdminSettingsView.tsx`)**:
   - Change Clinic Name ("Amna Clinic"), Logo initial, Phone, WhatsApp, Address, Operating Hours.
   - Dispatches `clinic_settings_updated` event to update the whole website instantly without page reload.
5. **Contact Messages Inbox (`AdminContactsView.tsx`)**:
   - View, search, and mark patient inquiries received through the website contact form.
6. **Gallery & Testimonials Views**:
   - Manage patient transformation photos and review ratings.

---

## 🖼️ 4. Local High-Definition Images Directory (`public/images/`)

All images are stored locally to prevent external CDN link breakage:

| Image File | Description / Usage |
| :--- | :--- |
| `hero_clinic.jpg` | Luxury clinical interior background & treatment room |
| `doctor_female_sarah.jpg` | Dr. Sarah Jenkins, MD portrait |
| `doctor_male_alex.jpg` | Dr. Alex Rivera, MD portrait |
| `treatment_hydra.jpg` | Hydra Facial glow treatment cover |
| `treatment_peel.jpg` | Medical grade Chemical Peel cover |
| `treatment_laser.jpg` | Fractional Laser Acne Scar resurfacing cover |
| `treatment_botox.jpg` | Anti-Wrinkle Botox procedure cover |
| `treatment_fillers.jpg` | Dermal Fillers & Lip Enhancement cover |
| `ba_acne_before.jpg` / `ba_acne_after.jpg` | Severe Acne Scar transformation before/after pair |
| `ba_hair_before.jpg` / `ba_hair_after.jpg` | PRP Follicle Hair Growth transformation pair |

---

## 🚀 5. How to Run, Build & Deploy

### Development Server:
```bash
# Start Vite development server on port 3000
npx vite --port 3000
# Access in browser: http://localhost:3000
```

### Production Build Verification:
```bash
# Compile and bundle TypeScript & CSS
npm run build
```

### 1-Click Git Push Automation (Pre-Configured Token):
```powershell
& "C:\Users\X COMPUTER\mingit\cmd\git.exe" add .
& "C:\Users\X COMPUTER\mingit\cmd\git.exe" commit -m "Your update message"
& "C:\Users\X COMPUTER\mingit\cmd\git.exe" push origin main --force
```
*(Vercel automatically listens to GitHub pushes and deploys the update to the live URL in ~15 seconds).*

---

## 📊 6. Completed Work Summary (Chronological Log)

- [x] **Phase 1: Brand & Layout Architecture**: Built responsive navigation with desktop dropdowns, mobile drawer, logo contrast fixes, and smooth scrolling.
- [x] **Phase 2: Core Patient Sections**: Hero, Why Choose Us (with `id="about"` anchor), Services Grid, Doctors Team, Before & After Sliders, Testimonials, Contact details.
- [x] **Phase 3: Dynamic Appointment Booking**: Interactive appointment submission with slot check, WhatsApp integration, and "Pending Clinic Confirmation" status.
- [x] **Phase 4: Local HD Images Migration**: Replaced all external Unsplash URLs with local high-res clinic and treatment photography in `public/images/`.
- [x] **Phase 5: Full Admin Panel (9 Views)**: Built protected authentication, dashboard statistics, appointments with 1-click action buttons, doctor image uploads, service pricing editor, and clinic branding settings.
- [x] **Phase 6: Multi-Page React Router Conversion**: Converted single-page landing into dedicated routes (`/`, `/about`, `/services`, `/doctors`, `/gallery`, `/appointment`, `/contact`, `/admin`) with query param support and `ScrollToTop`.
- [x] **Phase 7: GitHub & Vercel Continuous Deployment**: Configured Portable MinGit, connected to `cartify11/amna-skin`, resolved 100-file web upload limits, and set up live automated deployments.
- [x] **Phase 8: Code & Cache Cleanup**: Removed `.cache`, `.vite`, `dist`, temporary logs, and ensured clean repository tree of 72 essential files.

---

## 🔮 7. Future Roadmap / Next Potential Enhancements

1. **Backend PostgreSQL Server Integration**:
   - Extract `server.zip` and connect the Express REST API (`/server/src/server.ts`) to a live PostgreSQL database (Neon / Supabase) if switching from `localStorage` to cloud database.
2. **Automated WhatsApp / Email Alerts**:
   - Integrate Twilio API or SendGrid for instant SMS/WhatsApp alerts to patients when the clinic confirms their booking in the Admin Panel.
3. **Advance Deposit Online Payments**:
   - Add Stripe / Razorpay integration if the clinic wishes to collect a booking fee or consultation deposit.
