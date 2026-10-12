import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteLayout } from "@/components/layout/SiteLayout";
import "./about.css";

export const metadata: Metadata = {
  title: "About Vozon | Practical Voice AI",
  description: "Learn why Vozon is building practical, connected voice AI for real customer operations.",
  alternates: { canonical: "/about" },
};

const principles = [
  { number: "01", title: "Natural by design", text: "We design for the pauses, interruptions, languages, and context that make every real conversation different." },
  { number: "02", title: "Action over answers", text: "A useful call should move work forward—booking, qualifying, routing, updating, or resolving a request." },
  { number: "03", title: "People stay in control", text: "Teams define knowledge, permissions, transfer rules, and the moments where human judgment matters." },
  { number: "04", title: "Clarity earns trust", text: "Call context, actions, and outcomes should be visible enough for a team to review and improve." },
] as const;

const workflow = [
  { number: "01", title: "Listen", note: "Capture intent and context" },
  { number: "02", title: "Understand", note: "Use approved knowledge" },
  { number: "03", title: "Take action", note: "Run the connected workflow" },
  { number: "04", title: "Hand off", note: "Bring in a person with context" },
] as const;

export default function AboutPage() {
  return (
    <SiteLayout>
      <main className="vozon-about-page">
        <section className="about-hero">
          <div className="about-hero-grid" aria-hidden="true" />
          <div className="about-orbit about-orbit--one" aria-hidden="true" />
          <div className="about-orbit about-orbit--two" aria-hidden="true" />
          <div className="about-shell about-hero-layout">
            <div className="about-hero-copy">
              <span className="about-kicker" data-ss-reveal><i />Built in India. Designed for every conversation.</span>
              <h1 data-ss-reveal data-delay="0.08">Voice AI that turns conversation into <em>progress.</em></h1>
              <p data-ss-reveal data-delay="0.16">Vozon is building a practical platform for teams that want every customer call to feel natural, complete useful work, and remain firmly under human control.</p>
              <div className="about-hero-actions" data-ss-reveal data-delay="0.24">
                <Link className="about-button about-button--primary" href="/contact">Talk to our team <span aria-hidden="true">↗</span></Link>
                <Link className="about-button about-button--ghost" href="/team">Meet the builders <span aria-hidden="true">→</span></Link>
              </div>
              <nav aria-label="Breadcrumb" data-ss-reveal data-delay="0.3"><Link href="/">Home</Link><i>/</i><span>About</span></nav>
            </div>

            <div className="about-hero-art ss-parallax-area" data-ss-reveal data-x="60" data-duration="0.9">
              <span className="about-art-label about-art-label--top ss-parallax-item" data-parallax-strength="16"><i />Conversation layer</span>
              <span className="about-art-label about-art-label--bottom ss-parallax-item" data-parallax-strength="-12"><i />Connected action</span>
              <div className="about-art-halo" aria-hidden="true" />
              <Image
                className="about-product-visual ss-parallax-item"
                data-parallax-strength="8"
                src="/images/ui-voice-operations.png"
                alt="Vozon voice operations interface showing call routing, live audio, and outcomes"
                width={1280}
                height={1280}
                priority
                sizes="(max-width: 900px) 90vw, 42vw"
              />
              <div className="about-signal" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            </div>
          </div>
        </section>

        <section className="about-motion-ribbon" aria-label="Vozon principles"><div>{["Natural conversation", "Connected action", "Human control", "Visible outcomes", "Natural conversation", "Connected action", "Human control", "Visible outcomes"].map((item, index) => <span aria-hidden={index > 3 || undefined} key={`${item}-${index}`}><i />{item}</span>)}</div></section>

        <section className="about-story">
          <div className="about-shell about-story-grid">
            <div data-ss-reveal>
              <span className="about-label">Our story · Since 2024</span>
              <h2>We started with one stubborn question.</h2>
            </div>
            <div className="about-story-copy" data-ss-reveal data-delay="0.12">
              <p className="about-story-lead">Why do so many automated calls still feel like a dead end?</p>
              <p>Vozon began with the belief that businesses do not need another scripted bot. They need voice agents that can listen naturally, understand the purpose of a call, and move a customer request toward a useful result.</p>
              <p>So we brought agent instructions, approved knowledge, phone workflows, integrations, call activity, and human handoffs into one operating environment. Teams can begin with one focused journey, learn from real calls, and expand with confidence.</p>
              <div className="about-story-signature"><span>2024</span><p>The year we began building Vozon</p></div>
            </div>
          </div>
        </section>

        <section className="about-purpose">
          <div className="about-shell">
            <div className="about-purpose-heading" data-ss-reveal>
              <span className="about-label">What moves us</span>
              <h2>A clear mission. A human vision.</h2>
            </div>
            <div className="about-purpose-grid" data-ss-reveal-group data-stagger="0.14">
              <article className="about-purpose-card about-purpose-card--mission">
                <div><span>01 · Our mission</span><h3>Make intelligent voice operations accessible to every ambitious team.</h3><p>We turn powerful voice technology into a clear working system—one teams can configure, connect, supervise, and improve without losing sight of the customer.</p></div>
                <div className="about-purpose-visual">
                  <Image src="/images/about-mission-person.png" alt="A Vozon team member representing the company mission" fill sizes="(max-width: 700px) 100vw, 42vw" />
                </div>
              </article>
              <article className="about-purpose-card about-purpose-card--vision">
                <div><span>02 · Our vision</span><h3>Give every business the ability to be present in every conversation.</h3><p>We see voice AI supporting people—not distancing them—by handling repetitive calls well and making important human moments easier to reach.</p></div>
                <div className="about-purpose-visual">
                  <Image src="/images/about-vision-person.png" alt="A Vozon team member representing the company vision" fill sizes="(max-width: 700px) 100vw, 42vw" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="about-platform">
          <div className="about-platform-glow" aria-hidden="true" />
          <div className="about-shell about-platform-grid">
            <div className="about-platform-intro" data-ss-reveal>
              <span className="about-label">The Vozon platform</span>
              <h2>One place to design, run, and understand customer calls.</h2>
              <p>Vozon connects the conversation layer with the tools and operating rules behind it, so a call can lead to a real next step instead of ending as an isolated transcript.</p>
              <Link href="/product">Explore the platform <span aria-hidden="true">→</span></Link>
            </div>
            <div className="about-platform-list" data-ss-reveal-group data-stagger="0.1">
              <article><span>01</span><div><h3>Build the agent</h3><p>Define its role, voice, knowledge, required details, and the moments where a person should take over.</p></div><b aria-hidden="true">↗</b></article>
              <article><span>02</span><div><h3>Connect the workflow</h3><p>Link telephony, calendars, business systems, knowledge, and approved actions to the conversation.</p></div><b aria-hidden="true">↗</b></article>
              <article><span>03</span><div><h3>Handle real calls</h3><p>Support inbound and outbound conversations while keeping context, outcomes, and handoffs connected.</p></div><b aria-hidden="true">↗</b></article>
              <article><span>04</span><div><h3>Review and improve</h3><p>Use call records and operational outcomes to understand what works and where the workflow needs attention.</p></div><b aria-hidden="true">↗</b></article>
            </div>
          </div>
        </section>

        <section className="about-workflow">
          <div className="about-shell">
            <div className="about-section-heading" data-ss-reveal>
              <span className="about-label">How it fits together</span>
              <h2>One conversation, connected from start to finish.</h2>
              <p>A voice agent is most useful when every stage shares context and every outcome is visible.</p>
            </div>
            <div className="about-workflow-board" aria-label="Vozon conversation workflow" data-ss-reveal data-duration="0.8">
              <header><span><i />Live voice workflow</span><b>Configured in Vozon</b></header>
              <div className="about-workflow-steps">
                {workflow.map((step, index) => (
                  <div key={step.title}>
                    <span>{step.number}</span><strong>{step.title}</strong><small>{step.note}</small>
                    {index < workflow.length - 1 ? <i aria-hidden="true">→</i> : null}
                  </div>
                ))}
              </div>
              <footer><span>Approved knowledge</span><span>Connected tools</span><span>Reviewable outcomes</span></footer>
            </div>
          </div>
        </section>

        <section className="about-principles">
          <div className="about-shell">
            <div className="about-section-heading" data-ss-reveal>
              <span className="about-label">Our principles</span>
              <h2>The standard behind what we build.</h2>
            </div>
            <div className="about-principle-grid" data-ss-reveal-group data-stagger="0.1">
              {principles.map((item) => (
                <article key={item.title}>
                  <span>{item.number}</span>
                  <div className="about-principle-icon" aria-hidden="true"><i /><i /><i /></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-team-link">
          <div className="about-team-noise" aria-hidden="true" />
          <div className="about-shell" data-ss-reveal>
            <div><span>Meet the people behind the platform</span><h2>Built by a team that cares about every side of the call.</h2></div>
            <Link href="/team">Meet the team <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
