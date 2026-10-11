import React, { useState } from 'react';
import { runHeuristicAnalysis } from '../../services/analyzer';
import { saveToHistory } from '../../services/storage';
import { SAMPLE_CASES } from '../../services/sampleData';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';
import { VoiceInputButton } from '../common/VoiceControls';
import { AnalysisResult } from '../../types';
import { BookOpen, Sparkles, Scale, RotateCcw } from 'lucide-react';

interface CoachingCheckerProps {
  onOpenAssistant: (context: string) => void;
}

export const CoachingChecker: React.FC<CoachingCheckerProps> = ({ onOpenAssistant }) => {
  const [content, setContent] = useState('');
  const [institute, setInstitute] = useState('');
  const [fee, setFee] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const res = runHeuristicAnalysis({
        checkerId: 'coaching',
        content,
        companyOrIssuer: institute,
        statedAmountOrSalary: fee
      });
      setResult(res);
      saveToHistory(res);
      setIsAnalyzing(false);
    }, 400);
  };

  const loadSample = (idx: number) => {
    const s = SAMPLE_CASES.coaching[idx];
    setContent(s.content);
    setInstitute(s.companyOrIssuer);
    setFee(s.statedAmountOrSalary);
    const res = runHeuristicAnalysis({
      checkerId: 'coaching',
      content: s.content,
      companyOrIssuer: s.companyOrIssuer,
      statedAmountOrSalary: s.statedAmountOrSalary
    });
    res.isDemoSample = true;
    setResult(res);
    saveToHistory(res);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Consumer Protection & Ed-Tech Standards</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Coaching & Ed-Tech Claim Checker
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Scrutinize misleading advertisements, 100% selection guarantees, fake topper claims, and non-refundable loan clauses under Central Consumer Protection Authority (CCPA) guidelines.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Try Sample Advertisement:</span>
          <button
            onClick={() => loadSample(0)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
          >
            Sample 1: Deceptive 100% Rank Guarantee Ad
          </button>
          <button
            onClick={() => loadSample(1)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
          >
            Sample 2: Transparent Curriculum with Terms
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-900 dark:text-white">
              Ad Text, Social Media Post, or Brochure Claims <span className="text-rose-500">*</span>
            </label>
            <VoiceInputButton onTranscript={(txt) => setContent(prev => prev + ' ' + txt)} />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            placeholder="Paste coaching advertisement claims, topper guarantees, refund conditions, or course promises..."
            className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Institute or Ed-Tech Platform Name
            </label>
            <input
              type="text"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              placeholder="e.g. Super-Rankers Medical Academy"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Course Fee / Financing Amount
            </label>
            <input
              type="text"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="e.g. ₹1,20,000 upfront or ₹10,000 / month EMI"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => { setContent(''); setInstitute(''); setFee(''); setResult(null); }}
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
            <Scale className="w-4 h-4" />
            <span>{isAnalyzing ? 'Evaluating Claims...' : 'Check Coaching Claims'}</span>
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
