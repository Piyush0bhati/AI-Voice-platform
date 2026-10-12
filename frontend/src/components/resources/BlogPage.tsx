"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { SiteLayout } from "@/components/layout/SiteLayout";
import "@/components/resources/BlogPage.css";

const blogPosts = [
  {
    group: "Voice AI",
    category: "Conversation design",
    title: "How to design an AI voice agent callers can trust",
    summary:
      "Structure greetings, questions, confirmations, and fallbacks so conversations feel clear from the first hello.",
    image: "/service-images/team-workflow.jpg",
    imageAlt: "Team designing a clear AI voice conversation workflow",
    readTime: "6 min read",
  },
  {
    group: "Workflows",
    category: "Operations",
    title: "Where voice automation should hand off to a person",
    summary:
      "Define practical transfer conditions for sensitive, complex, or high-value calls without breaking the caller journey.",
    image: "/service-images/quality-review.jpg",
    imageAlt: "Specialist reviewing a customer call before a human handoff",
    readTime: "5 min read",
  },
  {
    group: "Analytics",
    category: "Analytics",
    title: "Turn call transcripts into useful operational insight",
    summary:
      "Move beyond summaries by organizing recurring needs, objections, outcomes, and follow-up work.",
    image: "/service-images/voice-analytics.jpg",
    imageAlt: "Voice analytics dashboard revealing patterns across calls",
    readTime: "7 min read",
  },
  {
    group: "Voice AI",
    category: "Multilingual AI",
    title: "Plan multilingual voice workflows with confidence",
    summary:
      "Review language coverage, pronunciation, local context, routing, and quality before expanding to a new market.",
    image: "/service-images/multilingual-team.jpg",
    imageAlt:
      "Multilingual team planning voice experiences for global customers",
    readTime: "6 min read",
  },
  {
    group: "Workflows",
    category: "Reliability",
    title: "A practical checklist for testing voice agents",
    summary:
      "Test interruptions, silence, noisy audio, tool failures, unexpected questions, and escalation paths before launch.",
    image: "/service-images/sentiment-support.jpg",
    imageAlt:
      "Quality specialist testing call sentiment and voice-agent responses",
    readTime: "8 min read",
  },
  {
    group: "Developers",
    category: "Developers",
    title: "Connect voice agents to business tools safely",
    summary:
      "Use narrow permissions, confirmation steps, observable actions, and clear failure handling across integrations.",
    image: "/service-images/developer-api.jpg",
    imageAlt: "Developer connecting a voice agent to secure business APIs",
    readTime: "7 min read",
  },
  {
    group: "Analytics",
    category: "Performance",
    title: "Measure voice-agent performance beyond call duration",
    summary:
      "Track resolution, transfer quality, intent coverage, action completion, and recurring failure patterns across customer calls.",
    image: "/blog-images/performance-metrics.webp",
    imageAlt: "Voice waveform branching into multiple performance metrics",
    readTime: "6 min read",
  },
  {
    group: "Developers",
    category: "Architecture",
    title: "Design reliable webhook-driven call workflows",
    summary:
      "Plan idempotent events, retries, timeouts, verification, and observability when calls trigger actions across your stack.",
    image: "/blog-images/webhook-workflow.webp",
    imageAlt: "Voice event moving through a reliable webhook workflow",
    readTime: "8 min read",
  },
  {
    group: "Voice AI",
    category: "Voice experience",
    title: "Choose a voice that fits the customer experience",
    summary:
      "Evaluate clarity, pace, pronunciation, tone, language coverage, and consistency before selecting a production voice.",
    image: "/service-images/voice-studio.jpg",
    imageAlt: "Voice studio interface used to select an AI voice",
    readTime: "5 min read",
  },
  {
    group: "Voice AI",
    category: "Conversation design",
    title: "Design natural interruption and recovery behaviour",
    summary:
      "Help agents handle barge-in, silence, corrections, and misunderstood requests without forcing callers back to the beginning.",
    image: "/blog-images/interruption-recovery.webp",
    imageAlt: "Caller and AI waveforms crossing and recovering naturally",
    readTime: "7 min read",
  },
  {
    group: "Workflows",
    category: "Workflow design",
    title: "Map a customer call from intent to completed action",
    summary:
      "Connect each common request to the information, business rules, tools, confirmation, and outcome the workflow needs.",
    image: "/blog-images/intent-to-action.webp",
    imageAlt:
      "Customer voice intent progressing through a completed workflow",
    readTime: "6 min read",
  },
  {
    group: "Workflows",
    category: "Escalation",
    title: "Build escalation paths that preserve call context",
    summary:
      "Transfer the reason, details, transcript, and actions already attempted so a teammate can continue without repetition.",
    image: "/blog-images/context-handoff.webp",
    imageAlt:
      "AI voice agent passing complete conversation context to a person",
    readTime: "5 min read",
  },
  {
    group: "Analytics",
    category: "Quality review",
    title: "Create focused review queues from call signals",
    summary:
      "Use outcomes, sentiment shifts, failed actions, transfers, and policy flags to prioritize the calls worth human review.",
    image: "/blog-images/review-queue.webp",
    imageAlt:
      "Call signals being filtered into focused quality-review queues",
    readTime: "6 min read",
  },
  {
    group: "Analytics",
    category: "Conversation insights",
    title: "Use conversation trends to improve agent instructions",
    summary:
      "Find repeated questions, confusion, objections, and unresolved intents, then turn those patterns into targeted updates.",
    image: "/blog-images/conversation-trends.webp",
    imageAlt:
      "Many conversation trends forming an improved voice response",
    readTime: "7 min read",
  },
  {
    group: "Developers",
    category: "Tool security",
    title: "Protect agent tools with narrowly scoped permissions",
    summary:
      "Limit each integration to the records and actions it needs, then require confirmation for sensitive changes.",
    image: "/blog-images/scoped-permissions.webp",
    imageAlt:
      "Protected voice agent connected only to authorized tools",
    readTime: "6 min read",
  },
  {
    group: "Developers",
    category: "Observability",
    title: "Trace a voice workflow across APIs and providers",
    summary:
      "Correlate call events, model activity, tool requests, retries, and errors so production issues are easier to diagnose.",
    image: "/blog-images/api-observability.webp",
    imageAlt:
      "Voice trace traveling across APIs and infrastructure providers",
    readTime: "8 min read",
  },
] as const;

