"use client";

import React from "react";

export function MultipleAgents() {
  const leftAgents = [
    {
      title: "Inbound call handling",
      desc: "Answer common questions, capture caller details, and use approved tools when the workflow requires an action.",
    },
    {
      title: "Intent and context",
      desc: "Understand the current request and retain the details already shared during the conversation.",
    },
    {
      title: "Appointment workflows",
      desc: "Check connected availability, collect the required details, and complete the configured booking action.",
    },
  ];

  const rightAgents = [
    {
      title: "Human handoff",
      desc: "Transfer sensitive or complex conversations according to the rules defined for the agent.",
    },
    {
      title: "Speech provider stack",
      desc: "Choose the transcription and voice providers that fit the language and experience your workflow needs.",
    },
    {
      title: "Access and review controls",
      desc: "Manage workspace access, review call activity, and define what each agent is allowed to do.",
    },
  ];

  return (
    <section className="pt-15 pt-md-20 pt-lg-30 position-relative overflow-hidden">
      <div className="container">
        <div className="row align-items-end justify-content-between g-6 g-lg-10">
          <div className="col-lg-6 col-xxl-5" data-ss-reveal-group="true" data-y="50">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20">
                <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
              </svg>
              Multi-Agent Architecture
            </div>
            <div className="mb-6"></div>
            <h2 className="ss-text-reveal-blur mb-0">Intelligent systems of multiple AI voice agents.</h2>
          </div>
          <div className="col-lg-5" data-ss-reveal-group="true" data-y="50">
            <p className="fs-md mb-0 text-muted">
              Connect specialized autonomous voice agents that coordinate seamlessly to handle complex customer interactions across voice, telephony, and web widgets.
            </p>
          </div>
        </div>
        <div className="mb-10 mb-lg-15"></div>
        <div className="row align-items-center g-8 g-xl-10 position-relative">
          <div className="gradient-line"></div>
          <div className="col-lg-6 text-center order-lg-2" data-ss-reveal="true" data-y="50">
            <img
              alt="Multi-Agent Pipeline"
              loading="lazy"
              width={620}
              height={650}
              className="img-fluid hover-scale"
              style={{ color: "transparent" }}
              src="/img/content/app/app-preview-2.webp"
            />
          </div>
          <div className="col-lg-3 order-lg-1">
            <div className="vstack gap-8 gap-xl-10" data-ss-reveal-group="true" data-y="50">
              {leftAgents.map((agent) => (
                <div key={agent.title} className="p-3 bg-white rounded-4 border shadow-sm hover-scale">
                  <h6 className="mb-2 text-dark">{agent.title}</h6>
                  <p className="fs-sm mb-0 text-muted" dangerouslySetInnerHTML={{ __html: agent.desc }}></p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3 order-lg-3">
            <div className="vstack gap-8 gap-xl-10" data-ss-reveal-group="true" data-y="50">
              {rightAgents.map((agent) => (
                <div key={agent.title} className="p-3 bg-white rounded-4 border shadow-sm hover-scale">
                  <h6 className="mb-2 text-dark">{agent.title}</h6>
                  <p className="fs-sm mb-0 text-muted" dangerouslySetInnerHTML={{ __html: agent.desc }}></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
