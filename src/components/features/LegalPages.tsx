import React, { useState } from 'react';
import { Shield, Lock, FileText, AlertTriangle, Sparkles } from 'lucide-react';
import { PitchSummary } from './PitchSummary';

export const LegalPages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'disclaimer' | 'pitch'>('privacy');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Governance & Compliance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy, Terms & Legal Disclaimer
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Last updated: October 2026 · Compliant with Digital Personal Data Protection (DPDP) Act of India.
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'privacy'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'terms'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'disclaimer'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Statutory Disclaimer
          </button>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'pitch'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>One-Page Pitch Summary</span>
          </button>
        </div>
      </div>

      {activeTab === 'pitch' ? (
        <PitchSummary />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xs text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-5">
          {activeTab === 'privacy' && (
            <>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                1. Privacy Architecture & Data Minimization
              </h2>
              <p>
                Verifai is engineered on strict data minimization principles. We do not harvest, monetize, or broker personal identity information. When you paste offer text or scan images:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>Temporary Volatile Processing:</strong> Uploaded images are processed strictly in volatile memory for OCR extraction and pattern recognition. Original raw image files are discarded immediately upon processing completion.</li>
                <li><strong>Zero Permanent Document Retention:</strong> We never maintain permanent storage buckets of user resumes, Aadhaar scans, or offer PDFs by default.</li>
                <li><strong>Client-Side Local Storage:</strong> Your verification history, quiz milestones, and theme preferences reside in your local browser storage (`localStorage`) and can be expunged at will using the "Clear Local Storage" button in Settings.</li>
                <li><strong>No Third-Party Advertising Trackers:</strong> Verifai carries zero behavioral surveillance pixels, commercial cookies, or advertising trackers.</li>
              </ul>

              <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                2. Redaction Advisory
              </h2>
              <p>
                Users are strictly instructed to redact sensitive statutory identifiers—such as 12-digit Aadhaar numbers, Permanent Account Numbers (PAN), bank account credentials, credit card CVVs, and login passwords—prior to submitting any screenshot or document.
              </p>
            </>
          )}

          {activeTab === 'terms' && (
            <>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                1. Permitted Educational & Verification Use
              </h2>
              <p>
                Verifai is granted for lawful personal and public interest verification by students, jobseekers, workers, and organizations. You agree not to misuse Verifai to execute automated denial-of-service tests, extract defamatory dossiers against innocent individuals, or reverse-engineer security filters.
              </p>

              <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                2. Community Reporting Norms
              </h2>
              <p>
                Community reports submitted to Verifai must be truthful records of fraudulent solicitations. Users submitting malicious, libelous, or fabricated claims against legitimate businesses will be subject to content removal and exclusion under Indian cyber laws.
              </p>
            </>
          )}

          {activeTab === 'disclaimer' && (
            <>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Notice of Non-Adjudication</span>
                </div>
                <p>
                  Verifai is an artificial intelligence and rule-based heuristic screening platform. A high risk score indicates the presence of recognized fraud signals; it does not constitute a judicial conviction. A low risk score indicates the absence of detected red flags; it does not replace independent diligence with official issuing authorities.
                </p>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">
                Statutory Disclaimer & Law Enforcement Prerogative
              </h2>
              <p>
                Verifai does not represent the Ministry of External Affairs, Ministry of Home Affairs, Reserve Bank of India, UGC, or any police department. If financial loss or identity theft occurs, victims must report directly to official statutory portals:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>National Cybercrime Helpline:</strong> Dial 1930</li>
                <li><strong>Online Police Portal:</strong> https://cybercrime.gov.in</li>
                <li><strong>Consumer Grievances:</strong> National Consumer Helpline 1915</li>
                <li><strong>Overseas Recruitment:</strong> https://emigrate.gov.in</li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};
