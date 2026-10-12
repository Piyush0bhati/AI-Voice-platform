import Link from "next/link";

import "@/components/layout/SectionLandingHero.css";

type SectionLandingHeroProps = {
  eyebrow: string;
  title: string;
  summary: string;
  current?: string;
};

export function SectionLandingHero({ eyebrow, title, summary, current = title }: SectionLandingHeroProps) {
  return (
    <section className="section-landing-hero">
      <div className="section-landing-orbit" aria-hidden="true" />
      <div className="section-landing-shell" data-ss-reveal-group="" data-y="38">
        <span className="section-landing-kicker"><i />{eyebrow}</span>
        <h1>{title}</h1>
        <p>{summary}</p>
        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><i>/</i><span>{current}</span></nav>
      </div>
    </section>
  );
}
