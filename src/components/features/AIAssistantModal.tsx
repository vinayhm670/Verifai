import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, MessageSquare, ShieldAlert, FileText, Globe } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextText?: string;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  contextText
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: contextText 
        ? `Hello! I have loaded the context from your recent verification: "${contextText.substring(0, 80)}...". How can I assist you with this assessment?`
        : "Hello, I am Verifai AI Assistant. I can help you evaluate job offers, draft verification letters to recruiters, prepare formal 1930 cybercrime complaints, or explain fraud indicators in Hindi or simpler terms.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickActions = [
    { label: "Deep Analysis", prompt: "Provide a deep forensic breakdown of this offer and explain all hidden liabilities." },
    { label: "Draft Safe Reply", prompt: "Draft a polite but firm message to this sender asking for corporate verification details and CIN." },
    { label: "Draft 1930 Complaint", prompt: "Draft a formal complaint text ready to copy-paste into the 1930 National Cyber Crime portal." },
    { label: "Explain in Hindi", prompt: "Explain these findings in simple Hindi so I can share them with my parents." },
    { label: "Explain Simpler", prompt: "Explain this in very simple plain words for a first-time college graduate." }
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes('hindi') || lower.includes('हिंदी')) {
        reply = `**हिंदी में व्याख्या (Hindi Explanation):**\n\n1. **मुख्य नियम:** कोई भी असली कंपनी इंटरव्यू से पहले लैपटॉप, ट्रेनिंग या आईडी कार्ड के लिए पैसे नहीं मांगती।\n2. **यूपीआई नियम:** किसी भी स्थिति में पैसे प्राप्त करने के लिए अपना यूपीआई पिन न डालें।\n3. **अगला कदम:** यदि आपने पैसे भेज दिए हैं, तो तुरंत 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत दर्ज कराएं।`;
      } else if (lower.includes('complaint') || lower.includes('1930')) {
        reply = `**Formal Cybercrime Complaint Draft (cybercrime.gov.in / 1930):**\n\nTo,\nThe Cyber Crime Cell / Duty Officer,\nSubject: Fraudulent solicitation & financial scam attempt\n\nI am writing to report a scam attempt received via digital messaging. The sender claimed to represent an organization and demanded advance payments under the pretext of registration/caution deposit. \n\nEvidence Summary:\n- Sender Details: [Provided in transaction]\n- Modus Operandi: Employment/Task fraud with upfront fee demand\n- Digital logs and payment handles have been captured.\n\nKindly initiate necessary cyber tracking and account freeze procedures.\n\nRespectfully,\nComplainant`;
      } else if (lower.includes('reply') || lower.includes('safe')) {
        reply = `**Safe Professional Reply to Sender:**\n\n"Dear HR / Team,\n\nThank you for reaching out. In accordance with standard verification policy, please send this offer letter from your official company domain email address (e.g. @companyname.com) along with your registered office CIN number.\n\nPlease note that as per Ministry of Labour norms, I do not make upfront cash or UPI deposits for onboarding or equipment. Looking forward to your official domain email."`;
      } else if (lower.includes('simple')) {
        reply = `**Simple Plain English Explanation:**\n\n• If someone offers you a job or money without an interview, it's almost always a trick.\n• If they ask for even ₹500 to send a laptop or uniform, do not pay. Genuine companies pay you; you never pay them.\n• Never install files that end with '.apk' on your phone.`;
      } else {
        reply = `**Heuristic Assessment Synthesis:**\n\nBased on your submission, the primary danger points are upfront money requests and untrusted communication channels. Genuine organizations operating in India use registered corporate domain emails and never request UPI deposits for recruitment or equipment. We recommend requesting an official physical address and verifying company registration on the Ministry of Corporate Affairs (mca.gov.in) portal before sharing any personal documents.`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl h-[580px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                Verifai AI Assistant
                <span className="text-[10px] font-mono text-teal-700 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                  Trust Copilot
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">Context-aware scam analyzer & legal complaint drafter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick action chips */}
        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap bg-white dark:bg-slate-900">
          {quickActions.map((qa, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qa.prompt)}
              className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-300 hover:text-teal-800 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {qa.label}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-teal-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3.5 rounded-xl leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-teal-800 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                {msg.text}
                <div className={`mt-1 text-[9px] ${msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'} text-right`}>
                  {msg.timestamp}
                </div>
              </div>
              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Bot className="w-4 h-4 animate-spin text-teal-600" />
              <span>Analyzing fraud indicators...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question, request translation, or paste suspicious text..."
            className="flex-1 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-teal-700"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
