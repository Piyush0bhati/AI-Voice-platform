import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { SectionLandingHero } from "@/components/layout/SectionLandingHero";
import { SiteLayout } from "@/components/layout/SiteLayout";
import "@/components/layout/RubozInnerPage.css";

export type RubozCard = {
  eyebrow?: string;
  title: string;
  body: string;
  detail?: string;
  points?: readonly string[];
  href?: string;
};

export type RubozFaq = { question: string; answer: string };

export type RubozPageProps = {
  id?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  summary: string;
  heroImage?: string;
  heroAlt?: string;
  proof?: readonly { value: string; label: string }[];
  highlights?: readonly string[];
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionSummary?: string;
  cards: readonly RubozCard[];
  workflow?: readonly RubozCard[];
  faqs?: readonly RubozFaq[];
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
  landingHero?: boolean;
  landingTitle?: string;
  landingSummary?: string;
  children?: ReactNode;
};

type PageKind = "pricing" | "integrations" | "partners" | "career" | "reviews" | "industry" | "editorial" | "voice";

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 18 18"><path d="M3 9h12m-4-4 4 4-4 4" /></svg>;
}

function pageKind(id = ""): PageKind {
  if (id.includes("pricing")) return "pricing";
  if (id.includes("integration")) return "integrations";
  if (id.includes("partner")) return "partners";
  if (id.includes("career")) return "career";
  if (id.includes("review") || id.includes("testimonial")) return "reviews";
  if (id.includes("industry")) return "industry";
  if (id.includes("blog") || id.includes("resource") || id.includes("compare")) return "editorial";
  return "voice";
}

