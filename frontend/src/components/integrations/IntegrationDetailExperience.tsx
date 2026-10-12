import Image from "next/image";
import type { integrations } from "@/config/integrationCatalog";
import styles from "./IntegrationDetailExperience.module.css";

type Integration = (typeof integrations)[number];

export function IntegrationDetailExperience({ integration }: { integration: Integration }) {
  return (
    <section className={styles.section} aria-label={`${integration.name} connection preview`}>
      <div className={styles.shell}>
        <div className={styles.copy} data-ss-reveal-group="" data-y="28">
          <span className={styles.kicker}>Connected workflow</span>
          <h2>Make {integration.name} part of every useful conversation.</h2>
          <p>{integration.description} Vozon keeps each action scoped, visible, and connected to the call outcome.</p>
          <div className={styles.capabilities}>
            {integration.capabilities.map((capability, index) => (
              <div key={capability}><i>{String(index + 1).padStart(2, "0")}</i><span>{capability}</span><b>Ready</b></div>
            ))}
          </div>
        </div>

        <div className={styles.visual} data-ss-reveal="" data-x="34">
          <header><span><i />Live connection</span><em>Healthy</em></header>
          <div className={styles.route}>
            <article>
              <span className={styles.vozonLogo}>V</span>
              <div><small>VOICE LAYER</small><strong>Vozon agent</strong><p>Understands the request</p></div>
            </article>
            <div className={styles.connection}><span /><b>Secure action</b><span /></div>
            <article>
              <span className={styles.integrationLogo}><Image alt="" fill sizes="48px" src={integration.logo} /></span>
              <div><small>{integration.category.toUpperCase()}</small><strong>{integration.name}</strong><p>Completes the workflow</p></div>
            </article>
          </div>
          <div className={styles.eventLog}>
            <p><i />Caller intent understood <time>0.8s</time></p>
            <p><i />Approved tool selected <time>1.1s</time></p>
            <p><i />{integration.capabilities[0]} completed <time>1.4s</time></p>
          </div>
          <footer><span>Permissions scoped</span><span>Events recorded</span><span>Fallback ready</span></footer>
        </div>
      </div>
    </section>
  );
}
