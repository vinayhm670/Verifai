import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI if key is present
const aiClient = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({})
  : null;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiConfigured: !!process.env.GEMINI_API_KEY,
    authMode: 'decoupled_compatible',
    platform: 'Verifai Scam Detection Engine'
  });
});

// AI analysis and consultation proxy endpoint
app.post('/api/ai-analyze', async (req, res) => {
  const { prompt, context, systemRole } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!aiClient) {
    return res.json({
      fallback: true,
      text: "AI service key is not configured on this host. Using Verifai's built-in heuristic fraud detection engine."
    });
  }

  try {
    const defaultSystem = `You are Verifai Trust Copilot, an expert cybersecurity and anti-fraud investigator specializing in Indian scams.
Your domain covers:
- Job & Internship scams (advance laptop fee, no-interview appointment letters, ₹2,499 certificate charges)
- Payment fraud (Reverse UPI PIN debit, fake QR codes, APK downloads, power bill/challan SMS)
- Educational fraud (unaccredited degrees, fake DigiLocker/NAD marks, 100% guarantee coaching violating CCPA norms)
- Overseas migration traps (unregistered recruiting agents lacking MEA eMigrate license, tourist-to-work visa scams)
- Academic paper leaks and backdoor seats (Telegram groups, fake domains)

Provide clear, objective analysis. Give direct action steps (calling 1930, reporting on cybercrime.gov.in, verifying on mca.gov.in or emigrate.gov.in). If asked for Hindi, respond in fluent, easy-to-understand Hindi. If asked for a complaint draft or reply, provide ready-to-copy text formatted cleanly.`;

    const fullPrompt = `${context ? `Context from scanned offer:\n"""\n${context}\n"""\n\n` : ''}User Question/Instruction:\n${prompt}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemRole || defaultSystem,
      }
    });

    res.json({
      success: true,
      text: response.text || "No response generated"
    });
  } catch (error: any) {
    console.error('Gemini API call failed:', error);
    res.status(500).json({
      error: 'AI analysis failed',
      fallback: true,
      message: error?.message || 'Unknown error'
    });
  }
});

// SSRF-safe URL inspector endpoint
app.post('/api/url-lookup', async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Valid URL is required' });
  }

  // SSRF Protection: Block private and local network IPs
  const lowerUrl = url.toLowerCase();
  const blockedPatterns = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '10.',
    '192.168.',
    '172.16.',
    '169.254.',
    'metadata.google.internal'
  ];

  for (const pattern of blockedPatterns) {
    if (lowerUrl.includes(pattern)) {
      return res.status(403).json({ error: 'SSRF blocked: Requests to internal network addresses are disallowed.' });
    }
  }

  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    res.json({
      hostname: parsed.hostname,
      protocol: parsed.protocol,
      isHttps: parsed.protocol === 'https:',
      path: parsed.pathname,
      isShortener: ['bit.ly', 'tinyurl.com', 't.me', 'cutt.ly', 'is.gd'].includes(parsed.hostname)
    });
  } catch {
    res.status(400).json({ error: 'Invalid URL format' });
  }
});

// Serve frontend in production or mount vite in development
async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));

  if (hasDist || process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true }
      });
      app.use(vite.middlewares);
    } catch {
      // Fallback if Vite middleware is unavailable
      if (hasDist) {
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
          res.sendFile(path.resolve(distPath, 'index.html'));
        });
      }
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Verifai server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
