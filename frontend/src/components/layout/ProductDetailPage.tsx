import Link from "next/link";

import { ProductDashboardVisual } from "@/components/layout/ProductDashboardVisual";
import { featureScreenByProduct, type FeatureScreenKey } from "@/components/layout/ProductFeatureScreen";
import { SiteLayout } from "@/components/layout/SiteLayout";
import type { ProductServiceExperience } from "@/config/productServiceExperiences";
import "@/components/layout/ProductFamily.css";

type Product = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  highlights: readonly string[];
};

const workflowScreensByProduct: Record<string, readonly FeatureScreenKey[]> = {
  "voice-agents": ["agents", "knowledge", "calls", "analytics"],
  "voice-cloning": ["voices", "speech", "languages", "voices"],
  "realtime-tts": ["developers", "speech", "calls", "analytics"],
  "multilingual-speech": ["languages", "knowledge", "calls", "analytics"],
  "api-access": ["developers", "developers", "calls", "analytics"],
  "team-workflows": ["campaigns", "agents", "calls", "analytics"],
  "speech-analytics": ["calls", "analytics", "knowledge", "analytics"],
  "sentiment-detection": ["calls", "analytics", "knowledge", "analytics"],
  "conversation-insights": ["calls", "analytics", "knowledge", "calls"],
  "quality-controls": ["knowledge", "agents", "calls", "analytics"],
  "book-appointments": ["agents", "booking", "booking", "analytics"],
};

export function ProductDetailPage({ service, experience }: { service: Product; experience: ProductServiceExperience }) {
  const featureScreen = featureScreenByProduct[service.slug] ?? "agents";
  const workflowScreens = workflowScreensByProduct[service.slug] ?? [featureScreen, "knowledge", "calls", "analytics"];

  return (
    <SiteLayout>
      <main className={`vozon-product-page retell-product-page product-detail-page product-detail-${service.slug}`} id={`product-${service.slug}`}>
        <section className="vozon-feature-hero">
          <div className="vozon-feature-hero-grid">
            <div className="vozon-feature-hero-visual">
              <div className="vozon-feature-hero-screen">
                <ProductDashboardVisual label={service.title} screen={featureScreen} />
              </div>
              <span className="vozon-feature-live"><i />Live Vozon workflow</span>
            </div>

            <div className="vozon-feature-hero-copy">
              <span className="vozon-feature-kicker">{service.kicker} · Vozon AI platform</span>
              <h1><b>{experience.heroTitle}</b><em>{experience.heroAccent}</em></h1>
              <div className="vozon-feature-hero-bottom">
                <h2>{service.highlights[0]}</h2>
                <div>
                  <p>{service.summary}</p>
                  <div className="vozon-feature-actions">
                    <Link href="/dashboard">Deploy in Dashboard</Link>
                    <Link href="/contact">Contact Sales</Link>
                  </div>
                </div>
              </div>
              <div className="vozon-feature-proof">
                {experience.proof.slice(0, 3).map((item) => <span key={item.label}><b>{item.value}</b>{item.label}</span>)}
              </div>
            </div>
          </div>
        </section>

        <nav className="pf-subnav" aria-label="Product sections">
          <div><a href="#overview">Overview</a><a href="#feature">Feature</a><a href="#how-it-works">How it works</a><a href="#highlights">Highlights</a></div>
        </nav>

        <section className="pf-overview" id="overview">
          <div className="pf-shell">
            <div className="pf-section-intro">
              <span>Overview</span>
              <h2>Go from {experience.capabilities[0].eyebrow.toLowerCase()} <mark>to a completed outcome.</mark></h2>
              <p>{service.highlights.slice(0, 3).join(". ")}.</p>
            </div>
            <div className="pf-overview-grid">
              {experience.capabilities.slice(0, 2).map((capability, index) => (
                <article key={capability.title}>
                  <header>{capability.title}</header>
                  <div>
                    <strong>{capability.body}</strong>
                    {capability.points.map((point) => <p key={point}><i>✓</i>{point}</p>)}
                    <div className="pf-overview-motion"><span>0{index + 1}</span><i /><i /><i /></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pf-feature" id="feature">
          <div className="pf-shell">
            <div className="pf-feature-heading">
              <div><span>Focused product workflow</span><h2>From setup to a live result.</h2></div>
              <p>Watch the Vozon workspace demonstrate the exact controls, information, and outcome for {service.title.toLowerCase()}.</p>
            </div>
            <div className="pf-product-stage pf-real-product-stage pf-exact-dashboard-stage">
              <ProductDashboardVisual label={service.title} screen={featureScreen} />
            </div>
          </div>
        </section>

        <section className="pf-trust-band">
          <div className="pf-shell">
            <div>
              <span>Built for real operations, not demos</span>
              <h2>Voice automation your team can run with confidence.</h2>
              <p>Build, test, and deploy AI phone experiences with clear controls, connected actions, production visibility, and immediate human escalation.</p>
            </div>
            <aside>
              <strong>Designed around</strong>
              <p>Real call volume, difficult edge cases, accountable outcomes, and workflows that still need human judgment.</p>
              <Link href="/contact">Contact Sales</Link>
            </aside>
          </div>
        </section>

        <section className="pf-how" id="how-it-works">
          <div className="pf-shell">
            <div className="pf-section-intro">
              <span>How it works</span>
              <h2>Get {service.title.toLowerCase()} running in four steps.</h2>
              <p>Each animated panel demonstrates the corresponding action inside a focused Vozon workspace.</p>
            </div>
            <div className="pf-step-stack">
              {experience.workflow.map((step, index) => (
                <article className={index % 2 ? "is-reverse" : ""} key={step.title}>
                  <div className={`pf-exact-step-screen pf-exact-step-${index + 1}`}>
                    <ProductDashboardVisual compact label={step.title} screen={workflowScreens[index] ?? featureScreen} />
                  </div>
                  <div>
                    <i>0{index + 1}</i>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <Link href="/contact">Contact Sales</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pf-highlights" id="highlights">
          <div className="pf-shell">
            <div className="pf-feature-heading">
              <div><span>Product highlights</span><h2>Built to handle the real world.</h2></div>
              <p>Start with repeatable conversations, connect the actions that matter, and keep people available for exceptions.</p>
            </div>
            <div className="pf-highlight-grid">
              {experience.useCases.map((useCase, index) => <article key={useCase.title}><i>0{index + 1}</i><h3>{useCase.title}</h3><p>{useCase.body}</p><strong>{useCase.outcome}</strong></article>)}
            </div>
            <div className="pf-integrations"><span>Connects with</span>{experience.integrations.map((integration) => <b key={integration}>{integration}</b>)}</div>
          </div>
        </section>

        <section className="pf-faq">
          <div className="pf-shell">
            <div><span>Frequently asked questions</span><h2>Know before you build.</h2></div>
            <div>{experience.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<i>+</i></summary><p>{faq.answer}</p></details>)}</div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
