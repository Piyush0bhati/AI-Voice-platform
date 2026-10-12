"use client";

import { type ReactNode, useState } from "react";

import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { LandingAnimationEngine } from "@/components/landing/LandingAnimationEngine";
import { MobileNav } from "@/components/landing/MobileNav";
import "@/components/layout/WebsiteContentTheme.css";

type SiteLayoutProps = {
  children: ReactNode;
  showFooter?: boolean;
};

export function SiteLayout({ children, showFooter = true }: SiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Urbanist:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
        rel="stylesheet"
      />
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/arsly-scoped.css" />
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/arsly-animations.css" />
      {/* Loaded last so every public route uses the homepage typography contract. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/public-site-typography.css" />
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/site-cleanup.css" />

      <div className="arsly-theme public-site main--body position-relative" id="public-site">
        <LandingAnimationEngine />
        <Header onOpenMobile={() => setMobileMenuOpen(true)} />
        <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="marketing-site min-h-screen [overflow-x:clip] bg-white text-[#111113]">
              <div className="website-content min-h-screen">{children}</div>
            </div>
            {showFooter ? <Footer /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
