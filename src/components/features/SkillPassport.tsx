import React, { useState } from 'react';
import { getWorkerProfile, saveWorkerProfile } from '../../services/storage';
import { WorkerProfile, UserSkillRecord } from '../../types';
import { Award, CheckCircle2, Video, Clock, Share2, QrCode, Sparkles, AlertCircle, Plus, ShieldCheck } from 'lucide-react';
import workerImg from '../../assets/images/worker_skill_id_1791697910708.jpg';

export const SkillPassport: React.FC = () => {
  const [profile, setProfile] = useState<WorkerProfile>(getWorkerProfile());
  const [viewLang, setViewLang] = useState<'English' | 'Hindi'>('English');
  const [showQR, setShowQR] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: UserSkillRecord = {
      id: 'sk-' + Date.now(),
      skillName: newSkillName.trim(),
      level: 'Intermediate',
      status: 'Video submitted',
      observations: ['Demonstration video submitted for assessor evaluation', 'Pending review']
    };

    const updated = {
      ...profile,
      skills: [...profile.skills, newSkill]
    };
    setProfile(updated);
    saveWorkerProfile(updated);
    setNewSkillName('');
    setShowAddSkill(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/worker/ajay-sharma-electrician');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner / Hero */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Digital Credential & Verification Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Worker Skill Passport
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            A tamper-evident digital skill record for skilled technicians, electricians, and blue-collar workers in India.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setViewLang(viewLang === 'English' ? 'Hindi' : 'English')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 transition-colors"
          >
            {viewLang === 'English' ? 'Switch to हिन्दी' : 'Switch to English'}
          </button>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Passport</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-800 hover:bg-teal-900 text-white shadow-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
          </button>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="mb-8 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p>
          <strong>Official Transparency Notice:</strong> AI assessments in Verifai provide learning feedback and coaching only; they are not formal statutory government certifications. Verified status badges reflect documented evaluations by recognized ITI / NSTI trainers with audit timestamps.
        </p>
      </div>

      {/* Worker Card and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Worker Identity Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="aspect-4/3 relative bg-slate-950 overflow-hidden">
              <img
                src={workerImg}
                alt="Ajay Sharma - Industrial Electrician"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="font-bold text-lg">{profile.fullName}</div>
                <div className="text-xs text-teal-300 font-medium">{profile.trade}</div>
              </div>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Experience</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{profile.experienceYears} Years</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Location</span>
                <span className="font-semibold text-slate-900 dark:text-white">{profile.location}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Contact</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">{profile.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Credential Status</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trainer Audited</span>
                </span>
              </div>
            </div>
          </div>

          {/* QR Code Modal Preview */}
          {showQR && (
            <div className="p-5 rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/30 text-center">
              <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center">
                <QrCode className="w-28 h-28 text-slate-800" />
              </div>
              <div className="mt-3 text-xs font-semibold text-teal-950 dark:text-teal-200">
                Scan to Verify Ajay Sharma's Skills
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Employers can scan this QR at work sites to inspect certified competency records.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Skills Record & AI Coach */}
        <div className="lg:col-span-8 space-y-6">
          {/* Skills Breakdown */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recorded Technical Competencies
                </h3>
                <p className="text-xs text-slate-500">
                  {viewLang === 'Hindi' ? 'प्रमाणित कौशल और कार्य अनुभव' : 'Verified hands-on trade skills'}
                </p>
              </div>

              <button
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-800 hover:bg-teal-900 text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {showAddSkill && (
              <form onSubmit={handleAddSkill} className="mb-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex gap-2">
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Enter skill name (e.g. Solar Inverter Installation)"
                  className="flex-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 p-2 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-teal-800 text-white rounded-lg hover:bg-teal-900"
                >
                  Save
                </button>
              </form>
            )}

            <div className="space-y-3">
              {profile.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {skill.skillName}
                    </span>

                    {/* Status badge with zero-pill compliance */}
                    <div className="flex items-center gap-1.5 font-medium">
                      {skill.status === 'Verified by trainer' ? (
                        <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified by {skill.trainerName || 'Assessor'} ({skill.verifiedAt})</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                          <Video className="w-3.5 h-3.5" />
                          <span>Video Submitted · Awaiting Assessment</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="text-slate-600 dark:text-slate-300 space-y-1 pt-1">
                    {skill.observations.map((obs, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-teal-700 font-bold shrink-0">·</span>
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* AI Skill Coach Module */}
          <div className="rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/40 dark:bg-teal-950/20 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-700" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  AI Skill Coach Diagnostic
                </h3>
                <span className="text-xs text-teal-800 dark:text-teal-300 font-medium">
                  Estimated Level: {profile.aiCoachSummary.estimatedLevel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1.5">
                  Observed Strengths
                </span>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  {profile.aiCoachSummary.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-emerald-600">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-amber-800 dark:text-amber-400 block mb-1.5">
                  Areas for Advancement
                </span>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  {profile.aiCoachSummary.improvementAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-amber-600">→</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                Practical On-Site Safety Protocol
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {profile.aiCoachSummary.safetyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-teal-700 font-bold">·</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
