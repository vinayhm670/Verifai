// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
app.use(express.json({ limit: "10mb" }));
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    aiConfigured: !!process.env.GEMINI_API_KEY,
    authMode: "decoupled_compatible",
    platform: "Verifai Scam Detection Engine"
  });
});
app.post("/api/url-lookup", async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Valid URL is required" });
  }
  const lowerUrl = url.toLowerCase();
  const blockedPatterns = [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "10.",
    "192.168.",
    "172.16.",
    "169.254.",
    "metadata.google.internal"
  ];
  for (const pattern of blockedPatterns) {
    if (lowerUrl.includes(pattern)) {
      return res.status(403).json({ error: "SSRF blocked: Requests to internal network addresses are disallowed." });
    }
  }
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    res.json({
      hostname: parsed.hostname,
      protocol: parsed.protocol,
      isHttps: parsed.protocol === "https:",
      path: parsed.pathname,
      isShortener: ["bit.ly", "tinyurl.com", "t.me", "cutt.ly", "is.gd"].includes(parsed.hostname)
    });
  } catch {
    res.status(400).json({ error: "Invalid URL format" });
  }
});
async function startServer() {
  const distPath = path.resolve(__dirname, "dist");
  const hasDist = fs.existsSync(path.resolve(distPath, "index.html"));
  if (hasDist || process.env.NODE_ENV === "production") {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  } else {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true }
      });
      app.use(vite.middlewares);
    } catch {
      if (hasDist) {
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
          res.sendFile(path.resolve(distPath, "index.html"));
        });
      }
    }
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Verifai server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
