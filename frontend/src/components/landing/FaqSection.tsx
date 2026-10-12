"use client";

import React, { useState } from "react";
import Link from "next/link";

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What is a Multi-Agent AI System?",
      a: "A Multi-Agent AI System is an ecosystem of multiple coordinated AI agents where each agent handles a specific capability—such as natural voice synthesis, database lookup, sentiment evaluation, or tool calling—working together as a unified team."
    },
    {
      q: "How do Multi-Agent AI Systems work in voice calls?",
      a: "During a call, the configured speech provider transcribes the caller, the language model follows the agent instructions and tools, and the selected voice provider speaks the response."
    },
    {
      q: "How secure are Multi-Agent AI Systems?",
      a: "Security depends on the deployment and providers you configure. Vozon gives teams controls for access, connected tools, call review, and workflow boundaries; confirm any formal compliance requirement with our team before deployment."
    },
    {
      q: "Can new agents be added or customized?",
      a: "Yes! You can create custom agent personas with dedicated system prompts, custom tools, private knowledge bases, and unique voice profiles with just a few clicks."
    },
    {
      q: "How do we get started?",
      a: "Create an account, configure an agent, connect the required tools and phone route, then test the complete conversation before making it available to callers."
    }
  ];

  return (
    <section className="pt-15 pt-md-20 pt-lg-30 position-relative overflow-hidden">
      <div className="container">
        <div className="bg-light p-6 p-lg-12 p-xxl-20 rounded-5 overflow-hidden position-relative">
          <div className="position-absolute bottom-0 start-0 opacity-25">
            <img alt="" width={396} height={230} className="img-fluid" src="/img/shapes/gradient-shape-1.webp" />
          </div>

          <div className="row g-10 position-relative z-1">
            <div className="col-lg-5">
              <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20" width={20} height={20}>
                  <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131"></path>
                </svg>
                FAQ
              </div>
              <h2 className="mb-4">Frequently asked question.</h2>
              <p className="fs-md text-secondary mb-6">
                Still have a question? Share your workflow with our team and we will help you plan the next step.
              </p>
              <Link className="btn btn-dark has-icon px-5 py-3" href="/contact">
                Contact us!
                <div className="icon ms-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width={16} height={16}>
                    <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                    <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                  </svg>
                </div>
              </Link>
            </div>

            <div className="col-lg-7">
              <div className="accordion d-grid gap-4">
                {faqs.map((f, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <div key={i} className={`accordion-item bg-white border rounded-4 p-5 shadow-sm transition-all ${isOpen ? "border-primary" : ""}`}>
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? -1 : i)}
                        className="accordion-button bg-transparent border-0 d-flex justify-content-between align-items-center w-100 text-start fw-semibold fs-5 p-0"
                      >
                        {f.q}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="icon transition-all ms-3 flex-shrink-0"
                          style={{ width: 18, height: 18, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="accordion-collapse mt-3 text-secondary lh-base">
                          <div className="accordion-body p-0">{f.a}</div>
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
  );
}
