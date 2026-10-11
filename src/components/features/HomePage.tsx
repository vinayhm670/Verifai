import React, { useState } from 'react';
import { Language, translations } from '../../i18n/translations';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Plane, 
  Landmark, 
  Link2, 
  Camera, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Heart, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Search
} from 'lucide-react';
import heroImg from '../../assets/images/hero_trust_shield_1791697896784.jpg';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  lang: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, lang }) => {
  const [quickInput, setQuickInput] = useState('');
  const t = translations[lang];

  const checkers = [
    {
      id: 'checker-job',
      title: lang === 'hi' ? 'जॉब ऑफर चेक' : 'Job Offers',
      desc: lang === 'hi' ? 'लैपटॉप शुल्क, फर्जी ऑफर लेटर और बिना इंटरव्यू सीधी नौकरी' : 'Fake offer letters, laptop deposits & zero-interview corporate offers',
      icon: Briefcase,
      color: 'teal'
    },
    {
      id: 'checker-internship',
      title: lang === 'hi' ? 'इंटर्नशिप व सर्टिफिकेट' : 'Internships & Certificates',
      desc: lang === 'hi' ? '₹2,499 रजिस्ट्रेशन शुल्क और फर्जी प्लेसमेंट गारंटी' : 'Registration fees disguised as internships & instant unaccredited certs',
      icon: GraduationCap,
      color: 'blue'
    },
    {
      id: 'checker-certificate',
      title: lang === 'hi' ? 'सर्टिफिकेट स्कैनर' : 'Certificate Scanner',
      desc: lang === 'hi' ? 'फॉन्ट विसंगतियां, सील जांच और डिजिलॉकर सत्यापन' : 'Typography anomalies, layout checks & DigiLocker / NAD validation',
      icon: Award,
      color: 'emerald'
    },
    {
      id: 'checker-coaching',
      title: lang === 'hi' ? 'कोचिंग व एड-टेक दावे' : 'Coaching & Ed-Tech',
      desc: lang === 'hi' ? '100% चयन गारंटी और फर्जी टॉपर रैंक विज्ञापनों की जांच' : 'Misleading 100% rank guarantees violating CCPA consumer norms',
      icon: BookOpen,
      color: 'amber'
    },
    {
      id: 'checker-overseas',
      title: lang === 'hi' ? 'विदेश नौकरी व एजेंट' : 'Overseas Jobs & Agents',
      desc: lang === 'hi' ? 'टूरिस्ट वीजा पर काम, पासपोर्ट जब्ती और eMigrate रजिस्ट्रेशन' : 'eMigrate license checks, tourist visa work traps & passport retention',
      icon: Plane,
      color: 'indigo'
    },
    {
      id: 'checker-exam',
      title: lang === 'hi' ? 'परीक्षा व छात्रवृत्ति' : 'Exams & Admissions',
      desc: lang === 'hi' ? 'टेलीग्राम पेपर लीक ऑफर और फर्जी यूनिवर्सिटी पोर्टल' : 'Paper leak Telegram groups, backdoor seats & fake .org domains',
      icon: Landmark,
      color: 'purple'
    },
    {
      id: 'checker-link-phone-upi',
      title: lang === 'hi' ? 'लिंक, फोन व UPI' : 'Links, Phone & UPI',
      desc: lang === 'hi' ? 'रिवर्स यूपीआई पिन स्कैम, शार्टनर लिंक और बिजली बिल फ्रॉड' : 'Reverse UPI PIN debit scams, shortened URLs & power cut SMS',
      icon: Link2,
      color: 'rose'
    },
    {
      id: 'checker-photo-scan',
      title: lang === 'hi' ? 'फोटो व स्क्रीनशॉट स्कैन' : 'Universal Photo Scan',
      desc: lang === 'hi' ? 'व्हाट्सएप चैट स्क्रीनशॉट और ऑफर लेटर इमेज से OCR जांच' : 'Multi-image OCR extraction and visual forensics for suspicious chats',
      icon: Camera,
      color: 'sky'
    }
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) {
      onNavigate('checker-job');
      return;
    }
    // Route based on contents
    if (quickInput.includes('@') || quickInput.includes('http') || quickInput.includes('.com') || quickInput.includes('.in') || /^\d{10}$/.test(quickInput.trim())) {
      onNavigate('checker-link-phone-upi');
    } else {
      onNavigate('checker-job');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-300">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>India's AI-Powered Trust & Scam Detection Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Quick Hero Paste Field */}
            <form onSubmit={handleQuickSubmit} className="pt-2 max-w-xl">
              <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder={t.pastePlaceholder}
                    className="w-full text-xs sm:text-sm py-2 bg-transparent text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-colors shrink-0"
                >
                  {t.checkNow}
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero login needed to check</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Heuristic & AI multi-layer analysis</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free forever for citizens</span>
              </span>
            </div>
          </div>

          {/* Hero Right Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950 group">
              <img
                src={heroImg}
                alt="Verifai Cyber Fraud Verification Center"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xs font-semibold text-teal-400">Verifai Incident Telemetry</div>
                <div className="text-sm font-bold mt-0.5">Protecting 1.4B Indian citizens against digital impersonation</div>
                <p className="text-[11px] text-slate-300 mt-1">Cross-referencing eMigrate, DigiLocker, RBI Sachet, and community reports</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Primary Checker Cards Grid */}
      <section className="py-16 px-4 sm:px-6 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold mb-1">
              Comprehensive Verification Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Eight Specialized Fraud Checkers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Each checker is tailored with domain-specific rule models, official Indian regulatory registers, and evidence scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {checkers.map((chk) => {
              const Icon = chk.icon;
              return (
                <div
                  key={chk.id}
                  onClick={() => onNavigate(chk.id)}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-600 dark:hover:border-teal-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center group-hover:bg-teal-800 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-800 dark:group-hover:text-teal-400 transition-colors">
                        {chk.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {chk.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-teal-800 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Offer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Verifai Works (Transparent Pipeline) */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-bold">
            Transparent Pipeline
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Verifai Evaluates Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            No black-box mystery. Every verification follows a transparent multi-layer assessment pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-mono text-teal-700 dark:text-teal-400 font-bold text-sm">01. Evidence Extraction</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Input & Metadata Intake</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We extract entity names, contact domains, stated fees, urgency keywords, and OCR text from documents.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-mono text-teal-700 dark:text-teal-400 font-bold text-sm">02. Rule-Based Heuristics</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Fraud Pattern Matching</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Flags laptop deposits, illegal visit-visa work offers, APK downloads, and CCPA advertising violations.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-mono text-teal-700 dark:text-teal-400 font-bold text-sm">03. Official Verification</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Registry Guidance</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Provides direct links to eMigrate, DigiLocker, RBI Sachet, and NTA portals so you verify with source authorities.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="font-mono text-teal-700 dark:text-teal-400 font-bold text-sm">04. Actionable Redressal</div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Automated Safe Drafts</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Generates ready-to-use verification emails and 1930 Cybercrime complaint templates with 1-click copy.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Spotlights: Parent Mode & Skill Passport */}
      <section className="py-16 px-4 sm:px-6 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spotlight 1: Parent Mode */}
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Parent Mode: Senior Family Protection
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Protect elderly parents from WhatsApp lottery forwards, electricity disconnection APKs, and fake relative hospital emergencies. Simplified large-text view with voice dictation.
              </p>
            </div>
            <button
              onClick={() => onNavigate('parent-mode')}
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400 hover:underline"
            >
              <span>Open Parent Safety Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Spotlight 2: Skill Passport */}
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Worker Skill Passport & AI Coach
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Empower blue-collar electricians, technicians, and mechanics with verifiable QR credentials, trainer audit logs, and on-site practical safety coaching.
              </p>
            </div>
            <button
              onClick={() => onNavigate('skill-passport')}
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-400 hover:underline"
            >
              <span>Explore Worker Skill Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Notice Strip */}
      <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-6 rounded-2xl border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-bold text-teal-950 dark:text-teal-200">
              Test your reflexes with the Scam Awareness Quiz
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Interactive 5-question test with realistic Indian cybercrime scenarios. Earn your digital trust score!
            </p>
          </div>
          <button
            onClick={() => onNavigate('quiz')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors shrink-0"
          >
            Take 2-Minute Quiz
          </button>
        </div>
      </section>
    </div>
  );
};
