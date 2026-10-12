import Link from "next/link";
import type { ReactNode } from "react";

import { SolutionSoftwareVisual } from "@/components/layout/SolutionSoftwareVisual";
import { SolutionWorkflowCarousel } from "@/components/layout/SolutionWorkflowCarousel";
import { SiteLayout } from "@/components/layout/SiteLayout";
import "@/components/layout/ProductFamily.css";
import "@/components/layout/SolutionFamily.css";
import "@/components/layout/SolutionSoftwareVisual.css";

export type SolutionStoryCard = {
  eyebrow?: string;
  title: string;
  body: string;
  outcome?: string;
  points?: readonly string[];
};

export type SolutionStoryFaq = { question: string; answer: string };

export type SolutionStoryContent = {
  id: string;
  category: string;
  title: string;
  summary: string;
  highlights: readonly string[];
  scenarios: readonly SolutionStoryCard[];
  capabilities: readonly SolutionStoryCard[];
  workflow: readonly { title: string; body: string }[];
  integrations: readonly string[];
  faqs: readonly SolutionStoryFaq[];
  proof: readonly { value: string; label: string }[];
  benefits?: readonly { title: string; body: string }[];
  quotes?: readonly { quote: string; name: string; role: string }[];
  visualKey?: string;
  kindLabel?: string;
};

type SolutionVisualPreset = {
  tone: string;
  activeLabel: string;
  callerLine: string;
  agentLine: string;
  actionLine: string;
};

const defaultPreset: SolutionVisualPreset = {
  tone: "service", activeLabel: "Customer call active",
  callerLine: "I need help with my request and would like to know the next step.", agentLine: "I can collect the necessary details and complete the approved action.", actionLine: "Intent captured / workflow selected",
};

const visualPresets: Record<string, SolutionVisualPreset> = {
  healthcare: { tone: "clinical", activeLabel: "Patient access call active", callerLine: "I need to move my follow-up visit to Thursday afternoon.", agentLine: "I found two available times. Would 2:30 PM or 4:15 PM work better?", actionLine: "Patient verified / calendar availability retrieved" },
  "financial-services": { tone: "finance", activeLabel: "Client service call active", callerLine: "I would like to schedule a consultation about my account options.", agentLine: "I can collect your preferences and connect you with the appropriate advisor.", actionLine: "Verification complete / advisor route prepared" },
  insurance: { tone: "finance", activeLabel: "Claims intake active", callerLine: "I need to report damage and understand which details you need.", agentLine: "I will document the incident in order and prepare the claim for your team.", actionLine: "Claim fields validated / specialist review queued" },
  logistics: { tone: "operations", activeLabel: "Dispatch call active", callerLine: "The delivery is delayed and the customer needs a new arrival time.", agentLine: "I found the active route and I am notifying dispatch with the exception details.", actionLine: "Shipment located / dispatch alert sent" },
  "home-services": { tone: "service", activeLabel: "Service request active", callerLine: "Our water heater stopped working and we need someone today.", agentLine: "I will confirm your location, check urgency, and find the first available technician.", actionLine: "Service area confirmed / urgent slot found" },
  "retail-consumer": { tone: "commerce", activeLabel: "Shopper support active", callerLine: "My order says delivered, but the package is not here.", agentLine: "I will check the delivery record and open the correct exception workflow.", actionLine: "Order retrieved / delivery exception opened" },
  "travel-hospitality": { tone: "travel", activeLabel: "Guest request active", callerLine: "Can I change my arrival time and request airport pickup?", agentLine: "I will update your reservation and check the available transfer times.", actionLine: "Reservation found / guest request updated" },
  "debt-collection": { tone: "finance", activeLabel: "Account follow-up active", callerLine: "I received a reminder and want to discuss the available next steps.", agentLine: "I can confirm the account and explain the approved options before routing exceptions.", actionLine: "Identity confirmed / approved workflow opened" },
  "lead-qualification": { tone: "revenue", activeLabel: "Lead conversation active", callerLine: "We need a voice support solution before our next quarter.", agentLine: "How many calls does your team handle, and which workflow should we improve first?", actionLine: "Intent and implementation timeline captured" },
  "customer-support": { tone: "support", activeLabel: "Support conversation active", callerLine: "I tried the usual steps but the issue is still happening.", agentLine: "I can review the approved troubleshooting path and prepare a complete escalation if needed.", actionLine: "Issue classified / support context retrieved" },
  receptionists: { tone: "service", activeLabel: "Front desk call active", callerLine: "I would like to book a consultation and check whether you serve my area.", agentLine: "I will check your location and then show the available consultation times.", actionLine: "Service area confirmed / calendar checked" },
  "dispatch-service": { tone: "operations", activeLabel: "Dispatch request active", callerLine: "We have an urgent job and need the nearest available team.", agentLine: "I am collecting the location and job details before alerting dispatch.", actionLine: "Urgency detected / field team notified" },
};

