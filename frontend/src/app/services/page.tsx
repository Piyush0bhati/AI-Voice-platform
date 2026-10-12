import type { Metadata } from "next";

import { ProductOverviewPage } from "@/components/layout/ProductOverviewPage";

export const metadata: Metadata = {
  title: "AI Voice Services & Products | Vozon",
  description: "Explore Vozon's suite of autonomous voice agents, telephony orchestration, real-time analytics, and enterprise integrations.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ProductOverviewPage />;
}
