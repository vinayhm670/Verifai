import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

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
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
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
      const distPath = path.resolve(__dirname, 'dist');
      app.use(express.static(distPath));
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Verifai server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
