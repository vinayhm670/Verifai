/**
 * VERIFAI — QR Scanner & Generator Engine
 * Handles WebRTC Camera Scanning, Image File QR Decoding, and Payload Normalization
 */

class VerifaiScanner {
  constructor() {
    this.videoElement = null;
    this.scanCanvas = document.createElement("canvas");
    this.scanContext = this.scanCanvas.getContext("2d", { willReadFrequently: true });
    this.mediaStream = null;
    this.isScanning = false;
    this.animationFrameId = null;
    this.facingMode = "environment"; // default back camera on mobile
    this.hasMultipleCameras = false;
  }

  /**
   * Initializes DOM references and attaches modal tab handlers
   */
  init() {
    this.videoElement = document.getElementById("scanner-video");
    this.setupModalTabs();
    this.setupImageDropzone();
    this.checkCameraCapabilities();
  }

  async checkCameraCapabilities() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(d => d.kind === "videoinput");
      this.hasMultipleCameras = videoInputs.length > 1;
      const switchBtn = document.getElementById("scanner-btn-switch");
      if (switchBtn) {
        switchBtn.style.display = this.hasMultipleCameras ? "inline-flex" : "none";
      }
    } catch (e) {
      console.warn("Could not enumerate camera devices:", e);
    }
  }

  setupModalTabs() {
    const tabCam = document.getElementById("scanner-tab-cam");
    const tabImg = document.getElementById("scanner-tab-img");
    const paneCam = document.getElementById("scanner-pane-cam");
    const paneImg = document.getElementById("scanner-pane-img");

    if (tabCam && tabImg && paneCam && paneImg) {
      tabCam.addEventListener("click", () => {
        tabCam.classList.add("active-tab");
        tabImg.classList.remove("active-tab");
        paneCam.classList.remove("hidden");
        paneImg.classList.add("hidden");
      });

      tabImg.addEventListener("click", () => {
        tabImg.classList.add("active-tab");
        tabCam.classList.remove("active-tab");
        paneImg.classList.remove("hidden");
        paneCam.classList.add("hidden");
        this.stopCamera();
      });
    }

    const startBtn = document.getElementById("scanner-btn-start");
    const stopBtn = document.getElementById("scanner-btn-stop");
    const switchBtn = document.getElementById("scanner-btn-switch");

    if (startBtn) startBtn.addEventListener("click", () => this.startCamera());
    if (stopBtn) stopBtn.addEventListener("click", () => this.stopCamera());
    if (switchBtn) switchBtn.addEventListener("click", () => this.switchCamera());
  }

  setupImageDropzone() {
    const dropzone = document.getElementById("scanner-dropzone");
    const fileInput = document.getElementById("scanner-file-input");

    if (!dropzone || !fileInput) return;

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
        this.processImageFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        this.processImageFile(e.target.files[0]);
      }
    });
  }

  /**
   * Start WebRTC Camera Stream
   */
  async startCamera() {
    const startBtn = document.getElementById("scanner-btn-start");
    const stopBtn = document.getElementById("scanner-btn-stop");
    const statusMsg = document.getElementById("scanner-status-msg");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.showStatus("Camera API is not supported in this browser or context (requires HTTPS or localhost).", "error");
      return;
    }

    try {
      this.stopCamera(); // clear any previous stream
      this.showStatus("Requesting camera access...", "info");

      const constraints = {
        video: {
          facingMode: { ideal: this.facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.mediaStream;
      this.videoElement.setAttribute("playsinline", true); // required for iOS safari

      await this.videoElement.play();
      this.isScanning = true;

      if (startBtn) startBtn.classList.add("hidden");
      if (stopBtn) stopBtn.classList.remove("hidden");
      this.showStatus("Camera active. Align QR code inside reticle.", "success");

      // Start processing frames
      this.scanLoop();
    } catch (err) {
      console.error("Camera access error:", err);
      let msg = "Could not access camera. Please check permissions.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        msg = "Camera permission was denied. Please allow camera access in browser site settings.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        msg = "No compatible camera device found on this system.";
      }
      this.showStatus(msg, "error");
      if (startBtn) startBtn.classList.remove("hidden");
      if (stopBtn) stopBtn.classList.add("hidden");
    }
  }

  /**
   * Stop WebRTC Stream and cleanup tracks
   */
  stopCamera() {
    this.isScanning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {}
      });
      this.mediaStream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }

    const startBtn = document.getElementById("scanner-btn-start");
    const stopBtn = document.getElementById("scanner-btn-stop");
    if (startBtn) startBtn.classList.remove("hidden");
    if (stopBtn) stopBtn.classList.add("hidden");
    this.showStatus("Camera stopped.", "info");
  }

  /**
   * Switch between front and back camera
   */
  switchCamera() {
    this.facingMode = this.facingMode === "environment" ? "user" : "environment";
    this.startCamera();
  }

  /**
   * Scan frame loop using jsQR
   */
  scanLoop() {
    if (!this.isScanning) return;

    if (this.videoElement && this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      const width = this.videoElement.videoWidth;
      const height = this.videoElement.videoHeight;

      if (width > 0 && height > 0) {
        this.scanCanvas.width = width;
        this.scanCanvas.height = height;
        this.scanContext.drawImage(this.videoElement, 0, 0, width, height);

        const imageData = this.scanContext.getImageData(0, 0, width, height);

        if (typeof jsQR !== "undefined") {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert"
          });

          if (code && code.data) {
            this.handleQRCodePayload(code.data);
            return; // stop scanning after detected
          }
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.scanLoop());
  }

  /**
   * Process uploaded image file for QR code
   */
  processImageFile(file) {
    if (!file.type.match(/image\/(png|jpeg|jpg|webp)/i)) {
      this.showStatus("Unsupported image type. Please upload PNG, JPG, or WebP.", "error");
      return;
    }

    this.showStatus("Analyzing image for QR code...", "info");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.scanCanvas.width = img.naturalWidth || img.width;
        this.scanCanvas.height = img.naturalHeight || img.height;
        this.scanContext.drawImage(img, 0, 0);

        let imageData = this.scanContext.getImageData(0, 0, this.scanCanvas.width, this.scanCanvas.height);

        if (typeof jsQR === "undefined") {
          this.showStatus("QR decoder library is loading or unavailable.", "error");
          return;
        }

        // Pass 1: standard
        let code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth"
        });

        // Pass 2: contrast & grayscale enhancement if not found
        if (!code) {
          imageData = this.enhanceContrast(imageData);
          code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "attemptBoth"
          });
        }

        if (code && code.data) {
          this.handleQRCodePayload(code.data);
        } else {
          this.showStatus("No QR code detected in the image. Please verify resolution and lighting.", "error");
        }
      };
      img.onerror = () => {
        this.showStatus("Failed to load image file.", "error");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Grayscale & contrast enhancement filter
   */
  enhanceContrast(imageData) {
    const data = imageData.data;
    const factor = 1.4; // 40% contrast increase
    for (let i = 0; i < data.length; i += 4) {
      // Luminance
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const enhanced = factor * (gray - 128) + 128;
      const clamped = Math.min(255, Math.max(0, enhanced));
      data[i] = clamped;
      data[i + 1] = clamped;
      data[i + 2] = clamped;
    }
    return imageData;
  }

  /**
   * Handle decoded QR payload & route to verification
   */
  handleQRCodePayload(rawPayload) {
    this.stopCamera();

    const credId = this.extractCredentialId(rawPayload);

    if (!credId) {
      this.showStatus(`Scanned QR payload is not a recognized VERIFAI credential: "${rawPayload.substring(0, 50)}..."`, "error");
      return;
    }

    this.showStatus(`Found Credential ID: ${credId}. Verifying now...`, "success");

    // Close scanner modal
    const scannerModal = document.getElementById("qr-scanner-modal");
    if (scannerModal) {
      scannerModal.classList.add("hidden");
    }

    // Pass to global verifier
    if (window.VerifaiApp && typeof window.VerifaiApp.verifyCredentialById === "function") {
      window.VerifaiApp.verifyCredentialById(credId);
    } else {
      const input = document.getElementById("verify-input");
      if (input) input.value = credId;
    }
  }

  /**
   * Extract Credential ID from various supported payload formats:
   * e.g., "verifai://verify/VF-CERT-2024-9102", "https://...#VF-CERT-2024-9102", or plain "VF-CERT-2024-9102"
   */
  extractCredentialId(payload) {
    if (!payload || typeof payload !== "string") return null;

    const trimmed = payload.trim();

    // Check for VERIFAI pattern: VF-[TYPE]-[YEAR]-[ID]
    const match = trimmed.match(/VF-[A-Z0-9]+-[0-9]{4}-[0-9A-Z]+/i);
    if (match) {
      return match[0].toUpperCase();
    }

    return null;
  }

  showStatus(msg, type = "info") {
    const el = document.getElementById("scanner-status-msg");
    if (!el) return;
    el.textContent = msg;
    el.className = "text-xs font-medium text-center py-2 px-3 rounded-lg transition-all ";
    if (type === "error") {
      el.className += "bg-red-500/10 text-red-400 border border-red-500/30";
    } else if (type === "success") {
      el.className += "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
    } else {
      el.className += "bg-slate-800 text-slate-300 border border-slate-700";
    }
  }

  /**
   * Static helper: Generate QR Code into target container
   */
  static renderQRCode(targetContainer, text, size = 160) {
    if (!targetContainer) return;
    targetContainer.innerHTML = "";

    if (typeof QRCode !== "undefined") {
      try {
        new QRCode(targetContainer, {
          text: text,
          width: size,
          height: size,
          colorDark: "#0f172a",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      } catch (e) {
        console.error("QRCode generation error:", e);
        targetContainer.innerHTML = `<div class="p-4 text-xs text-red-500">QR generation failed</div>`;
      }
    } else {
      targetContainer.innerHTML = `<div class="p-4 text-xs text-amber-500">QRCode library unavailable</div>`;
    }
  }
}

// Global instance
window.verifaiScanner = new VerifaiScanner();
document.addEventListener("DOMContentLoaded", () => {
  window.verifaiScanner.init();
});
