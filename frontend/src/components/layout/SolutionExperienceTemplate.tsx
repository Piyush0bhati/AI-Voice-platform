import { SolutionStoryPage, type SolutionStoryFaq } from "@/components/layout/SolutionStoryPage";

export type SolutionCard = {
  title: string;
  body: string;
  eyebrow?: string;
  outcome?: string;
  points?: readonly string[];
  image?: string;
};

export type SolutionFaq = SolutionStoryFaq;

export type SolutionExperienceContent = {
  id: string;
  category: string;
  title: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  highlights: readonly string[];
  showcase: readonly SolutionCard[];
  capabilities: readonly SolutionCard[];
  journey: readonly SolutionCard[];
  integrations: readonly string[];
  faqs: readonly SolutionFaq[];
  proof?: readonly { value: string; label: string }[];
  reviews?: readonly { quote: string; name: string; role: string }[];
};

export function SolutionExperienceTemplate({ content }: { content: SolutionExperienceContent }) {
  return (
    <SolutionStoryPage
      content={{
        id: content.id,
        category: content.category,
        title: content.title,
        summary: content.summary,
        highlights: content.highlights,
        scenarios: content.showcase,
        capabilities: content.capabilities,
        workflow: content.journey,
        integrations: content.integrations,
        faqs: content.faqs,
        proof: content.proof ?? [
          { value: "24/7", label: "Always-on call coverage" },
          { value: "Live", label: "Connected business actions" },
          { value: "Clear", label: "Structured outcomes" },
        ],
        quotes: content.reviews,
      }}
    />
  );
}