const categories = [
  "All insights",
  "Voice AI",
  "Workflows",
  "Analytics",
  "Developers",
] as const;

const postHrefs = [
  "/resources/blog/how-to-build-an-ai-phone-agent",
  "/resources/blog/ai-receptionist-vs-answering-service",
  "/resources/blog/ai-phone-agent-implementation-checklist",
  "/resources/blog/voice-ai-use-cases-indian-businesses",
  "/resources/blog/ai-phone-agent-implementation-checklist",
  "/docs/api",
  "/resources/blog/ai-phone-agent-implementation-checklist",
  "/docs/api",
  "/services/voice-cloning",
  "/resources/blog/reduce-voice-agent-latency",
  "/resources/blog/how-to-build-an-ai-phone-agent",
  "/resources/blog/ai-receptionist-vs-answering-service",
  "/resources/blog/ai-phone-agent-implementation-checklist",
  "/resources/blog/what-is-an-ai-voice-agent",
  "/docs/api",
  "/resources/blog/reduce-voice-agent-latency",
] as const;

export function BlogPage() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All insights");

  const visiblePosts =
    activeCategory === "All insights"
      ? blogPosts.slice(0, 6)
      : blogPosts.filter((post) => post.group === activeCategory);

  return (
    <SiteLayout>
      <main className="ruboz-blog" id="blog-page">
        <section className="ruboz-blog-hero">
          <div className="ruboz-blog-gridlines" aria-hidden="true" />
          <div className="ruboz-blog-orbit" aria-hidden="true" />
          <div className="ruboz-blog-shell ruboz-blog-hero-layout">
            <div>
              <span className="ruboz-blog-kicker" data-ss-reveal><i />Vozon ideas</span>
              <h1 data-ss-reveal data-delay="0.08">Better thinking for <em>better conversations.</em></h1>
              <p data-ss-reveal data-delay="0.16">Practical guidance for teams designing, launching, and improving AI voice agents in real customer workflows.</p>
              <div className="ruboz-blog-actions" data-ss-reveal data-delay="0.24"><a href="#latest-insights">Explore insights <span aria-hidden="true">↓</span></a><Link href="/contact">Talk to Vozon <span aria-hidden="true">↗</span></Link></div>
              <nav aria-label="Breadcrumb" data-ss-reveal data-delay="0.3"><Link href="/">Home</Link><i>/</i><span>Blog &amp; Insights</span></nav>
            </div>
            <Link className="ruboz-blog-feature ss-parallax-area" href="/resources/blog/how-to-build-an-ai-phone-agent" data-ss-reveal data-x="56" data-duration="0.9">
              <div className="ruboz-blog-feature-image"><Image alt="Team reviewing customer conversation insights" className="ss-parallax-item" data-parallax-strength="7" fill priority sizes="(max-width: 900px) 92vw, 45vw" src="/service-images/conversation-insights.jpg" /></div>
              <div className="ruboz-blog-feature-copy"><span>Featured perspective · 8 min read</span><h2>Build voice agents around the conversation—not the script.</h2><p>Start with the caller’s real path: listen, confirm, recover, act, and know when a person should step in.</p><b>Read the guide <i aria-hidden="true">↗</i></b></div>
            </Link>
          </div>
        </section>

        <section className="ruboz-blog-ribbon" aria-label="Resource themes"><div>{["Conversation design", "Voice operations", "Connected workflows", "Production AI", "Conversation design", "Voice operations", "Connected workflows", "Production AI"].map((item, index) => <span aria-hidden={index > 3 || undefined} key={`${item}-${index}`}><i />{item}</span>)}</div></section>

        <section className="ruboz-blog-feed" id="latest-insights">
          <div className="ruboz-blog-shell">
            <div className="ruboz-blog-feed-heading" data-ss-reveal>
              <div><span>Latest thinking</span><h2>Ideas your team can put to work.</h2></div>
              <p>Choose a topic and move from broad voice AI questions to concrete decisions about experience, reliability, workflows, and measurement.</p>
            </div>
            <div className="ruboz-blog-filters" aria-label="Blog categories" data-ss-reveal>
              {categories.map((category) => <button aria-pressed={activeCategory === category} key={category} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}
            </div>
            <div className="ruboz-blog-grid" aria-live="polite" data-ss-reveal-group data-stagger="0.08">
              {visiblePosts.map((post) => {
                const sourceIndex = blogPosts.indexOf(post);
                return (
                  <Link className="ruboz-blog-card" href={postHrefs[sourceIndex] ?? "/resources/blog"} key={post.title}>
                    <div className="ruboz-blog-card-image"><Image alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" src={post.image} /><span>{String(sourceIndex + 1).padStart(2, "0")}</span></div>
                    <div className="ruboz-blog-card-copy"><div><span>{post.category}</span><time>{post.readTime}</time></div><h3>{post.title}</h3><p>{post.summary}</p><b>Read article <i aria-hidden="true">↗</i></b></div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="ruboz-blog-cta"><div className="ruboz-blog-shell" data-ss-reveal><div><span>Build with clarity</span><h2>Turn an idea into a working voice experience.</h2><p>Talk with our team about your calls, workflows, integrations, and rollout plan.</p></div><Link href="/contact">Contact our team <span aria-hidden="true">↗</span></Link></div></section>
      </main>
    </SiteLayout>
  );
}
