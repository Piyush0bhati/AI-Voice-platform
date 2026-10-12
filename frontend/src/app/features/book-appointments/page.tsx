import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { RetellAppointmentBookingSection } from "@/components/landing/RetellAppointmentBookingSection";

export const metadata: Metadata = {
  title: "AI Appointment Scheduling with Voice AI Booking Assistant | Vozon",
  description:
    "Simplify AI appointment scheduling with Vozon. Our AI booking agent checks availability, confirms slots, and sends reminders with sub-450ms latency.",
  alternates: { canonical: "/features/book-appointments" },
};

export default function BookAppointmentsFeaturePage() {
  return (
    <SiteLayout>
      <main className="book-appointments-page">
        {/* Arsly Signature Page Header */}
        <section className="page-header bg-light position-relative pb-6 pb-xl-15 pt-25 pt-md-25 pt-xl-40 overflow-hidden">
          <div className="grid-pattern position-absolute inset-0" />
          <div className="overlay position-absolute inset-0" />
          <Image
            alt="circle shape"
            className="circle-shape position-absolute top-50 end-0 translate-middle-y"
            height={762}
            priority
            src="/img/shapes/circle-shape.svg"
            width={1200}
          />
          <div className="container position-relative z-1">
            <div className="row">
              <div className="col-xl-8 col-xxl-6">
                <span className="badge bg-white border rounded-2 shadow-sm d-inline-flex align-items-center gap-3 px-5 py-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-circle bg-success"></span>
                  <span className="fs-7 text-dark fw-medium">Core Feature</span>
                </span>
                <h1 className="section-title ss-text-reveal-blur display-4 fw-bold text-dark mb-4">
                  AI Appointment Scheduling
                </h1>
                <div className="mb-6" />
                <p className="fs-md text-muted mb-4" data-ss-reveal="" data-y="50">
                  Automate appointment scheduling with conversational AI that checks real-time availability, confirms time slots, and eliminates manual back-and-forth scheduling.
                </p>
                <div className="mb-10 mb-xl-15" />
                <nav aria-label="breadcrumb" data-ss-reveal="true" data-y="50">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className="animated-link d-inline-flex align-items-center gap-2 text-decoration-none text-muted" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="currentColor" viewBox="0 0 21 18" width="16" height="16">
                          <path d="M7.4 18a1 1 0 0 0 1-1v-4.353a1 1 0 0 1 1-1h2.2a1 1 0 0 1 1 1V17a1 1 0 0 0 1 1h3.25a1 1 0 0 0 1-1v-6.593c0-.485.393-.878.877-.878.803 0 1.184-.988.59-1.527L11.172.61a1 1 0 0 0-1.344 0L1.683 8.002c-.594.54-.213 1.527.59 1.527.484 0 .877.393.877.878V17a1 1 0 0 0 1 1H7.4Z" />
                        </svg>
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link className="animated-link text-decoration-none text-muted" href="/product">
                        Features
                      </Link>
                    </li>
                    <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                      Book Appointments
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {/* Retell-Style Appointment Booking Interactive Feature Suite */}
        <RetellAppointmentBookingSection />
      </main>
    </SiteLayout>
  );
}
