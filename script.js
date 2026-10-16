/**
 * VERIFAI — Universal Digital Credential & Job Offer Verification Platform
 * Main Controller: State Management, SHA-256 Canonical Engine, Background Canvas,
 * Registry Management, Forensics, Risk Calculator, and Printable Documents.
 */

// ============================================================================
// 1. DEFAULT SEED DATA & CONSTANTS
// ============================================================================
const DEFAULT_REGISTRY = [
  {
    id: "VF-CERT-2024-9102",
    type: "CERT",
    recipientName: "Rahul Sharma",
    issuerName: "Google Cloud & AI Academy",
    issuerDomain: "cloud.google.com",
    designation: "Professional Cloud Architect & Generative AI Specialization",
    description: "Successfully completed 120 hours of advanced curriculum covering scalable cloud infrastructure, machine learning pipelines, and multi-cloud resilience.",
    issueDate: "2024-05-18",
    expiryDate: "Lifetime",
    signatoryName: "Dr. Sundar V.",
    signatoryTitle: "Head of Cloud Education & Developer Relations",
    specificDetails: {
      courseName: "Cloud Architect & Generative AI Specialization",
      grade: "Grade A+ (96.4%)",
      completionDate: "2024-05-15"
    },
    sha256: "E8A21B9038C4F1A73E45229B07D3E83C5A96781423FB216A429074F96328A1CD",
    status: "verified",
    revocationReason: "",
    revocationDate: "",
    createdAt: "2024-05-18T10:00:00.000Z",
    updatedAt: "2024-05-18T10:00:00.000Z",
    verificationScope: "Record matched in the local VERIFAI demonstration registry. Issuer identity has not been independently authenticated.",
    isDemo: true
  },
  {
    id: "VF-INT-2024-4481",
    type: "INT",
    recipientName: "Sneha Patel",
    issuerName: "Tata Consultancy Services (TCS)",
    issuerDomain: "tcs.com",
    designation: "Software Engineering Intern — Enterprise Cloud Practice",
    description: "Completed a 6-month intensive internship program contributing to distributed microservices architecture, automated testing pipelines, and cloud migration.",
    issueDate: "2024-06-30",
    expiryDate: "Lifetime",
    signatoryName: "Rajesh Gopinathan",
    signatoryTitle: "VP & Global Head of Early Talent",
    specificDetails: {
      role: "Software Engineering Intern",
      department: "Cloud Engineering Practice",
      startDate: "2024-01-08",
      endDate: "2024-06-28",
      performanceRating: "Outstanding (5/5)"
    },
    sha256: "72B84D01C95EFA823A4017C2901DF53826EAA5B12809C348126F76D04791E5B3",
    status: "verified",
    revocationReason: "",
    revocationDate: "",
    createdAt: "2024-06-30T14:30:00.000Z",
    updatedAt: "2024-06-30T14:30:00.000Z",
    verificationScope: "Record matched in the local VERIFAI demonstration registry. Issuer identity has not been independently authenticated.",
    isDemo: true
  },
  {
    id: "VF-OFF-2024-8833",
    type: "OFF",
    recipientName: "Ananya Deshmukh",
    issuerName: "Microsoft India R&D Pvt. Ltd.",
    issuerDomain: "microsoft.com",
    designation: "Software Engineer II — Azure Platform & Systems",
    description: "Official full-time offer of employment covering responsibilities, compensation structure, health benefits, equity grants, and code of business conduct.",
    issueDate: "2024-07-15",
    expiryDate: "2024-08-15",
    signatoryName: "Satya N.",
    signatoryTitle: "Director of Talent Acquisition — Asia Pacific",
    specificDetails: {
      jobTitle: "Software Engineer II",
      department: "Azure Core Platform",
      location: "Bangalore, India (Hybrid)",
      ctc: "₹24,50,000 / annum + Stock Units",
      joiningDate: "2024-09-02",
      offerExpiry: "2024-08-15"
    },
    sha256: "9F1823C47B01A940E812C573A03B521946271DF826019A84236B581C92408E77",
    status: "verified",
    revocationReason: "",
    revocationDate: "",
    createdAt: "2024-07-15T09:15:00.000Z",
    updatedAt: "2024-07-15T09:15:00.000Z",
    verificationScope: "Record matched in the local VERIFAI demonstration registry. Issuer identity has not been independently authenticated.",
    isDemo: true
  },
  {
    id: "VF-FRAUD-2024-0004",
    type: "OFF",
    recipientName: "Vikram Malhotra",
    issuerName: "Google Cloud (Impersonated)",
    issuerDomain: "google-recruiters-support.telegram.me",
    designation: "Senior Cloud Associate & Remote Data Operator",
    description: "Simulated recruitment scam: An impersonated hiring offer requesting an upfront 'Laptop Security Deposit' and ₹12,500 'Stipend Clearance Bond' via UPI.",
    issueDate: "2024-04-10",
    expiryDate: "2024-04-11",
    signatoryName: "Fake HR Recruiter",
    signatoryTitle: "Alleged Talent Coordinator (Telegram account: @google_recruiter_fast)",
    specificDetails: {
      jobTitle: "Remote Cloud Operator",
      department: "Unverified Operations",
      location: "Remote / Telegram Only",
      ctc: "₹38,00,000 / annum (Implausibly High)",
      joiningDate: "Immediate",
      offerExpiry: "24 Hours Mandatory"
    },
    sha256: "33D4192A082C5F4298B0721E0176D3A95E421948B01F29C354A180E291487DC4",
    status: "revoked",
    revocationReason: "FLAGGED FRAUD: Impersonation of Google recruitment team. Recruiter demanded ₹12,500 security deposit via Telegram UPI handle. Genuine companies never charge candidates.",
    revocationDate: "2024-04-12",
    createdAt: "2024-04-10T08:00:00.000Z",
    updatedAt: "2024-04-12T11:20:00.000Z",
    verificationScope: "RECORD REVOKED IN VERIFAI DEMO REGISTRY DUE TO IDENTIFIED FRAUD INDICATORS.",
    isDemo: true
  }
];

// ============================================================================
// 2. MAIN APPLICATION CLASS
// ============================================================================
class VerifaiApp {
  constructor() {
    this.currentTheme = "dark";
    this.currentRecord = null;
    this.registry = [];
    this.auditLog = [];
    this.canvasEngine = null;
  }

