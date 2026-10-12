import type { Metadata } from "next";

import { RubozInnerPage } from "@/components/layout/RubozInnerPage";

export const metadata: Metadata = {
  title: "Company | Vozon",
  description: "Learn how Vozon has been building practical voice AI since 2024 around useful conversations and connected business workflows.",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <RubozInnerPage
      id="company-page"
      eyebrow="Company"
      title="Building practical voice AI"
      accent="for real customer work."
      summary="Since 2024, Vozon has been building practical voice AI around natural conversations, connected actions, and visible business outcomes."
      landingHero
      landingTitle="Company"
      landingSummary="Explore the practical voice AI platform Vozon has been building since 2024 for real customer conversations and connected business workflows."
      highlights={["About Vozon", "Team and careers", "Partners and contact"]}
      proof={[
        { value: "One", label: "Shared product mission" },
        { value: "Clear", label: "Workflow boundaries" },
        { value: "Visible", label: "Call outcomes" },
        { value: "Human", label: "Escalation by design" },
      ]}
      sectionEyebrow="Explore Vozon"
      sectionTitle="The company behind every conversation."
      sectionSummary="Understand our product direction, meet the disciplines building the platform, and find the right way to work with us."
      cards={[
        { eyebrow: "About", title: "Why Vozon exists", body: "See the mission and product principles guiding natural, useful, and accountable voice automation.", detail: "Read our story", href: "/about" },
        { eyebrow: "Team", title: "The disciplines behind the platform", body: "Meet the voice AI, realtime infrastructure, product, integration, and customer teams working together.", detail: "Meet the team", href: "/team" },
        { eyebrow: "Careers", title: "Build the next generation of voice operations", body: "Explore opportunities to solve difficult conversation, reliability, and customer workflow problems.", detail: "See open roles", href: "/career" },
        { eyebrow: "Partners", title: "Deliver Vozon with your brand and expertise", body: "Build implementation, referral, and white-label relationships around measurable customer outcomes.", detail: "Explore partnerships", href: "/partners" },
        { eyebrow: "Contact", title: "Plan a production workflow", body: "Talk with the team about call volume, integrations, languages, controls, rollout, and expected outcomes.", detail: "Contact sales", href: "/contact" },
        { eyebrow: "Insights", title: "Learn from practical implementation guides", body: "Use clear frameworks for choosing workflows, testing calls, managing risk, and improving production quality.", detail: "Read the guides", href: "/resources/blog" },
      ]}
      workflow={[
        { title: "Start with the customer need", body: "Define the conversation and outcome before choosing technology or automation scope." },
        { title: "Design the responsible boundary", body: "Decide what the agent may answer, which actions it may take, and when a person should join." },
        { title: "Test representative calls", body: "Validate natural conversation, connected tools, failure paths, and handoff behavior." },
        { title: "Improve from real outcomes", body: "Use call evidence, customer feedback, and operational data to guide every release." },
      ]}
      primaryAction={{ href: "/about", label: "About Vozon" }}
      secondaryAction={{ href: "/contact", label: "Contact our team" }}
    />
  );
}
