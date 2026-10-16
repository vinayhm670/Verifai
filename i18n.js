/**
 * VERIFAI — Internationalization & Translation Dictionary
 * Supported Languages: English (en), Hindi (hi), Spanish (es), French (fr)
 */

const VERIFAI_I18N = {
  en: {
    // Brand & Meta
    brand_name: "VERIFAI",
    tagline_primary: "Verify Before You Trust.",
    tagline_secondary: "Every Credential. Every Opportunity. Verified with VERIFAI.",
    demo_badge: "Demonstration System",
    demo_notice: "Locally registered client-side demonstration data. Not an official issuer endorsement.",

    // Navigation
    nav_home: "Home",
    nav_verify: "Verify Credential",
    nav_issuer: "Issuer Portal",
    nav_forensics: "Doc Forensics",
    nav_fraud: "Fraud Prevention",
    nav_calculator: "Risk Calculator",
    nav_how: "How It Works",
    nav_verify_btn: "Verify Now",

    // Hero Section
    hero_badge: "Universal Digital Identity & Credential Protection",
    hero_title: "Verify Every Credential. Protect Every Opportunity.",
    hero_subtitle: "Check certificates, internship letters, and job offers before making critical decisions. Identify suspicious documents, detect revoked credentials, and make safer career choices with VERIFAI.",
    hero_input_placeholder: "Enter Credential ID (e.g. VF-CERT-2024-9102)",
    hero_btn_verify: "Verify Credential",
    hero_btn_scan: "Scan QR Code",
    hero_samples_title: "Quick Test Demonstration Credentials",
    hero_sample_cert_title: "Genuine Certificate",
    hero_sample_cert_desc: "Google Cloud & AI Academy — Rahul Sharma",
    hero_sample_int_title: "Genuine Internship",
    hero_sample_int_desc: "TCS Software Engineering — Sneha Patel",
    hero_sample_off_title: "Genuine Job Offer",
    hero_sample_off_desc: "Microsoft India Cloud Dev — Ananya Deshmukh",
    hero_sample_fraud_title: "Flagged Fraud Record",
    hero_sample_fraud_desc: "Suspicious Telegram recruiter payment scam",

    // Verification Portal
    verify_title: "Universal Verification Portal",
    verify_subtitle: "Instant lookup against the client-side demonstration registry with cryptographic SHA-256 validation.",
    verify_paste_btn: "Paste",
    verify_clear_btn: "Clear",
    verify_btn: "Verify Credential",
    verify_loading: "Querying verification registry & computing hash...",
    
    // Result Card - Verified
    res_verified_title: "Demonstration Record Matched",
    res_verified_scope: "Record matched in the local VERIFAI demonstration registry. Issuer identity has not been independently authenticated.",
    res_recipient: "Recipient Name",
    res_issuer: "Claimed Issuer",
    res_domain: "Issuer Domain",
    res_type: "Credential Type",
    res_designation: "Role / Program",
    res_issue_date: "Issue Date",
    res_validity: "Validity / Expiry",
    res_signatory: "Authorized Signatory",
    res_credential_id: "Credential ID",
    res_sha256: "Canonical SHA-256 Digest",
    res_qr_status: "QR Code Status",
    res_qr_valid: "Valid VERIFAI Payload",
    res_registered_on: "Registered On",
    res_preview_doc: "View Printable Document",
    res_copy_id: "Copy Credential ID",

    // Result Card - Revoked / Fraud
    res_revoked_title: "ALERT: Credential Revoked / Flagged Fraud",
    res_revoked_warning: "This demonstration record has been flagged for suspicious payment requests and possible issuer impersonation. Do not pay recruitment fees or share sensitive personal information.",
    res_revocation_reason: "Reason for Revocation",
    res_revocation_date: "Revocation Date",
    res_suspicious_flags: "Observed Suspicious Indicators",
    res_action_report: "Report This Offer",
    res_action_calc: "Test in Risk Calculator",

    // Result Card - Not Found
    res_notfound_title: "No Matching Credential Found",
    res_notfound_desc: "No matching credential was found in the current registry for the entered ID. A missing record is not conclusive proof of fraud, but requires extra caution.",
    res_notfound_advice_title: "Recommended Verification Steps:",
    res_notfound_step1: "Double-check the Credential ID format (e.g., VF-CERT-2024-9102).",
    res_notfound_step2: "Independently contact the claimed organization through its official corporate website.",
    res_notfound_step3: "Never send money, security deposits, or bank OTPs to receive a job or stipend.",
    res_notfound_retry: "Try Another ID",

    // Document Forensics
    forensics_title: "Document Forensics & File Inspection",
    forensics_subtitle: "Upload a PDF or image file (PNG, JPG, WebP) to inspect for embedded credential IDs, QR codes, suspicious recruiter emails, and payment scam indicators.",
    forensics_drag_text: "Drag and drop your certificate or offer letter here",
    forensics_browse_btn: "Or Browse File",
    forensics_supported: "Supported formats: PDF, PNG, JPG, WebP (Max: 10MB)",
    forensics_scanning: "Analyzing document structure, extracting text, and checking fraud heuristics...",
    forensics_report_title: "Forensic Analysis Report",
    forensics_file_name: "File Name",
    forensics_file_size: "File Size",
    forensics_risk_level: "Assessed Risk Level",
    forensics_findings_title: "Inspection Findings",
    forensics_btn_export: "Export Report (JSON)",
    forensics_btn_print: "Print Report",
    forensics_disclaimer: "Disclaimer: Automated document inspection identifies possible inconsistencies. It cannot independently establish authenticity or conclusively prove fraud.",

    // Issuer Portal
    issuer_title: "Issuer Demonstration Portal",
    issuer_subtitle: "Register verifiable digital credentials, generate cryptographic SHA-256 digests, produce QR codes, and manage the demonstration registry.",
    issuer_tab_create: "Create Credential",
    issuer_tab_registry: "Registry Management",
    issuer_tab_history: "Audit Log",
    issuer_tab_io: "Import / Export",
    
    // Create Credential Form
    form_cred_type: "Credential Type",
    form_type_cert: "Certificate of Completion",
    form_type_int: "Internship Completion Letter",
    form_type_off: "Official Job Offer Letter",
    form_recipient: "Recipient Full Name",
    form_issuer: "Issuing Organization",
    form_domain: "Organization Domain (e.g. google.com)",
    form_designation: "Course / Role / Designation",
    form_issue_date: "Issue Date",
    form_expiry_date: "Expiration / Validity Date",
    form_signatory_name: "Authorized Signatory Name",
    form_signatory_title: "Signatory Title",
    form_description: "Credential Description",
    form_course_name: "Course Title",
    form_grade: "Grade / Score (e.g. Grade A, 94%)",
    form_comp_date: "Completion Date",
    form_int_role: "Internship Role",
    form_department: "Department",
    form_int_start: "Start Date",
    form_int_end: "End Date",
    form_rating: "Performance Rating",
    form_job_title: "Job Title",
    form_location: "Work Location / Mode",
    form_ctc: "Compensation Package / CTC",
    form_join_date: "Joining Date",
    form_offer_expiry: "Offer Acceptance Deadline",
    form_btn_submit: "Register & Generate Credential",
    form_btn_reset: "Reset Form",

    // Registry Management
    reg_search_placeholder: "Search by recipient, issuer, or credential ID...",
    reg_filter_type_all: "All Types",
    reg_filter_status_all: "All Statuses",
    reg_status_verified: "Verified",
    reg_status_revoked: "Revoked / Flagged",
    reg_col_id: "Credential ID",
    reg_col_recipient: "Recipient",
    reg_col_issuer: "Issuer",
    reg_col_type: "Type",
    reg_col_date: "Issue Date",
    reg_col_status: "Status",
    reg_col_actions: "Actions",
    reg_action_view: "Verify",
    reg_action_print: "Preview",
    reg_action_revoke: "Revoke",
    reg_action_reinstate: "Reinstate",
    reg_action_delete: "Delete",
    reg_empty: "No credentials match your filter criteria.",
    reg_btn_reset_defaults: "Reset to Default Demo Data",

    // Fraud Prevention Center
    fraud_title: "Fraud Prevention & Scam Awareness Center",
    fraud_subtitle: "Protect yourself from forged documents, payment scams, and corporate impersonation.",
    scam1_title: "Unofficial & Lookalike Email Domains",
    scam1_desc: "Scammers often use free webmail accounts (@gmail.com, @outlook.com) or deceptive domains like company-careers-hr.com to impersonate authentic recruiters.",
    scam1_tip: "Always check the domain header, verify independently on the official careers page, and never accept hiring from personal email addresses.",
    scam2_title: "Recruitment Payment & Deposit Demands",
    scam2_desc: "Any request for 'laptop security deposits', 'interview processing charges', 'mandatory training fees', or 'stipend release bonds' is a classic hallmark of recruitment fraud.",
    scam2_tip: "Legitimate organizations never ask job seekers or interns to pay money upfront to secure an offer or receive their stipend.",
    scam3_title: "Forged QR Codes & Fake Verifications",
    scam3_desc: "Scammers attach generic QR codes that link to fake Google Forms, unofficial websites, or static images mimicking corporate approval seals.",
    scam3_tip: "Always decode the QR code and ensure the destination is an authentic verification portal matching canonical registry records.",
    scam4_title: "Phantom Hiring & Unrealistic Packages",
    scam4_desc: "Offers extended without credible interviews, offering absurdly high compensation packages for freshers with urgent 24-hour acceptance ultimatums.",
    scam4_tip: "Reputable companies follow structured multi-stage assessments. Never rush into signing or paying due to artificial urgency.",

    // Risk Calculator
    calc_title: "Offer Letter Risk Calculator",
    calc_subtitle: "Evaluate suspicious employment or internship offers using our weighted fraud-risk heuristic algorithm.",
    calc_score_label: "Calculated Heuristic Risk Score",
    calc_level_low: "Lower Apparent Risk (0–24)",
    calc_level_moderate: "Moderate Risk (25–49)",
    calc_level_high: "High Risk of Fraud (50–100)",
    calc_disclaimer: "This score is a heuristic warning indicator, not a statistically validated probability of fraud.",
    calc_btn_reset: "Reset Calculator",

    // Risk Checklist Items
    calc_q1: "The recruiter requests a security deposit, laptop charge, or training fee upfront.",
    calc_q2: "The offer originated from a public webmail address (e.g., @gmail.com) or lookalike domain.",
    calc_q3: "The claimed employer or organization cannot be verified on legitimate corporate registries.",
    calc_q4: "The recruiter enforces an aggressive deadline (e.g. 'accept within 24 hours or lose job').",
    calc_q5: "The salary or stipend package is implausibly high for the required experience level.",
    calc_q6: "The offer letter lacks verifiable physical office contact information or corporate landlines.",
    calc_q7: "The QR code or credential ID does not resolve in the official verification registry.",
    calc_q8: "The recruiter demands bank passwords, OTPs, or credit card details for 'onboarding'.",
    calc_q9: "The document exhibits conflicting recipient names, typo-ridden text, or distorted logos.",
    calc_q10: "The recruiter communicates strictly through Telegram, WhatsApp, or unregistered channels.",

    // AI Assistant
    ai_name: "VERIFAI AI Assistant",
    ai_status: "Online • Trust & Verification Guide",
    ai_placeholder: "Ask about verification, scam indicators, or voice command...",
    ai_welcome: "Hello! I am your VERIFAI Trust Assistant. You can ask me to verify a credential ID (e.g. 'Verify VF-INT-2024-4481'), ask about recruitment scams, or command 'Switch to dark mode'.",
    ai_chip_deposit: "Is asking for a deposit a scam?",
    ai_chip_verify: "Verify VF-INT-2024-4481",
    ai_chip_email: "How do I spot a fake HR email?",
    ai_mic_listening: "Listening for your voice...",
    ai_mic_stopped: "Microphone stopped",
    ai_speech_unsupported: "Speech recognition is not supported in this browser. Try Chrome or Edge on localhost/HTTPS.",
    ai_speech_muted: "Voice output muted",
    ai_speech_unmuted: "Voice output enabled",

    // Modals & Scanner
    scanner_title: "VERIFAI Universal QR Scanner",
    scanner_tab_camera: "Live Camera",
    scanner_tab_image: "Upload QR Image",
    scanner_start_cam: "Start Camera",
    scanner_stop_cam: "Stop Camera",
    scanner_switch_cam: "Switch Camera",
    scanner_drag_qr: "Drop QR Code Image Here",
    scanner_instruction: "Position the QR code inside the reticle. The scanner will automatically detect and verify the credential.",
    scanner_cam_error: "Camera access was denied or is not supported. Ensure you are on HTTPS or localhost.",

    // Printable Document Preview
    doc_modal_title: "Official Demonstration Document",
    doc_watermark: "VERIFAI DEMONSTRATION RECORD",
    doc_btn_print: "Print / Save as PDF",
    doc_btn_dl_qr: "Download QR Code",
    doc_btn_copy: "Copy ID",
    doc_btn_close: "Close Preview",
    doc_disclaimer: "DEMONSTRATION DOCUMENT — NOT AN OFFICIAL COMPANY-ISSUED DOCUMENT. Generated locally for testing and educational purposes.",

    // Footer
    footer_text: "Universal Digital Credential, Internship, and Job Offer Verification Platform.",
    footer_disclaimer: "Security Disclaimer: VERIFAI is a client-side demonstration platform. LocalStorage can be modified by users, and browser-generated hashes do not establish the authenticity of an external document or the identity of its issuer. Sample corporate records are purely simulated demonstrations and are not affiliated with or endorsed by Google, TCS, Microsoft, or any other company.",
    footer_rights: "All rights reserved. Built for digital trust and fraud prevention."
  },

  hi: {
    // Brand & Meta
    brand_name: "VERIFAI",
    tagline_primary: "विश्वास करने से पहले सत्यापित करें।",
    tagline_secondary: "प्रत्येक प्रमाण पत्र। प्रत्येक अवसर। VERIFAI से सत्यापित।",
    demo_badge: "प्रदर्शन प्रणाली (Demo)",
    demo_notice: "स्थानीय रूप से पंजीकृत क्लाइंट-साइड प्रदर्शन डेटा। यह आधिकारिक जारीकर्ता का समर्थन नहीं है।",

    // Navigation
    nav_home: "होम",
    nav_verify: "प्रमाण पत्र सत्यापन",
    nav_issuer: "जारीकर्ता पोर्टल",
    nav_forensics: "दस्तावेज़ फोरेंसिक",
    nav_fraud: "धोखाधड़ी रोकथाम",
    nav_calculator: "जोखिम कैलकुलेटर",
    nav_how: "यह कैसे काम करता है",
    nav_verify_btn: "अभी जांचें",

    // Hero Section
    hero_badge: "सार्वभौमिक डिजिटल पहचान एवं क्रेडेंशियल सुरक्षा",
    hero_title: "हर प्रमाण पत्र की जांच करें। हर अवसर को सुरक्षित रखें।",
    hero_subtitle: "महत्वपूर्ण निर्णय लेने से पहले प्रमाणपत्रों, इंटर्नशिप पत्रों और नौकरी के प्रस्तावों की पुष्टि करें। संदिग्ध दस्तावेजों की पहचान करें और सुरक्षित करियर चुनें।",
    hero_input_placeholder: "क्रेडेंशियल आईडी दर्ज करें (जैसे VF-CERT-2024-9102)",
    hero_btn_verify: "प्रमाण पत्र सत्यापित करें",
    hero_btn_scan: "QR कोड स्कैन करें",
    hero_samples_title: "त्वरित परीक्षण डेमो क्रेडेंशियल",
    hero_sample_cert_title: "असली प्रमाणपत्र (डेमो)",
    hero_sample_cert_desc: "Google Cloud & AI Academy — राहुल शर्मा",
    hero_sample_int_title: "असली इंटर्नशिप पत्र (डेमो)",
    hero_sample_int_desc: "TCS सॉफ्टवेयर इंजीनियरिंग — स्नेहा पटेल",
    hero_sample_off_title: "असली जॉब ऑफर (डेमो)",
    hero_sample_off_desc: "Microsoft India क्लाउड देव — अनन्या देशमुख",
    hero_sample_fraud_title: "चिह्नित फर्जी रिकॉर्ड",
    hero_sample_fraud_desc: "संदिग्ध टेलीग्राम भर्ती भुगतान घोटाला",

    // Verification Portal
    verify_title: "सार्वभौमिक सत्यापन पोर्टल",
    verify_subtitle: "क्रिप्टोग्राफिक SHA-256 सत्यापन के साथ क्लाइंट-साइड डेमो रजिस्ट्री से त्वरित खोज।",
    verify_paste_btn: "पेस्ट करें",
    verify_clear_btn: "साफ़ करें",
    verify_btn: "सत्यापित करें",
    verify_loading: "रजिस्ट्री की जांच और हैश की गणना की जा रही है...",

    // Result Card - Verified
    res_verified_title: "डेमो रिकॉर्ड सत्यापित पाया गया",
    res_verified_scope: "स्थानीय VERIFAI प्रदर्शन रजिस्ट्री में रिकॉर्ड मिल गया है। जारीकर्ता पहचान को स्वतंत्र रूप से प्रमाणित नहीं किया गया है।",
    res_recipient: "प्राप्तकर्ता का नाम",
    res_issuer: "दावा किया गया जारीकर्ता",
    res_domain: "जारीकर्ता डोमेन",
    res_type: "प्रमाण पत्र का प्रकार",
    res_designation: "पद / पाठ्यक्रम",
    res_issue_date: "जारी करने की तिथि",
    res_validity: "वैधता / समाप्ति तिथि",
    res_signatory: "अधिकृत हस्ताक्षरकर्ता",
    res_credential_id: "क्रेडेंशियल आईडी",
    res_sha256: "कैनोनिकल SHA-256 डाइजेस्ट",
    res_qr_status: "QR कोड स्थिति",
    res_qr_valid: "वैध VERIFAI पेलोड",
    res_registered_on: "पंजीकरण की तिथि",
    res_preview_doc: "मुद्रण योग्य दस्तावेज़ देखें",
    res_copy_id: "आईडी कॉपी करें",

    // Result Card - Revoked / Fraud
    res_revoked_title: "चेतावनी: क्रेडेंशियल रद्द / धोखाधड़ी चिह्नित",
    res_revoked_warning: "यह डेमो रिकॉर्ड संदिग्ध भुगतान मांगों और कंपनी के फर्जी नाम के उपयोग के लिए चिह्नित किया गया है। कोई भर्ती शुल्क न दें और न ही निजी जानकारी साझा करें।",
    res_revocation_reason: "रद्द करने का कारण",
    res_revocation_date: "रद्द करने की तिथि",
    res_suspicious_flags: "देखे गए संदिग्ध संकेत",
    res_action_report: "इस ऑफर की रिपोर्ट करें",
    res_action_calc: "जोखिम कैलकुलेटर में जांचें",

    // Result Card - Not Found
    res_notfound_title: "कोई मेल खाता क्रेडेंशियल नहीं मिला",
    res_notfound_desc: "दर्ज की गई आईडी के लिए वर्तमान रजिस्ट्री में कोई मेल नहीं मिला। रिकॉर्ड न मिलना धोखाधड़ी का पूर्ण प्रमाण नहीं है, लेकिन सावधानी आवश्यक है।",
    res_notfound_advice_title: "अनुशंसित सत्यापन कदम:",
    res_notfound_step1: "क्रेडेंशियल आईडी प्रारूप की दोबारा जांच करें (उदा. VF-CERT-2024-9102)।",
    res_notfound_step2: "संबंधित संस्था से उनकी आधिकारिक वेबसाइट के माध्यम से सीधे संपर्क करें।",
    res_notfound_step3: "नौकरी या वजीफा पाने के लिए कभी भी पैसे, सुरक्षा जमा या ओटीपी न भेजें।",
    res_notfound_retry: "अन्य आईडी का प्रयास करें",

    // Document Forensics
    forensics_title: "दस्तावेज़ फोरेंसिक एवं फाइल निरीक्षण",
    forensics_subtitle: "क्रेडेंशियल आईडी, क्यूआर कोड, संदिग्ध ईमेल और भुगतान घोटालों के संकेतों की जांच के लिए पीडीएफ या छवि अपलोड करें।",
    forensics_drag_text: "अपना प्रमाणपत्र या जॉब ऑफर यहां खींचें और छोड़ें",
    forensics_browse_btn: "या फ़ाइल चुनें",
    forensics_supported: "समर्थित प्रारूप: PDF, PNG, JPG, WebP (अधिकतम: 10MB)",
    forensics_scanning: "दस्तावेज़ का विश्लेषण और धोखाधड़ी संकेतों की जांच जारी है...",
    forensics_report_title: "फोरेंसिक विश्लेषण रिपोर्ट",
    forensics_file_name: "फ़ाइल का नाम",
    forensics_file_size: "फ़ाइल का आकार",
    forensics_risk_level: "आकलित जोखिम स्तर",
    forensics_findings_title: "निरीक्षण निष्कर्ष",
    forensics_btn_export: "रिपोर्ट निर्यात करें (JSON)",
    forensics_btn_print: "रिपोर्ट प्रिंट करें",
    forensics_disclaimer: "अस्वीकरण: स्वचालित निरीक्षण केवल संभावित विसंगतियों की पहचान करता है। यह स्वतंत्र रूप से प्रामाणिकता स्थापित नहीं कर सकता।",

    // Issuer Portal
    issuer_title: "जारीकर्ता प्रदर्शन पोर्टल",
    issuer_subtitle: "सत्यापन योग्य डिजिटल क्रेडेंशियल बनाएं, SHA-256 हैश उत्पन्न करें, QR कोड बनाएं और रजिस्ट्री प्रबंधित करें।",
    issuer_tab_create: "क्रेडेंशियल बनाएं",
    issuer_tab_registry: "रजिस्ट्री प्रबंधन",
    issuer_tab_history: "ऑडिट लॉग",
    issuer_tab_io: "आयात / निर्यात",

    // Form
    form_cred_type: "क्रेडेंशियल प्रकार",
    form_type_cert: "समापन प्रमाण पत्र (Certificate)",
    form_type_int: "इंटर्नशिप समापन पत्र (Internship)",
    form_type_off: "आधिकारिक जॉब ऑफर लेटर (Job Offer)",
    form_recipient: "प्राप्तकर्ता का पूरा नाम",
    form_issuer: "जारीकर्ता संगठन",
    form_domain: "संगठन का डोमेन (जैसे google.com)",
    form_designation: "पाठ्यक्रम / पद",
    form_issue_date: "जारी करने की तिथि",
    form_expiry_date: "समाप्ति / वैधता तिथि",
    form_signatory_name: "अधिकृत हस्ताक्षरकर्ता का नाम",
    form_signatory_title: "हस्ताक्षरकर्ता का पद",
    form_description: "विवरण",
    form_course_name: "पाठ्यक्रम का नाम",
    form_grade: "ग्रेड / अंक (उदा. Grade A, 94%)",
    form_comp_date: "समापन तिथि",
    form_int_role: "इंटर्नशिप भूमिका",
    form_department: "विभाग",
    form_int_start: "प्रारंभ तिथि",
    form_int_end: "समाप्ति तिथि",
    form_rating: "प्रदर्शन रेटिंग",
    form_job_title: "पद का नाम",
    form_location: "कार्य स्थान / मोड",
    form_ctc: "वेतन पैकेज / CTC",
    form_join_date: "शामिल होने की तिथि",
    form_offer_expiry: "ऑफर स्वीकार करने की अंतिम तिथि",
    form_btn_submit: "पंजीकृत करें और क्रेडेंशियल बनाएं",
    form_btn_reset: "फ़ॉर्म रीसेट करें",

    // Registry Management
    reg_search_placeholder: "नाम, कंपनी या आईडी द्वारा खोजें...",
    reg_filter_type_all: "सभी प्रकार",
    reg_filter_status_all: "सभी स्थितियाँ",
    reg_status_verified: "सत्यापित",
    reg_status_revoked: "रद्द / चिह्नित",
    reg_col_id: "क्रेडेंशियल आईडी",
    reg_col_recipient: "प्राप्तकर्ता",
    reg_col_issuer: "जारीकर्ता",
    reg_col_type: "प्रकार",
    reg_col_date: "तिथि",
    reg_col_status: "स्थिति",
    reg_col_actions: "कार्रवाई",
    reg_action_view: "जांचें",
    reg_action_print: "दस्तावेज़",
    reg_action_revoke: "रद्द करें",
    reg_action_reinstate: "पुनर्स्थापित करें",
    reg_action_delete: "हटाएं",
    reg_empty: "कोई क्रेडेंशियल नहीं मिला।",
    reg_btn_reset_defaults: "डिफ़ॉल्ट डेमो डेटा रीसेट करें",

    // Fraud Prevention Center
    fraud_title: "धोखाधड़ी रोकथाम एवं घोटाला जागरूकता केंद्र",
    fraud_subtitle: "फर्जी दस्तावेजों, भर्ती घोटालों और कॉर्पोरेट पहचान के दुरुपयोग से खुद को सुरक्षित रखें।",
    scam1_title: "अनौपचारिक और मिलते-जुलते ईमेल डोमेन",
    scam1_desc: "धोखेबाज अक्सर असली कंपनियों का नाम लेकर मुफ्त वेबमेल (@gmail.com) या फर्जी डोमेन का उपयोग करते हैं।",
    scam1_tip: "हमेशा आधिकारिक करियर पेज पर जांच करें और व्यक्तिगत ईमेल पतों से आने वाले जॉब ऑफर पर कभी विश्वास न करें।",
    scam2_title: "भर्ती में भुगतान और सुरक्षा जमा की मांग",
    scam2_desc: "लैपटॉप सुरक्षा जमा, प्रशिक्षण शुल्क या वजीफा जारी करने के नाम पर पैसे मांगना भर्ती धोखाधड़ी की सबसे बड़ी पहचान है।",
    scam2_tip: "असली कंपनियाँ नौकरी या इंटर्नशिप देने के लिए कभी भी उम्मीदवारों से पैसे नहीं मांगती हैं।",
    scam3_title: "जाली क्यूआर कोड और फर्जी सत्यापन",
    scam3_desc: "जालसाज सामान्य क्यूआर कोड संलग्न करते हैं जो नकली गूगल फॉर्म या फर्जी वेबसाइटों पर ले जाते हैं।",
    scam3_tip: "क्यूआर कोड को स्कैन करें और सुनिश्चित करें कि वह वास्तविक रजिस्ट्री से मेल खाता है।",
    scam4_title: "काल्पनिक भर्ती और अवास्तविक वेतन",
    scam4_desc: "बिना उचित साक्षात्कार के नौकरी की पेशकश और तुरंत स्वीकार करने का अनुचित दबाव बनाना।",
    scam4_tip: "प्रतिष्ठित कंपनियां चरणबद्ध मूल्यांकन करती हैं। जल्दबाजी में कोई भुगतान या अनुबंध न करें।",

    // Risk Calculator
    calc_title: "जॉब ऑफर जोखिम कैलकुलेटर",
    calc_subtitle: "हमारे भारित धोखाधड़ी-जोखिम एल्गोरिदम के साथ संदिग्ध प्रस्तावों का मूल्यांकन करें।",
    calc_score_label: "आकलित अनुमानित जोखिम स्कोर",
    calc_level_low: "कम स्पष्ट जोखिम (0–24)",
    calc_level_moderate: "मध्यम जोखिम (25–49)",
    calc_level_high: "धोखाधड़ी का उच्च जोखिम (50–100)",
    calc_disclaimer: "यह स्कोर केवल एक चेतावनी संकेतक है, धोखाधड़ी की कानूनी पुष्टि नहीं।",
    calc_btn_reset: "कैलकुलेटर रीसेट करें",

    // Checklist Items
    calc_q1: "रिक्रूटर पहले सुरक्षा जमा, लैपटॉप शुल्क या प्रशिक्षण शुल्क मांगता है।",
    calc_q2: "ऑफर किसी सार्वजनिक ईमेल पते (उदा. @gmail.com) से आया है।",
    calc_q3: "दावा की गई कंपनी को आधिकारिक कॉर्पोरेट रजिस्टरों में सत्यापित नहीं किया जा सकता।",
    calc_q4: "रिक्रूटर 24 घंटे में स्वीकार करने की अनुचित समयसीमा लागू करता है।",
    calc_q5: "वेतन अनुभव के स्तर की तुलना में अस्वाभाविक रूप से बहुत अधिक है।",
    calc_q6: "ऑफर लेटर में कोई सत्यापित कार्यालय पता या आधिकारिक फोन नंबर नहीं है।",
    calc_q7: "QR कोड या आईडी आधिकारिक सत्यापन रजिस्ट्री में नहीं मिलती है।",
    calc_q8: "रिक्रूटर ऑनबोर्डिंग के लिए बैंक पासवर्ड या ओटीपी की मांग करता है।",
    calc_q9: "दस्तावेज़ में वर्तनी की गलतियाँ या विकृत कंपनी लोगो हैं।",
    calc_q10: "रिक्रूटर केवल टेलीग्राम या व्हाट्सएप के माध्यम से बातचीत करता है।",

    // AI Assistant
    ai_name: "VERIFAI एआई सहायक",
    ai_status: "ऑनलाइन • विश्वास एवं सत्यापन मार्गदर्शक",
    ai_placeholder: "सत्यापन, घोटाले के संकेत या वॉयस कमांड के बारे में पूछें...",
    ai_welcome: "नमस्ते! मैं आपका VERIFAI ट्रस्ट सहायक हूँ। आप मुझसे क्रेडेंशियल जांचने के लिए कह सकते हैं या धोखाधड़ी के बारे में सवाल पूछ सकते हैं।",
    ai_chip_deposit: "क्या पैसे मांगना घोटाला है?",
    ai_chip_verify: "सत्यापित करें VF-INT-2024-4481",
    ai_chip_email: "फर्जी एचआर ईमेल की पहचान कैसे करें?",
    ai_mic_listening: "आपकी आवाज़ सुनी जा रही है...",
    ai_mic_stopped: "माइक्रोफ़ोन बंद है",
    ai_speech_unsupported: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है।",
    ai_speech_muted: "आवाज़ आउटपुट बंद है",
    ai_speech_unmuted: "आवाज़ आउटपुट चालू है",

    // Scanner
    scanner_title: "VERIFAI सार्वभौमिक QR स्कैनर",
    scanner_tab_camera: "लाइव कैमरा",
    scanner_tab_image: "छवि अपलोड करें",
    scanner_start_cam: "कैमरा शुरू करें",
    scanner_stop_cam: "कैमरा बंद करें",
    scanner_switch_cam: "कैमरा बदलें",
    scanner_drag_qr: "यहाँ QR कोड छवि छोड़ें",
    scanner_instruction: "QR कोड को फ्रेम के अंदर रखें। स्कैनर स्वचालित रूप से पता लगा लेगा।",
    scanner_cam_error: "कैमरा अनुमति अस्वीकार कर दी गई या समर्थित नहीं है।",

    // Document Preview
    doc_modal_title: "आधिकारिक प्रदर्शन दस्तावेज़",
    doc_watermark: "VERIFAI DEMONSTRATION RECORD",
    doc_btn_print: "प्रिंट करें / PDF के रूप में सहेजें",
    doc_btn_dl_qr: "QR कोड डाउनलोड करें",
    doc_btn_copy: "आईडी कॉपी करें",
    doc_btn_close: "पूर्वावलोकन बंद करें",
    doc_disclaimer: "प्रदर्शन दस्तावेज़ — आधिकारिक कंपनी-जारी दस्तावेज़ नहीं। परीक्षण और शिक्षा के लिए स्थानीय रूप से निर्मित।",

    // Footer
    footer_text: "सार्वभौमिक डिजिटल क्रेडेंशियल और जॉब ऑफर सत्यापन मंच।",
    footer_disclaimer: "सुरक्षा अस्वीकरण: VERIFAI एक क्लाइंट-साइड प्रदर्शन मंच है। LocalStorage को उपयोगकर्ताओं द्वारा संशोधित किया जा सकता है। यह Google, TCS या Microsoft से संबद्ध नहीं है।",
    footer_rights: "सर्वाधिकार सुरक्षित। डिजिटल विश्वास और धोखाधड़ी रोकथाम के लिए निर्मित।"
  },

  es: {
    // Brand & Meta
    brand_name: "VERIFAI",
    tagline_primary: "Verifica antes de confiar.",
    tagline_secondary: "Cada credencial. Cada oportunidad. Verificada con VERIFAI.",
    demo_badge: "Sistema de demostración",
    demo_notice: "Datos de demostración registrados localmente. No constituye un respaldo oficial del emisor.",

    // Navigation
    nav_home: "Inicio",
    nav_verify: "Verificar credencial",
    nav_issuer: "Portal del emisor",
    nav_forensics: "Análisis documental",
    nav_fraud: "Prevención de fraudes",
    nav_calculator: "Calculadora de riesgo",
    nav_how: "Cómo funciona",
    nav_verify_btn: "Verificar ahora",

    // Hero Section
    hero_badge: "Identidad digital universal y protección de credenciales",
    hero_title: "Verifica cada credencial. Protege cada oportunidad.",
    hero_subtitle: "Comprueba certificados, cartas de prácticas y ofertas de trabajo antes de tomar decisiones importantes. Identifica documentos falsificados y fraudes laborales.",
    hero_input_placeholder: "Ingresa el ID de la credencial (ej. VF-CERT-2024-9102)",
    hero_btn_verify: "Verificar credencial",
    hero_btn_scan: "Escanear código QR",
    hero_samples_title: "Credenciales de prueba de demostración",
    hero_sample_cert_title: "Certificado genuino (Demo)",
    hero_sample_cert_desc: "Google Cloud & AI Academy — Rahul Sharma",
    hero_sample_int_title: "Carta de prácticas genuina (Demo)",
    hero_sample_int_desc: "TCS Software Engineering — Sneha Patel",
    hero_sample_off_title: "Oferta de trabajo genuina (Demo)",
    hero_sample_off_desc: "Microsoft India Cloud Dev — Ananya Deshmukh",
    hero_sample_fraud_title: "Registro marcado como fraude",
    hero_sample_fraud_desc: "Estafa de pago por Telegram de falso reclutador",

    // Verification Portal
    verify_title: "Portal universal de verificación",
    verify_subtitle: "Consulta instantánea contra el registro de demostración del navegador con validación criptográfica SHA-256.",
    verify_paste_btn: "Pegar",
    verify_clear_btn: "Limpiar",
    verify_btn: "Verificar credencial",
    verify_loading: "Consultando registro y calculando hash...",

    // Result Card - Verified
    res_verified_title: "Registro de demostración coincidente",
    res_verified_scope: "Registro encontrado en el sistema local de VERIFAI. La identidad del emisor no ha sido autenticada de forma independiente.",
    res_recipient: "Nombre del beneficiario",
    res_issuer: "Emisor declarado",
    res_domain: "Dominio del emisor",
    res_type: "Tipo de credencial",
    res_designation: "Rol / Programa",
    res_issue_date: "Fecha de emisión",
    res_validity: "Validez / Vencimiento",
    res_signatory: "Firmante autorizado",
    res_credential_id: "ID de credencial",
    res_sha256: "Resumen canónico SHA-256",
    res_qr_status: "Estado del código QR",
    res_qr_valid: "Carga útil VERIFAI válida",
    res_registered_on: "Registrado el",
    res_preview_doc: "Ver documento imprimible",
    res_copy_id: "Copiar ID",

    // Result Card - Revoked / Fraud
    res_revoked_title: "ALERTA: Credencial revocada / Fraude identificado",
    res_revoked_warning: "Este registro de demostración ha sido marcado por solicitudes de pago sospechosas y posible suplantación del emisor. No realice pagos de contratación.",
    res_revocation_reason: "Motivo de revocación",
    res_revocation_date: "Fecha de revocación",
    res_suspicious_flags: "Indicadores sospechosos detectados",
    res_action_report: "Reportar esta oferta",
    res_action_calc: "Evaluar en calculadora de riesgo",

    // Result Card - Not Found
    res_notfound_title: "No se encontró ninguna credencial coincidente",
    res_notfound_desc: "No se encontró ningún registro para el ID ingresado. La ausencia de un registro no es prueba definitiva de fraude, pero aconseja precaución.",
    res_notfound_advice_title: "Pasos recomendados:",
    res_notfound_step1: "Verifique el formato del ID (ej. VF-CERT-2024-9102).",
    res_notfound_step2: "Contacte a la organización directamente a través de su sitio web oficial.",
    res_notfound_step3: "Nunca envíe dinero ni códigos bancarios para recibir un empleo.",
    res_notfound_retry: "Intentar con otro ID",

    // Forensics
    forensics_title: "Análisis documental e inspección de archivos",
    forensics_subtitle: "Suba un archivo PDF o imagen (PNG, JPG, WebP) para analizar identificadores, códigos QR, correos sospechosos e indicios de fraude.",
    forensics_drag_text: "Arrastre y suelte su certificado u oferta aquí",
    forensics_browse_btn: "O buscar archivo",
    forensics_supported: "Formatos admitidos: PDF, PNG, JPG, WebP (Máx: 10MB)",
    forensics_scanning: "Analizando estructura del documento e inspeccionando indicadores...",
    forensics_report_title: "Informe de análisis forense",
    forensics_file_name: "Nombre del archivo",
    forensics_file_size: "Tamaño del archivo",
    forensics_risk_level: "Nivel de riesgo estimado",
    forensics_findings_title: "Hallazgos de la inspección",
    forensics_btn_export: "Exportar informe (JSON)",
    forensics_btn_print: "Imprimir informe",
    forensics_disclaimer: "Aviso: La inspección automatizada identifica posibles inconsistencias. No prueba de manera concluyente la autenticidad ni el fraude.",

    // Issuer Portal
    issuer_title: "Portal de demostración del emisor",
    issuer_subtitle: "Registre credenciales digitales, genere resúmenes SHA-256, cree códigos QR y gestione el registro local.",
    issuer_tab_create: "Crear credencial",
    issuer_tab_registry: "Gestión del registro",
    issuer_tab_history: "Registro de auditoría",
    issuer_tab_io: "Importar / Exportar",

    // Form
    form_cred_type: "Tipo de credencial",
    form_type_cert: "Certificado de finalización",
    form_type_int: "Carta de prácticas",
    form_type_off: "Oferta de trabajo oficial",
    form_recipient: "Nombre completo del beneficiario",
    form_issuer: "Organización emisora",
    form_domain: "Dominio de la organización (ej. google.com)",
    form_designation: "Curso / Cargo / Puesto",
    form_issue_date: "Fecha de emisión",
    form_expiry_date: "Fecha de caducidad",
    form_signatory_name: "Nombre del firmante autorizado",
    form_signatory_title: "Cargo del firmante",
    form_description: "Descripción",
    form_course_name: "Título del curso",
    form_grade: "Calificación (ej. Grado A, 94%)",
    form_comp_date: "Fecha de culminación",
    form_int_role: "Rol en la pasantía",
    form_department: "Departamento",
    form_int_start: "Fecha de inicio",
    form_int_end: "Fecha de finalización",
    form_rating: "Calificación de rendimiento",
    form_job_title: "Título del puesto",
    form_location: "Ubicación / Modalidad",
    form_ctc: "Compensación / Salario",
    form_join_date: "Fecha de incorporación",
    form_offer_expiry: "Plazo de aceptación de la oferta",
    form_btn_submit: "Registrar y generar credencial",
    form_btn_reset: "Restablecer formulario",

    // Registry
    reg_search_placeholder: "Buscar por beneficiario, emisor o ID...",
    reg_filter_type_all: "Todos los tipos",
    reg_filter_status_all: "Todos los estados",
    reg_status_verified: "Verificado",
    reg_status_revoked: "Revocado / Marcado",
    reg_col_id: "ID de credencial",
    reg_col_recipient: "Beneficiario",
    reg_col_issuer: "Emisor",
    reg_col_type: "Tipo",
    reg_col_date: "Fecha",
    reg_col_status: "Estado",
    reg_col_actions: "Acciones",
    reg_action_view: "Verificar",
    reg_action_print: "Vista previa",
    reg_action_revoke: "Revocar",
    reg_action_reinstate: "Reincorporar",
    reg_action_delete: "Eliminar",
    reg_empty: "No se encontraron credenciales.",
    reg_btn_reset_defaults: "Restablecer datos demo predeterminados",

    // Fraud Scams
    fraud_title: "Centro de prevención de fraudes y concientización sobre estafas",
    fraud_subtitle: "Protéjase contra documentos falsificados, estafas de pago y suplantación de identidad corporativa.",
    scam1_title: "Dominios de correo sospechosos o imitadores",
    scam1_desc: "Los estafadores utilizan cuentas de correo gratuitas (@gmail.com) o dominios engañosos como empresa-rrhh.com para hacerse pasar por reclutadores legítimos.",
    scam1_tip: "Verifique siempre el encabezado y compruebe las ofertas en el sitio oficial de la empresa.",
    scam2_title: "Exigencia de pagos o depósitos de contratación",
    scam2_desc: "Solicitar dinero para 'depósito de ordenador portátil', 'gastos de gestión' o 'fianza de formación' es un claro indicio de estafa laboral.",
    scam2_tip: "Las empresas legítimas nunca exigen dinero a los postulantes para conseguir un empleo o cobrar una beca.",
    scam3_title: "Códigos QR falsificados y sellos manipulados",
    scam3_desc: "Los estafadores incluyen códigos QR genéricos que dirigen a formularios falsos o sitios web no oficiales.",
    scam3_tip: "Decodifique el código QR y compruebe que coincide con un registro oficial del emisor.",
    scam4_title: "Contrataciones fantasma y salarios desproporcionados",
    scam4_desc: "Ofertas concedidas sin entrevistas de selección rigurosas y con exigencias urgentes de aceptación en 24 horas.",
    scam4_tip: "Desconfíe de condiciones salariales irreales ofrecidas sin procesos de selección formales.",

    // Risk Calculator
    calc_title: "Calculadora de riesgo de oferta laboral",
    calc_subtitle: "Evalúe ofertas de empleo sospechosas con nuestro algoritmo heurístico ponderado.",
    calc_score_label: "Puntuación de riesgo heurístico calculada",
    calc_level_low: "Riesgo aparente bajo (0–24)",
    calc_level_moderate: "Riesgo moderado (25–49)",
    calc_level_high: "Alto riesgo de fraude (50–100)",
    calc_disclaimer: "Esta puntuación es un indicador orientativo, no una prueba pericial de fraude.",
    calc_btn_reset: "Restablecer calculadora",

    // Questions
    calc_q1: "El reclutador solicita un depósito de seguridad, fianza de equipo o tasa de formación.",
    calc_q2: "La oferta proviene de un correo webmail público (ej. @gmail.com) o dominio falso.",
    calc_q3: "La empresa no se puede confirmar en registros corporativos legítimos.",
    calc_q4: "El reclutador impone un plazo de aceptación apresurado e irrazonable.",
    calc_q5: "El salario ofrecido es desproporcionadamente alto para el nivel de experiencia requerido.",
    calc_q6: "La carta carece de dirección física verificable o teléfono fijo corporativo.",
    calc_q7: "El código QR o ID de credencial no se encuentra en el registro oficial.",
    calc_q8: "El reclutador solicita contraseñas bancarias, claves OTP o tarjetas de crédito.",
    calc_q9: "El documento presenta incongruencias en nombres, fechas o logotipos borrosos.",
    calc_q10: "El reclutador insiste en comunicarse exclusivamente por Telegram o WhatsApp.",

    // AI Assistant
    ai_name: "Asistente VERIFAI AI",
    ai_status: "En línea • Guía de confianza y verificación",
    ai_placeholder: "Pregunte sobre verificaciones, estafas o comandos de voz...",
    ai_welcome: "¡Hola! Soy su asistente de confianza VERIFAI. Puede pedirme que verifique un ID de credencial o me pregunte sobre fraudes laborales comunes.",
    ai_chip_deposit: "¿Pedir dinero para trabajar es una estafa?",
    ai_chip_verify: "Verificar VF-INT-2024-4481",
    ai_chip_email: "¿Cómo detectar un correo de RRHH falso?",
    ai_mic_listening: "Escuchando su voz...",
    ai_mic_stopped: "Micrófono detenido",
    ai_speech_unsupported: "El reconocimiento de voz no es compatible con este navegador.",
    ai_speech_muted: "Salida de voz silenciada",
    ai_speech_unmuted: "Salida de voz activada",

    // Scanner
    scanner_title: "Escáner universal de códigos QR VERIFAI",
    scanner_tab_camera: "Cámara en vivo",
    scanner_tab_image: "Subir imagen QR",
    scanner_start_cam: "Iniciar cámara",
    scanner_stop_cam: "Detener cámara",
    scanner_switch_cam: "Cambiar cámara",
    scanner_drag_qr: "Suelte la imagen del código QR aquí",
    scanner_instruction: "Enfoque el código QR dentro del recuadro. El sistema lo verificará automáticamente.",
    scanner_cam_error: "Acceso a la cámara denegado o no disponible. Requiere HTTPS o localhost.",

    // Document Preview
    doc_modal_title: "Documento oficial de demostración",
    doc_watermark: "REGISTRO DE DEMOSTRACIÓN VERIFAI",
    doc_btn_print: "Imprimir / Guardar como PDF",
    doc_btn_dl_qr: "Descargar código QR",
    doc_btn_copy: "Copiar ID",
    doc_btn_close: "Cerrar",
    doc_disclaimer: "DOCUMENTO DE DEMOSTRACIÓN — NO ES UN DOCUMENTO OFICIAL EMITIDO POR LA EMPRESA.",

    // Footer
    footer_text: "Plataforma universal de verificación de credenciales y ofertas de trabajo.",
    footer_disclaimer: "Aviso de seguridad: VERIFAI es una plataforma de demostración del lado del cliente. LocalStorage puede ser modificado por el usuario. No existe asociación con las empresas citadas.",
    footer_rights: "Todos los derechos reservados. Desarrollado para la confianza digital."
  },

  fr: {
    // Brand & Meta
    brand_name: "VERIFAI",
    tagline_primary: "Vérifiez avant de faire confiance.",
    tagline_secondary: "Chaque diplôme. Chaque opportunité. Vérifié avec VERIFAI.",
    demo_badge: "Système de démonstration",
    demo_notice: "Données de démonstration enregistrées localement. N'implique aucune approbation officielle.",

    // Navigation
    nav_home: "Accueil",
    nav_verify: "Vérifier un titre",
    nav_issuer: "Portail émetteur",
    nav_forensics: "Expertise de document",
    nav_fraud: "Prévention des fraudes",
    nav_calculator: "Calculateur de risque",
    nav_how: "Comment ça marche",
    nav_verify_btn: "Vérifier maintenant",

    // Hero Section
    hero_badge: "Identité numérique universelle et protection des compétences",
    hero_title: "Vérifiez chaque titre. Protégez chaque opportunité.",
    hero_subtitle: "Examinez les attestations, attestations de stage et offres d'emploi avant de prendre des décisions cruciales. Détectez les falsifications et sécurisez vos choix de carrière.",
    hero_input_placeholder: "Entrez l'identifiant du titre (ex. VF-CERT-2024-9102)",
    hero_btn_verify: "Vérifier le titre",
    hero_btn_scan: "Scanner le QR code",
    hero_samples_title: "Titres d'évaluation de démonstration",
    hero_sample_cert_title: "Certificat authentique (Démo)",
    hero_sample_cert_desc: "Google Cloud & AI Academy — Rahul Sharma",
    hero_sample_int_title: "Attestation de stage authentique (Démo)",
    hero_sample_int_desc: "TCS Software Engineering — Sneha Patel",
    hero_sample_off_title: "Offre d'embauche authentique (Démo)",
    hero_sample_off_desc: "Microsoft India Cloud Dev — Ananya Deshmukh",
    hero_sample_fraud_title: "Dossier signalé comme fraude",
    hero_sample_fraud_desc: "Arnaque financière d'un faux recruteur via Telegram",

    // Verification Portal
    verify_title: "Portail universel de vérification",
    verify_subtitle: "Recherche instantanée dans le registre de démonstration avec validation cryptographique SHA-256.",
    verify_paste_btn: "Coller",
    verify_clear_btn: "Effacer",
    verify_btn: "Vérifier le titre",
    verify_loading: "Interrogation du registre et calcul de l'empreinte...",

    // Result Card - Verified
    res_verified_title: "Enregistrement de démonstration trouvé",
    res_verified_scope: "Dossier correspondant dans le registre local de démonstration VERIFAI. L'identité de l'émetteur n'a pas été authentifiée de manière indépendante.",
    res_recipient: "Nom du récipiendaire",
    res_issuer: "Émetteur déclaré",
    res_domain: "Domaine de l'émetteur",
    res_type: "Type de document",
    res_designation: "Fonction / Programme",
    res_issue_date: "Date de délivrance",
    res_validity: "Validité / Échéance",
    res_signatory: "Signataire habilité",
    res_credential_id: "Identifiant du titre",
    res_sha256: "Empreinte canonique SHA-256",
    res_qr_status: "Statut du code QR",
    res_qr_valid: "Charge utile VERIFAI valide",
    res_registered_on: "Enregistré le",
    res_preview_doc: "Voir le document imprimable",
    res_copy_id: "Copier l'identifiant",

    // Result Card - Revoked / Fraud
    res_revoked_title: "ALERTE : Titre révoqué / Signalement de fraude",
    res_revoked_warning: "Ce dossier de démonstration a été signalé pour demandes de fonds suspectes et usurpation d'identité d'entreprise. Ne versez aucun frais d'embauche.",
    res_revocation_reason: "Motif de révocation",
    res_revocation_date: "Date de révocation",
    res_suspicious_flags: "Indicateurs suspects relevés",
    res_action_report: "Signaler cette proposition",
    res_action_calc: "Évaluer dans le calculateur de risque",

    // Result Card - Not Found
    res_notfound_title: "Aucun titre correspondant trouvé",
    res_notfound_desc: "Aucun dossier ne correspond à cet identifiant dans le registre actuel. L'absence de trace n'est pas une preuve formelle d'escroquerie, mais exige la prudence.",
    res_notfound_advice_title: "Étapes de précaution conseillées :",
    res_notfound_step1: "Vérifiez la syntaxe de l'identifiant (ex. VF-CERT-2024-9102).",
    res_notfound_step2: "Prenez contact avec l'entreprise via ses canaux officiels.",
    res_notfound_step3: "Ne transférez jamais d'argent pour valider un stage ou un contrat.",
    res_notfound_retry: "Tenter un autre identifiant",

    // Forensics
    forensics_title: "Expertise de documents et analyse de fichiers",
    forensics_subtitle: "Importez un fichier PDF ou une image (PNG, JPG, WebP) pour détecter les identifiants, codes QR, adresses suspectes et demandes illégitimes.",
    forensics_drag_text: "Glissez et déposez votre document ici",
    forensics_browse_btn: "Ou choisir un fichier",
    forensics_supported: "Formats supportés : PDF, PNG, JPG, WebP (Max : 10 Mo)",
    forensics_scanning: "Analyse des données et inspection des indices de falsification...",
    forensics_report_title: "Rapport d'expertise documentaire",
    forensics_file_name: "Nom du document",
    forensics_file_size: "Taille du fichier",
    forensics_risk_level: "Niveau de risque évalué",
    forensics_findings_title: "Observations du contrôle",
    forensics_btn_export: "Exporter le rapport (JSON)",
    forensics_btn_print: "Imprimer le rapport",
    forensics_disclaimer: "Avertissement : L'inspection automatique détecte des anomalies possibles. Elle ne saurait constituer une expertise juridique irréfutable.",

    // Issuer Portal
    issuer_title: "Portail émetteur de démonstration",
    issuer_subtitle: "Enregistrez des attestations vérifiables, calculez des hachages SHA-256, générez des QR codes et gérez le registre de démonstration.",
    issuer_tab_create: "Créer un titre",
    issuer_tab_registry: "Gestion du registre",
    issuer_tab_history: "Journal d'audit",
    issuer_tab_io: "Import / Export",

    // Form
    form_cred_type: "Nature du titre",
    form_type_cert: "Certificat de réussite",
    form_type_int: "Attestation de stage",
    form_type_off: "Offre d'emploi officielle",
    form_recipient: "Nom complet du titulaire",
    form_issuer: "Organisme émetteur",
    form_domain: "Domaine web de l'émetteur (ex. google.com)",
    form_designation: "Intitulé du poste ou de la formation",
    form_issue_date: "Date d'émission",
    form_expiry_date: "Date d'expiration",
    form_signatory_name: "Nom du signataire habilité",
    form_signatory_title: "Qualité du signataire",
    form_description: "Description",
    form_course_name: "Intitulé du cours",
    form_grade: "Mention / Note (ex. Mention Très Bien, 94%)",
    form_comp_date: "Date d'achèvement",
    form_int_role: "Poste occupé en stage",
    form_department: "Service ou département",
    form_int_start: "Date de début",
    form_int_end: "Date de fin",
    form_rating: "Évaluation globale",
    form_job_title: "Intitulé de l'emploi",
    form_location: "Lieu de travail / Modalité",
    form_ctc: "Rémunération / Salaire annuel",
    form_join_date: "Date de prise de fonction",
    form_offer_expiry: "Date limite de réponse",
    form_btn_submit: "Enregistrer et générer le document",
    form_btn_reset: "Réinitialiser",

    // Registry
    reg_search_placeholder: "Rechercher par titulaire, entreprise ou ID...",
    reg_filter_type_all: "Tous les types",
    reg_filter_status_all: "Tous les statuts",
    reg_status_verified: "Vérifié",
    reg_status_revoked: "Révoqué / Suspect",
    reg_col_id: "Identifiant",
    reg_col_recipient: "Titulaire",
    reg_col_issuer: "Émetteur",
    reg_col_type: "Type",
    reg_col_date: "Date",
    reg_col_status: "Statut",
    reg_col_actions: "Actions",
    reg_action_view: "Vérifier",
    reg_action_print: "Aperçu",
    reg_action_revoke: "Révoquer",
    reg_action_reinstate: "Rétablir",
    reg_action_delete: "Supprimer",
    reg_empty: "Aucun titre ne correspond à ces critères.",
    reg_btn_reset_defaults: "Restaurer les données de test",

    // Fraud Scams
    fraud_title: "Centre de prévention des fraudes et sensibilisation aux escroqueries",
    fraud_subtitle: "Protégez-vous des documents falsifiés, des arnaques au paiement et de l'usurpation d'identité d'entreprise.",
    scam1_title: "Adresses e-mail douteuses ou imitations de domaines",
    scam1_desc: "Les escrocs recourent souvent à des messageries publiques (@gmail.com) ou à des noms de domaine trompeurs pour usurper l'identité de recruteurs.",
    scam1_tip: "Examinez l'adresse d'expédition complète et confrontez-la aux canaux de recrutement officiels.",
    scam2_title: "Demandes de versements ou de cautions d'embauche",
    scam2_desc: "Toute requête d'argent pour 'caution informatique', 'frais d'examen' ou 'formation obligatoire' trahit une tentative d'escroquerie caractérisée.",
    scam2_tip: "Un employeur légitime ne demande jamais de somme d'argent préalable pour formaliser une embauche.",
    scam3_title: "Codes QR trompeurs et falsification de signatures",
    scam3_desc: "Les fraudeurs apposent des codes QR renvoyant vers des pages contrefaites reproduisant des logos institutionnels.",
    scam3_tip: "Analysez le code QR et assurez-vous qu'il pointe vers un répertoire officiel et immuable.",
    scam4_title: "Recrutements fantômes et rémunérations mirobolantes",
    scam4_desc: "Offres accordées sans entretien sérieux, assorties de promesses de salaires démesurés et d'un ultimatum de signature immédiate.",
    scam4_tip: "Méfiez-vous des propositions trop alléchantes ne respectant pas les processus d'évaluation conventionnels.",

    // Risk Calculator
    calc_title: "Calculateur de risque d'offre d'emploi",
    calc_subtitle: "Évaluez la plausibilité d'une offre suspecte à l'aide de notre algorithme heuristique pondéré.",
    calc_score_label: "Score de risque heuristique calculé",
    calc_level_low: "Risque apparent faible (0–24)",
    calc_level_moderate: "Risque modéré (25–49)",
    calc_level_high: "Risque élevé d'escroquerie (50–100)",
    calc_disclaimer: "Ce score est une estimation préventive, et non une certitude légale absolue.",
    calc_btn_reset: "Réinitialiser",

    // Questions
    calc_q1: "Le recruteur exige une avance financière pour du matériel ou une formation.",
    calc_q2: "L'offre provient d'une adresse de messagerie grand public ou d'un domaine suspect.",
    calc_q3: "L'employeur prétendu ne peut être vérifié sur les registres du commerce officiels.",
    calc_q4: "Le recruteur impose un délai de réponse déraisonnablement court.",
    calc_q5: "Le salaire proposé est disproportionné par rapport au profil demandé.",
    calc_q6: "Le document ne mentionne aucune coordonnée physique ni numéro de standard vérifiable.",
    calc_q7: "Le QR code ou l'identifiant ne donne aucun résultat dans le registre officiel.",
    calc_q8: "Le contact réclame des codes d'accès bancaires ou des codes SMS de sécurité.",
    calc_q9: "Le document comprend des incohérences de dates ou des logos altérés.",
    calc_q10: "Le recruteur exige d'échanger exclusivement sur Telegram ou WhatsApp.",

    // AI Assistant
    ai_name: "Assistant IA VERIFAI",
    ai_status: "En ligne • Guide de confiance et de sécurité",
    ai_placeholder: "Posez une question sur un titre, une arnaque ou donnez un ordre vocal...",
    ai_welcome: "Bonjour ! Je suis votre assistant de confiance VERIFAI. Vous pouvez me demander de vérifier un document ou m'interroger sur les fraudes à l'embauche.",
    ai_chip_deposit: "Payer pour un travail est-il une arnaque ?",
    ai_chip_verify: "Vérifier VF-INT-2024-4481",
    ai_chip_email: "Comment identifier un faux e-mail RH ?",
    ai_mic_listening: "Écoute de votre voix en cours...",
    ai_mic_stopped: "Microphone arrêté",
    ai_speech_unsupported: "La reconnaissance vocale n'est pas gérée par ce navigateur.",
    ai_speech_muted: "Synthèse vocale désactivée",
    ai_speech_unmuted: "Synthèse vocale activée",

    // Scanner
    scanner_title: "Scanner QR universel VERIFAI",
    scanner_tab_camera: "Caméra en direct",
    scanner_tab_image: "Importer une image QR",
    scanner_start_cam: "Activer la caméra",
    scanner_stop_cam: "Désactiver la caméra",
    scanner_switch_cam: "Changer de caméra",
    scanner_drag_qr: "Déposez l'image du QR code ici",
    scanner_instruction: "Positionnez le QR code dans le viseur. La vérification s'effectue automatiquement.",
    scanner_cam_error: "Accès à la caméra refusé ou non disponible. Utilisez HTTPS ou localhost.",

    // Document Preview
    doc_modal_title: "Document officiel de démonstration",
    doc_watermark: "DOSSIER DE DÉMONSTRATION VERIFAI",
    doc_btn_print: "Imprimer / Enregistrer en PDF",
    doc_btn_dl_qr: "Télécharger le QR code",
    doc_btn_copy: "Copier l'identifiant",
    doc_btn_close: "Fermer l'aperçu",
    doc_disclaimer: "DOCUMENT DE DÉMONSTRATION — DOCUMENT NON OFFICIEL. Créé localement à des fins pédagogiques.",

    // Footer
    footer_text: "Plateforme universelle de vérification de titres et d'offres d'emploi.",
    footer_disclaimer: "Avertissement : VERIFAI est un démonstrateur côté client. Le stockage local peut être altéré. Aucune affiliation avec les sociétés citées.",
    footer_rights: "Tous droits réservés. Conçu pour la confiance numérique."
  }
};

