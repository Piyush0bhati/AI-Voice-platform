import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PricingExperience } from "@/components/pricing/PricingExperience";

export const metadata: Metadata = {
  title: "AI Voice Agent Pricing | Vozon",
  description: "Flexible, usage-based AI voice agent pricing. Scale with zero upfront commitments or enterprise-grade dedicated concurrency.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <SiteLayout>
      <PricingExperience />
    </SiteLayout>
  );
}
