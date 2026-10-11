import React from 'react';
import { 
  Home, 
  ShieldAlert, 
  Award, 
  Users, 
  HelpCircle, 
  Heart, 
  Clock, 
  Settings, 
  X,
  PhoneCall
} from 'lucide-react';
import { Language } from '../../i18n/translations';

interface MobileNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onNavigate,
  isOpen,
  onClose,
  lang
}) => {
  const handleItemClick = (tab: string) => {
    onNavigate(tab);
    onClose();
  };

  const navItems = [
    { id: 'home', label: lang === 'hi' ? 'होम' : 'Home', icon: Home },
    { id: 'checker-job', label: lang === 'hi' ? 'जॉब ऑफर' : 'Job Offers', icon: ShieldAlert },
    { id: 'checker-internship', label: lang === 'hi' ? 'इंटर्नशिप' : 'Internships', icon: ShieldAlert },
    { id: 'checker-certificate', label: lang === 'hi' ? 'सर्टिफिकेट' : 'Certificates', icon: ShieldAlert },
    { id: 'checker-coaching', label: lang === 'hi' ? 'कोचिंग' : 'Coaching Ads', icon: ShieldAlert },
    { id: 'checker-overseas', label: lang === 'hi' ? 'विदेश नौकरी' : 'Overseas Jobs', icon: ShieldAlert },
    { id: 'checker-link-phone-upi', label: lang === 'hi' ? 'लिंक / UPI' : 'Links & UPI', icon: ShieldAlert },
    { id: 'checker-photo-scan', label: lang === 'hi' ? 'फोटो स्कैन' : 'Photo Scan', icon: ShieldAlert },
    { id: 'skill-passport', label: lang === 'hi' ? 'स्किल पासपोर्ट' : 'Skill Passport', icon: Award },
    { id: 'community-reports', label: lang === 'hi' ? 'रिपोर्ट्स' : 'Community Reports', icon: Users },
    { id: 'quiz', label: lang === 'hi' ? 'क्विज़' : 'Awareness Quiz', icon: HelpCircle },
    { id: 'parent-mode', label: lang === 'hi' ? 'पेरेंट मोड' : 'Parent Mode', icon: Heart },
    { id: 'help-and-report', label: lang === 'hi' ? '1930 मदद' : 'Emergency Help', icon: PhoneCall },
    { id: 'history', label: lang === 'hi' ? 'इतिहास' : 'Check History', icon: Clock },
    { id: 'settings', label: lang === 'hi' ? 'सेटिंग्स' : 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-slate-900 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-display font-bold text-lg text-teal-900 dark:text-teal-400">Verifai Menu</span>
                <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-teal-600" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              Emergency Cyber Helpline: <strong>1930</strong>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Quick Nav (Height strictly capped under 15% mobile viewport per frontend-design) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-md ${
            currentTab === 'home' ? 'text-teal-800 dark:text-teal-400 font-bold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onNavigate('checker-job')}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-md ${
            currentTab.startsWith('checker') ? 'text-teal-800 dark:text-teal-400 font-bold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Check</span>
        </button>
        <button
          onClick={() => onNavigate('skill-passport')}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-md ${
            currentTab === 'skill-passport' ? 'text-teal-800 dark:text-teal-400 font-bold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Skills</span>
        </button>
        <button
          onClick={() => onNavigate('community-reports')}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-md ${
            currentTab === 'community-reports' ? 'text-teal-800 dark:text-teal-400 font-bold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Reports</span>
        </button>
        <button
          onClick={() => onNavigate('parent-mode')}
          className={`flex flex-col items-center gap-0.5 text-[10px] py-1 px-2 rounded-md ${
            currentTab === 'parent-mode' ? 'text-teal-800 dark:text-teal-400 font-bold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Parent</span>
        </button>
      </div>
    </>
  );
};
