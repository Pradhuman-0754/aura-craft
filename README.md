# 🎨 AuraCraft AI — The AI-Powered Studio for Modern Creators

> **An AI-powered social media manager for content creators with a classy, colourful creator-economy aesthetic.**

AuraCraft AI empowers content creators to grow and monetize on **Instagram Reels, YouTube Shorts, LinkedIn, X, and Facebook** through fine-tuned AI suggestions, viral 3-second hooks, 25-hashtag stacks, 30-day matrix calendars, built-in canvas and video editing, ready-to-download creator templates, Razorpay subscription checkout in INR, and a 24/7 AI Creator Copilot fluent in English, Hindi, and Hinglish.

---

## 🚀 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti
- **Backend:** Node.js, Express, Helmet, Strict CORS, Morgan, Express-Rate-Limit
- **Database & Auth:** Supabase Auth (Email/Password with mandatory verification, Google OAuth 2.0, PostgreSQL RLS)
- **AI Engine:** Anthropic Claude API (`claude-3-5-sonnet-20241022`) with modular versioned system prompts
- **Visual Editing & Trimming:** In-browser Canvas engine, aspect ratio presets (9:16, 1:1, 4:5, 16:9), video trimmer pipeline, and pluggable Canva Connect adapter architecture
- **Content Calendar:** Monthly grid view, Kanban status board (Idea, Draft, Scheduled, Posted), HTML5 Drag & Drop scheduling, reminders
- **Payments & Subscriptions:** Razorpay Checkout (INR), signature verification, plan quota management, webhooks
- **Production Deployment:** Vercel (Frontend SPA) + Render (Backend Web Service) + Supabase Cloud (PostgreSQL DB & Auth)

---

## 📁 Repository Structure

```text
├── client/                     # Frontend Application (React + Vite + Tailwind)
│   ├── public/                 # Static assets, robots.txt, sitemap.xml
│   ├── .env.example            # Template for frontend environment variables
│   ├── index.html              # HTML shell with Google Fonts, Open Graph, Twitter Card & JSON-LD
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Custom creator-economy gradients, animations & colors
│   ├── vercel.json             # Vercel deployment configuration with SPA rewrites & security headers
│   └── src/
│       ├── components/         # Navbar, Footer, GoogleAuthButton, PasswordStrengthMeter,
│       │                       # ProtectedRoute, DashboardLayout, FloatingChatWidget
│       ├── context/            # AuthContext (real Supabase Auth, session listeners, user state)
│       ├── lib/                # supabaseClient.js (browser Supabase client), api.js (API client helper)
│       ├── services/           # editorAdapter.js (Native Canvas + Canva Connect Adapter architecture)
│       └── pages/              # LandingPage, LoginPage, SignupPage, VerifyEmailPage,
│                               # ForgotPasswordPage, ResetPasswordPage, AuthCallback,
│                               # DashboardPage, AnalyzerPage, CaptionGeneratorPage,
│                               # HashtagVaultPage, ContentIdeaGeneratorPage, AssistantPage,
│                               # TemplatesPage, EditorPage, CalendarPage, SettingsPage,
│                               # PricingPage, PrivacyPolicyPage, TermsOfServicePage
│
├── server/                     # Backend API (Node.js + Express)
│   ├── .env.example            # Backend secrets (Service Role Key, Claude Key, Razorpay)
│   ├── package.json            # Server dependencies
│   ├── render.yaml             # Render Web Service Blueprint
│   ├── Dockerfile              # Production Dockerfile (Alpine Node 20)
│   ├── prompts/                # Modular system prompts directory for AI features
│   │   ├── analyzer.js         # Post & Reel Analyzer prompt
│   │   ├── captions.js         # 5-tone captions & hooks prompt
│   │   ├── hashtags.js         # 25-hashtag stack prompt
│   │   ├── ideas.js            # 30-day content matrix prompt
│   │   └── chat.js             # 24/7 Creator Copilot prompt
│   └── src/
│       ├── config/             # supabase.js (Supabase Admin client with Service Role Key)
│       ├── middleware/         # auth.js, rateLimiter.js, usageTracker.js
│       ├── services/           # claudeService.js (Anthropic Claude API & intelligent fallback)
│       ├── routes/             # auth.js, ai.js, templates.js, calendar.js, payments.js
│       └── index.js            # Express server bootstrap, Helmet security headers, CORS
│
├── supabase/
│   └── schema.sql              # Profiles table, Calendar Events, Subscriptions, RLS, triggers
├── docker-compose.yml          # Containerized local/production orchestration
└── render.yaml                 # Root Render Infrastructure-as-Code Blueprint
```

---

## 🌟 All Implemented Phases (1 through 8)

