"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className="dashboard-profile d-block position-fixed top-0 start-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.65)", zIndex: 1100, backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="dashboard-profile--details bg-white h-100 p-5 d-flex flex-column justify-content-between"
        style={{ maxWidth: 380, width: "88%", overflowY: "auto", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Header */}
          <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
            <BrandLogo compact showWebsiteLogo />
            <button className="btn btn-light rounded-circle p-2" onClick={onClose} aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>

          {/* Navigation Links Accordions */}
          <div className="nav flex-column gap-1">
            <Link className="nav-link text-dark py-2.5 px-3 fw-semibold rounded-3 hover-bg-light" href="/" onClick={onClose}>
              Home
            </Link>

            {/* Products Accordion */}
            <div>
              <button
                className="w-100 text-start nav-link text-dark py-2.5 px-3 fw-semibold rounded-3 border-0 bg-transparent d-flex justify-content-between align-items-center"
                onClick={() => toggleSection("products")}
              >
                <span>Products</span>
                <span className="fs-sm text-muted">{openSection === "products" ? "−" : "+"}</span>
              </button>
              {openSection === "products" && (
                <div className="ps-4 pe-2 py-2 vstack gap-2 bg-light rounded-3 my-1">
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/voice-agents" onClick={onClose}>
                    AI Voice Agents
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/voice-cloning" onClick={onClose}>
                    Brand Voice
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/realtime-tts" onClick={onClose}>
                    Live Voice Generation
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/multilingual-speech" onClick={onClose}>
                    Multilingual Calls
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/api-access" onClick={onClose}>
                    Developer API
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/team-workflows" onClick={onClose}>
                    Team Operations
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/speech-analytics" onClick={onClose}>
                    Call Analytics
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/sentiment-detection" onClick={onClose}>
                    Sentiment Signals
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/conversation-insights" onClick={onClose}>
                    Conversation Intelligence
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/services/quality-controls" onClick={onClose}>
                    Quality Assurance
                  </Link>
                  <Link className="text-primary fw-bold fs-xs text-decoration-none pt-1" href="/product" onClick={onClose}>
                    View All Products &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions Accordion */}
            <div>
              <button
                className="w-100 text-start nav-link text-dark py-2.5 px-3 fw-semibold rounded-3 border-0 bg-transparent d-flex justify-content-between align-items-center"
                onClick={() => toggleSection("solutions")}
              >
                <span>Solutions</span>
                <span className="fs-sm text-muted">{openSection === "solutions" ? "−" : "+"}</span>
              </button>
              {openSection === "solutions" && (
                <div className="ps-4 pe-2 py-2 vstack gap-2 bg-light rounded-3 my-1">
                  <div className="text-muted fs-xs text-uppercase fw-bold pt-1">Industries</div>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/industries/healthcare" onClick={onClose}>
                    Healthcare
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/industries/financial-services" onClick={onClose}>
                    Financial Services
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/industries/insurance" onClick={onClose}>
                    Insurance
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/industries/logistics" onClick={onClose}>
                    Logistics
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/industries/retail-consumer" onClick={onClose}>
                    Retail & Consumer
                  </Link>
                  <div className="text-muted fs-xs text-uppercase fw-bold pt-2">Use Cases</div>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/lead-qualification" onClick={onClose}>
                    Lead Qualification
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/customer-support" onClick={onClose}>
                    Customer Support
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/business/receptionists" onClick={onClose}>
                    AI Receptionist
                  </Link>
                </div>
              )}
            </div>

            <Link className="nav-link text-dark py-2.5 px-3 fw-semibold rounded-3 hover-bg-light" href="/integrations" onClick={onClose}>
              Integrations
            </Link>

            <Link className="nav-link text-dark py-2.5 px-3 fw-semibold rounded-3 hover-bg-light" href="/pricing" onClick={onClose}>
              Pricing
            </Link>

            {/* Company Accordion */}
            <div>
              <button
                className="w-100 text-start nav-link text-dark py-2.5 px-3 fw-semibold rounded-3 border-0 bg-transparent d-flex justify-content-between align-items-center"
                onClick={() => toggleSection("company")}
              >
                <span>Company</span>
                <span className="fs-sm text-muted">{openSection === "company" ? "−" : "+"}</span>
              </button>
              {openSection === "company" && (
                <div className="ps-4 pe-2 py-2 vstack gap-2 bg-light rounded-3 my-1">
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/about" onClick={onClose}>
                    About Us
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/team" onClick={onClose}>
                    Team
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/career" onClick={onClose}>
                    Careers
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/partners" onClick={onClose}>
                    White Label Partners
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/resources/blog" onClick={onClose}>
                    Blog & Insights
                  </Link>
                  <Link className="text-dark fs-sm text-decoration-none py-1" href="/contact" onClick={onClose}>
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="pt-6 border-top mt-6 d-grid gap-2">
          <Link className="btn btn-outline-dark rounded-pill py-2.5 fw-semibold" href="/login" onClick={onClose}>
            Log In / Sign Up
          </Link>
          <Link className="btn btn-dark rounded-pill py-2.5 fw-semibold" href="/contact" onClick={onClose}>
            Contact Sales
          </Link>
          <Link className="btn btn-primary rounded-pill py-2.5 fw-semibold shadow-sm" href="/login?next=/dashboard" onClick={onClose}>
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
