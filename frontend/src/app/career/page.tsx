import type { Metadata } from "next";

import { RubozInnerPage } from "@/components/layout/RubozInnerPage";

export const metadata: Metadata = {
  title: "Careers at Vozon | Build the Future of Voice AI",
  description: "Join Vozon and help build useful, reliable voice AI experiences for real business conversations.",
  alternates: { canonical: "/career" },
};

export default function CareerPage() {
  return (
    <RubozInnerPage
      id="career-page"
      eyebrow="Careers at Vozon"
      title="Build technology that makes"
      accent="every conversation more useful."
      summary="Join a team working across real-time voice, product, infrastructure, and customer experience. We care about clear thinking, strong ownership, and work that reaches real users."
      highlights={["Meaningful problems", "Real ownership", "Continuous learning"]}
      proof={[
        { value: "AI", label: "Voice and intelligence" },
        { value: "Build", label: "Product and engineering" },
        { value: "Design", label: "Experience and systems" },
        { value: "Own", label: "Work from idea to outcome" },
      ]}
      sectionEyebrow="Open areas"
      sectionTitle="Find the work where you can make a visible difference."
      sectionSummary="We are interested in thoughtful builders who can simplify difficult problems and stay close to the people using what they create."
      cards={[
        { eyebrow: "Engineering", title: "Frontend Engineer", body: "Shape the interfaces people use to build, launch, and monitor voice experiences.", points: ["Next.js", "TypeScript", "Design systems"] },
        { eyebrow: "Engineering", title: "Backend Engineer", body: "Build reliable APIs, integrations, and services for fast, dependable voice workflows.", points: ["APIs", "Infrastructure", "Reliability"] },
        { eyebrow: "Applied AI", title: "AI and ML Engineer", body: "Work on speech, reasoning, evaluation, and real-time systems for natural conversations.", points: ["LLMs", "Speech", "Realtime"] },
        { eyebrow: "Product design", title: "Product Designer", body: "Make sophisticated voice technology understandable for operators and customers.", points: ["UX", "UI", "Research"] },
        { eyebrow: "Platform", title: "DevOps and Platform Engineer", body: "Improve deployment, observability, security, and scale as the platform grows.", points: ["Cloud", "Monitoring", "Automation"] },
        { eyebrow: "General application", title: "Show us your strongest work", body: "If the exact role is not listed, introduce yourself and explain the problems you want to solve." },
      ]}
      workflow={[
        { title: "Explore", body: "Choose the area that matches your strengths, interests, and the problems you want to solve." },
        { title: "Apply", body: "Share your experience, relevant work, and why voice AI is interesting to you." },
        { title: "Connect", body: "Meet the team, understand the role, and discuss how you approach real problems." },
        { title: "Build", body: "Join with clear ownership and start turning customer and product problems into useful outcomes." },
      ]}
      faqs={[
        { question: "What should I include in an application?", answer: "Share relevant experience, projects you are proud of, and what interests you about voice AI. Links to GitHub, a portfolio, products, writing, or other work are welcome." },
        { question: "Can I apply without an exact matching role?", answer: "Yes. Send a general application explaining what you do well, what you want to work on, and how you could contribute." },
        { question: "What does Vozon value in candidates?", answer: "Strong problem solving, clear communication, attention to detail, ownership, curiosity, and willingness to keep learning." },
      ]}
      primaryAction={{ href: "mailto:hello@vozon.ai?subject=Career%20application", label: "Send an application" }}
      secondaryAction={{ href: "/about", label: "About Vozon" }}
    />
  );
}
