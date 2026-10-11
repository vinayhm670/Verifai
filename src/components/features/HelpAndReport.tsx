import React from 'react';
import { PhoneCall, ShieldAlert, FileText, CheckCircle2, AlertTriangle, ExternalLink, Download } from 'lucide-react';

export const HelpAndReport: React.FC = () => {
  const steps = [
    {
      title: "Step 1: The 'Golden Hour' Action (First 24 Hours)",
      desc: "Call 1930 immediately if money was debited from your bank account or UPI. The police cyber team coordinates with RBI and payment gateways to freeze the recipient bank accounts before funds are withdrawn at ATMs."
    },
    {
      title: "Step 2: Preserve Digital Evidence",
      desc: "Do not delete WhatsApp chats or SMS messages. Take full screenshots showing timestamps, sender phone numbers, UPI transaction reference (UTR) IDs, bank debit SMS, and URL links."
    },
    {
      title: "Step 3: Register Official Online Complaint",
      desc: "Visit the National Cyber Crime Reporting Portal at cybercrime.gov.in. Select 'Report Cyber Crime' -> 'Financial Fraud'. Enter your victim details and attach your preserved screenshot proofs."
    },
    {
      title: "Step 4: Inform Your Bank Branch",
      desc: "Submit a written dispute form (chargeback form) to your home branch within 3 days. Under RBI circular on customer liability, reporting within 3 days limits unauthorized electronic transaction liability to zero."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <PhoneCall className="w-4 h-4 text-rose-600" />
          <span>Statutory Emergency & Redressal Protocols</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Help & Incident Reporting (Helpline 1930)
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Step-by-step guidance on recovering funds, preserving digital evidence, and lodging official complaints with the Government of India.
        </p>
      </div>

      {/* Emergency Helpline Box */}
      <div className="mb-8 p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-lg">
            <PhoneCall className="w-6 h-6 text-rose-600 animate-pulse" />
            <span>National Cyber Crime Helpline: Dial 1930</span>
          </div>
          <p className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed max-w-xl">
            Toll-free national emergency number operated by the Ministry of Home Affairs (I4C). Available 24/7 in all Indian states to report financial cyber fraud and intercept debit transactions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          <a
            href="tel:1930"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-center text-white bg-rose-700 hover:bg-rose-800 rounded-xl shadow-xs transition-colors"
          >
            Call 1930 Now
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-center border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Action Steps */}
      <div className="mb-8 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          What to Do If You Lost Money (Emergency Recovery Checklist)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2 text-xs"
            >
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {st.title}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Preservation Checklist */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-700" />
          <span>Evidence Checklist Required by Police / Cybercrime Portal</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Bank account statement showing exact debit amount and 12-digit UTR number</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Uncropped screenshot of the chat showing recruiter / sender mobile number</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Original offer letter, PDF, or email headers (.eml file if available)</span>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>UPI QR code or Virtual Payment Address (VPA) of the recipient</span>
          </div>
        </div>
      </div>
    </div>
  );
};
