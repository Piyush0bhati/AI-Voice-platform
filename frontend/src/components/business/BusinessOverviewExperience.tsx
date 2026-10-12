"use client";

import Link from "next/link";
import { useState } from "react";

import { SectionLandingHero } from "@/components/layout/SectionLandingHero";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { businessPages } from "@/config/site";
import "@/components/business/BusinessOverviewExperience.css";

const colors = ["orange", "violet", "green", "pink", "yellow", "blue"] as const;

const faqs = [
  [
    "How does Vozon adapt to a specific industry?",
    "Each solution combines the industry’s common call reasons, approved information, required fields, connected actions, and human escalation rules.",
  ],
  [
    "Can one agent support several workflows?",
    "Yes. One agent can route between related workflows, or you can use separate agents when teams need different knowledge, permissions, or quality controls.",
  ],
  [
    "What happens when a caller needs a person?",
    "The agent transfers according to your rules and includes the context already collected, so the caller does not need to repeat the conversation.",
  ],
  [
    "How do we choose the first solution to launch?",
    "Start with a high-volume call type that has a clear outcome, reliable source information, and a well-defined human fallback.",
  ],
] as const;

function SolutionIcon({ index }: { index: number }) {
  const paths = [
    <><path d="M7 11V8a5 5 0 0 1 10 0v3" /><path d="M5 11h3v6H6a1 1 0 0 1-1-1v-5Zm14 0h-3v6h2a1 1 0 0 0 1-1v-5ZM9 20h6" /></>,
    <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><circle cx="12" cy="12" r="5" /></>,
    <><path d="M5 4h14v13H8l-3 3V4Z" /><path d="M8 8h8M8 12h5" /></>,
    <><path d="M4 19V8l8-4 8 4v11H4Z" /><path d="M9 19v-5h6v5" /></>,
    <><path d="M5 18h14M7 18V9h10v9M9 9V5h6v4" /><path d="M10 12h4" /></>,
    <><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-5 3.5-7 8-7s7.2 2 8 7" /></>,
  ];

  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[index % paths.length]}</svg>;
}

function solutionHref(page: (typeof businessPages)[number]) {
  return page.kicker === "Industries" ? `/business/industries/${page.slug}` : `/business/${page.slug}`;
}

export function BusinessOverviewExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <SiteLayout>
      <main className="solutions-reference-page" id="business-overview-page">
        <SectionLandingHero
          current="Solutions"
          eyebrow="Solutions for business"
          summary="Voice AI solutions shaped around the calls, actions, and handoffs that matter in each industry and customer workflow."
          title="Solutions"
        />

        <section className="solutions-directory">
          <div className="solutions-shell">
            <header className="solutions-directory-heading" data-ss-reveal-group="" data-y="34">
              <div>
                <span className="solutions-label">Find your starting point</span>
                <h2>Industry and workflow solutions.</h2>
              </div>
              <p>Start with the calls your team handles most. Each solution combines natural conversations, connected actions, and clear human handoffs.</p>
            </header>

            <div className="solutions-grid" data-ss-reveal-group="" data-y="24">
              {businessPages.map((page, index) => (
                <Link className="solutions-card" href={solutionHref(page)} key={page.slug}>
                  <span className={`solutions-icon solutions-icon--${colors[index % colors.length]}`}>
                    <SolutionIcon index={index} />
                  </span>
                  <span className="solutions-card-kicker">{page.kicker}</span>
                  <h3>{page.title}</h3>
                  <p>{page.summary}</p>
                  <span className="solutions-card-points">
                    {page.highlights.slice(0, 2).map((point) => <i key={point}>{point}</i>)}
                  </span>
                  <strong>Explore solution <b aria-hidden="true">↗</b></strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="solutions-explainer">
          <div className="solutions-shell solutions-explainer-grid">
            <div className="solutions-flow-visual" aria-label="A Vozon voice agent connecting a caller request to a business action">
              <span className="solutions-flow-orbit solutions-flow-orbit--one" />
              <span className="solutions-flow-orbit solutions-flow-orbit--two" />
              <article className="solutions-flow-card solutions-flow-card--caller">
                <span>Caller intent</span>
                <strong>Appointment request</strong>
                <small>Understood in 1.2 sec</small>
              </article>
              <article className="solutions-flow-card solutions-flow-card--action">
                <span>Connected action</span>
                <strong>Availability checked</strong>
                <small>Calendar is ready</small>
              </article>
              <article className="solutions-flow-card solutions-flow-card--outcome">
                <span>Outcome</span>
                <strong>Booking confirmed</strong>
                <small>Summary sent to staff</small>
              </article>
              <span className="solutions-flow-core">V<i /></span>
            </div>

            <div className="solutions-explainer-copy" data-ss-reveal-group="" data-y="30">
              <span className="solutions-label">Get to know Vozon solutions</span>
              <h2>Built around the work, not a generic call script.</h2>
              <p className="solutions-explainer-intro">Every solution is designed around a real call journey: what the caller needs, which information is safe to provide, which system must be updated, and when a teammate should step in.</p>
              <div className="solutions-accordion">
                {faqs.map(([question, answer], index) => {
                  const isOpen = openFaq === index;
                  return (
                    <article className={isOpen ? "is-open" : ""} key={question}>
                      <button aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : index)} type="button">
                        <span>{question}</span><i>{isOpen ? "−" : "+"}</i>
                      </button>
                      <div><p>{answer}</p></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="solutions-steps">
          <div className="solutions-shell">
            <header className="solutions-steps-heading" data-ss-reveal-group="" data-y="30">
              <span className="solutions-label">Steps to launch</span>
              <h2>Three clear steps to a useful voice workflow.</h2>
              <p>Launch a focused use case first, prove the workflow, and expand with evidence from real conversations.</p>
            </header>

            <div className="solutions-steps-grid">
              <div className="solutions-step-list" data-ss-reveal-group="" data-y="24">
                <article className="is-active"><b>01</b><div><h3>Choose the workflow.</h3><p>Pick one repeatable call type with a clear business outcome and a known human fallback.</p></div></article>
                <article><b>02</b><div><h3>Connect the right context.</h3><p>Add approved knowledge, business tools, required fields, and escalation rules.</p></div></article>
                <article><b>03</b><div><h3>Test, deploy, improve.</h3><p>Review real calls, measure completion and handoff quality, then expand with confidence.</p></div></article>
              </div>

              <div className="solutions-readiness" data-ss-reveal="" data-y="30">
                <span className="solutions-readiness-glow" />
                <div className="solutions-readiness-panel">
                  <header><span>Solution readiness</span><strong>Healthcare appointment desk</strong></header>
                  <ul>
                    <li><i>✓</i><span><b>Knowledge</b><small>Approved</small></span></li>
                    <li><i>✓</i><span><b>Calendar</b><small>Connected</small></span></li>
                    <li><i>✓</i><span><b>Human handoff</b><small>Tested</small></span></li>
                    <li><i>✓</i><span><b>Call review</b><small>Enabled</small></span></li>
                  </ul>
                  <footer><span><b>4/4</b> launch checks complete</span><i>Ready to deploy</i></footer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
