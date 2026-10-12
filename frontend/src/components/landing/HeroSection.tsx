"use client";

import React from "react";
import Link from "next/link";
import { TalkToAgentWidget } from "@/components/sections/TalkToAgentWidget";
import phoneStyles from "./HeroPhoneDemo.module.css";

export function HeroSection() {
  return (
    <section className="hero-section bg-light position-relative overflow-hidden pt-30 pt-xl-40 ss-parallax-area">
      <div className="grid-pattern"></div>
      <div className="overlay"></div>

      {/* Floating Parallax Shapes */}
      <div data-ss-reveal-group="" data-y="50">
        <div
          className="shape shape-1 ss-parallax-item d-none d-lg-block"
          data-parallax-strength="15"
          style={{ position: "absolute", zIndex: 2 }}
        >
          <img
            alt="AI Decision System"
            loading="lazy"
            width="190"
            height="80"
            src="/img/shapes/p1.webp"
          />
        </div>
        <div
          className="shape shape-2 ss-parallax-item d-none d-lg-block"
          data-parallax-strength="20"
          style={{ position: "absolute", zIndex: 2 }}
        >
          <img
            alt="Multi-Agent Collaboration"
            loading="lazy"
            width="260"
            height="80"
            src="/img/shapes/p2.webp"
          />
        </div>
        <div
          className="shape shape-3 ss-parallax-item"
          data-parallax-strength="35"
          style={{ position: "absolute", zIndex: 2 }}
        >
          <img
            alt="Voice Synthesis Node"
            loading="lazy"
            width="96"
            height="90"
            src="/img/shapes/p3.webp"
          />
        </div>
        <div
          className="shape shape-4 ss-parallax-item"
          data-parallax-strength="35"
          style={{ position: "absolute", zIndex: 2 }}
        >
          <img
            alt="Autonomous Orchestration"
            loading="lazy"
            width="97"
            height="91"
            src="/img/shapes/p4.webp"
          />
        </div>
      </div>

      <div className="container position-relative z-1">
        <div className="row g-0 justify-content-center">
          <div className="col-xxl-9 col-xl-10">
            <div className="text-center" data-ss-reveal-group="" data-y="50">
              {/* Tagline Badge */}
              <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm text-center fw-semibold text-dark mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5 text-primary"
                  viewBox="0 0 20 20"
                >
                  <path d="M4.45 9.974c2.4-3.858 5.277-7.142 9.53-9.032.715 2.713 2.41 4.406 5.137 5.076-.21.596-.493 1.149-.798 1.69-.772 1.369-1.742 2.587-2.845 3.703-1.601 1.619-3.41 2.972-5.398 4.167-.324-.324-.637-.67-.987-.975-.292-.252-.375-.486-.228-.87.178-.464.191-.966.05-1.458a1.69 1.69 0 0 0-1.527-1.251 3.04 3.04 0 0 0-1.343.179c-.188.07-.307.044-.446-.098-.362-.373-.738-.732-1.146-1.131m11.348-2.853a2.897 2.897 0 0 0-2.934-2.914 2.924 2.924 0 0 0-2.916 2.904c-.012 1.606 1.308 2.935 2.926 2.944 1.611.008 2.925-1.31 2.924-2.934"></path>
                  <path d="M19.527 4.826c-2.04-.11-4.196-2.23-4.352-4.273.073-.03.151-.068.233-.091a11.5 11.5 0 0 1 3.74-.45q.099.001.195.01c.415.055.611.236.636.654.025.454.036.911.013 1.366a11.4 11.4 0 0 1-.465 2.783zM6.954 12.18c.653-.003.873.206.872.725a2.17 2.17 0 0 1-.636 1.55c-1.1 1.13-2.274 2.177-3.647 2.977a4 4 0 0 1-.24.13c-.336.167-.589.152-.793-.047-.207-.2-.25-.467-.062-.787.304-.514.598-1.043.971-1.505a45 45 0 0 1 2.002-2.29 2.32 2.32 0 0 1 1.533-.753m-4.047-1.954c-.605-.11-1.193.004-1.78.128-.152.032-.303.08-.457.1a.56.56 0 0 1-.59-.295c-.123-.213-.1-.423.039-.623a.6.6 0 0 1 .074-.091c.668-.659 1.317-1.337 2.009-1.969a4.2 4.2 0 0 1 2.113-1.03c.334-.06.671-.083 1.012.073-.804 1.232-1.604 2.455-2.42 3.707m6.939 6.861c-.017.013.022-.021.065-.049 1.184-.748 2.369-1.494 3.581-2.258.117.262.114.551.07.844a4.34 4.34 0 0 1-1.127 2.356c-.575.619-1.186 1.204-1.785 1.802a.9.9 0 0 1-.22.158.57.57 0 0 1-.818-.44c-.014-.115-.001-.233.01-.35.071-.67.144-1.34.223-2.064zM8.065 15.27l.912.946c-.32.174-.656.359-.994.54q-.29.154-.588.3c-.463.227-.621.194-1.006-.222zm-4.226-4.24.9.912c-.25.261-.518.536-.779.818-.263.284-.518.574-.778.86-.343-.319-.4-.509-.223-.87.279-.57.577-1.13.88-1.72m9.031-5.652a1.733 1.733 0 0 1 1.756 1.748c0 .973-.793 1.766-1.759 1.759a1.783 1.783 0 0 1-1.749-1.742c-.017-.959.78-1.761 1.752-1.765"></path>
                </svg>
                Next-Gen Multi-Agent Voice Intelligence
              </div>

              {/* Main Headline */}
              <h1 className="ss-text-reveal-blur mb-6">
                Build Smarter AI With Multi-Agent Voice Intelligence.
              </h1>

              {/* Tagline / Subtitle */}
              <p className="fs-md mb-8 mw-md-3quarter mx-auto text-muted">
                Build voice agents for inbound enquiries, outbound workflows, appointments, and connected customer operations. Choose the language, voice, and model stack that fits each agent.
              </p>

              {/* Action Buttons */}
              <div className="hstack flex-wrap gap-4 justify-content-center">
                <Link className="btn btn-primary has-icon" href="/dashboard">
                  Open Dashboard
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                      <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                    </svg>
                  </div>
                </Link>
                <Link className="btn btn-dark has-icon" href="/contact">
                  Book a Live Demo
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M15 7a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2z"></path>
                      <path d="M7.293.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L13.586 8 7.293 1.707a1 1 0 0 1 0-1.414"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20 mb-xl-30"></div>

        {/* Keep the original phone artwork and place the live call controls on its screen. */}
        <div className={`hero-img-container position-relative mx-auto text-center ${phoneStyles.preview}`} style={{ maxWidth: 1080 }}>
          <img
            alt="Try a Vozon AI agent by phone"
            loading="lazy"
            width="1195"
            height="760"
            className="img-fluid hero-img"
            src="/img/content/app/app-preview-3.webp"
          />
          <div className={phoneStyles.phoneOverlay} aria-label="Live Vozon call demo">
            <TalkToAgentWidget variant="landing" />
          </div>
          <img
            alt="Agent Performance"
            loading="lazy"
            width="250"
            height="280"
            className="img-fluid hero-app-screen hero-app-screen-1 d-none d-md-block shadow-lg rounded-4"
            src="/img/content/app/app-screen-1.webp"
          />
          <img
            alt="Live Telephony Stream"
            loading="lazy"
            width="350"
            height="300"
            className="img-fluid hero-app-screen hero-app-screen-2 d-none d-md-block shadow-lg rounded-4"
            src="/img/content/app/app-screen-2.webp"
          />
        </div>
      </div>
    </section>
  );
}