  init() {
    this.initDatabase();
    this.initTheme();
    this.initCanvasBackground();
    this.initNavigation();
    this.initVerificationPortal();
    this.initIssuerPortal();
    this.initRegistryTable();
    this.initForensicsEngine();
    this.initRiskCalculator();
    this.initModals();
    this.initLanguageSelector();

    // Re-render icons with Lucide
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // --------------------------------------------------------------------------
  // Database / LocalStorage Management
  // --------------------------------------------------------------------------
  initDatabase() {
    try {
      const stored = localStorage.getItem("verifai_registry_v1");
      if (!stored) {
        this.registry = JSON.parse(JSON.stringify(DEFAULT_REGISTRY));
        localStorage.setItem("verifai_registry_v1", JSON.stringify(this.registry));
        this.logAudit("INIT", "SYSTEM", "Initialized default demonstration registry with 4 sample records.");
      } else {
        this.registry = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error loading registry from LocalStorage:", e);
      this.registry = JSON.parse(JSON.stringify(DEFAULT_REGISTRY));
    }

    try {
      const storedAudit = localStorage.getItem("verifai_audit_v1");
      this.auditLog = storedAudit ? JSON.parse(storedAudit) : [];
    } catch (e) {
      this.auditLog = [];
    }
  }

  saveRegistry() {
    try {
      localStorage.setItem("verifai_registry_v1", JSON.stringify(this.registry));
      this.renderRegistryTable();
      this.renderAuditLog();
    } catch (e) {
      console.error("Failed to save registry to LocalStorage:", e);
      this.showToast("LocalStorage quota exceeded or write failed.", "error");
    }
  }

  logAudit(action, recordId, details) {
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      recordId,
      details
    };
    this.auditLog.unshift(entry);
    if (this.auditLog.length > 100) this.auditLog.pop();
    try {
      localStorage.setItem("verifai_audit_v1", JSON.stringify(this.auditLog));
    } catch (e) {}
    this.renderAuditLog();
  }

  // --------------------------------------------------------------------------
  // Theme Management (Light / Dark)
  // --------------------------------------------------------------------------
  initTheme() {
    const saved = localStorage.getItem("verifai_theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (prefersDark ? "dark" : "dark"); // Default dark cyber look
    this.setTheme(initialTheme);

    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        this.setTheme(this.currentTheme === "dark" ? "light" : "dark");
      });
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem("verifai_theme", theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    const icon = document.getElementById("theme-toggle-icon");
    if (icon) {
      icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    }

    if (this.canvasEngine) {
      this.canvasEngine.setTheme(theme);
    }

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // --------------------------------------------------------------------------
  // Interactive Animated Canvas Background
  // --------------------------------------------------------------------------
  initCanvasBackground() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    class CanvasBackgroundEngine {
      constructor(canvas, theme) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.theme = theme;
        this.particles = [];
        this.sparkles = [];
        this.ripples = [];
        this.auroraOrbs = [];
        this.width = 0;
        this.height = 0;
        this.mouse = { x: -1000, y: -1000, active: false };
        this.animId = null;
        this.isPaused = false;
        this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        this.initOrbs();
        this.resize();
        this.initParticles();
        this.attachEvents();
        this.loop();
      }

      initOrbs() {
        this.auroraOrbs = [
          { x: 0.2, y: 0.2, r: 240, vx: 0.0003, vy: 0.0002, colorDark: "rgba(16, 185, 129, 0.12)", colorLight: "rgba(16, 185, 129, 0.06)" },
          { x: 0.8, y: 0.3, r: 280, vx: -0.0002, vy: 0.0003, colorDark: "rgba(6, 182, 212, 0.10)", colorLight: "rgba(6, 182, 212, 0.05)" },
          { x: 0.5, y: 0.8, r: 320, vx: 0.0002, vy: -0.0002, colorDark: "rgba(59, 130, 246, 0.09)", colorLight: "rgba(59, 130, 246, 0.04)" }
        ];
      }

      resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.scale(dpr, dpr);
      }

      initParticles() {
        const count = Math.min(Math.floor((this.width * this.height) / 16000), 75);
        this.particles = [];
        for (let i = 0; i < count; i++) {
          this.particles.push({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            origX: 0,
            origY: 0,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            radius: Math.random() * 2 + 1,
            baseAlpha: Math.random() * 0.35 + 0.15
          });
        }
      }

      attachEvents() {
        window.addEventListener("resize", () => {
          this.resize();
          this.initParticles();
        });

        document.addEventListener("visibilitychange", () => {
          this.isPaused = document.hidden;
        });

        window.addEventListener("pointermove", (e) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
          this.mouse.active = true;

          // Add sparkle trail (throttled)
          if (!this.prefersReducedMotion && Math.random() > 0.45) {
            this.sparkles.push({
              x: e.clientX + (Math.random() - 0.5) * 16,
              y: e.clientY + (Math.random() - 0.5) * 16,
              r: Math.random() * 2 + 1,
              life: 1.0,
              decay: 0.035
            });
          }
        });

        window.addEventListener("pointerleave", () => {
          this.mouse.active = false;
        });

        // Click / tap expanding ripples (ignoring buttons/inputs)
        window.addEventListener("click", (e) => {
          if (e.target.closest("button, input, textarea, select, a, .glass-panel, [role='button']")) {
            return;
          }
          this.ripples.push({
            x: e.clientX,
            y: e.clientY,
            r: 4,
            maxR: 140,
            alpha: 0.6
          });
        });
      }

      setTheme(theme) {
        this.theme = theme;
      }

      loop() {
        if (!this.isPaused) {
          this.update();
          this.draw();
        }
        this.animId = requestAnimationFrame(() => this.loop());
      }

      update() {
        if (this.prefersReducedMotion) return;

        // Update Aurora Orbs
        this.auroraOrbs.forEach(orb => {
          orb.x += orb.vx;
          orb.y += orb.vy;
          if (orb.x < 0.1 || orb.x > 0.9) orb.vx *= -1;
          if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;
        });

        // Update Particles & elastic cursor repulsion
        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = this.width;
          if (p.x > this.width) p.x = 0;
          if (p.y < 0) p.y = this.height;
          if (p.y > this.height) p.y = 0;

          if (this.mouse.active) {
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 120;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 3;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        });

        // Update Sparkles
        for (let i = this.sparkles.length - 1; i >= 0; i--) {
          const s = this.sparkles[i];
          s.life -= s.decay;
          s.r *= 0.97;
          if (s.life <= 0) {
            this.sparkles.splice(i, 1);
          }
        }

