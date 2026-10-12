import type { Metadata } from "next";
import { ArslyLandingPage } from "@/components/landing/ArslyLandingPage";

export const metadata: Metadata = {
  title: "Vozon | Multi-Agent Voice AI Platform",
  description: "Build Smarter AI With Multi-Agent Voice Intelligence. Autonomous voice agents that speak, reason, and resolve calls in real time.",
  alternates: { canonical: "/" },
};

export default function Home() {
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
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/site-cleanup.css" />
      <ArslyLandingPage />
    </>
  );
}
