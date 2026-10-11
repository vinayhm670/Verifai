import React, { useState } from 'react';
import { useTheme, ThemeMode, AccentPreset } from '../../context/ThemeContext';
import { Language } from '../../i18n/translations';
import { clearHistory } from '../../services/storage';
import { 
  Settings, 
  Sun, 
  Moon, 
  Monitor, 
  Palette, 
  Globe, 
  Trash2, 
  Check, 
  X, 
  RotateCcw,
  Sparkles,
  Eye,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';

interface SettingsPageProps {
  currentLang: Language;
  onLangChange: (l: Language) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  currentLang,
  onLangChange
}) => {
  const {
    activeTheme,
    activeAccent,
    previewTheme,
    previewAccent,
    resolvedMode,
    isPreviewing,
    setPreviewTheme,
    setPreviewAccent,
    applyTheme,
    cancelPreview
  } = useTheme();

  const [selectedLang, setSelectedLang] = useState<Language>(currentLang);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const accents: { id: AccentPreset; label: string; color: string }[] = [
    { id: 'teal', label: 'Primary Teal (#0F766E)', color: '#0F766E' },
    { id: 'blue', label: 'Classic Blue (#1D4ED8)', color: '#1D4ED8' },
    { id: 'violet', label: 'Deep Violet (#7C3AED)', color: '#7C3AED' },
    { id: 'green', label: 'Neural Green (#22C55E)', color: '#22C55E' },
    { id: 'rose', label: 'Rose Accent (#BE123C)', color: '#BE123C' },
  ];

  const handleApply = () => {
    applyTheme();
    onLangChange(selectedLang);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 2500);
  };

  const handleCancel = () => {
    cancelPreview();
    setSelectedLang(currentLang);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all verification logs and cached checks from this browser?')) {
      clearHistory();
      alert('Local storage history has been wiped.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Settings className="w-4 h-4" />
          <span>Centralized Appearance & System Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Website Theme, Palette & Privacy Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Fully synchronized design system tokens with real-time live preview, instant commit, and rollback.
        </p>
      </div>

      {/* Floating / Sticky Live Preview Status Banner when previewing */}
      {isPreviewing && (
        <div className="mb-6 p-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 flex flex-wrap items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Eye className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>
              Live Preview Active: {previewTheme.toUpperCase()} mode with {previewAccent.toUpperCase()} accent.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5 text-rose-500" />
              <span>Cancel Preview</span>
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-teal-800 hover:bg-teal-900 text-white shadow-xs transition-colors flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Apply to Website</span>
            </button>
          </div>
        </div>
      )}

      {appliedNotice && (
        <div className="mb-6 p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Theme and language preferences applied and saved locally!</span>
        </div>
      )}

      <div className="space-y-6">
        {/* 1. Live Interactive Preview Component */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-600" />
              <span>Interactive Component Preview</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">
              Active Mode: {resolvedMode.toUpperCase()}
            </span>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Sample Verification Card</div>
                <div className="text-xs text-slate-500">Heuristic Risk Index preview with active theme tokens</div>
              </div>
              <button className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-teal-800 hover:bg-teal-900 text-white shadow-xs transition-colors">
                Primary CTA Button
              </button>
            </div>

            {/* Semantic Risk Badges (Must remain semantically consistent) */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Genuine (0-29)</span>
              </span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Caution (30-69)</span>
              </span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="flex items-center gap-1 text-rose-700 dark:text-rose-400 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>High Risk (70-100)</span>
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value="Sample URL or offer letter input field"
                className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* 2. Color Mode Selector */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-teal-600" />
              <span>Color Mode (Light / Dark / System)</span>
            </h2>
            <span className="text-xs text-slate-500">
              Current Applied: <strong>{activeTheme}</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setPreviewTheme('light')}
              className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2.5 ${
                previewTheme === 'light'
                  ? 'border-teal-700 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-2 ring-teal-600 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <span>Light Mode</span>
              {activeTheme === 'light' && (
                <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">[Applied]</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setPreviewTheme('dark')}
              className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2.5 ${
                previewTheme === 'dark'
                  ? 'border-teal-700 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-2 ring-teal-600 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
              }`}
            >
              <Moon className="w-5 h-5 text-teal-400" />
              <span>Dark Mode (#07130F)</span>
              {activeTheme === 'dark' && (
                <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">[Applied]</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setPreviewTheme('system')}
              className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2.5 ${
                previewTheme === 'system'
                  ? 'border-teal-700 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-2 ring-teal-600 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
              }`}
            >
              <Monitor className="w-5 h-5 text-slate-400" />
              <span>System Default</span>
              {activeTheme === 'system' && (
                <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">[Applied]</span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Accent Palette Presets */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-teal-600" />
              <span>Accent Presets</span>
            </h2>
            <span className="text-xs text-slate-500">
              Current Applied: <strong>{activeAccent}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            {accents.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => setPreviewAccent(acc.id)}
                className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  previewAccent === acc.id
                    ? 'border-slate-900 dark:border-white font-bold ring-2 ring-teal-500 shadow-xs bg-slate-50 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full shadow-xs"
                  style={{ backgroundColor: acc.color }}
                />
                <span className="text-xs text-slate-800 dark:text-slate-200 text-center font-medium">
                  {acc.label.split(' ')[0]}
                </span>
                {activeAccent === acc.id && (
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">[Applied]</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Language Selection */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-600" />
            <span>Primary Language</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setSelectedLang('en')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedLang === 'en'
                  ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-1 ring-teal-600'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-900 dark:text-white">English (India)</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Primary interface & verification reports</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedLang('hi')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedLang === 'hi'
                  ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-bold ring-1 ring-teal-600'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-900 dark:text-white">हिन्दी (Hindi)</div>
              <p className="text-[11px] text-slate-500 mt-0.5">सम्पूर्ण हिंदी इंटरफ़ेस और वॉयस नरेशन</p>
            </button>

            <div className="p-3.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-left opacity-60">
              <div className="font-semibold text-slate-500">ಕನ್ನಡ (Kannada)</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Architecture ready for regional release</p>
            </div>
          </div>
        </div>

        {/* 5. Master Actions: Apply / Cancel / Clear Storage */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local Storage History</span>
          </button>

          <div className="flex items-center gap-2">
            {isPreviewing && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel Preview
              </button>
            )}

            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Apply & Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
