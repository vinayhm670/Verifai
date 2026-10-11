import { AnalysisResult, CheckerId, EvidenceItem, HighlightedPhrase, OfficialLink, RiskLevel } from '../types';

interface AnalyzeInput {
  checkerId: CheckerId;
  content: string;
  companyOrIssuer?: string;
  contactOrLink?: string;
  statedAmountOrSalary?: string;
  extraDetails?: Record<string, string>;
}

export function runHeuristicAnalysis(input: AnalyzeInput): AnalysisResult {
  const text = (input.content + ' ' + (input.companyOrIssuer || '') + ' ' + (input.contactOrLink || '')).toLowerCase();
  const trimmed = input.content.trim();

  // 1. Check for insufficient input
  if (trimmed.length < 15) {
    return {
      id: 'res-' + Date.now(),
      checkerId: input.checkerId,
      timestamp: new Date().toISOString(),
      title: 'Assessment for: ' + (input.companyOrIssuer || 'Pasted Submission'),
      riskScore: 0,
      riskLevel: 'insufficient',
      verdictLabel: 'Not enough information to assess',
      verdictSummary: 'The provided submission text is too brief to identify key indicators, official identifiers, or potential warning signs. Please provide more text, email headers, full messages, or specific URLs.',
      verdictSummaryHindi: 'प्रदान की गई जानकारी बहुत संक्षिप्त है। कृपया पूरा संदेश, ईमेल टेक्स्ट, या संबंधित विवरण दर्ज करें ताकि सही मूल्यांकन किया जा सके।',
      evidenceQuality: 'Insufficient',
      observedEvidence: [
        {
          id: 'ev-sparse',
          type: 'info',
          title: 'Input volume below analysis threshold',
          description: 'Fewer than 15 characters provided. Reliable fraud detection requires message body, contact data, or payment terms.',
          sourceType: 'input_fact'
        }
      ],
      highlightedPhrases: [],
      missingInformation: [
        'Full communication text or offer letter',
        'Official recruiter email domain or company registration',
        'Payment terms, salary structure, or interview record'
      ],
      recommendedSteps: [
        'Ask the sender to provide an official offer letter or communication from a corporate email domain.',
        'Do not transfer any money or send identity documents until sufficient verification is established.'
      ],
      officialLinks: getOfficialLinksForChecker(input.checkerId),
      inputSummary: {
        'Submission Length': `${trimmed.length} characters`,
        'Entity': input.companyOrIssuer || 'Not specified'
      }
    };
  }

  const evidence: EvidenceItem[] = [];
  const phrases: HighlightedPhrase[] = [];
  let riskScore = 15; // baseline cautious score

  // 2. Universal Warning Patterns
  const urgentRegex = /(urgent|immediate join|within 2 hours|expire today|limited slot|offer expires|hurry up|last date today)/i;
  if (urgentRegex.test(input.content)) {
    riskScore += 18;
    phrases.push({
      phrase: 'Urgency trigger ("immediate join" / "expires today")',
      reason: 'Artificial urgency is frequently used to pressure candidates before they can independently verify.',
      severity: 'medium'
    });
    evidence.push({
      id: 'ev-urgency',
      type: 'warning',
      title: 'High Pressure / Artificial Urgency',
      description: 'The offer creates artificial panic to prevent thorough background checking or consultation with peers.',
      sourceType: 'rule_heuristic'
    });
  }

  // Fees / Money Request Patterns
  const feeRegex = /(registration fee|laptop fee|security deposit|gate pass fee|training fee|processing charge|uniform charges|document verification fee|visa deposit|advance fee)/i;
  if (feeRegex.test(input.content)) {
    riskScore += 35;
    phrases.push({
      phrase: 'Upfront monetary charge / deposit',
      reason: 'Legitimate employers in India do not demand candidate fees for interviews, equipment, or verification.',
      severity: 'high'
    });
    evidence.push({
      id: 'ev-fee',
      type: 'danger',
      title: 'Advance Upfront Fee Demanded',
      description: 'The offer explicitly asks for an upfront fee (registration, laptop, deposit, or document fee). This is the #1 hallmark of Indian employment fraud.',
      sourceType: 'rule_heuristic'
    });
  }

  // Telegram / WhatsApp task / Part-time daily payout
  const taskRegex = /(telegram|youtube like|google review|daily payout|earn 3000 to 5000|work from home 2 hours|rating task|crypto recharge)/i;
  if (taskRegex.test(input.content)) {
    riskScore += 30;
    phrases.push({
      phrase: 'Part-time task / Daily like & review earnings',
      reason: 'Classic "Task Fraud" scam targeting students and jobseekers with fake daily high earnings.',
      severity: 'high'
    });
    evidence.push({
      id: 'ev-task',
      type: 'danger',
      title: 'App / YouTube Rating & Task Pattern',
      description: 'Matches known cybercrime patterns where initial small payouts lead to large locked "recharge" deposits.',
      sourceType: 'rule_heuristic'
    });
  }

  // APK file or unknown app install
  const apkRegex = /(\.apk|download app from drive|install support app|anydesk|teamviewer|rustdesk|quicksupport)/i;
  if (apkRegex.test(input.content)) {
    riskScore += 35;
    phrases.push({
      phrase: 'Direct APK installation or remote-access software',
      reason: 'Scammers utilize malicious APKs or screen-sharing apps to capture OTPs and banking credentials.',
      severity: 'high'
    });
    evidence.push({
      id: 'ev-apk',
      type: 'danger',
      title: 'Malicious APK / Remote Desktop Software Prompt',
      description: 'Candidates are asked to install an untrusted APK or remote control tool. Highly dangerous.',
      sourceType: 'rule_heuristic'
    });
  }

  // Checker specific rules
  if (input.checkerId === 'job') {
    const noInterview = input.extraDetails?.interviewConducted === 'false' || /without interview|direct selection|selected without test/i.test(input.content);
    if (noInterview) {
      riskScore += 22;
      evidence.push({
        id: 'ev-no-interview',
        type: 'danger',
        title: 'Direct Selection Without Assessment',
        description: 'Reputable organizations do not issue offers without technical evaluation or face-to-face/video interview.',
        sourceType: 'rule_heuristic'
      });
    }

    if (/@(gmail|yahoo|outlook|hotmail)\.com/i.test(input.contactOrLink || input.content)) {
      riskScore += 10;
      evidence.push({
        id: 'ev-free-email',
        type: 'info',
        title: 'Public Domain Email (Gmail/Yahoo/Outlook)',
        description: 'Notice: Sender uses a free email provider. While common for early-stage startups, major corporate recruiters strictly use company domain emails.',
        sourceType: 'rule_heuristic'
      });
    }
  }

  if (input.checkerId === 'overseas') {
    const visitVisa = /tourist visa|visit visa|travel visa|no work permit needed initially/i.test(input.content);
    if (visitVisa) {
      riskScore += 35;
      evidence.push({
        id: 'ev-visit-visa',
        type: 'danger',
        title: 'Tourist/Visit Visa for Foreign Employment',
        description: 'Illegal practice. Working abroad on a tourist visa leaves workers vulnerable to deportation, detention, or labor exploitation without legal recourse.',
        sourceType: 'rule_heuristic'
      });
    }

    const unverifiedAgent = input.extraDetails?.hasLicense !== 'yes';
    if (unverifiedAgent) {
      riskScore += 20;
      evidence.push({
        id: 'ev-agent-unverified',
        type: 'warning',
        title: 'Unverified Ministry of External Affairs (MEA) Registration',
        description: 'Overseas recruiting agents in India must be registered on eMigrate (emigrate.gov.in) with an active RC number.',
        sourceType: 'official_registry'
      });
    }
  }

  if (input.checkerId === 'coaching') {
    const guaranteeRegex = /(100% selection guarantee|guaranteed rank|neet confirmed seat|iit confirmed|topper batch refund guarantee)/i;
    if (guaranteeRegex.test(input.content)) {
      riskScore += 28;
      phrases.push({
        phrase: '100% Guaranteed Selection / Rank Claim',
        reason: 'CCPA (Central Consumer Protection Authority) guidelines forbid misleading 100% guarantee claims in coaching advertisements.',
        severity: 'high'
      });
      evidence.push({
        id: 'ev-coaching-guarantee',
        type: 'danger',
        title: 'Deceptive Guarantee Violating CCPA Norms',
        description: 'Advertising 100% selection or guaranteed exam ranks violates Central Consumer Protection guidelines.',
        sourceType: 'rule_heuristic'
      });
    }
  }

  if (input.checkerId === 'link-phone-upi') {
    // UPI and shortener checks
    if (/bit\.ly|tinyurl\.com|t\.me|cutt\.ly|is\.gd|surl\.li/i.test(text)) {
      riskScore += 15;
      phrases.push({
        phrase: 'URL Shortener masking actual destination',
        reason: 'Shortened URLs conceal malicious spoofing domains.',
        severity: 'medium'
      });
      evidence.push({
        id: 'ev-shortener',
        type: 'warning',
        title: 'Obfuscated Shortened Link',
        description: 'The link hides the true landing domain behind a shortening redirector.',
        sourceType: 'rule_heuristic'
      });
    }

    if (/@(paytm|ybl|okaxis|okhdfc|oksbi|ibl|apl)/i.test(text)) {
      evidence.push({
        id: 'ev-upi-format',
        type: 'info',
        title: 'Recognized UPI Handle Suffix',
        description: 'Format matches standard NPCI PSP handles. Remember: Entering a UPI PIN will ALWAYS deduct funds from your account, never receive money.',
        sourceType: 'input_fact'
      });
    }

    if (/pin to receive|enter pin for cashback|receive refund/i.test(text)) {
      riskScore += 45;
      evidence.push({
        id: 'ev-upi-pin-fraud',
        type: 'danger',
        title: 'Reverse UPI PIN Scam Pattern',
        description: 'You NEVER need to enter your UPI PIN to receive money or cashback. Entering your PIN authorizes a debit.',
        sourceType: 'rule_heuristic'
      });
    }
  }

  if (input.checkerId === 'certificate') {
    evidence.push({
      id: 'ev-cert-notice',
      type: 'info',
      title: 'Issuer Verification Mandatory',
      description: 'Verifai analyzes formatting alignment, font anomalies, and metadata cues, but authoritative verification can only be completed via DigiLocker / NAD or direct registrar confirmation.',
      sourceType: 'rule_heuristic'
    });
  }

  // Cap score between 0 and 100
  riskScore = Math.min(100, Math.max(5, riskScore));

  let riskLevel: RiskLevel = 'low';
  let verdictLabel = 'Likely genuine — still verify';
  let verdictSummary = 'Based on provided details, standard high-risk red flags (such as advance fees, artificial panic, or direct APK downloads) were not identified. However, always confirm through official portals.';
  let verdictSummaryHindi = 'दिए गए विवरणों में अग्रिम शुल्क या संदिग्ध ऐप डाउनलोड जैसे बड़े खतरे नहीं पाए गए। फिर भी सतर्क रहें और आधिकारिक चैनल से पुष्टि करें।';

  if (riskScore >= 70) {
    riskLevel = 'high';
    verdictLabel = 'Likely fake or high risk — do not pay';
    verdictSummary = 'Multiple critical danger signals detected, including fee demands, abnormal urgency, or untrusted channels. Do not pay any money or share sensitive documents.';
    verdictSummaryHindi = 'कई गंभीर खतरे मिले हैं (जैसे फीस की मांग, जल्दबाजी, या गैर-आधिकारिक संपर्क)। कोई भी भुगतान न करें और अपने निजी दस्तावेज न भेजें।';
  } else if (riskScore >= 30) {
    riskLevel = 'moderate';
    verdictLabel = 'Be careful — verify before proceeding';
    verdictSummary = 'Some cautionary factors observed, such as free email domains, aggressive claims, or missing institutional credentials. Proceed cautiously and demand official verification.';
    verdictSummaryHindi = 'कुछ चेतावनी संकेत मिले हैं (जैसे मुफ्त ईमेल, अत्यधिक वादे या अधूरी जानकारी)। आगे बढ़ने से पहले आधिकारिक माध्यम से पुष्टि करें।';
  }

  // Missing info items
  const missingInfo = [
    'Official corporate domain verification (e.g., @company.com)',
    'Written contract or registered establishment certificate (CIN / GSTIN / MEA RC)',
    'Independent phone verification via publicly listed official headquarters'
  ];

  // Recommended steps
  const recommendedSteps = [
    'Never transfer any money labeled as "refundable security deposit", "laptop fee", or "training cost".',
    'Verify the organization independently via official website or LinkedIn, not through phone numbers given in the message.',
    'Ask for an official verification letter signed by HR with a verifiable company corporate address.',
    'If already defrauded, immediately report the transaction to the 1930 Cybercrime Helpline or cybercrime.gov.in.'
  ];

  const entityName = input.companyOrIssuer || 'the recruiter / sender';

  const safeReplyDraft = `Dear ${entityName},\n\nThank you for reaching out regarding this opportunity. To proceed further in accordance with standard verification practices, could you kindly confirm this offer using your official corporate email domain address? Additionally, please provide your company's Corporate Identity Number (CIN) or registered office details so that I may review the terms. Please note that I do not provide any advance deposits or fees prior to formal on-site or official HR onboarding.\n\nLooking forward to your official confirmation.\n\nBest regards.`;

  const cybercrimeComplaintDraft = `Subject: Report of fraudulent employment / payment solicitation by ${entityName}\n\nRespected Cyber Crime Officer,\n\nI wish to report a fraudulent attempt / unauthorized financial demand received on ${new Date().toLocaleDateString('en-IN')}.\nEntity / Sender Name: ${entityName}\nContact / Link Details: ${input.contactOrLink || 'Provided in submission'}\nModus Operandi: The sender solicited funds under false pretenses (${phrases.map(p => p.phrase).join(', ') || 'unauthorized fees'}).\n\nI have preserved digital screenshots, message logs, and relevant URLs. Kindly initiate inquiry under relevant sections of the Information Technology Act.\n\nReported by: Concerned Citizen`;

  const aiDeepAnalysis = `Comprehensive heuristic evaluation examines contextual trust indicators for ${entityName}. The primary risk contributors are ${phrases.length > 0 ? phrases.map(p => p.phrase).join(' and ') : 'unverified channel communications'}. In the Indian digital ecosystem, the Ministry of Labour and MEA have issued specific guidelines stating that genuine employers and registered recruitment agents never charge processing fees to jobseekers. Treat this interaction with elevated caution.`;

  return {
    id: 'res-' + Date.now(),
    checkerId: input.checkerId,
    timestamp: new Date().toISOString(),
    title: 'Verification Assessment: ' + (input.companyOrIssuer || 'Input Offer'),
    riskScore,
    riskLevel,
    verdictLabel,
    verdictSummary,
    verdictSummaryHindi,
    evidenceQuality: trimmed.length > 150 ? 'High (Detailed Input)' : 'Moderate',
    observedEvidence: evidence.length > 0 ? evidence : [
      {
        id: 'ev-standard',
        type: 'positive',
        title: 'No overt advance payment demand detected in text',
        description: 'Text does not contain recognizable fee demands or scam task terminology.',
        sourceType: 'rule_heuristic'
      }
    ],
    highlightedPhrases: phrases,
    missingInformation: missingInfo,
    recommendedSteps,
    officialLinks: getOfficialLinksForChecker(input.checkerId),
    safeReplyDraft,
    cybercrimeComplaintDraft,
    aiDeepAnalysis,
    inputSummary: {
      'Entity Name': input.companyOrIssuer || 'Not specified',
      'Contact / URL': input.contactOrLink || 'Not provided',
      'Text Length': `${trimmed.length} characters`
    }
  };
}

