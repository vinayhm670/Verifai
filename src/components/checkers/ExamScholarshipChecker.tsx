import React, { useState } from 'react';
import { runHeuristicAnalysis } from '../../services/analyzer';
import { saveToHistory } from '../../services/storage';
import { SAMPLE_CASES } from '../../services/sampleData';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';
import { VoiceInputButton } from '../common/VoiceControls';
import { AnalysisResult } from '../../types';
import { Landmark, Sparkles, RotateCcw } from 'lucide-react';

interface ExamScholarshipCheckerProps {
  onOpenAssistant: (context: string) => void;
}

export const ExamScholarshipChecker: React.FC<ExamScholarshipCheckerProps> = ({ onOpenAssistant }) => {
  const [content, setContent] = useState('');
  const [examOrUniv, setExamOrUniv] = useState('');
  const [portalUrl, setPortalUrl] = useState('');
  const [feeAsked, setFeeAsked] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const fullText = `${content} Portal: ${portalUrl} Fee: ${feeAsked}`;
      const res = runHeuristicAnalysis({
        checkerId: 'exam',
        content: fullText,
        companyOrIssuer: examOrUniv,
        contactOrLink: portalUrl
      });
      setResult(res);
      saveToHistory(res);
      setIsAnalyzing(false);
    }, 400);
  };

  const loadSample = (idx: number) => {
    const s = SAMPLE_CASES.exam[idx];
    setContent(s.content);
    setExamOrUniv(s.companyOrIssuer);
    setPortalUrl(s.contactOrLink);
    const res = runHeuristicAnalysis({
      checkerId: 'exam',
      content: s.content,
      companyOrIssuer: s.companyOrIssuer,
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
          <Landmark className="w-4 h-4" />
          <span>Academic Integrity & Admissions Protection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Exam, Scholarship & Admission Fraud Checker
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Verify question paper leak offers, back-door quota admissions, scholarship processing fees, and spoofed `.org` university portals.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Try Sample Scenario:</span>
          <button
            onClick={() => loadSample(0)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
          >
            Sample 1: Telegram Paper Leak & UPI Extortion
          </button>
          <button
            onClick={() => loadSample(1)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
          >
            Sample 2: Official NTA Public Notice Advisory
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-900 dark:text-white">
              Scholarship Message, Paper Leak Claim, or Admission Offer <span className="text-rose-500">*</span>
            </label>
            <VoiceInputButton onTranscript={(txt) => setContent(prev => prev + ' ' + txt)} />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            placeholder="Paste text offering guaranteed pass marks, scholarship approval fees, management quota seats, or exam question papers..."
            className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Examination / University Name
            </label>
            <input
              type="text"
              value={examOrUniv}
              onChange={(e) => setExamOrUniv(e.target.value)}
              placeholder="e.g. NEET, JEE, SSC, State University"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Portal Website URL
            </label>
            <input
              type="text"
              value={portalUrl}
              onChange={(e) => setPortalUrl(e.target.value)}
              placeholder="e.g. nta-admitcards.online or .gov.in"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Fee or Advance Demanded
            </label>
            <input
              type="text"
              value={feeAsked}
              onChange={(e) => setFeeAsked(e.target.value)}
              placeholder="e.g. ₹5,000 for PDF leak"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => { setContent(''); setExamOrUniv(''); setPortalUrl(''); setFeeAsked(''); setResult(null); }}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            disabled={isAnalyzing || !content.trim()}
            className="px-6 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAnalyzing ? 'Evaluating Legitimacy...' : 'Verify Academic Offer'}</span>
          </button>
        </div>
      </form>

      {result && (
        <UniversalVerdictCard
          result={result}
          onOpenAssistantWithContext={onOpenAssistant}
        />
      )}
    </div>
  );
};
