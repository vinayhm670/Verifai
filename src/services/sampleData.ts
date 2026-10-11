import { CheckerId, CommunityReport, QuizQuestion } from '../types';

export interface SampleCase {
  title: string;
  subtitle: string;
  companyOrIssuer: string;
  contactOrLink: string;
  statedAmountOrSalary: string;
  content: string;
  extraDetails?: Record<string, string>;
  expectedVerdict: 'high' | 'moderate' | 'low';
}

export const SAMPLE_CASES: Record<CheckerId, SampleCase[]> = {
  job: [
    {
      title: 'High Risk: Direct Selection with Laptop Deposit',
      subtitle: 'Classic fake corporate offer letter demanding equipment fee',
      companyOrIssuer: 'Global Tech Solution Services Pvt Ltd (Impersonated)',
      contactOrLink: 'hr.careers.globaltech@gmail.com | +91 98765 43210',
      statedAmountOrSalary: '₹8,50,000 per annum',
      content: `Congratulations! You have been selected for the position of Senior Data Associate without interview based on your profile review. Your starting salary is ₹70,000 per month with work from home. 

To dispatch your company Lenovo ThinkPad laptop and secure gate pass ID, kindly deposit a refundable security deposit of ₹9,500 via UPI within 2 hours. This amount will be reimbursed on your first salary day. Offer expires today at 5:00 PM if payment is not received.`,
      extraDetails: { interviewConducted: 'false' },
      expectedVerdict: 'high'
    },
    {
      title: 'Likely Genuine: Standard MNC Technical Interview Offer',
      subtitle: 'Official domain with formal technical evaluation record',
      companyOrIssuer: 'Infosys Limited (Recruitment Campus Team)',
      contactOrLink: 'careers@infosys.com | careers.infosys.com',
      statedAmountOrSalary: '₹4,25,000 per annum',
      content: `Dear Candidate, Following your performance in the technical assessment and virtual panel interview conducted on 14th March, we are pleased to extend an offer for the Systems Engineer role at Infosys. Please login to our official candidate portal at careers.infosys.com using your Candidate ID to view your comprehensive CTC breakdown. Note: Infosys never charges any fee at any stage of recruitment.`,
      extraDetails: { interviewConducted: 'true' },
      expectedVerdict: 'low'
    }
  ],
  internship: [
    {
      title: 'High Risk: ₹2,499 "Mandatory Registration" Internship',
      subtitle: 'Course sold deceptively as a paid internship',
      companyOrIssuer: 'Apex Innovations Academy',
      contactOrLink: 'internships@apexacademy.in | WhatsApp group link',
      statedAmountOrSalary: '₹15,000 stipend promised',
      content: `Offer Letter for Python AI Developer Internship. You are selected for 2 months remote internship with guaranteed placement. To confirm your slot and receive starter materials, pay ₹2,499 registration fee immediately. Instant certificate will be provided upon payment.`,
      expectedVerdict: 'high'
    },
    {
      title: 'Likely Genuine: Reputable Open Source or University Fellowship',
      subtitle: 'Zero fee, formal evaluation, stipend paid directly to student',
      companyOrIssuer: 'C-DAC / National Informatics Centre Project',
      contactOrLink: 'internship@cdac.in | cdac.in/careers',
      statedAmountOrSalary: '₹10,000 monthly stipend',
      content: `Subject: Research Intern Selection - Natural Language Processing. With reference to your interview held with our R&D committee, we confirm your selection as a Research Intern for 3 months. A monthly stipend of ₹10,000 will be credited directly to your bank account. No fees are applicable.`,
      expectedVerdict: 'low'
    }
  ],
  certificate: [
    {
      title: 'Suspicious Sample: Unaccredited Instant Certificate with Typo',
      subtitle: 'Noticeable font mismatch and missing accredited registry number',
      companyOrIssuer: 'National Skill Board of Technical Excellence (Unverified)',
      contactOrLink: 'verify-certificates-now.online',
      statedAmountOrSalary: 'N/A',
      content: `CERTIFICATE OF EXCELLENCE. This is to certify that Candidate completed Advanced Artificial Inteligence [spelled incorrectly] Course with 98% Grade on 12/10/2026. Verified by Autonomous Council. No National Academic Depository (NAD) or DigiLocker identifier present. Seal appears digitally overlaid with resolution distortion.`,
      expectedVerdict: 'high'
    },
    {
      title: 'Genuine Standard: NSDC / Skill India Digital Credential',
      subtitle: 'Has QR code and DigiLocker verifiable serial number',
      companyOrIssuer: 'National Skill Development Corporation (NSDC)',
      contactOrLink: 'skillindiadigital.gov.in',
      statedAmountOrSalary: 'N/A',
      content: `Skill India Digital Hub Certificate. Sector: Electronics & Hardware. QP Code: ELE/Q4601. Candidate ID: SID-2026-98124. DigiLocker Verifiable Document with cryptographic timestamp and authorized assessor signature.`,
      expectedVerdict: 'low'
    }
  ],
  coaching: [
    {
      title: 'High Risk: 100% Rank Guarantee & Confirmed NEET Seat',
      subtitle: 'Misleading consumer claim violating CCPA coaching regulations',
      companyOrIssuer: 'Super-Rankers Medical Institute',
      contactOrLink: 'superankers-medical-delhi.org | +91 88990 11223',
      statedAmountOrSalary: 'Course Fee ₹1,80,000',
      content: `100% GUARANTEED SELECTION OR FULL REFUND! Join our Super-30 NEET Dropper Batch and get confirmed government medical college seat in AIIMS or KGMU. All top 10 rankers from 2025 studied exclusively with us. Only 3 seats left today!`,
      expectedVerdict: 'high'
    },
    {
      title: 'Cautious / Compliant: Standard Test Prep with Disclaimers',
      subtitle: 'Transparent curriculum, no impossible rank guarantees',
      companyOrIssuer: 'Shiksha Test Preparation Academy',
      contactOrLink: 'support@shikshaprep.com',
      statedAmountOrSalary: 'Course Fee ₹24,000',
      content: `Comprehensive 6-month UGC NET Paper 1 coaching course. Includes 40 live lectures, chapter-wise test series, and past 10 years solved papers. Note: Selection depends strictly on individual student effort and examination cutoffs. Detailed refund policy available in terms of service.`,
      expectedVerdict: 'low'
    }
  ],
  overseas: [
    {
      title: 'High Risk: Dubai / Poland Job on Tourist Visa with Advance Fee',
      subtitle: 'Unregistered recruitment agent demanding passport handover',
      companyOrIssuer: 'Al-Farah Gulf Manpower Overseas (Unregistered Agent)',
      contactOrLink: '+91 91234 56789 | Hotel lobby walk-in interview',
      statedAmountOrSalary: 'AED 6,500 / month (Driver / Welder)',
      content: `Urgent requirement for Dubai Airport Cargo Handler. Salary 6,500 AED + free food and accommodation. No qualification needed. Advance visa processing fee ₹65,000 to be paid before medical test. Travel on 3-month Visit Visa; company will convert to Employment Visa in UAE after 1 month. Handover original passport today.`,
      extraDetails: { hasLicense: 'no' },
      expectedVerdict: 'high'
    },
    {
      title: 'Likely Genuine: Registered MEA Licensed Agent Offer',
      subtitle: 'Listed on eMigrate with valid Recruiting Agent (RA) license number',
      companyOrIssuer: 'Al-Hind Overseas Consultants (Govt Regd)',
      contactOrLink: 'License No: B-0482/KER/PER/1000+/5/8291/2018 | emigrate.gov.in',
      statedAmountOrSalary: 'SAR 3,200 / month',
      content: `Official requirement under Ministry of External Affairs eMigrate portal. Job: Certified Industrial Electrician for Saudi Aramco contractor. Candidate must hold valid trade test certificate. Employment Visa will be stamped in India before departure with Protector of Emigrants (PoE) clearance. Service fee strictly within MEA capped limits.`,
      extraDetails: { hasLicense: 'yes' },
      expectedVerdict: 'low'
    }
  ],
  exam: [
    {
      title: 'High Risk: Board Exam / State PSC Paper Leak Telegram Group',
      subtitle: 'Extortion scam promising question paper 12 hours before exam',
      companyOrIssuer: 'Anonymous Telegram Channel: "CONFIDENTIAL LEAK 2026"',
      contactOrLink: 't.me/exam_papers_leak_vip',
      statedAmountOrSalary: '₹4,000 per question paper',
      content: `100% Genuine Board Exam / SSC CGL Question Paper with solved answer key available 12 hours before morning exam shift. Send ₹4,000 to UPI ID examleak@paytm and receive secret PDF password. Do not miss this once-in-a-lifetime chance to top your district!`,
      expectedVerdict: 'high'
    },
    {
      title: 'Likely Genuine: Official National Testing Agency Public Notice',
      subtitle: 'Official .gov.in domain advisory warning students against frauds',
      companyOrIssuer: 'National Testing Agency (Govt of India)',
      contactOrLink: 'nta.ac.in | jeemain.nta.nic.in',
      statedAmountOrSalary: 'N/A',
      content: `Public Notice: Clarification regarding fake websites and impersonators claiming to sell examination question papers. Candidates are strictly advised to rely solely on official websites (nta.ac.in). NTA does not engage any private brokers or social media agents. Report cyber frauds immediately.`,
      expectedVerdict: 'low'
    }
  ],
  'link-phone-upi': [
    {
      title: 'High Risk: Reverse UPI PIN Scam / Electricity Bill Disconnection',
      subtitle: 'Fraudulent SMS threatening power cut unless APK is downloaded',
      companyOrIssuer: 'Fake Electricity Department (Impersonated)',
      contactOrLink: '+91 84920 19283 | bit.ly/power-bill-update',
      statedAmountOrSalary: 'Overdue bill ₹12',
      content: `Dear Consumer, Your electricity power supply will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Immediately call electricity officer on 8492019283 or update bill by downloading ElectricitySuvidha.apk via bit.ly/power-bill-update to enter UPI PIN and clear penalty.`,
      expectedVerdict: 'high'
    },
    {
      title: 'Likely Genuine: Bank Transaction Alert with Official Shortcode',
      subtitle: 'Standard RBI compliant transactional SMS from registered sender ID',
      companyOrIssuer: 'State Bank of India (SBI)',
      contactOrLink: 'Sender ID: VM-SBINB / onlinesbi.sbi',
      statedAmountOrSalary: 'Debit of ₹850',
      content: `Dear Customer, Your A/C ending with 4012 is debited by ₹850.00 on 12-Oct-26 by UPI/P2M/Swiggy. Total available balance is ₹14,290.40. If not done by you, forward this SMS to 9223008333 or call 1800111109 immediately to block UPI.`,
      expectedVerdict: 'low'
    }
  ],
  'photo-scan': [
    {
      title: 'Sample Image: Fake Offer Letter with Blurred Stamp',
      subtitle: 'Scanned document with conflicting typography and advance fee clause',
      companyOrIssuer: 'Tata Consultancy Services (Spoofed Header)',
      contactOrLink: 'tcs-recruitment-department@outlook.com',
      statedAmountOrSalary: '₹65,000 / month',
      content: `[OCR Extracted Text from Uploaded Image]
TCS Global Talent Acquisition Center
Candidate: Rohit Sharma
Position: Software Trainee (Direct Selection)
Notice: Candidate must deposit ₹7,500 security caution money towards company laptop insurance before onboarding date. Refundable on probation completion.`,
      expectedVerdict: 'high'
    },
    {
      title: 'Sample Image: Genuine Skill Certification from NIELIT',
      subtitle: 'Clear typography, QR verification link to official nielit.gov.in',
      companyOrIssuer: 'National Institute of Electronics & IT (NIELIT)',
      contactOrLink: 'nielit.gov.in/certificate',
      statedAmountOrSalary: 'N/A',
      content: `[OCR Extracted Text from Uploaded Image]
National Institute of Electronics and Information Technology (NIELIT)
Autonomous Scientific Society of MeitY, Government of India
Certificate of Course on Computer Concepts (CCC)
Roll No: 26091048
Verified via digital signature and QR verification URL: student.nielit.gov.in`,
      expectedVerdict: 'low'
    }
  ]
};

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-101',
    timestamp: '2026-10-09T14:20:00Z',
    category: 'Job Scam',
    entityName: 'CloudTech Solutions India',
    identifier: '+91 98450 12345 / hr-cloudtech@gmail.com',
    lossAmount: '₹8,500',
    description: 'Sent fake job offer for remote data typing. Asked for ₹8,500 laptop delivery insurance via UPI. Blocked on WhatsApp immediately after payment.',
    status: 'Verified Warning',
    upvotes: 42,
    locationCity: 'Bengaluru, Karnataka',
    reportedDate: '9 Oct 2026'
  },
  {
    id: 'rep-102',
    timestamp: '2026-10-08T09:15:00Z',
    category: 'Task / Telegram Scam',
    entityName: 'Amazon Product Review Task Channel',
    identifier: 't.me/amazon_rating_vip_india',
    lossAmount: '₹35,000',
    description: 'Offered ₹150 per Google review. After 5 tasks, asked to deposit ₹5,000 for "Prepaid Crypto Task". Funds showed on fake dashboard but withdrawal required more deposits.',
    status: 'Verified Warning',
    upvotes: 89,
    locationCity: 'Pune, Maharashtra',
    reportedDate: '8 Oct 2026'
  },
  {
    id: 'rep-103',
    timestamp: '2026-10-07T18:40:00Z',
    category: 'Overseas Job Agent',
    entityName: 'Royal Gulf Overseas Consultancy',
    identifier: 'shop-no-12, Karol Bagh, Delhi / +91 97110 99887',
    lossAmount: '₹75,000',
    description: 'Promised high-paying warehouse job in Poland. Collected ₹75,000 advance. Provided fake visa copy with misspelled Polish ministry letterhead. Agent not registered on eMigrate.',
    status: 'Verified Warning',
    upvotes: 64,
    locationCity: 'New Delhi',
    reportedDate: '7 Oct 2026'
  },
  {
    id: 'rep-104',
    timestamp: '2026-10-06T11:05:00Z',
    category: 'UPI / Phishing',
    entityName: 'Electricity Bill Disconnection SMS (BSES Impersonation)',
    identifier: 'quick-bill-pay.in / UPI: powerbill82@okhdfc',
    lossAmount: '₹14,200',
    description: 'Received SMS threatening power disconnection. Downloaded "BijliUpdate.apk" from link. App captured SMS OTP and debited savings account via UPI.',
    status: 'Verified Warning',
    upvotes: 112,
    locationCity: 'Jaipur, Rajasthan',
    reportedDate: '6 Oct 2026'
  },
  {
    id: 'rep-105',
    timestamp: '2026-10-05T16:30:00Z',
    category: 'Coaching / Course',
    entityName: 'Apex Medical Rankers Academy',
    identifier: 'neet-rankers-guaranteed.com',
    lossAmount: '₹50,000',
    description: 'Promised 100% government seat guarantee in NEET with "secret past question prediction". Refused refund when batch was cancelled without notice.',
    status: 'Community Report',
    upvotes: 27,
    locationCity: 'Kota, Rajasthan',
    reportedDate: '5 Oct 2026'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "A recruiter on Telegram says: 'You are selected for Amazon Work from Home. Just deposit ₹2,000 security money for ID card creation.' What should you do?",
    questionHindi: "टेलीग्राम पर एक रिक्रूटर कहता है: 'अमेज़ॅन वर्क फ्रॉम होम के लिए आपका चयन हुआ है। आईडी कार्ड के लिए केवल ₹2,000 सिक्योरिटी मनी जमा करें।' आपको क्या करना चाहिए?",
    scenarioContext: "Posing as top tier tech corporate",
    options: [
      "Pay immediately because ₹2,000 is small compared to a corporate salary",
      "Refuse and report; legitimate corporate employers never charge candidates for job offers",
      "Ask for a discount on the security deposit",
      "Pay half the amount first to test their credibility"
    ],
    optionsHindi: [
      "तुरंत भुगतान करें क्योंकि कॉर्पोरेट वेतन की तुलना में ₹2,000 बहुत कम है",
      "इनकार करें और रिपोर्ट करें; असली कंपनियां नौकरी के लिए कभी पैसे नहीं मांगतीं",
      "सिक्योरिटी मनी में छूट मांगें",
      "जांचने के लिए पहले आधा भुगतान करें"
    ],
    correctIndex: 1,
    explanation: "Genuine employers in India never charge candidates fees for interviews, identity badges, registration, or equipment.",
    explanationHindi: "भारत में कोई भी प्रतिष्ठित कंपनी या रिक्रूटर इंटरव्यू, आईडी कार्ड या लैपटॉप के नाम पर उम्मीदवारों से पैसे नहीं मांगते।"
  },
  {
    id: 2,
    question: "Someone sending you money on PhonePe or GPay tells you: 'Scan this QR code and enter your UPI PIN to receive ₹5,000 cashback.' What happens if you enter your PIN?",
    questionHindi: "कोई व्यक्ति फोनपे या गूगल-पे पर कहता है: '₹5,000 कैशबैक प्राप्त करने के लिए यह क्यूआर कोड स्कैन करें और अपना यूपीआई पिन दर्ज करें।' यदि आप पिन दर्ज करते हैं तो क्या होगा?",
    scenarioContext: "UPI reverse cashback scam",
    options: [
      "You will receive ₹5,000 directly into your bank account",
      "Money will be deducted from your bank account because UPI PIN is only used for sending/paying money",
      "Your bank will ask for OTP confirmation first",
      "The transaction will automatically be cancelled"
    ],
    optionsHindi: [
      "आपके बैंक खाते में सीधे ₹5,000 आ जाएंगे",
      "आपके खाते से पैसे कट जाएंगे क्योंकि यूपीआई पिन केवल पैसे भेजने/काटने के लिए होता है",
      "बैंक पहले ओटीपी पुष्टि मांगेगा",
      "लेनदेन अपने आप रद्द हो जाएगा"
    ],
    correctIndex: 1,
    explanation: "Entering a UPI PIN ALWAYS authorizes a debit (payment out) of your account. You NEVER need to enter your PIN to receive money.",
    explanationHindi: "UPI पिन दर्ज करने का मतलब हमेशा आपके खाते से पैसे कटना होता है। पैसे प्राप्त करने के लिए कभी भी पिन की आवश्यकता नहीं होती।"
  },
  {
    id: 3,
    question: "You want to work as an electrician or driver in the UAE or Saudi Arabia. An agent asks for ₹80,000 and says: 'Travel on a 3-month Visit Visa, we will convert it to a Work Visa there.' Is this legal?",
    questionHindi: "आप संयुक्त अरब अमीरात या सऊदी अरब में नौकरी करना चाहते हैं। एक एजेंट ₹80,000 मांगता है और कहता है: 'विज़िट वीज़ा पर जाओ, वहां वर्क वीज़ा में बदल देंगे।' क्या यह कानूनी है?",
    scenarioContext: "Overseas migrant worker recruitment",
    options: [
      "Yes, it is common practice and completely safe",
      "No, working on a tourist/visit visa is illegal; you must only travel with an Employment Visa and check MEA eMigrate registration",
      "Yes, provided they give a stamped receipt",
      "Yes, if you buy return flight tickets yourself"
    ],
    optionsHindi: [
      "हाँ, यह एक आम तरीका है और पूरी तरह सुरक्षित है",
      "नहीं, विज़िट वीज़ा पर काम करना गैरकानूनी है; हमेशा एम्प्लॉयमेंट वीज़ा और eMigrate पंजीकृत एजेंट से ही जाएं",
      "हाँ, बशर्ते वे पक्की रसीद दें",
      "हाँ, यदि वापसी का टिकट आपके पास हो"
    ],
    correctIndex: 1,
    explanation: "Under the Emigration Act, working abroad on a visit visa is illegal and puts workers at grave risk of deportation, arrest, or wage theft.",
    explanationHindi: "विदेश में टूरिस्ट/विज़िट वीज़ा पर काम करना अवैध है। हमेशा भारत सरकार के विदेश मंत्रालय (eMigrate) से पंजीकृत एजेंट और रोजगार वीज़ा लेकर ही जाएं।"
  },
  {
    id: 4,
    question: "You receive an SMS: 'Electricity power will be disconnected at 9:30 PM due to unpaid bill. Download BijliUpdate.apk to pay.' What is the danger?",
    questionHindi: "आपको एक एसएमएस मिलता है: 'बिल बकाया होने के कारण आज रात 9:30 बजे बिजली काट दी जाएगी। BijliUpdate.apk डाउनलोड करके भुगतान करें।' इसमें क्या खतरा है?",
    scenarioContext: "Malicious APK cyber scam",
    options: [
      "The APK is a harmless utility tool",
      "The APK is likely malware that reads your SMS OTPs and steals your banking credentials",
      "It will only speed up the bill payment process",
      "It only works on non-Android devices"
    ],
    optionsHindi: [
      "एपीके एक सुरक्षित टूल है",
      "यह एपीके एक मैलवेयर/वायरस हो सकता है जो आपके ओटीपी पढ़कर बैंक खाता खाली कर सकता है",
      "यह केवल बिल भुगतान को तेज करता है",
      "यह सिर्फ कंप्यूटर पर काम करता है"
    ],
    correctIndex: 1,
    explanation: "Electricity boards never distribute unofficial .apk files via SMS or WhatsApp. APK downloads from untrusted links contain spyware and banking trojans.",
    explanationHindi: "बिजली बोर्ड कभी भी एसएमएस के जरिए अज्ञात .apk फाइलें नहीं भेजते। ऐसी फाइलें बैंक पासवर्ड और ओटीपी चुराने वाला वायरस होती हैं।"
  },
  {
    id: 5,
    question: "If financial cyber fraud happens and you lose money, which official government toll-free helpline number should you dial immediately?",
    questionHindi: "यदि आपके साथ कोई वित्तीय साइबर धोखाधड़ी हो जाती है और पैसे कट जाते हैं, तो आपको तुरंत किस सरकारी हेल्पलाइन नंबर पर कॉल करना चाहिए?",
    scenarioContext: "Indian National Cyber Crime emergency protocol",
    options: [
      "100",
      "1930",
      "1098",
      "139"
    ],
    optionsHindi: [
      "100",
      "1930",
      "1098",
      "139"
    ],
    correctIndex: 1,
    explanation: "1930 is India's National Cyber Crime Financial Fraud Helpline (operating alongside cybercrime.gov.in) to rapidly freeze fraudulent debits.",
    explanationHindi: "1930 भारत की राष्ट्रीय साइबर वित्तीय धोखाधड़ी हेल्पलाइन है। तुरंत कॉल करने से फ्रॉड वाले बैंक खाते को फ्रीज कराया जा सकता है।"
  }
];
