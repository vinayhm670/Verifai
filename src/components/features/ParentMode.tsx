import React, { useState } from 'react';
import { runHeuristicAnalysis } from '../../services/analyzer';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';
import { VoiceInputButton } from '../common/VoiceControls';
import { AnalysisResult } from '../../types';
import { Heart, ShieldCheck, Check, Sparkles, MessageCircle, AlertTriangle } from 'lucide-react';
import parentImg from '../../assets/images/parent_safety_guide_1791697925083.jpg';

interface ParentModeProps {
  onOpenAssistant: (context: string) => void;
}

export const ParentMode: React.FC<ParentModeProps> = ({ onOpenAssistant }) => {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const quickScenarios = [
    {
      title: 'WhatsApp KBC Lottery / Prize Message',
      text: 'Dear Sir, Your WhatsApp mobile number has won ₹25,00,000 cash prize in Kaun Banega Crorepati (KBC) Lucky Draw 2026. To receive your cheque, call manager Rana Pratap Singh on WhatsApp and deposit ₹12,500 tax clearance fees immediately.'
    },
    {
      title: 'Urgent Relative "Accident / Hospital Money"',
      text: 'Beta, I am stranded in an emergency hospital. My bank card is blocked. Please immediately send ₹15,000 to this UPI ID dr_urgent_clinic@paytm right now. Do not call my phone, battery is low.'
    },
    {
      title: 'EPFO / Bank KYC Account Blocked SMS',
      text: 'Dear User, Your SBI Bank account and PAN KYC has expired today. Your net banking will be permanently suspended within 2 hours. Download QuickSupport or SBI-Update.apk to verify your Aadhaar now.'
    }
  ];

  const handleQuickCheck = (text: string) => {
    setContent(text);
    setIsChecking(true);
    setTimeout(() => {
      const res = runHeuristicAnalysis({
        checkerId: 'link-phone-upi',
        content: text,
        companyOrIssuer: 'WhatsApp / SMS Forward'
      });
      setResult(res);
      setIsChecking(false);
    }, 350);
  };

  const handleCustomCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsChecking(true);
    setTimeout(() => {
      const res = runHeuristicAnalysis({
        checkerId: 'link-phone-upi',
        content,
        companyOrIssuer: 'Family / Senior Check'
      });
      setResult(res);
      setIsChecking(false);
    }, 350);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
          <span>Simplified Family & Senior Citizen Safety</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Parent Mode — Easy Family Message Checker
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          A clear, simplified way for parents, elders, and family members to check suspicious WhatsApp forwards, lottery messages, urgent money demands, and fake electricity bills.
        </p>
      </div>

      {/* Hero Visual Card */}
      <div className="mb-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="md:col-span-5 h-48 md:h-full relative overflow-hidden bg-slate-950">
          <img
            src={parentImg}
            alt="Indian family checking phone safely"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        <div className="md:col-span-7 p-6 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Simple 3-Step Family Safety Rule
          </h2>
          <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-teal-700 shrink-0">1.</span>
              <span><strong>Never enter your UPI PIN to receive money.</strong> Entering a PIN always sends money away from your bank.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-teal-700 shrink-0">2.</span>
              <span><strong>Never click links ending in ".apk"</strong> sent on WhatsApp or SMS. Real banks use official App Stores.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-teal-700 shrink-0">3.</span>
              <span><strong>Call the family member back directly</strong> on their regular phone before sending any urgent hospital or travel money.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Click Checks */}
      <div className="mb-8 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          One-Touch Test: Common Messages Parents Receive
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickScenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickCheck(sc.text)}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-600 text-left transition-colors shadow-xs group"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-800 dark:group-hover:text-teal-400 mb-1">
                {sc.title}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                "{sc.text.substring(0, 80)}..."
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Checker Form with Large Text */}
      <form onSubmit={handleCustomCheck} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-bold text-slate-900 dark:text-white">
            Paste the Message Received on WhatsApp or SMS
          </label>
          <VoiceInputButton onTranscript={(txt) => setContent(prev => prev + ' ' + txt)} />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          placeholder="Paste or speak the message here (जैसे कोई लॉटरी का मैसेज, बैंक ब्लॉक होने का मैसेज, या पैसे मांगने का मैसेज)..."
          className="w-full text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-700"
        />

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => { setContent(''); setResult(null); }}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isChecking || !content.trim()}
            className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isChecking ? 'Checking Safety...' : 'Check This Message Now'}</span>
          </button>
        </div>
      </form>

      {/* Result Display */}
      {result && (
        <UniversalVerdictCard
          result={result}
          onOpenAssistantWithContext={onOpenAssistant}
        />
      )}
    </div>
  );
};
