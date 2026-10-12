"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function SmartFeatures() {
  const [activeAvatar, setActiveAvatar] = useState(0);

  const avatars = [
    { src: "/img/content/avatar/realistic-persona-1.png", name: "Anika Rao", label: "Executive Voice", role: "Inbound Triage & Concierge" },
    { src: "/img/content/avatar/realistic-persona-2.png", name: "Arjun Mehta", label: "Support Specialist", role: "Technical SLA Diagnostics" },
    { src: "/img/content/avatar/realistic-persona-3.png", name: "Maya Iyer", label: "Sales Specialist", role: "Pipeline Conversion Agent" },
    { src: "/img/content/avatar/realistic-persona-4.png", name: "Rohan Kapoor", label: "Telephony Engineer", role: "Realtime SIP Audio Mesh" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAvatar((prev) => (prev + 1) % avatars.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [avatars.length]);

  return (
    <section className="pt-15 pt-md-20 pt-lg-30 position-relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="row">
          <div className="col-lg-8 col-xxl-6 mx-auto text-center" data-ss-reveal-group="" data-y="50">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20" width={20} height={20}>
                <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
              </svg>
              Core Capabilities
            </div>
            <div className="mb-6"></div>
            <h2 className="ss-text-reveal-blur mb-0">Smart features that give you the edge.</h2>
            <div className="mb-6"></div>
            <p className="fs-md text-muted mb-0 mx-auto" style={{ maxWidth: 640 }}>
              Autonomous reasoning agents, instantaneous voice persona switching, and seamless tool triggers working in coordinated harmony.
            </p>
          </div>
        </div>

        <div className="mb-10 mb-lg-15"></div>

        {/* 3-Column Interactive Showcase with Center Avatar Image */}
        <div className="row align-items-center g-6 g-xl-10 position-relative">
          {/* Left Column: Feature 1 & Feature 2 */}
          <div className="col-12 col-md-6 col-lg-4 order-1">
            <div className="d-grid gap-6 gap-xl-8">
              {/* Feature 1 */}
              <div className="bg-white border rounded-5 p-4 shadow-sm hover-scale transition-all position-relative overflow-hidden">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-light text-dark border px-3 py-1 rounded-pill fs-xs fw-semibold">Multi-Model Routing</span>
                  <span className="text-muted fs-xs">GPT-4o &bull; Gemini 2.0</span>
                </div>
                <div className="rounded-4 overflow-hidden bg-light border p-2 text-center" style={{ minHeight: 220 }}>
                  <img
                    alt="Multi-Model LLM Routing"
                    loading="lazy"
                    width={410}
                    height={260}
                    className="img-fluid object-fit-contain w-100 h-100"
                    src="/img/content/features/1.webp"
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border rounded-5 p-4 shadow-sm hover-scale transition-all position-relative overflow-hidden">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-light text-dark border px-3 py-1 rounded-pill fs-xs fw-semibold">Agent Studio</span>
                  <span className="text-muted fs-xs">Natural Turn-Taking</span>
                </div>
                <div className="rounded-4 overflow-hidden bg-light border p-2 text-center" style={{ minHeight: 220 }}>
                  <img
                    alt="Agent Prompt Engine"
                    loading="lazy"
                    width={410}
                    height={260}
                    className="img-fluid object-fit-contain w-100 h-100"
                    src="/img/content/features/2.webp"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Central Persona Image (Always visible on all screen sizes) */}
          <div className="col-12 col-lg-4 order-2 my-8 my-lg-0 text-center position-relative" style={{ zIndex: 5 }}>
            <div className="mx-auto position-relative d-inline-block">
              {/* Transparent persona cutout */}
              <div
                className="d-inline-flex align-items-end justify-content-center position-relative"
                style={{ width: 310, height: 320, margin: "0 auto" }}
              >
                <div
                  className="position-relative w-100 h-100"
                >
                  <Image
                    alt={avatars[activeAvatar].name}
                    fill
                    sizes="310px"
                    className="w-100 h-100 object-fit-contain transition-all"
                    style={{ transition: "all 0.6s ease" }}
                    src={avatars[activeAvatar].src}
                  />
                </div>

                {/* Floating Active Persona Label Badge */}
                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x bg-dark text-white rounded-pill px-4 py-2 fs-sm fw-semibold shadow-lg d-flex align-items-center gap-2 border border-secondary"
                  style={{ marginBottom: 2, whiteSpace: "nowrap" }}
                >
                  <span className="d-inline-block rounded-circle bg-success" style={{ width: 8, height: 8 }}></span>
                  <span>{avatars[activeAvatar].label}</span>
                </div>
              </div>

              {/* Persona Metadata Details */}
              <div className="mt-7">
                <h5 className="mb-1 text-dark fw-bold">{avatars[activeAvatar].name}</h5>
                <p className="fs-sm text-muted mb-3">{avatars[activeAvatar].role}</p>

                {/* Switcher Dots */}
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {avatars.map((av, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveAvatar(idx)}
                      className={`border-0 rounded-pill transition-all ${
                        activeAvatar === idx ? "bg-primary" : "bg-secondary bg-opacity-25"
                      }`}
                      style={{
                        width: activeAvatar === idx ? 28 : 10,
                        height: 10,
                        cursor: "pointer",
                      }}
                      title={av.label}
                      aria-label={`Select ${av.label}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feature 3 & Feature 4 */}
          <div className="col-12 col-md-6 col-lg-4 order-3">
            <div className="d-grid gap-6 gap-xl-8">
              {/* Feature 3 */}
              <div className="bg-white border rounded-5 p-4 shadow-sm hover-scale transition-all position-relative overflow-hidden">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-light text-dark border px-3 py-1 rounded-pill fs-xs fw-semibold">Action Automation</span>
                  <span className="text-muted fs-xs">Live CRM & DB Sync</span>
                </div>
                <div className="rounded-4 overflow-hidden bg-light border p-2 text-center" style={{ minHeight: 220 }}>
                  <img
                    alt="Action Automation & Subscriptions"
                    loading="lazy"
                    width={410}
                    height={260}
                    className="img-fluid object-fit-contain w-100 h-100"
                    src="/img/content/features/3.webp"
                  />
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border rounded-5 p-4 shadow-sm hover-scale transition-all position-relative overflow-hidden">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge bg-light text-dark border px-3 py-1 rounded-pill fs-xs fw-semibold">Enterprise Security</span>
                  <span className="text-muted fs-xs">Access and review controls</span>
                </div>
                <div className="rounded-4 overflow-hidden bg-light border p-2 text-center" style={{ minHeight: 220 }}>
                  <img
                    alt="Security Shield & Encryption"
                    loading="lazy"
                    width={410}
                    height={260}
                    className="img-fluid object-fit-contain w-100 h-100"
                    src="/img/content/features/4.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
