"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { integrations } from "@/config/integrationCatalog";
import { siteConfig } from "@/config/site";

type MenuKey = "products" | "solutions" | "integrations" | "company";

const companyLinks = [
  { href: "/company", label: "Company Overview" },
  { href: "/about", label: "About Us" },
  { href: "/career", label: "Careers" },
  { href: "/partners", label: "Partners" },
  { href: "/resources/blog", label: "Blog & Insights" },
  { href: "/contact", label: "Contact" },
] as const;

const integrationGroups = [
  {
    title: "Connect",
    links: integrations.slice(0, 4).map((item) => ({ href: `/integrations/${item.slug}`, label: item.name })),
  },
  {
    title: "Extend",
    links: [
      ...integrations.slice(4, 7).map((item) => ({ href: `/integrations/${item.slug}`, label: item.name })),
      { href: "/integrations", label: "View all integrations" },
    ],
  },
] as const;

function Chevron() {
  return <svg aria-hidden="true" viewBox="0 0 12 7"><path d="m1 1 5 5 5-5" /></svg>;
}

function HeaderMenu({
  active,
  children,
  label,
  menu,
  onClose,
  onToggle,
  wide = false,
}: {
  active: boolean;
  children: React.ReactNode;
  label: string;
  menu: MenuKey;
  onClose: () => void;
  onToggle: (menu: MenuKey) => void;
  wide?: boolean;
}) {
  return (
    <li className={`site-header-menu${active ? " is-open" : ""}`}>
      <button aria-expanded={active} aria-haspopup="menu" onClick={() => onToggle(menu)} type="button">
        {label}<Chevron />
      </button>
      <div className={`site-header-dropdown${wide ? " is-wide" : ""}`} role="menu" onClick={onClose}>
        {children}
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const toggleMenu = (menu: MenuKey) => {
    setActiveMenu((current) => (current === menu ? null : menu));
  };

  const productActive = pathname.startsWith("/product") || pathname.startsWith("/services");
  const solutionActive = pathname.startsWith("/business");
  const integrationActive = pathname.startsWith("/integrations");
  const companyActive = ["/company", "/about", "/career", "/partners", "/resources", "/contact"].some((route) => pathname.startsWith(route));

  return (
    <header className="site-reference-header">
      <div className="site-reference-header-inner">
        <div className="site-reference-brand"><BrandLogo showWebsiteLogo /></div>

        <nav aria-label="Main navigation" className="site-reference-nav">
          <ul>
            <li><Link className={pathname === "/" ? "is-active" : ""} href="/" onClick={closeAll}>Home</Link></li>
            <HeaderMenu active={activeMenu === "products"} label="Products" menu="products" onClose={closeAll} onToggle={toggleMenu} wide>
              {siteConfig.productMenu.groups.map((group) => (
                <div className="site-header-menu-column" key={group.title}>
                  <p>{group.title}</p>
                  {group.links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
                </div>
              ))}
            </HeaderMenu>
            <HeaderMenu active={activeMenu === "solutions"} label="Solutions" menu="solutions" onClose={closeAll} onToggle={toggleMenu} wide>
              {siteConfig.businessMenu.columns.map((group) => (
                <div className="site-header-menu-column" key={group.title}>
                  <p>{group.title}</p>
                  {group.links.slice(0, 6).map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
                </div>
              ))}
            </HeaderMenu>
            <HeaderMenu active={activeMenu === "integrations"} label="Integrations" menu="integrations" onClose={closeAll} onToggle={toggleMenu} wide>
              {integrationGroups.map((group) => (
                <div className="site-header-menu-column" key={group.title}>
                  <p>{group.title}</p>
                  {group.links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
                </div>
              ))}
            </HeaderMenu>
            <li><Link className={pathname === "/pricing" ? "is-active" : ""} href="/pricing" onClick={closeAll}>Pricing</Link></li>
            <HeaderMenu active={activeMenu === "company"} label="Company" menu="company" onClose={closeAll} onToggle={toggleMenu}>
              <div className="site-header-menu-column">
                <p>Company</p>
                {companyLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
              </div>
            </HeaderMenu>
          </ul>
        </nav>

        <div className="site-reference-actions">
          <Link className="site-reference-dashboard" href="/login?next=/dashboard">Dashboard</Link>
          <Link className="site-reference-contact" href="/contact">Contact Sales<span aria-hidden="true" /></Link>
        </div>
        <Link className="site-reference-mobile-dashboard" href="/login?next=/dashboard">Dashboard</Link>
        <button
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          className="site-reference-mobile-toggle"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d={mobileOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>

        {mobileOpen ? (
          <nav aria-label="Mobile navigation" className="site-reference-mobile-nav">
            <Link href="/" onClick={closeAll}>Home</Link>
            <Link className={productActive ? "is-active" : ""} href="/product" onClick={closeAll}>Products</Link>
            <Link className={solutionActive ? "is-active" : ""} href="/business" onClick={closeAll}>Solutions</Link>
            <Link className={integrationActive ? "is-active" : ""} href="/integrations" onClick={closeAll}>Integrations</Link>
            <Link className={pathname === "/pricing" ? "is-active" : ""} href="/pricing" onClick={closeAll}>Pricing</Link>
            <Link className={companyActive ? "is-active" : ""} href="/company" onClick={closeAll}>Company</Link>
            <div><Link href="/login?next=/dashboard" onClick={closeAll}>Log in / Sign up</Link><Link href="/contact" onClick={closeAll}>Contact Sales</Link></div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
