# VERIFAI — Universal Digital Credential & Job Offer Verification Platform

> **Verify Before You Trust.**  
> *Every Credential. Every Opportunity. Verified with VERIFAI.*

---

## 1. Project Overview

**VERIFAI** is a client-side digital identity and employment offer verification platform engineered to protect students, job seekers, recruiters, and educational institutions from fake certificates, forged internship letters, fraudulent job offers, and company impersonation scams.

The platform provides an end-to-end trust workflow:
1. **Universal Verification Portal**: Instant lookup by Credential ID (`VF-...`) with cryptographic SHA-256 verification and status checks.
2. **Live Camera & Image QR Scanner**: Fast WebRTC camera scanning with custom cybersecurity reticle and image file decoding powered by `jsQR`.
3. **Document Forensics & File Inspection**: Upload PDF or image credentials for client-side heuristic inspection of embedded IDs, QR payloads, public webmail red flags, and payment scam phrasing.
4. **Demonstration Issuer Portal**: Register certificates, internship letters, and job offers with deterministic canonical SHA-256 digests and high-resolution QR codes.
5. **Registry Management Dashboard**: Searchable and filterable registry table, status revocation/reinstatement, audit logging, and JSON import/export.
6. **Printable Official Documents**: Formal security certificate and corporate business letter templates with vector QR codes, security borders, watermarks, and native A4 print styling (`@media print`).
7. **Fraud Prevention Education Center**: Deep-dives into email spoofing, deposit extortion, forged QR codes, and phantom hiring.
8. **Interactive Offer Letter Risk Calculator**: 10-point weighted heuristic fraud calculator with real-time scoring and safety recommendations.
9. **VERIFAI AI Assistant & Voice Command Engine**: Deterministic natural language processor supporting text prompts, Web Speech API speech-to-text, text-to-speech, and direct voice commands.
10. **Interactive Live Animated Canvas Background**: Drifting aurora orbs, stardust bokeh, elastic cursor repulsion, mouse sparkle trail, click ripple waves, and constellation threads.
11. **Multilingual Architecture**: Instant UI translation across English (EN), Hindi (HI), Spanish (ES), and French (FR).

---

## 2. Technology Stack

- **Markup & Layout**: HTML5 Semantic Architecture.
- **Styling**: Tailwind CSS via CDN + custom design system in `style.css` (cyber glassmorphism, reticle laser animations, neon glows, and `@media print` rules).
- **Logic**: Vanilla JavaScript (ES6+ modular classes).
- **Icons**: Lucide Icons CDN.
- **QR Code Decoding**: `jsQR` (v1.4.0).
- **QR Code Generation**: `QRCode.js`.
- **Forensics / PDF Text Extraction**: `PDF.js` (v3.11.174).
- **Cryptographic Hashing**: Web Crypto API (`crypto.subtle.digest("SHA-256")`).
- **Camera Scanning**: WebRTC `navigator.mediaDevices.getUserMedia()`.
- **Speech & Voice**: Web Speech API (`SpeechRecognition` / `speechSynthesis`).
- **Persistence**: Browser `localStorage` with versioned schemas.

---

## 3. Project File Structure

```
VERIFAI/
├── index.html       # Application layout, navigation, modals, and templates
├── style.css        # Design tokens, themes, animations, reticle, and print engine
├── script.js        # Main controller, state management, SHA-256 engine, canvas background
├── scanner.js       # Live camera QR scanner and image QR decoding engine
├── trust-ai.js      # VERIFAI AI Assistant and Web Speech API voice engine
├── i18n.js          # Translation dictionaries (English, Hindi, Spanish, French)
└── README.md        # Comprehensive documentation and setup guide
```

---

## 4. How to Run Locally

Because modern web browsers restrict **Camera (`getUserMedia`)** and **Microphone (`SpeechRecognition`)** access to **secure contexts** (`https://` or `http://localhost`), running the application via a local web server is strongly recommended.

### Option A: Node.js (npx serve)
```bash
npx -y serve .
```
Then navigate to: `http://localhost:3000`

### Option B: Python 3
```bash
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

### Option C: Direct File Opening
You can double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari. All features (verification, registry, document generation, forensics, risk calculator, and theme toggle) will function immediately. Camera and microphone access may require explicit browser flag permissions when run from `file://`.

---

## 5. Demonstration Data & Quick Testing

VERIFAI comes pre-seeded with 4 distinct demonstration records:

| Credential ID | Recipient | Issuer | Type | Status |
|---|---|---|---|---|
| `VF-CERT-2024-9102` | Rahul Sharma | Google Cloud & AI Academy | Certificate | **Verified Demo** |
| `VF-INT-2024-4481` | Sneha Patel | TCS | Internship Letter | **Verified Demo** |
| `VF-OFF-2024-8833` | Ananya Deshmukh | Microsoft India | Job Offer | **Verified Demo** |
| `VF-FRAUD-2024-0004` | Vikram Malhotra | Google Cloud (Impersonated) | Flagged Offer | **Revoked / Fraud** |

### Testing Steps:
1. **Test Genuine Verification**: Click the "Rahul Sharma" sample card or enter `VF-CERT-2024-9102`. Observe the emerald badge, SHA-256 hash, and click **"View Printable Document"** to inspect the high-fidelity certificate.
2. **Test Flagged Fraud**: Click the sample card for `VF-FRAUD-2024-0004`. Observe the crimson alert warning of Telegram recruiter payment extortion.
3. **Test Unknown ID**: Enter any unlisted ID such as `VF-CERT-2025-0000` to inspect the friendly guidance explaining that missing records require contacting the issuer directly.
4. **Test Document Forensics**: Drag and drop a PDF or certificate image to inspect embedded IDs, suspicious email domains, and scam phrases.
5. **Test Issuer Registration**: Go to **Issuer Portal -> Create Credential**, fill out the form, submit, and see your new verifiable credential appear in the registry and printable preview.
6. **Test Risk Calculator**: Check risk indicators in the **Risk Calculator** to see the animated heuristic score meter change in real time.
7. **Test Voice Commands**: Click the floating AI Assistant at the bottom-right, click the microphone, and say:
   - *"Verify VF-INT-2024-4481"*
   - *"Switch to dark mode"* or *"Switch to light mode"*
   - *"Switch to Hindi"* or *"Switch to Spanish"*

---

## 6. Security & Architectural Limitations

> [!IMPORTANT]
> **Client-Side Demonstration Notice:**  
> VERIFAI is built as a pure client-side web application. LocalStorage can be cleared or altered by users, and SHA-256 browser digests verify canonical data consistency rather than authentic corporate legal signatures.

In a production enterprise deployment, the following backend components would replace client-side simulation:
- Public-key asymmetric digital signatures (e.g. Ed25519 / W3C Verifiable Credentials).
- Multi-factor authenticated issuer portals.
- Immutable server-side audit logs (append-only ledger).
- Authenticated issuer domain DNS-TXT record verification.

---

## 7. License

Built for digital trust, student protection, and cybersecurity fraud prevention.
