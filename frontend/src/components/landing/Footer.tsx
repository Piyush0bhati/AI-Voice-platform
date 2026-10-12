"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { footerNavigationGroups } from "@/config/footerNavigation";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <section className={styles.navCard}>
        <aside className={styles.trialCard}>
          <div className={styles.trialTop}>
            <BrandLogo showWebsiteLogo />
            <small>Voice AI platform</small>
          </div>
          <h3>Start building real voice workflows.</h3>
          <p>Create, test, deploy, and monitor AI voice agents from one production workspace.</p>
          <div className={styles.actions}>
            <Link href="/dashboard">Start building</Link>
            <Link href="/contact">Contact sales</Link>
          </div>
        </aside>

        <div className={styles.directory}>
          <nav aria-label="Footer navigation" className={styles.groups}>
            {footerNavigationGroups.map((group) => (
              <div className={styles.group} key={group.title}>
                <h4>{group.title}</h4>
                <ul>{group.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
              </div>
            ))}
          </nav>
          <div className={styles.legal}>
            <span>© {new Date().getFullYear()} Vozon AI Technologies Private Limited.</span>
            <div className={styles.legalLinks}>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Support</Link>
              <a href="https://linkedin.com/company/vozon-ai-india/" rel="noreferrer" target="_blank">LinkedIn</a>
              <a href="https://x.com/vozonai_" rel="noreferrer" target="_blank">X</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
