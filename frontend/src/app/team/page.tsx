import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteLayout } from "@/components/layout/SiteLayout";
import "./team.css";

export const metadata: Metadata = {
  title: "Team | Vozon AI Voice Platform",
  description: "Meet the disciplines and working principles behind practical voice AI at Vozon.",
  alternates: { canonical: "/team" },
};

const disciplines = [
  { number: "01", title: "Product systems", text: "Turn complex voice AI capabilities into clear controls and workflows teams can operate.", tag: "Make it clear" },
  { number: "02", title: "Conversation experience", text: "Design prompts, turn-taking, language behavior, and handoffs around the caller's real needs.", tag: "Make it natural" },
  { number: "03", title: "Platform reliability", text: "Connect telephony, models, knowledge, tools, and operational visibility into one dependable system.", tag: "Make it resilient" },
  { number: "04", title: "Customer operations", text: "Keep every deployment focused on useful outcomes, accountable actions, and a clear path to people.", tag: "Make it useful" },
] as const;

const operatingPrinciples = [
  { number: "01", title: "Start with the call", text: "We begin with the customer, the situation, and the outcome—not with a feature list." },
  { number: "02", title: "Build across boundaries", text: "Product, conversation, engineering, and operations solve the same workflow together." },
  { number: "03", title: "Test the difficult moments", text: "Interruptions, uncertainty, transfers, and failures deserve as much care as the happy path." },
  { number: "04", title: "Learn from the evidence", text: "Real call context and outcomes guide what we improve next." },
] as const;

export default function TeamPage() {
  return (
    <SiteLayout>
      <main className="vozon-team-page">
        <section className="vozon-team-hero">
          <div className="vozon-team-gridlines" aria-hidden="true" />
          <div className="vozon-team-orbit" aria-hidden="true" />
          <div className="vozon-team-shell vozon-team-hero-layout">
            <div className="vozon-team-hero-copy">
              <span className="vozon-team-kicker" data-ss-reveal><i />People behind the platform</span>
              <h1 data-ss-reveal data-delay="0.08">Small team.<br /><em>Serious ambition.</em></h1>
              <p data-ss-reveal data-delay="0.16">We bring product thinking, conversation design, platform engineering, and customer operations together to make voice AI genuinely useful in the real world.</p>
              <div className="vozon-team-hero-actions" data-ss-reveal data-delay="0.24">
                <Link href="#disciplines">See how we build <span aria-hidden="true">↓</span></Link>
                <Link href="/career">Explore careers <span aria-hidden="true">↗</span></Link>
              </div>
              <nav aria-label="Breadcrumb" data-ss-reveal data-delay="0.3"><Link href="/">Home</Link><i>/</i><span>Team</span></nav>
            </div>

            <div className="vozon-team-hero-portrait ss-parallax-area" data-ss-reveal data-x="60" data-duration="0.9">
              <span className="vozon-team-photo-label vozon-team-photo-label--top ss-parallax-item" data-parallax-strength="15"><i />One shared mission</span>
              <span className="vozon-team-photo-label vozon-team-photo-label--bottom ss-parallax-item" data-parallax-strength="-10">Building since 2024</span>
              <div className="vozon-team-photo-frame">
                <Image
                  className="ss-parallax-item"
                  data-parallax-strength="7"
                  src="/service-images/team-workflow.jpg"
                  alt="A product and engineering team collaborating around a shared workflow"
                  width={1600}
                  height={1067}
                  priority
                  sizes="(max-width: 900px) 90vw, 42vw"
                />
              </div>
              <div className="vozon-team-signal" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
            </div>
          </div>
        </section>

        <section className="vozon-team-ribbon" aria-label="How the Vozon team builds"><div>{["Product systems", "Conversation experience", "Platform reliability", "Customer operations", "Product systems", "Conversation experience", "Platform reliability", "Customer operations"].map((item, index) => <span aria-hidden={index > 3 || undefined} key={`${item}-${index}`}><i />{item}</span>)}</div></section>

        <section className="vozon-team-disciplines" id="disciplines">
          <div className="vozon-team-shell">
            <div className="vozon-team-section-heading" data-ss-reveal>
              <span>One team, many disciplines</span>
              <h2>Every perspective belongs in the same conversation.</h2>
              <p>Building a good voice agent is not only an AI problem. It is a product, infrastructure, language, workflow, and customer experience problem—all at once.</p>
            </div>
            <div className="vozon-team-discipline-grid" aria-label="Disciplines behind Vozon" data-ss-reveal-group data-stagger="0.1">
              {disciplines.map((item) => (
                <article key={item.title}>
                  <header><span>{item.number}</span><i aria-hidden="true"><b /><b /><b /></i></header>
                  <div><small>{item.tag}</small><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vozon-team-method">
          <div className="vozon-team-method-orbit" aria-hidden="true" />
          <div className="vozon-team-shell vozon-team-method-layout">
            <div className="vozon-team-method-intro" data-ss-reveal>
              <span>How we work</span>
              <h2>Close to the problem. Closer as a team.</h2>
              <p>Our best work happens when the people shaping the experience can hear the call, understand the workflow, and solve the whole problem together.</p>
              <Link href="/about">Why we are building Vozon <span aria-hidden="true">→</span></Link>
            </div>
            <div className="vozon-team-method-list" data-ss-reveal-group data-stagger="0.1">
              {operatingPrinciples.map((item) => (
                <article key={item.title}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="vozon-team-belief">
          <div className="vozon-team-shell">
            <span data-ss-reveal>What we believe</span>
            <blockquote data-ss-reveal data-delay="0.08">“The best voice AI should make a business feel more present—not less human.”</blockquote>
            <div className="vozon-team-belief-meta" data-ss-reveal data-delay="0.16"><i /><p>A product principle shared across Vozon</p><b>VOZON / 2024—NOW</b></div>
          </div>
        </section>

        <section className="vozon-team-join">
          <div className="vozon-team-shell vozon-team-join-card" data-ss-reveal>
            <div>
              <span>Build with us</span>
              <h2>Bring your perspective to the next generation of voice operations.</h2>
              <p>We are interested in people who are curious about difficult problems, care about the details, and want technology to create a more useful customer experience.</p>
            </div>
            <div className="vozon-team-join-actions">
              <Link href="/career">Explore careers <span aria-hidden="true">↗</span></Link>
              <Link href="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
