export const profile = {
  name: "Nurzhan Bekmurat",
  role: "Junior Cybersecurity Specialist",
  focus: "Penetration Testing & SOC Analysis",
  github: "https://github.com/Scirtor",
  linkedin:
    "https://www.linkedin.com/in/%D0%BD%D1%83%D1%80%D0%B6%D0%B0%D0%BD-%D0%B1%D0%B5%D0%BA%D0%BC%D1%83%D1%80%D0%B0%D1%82-996863316/",
  youtube: "https://www.youtube.com/@DetectiveZhang",
  itch: "https://scirtor.itch.io",
};

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  context: string;
  sections: { heading: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "phishing-email-analysis",
    category: "SOC / EMAIL TRIAGE",
    title: "A bank alert that did not add up.",
    summary:
      "Reconstructed a supplied email’s route, compared sender identities and separated authentication results from evidence of phishing.",
    tags: ["Email headers", "SPF / DKIM", "IOC triage"],
    context:
      "Academic lab · September 2026 · Analysis of a supplied email excerpt, not a production incident.",
    sections: [
      {
        heading: "The question",
        body: "The message claimed a bank account had been suspended and demanded verification within 24 hours. I examined whether its sender identities, mail route and destination supported that claim.",
      },
      {
        heading: "How I approached it",
        body: "I read Received headers from oldest to newest, compared the visible From, Return-Path, Message-ID and DKIM identity, and parsed the verification URL without opening it. I recorded observables with an explanation of what each could and could not establish.",
      },
      {
        heading: "What the evidence showed",
        body: "SPF and DKIM were reported as passing, but the signing identity differed from the visible bank identity. No DMARC result was supplied. The verification destination used a separate bank-themed domain; the message combined this with urgency and threatened account closure. A loopback address was a local mail handoff, not a remote attacker IP.",
      },
      {
        heading: "Assessment and response",
        body: "The supplied evidence was consistent with phishing. My report recommended preserving the original message, correlating matching URLs and identities in mail logs, quarantining related messages and verifying the request through a trusted channel. Credential reset and session revocation were conditional on a user having submitted credentials; these were recommendations, not actions I performed.",
      },
      {
        heading: "Limits of the result",
        body: "I did not visit the destination or independently validate the header excerpt. A relay IP or a third-party sending domain was not labelled malicious simply because it appeared in the message. The case demonstrates careful email triage and reporting within a controlled exercise.",
      },
    ],
  },
  {
    slug: "static-executable-analysis",
    category: "SOC / STATIC ANALYSIS",
    title: "Inspect first. Execute nothing.",
    summary:
      "Used PEStudio to inspect a supplied curl.exe sample and explain its PE structure, imports and entropy without overstating the verdict.",
    tags: ["PEStudio", "PE imports", "Evidence handling"],
    context:
      "Academic lab · Static analysis only · The executable was not run during this analysis.",
    sections: [
      {
        heading: "The question",
        body: "What could be established about a Windows executable from its static properties, and where would further evidence be needed? I examined a supplied curl.exe sample in PEStudio and preserved the observations in a worksheet and screenshot appendix.",
      },
      {
        heading: "How I approached it",
        body: "I recorded file size and SHA-256, checked architecture, version information and entry point, and compared PE section sizes and entropy. I then reviewed imported libraries, network APIs and strings, keeping observations separate from conclusions.",
      },
      {
        heading: "What the evidence showed",
        body: "The worksheet recorded a 530,944-byte, 64-bit console executable with version 7.83.1. PEStudio listed 40 libraries and 218 imports. WS2_32.dll imports included socket, connect, sendto and recv; CRYPT32.dll indicated certificate or cryptographic functionality. Overall entropy was 6.426, with the highest recorded section entropy at 6.379.",
      },
      {
        heading: "What I concluded",
        body: "The imports were consistent with substantial network functionality. The captured entropy values alone did not strongly suggest heavily packed or encrypted sections. Flagged strings and common Windows APIs were leads to validate, not sufficient grounds for a maliciousness verdict.",
      },
      {
        heading: "Limits and next steps",
        body: "Static properties do not establish runtime behaviour, publisher trust or whether a file is safe. Signature validation, provenance checks and controlled behavioural analysis would be separate follow-up steps. This case does not claim malware attribution or a production detection.",
      },
    ],
  },
];

export const projects = [
  {
    name: "Lost & Found",
    category: "WEB APPLICATION",
    summary:
      "A Django and PostgreSQL application for reporting and finding lost items, with accounts, photos and comments.",
    tags: ["Python", "Django", "PostgreSQL"],
    href: "https://github.com/Scirtor/django-project",
    label: "View source",
    demo: "https://lostfound.scirtor.com",
  },
  {
    name: "StarJump",
    category: "GAME DEVELOPMENT",
    summary:
      "My 2024 college graduation project, rebuilt for browser play with touch controls and an offline Android preview.",
    tags: ["Python", "Pygame", "Browser / Android"],
    href: "https://github.com/Scirtor/StarJump",
    label: "View source",
    demo: "https://scirtor.itch.io/starjump",
  },
];

export const credentials = [
  {
    name: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    url: "https://www.credly.com/badges/e66123ee-1e80-47ec-ba6f-93b8f1f339dc",
    kind: "Learning badge",
  },
  {
    name: "Penetration Testing, Threat Hunting, and Cryptography",
    issuer: "IBM",
    url: "https://www.coursera.org/account/accomplishments/records/VPVDXR5XH559",
    kind: "Course completion certificate",
  },
  {
    name: "Hands-On Web App Pentesting",
    issuer: "Packt",
    url: "https://www.coursera.org/account/accomplishments/records/2LKFTOHOWNMC",
    kind: "Course completion certificate",
  },
  {
    name: "Linux Essentials",
    issuer: "Cisco",
    url: "https://www.credly.com/badges/50e8b343-e755-4266-bee7-7515a7512967",
    kind: "Learning badge",
  },
];
