import type { Metadata } from "next";

import { IntegrationDirectory } from "@/components/integrations/IntegrationDirectory";
import { SolutionStoryPage } from "@/components/layout/SolutionStoryPage";
import { integrations } from "@/config/integrationCatalog";

export const metadata: Metadata = {
  title: "AI Voice Agent Integrations | Vozon",
  description: "Connect Vozon with telephony, speech, models, CRM, scheduling, messaging, automation, and custom APIs.",
  alternates: { canonical: "/integrations" },
};

export default function IntegrationsPage() {
  return (
    <SolutionStoryPage
      content={{
        id: "integration-overview",
        category: "Vozon integration platform",
        title: "Integrations",
        summary: "Connect every voice conversation to telephony, speech, CRM, calendars, automation, and custom APIs through one production-ready integration layer.",
        highlights: ["Telephony and speech", "CRM and scheduling", "APIs and webhooks"],
        scenarios: [
          { eyebrow: "Voice layer", title: "Hear and respond naturally", body: "Combine telephony, transcription, models, and voices for responsive live conversations.", points: ["Provider flexibility", "Live audio", "Language coverage"] },
          { eyebrow: "Business layer", title: "Complete the next action", body: "Read and update CRM, calendars, messaging, and workflow tools with clearly scoped permissions.", points: ["Live tool calls", "Confirmed write actions", "Observable outcomes"] },
          { eyebrow: "Developer layer", title: "Extend with your own systems", body: "Use custom APIs and signed webhooks for business-specific actions and reliable event delivery.", points: ["Scoped credentials", "Signed events", "Retry handling"] },
        ],
        capabilities: [
          { title: "One connected voice stack", body: "Choose the providers that fit your languages, call routes, systems, and operating controls." },
          { title: "Actions during the call", body: "Let the agent retrieve approved information and complete a confirmed next step without leaving the conversation." },
          { title: "Human fallback stays ready", body: "Transfer sensitive, complex, or low-confidence requests with the context already collected." },
        ],
        workflow: [
          { title: "Define the call outcome", body: "Start with what the caller needs and the minimum action required to complete it." },
          { title: "Connect the approved tool", body: "Choose a native integration, signed webhook, or scoped custom API for the action." },
          { title: "Test realistic failures", body: "Validate slow responses, unavailable systems, retries, duplicate events, and human handoff." },
          { title: "Monitor real outcomes", body: "Review call and tool events so the workflow improves with evidence." },
        ],
        integrations: integrations.slice(0, 12).map((integration) => integration.name),
        faqs: [
          { question: "Can Vozon connect to a system not listed here?", answer: "Yes. Business-specific systems can connect through a scoped custom API or signed webhook with explicitly defined actions and authentication." },
          { question: "Does connecting an app give every agent access?", answer: "No. Connections and tools are enabled only for the agents and actions that need them." },
          { question: "How should integrations be tested?", answer: "Test representative live calls, invalid inputs, unavailable services, retries, duplicate events, and transfer behavior before expanding production traffic." },
        ],
        proof: [
          { value: "30+", label: "Connection paths" },
          { value: "12", label: "Workflow categories" },
          { value: "Live", label: "Tool execution" },
          { value: "Scoped", label: "Action permissions" },
        ],
        visualKey: "customer-support",
        kindLabel: "Integration",
      }}
    >
      <IntegrationDirectory />
    </SolutionStoryPage>
  );
}
