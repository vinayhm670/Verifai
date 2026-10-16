/**
 * VERIFAI — AI Assistant & Voice Command Engine
 * Features: Client-Side Natural Language Understanding, Live Registry Queries,
 * Web Speech API (Speech Recognition & Speech Synthesis), and Voice Commands.
 */

class VerifaiAIAssistant {
  constructor() {
    this.isOpen = false;
    this.isMuted = localStorage.getItem("verifai_ai_muted") === "true";
    this.isListening = false;
    this.recognition = null;
    this.synthesis = window.speechSynthesis || null;
    this.messages = [];
  }

  init() {
    this.setupUI();
    this.setupSpeechRecognition();
    this.loadHistory();

    // Listen for language changes to update speech recognition language
    window.addEventListener("verifai:lang_change", (e) => {
      this.updateSpeechLanguage(e.detail.lang);
    });
  }

  setupUI() {
    const triggerBtn = document.getElementById("ai-trigger-btn");
    const closeBtn = document.getElementById("ai-close-btn");
    const clearBtn = document.getElementById("ai-clear-btn");
    const muteBtn = document.getElementById("ai-mute-btn");
    const sendBtn = document.getElementById("ai-send-btn");
    const micBtn = document.getElementById("ai-mic-btn");
    const input = document.getElementById("ai-input");
    const drawer = document.getElementById("ai-drawer");

    if (triggerBtn && drawer) {
      triggerBtn.addEventListener("click", () => this.toggleDrawer());
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeDrawer());
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.clearHistory());
    }

    if (muteBtn) {
      this.updateMuteIcon();
      muteBtn.addEventListener("click", () => {
        this.isMuted = !this.isMuted;
        localStorage.setItem("verifai_ai_muted", this.isMuted ? "true" : "false");
        this.updateMuteIcon();
        if (this.isMuted && this.synthesis) {
          this.synthesis.cancel();
        }
      });
    }

    if (sendBtn && input) {
      sendBtn.addEventListener("click", () => this.handleSendMessage());
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    if (micBtn) {
      micBtn.addEventListener("click", () => this.toggleMicrophone());
    }

    // Quick chips
    document.querySelectorAll(".ai-prompt-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-query");
        if (query) {
          const inputEl = document.getElementById("ai-input");
          if (inputEl) inputEl.value = query;
          this.handleSendMessage();
        }
      });
    });
  }

  toggleDrawer() {
    const drawer = document.getElementById("ai-drawer");
    if (!drawer) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      drawer.classList.remove("hidden");
      drawer.classList.add("flex");
      const input = document.getElementById("ai-input");
      if (input) input.focus();
    } else {
      drawer.classList.add("hidden");
      drawer.classList.remove("flex");
    }
  }

  closeDrawer() {
    const drawer = document.getElementById("ai-drawer");
    if (drawer) {
      drawer.classList.add("hidden");
      drawer.classList.remove("flex");
      this.isOpen = false;
    }
  }

  updateMuteIcon() {
    const muteBtn = document.getElementById("ai-mute-btn");
    if (!muteBtn) return;
    muteBtn.innerHTML = this.isMuted
      ? `<i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i>`
      : `<i data-lucide="volume-2" class="w-4 h-4 text-emerald-400"></i>`;
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  /**
   * Setup Web Speech Recognition
   */
  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web SpeechRecognition is not supported in this browser.");
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.updateSpeechLanguage(localStorage.getItem("verifai_lang") || "en");

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateMicUI(true);
      };

      this.recognition.onresult = (event) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          const input = document.getElementById("ai-input");
          if (input) input.value = transcript;

          // Check if this is a direct voice command
          const commandExecuted = this.evaluateVoiceCommands(transcript);
          if (!commandExecuted) {
            this.handleSendMessage();
          }
        }
      };

      this.recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        this.isListening = false;
        this.updateMicUI(false);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateMicUI(false);
      };
    } catch (e) {
      console.warn("SpeechRecognition initialization failed:", e);
    }
  }

  updateSpeechLanguage(lang) {
    if (!this.recognition) return;
    const langMap = {
      en: "en-US",
      hi: "hi-IN",
      es: "es-ES",
      fr: "fr-FR"
    };
    this.recognition.lang = langMap[lang] || "en-US";
  }

  toggleMicrophone() {
    if (!this.recognition) {
      this.appendMessage(
        "bot",
        "Speech recognition is not supported in your current browser. You can use text prompts, or open VERIFAI on Google Chrome / Microsoft Edge with HTTPS or localhost."
      );
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    } else {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn("Could not start recognition:", e);
      }
    }
  }

  updateMicUI(listening) {
    const micBtn = document.getElementById("ai-mic-btn");
    if (!micBtn) return;
    if (listening) {
      micBtn.classList.add("text-emerald-400", "mic-wave", "bg-emerald-500/20");
      micBtn.title = "Listening... Speak your command or question";
    } else {
      micBtn.classList.remove("text-emerald-400", "mic-wave", "bg-emerald-500/20");
      micBtn.title = "Voice Input";
    }
  }

  /**
   * Direct Voice Commands Interceptor
   */
  evaluateVoiceCommands(text) {
    const raw = text.trim();
    const lower = raw.toLowerCase();

    // 1. Theme commands
    if (lower.includes("dark mode") || lower.includes("dark theme")) {
      if (window.VerifaiApp && typeof window.VerifaiApp.setTheme === "function") {
        window.VerifaiApp.setTheme("dark");
        this.appendMessage("user", raw);
        const reply = "Switched interface to Dark Mode.";
        this.appendMessage("bot", reply);
        this.speak(reply);
        return true;
      }
    }

    if (lower.includes("light mode") || lower.includes("light theme")) {
      if (window.VerifaiApp && typeof window.VerifaiApp.setTheme === "function") {
        window.VerifaiApp.setTheme("light");
        this.appendMessage("user", raw);
        const reply = "Switched interface to Light Mode.";
        this.appendMessage("bot", reply);
        this.speak(reply);
        return true;
      }
    }

    // 2. Language commands
    if (lower.includes("hindi") || lower.includes("हिंदी")) {
      if (typeof setLanguage === "function") {
        setLanguage("hi");
        this.appendMessage("user", raw);
        const reply = "भाषा को हिंदी में बदल दिया गया है।";
        this.appendMessage("bot", reply);
        this.speak(reply);
        return true;
      }
    }

    if (lower.includes("spanish") || lower.includes("español")) {
      if (typeof setLanguage === "function") {
        setLanguage("es");
        this.appendMessage("user", raw);
        const reply = "Idioma cambiado a español.";
        this.appendMessage("bot", reply);
        this.speak(reply);
        return true;
      }
    }

    if (lower.includes("french") || lower.includes("français")) {
      if (typeof setLanguage === "function") {
        setLanguage("fr");
        this.appendMessage("user", raw);
        const reply = "Langue changée en français.";
        this.appendMessage("bot", reply);
        this.speak(reply);
        return true;
      }
    }

    if (lower.includes("english")) {
      if (typeof setLanguage === "function") {
        setLanguage("en");
        this.appendMessage("user", raw);
        const reply = "Language set to English.";
        this.appendMessage("bot", reply);
        this.speak(reply);
        return true;
      }
    }

    // 3. Credential lookup command (e.g., "Verify VF-CERT-2024-9102")
    const match = raw.match(/VF-[A-Z0-9]+-[0-9]{4}-[0-9A-Z]+/i);
    if (match) {
      const credId = match[0].toUpperCase();
      this.appendMessage("user", raw);
      this.processCredentialQuery(credId);
      return true;
    }

    return false;
  }

  /**
   * Handles user submitted text message
   */
  handleSendMessage() {
    const input = document.getElementById("ai-input");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    this.appendMessage("user", text);

    // Process with Client-Side NLU
    setTimeout(() => {
      this.processNLP(text);
    }, 200);
  }

  /**
   * Deterministic Natural Language Engine & Query Dispatcher
   */
  processNLP(rawText) {
    const lower = rawText.toLowerCase();

    // Check if user entered a Credential ID
    const credMatch = rawText.match(/VF-[A-Z0-9]+-[0-9]{4}-[0-9A-Z]+/i);
    if (credMatch) {
      this.processCredentialQuery(credMatch[0].toUpperCase());
      return;
    }

    // Intent: Deposit / Payment Scam
    if (
      lower.includes("deposit") ||
      lower.includes("fee") ||
      lower.includes("pay") ||
      lower.includes("money") ||
      lower.includes("charges") ||
      lower.includes("security") ||
      lower.includes("stipend") ||
      lower.includes("पैसे") ||
      lower.includes("शुल्क")
    ) {
      const reply =
        "**CRITICAL WARNING: Demanding payments is a high-risk hallmark of recruitment fraud.**\n\n" +
        "Legitimate employers, reputable multinationals, and authentic educational institutions NEVER require job seekers or interns to pay:\n" +
        "• 'Laptop / equipment security deposits'\n" +
        "• 'Mandatory training / certification fees'\n" +
        "• 'Interview scheduling or document verification charges'\n" +
        "• 'Stipend release bonds'\n\n" +
        "If a recruiter asks you to transfer funds via UPI, bank transfer, crypto, or Telegram to secure a job or internship, cease communication immediately and report the encounter.";
      this.appendMessage("bot", reply);
      this.speak("Demanding payment or deposits is a hallmark of recruitment fraud. Legitimate employers never charge candidates.");
      return;
    }

    // Intent: Fake HR Email / Domain spoofing
    if (
      lower.includes("email") ||
      lower.includes("domain") ||
      lower.includes("gmail") ||
      lower.includes("fake hr") ||
      lower.includes("ईमेल") ||
      lower.includes("correo")
    ) {
      const reply =
        "**How to Spot a Fake HR Email:**\n\n" +
        "1. **Public Webmail Warning:** Major corporations (Google, Microsoft, TCS, etc.) never conduct hiring through free accounts like `@gmail.com`, `@yahoo.com`, or `@outlook.com`.\n" +
        "2. **Lookalike Domains:** Inspect the domain after the '@' carefully. Fraudsters use misleading variations like `google-careers-portal.com` or `microsoft-hr-india.com`.\n" +
        "3. **Independent Verification:** Always verify openings directly on the organization's official careers portal before responding or sharing documents.";
      this.appendMessage("bot", reply);
      this.speak("Check the sender domain carefully. Authentic companies do not hire through free webmail or suspicious lookalike domains.");
      return;
    }

    // Intent: Fake QR Codes
    if (
      lower.includes("qr") ||
      lower.includes("qr code") ||
      lower.includes("bar code") ||
      lower.includes("क्यूआर")
    ) {
      const reply =
        "**Can QR Codes Be Forged?**\n\n" +
        "Yes! Anyone can print a QR code on a document. Scammers frequently create QR codes that link to fake Google Forms, deceptive lookalike websites, or generic congratulations pages.\n\n" +
        "**How to stay safe:**\n" +
        "• Never assume a document is authentic just because it has a QR code.\n" +
        "• Decode the QR code using VERIFAI's Universal Scanner and verify that the Credential ID resolves against an authentic cryptographic registry.";
      this.appendMessage("bot", reply);
      this.speak("QR codes can be copied or pointed to fake websites. Always verify the payload against a trusted registry.");
      return;
    }

    // Intent: Risk Calculator Guide
    if (
      lower.includes("calculator") ||
      lower.includes("risk") ||
      lower.includes("score") ||
      lower.includes("कैलकुलेटर")
    ) {
      const reply =
        "**Using the Offer Letter Risk Calculator:**\n\n" +
        "Our Risk Calculator uses a 10-point weighted heuristic algorithm to evaluate job and internship letters for suspicious indicators.\n\n" +
        "Check the boxes corresponding to your offer in the 'Risk Calculator' section. Scores above 50 indicate a High Risk of Fraud and warrant immediate independent verification.";
      this.appendMessage("bot", reply);
      this.speak("The risk calculator evaluates 10 suspicious indicators to calculate a heuristic fraud score.");
      return;
    }

    // Intent: How verification works
    if (
      lower.includes("how") &&
      (lower.includes("work") || lower.includes("verify") || lower.includes("काम"))
    ) {
      const reply =
        "**How VERIFAI Works:**\n\n" +
        "1. **Enter or Scan:** Provide a Credential ID (e.g. `VF-CERT-2024-9102`) or scan its QR code.\n" +
        "2. **Registry Lookup:** VERIFAI matches the record against demonstration registry data and validates the canonical SHA-256 digest.\n" +
        "3. **Review Status:** Instantly inspect the credential details, issuer claims, or flagged fraud warnings.";
      this.appendMessage("bot", reply);
      this.speak("VERIFAI matches credential IDs and validates canonical SHA-256 hashes against the registry.");
      return;
    }

    // General fallback
    const fallback =
      "I am your VERIFAI Trust Assistant. I can help you verify credential IDs (e.g., enter `VF-INT-2024-4481`), answer questions about fake offer letters and recruitment scams, or execute voice commands like 'Switch to dark mode'.\n\n" +
      "*Notice: VERIFAI is a client-side demonstration platform. Sample corporate records are simulated for testing.*";
    this.appendMessage("bot", fallback);
    this.speak("I am your VERIFAI assistant. You can give me a credential ID to check or ask about job scams.");
  }

  /**
   * Process credential query against local registry
   */
  processCredentialQuery(credId) {
    // Also trigger UI verification on the main page
    if (window.VerifaiApp && typeof window.VerifaiApp.verifyCredentialById === "function") {
      window.VerifaiApp.verifyCredentialById(credId);
    }

    // Fetch from localStorage registry
    let registry = [];
    try {
      registry = JSON.parse(localStorage.getItem("verifai_registry_v1")) || [];
    } catch (e) {
      registry = [];
    }

    const record = registry.find((r) => r.id.toUpperCase() === credId.toUpperCase());

    if (!record) {
      const msg =
        `🔍 **Registry Result for \`${credId}\`:**\n\n` +
        `**Status: NOT FOUND IN REGISTRY**\n\n` +
        `No record exists in the local demonstration database for this ID. Note that a missing record is not definitive proof of fraud, but we strongly advise independently contacting the claimed organization via their official corporate website.`;
      this.appendMessage("bot", msg);
      this.speak(`No record found in the demonstration registry for credential ID ${credId}. Exercise caution.`);
      return;
    }

    if (record.status === "revoked") {
      const msg =
        `🚨 **ALERT FOR \`${credId}\`:**\n\n` +
        `**Status: REVOKED / FLAGGED FRAUD**\n` +
        `• **Claimed Issuer:** ${record.issuerName}\n` +
        `• **Reason:** ${record.revocationReason || "Suspicious recruitment activity / payment demands"}\n` +
        `• **Advice:** Do not make any payments or transfer money. Cease all communication with the recruiter immediately.`;
      this.appendMessage("bot", msg);
      this.speak(`Alert! Credential ${credId} has been flagged for fraud and revoked. Reason: ${record.revocationReason || "Suspicious recruitment activity"}.`);
      return;
    }

    // Verified Demonstration Record
    const msg =
      `✅ **Verified Demonstration Record for \`${credId}\`:**\n\n` +
      `• **Recipient:** ${record.recipientName}\n` +
      `• **Claimed Issuer:** ${record.issuerName}\n` +
      `• **Type:** ${record.type}\n` +
      `• **Role / Course:** ${record.designation}\n` +
      `• **Issue Date:** ${record.issueDate}\n` +
      `• **SHA-256 Digest:** \`${record.sha256 ? record.sha256.substring(0, 20) + "..." : "Computed"}\`\n\n` +
      `*Scope: Matched in local demonstration registry. Document preview is available in the main portal.*`;
    this.appendMessage("bot", msg);
    this.speak(`Credential ${credId} is verified in the demonstration registry for ${record.recipientName} from ${record.issuerName}.`);
  }

  /**
   * Text-to-speech output
   */
  speak(text) {
    if (this.isMuted || !this.synthesis) return;

    try {
      this.synthesis.cancel(); // Stop any currently speaking speech
      const cleanText = text.replace(/[*#•`_]/g, "").replace(/\n+/g, ". ");
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Choose voice matching current language
      const lang = localStorage.getItem("verifai_lang") || "en";
      const voices = this.synthesis.getVoices();
      const voice = voices.find((v) => v.lang.startsWith(lang));
      if (voice) utterance.voice = voice;

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      this.synthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }

  appendMessage(sender, text) {
    const list = document.getElementById("ai-messages-list");
    if (!list) return;

    const msgObj = { sender, text, timestamp: new Date().toISOString() };
    this.messages.push(msgObj);
    this.saveHistory();

    const item = document.createElement("div");
    item.className =
      sender === "user"
        ? "flex justify-end mb-3"
        : "flex justify-start mb-3";

    const bubble = document.createElement("div");
    bubble.className =
      sender === "user"
        ? "max-w-[85%] rounded-2xl rounded-tr-none px-4 py-2.5 text-sm bg-emerald-600 text-white shadow-md leading-relaxed"
        : "max-w-[85%] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm bg-slate-800 text-slate-200 border border-slate-700 shadow-md leading-relaxed whitespace-pre-wrap";

    // Format simple markdown (bold, code blocks)
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.*?)`/g, "<code class='bg-black/30 px-1 py-0.5 rounded text-emerald-400 font-mono text-xs'>$1</code>");

    bubble.innerHTML = formatted;
    item.appendChild(bubble);
    list.appendChild(item);

    // Scroll to bottom
    list.scrollTop = list.scrollHeight;
  }

  saveHistory() {
    try {
      localStorage.setItem("verifai_ai_history_v1", JSON.stringify(this.messages.slice(-30)));
    } catch (e) {}
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem("verifai_ai_history_v1");
      if (stored) {
        this.messages = JSON.parse(stored);
        const list = document.getElementById("ai-messages-list");
        if (list) {
          list.innerHTML = "";
          this.messages.forEach((m) => this.renderHistoricalMessage(m));
        }
      } else {
        // Initial welcome
        this.appendMessage(
          "bot",
          "Hello! I am your **VERIFAI Trust Assistant**.\n\nYou can ask me to verify a credential (e.g. `Verify VF-CERT-2024-9102`), ask about recruitment scam red flags, or speak commands like *'Switch to dark mode'* or *'Switch to Hindi'*."
        );
      }
    } catch (e) {
      this.messages = [];
    }
  }

  renderHistoricalMessage(m) {
    const list = document.getElementById("ai-messages-list");
    if (!list) return;

    const item = document.createElement("div");
    item.className =
      m.sender === "user"
        ? "flex justify-end mb-3"
        : "flex justify-start mb-3";

    const bubble = document.createElement("div");
    bubble.className =
      m.sender === "user"
        ? "max-w-[85%] rounded-2xl rounded-tr-none px-4 py-2.5 text-sm bg-emerald-600 text-white shadow-md leading-relaxed"
        : "max-w-[85%] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm bg-slate-800 text-slate-200 border border-slate-700 shadow-md leading-relaxed whitespace-pre-wrap";

    let formatted = m.text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.*?)`/g, "<code class='bg-black/30 px-1 py-0.5 rounded text-emerald-400 font-mono text-xs'>$1</code>");

    bubble.innerHTML = formatted;
    item.appendChild(bubble);
    list.appendChild(item);
  }

  clearHistory() {
    this.messages = [];
    localStorage.removeItem("verifai_ai_history_v1");
    const list = document.getElementById("ai-messages-list");
    if (list) list.innerHTML = "";
    this.appendMessage(
      "bot",
      "Conversation cleared. How can I assist with your credential verification or scam awareness today?"
    );
  }
}

// Global instance
window.verifaiAI = new VerifaiAIAssistant();
document.addEventListener("DOMContentLoaded", () => {
  window.verifaiAI.init();
});
