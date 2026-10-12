"use client";

import React, { useEffect, useState } from "react";

export function ThreeSteps() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveTab((current) => (current + 1) % 3);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  const steps = [
    {
      title: "One account, total access.",
      desc: "Configure your enterprise persona, knowledge documents, and telephony rules in seconds.",
      img: "/img/content/features/feature-step-1.webp",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 22 22">
          <path d="M0 16.25v-2.5a.75.75 0 0 1 1.5 0v2.5A3.744 3.744 0 0 0 5.25 20h2.5a.75.75 0 0 1 0 1.5h-2.5A5.244 5.244 0 0 1 0 16.25Zm20 0v-1.5a.75.75 0 0 1 1.5 0v1.5a5.244 5.244 0 0 1-5.25 5.25h-1.5a.75.75 0 0 1 0-1.5h1.5A3.744 3.744 0 0 0 20 16.25Zm-4-3.5V11.5h-4.5V16h1.25a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5H10v-4.5H5.5v1.25a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 1.5 0V10H10V5.5H8.75a.75.75 0 0 1 0-1.5h4a.75.75 0 0 1 0 1.5H11.5V10H16V8.75a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0Zm-16-5v-2.5A5.244 5.244 0 0 1 5.25 0h2.5a.75.75 0 0 1 0 1.5h-2.5A3.744 3.744 0 0 0 1.5 5.25v2.5a.75.75 0 0 1-1.5 0Zm20 0v-2.5a3.744 3.744 0 0 0-3.75-3.75h-2.5a.75.75 0 0 1 0-1.5h2.5a5.244 5.244 0 0 1 5.25 5.25v2.5a.75.75 0 0 1-1.5 0Z"></path>
        </svg>
      ),
    },
    {
      title: "Select the agent to deploy.",
      desc: "Deploy autonomous voice agents tailored for customer service, appointment booking, or inbound triage.",
      img: "/img/content/features/feature-step-2.webp",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 22 22">
          <path d="M20 13.749v-6c0-2.426-.49-3.928-1.405-4.844C17.679 1.99 16.176 1.5 13.75 1.5h-6c-2.426 0-3.93.49-4.845 1.405C1.99 3.821 1.5 5.323 1.5 7.75v.98a.75.75 0 0 1-1.5 0v-.98c0-2.573.51-4.57 1.845-5.904C3.179.51 5.176 0 7.75 0h6c2.574 0 4.57.51 5.905 1.845C20.99 3.179 21.5 5.175 21.5 7.749v6c0 2.574-.51 4.57-1.845 5.905-1.334 1.334-3.331 1.844-5.905 1.844h-1a.75.75 0 1 1 0-1.5h1c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.418 1.405-4.844Z"></path>
          <path d="M16.757 3.981a.751.751 0 0 1 .53 1.28l-5.009 5.02a.751.751 0 0 1-1.062-1.06l3.733-3.74h-2.202a.75.75 0 0 1 0-1.5h4.01Z"></path>
          <path d="M16.01 8.74V4.732a.75.75 0 1 1 1.5 0v4.01a.75.75 0 0 1-1.5 0ZM9 14.9c0-1.05-.215-1.59-.512-1.888-.296-.296-.837-.511-1.888-.511H3.9c-1.05 0-1.591.215-1.888.511-.297.297-.512.837-.512 1.888v2.7c0 1.051.215 1.591.512 1.888.296.297.837.512 1.888.512h2.7c1.05 0 1.591-.215 1.888-.512.297-.297.512-.837.512-1.888v-2.7Zm1.5 2.7c0 1.2-.236 2.234-.951 2.95-.716.715-1.75.95-2.95.95H3.9c-1.198 0-2.233-.235-2.949-.95C.235 19.833 0 18.8 0 17.6v-2.7c0-1.199.236-2.232.951-2.948.716-.716 1.75-.951 2.95-.951H6.6c1.199 0 2.233.235 2.949.95.716.716.951 1.75.951 2.95v2.7Z"></path>
        </svg>
      ),
    },
    {
      title: "Enter a prompt or automate.",
      desc: "Connect your phone line or website embed, initiate live conversations, and monitor transcripts in real-time.",
      img: "/img/content/features/feature-step-3.webp",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 22 22">
          <path d="M20 6.732c0-1.877-.47-3.149-1.28-3.956-.809-.807-2.085-1.276-3.97-1.276h-8c-1.885 0-3.161.47-3.97 1.276-.81.807-1.28 2.079-1.28 3.956v4.985c0 2.427.494 3.642 1.243 4.296.775.676 2.02.936 4.007.936h.5c.285 0 .56.087.78.196.214.108.45.273.62.503l1.5 1.994c.208.277.433.358.6.358.167 0 .392-.081.6-.358l1.5-1.994.004-.004c.33-.433.849-.695 1.396-.695h.5c1.885 0 3.161-.469 3.97-1.276.81-.807 1.28-2.078 1.28-3.956V6.732Zm1.5 4.985c0 2.11-.53 3.83-1.72 5.017-1.191 1.187-2.915 1.715-5.03 1.715h-.5a.265.265 0 0 0-.203.104l-1.497 1.99c-.451.6-1.097.957-1.8.957-.703 0-1.349-.357-1.8-.957l-1.5-1.994-.006-.009c.009.012.008.007-.01-.008a.436.436 0 0 0-.158-.077c-.025-.007-.034-.006-.026-.006h-.5c-2.013 0-3.768-.238-4.993-1.306C.507 16.052 0 14.274 0 11.717V6.732c0-2.11.53-3.83 1.72-5.017C2.912.528 4.636 0 6.75 0h8c2.115 0 3.839.528 5.03 1.715 1.19 1.187 1.72 2.907 1.72 5.017v4.985Z"></path>
          <path d="M6.221 6.93A.75.75 0 0 1 7.28 7.991L5.812 9.455l1.468 1.463a.75.75 0 1 1-1.06 1.062l-2-1.994a.75.75 0 0 1 0-1.063l2-1.994Zm7.998.001a.75.75 0 0 1 1.06-.002l2 1.994a.75.75 0 0 1 0 1.063l-2 1.994a.75.75 0 0 1-1.058-1.063l1.466-1.462-1.466-1.463a.75.75 0 0 1-.002-1.06Zm-3.158-.097a.75.75 0 0 1 1.377.594l-2 4.646a.75.75 0 1 1-1.377-.593l2-4.647Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-15 py-md-20 py-lg-30 position-relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-xxl-6 mx-auto text-center" data-ss-reveal-group="" data-y="50">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20">
                <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
              </svg>
              Steps to use
            </div>
            <div className="mb-6"></div>
            <h3 className="ss-text-reveal-blur">
              Three Simple Steps to <span className="text-primary">Get Started.</span>
            </h3>
          </div>
        </div>
        <div className="mb-10 mb-lg-15"></div>
        <div className="row align-items-center flex-lg-row-reverse g-10">
          <div className="col-lg-6 offset-xxl-1" data-ss-reveal="true" data-x="-50">
            <div className="tab-content position-relative">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  className={`tab-pane fade ${activeTab === idx ? "show active" : ""}`}
                  role="tabpanel"
                >
                  <img
                    alt={step.title}
                    loading="lazy"
                    width="625"
                    height="404"
                    className="img-fluid rounded-5 shadow-lg border"
                    style={{ color: "transparent" }}
                    src={step.img}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-xxl-5">
            <div className="nav tab-style-2 timed-tabs gap-4 d-flex flex-column" role="tablist" data-ss-reveal-group="true" data-x="50">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  className={`tab-btn ${activeTab === idx ? "active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === idx}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveTab(idx)}
                >
                  <div className="d-flex align-items-center gap-4 mb-3">
                    <div
                      className={`rounded p-2 text-white ${
                        activeTab === idx ? "bg-primary" : "bg-dark"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <h5 className="mb-0">{step.title}</h5>
                  </div>
                  <p className="mb-0 text-muted">{step.desc}</p>
                  {activeTab === idx ? <span className="tab-progress" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
