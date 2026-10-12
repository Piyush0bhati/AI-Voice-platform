"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";

export function ArslyPricingContent() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const partnerLogos = [
    { name: "Apple", src: "/img/brand/partners/apple-logo.svg" },
    { name: "Google", src: "/img/brand/partners/google-logo.svg" },
    { name: "Amazon", src: "/img/brand/partners/amazon-logo.svg" },
    { name: "FedEx", src: "/img/brand/partners/fedex-logo.svg" },
    { name: "Airbnb", src: "/img/brand/partners/airbnb-logo.svg" },
  ];

  const faqs = [
    {
      q: "What is included in the Vozon Multi-Agent Voice System?",
      a: "Vozon provides low-latency voice pipelines with custom telephony SIP trunking, natural speech-to-text, reasoning LLMs, realistic text-to-speech, and automated tool integrations (CRMs, calendars, databases) that execute workflows live on the call.",
    },
    {
      q: "How does the per-minute or plan billing work?",
      a: "Plans include base platform access, agent orchestration, and webhook concurrency. Voice usage is billed transparently by connected call minutes, with no hidden telecom fees or setup charges.",
    },
    {
      q: "How secure is patient and customer conversational data?",
      a: "We adhere to enterprise-grade security standards including SOC2 Type II, HIPAA compliance for healthcare workloads with signed BAAs, and zero retention on proprietary voice training data.",
    },
    {
      q: "Can new agents or custom industry workflows be added anytime?",
      a: "Yes. You can build and deploy unlimited specialized agents across healthcare triage, appointment scheduling, customer support, and sales outreach directly from the dashboard.",
    },
    {
      q: "How do we get started or test with live telephony?",
      a: "Sign up in 30 seconds, configure your first agent prompt or select a pre-built template, attach a phone number or web widget, and test live calls immediately with sandbox minutes.",
    },
  ];

  return (
    <SiteLayout>
      <main className="arsly-pricing-page" id="pricing-page">
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
                <h2 className="section-title ss-text-reveal-blur">Our Pricing</h2>
                <div className="mb-4"></div>
                <p className="fs-md text-muted" data-ss-reveal="" data-y="50">
                  Deploy autonomous, human-sounding voice agents with transparent usage pricing. Scale from first test calls to millions of monthly conversations.
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
                      Our Pricing
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-15 py-md-20 py-lg-30 position-relative">
          <div className="container">
            <div className="row align-items-end justify-content-center justify-content-lg-between g-6 g-lg-10">
              <div className="col-lg-7 col-xxl-6 text-center text-lg-start" data-ss-reveal-group="true" data-y="50">
                <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20">
                    <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
                  </svg>
                  Pricing
                </div>
                <div className="mb-4"></div>
                <h2 className="ss-text-reveal-blur mb-0">Flexible pricing plans choose your best.</h2>
              </div>

              {/* Monthly / Yearly Switcher */}
              <div className="col-auto text-center text-lg-end" data-ss-reveal-group="true" data-y="50">
                <div className="hstack justify-content-center justify-content-xl-start gap-4">
                  <span className={`form-check-label fw-semibold ${!isYearly ? "text-dark" : "text-muted"}`}>
                    Monthly
                  </span>
                  <div className="form-check form-switch form-switch-lg m-0">
                    <input
                      className="form-check-input cursor-pointer"
                      type="checkbox"
                      role="switch"
                      id="pricing-switch"
                      checked={isYearly}
                      onChange={(e) => setIsYearly(e.target.checked)}
                    />
                  </div>
                  <span className={`form-check-label fw-semibold ${isYearly ? "text-dark" : "text-muted"}`}>
                    Yearly{" "}
                    <span className="bg-light border text-primary px-3 py-1 rounded-pill d-inline-block fs-xs fw-bold ms-1">
                      Save 20%
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-10 mb-lg-15"></div>

            {/* Two Main Plan Cards */}
            <div className="row g-6 g-lg-10" data-ss-reveal-group="" data-y="50">
              {/* Standard Plan */}
              <div className="col-xxl-6">
                <div className="bg-white rounded-5 shadow-lg p-4 p-md-6 border hover-scale">
                  <div className="row g-6 g-md-10 align-items-center">
                    <div className="col-md-6">
                      <div className="vstack justify-content-between gap-6 p-2 h-full">
                        <div>
                          <h4 className="mb-1 fw-bold">Standard plan</h4>
                          <p className="fs-md text-muted mb-0">For startups & general users</p>
                        </div>
                        <div>
                          <div className="d-flex align-items-end gap-1 mb-2">
                            <h2 className="mb-0 lh-1 fw-bolder pricing-amount text-dark">
                              {isYearly ? "$566" : "$59"}
                            </h2>
                            <p className="fs-md mb-1 text-muted pricing-period">
                              {isYearly ? "/Year" : "/Month"}
                            </p>
                          </div>
                          <div className="mb-6"></div>
                          <Link
                            className="btn btn-outline-dark border bg-primary-hover border-primary-hover has-icon w-100 justify-content-center"
                            href="/dashboard"
                          >
                            Get Started Now
                            <div className="icon ms-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                                <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                                <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-light rounded-4 p-6 p-xl-8">
                        <ul className="list-unstyled mb-0 d-grid gap-4 fs-md">
                          {[
                            "Unlimited agent creation",
                            "Automated workflow management",
                            "SIP & telephony carrier setup",
                            "Enterprise tool integrations",
                            "Multi-Agent AI routing",
                            "Live transcription & logs",
                          ].map((feature) => (
                            <li className="hstack align-items-center gap-3 text-dark" key={feature}>
                              <div className="w-7 h-7 rounded-circle bg-white text-primary shadow-sm p-1 d-flex align-items-center justify-content-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 11 11">
                                  <path d="M10.078.232a.5.5 0 0 1 .844.537l-5.5 8.641a1.5 1.5 0 0 1-2.548-.028L.072 4.759a.5.5 0 0 1 .856-.518l2.801 4.623a.5.5 0 0 0 .85.01l5.5-8.642Z"></path>
                                </svg>
                              </div>
                              <span className="fw-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="col-xxl-6">
                <div className="bg-white rounded-5 shadow-lg p-4 p-md-6 border border-primary hover-scale position-relative">
                  <div className="position-absolute top-0 end-0 mt-4 me-5">
                    <span className="badge bg-primary text-white rounded-pill px-3 py-1 fs-xs fw-bold">
                      Most Popular
                    </span>
                  </div>
                  <div className="row g-6 g-md-10 align-items-center">
                    <div className="col-md-6">
                      <div className="vstack justify-content-between gap-6 p-2 h-full">
                        <div>
                          <h4 className="mb-1 fw-bold">Pro plan</h4>
                          <p className="fs-md text-muted mb-0">For corporate & high volume</p>
                        </div>
                        <div>
                          <div className="d-flex align-items-end gap-1 mb-2">
                            <h2 className="mb-0 lh-1 fw-bolder pricing-amount text-dark">
                              {isYearly ? "$950" : "$99"}
                            </h2>
                            <p className="fs-md mb-1 text-muted pricing-period">
                              {isYearly ? "/Year" : "/Month"}
                            </p>
                          </div>
                          <div className="mb-6"></div>
                          <Link
                            className="btn btn-primary has-icon w-100 justify-content-center text-white"
                            href="/contact"
                          >
                            Get Started Now
                            <div className="icon ms-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
                                <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                                <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-primary text-white rounded-4 p-6 p-xl-8">
                        <ul className="list-unstyled mb-0 d-grid gap-4 fs-md">
                          {[
                            "Unlimited concurrency channels",
                            "Ultra-low latency (<450ms)",
                            "SOC2 & HIPAA BAA compliance",
                            "Custom LLM fine-tuning & tools",
                            "Warm human call transfer & triage",
                            "24/7 Priority support & SLA",
                          ].map((feature) => (
                            <li className="hstack align-items-center gap-3 text-white" key={feature}>
                              <div className="w-7 h-7 rounded-circle bg-white text-dark shadow-sm p-1 d-flex align-items-center justify-content-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 11 11">
                                  <path d="M10.078.232a.5.5 0 0 1 .844.537l-5.5 8.641a1.5 1.5 0 0 1-2.548-.028L.072 4.759a.5.5 0 0 1 .856-.518l2.801 4.623a.5.5 0 0 0 .85.01l5.5-8.642Z"></path>
                                </svg>
                              </div>
                              <span className="fw-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Brands Marquee */}
        <section className="pb-15 pb-md-20 pb-lg-30 position-relative">
          <div className="container text-center">
            <h6 className="mb-6 mb-xl-10 text-muted fw-semibold letter-spacing-1">
              Relied on by over 3,200 global brands.
            </h6>
          </div>
          <div className="marquee" style={{ "--speed": "24s", "--gap": "5rem" } as React.CSSProperties}>
            <div className="marquee--track">
              <div className="marquee--content">
                {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                  <div className="marque-item px-4" key={`p1-${index}`}>
                    <Image
                      alt={`${partner.name} logo`}
                      width={95}
                      height={35}
                      className="img-fluid h-8 w-auto object-fit-contain"
                      src={partner.src}
                    />
                  </div>
                ))}
              </div>
              <div className="marquee--content" aria-hidden="true">
                {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                  <div className="marque-item px-4" key={`p2-${index}`}>
                    <Image
                      alt={`${partner.name} logo`}
                      width={95}
                      height={35}
                      className="img-fluid h-8 w-auto object-fit-contain"
                      src={partner.src}
                    />
                  </div>
                ))}
              </div>
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
                    <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-primary" viewBox="0 0 20 20">
                        <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
                      </svg>
                      FAQ
                    </div>
                    <div className="mb-4"></div>
                    <h2 className="ss-text-reveal-blur mb-4">Frequently asked questions.</h2>
                    <p className="fs-md text-muted mb-4">
                      Everything you need to know about pricing, telephony routes, integrations, and enterprise deployment.
                    </p>
                    <p className="fs-lg fw-semibold text-dark mb-2">Still have a question?</p>
                    <p className="fs-md text-muted mb-6">
                      <Link className="animated-link text-primary fw-bold text-decoration-none me-1" href="/contact">
                        Contact us!
                      </Link>
                      We will be happy to assist you.
                    </p>
                    <div className="avatar-group d-flex align-items-center gap-2">
                      {["/img/content/avatar/1.webp", "/img/content/avatar/2.webp", "/img/content/avatar/3.webp"].map((img, i) => (
                        <div key={i} className="position-relative w-12 h-12 rounded-circle overflow-hidden border border-white border-2 shadow-sm">
                          <Image src={img} alt="Support team member" fill sizes="48px" className="object-fit-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div id="home-faq-accordion" className="accordion d-grid gap-4">
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
