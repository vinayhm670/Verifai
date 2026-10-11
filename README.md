# VERIFAI — AI-POWERED TRUST & SCAM DETECTION PLATFORM

**Tagline: Verify Before You Trust.**

Verifai is a modern, responsive, functional full-stack platform engineered to help students, fresh graduates, parents, jobseekers, skilled workers, and citizens across India identify and prevent cyber scams involving:
- Fake job offers and laptop deposit demands
- ₹2,499 registration fee internship scams
- Unaccredited certificate credentials and spoofed seals
- Deceptive 100% selection coaching claims (CCPA compliance)
- Unregistered overseas agents and illegal tourist-visa deployments (MEA eMigrate compliance)
- Telegram paper leaks and spoofed university portals
- Reverse UPI PIN scams and malicious electricity-bill APK downloads
- Screenshot & document photo OCR scans
- Skilled technician & worker Skill Passports with trainer verification
- Crowdsourced community scam reporting & corroborated intelligence
- Emergency redressal via National Cyber Crime Helpline 1930 & cybercrime.gov.in

---

## 1. Architecture Overview

### Frontend
- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom Indian digital safety palette (Primary Teal `#0F766E`, Dark Teal `#115E59`, Slate `#F8FAFC`, Caution Amber `#D97706`, High-Risk Red `#DC2626`)
- **Interactive 3D**: Three.js WebGL scene featuring a floating translucent verification shield and neural particle network, mouse/touch parallax, reduced-motion support, and CSS fallback
- **Icons**: Lucide React
- **Audio & Voice**: Web Speech API for Hindi/English speech synthesis narration and voice input dictation
- **PWA**: Installable Web App Manifest (`/manifest.json`), service worker registration, and in-app iOS/Android install prompt
- **Persistence**: Local storage for history, custom settings, worker skill credentials, and community reports

### Backend & API
- **Server**: Express Node.js / TypeScript (`server.ts`)
- **SSRF Protection**: Strict filtering on `/api/url-lookup` blocking loopback, RFC 1918 private ranges, and cloud metadata IPs
- **AI Synthesis**: Transparent heuristics combined with optional server-side `@google/genai` model integration
- **Fail-Safe Design**: When external AI keys or network connections are absent, Verifai executes transparent rule-based heuristics so the public website remains 100% accessible and operational without crashes or dead clicks.

---

## 2. Environment Variables

See `.env.example` for details:

```env
# Server-side AI model integration (Optional; heuristics run offline if unset)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Base Application URL
APP_URL="http://localhost:3000"

# Optional Relational Database (Cloud SQL / PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/verifai"

# Optional Client-side Supabase credentials
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

---

## 3. Verification Heuristic Index & Scoring

The **Heuristic Risk Index** calculates an evidentiary risk score from 0 to 100:
- **0–29 (Likely Genuine)**: No overt fraud flags identified. Standard verification advice provided.
- **30–69 (Be Careful)**: Cautionary flags detected (e.g. unverified recruitment agents, free email domains, unaccredited course seals).
- **70–100 (Likely Fake / High Risk)**: Critical danger signs detected (advance money demands, laptop caution deposits, reverse UPI PIN requests, direct APK installs, tourist visa deployments).
- **Insufficient Data**: When input volume is below 15 characters, Verifai flags "Not enough information to assess" rather than inventing a fabricated risk score.

Every assessment includes:
1. Semicircular risk gauge and plain-language verdict
2. Observed evidence and highlighted suspicious phrases
3. Missing verification data and recommended safe next steps
4. Direct links to official Indian regulatory portals (eMigrate, DigiLocker, UGC, NTA, RBI Sachet, NPCI)
5. Pre-drafted safe response to the recruiter/sender
6. Pre-drafted formal 1930 Cybercrime complaint text
7. Speech narration in Hindi and English

---

## 4. Local Development & Build

```bash
# Install dependencies
npm install

# Run development server (Vite on port 3000)
npm run dev

# Run TypeScript checks
npm run lint

# Compile production bundle
npm run build
```

---

## 5. Deployment Instructions

1. **One-Click AI Studio / Cloud Run Hosting**:
   - The app compiles cleanly using `npm run build` producing optimized assets in `dist/`.
   - Ensure the server runs on port `3000`.
   - `GEMINI_API_KEY` is automatically managed in runtime secrets.

2. **Decoupled Authentication**:
   - End-user authentication is completely decoupled from website deployment credentials. Any valid email address can register or log in, and all public checkers remain 100% functional in guest mode without login.

---

## 6. Official Indian Redressal Helplines

- **National Cyber Crime Helpline**: Dial **1930**
- **Online Crime Reporting**: https://cybercrime.gov.in
- **National Consumer Helpline**: Dial **1915** or visit https://consumerhelpline.gov.in
- **Overseas Emigration Support**: https://emigrate.gov.in
