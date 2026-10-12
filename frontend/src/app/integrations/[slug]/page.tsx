import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionStoryPage } from "@/components/layout/SolutionStoryPage";
import { integrations } from "@/config/integrationCatalog";
import { integrationEditorial, layerDescriptions } from "@/config/integrationEditorial";
import { integrationGuides } from "@/config/integrationGuides";

type PageProps = { params: Promise<{ slug: string }> };

const integrationVisuals: Record<string, string> = {
  Telephony: "receptionists",
  "SIP Trunking": "receptionists",
  Scheduling: "healthcare",
  "CRM & Sales": "lead-qualification",
  Automation: "customer-support",
  Messaging: "customer-support",
  "Build & Extend": "customer-support",
  "Payments & Orders": "retail-consumer",
  Voices: "travel-hospitality",
  Models: "customer-support",
  "Speech Input": "travel-hospitality",
  "Speech to Speech": "travel-hospitality",
};

export function generateStaticParams() {
  return integrations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const integration = integrations.find((item) => item.slug === slug);
  if (!integration) return {};
  return {
    title: `${integration.name} Integration | Vozon`,
    description: integration.description,
    alternates: { canonical: `/integrations/${slug}` },
  };
}

export default async function IntegrationPage({ params }: PageProps) {
  const { slug } = await params;
  const integration = integrations.find((item) => item.slug === slug);
  if (!integration) notFound();

  const guide = integrationGuides[integration.slug];
  const editorial = integrationEditorial[integration.slug];
  const relatedIntegrations = integrations
    .filter((item) => item.category === integration.category || item.slug === "vozon-ai")
    .map((item) => item.name)
    .slice(0, 8);

  return (
    <SolutionStoryPage
      content={{
        id: `integration-${integration.slug}`,
        category: `${integration.category} integration`,
        title: `${integration.name} integration`,
        summary: `${integration.description} ${layerDescriptions[integration.category]}`,
        highlights: integration.capabilities,
        scenarios: editorial.scenarios.map((scenario, index) => ({
          eyebrow: `Connected workflow 0${index + 1}`,
          title: integration.capabilities[index] ?? `Workflow ${index + 1}`,
          body: scenario,
          points: ["Live call context", "Scoped action", "Recorded outcome"],
          outcome: `${integration.name} action completed`,
        })),
        capabilities: integration.capabilities.map((capability, index) => ({
          eyebrow: `Capability 0${index + 1}`,
          title: capability,
          body: editorial.scenarios[index] ?? editorial.why,
        })),
        workflow: [
          { title: "Define the outcome", body: `Choose the call scenario and decide which ${integration.name} capabilities the agent should use.` },
          { title: "Configure the connection", body: guide.setup },
          { title: "Validate realistic calls", body: guide.check },
          { title: "Launch with visibility", body: "Review call outcomes, tool responses, and handoffs before expanding traffic." },
        ],
        integrations: relatedIntegrations.length ? relatedIntegrations : [integration.name, "Vozon.ai", "Webhooks"],
        faqs: [
          { question: `What does ${integration.name} add to a Vozon workflow?`, answer: editorial.why },
          { question: `How do I set up ${integration.name}?`, answer: guide.setup },
          { question: "What should I verify before launch?", answer: guide.check },
        ],
        proof: [
          { value: "01", label: "Scoped connection" },
          { value: "02", label: "Real-call testing" },
          { value: "03", label: "Observable outcomes" },
          { value: "04", label: "Human fallback" },
        ],
        benefits: integration.capabilities.map((capability, index) => ({
          title: capability,
          body: editorial.scenarios[index] ?? editorial.why,
        })),
        visualKey: integrationVisuals[integration.category] ?? "customer-support",
        kindLabel: "Integration",
      }}
    />
  );
}
