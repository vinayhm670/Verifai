import React from 'react';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { Sun, Moon, Globe, Shield, User, Menu, X } from 'lucide-react';
import { Language } from '../../i18n/translations';
import { UserSession } from '../../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tabId: string) => void;
  lang: Language;
  onToggleLang: () => void;
  theme: 'light' | 'dark' | 'system';
  onToggleTheme: () => void;
  session: UserSession;
  onOpenAuth: () => void;
  onOpenMobileMenu: () => void;
  mobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  session,
  onOpenAuth,
  onOpenMobileMenu,
  mobileMenuOpen
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left text-slate-900 dark:text-white whitespace-nowrap shrink-0 group focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-800 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-900 transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-teal-900 dark:text-teal-400">
            Verifai
          </span>
        </button>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap shrink-0 hover:text-teal-800 dark:hover:text-teal-400 transition-colors py-1 ${
              currentTab === 'home' ? 'text-teal-800 dark:text-teal-400 font-semibold border-b-2 border-teal-800 dark:border-teal-400' : ''
            }`}
          >
            {lang === 'hi' ? 'होम' : 'Home'}
          </button>
          <button
            onClick={() => onNavigate('checkers')}
            className={`whitespace-nowrap shrink-0 hover:text-teal-800 dark:hover:text-teal-400 transition-colors py-1 ${
              currentTab.startsWith('checker') || currentTab === 'checkers' ? 'text-teal-800 dark:text-teal-400 font-semibold border-b-2 border-teal-800 dark:border-teal-400' : ''
            }`}
          >
            {lang === 'hi' ? 'सभी चेकर्स' : 'Fraud Checkers'}
          </button>
          <button
            onClick={() => onNavigate('skill-passport')}
            className={`whitespace-nowrap shrink-0 hover:text-teal-800 dark:hover:text-teal-400 transition-colors py-1 ${
              currentTab === 'skill-passport' ? 'text-teal-800 dark:text-teal-400 font-semibold border-b-2 border-teal-800 dark:border-teal-400' : ''
            }`}
          >
            {lang === 'hi' ? 'स्किल पासपोर्ट' : 'Skill Passport'}
          </button>
          <button
            onClick={() => onNavigate('community-reports')}
            className={`whitespace-nowrap shrink-0 hover:text-teal-800 dark:hover:text-teal-400 transition-colors py-1 ${
              currentTab === 'community-reports' ? 'text-teal-800 dark:text-teal-400 font-semibold border-b-2 border-teal-800 dark:border-teal-400' : ''
            }`}
          >
            {lang === 'hi' ? 'रिपोर्ट्स' : 'Community Reports'}
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className={`whitespace-nowrap shrink-0 hover:text-teal-800 dark:hover:text-teal-400 transition-colors py-1 ${
              currentTab === 'quiz' ? 'text-teal-800 dark:text-teal-400 font-semibold border-b-2 border-teal-800 dark:border-teal-400' : ''
            }`}
          >
            {lang === 'hi' ? 'क्विज़' : 'Awareness Quiz'}
          </button>
          <button
            onClick={() => onNavigate('parent-mode')}
            className={`whitespace-nowrap shrink-0 hover:text-teal-800 dark:hover:text-teal-400 transition-colors py-1 ${
              currentTab === 'parent-mode' ? 'text-teal-800 dark:text-teal-400 font-semibold border-b-2 border-teal-800 dark:border-teal-400' : ''
            }`}
          >
            {lang === 'hi' ? 'पेरेंट मोड' : 'Parent Mode'}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle English / Hindi"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Account Button */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span className="truncate max-w-[100px]">{session.isLoggedIn ? (session.fullName || 'Account') : 'Sign In'}</span>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => onNavigate('checker-job')}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'hi' ? 'अभी जांचें' : 'Check Offer'}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
