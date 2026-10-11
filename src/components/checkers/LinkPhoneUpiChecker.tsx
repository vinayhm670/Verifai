import React, { useState } from 'react';
import { runHeuristicAnalysis } from '../../services/analyzer';
import { saveToHistory, getCommunityReports } from '../../services/storage';
import { SAMPLE_CASES } from '../../services/sampleData';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';
import { AnalysisResult } from '../../types';
import { Link2, Phone, CreditCard, ShieldAlert, Sparkles, RotateCcw, AlertTriangle } from 'lucide-react';

interface LinkPhoneUpiCheckerProps {
  onOpenAssistant: (context: string) => void;
}

export const LinkPhoneUpiChecker: React.FC<LinkPhoneUpiCheckerProps> = ({ onOpenAssistant }) => {
  const [inputType, setInputType] = useState<'url' | 'upi' | 'phone'>('url');
  const [value, setValue] = useState('');
  const [contextMessage, setContextMessage] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedCommunityReport, setMatchedCommunityReport] = useState<any | null>(null);

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!value.trim()) return;

    setIsAnalyzing(true);
    setMatchedCommunityReport(null);

    setTimeout(() => {
      // 1. Cross-reference community scam reports
      const reports = getCommunityReports();
      const matched = reports.find(r => 
        r.identifier.toLowerCase().includes(value.trim().toLowerCase()) ||
        value.trim().toLowerCase().includes(r.identifier.toLowerCase())
      );
      if (matched) {
        setMatchedCommunityReport(matched);
      }

      // 2. Synthesize content for analyzer
      const fullContent = `${inputType.toUpperCase()}: ${value.trim()}. Accompanying message context: ${contextMessage}`;
      const res = runHeuristicAnalysis({
        checkerId: 'link-phone-upi',
        content: fullContent,
        contactOrLink: value.trim()
      });

      if (matched) {
        res.riskScore = Math.max(res.riskScore, 85);
        res.riskLevel = 'high';
        res.verdictLabel = 'Likely fake or high risk — reported in community database';
        res.observedEvidence.unshift({
          id: 'ev-comm-match',
          type: 'danger',
          title: 'Direct Match in Community Scam Reports',
          description: `This ${inputType} matches an active scam report for "${matched.entityName}" with reported loss ${matched.lossAmount || 'unspecified'}.`,
          sourceType: 'reputation_signal'
        });
      }

      setResult(res);
      saveToHistory(res);
      setIsAnalyzing(false);
    }, 400);
  };

  const loadSample = (idx: number) => {
    const s = SAMPLE_CASES['link-phone-upi'][idx];
    if (idx === 0) {
      setInputType('url');
      setValue('bit.ly/power-bill-update');
      setContextMessage(s.content);
    } else {
      setInputType('phone');
      setValue('VM-SBINB');
      setContextMessage(s.content);
    }

    const res = runHeuristicAnalysis({
      checkerId: 'link-phone-upi',
      content: s.content,
      contactOrLink: s.contactOrLink
    });
    res.isDemoSample = true;
    setResult(res);
    saveToHistory(res);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Link2 className="w-4 h-4" />
          <span>Digital Infrastructure Inspector</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Link, Phone Number & UPI ID Checker
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Inspect phishing URLs, shortened domains, fraudulent UPI payment handles, and scammer phone numbers against known patterns and community flags.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Try Sample Case:</span>
          <button
            onClick={() => loadSample(0)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
          >
            Sample 1: Electricity Bill Disconnection URL
          </button>
          <button
            onClick={() => loadSample(1)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
          >
            Sample 2: Legitimate Bank Shortcode Alert
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        {/* Type Selector (Interactive Segmented Control) */}
        <div>
          <label className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
            Select Identifier Type
          </label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => { setInputType('url'); setValue(''); }}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                inputType === 'url' ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Website URL / Link</span>
            </button>
            <button
              type="button"
              onClick={() => { setInputType('upi'); setValue(''); }}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                inputType === 'upi' ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>UPI ID (VPA)</span>
            </button>
            <button
              type="button"
              onClick={() => { setInputType('phone'); setValue(''); }}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                inputType === 'phone' ? 'bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-400 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone / Sender ID</span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
            {inputType === 'url' && 'Enter Suspicious Link or Domain'}
            {inputType === 'upi' && 'Enter UPI Virtual Payment Address (VPA)'}
            {inputType === 'phone' && 'Enter Phone Number or SMS Header'} <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            placeholder={
              inputType === 'url' ? 'e.g. bit.ly/power-bill or http://sbi-kyc-update.top' :
              inputType === 'upi' ? 'e.g. examfees82@okhdfc or refundsupport@ybl' :
              'e.g. +91 98765 43210 or BZ-SBINB'
            }
            className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-700"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Context Message (Where did you receive this link or payment request?)
          </label>
          <textarea
            value={contextMessage}
            onChange={(e) => setContextMessage(e.target.value)}
            rows={3}
            placeholder="Paste the SMS, WhatsApp forward, or email text that contained this link or UPI ID..."
            className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
          />
        </div>

        {/* UPI Security Reminder */}
        {inputType === 'upi' && (
          <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <p>
              <strong>UPI Security Principle:</strong> You <em>never</em> enter your UPI PIN to receive money, receive refunds, or claim cashback. Entering your UPI PIN always authorizes money to leave your account.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => { setValue(''); setContextMessage(''); setResult(null); setMatchedCommunityReport(null); }}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            disabled={isAnalyzing || !value.trim()}
            className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAnalyzing ? 'Inspecting Infrastructure...' : `Verify ${inputType.toUpperCase()}`}</span>
          </button>
        </div>
      </form>

      {/* Community Report Alert Callout */}
      {matchedCommunityReport && (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-900 dark:text-rose-200">
          <div className="flex items-center gap-2 font-bold mb-1">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Corroborated Community Warning</span>
          </div>
          <p>
            This identifier was reported by community members: <strong>{matchedCommunityReport.description}</strong> (Reported loss: {matchedCommunityReport.lossAmount || 'Unknown'}, {matchedCommunityReport.reportedDate}).
          </p>
        </div>
      )}

      {result && (
        <UniversalVerdictCard
          result={result}
          onOpenAssistantWithContext={onOpenAssistant}
        />
      )}
    </div>
  );
};