        // Update Ripples
        for (let i = this.ripples.length - 1; i >= 0; i--) {
          const r = this.ripples[i];
          r.r += 3.5;
          r.alpha *= 0.95;
          if (r.alpha <= 0.02 || r.r >= r.maxR) {
            this.ripples.splice(i, 1);
          }
        }
      }

      draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Aurora Orbs
        this.auroraOrbs.forEach(orb => {
          const cx = orb.x * this.width;
          const cy = orb.y * this.height;
          const grad = this.ctx.createRadialGradient(cx, cy, 10, cx, cy, orb.r);
          const color = this.theme === "dark" ? orb.colorDark : orb.colorLight;
          grad.addColorStop(0, color);
          grad.addColorStop(1, "transparent");
          this.ctx.fillStyle = grad;
          this.ctx.beginPath();
          this.ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
          this.ctx.fill();
        });

        // Draw Constellation Connections
        const maxDist = 110;
        const lineAlphaBase = this.theme === "dark" ? 0.12 : 0.08;
        this.ctx.lineWidth = 0.8;

        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const p1 = this.particles[i];
            const p2 = this.particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * lineAlphaBase;
              this.ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              this.ctx.beginPath();
              this.ctx.moveTo(p1.x, p1.y);
              this.ctx.lineTo(p2.x, p2.y);
              this.ctx.stroke();
            }
          }
        }

        // Draw Particles
        const particleColor = this.theme === "dark" ? "16, 185, 129" : "5, 150, 105";
        this.particles.forEach(p => {
          this.ctx.fillStyle = `rgba(${particleColor}, ${p.baseAlpha})`;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          this.ctx.fill();
        });

        // Draw Sparkles
        this.sparkles.forEach(s => {
          this.ctx.fillStyle = `rgba(52, 211, 153, ${s.life})`;
          this.ctx.beginPath();
          this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          this.ctx.fill();
        });

        // Draw Ripples
        this.ripples.forEach(r => {
          this.ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha})`;
          this.ctx.lineWidth = 1.8;
          this.ctx.beginPath();
          this.ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
          this.ctx.stroke();
        });
      }
    }

    this.canvasEngine = new CanvasBackgroundEngine(canvas, this.currentTheme);
  }

  // --------------------------------------------------------------------------
  // Navigation & Mobile Menu
  // --------------------------------------------------------------------------
  initNavigation() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }

    // "Verify Now" header CTA button
    const heroVerifyCTA = document.getElementById("nav-verify-cta");
    if (heroVerifyCTA) {
      heroVerifyCTA.addEventListener("click", () => {
        const portal = document.getElementById("verify-section");
        if (portal) portal.scrollIntoView({ behavior: "smooth" });
        const input = document.getElementById("verify-input");
        if (input) input.focus();
      });
    }
  }

  // --------------------------------------------------------------------------
  // Cryptographic SHA-256 Canonical Engine
  // --------------------------------------------------------------------------
  async computeCanonicalHash(cred) {
    // Deterministic canonical fields in explicit order
    const canonicalPayload = {
      id: (cred.id || "").trim().toUpperCase(),
      type: (cred.type || "").trim().toUpperCase(),
      recipientName: (cred.recipientName || "").trim(),
      issuerName: (cred.issuerName || "").trim(),
      issuerDomain: (cred.issuerDomain || "").trim().toLowerCase(),
      designation: (cred.designation || "").trim(),
      issueDate: (cred.issueDate || "").trim(),
      signatoryName: (cred.signatoryName || "").trim(),
      specificDetails: cred.specificDetails || {}
    };

    const canonicalString = JSON.stringify(canonicalPayload);
    const encoder = new TextEncoder();
    const data = encoder.encode(canonicalString);

    if (window.crypto && window.crypto.subtle) {
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    } else {
      // Fallback simple checksum if Web Crypto is unavailable
      let hash = 0;
      for (let i = 0; i < canonicalString.length; i++) {
        hash = (hash << 5) - hash + canonicalString.charCodeAt(i);
        hash |= 0;
      }
      return ("00000000" + (hash >>> 0).toString(16)).slice(-8).toUpperCase().repeat(8);
    }
  }

  // --------------------------------------------------------------------------
  // Universal Verification Portal
  // --------------------------------------------------------------------------
  initVerificationPortal() {
    const input = document.getElementById("verify-input");
    const heroInput = document.getElementById("hero-credential-input");
    const verifyBtn = document.getElementById("verify-btn");
    const heroVerifyBtn = document.getElementById("hero-verify-btn");
    const heroScanBtn = document.getElementById("hero-scan-btn");
    const pasteBtn = document.getElementById("verify-paste-btn");
    const clearBtn = document.getElementById("verify-clear-btn");

    if (verifyBtn && input) {
      verifyBtn.addEventListener("click", () => {
        this.verifyCredentialById(input.value);
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.verifyCredentialById(input.value);
        }
      });
    }

    if (heroVerifyBtn && heroInput) {
      heroVerifyBtn.addEventListener("click", () => {
        const val = heroInput.value.trim();
        if (val) {
          const section = document.getElementById("verify-section");
          if (section) section.scrollIntoView({ behavior: "smooth" });
          this.verifyCredentialById(val);
        }
      });
      heroInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          heroVerifyBtn.click();
        }
      });
    }

    if (heroScanBtn) {
      heroScanBtn.addEventListener("click", () => {
        this.openQRScannerModal();
      });
    }

    if (pasteBtn && input) {
      pasteBtn.addEventListener("click", async () => {
        try {
          const clipText = await navigator.clipboard.readText();
          input.value = clipText.trim();
          this.showToast("Pasted from clipboard.", "info");
        } catch (e) {
          this.showToast("Could not access clipboard. Please paste manually.", "warning");
        }
      });
    }

    if (clearBtn && input) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        this.hideResultPanels();
        input.focus();
      });
    }

    // Quick Test Demo Sample Buttons in Hero
    document.querySelectorAll(".quick-test-sample-card").forEach(card => {
      card.addEventListener("click", () => {
        const credId = card.getAttribute("data-sample-id");
        if (credId) {
          const section = document.getElementById("verify-section");
          if (section) section.scrollIntoView({ behavior: "smooth" });
          this.verifyCredentialById(credId);
        }
      });
    });
  }

  hideResultPanels() {
    const verifiedPanel = document.getElementById("result-panel-verified");
    const revokedPanel = document.getElementById("result-panel-revoked");
    const notfoundPanel = document.getElementById("result-panel-notfound");
    const loadingPanel = document.getElementById("result-panel-loading");

    if (verifiedPanel) verifiedPanel.classList.add("hidden");
    if (revokedPanel) revokedPanel.classList.add("hidden");
    if (notfoundPanel) notfoundPanel.classList.add("hidden");
    if (loadingPanel) loadingPanel.classList.add("hidden");
  }

  async verifyCredentialById(rawId) {
    if (!rawId || typeof rawId !== "string") {
      this.showToast("Please enter a valid Credential ID (e.g. VF-CERT-2024-9102).", "warning");
      return;
    }

    const trimmedId = rawId.trim().toUpperCase();
    const input = document.getElementById("verify-input");
    if (input) input.value = trimmedId;

    // Show loading
    this.hideResultPanels();
    const loadingPanel = document.getElementById("result-panel-loading");
    if (loadingPanel) loadingPanel.classList.remove("hidden");

    // Smooth UX delay for hash recalculation
    await new Promise(res => setTimeout(res, 280));

    // Lookup in registry
    const record = this.registry.find(r => r.id.toUpperCase() === trimmedId);

    if (loadingPanel) loadingPanel.classList.add("hidden");

    if (!record) {
      this.renderNotFoundResult(trimmedId);
      return;
    }

    this.currentRecord = record;

    if (record.status === "revoked") {
      this.renderRevokedResult(record);
    } else {
      this.renderVerifiedResult(record);
    }
  }

  renderVerifiedResult(record) {
    this.hideResultPanels();
    const panel = document.getElementById("result-panel-verified");
    if (!panel) return;

    panel.classList.remove("hidden");

    document.getElementById("res-ver-id").textContent = record.id;
    document.getElementById("res-ver-recipient").textContent = record.recipientName;
    document.getElementById("res-ver-issuer").textContent = record.issuerName;
    document.getElementById("res-ver-domain").textContent = record.issuerDomain || "Verified Domain";
    document.getElementById("res-ver-domain").href = record.issuerDomain ? `https://${record.issuerDomain}` : "#";
    document.getElementById("res-ver-type").textContent = this.formatCredType(record.type);
    document.getElementById("res-ver-designation").textContent = record.designation;
    document.getElementById("res-ver-issuedate").textContent = record.issueDate;
    document.getElementById("res-ver-expiry").textContent = record.expiryDate || "Lifetime";
    document.getElementById("res-ver-signatory").textContent = `${record.signatoryName} (${record.signatoryTitle})`;
    document.getElementById("res-ver-sha256").textContent = record.sha256 || "COMPUTING";
    document.getElementById("res-ver-registered").textContent = new Date(record.createdAt).toLocaleDateString();

    const viewDocBtn = document.getElementById("res-ver-btn-viewdoc");
    if (viewDocBtn) {
      viewDocBtn.onclick = () => this.openDocumentPreviewModal(record);
    }

    const copyBtn = document.getElementById("res-ver-btn-copy");
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(record.id);
        this.showToast(`Credential ID ${record.id} copied to clipboard!`, "success");
      };
    }

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  renderRevokedResult(record) {
    this.hideResultPanels();
    const panel = document.getElementById("result-panel-revoked");
    if (!panel) return;

    panel.classList.remove("hidden");

    document.getElementById("res-rev-id").textContent = record.id;
    document.getElementById("res-rev-issuer").textContent = record.issuerName;
    document.getElementById("res-rev-reason").textContent = record.revocationReason || "Flagged for fraudulent recruitment activity.";
    document.getElementById("res-rev-date").textContent = record.revocationDate || record.updatedAt.split("T")[0];

    const reportBtn = document.getElementById("res-rev-btn-report");
    if (reportBtn) {
      reportBtn.onclick = () => this.openReportScamModal(record);
    }

    const calcBtn = document.getElementById("res-rev-btn-calc");
    if (calcBtn) {
      calcBtn.onclick = () => {
        const calcSection = document.getElementById("calculator-section");
        if (calcSection) calcSection.scrollIntoView({ behavior: "smooth" });
      };
    }

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  renderNotFoundResult(enteredId) {
    this.hideResultPanels();
    const panel = document.getElementById("result-panel-notfound");
    if (!panel) return;

    panel.classList.remove("hidden");
    document.getElementById("res-notfound-id").textContent = enteredId;

    const retryBtn = document.getElementById("res-notfound-btn-retry");
    if (retryBtn) {
      retryBtn.onclick = () => {
        const input = document.getElementById("verify-input");
        if (input) {
          input.value = "";
          input.focus();
        }
      };
    }

    const scanBtn = document.getElementById("res-notfound-btn-scan");
    if (scanBtn) {
      scanBtn.onclick = () => this.openQRScannerModal();
    }

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  formatCredType(typeCode) {
    switch (typeCode) {
      case "CERT": return "Certificate of Completion";
      case "INT": return "Internship Completion Letter";
      case "OFF": return "Official Job Offer Letter";
      default: return typeCode;
    }
  }

  // --------------------------------------------------------------------------
  // Issuer Portal & Generator
  // --------------------------------------------------------------------------
  initIssuerPortal() {
    this.setupIssuerTabs();
    this.setupCreateCredentialForm();
    this.setupRegistryImportExport();
  }

  setupIssuerTabs() {
    const tabs = [
      { tabId: "issuer-tab-btn-create", paneId: "issuer-pane-create" },
      { tabId: "issuer-tab-btn-registry", paneId: "issuer-pane-registry" },
      { tabId: "issuer-tab-btn-history", paneId: "issuer-pane-history" },
      { tabId: "issuer-tab-btn-io", paneId: "issuer-pane-io" }
    ];

    tabs.forEach(item => {
      const btn = document.getElementById(item.tabId);
      if (!btn) return;
      btn.addEventListener("click", () => {
        tabs.forEach(t => {
          const b = document.getElementById(t.tabId);
          const p = document.getElementById(t.paneId);
          if (b) b.classList.remove("active-tab");
          if (p) p.classList.add("hidden");
        });
        btn.classList.add("active-tab");
        const activePane = document.getElementById(item.paneId);
        if (activePane) activePane.classList.remove("hidden");
      });
    });
  }

  setupCreateCredentialForm() {
    const typeSelect = document.getElementById("cred-form-type");
    const certFields = document.getElementById("form-fields-cert");
    const intFields = document.getElementById("form-fields-int");
    const offFields = document.getElementById("form-fields-off");
    const form = document.getElementById("create-cred-form");

    if (typeSelect && certFields && intFields && offFields) {
      const updateConditionalFields = () => {
        const val = typeSelect.value;
        certFields.classList.add("hidden");
        intFields.classList.add("hidden");
        offFields.classList.add("hidden");

        if (val === "CERT") certFields.classList.remove("hidden");
        else if (val === "INT") intFields.classList.remove("hidden");
        else if (val === "OFF") offFields.classList.remove("hidden");
      };

      typeSelect.addEventListener("change", updateConditionalFields);
      updateConditionalFields();
    }

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await this.handleCreateCredentialSubmit(form);
      });

      const resetBtn = document.getElementById("cred-form-btn-reset");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => form.reset());
      }
    }
  }

  async handleCreateCredentialSubmit(form) {
    const type = document.getElementById("cred-form-type").value;
    const recipientName = document.getElementById("cred-form-recipient").value.trim();
    const issuerName = document.getElementById("cred-form-issuer").value.trim();
    const issuerDomain = document.getElementById("cred-form-domain").value.trim().toLowerCase();
    const designation = document.getElementById("cred-form-designation").value.trim();
    const issueDate = document.getElementById("cred-form-issuedate").value;
    const expiryDate = document.getElementById("cred-form-expiry").value.trim() || "Lifetime";
    const signatoryName = document.getElementById("cred-form-signatory-name").value.trim();
    const signatoryTitle = document.getElementById("cred-form-signatory-title").value.trim();
    const description = document.getElementById("cred-form-description").value.trim();

    if (!recipientName || !issuerName || !designation || !issueDate || !signatoryName) {
      this.showToast("Please fill in all required fields.", "warning");
      return;
    }

    // Dynamic type-specific details
    let specificDetails = {};
    if (type === "CERT") {
      specificDetails = {
        courseName: document.getElementById("cred-form-course").value.trim() || designation,
        grade: document.getElementById("cred-form-grade").value.trim() || "Completed",
        completionDate: document.getElementById("cred-form-compdate").value || issueDate
      };
    } else if (type === "INT") {
      specificDetails = {
        role: document.getElementById("cred-form-introle").value.trim() || designation,
        department: document.getElementById("cred-form-intdept").value.trim() || "Engineering",
        startDate: document.getElementById("cred-form-intstart").value || issueDate,
        endDate: document.getElementById("cred-form-intend").value || issueDate,
        performanceRating: document.getElementById("cred-form-intrating").value.trim() || "Satisfactory"
      };
    } else if (type === "OFF") {
      specificDetails = {
        jobTitle: document.getElementById("cred-form-offtitle").value.trim() || designation,
        department: document.getElementById("cred-form-offdept").value.trim() || "Product",
        location: document.getElementById("cred-form-offloc").value.trim() || "Hybrid",
        ctc: document.getElementById("cred-form-offctc").value.trim() || "Market Standard",
        joiningDate: document.getElementById("cred-form-offjoindate").value || issueDate,
        offerExpiry: document.getElementById("cred-form-offexpiry").value || expiryDate
      };
    }

    // Generate Unique Collision-Free Credential ID
    const currentYear = new Date().getFullYear();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newId = `VF-${type}-${currentYear}-${randomHex}`;

    const newRecord = {
      id: newId,
      type,
      recipientName,
      issuerName,
      issuerDomain,
      designation,
      description,
      issueDate,
      expiryDate,
      signatoryName,
      signatoryTitle,
      specificDetails,
      sha256: "",
      status: "verified",
      revocationReason: "",
      revocationDate: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verificationScope: "Record matched in the local VERIFAI demonstration registry. Locally registered demonstration record.",
      isDemo: true
    };

    // Calculate Canonical SHA-256 Digest
    newRecord.sha256 = await this.computeCanonicalHash(newRecord);

    // Persist in LocalStorage
    this.registry.unshift(newRecord);
    this.saveRegistry();
    this.logAudit("CREATED", newId, `Registered new ${type} for ${recipientName} (${issuerName}).`);

    this.showToast(`Credential ${newId} registered successfully!`, "success");
    form.reset();

    // Immediately open printable preview modal for the user
    this.openDocumentPreviewModal(newRecord);
  }

  // --------------------------------------------------------------------------
  // Registry Management Dashboard (Table, Filters, Actions)
  // --------------------------------------------------------------------------
  initRegistryTable() {
    const searchInput = document.getElementById("reg-search-input");
    const typeFilter = document.getElementById("reg-filter-type");
    const statusFilter = document.getElementById("reg-filter-status");
    const resetDefaultsBtn = document.getElementById("reg-btn-reset-defaults");

    if (searchInput) searchInput.addEventListener("input", () => this.renderRegistryTable());
    if (typeFilter) typeFilter.addEventListener("change", () => this.renderRegistryTable());
    if (statusFilter) statusFilter.addEventListener("change", () => this.renderRegistryTable());

    if (resetDefaultsBtn) {
      resetDefaultsBtn.addEventListener("click", () => {
        if (confirm("Reset local registry to the 4 default demonstration records? Any newly created records will be cleared.")) {
          this.registry = JSON.parse(JSON.stringify(DEFAULT_REGISTRY));
          this.saveRegistry();
          this.logAudit("RESET", "SYSTEM", "Registry reset to default demonstration data.");
          this.showToast("Registry reset to defaults.", "info");
        }
      });
    }

    this.renderRegistryTable();
    this.renderAuditLog();
  }

  renderRegistryTable() {
    const tbody = document.getElementById("reg-table-body");
    const mobileContainer = document.getElementById("reg-mobile-cards");
    const emptyState = document.getElementById("reg-empty-state");
    if (!tbody) return;

    const query = (document.getElementById("reg-search-input")?.value || "").toLowerCase().trim();
    const type = document.getElementById("reg-filter-type")?.value || "ALL";
    const status = document.getElementById("reg-filter-status")?.value || "ALL";

    const filtered = this.registry.filter(r => {
      const matchQuery =
        r.id.toLowerCase().includes(query) ||
        r.recipientName.toLowerCase().includes(query) ||
        r.issuerName.toLowerCase().includes(query);
      const matchType = type === "ALL" || r.type === type;
      const matchStatus = status === "ALL" || r.status === status;
      return matchQuery && matchType && matchStatus;
    });

    tbody.innerHTML = "";
    if (mobileContainer) mobileContainer.innerHTML = "";

    if (filtered.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    filtered.forEach(record => {
      // Desktop Table Row
      const tr = document.createElement("tr");
      tr.className = "border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors text-sm";

      const statusBadge =
        record.status === "verified"
          ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
               <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified
             </span>`
          : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
               <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span> Revoked
             </span>`;

      tr.innerHTML = `
        <td class="py-3 px-4 font-mono font-medium text-emerald-400">${record.id}</td>
        <td class="py-3 px-4 font-medium">${record.recipientName}</td>
        <td class="py-3 px-4 text-slate-300">${record.issuerName}</td>
        <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">${record.type}</span></td>
        <td class="py-3 px-4 text-slate-400">${record.issueDate}</td>
        <td class="py-3 px-4">${statusBadge}</td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button class="reg-btn-view p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition" title="Verify Result">
              <i data-lucide="shield-check" class="w-4 h-4"></i>
            </button>
            <button class="reg-btn-preview p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition" title="Printable Document">
              <i data-lucide="file-text" class="w-4 h-4"></i>
            </button>
            ${
              record.status === "verified"
                ? `<button class="reg-btn-revoke p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-red-400 transition" title="Revoke Credential">
                     <i data-lucide="ban" class="w-4 h-4"></i>
                   </button>`
                : `<button class="reg-btn-reinstate p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition" title="Reinstate Credential">
                     <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
                   </button>`
            }
            <button class="reg-btn-delete p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-red-500 transition" title="Delete Record">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      `;

      // Event handlers for desktop buttons
      tr.querySelector(".reg-btn-view").onclick = () => {
        const verifySection = document.getElementById("verify-section");
        if (verifySection) verifySection.scrollIntoView({ behavior: "smooth" });
        this.verifyCredentialById(record.id);
      };

      tr.querySelector(".reg-btn-preview").onclick = () => {
        this.openDocumentPreviewModal(record);
      };

      const revokeBtn = tr.querySelector(".reg-btn-revoke");
      if (revokeBtn) {
        revokeBtn.onclick = () => this.promptRevokeCredential(record);
      }

      const reinstateBtn = tr.querySelector(".reg-btn-reinstate");
      if (reinstateBtn) {
        reinstateBtn.onclick = () => this.reinstateCredential(record);
      }

      tr.querySelector(".reg-btn-delete").onclick = () => {
        this.promptDeleteCredential(record);
      };

      tbody.appendChild(tr);

      // Mobile Card Representation
      if (mobileContainer) {
        const card = document.createElement("div");
        card.className = "p-4 rounded-xl border border-slate-700 bg-slate-900/60 mb-3";
        card.innerHTML = `
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-xs font-bold text-emerald-400">${record.id}</span>
            ${statusBadge}
          </div>
          <div class="font-semibold text-sm mb-1">${record.recipientName}</div>
          <div class="text-xs text-slate-400 mb-2">${record.issuerName} • ${record.issueDate}</div>
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button class="mobile-btn-view px-3 py-1 rounded bg-slate-800 text-xs text-emerald-400 font-medium">Verify</button>
            <button class="mobile-btn-preview px-3 py-1 rounded bg-slate-800 text-xs text-cyan-400 font-medium">Preview</button>
            ${
              record.status === "verified"
                ? `<button class="mobile-btn-revoke px-3 py-1 rounded bg-red-950/40 text-xs text-red-400 font-medium">Revoke</button>`
                : `<button class="mobile-btn-reinstate px-3 py-1 rounded bg-emerald-950/40 text-xs text-emerald-400 font-medium">Reinstate</button>`
            }
          </div>
        `;

        card.querySelector(".mobile-btn-view").onclick = () => {
          const verifySection = document.getElementById("verify-section");
          if (verifySection) verifySection.scrollIntoView({ behavior: "smooth" });
          this.verifyCredentialById(record.id);
        };
        card.querySelector(".mobile-btn-preview").onclick = () => this.openDocumentPreviewModal(record);
        const mRevoke = card.querySelector(".mobile-btn-revoke");
        if (mRevoke) mRevoke.onclick = () => this.promptRevokeCredential(record);
        const mReinstate = card.querySelector(".mobile-btn-reinstate");
        if (mReinstate) mReinstate.onclick = () => this.reinstateCredential(record);

        mobileContainer.appendChild(card);
      }
    });

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  promptRevokeCredential(record) {
    const reason = prompt(
      `Revoke demonstration credential ${record.id}?\n\nPlease enter the reason for revocation (e.g. 'Suspected payment scam', 'Forged document', 'Compromised key'):`,
      "Suspicious recruitment activity and payment requests."
    );

    if (reason && reason.trim()) {
      record.status = "revoked";
      record.revocationReason = reason.trim();
      record.revocationDate = new Date().toISOString().split("T")[0];
      record.updatedAt = new Date().toISOString();
      this.saveRegistry();
      this.logAudit("REVOKED", record.id, `Revoked reason: ${reason.trim()}`);
      this.showToast(`Credential ${record.id} has been revoked.`, "warning");

      if (this.currentRecord && this.currentRecord.id === record.id) {
        this.renderRevokedResult(record);
      }
    }
  }

  reinstateCredential(record) {
    if (confirm(`Reinstate credential ${record.id} back to Verified demonstration status?`)) {
      record.status = "verified";
      record.revocationReason = "";
      record.revocationDate = "";
      record.updatedAt = new Date().toISOString();
      this.saveRegistry();
      this.logAudit("REINSTATED", record.id, "Reinstated back to verified status.");
      this.showToast(`Credential ${record.id} reinstated.`, "success");

      if (this.currentRecord && this.currentRecord.id === record.id) {
        this.renderVerifiedResult(record);
      }
    }
  }

  promptDeleteCredential(record) {
    if (confirm(`Are you sure you want to permanently delete credential ${record.id} (${record.recipientName})? This action cannot be undone.`)) {
      this.registry = this.registry.filter(r => r.id !== record.id);
      this.saveRegistry();
      this.logAudit("DELETED", record.id, `Permanently deleted record ${record.id}`);
      this.showToast(`Credential ${record.id} deleted.`, "info");
      this.hideResultPanels();
    }
  }

  renderAuditLog() {
    const container = document.getElementById("issuer-audit-list");
    if (!container) return;

    container.innerHTML = "";
    if (this.auditLog.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-sm text-slate-400">No audit events recorded yet.</div>`;
      return;
    }

    this.auditLog.slice(0, 30).forEach(entry => {
      const item = document.createElement("div");
      item.className = "flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-xs";

      const timeStr = new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const dateStr = new Date(entry.timestamp).toLocaleDateString();

      let actionBadge = `<span class="px-2 py-0.5 rounded font-mono font-bold bg-slate-800 text-slate-300">${entry.action}</span>`;
      if (entry.action === "CREATED") {
        actionBadge = `<span class="px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">CREATED</span>`;
      } else if (entry.action === "REVOKED") {
        actionBadge = `<span class="px-2 py-0.5 rounded font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40">REVOKED</span>`;
      } else if (entry.action === "REINSTATED") {
        actionBadge = `<span class="px-2 py-0.5 rounded font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">REINSTATED</span>`;
      }

      item.innerHTML = `
        <div class="text-slate-500 font-mono text-[11px] whitespace-nowrap">${dateStr} ${timeStr}</div>
        <div>${actionBadge}</div>
        <div class="font-mono text-emerald-400 font-medium">${entry.recordId}</div>
        <div class="text-slate-300 flex-1">${entry.details}</div>
      `;
      container.appendChild(item);
    });
  }

  // --------------------------------------------------------------------------
  // JSON Import & Export
  // --------------------------------------------------------------------------
  setupRegistryImportExport() {
    const exportBtn = document.getElementById("reg-btn-export-json");
    const importInput = document.getElementById("reg-file-import-json");
    const importDropzone = document.getElementById("reg-import-dropzone");

    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const payload = {
          schemaVersion: "1.0",
          platform: "VERIFAI",
          exportedAt: new Date().toISOString(),
          recordCount: this.registry.length,
          registry: this.registry,
          auditLog: this.auditLog
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `verifai-registry-export-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast("Exported registry to JSON.", "success");
      });
    }

    if (importDropzone && importInput) {
      importDropzone.addEventListener("click", () => importInput.click());
      importInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleImportJSONFile(e.target.files[0]);
        }
      });
    }
  }

  handleImportJSONFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data || !Array.isArray(data.registry)) {
          this.showToast("Invalid JSON file format. Must contain a 'registry' array.", "error");
          return;
        }

        let importedCount = 0;
        let duplicateCount = 0;

        data.registry.forEach(incoming => {
          if (!incoming.id || !incoming.recipientName) return;

          const existingIndex = this.registry.findIndex(r => r.id.toUpperCase() === incoming.id.toUpperCase());
          if (existingIndex >= 0) {
            duplicateCount++;
            // Update existing
            this.registry[existingIndex] = incoming;
          } else {
            this.registry.push(incoming);
            importedCount++;
          }
        });

        this.saveRegistry();
        this.logAudit("IMPORTED", "BATCH", `Imported ${importedCount} records, updated ${duplicateCount} duplicates.`);
        this.showToast(`Imported ${importedCount} new records (${duplicateCount} updated).`, "success");
      } catch (err) {
        console.error("JSON Import Error:", err);
        this.showToast("Failed to parse JSON file.", "error");
      }
    };
    reader.readAsText(file);
  }

  // --------------------------------------------------------------------------
  // Document Forensics Engine
  // --------------------------------------------------------------------------
  initForensicsEngine() {
    const dropzone = document.getElementById("forensics-dropzone");
    const fileInput = document.getElementById("forensics-file-input");
    const exportBtn = document.getElementById("forensics-btn-export");
    const printBtn = document.getElementById("forensics-btn-print");

    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());

      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("drag-active");
      });

      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("drag-active");
      });

      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag-active");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.processForensicFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          this.processForensicFile(e.target.files[0]);
        }
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        if (!this.lastForensicsReport) {
          this.showToast("No report to export.", "warning");
          return;
        }
        const blob = new Blob([JSON.stringify(this.lastForensicsReport, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `verifai-forensic-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }

  async processForensicFile(file) {
    const reportPanel = document.getElementById("forensics-report-panel");
    const loading = document.getElementById("forensics-loading");

    if (file.size > 10 * 1024 * 1024) {
      this.showToast("File size exceeds 10MB limit.", "error");
      return;
    }

    if (loading) loading.classList.remove("hidden");
    if (reportPanel) reportPanel.classList.add("hidden");

    let extractedText = "";
    let metadata = {
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      type: file.type || "application/octet-stream",
      lastModified: new Date(file.lastModified).toISOString()
    };

    // If PDF, use PDF.js to extract text
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      try {
        if (typeof pdfjsLib !== "undefined") {
          const arrayBuffer = await file.arrayBuffer();
          const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
          const pdfDoc = await loadingTask.promise;
          metadata.pdfPageCount = pdfDoc.numPages;

          for (let pageNum = 1; pageNum <= Math.min(pdfDoc.numPages, 5); pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(" ");
            extractedText += pageText + "\n";
          }
        }
      } catch (e) {
        console.warn("PDF extraction note:", e);
      }
    } else if (file.type.startsWith("image/")) {
      // For images, check for QR code using jsQR
      try {
        const img = new Image();
        const dataUrl = await new Promise((res) => {
          const r = new FileReader();
          r.onload = ev => res(ev.target.result);
          r.readAsDataURL(file);
        });
        img.src = dataUrl;
        await new Promise(res => { img.onload = res; });

        const c = document.createElement("canvas");
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, c.width, c.height);

        if (typeof jsQR !== "undefined") {
          const code = jsQR(imgData.data, imgData.width, imgData.height);
          if (code && code.data) {
            extractedText += ` Embedded QR Code Payload: ${code.data} `;
            metadata.foundQRCode = code.data;
          }
        }
      } catch (err) {
        console.warn("Image inspection note:", err);
      }
    }

    // Heuristics Evaluation
    const findings = [];
    let riskScore = 0;

    // 1. Check for VERIFAI Credential ID
    const credMatch = extractedText.match(/VF-[A-Z0-9]+-[0-9]{4}-[0-9A-Z]+/i) || file.name.match(/VF-[A-Z0-9]+-[0-9]{4}-[0-9A-Z]+/i);
    if (credMatch) {
      const foundId = credMatch[0].toUpperCase();
      const inReg = this.registry.find(r => r.id.toUpperCase() === foundId);
      if (inReg) {
        if (inReg.status === "revoked") {
          findings.push({
            severity: "High Risk",
            title: "Embedded Credential is REVOKED / FLAGGED FRAUD",
            desc: `Document contains Credential ID ${foundId}, which is flagged as revoked in the registry. Reason: ${inReg.revocationReason}`
          });
          riskScore += 65;
        } else {
          findings.push({
            severity: "Informational",
            title: "Verified Registry Match Found",
            desc: `Document contains Credential ID ${foundId}, matching active record for recipient '${inReg.recipientName}' issued by '${inReg.issuerName}'.`
          });
        }
      } else {
        findings.push({
          severity: "Warning",
          title: "Credential ID Not in Registry",
          desc: `Document references Credential ID ${foundId}, but it does not exist in the demonstration registry.`
        });
        riskScore += 20;
      }
    } else {
      findings.push({
        severity: "Informational",
        title: "No Embedded VERIFAI Credential ID",
        desc: "Document does not contain standard VERIFAI machine-readable formatting (VF-[TYPE]-[YEAR]-[ID])."
      });
    }

    // 2. Suspicious Email Domain checks
    const lowerText = (extractedText + " " + file.name).toLowerCase();
    const publicWebmail = lowerText.match(/[a-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|protonmail|aol)\.com/i);
    if (publicWebmail) {
      findings.push({
        severity: "High Risk",
        title: "Public Webmail Address Detected in Recruiter Document",
        desc: `Document references an unofficial sender address (${publicWebmail[0]}). Enterprise recruiters never use free public webmail accounts.`
      });
      riskScore += 35;
    }

    // 3. Payment Scam Indicators
    const scamPhrases = [
      { trigger: "laptop security deposit", weight: 40, label: "Laptop Deposit Demand" },
      { trigger: "security deposit", weight: 35, label: "Security Deposit Demand" },
      { trigger: "registration fee", weight: 30, label: "Registration Fee Request" },
      { trigger: "training fee", weight: 30, label: "Mandatory Training Charge" },
      { trigger: "stipend clearance", weight: 35, label: "Stipend Release Charge" },
      { trigger: "telegram", weight: 25, label: "Telegram Communication Channel" },
      { trigger: "whatsapp only", weight: 20, label: "Unregistered Messaging Requirement" },
      { trigger: "crypto", weight: 35, label: "Cryptocurrency / UPI Payment Demand" }
    ];

    scamPhrases.forEach(item => {
      if (lowerText.includes(item.trigger)) {
        findings.push({
          severity: "High Risk",
          title: `Suspicious Indicator: ${item.label}`,
          desc: `Text contains '${item.trigger}'. Legitimate employers never demand financial transfers from candidates or interns.`
        });
        riskScore += item.weight;
      }
    });

    // 4. File metadata analysis
    findings.push({
      severity: "Informational",
      title: "File Integrity & Structure",
      desc: `Inspected ${metadata.type} file (${metadata.size}). Processed locally inside browser memory.`
    });

    // Calculate final risk category
    let riskLevel = "Lower Apparent Risk";
    let riskBadgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    if (riskScore >= 50) {
      riskLevel = "High Risk of Scam / Tampering";
      riskBadgeColor = "text-red-400 bg-red-500/10 border-red-500/30";
    } else if (riskScore >= 25) {
      riskLevel = "Moderate Inconsistencies Detected";
      riskBadgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
    }

    this.lastForensicsReport = {
      timestamp: new Date().toISOString(),
      metadata,
      riskScore,
      riskLevel,
      findings
    };

    if (loading) loading.classList.add("hidden");
    if (reportPanel) reportPanel.classList.remove("hidden");

    document.getElementById("forensics-res-name").textContent = metadata.name;
    document.getElementById("forensics-res-size").textContent = metadata.size;
    const badge = document.getElementById("forensics-res-riskbadge");
    badge.textContent = riskLevel;
    badge.className = `px-3 py-1 rounded-full text-xs font-semibold border ${riskBadgeColor}`;

    const findingsContainer = document.getElementById("forensics-findings-list");
    findingsContainer.innerHTML = "";

    findings.forEach(f => {
      const item = document.createElement("div");
      let icon = `<i data-lucide="info" class="w-5 h-5 text-cyan-400"></i>`;
      let border = "border-slate-700 bg-slate-900/40";

      if (f.severity === "High Risk") {
        icon = `<i data-lucide="alert-triangle" class="w-5 h-5 text-red-400"></i>`;
        border = "border-red-500/30 bg-red-500/5";
      } else if (f.severity === "Warning") {
        icon = `<i data-lucide="alert-circle" class="w-5 h-5 text-amber-400"></i>`;
        border = "border-amber-500/30 bg-amber-500/5";
      }

      item.className = `p-3.5 rounded-xl border ${border} flex items-start gap-3 text-xs`;
      item.innerHTML = `
        <div class="mt-0.5">${icon}</div>
        <div class="flex-1">
          <div class="font-semibold text-sm mb-0.5">${f.title}</div>
          <div class="text-slate-300 leading-relaxed">${f.desc}</div>
        </div>
      `;
      findingsContainer.appendChild(item);
    });

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // --------------------------------------------------------------------------
  // Interactive Offer Letter Risk Calculator
  // --------------------------------------------------------------------------
  initRiskCalculator() {
    const checkboxes = document.querySelectorAll(".risk-calc-checkbox");
    const scoreBar = document.getElementById("calc-score-bar");
    const scoreText = document.getElementById("calc-score-value");
    const levelBadge = document.getElementById("calc-level-badge");
    const breakdownList = document.getElementById("calc-breakdown-list");
    const resetBtn = document.getElementById("calc-btn-reset");

    const updateCalculator = () => {
      let totalScore = 0;
      const triggered = [];

      checkboxes.forEach(cb => {
        if (cb.checked) {
          const weight = parseInt(cb.getAttribute("data-weight") || "10", 10);
          totalScore += weight;
          triggered.push({
            title: cb.getAttribute("data-title") || "Suspicious Indicator",
            weight
          });
        }
      });

      // Normalize max 100
      const finalScore = Math.min(totalScore, 100);

      if (scoreBar) scoreBar.style.width = `${finalScore}%`;
      if (scoreText) scoreText.textContent = finalScore;

      let levelText = "Lower Apparent Risk (0–24)";
      let badgeStyle = "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      let barColor = "bg-emerald-500";

      if (finalScore >= 50) {
        levelText = "High Risk of Fraud (50–100)";
        badgeStyle = "text-red-400 bg-red-500/10 border-red-500/30";
        barColor = "bg-red-500";
      } else if (finalScore >= 25) {
        levelText = "Moderate Risk (25–49)";
        badgeStyle = "text-amber-400 bg-amber-500/10 border-amber-500/30";
        barColor = "bg-amber-500";
      }

      if (levelBadge) {
        levelBadge.textContent = levelText;
        levelBadge.className = `px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`;
      }

      if (scoreBar) {
        scoreBar.className = `h-3 rounded-full transition-all duration-500 ${barColor}`;
      }

      if (breakdownList) {
        breakdownList.innerHTML = "";
        if (triggered.length === 0) {
          breakdownList.innerHTML = `<li class="text-xs text-slate-400">No risk warning signs selected. Check the boxes that describe your offer.</li>`;
        } else {
          triggered.forEach(t => {
            const li = document.createElement("li");
            li.className = "flex items-center justify-between text-xs py-1 border-b border-slate-800 text-slate-300";
            li.innerHTML = `<span>• ${t.title}</span> <span class="font-mono text-red-400 font-bold">+${t.weight} pts</span>`;
            breakdownList.appendChild(li);
          });
        }
      }
    };

    checkboxes.forEach(cb => cb.addEventListener("change", updateCalculator));

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        checkboxes.forEach(cb => { cb.checked = false; });
        updateCalculator();
        this.showToast("Risk Calculator checklist reset.", "info");
      });
    }

    updateCalculator();
  }

  // --------------------------------------------------------------------------
  // Printable Document Preview Modal (High-Fidelity Official Templates)
  // --------------------------------------------------------------------------
  openDocumentPreviewModal(record) {
    const modal = document.getElementById("doc-preview-modal");
    const container = document.getElementById("printable-doc-root");
    if (!modal || !container) return;

    modal.classList.remove("hidden");
    container.innerHTML = "";

    // Render template based on record.type
    if (record.type === "CERT") {
      container.innerHTML = this.buildCertificateTemplate(record);
    } else if (record.type === "INT") {
      container.innerHTML = this.buildInternshipTemplate(record);
    } else {
      container.innerHTML = this.buildJobOfferTemplate(record);
    }

    // Render QR Code inside document
    const qrContainer = container.querySelector(".doc-qr-placeholder");
    if (qrContainer && typeof QRCode !== "undefined") {
      qrContainer.innerHTML = "";
      new QRCode(qrContainer, {
        text: `verifai://verify/${record.id}`,
        width: 110,
        height: 110,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    // Modal Action Buttons
    const printBtn = document.getElementById("doc-btn-print");
    const copyBtn = document.getElementById("doc-btn-copy");
    const dlQrBtn = document.getElementById("doc-btn-dl-qr");

    if (printBtn) {
      printBtn.onclick = () => window.print();
    }

    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(record.id);
        this.showToast(`Credential ID ${record.id} copied!`, "success");
      };
    }

    if (dlQrBtn) {
      dlQrBtn.onclick = () => {
        const img = qrContainer ? qrContainer.querySelector("img") : null;
        if (img && img.src) {
          const a = document.createElement("a");
          a.href = img.src;
          a.download = `${record.id}-QR.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.showToast("QR Code downloaded.", "success");
        }
      };
    }
  }

  buildCertificateTemplate(record) {
    return `
      <div class="printable-document certificate-border p-8 md:p-12 max-w-4xl mx-auto rounded-lg text-slate-900 relative">
        <div class="doc-watermark-overlay">VERIFAI DEMO</div>

        <!-- Top Header -->
        <div class="text-center relative z-10">
          <div class="inline-flex items-center gap-2 mb-2">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">V</span>
            <span class="font-bold tracking-widest text-emerald-800 text-sm">VERIFAI DIGITAL TRUST NETWORK</span>
          </div>
          <h1 class="font-cert-title text-2xl md:text-3xl font-bold tracking-wide text-slate-900 uppercase">
            Certificate of Completion
          </h1>
          <p class="text-xs uppercase tracking-widest text-slate-500 mt-1">This is to officially certify that</p>
        </div>

        <!-- Recipient Name -->
        <div class="text-center my-6 relative z-10">
          <h2 class="font-serif-body text-3xl md:text-4xl font-bold text-emerald-900 italic border-b-2 border-emerald-600/30 inline-block pb-2 px-8">
            ${record.recipientName}
          </h2>
        </div>

        <!-- Course & Description -->
        <div class="text-center max-w-2xl mx-auto text-sm text-slate-700 leading-relaxed relative z-10 mb-8">
          <p class="mb-3">
            has successfully fulfilled all academic and practical requirements for the program:
          </p>
          <p class="font-bold text-base text-slate-900 mb-2">
            ${record.designation}
          </p>
          <p class="text-xs text-slate-600">
            ${record.description}
          </p>
        </div>

        <!-- Issuer, Grades & Details -->
        <div class="grid grid-cols-2 gap-4 text-xs border-t border-b border-slate-300 py-4 max-w-2xl mx-auto text-slate-700 mb-8 relative z-10">
          <div><span class="font-semibold text-slate-900">Issuing Organization:</span> ${record.issuerName}</div>
          <div><span class="font-semibold text-slate-900">Grade / Standing:</span> ${record.specificDetails.grade || "Passed with Distinction"}</div>
          <div><span class="font-semibold text-slate-900">Issue Date:</span> ${record.issueDate}</div>
          <div><span class="font-semibold text-slate-900">Validity:</span> ${record.expiryDate || "Lifetime"}</div>
        </div>

        <!-- Signatory & Security Footer -->
        <div class="flex items-end justify-between max-w-3xl mx-auto pt-4 relative z-10">
          <!-- Left: Authorized Signatory -->
          <div class="text-left">
            <div class="font-serif-body text-lg italic text-slate-800 font-semibold mb-1">${record.signatoryName}</div>
            <div class="h-0.5 w-40 bg-slate-400 mb-1"></div>
            <div class="text-[11px] font-bold text-slate-900">${record.signatoryTitle}</div>
            <div class="text-[10px] text-slate-500">${record.issuerName}</div>
          </div>

          <!-- Right: Security QR Code -->
          <div class="text-right flex flex-col items-end">
            <div class="doc-qr-placeholder p-1 bg-white border border-slate-300 rounded shadow-sm mb-1"></div>
            <div class="font-mono text-[10px] text-slate-600 font-semibold">${record.id}</div>
          </div>
        </div>

        <!-- Security Hash & Disclaimer Strip -->
        <div class="mt-8 pt-4 border-t border-slate-200 text-center relative z-10">
          <div class="font-mono text-[9px] text-slate-500 mb-1 break-all">
            CANONICAL SHA-256: ${record.sha256}
          </div>
          <div class="text-[9px] text-slate-400 leading-tight">
            DEMONSTRATION DOCUMENT — NOT AN OFFICIAL COMPANY-ISSUED DOCUMENT. Registered in local VERIFAI demonstration registry for verification modeling.
          </div>
        </div>
      </div>
    `;
  }

  buildInternshipTemplate(record) {
    return `
      <div class="printable-document p-8 md:p-12 max-w-4xl mx-auto rounded-lg text-slate-900 relative border border-slate-300">
        <div class="doc-watermark-overlay">VERIFAI DEMO</div>

        <!-- Letterhead Header -->
        <div class="flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-6 relative z-10">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight uppercase">${record.issuerName}</h1>
            <p class="text-xs text-slate-500">${record.issuerDomain || "Corporate Headquarters"}</p>
          </div>
          <div class="text-right">
            <span class="text-xs font-mono font-semibold px-2 py-1 bg-slate-100 rounded border border-slate-200">${record.id}</span>
            <p class="text-xs text-slate-500 mt-1">Date: ${record.issueDate}</p>
          </div>
        </div>

        <!-- Document Title -->
        <div class="text-center my-4 relative z-10">
          <h2 class="text-lg font-bold tracking-wide text-slate-900 uppercase underline">
            INTERNSHIP COMPLETION CERTIFICATE
          </h2>
        </div>

        <!-- Letter Body -->
        <div class="text-sm text-slate-800 leading-relaxed space-y-4 my-6 relative z-10">
          <p>
            <strong>TO WHOMSOEVER IT MAY CONCERN</strong>
          </p>
          <p>
            This is to certify that <strong>${record.recipientName}</strong> has successfully completed their internship program with <strong>${record.issuerName}</strong> as a <strong>${record.designation}</strong>.
          </p>
          <p>
            <strong>Duration:</strong> From ${record.specificDetails.startDate || "2024-01-08"} to ${record.specificDetails.endDate || "2024-06-28"}<br/>
            <strong>Department:</strong> ${record.specificDetails.department || "Engineering"}<br/>
            <strong>Overall Evaluation:</strong> ${record.specificDetails.performanceRating || "Outstanding"}
          </p>
          <p>
            ${record.description}
          </p>
          <p>
            During their tenure, ${record.recipientName} exhibited high standards of professional discipline, technical curiosity, and collaborative teamwork. We wish them all success in their future endeavors.
          </p>
        </div>

        <!-- Signatory & Security Footer -->
        <div class="flex items-end justify-between pt-8 border-t border-slate-200 relative z-10 mt-8">
          <div>
            <div class="font-serif-body text-base italic text-slate-900 mb-1">${record.signatoryName}</div>
            <div class="h-0.5 w-36 bg-slate-400 mb-1"></div>
            <div class="text-xs font-bold text-slate-900">${record.signatoryTitle}</div>
            <div class="text-xs text-slate-500">${record.issuerName}</div>
          </div>

          <div class="text-right flex flex-col items-end">
            <div class="doc-qr-placeholder p-1 bg-white border border-slate-300 rounded shadow-sm mb-1"></div>
            <div class="font-mono text-[10px] text-slate-600 font-semibold">${record.id}</div>
          </div>
        </div>

        <div class="mt-8 pt-4 border-t border-slate-200 text-center relative z-10">
          <div class="font-mono text-[9px] text-slate-500 mb-1 break-all">
            CANONICAL SHA-256: ${record.sha256}
          </div>
          <div class="text-[9px] text-slate-400">
            DEMONSTRATION DOCUMENT — NOT AN OFFICIAL COMPANY-ISSUED DOCUMENT.
          </div>
        </div>
      </div>
    `;
  }

  buildJobOfferTemplate(record) {
    return `
      <div class="printable-document p-8 md:p-12 max-w-4xl mx-auto rounded-lg text-slate-900 relative border border-slate-300">
        <div class="doc-watermark-overlay">VERIFAI DEMO</div>

        <!-- Corporate Header -->
        <div class="flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-6 relative z-10">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight uppercase">${record.issuerName}</h1>
            <p class="text-xs text-slate-500">Talent Acquisition & Human Resources</p>
          </div>
          <div class="text-right">
            <span class="text-xs font-mono font-semibold px-2 py-1 bg-slate-100 rounded border border-slate-200">${record.id}</span>
            <p class="text-xs text-slate-500 mt-1">Offer Date: ${record.issueDate}</p>
          </div>
        </div>

        <!-- Offer Letter Title & Recipient -->
        <div class="my-4 relative z-10">
          <h2 class="text-base font-bold text-slate-900 uppercase mb-2">OFFICIAL OFFER OF EMPLOYMENT</h2>
          <p class="text-sm font-semibold">Dear ${record.recipientName},</p>
          <p class="text-sm text-slate-700 leading-relaxed mt-2">
            On behalf of <strong>${record.issuerName}</strong>, we are pleased to extend this official offer of employment for the role of <strong>${record.designation}</strong>.
          </p>
        </div>

        <!-- Offer Summary Box -->
        <div class="my-6 p-4 rounded bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2 relative z-10">
          <div class="grid grid-cols-2 gap-2">
            <div><span class="font-bold text-slate-900">Position / Title:</span> ${record.specificDetails.jobTitle || record.designation}</div>
            <div><span class="font-bold text-slate-900">Department:</span> ${record.specificDetails.department || "Technology"}</div>
            <div><span class="font-bold text-slate-900">Work Location:</span> ${record.specificDetails.location || "Hybrid"}</div>
            <div><span class="font-bold text-slate-900">Total Compensation (CTC):</span> ${record.specificDetails.ctc || "Market Standard"}</div>
            <div><span class="font-bold text-slate-900">Proposed Joining Date:</span> ${record.specificDetails.joiningDate || "2024-09-02"}</div>
            <div><span class="font-bold text-slate-900">Acceptance Deadline:</span> ${record.specificDetails.offerExpiry || "2024-08-15"}</div>
          </div>
        </div>

        <!-- Terms & Anti-Scam Notice -->
        <div class="text-xs text-slate-700 leading-relaxed space-y-3 my-6 relative z-10">
          <p>
            ${record.description}
          </p>
          <div class="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-950 font-medium">
            <strong>Security Notice:</strong> ${record.issuerName} does not charge any application, registration, laptop deposit, or training fees at any stage of hiring. Genuine communications will originate solely from verified corporate domains.
          </div>
        </div>

        <!-- Signatory & Security Footer -->
        <div class="flex items-end justify-between pt-8 border-t border-slate-200 relative z-10 mt-8">
          <div>
            <div class="font-serif-body text-base italic text-slate-900 mb-1">${record.signatoryName}</div>
            <div class="h-0.5 w-36 bg-slate-400 mb-1"></div>
            <div class="text-xs font-bold text-slate-900">${record.signatoryTitle}</div>
            <div class="text-xs text-slate-500">${record.issuerName}</div>
          </div>

          <div class="text-right flex flex-col items-end">
            <div class="doc-qr-placeholder p-1 bg-white border border-slate-300 rounded shadow-sm mb-1"></div>
            <div class="font-mono text-[10px] text-slate-600 font-semibold">${record.id}</div>
          </div>
        </div>

        <div class="mt-8 pt-4 border-t border-slate-200 text-center relative z-10">
          <div class="font-mono text-[9px] text-slate-500 mb-1 break-all">
            CANONICAL SHA-256: ${record.sha256}
          </div>
          <div class="text-[9px] text-slate-400">
            DEMONSTRATION DOCUMENT — NOT AN OFFICIAL COMPANY-ISSUED DOCUMENT.
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Modals Controller
  // --------------------------------------------------------------------------
  initModals() {
    // Document Preview Modal close
    const docModal = document.getElementById("doc-preview-modal");
    const docCloseBtn = document.getElementById("doc-btn-close");
    if (docModal && docCloseBtn) {
      docCloseBtn.addEventListener("click", () => docModal.classList.add("hidden"));
    }

    // QR Scanner Modal trigger and close
    const scannerModal = document.getElementById("qr-scanner-modal");
    const scannerCloseBtn = document.getElementById("scanner-btn-close");
    if (scannerModal && scannerCloseBtn) {
      scannerCloseBtn.addEventListener("click", () => {
        scannerModal.classList.add("hidden");
        if (window.verifaiScanner) window.verifaiScanner.stopCamera();
      });
    }

    // Report Scam Modal
    const reportModal = document.getElementById("report-scam-modal");
    const reportCloseBtn = document.getElementById("report-modal-close");
    const reportForm = document.getElementById("report-scam-form");

    if (reportModal && reportCloseBtn) {
      reportCloseBtn.addEventListener("click", () => reportModal.classList.add("hidden"));
    }

    if (reportForm) {
      reportForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.showToast("Report submitted successfully. Thank you for protecting the community!", "success");
        if (reportModal) reportModal.classList.add("hidden");
        reportForm.reset();
      });
    }

    // Global ESC key listener to close active modals
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (docModal && !docModal.classList.contains("hidden")) docModal.classList.add("hidden");
        if (scannerModal && !scannerModal.classList.contains("hidden")) {
          scannerModal.classList.add("hidden");
          if (window.verifaiScanner) window.verifaiScanner.stopCamera();
        }
        if (reportModal && !reportModal.classList.contains("hidden")) reportModal.classList.add("hidden");
      }
    });
  }

  openQRScannerModal() {
    const modal = document.getElementById("qr-scanner-modal");
    if (modal) {
      modal.classList.remove("hidden");
      // Auto-start camera if in camera tab
      if (window.verifaiScanner) {
        window.verifaiScanner.startCamera();
      }
    }
  }

  openReportScamModal(record) {
    const modal = document.getElementById("report-scam-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    const idField = document.getElementById("report-cred-id");
    if (idField && record) {
      idField.value = record.id;
    }
  }

  // --------------------------------------------------------------------------
  // Language Selector
  // --------------------------------------------------------------------------
  initLanguageSelector() {
    const select = document.getElementById("lang-select");
    if (select) {
      select.value = localStorage.getItem("verifai_lang") || "en";
      select.addEventListener("change", (e) => {
        if (typeof setLanguage === "function") {
          setLanguage(e.target.value);
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Toast Notification System
  // --------------------------------------------------------------------------
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    let border = "border-slate-700 bg-slate-900 text-slate-200";
    let icon = `<i data-lucide="info" class="w-4 h-4 text-cyan-400"></i>`;

    if (type === "success") {
      border = "border-emerald-500/50 bg-slate-900 text-emerald-400";
      icon = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>`;
    } else if (type === "warning") {
      border = "border-amber-500/50 bg-slate-900 text-amber-400";
      icon = `<i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400"></i>`;
    } else if (type === "error") {
      border = "border-red-500/50 bg-slate-900 text-red-400";
      icon = `<i data-lucide="x-circle" class="w-4 h-4 text-red-400"></i>`;
    }

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md text-xs font-medium transition-all duration-300 transform translate-y-2 opacity-0 ${border}`;
    toast.innerHTML = `<div>${icon}</div><div>${message}</div>`;

    container.appendChild(toast);

    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    });

    // Animate out and remove after 4.5 seconds
    setTimeout(() => {
      toast.classList.add("translate-y-2", "opacity-0");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 4500);
  }
}

// Global initialization
window.VerifaiApp = new VerifaiApp();
document.addEventListener("DOMContentLoaded", () => {
  window.VerifaiApp.init();
});
