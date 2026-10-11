import React, { useState } from 'react';
import { runHeuristicAnalysis } from '../../services/analyzer';
import { saveToHistory } from '../../services/storage';
import { SAMPLE_CASES } from '../../services/sampleData';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';
import { VoiceInputButton } from '../common/VoiceControls';
import { AnalysisResult } from '../../types';
import { Plane, AlertTriangle, ShieldCheck, RotateCcw, ExternalLink } from 'lucide-react';

interface OverseasCheckerProps {
  onOpenAssistant: (context: string) => void;
}

export const OverseasChecker: React.FC<OverseasCheckerProps> = ({ onOpenAssistant }) => {
  const [content, setContent] = useState('');
  const [agentName, setAgentName] = useState('');
  const [destination, setDestination] = useState('');
  const [visaType, setVisaType] = useState<'employment' | 'visit_tourist' | 'unspecified'>('unspecified');
  const [hasLicense, setHasLicense] = useState<'yes' | 'no' | 'unknown'>('unknown');
  const [feeAsked, setFeeAsked] = useState('');
  const [passportDemand, setPassportDemand] = useState<'yes' | 'no'>('no');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const fullText = `${content} Destination: ${destination}. Visa: ${visaType}. Passport Handover: ${passportDemand}. Fee: ${feeAsked}`;
      const res = runHeuristicAnalysis({
        checkerId: 'overseas',
        content: fullText,
        companyOrIssuer: agentName,
        extraDetails: { hasLicense, visaType }
      });
      setResult(res);
      saveToHistory(res);
      setIsAnalyzing(false);
    }, 400);
  };

  const loadSample = (idx: number) => {
    const s = SAMPLE_CASES.overseas[idx];
    setContent(s.content);
    setAgentName(s.companyOrIssuer);
    setDestination(idx === 0 ? 'Dubai (UAE)' : 'Saudi Arabia');
    setVisaType(idx === 0 ? 'visit_tourist' : 'employment');
    setHasLicense(s.extraDetails?.hasLicense as any || 'unknown');
    setFeeAsked(idx === 0 ? '₹65,000' : 'Standard capped MEA fee');
    setPassportDemand(idx === 0 ? 'yes' : 'no');

    const res = runHeuristicAnalysis({
      checkerId: 'overseas',
      content: s.content,
      companyOrIssuer: s.companyOrIssuer,
      extraDetails: s.extraDetails
    });
    res.isDemoSample = true;
    setResult(res);
    saveToHistory(res);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Plane className="w-4 h-4" />
          <span>Emigration & Migrant Worker Safety</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Overseas Job & Recruitment Agent Checker
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Verify Gulf, Southeast Asia, and European job recruiters. Check against Ministry of External Affairs (MEA) eMigrate rules, illegal tourist visa deployments, and passport confiscation flags.
        </p>

        {/* eMigrate Official Gateway Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 text-xs text-teal-950 dark:text-teal-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
            <span>
              <strong>MEA Official Registry:</strong> All legitimate overseas recruitment agents in India must hold an active RC License on <strong>emigrate.gov.in</strong>.
            </span>
          </div>
          <a
            href="https://emigrate.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline text-teal-800 dark:text-teal-300 whitespace-nowrap flex items-center gap-1"
          >
            Verify on eMigrate <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Samples */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Try Sample Case:</span>
          <button
            onClick={() => loadSample(0)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
          >
            Sample 1: Dubai Visit Visa Scam with Passport Handover
          </button>
          <button
            onClick={() => loadSample(1)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900"
          >
            Sample 2: Registered MEA Licensed Agent Offer
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-900 dark:text-white">
              Recruitment Offer, Message, or Agent Demands <span className="text-rose-500">*</span>
            </label>
            <VoiceInputButton onTranscript={(txt) => setContent(prev => prev + ' ' + txt)} />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            placeholder="Paste message, foreign employer details, salary offered, medical test terms, or fees demanded..."
            className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Agent / Consultancy Name
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g. Al-Farah Manpower"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Destination Country
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. UAE, Saudi Arabia, Poland, Russia"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Advance Processing Fee Asked
            </label>
            <input
              type="text"
              value={feeAsked}
              onChange={(e) => setFeeAsked(e.target.value)}
              placeholder="e.g. ₹70,000 advance"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Visa Category Arranged
            </label>
            <select
              value={visaType}
              onChange={(e) => setVisaType(e.target.value as any)}
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            >
              <option value="unspecified">Unspecified / Unknown</option>
              <option value="employment">Employment / Work Visa (Stamped in India)</option>
              <option value="visit_tourist">Tourist / Visit Visa (Told to convert abroad - HIGH RISK)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Is Agent Registered with MEA (eMigrate)?
            </label>
            <select
              value={hasLicense}
              onChange={(e) => setHasLicense(e.target.value as any)}
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            >
              <option value="unknown">Not sure / Unchecked</option>
              <option value="yes">Yes, verified valid RC License number</option>
              <option value="no">No license or unregistered sub-agent</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Demanding Original Passport Handover?
            </label>
            <select
              value={passportDemand}
              onChange={(e) => setPassportDemand(e.target.value as any)}
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-slate-900 dark:text-slate-100"
            >
              <option value="no">No, candidate retains passport</option>
              <option value="yes">Yes, agent demands keeping original passport</option>
            </select>
          </div>
        </div>

        {/* Anti-Trafficking Safety Box */}
        <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p>
            <strong>Human Trafficking Alert:</strong> Never surrender your original passport to an unregistered agent. Do not travel on a visit visa with promises of a work permit. If you feel coerced or trapped, do not confront the agent alone; contact the Protector of Emigrants (PoE) or police immediately.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => { setContent(''); setAgentName(''); setDestination(''); setFeeAsked(''); setResult(null); }}
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
            <Plane className="w-4 h-4" />
            <span>{isAnalyzing ? 'Checking eMigrate Indicators...' : 'Verify Overseas Agent'}</span>
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
