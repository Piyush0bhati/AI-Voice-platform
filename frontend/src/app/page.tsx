import type { Metadata } from "next";
import { DistinctVoicePlatformHome } from "@/components/sections/DistinctVoicePlatformHome";
import { EnquiryChatbot } from "@/components/sections/EnquiryChatbot";
import SculptureHero from "@/components/ui/sculpture-hero";

export const metadata: Metadata = {
  title: "Vozon AI — Voice that answers back | Conversational Voice AI Platform",
  description:
    "Deploy human-sounding conversational voice AI for inbound customer support, lead qualification, and outbound campaigns. Built-in telephony and native fluency in 22+ languages.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* Spectacular Sculpture Hero with ~100k GPU-Simulated Liquid Particles */}
      <SculptureHero
        brand="Vozon AI"
        eyebrow="Next-Gen Conversational Voice AI • <350ms Latency"
        headline={"Voice that\nanswers back."}
        headlineAccent="answers back."
        body="We shape conversational voice agents with the precision of neural acoustic modeling and the patience of craft — voice AI that actually sounds human."
        primaryCta={{ label: "Test live voice agent", href: "#voice-terminal" }}
        secondaryCta={{ label: "Explore solutions", href: "#solutions" }}
        navLinks={[
          { label: "Solutions", href: "#solutions" },
          { label: "Integrations", href: "#integrations" },
          { label: "Insights", href: "#insights" },
          { label: "Architecture", href: "#architecture" },
          { label: "Pricing", href: "/pricing" },
        ]}
        backdropText="VOZON"
        theme="light"
        themeToggle={true}
        height="100vh"
      />

      {/* Production Voice Platform Capabilities & Live WebRTC Voice Terminal */}
      <DistinctVoicePlatformHome showHeader={false} />

      {/* Instant Enquiry Assistant */}
      <EnquiryChatbot />
    </>
  );
}
