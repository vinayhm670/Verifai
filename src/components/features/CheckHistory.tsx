import React, { useState } from 'react';
import { getHistory, deleteHistoryItem, clearHistory } from '../../services/storage';
import { AnalysisResult } from '../../types';
import { Clock, Trash2, Eye, Download, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';
import { UniversalVerdictCard } from '../common/UniversalVerdictCard';

export const CheckHistory: React.FC = () => {
  const [history, setHistory] = useState<AnalysisResult[]>(getHistory());
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteHistoryItem(id);
    const updated = getHistory();
    setHistory(updated);
    if (selectedResult?.id === id) {
      setSelectedResult(null);
    }
  };

  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
    setSelectedResult(null);
    setShowConfirmClear(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>Private Local History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Check History & Past Verifications
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Stored locally on your browser. You can inspect past reports, re-export verdicts, or delete them anytime.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            {showConfirmClear ? (
              <>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Confirm clear?</span>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                >
                  Yes, Clear
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All History</span>
              </button>
            )}
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <Clock className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No Verifications in History</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When you run checks across our Job, Certificate, Overseas, or UPI inspectors, your results will be securely cataloged here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {history.map((record) => {
              const score = record.riskScore;
              return (
                <div
                  key={record.id}
                  onClick={() => setSelectedResult(record)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
                    selectedResult?.id === record.id
                      ? 'border-teal-600 bg-teal-50/20 dark:bg-teal-950/20 ring-1 ring-teal-600'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {score >= 70 ? (
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                      ) : score >= 30 ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {record.title}
                      </span>
                      <span aria-hidden="true" className="text-slate-400">·</span>
                      <span className="text-slate-500 uppercase font-mono text-[10px]">
                        {record.checkerId}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-1">
                      {record.verdictSummary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="font-mono font-bold text-sm tabular-nums text-slate-900 dark:text-white">
                        {record.riskScore}/100
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(record.timestamp).toLocaleDateString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDelete(record.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete this record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Selected Result */}
          {selectedResult && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Detailed Assessment View: {selectedResult.title}
              </h3>
              <UniversalVerdictCard result={selectedResult} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
