import type { Metadata } from "next";

import { RubozInnerPage } from "@/components/layout/RubozInnerPage";

export const metadata: Metadata = {
  title: "White Label AI Voice Partner Programme | Vozon",
  description: "Launch your own AI voice business with branded customer workspaces, plans, domains, and partner controls.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <RubozInnerPage
      id="partners-page"
      eyebrow="White-label partner programme"
      title="Launch an AI voice business"
      accent="that carries your brand."
      summary="Create branded customer workspaces, package the capabilities your market needs, and manage customer access, plans, usage, and support from one partner operation."
      highlights={["Your brand", "Your commercial offer", "Your customer relationship"]}
      proof={[
        { value: "100%", label: "Customer-facing brand" },
        { value: "Custom", label: "Plans and domains" },
        { value: "Isolated", label: "Customer workspaces" },
        { value: "One", label: "Partner operating view" },
      ]}
      sectionEyebrow="Partner platform"
      sectionTitle="Everything required to package, deliver, and operate your offer."
      sectionSummary="Build a clear service around the customers and workflows you know, while the platform supports voice infrastructure and workspace operations."
      cards={[
        { eyebrow: "Brand experience", title: "Build under your brand", body: "Configure product identity, logos, colours, support details, legal links, email settings, and approved customer domains." },
        { eyebrow: "Commercial control", title: "Shape your plans", body: "Define recurring prices, included usage, trials, feature access, model access, and customer limits within your agreement." },
        { eyebrow: "Customer ownership", title: "Provision isolated workspaces", body: "Give every client a separate organisation, owner, brand, plan, subscription state, and operating context." },
        { eyebrow: "Partner operations", title: "See the business clearly", body: "Review customers, subscriptions, usage economics, launch readiness, and partner billing from one console." },
      ]}
      workflow={[
        { title: "Shape the offer", body: "Define the market, customer profile, expected usage, workflows, and services you want to deliver." },
        { title: "Configure your brand", body: "Set visual identity, support details, legal links, email settings, and customer-facing domains." },
        { title: "Publish your plans", body: "Choose capability access, allowances, limits, recurring pricing, and usage structure." },
        { title: "Launch customers", body: "Provision workspaces, invite customer owners, and manage the ongoing relationship from your console." },
      ]}
      faqs={[
        { question: "What is a white-label AI voice platform?", answer: "It lets you deliver AI voice services through customer workspaces carrying your product identity while you manage plans, access, support, and the commercial relationship." },
        { question: "Can partners create their own plans?", answer: "Partner controls support recurring prices, setup fees, trials, included minutes, usage pricing, capabilities, model access, and customer limits within the partner agreement." },
        { question: "How are customer accounts separated?", answer: "Each customer is provisioned into an isolated organisation with its own owner, brand, plan snapshot, and subscription state." },
      ]}
      primaryAction={{ href: "/contact#contact-form", label: "Apply as a partner" }}
      secondaryAction={{ href: "/resources/solution-partner-program", label: "Explore the programme" }}
    />
  );
}
