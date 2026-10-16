import Link from "next/link";
import { GameExperience } from "@/components/GameExperience";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { caseStudies, credentials, profile, projects } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="availability">
              <span /> Open to junior security roles
            </p>
            <p className="eyebrow">Nurzhan Bekmurat · Scirtor</p>
            <h1 id="hero-title">
              Follow the evidence.
              <br />
              <em>Understand the system.</em>
            </h1>
            <p className="hero-role">Junior Cybersecurity Specialist</p>
            <p className="hero-focus">Penetration Testing & SOC Analysis</p>
            <p className="hero-description">
              I investigate how systems behave, document what the evidence
              supports, and build software that helps me understand both sides
              of security.
            </p>
            <div className="hero-actions">
              <a className="button" href="#work">
                Explore my work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn ↗
              </a>
            </div>
          </div>
          <div
            className="evidence-board"
            aria-label="My approach: observe, investigate, explain"
          >
            <div className="board-top">
              <span>SECURITY WORKSPACE</span>
              <span className="board-dot" />
            </div>
            <div className="board-grid" aria-hidden="true">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="crosshair" />
              <span className="board-node node-one" />
              <span className="board-node node-two" />
              <span className="board-node node-three" />
              <div className="board-center">
                N<span>BEKMURAT</span>
              </div>
            </div>
            <ol className="approach-list">
              <li>
                <span>01</span>Observe the signal
              </li>
              <li>
                <span>02</span>Test the explanation
              </li>
              <li>
                <span>03</span>Document the finding
              </li>
            </ol>
            <div className="board-bottom">
              PENTESTING <span>×</span> SOC ANALYSIS
            </div>
          </div>
        </section>
        <div
          className="tool-strip section-wrap"
          aria-label="Tools and areas of practice"
        >
          <span>My working toolkit</span>
          <p>
            Python <i> / </i> Linux <i> / </i> Burp Suite <i> / </i> Wireshark{" "}
            <i> / </i> Nmap <i> / </i> Git
          </p>
        </div>
        <section
          className="work-section section-wrap"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work / 01</p>
              <h2 id="work-title">From a clue to a clear finding.</h2>
            </div>
            <p>
              Two security lab reports, followed by software I built. Each case
              explains the evidence, the reasoning and the limits.
            </p>
          </div>
          <div className="case-grid">
            {caseStudies.map((study, index) => (
              <Link
                className="case-card"
                href={`/cases/${study.slug}`}
                key={study.slug}
              >
                <div className="card-top">
                  <span>{study.category}</span>
                  <span aria-hidden="true">0{index + 1} / ↗</span>
                </div>
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
                <div className="tags">
                  {study.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="case-action">
                  Read the case <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <p className="eyebrow">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.label} ↗
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    {project.name === "StarJump"
                      ? "Play / download"
                      : "Open demo"}{" "}
                    ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="about-section section-wrap"
          aria-labelledby="about-title"
        >
          <p className="eyebrow">Background / 02</p>
          <h2 id="about-title">
            Security thinking.
            <br />A builder’s perspective.
          </h2>
          <div>
            <p>
              I combine CTF practice and blue-team labs with Python, Django and
              game development. Building applications gives me useful context
              when I test behaviour or investigate a finding.
            </p>
            <p>
              I graduated from college in Information Systems and continue my
              cybersecurity education at Astana IT University. My current career
              focus is junior penetration testing and SOC analysis.
            </p>
            <Link className="text-link" href="/resume">
              View professional profile ↗
            </Link>
          </div>
        </section>
        <section
          className="credentials-section section-wrap"
          id="credentials"
          aria-labelledby="credentials-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Learning with evidence / 03</p>
              <h2 id="credentials-title">A foundation I keep building.</h2>
            </div>
            <p>
              Selected course completions and learning badges. The full record
              is on LinkedIn.
            </p>
          </div>
          <div className="credential-list">
            {credentials.map((credential) => (
              <a
                className="credential"
                key={credential.url}
                href={credential.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="credential-issuer">{credential.issuer}</span>
                <span>
                  <strong>{credential.name}</strong>
                  <small>{credential.kind}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <a
            className="text-link all-credentials"
            href={`${profile.linkedin}details/certifications/`}
            target="_blank"
            rel="noreferrer"
          >
            View all credentials on LinkedIn ↗
          </a>
        </section>
        <GameExperience />
      </main>
      <SiteFooter />
    </>
  );
}