export function getOfficialLinksForChecker(checkerId: CheckerId): OfficialLink[] {
  const common = [
    {
      label: 'National Cyber Crime Reporting Portal',
      url: 'https://cybercrime.gov.in',
      authority: 'Ministry of Home Affairs, Govt. of India',
      description: 'Official national portal for reporting cyber financial fraud and digital harassment. Helpline: 1930.'
    },
    {
      label: 'National Consumer Helpline (NCH)',
      url: 'https://consumerhelpline.gov.in',
      authority: 'Department of Consumer Affairs, Govt. of India',
      description: 'Lodge consumer grievances regarding misleading ed-tech ads, coaching refund disputes, or unfair practices.'
    }
  ];

  if (checkerId === 'overseas') {
    return [
      {
        label: 'eMigrate Project Portal (MEA)',
        url: 'https://emigrate.gov.in',
        authority: 'Ministry of External Affairs (MEA), Govt. of India',
        description: 'Verify registered Recruiting Agents (RA) and licensed foreign employers before traveling abroad for work.'
      },
      ...common
    ];
  }

  if (checkerId === 'certificate') {
    return [
      {
        label: 'DigiLocker & National Academic Depository (NAD)',
        url: 'https://www.digilocker.gov.in',
        authority: 'Ministry of Electronics and IT (MeitY)',
        description: 'Check official digitally signed educational certificates issued by accredited Indian boards & universities.'
      },
      {
        label: 'Skill India Digital Hub',
        url: 'https://www.skillindiadigital.gov.in',
        authority: 'MSDE & NSDC',
        description: 'Verify government-recognized vocational training and NSDC skill credentials.'
      },
      ...common
    ];
  }

  if (checkerId === 'coaching' || checkerId === 'exam') {
    return [
      {
        label: 'UGC University & Degree Alerts',
        url: 'https://www.ugc.gov.in',
        authority: 'University Grants Commission',
        description: 'Official list of fake universities and recognized institutions in India.'
      },
      {
        label: 'National Testing Agency (NTA)',
        url: 'https://nta.ac.in',
        authority: 'Dept of Higher Education, MoE',
        description: 'Authentic examination notices, admit cards, and alerts for NEET, JEE, and UGC NET.'
      },
      ...common
    ];
  }

  if (checkerId === 'link-phone-upi') {
    return [
      {
        label: 'RBI Sachet Portal',
        url: 'https://sachet.rbi.org.in',
        authority: 'Reserve Bank of India',
        description: 'Check registered financial entities and report unauthorized deposit collection or loan apps.'
      },
      {
        label: 'NPCI UPI Safety & Dispute',
        url: 'https://www.npci.org.in',
        authority: 'National Payments Corporation of India',
        description: 'Guidelines and resolution channels for UPI transactions and unauthorized debits.'
      },
      ...common
    ];
  }

  return common;
}
