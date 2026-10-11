import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStoredTheme, 
  setStoredTheme, 
  getStoredAccent, 
  setStoredAccent 
} from '../services/storage';

export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentPreset = 'teal' | 'blue' | 'violet' | 'green' | 'rose';

interface ThemeContextType {
  activeTheme: ThemeMode;
  activeAccent: AccentPreset;
  previewTheme: ThemeMode;
  previewAccent: AccentPreset;
  resolvedMode: 'light' | 'dark';
  isPreviewing: boolean;
  setPreviewTheme: (theme: ThemeMode) => void;
  setPreviewAccent: (accent: AccentPreset) => void;
  applyTheme: () => void;
  cancelPreview: () => void;
  setThemeDirect: (theme: ThemeMode) => void;
  setAccentDirect: (accent: AccentPreset) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>(getStoredTheme());
  const [activeAccent, setActiveAccent] = useState<AccentPreset>(getStoredAccent() as AccentPreset || 'teal');
  
  const [previewTheme, setPreviewTheme] = useState<ThemeMode>(activeTheme);
  const [previewAccent, setPreviewAccent] = useState<AccentPreset>(activeAccent);
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  // Compute resolved light/dark based on current display state (preview if previewing, otherwise active)
  const currentMode = isPreviewing ? previewTheme : activeTheme;
  const currentAccent = isPreviewing ? previewAccent : activeAccent;

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const resolvedMode: 'light' | 'dark' = 
    currentMode === 'system' ? (systemIsDark ? 'dark' : 'light') : currentMode;

  // Apply to DOM immediately whenever resolvedMode or currentAccent changes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (resolvedMode === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }

    body.setAttribute('data-accent', currentAccent);
    root.setAttribute('data-accent', currentAccent);
  }, [resolvedMode, currentAccent]);

  const handleSetPreviewTheme = (theme: ThemeMode) => {
    setPreviewTheme(theme);
    setIsPreviewing(true);
  };

  const handleSetPreviewAccent = (accent: AccentPreset) => {
    setPreviewAccent(accent);
    setIsPreviewing(true);
  };

  const applyTheme = () => {
    setActiveTheme(previewTheme);
    setActiveAccent(previewAccent);
    setStoredTheme(previewTheme);
    setStoredAccent(previewAccent);
    setIsPreviewing(false);
  };

  const cancelPreview = () => {
    setPreviewTheme(activeTheme);
    setPreviewAccent(activeAccent);
    setIsPreviewing(false);
  };

  const setThemeDirect = (theme: ThemeMode) => {
    setActiveTheme(theme);
    setPreviewTheme(theme);
    setStoredTheme(theme);
    setIsPreviewing(false);
  };

  const setAccentDirect = (accent: AccentPreset) => {
    setActiveAccent(accent);
    setPreviewAccent(accent);
    setStoredAccent(accent);
    setIsPreviewing(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        activeAccent,
        previewTheme,
        previewAccent,
        resolvedMode,
        isPreviewing,
        setPreviewTheme: handleSetPreviewTheme,
        setPreviewAccent: handleSetPreviewAccent,
        applyTheme,
        cancelPreview,
        setThemeDirect,
        setAccentDirect
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
