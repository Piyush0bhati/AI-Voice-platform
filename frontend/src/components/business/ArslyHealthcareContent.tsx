"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";

export function ArslyHealthcareContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const healthcareCards = [
    {
      title: "24/7 Patient Scheduling",
      role: "Appointment Booking & Rescheduling",
      desc: "Books directly into connected EMR calendars, checks doctor availability in real-time, and sends instant SMS confirmations.",
      img: "/img/content/features/1.webp",
      tag: "Live EMR Sync",
    },
    {
      title: "Patient Intake & Registration",
      role: "Pre-Visit Data Collection",
      desc: "Collects patient demographic details, verifies insurance policies, and confirms pre-procedure preparation guidelines.",
      img: "/img/content/features/2.webp",
      tag: "Structured Data",
    },
    {
      title: "Clinical Triage & Escalation",
      role: "Warm Care Team Handoff",
      desc: "Identifies emergency symptoms and high-priority cases, instantly transferring the call to an on-duty nurse with caller summary.",
      img: "/img/content/features/3.webp",
      tag: "Zero Delay Transfer",
    },
    {
      title: "Prescription & Lab Queries",
      role: "Pharmacy & Results Status",
      desc: "Answers routine status checks on test results and prescription refills without tying up clinical front desk staff.",
      img: "/img/content/features/4.webp",
      tag: "Pharmacy Automation",
    },
    {
      title: "Multilingual Patient Support",
      role: "15+ Languages & Dialects",
      desc: "Serves diverse patient populations in their native language with empathetic, natural pronunciation and clear pacing.",
      img: "/img/content/features/5.webp",
      tag: "Multilingual",
    },
    {
      title: "HIPAA Compliant & Secure",
      role: "Signed BAA & PHI Redaction",
      desc: "End-to-end encrypted voice sessions, automated PHI redaction, and strict compliance with healthcare privacy regulations.",
      img: "/img/content/features/6.webp",
      tag: "HIPAA & SOC-2",
    },
  ];

  const workflowSteps = [
    {
      num: "01",
      title: "Inbound Greeting & Intent Discovery",
      desc: "The agent greets the patient naturally, recognizes their language, and extracts the primary intent (booking, prescription, or inquiry).",
    },
    {
      num: "02",
      title: "Secure Verification & Intake",
      desc: "Confirms patient identity using date of birth and phone number, pulling relevant patient record context securely.",
    },
    {
      num: "03",
      title: "Real-time Action Execution",
      desc: "Queries doctor availability in Epic/Cerner/Google Calendar and confirms the chosen slot or executes the requested workflow.",
    },
    {
      num: "04",
      title: "Care Team Summary & Follow-up",
      desc: "Sends structured call notes and booking confirmation to clinic staff, followed by an immediate SMS confirmation to the patient.",
    },
  ];

  const faqs = [
    {
      q: "Is the voice platform HIPAA compliant?",
      a: "Yes. We sign Business Associate Agreements (BAAs), encrypt voice streams in transit and at rest, redact PHI automatically from logs, and never train public models on patient conversations.",
    },
    {
      q: "Can the AI agent diagnose patients or offer medical advice?",
      a: "No. The agent operates strictly within approved administrative and triage boundaries. When a patient mentions urgent clinical symptoms, it follows safety rules and transfers immediately to medical staff.",
    },
    {
      q: "Which EHR and scheduling systems do you integrate with?",
      a: "We integrate directly via standard REST APIs and FHIR/HL7 endpoints with Epic, Cerner, AthenaHealth, Kareo, NextGen, DrChrono, and Google Calendar.",
    },
    {
      q: "What happens if a patient has an emergency?",
      a: "Emergency detection algorithms flag urgent phrases (e.g. chest pain, shortness of breath, severe bleeding) and immediately trigger a priority transfer or instruct the caller to dial 911/emergency services.",
    },
  ];

  return (
    <SiteLayout>
      <main className="arsly-healthcare-page" id="healthcare-page">
        {/* Page Header */}
        <section className="page-header bg-light position-relative pb-6 pb-xl-15 pt-25 pt-md-25 pt-xl-40 overflow-hidden">
          <div className="grid-pattern"></div>
          <div className="overlay"></div>
          <Image
            alt="Decorative circle shape"
            width={1200}
            height={762}
            className="circle-shape position-absolute top-50 end-0 translate-middle-y"
            src="/img/shapes/circle-shape.svg"
            priority
          />
          <div className="container position-relative z-2">
            <div className="row">
              <div className="col-xl-8 col-xxl-6">
                <h2 className="section-title ss-text-reveal-blur">Healthcare Voice AI</h2>
                <div className="mb-4"></div>
                <p className="fs-md text-muted" data-ss-reveal="" data-y="50">
                  Empathetic, HIPAA-compliant AI phone agents that handle 24/7 patient intake, appointment scheduling, triage, and seamless care team handoffs with zero hold times.
                </p>
                <div className="mb-8 mb-xl-12"></div>
                <nav aria-label="breadcrumb" data-ss-reveal="true" data-y="50">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="animated-link" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="currentColor" viewBox="0 0 21 18">
                          <path d="M7.4 18a1 1 0 0 0 1-1v-4.353a1 1 0 0 1 1-1h2.2a1 1 0 0 1 1 1V17a1 1 0 0 0 1 1h3.25a1 1 0 0 0 1-1v-6.593c0-.485.393-.878.877-.878.803 0 1.184-.988.59-1.527L11.172.61a1 1 0 0 0-1.344 0L1.683 8.002c-.594.54-.213 1.527.59 1.527.484 0 .877.393.877.878V17a1 1 0 0 0 1 1H7.4Z"></path>
                        </svg>
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link className="animated-link" href="/product">
                        Solutions
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Healthcare
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Core Healthcare Features Grid */}
        <section className="py-15 py-md-20 py-lg-30 position-relative">
          <div className="container">
            <div className="row align-items-end justify-content-between g-6 g-lg-10 mb-10 mb-lg-16">
              <div className="col-lg-8" data-ss-reveal-group="true" data-y="50">
                <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20">
                    <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
                  </svg>
                  Patient Access & Triage
                </div>
                <h2 className="ss-text-reveal-blur mb-0">Autonomous voice systems built for patient trust.</h2>
              </div>
              <div className="col-lg-4 text-lg-end" data-ss-reveal-group="true" data-y="50">
                <Link className="btn btn-dark has-icon rounded-pill px-6 py-3" href="/contact">
                  Schedule Healthcare Demo
                  <div className="icon ms-2 d-inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                      <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                      <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            {/* Arsly 6-Card Tilt Grid */}
            <div className="row g-6 g-xl-8" data-ss-reveal-group="true" data-stagger="0.15" data-y="50">
              {healthcareCards.map((card) => (
                <div className="col-md-6 col-lg-4" key={card.title}>
                  <div className="tilt-card h-full" data-tilt="" data-tilt-speed="0.3" data-tilt-max="4">
                    <div className="bg-white bg-light-2-hover border shadow-sm transition-base rounded-5 overflow-hidden h-full d-flex flex-column">
                      <div className="img-clip-anim-box d-block overflow-hidden ratio ratio-16x9 position-relative">
                        <Image
                          alt={card.title}
                          width={400}
                          height={225}
                          className="img-clip-anim img-fluid object-fit-cover"
                          src={card.img}
                        />
                        <div className="position-absolute top-0 end-0 m-3">
                          <span className="badge bg-white text-dark shadow-sm rounded-pill px-3 py-1 fs-xs fw-bold border">
                            {card.tag}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 p-xl-8 flex-fill d-flex flex-column justify-content-between">
                        <div>
                          <p className="fs-xs text-primary fw-bold text-uppercase letter-spacing-1 mb-1">
                            {card.role}
                          </p>
                          <h4 className="mb-3 fw-bold text-dark">{card.title}</h4>
                          <p className="text-muted fs-sm mb-4 lh-base">{card.desc}</p>
                        </div>
                        <div>
                          <Link className="btn btn-outline-dark btn-sm rounded-pill px-4" href="/contact">
                            Configure Workflow →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Audio Dialogue Demo */}
        <section className="py-12 bg-light border-top border-bottom position-relative">
          <div className="container">
            <div className="row align-items-center g-8">
              <div className="col-lg-5">
                <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-3">
                  <span className="w-2.5 h-2.5 rounded-circle bg-success animate-pulse"></span>
                  Live Audio Simulation
                </div>
                <h3 className="fw-bold mb-3">Listen to a patient triage conversation</h3>
                <p className="text-muted fs-md mb-4">
                  Experience natural conversational turn-taking, empathetic cadence, and zero artificial delays during a real appointment booking scenario.
                </p>
                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="btn btn-primary rounded-pill px-5 py-2.5 d-inline-flex align-items-center gap-2"
                  >
                    {isPlayingAudio ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                        Pause Sample
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Play Call Sample
                      </>
                    )}
                  </button>
                  <span className="fs-xs text-muted fw-medium">Latency: ~410ms</span>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="bg-white border rounded-5 shadow-sm p-5 p-md-7">
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
                    <span className="fw-bold text-dark fs-sm">Clinical Assistant: Dr. Miller’s Clinic</span>
                    <span className="badge bg-light text-primary border rounded-pill px-3 py-1 fs-xs">Active Call</span>
                  </div>
                  <div className="vstack gap-3 mb-4">
                    <div className="d-flex gap-3">
                      <div className="w-8 h-8 rounded-circle bg-light d-flex align-items-center justify-content-center text-primary fw-bold fs-xs flex-shrink-0">
                        AI
                      </div>
                      <div className="bg-light p-3 rounded-4 fs-sm text-dark flex-fill">
                        “Good morning! You’ve reached Dr. Miller’s clinic. Are you calling to schedule an appointment or speak with clinical staff?”
                      </div>
                    </div>
                    <div className="d-flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-xs flex-shrink-0">
                        P
                      </div>
                      <div className="bg-primary text-white p-3 rounded-4 fs-sm flex-fill">
                        “Hi, I need to reschedule my annual wellness checkup for next Thursday afternoon if possible.”
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="w-8 h-8 rounded-circle bg-light d-flex align-items-center justify-content-center text-primary fw-bold fs-xs flex-shrink-0">
                        AI
                      </div>
                      <div className="bg-light p-3 rounded-4 fs-sm text-dark flex-fill">
                        “I can certainly help with that. Dr. Miller has openings next Thursday at 2:30 PM and 4:15 PM. Which one suits you better?”
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between pt-2 border-top text-muted fs-xs">
                    <span>Verified Patient: Jane D. (DOB: 04/19/88)</span>
                    <span className="text-success fw-bold">✓ EMR Calendar Updated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Patient Journey */}
        <section className="py-15 py-md-20 py-lg-30 position-relative">
          <div className="container">
            <div className="text-center max-w-700 mx-auto mb-12">
              <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-4">
                Clinical Workflow
              </div>
              <h2 className="ss-text-reveal-blur mb-3">From incoming ring to EHR resolution in 4 steps.</h2>
              <p className="text-muted fs-md">
                Streamline front-office operations with zero dropped calls and automatic coordination with care teams.
              </p>
            </div>

            <div className="row g-6">
              {workflowSteps.map((step, idx) => (
                <div className="col-md-6 col-lg-3" key={step.num}>
                  <div className="bg-white border rounded-5 p-6 shadow-sm h-full d-flex flex-column justify-content-between hover-scale">
                    <div>
                      <span className="display-5 fw-bolder text-primary lh-1 d-block mb-3 opacity-80">
                        {step.num}
                      </span>
                      <h5 className="fw-bold mb-3">{step.title}</h5>
                      <p className="text-muted fs-sm lh-base mb-0">{step.desc}</p>
                    </div>
                    <div className="pt-4 mt-4 border-top">
                      <span className="fs-xs fw-bold text-dark">Step {idx + 1} of 4</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-15 pb-md-20 pb-lg-30 position-relative overflow-hidden">
          <div className="container">
            <div className="bg-light p-6 p-lg-10 p-xxl-20 rounded-5 overflow-hidden position-relative border">
              <div className="row justify-content-center g-10 align-items-start">
                <div className="col-lg-5">
                  <div className="text-center text-lg-start" data-ss-reveal-group="" data-y="50">
                    <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-4">
                      Compliance & FAQ
                    </div>
                    <h2 className="ss-text-reveal-blur mb-4">Frequently asked questions.</h2>
                    <p className="fs-md text-muted mb-6">
                      Questions regarding clinical boundaries, privacy protection, and custom integrations.
                    </p>
                    <Link className="btn btn-outline-dark rounded-pill px-5 py-2.5" href="/contact">
                      Contact Healthcare Specialist
                    </Link>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="accordion d-grid gap-4">
                    {faqs.map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div
                          className={`accordion-item bg-white shadow-sm rounded-4 ${isOpen ? "active" : ""}`}
                          key={faq.q}
                        >
                          <h3 className="accordion-header m-0">
                            <button
                              type="button"
                              className="accordion-button"
                              onClick={() => toggleFaq(index)}
                              aria-expanded={isOpen}
                            >
                              <span>{faq.q}</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className="icon ms-3"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                              </svg>
                            </button>
                          </h3>
                          {isOpen && (
                            <div className="accordion-collapse">
                              <div className="accordion-body text-muted pt-0 pb-4 px-4 fs-sm lh-base">
                                {faq.a}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
