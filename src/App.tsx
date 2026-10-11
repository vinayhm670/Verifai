import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ShieldBackground } from './components/three/ShieldBackground';
import { HomePage } from './components/features/HomePage';
import { JobOfferChecker } from './components/checkers/JobOfferChecker';
import { InternshipChecker } from './components/checkers/InternshipChecker';
import { CertificateScanner } from './components/checkers/CertificateScanner';
import { CoachingChecker } from './components/checkers/CoachingChecker';
import { OverseasChecker } from './components/checkers/OverseasChecker';
import { ExamScholarshipChecker } from './components/checkers/ExamScholarshipChecker';
import { LinkPhoneUpiChecker } from './components/checkers/LinkPhoneUpiChecker';
import { PhotoScanChecker } from './components/checkers/PhotoScanChecker';
import { SkillPassport } from './components/features/SkillPassport';
import { CommunityReports } from './components/features/CommunityReports';
import { ScamQuiz } from './components/features/ScamQuiz';
import { ParentMode } from './components/features/ParentMode';
import { CheckHistory } from './components/features/CheckHistory';
import { HelpAndReport } from './components/features/HelpAndReport';
import { UserDashboard } from './components/features/UserDashboard';
import { SettingsPage } from './components/features/SettingsPage';
import { LegalPages } from './components/features/LegalPages';
import { AuthModal } from './components/features/AuthModal';
import { AIAssistantModal } from './components/features/AIAssistantModal';
import { 
  getStoredTheme, 
  setStoredTheme, 
  getStoredAccent, 
  setStoredAccent, 
  getStoredLanguage, 
  setStoredLanguage,
  getSession
} from './services/storage';
import { Language } from './i18n/translations';
import { UserSession } from './types';
import { Bot, Shield, WifiOff } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<Language>(getStoredLanguage());
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(getStoredTheme());
  const [accent, setAccent] = useState<string>(getStoredAccent());
  const [session, setSession] = useState<UserSession>(getSession());

  // Modals & Drawers
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [assistantContext, setAssistantContext] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Apply Theme and Accent attributes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    body.setAttribute('data-accent', accent);
  }, [theme, accent]);

  // Online / Offline tracking
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'en' ? 'hi' : 'en';
    setLang(nextLang);
    setStoredLanguage(nextLang);
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  const handleAccentChange = (newAccent: string) => {
    setAccent(newAccent);
    setStoredAccent(newAccent);
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setStoredLanguage(newLang);
  };

  const handleOpenAssistant = (context: string = '') => {
    setAssistantContext(context);
    setAiAssistantOpen(true);
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'auth') {
      setAuthModalOpen(true);
      return;
    }
    if (tab === 'ai-assistant') {
      handleOpenAssistant();
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors relative selection:bg-teal-600 selection:text-white">
      {/* Interactive 3D Background */}
      <ShieldBackground />

      {/* Offline Toast */}
      {!isOnline && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-xs font-semibold shadow-lg">
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Offline Mode — Cached Verifai algorithms are active</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        session={session}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Main Page Routing Switch */}
      <main className="flex-1 pb-16 lg:pb-0">
        {currentTab === 'home' && (
          <HomePage onNavigate={handleNavigate} lang={lang} />
        )}

        {/* Checkers */}
        {currentTab === 'checker-job' && (
          <JobOfferChecker onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'checker-internship' && (
          <InternshipChecker onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'checker-certificate' && (
          <CertificateScanner onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'checker-coaching' && (
          <CoachingChecker onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'checker-overseas' && (
          <OverseasChecker onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'checker-exam' && (
          <ExamScholarshipChecker onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'checker-link-phone-upi' && (
          <LinkPhoneUpiChecker onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'checker-photo-scan' && (
          <PhotoScanChecker onOpenAssistant={handleOpenAssistant} />
        )}

        {/* Checkers Index Page */}
        {currentTab === 'checkers' && (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                All Fraud Verification Checkers
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Select the inspector best aligned with your message, document, or payment request.
              </p>
            </div>
            <HomePage onNavigate={handleNavigate} lang={lang} />
          </div>
        )}

        {/* Platform Features */}
        {currentTab === 'skill-passport' && (
          <SkillPassport />
        )}
        {currentTab === 'community-reports' && (
          <CommunityReports />
        )}
        {currentTab === 'quiz' && (
          <ScamQuiz lang={lang} />
        )}
        {currentTab === 'parent-mode' && (
          <ParentMode onOpenAssistant={handleOpenAssistant} />
        )}
        {currentTab === 'history' && (
          <CheckHistory />
        )}
        {currentTab === 'help-and-report' && (
          <HelpAndReport />
        )}
        {currentTab === 'dashboard' && (
          <UserDashboard session={session} onNavigate={handleNavigate} />
        )}
        {currentTab === 'settings' && (
          <SettingsPage
            currentTheme={theme}
            onThemeChange={handleThemeChange}
            currentAccent={accent}
            onAccentChange={handleAccentChange}
            currentLang={lang}
            onLangChange={handleLangChange}
          />
        )}
        {currentTab === 'legal' && (
          <LegalPages />
        )}
      </main>

      {/* Floating AI Assistant Trigger (Bottom right, accessible, non-obtrusive) */}
      <button
        onClick={() => handleOpenAssistant()}
        className="fixed bottom-20 lg:bottom-6 right-6 z-40 p-3.5 rounded-full bg-teal-800 text-white shadow-xl hover:bg-teal-900 hover:scale-105 transition-all flex items-center justify-center group"
        title="Open Verifai AI Assistant"
      >
        <Bot className="w-5 h-5 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Ask AI Copilot
        </span>
      </button>

      {/* Mobile Drawer & Bottom Quick Nav */}
      <MobileNav
        currentTab={currentTab}
        onNavigate={handleNavigate}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        lang={lang}
      />

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        session={session}
        onUpdateSession={setSession}
      />

      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        contextText={assistantContext}
      />

      {/* Quiet Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
