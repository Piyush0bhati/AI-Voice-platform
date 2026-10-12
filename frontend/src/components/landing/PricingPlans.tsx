import Link from "next/link";

const included = [
  "Voice model and provider choices",
  "Telephony and workflow connections",
  "Call logs and usage visibility",
] as const;

export function PricingPlans() {
  return (
    <section className="vozon-home-pricing pt-15 pt-md-20 pt-lg-30 position-relative">
      <div className="container">
        <div className="row align-items-end justify-content-between g-6 g-lg-10">
          <div className="col-lg-7 col-xxl-6">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm fw-semibold text-dark">
              <span className="vozon-review-dot" aria-hidden="true" />
              Pricing
            </div>
            <div className="mb-6" />
            <h2 className="ss-text-reveal-blur mb-0">Pay for the voice stack you use.</h2>
          </div>
          <div className="col-lg-4">
            <p className="mb-0 text-muted">Per-minute pricing varies with the model, voice provider, and telephony route selected for the agent.</p>
          </div>
        </div>

        <div className="mb-10 mb-xl-15" />

        <div className="vozon-pricing-summary">
          <div className="vozon-pricing-rate">
            <span>Pay as you go</span>
            <strong>₹3–₹6</strong>
            <p>per minute, based on the configured model stack</p>
          </div>
          <div className="vozon-pricing-included">
            {included.map((item) => <div key={item}><i aria-hidden="true">✓</i>{item}</div>)}
          </div>
          <div className="vozon-pricing-actions">
            <Link className="btn btn-dark rounded-pill px-6 py-3 fw-semibold" href="/pricing">View pricing details</Link>
            <Link className="btn btn-outline-dark rounded-pill px-6 py-3 fw-semibold" href="/contact">Talk to sales</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
