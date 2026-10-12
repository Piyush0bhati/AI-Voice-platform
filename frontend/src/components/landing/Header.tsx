"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { integrations } from "@/config/integrationCatalog";

type MenuName = "products" | "solutions" | "integrations" | "company";

const productGroups = [
  {
    label: "Build",
    links: [
      ["AI Voice Agents", "Handle natural inbound and outbound calls", "/services/voice-agents"],
      ["Brand Voice", "Create approved, reusable voices", "/services/voice-cloning"],
      ["Live Voice Generation", "Stream speech with low latency", "/services/realtime-tts"],
      ["Multilingual Calls", "Serve customers in their language", "/services/multilingual-speech"],
    ],
  },
  {
    label: "Deploy",
    links: [
      ["Developer API", "Embed calls, speech, and events", "/services/api-access"],
      ["Team Operations", "Coordinate agents and approvals", "/services/team-workflows"],
      ["Call Analytics", "Turn calls into structured insight", "/services/speech-analytics"],
    ],
  },
  {
    label: "Monitor",
    links: [
      ["Sentiment Signals", "Detect customer emotion and urgency", "/services/sentiment-detection"],
      ["Conversation Intelligence", "See trends across every call", "/services/conversation-insights"],
      ["Quality Assurance", "Review and improve reliability", "/services/quality-controls"],
    ],
  },
] as const;

const solutionGroups = [
  {
    label: "Industries",
    links: [
      ["Healthcare", "Patient access and scheduling", "/business/industries/healthcare"],
      ["Financial Services", "Secure customer conversations", "/business/industries/financial-services"],
      ["Insurance", "Claims, policy, and renewal calls", "/business/industries/insurance"],
      ["Retail & E-commerce", "Orders, service, and campaigns", "/business/industries/retail-consumer"],
    ],
  },
  {
    label: "Use Cases",
    links: [
      ["Lead Qualification", "Capture fit, intent, and next steps", "/business/lead-qualification"],
      ["Customer Support", "Resolve routine requests quickly", "/business/customer-support"],
      ["AI Receptionist", "Answer and route every call", "/business/receptionists"],
      ["Dispatch Services", "Coordinate urgent field work", "/business/dispatch-service"],
    ],
  },
] as const;

const integrationGroups = [
  {
    label: "Connect",
    links: integrations.slice(0, 4).map((item) => [
      item.name,
      item.description,
      `/integrations/${item.slug}`,
    ] as const),
  },
  {
    label: "Extend",
    links: [
      ...integrations.slice(4, 7).map((item) => [
        item.name,
        item.description,
        `/integrations/${item.slug}`,
      ] as const),
      ["All integrations", "Browse every supported connection", "/integrations"] as const,
    ],
  },
] as const;

const companyLinks = [
  ["About Us", "/about"],
  ["Team", "/team"],
  ["Careers", "/career"],
  ["Partners", "/partners"],
  ["Blog & Insights", "/resources/blog"],
  ["Contact", "/contact"],
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="landing-nav-chevron"
      viewBox="0 0 12 7"
      style={{ transform: open ? "rotate(180deg)" : undefined }}
    >
      <path d="m1 1 5 5 5-5" />
    </svg>
  );
}

export function Header({ onOpenMobile }: { onOpenMobile: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = (menu: MenuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const scheduleClose = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 160);
  };

  const toggleMenu = (menu: MenuName) => {
    setActiveMenu((current) => (current === menu ? null : menu));
  };

  return (
    <header className={`header landing-header position-fixed top-0 w-full ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="navbar navbar-expand-xl">
        <div className="container landing-header-inner">
          <div className="landing-brand">
            <BrandLogo showWebsiteLogo />
          </div>

          <div className="d-none d-xl-flex align-items-center flex-fill landing-desktop-nav">
            <ul className="navbar-nav align-items-center mx-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/" onClick={() => setActiveMenu(null)}>Home</Link>
              </li>

              {([[
                "Products", "products",
              ], [
                "Solutions", "solutions",
              ], [
                "Integrations", "integrations",
              ]] as const).map(([label, menu]) => (
                <li
                  className="nav-item dropdown"
                  key={menu}
                  onMouseEnter={() => openMenu(menu)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className="nav-link landing-nav-trigger"
                    aria-expanded={activeMenu === menu}
                    aria-haspopup="menu"
                    onClick={() => toggleMenu(menu)}
                  >
                    {label}<Chevron open={activeMenu === menu} />
                  </button>
                  <div
                    className={`landing-dropdown landing-reference-mega ${menu === "integrations" ? "landing-integration-mega" : ""}`}
                    role="menu"
                    onMouseEnter={() => openMenu(menu)}
                    onMouseLeave={scheduleClose}
                  >
                    {(menu === "products" ? productGroups : menu === "solutions" ? solutionGroups : integrationGroups).map((group) => (
                      <div className="landing-menu-column" key={group.label}>
                        <p>{group.label}</p>
                        {group.links.map(([text, description, href]) => (
                          <Link href={href} key={href} role="menuitem" onClick={() => setActiveMenu(null)}><strong>{text}</strong><span>{description}</span></Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </li>
              ))}

              <li className="nav-item">
                <Link className="nav-link" href="/pricing" onClick={() => setActiveMenu(null)}>Pricing</Link>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={() => openMenu("company")}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className="nav-link landing-nav-trigger"
                  aria-expanded={activeMenu === "company"}
                  aria-haspopup="menu"
                  onClick={() => toggleMenu("company")}
                >
                  Company<Chevron open={activeMenu === "company"} />
                </button>
                <div
                  className="landing-dropdown landing-reference-list"
                  role="menu"
                  onMouseEnter={() => openMenu("company")}
                  onMouseLeave={scheduleClose}
                >
                  <p>Company</p>
                  {companyLinks.map(([text, href]) => (
                    <Link href={href} key={href} role="menuitem" onClick={() => setActiveMenu(null)}>{text}</Link>
                  ))}
                </div>
              </li>
            </ul>

            <div className="landing-header-actions">
              <Link className="landing-dashboard-button" href="/login?next=/dashboard">Dashboard</Link>
              <Link className="landing-contact-button" href="/contact">
                Contact Sales<span aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="d-flex d-xl-none align-items-center gap-2 ms-auto">
            <Link className="landing-mobile-contact" href="/login?next=/dashboard">Dashboard</Link>
            <button className="landing-menu-button" type="button" onClick={onOpenMobile} aria-label="Open mobile menu">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
