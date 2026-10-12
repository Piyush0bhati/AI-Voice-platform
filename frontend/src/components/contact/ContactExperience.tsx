"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { API_URL } from "@/lib/apiBase";
import "@/components/contact/ContactExperience.css";

const cards = [
  { type: "address", title: "Our Address", lines: ["Behind Manyata Tech Park, Hebbal,", "Bangalore 560077, India."], href: "https://maps.google.com/?q=Manyata+Tech+Park+Hebbal+Bangalore" },
  { type: "email", title: "Email Us", lines: ["hello@vozon.ai"], href: "mailto:hello@vozon.ai" },
  { type: "phone", title: "Call Us", lines: ["+91 78925 18414"], href: "tel:+917892518414" },
] as const;

function ContactIcon({ type }: { type: "address" | "email" | "phone" }) {
  if (type === "address") return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 35s11-9.4 11-20A11 11 0 0 0 9 15c0 10.6 11 20 11 20Z"/><circle cx="20" cy="15" r="4"/></svg>;
  if (type === "email") return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 11h24a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-8"/><path d="m10 14 10 8 10-8M4 27h10M4 21h7"/></svg>;
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M12 6h7l3 8-5 3a25 25 0 0 0 7 7l3-5 8 3v7c0 3-2 5-5 5C17 33 7 23 6 10c0-3 2-4 6-4Z"/><path d="M26 7c4 1 7 4 8 8M26 12c2 .5 3.5 2 4 4"/></svg>;
}

export function ContactExperience() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const phone = new URLSearchParams(window.location.search).get("phone");
    if (phone && phoneInputRef.current) phoneInputRef.current.value = phone.replace(/[^+\d\s()-]/g, "").slice(0, 40);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const parts = String(values.get("name") ?? "").trim().split(/\s+/).filter(Boolean);
    const firstName = parts.shift() || "Customer";
    const lastName = parts.join(" ") || "Enquiry";
    const subject = String(values.get("subject") ?? "").trim();
    const payload = {
      firstName,
      lastName,
      email: String(values.get("email") ?? "").trim(),
      phone: String(values.get("phone") ?? "").trim(),
      company: subject,
      inquiry: "Other",
      message: String(values.get("message") ?? "").trim(),
      website: String(values.get("website") ?? "").trim(),
    };
    setIsSubmitting(true);
    setStatus("");
    try {
      const response = await fetch(`${API_URL}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not send your message. Please try again.");
      form.reset();
      setStatus(result.message || "Thanks — your message has been sent to our team.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Please email hello@vozon.ai directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="vozon-contact" id="contact-page">
      <section className="contact-reference-hero">
        <div className="contact-hero-gridlines" aria-hidden="true" />
        <div className="contact-hero-orbit" aria-hidden="true" />
        <div className="contact-shell contact-hero-layout">
          <div className="contact-hero-content">
            <span className="contact-kicker" data-ss-reveal><i />Start a conversation</span>
            <h1 data-ss-reveal data-delay="0.08">Let’s build a better way to <em>answer every call.</em></h1>
            <p data-ss-reveal data-delay="0.16">Tell us what your customers need, how your team works, and where a voice agent could help. We’ll turn that context into a practical rollout plan.</p>
            <div className="contact-hero-actions" data-ss-reveal data-delay="0.24">
              <a href="#contact-form">Plan your workflow <span aria-hidden="true">↓</span></a>
              <a href="mailto:hello@vozon.ai">Email us directly <span aria-hidden="true">↗</span></a>
            </div>
            <nav aria-label="Breadcrumb" data-ss-reveal data-delay="0.3"><Link href="/">Home</Link><i>/</i><span>Contact</span></nav>
          </div>

          <div className="contact-hero-console ss-parallax-area" data-ss-reveal data-x="56" data-duration="0.9" aria-label="Vozon project planning flow">
            <header><span><i />Project brief</span><em>Ready</em></header>
            <div className="contact-console-core">
              <div className="contact-console-wave" aria-hidden="true">{Array.from({ length: 19 }, (_, index) => <i key={index} />)}</div>
              <small>Tell us about your calls</small>
              <strong>From first idea to a production-ready workflow.</strong>
            </div>
            <div className="contact-console-steps">
              <p><i>01</i><span><b>Share the use case</b><small>Call type, volume, and customer need</small></span><em>Context</em></p>
              <p><i>02</i><span><b>Map the workflow</b><small>Knowledge, tools, actions, and handoffs</small></span><em>Design</em></p>
              <p><i>03</i><span><b>Plan the rollout</b><small>Testing, launch, and improvement</small></span><em>Build</em></p>
            </div>
            <footer><span>Voice</span><span>Integrations</span><span>Operations</span></footer>
          </div>
        </div>
      </section>

      <section className="contact-motion-ribbon" aria-label="Ways to work with Vozon"><div>{["Voice agents", "Enterprise rollout", "White-label partners", "Connected workflows", "Voice agents", "Enterprise rollout", "White-label partners", "Connected workflows"].map((item, index) => <span aria-hidden={index > 3 || undefined} key={`${item}-${index}`}><i />{item}</span>)}</div></section>

      <section className="contact-reference-main" id="contact-form">
        <div className="contact-shell">
          <div className="contact-section-heading" data-ss-reveal>
            <div><span>Contact Vozon</span><h2>Bring us the call. We’ll help shape the system around it.</h2></div>
            <p>Share as much context as you have today. Our team can help clarify the workflow, integrations, language needs, controls, and next practical step.</p>
          </div>
          <div className="contact-reference-grid">
            <aside className="contact-info-stack" data-ss-reveal-group="" data-y="34" aria-label="Contact information">
              {cards.map((card) => (
                <a href={card.href} key={card.title} target={card.type === "address" ? "_blank" : undefined} rel={card.type === "address" ? "noreferrer" : undefined}>
                  <ContactIcon type={card.type} />
                  <h2>{card.title}</h2>
                  {card.lines.map((line) => <p key={line}>{line}</p>)}
                </a>
              ))}
            </aside>

            <form aria-busy={isSubmitting} className="contact-reference-form" data-ss-reveal="" data-x="42" onSubmit={handleSubmit}>
              <div className="contact-field-row">
                <label><span>Your Name</span><input aria-label="Your Name" name="name" placeholder="Your Name" required /></label>
                <label><span>Phone Number</span><input aria-label="Phone Number" inputMode="tel" name="phone" placeholder="Phone Number" ref={phoneInputRef} /></label>
              </div>
              <label><span>Your Email</span><input aria-label="Your Email" name="email" placeholder="Your Email" required type="email" /></label>
              <label><span>Subject</span><input aria-label="Subject" name="subject" placeholder="Subject" required /></label>
              <label><span>Write a Message</span><textarea aria-label="Write a Message" name="message" placeholder="Write a Message" required /></label>
              <label className="contact-consent"><input required type="checkbox" /><span>I agree that Vozon may contact me about this enquiry.</span></label>
              <label className="contact-honeypot" aria-hidden="true">Website<input autoComplete="off" name="website" tabIndex={-1} /></label>
              <button disabled={isSubmitting} type="submit">{isSubmitting ? "Sending…" : "Submit"}</button>
              <p aria-live="polite" className="contact-form-status">{status}</p>
            </form>
          </div>

          <div className="contact-map" data-ss-reveal="" data-y="34">
            <iframe allowFullScreen aria-label="Vozon Bangalore office map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C13.02%2C77.65%2C13.08&layer=mapnik&marker=13.048%2C77.621" title="Vozon Bangalore office" />
          </div>
        </div>
      </section>
    </main>
  );
}
