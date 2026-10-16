import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { caseStudies, credentials, profile, projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Professional profile",
  description:
    "Nurzhan Bekmurat — junior cybersecurity specialist focused on penetration testing and SOC analysis.",
};

export default function ResumePage() {
  return (
    <>
      <SiteNav />
      <main className="resume-page section-wrap">
        <p className="eyebrow">Professional profile</p>
        <h1>Nurzhan Bekmurat</h1>
        <p className="case-lead">
          {profile.role}
          <br />
          {profile.focus}
        </p>
        <p>
          Astana, Kazakhstan · Open to Junior Penetration Tester and Junior SOC
          Analyst roles
        </p>
        <div className="hero-actions">
          <a
            className="button"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            Contact on LinkedIn ↗
          </a>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
        <section>
          <h2>Profile</h2>
          <p>
            I combine CTF practice and blue-team labs with software development.
            I focus on understanding system behaviour, documenting evidence and
            explaining findings clearly.
          </p>
        </section>
        <section>
          <h2>Skills and practice</h2>
          <ul>
            <li>
              Security labs: web application testing, email triage, static
              executable analysis, OSINT and CTF problem solving.
            </li>
            <li>Tools: Python, Linux, Burp Suite, Nmap, Wireshark and Git.</li>
            <li>
              Development: Django, PostgreSQL, TypeScript, Next.js and
              Python/Pygame.
            </li>
          </ul>
        </section>
        <section>
          <h2>Selected work</h2>
          {caseStudies.map((study) => (
            <p key={study.slug}>
              <Link href={`/cases/${study.slug}`}>{study.title}</Link> —{" "}
              {study.summary}
            </p>
          ))}
          {projects.map((project) => (
            <p key={project.name}>
              <a href={project.href} target="_blank" rel="noreferrer">
                {project.name}
              </a>{" "}
              — {project.summary}
            </p>
          ))}
        </section>
        <section>
          <h2>Education</h2>
          <p>Information Systems — college graduate, 2024.</p>
          <p>Cybersecurity education — Astana IT University, in progress.</p>
        </section>
        <section>
          <h2>Selected learning credentials</h2>
          <ul>
            {credentials.map((credential) => (
              <li key={credential.url}>
                <a href={credential.url} target="_blank" rel="noreferrer">
                  {credential.name}
                </a>{" "}
                — {credential.issuer}, {credential.kind.toLowerCase()}.
              </li>
            ))}
          </ul>
          <a
            href={`${profile.linkedin}details/certifications/`}
            target="_blank"
            rel="noreferrer"
          >
            Full credential record on LinkedIn ↗
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
