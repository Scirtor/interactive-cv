import Link from "next/link";
import { profile } from "@/data/portfolio";

export function SiteNav() {
  return (
    <header className="portfolio-nav section-wrap">
      <Link className="wordmark" href="/" aria-label="Scirtor home">
        <span className="brand-mark">S.</span>
        <span>
          SCIRTOR<span className="wordmark-sub">Nurzhan Bekmurat</span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#credentials">Credentials</Link>
        <Link href="/resume">Profile</Link>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="portfolio-footer section-wrap">
      <div>
        <strong>Let’s look closer.</strong>
        <p>
          Open to Junior Penetration Tester and Junior SOC Analyst
          opportunities.
        </p>
      </div>
      <nav aria-label="Professional links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href={profile.youtube} target="_blank" rel="noreferrer">
          DetectiveZhang ↗
        </a>
      </nav>
      <small>© 2026 Nurzhan Bekmurat · Scirtor</small>
    </footer>
  );
}
