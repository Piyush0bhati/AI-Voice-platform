import { customerReviews } from "@/config/customerReviews";

export function Testimonials() {
  return (
    <section className="vozon-testimonials vozon-testimonials-clean pt-15 pt-md-20 pt-lg-30 position-relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-xxl-7 mx-auto text-center">
            <div className="bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 lh-sm fw-semibold text-dark">
              <span className="vozon-review-dot" aria-hidden="true" />
              Customer feedback
            </div>
            <div className="mb-6" />
            <h2 className="ss-text-reveal-blur mb-0">What people shared with Vozon.</h2>
          </div>
        </div>
      </div>

      <div className="mb-10 mb-xl-15" />

      <div className="vozon-testimonial-grid" data-ss-reveal-group data-y="28" data-stagger="0.06">
        {customerReviews.map((review, index) => (
          <article
            className="vozon-testimonial-square"
            key={review.name}
            aria-label={`Review from ${review.name}`}
          >
            <header><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /></header>
            <blockquote>{review.quote}</blockquote>
            <footer><h3>{review.name}</h3><p>{review.role}</p></footer>
          </article>
        ))}
      </div>
    </section>
  );
}
