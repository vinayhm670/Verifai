const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.js');

const envUrl = process.env.SUPABASE_URL || '';
const envKey = process.env.SUPABASE_ANON_KEY || '';

if (envUrl && envKey) {
  const content = `/**
 * VERIFAI — Production Supabase Configuration
 * Injected automatically during Vercel build
 */
window.VERIFAI_CONFIG = {
  SUPABASE_URL: ${JSON.stringify(envUrl)},
  SUPABASE_ANON_KEY: ${JSON.stringify(envKey)}
};
`;
  fs.writeFileSync(configPath, content, 'utf8');
  console.log('[VERIFAI Build] Successfully generated config.js from Vercel environment variables.');
} else if (!fs.existsSync(configPath)) {
  const fallback = `/**
 * VERIFAI — Default Fallback Configuration
 */
window.VERIFAI_CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: ""
};
`;
  fs.writeFileSync(configPath, fallback, 'utf8');
  console.log('[VERIFAI Build] Created fallback config.js (local mode active).');
} else {
  console.log('[VERIFAI Build] Retained existing local config.js.');
}
