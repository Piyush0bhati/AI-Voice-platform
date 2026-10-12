"use client";

import React from "react";
import Link from "next/link";

export function StickyEnterprise() {
  return (
    <section className="bg-light py-15 py-md-20 py-lg-30 position-relative pinned-container">
      <div className="container">
        <div className="row g-6 g-md-10 g-lg-0 position-relative align-items-start">
          <div className="col-lg-5 pe-lg-10 pinned-column" data-ss-reveal-group="" data-y="50">
            <div className="pinned-element">
              <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20">
                  <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
                </svg>
                Features
              </div>
              <div className="mb-6"></div>
              <h2 className="ss-text-reveal-blur mb-0">All-in-one multi-agent AI for enterprise.</h2>
              <div className="mb-6"></div>
              <p className="fs-md mb-0 text-muted">
                Orchestrate intelligent voice agents that adapt to complex enterprise workflows, handle high concurrent call volumes, and integrate directly with your CRM and telephony infrastructure.
              </p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="sticky-cards-container d-grid gap-5 gap-lg-8" data-sticky-spacer="20" data-sticky-top="200">
              {/* Card 1 */}
              <div className="sticky-card bg-white shadow-lg rounded-5 p-3 hover-scale">
                <div className="row g-0 align-items-center">
                  <div className="col-md-6">
                    <div className="p-4 p-xl-8 vstack justify-content-between gap-5 h-full" data-ss-reveal-group="" data-y="50">
                      <div>
                        <h5 className="mb-3">Self-directed AI agents.</h5>
                        <p className="fs-md mb-4 text-muted">
                          Autonomous voice agents that execute multi-turn reasoning, remember conversation context, and trigger backend tools in real-time.
                        </p>
                        <div className="hstack flex-wrap gap-2">
                          <span className="badge bg-light text-dark border p-2">AI Agents</span>
                          <span className="badge bg-light text-dark border p-2">Intelligent Voice</span>
                          <span className="badge bg-light text-dark border p-2">Secure Systems</span>
                        </div>
                      </div>
                      <div>
                        <Link className="btn btn-primary has-icon" href="/dashboard">
                          Explore Agent
                          <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                              <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" data-ss-reveal="" data-x="-50">
                    <div className="img-clip-anim-box ratio ratio-1x1 rounded-5 overflow-hidden h-full">
                      <img alt="Self-directed AI agents" loading="lazy" width={445} height={445} className="img-clip-anim img-fluid shadow-sm w-full h-full object-fit-cover" src="/img/content/features/5.webp" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="sticky-card bg-white shadow-lg rounded-5 p-3 hover-scale">
                <div className="row g-0 align-items-center">
                  <div className="col-md-6">
                    <div className="p-4 p-xl-8 vstack justify-content-between gap-5 h-full" data-ss-reveal-group="" data-y="50">
                      <div>
                        <h5 className="mb-3">Agent orchestration engine.</h5>
                        <p className="fs-md mb-4 text-muted">
                          Intelligently route caller intent to specialized domain sub-agents for billing, technical support, and sales closures with seamless handoffs.
                        </p>
                        <div className="hstack flex-wrap gap-2">
                          <span className="badge bg-light text-dark border p-2">Orchestration</span>
                          <span className="badge bg-light text-dark border p-2">Smart Handoff</span>
                          <span className="badge bg-light text-dark border p-2">Live Routing</span>
                        </div>
                      </div>
                      <div>
                        <Link className="btn btn-primary has-icon" href="/dashboard">
                          See Uses
                          <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                              <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" data-ss-reveal="" data-x="-50">
                    <div className="img-clip-anim-box ratio ratio-1x1 rounded-5 overflow-hidden h-full">
                      <img alt="Agent orchestration engine" loading="lazy" width={445} height={445} className="img-clip-anim img-fluid shadow-sm w-full h-full object-fit-cover" src="/img/content/features/6.webp" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="sticky-card bg-white shadow-lg rounded-5 p-3 hover-scale">
                <div className="row g-0 align-items-center">
                  <div className="col-md-6">
                    <div className="p-4 p-xl-8 vstack justify-content-between gap-5 h-full" data-ss-reveal-group="" data-y="50">
                      <div>
                        <h5 className="mb-3">Parallel intelligence at scale.</h5>
                        <p className="fs-md mb-4 text-muted">
                          Coordinate inbound and outbound workflows with call routing, transcription, and connected business systems.
                        </p>
                        <div className="hstack flex-wrap gap-2">
                          <span className="badge bg-light text-dark border p-2">High Concurrency</span>
                          <span className="badge bg-light text-dark border p-2">CRM Sync</span>
                          <span className="badge bg-light text-dark border p-2">Live Webhooks</span>
                        </div>
                      </div>
                      <div>
                        <Link className="btn btn-primary has-icon" href="/dashboard">
                          Deploy at Scale
                          <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                              <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" data-ss-reveal="" data-x="-50">
                    <div className="img-clip-anim-box ratio ratio-1x1 rounded-5 overflow-hidden h-full">
                      <img alt="Parallel intelligence at scale" loading="lazy" width={445} height={445} className="img-clip-anim img-fluid shadow-sm w-full h-full object-fit-cover" src="/img/content/features/7.webp" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
