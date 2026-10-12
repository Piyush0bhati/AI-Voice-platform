"use client";

import React, { useState } from "react";

export function AboutEngineering() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What is an AI Multi-Agent System?",
      a: "Our AI Multi-Agent Platform connects specialized autonomous AI agents that collaborate in real time—handling voice calls, customer queries, automated reasoning, task routing, and enterprise workflows without manual friction."
    },
    {
      q: "Do I need technical skills to deploy agents?",
      a: "The visual workspace helps teams configure prompts, tools, phone routes, and handoff rules. Technical teams can extend workflows through APIs and webhooks."
    },
    {
      q: "What types of workflows can I automate?",
      a: "From inbound phone reception and multilingual support to lead qualification, appointment booking, outbound callbacks, document synthesis, and automated CRM updates."
    },
    {
      q: "How fast is agent response and call execution?",
      a: "Response time depends on the selected speech, language, voice, and telephony providers. The dashboard keeps the configured stack visible so teams can test it before launch."
    }
  ];

  return (
    <section className="py-15 py-md-20 py-lg-30 position-relative overflow-hidden">
      <div className="gradient-line top-0"></div>
      <div className="gradient-line"></div>
      <img
        alt=""
        width={1920}
        height={1024}
        className="s-shape-2 position-absolute translate-middle top-50 start-50 z-n1 opacity-50"
        src="/img/shapes/s-shape-2.svg"
      />
      <div className="container">
        <div className="row g-10 g-xl-20 align-items-center">
          <div className="col-lg-6" data-ss-reveal="true" data-x="50">
            <img
              alt="Engineering AI"
              width={605}
              height={508}
              className="img-fluid w-full rounded-4 shadow-sm"
              src="/img/content/services/service-img-1.webp"
            />
          </div>
          <div className="col-lg-6" data-ss-reveal-group="true" data-y="50">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20" width={20} height={20}>
                <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131"></path>
              </svg>
              Get to Know Us
            </div>
            <div className="mb-6"></div>
            <h2 className="ss-text-reveal-blur">How Vozon fits into your call workflow.</h2>
            <div className="mb-10 mb-xl-15"></div>

            <div className="accordion d-grid gap-4 gap-lg-6">
              {faqs.map((item, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className={`accordion-item bg-white border rounded-3 p-4 shadow-sm transition-all ${isOpen ? "active border-primary" : ""}`}>
                    <h2 className="accordion-header m-0">
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                        className={`accordion-button bg-transparent border-0 d-flex justify-content-between align-items-center w-100 text-start fw-semibold fs-5 p-0 ${isOpen ? "" : "collapsed"}`}
                      >
                        {item.q}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="icon transition-all ms-3 flex-shrink-0"
                          style={{ width: 20, height: 20, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </button>
                    </h2>
                    {isOpen && (
                      <div className="accordion-collapse mt-3 text-secondary lh-base">
                        <div className="accordion-body p-0">{item.a}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
