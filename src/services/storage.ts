import { AnalysisResult, CommunityReport, WorkerProfile, UserSession } from '../types';
import { INITIAL_COMMUNITY_REPORTS } from './sampleData';

const HISTORY_KEY = 'verifai_history_v1';
const SESSION_KEY = 'verifai_session_v1';
const REPORTS_KEY = 'verifai_reports_v1';
const WORKER_KEY = 'verifai_worker_v1';
const THEME_KEY = 'verifai_theme_v1';
const ACCENT_KEY = 'verifai_accent_v1';
const LANG_KEY = 'verifai_lang_v1';

export function getHistory(): AnalysisResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(record: AnalysisResult): void {
  try {
    const current = getHistory();
    const updated = [record, ...current.filter(item => item.id !== record.id)].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save history', err);
  }
}

export function deleteHistoryItem(id: string): void {
  try {
    const current = getHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete history item', err);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error('Failed to clear history', err);
  }
}

export function getSession(): UserSession {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return { isLoggedIn: false, fullName: 'Guest Citizen' };
}

export function saveSession(session: UserSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save session', err);
  }
}

export function getCommunityReports(): CommunityReport[] {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_COMMUNITY_REPORTS;
}

export function saveCommunityReport(report: CommunityReport): void {
  try {
    const current = getCommunityReports();
    const updated = [report, ...current];
    localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save report', err);
  }
}

export function upvoteCommunityReport(id: string): void {
  try {
    const current = getCommunityReports();
    const updated = current.map(item => item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to upvote report', err);
  }
}

export function getWorkerProfile(): WorkerProfile {
  try {
    const raw = localStorage.getItem(WORKER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return {
    fullName: 'Ajay Sharma',
    phone: '+91 98451 22334',
    trade: 'Industrial Electrician & Wireman',
    experienceYears: 4,
    language: 'Hindi',
    location: 'Bhiwadi Industrial Area, Rajasthan',
    skills: [
      {
        id: 'sk-1',
        skillName: '3-Phase Motor Control Wiring',
        level: 'Skilled / Expert',
        status: 'Verified by trainer',
        trainerName: 'National Skill Training Institute (NSTI)',
        verifiedAt: '15 Jan 2026',
        observations: ['Follows IS:732 safety earthing standards', 'Clean cable lug crimping and labeling']
      },
      {
        id: 'sk-2',
        skillName: 'PLC & VFD Panel Installation',
        level: 'Intermediate',
        status: 'Video submitted',
        observations: ['Practical demonstration of Schneider Altivar drive parameter setup', 'Under assessment']
      },
      {
        id: 'sk-3',
        skillName: 'Arc Flash & Lockout-Tagout (LOTO) Safety',
        level: 'Skilled / Expert',
        status: 'Verified by trainer',
        trainerName: 'Skill India Assessors Board',
        verifiedAt: '20 Feb 2026',
        observations: ['Passed OSHA & Indian Electricity Rules 1956 protocol assessment']
      }
    ],
    aiCoachSummary: {
      estimatedLevel: 'Advanced Wireman (Level 4 NSQF Equivalent)',
      strengths: [
        'Solid grounding in 3-phase industrial power distribution',
        'Certified compliance with factory lockout-tagout (LOTO) protocols',
        'Strong practical understanding of cable sizing and circuit breakers'
      ],
      improvementAreas: [
        'Expand hands-on calibration of digital SCADA telemetry sensors',
        'Obtain formal written English schematic blueprint reading documentation'
      ],
      safetyTips: [
        'Always verify zero voltage with an insulated multimeter before touching terminals.',
        'Never work alone during high-tension panel energization.'
      ],
      recommendedLearning: [
        'NPTEL / Swayam: Industrial Automation & Control',
        'DigiLocker linked Skill India Electrician Refresher Module'
      ]
    }
  };
}

export function saveWorkerProfile(profile: WorkerProfile): void {
  try {
    localStorage.setItem(WORKER_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save worker profile', err);
  }
}

export function getStoredTheme(): 'light' | 'dark' | 'system' {
  return (localStorage.getItem(THEME_KEY) as 'light' | 'dark' | 'system') || 'system';
}

export function setStoredTheme(theme: 'light' | 'dark' | 'system'): void {
  localStorage.setItem(THEME_KEY, theme);
}

export function getStoredAccent(): string {
  return localStorage.getItem(ACCENT_KEY) || 'teal';
}

export function setStoredAccent(accent: string): void {
  localStorage.setItem(ACCENT_KEY, accent);
}

export function getStoredLanguage(): 'en' | 'hi' {
  return (localStorage.getItem(LANG_KEY) as 'en' | 'hi') || 'en';
}

export function setStoredLanguage(lang: 'en' | 'hi'): void {
  localStorage.setItem(LANG_KEY, lang);
}
