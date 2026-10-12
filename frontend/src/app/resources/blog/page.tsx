import type { Metadata } from "next";
import { BlogPage as BlogExperience } from "@/components/resources/BlogPage";

export const metadata: Metadata = { title: "AI Voice Agent Guides and Resources | Vozon", description: "Practical guides to AI voice agents, phone automation, pricing, latency, compliance, appointment booking, and production rollout.", alternates: { canonical: "/resources/blog" } };

export default function BlogPage() {
  return <BlogExperience />;
}
