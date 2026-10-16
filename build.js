const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

const defaultUrl = 'https://qbhjczmgmhtdgqcuprwa.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaGpjem1nbWh0ZGdxY3VwcndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNzM3OTAsImV4cCI6MjEwNzc0OTc5MH0.RsM43i6BQPugwZqi_nhKwOktds6Iqy__Gi0Yprj04gQ';

const envUrl = process.env.SUPABASE_URL || defaultUrl;
const envKey = process.env.SUPABASE_ANON_KEY || defaultKey;

const configContent = `/**
 * VERIFAI — Production Supabase Configuration
 * Injected automatically during build
 */
window.VERIFAI_CONFIG = {
  SUPABASE_URL: ${JSON.stringify(envUrl)},
  SUPABASE_ANON_KEY: ${JSON.stringify(envKey)}
};
`;

// 1. Write to root config.js
fs.writeFileSync(path.join(rootDir, 'config.js'), configContent, 'utf8');

// 2. Ensure 'public' directory exists and copy static files to it
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'style.css',
  'script.js',
  'scanner.js',
  'trust-ai.js',
  'i18n.js',
  'supabase.js',
  'config.js'
];

for (const file of filesToCopy) {
  const src = path.join(rootDir, file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

console.log('[VERIFAI Build] Output prepared with active Supabase configuration.');
