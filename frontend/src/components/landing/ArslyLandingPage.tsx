"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { HeroSection } from "./HeroSection";
import { PartnersMarquee } from "./PartnersMarquee";
import { SmartFeatures } from "./SmartFeatures";
import { AboutEngineering } from "./AboutEngineering";
import { StickyEnterprise } from "./StickyEnterprise";
import { MultipleAgents } from "./MultipleAgents";
import { ThreeSteps } from "./ThreeSteps";
import { AdvantageFeatures } from "./AdvantageFeatures";
import { Testimonials } from "./Testimonials";
import { PricingPlans } from "./PricingPlans";
import { FaqSection } from "./FaqSection";
import { BlogSection } from "./BlogSection";
import { Footer } from "./Footer";
import { LandingAnimationEngine } from "./LandingAnimationEngine";

export function ArslyLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="arsly-theme main--body position-relative">
      <LandingAnimationEngine />
      <Header onOpenMobile={() => setMobileMenuOpen(true)} />
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroSection />
            <PartnersMarquee />
            <SmartFeatures />
            <AboutEngineering />
            <StickyEnterprise />
            <MultipleAgents />
            <ThreeSteps />
            <AdvantageFeatures />
            <Testimonials />
            <PricingPlans />
            <FaqSection />
            <BlogSection />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
