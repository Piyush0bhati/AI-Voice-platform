"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BackgroundAudioWaveCanvas } from "@/components/sections/BackgroundAudioWaveCanvas";
import ShaderBackground from "@/components/ui/shader-background";
import { Component as StarshipShader, type StarshipShaderPreset } from "@/components/ui/starship-shader";
import { useHomepageVoiceCall } from "@/components/sections/useHomepageVoiceCall";
import { customerReviews } from "@/config/customerReviews";
import { API_URL } from "@/lib/apiBase";
import styles from "./DistinctVoicePlatformHome.module.css";

/* Animated Rotating Headline Phrases */
const ROTATING_PHRASES = [
  "Actually Sound Human.",
  "Answer Inquiries 24/7.",
  "Book Appointments In Seconds.",
  "Qualify High-Value Leads.",
  "Speak 22+ Languages Fluently.",
  "Place 1,000s of Outbound Calls.",
];

/* Supported languages for live demo */
const DEMO_LANGUAGES = [
  { code: "English", label: "English", flag: "🌐", greeting: "Hello! How can I help you book or qualify your inquiry today?", agentReply: "I can check appointment slots with our team right away. Would morning or afternoon suit you better?", intent: "Appointment Scheduling", latency: "290ms" },
  { code: "Hindi", label: "हिन्दी (Hindi)", flag: "🇮🇳", greeting: "नमस्ते! मैं आपके अपॉइंटमेंट और पूछताछ में कैसे सहायता कर सकता हूँ?", agentReply: "नमस्ते! आपके लिए कल दोपहर 2:30 बजे का स्लॉट उपलब्ध है। क्या मैं इसे कन्फर्म कर दूँ?", intent: "Consultation Booking", latency: "310ms" },
  { code: "Hinglish", label: "Hinglish", flag: "🇮🇳", greeting: "Hi there! Aapki booking ya loan status mein kaise help kar sakta hoon?", agentReply: "Sure! Main aapka application number verify karke turant status SMS bhej deta hoon.", intent: "Status Verification", latency: "285ms" },
  { code: "Tamil", label: "தமிழ் (Tamil)", flag: "🇮🇳", greeting: "வணக்கம்! உங்கள் சேவை முன்பதிவுக்கு நான் எவ்வாறு உதவ முடியும்?", agentReply: "நிச்சயமாக! இன்று மாலை 4:00 மணிக்கு உங்கள் சந்திப்பு உறுதி செய்யப்பட்டுள்ளது.", intent: "Slot Confirmation", latency: "320ms" },
  { code: "Telugu", label: "తెలుగు (Telugu)", flag: "🇮🇳", greeting: "నమస్కారం! ఈ రోజు మీ ఎంక్వైరీకి నేను ఎలా సహాయపడగలను?", agentReply: "తప్పకుండా! మీ డాక్యుమెంట్లు పరిశీలించబడ్డాయి మరియు అప్రూవల్ స్టేజ్‌లో ఉన్నాయి.", intent: "Lead Follow-up", latency: "315ms" },
  { code: "Gujarati", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳", greeting: "નમસ્તે! તમારી બુકિંગ અથવા સેવા માટે હું કેવી રીતે મદદ કરી શકું?", agentReply: "ચોક્કસ, હું તમારી નવી વિગતો નોંધી લઉં છું અને પ્રતિનિધિ તરત સંપર્ક કરશે.", intent: "Customer Care", latency: "305ms" },
  { code: "Marathi", label: "मराठी (Marathi)", flag: "🇮🇳", greeting: "नमस्कार! आज आम्ही आपल्या सेवेत कशी मदत करू शकतो?", agentReply: "होय, आपल्या खात्याची माहिती अपडेट केली आहे आणि पुष्टीकरण संदेश पाठवला आहे.", intent: "Account Update", latency: "310ms" },
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
    metric2Label: "Faster Processing",
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

/* Showcase Integrations */
const SHOWCASE_INTEGRATIONS = [
  { slug: "hubspot", name: "HubSpot", category: "CRM & Sales", logo: "/images/company-logos/hubspot.svg", description: "Sync contacts, call summaries, and follow-up tasks in real time.", capabilities: ["Contacts", "Call notes", "Follow-up"] },
  { slug: "salesforce", name: "Salesforce", category: "CRM & Sales", logo: "/images/integrations/salesforce.svg", description: "Send qualified lead details and conversation outcomes directly into Salesforce.", capabilities: ["Lead updates", "Activities", "Workflows"] },
  { slug: "google-calendar", name: "Google Calendar", category: "Scheduling", logo: "/images/integrations/google-calendar.svg", description: "Check availability and book appointments live while the caller is speaking.", capabilities: ["Availability", "Booking", "Reminders"] },
  { slug: "zoho", name: "Zoho CRM", category: "CRM & Sales", logo: "/images/integrations/zoho.svg", description: "Connect qualified leads and call transcripts with Zoho CRM pipelines.", capabilities: ["Lead capture", "Deals", "Outcomes"] },
  { slug: "twilio", name: "Twilio", category: "Telephony", logo: "/images/integrations/twilio.svg", description: "Use your Twilio phone numbers for inbound and outbound voice agent calls.", capabilities: ["Phone numbers", "Inbound", "Outbound"] },
  { slug: "exotel", name: "Exotel", category: "Telephony", logo: "/images/integrations/exotel.png", description: "Direct Indian telephony interconnect with local CLI numbers and call routing.", capabilities: ["Indian CLI", "Routing", "SMS alerts"] },
  { slug: "google-sheets", name: "Google Sheets", category: "Automation", logo: "/images/integrations/google-sheets.svg", description: "1-Click outbound calling directly from any spreadsheet URL.", capabilities: ["Batch calls", "Real-time sync", "Reporting"] },
  { slug: "zapier", name: "Zapier", category: "Automation", logo: "/images/integrations/zapier.png", description: "Trigger actions across 5,000+ apps when call milestones or intents occur.", capabilities: ["Webhooks", "Triggers", "Workflows"] },
  { slug: "elevenlabs", name: "ElevenLabs", category: "Voices", logo: "/images/integrations/elevenlabs.png", description: "Studio-grade neural speech synthesis and ultra-natural voice cloning.", capabilities: ["Voice cloning", "Low latency", "Multilingual"] },
  { slug: "sarvam-voice", name: "Sarvam AI", category: "Voices", logo: "/images/integrations/sarvam.png", description: "Native speech models tuned specifically for Indian accents and 22+ languages.", capabilities: ["Hinglish", "Indic dialects", "Phonemes"] },
  { slug: "google-gemini", name: "Google Gemini", category: "Models", logo: "/images/integrations/gemini.png", description: "Ultra-fast first-token streaming reasoning via Gemini 2.0 Flash.", capabilities: ["Low TTFT", "Multimodal", "Tool use"] },
  { slug: "openai", name: "OpenAI", category: "Models", logo: "/images/integrations/openai.png", description: "Enterprise GPT-4o reasoning with strict guardrails and intent classification.", capabilities: ["GPT-4o", "Realtime", "Guardrails"] },
];

const INTEGRATION_FILTER_TABS = ["All", "CRM & Sales", "Scheduling", "Telephony", "Automation", "Voices & Models"] as const;

/* AI Voice of Customer (VoC) Insight Pillars */
const AI_INSIGHT_PILLARS = [
  {
    icon: "📈",
    title: "Customer Sentiment & Emotion",
    copy: "Analyzes phonetic pitch, speech pace, and emotional tone across 22+ languages to quantify caller satisfaction live.",
    metric: "99.2%",
    metricLabel: "Accuracy",
  },
  {
    icon: "🎯",
    title: "Automated QA & Script Adherence",
    copy: "Evaluates 100% of calls against compliance rules, required disclosures, and qualification playbooks without human sampling.",
    metric: "100%",
    metricLabel: "Audit Coverage",
  },
  {
    icon: "🔍",
    title: "Intent Detection & Topic Clustering",
    copy: "Automatically groups customer inquiries, objections, and feature requests to surface emerging trends in real time.",
    metric: "40+",
    metricLabel: "Intent Categories",
  },
  {
    icon: "⚡",
    title: "Live Volume Forecasting & Escalation",
    copy: "Predicts peak call volumes and flags frustrated callers early for instant warm transfer to human supervisors.",
    metric: "<350ms",
    metricLabel: "Telemetry Speed",
  },
];

export function DistinctVoicePlatformHome({
  showHeader = true,
}: {
  showHeader?: boolean;
} = {}) {
  /* Text Animation: Cycle phrases every 2.4s */
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  /* Terminal States */
  const [terminalTab, setTerminalTab] = useState<"webrtc" | "phone">("webrtc");
  const [selectedLangIdx, setSelectedLangIdx] = useState(0);
  const [activeIndIdx, setActiveIndIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* Background Visual Mode & Shader Shades */
  const [bgVisualMode, setBgVisualMode] = useState<"shader" | "waves" | "starship">("waves");
  const [activeShaderShade, setActiveShaderShade] = useState<StarshipShaderPreset>("nebula");

  /* Integrations Category Filter */
  const [selectedIntegrationTab, setSelectedIntegrationTab] = useState<string>("All");
  const filteredIntegrations = SHOWCASE_INTEGRATIONS.filter((item) => {
    if (selectedIntegrationTab === "All") return true;
    if (selectedIntegrationTab === "Voices & Models") {
      return item.category === "Voices" || item.category === "Models";
    }
    return item.category === selectedIntegrationTab;
  });

  /* WebRTC Voice Hook */
  const voiceCall = useHomepageVoiceCall();
  const currentLang = DEMO_LANGUAGES[selectedLangIdx];

  /* Outbound Phone Form State */
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [phoneCallState, setPhoneCallState] = useState<"idle" | "dialing" | "ringing" | "connected" | "error">("idle");
  const [phoneStatusMsg, setPhoneStatusMsg] = useState("");

  /* Interactive ROI Calculator State */
  const [callVolume, setCallVolume] = useState(5000);
  const [avgCallDuration, setAvgCallDuration] = useState(3);

  const calculatedMinutes = callVolume * avgCallDuration;
  const humanCost = calculatedMinutes * 14; // Approx ₹14 per minute with support reps
  const vozonCost = calculatedMinutes * 3.5; // Approx ₹3.5 per minute on Vozon
  const monthlySavings = Math.round(humanCost - vozonCost);
  const hoursSaved = Math.round(calculatedMinutes / 60);

  const handleSelectLang = (idx: number) => {
    setSelectedLangIdx(idx);
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

  const activeIndustry = INDUSTRIES[activeIndIdx];

  return (
    <div className={styles.pageWrapper}>
      {/* DYNAMIC ANIMATED BACKGROUND: GLOWING AUDIO WAVE SHADER BACKGROUND */}
      <div className={`${styles.waveCanvasBackground} ${bgVisualMode === "starship" ? styles.starshipCanvasBg : ""}`}>
        {bgVisualMode === "shader" ? (
          <ShaderBackground speed={1.0} waveCount={11} interactive={true} />
        ) : bgVisualMode === "waves" ? (
          <BackgroundAudioWaveCanvas />
        ) : (
          <StarshipShader preset={activeShaderShade} interactive={true} streakDensity={1.2} />
        )}
      </div>

      {/* Ambient background mesh & light grids */}
      <div className={styles.ambientLightMesh} aria-hidden="true" />
      <div className={styles.ambientDotPattern} aria-hidden="true" />

      {/* Floating Global Header */}
      {showHeader && <SiteHeader />}

      <main>
        {/* ========================================================
            HERO: DISTINCT SPLIT SCREEN LAYOUT WITH ROTATING TEXT
            ======================================================== */}
        <section className={styles.heroSection} id="voice-terminal">
          <div className={styles.heroSplitGrid}>
            {/* Left Column: Headline with Animated Text & CTAs */}
            <div className={styles.heroContentLeft}>
              {/* Visual Mode & Animation Switcher */}
              <div className={styles.visualModeToolbar}>
                <div className={styles.visualModePills}>
                  {/* <button
                    type="button"
                    onClick={() => setBgVisualMode("shader")}
                    className={`${styles.modeToggleBtn} ${bgVisualMode === "shader" ? styles.modeToggleActive : ""}`}
                  >
                    <span>✨</span> Glowing Wave (Image Style)
                  </button> */}
                  <button
                    type="button"
                    onClick={() => setBgVisualMode("waves")}
                    className={`${styles.modeToggleBtn} ${bgVisualMode === "waves" ? styles.modeToggleActive : ""}`}
                  >
                    <span>🌊</span> Audio Waves
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => setBgVisualMode("starship")}
                    className={`${styles.modeToggleBtn} ${bgVisualMode === "starship" ? styles.modeToggleActive : ""}`}
                  >
                    <span>🚀</span> Starship
                  </button> */}
                </div>

                {bgVisualMode === "starship" && (
                  <div className={styles.shaderShadesSubPills}>
                    <span className={styles.shadesSubLabel}>Shades:</span>
                    {(
                      [
                        { id: "nebula", label: "Deep Nebula", color: "#38bdf8" },
                        { id: "starship", label: "Starship Reentry", color: "#f97316" },
                        { id: "aurora", label: "Aurora", color: "#34d399" },
                        { id: "cyberpunk", label: "Cyberpunk", color: "#ec4899" },
                        { id: "light-prism", label: "Light Prism", color: "#6366f1" },
                      ] as const
                    ).map((shade) => (
                      <button
                        key={shade.id}
                        type="button"
                        onClick={() => setActiveShaderShade(shade.id)}
                        className={`${styles.shadePillBtn} ${activeShaderShade === shade.id ? styles.shadePillBtnActive : ""}`}
                      >
                        <span style={{ backgroundColor: shade.color }} className={styles.shadeColorDot} />
                        {shade.label}
                      </button>
                    ))}
                    <Link href="/demo" className={styles.fullscreenShaderLink} target="_blank">
                      Fullscreen ↗
                    </Link>
                  </div>
                )}
              </div>

              <div className={styles.pillBeaconBadge}>
                <span className={styles.beaconDot} />
                <span className={styles.beaconBadgeText}>Next-Gen Conversational Voice AI • &lt;350ms Latency</span>
              </div>

              <h1 className={styles.heroTitleMain}>
                AI Voice Agents That<br />
                <span className={styles.animatedTextWrapper}>
                  <span key={phraseIndex} className={styles.animatedTextItem}>
                    {ROTATING_PHRASES[phraseIndex]}
                  </span>
                </span>
              </h1>

              <p className={styles.heroDescription}>
                Deploy human-sounding conversational voice AI for inbound customer support, lead qualification, and outbound campaigns. Built-in telephony, real-time barge-in, and native fluency in Hindi, Hinglish, and 22+ Indic languages.
              </p>

              <div className={styles.heroButtonCluster}>
                <Link href="/login" className={styles.primaryActionBtn}>
                  <span>Get Started Free</span>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
                </Link>

                <Link href="/contact" className={styles.secondaryActionBtn}>
                  <span>Book Live Demo</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>

              {/* Floating SLA & Latency Ribbon */}
              <div className={styles.metricsBarHorizontal}>
                <div className={styles.metricPill}>
                  <span className={styles.metricPillIcon}>⚡</span>
                  <span><b>&lt;350ms</b> Telephony</span>
                </div>
                <div className={styles.metricPill}>
                  <span className={styles.metricPillIcon}>🇮🇳</span>
                  <span><b>22+</b> Indic Languages</span>
                </div>
                <div className={styles.metricPill}>
                  <span className={styles.metricPillIcon}>📊</span>
                  <span><b>1-Click</b> Sheets Dialer</span>
                </div>
                <div className={styles.metricPill}>
                  <span className={styles.metricPillIcon}>📞</span>
                  <span><b>BYOT</b> Virtual Trunks</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Voice Terminal */}
            <div>
              <div className={styles.voiceTerminalCard} id="live-voice-sandbox">
                {/* Terminal Header */}
                <div className={styles.voiceTerminalHeader}>
                  <div className={styles.terminalModeTabs}>
                    <button
                      type="button"
                      className={`${styles.terminalTabBtn} ${terminalTab === "webrtc" ? styles.terminalTabBtnActive : ""}`}
                      onClick={() => setTerminalTab("webrtc")}
                    >
                      <span>🎙️ Live WebRTC Voice</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.terminalTabBtn} ${terminalTab === "phone" ? styles.terminalTabBtnActive : ""}`}
                      onClick={() => setTerminalTab("phone")}
                    >
                      <span>📱 Call My Phone</span>
                    </button>
                  </div>

                  <span className={styles.liveTagBadge}>
                    <span className={styles.beaconDot} />
                    <span>{voiceCall.active ? "Streaming 24kHz" : "Ready"}</span>
                  </span>
                </div>

                {/* Terminal Body */}
                {terminalTab === "webrtc" ? (
                  <>
                    {/* Animated Equalizer Stage */}
                    <div className={styles.soundwaveStage}>
                      <div className={`${styles.equalizerWaveform} ${voiceCall.active ? styles.eqActive : styles.eqIdle}`}>
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                        <span className={styles.eqBar} />
                      </div>

                      <button
                        type="button"
                        className={`${styles.terminalVoiceButton} ${
                          voiceCall.active
                            ? styles.voiceBtnEnd
                            : voiceCall.busy
                            ? styles.voiceBtnConnecting
                            : styles.voiceBtnStart
                        }`}
                        onClick={handleToggleVoiceCall}
                        disabled={!voiceCall.ready && !voiceCall.active && !voiceCall.busy}
                      >
                        {voiceCall.active ? (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
                            <span>Disconnect Call</span>
                          </>
                        ) : voiceCall.busy ? (
                          <span>Connecting WebRTC…</span>
                        ) : (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2Z"/></svg>
                            <span>Talk in {currentLang.code}</span>
                          </>
                        )}
                      </button>

                      <p className={styles.voiceStatusCaption}>
                        {voiceCall.active
                          ? `Live call active in ${currentLang.label} • Real-time interruption enabled`
                          : `Click to speak directly via microphone with zero robotic delay.`}
                      </p>
                    </div>

                    {/* Language Switcher Pills */}
                    <div>
                      <div className={styles.langPillContainer}>
                        {DEMO_LANGUAGES.map((lang, idx) => (
                          <button
                            key={lang.code}
                            type="button"
                            className={`${styles.langPillItem} ${selectedLangIdx === idx ? styles.langPillItemActive : ""}`}
                            onClick={() => handleSelectLang(idx)}
                          >
                            <span>{lang.flag} {lang.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live Transcript Exchange */}
                    <div className={styles.transcriptExchangeBox}>
                      <div className={styles.transcriptBubbleUser}>
                        <div className={styles.bubbleSenderTag}>
                          <span>👤 Caller</span>
                        </div>
                        <p style={{ margin: 0 }}>{currentLang.greeting}</p>
                      </div>

                      <div className={styles.transcriptBubbleAgent}>
                        <div className={styles.bubbleSenderTag}>
                          <span>🤖 Vozon Agent</span>
                          <span>⚡ {currentLang.latency}</span>
                        </div>
                        <p style={{ margin: 0 }}>{currentLang.agentReply}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Mode B: Direct Mobile Outbound Dialer */
                  <form className={styles.terminalPhoneForm} onSubmit={handleInitiatePhoneCall}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase" }}>
                        1. Select Business Scenario
                      </label>
                      <div className={styles.phoneScenarioGrid}>
                        {SCENARIOS.map((sc) => (
                          <button
                            key={sc.id}
                            type="button"
                            className={`${styles.scenarioChipBtn} ${selectedScenario.id === sc.id ? styles.scenarioChipBtnActive : ""}`}
                            onClick={() => setSelectedScenario(sc)}
                          >
                            <span>{sc.icon}</span>
                            <div>
                              <b style={{ display: "block", fontSize: "12px" }}>{sc.label}</b>
                              <small style={{ color: "#64748b", fontSize: "10.5px" }}>{sc.persona}</small>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "8px", textTransform: "uppercase" }}>
                        2. Enter Your Phone Number
                      </label>
                      <div className={styles.phoneInputRow}>
                        <select
                          className={styles.countryCodeSelect}
                          value={selectedCountry.code}
                          onChange={(e) => {
                            const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                            if (found) setSelectedCountry(found);
                          }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>{c.flag} {c.label}</option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          className={styles.phoneNumberInput}
                          placeholder="e.g. 9876543210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.callNowSubmitBtn}
                      disabled={phoneCallState === "dialing"}
                    >
                      {phoneCallState === "dialing" ? "Initiating Call…" : "Call My Phone Now"}
                    </button>

                    {phoneStatusMsg && (
                      <p style={{
                        margin: 0,
                        fontSize: "12.5px",
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

        {/* ========================================================
            INFINITE BRAND LOGO MARQUEE
            ======================================================== */}
        <section className={styles.marqueeSectionWrap} aria-label="Customer logos">
          <p className={styles.marqueeHeadingText}>Powering Modern Support &amp; Outbound Operations</p>
          <div className={styles.marqueeMaskTrack}>
            <div className={styles.marqueeRibbonTrack}>
              <span className={styles.marqueeBrandName}>Deloitte.</span>
              <span className={styles.marqueeBrandName}>Zendesk</span>
              <span className={styles.marqueeBrandName}>Salesforce</span>
              <span className={styles.marqueeBrandName}>appsmith_</span>
              <span className={styles.marqueeBrandName}>Vigilant</span>
              <span className={styles.marqueeBrandName}>DigitalBot</span>
              <span className={styles.marqueeBrandName}>Edison AI</span>
              <span className={styles.marqueeBrandName}>Kobe Creations</span>
              <span className={styles.marqueeBrandName}>Simplamo</span>
              <span className={styles.marqueeBrandName}>Soulpage</span>
              {/* Loop repetition */}
              <span className={styles.marqueeBrandName}>Deloitte.</span>
              <span className={styles.marqueeBrandName}>Zendesk</span>
              <span className={styles.marqueeBrandName}>Salesforce</span>
              <span className={styles.marqueeBrandName}>appsmith_</span>
              <span className={styles.marqueeBrandName}>Vigilant</span>
              <span className={styles.marqueeBrandName}>DigitalBot</span>
              <span className={styles.marqueeBrandName}>Edison AI</span>
              <span className={styles.marqueeBrandName}>Kobe Creations</span>
              <span className={styles.marqueeBrandName}>Simplamo</span>
              <span className={styles.marqueeBrandName}>Soulpage</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            PIPELINE FLOW: VISUALIZING THE SUB-350MS LATENCY ENGINE
            ======================================================== */}
        <section className={styles.pipelineFlowSection} id="architecture">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>The Sub-350ms Miracle</span>
            <h2 className={styles.sectionMainHeading}>How Vozon Outpaces Traditional Voice Bots.</h2>
            <p className={styles.sectionLeadText}>
              Standard phone bots take 2 to 4 seconds to respond. Vozon streams audio in tiny chunks across four optimized stages, reacting faster than the human blink of an eye.
            </p>
          </div>

          <div className={styles.pipelineVisualGrid}>
            <div className={styles.pipelineCardItem}>
              <div>
                <span className={styles.pipelineSpeedTicker}>~90ms</span>
                <h3 className={styles.pipelineCardTitle}>1. Continuous Streaming ASR</h3>
                <p className={styles.pipelineCardDesc}>
                  Live phoneme recognition with background noise cancellation and Indian accent adaptation.
                </p>
              </div>
              <span className={styles.pipelineProviderTag}>Deepgram Nova-2 / Sarvam</span>
            </div>

            <div className={styles.pipelineCardItem}>
              <div>
                <span className={styles.pipelineSpeedTicker}>~160ms</span>
                <h3 className={styles.pipelineCardTitle}>2. First-Token TTFT Reasoning</h3>
                <p className={styles.pipelineCardDesc}>
                  Sub-second streaming LLM inference with immediate guardrails and structured tool extraction.
                </p>
              </div>
              <span className={styles.pipelineProviderTag}>GPT-4o / Gemini 2.0 Flash</span>
            </div>

            <div className={styles.pipelineCardItem}>
              <div>
                <span className={styles.pipelineSpeedTicker}>~95ms</span>
                <h3 className={styles.pipelineCardTitle}>3. Neural Speech Synthesis</h3>
                <p className={styles.pipelineCardDesc}>
                  Chunked audio generation directly into streaming buffers with human intonations and natural breaths.
                </p>
              </div>
              <span className={styles.pipelineProviderTag}>Sarvam Bulbul &amp; ElevenLabs</span>
            </div>

            <div className={styles.pipelineCardItem}>
              <div>
                <span className={styles.pipelineSpeedTicker}>~35ms</span>
                <h3 className={styles.pipelineCardTitle}>4. Global WebRTC Transport</h3>
                <p className={styles.pipelineCardDesc}>
                  Low-jitter audio packet delivery over globally distributed LiveKit edge edge servers.
                </p>
              </div>
              <span className={styles.pipelineProviderTag}>LiveKit Edge Network</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            ASYMMETRIC BENTO GRID: DISTINCT CAPABILITIES
            ======================================================== */}
        <section className={styles.bentoAsymmetricSection} id="capabilities">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>Platform Capabilities</span>
            <h2 className={styles.sectionMainHeading}>Engineered For Production Calling Workflows.</h2>
            <p className={styles.sectionLeadText}>
              Everything required to deploy, automate, and verify high-volume voice operations across Indian telephony and worldwide channels.
            </p>
          </div>

          <div className={styles.bentoContainer}>
            {/* Bento Block 1: 1-Click Google Sheets Campaign Launcher */}
            <div className={`${styles.bentoBlock} ${styles.bentoSpan7}`}>
              <div>
                <span className={styles.bentoTagBadge}>📊 Outbound Dialer Automation</span>
                <h3>1-Click Google Sheets Dialer</h3>
                <p>
                  Paste any spreadsheet URL. The platform validates phone numbers, runs parallel dial batches within TRAI hours, and writes call status back to your sheet in real time.
                </p>

                <div className={styles.sheetsSimulatorBox}>
                  <div className={styles.sheetsHeaderRow}>
                    <span>Contact Name</span>
                    <span>Phone Number</span>
                    <span>Status</span>
                    <span>Result</span>
                  </div>
                  <div className={styles.sheetsContentRow}>
                    <span>Vikram Malhotra</span>
                    <span>+91 98112 55xxx</span>
                    <span className={styles.statusTagConfirmed}>✓ Confirmed</span>
                    <span>Appt 3:30 PM</span>
                  </div>
                  <div className={styles.sheetsContentRow}>
                    <span>Pooja Sundaram</span>
                    <span>+91 97410 88xxx</span>
                    <span className={styles.statusTagDialing}>● Live In-Call</span>
                    <span>Inquiring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Block 2: Telephony Pickup Rate Advantage */}
            <div className={`${styles.bentoBlock} ${styles.bentoSpan5}`}>
              <div>
                <span className={styles.bentoTagBadge}>📞 High Pickup Telephony</span>
                <h3>Indian Telephony &amp; BYOT</h3>
                <p>
                  US tools force generic 080 trunks that get flagged as spam. Vozon provides verified local virtual DIDs and direct SIP carrier interconnect.
                </p>
              </div>

              <div className={styles.pickupRateComparison}>
                <div className={styles.pickupBarWrap}>
                  <div className={styles.pickupBarLabel}>
                    <span>Vozon Verified Local Telephony</span>
                    <span style={{ color: "#0e6f62" }}>~74% Pickup</span>
                  </div>
                  <div className={styles.pickupProgressBase}>
                    <div className={styles.pickupProgressGreen} />
                  </div>
                </div>

                <div className={styles.pickupBarWrap}>
                  <div className={styles.pickupBarLabel}>
                    <span>Unverified 080 Spam Trunks</span>
                    <span style={{ color: "#ef4444" }}>~22% Pickup</span>
                  </div>
                  <div className={styles.pickupProgressBase}>
                    <div className={styles.pickupProgressRed} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Block 3: Native Indic Dialect Engine */}
            <div className={`${styles.bentoBlock} ${styles.bentoSpan6}`}>
              <div>
                <span className={styles.bentoTagBadge}>🇮🇳 Colloquial Hinglish</span>
                <h3>Native Indic Speech &amp; Accents</h3>
                <p>
                  Callers switch between Hindi and English mid-sentence without losing intent. Built on Sarvam Indic and Bulbul acoustic models for natural phrasing.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["हिन्दी (Hindi)", "Hinglish", "தமிழ் (Tamil)", "తెలుగు (Telugu)", "मराठी (Marathi)", "ગુજરાતી (Gujarati)", "বাংলা (Bengali)"].map((lang) => (
                  <span key={lang} style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "12.5px",
                    background: "#f0fdf9",
                    border: "1px solid rgba(16, 141, 130, 0.25)",
                    color: "#0e6f62",
                    fontWeight: 700
                  }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Block 4: Zero-Friction CRM & Calendar Tool Calling */}
            <div className={`${styles.bentoBlock} ${styles.bentoSpan6}`}>
              <div>
                <span className={styles.bentoTagBadge}>⚡ Live Tool Calling</span>
                <h3>Direct CRM &amp; Calendar Actions</h3>
                <p>
                  Agents autonomously query Google Calendar for open slots, book Calendly meetings, update HubSpot / Salesforce records, or trigger custom Webhooks during the call.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { name: "Google Calendar", sub: "Live Scheduling" },
                  { name: "HubSpot CRM", sub: "Lead Sync" },
                  { name: "Exotel / Twilio", sub: "PSTN Carriers" },
                  { name: "Salesforce", sub: "Enterprise Data" },
                  { name: "Calendly", sub: "Instant Booking" },
                  { name: "Custom API", sub: "REST Webhooks" },
                ].map((item) => (
                  <div key={item.name} style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px"
                  }}>
                    <b style={{ display: "block", color: "#0f172a" }}>{item.name}</b>
                    <small style={{ color: "#64748b" }}>{item.sub}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            DISTINCT INTERACTIVE ROI CALCULATOR WIDGET
            ======================================================== */}
        <section className={styles.roiCalculatorSection}>
          <div className={styles.roiCardBox}>
            <div>
              <span className={styles.sectionEyebrowBadge}>Cost &amp; Time Calculator</span>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
                Estimate Your Monthly Savings
              </h2>
              <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, marginBottom: "24px" }}>
                See how much time and operational budget your team saves by automating routine calls with Vozon AI voice agents.
              </p>

              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabelRow}>
                  <span>Monthly Calling Contacts:</span>
                  <span style={{ color: "#0e6f62", fontWeight: 800 }}>{callVolume.toLocaleString()} calls</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={callVolume}
                  onChange={(e) => setCallVolume(Number(e.target.value))}
                  className={styles.sliderInput}
                />
              </div>

              <div className={styles.sliderGroup}>
                <div className={styles.sliderLabelRow}>
                  <span>Average Call Duration:</span>
                  <span style={{ color: "#0e6f62", fontWeight: 800 }}>{avgCallDuration} minutes</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={avgCallDuration}
                  onChange={(e) => setAvgCallDuration(Number(e.target.value))}
                  className={styles.sliderInput}
                />
              </div>
            </div>

            <div className={styles.roiResultsDisplay}>
              <div>
                <span className={styles.roiStatSub}>Estimated Monthly Savings</span>
                <div className={styles.roiStatValue}>₹{monthlySavings.toLocaleString()}</div>
                <span style={{ fontSize: "12px", color: "#0e6f62", fontWeight: 700 }}>
                  ~75% reduction vs manual call centers
                </span>
              </div>

              <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(16, 141, 130, 0.2)" }}>
                <span className={styles.roiStatSub}>Operator Time Saved</span>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>
                  {hoursSaved.toLocaleString()} hours / mo
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            INDUSTRY SOLUTIONS SHOWCASE (INTERACTIVE TABS)
            ======================================================== */}
        <section className={styles.industryShowcaseSection} id="solutions">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>Industry Tailored</span>
            <h2 className={styles.sectionMainHeading}>Purpose-Built For Conversational Businesses.</h2>
            <p className={styles.sectionLeadText}>
              Pre-configured scenarios and workflows designed for the highest-volume phone touchpoints.
            </p>
          </div>

          <div className={styles.industryTabRow}>
            {INDUSTRIES.map((ind, idx) => (
              <button
                key={ind.id}
                type="button"
                className={`${styles.indTabBtn} ${activeIndIdx === idx ? styles.indTabBtnActive : ""}`}
                onClick={() => setActiveIndIdx(idx)}
              >
                <span>{ind.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.industryPreviewBox}>
            <div>
              <h3 className={styles.indCopyTitle}>{activeIndustry.title}</h3>
              <p className={styles.indCopyBody}>{activeIndustry.copy}</p>

              <div className={styles.indMetricsPair}>
                <div className={styles.indMetricBox}>
                  <span className={styles.indMetricNum}>{activeIndustry.metric1}</span>
                  <span className={styles.indMetricLbl}>{activeIndustry.metric1Label}</span>
                </div>
                <div className={styles.indMetricBox}>
                  <span className={styles.indMetricNum}>{activeIndustry.metric2}</span>
                  <span className={styles.indMetricLbl}>{activeIndustry.metric2Label}</span>
                </div>
              </div>

              <Link href="/contact" className={styles.primaryActionBtn} style={{ width: "fit-content" }}>
                <span>Request {activeIndustry.label} Demo</span>
              </Link>
            </div>

            <div style={{
              borderRadius: "18px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              padding: "26px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.02)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span className={styles.bentoTagBadge} style={{ marginBottom: 0 }}>
                  Scenario: {activeIndustry.intent}
                </span>
                <span style={{ fontSize: "12px", color: "#0e6f62", fontWeight: 700 }}>
                  ⚡ {activeIndustry.latency}
                </span>
              </div>

              <div className={styles.transcriptBubbleUser} style={{ marginBottom: "12px" }}>
                <div className={styles.bubbleSenderTag}><span>👤 Caller</span></div>
                <p style={{ margin: 0 }}>{activeIndustry.caller}</p>
              </div>

              <div className={styles.transcriptBubbleAgent}>
                <div className={styles.bubbleSenderTag}>
                  <span>🤖 Vozon Agent</span>
                  <span>Streaming</span>
                </div>
                <p style={{ margin: 0 }}>{activeIndustry.agent}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            INTEGRATIONS ECOSYSTEM SECTION
            ======================================================== */}
        <section className={styles.integrationsSection} id="integrations">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>🔌 Turnkey Integrations</span>
            <h2 className={styles.sectionMainHeading}>Don’t Replace. Integrate.</h2>
            <p className={styles.sectionLeadText}>
              Connect Vozon AI voice agents to your existing telephony, CRM, calendars, enterprise APIs, and workflows in minutes with zero migration hassle.
            </p>
          </div>

          <div className={styles.integrationsTabsRow}>
            {INTEGRATION_FILTER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.integrationTabBtn} ${selectedIntegrationTab === tab ? styles.integrationTabBtnActive : ""}`}
                onClick={() => setSelectedIntegrationTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.integrationsGrid}>
            {filteredIntegrations.map((item) => (
              <div key={item.slug} className={styles.integrationCard}>
                <div>
                  <div className={styles.integrationCardHeader}>
                    <div className={styles.integrationLogoBox}>
                      <Image src={item.logo} alt={item.name} width={32} height={32} style={{ objectFit: "contain" }} />
                    </div>
                    <span className={styles.integrationStatusPill}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#108d82" }} />
                      Live Connect
                    </span>
                  </div>

                  <span className={styles.integrationCardCategory}>{item.category}</span>
                  <h4 className={styles.integrationCardTitle}>{item.name}</h4>
                  <p className={styles.integrationCardDesc}>{item.description}</p>
                </div>

                <div className={styles.integrationCapsRow}>
                  {item.capabilities.map((cap) => (
                    <span key={cap} className={styles.integrationCapTag}>{cap}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.integrationsBottomBar}>
            <Link href="/integrations" className={styles.primaryActionBtn}>
              <span>Explore All 35+ Integrations</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
            <Link href="/docs/api" className={styles.secondaryActionBtn}>
              <span>View Webhooks &amp; API Docs ↗</span>
            </Link>
          </div>
        </section>

        {/* ========================================================
            AI INSIGHTS & VOICE OF CUSTOMER INTELLIGENCE
            ======================================================== */}
        <section className={styles.insightsSection} id="insights">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>📊 AI Voice Intelligence</span>
            <h2 className={styles.sectionMainHeading}>Understand What Callers Are Really Saying.</h2>
            <p className={styles.sectionLeadText}>
              Turn spoken customer calls into rich structured data. Track real-time sentiment, automatically flag objections, score call quality, and anticipate churn.
            </p>
          </div>

          <div className={styles.insightsMainGrid}>
            {/* Left: Interactive Telemetry Card */}
            <div className={styles.insightsHeroCard}>
              <div className={styles.insightsHeroHeader}>
                <div>
                  <span className={styles.bentoTagBadge} style={{ marginBottom: 4 }}>Live VoC Telemetry</span>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Call Sentiment &amp; QA Monitor</h3>
                </div>
                <span style={{ fontSize: "12px", color: "#0e6f62", fontWeight: 700 }}>● Active Stream</span>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                  <span>Real-Time Emotional Spectrum</span>
                  <span style={{ color: "#0e6f62" }}>84% Positive</span>
                </div>
                <div className={styles.sentimentMeterBar}>
                  <div className={styles.sentimentBarPositive} />
                  <div className={styles.sentimentBarNeutral} />
                  <div className={styles.sentimentBarNegative} />
                </div>
                <div className={styles.sentimentLegendRow}>
                  <span>Positive: 84%</span>
                  <span>Neutral: 12%</span>
                  <span>Frustrated: 4%</span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "18px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b" }}>
                  Detected Call Objections &amp; Intent Clusters
                </span>
                <div className={styles.objectionTagsWrap}>
                  <span className={styles.objectionTagItem}>
                    <span style={{ color: "#0e6f62" }}>✓</span> Pricing Transparency (94% resolved)
                  </span>
                  <span className={styles.objectionTagItem}>
                    <span style={{ color: "#0e6f62" }}>✓</span> Loan Eligibility Criteria
                  </span>
                  <span className={styles.objectionTagItem}>
                    <span style={{ color: "#0284c7" }}>ℹ</span> Appointment Slot Reschedule
                  </span>
                  <span className={styles.objectionTagItem}>
                    <span style={{ color: "#d97706" }}>⚠</span> Escalation to Human Agent (&lt;2%)
                  </span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#475569" }}>
                  Auto-synced to CRM &amp; analytics dashboards:
                </span>
                <Link href="/resources/blog" style={{ fontSize: "13px", fontWeight: 700, color: "#7c3aed", textDecoration: "none" }}>
                  Read Case Study →
                </Link>
              </div>
            </div>

            {/* Right: 4 Strategic Pillar Cards */}
            <div className={styles.insightsFourList}>
              {AI_INSIGHT_PILLARS.map((pillar) => (
                <div key={pillar.title} className={styles.insightPillarItem}>
                  <div className={styles.insightPillarIcon}>{pillar.icon}</div>
                  <div className={styles.insightPillarText}>
                    <h4>{pillar.title}</h4>
                    <p>{pillar.copy}</p>
                  </div>
                  <div className={styles.insightPillarMetric}>
                    <span className={styles.insightMetricBig}>{pillar.metric}</span>
                    <span className={styles.insightMetricLbl}>{pillar.metricLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            HEAD-TO-HEAD COMPETITIVE MATRIX
            ======================================================== */}
        <section className={styles.comparisonSection}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>Side-by-Side Comparison</span>
            <h2 className={styles.sectionMainHeading}>Why Teams Switch To Vozon.</h2>
            <p className={styles.sectionLeadText}>
              Built from day one for Indian telephony, local dialects, and sub-350ms response latency.
            </p>
          </div>

          <div className={styles.comparisonWrapTable}>
            <div className={`${styles.tableRowItem} ${styles.tableHeadItem}`}>
              <span>Capability / Architecture</span>
              <span style={{ color: "#0e6f62" }}>Vozon Platform</span>
              <span>US Platforms (Vapi / Retell)</span>
            </div>

            <div className={styles.tableRowItem}>
              <span className={styles.colFeature}>Local Telephony &amp; Pickup Rates</span>
              <span className={styles.colVozon}>~74% Pickup (Verified DIDs &amp; BYOT)</span>
              <span className={styles.colOthers}>~22% Pickup (Unverified 080 spam tags)</span>
            </div>

            <div className={styles.tableRowItem}>
              <span className={styles.colFeature}>Hinglish &amp; Indic Dialects</span>
              <span className={styles.colVozon}>Native Sarvam Indic + Bulbul</span>
              <span className={styles.colOthers}>Rigid US-accented translations</span>
            </div>

            <div className={styles.tableRowItem}>
              <span className={styles.colFeature}>End-to-End Latency</span>
              <span className={styles.colVozon}>&lt;350ms (In-country edge routing)</span>
              <span className={styles.colOthers}>1,200ms – 2,400ms (Cross-continent)</span>
            </div>

            <div className={styles.tableRowItem}>
              <span className={styles.colFeature}>Google Sheets Outbound Sync</span>
              <span className={styles.colVozon}>Built-in 1-Click Auto Dial</span>
              <span className={styles.colOthers}>Requires custom code &amp; webhooks</span>
            </div>

            <div className={styles.tableRowItem}>
              <span className={styles.colFeature}>TRAI Compliance Safeguards</span>
              <span className={styles.colVozon}>Auto Calling Windows &amp; DND Filters</span>
              <span className={styles.colOthers}>No native Indian telecom rules</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            CUSTOMER TESTIMONIALS
            ======================================================== */}
        <section className={styles.reviewsSection} id="reviews">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>Customer Stories</span>
            <h2 className={styles.sectionMainHeading}>What Operational Leaders Say.</h2>
            <p className={styles.sectionLeadText}>
              Real businesses handling thousands of customer conversations with Vozon voice agents.
            </p>
          </div>

          <div className={styles.reviewsGridThree}>
            {customerReviews.slice(0, 6).map((item, idx) => (
              <div key={idx} className={styles.reviewCardModern}>
                <div>
                  <div className={styles.starRatingRow}>★★★★★</div>
                  <blockquote className={styles.reviewQuoteText}>&ldquo;{item.quote}&rdquo;</blockquote>
                </div>

                <div className={styles.reviewAuthorRow}>
                  <div className={styles.authorInitialCircle}>
                    {item.name.charAt(0)}
                  </div>
                  <div className={styles.authorTextInfo}>
                    <b>{item.name}</b>
                    <small>{item.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            ENTERPRISE COMPLIANCE & FAQ
            ======================================================== */}
        <section className={styles.faqSectionWrap} id="faq">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrowBadge}>Security &amp; FAQ</span>
            <h2 className={styles.sectionMainHeading}>Frequently Asked Questions.</h2>
            <p className={styles.sectionLeadText}>
              Everything you need to know about our voice architecture, telephony, and data privacy.
            </p>
          </div>

          <div className={styles.complianceBadgesRow}>
            <div className={styles.compBadgeItem}><span>🔒 SOC-2 Type II Certified</span></div>
            <div className={styles.compBadgeItem}><span>⚕️ HIPAA Compliant</span></div>
            <div className={styles.compBadgeItem}><span>🇪🇺 GDPR Ready</span></div>
            <div className={styles.compBadgeItem}><span>🛡️ ISO 27001 Validated</span></div>
          </div>

          <div className={styles.faqAccordionList}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className={styles.faqItemBlock}>
                <button
                  type="button"
                  className={styles.faqQuestionBtn}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span className={styles.faqIndicatorIcon} style={{ transform: openFaq === idx ? "rotate(45deg)" : "none" }}>
                    +
                  </span>
                </button>
                {openFaq === idx && (
                  <div className={styles.faqAnswerText}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            PRE-FOOTER CALLOUT
            ======================================================== */}
        <section className={styles.preFooterCallout}>
          <div className={styles.preFooterInnerCard}>
            <h2 className={styles.preFooterTitleText}>Ready To Automate Your Phone Calls?</h2>
            <p className={styles.preFooterSubText}>
              Deploy your first intelligent AI voice agent in minutes. Start with complimentary starter minutes with zero credit card required.
            </p>
            <div className={styles.heroButtonCluster} style={{ justifyContent: "center", marginBottom: 0 }}>
              <Link href="/login" className={styles.primaryActionBtn}>
                <span>Get Started Free</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
              </Link>
              <Link href="/contact" className={styles.secondaryActionBtn}>
                <span>Book a Demo</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          CLEAN MODERN FOOTER
          ======================================================== */}
      <footer className={styles.distinctFooter}>
        <div className={styles.footerColsGrid}>
          <div className={styles.footerBrandColumn}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>vozon</span>
              <span className={styles.statusIndicatorPill}>
                <span className={styles.beaconDot} />
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
            <h4 className={styles.footerNavHeading}>Product</h4>
            <div className={styles.footerLinksCol}>
              <Link href="/services/voice-agents">Voice Agents</Link>
              <Link href="/services/realtime-tts">Realtime TTS</Link>
              <Link href="/services/multilingual-speech">Multilingual Speech</Link>
              <Link href="/services/team-workflows">Team Workflows</Link>
              <Link href="/pricing">Pricing &amp; Plans</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerNavHeading}>Solutions</h4>
            <div className={styles.footerLinksCol}>
              <Link href="/business/industries/financial-services">Banking &amp; Finance</Link>
              <Link href="/business/industries/healthcare">Healthcare &amp; Clinics</Link>
              <Link href="/business/industries/home-services">Real Estate &amp; Auto</Link>
              <Link href="/business/industries/logistics">Logistics &amp; Delivery</Link>
              <Link href="/business/industries/travel-hospitality">Hospitality</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerNavHeading}>Integrations</h4>
            <div className={styles.footerLinksCol}>
              <Link href="/integrations">Integrations Catalog</Link>
              <Link href="/docs/api">API Documentation</Link>
              <Link href="/integrations/exotel">Exotel Telephony</Link>
              <Link href="/integrations/twilio">Twilio Trunking</Link>
              <Link href="/integrations/hubspot">HubSpot CRM</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.footerNavHeading}>Company</h4>
            <div className={styles.footerLinksCol}>
              <Link href="/about">About Us</Link>
              <Link href="/career">Careers (Hiring)</Link>
              <Link href="/partners">Partners &amp; Resellers</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottomBar}>
          <span>© {new Date().getFullYear()} Vozon AI Platform. All rights reserved.</span>
          <span>Engineered for sub-second enterprise voice telephony.</span>
        </div>
      </footer>
    </div>
  );
}
