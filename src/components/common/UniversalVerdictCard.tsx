import React, { useState } from 'react';
import { AnalysisResult } from '../../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  HelpCircle, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  ExternalLink, 
  MessageSquare, 
  FileText, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AudioNarrator } from './VoiceControls';

interface UniversalVerdictCardProps {
  result: AnalysisResult;
  onOpenAssistantWithContext?: (contextText: string) => void;
}

export const UniversalVerdictCard: React.FC<UniversalVerdictCardProps> = ({
  result,
  onOpenAssistantWithContext
}) => {
  const [copiedDraft, setCopiedDraft] = useState<'reply' | 'complaint' | 'share' | null>(null);
  const [showReplyDraft, setShowReplyDraft] = useState(false);
  const [showComplaintDraft, setShowComplaintDraft] = useState(false);
  const [showDeepAnalysis, setShowDeepAnalysis] = useState(false);
  const [showHindi, setShowHindi] = useState(false);

  const isInsufficient = result.riskLevel === 'insufficient';

  // Semicircular Gauge calculations
  // Angle: from -90deg to +90deg (180 deg arc)
  const score = Math.max(0, Math.min(100, result.riskScore));
  const radius = 64;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // half circle circumference
  const strokeDashoffset = circumference - (circumference * (score / 100));

  const getThemeColor = () => {
    if (isInsufficient) return { stroke: '#94A3B8', text: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-900', border: 'border-slate-200 dark:border-slate-800' };
    if (score < 30) return { stroke: '#15803D', text: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50/50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-900' };
    if (score < 70) return { stroke: '#D97706', text: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50/50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-900' };
    return { stroke: '#DC2626', text: 'text-rose-700 dark:text-rose-400', bg: 'bg-rose-50/50 dark:bg-rose-950/20', border: 'border-rose-200 dark:border-rose-900' };
  };

  const theme = getThemeColor();

  const handleCopy = (text: string, type: 'reply' | 'complaint' | 'share') => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(type);
    setTimeout(() => setCopiedDraft(null), 2500);
  };

  const handlePrintDownload = () => {
    window.print();
  };

  const shareText = `Verifai Fraud Risk Assessment:
Subject: ${result.title}
Risk Index: ${isInsufficient ? 'Insufficient Data' : result.riskScore + '/100'} (${result.verdictLabel})
Summary: ${result.verdictSummary}
Verify before you trust via Verifai platform.`;

  return (
    <div className={`mt-6 rounded-xl border ${theme.border} bg-white dark:bg-slate-900 shadow-sm transition-all overflow-hidden`}>
      {/* Top Header Strip with clean unboxed metadata */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Verdict Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Quality: {result.evidenceQuality}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{new Date(result.timestamp).toLocaleDateString('en-IN')}</span>
          {result.isDemoSample && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">[Sample Data]</span>
            </>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <AudioNarrator textToSpeak={showHindi ? result.verdictSummaryHindi : result.verdictSummary} lang={showHindi ? 'hi' : 'en'} />
          <button
            onClick={() => handleCopy(shareText, 'share')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            title="Share assessment findings"
          >
            {copiedDraft === 'share' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedDraft === 'share' ? 'Copied' : 'Share'}</span>
          </button>
          <button
            onClick={handlePrintDownload}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            title="Print or save as PDF report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Main Verdict Section: Gauge & Summary */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Gauge column */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            {isInsufficient ? (
              <div className="text-center py-4">
                <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Insufficient Data</span>
                <p className="text-xs text-slate-500 mt-1">Need more text or document details</p>
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                <svg width="160" height="95" viewBox="0 0 160 95" className="overflow-visible">
                  {/* Background Track */}
                  <path
                    d="M 16 80 A 64 64 0 0 1 144 80"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="dark:stroke-slate-700"
                  />
                  {/* Colored Active Arc */}
                  <path
                    d="M 16 80 A 64 64 0 0 1 144 80"
                    fill="none"
                    stroke={theme.stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Score Number in center */}
                <div className="text-center mt-[-15px]">
                  <div className="font-mono text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
                    {result.riskScore}
                    <span className="text-sm font-normal text-slate-500">/100</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Heuristic Risk Index</div>
                </div>
              </div>
            )}
          </div>

          {/* Verdict details */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              {score >= 70 ? (
                <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
              ) : score >= 30 ? (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              )}
              <h3 className={`text-xl font-bold tracking-tight ${theme.text}`}>
                {result.verdictLabel}
              </h3>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.verdictSummary}
            </p>

            {/* Toggle Hindi Explanation */}
            <div className="pt-1">
              <button
                onClick={() => setShowHindi(!showHindi)}
                className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>{showHindi ? 'हिंदी विवरण छुपाएं (Hide Hindi)' : 'हिंदी में व्याख्या पढ़ें (Read in Hindi)'}</span>
                {showHindi ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showHindi && (
                <div className="mt-2 p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                  <p className="font-semibold mb-1 text-teal-900 dark:text-teal-200">हिंदी व्याख्या:</p>
                  <p>{result.verdictSummaryHindi}</p>
                </div>
              )}
            </div>

            {/* Disclaimer notice */}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              * The risk score is an automated heuristic estimate based on known warning patterns. It is not an absolute legal determination.
            </p>
          </div>
        </div>

        {/* Highlighted Suspicious Phrases */}
        {result.highlightedPhrases.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Flagged Phrases in Submission
            </h4>
            <div className="space-y-2">
              {result.highlightedPhrases.map((phrase, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 text-xs"
                >
                  <span className="font-semibold text-rose-800 dark:text-rose-300 font-mono">
                    "{phrase.phrase}"
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{phrase.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observed Evidence vs Facts */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
            Observed Evidence & Findings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.observedEvidence.map(item => (
              <div 
                key={item.id}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-white">{item.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{item.sourceType.replace('_', ' ')}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Information & Recommended Steps */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Missing Verification Data
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {result.missingInformation.map((info, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Recommended Safe Next Steps
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              {result.recommendedSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Official Links */}
        {result.officialLinks.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Authoritative Indian Portals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {result.officialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-50/30 dark:hover:bg-teal-950/20 transition-colors flex items-start justify-between gap-2 group"
                >
                  <div>
                    <span className="font-semibold text-teal-800 dark:text-teal-300 group-hover:underline flex items-center gap-1">
                      {link.label}
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-600" />
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{link.authority}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Safe Reply Draft & Cybercrime Complaint Draft */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
          {result.safeReplyDraft && (
            <button
              onClick={() => setShowReplyDraft(!showReplyDraft)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
              <span>{showReplyDraft ? 'Hide Reply Draft' : 'Draft Official Verification Reply'}</span>
              {showReplyDraft ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          {result.cybercrimeComplaintDraft && (
            <button
              onClick={() => setShowComplaintDraft(!showComplaintDraft)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-rose-600" />
              <span>{showComplaintDraft ? 'Hide Complaint Draft' : 'Draft 1930 Cybercrime Complaint'}</span>
              {showComplaintDraft ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          {result.aiDeepAnalysis && (
            <button
              onClick={() => setShowDeepAnalysis(!showDeepAnalysis)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-teal-300 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{showDeepAnalysis ? 'Hide AI Deep Analysis' : 'AI Deep Analysis'}</span>
              {showDeepAnalysis ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          {onOpenAssistantWithContext && (
            <button
              onClick={() => onOpenAssistantWithContext(`Context: Verification Result for "${result.title}". Risk Score: ${result.riskScore}. Verdict: ${result.verdictLabel}. Details: ${result.verdictSummary}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-colors ml-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Assistant Follow-Up</span>
            </button>
          )}
        </div>

        {/* Reply Draft Content */}
        {showReplyDraft && result.safeReplyDraft && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800 dark:text-white">
                Pre-written Professional Response to Recruiter/Sender:
              </span>
              <button
                onClick={() => handleCopy(result.safeReplyDraft!, 'reply')}
                className="inline-flex items-center gap-1 text-xs text-teal-700 dark:text-teal-400 hover:underline"
              >
                {copiedDraft === 'reply' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedDraft === 'reply' ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              {result.safeReplyDraft}
            </pre>
          </div>
        )}

        {/* Complaint Draft Content */}
        {showComplaintDraft && result.cybercrimeComplaintDraft && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-rose-900 dark:text-rose-200">
                Formal Complaint Template for cybercrime.gov.in / 1930 Helpline:
              </span>
              <button
                onClick={() => handleCopy(result.cybercrimeComplaintDraft!, 'complaint')}
                className="inline-flex items-center gap-1 text-xs text-rose-700 dark:text-rose-400 hover:underline"
              >
                {copiedDraft === 'complaint' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedDraft === 'complaint' ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              {result.cybercrimeComplaintDraft}
            </pre>
          </div>
        )}

        {/* AI Deep Analysis Content */}
        {showDeepAnalysis && result.aiDeepAnalysis && (
          <div className="mt-4 p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900">
            <span className="text-xs font-semibold text-teal-900 dark:text-teal-200 block mb-1">
              AI Heuristic Synthesis:
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.aiDeepAnalysis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