| Phase | Module | Key Features & Implementation Highlights |
|:---:|:---|:---|
| **Phase 1** | **Project Setup, Landing Page & Production Auth** | Real Supabase Auth (no dummy storage), mandatory email verification, Google OAuth 2.0, password strength meter, 6 landing page sections with animated creator gradient, RLS database schema. |
| **Phase 2** | **Dashboard & AI Generation Suite** | Creator dashboard with quick stats & "Today's Content Idea", Post/Reel Analyzer with viral score, 3-sec retention hooks, 5 tone captions, 25-hashtag stack formula, 30-day content matrix roadmap. |
| **Phase 3** | **AI Assistant Chatbot** | 24/7 Creator Copilot floating chat widget on all pages + full-page studio, prompt chip library, Hinglish/English/Hindi dialect support, copy buttons. |
| **Phase 4** | **Templates Library & Downloads** | 6 categories, 8 niche filters, 250+ blueprints, SVG vector rendering, watermark logic, premium lock for free users, direct download engine. |
| **Phase 5** | **In-Browser Visual & Video Studio** | Multi-aspect ratio canvas presets (9:16, 1:1, 4:5, 16:9), image filters, text layers, viral sticker overlays, brand logo placement, video trimmer & resizer with animated captions, Canva Connect pluggable adapter, confetti. |
| **Phase 6** | **Content Calendar & Kanban Board** | Monthly interactive grid, Kanban status columns (*Idea, Draft, Scheduled, Posted*), HTML5 Drag-and-Drop rescheduling, reminders, Supabase RLS persistence. |
| **Phase 7** | **Pricing & Razorpay Subscriptions (INR)** | Free ₹0, Pro ₹149/mo, Creator+ ₹299/mo, Razorpay checkout modal with UPI/Card support, sandbox simulation mode, HMAC SHA256 signature verification, quota limits & usage reset. |
| **Phase 8** | **Polish, Settings, SEO & Deployment** | Studio Settings page (Profile, Social accounts, Billing, Theme & Languages), Open Graph & Twitter Card metadata, JSON-LD Schema, robots.txt, sitemap.xml, Vercel SPA config, Render Blueprint, Dockerfile. |

---

## 🛠️ Step-by-Step Setup & Local Development

