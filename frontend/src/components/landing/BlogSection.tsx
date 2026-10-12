import Link from "next/link";

const resources = [
  { label: "Guide", title: "Plan an AI phone agent around a clear customer workflow", href: "/ai-phone-agent", tone: "mint" },
  { label: "Guide", title: "Design appointment booking that confirms the right details", href: "/ai-appointment-booking", tone: "lilac" },
  { label: "Guide", title: "Connect inbound calls to useful business actions", href: "/inbound-ai-call-agent", tone: "peach" },
] as const;

export function BlogSection() {
  return (
    <section className="vozon-resource-section py-15 py-md-20 py-lg-30 position-relative">
      <div className="container">
        <div className="row align-items-end justify-content-between g-5">
          <div className="col-lg-8 col-xxl-6">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm fw-semibold text-dark"><span className="vozon-review-dot" aria-hidden="true" />Resources</div>
            <div className="mb-6" />
            <h2 className="ss-text-reveal-blur mb-0">Practical guides for building voice workflows.</h2>
          </div>
          <div className="col-auto"><Link className="vozon-resource-all" href="/resources/blog">View all resources →</Link></div>
        </div>
        <div className="vozon-resource-grid">
          {resources.map((resource, index) => (
            <Link className={`vozon-resource-card is-${resource.tone}`} href={resource.href} key={resource.href}>
              <span>{resource.label} · 0{index + 1}</span>
              <h3>{resource.title}</h3>
              <b>Read guide <i aria-hidden="true">→</i></b>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
