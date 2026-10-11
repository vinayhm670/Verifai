import React, { useState } from 'react';
import { getCommunityReports, saveCommunityReport, upvoteCommunityReport } from '../../services/storage';
import { CommunityReport } from '../../types';
import { Users, Search, ThumbsUp, AlertCircle, Plus, Filter, ShieldAlert, Check } from 'lucide-react';

export const CommunityReports: React.FC = () => {
  const [reports, setReports] = useState<CommunityReport[]>(getCommunityReports());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formCategory, setFormCategory] = useState<CommunityReport['category']>('Job Scam');
  const [formEntity, setFormEntity] = useState('');
  const [formIdentifier, setFormIdentifier] = useState('');
  const [formLoss, setFormLoss] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCity, setFormCity] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUpvote = (id: string) => {
    upvoteCommunityReport(id);
    setReports(getCommunityReports());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEntity.trim() || !formDesc.trim()) return;

    const newReport: CommunityReport = {
      id: 'rep-' + Date.now(),
      timestamp: new Date().toISOString(),
      category: formCategory,
      entityName: formEntity.trim(),
      identifier: formIdentifier.trim() || 'Not specified',
      lossAmount: formLoss.trim() || undefined,
      description: formDesc.trim(),
      status: 'Community Report',
      upvotes: 1,
      locationCity: formCity.trim() || 'Pan-India',
      reportedDate: new Date().toLocaleDateString('en-IN')
    };

    saveCommunityReport(newReport);
    setReports(getCommunityReports());
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      // Reset form
      setFormEntity('');
      setFormIdentifier('');
      setFormLoss('');
      setFormDesc('');
      setFormCity('');
    }, 1500);
  };

  const categories = ['All', 'Job Scam', 'Task / Telegram Scam', 'Overseas Job Agent', 'UPI / Phishing', 'Coaching / Course', 'Internship'];

  const filteredReports = reports.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      item.entityName.toLowerCase().includes(q) ||
      item.identifier.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.locationCity && item.locationCity.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Crowdsourced Scam Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Community Scam Reports
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Search corroborated reports submitted by fellow citizens across India to prevent repeat fraud.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-teal-800 hover:bg-teal-900 text-white shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Report a Scam</span>
        </button>
      </div>

      {/* Transparency Banner */}
      <div className="mb-6 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> "Community report — not independently verified." Information is submitted by citizens to foster caution. Verifai moderates for profanity and private phone doxxing. Always report financial loss to 1930 / cybercrime.gov.in.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by company name, phone number, UPI ID, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs focus:ring-2 focus:ring-teal-700"
          />
        </div>

        {/* Category Tabs (Interactive buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-xs text-slate-500">No community reports found matching your filter.</p>
          </div>
        ) : (
          filteredReports.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 transition-colors space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.entityName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 font-medium">{item.category}</span>
                  {item.locationCity && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500">{item.locationCity}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-[11px]">{item.reportedDate}</span>
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title="Corroborate this report"
                  >
                    <ThumbsUp className="w-3 h-3 text-teal-600" />
                    <span className="tabular-nums font-semibold">{item.upvotes}</span>
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Reported Identifier / Modus Operandi:</div>
                <div className="font-mono text-xs text-rose-700 dark:text-rose-400">{item.identifier}</div>
                <p className="mt-1.5 leading-relaxed">{item.description}</p>
                {item.lossAmount && (
                  <div className="mt-1.5 text-xs text-slate-900 dark:text-white font-semibold">
                    Reported Financial Loss: <span className="text-rose-600 font-mono">{item.lossAmount}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Status: {item.status}</span>
                <span>Flagged for community caution</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submit Report Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Submit Community Scam Report
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Help protect other citizens by reporting fraudulent companies, recruiters, or UPI handles.
            </p>

            {submitSuccess ? (
              <div className="p-6 text-center text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <Check className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                <span>Thank you! Your report has been added to the community database.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-slate-900 dark:text-white block mb-1">
                    Scam Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Job Scam">Job Scam</option>
                    <option value="Task / Telegram Scam">Task / Telegram Scam</option>
                    <option value="Overseas Job Agent">Overseas Job Agent</option>
                    <option value="UPI / Phishing">UPI / Phishing</option>
                    <option value="Coaching / Course">Coaching / Course</option>
                    <option value="Internship">Internship</option>
                    <option value="Certificate Fake">Certificate Fake</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-900 dark:text-white block mb-1">
                    Suspect Organization, Agent, or Platform Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formEntity}
                    onChange={(e) => setFormEntity(e.target.value)}
                    placeholder="e.g. CloudTech Global Solutions"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Phone Number / UPI ID / Website
                    </label>
                    <input
                      type="text"
                      value={formIdentifier}
                      onChange={(e) => setFormIdentifier(e.target.value)}
                      placeholder="e.g. +91 98xxx or vpa@paytm"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Reported Loss Amount (if any)
                    </label>
                    <input
                      type="text"
                      value={formLoss}
                      onChange={(e) => setFormLoss(e.target.value)}
                      placeholder="e.g. ₹9,500"
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-900 dark:text-white block mb-1">
                    Description of Scam Incident <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Describe how the contact occurred, what money was requested, and why it is suspicious..."
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg"
                  >
                    Publish Community Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
