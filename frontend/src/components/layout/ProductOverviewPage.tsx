"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { servicePages } from "@/config/site";

export function ProductOverviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "build" | "deploy" | "monitor">("all");
  const [activeStepTab, setActiveStepTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const productCategoryMap: Record<string, "build" | "deploy" | "monitor"> = {
    "voice-agents": "build",
    "voice-cloning": "build",
    "realtime-tts": "build",
    "multilingual-speech": "build",
    "api-access": "deploy",
    "team-workflows": "deploy",
    "speech-analytics": "deploy",
    "sentiment-detection": "monitor",
    "conversation-insights": "monitor",
    "quality-controls": "monitor",
  };

  const productColors: Record<string, string> = {
    "voice-agents": "#0d776e",
    "voice-cloning": "#F8A85E",
    "realtime-tts": "#979BFF",
    "multilingual-speech": "#7BE1A4",
    "api-access": "#DE5EF8",
    "team-workflows": "#E1DE7B",
    "speech-analytics": "#FF97B1",
    "sentiment-detection": "#20c997",
    "conversation-insights": "#0dcaf0",
    "quality-controls": "#6f42c1",
  };

  const filteredServices = servicePages.filter((service) => {
    if (selectedCategory === "all") return true;
    return productCategoryMap[service.slug] === selectedCategory;
  });

  const stepTabs = [
    {
      title: "One account, total access.",
      desc: "Configure the agent instructions, knowledge, and telephony rules in one workspace.",
      img: "/img/content/features/feature-step-1.webp",
    },
    {
      title: "Select the agent to deploy.",
      desc: "Deploy autonomous voice agents tailored for customer service, appointment booking, or inbound triage.",
      img: "/img/content/features/feature-step-2.webp",
    },
    {
      title: "Enter a prompt or automate.",
      desc: "Connect your phone line or website embed, initiate live conversations, and monitor transcripts in real-time.",
      img: "/img/content/features/feature-step-3.webp",
    },
  ];

  const productFaqs = [
    {
      q: "Can I connect our existing phone numbers and SIP trunks?",
      a: "Vozon supports configured telephony providers and SIP-based routes. Availability and migration requirements depend on the provider and current setup.",
    },
    {
      q: "What is the end-to-end voice latency in production?",
      a: "End-to-end response time depends on the selected telephony, transcription, language, and voice providers. Test the complete stack with representative calls before launch.",
    },
    {
      q: "How does tool calling and database lookup work during calls?",
      a: "Agents can query webhooks, CRMs (HubSpot, Salesforce), and calendars live during conversations, executing verified business actions before hanging up.",
    },
    {
      q: "Is patient and client data protected by compliance standards?",
      a: "Vozon provides configurable access, workflow, and review controls. Confirm security, privacy, and regulatory requirements for your specific deployment with our team before launch.",
    },
  ];

  return (
    <SiteLayout>
      <main className="arsly-products-page" id="products-overview-page">
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
                <h2 className="section-title ss-text-reveal-blur">Our Products</h2>
                <div className="mb-4"></div>
                <p className="fs-md text-muted" data-ss-reveal="" data-y="50">
                  Build conversation flows, connect a voice and telephony stack, and review call outcomes from one workspace.
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
                    <li className="breadcrumb-item active" aria-current="page">
                      Our Products
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Product Directory Section */}
        <section className="py-15 py-md-20 py-lg-30 position-relative">
          <div className="container">
            <div className="row align-items-end justify-content-between g-6 g-lg-10 mb-10 mb-lg-16">
              <div className="col-lg-7" data-ss-reveal-group="true" data-y="50">
                <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20">
                    <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
                  </svg>
                  Voice Architecture
                </div>
                <h2 className="ss-text-reveal-blur mb-0">Everything your voice operation needs.</h2>
              </div>

              {/* Category Filter Pills */}
              <div className="col-lg-5 text-lg-end" data-ss-reveal-group="true" data-y="50">
                <div className="d-inline-flex bg-light border p-1 rounded-pill">
                  {(["all", "build", "deploy", "monitor"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`btn btn-sm rounded-pill px-4 py-2 text-capitalize fw-semibold border-0 transition-base ${
                        selectedCategory === cat ? "btn-dark text-white shadow-sm" : "btn-light text-muted"
                      }`}
                    >
                      {cat === "all" ? "All Products" : cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Arsly Tilt-Card Grid for Products */}
            <div className="row g-6 g-xl-8" data-ss-reveal-group="true" data-stagger="0.1" data-y="50">
              {filteredServices.map((service, index) => {
                const category = productCategoryMap[service.slug] ?? "build";
                const iconColor = productColors[service.slug] ?? "#0d776e";
                return (
                  <div className="col-md-6 col-xl-4" key={service.slug}>
                    <div className="tilt-card h-full" data-tilt="" data-tilt-speed="0.3" data-tilt-max="4">
                      <div className="bg-white bg-light-2-hover border shadow-sm transition-base rounded-5 overflow-hidden h-full p-6 p-xl-8 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-6">
                            <div
                              className="w-14 h-14 rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                              style={{ backgroundColor: iconColor }}
                            >
                              <span className="fs-md">{String(index + 1).padStart(2, "0")}</span>
                            </div>
                            <span className="badge bg-light border text-dark text-uppercase px-3 py-1.5 rounded-pill fs-xs fw-bold">
                              {category}
                            </span>
                          </div>

                          <h4 className="mb-2 fw-bold text-dark">
                            <Link className="text-decoration-none text-dark" href={`/services/${service.slug}`}>
                              {service.title}
                            </Link>
                          </h4>
                          <p className="text-muted fs-sm mb-5 lh-base">{service.summary}</p>

                          <ul className="list-unstyled d-grid gap-2.5 mb-6 fs-xs text-muted">
                            {service.highlights.slice(0, 3).map((hl) => (
                              <li className="d-flex align-items-center gap-2" key={hl}>
                                <span className="text-primary fw-bold">✓</span>
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-top">
                          <Link
                            className="btn btn-outline-dark btn-sm rounded-pill px-4 w-100 d-flex align-items-center justify-content-between text-decoration-none"
                            href={`/services/${service.slug}`}
                          >
                            <span>Explore Product</span>
                            <span className="fs-md ms-2">↗</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Three Steps Showcase Section */}
        <section className="py-15 py-md-20 py-lg-30 bg-light border-top border-bottom position-relative">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-xxl-6 mx-auto text-center mb-10 mb-lg-15" data-ss-reveal-group="" data-y="50">
                <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-4">
                  Steps to use
                </div>
                <h2 className="ss-text-reveal-blur mb-3">
                  Three Simple Steps to <span className="text-primary">Get Started.</span>
                </h2>
                <p className="text-muted fs-md">
                  Deploy fully capable autonomous voice agents into your production phone stack in under fifteen minutes.
                </p>
              </div>
            </div>

            <div className="row align-items-center flex-lg-row-reverse g-10">
              <div className="col-lg-6 offset-xxl-1" data-ss-reveal="true" data-x="-50">
                <div className="position-relative overflow-hidden rounded-5 shadow-lg border bg-white p-3">
                  <Image
                    alt={stepTabs[activeStepTab].title}
                    width={625}
                    height={404}
                    className="img-fluid rounded-4 object-fit-cover w-100"
                    src={stepTabs[activeStepTab].img}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-xxl-5">
                <div className="vstack gap-4">
                  {stepTabs.map((step, idx) => {
                    const isActive = activeStepTab === idx;
                    return (
                      <div
                        key={step.title}
                        onClick={() => setActiveStepTab(idx)}
                        className={`p-5 rounded-4 border transition-base cursor-pointer ${
                          isActive ? "bg-white border-primary shadow-sm" : "bg-transparent border-transparent"
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <div
                            className={`w-8 h-8 rounded-circle d-flex align-items-center justify-content-center fs-xs fw-bold ${
                              isActive ? "bg-primary text-white" : "bg-light text-muted border"
                            }`}
                          >
                            0{idx + 1}
                          </div>
                          <h5 className={`mb-0 fw-bold ${isActive ? "text-dark" : "text-muted"}`}>
                            {step.title}
                          </h5>
                        </div>
                        <p className="mb-0 text-muted fs-sm ps-11 lh-base">{step.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-15 py-md-20 py-lg-30 position-relative">
          <div className="container">
            <div className="bg-light p-6 p-lg-10 p-xxl-20 rounded-5 overflow-hidden position-relative border">
              <div className="row justify-content-center g-10 align-items-start">
                <div className="col-lg-5">
                  <div className="text-center text-lg-start" data-ss-reveal-group="" data-y="50">
                    <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-4">
                      Architecture & FAQ
                    </div>
                    <h2 className="ss-text-reveal-blur mb-4">Frequently asked questions.</h2>
                    <p className="fs-md text-muted mb-6">
                      Have questions about telephony carriers, speech models, or embedding voice capabilities?
                    </p>
                    <Link className="btn btn-outline-dark rounded-pill px-5 py-2.5" href="/contact">
                      Talk with an Engineer
                    </Link>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="accordion d-grid gap-4">
                    {productFaqs.map((faq, index) => {
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
                              onClick={() => setOpenFaq(isOpen ? null : index)}
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
