# 🎮 ELITE MART — Premium CODM Accounts Marketplace

> Ghana's #1 trusted marketplace for Call of Duty Mobile accounts. Official Activision CODM partner.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase)

---

## 🚀 Features

### Customer-Facing
- **Homepage** — Animated hero with particle effects, services overview, featured products, testimonials, CTA section
- **Browse Accounts** — Product listing with search, filters (rank, region), and sorting
- **Product Detail** — Full account details with skin breakdown, pricing, and WhatsApp purchase
- **Purchase** — Browse and buy accounts via WhatsApp
- **Trade** — Trade your current account for a better one
- **Swap** — Swap accounts with other players
- **Buy CP** — Purchase COD Points with package selection and WhatsApp ordering
- **User Dashboard** — Order history, trade/swap requests, profile management
- **Auth** — Google sign-in + email/password registration

### Admin Panel (Full CMS)
- **Dashboard** — Analytics overview with stats, pending actions, quick links
- **Products** — Full CRUD: add, edit, delete CODM account listings with images
- **Orders** — View and manage customer purchase orders
- **Trade Requests** — Review, accept/decline trade requests
- **Swap Requests** — Review, accept/decline swap requests
- **CP Packages** — Create and manage COD Point packages with pricing
- **Banners** — Manage homepage hero banners (add, edit, reorder, toggle)
- **Testimonials** — Add and manage customer reviews
- **Users** — View all registered users, manage roles
- **Transactions** — Complete payment history
- **Settings** — Configure EVERYTHING:
  - Site name, tagline, description
  - Hero section text
  - Logo and favicon uploads
  - Color scheme (primary, accent)
  - Contact information (email, phone, WhatsApp)
  - Social media links
  - SEO & meta tags
  - Maintenance mode toggle

---

## 🎨 Design System

### Color Philosophy
- **Deep Navy/Charcoal (#0A0E17, #232C3C)** — Premium authority and sophistication
- **Electric Blue (#0000EE, #00A1E1)** — Trust, technology, and gaming energy
- **Gold (#DF9B13)** — Exclusive, elite status, premium quality
- **White** — Purity, clarity, accessibility
- **Green** — WhatsApp integration, success states
- **Purple/Pink** — Trading service identity
- **Amber/Orange** — CP purchase service, urgency

### Animations
- Particle field with mouse interaction on homepage
- Smooth scroll-triggered animations (Framer Motion)
- Staggered card animations
- Animated testimonial carousel
- Hover micro-interactions
- Glass morphism effects
- Gradient orbs with blur

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework (App Router) |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Firebase Auth** | Authentication (Google + Email) |
| **Firestore** | Database |
| **Cloudinary** | Image uploads |
| **Resend** | Transactional emails |
| **Paystack** | Ghana payments (MoMo, cards) |
| **Flutterwave** | International payments |
| **Lucide React** | Icons |

---

## 📦 Setup

### 1. Install Dependencies
```bash
cd elite-mart
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
```

Fill in your `.env.local` with real credentials:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=elite_mart

# Resend
RESEND_API_KEY=re_your_key

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
PAYSTACK_SECRET_KEY=sk_test_xxx

# Flutterwave
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FKWP_test_xxx
FLUTTERWAVE_SECRET_KEY=FKWS_test_xxx

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=233203548373
```

### 3. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Google + Email/Password
3. Create **Firestore Database**
4. Set up these Firestore collections:

**Firestore Security Rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Admin reads all
    }
    // Products - public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Orders - user read own, admin all
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    // Trade/Swap requests
    match /tradeRequests/{reqId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    match /swapRequests/{reqId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    // CP Packages - public read, admin write
    match /cpPackages/{pkgId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Settings - admin only
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Banners - public read, admin write
    match /banners/{bannerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Testimonials - public read, admin write
    match /testimonials/{testId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Transactions - admin only
    match /transactions/{txId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Make Yourself Admin

After registering, update your user document in Firestore:
```
Collection: users → Document: [your-uid]
Field: role → "admin"
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Design system CSS
│   ├── products/              # Product listing + detail
│   ├── trade/                 # Trade form → WhatsApp
│   ├── swap/                  # Swap form → WhatsApp
│   ├── buy-cp/               # CP packages
│   ├── contact/               # Contact page
│   ├── auth/                  # Login & Register
│   ├── dashboard/             # User dashboard
│   └── admin/                 # Admin panel (all pages)
├── components/
│   ├── layout/                # Header, Footer
│   └── home/                  # Homepage sections
├── context/
│   ├── AuthContext.tsx         # Firebase Auth state
│   └── SiteContext.tsx         # Site settings from Firestore
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   └── utils.ts               # Utility functions
└── types/
    └── index.ts               # TypeScript type definitions
```

---

## 🔐 Admin Capabilities

The admin can edit **EVERYTHING** through the admin panel:

| Setting | Editable? |
|---|---|
| Site name & tagline | ✅ |
| Homepage hero text | ✅ |
| Logo & favicon | ✅ |
| Color scheme | ✅ |
| Contact info (email, phone, WhatsApp) | ✅ |
| Social media links | ✅ |
| Products (add/edit/delete) | ✅ |
| Product images (Cloudinary) | ✅ |
| CP packages & pricing | ✅ |
| Homepage banners | ✅ |
| Customer testimonials | ✅ |
| User roles | ✅ |
| Order management | ✅ |
| Trade/Swap request management | ✅ |
| SEO & meta tags | ✅ |
| Maintenance mode | ✅ |
| About text | ✅ |

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual
```bash
npm run build
npm start
```

---

## 📞 Contact

- **WhatsApp:** +233 20 354 8373
- **Phone:** 020 354 8373
- **Business:** ELITE MART

---

Built with ❤️ for the CODM community in Ghana and Africa.
