const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

const envUrl = process.env.SUPABASE_URL || '';
const envKey = process.env.SUPABASE_ANON_KEY || '';

// 1. Generate config content
let configContent = '';
if (envUrl && envKey) {
  configContent = `/**
 * VERIFAI — Production Supabase Configuration
 * Injected automatically during Vercel build
 */
window.VERIFAI_CONFIG = {
  SUPABASE_URL: ${JSON.stringify(envUrl)},
  SUPABASE_ANON_KEY: ${JSON.stringify(envKey)}
};
`;
  console.log('[VERIFAI Build] Injected Supabase credentials from environment.');
} else if (fs.existsSync(path.join(rootDir, 'config.js'))) {
  configContent = fs.readFileSync(path.join(rootDir, 'config.js'), 'utf8');
  console.log('[VERIFAI Build] Used existing local config.js.');
} else {
  configContent = `/**
 * VERIFAI — Default Fallback Configuration
 */
window.VERIFAI_CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: ""
};
`;
  console.log('[VERIFAI Build] Generated fallback config.js.');
}

// 2. Write to root config.js
fs.writeFileSync(path.join(rootDir, 'config.js'), configContent, 'utf8');

// 3. Ensure 'public' directory exists and copy static files to it
// This guarantees Vercel succeeds whether outputDirectory is set to "." or "public"
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

console.log('[VERIFAI Build] Output prepared for both root and public directory.');
