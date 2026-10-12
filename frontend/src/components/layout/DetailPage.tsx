import { RubozInnerPage } from "@/components/layout/RubozInnerPage";

type DetailSection = { title: string; body: string };
type DetailPageProps = {
  kicker: string;
  title: string;
  summary: string;
  highlights: readonly string[];
  sections: readonly DetailSection[];
  primaryAction: { href: string; label: string };
  secondaryAction: { href: string; label: string };
  heroTitle?: string;
};

const images: Record<string, string> = {
  "Voice Agents": "/service-images/team-workflow.jpg",
  "Voice Cloning": "/service-images/voice-studio.jpg",
  "Realtime TTS": "/service-images/voice-studio.jpg",
  "Multilingual Speech": "/service-images/team-workflow.jpg",
  "API Access": "/service-images/developer-api.jpg",
  "Team Workflows": "/service-images/team-workflow.jpg",
  "Speech Analytics": "/service-images/voice-analytics.jpg",
  "Sentiment Detection": "/service-images/voice-analytics.jpg",
  "Conversation Insights": "/service-images/voice-analytics.jpg",
  "Quality Controls": "/service-images/team-workflow.jpg",
};

export function DetailPage({ kicker, title, summary, highlights, sections, primaryAction, secondaryAction, heroTitle }: DetailPageProps) {
  const cards = sections.length >= 3
    ? sections
    : [...sections, ...highlights.map((highlight) => ({ title: highlight, body: `Configure ${highlight.toLowerCase()} around your approved workflow, connected systems, and human escalation rules.` }))].slice(0, 3);

  return (
    <RubozInnerPage
      accent={title}
      cards={cards.map((section, index) => ({ eyebrow: `Capability 0${index + 1}`, title: section.title, body: section.body }))}
      eyebrow={kicker}
      heroAlt={`${title} voice workflow`}
      heroImage={images[title]}
      highlights={highlights}
      primaryAction={primaryAction}
      proof={highlights.slice(0, 3).map((item, index) => ({ value: index === 0 ? "24/7" : index === 1 ? "Live" : "Human", label: item }))}
      secondaryAction={secondaryAction}
      sectionEyebrow="Designed for outcomes"
      sectionSummary="Configure the experience around your policies, systems, and escalation rules while your team keeps control."
      sectionTitle="Every conversation moves the work forward."
      summary={summary}
      title={heroTitle ?? "Production-ready"}
      workflow={[
        { title: "Define the job", body: "Choose the calls, outcomes, approved answers, and boundaries for the workflow." },
        { title: "Connect context", body: "Add the knowledge and business systems the agent needs to complete useful work." },
        { title: "Test real paths", body: "Review common requests, interruptions, edge cases, failures, and escalation rules." },
        { title: "Launch and improve", body: "Monitor outcomes and refine the workflow from evidence in real conversations." },
      ]}
    />
  );
}
