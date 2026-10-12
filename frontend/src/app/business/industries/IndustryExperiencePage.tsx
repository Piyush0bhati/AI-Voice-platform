import { SolutionStoryPage } from "@/components/layout/SolutionStoryPage";

type Industry = {
  slug: string;
  title: string;
  summary: string;
  highlights: readonly string[];
  sections: ReadonlyArray<{ readonly title: string; readonly body: string }>;
};

export type IndustryExperiencePreset = {
  accent: string;
  accentSoft: string;
  logos: string[];
  photoCards: Array<{ title: string; image: string }>;
  workflows: Array<{
    eyebrow: string;
    title: string;
    button: string;
    visual: "routing" | "ivr" | "calendar";
    image?: string;
    reverse?: boolean;
    points: Array<{ title: string; body: string }>;
  }>;
  integrations: string[];
  faqs: string[];
  reviewBenefits: Array<{ title: string; body: string }>;
  quote: {
    primary: string;
    primaryName: string;
    primaryRole: string;
    secondary: string;
    secondaryName: string;
    secondaryRole: string;
  };
};

function answer(question: string, industry: string) {
  const lower = question.toLowerCase();
  if (lower.includes("integrat") || lower.includes("crm")) return `Connect approved APIs, calendars, CRM records, and operational tools so every ${industry.toLowerCase()} call can create a useful next step.`;
  if (lower.includes("language")) return "Configure multilingual conversations with consistent instructions, routing, summaries, and human escalation across regions.";
  if (lower.includes("compliance") || lower.includes("sensitive")) return "Your team controls approved knowledge, collected fields, access, retention, handoff rules, and the review process for sensitive calls.";
  return `Vozon can handle repeatable ${industry.toLowerCase()} conversations, capture structured context, complete approved actions, and transfer calls that need human judgment.`;
}

export function IndustryExperiencePage({ industry, preset }: { industry: Industry; preset: IndustryExperiencePreset }) {
  const scenarios = preset.workflows.map((workflow) => ({
    eyebrow: workflow.eyebrow,
    title: workflow.title,
    body: workflow.points[0]?.body ?? industry.summary,
    points: workflow.points.map((point) => point.title),
    outcome: workflow.button,
  }));
  const capabilities = industry.sections.map((section, index) => ({ eyebrow: `Outcome 0${index + 1}`, ...section }));

  return (
    <SolutionStoryPage
      content={{
        id: `industry-${industry.slug}`,
        category: `Industry solution / ${industry.title}`,
        title: industry.title,
        summary: industry.summary,
        highlights: industry.highlights,
        scenarios,
        capabilities,
        integrations: preset.integrations,
        faqs: preset.faqs.map((question) => ({ question, answer: answer(question, industry.title) })),
        proof: [
          { value: "Configured", label: "Customer coverage" },
          { value: "Live", label: "Connected workflows" },
          { value: "Clear", label: "Structured handoffs" },
        ],
        benefits: preset.reviewBenefits,
        workflow: [
          { title: "Choose the call journeys", body: "Start with repeatable requests that have clear information, actions, and escalation boundaries." },
          { title: "Connect approved context", body: `Add the knowledge, systems, and fields your ${industry.title.toLowerCase()} team needs during a call.` },
          { title: "Validate difficult cases", body: "Test urgent requests, missing data, tool failures, confused callers, and direct requests for a person." },
          { title: "Launch with oversight", body: "Review outcomes, handoffs, quality signals, and recurring caller needs as volume grows." },
        ],
      }}
    />
  );
}
