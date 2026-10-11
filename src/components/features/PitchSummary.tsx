import React from 'react';
import { 
  ShieldCheck, 
  Printer, 
  Download, 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  DollarSign, 
  Milestone, 
  Lock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PitchSummaryProps {
  onNavigate?: (tab: string) => void;
}

export const PitchSummary: React.FC<PitchSummaryProps> = ({ onNavigate }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header with Print / Download button */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Executive Document · Section 31</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Verifai — One-Page Pitch Summary
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Verify Before You Trust · India's AI-Powered Citizen Trust & Scam Detection Platform
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-teal-800 hover:bg-teal-900 text-white shadow-xs transition-colors shrink-0 no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Save as PDF / Print</span>
        </button>
      </div>

      {/* Main Pitch Card Container formatted like an executive brief */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md p-6 sm:p-8 space-y-8 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
        
        {/* Brand Banner */}
        <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold text-lg">
              V
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                Verifai
              </div>
              <div className="text-xs font-medium text-teal-800 dark:text-teal-300">
                Tagline: "Verify Before You Trust"
              </div>
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span>Target Market: India (1.4B Citizens)</span>
            <br />
            <span className="font-mono text-emerald-600 dark:text-emerald-400">Status: Functional Full-Stack Production</span>
          </div>
        </div>

        {/* 1. Problem */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
            <Target className="w-4 h-4" />
            <h3>1. The Problem</h3>
          </div>
          <p>
            Millions of students, job seekers, fresh graduates, parents, and blue-collar workers in India face pervasive cyber fraud every day:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block">Fake Job & Internship Offers:</span>
              Bogus appointment letters requiring upfront "laptop deposits", ₹2,499 certificate charges, or Telegram task scams.
            </li>
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block">Admissions & Paper Leaks:</span>
              Telegram channels peddling counterfeit question papers, backdoor seats, and fraudulent scholarship portals.
            </li>
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block">Overseas Exploitation:</span>
              Unlicensed recruiting agents demanding lakhs, promising jobs on tourist visas, and withholding passports.
            </li>
            <li className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-semibold text-slate-900 dark:text-white block">Financial UPI & APK Traps:</span>
              Reverse UPI PIN debit scams, malicious APKs ("electricity disconnection" alerts), and unverified coaching claims.
            </li>
          </ul>
        </div>

        {/* 2. Target Users */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 font-bold text-sm">
            <Users className="w-4 h-4" />
            <h3>2. Target Users</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white">Students & Grads</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Campus placements & internships</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white">Parents & Elders</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Family protection & voice mode</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white">Skilled Workers</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Blue-collar Skill Passport & safety</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white">Overseas Seekers</div>
              <div className="text-[10px] text-slate-500 mt-0.5">MEA eMigrate license checking</div>
            </div>
          </div>
        </div>

        {/* 3. The Solution */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 font-bold text-sm">
            <Lightbulb className="w-4 h-4" />
            <h3>3. The Verifai Solution</h3>
          </div>
          <p>
            Verifai unifies multi-layer heuristic rules and Google Gemini AI into an accessible, bilingual citizen shield:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
              <span className="font-bold text-teal-950 dark:text-teal-200 block mb-1">8 Specialized Checkers</span>
              Custom inspectors for Jobs, Internships, Certificates, Coaching, Overseas Work, Exams, Links/UPI, and Photo Scan.
            </div>
            <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
              <span className="font-bold text-teal-950 dark:text-teal-200 block mb-1">Actionable Redressal</span>
              Every check generates safe HR inquiries and instant formal 1930 / cybercrime.gov.in complaint drafts with 1-click copy.
            </div>
            <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
              <span className="font-bold text-teal-950 dark:text-teal-200 block mb-1">Interactive 3D Nerve System</span>
              Real-time WebGL biological nerve background reacting to mouse, touch, and scrolling to communicate vigilance.
            </div>
          </div>
        </div>

        {/* 4. Impact */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <h3>4. Projected Societal Impact</h3>
          </div>
          <p>
            By democratizing cybersecurity forensics with zero login barriers, Verifai equips vulnerable youth and senior citizens to identify red flags before transacting. It empowers blue-collar technicians via the Skill Passport to showcase verified credentials, protecting them from predatory middlemen.
          </p>
        </div>

        {/* 5. Business & Sustainability Model */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 font-bold text-sm">
            <DollarSign className="w-4 h-4" />
            <h3>5. Transparent Business Model</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white">Free Forever Citizen Tier</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Basic checks, 1930 drafts, and community alerts remain 100% free for all Indian citizens.</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white">Enterprise & Campus API</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Bulk batch verification APIs for university placement cells and hiring platforms.</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white">Trainer Skill Audits</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Authorized vocational training centers license the Skill Passport credentialing engine.</div>
            </div>
          </div>
        </div>

        {/* 6. Privacy-First Architecture & Roadmap */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Milestone className="w-4 h-4 text-teal-700" />
            <h3>6. Privacy Guarantee & Future Roadmap</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Permanent Retention</span>
              </div>
              <p>Complies with India's DPDP Act. Uploaded images processed in volatile RAM and discarded immediately. No ad trackers or personal dossiers.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Upcoming Milestones</span>
              </div>
              <p>Expanding regional language packs (Kannada, Tamil, Telugu), direct integration with authorized DigiLocker and MEA eMigrate APIs.</p>
            </div>
          </div>
        </div>

        {/* Back navigation button */}
        {onNavigate && (
          <div className="pt-4 flex items-center justify-between no-print">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 dark:text-teal-400 hover:underline"
            >
              <span>Return to Home</span>
            </button>
            <button
              onClick={() => onNavigate('checkers')}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-lg bg-teal-800 text-white hover:bg-teal-900"
            >
              <span>Explore All 8 Checkers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