### 1. Database Setup (Supabase)
1. Go to [Supabase Console](https://supabase.com/) and create a new project.
2. Navigate to **SQL Editor**, open [supabase/schema.sql](file:///c:/Users/HP/OneDrive/Desktop/New%20folder/supabase/schema.sql), paste and click **Run**.
3. Under **Authentication -> Providers**, configure **Email** (disable *Confirm email* for quick tests or keep enabled for full flow) and **Google OAuth**.
4. Copy your **Project URL**, **Anon Public Key**, and **Service Role Key** from **Project Settings -> API**.

### 2. Backend Setup
1. Open a terminal in the `server` folder:
   ```bash
   cd server
   npm install
   ```
2. Create `server/.env` based on `server/.env.example`:
   ```ini
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ANTHROPIC_API_KEY=sk-ant-api03-...   # (Optional: fallback engine runs if omitted)
   RAZORPAY_KEY_ID=rzp_test_...          # (Optional: sandbox simulation available)
   RAZORPAY_KEY_SECRET=your-secret
   RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
   ```
3. Start the backend:
   ```bash
   npm run dev
   ```
   *Backend will run at `http://localhost:5000` with health check at `http://localhost:5000/api/health`.*

### 3. Frontend Setup
1. Open another terminal in the `client` folder:
   ```bash
   cd client
   npm install
   ```
2. Create `client/.env` based on `client/.env.example`:
   ```ini
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_API_BASE_URL=http://localhost:5000
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Production Deployment Guide

### A. Deploy Frontend to Vercel
1. Push your repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), import your repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-supabase-anon-key`
   - `VITE_API_BASE_URL` = `https://your-auracraft-api.onrender.com`
5. Click **Deploy**. Vercel will build the frontend with SPA routing and security headers configured via `client/vercel.json`.

---

### B. Deploy Backend to Render
1. In the [Render Dashboard](https://dashboard.render.com/), click **New +** and select **Blueprint** (or **Web Service**).
2. Point Render to your repository:
   - It will automatically detect [render.yaml](file:///c:/Users/HP/OneDrive/Desktop/New%20folder/render.yaml).
   - Alternatively, configure manually:
     - **Name**: `auracraft-api`
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Health Check Path**: `/api/health`
3. In **Environment Variables**, provide:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `CLIENT_URL` = `https://your-auracraft-app.vercel.app` *(Your Vercel domain)*
   - `SUPABASE_URL` = `https://your-project.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `your-secret-service-role-key`
   - `ANTHROPIC_API_KEY` = `sk-ant-api03-...`
   - `RAZORPAY_KEY_ID` = `rzp_live_...` or `rzp_test_...`
   - `RAZORPAY_KEY_SECRET` = `your-razorpay-secret`
   - `RAZORPAY_WEBHOOK_SECRET` = `your-webhook-secret`
4. Deploy the service. Your API will be live at `https://your-auracraft-api.onrender.com`.

---

### C. Connect Supabase & Google OAuth to Production
1. In the **Supabase Dashboard**:
   - Go to **Authentication -> URL Configuration**.
   - Set **Site URL** to: `https://your-auracraft-app.vercel.app`
   - Add to **Redirect URLs**:
     - `https://your-auracraft-app.vercel.app/auth/callback`
     - `https://your-auracraft-app.vercel.app/**`
2. In the **Google Cloud Console**:
   - Under **APIs & Services -> Credentials -> OAuth 2.0 Client IDs**:
   - Add Authorized JavaScript Origins: `https://your-project.supabase.co`
   - Add Authorized Redirect URIs: `https://your-project.supabase.co/auth/v1/callback`

---

## 🧪 Comprehensive End-to-End Verification Checklist

| # | Test Area | Test Action | Expected Behavior | Verification |
|:---:|:---|:---|:---|:---:|
| 1 | **Landing Page** | Open `http://localhost:5173` | Vibrant hero, animated gradient, floating social icons, 6 feature cards, interactive hook tester, 3 pricing tiers. | ✅ |
| 2 | **User Signup** | Register with new email & password | Password strength meter validates; Supabase creates unconfirmed user and profile in PostgreSQL. | ✅ |
| 3 | **Email Verification Gate** | Attempt to view `/dashboard` before verifying | Automatically redirected to `/verify-email` with 60s cooldown timer. | ✅ |
| 4 | **Google OAuth** | Click "Continue with Google" | Supabase redirects to Google authentication sheet and returns via `/auth/callback`. | ✅ |
| 5 | **Creator Dashboard** | Log into verified account | Greeting with creator name, dynamic "Today's Content Idea" tailored to niche, daily AI sparks meter. | ✅ |
| 6 | **Post & Reel Analyzer** | Submit reel idea + target platform | Returns viral score, 3-sec retention hooks, 5 tone captions, CTAs, optimal time IST, and 25-hashtag stack. | ✅ |
| 7 | **AI Copilot** | Send question to floating widget & full studio | Friendly creator persona responds with markdown formatting; supports Hinglish, Hindi, and English. | ✅ |
| 8 | **Templates Library** | Browse 6 categories & filter by niche | Blueprints render; preview modal opens; SVG downloads with watermark check for Free users. | ✅ |
| 9 | **Visual & Video Studio** | Customize canvas text/stickers & trim video | Canvas resizes to 9:16/1:1/4:5; video trims & adds captions; export triggers celebratory confetti. | ✅ |
| 10 | **Content Calendar** | Drag post between dates or status columns | HTML5 drag-and-drop updates date and status (*Idea, Draft, Scheduled, Posted*) and syncs with Supabase. | ✅ |
| 11 | **Razorpay Upgrade** | Upgrade to Pro (₹149/mo) | Razorpay checkout launches; verifies HMAC signature; instant upgrade to Pro with unlimited sparks. | ✅ |
| 12 | **Studio Settings** | Edit creator bio, niche, and platform connections | Saves via `PUT /api/auth/profile`; toggles social platforms; switches Dark/Light mode. | ✅ |
| 13 | **SEO & Social Share** | Inspect HTML source & Open Graph tags | Structured JSON-LD schema, Twitter Cards, robots.txt, and sitemap.xml verified. | ✅ |
| 14 | **Production Build** | Run `npm run build` in `client` | Vite generates optimized minified bundle in `dist/` ready for Vercel deployment. | ✅ |

---

## 🔒 Security Best Practices Implemented
- **No Client Secrets**: Supabase Service Role Key and Anthropic Claude Key are kept exclusively on the Node.js backend.
- **JWT Verification**: Supabase Bearer token is verified on every Express request via `supabase.auth.getUser(token)`; user IDs are derived securely from verified tokens.
- **Strict CORS & Helmet**: Helmet headers applied; CORS restricts requests strictly to the configured `CLIENT_URL`.
- **Rate Limiting**: Multi-tiered rate limiters for general API (100 req/15m), auth operations (15 req/15m), and AI generation (30 req/5m).
- **Daily Quotas**: Automatic 24-hour reset of AI sparks tracked in Supabase PostgreSQL with plan-based enforcement.
#   a u r a - c r a f t -  
 