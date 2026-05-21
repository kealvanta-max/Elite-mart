# 🚀 ELITE MART — Deployment Guide

## Option A: Push via Token (Recommended)

```bash
# 1. Go to https://github.com/settings/tokens
# 2. Generate new token (classic)
# 3. Select "repo" scope
# 4. Copy the token

# Then run:
cd elite-mart
git push -u https://YOUR_TOKEN@github.com/kealvanta-max/Elite-mart.git main
```

## Option B: Manual Push from Your Machine

```bash
# 1. Clone the repo
git clone https://github.com/kealvanta-max/Elite-mart.git
cd Elite-mart

# 2. Copy ALL source files from this workspace into the cloned folder

# 3. Create .env.local (see .env.local.example)

# 4. Push
git add -A
git commit -m "🚀 ELITE MART v1.0"
git push origin main
```

## Deploy to Vercel

### Step 1: Connect Repository
1. Go to https://vercel.com/new
2. Import your GitHub repo: `kealvanta-max/Elite-mart`
3. Framework: **Next.js** (auto-detected)

### Step 2: Configure Environment Variables
Add ALL these variables in Vercel's "Environment Variables" section:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD_t0zub_W4eoSYSWFgC00n2AirJVn32As
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elitemart-90167.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://elitemart-90167-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elitemart-90167
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elitemart-90167.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=62326101144
NEXT_PUBLIC_FIREBASE_APP_ID=1:62326101144:web:1f05f59ed008ef5d6ceced

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dco4egcvb
CLOUDINARY_API_KEY=417162862799837
CLOUDINARY_API_SECRET=cleNSdlt5RabS9W7JRbNaz8pseo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=elite_mart

RESEND_API_KEY=re_eZdeZiGV_EyyxvfKQjLu6BM94yVU3RfcG

NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=233203548373

NEXT_PUBLIC_LOGO_URL=https://res.cloudinary.com/dco4egcvb/image/upload/f_auto,q_auto/IMG-20260502-WA0030_2_gja4cv
NEXT_PUBLIC_ADMIN_EMAILS=kealvanta@gmail.com
```

### Step 3: Deploy
Click **Deploy** and wait ~2 minutes.

### Step 4: Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., elitemart.com)
3. Update DNS records at your domain registrar

## Firebase Setup

### 1. Enable Authentication
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable **Google** and **Email/Password**
3. Add your domain to Authorized domains

### 2. Create Firestore Database
1. Go to Firestore Database → Create database
2. Start in **production mode**
3. Choose location: `us-central1` (or closest to Ghana)

### 3. Set Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
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
    match /cpPackages/{pkgId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /banners/{bannerId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /testimonials/{testId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /transactions/{txId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Make Yourself Admin
1. Register on your website
2. Go to Firebase Console → Firestore → `users` collection
3. Find your user document
4. Change `role` field from `"customer"` to `"admin"`
5. Refresh your website — you now have full admin access!

### 5. Create Firestore Indexes
After deploying, you may need to create composite indexes.
Visit the URL shown in your browser console when you see index errors.

## Post-Deployment Checklist

- [ ] Firebase Auth enabled (Google + Email)
- [ ] Firestore created with security rules
- [ ] Your user role set to "admin"
- [ ] All env vars added in Vercel
- [ ] Site loads correctly
- [ ] Login works (Google + Email)
- [ ] Admin panel accessible
- [ ] Can add/edit products
- [ ] WhatsApp links work
- [ ] Images upload to Cloudinary
- [ ] Contact form sends emails
- [ ] Mobile responsive
- [ ] Custom domain configured (optional)
