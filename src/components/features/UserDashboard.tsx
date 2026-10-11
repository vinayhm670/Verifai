import React from 'react';
import { UserSession, AnalysisResult } from '../../types';
import { getHistory } from '../../services/storage';
import { LayoutDashboard, ShieldCheck, Clock, Award, Users, AlertTriangle, ArrowRight } from 'lucide-react';

interface UserDashboardProps {
  session: UserSession;
  onNavigate: (tab: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ session, onNavigate }) => {
  const history: AnalysisResult[] = getHistory();

  const totalChecks = history.length;
  const highRiskChecks = history.filter(h => h.riskScore >= 70).length;
  const genuineChecks = history.filter(h => h.riskScore < 30).length;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Welcome Hero */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-1">
            Personal Trust Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {session.fullName || 'Citizen'}
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            {session.isLoggedIn ? `Logged in as ${session.email}` : 'Browsing in Secure Guest Mode'} · Zero third-party data tracking
          </p>
        </div>

        <button
          onClick={() => onNavigate('checker-job')}
          className="px-4 py-2.5 text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
        >
          Start New Verification
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Total Verifications</div>
          <div className="mt-1 text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {totalChecks}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Recorded on this device</div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Scams Intercepted</div>
          <div className="mt-1 text-2xl font-bold font-mono text-rose-600 tabular-nums">
            {highRiskChecks}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">High-risk warning alerts</div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Safe Validations</div>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-600 tabular-nums">
            {genuineChecks}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Likely authentic records</div>
        </div>
      </div>

      {/* Quick Launchpad */}
      <div className="mb-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Quick Security Tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => onNavigate('checker-job')}
            className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-600 dark:hover:border-teal-500 text-left transition-colors"
          >
            <div className="font-bold text-slate-900 dark:text-white mb-1">Job Check</div>
            <p className="text-[11px] text-slate-500">Laptop deposit & offer letters</p>
          </button>
          <button
            onClick={() => onNavigate('checker-link-phone-upi')}
            className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-600 dark:hover:border-teal-500 text-left transition-colors"
          >
            <div className="font-bold text-slate-900 dark:text-white mb-1">UPI & Links</div>
            <p className="text-[11px] text-slate-500">Reverse PIN & phishing URLs</p>
          </button>
          <button
            onClick={() => onNavigate('skill-passport')}
            className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-600 dark:hover:border-teal-500 text-left transition-colors"
          >
            <div className="font-bold text-slate-900 dark:text-white mb-1">Skill Passport</div>
            <p className="text-[11px] text-slate-500">Digital credential registry</p>
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-600 dark:hover:border-teal-500 text-left transition-colors"
          >
            <div className="font-bold text-slate-900 dark:text-white mb-1">Safety Quiz</div>
            <p className="text-[11px] text-slate-500">Test your reflex awareness</p>
          </button>
        </div>
      </div>

      {/* Recent Verifications Preview */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>
          {history.length > 0 && (
            <button
              onClick={() => onNavigate('history')}
              className="text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All History</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            No verifications run yet. Check a job offer or website above to see your log.
          </p>
        ) : (
          <div className="space-y-2 text-xs">
            {history.slice(0, 4).map((h) => (
              <div
                key={h.id}
                onClick={() => onNavigate('history')}
                className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between gap-3 cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{h.title}</div>
                  <div className="text-[11px] text-slate-400 capitalize">{h.checkerId} · {new Date(h.timestamp).toLocaleDateString('en-IN')}</div>
                </div>
                <div className="text-right">
                  <div className={`font-mono font-bold ${h.riskScore >= 70 ? 'text-rose-600' : h.riskScore >= 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {h.riskScore}/100
                  </div>
                  <div className="text-[10px] text-slate-400">{h.verdictLabel.split('—')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
