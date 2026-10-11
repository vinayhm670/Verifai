export type RiskLevel = 'low' | 'moderate' | 'high' | 'insufficient';

export type CheckerId = 
  | 'job' 
  | 'internship' 
  | 'certificate' 
  | 'coaching' 
  | 'overseas' 
  | 'exam' 
  | 'link-phone-upi' 
  | 'photo-scan';

export interface EvidenceItem {
  id: string;
  type: 'danger' | 'warning' | 'info' | 'positive';
  title: string;
  description: string;
  sourceType: 'rule_heuristic' | 'reputation_signal' | 'input_fact' | 'official_registry';
}

export interface HighlightedPhrase {
  phrase: string;
  reason: string;
  severity: 'high' | 'medium' | 'low';
}

export interface OfficialLink {
  label: string;
  url: string;
  authority: string;
  description: string;
}

export interface AnalysisResult {
  id: string;
  checkerId: CheckerId;
  timestamp: string;
  title: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  verdictLabel: string;
  verdictSummary: string;
  verdictSummaryHindi: string;
  evidenceQuality: 'High (Detailed Input)' | 'Moderate' | 'Low (Sparse Data)' | 'Insufficient';
  observedEvidence: EvidenceItem[];
  highlightedPhrases: HighlightedPhrase[];
  missingInformation: string[];
  recommendedSteps: string[];
  officialLinks: OfficialLink[];
  safeReplyDraft?: string;
  cybercrimeComplaintDraft?: string;
  aiDeepAnalysis?: string;
  inputSummary: Record<string, string>;
  isDemoSample?: boolean;
}

export interface CommunityReport {
  id: string;
  timestamp: string;
  category: 'Job Scam' | 'Internship' | 'Certificate Fake' | 'Coaching / Course' | 'Overseas Job Agent' | 'Scholarship / Exam' | 'UPI / Phishing' | 'Task / Telegram Scam';
  entityName: string;
  identifier: string; // phone, UPI, domain
  lossAmount?: string;
  description: string;
  status: 'Verified Warning' | 'Under Moderation' | 'Community Report';
  upvotes: number;
  locationCity?: string;
  reportedDate: string;
}

export interface UserSkillRecord {
  id: string;
  skillName: string;
  level: 'Beginner' | 'Intermediate' | 'Skilled / Expert';
  status: 'Not recorded' | 'Video submitted' | 'Verified by trainer';
  trainerName?: string;
  verifiedAt?: string;
  observations: string[];
}

export interface WorkerProfile {
  fullName: string;
  phone: string;
  trade: string;
  experienceYears: number;
  language: 'English' | 'Hindi' | 'Kannada';
  location: string;
  skills: UserSkillRecord[];
  aiCoachSummary: {
    estimatedLevel: string;
    strengths: string[];
    improvementAreas: string[];
    safetyTips: string[];
    recommendedLearning: string[];
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionHindi: string;
  scenarioContext: string;
  options: string[];
  optionsHindi: string[];
  correctIndex: number;
  explanation: string;
  explanationHindi: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  email?: string;
  fullName?: string;
  role?: 'citizen' | 'student' | 'jobseeker' | 'parent';
  createdAt?: string;
}