function getSlug(id: string) {
  return id.replace(/^use-case-/, "").replace(/^industry-/, "").replace(/^business-/, "");
}

export function SolutionStoryPage({ content, children }: { content: SolutionStoryContent; children?: ReactNode }) {
  const slug = content.visualKey ?? getSlug(content.id);
  const preset = visualPresets[slug] ?? defaultPreset;
  const useCases = [...content.scenarios, ...content.capabilities].slice(0, 3);
  const benefits = content.benefits?.slice(0, 3) ?? useCases.map((card) => ({ title: card.title, body: card.body }));
  const railItems = useCases.slice(0, 3).map((item, index) => ({
    title: item.title,
    body: item.body || content.workflow[index]?.body || content.summary,
  }));

  return (
    <SiteLayout>
      <main className={`vozon-product-page solution-story-page solution-tone-${preset.tone}`} id={content.id}>
        <section className="solution-reference-hero">
          <div className="solution-hero-grid-pattern" aria-hidden="true" />
          <div className="solution-hero-mark" aria-hidden="true" />
          <div className="pf-shell solution-reference-hero-copy">
            <span><i>+</i>{content.category}</span>
            <h1>{content.title}</h1>
            <p>{content.summary}</p>
            <nav aria-label="Breadcrumb"><Link href="/">Home</Link><i>/</i><b>{content.title}</b></nav>
          </div>
        </section>
        <section className="solution-visual-showcase">
          <div className="pf-shell"><SolutionWorkflowCarousel items={railItems} kindLabel={content.kindLabel} slug={slug} /></div>
        </section>

        {children}

        <section className="solution-reference-proof">
          <div className="pf-shell solution-reference-proof-grid">
            <div className="solution-proof-copy">
              <span>Workflow outcomes</span><h2>What a well-designed conversation can improve.</h2>
              <div>{benefits.map((benefit) => <article key={benefit.title}><i>✓</i><div><h3>{benefit.title}</h3><p>{benefit.body}</p></div></article>)}</div>
            </div>
            <div className="solution-quote-track">
              {benefits.slice(0, 2).map((benefit, index) => <article className={index === 0 ? "is-primary" : ""} key={benefit.title}><span>0{index + 1}</span><p>{benefit.body}</p><footer><b>{benefit.title}</b><small>Workflow principle</small></footer><i aria-hidden="true" /></article>)}
            </div>
          </div>
        </section>

        <section className="solution-reference-how" id="workflows">
          <div className="pf-shell">
            <span className="solution-reference-label">How it works</span>
            <h2>Build {content.title.toLowerCase()} operations around AI-powered phone agents.</h2>
            <div className="solution-usecase-list">
              {useCases.map((card, index) => {
                const supporting = content.workflow[index];
                const points = card.points?.slice(0, 3) ?? [card.outcome ?? content.highlights[index % content.highlights.length], supporting?.title ?? "Connected workflow"];
                return (
                  <article className={index % 2 ? "is-reverse" : ""} key={card.title}>
                    <div className="solution-usecase-visual"><SolutionSoftwareVisual label={card.title} slug={slug} stage={index} /></div>
                    <div className="solution-usecase-copy">
                      <span>{card.eyebrow ?? `Workflow 0${index + 1}`}</span><h3>{card.title}</h3><p>{card.body}</p>
                      <ul>{points.map((point) => <li key={point}><i>✓</i><b>{point}</b></li>)}</ul>
                      {supporting ? <aside><small>Deployment step</small><strong>{supporting.title}</strong><p>{supporting.body}</p></aside> : null}
                      <Link href="/contact">Design this workflow</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="solution-conversation-band">
          <div className="pf-shell">
            <div className="solution-conversation-copy"><span>Live conversation</span><h2>{preset.activeLabel}</h2><p>The caller, AI response, business action, and human handoff remain part of one continuous operating record.</p></div>
            <div className="solution-conversation-card">
              <header><span><i />Live / 00:48</span><b>{preset.actionLine}</b></header>
              <p><b>Caller</b>{preset.callerLine}</p><p><b>Vozon agent</b>{preset.agentLine}</p>
              <div aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <i key={index} />)}</div>
            </div>
          </div>
        </section>

        <section className="pf-trust-band solution-trust-band">
          <div className="pf-shell">
            <div><span>Built for live operations, not scripted demos</span><h2>Voice automation your team can run with confidence.</h2><p>Define approved knowledge, connected actions, required fields, review rules, and exactly when a person takes over.</p></div>
            <aside><strong>Human judgment stays available</strong><p>Sensitive, urgent, complex, or low-confidence conversations can move to the right person with full context attached.</p><Link href="/contact">Talk to a solutions engineer</Link></aside>
          </div>
        </section>

        <section className="solution-integrations-reference">
          <div className="pf-shell"><span className="solution-reference-label">Integrations</span><h2>Connect with the systems your {content.title.toLowerCase()} team already uses.</h2><p>Send structured fields, summaries, outcomes, and follow-up actions into the tools that run your operation.</p></div>
          <div className="solution-integration-marquee"><div>{[...content.integrations, ...content.integrations].map((integration, index) => <span key={`${integration}-${index}`}><i>{integration.slice(0, 2)}</i><b>{integration}</b></span>)}</div></div>
          <div className="pf-shell"><aside className="solution-partner-card"><div><span>Need implementation support?</span><h3>Design the workflow with a Vozon solutions engineer.</h3></div><Link href="/contact">Plan your deployment</Link></aside></div>
        </section>

        <section className="solution-pricing-reference">
          <div className="pf-shell">
            <span className="solution-reference-label">Pricing</span><h2>Start with one workflow. Scale when the evidence is clear.</h2><p>Choose usage-based access for focused deployments or a managed enterprise plan for larger operational programs.</p>
            <div className="solution-pricing-grid">
              <article><span>Usage based</span><h3>Launch a focused workflow</h3><p>Begin with the calls, tools, and evaluation criteria that matter most.</p><ul><li>Pay for active usage</li><li>Test with real call scenarios</li><li>Connect approved knowledge and actions</li></ul><Link href="/pricing">View pricing</Link></article>
              <article><span>Enterprise</span><h3>Operate at higher volume</h3><p>For teams that need implementation support, governance, scale, or custom workflow requirements.</p><ul><li>Solution engineering support</li><li>Custom operational requirements</li><li>Deployment and review planning</li></ul><Link href="/contact">Talk to Sales</Link></article>
            </div>
          </div>
        </section>

        <section className="pf-faq solution-reference-faq">
          <div className="pf-shell">
            <div><span>Frequently asked questions</span><h2>Questions and answers.</h2><p>Plan the conversation, integration, escalation, and review process before moving into production.</p></div>
            <div>{content.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<i>+</i></summary><p>{faq.answer}</p></details>)}</div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