function HeroVisual({ kind, heroAlt, cards, highlights, eyebrow }: { kind: PageKind; heroImage?: string; heroAlt?: string; cards: readonly RubozCard[]; highlights: readonly string[]; eyebrow: string }) {
  if (kind === "industry") {
    return (
      <div className="ri-industry-console" aria-label={heroAlt ?? `${eyebrow} voice workflow`}>
        <header><span><i />{eyebrow}</span><em>Live workflow</em></header>
        <div className="ri-industry-call"><div><small>Incoming conversation</small><strong>Understand the caller and complete the right next step.</strong></div><span><i /><i /><i /><i /><i /><i /><i /></span></div>
        <div className="ri-industry-journey">
          {(highlights.length ? highlights : cards.map((card) => card.title)).slice(0, 3).map((item, index) => <article key={item}><i>0{index + 1}</i><div><strong>{item}</strong><span>{index === 0 ? "Collect approved context" : index === 1 ? "Complete the connected action" : "Transfer with a clear summary"}</span></div><em>{index === 2 ? "Handoff ready" : "Automated"}</em></article>)}
        </div>
        <footer><span><i />Caller understood</span><span><i />Action recorded</span><span><i />Team stays informed</span></footer>
      </div>
    );
  }

  if (kind === "career") {
    return (
      <div className="ri-career-visual" aria-label="People building Vozon">
        <div className="ri-career-photo ri-career-photo-one"><Image src="/images/about-mission-person.png" alt="Vozon team member" fill sizes="300px" /></div>
        <div className="ri-career-photo ri-career-photo-two"><Image src="/images/about-vision-person.png" alt="Vozon team member" fill sizes="300px" /></div>
        <span>Curiosity</span><span>Ownership</span><span>Craft</span>
      </div>
    );
  }

  if (kind === "reviews") {
    return (
      <div className="ri-review-visual">
        {cards.slice(0, 3).map((card, index) => (
          <article key={card.title} style={{ "--review-index": index } as CSSProperties}>
            <b>“</b><p>{card.body.replace(/[“”"]/g, "")}</p><div><i>{card.title.charAt(0)}</i><span><strong>{card.title}</strong><small>{card.eyebrow}</small></span></div>
          </article>
        ))}
      </div>
    );
  }

  if (kind === "partners") {
    return (
      <div className="ri-partner-console">
        <header><span><i />Partner console</span><em>Live</em></header>
        <div className="ri-partner-metric"><small>Active workspaces</small><strong>48</strong><span>+12 this month</span></div>
        <div className="ri-partner-tenants">
          <p><i>NO</i><span><b>Northline</b><small>Growth plan</small></span><em>Live</em></p>
          <p><i>HA</i><span><b>Harbor AI</b><small>Scale plan</small></span><em>Live</em></p>
          <p><i>AU</i><span><b>Audion</b><small>Custom plan</small></span><em>Setup</em></p>
        </div>
        <footer><span>Your brand</span><span>Your plans</span><span>Your customers</span></footer>
      </div>
    );
  }

  const src = kind === "pricing" ? "/images/ui-pricing-usage.png" : kind === "integrations" ? "/images/ui-integration-hub.png" : "/images/ui-voice-operations.png";
  return <div className={`ri-generated-visual ri-generated-${kind}`}><Image src={src} alt={heroAlt ?? `${kind} interface`} fill priority sizes="(max-width: 900px) 92vw, 48vw" /></div>;
}

function FeatureArt({ kind, index }: { kind: PageKind; index: number }) {
  if (kind === "pricing") return <div className="ri-feature-art ri-price-art"><span>Usage</span><b>{[32, 54, 43, 72, 64].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</b></div>;
  if (kind === "integrations") return <div className="ri-feature-art ri-node-art"><i /><i /><b>V</b><i /><i /></div>;
  if (kind === "career") return <div className="ri-feature-art ri-role-art"><span>0{index + 1}</span><b>Open role</b><i>↗</i></div>;
  if (kind === "reviews") return <div className="ri-feature-art ri-stars-art"><span>★★★★★</span></div>;
  if (kind === "partners") return <div className="ri-feature-art ri-brand-art"><i>V</i><span>Workspace</span><b>Active</b></div>;
  return <div className="ri-feature-art ri-wave-art">{Array.from({ length: 11 }, (_, i) => <i key={i} />)}</div>;
}

export function RubozInnerPage({
  id, eyebrow, title, accent, summary, heroImage, heroAlt, proof = [], highlights = [],
  sectionEyebrow = "Built for production",
  sectionTitle = "Everything your team needs to move from conversation to outcome.",
  sectionSummary = "Start with a focused workflow, connect the systems behind it, and improve performance from real conversations.",
  cards, workflow = [], faqs = [],
  primaryAction = { href: "/dashboard", label: "Start building" },
  secondaryAction = { href: "/contact", label: "Talk to our team" },
  landingTitle, landingSummary, children,
}: RubozPageProps) {
  const kind = heroImage ? "industry" : pageKind(id);
  const motionItems = (highlights.length ? highlights : cards.map((card) => card.title)).slice(0, 4);
  const usesCompanyHero = id === "company-page" || id === "career-page" || id === "partners-page";

  return (
    <SiteLayout>
      <main className={`ruboz-inner-page ri-kind-${kind}`} id={id}>
        {usesCompanyHero ? <section className="ruboz-inner-hero">
          <div className="ri-grid-backdrop" aria-hidden="true" />
          <div className="ruboz-inner-shell ruboz-inner-hero-grid">
            <div className="ruboz-inner-copy">
              <div className="ruboz-inner-kicker" data-ss-reveal><span />{eyebrow}</div>
              <h1 data-ss-reveal data-delay="0.08"><span>{title}</span>{accent ? <mark>{accent}</mark> : null}</h1>
              <p data-ss-reveal data-delay="0.16">{summary}</p>
              <div className="ruboz-inner-actions" data-ss-reveal data-delay="0.24"><Link href={primaryAction.href}>{primaryAction.label}<Arrow /></Link><Link href={secondaryAction.href}>{secondaryAction.label}<Arrow /></Link></div>
              {highlights.length ? <div className="ruboz-inner-highlights" data-ss-reveal data-delay="0.3">{highlights.slice(0, 3).map((item) => <span key={item}><i>✓</i>{item}</span>)}</div> : null}
            </div>
            <div className="ruboz-inner-hero-media ss-parallax-area" data-ss-reveal data-x="56" data-duration="0.9"><HeroVisual kind={kind} heroImage={heroImage} heroAlt={heroAlt} cards={cards} highlights={highlights} eyebrow={eyebrow} /></div>
          </div>
        </section> : <SectionLandingHero
          eyebrow={eyebrow}
          title={landingTitle ?? [title, accent].filter(Boolean).join(" ")}
          current={landingTitle ?? title}
          summary={landingSummary ?? summary}
        />}

        {proof.length ? <section className="ruboz-proof-strip"><div className={`ruboz-inner-shell ruboz-proof-count-${Math.min(proof.length, 4)}`}>{proof.slice(0, 4).map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></section> : null}
        <section className="ruboz-motion-ribbon" aria-label="Platform strengths"><div>{[...motionItems, ...motionItems].map((item, index) => <span aria-hidden={index >= motionItems.length || undefined} key={`${item}-${index}`}><i />{item}</span>)}</div></section>
        {children}

        <section className="ruboz-capabilities-section">
          <div className="ruboz-inner-shell ruboz-section-heading" data-ss-reveal-group="" data-y="34"><div><span>{sectionEyebrow}</span><h2 className="ss-text-reveal-blur">{sectionTitle}</h2></div><p>{sectionSummary}</p></div>
          <div className={`ruboz-inner-shell ruboz-capability-grid ruboz-count-${Math.min(cards.length, 6)}`} data-ss-reveal-group="" data-y="36">
            {cards.map((card, index) => {
              const content = <><div className="ruboz-capability-meta"><i>{String(index + 1).padStart(2, "0")}</i><span>{card.eyebrow ?? "Capability"}</span></div><FeatureArt kind={kind} index={index} /><h3>{card.title}</h3><p>{card.body}</p>{card.points?.length ? <ul>{card.points.slice(0, 3).map((point) => <li key={point}>{point}</li>)}</ul> : null}{card.detail ? <strong className="ri-card-detail">{card.detail}{card.href ? " ↗" : ""}</strong> : null}</>;
              return <article data-tilt="" data-tilt-max="2" data-tilt-speed="0.3" key={`${card.title}-${index}`}>{card.href ? <Link className="ri-capability-link" href={card.href}>{content}</Link> : content}</article>;
            })}
          </div>
        </section>

        <section className="ruboz-experience-section"><div className="ruboz-inner-shell"><div className="ruboz-experience-visual" data-ss-reveal="" data-x="-38"><div className="ri-conversation-head"><span><i />Live operation</span><em>Connected</em></div><div className="ri-conversation-core"><b>V</b><div className="ri-sound-wave">{Array.from({ length: 21 }, (_, index) => <i key={index} />)}</div><strong>{motionItems[0] ?? "Customer conversation"}</strong><p>Listening, understanding, and moving the workflow forward.</p></div><div className="ri-conversation-foot"><span>Low latency</span><span>Tools ready</span><span>Human handoff</span></div></div><div className="ruboz-experience-copy" data-ss-reveal-group="" data-y="34"><span>Designed for real operations</span><h2 className="ss-text-reveal-blur">{sectionTitle}</h2><p>{sectionSummary}</p><div>{motionItems.slice(0, 3).map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}</div><Link href={primaryAction.href}>{primaryAction.label}<Arrow /></Link></div></div></section>

        {workflow.length ? <section className="ruboz-workflow-section"><div className="ruboz-inner-shell"><div className="ruboz-workflow-intro" data-ss-reveal-group="" data-y="34"><span>How it works</span><h2 className="ss-text-reveal-blur">From first setup to every live outcome.</h2><p>Build carefully, test realistic call paths, deploy with control, and improve from the conversations your customers actually have.</p></div><div className="ruboz-workflow-list" data-ss-reveal-group="" data-y="34">{workflow.map((step, index) => <article key={`${step.title}-${index}`}><i>{String(index + 1).padStart(2, "0")}</i><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}</div></div></section> : null}
        {faqs.length ? <section className="ruboz-faq-section"><div className="ruboz-inner-shell"><div data-ss-reveal-group="" data-y="34"><span>Frequently asked questions</span><h2 className="ss-text-reveal-blur">Clear answers before you build.</h2><p>Understand the workflow, integrations, rollout, and controls before taking your first call.</p></div><div data-ss-reveal-group="" data-y="28">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<i>+</i></summary><p>{faq.answer}</p></details>)}</div></div></section> : null}
      </main>
    </SiteLayout>
  );
}
