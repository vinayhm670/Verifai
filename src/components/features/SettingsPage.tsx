import React, { useState } from 'react';
import { 
  getStoredTheme, 
  setStoredTheme, 
  getStoredAccent, 
  setStoredAccent, 
  getStoredLanguage, 
  setStoredLanguage,
  clearHistory
} from '../../services/storage';
import { Language } from '../../i18n/translations';
import { Settings, Sun, Moon, Monitor, Palette, Globe, Trash2, Check, RefreshCw } from 'lucide-react';

interface SettingsPageProps {
  currentTheme: 'light' | 'dark' | 'system';
  onThemeChange: (t: 'light' | 'dark' | 'system') => void;
  currentAccent: string;
  onAccentChange: (a: string) => void;
  currentLang: Language;
  onLangChange: (l: Language) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  currentTheme,
  onThemeChange,
  currentAccent,
  onAccentChange,
  currentLang,
  onLangChange
}) => {
  const [accent, setAccent] = useState(currentAccent);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [selectedLang, setSelectedLang] = useState(currentLang);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const accents = [
    { id: 'teal', label: 'Primary Teal (#0F766E)', color: '#0F766E' },
    { id: 'blue', label: 'Classic Blue (#1D4ED8)', color: '#1D4ED8' },
    { id: 'violet', label: 'Deep Violet (#7C3AED)', color: '#7C3AED' },
    { id: 'green', label: 'Safe Green (#15803D)', color: '#15803D' },
    { id: 'rose', label: 'Rose Accent (#BE123C)', color: '#BE123C' },
  ];

  const handleApply = () => {
    onThemeChange(selectedTheme);
    onAccentChange(accent);
    onLangChange(selectedLang);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all verification logs from this browser?')) {
      clearHistory();
      alert('Local history cleared successfully.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Settings className="w-4 h-4" />
          <span>Application Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Appearance, Language & Privacy Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Customize themes, colors, language, and manage local storage preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme Mode Card */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-teal-600" />
            <span>Color Mode</span>
          </h2>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setSelectedTheme('light')}
              className={`p-3.5 rounded-lg border text-center transition-all flex flex-col items-center gap-2 ${
                selectedTheme === 'light'
                  ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-1 ring-teal-700'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Light Mode</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTheme('dark')}
              className={`p-3.5 rounded-lg border text-center transition-all flex flex-col items-center gap-2 ${
                selectedTheme === 'dark'
                  ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-1 ring-teal-700'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Moon className="w-5 h-5 text-teal-400" />
              <span>Dark Mode</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTheme('system')}
              className={`p-3.5 rounded-lg border text-center transition-all flex flex-col items-center gap-2 ${
                selectedTheme === 'system'
                  ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-1 ring-teal-700'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Monitor className="w-5 h-5 text-slate-400" />
              <span>System Default</span>
            </button>
          </div>
        </div>

        {/* Accent Color Card */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-teal-600" />
            <span>Accent Palette Presets</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            {accents.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => setAccent(acc.id)}
                className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                  accent === acc.id
                    ? 'border-slate-900 dark:border-white font-bold ring-2 ring-teal-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full shadow-xs"
                  style={{ backgroundColor: acc.color }}
                />
                <span className="text-[11px] text-slate-800 dark:text-slate-200 text-center">{acc.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection Card */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-600" />
            <span>Primary Language</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setSelectedLang('en')}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                selectedLang === 'en'
                  ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-900 dark:text-white">English (India)</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Default interface language</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedLang('hi')}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                selectedLang === 'hi'
                  ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-900 dark:text-white">हिन्दी (Hindi)</div>
              <p className="text-[11px] text-slate-500 mt-0.5">पूर्ण हिंदी इंटरफ़ेस और वॉयस</p>
            </button>

            <div className="p-3.5 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 text-left opacity-60">
              <div className="font-semibold text-slate-500">ಕನ್ನಡ (Kannada)</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Coming in next regional update</p>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local Storage</span>
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Saved & Applied!</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Apply Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
