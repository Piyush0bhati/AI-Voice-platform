"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Scenario {
  id: string;
  name: string;
  role: string;
  caller: string;
  agent: string;
  service: string;
  date: string;
  time: string;
  transcript: Array<{ speaker: "agent" | "caller" | "system"; text: string }>;
}

const scenarios: Scenario[] = [
  {
    id: "healthcare",
    name: "Healthcare Clinic",
    role: "Patient Intake & Doctor Scheduling",
    caller: "Alex Morgan",
    agent: "Dr. Jenkins' Clinic AI",
    service: "Annual Physical Examination (45 min)",
    date: "Wednesday, Oct 14",
    time: "2:30 PM",
    transcript: [
      { speaker: "agent", text: "Hello! Thank you for calling St. Jude Family Clinic. How can I help you today?" },
      { speaker: "caller", text: "Hi, I'd like to schedule an annual physical with Dr. Jenkins next Wednesday." },
      { speaker: "system", text: "⚡ Webhook GET /ehr/availability?provider=dr-jenkins&date=2026-10-14 → 200 OK (3 slots found)" },
      { speaker: "agent", text: "I have Dr. Jenkins available next Wednesday at 10:15 AM, 2:30 PM, and 4:00 PM. Which works best for you?" },
      { speaker: "caller", text: "2:30 PM would be great." },
      { speaker: "system", text: "⚡ Webhook POST /ehr/bookings → Event #9481 Created | SMS sent to +1 (555) 234-5678" },
      { speaker: "agent", text: "All set! You are booked for Wednesday, October 14 at 2:30 PM. I've sent an SMS confirmation with clinic instructions." },
    ],
  },
  {
    id: "sales",
    name: "Enterprise Sales",
    role: "Lead Qualification & Demo Setter",
    caller: "Jordan Vance",
    agent: "Vozon Enterprise SDR",
    service: "Product Demo & Technical Architecture (30 min)",
    date: "Thursday, Oct 15",
    time: "11:00 AM",
    transcript: [
      { speaker: "agent", text: "Hi Jordan! Thanks for checking out Vozon. I'd love to connect you with our solutions team. Would you like to schedule a 30-minute demo?" },
      { speaker: "caller", text: "Yes, do you have any morning slots available this Thursday?" },
      { speaker: "system", text: "⚡ Webhook GET /cal.com/availability?event_id=enterprise-demo → 200 OK (2 slots found)" },
      { speaker: "agent", text: "Yes! Our lead solutions architect has Thursday at 9:30 AM or 11:00 AM EST open. Which do you prefer?" },
      { speaker: "caller", text: "Let's do 11:00 AM EST." },
      { speaker: "system", text: "⚡ Webhook POST /cal.com/bookings → Cal.com & Google Calendar invite dispatched" },
      { speaker: "agent", text: "Confirmed! I've booked your demo for Thursday at 11:00 AM EST and emailed your calendar invite with Zoom link." },
    ],
  },
  {
    id: "home-services",
    name: "HVAC & Home Services",
    role: "Dispatch & Service Booking",
    caller: "Marcus Bell",
    agent: "Apex Air Dispatch AI",
    service: "Emergency Heating Diagnostic (60 min)",
    date: "Today, Oct 12",
    time: "4:15 PM",
    transcript: [
      { speaker: "agent", text: "Apex Air Emergency Service, how can we assist you with your home today?" },
      { speaker: "caller", text: "Our heat just stopped working and the temperature is dropping fast. Can a technician come today?" },
      { speaker: "system", text: "⚡ Webhook GET /service-titan/dispatch/emergency → 200 OK (Technician Dave available in zone 4)" },
      { speaker: "agent", text: "I can dispatch Technician Dave to your address this afternoon between 4:00 PM and 5:00 PM. Would you like me to book that immediately?" },
      { speaker: "caller", text: "Yes please, book it right away!" },
      { speaker: "system", text: "⚡ Webhook POST /service-titan/dispatch → Job #55291 dispatched to Tech Dave mobile app" },
      { speaker: "agent", text: "You're scheduled! Dave is en route for 4:15 PM. You'll receive live technician tracking via SMS." },
    ],
  },
];

