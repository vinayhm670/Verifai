import React from 'react';
import { Shield, PhoneCall, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Urgent Helpline Banner */}
        <div className="mb-10 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Emergency National Cyber Fraud Helpline: 1930</div>
              <div className="text-xs text-slate-400">If money was debited fraudulently within the last 24 hours, call 1930 immediately to freeze bank accounts.</div>
            </div>
          </div>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Visit cybercrime.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-white">Verifai</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Verify Before You Trust. India's AI-assisted scam defense platform for students, jobseekers, parents, and workers.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Empowering digital safety across India.
            </div>
          </div>

          {/* Col 2: Checkers */}
          <div className="space-y-2.5">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">Primary Checkers</div>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('checker-job')} className="hover:text-white transition-colors">Job Offer Checker</button></li>
              <li><button onClick={() => onNavigate('checker-internship')} className="hover:text-white transition-colors">Internship Scam Checker</button></li>
              <li><button onClick={() => onNavigate('checker-certificate')} className="hover:text-white transition-colors">Certificate Scanner</button></li>
              <li><button onClick={() => onNavigate('checker-coaching')} className="hover:text-white transition-colors">Coaching & Ed-tech Claims</button></li>
              <li><button onClick={() => onNavigate('checker-overseas')} className="hover:text-white transition-colors">Overseas Job & Agent Checker</button></li>
              <li><button onClick={() => onNavigate('checker-link-phone-upi')} className="hover:text-white transition-colors">Link, Phone & UPI Checker</button></li>
            </ul>
          </div>

          {/* Col 3: Modules & Community */}
          <div className="space-y-2.5">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">Platform Features</div>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onNavigate('skill-passport')} className="hover:text-white transition-colors">Worker Skill Passport</button></li>
              <li><button onClick={() => onNavigate('community-reports')} className="hover:text-white transition-colors">Community Scam Reports</button></li>
              <li><button onClick={() => onNavigate('quiz')} className="hover:text-white transition-colors">Scam Awareness Quiz</button></li>
              <li><button onClick={() => onNavigate('parent-mode')} className="hover:text-white transition-colors">Parent Safety Mode</button></li>
              <li><button onClick={() => onNavigate('help-and-report')} className="hover:text-white transition-colors">How to Report (1930 Guide)</button></li>
              <li><button onClick={() => onNavigate('history')} className="hover:text-white transition-colors">Check History</button></li>
            </ul>
          </div>

          {/* Col 4: Verified Indian Portals */}
          <div className="space-y-2.5">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">Official Portals</div>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">National Cybercrime Portal <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://emigrate.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">eMigrate MEA Portal <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">National Consumer Helpline 1915 <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://sachet.rbi.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">RBI Sachet Fraud Portal <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.digilocker.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">DigiLocker / NAD <ExternalLink className="w-2.5 h-2.5" /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal & Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Verifai. All rights reserved. Heuristic assessment tool.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300">Privacy Policy</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300">Terms of Service</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300">Disclaimer</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('pitch-summary')} className="hover:text-teal-400 font-semibold">Pitch Summary</button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('settings')} className="hover:text-slate-300">Settings</button>
          </div>
        </div>

        <div className="mt-4 text-[11px] text-slate-500 leading-relaxed text-center md:text-left">
          Important Legal Disclaimer: Verifai is an independent heuristic evaluation system. Scores and flags are algorithmic indicators designed to prompt official verification. Verifai cannot legally certify organizations or individuals.
        </div>
      </div>
    </footer>
  );
};
