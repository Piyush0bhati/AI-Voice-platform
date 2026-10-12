import { RubozInnerPage } from "@/components/layout/RubozInnerPage";

type OverviewItem = { title: string; summary: string; href: string; meta: string };
type OverviewGroup = { title: string; description: string; items: readonly OverviewItem[] };
type MarketingOverviewPageProps = {
  pageId?: string;
  eyebrow: string;
  title: string;
  summary: string;
  groups: readonly OverviewGroup[];
  proof: readonly { value: string; label: string }[];
  lightTheme?: boolean;
  cleanCards?: boolean;
};

export function MarketingOverviewPage({ pageId, eyebrow, title, summary, groups, proof }: MarketingOverviewPageProps) {
  const items = groups.flatMap((group) => group.items.map((item) => ({
    eyebrow: item.meta,
    title: item.title,
    body: item.summary,
    detail: group.title,
  })));
  const firstGroup = groups[0];

  return (
    <RubozInnerPage
      cards={items}
      eyebrow={eyebrow}
      highlights={["Practical guidance", "Production workflows", "Clear evaluation"]}
      id={pageId}
      primaryAction={{ href: firstGroup?.items[0]?.href ?? "/contact", label: eyebrow === "Compare" ? "Start comparing" : "Read the guides" }}
      proof={proof}
      secondaryAction={{ href: "/contact", label: "Talk to our team" }}
      sectionEyebrow={firstGroup?.title ?? eyebrow}
      sectionSummary={firstGroup?.description ?? summary}
      sectionTitle={eyebrow === "Compare" ? "Compare the complete operating model." : "Guidance grounded in real voice operations."}
      summary={summary}
      title={title}
      workflow={[
        { title: "Define the decision", body: "Start with the customer workflow, operational requirement, or buying question you need to resolve." },
        { title: "Review practical evidence", body: "Focus on the call path, integrations, controls, cost, and rollout work that determine production success." },
        { title: "Test representative calls", body: "Use the same realistic scenarios, expected actions, failures, and handoffs for every option." },
        { title: "Choose from outcomes", body: "Compare resolution quality, operational effort, visibility, and total cost—not feature counts alone." },
      ]}
    />
  );
}