export function RetellAppointmentBookingSection() {
  const [selectedScenarioId, setSelectedScenarioId] = useState("healthcare");
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStepTab, setActiveStepTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(scenarios[0].date);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(scenarios[0].time);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const selectScenario = (scenario: Scenario) => {
    setSelectedScenarioId(scenario.id);
    setSelectedDate(scenario.date);
    setSelectedTimeSlot(scenario.time);
    setBookingSuccess(false);
  };

  const timeSlots = ["9:30 AM", "11:15 AM", "1:30 PM", "2:30 PM", "4:00 PM"];

  const stepsData = [
    {
      num: "01",
      title: "Create your booking agent",
      tagline: "Define intent rules and add 'Check Availability' and 'Book Appointment' tools.",
      detail:
        "Equip your agent with direct access to appointment endpoints. Specify parameters like provider ID, appointment duration, buffer time, and attendee schema in standard JSON.",
      codeSnippet: `// Agent Tool Configuration
{
  "name": "book_appointment",
  "description": "Book a confirmed time slot in the calendar",
  "parameters": {
    "type": "object",
    "properties": {
      "customer_name": { "type": "string" },
      "phone": { "type": "string" },
      "event_datetime": { "type": "string", "format": "date-time" },
      "service_type": { "type": "string" }
    },
    "required": ["customer_name", "event_datetime"]
  }
}`,
    },
    {
      num: "02",
      title: "Connect your calendar",
      tagline: "Link Cal.com, Google Calendar, Outlook, or your EHR system in 1 click.",
      detail:
        "Real-time bidirectional sync ensures your voice agent always reads live open availability, respecting time zones, lunch hours, holidays, and minimum scheduling notices.",
      integrations: [
        { name: "Cal.com", status: "Connected", icon: "🗓️" },
        { name: "Google Calendar", status: "Synced", icon: "📅" },
        { name: "Microsoft Outlook", status: "Active", icon: "📧" },
        { name: "Epic / Cerner EHR", status: "API connection", icon: "🏥" },
        { name: "ServiceTitan / CRM", status: "Connected", icon: "⚡" },
      ],
    },
    {
      num: "03",
      title: "Define your flow",
      tagline: "Instruct your voice agent when to check slots and when to confirm.",
      detail:
        "Natural turn-taking allows callers to change their mind, inquire about alternative days, or ask for morning vs. afternoon slots without getting stuck in a robotic IVR tree.",
      flowNodes: [
        { label: "1. Caller Request", desc: "'Schedule next Wednesday'" },
        { label: "2. Availability Check", desc: "Query API for open slots" },
        { label: "3. Natural Offer", desc: "'I have 10:15 AM or 2:30 PM'" },
        { label: "4. Slot Selected", desc: "Caller confirms 2:30 PM" },
        { label: "5. Realtime Booking", desc: "Create calendar event & SMS" },
      ],
    },
    {
      num: "04",
      title: "Track and optimize",
      tagline: "Review live booking conversion rates, speech latency, and call outcomes.",
      detail:
        "Inspect turn-by-turn transcripts, review why slots were rejected, and adjust scheduling prompts using observed call outcomes.",
      metrics: [
        { label: "Booking Completion Rate", value: "94.8%", badge: "+12.4% vs human intake" },
        { label: "Average Call Duration", value: "1m 18s", badge: "Zero wait time" },
        { label: "Voice Turnaround Latency", value: "390ms", badge: "Sub-second speech" },
        { label: "No-Show Reduction", value: "32%", badge: "Via auto SMS reminders" },
      ],
    },
  ];

  return (
    <section className="retell-booking-section py-20 py-lg-30 position-relative overflow-hidden bg-white text-dark">
      {/* Subtle Background Mesh */}
      <div
        className="position-absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(13, 119, 110, 0.04) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(62, 106, 239, 0.05) 0%, transparent 45%)",
        }}
      />

      <div className="container position-relative z-1">
        {/* Section Header: Retell AI Exact Style */}
        <div className="row justify-content-center text-center mb-12 mb-lg-18">
          <div className="col-xl-9">
            <div className="d-inline-flex align-items-center gap-2 px-4 py-1.5 rounded-pill bg-light border shadow-sm mb-4">
              <span className="w-2.5 h-2.5 rounded-circle bg-success pulse-animation"></span>
              <span className="fs-xs fw-bold text-uppercase tracking-wider text-dark">
                AI Appointment Scheduling
              </span>
            </div>

            <h2 className="display-4 fw-bold text-dark mb-4 tracking-tight">
              Book more appointments with AI voice agents
            </h2>
            <p className="fs-5 text-muted max-w-3xl mx-auto mb-6 lh-base">
              Just say when and we’ll handle the rest. Book appointments the easy way by checking availability,
              confirming the right time slots, and keeping every interaction smooth from start to finish.
            </p>

            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <span className="badge bg-white text-dark border rounded-pill px-4 py-2 fs-xs fw-semibold shadow-sm">
                Configurable access controls
              </span>
              <span className="badge bg-white text-dark border rounded-pill px-4 py-2 fs-xs fw-semibold shadow-sm">
                Reviewable call records
              </span>
              <span className="badge bg-white text-dark border rounded-pill px-4 py-2 fs-xs fw-semibold shadow-sm">
                Provider-based voice stack
              </span>
              <span className="badge bg-white text-dark border rounded-pill px-4 py-2 fs-xs fw-semibold shadow-sm">
                🗓️ Cal.com & Google Calendar
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FEATURE HERO DASHBOARD SIMULATOR ("From Call to Confirmed")
            ========================================================================= */}
        <div className="row g-6 g-xl-10 align-items-stretch mb-20 mb-lg-28">
          {/* Left Console: Live Voice Audio & Realtime Transcript */}
          <div className="col-lg-6">
            <div className="bg-dark text-white rounded-5 p-6 p-xl-8 shadow-2xl h-100 d-flex flex-column justify-content-between border border-secondary border-opacity-25">
              {/* Header Bar */}
              <div>
                <div className="d-flex align-items-center justify-content-between pb-4 mb-5 border-bottom border-secondary border-opacity-50">
                  <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                      <div className="w-10 h-10 rounded-circle bg-primary bg-opacity-25 text-primary d-flex align-items-center justify-content-center fw-bold">
                        🎙️
                      </div>
                      <span className="position-absolute bottom-0 end-0 w-3 h-3 rounded-circle bg-success border border-dark"></span>
                    </div>
                    <div>
                      <h6 className="text-white mb-0 fw-bold">{currentScenario.agent}</h6>
                      <span className="fs-xs text-white-50">
                        {isPlaying ? "Live Inbound Call • 385ms Latency" : "Call Completed"}
                      </span>
                    </div>
                  </div>

                  {/* Scenario Switcher Pills */}
                  <div className="d-flex gap-1 bg-black bg-opacity-50 p-1 rounded-pill border border-secondary border-opacity-25">
                    {scenarios.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => selectScenario(s)}
                        className={`btn btn-sm rounded-pill px-2.5 py-1 fs-xs fw-semibold border-0 transition-base ${
                          selectedScenarioId === s.id
                            ? "btn-primary text-white"
                            : "btn-transparent text-white-50"
                        }`}
                      >
                        {s.id === "healthcare" ? "Clinic" : s.id === "sales" ? "Sales" : "HVAC"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Audio Equalizer Visualizer */}
                <div className="bg-black bg-opacity-40 rounded-4 p-4 mb-5 border border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="btn btn-primary rounded-circle w-10 h-10 p-0 d-flex align-items-center justify-content-center text-white shadow"
                    >
                      {isPlaying ? "⏸" : "▶"}
                    </button>
                    <div>
                      <div className="fs-xs text-white-50">AUDIO STREAM</div>
                      <div className="fs-sm fw-bold text-white">Turn-Taking Speech Synthesizer</div>
                    </div>
                  </div>

                  {/* Equalizer Bars */}
                  <div className="d-flex align-items-center gap-1.5 h-6">
                    {[16, 28, 12, 34, 20, 38, 14, 30, 24, 18, 36, 12].map((height, i) => (
                      <span
                        key={i}
                        className="bg-primary rounded-pill"
                        style={{
                          width: "3px",
                          height: isPlaying ? `${height}px` : "6px",
                          transition: "height 0.25s ease",
                          opacity: isPlaying ? 0.9 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Realtime Conversation Dialogue Box */}
                <div
                  className="overflow-y-auto d-flex flex-column gap-3 pe-2"
                  style={{ maxHeight: "330px" }}
                >
                  {currentScenario.transcript.map((item, index) => {
                    if (item.speaker === "system") {
                      return (
                        <div
                          key={index}
                          className="bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-3 px-3 py-2 fs-xs text-info font-monospace my-1"
                        >
                          {item.text}
                        </div>
                      );
                    }

                    const isAgent = item.speaker === "agent";
                    return (
                      <div
                        key={index}
                        className={`d-flex flex-column ${
                          isAgent ? "align-items-start" : "align-items-end"
                        }`}
                      >
                        <span className="fs-xs text-white-50 mb-1 px-1">
                          {isAgent ? "🤖 AI Voice Agent" : `👤 Caller (${currentScenario.caller})`}
                        </span>
                        <div
                          className={`rounded-4 px-4 py-2.5 fs-sm max-w-md ${
                            isAgent
                              ? "bg-secondary bg-opacity-25 text-white"
                              : "bg-primary text-white shadow-sm"
                          }`}
                        >
                          {item.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Console Status */}
              <div className="pt-4 mt-4 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between fs-xs text-white-50">
                <span>Direct Telephony Carrier: Twilio / Telnyx SIP</span>
                <span className="text-success fw-bold">● Connection Secure (TLS 1.3)</span>
              </div>
            </div>
          </div>

          {/* Right Console: Live Real-time Calendar & Booking Confirmation */}
          <div className="col-lg-6">
            <div className="bg-light rounded-5 p-6 p-xl-8 border shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-6">
                  <div>
                    <span className="badge bg-white text-primary border rounded-pill px-3 py-1 fs-xs fw-bold mb-1 shadow-sm">
                      Real-time Calendar Sync
                    </span>
                    <h4 className="fw-bold text-dark mb-0">Select & Book Open Time Slot</h4>
                  </div>
                  <div className="text-end">
                    <span className="fs-xs text-muted d-block">Time Zone</span>
                    <span className="fs-xs fw-bold text-dark">America/New_York (EST)</span>
                  </div>
                </div>

                {/* Date Selection Pills */}
                <label className="fs-xs fw-bold text-muted text-uppercase mb-2 d-block">
                  Available Dates
                </label>
                <div className="d-flex flex-wrap gap-2 mb-6">
                  {[
                    "Tue, Oct 13",
                    currentScenario.date,
                    "Thu, Oct 15",
                    "Fri, Oct 16",
                  ].map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setBookingSuccess(false);
                      }}
                      className={`btn btn-sm rounded-4 px-4 py-2.5 fw-semibold border transition-base ${
                        selectedDate === date
                          ? "btn-dark text-white shadow-sm"
                          : "btn-white bg-white text-dark border"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>

                {/* Time Slots Grid */}
                <label className="fs-xs fw-bold text-muted text-uppercase mb-2 d-block">
                  Live Available Slots
                </label>
                <div className="row g-2 mb-6">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <div className="col-4" key={slot}>
                        <button
                          onClick={() => {
                            setSelectedTimeSlot(slot);
                            setBookingSuccess(true);
                          }}
                          className={`btn w-100 py-3 rounded-4 fs-sm fw-bold border transition-base ${
                            isSelected
                              ? "btn-primary text-white shadow"
                              : "btn-white bg-white text-dark hover-scale"
                          }`}
                        >
                          {slot}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Booking Summary Box */}
                <div className="bg-white rounded-4 p-5 border shadow-sm mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fs-5">📋</span>
                      <span className="fw-bold text-dark fs-sm">{currentScenario.service}</span>
                    </div>
                    <span
                      className={`badge rounded-pill px-3 py-1 fs-xs fw-bold ${
                        bookingSuccess
                          ? "bg-success text-white"
                          : "bg-light text-muted border"
                      }`}
                    >
                      {bookingSuccess ? "✓ CONFIRMED" : "HOLDING (10m)"}
                    </span>
                  </div>

                  <div className="row g-3 fs-xs text-muted">
                    <div className="col-6">
                      <span className="d-block text-dark fw-semibold">Caller / Patient</span>
                      <span>{currentScenario.caller}</span>
                    </div>
                    <div className="col-6">
                      <span className="d-block text-dark fw-semibold">Appointment Time</span>
                      <span className="text-primary fw-bold">
                        {selectedDate} @ {selectedTimeSlot}
                      </span>
                    </div>
                    <div className="col-6">
                      <span className="d-block text-dark fw-semibold">Confirmation Channel</span>
                      <span>SMS to +1 (555) 234-5678</span>
                    </div>
                    <div className="col-6">
                      <span className="d-block text-dark fw-semibold">Synced System</span>
                      <span>Cal.com & Google Calendar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="d-flex align-items-center justify-content-between gap-3 pt-3">
                <button
                  onClick={() => setBookingSuccess(true)}
                  className="btn btn-dark rounded-pill px-6 py-3 fw-semibold flex-grow-1"
                >
                  {bookingSuccess ? "✓ Appointment Booked Live" : "Simulate Instant Booking"}
                </button>
                <Link href="/dashboard" className="btn btn-outline-dark rounded-pill px-5 py-3 fw-semibold">
                  View in Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            OVERVIEW: "CHECK. BOOK. DONE." (Retell 3-Card Grid)
            ========================================================================= */}
        <div className="mb-20 mb-lg-28">
          <div className="text-center mb-10">
            <span className="badge bg-light border text-dark px-4 py-1.5 rounded-pill fs-xs fw-bold text-uppercase mb-2">
              Overview
            </span>
            <h3 className="display-6 fw-bold text-dark">
              Go from checking availability to booking an appointment
            </h3>
            <p className="fs-5 text-muted">Check. Book. Done.</p>
          </div>

          <div className="row g-6 g-xl-8">
            {/* Card 1 */}
            <div className="col-lg-4">
              <div className="bg-light rounded-5 p-6 p-xl-8 border shadow-sm h-100 hover-scale transition-all d-flex flex-column justify-content-between">
                <div>
                  <div className="w-12 h-12 rounded-4 bg-white border d-flex align-items-center justify-content-center text-primary fs-4 fw-bold shadow-sm mb-5">
                    📅
                  </div>
                  <h4 className="fw-bold text-dark mb-2">Book Appointments</h4>
                  <p className="text-muted fs-sm mb-6">
                    Book appointments directly in the caller’s requested time slot with zero manual staff friction.
                  </p>

                  <ul className="list-unstyled d-grid gap-3 fs-sm text-dark mb-0">
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Book appointment in a specific slot</span>
                    </li>
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Book directly within the conversation</span>
                    </li>
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Automatically added to the right calendar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4">
              <div className="bg-light rounded-5 p-6 p-xl-8 border shadow-sm h-100 hover-scale transition-all d-flex flex-column justify-content-between">
                <div>
                  <div className="w-12 h-12 rounded-4 bg-white border d-flex align-items-center justify-content-center text-primary fs-4 fw-bold shadow-sm mb-5">
                    🔍
                  </div>
                  <h4 className="fw-bold text-dark mb-2">Check Availability</h4>
                  <p className="text-muted fs-sm mb-6">
                    Retrieve open time slots instantly and offer immediate alternatives when calendars are full.
                  </p>

                  <ul className="list-unstyled d-grid gap-3 fs-sm text-dark mb-0">
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Retrieve open time slots instantly</span>
                    </li>
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Up-to-date real-time schedules</span>
                    </li>
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Find the right time, agent, or resource</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4">
              <div className="bg-light rounded-5 p-6 p-xl-8 border shadow-sm h-100 hover-scale transition-all d-flex flex-column justify-content-between">
                <div>
                  <div className="w-12 h-12 rounded-4 bg-white border d-flex align-items-center justify-content-center text-primary fs-4 fw-bold shadow-sm mb-5">
                    🔄
                  </div>
                  <h4 className="fw-bold text-dark mb-2">Smart Rescheduling</h4>
                  <p className="text-muted fs-sm mb-6">
                    Allow callers to modify, postpone, or cancel appointments effortlessly using conversational voice.
                  </p>

                  <ul className="list-unstyled d-grid gap-3 fs-sm text-dark mb-0">
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Detect caller identity & existing booking</span>
                    </li>
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Move event without double-booking errors</span>
                    </li>
                    <li className="d-flex align-items-center gap-2.5">
                      <span className="w-5 h-5 rounded-circle bg-success text-white d-flex align-items-center justify-content-center fs-xs fw-bold">✓</span>
                      <span>Instant SMS & email update broadcast</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ENTERPRISE CALLOUT BANNER: "Built for Contact Centers, Not Demos"
            ========================================================================= */}
        <div className="mb-20 mb-lg-28">
          <div className="bg-dark text-white rounded-5 p-8 p-md-12 shadow-2xl position-relative overflow-hidden border border-secondary border-opacity-25">
            <div className="row align-items-center g-8">
              <div className="col-lg-8">
                <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50 rounded-pill px-4 py-1.5 fs-xs fw-bold mb-4">
                  Built for Contact Centers, Not Demos
                </span>
                <h3 className="display-6 fw-bold text-white mb-4">
                  Vozon is the AI Voice Platform Enterprise Contact Centers Run On
                </h3>
                <p className="fs-5 text-white text-opacity-75 mb-6 max-w-2xl">
                  Build, test, and deploy AI phone agents that handle real call volume, so your team spends its time
                  on the high-value conversations that need a person.
                </p>
                <div className="d-flex flex-wrap gap-4 text-white-50 fs-sm">
                  <span><strong>Access</strong> controls for configured workspaces</span>
                  <span><strong>Human</strong> handoff rules</span>
                  <span><strong>Call</strong> outcomes visible for review</span>
                </div>
              </div>

              <div className="col-lg-4 text-lg-end">
                <Link
                  href="/contact"
                  className="btn btn-primary rounded-pill px-8 py-4 fs-6 fw-bold text-white shadow-lg w-100 w-md-auto"
                >
                  Contact Sales & Demo →
                </Link>
                <div className="mt-3">
                  <Link href="/pricing" className="text-decoration-none text-white-50 fs-xs hover-underline">
                    Explore transparent usage pricing →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HOW IT WORKS IN FOUR STEPS (Retell 4-Step Animated Interactive Tabs)
            ========================================================================= */}
        <div className="mb-20 mb-lg-28">
          <div className="text-center mb-10">
            <span className="badge bg-light border text-dark px-4 py-1.5 rounded-pill fs-xs fw-bold text-uppercase mb-2">
              How It Works
            </span>
            <h3 className="display-6 fw-bold text-dark">
              Get Appointment Booking Running in Four Steps
            </h3>
          </div>

          {/* 4 Step Selector Tabs */}
          <div className="row g-4 mb-8">
            {stepsData.map((step, idx) => {
              const isActive = activeStepTab === idx;
              return (
                <div className="col-6 col-lg-3" key={step.num}>
                  <button
                    onClick={() => setActiveStepTab(idx)}
                    className={`btn w-100 text-start p-4 p-xl-5 rounded-4 border transition-base h-100 ${
                      isActive
                        ? "bg-dark text-white shadow-lg border-dark"
                        : "bg-light text-dark border hover-scale"
                    }`}
                  >
                    <span
                      className={`fs-xs fw-bold d-block mb-1 ${
                        isActive ? "text-primary" : "text-muted"
                      }`}
                    >
                      STEP {step.num}
                    </span>
                    <h6 className="fw-bold mb-1">{step.title}</h6>
                    <p className={`fs-xs mb-0 ${isActive ? "text-white-50" : "text-muted"}`}>
                      {step.tagline}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Step Showcase Console */}
          <div className="bg-light rounded-5 p-6 p-xl-10 border shadow-sm">
            <div className="row g-8 align-items-center">
              <div className="col-lg-5">
                <span className="badge bg-white text-primary border rounded-pill px-3 py-1 fs-xs fw-bold mb-3 shadow-sm">
                  Step {stepsData[activeStepTab].num} Walkthrough
                </span>
                <h4 className="display-6 fw-bold text-dark mb-4">
                  {stepsData[activeStepTab].title}
                </h4>
                <p className="fs-6 text-muted mb-6 lh-base">
                  {stepsData[activeStepTab].detail}
                </p>

                <div className="d-flex gap-3">
                  <button
                    onClick={() =>
                      setActiveStepTab((prev) => (prev + 1) % stepsData.length)
                    }
                    className="btn btn-dark rounded-pill px-5 py-2.5 fw-semibold"
                  >
                    Next Step →
                  </button>
                  <Link href="/docs" className="btn btn-outline-dark rounded-pill px-4 py-2.5 fw-semibold">
                    Read Integration Docs
                  </Link>
                </div>
              </div>

              {/* Dynamic Step Content Visualizer */}
              <div className="col-lg-7">
                {activeStepTab === 0 && (
                  <div className="bg-dark text-white rounded-4 p-5 font-monospace fs-xs overflow-x-auto shadow-inner border border-secondary border-opacity-50">
                    <div className="d-flex align-items-center justify-content-between pb-2 mb-3 border-bottom border-secondary border-opacity-50 text-white-50">
                      <span>tools_config.json</span>
                      <span className="badge bg-success bg-opacity-25 text-success">Tool schema validated</span>
                    </div>
                    <pre className="m-0 text-info" style={{ whiteSpace: "pre-wrap" }}>
                      {stepsData[0].codeSnippet}
                    </pre>
                  </div>
                )}

                {activeStepTab === 1 && (
                  <div className="row g-3">
                    {stepsData[1].integrations?.map((integ) => (
                      <div className="col-md-6" key={integ.name}>
                        <div className="bg-white rounded-4 p-4 border shadow-sm d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <span className="fs-3">{integ.icon}</span>
                            <div>
                              <h6 className="fw-bold text-dark mb-0">{integ.name}</h6>
                              <span className="fs-xs text-muted">Direct API Hook</span>
                            </div>
                          </div>
                          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fs-xs fw-bold">
                            ✓ {integ.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeStepTab === 2 && (
                  <div className="bg-white rounded-4 p-6 border shadow-sm">
                    <h6 className="fw-bold text-dark mb-4">Conversation Node Sequence</h6>
                    <div className="d-flex flex-column gap-3">
                      {stepsData[2].flowNodes?.map((node, i) => (
                        <div
                          key={i}
                          className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light border"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span className="w-7 h-7 rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fs-xs fw-bold">
                              {i + 1}
                            </span>
                            <span className="fw-bold text-dark fs-sm">{node.label}</span>
                          </div>
                          <span className="badge bg-white text-muted border fs-xs">{node.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStepTab === 3 && (
                  <div className="row g-4">
                    {stepsData[3].metrics?.map((m) => (
                      <div className="col-md-6" key={m.label}>
                        <div className="bg-white rounded-4 p-5 border shadow-sm text-center">
                          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 fs-xs fw-bold mb-2">
                            {m.badge}
                          </span>
                          <h3 className="display-6 fw-bold text-dark mb-1">{m.value}</h3>
                          <span className="fs-xs text-muted fw-semibold">{m.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PRODUCT HIGHLIGHTS ("Built to Handle the Real World")
            ========================================================================= */}
        <div>
          <div className="text-center mb-10">
            <span className="badge bg-light border text-dark px-4 py-1.5 rounded-pill fs-xs fw-bold text-uppercase mb-2">
              Product Highlights
            </span>
            <h3 className="display-6 fw-bold text-dark">Built to Handle the Real World</h3>
          </div>

          <div className="row g-6">
            <div className="col-md-6 col-xl-3">
              <div className="bg-white rounded-5 p-6 border shadow-sm h-100 hover-scale">
                <div className="fs-3 mb-3">🗣️</div>
                <h5 className="fw-bold text-dark mb-2">Truly Humanlike Experience</h5>
                <p className="fs-sm text-muted mb-0">
                  Natural turn-taking, sub-450ms latency, and contextual language generation make every booking feel effortless.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="bg-white rounded-5 p-6 border shadow-sm h-100 hover-scale">
                <div className="fs-3 mb-3">📱</div>
                <h5 className="fw-bold text-dark mb-2">Multichannel Support</h5>
                <p className="fs-sm text-muted mb-0">
                  Deploy across telephone SIP trunks, website web calls, and SMS reminders — all calendar slots remain in perfect sync.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="bg-white rounded-5 p-6 border shadow-sm h-100 hover-scale">
                <div className="fs-3 mb-3">🤝</div>
                <h5 className="fw-bold text-dark mb-2">Warm Transfer Intelligence</h5>
                <p className="fs-sm text-muted mb-0">
                  When a caller has a complex clinical or commercial inquiry, the agent summarizes full context before connecting to staff.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="bg-white rounded-5 p-6 border shadow-sm h-100 hover-scale">
                <div className="fs-3 mb-3">🛡️</div>
                <h5 className="fw-bold text-dark mb-2">Enterprise-Grade Reliability</h5>
                <p className="fs-sm text-muted mb-0">
                  Redundant telecom carrier backbones, 99.99% SLA uptime, and zero-loss webhook queues guarantee no missed appointments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
