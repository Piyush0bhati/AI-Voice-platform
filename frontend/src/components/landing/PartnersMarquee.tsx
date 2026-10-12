import Link from "next/link";

const capabilities = [
  "Telephony",
  "Calendars",
  "CRM",
  "Webhooks",
  "Knowledge bases",
  "Call analytics",
] as const;

export function PartnersMarquee() {
  return (
    <section className="vozon-capability-strip" aria-labelledby="capability-strip-title">
      <div className="container">
        <div className="vozon-capability-heading">
          <div>
            <span>Connected operations</span>
            <h2 id="capability-strip-title">Bring your voice workflow together.</h2>
          </div>
          <Link href="/integrations">Explore integrations <span aria-hidden="true">→</span></Link>
        </div>
        <div className="vozon-capability-list">
          {capabilities.map((capability, index) => (
            <div key={capability}>
              <span aria-hidden="true">0{index + 1}</span>
              <strong>{capability}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
