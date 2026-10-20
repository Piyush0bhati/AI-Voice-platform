"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GreenAudioWaveHero } from "@/components/sections/GreenAudioWaveHero";
import { useHomepageVoiceCall } from "@/components/sections/useHomepageVoiceCall";
import { customerReviews } from "@/config/customerReviews";
import { API_URL } from "@/lib/apiBase";
import styles from "./ModernVoicePlatformHome.module.css";

/* Supported languages for live demo */
const DEMO_LANGUAGES = [
  { code: "English", label: "English", flag: "🌐", greeting: "Hello! How can I help you book or qualify your inquiry today?", agentReply: "I can check appointment slots with our team right away. Would morning or afternoon suit you better?", intent: "Appointment Scheduling", latency: "290ms" },
  { code: "Hindi", label: "हिन्दी (Hindi)", flag: "🇮🇳", greeting: "नमस्ते! मैं आपके अपॉइंटमेंट और पूछताछ में कैसे सहायता कर सकता हूँ?", agentReply: "नमस्ते! आपके लिए कल दोपहर 2:30 बजे का स्लॉट उपलब्ध है। क्या मैं इसे कन्फर्म कर दूँ?", intent: "Consultation Booking", latency: "310ms" },
  { code: "Hinglish", label: "Hinglish", flag: "🇮🇳", greeting: "Hi there! Aapki booking ya loan status mein kaise help kar sakta hoon?", agentReply: "Sure! Main aapka application number verify karke turant status SMS bhej deta hoon.", intent: "Status Verification", latency: "285ms" },
  { code: "Tamil", label: "தமிழ் (Tamil)", flag: "🇮🇳", greeting: "வணக்கம்! உங்கள் சேவை முன்பதிவுக்கு நான் எவ்வாறு உதவ முடியும்?", agentReply: "நிச்சயமாக! இன்று மாலை 4:00 மணிக்கு உங்கள் சந்திப்பு உறுதி செய்யப்பட்டுள்ளது.", intent: "Slot Confirmation", latency: "320ms" },
  { code: "Telugu", label: "తెలుగు (Telugu)", flag: "🇮🇳", greeting: "నమస్కారం! ఈ రోజు మీ ఎంక్వైరీకి నేను ఎలా సహాయపడగలను?", agentReply: "తప్పకుండా! మీ డాక్యుమెంట్లు పరిశీలించబడ్డాయి మరియు అప్రూవల్ స్టేజ్‌లో ఉన్నాయి.", intent: "Lead Follow-up", latency: "315ms" },
  { code: "Gujarati", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳", greeting: "નમસ્તે! તમારી બુકિંગ અથવા સેવા માટે હું કેવી રીતે મદદ કરી શકું?", agentReply: "ચોક્કસ, હું તમારી નવી વિગતો નોંધી લઉં છું અને પ્રતિનિધિ તરત સંપર્ક કરશે.", intent: "Customer Care", latency: "305ms" },
  { code: "Marathi", label: "मराठी (Marathi)", flag: "🇮🇳", greeting: "नमस्कार! आज आम्ही आपल्या सेवेत कशी मदत करू शकतो?", agentReply: "होय, आपल्या खात्याची माहिती अपडेट केली आहे आणि पुष्टीकरण संदेश पाठवला आहे.", intent: "Account Update", latency: "310ms" },
  { code: "Bengali", label: "বাংলা (Bengali)", flag: "🇮🇳", greeting: "নমস্কার! আপনার পরিষেবার বিষয়ে আমি কীভাবে সাহায্য করতে পারি?", agentReply: "অবশ্যই, আপনার সুবিধাজনক সময়ে আমরা কল শিডিউল করে দিচ্ছি।", intent: "Appointment Scheduling", latency: "325ms" },
  { code: "Kannada", label: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳", greeting: "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ವಿಚಾರಣೆಗೆ ನಾನು ಹೇಗೆ ನೆರವಾಗಲಿ?", agentReply: "ಖಂಡಿತ, ನಿಮ್ಮ ವಿವರಗಳನ್ನು ದಾಖಲಿಸಿಕೊಳ್ಳಲಾಗಿದೆ ಮತ್ತು ದೃಢೀಕರಿಸಲಾಗಿದೆ.", intent: "Service Confirmation", latency: "315ms" },
];

/* Demo phone call scenarios */
const SCENARIOS = [
  { id: "real_estate", label: "Real Estate", persona: "Amisha", role: "Property Advisor", icon: "🏢" },
  { id: "healthcare", label: "Healthcare", persona: "Dr. Priya", role: "Triage & Bookings", icon: "🏥" },
  { id: "car_dealership", label: "Auto Dealership", persona: "Pooja", role: "Test Drive Consultant", icon: "🚗" },
  { id: "restaurant", label: "Dining Concierge", persona: "Simran", role: "Table Reservations", icon: "🍽️" },
  { id: "hotel_reservation", label: "Hotel Concierge", persona: "Maya", role: "Front Desk Host", icon: "🏨" },
  { id: "school_admission", label: "Admissions", persona: "Sneha", role: "Admissions Head", icon: "🎓" },
];

const COUNTRY_CODES = [
  { code: "+91", label: "+91 (India)", flag: "🇮🇳" },
  { code: "+1", label: "+1 (US/CA)", flag: "🇺🇸" },
  { code: "+971", label: "+971 (UAE)", flag: "🇦🇪" },
  { code: "+44", label: "+44 (UK)", flag: "🇬🇧" },
  { code: "+65", label: "+65 (Singapore)", flag: "🇸🇬" },
  { code: "+61", label: "+61 (Australia)", flag: "🇦🇺" },
];

/* Industry Solutions Tab Data */
const INDUSTRIES = [
  {
    id: "finance",
    label: "Banking & Finance",
    title: "Instant Loan Verification & Fraud Screening",
    copy: "Automate early-stage KYC, loan status updates, EMI reminders, and high-security customer verification without making callers wait in IVR hold queues.",
    metric1: "82%",
    metric1Label: "First-Call Resolution",
    metric2: "3.4x",
    metric2Label: "Faster Application Processing",
    caller: "“Hi, I submitted my business loan application yesterday and want to know if my GST records were accepted.”",
    agent: "“Yes, your GST filing of ₹48 Lakhs has been verified. Your application is now in credit underwriting. Would you like a WhatsApp tracking link?”",
    intent: "KYC & Verification",
    latency: "310ms"
  },
  {
    id: "healthcare",
    label: "Healthcare & Clinics",
    title: "24/7 Patient Triage & Appointment Scheduling",
    copy: "Handle sudden surges in inbound clinic calls. Qualify symptoms, schedule diagnostic consultations, and send calendar reminders in compliant, empathetic tones.",
    metric1: "+45%",
    metric1Label: "Appointment Show Rate",
    metric2: "Zero",
    metric2Label: "Caller Hold Time",
    caller: "“Hello, I need an urgent dermatology slot with Dr. Miller for tomorrow afternoon.”",
    agent: "“Dr. Miller has open slots at 2:15 PM and 4:30 PM tomorrow. Which one would you like me to book for you?”",
    intent: "Doctor Appointment",
    latency: "295ms"
  },
  {
    id: "realestate",
    label: "Real Estate & Auto",
    title: "Instant Buyer Qualification & Test Drive Bookings",
    copy: "Never miss an inbound buyer lead at midnight. Qualify budget, preferred location, financing readiness, and book on-site visits directly into sales reps’ calendars.",
    metric1: "92%",
    metric1Label: "Inbound Lead Qualification",
    metric2: "+60%",
    metric2Label: "Site Visit Conversions",
    caller: "“I’m looking for a 3-BHK apartment near Whitefield with a budget around ₹1.5 Crore.”",
    agent: "“We have two premium high-rise options in Whitefield matching ₹1.45 Cr with immediate possession. Can I schedule a VIP site tour this Saturday at 11 AM?”",
    intent: "Property Visit Booking",
    latency: "305ms"
  },
  {
    id: "ecommerce",
    label: "Logistics & Commerce",
    title: "Automated COD Confirmation & Delivery Routing",
    copy: "Eliminate Return-to-Origin (RTO) losses with automated outbound address validation calls before dispatching high-value orders.",
    metric1: "-38%",
    metric1Label: "Reduction in RTO Losses",
    metric2: "99.4%",
    metric2Label: "Address Verification Accuracy",
    caller: "“I received a delivery SMS, but I will only be home after 6:00 PM today.”",
    agent: "“Not a problem! I have rescheduled your package delivery slot to today between 6:30 PM and 8:00 PM.”",
    intent: "Delivery Slot Adjustment",
    latency: "280ms"
  },
  {
    id: "hospitality",
    label: "Hospitality & Dining",
    title: "Intelligent Concierge & Table Reservations",
    copy: "Answer restaurant, resort, and event reservations in any language. Manage party sizes, dietary requests, and confirm deposits effortlessly.",
    metric1: "100%",
    metric1Label: "Inbound Call Answer Rate",
    metric2: "+28%",
    metric2Label: "Table Turn Capacity",
    caller: "“Can I reserve a table for 6 people tonight around 8:30 PM for a birthday celebration?”",
    agent: "“I have a private booth available at 8:30 PM for 6 guests. Shall I confirm with complimentary birthday dessert?”",
    intent: "Table Reservation",
    latency: "290ms"
  },
];

/* FAQ Data */
const FAQS = [
  {
    q: "How does Vozon achieve sub-350ms real-time latency?",
    a: "Vozon combines streaming phoneme automatic speech recognition (ASR), first-token time-to-first-byte (TTFT) LLM streaming (GPT-4o, Gemini 2.0 Flash, Sarvam Indic), and ultra-fast neural speech synthesis (Sarvam Bulbul, ElevenLabs) orchestrated over distributed LiveKit WebRTC edge nodes.",
  },
  {
    q: "Can I bring my own existing phone numbers and telecom carriers?",
    a: "Yes. Vozon offers Bring-Your-Own-Carrier (BYOT) support via SIP trunking and direct interconnect with Exotel, Twilio, Airtel, Tata Telecommunications, and Plivo. You can also provision new local virtual DIDs with 1 click.",
  },
  {
    q: "Does Vozon natively understand Hinglish and Indian regional accents?",
    a: "Absolutely. Vozon is engineered specifically for multilingual code-switching. Callers can switch seamlessly between Hindi and English mid-sentence, use colloquial phrasing, and be understood naturally with local phonetic accuracy across 22+ Indic languages.",
  },
  {
    q: "How does the Google Sheets Outbound Dialer work?",
    a: "Simply paste your Google Sheet URL containing phone numbers and contact parameters into the Vozon Campaign dashboard. The AI agent initiates calls automatically within TRAI-compliant hours, updates call status, and logs transcripts back into your spreadsheet in real time.",
  },
  {
    q: "Is Vozon enterprise secure and compliant?",
    a: "Yes. Vozon enforces end-to-end TLS 1.3 encryption, SOC-2 Type II standards, HIPAA compliance for patient data, and GDPR privacy safeguards. We do not use customer call audio or proprietary data to train public models.",
  },
  {
    q: "Can I test the platform for free before committing?",
    a: "Yes! You can test live WebRTC conversations right now on this page, or sign up with zero credit card required to receive complimentary starter minutes and full agent studio access.",
  },
];

export function ModernVoicePlatformHome() {
  const [activeTab, setActiveTab] = useState<"webrtc" | "phone">("webrtc");
  const [selectedLangIndex, setSelectedLangIndex] = useState(0);
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* WebRTC Voice Hook */
  const voiceCall = useHomepageVoiceCall();
  const currentLang = DEMO_LANGUAGES[selectedLangIndex];

  /* Outbound Phone Form State */
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [phoneCallState, setPhoneCallState] = useState<"idle" | "dialing" | "ringing" | "connected" | "error">("idle");
  const [phoneStatusMsg, setPhoneStatusMsg] = useState("");

  const handleSelectLang = (idx: number) => {
    setSelectedLangIndex(idx);
    const target = DEMO_LANGUAGES[idx];
    if (voiceCall.active || voiceCall.busy) {
      void voiceCall.start(target.code);
    }
  };

  const handleToggleVoiceCall = () => {
    if (voiceCall.active || voiceCall.busy) {
      voiceCall.disconnect();
    } else {
      void voiceCall.start(currentLang.code);
    }
  };

  const handleInitiatePhoneCall = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneNumber.trim().replace(/[^\d+]/g, "");
    if (!clean || clean.length < 10) {
      setPhoneCallState("error");
      setPhoneStatusMsg("Please enter a valid 10-digit phone number.");
      return;
    }

    let fullPhoneNumber = clean.startsWith("+") ? clean : `${selectedCountry.code}${clean.replace(/^0+/, "")}`;
    setPhoneCallState("dialing");
    setPhoneStatusMsg(`Initiating outbound call to ${fullPhoneNumber}…`);

    try {
      const response = await fetch(`${API_URL}/api/public/demo/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: fullPhoneNumber,
          scenario: selectedScenario.id,
          language: currentLang.code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to trigger outbound call.");
      }

      setPhoneCallState("connected");
      setPhoneStatusMsg(`Call placed! Your phone is ringing with ${selectedScenario.persona} (${selectedScenario.label}).`);
    } catch (err: unknown) {
      setPhoneCallState("error");
      setPhoneStatusMsg(err instanceof Error ? err.message : "Error initiating call. Please try again.");
    }
  };

  const activeIndustry = INDUSTRIES[activeIndustryIndex];

  return (
    <div className={styles.pageWrapper}>
      {/* Ambient background mesh & light grids */}
      <div className={styles.ambientMeshTop} aria-hidden="true" />
      <div className={styles.ambientGridPattern} aria-hidden="true" />

      {/* Floating Global Header */}
      <SiteHeader />

      <main>
        {/* HERO SECTION WITH LIVING SILK AUDIO WAVE CANVAS */}
        <section className={styles.heroSection}>
          <div className={styles.heroCanvasWrap}>
            <GreenAudioWaveHero />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.pillBadge}>
              <span className={styles.pulsingDot} />
              <span className={styles.pillBadgeText}>Enterprise Conversational Voice AI • Sub-350ms Telephony Latency</span>
            </div>

            <h1 className="hero-title" style={{
              fontSize: "clamp(38px, 5.5vw, 74px)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              maxWidth: "980px",
              margin: "0 auto 22px",
              color: "#0f172a"
            }}>
              AI Voice Agents That<br />
              <span style={{
                background: "linear-gradient(135deg, #108d82 0%, #0d776e 50%, #059669 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block"
              }}>
                Actually Sound Human.
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Automate customer support, inbound inquiries, and outbound calls with hyper-realistic voice AI.
              Zero robotic lag, human-like barge-in, and natural conversations in Hindi, Hinglish &amp; 22+ Indic languages.
            </p>

            <div className={styles.heroActions}>
              <Link href="/login" className={styles.primaryCta}>
                <span>Get Started Free</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
              </Link>

              <Link href="/contact" className={styles.secondaryCta}>
                <span>Book a Demo</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* SLA & Telephony Trust Ribbon */}
            <div className={styles.heroTrustRibbon}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>⚡</span>
                <span><strong>&lt;350ms</strong> Telephony Latency</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>🇮🇳</span>
                <span><strong>22+</strong> Indic &amp; Global Languages</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>📊</span>
                <span><strong>1-Click</strong> Google Sheets Outbound</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>📞</span>
                <span><strong>BYOT</strong> Virtual Telephony</span>
              </div>
            </div>

            {/* INTERACTIVE VOICE CONSOLE (HERO CENTERPIECE IN LIGHT THEME) */}
            <div className={styles.consoleWrapper} id="live-voice-sandbox">
              <div className={styles.consoleCard}>
                {/* Console Header Bar */}
                <div className={styles.consoleHeader}>
                  <div className={styles.consoleWindowDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>

                  <div className={styles.consoleTabControls}>
                    <button
                      type="button"
                      className={`${styles.consoleTabBtn} ${activeTab === "webrtc" ? styles.consoleTabBtnActive : ""}`}
                      onClick={() => setActiveTab("webrtc")}
                    >
                      <span>🎙️ Live WebRTC Sandbox</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.consoleTabBtn} ${activeTab === "phone" ? styles.consoleTabBtnActive : ""}`}
                      onClick={() => setActiveTab("phone")}
                    >
                      <span>📱 Call My Actual Phone</span>
                    </button>
                  </div>

                  <div className={styles.consoleStatusBadge}>
                    <span className={styles.pulsingDot} />
                    <span>{voiceCall.active ? "Streaming 24kHz HD" : "Edge Telephony Ready"}</span>
                  </div>
                </div>

                {/* Console Body */}
                {activeTab === "webrtc" ? (
                  <div className={styles.consoleBody}>
                    {/* Left Column: Live Audio Controls & Equalizer */}
                    <div className={styles.consoleStage}>
                      <div>
                        <div className={styles.voiceAgentProfile}>
                          <div className={styles.agentInfo}>
                            <div className={styles.agentAvatar}>
                              <span>V</span>
                              {voiceCall.active && <span className={styles.agentAvatarPing} />}
                            </div>
                            <div className={styles.agentDetails}>
                              <h3>Vozon Studio Assistant</h3>
                              <p>Powered by Sarvam Indic &amp; ElevenLabs Neural</p>
                            </div>
                          </div>

                          <div className={styles.latencyTag}>
                            <span>⚡ {currentLang.latency}</span>
                          </div>
                        </div>

                        {/* Equalizer Wave Area */}
                        <div className={styles.audioWaveArea}>
                          <div className={`${styles.waveEqualizer} ${voiceCall.active ? styles.waveActive : styles.waveIdle}`}>
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                            <span className={styles.waveBar} />
                          </div>

                          <button
                            type="button"
                            className={`${styles.callTriggerButton} ${
                              voiceCall.active
                                ? styles.callTriggerEnd
                                : voiceCall.busy
                                ? styles.callTriggerConnecting
                                : styles.callTriggerStart
                            }`}
                            onClick={handleToggleVoiceCall}
                            disabled={!voiceCall.ready && !voiceCall.active && !voiceCall.busy}
                          >
                            {voiceCall.active ? (
                              <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
                                <span>Disconnect Live Call</span>
                              </>
                            ) : voiceCall.busy ? (
                              <span>Connecting WebRTC…</span>
                            ) : (
                              <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2Z"/></svg>
                                <span>Start Speaking ({currentLang.code})</span>
                              </>
                            )}
                          </button>

                          <p className={styles.callStatusHint}>
                            {voiceCall.active
                              ? `Active call connected • Real-time interruption & barge-in enabled`
                              : voiceCall.busy
                              ? `Establishing low-latency WebRTC session…`
                              : `Click to talk via microphone in real time with zero lag.`}
                          </p>
                        </div>
                      </div>

                      {/* Language Selector */}
                      <div className={styles.languageRow}>
                        <span className={styles.languageLabel}>Select Voice Language &amp; Dialect</span>
                        <div className={styles.languageChipContainer}>
                          {DEMO_LANGUAGES.map((lang, idx) => (
                            <button
                              key={lang.code}
                              type="button"
                              className={`${styles.langChip} ${selectedLangIndex === idx ? styles.langChipActive : ""}`}
                              onClick={() => handleSelectLang(idx)}
                            >
                              <span>{lang.flag} {lang.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Live Simulated Transcript & Output */}
                    <div className={styles.consoleTranscript}>
                      <div>
                        <div className={styles.transcriptHeader}>
                          <div className={styles.transcriptTitle}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            <span>Live Telephony Transcript</span>
                          </div>
                          <span className={styles.toolBadge}>Intent: {currentLang.intent}</span>
                        </div>

                        <div className={styles.conversationFeed}>
                          <div className={styles.callerMessage}>
                            <div className={styles.callerHeader}>
                              <span>👤 Caller Turn (Input)</span>
                            </div>
                            <p className={styles.callerText}>{currentLang.greeting}</p>
                          </div>

                          <div className={styles.agentMessage}>
                            <div className={styles.agentHeader}>
                              <span>🤖 Vozon Agent (Streaming Speech)</span>
                              <span>{currentLang.latency} TTFT</span>
                            </div>
                            <p className={styles.agentText}>{currentLang.agentReply}</p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.toolExecutionCard}>
                        <div className={styles.toolInfo}>
                          <span className={styles.toolBadge}>CRM_TOOL</span>
                          <span className={styles.toolDetail}>hubspot.lead_verify({`{ intent: "${currentLang.intent}" }`})</span>
                        </div>
                        <span className={styles.toolVerified}>✓ Verified</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mode B: Direct Phone Call Outbound Trigger */
                  <form className={styles.phoneForm} onSubmit={handleInitiatePhoneCall}>
                    <div className={styles.formRow}>
                      <span className={styles.formLabel}>1. Select Customer Scenario</span>
                      <div className={styles.scenarioSelectGrid}>
                        {SCENARIOS.map((sc) => (
                          <button
                            key={sc.id}
                            type="button"
                            className={`${styles.scenarioCardBtn} ${selectedScenario.id === sc.id ? styles.scenarioCardBtnActive : ""}`}
                            onClick={() => setSelectedScenario(sc)}
                          >
                            <span style={{ fontSize: "20px" }}>{sc.icon}</span>
                            <div>
                              <b style={{ display: "block", fontSize: "13px" }}>{sc.label}</b>
                              <small style={{ color: "#64748b", fontSize: "11px" }}>{sc.persona} • {sc.role}</small>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <span className={styles.formLabel}>2. Enter Your Mobile Phone Number</span>
                      <div className={styles.phoneInputGroup}>
                        <select
                          className={styles.countrySelect}
                          value={selectedCountry.code}
                          onChange={(e) => {
                            const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                            if (found) setSelectedCountry(found);
                          }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          className={styles.phoneField}
                          placeholder="e.g. 9876543210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.dialSubmitBtn}
                      disabled={phoneCallState === "dialing"}
                    >
                      {phoneCallState === "dialing" ? (
                        <span>Placing Outbound Call…</span>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          <span>Call My Phone Now</span>
                        </>
                      )}
                    </button>

                    {phoneStatusMsg && (
                      <p style={{
                        margin: "0",
                        fontSize: "13px",
                        color: phoneCallState === "error" ? "#dc2626" : "#0e6f62",
                        fontWeight: 700,
                        textAlign: "center"
                      }}>
                        {phoneStatusMsg}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LOGO MARQUEE */}
        <section className={styles.marqueeSection} aria-label="Companies using modern voice workflows">
          <p className={styles.marqueeSubtitle}>Trusted By Forward-Thinking Operations &amp; Support Teams</p>
          <div className={styles.marqueeTrackWrap}>
            <div className={styles.marqueeTrack}>
              <span className={styles.marqueeLogoItem}>Deloitte.</span>
              <span className={styles.marqueeLogoItem}>Zendesk</span>
              <span className={styles.marqueeLogoItem}>Salesforce</span>
              <span className={styles.marqueeLogoItem}>appsmith_</span>
              <span className={styles.marqueeLogoItem}>Vigilant</span>
              <span className={styles.marqueeLogoItem}>DigitalBot</span>
              <span className={styles.marqueeLogoItem}>Edison AI</span>
              <span className={styles.marqueeLogoItem}>Kobe Creations</span>
              <span className={styles.marqueeLogoItem}>Simplamo</span>
              <span className={styles.marqueeLogoItem}>Soulpage</span>
              {/* Duplicate for seamless infinite loop */}
              <span className={styles.marqueeLogoItem}>Deloitte.</span>
              <span className={styles.marqueeLogoItem}>Zendesk</span>
              <span className={styles.marqueeLogoItem}>Salesforce</span>
              <span className={styles.marqueeLogoItem}>appsmith_</span>
              <span className={styles.marqueeLogoItem}>Vigilant</span>
              <span className={styles.marqueeLogoItem}>DigitalBot</span>
              <span className={styles.marqueeLogoItem}>Edison AI</span>
              <span className={styles.marqueeLogoItem}>Kobe Creations</span>
              <span className={styles.marqueeLogoItem}>Simplamo</span>
              <span className={styles.marqueeLogoItem}>Soulpage</span>
            </div>
          </div>
        </section>

        {/* THE INDIAN VOICE ADVANTAGE */}
        <section className={styles.advantageSection}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>The Indian Voice Advantage</span>
            <h2 className={styles.sectionHeading}>Why India&apos;s Leading Teams Switch From US Tools To Vozon.</h2>
            <p className={styles.sectionDesc}>
              Traditional voice tools struggle with Indian accents, 080 spam flags, and rigid telecom rules. Vozon is engineered from day one for Indian telephony and local customer trust.
            </p>
          </div>

          <div className={styles.advantageGrid}>
            <div className={styles.advantageCard}>
              <div>
                <span className={styles.advantageBadge}>High Pickup Telephony</span>
                <div className={styles.advantageIcon}>📱</div>
                <h3>Smart Virtual Telephony &amp; BYOT</h3>
                <p>
                  US platforms lock you into rigid 080 trunks that get flagged as spam. Vozon provides enterprise local virtual numbers and Bring-Your-Own-Carrier (BYOT) support across Exotel, Airtel, and Tata.
                </p>
              </div>

              <div className={styles.advantageStatBox}>
                <div className={styles.statRow}>
                  <span>Unverified 080 Trunks</span>
                  <b style={{ color: "#ef4444" }}>~22% pickup</b>
                </div>
                <div className={styles.statRow}>
                  <span>Vozon Smart Telephony</span>
                  <b className={styles.statHighlight}>~74% pickup</b>
                </div>
              </div>
            </div>

            <div className={styles.advantageCard}>
              <div>
                <span className={styles.advantageBadge}>Native Indic Engine</span>
                <div className={styles.advantageIcon}>🇮🇳</div>
                <h3>Hinglish &amp; 22+ Regional Dialects</h3>
                <p>
                  Powered by Sarvam Bulbul and Indic-tuned frontier models. Your agents understand colloquial phrasing, native pronunciation, and switch naturally between Hindi and English mid-sentence.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["हिन्दी (Hindi)", "Hinglish", "मराठी", "தமிழ்", "తెలుగు", "বাংলা", "ગુજરાતી"].map((tag) => (
                  <span key={tag} style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    background: "#f0fdf9",
                    border: "1px solid rgba(16, 141, 130, 0.2)",
                    color: "#0e6f62",
                    fontWeight: 600
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.advantageCard}>
              <div>
                <span className={styles.advantageBadge}>Zero Friction Setup</span>
                <div className={styles.advantageIcon}>⚡</div>
                <h3>Sheets to Enterprise MCP</h3>
                <p>
                  No developers needed: paste a Google Sheet to launch outbound dialer campaigns in 60 seconds. For engineers, we provide India&apos;s only Model Context Protocol (MCP) server &amp; &lt;350ms WebRTC.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "#334155", fontWeight: 600 }}>
                <span>✓ Google Sheets auto-sync</span>
                <span>✓ Bi-directional CRM webhooks</span>
                <span>✓ TRAI compliant call windows</span>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID: CAPABILITIES IN LIGHT THEME */}
        <section className={styles.bentoSection} id="platform">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Enterprise Voice Architecture</span>
            <h2 className={styles.sectionHeading}>Engineered For Sub-Second Precision &amp; Verified Business Outcomes.</h2>
            <p className={styles.sectionDesc}>
              Traditional voice bots force customers to endure 2–4 seconds of awkward delay between turns.
              Vozon’s distributed streaming audio stack responds in under 350ms—faster than average human reaction time.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Bento Card 1: Sub-400ms Streaming Audio Pipeline */}
            <div className={`${styles.bentoCard} ${styles.bentoCol8}`}>
              <div>
                <span className={styles.bentoBadge}>⚡ Sub-350ms Streaming Architecture</span>
                <h3 className={styles.bentoCardTitle}>Zero-Buffering Real-Time Telephony Pipeline</h3>
                <p className={styles.bentoCardDesc}>
                  Every audio packet is transcribed, reasoned over, and vocalized in chunks. Callers experience immediate natural barge-in without lag or clipped sentences.
                </p>

                <div className={styles.latencyPipelineRow}>
                  <div className={styles.pipelineItem}>
                    <span className={styles.pipelineSpeed}>~90ms</span>
                    <span className={styles.pipelineName}>Streaming ASR</span>
                    <span className={styles.pipelineDetail}>Deepgram / Sarvam</span>
                  </div>

                  <div className={styles.pipelineItem}>
                    <span className={styles.pipelineSpeed}>~160ms</span>
                    <span className={styles.pipelineName}>LLM TTFT</span>
                    <span className={styles.pipelineDetail}>GPT-4o / Gemini Flash</span>
                  </div>

                  <div className={styles.pipelineItem}>
                    <span className={styles.pipelineSpeed}>~95ms</span>
                    <span className={styles.pipelineName}>Neural TTS</span>
                    <span className={styles.pipelineDetail}>Sarvam Bulbul &amp; 11Labs</span>
                  </div>

                  <div className={styles.pipelineItem}>
                    <span className={styles.pipelineSpeed}>~35ms</span>
                    <span className={styles.pipelineName}>WebRTC Edge</span>
                    <span className={styles.pipelineDetail}>Distributed LiveKit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Native Indic Multilingual Engine */}
            <div className={`${styles.bentoCard} ${styles.bentoCol4}`}>
              <div>
                <span className={styles.bentoBadge}>🇮🇳 22+ Indic &amp; Global Languages</span>
                <h3 className={styles.bentoCardTitle}>Colloquial Hinglish &amp; Dialects</h3>
                <p className={styles.bentoCardDesc}>
                  Understands code-switching, local pronunciations, and business phrases across Hindi, Tamil, Telugu, Gujarati, Marathi, Bengali, and English.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
                {["हिन्दी", "Hinglish", "தமிழ்", "తెలుగు", "मराठी", "ગુજરાતી", "বাংলা", "ಕನ್ನಡ"].map((l) => (
                  <span key={l} style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    background: "#f0fdf9",
                    border: "1px solid rgba(16, 141, 130, 0.2)",
                    color: "#0e6f62",
                    fontWeight: 600
                  }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Card 3: 1-Click Google Sheets Outbound Dialer */}
            <div className={`${styles.bentoCard} ${styles.bentoCol6}`}>
              <div>
                <span className={styles.bentoBadge}>📊 Autonomous Outbound Dialing</span>
                <h3 className={styles.bentoCardTitle}>1-Click Google Sheets Campaign Launcher</h3>
                <p className={styles.bentoCardDesc}>
                  Paste any Google Sheet URL with your prospect list. The platform triggers parallel outbound calls, logs live call recordings, and writes back confirmed booking status instantly.
                </p>

                <div className={styles.sheetsPreviewBox}>
                  <div className={styles.sheetsRowHeader}>
                    <span>Contact Name</span>
                    <span>Phone Number</span>
                    <span>Status</span>
                    <span>Result</span>
                  </div>
                  <div className={styles.sheetsRowData}>
                    <span>Rajesh Verma</span>
                    <span>+91 98201 44xxx</span>
                    <span className={styles.statusDialed}>✓ Confirmed</span>
                    <span>2:30 PM</span>
                  </div>
                  <div className={styles.sheetsRowData}>
                    <span>Anita Desai</span>
                    <span>+91 98450 12xxx</span>
                    <span className={styles.statusCalling}>● Live Call</span>
                    <span>Inquiry</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Enterprise Tool Calling & Integrations */}
            <div className={`${styles.bentoCard} ${styles.bentoCol6}`}>
              <div>
                <span className={styles.bentoBadge}>🔗 Enterprise Business Integrations</span>
                <h3 className={styles.bentoCardTitle}>Direct CRM &amp; Telephony Action Sync</h3>
                <p className={styles.bentoCardDesc}>
                  Agents don&apos;t just chat—they take action. Sync with Google Calendar, HubSpot, Salesforce, Exotel, Twilio, or trigger custom Webhooks while on the phone call.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "16px" }}>
                {[
                  { name: "Google Calendar", type: "Booking" },
                  { name: "HubSpot CRM", type: "Lead Sync" },
                  { name: "Salesforce", type: "Enterprise" },
                  { name: "Exotel & Twilio", type: "Telephony" },
                  { name: "REST Webhooks", type: "Custom API" },
                  { name: "Calendly", type: "Meetings" },
                ].map((item) => (
                  <div key={item.name} style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                    color: "#0f172a"
                  }}>
                    <b style={{ display: "block" }}>{item.name}</b>
                    <small style={{ color: "#64748b" }}>{item.type}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4-STEP IMPLEMENTATION ARCHITECTURE */}
        <section className={styles.workflowSection} id="workflow">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Simple Implementation</span>
            <h2 className={styles.sectionHeading}>Go Live In Four Clear Steps.</h2>
            <p className={styles.sectionDesc}>
              Configure your agent persona, select your latency-optimized model stack, test in our sandbox, and connect phone lines in under 10 minutes.
            </p>
          </div>

          <div className={styles.workflowGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>01</span>
                <span className={styles.stepCategory}>Studio Persona</span>
              </div>
              <h3 className={styles.stepTitle}>Configure Agent &amp; Knowledge</h3>
              <p className={styles.stepCopy}>
                Upload PDFs, website URLs, and company guidelines. Set smart transfer rules for human escalation.
              </p>
              <div className={styles.stepVisualBox}>
                <span style={{ color: "#0e6f62", fontWeight: 700 }}>✓ RAG Vector Synced</span>
                <p style={{ margin: "4px 0 0", color: "#64748b" }}>knowledge_base.pdf (Indexed)</p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>02</span>
                <span className={styles.stepCategory}>Model Stack</span>
              </div>
              <h3 className={styles.stepTitle}>Select Low-Latency Models</h3>
              <p className={styles.stepCopy}>
                Choose OpenAI GPT-4o, Google Gemini 2.0 Flash, or Sarvam Indic LLM optimized for real-time speech.
              </p>
              <div className={styles.stepVisualBox}>
                <span style={{ color: "#0284c7", fontWeight: 700 }}>⚡ Gemini 2.0 Flash</span>
                <p style={{ margin: "4px 0 0", color: "#64748b" }}>First-Token TTFT &lt;160ms</p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>03</span>
                <span className={styles.stepCategory}>Neural Voice</span>
              </div>
              <h3 className={styles.stepTitle}>Pick Voices &amp; Languages</h3>
              <p className={styles.stepCopy}>
                Select hyper-realistic voices across 22+ Indian and global languages powered by Sarvam Bulbul and ElevenLabs.
              </p>
              <div className={styles.stepVisualBox}>
                <span style={{ color: "#d97706", fontWeight: 700 }}>🎙️ Sarvam Bulbul HD</span>
                <p style={{ margin: "4px 0 0", color: "#64748b" }}>24kHz Expressive Neural Audio</p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>04</span>
                <span className={styles.stepCategory}>Telephony</span>
              </div>
              <h3 className={styles.stepTitle}>Deploy Phone Lines &amp; Web</h3>
              <p className={styles.stepCopy}>
                Attach virtual DIDs, connect Exotel/Twilio SIP trunks, or embed our WebRTC widget on your site.
              </p>
              <div className={styles.stepVisualBox}>
                <span style={{ color: "#7c3aed", fontWeight: 700 }}>📞 Omnichannel Active</span>
                <p style={{ margin: "4px 0 0", color: "#64748b" }}>PSTN + SIP + Browser WebRTC</p>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRY SOLUTIONS TABS */}
        <section className={styles.industrySection} id="solutions">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Proven Industry Solutions</span>
            <h2 className={styles.sectionHeading}>Built For Businesses That Run On Phone Calls.</h2>
            <p className={styles.sectionDesc}>
              Whether qualifying financial leads, triaging hospital patients, or confirming high-value real estate inquiries, Vozon automates conversations without losing the human touch.
            </p>
          </div>

          <div className={styles.industryTabNav}>
            {INDUSTRIES.map((ind, idx) => (
              <button
                key={ind.id}
                type="button"
                className={`${styles.industryTabButton} ${activeIndustryIndex === idx ? styles.industryTabButtonActive : ""}`}
                onClick={() => setActiveIndustryIndex(idx)}
              >
                <span>{ind.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.industryDisplayCard}>
            <div className={styles.industryCopy}>
              <h3>{activeIndustry.title}</h3>
              <p>{activeIndustry.copy}</p>

              <div className={styles.industryMetricRow}>
                <div className={styles.industryMetricItem}>
                  <span className={styles.industryMetricNumber}>{activeIndustry.metric1}</span>
                  <span className={styles.industryMetricLabel}>{activeIndustry.metric1Label}</span>
                </div>

                <div className={styles.industryMetricItem}>
                  <span className={styles.industryMetricNumber}>{activeIndustry.metric2}</span>
                  <span className={styles.industryMetricLabel}>{activeIndustry.metric2Label}</span>
                </div>
              </div>

              <Link href="/contact" className={styles.primaryCta} style={{ alignSelf: "flex-start" }}>
                <span>Request {activeIndustry.label} Demo</span>
              </Link>
            </div>

            <div style={{
              borderRadius: "18px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              padding: "26px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span className={styles.toolBadge}>Scenario: {activeIndustry.intent}</span>
                <span style={{ fontSize: "12px", color: "#0e6f62", fontWeight: 700 }}>⚡ {activeIndustry.latency}</span>
              </div>

              <div className={styles.callerMessage} style={{ marginBottom: "14px" }}>
                <div className={styles.callerHeader}><span>👤 Caller</span></div>
                <p className={styles.callerText}>{activeIndustry.caller}</p>
              </div>

              <div className={styles.agentMessage}>
                <div className={styles.agentHeader}>
                  <span>🤖 Vozon Agent</span>
                  <span>Live Streamed</span>
                </div>
                <p className={styles.agentText}>{activeIndustry.agent}</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className={styles.comparisonSection}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Competitive Superiority</span>
            <h2 className={styles.sectionHeading}>Why Leading Teams Choose Vozon Over US Platforms.</h2>
            <p className={styles.sectionDesc}>
              US voice tools struggle with Indian telephone networks, 080 spam tags, and regional accents. Vozon is built from day one for Indian telephony compliance and global voice quality.
            </p>
          </div>

          <div className={styles.comparisonTableWrap}>
            <div className={`${styles.compTableRow} ${styles.compTableHead}`}>
              <span>Capability / Architecture</span>
              <span style={{ color: "#0e6f62" }}>Vozon Platform</span>
              <span>US Platforms (Vapi / Retell)</span>
            </div>

            <div className={styles.compTableRow}>
              <span className={styles.compFeatureName}>Local Telephony &amp; Pickup Rates</span>
              <span className={styles.compVozonCol}>~74% Pickup (Verified Local DIDs &amp; BYOT)</span>
              <span className={styles.compOthersCol}>~22% Pickup (Generic 080 spam flags)</span>
            </div>

            <div className={styles.compTableRow}>
              <span className={styles.compFeatureName}>Hinglish &amp; Indic Dialect Nuance</span>
              <span className={styles.compVozonCol}>Native Sarvam Indic + Bulbul Models</span>
              <span className={styles.compOthersCol}>Robotic US-accented translations</span>
            </div>

            <div className={styles.compTableRow}>
              <span className={styles.compFeatureName}>End-to-End Voice Latency</span>
              <span className={styles.compVozonCol}>&lt;350ms (In-country edge routing)</span>
              <span className={styles.compOthersCol}>1,200ms – 2,400ms (Cross-continent)</span>
            </div>

            <div className={styles.compTableRow}>
              <span className={styles.compFeatureName}>Google Sheets Outbound Dialer</span>
              <span className={styles.compVozonCol}>Built-in 1-Click Instant Sync</span>
              <span className={styles.compOthersCol}>Requires complex custom webhook code</span>
            </div>

            <div className={styles.compTableRow}>
              <span className={styles.compFeatureName}>TRAI &amp; Telecom Compliance</span>
              <span className={styles.compVozonCol}>Automated Calling Windows &amp; DND Filters</span>
              <span className={styles.compOthersCol}>No native Indian telecom safeguards</span>
            </div>
          </div>
        </section>

        {/* CUSTOMER TESTIMONIALS */}
        <section className={styles.reviewsSection} id="reviews">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Customer Success</span>
            <h2 className={styles.sectionHeading}>What Production Teams Say.</h2>
            <p className={styles.sectionDesc}>
              Real businesses automating customer support, patient appointments, and outbound sales with Vozon.
            </p>
          </div>

          <div className={styles.reviewsGrid}>
            {customerReviews.slice(0, 6).map((item, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div>
                  <div className={styles.reviewStars}>★★★★★</div>
                  <blockquote className={styles.reviewQuote}>&ldquo;{item.quote}&rdquo;</blockquote>
                </div>

                <div className={styles.reviewAuthor}>
                  <div className={styles.authorInitial}>
                    {item.name.charAt(0)}
                  </div>
                  <div className={styles.authorDetails}>
                    <b>{item.name}</b>
                    <small>{item.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMPLIANCE & FAQ SECTION */}
        <section className={styles.faqSection} id="faq">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Enterprise Trust &amp; FAQ</span>
            <h2 className={styles.sectionHeading}>Frequently Asked Questions.</h2>
            <p className={styles.sectionDesc}>
              Everything you need to know about our voice architecture, telecom integrations, and data privacy.
            </p>
          </div>

          <div className={styles.complianceRow}>
            <div className={styles.complianceBadge}>
              <span>🔒 SOC-2 Type II Certified</span>
            </div>
            <div className={styles.complianceBadge}>
              <span>⚕️ HIPAA Compliant</span>
            </div>
            <div className={styles.complianceBadge}>
              <span>🇪🇺 GDPR Ready</span>
            </div>
            <div className={styles.complianceBadge}>
              <span>🛡️ ISO 27001 Validated</span>
            </div>
          </div>

          <div className={styles.faqAccordion}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon} style={{ transform: openFaq === idx ? "rotate(45deg)" : "none" }}>
                    +
                  </span>
                </button>
                {openFaq === idx && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PRE-FOOTER CTA (LIGHT RADIANT THEME) */}
        <section className={styles.preFooterCta}>
          <div className={styles.preFooterBox}>
            <h2 className={styles.preFooterTitle}>Ready To Automate Your High-Volume Phone Calls?</h2>
            <p className={styles.preFooterDesc}>
              Start with complimentary test minutes. Deploy your first intelligent AI voice agent in minutes with zero credit card required.
            </p>
            <div className={styles.heroActions} style={{ marginBottom: 0 }}>
              <Link href="/login" className={styles.primaryCta}>
                <span>Get Started Free</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
              </Link>
              <Link href="/contact" className={styles.secondaryCta}>
                <span>Book a Demo</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* CLEAN SITE FOOTER */}
      <footer className={styles.modernFooter}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrandCol}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>vozon</span>
              <span className={styles.systemStatusPill}>
                <span className={styles.pulsingDot} />
                <span>All Systems Operational</span>
              </span>
            </div>
            <p>
              Next-generation conversational voice AI platform powering ultra-low latency phone agents, automated lead qualification, and multilingual customer support.
            </p>
            <div style={{ display: "flex", gap: "14px", color: "#64748b" }}>
              <a href="https://x.com/vozonai_" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>X (Twitter)</a>
              <a href="https://linkedin.com/company/vozon-ai-india/" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>LinkedIn</a>
              <a href="mailto:hello@vozon.ai" style={{ color: "inherit" }}>hello@vozon.ai</a>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColTitle}>Product</h4>
            <div className={styles.footerLinks}>
              <Link href="/services/voice-agents">Voice Agents</Link>
              <Link href="/services/realtime-tts">Realtime TTS</Link>
              <Link href="/services/multilingual-speech">Multilingual Speech</Link>
              <Link href="/services/team-workflows">Team Workflows</Link>
              <Link href="/pricing">Pricing &amp; Plans</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColTitle}>Solutions</h4>
            <div className={styles.footerLinks}>
              <Link href="/business/industries/financial-services">Banking &amp; Finance</Link>
              <Link href="/business/industries/healthcare">Healthcare &amp; Clinics</Link>
              <Link href="/business/industries/home-services">Real Estate &amp; Auto</Link>
              <Link href="/business/industries/logistics">Logistics &amp; Delivery</Link>
              <Link href="/business/industries/travel-hospitality">Hospitality</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColTitle}>Integrations</h4>
            <div className={styles.footerLinks}>
              <Link href="/integrations">Integrations Catalog</Link>
              <Link href="/docs/api">API Documentation</Link>
              <Link href="/integrations/exotel">Exotel Telephony</Link>
              <Link href="/integrations/twilio">Twilio Trunking</Link>
              <Link href="/integrations/hubspot">HubSpot CRM</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerColTitle}>Company</h4>
            <div className={styles.footerLinks}>
              <Link href="/about">About Us</Link>
              <Link href="/career">Careers (Hiring)</Link>
              <Link href="/partners">Partners &amp; Resellers</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Vozon AI Platform. All rights reserved.</span>
          <span>Engineered for sub-second enterprise voice telephony.</span>
        </div>
      </footer>
    </div>
  );
}
