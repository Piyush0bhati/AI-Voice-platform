import SculptureHero from "@/components/ui/sculpture-hero";
import React from "react";

export default function DemoPage() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Back Link */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
        <a
          href="/"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-800 bg-white/80 hover:bg-white border border-neutral-300 backdrop-blur-md transition-all shadow-sm hover:text-black"
        >
          ← Back to Homepage
        </a>
      </div>

      <SculptureHero
        brand="Vozon AI"
        eyebrow="Independent Studio — Liquid Particle Engine"
        headline={"Form that\nanswers back."}
        headlineAccent="answers back."
        body="The sculpture is rebuilt from ~100k GPU-simulated particles sampled from its own pixels. Move your cursor over the sculpture to turn the material liquid."
        primaryCta={{ label: "Start a project", href: "/login" }}
        secondaryCta={{ label: "Selected work", href: "/business" }}
        backdropText="FORMA"
        theme="light"
        themeToggle={true}
        height="100vh"
      />
    </div>
  );
}
