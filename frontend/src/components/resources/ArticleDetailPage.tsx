import { RubozInnerPage } from "@/components/layout/RubozInnerPage";
import type { SeoPage } from "@/config/seoPages";

export function ArticleDetailPage({ article }: { article: SeoPage }) {
  return (
    <RubozInnerPage
      id={`article-${article.slug}`}
      eyebrow={article.kicker}
      title={article.title}
      summary={article.description}
      highlights={article.highlights}
      proof={article.highlights.map((label, index) => ({ value: `0${index + 1}`, label }))}
      sectionEyebrow="Practical guide"
      sectionTitle="Turn the topic into a clear operating plan."
      sectionSummary="Use these areas to evaluate the workflow, make informed decisions, and prepare the next step."
      cards={article.sections.map((section, index) => ({ eyebrow: `Part 0${index + 1}`, title: section.title, body: section.body }))}
      workflow={article.sections.slice(0, 4).map((section) => ({ title: section.title, body: section.body }))}
      primaryAction={article.secondaryAction ?? { href: "/services/voice-agents", label: "Explore voice agents" }}
      secondaryAction={{ href: "/contact", label: "Plan your implementation" }}
    />
  );
}
