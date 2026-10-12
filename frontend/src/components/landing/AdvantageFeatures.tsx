"use client";

import React, { useState } from "react";

export function AdvantageFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Smart Response Engine",
      heading: "Smart Response Engine",
      desc: "Use approved instructions and connected knowledge to answer callers consistently, then route each request to the right workflow.",
      bullets: ["Automated Response Generation", "Contextual Understanding", "Real-Time Adaptability"]
    },
    {
      title: "Intelligent Query Handling",
      heading: "Intelligent Query Handling",
      desc: "Keep the current conversation context available while the agent gathers details and decides which approved action to use next.",
      bullets: ["Conversation Context", "Knowledge Boundaries", "Multi-turn Dialogues"]
    },
    {
      title: "Automated Task Routing",
      heading: "Automated Task Routing",
      desc: "Route work between the voice agent, connected tools, and human operators with the relevant conversation context attached.",
      bullets: ["Agent-to-Agent Handoff", "Human Escalation Triggers", "CRM Synchronization"]
    },
    {
      title: "Real-Time Interaction",
      heading: "Real-Time Interaction",
      desc: "Test the complete speech and telephony stack, review transcripts, and adjust the voice experience for the workflow you are deploying.",
      bullets: ["Live Transcription", "Call Review", "Voice Configuration"]
    }
  ];

  return (
    <section className="pt-15 pt-md-20 pt-lg-30 position-relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-xxl-6 mx-auto text-center" data-ss-reveal-group="" data-y="50">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20" width={20} height={20}>
                <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131"></path>
              </svg>
              Features
            </div>
            <div className="mb-6"></div>
            <h2 className="ss-text-reveal-blur mb-0">Features designed for maximum advantage.</h2>
          </div>
        </div>

        <div className="mb-10 mb-xl-15"></div>

        {/* Tab Navigation */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-10">
          {tabs.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`btn px-5 py-3 rounded-pill fw-semibold transition-all ${activeTab === idx ? "btn-dark shadow" : "btn-light border"}`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-light border rounded-5 p-6 p-lg-12 shadow-sm">
          <div className="row g-8 align-items-center">
            <div className="col-lg-6">
              <div className="vstack gap-4">
                <span className="badge bg-primary text-white d-inline-block px-3 py-2 rounded-2 fs-sm fw-medium align-self-start">
                  {tabs[activeTab].title}
                </span>
                <h3 className="h2 mb-0">{tabs[activeTab].heading}</h3>
                <p className="fs-md text-secondary mb-0">{tabs[activeTab].desc}</p>
                <div className="d-grid gap-3 pt-2">
                  {tabs[activeTab].bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="d-flex align-items-center gap-3">
                      <div className="bg-white border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 28, height: 28 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#0d776e" width={14} height={14}>
                          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                      </div>
                      <span className="fw-semibold text-dark">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                alt="App Preview"
                width={600}
                height={400}
                className="img-fluid rounded-4 shadow-lg border"
                src="/img/content/app/app-preview-2.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