/**
 * Translation helper functions
 */
function getCurrentLanguage() {
  return localStorage.getItem("verifai_lang") || "en";
}

function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  const dict = VERIFAI_I18N[currentLang] || VERIFAI_I18N.en;
  return dict[key] !== undefined ? dict[key] : (VERIFAI_I18N.en[key] || key);
}

function setLanguage(lang) {
  if (!VERIFAI_I18N[lang]) lang = "en";
  localStorage.setItem("verifai_lang", lang);
  document.documentElement.setAttribute("lang", lang);
  applyTranslations();

  // Trigger language change event for voice & other modules
  window.dispatchEvent(new CustomEvent("verifai:lang_change", { detail: { lang } }));
}

function applyTranslations() {
  const lang = getCurrentLanguage();
  const dict = VERIFAI_I18N[lang] || VERIFAI_I18N.en;

  // Text contents
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // Titles / Tooltips
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] !== undefined) {
      el.setAttribute("title", dict[key]);
    }
  });

  // Update current select box if present
  const langSelect = document.getElementById("lang-select");
  if (langSelect && langSelect.value !== lang) {
    langSelect.value = lang;
  }
}

// Auto-run when DOM ready
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = getCurrentLanguage();
    document.documentElement.setAttribute("lang", savedLang);
    applyTranslations();
  });
}
