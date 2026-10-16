import type { Room } from "./types";

export const rooms: Room[] = [
  {
    id: "projects-room",
    title: "Projects Room",
    subtitle: "Implemented work and featured builds.",
    color: "#182638",
    floorColor: "#213349",
    objects: [
      {
        id: "lost-found-terminal",
        title: "Lost & Found Terminal",
        kind: "interactive",
        x: 430,
        y: 505,
        radius: 150,
        summary: "A project showcase terminal.",
        modal: {
          title: "Lost & Found",
          sections: [
            {
              heading: "Overview",
              body: "A practical service concept for matching lost items with owners through structured reports and searchable entries.",
            },
            {
              heading: "Stack",
              body: "Django, PostgreSQL, authentication flows, file uploads, moderation logic, and responsive UI patterns.",
            },
          ],
          actions: [
            {
              label: "Repository",
              href: "https://github.com/Scirtor/django-project",
              variant: "secondary",
            },
          ],
        },
      },
      {
        id: "starjump-console",
        title: "StarJump Console",
        kind: "interactive",
        x: 850,
        y: 505,
        radius: 150,
        summary: "College project rebuilt for browser and Android.",
        modal: {
          title: "StarJump",
          sections: [
            {
              heading: "Overview",
              body: "A Python/Pygame platformer originally developed for my 2024 college graduation project, rebuilt for browser play with touch controls and an offline Android preview.",
            },
            {
              heading: "Focus",
              body: "Game mechanics, browser delivery, touch input and an offline Android build.",
            },
          ],
          actions: [
            {
              label: "Repository",
              href: "https://github.com/Scirtor/StarJump",
              variant: "secondary",
            },
          ],
        },
      },
    ],
  },
  {
    id: "main-room",
    title: "Main Room",
    subtitle: "About, resume, projects preview, and skills.",
    color: "#14231f",
    floorColor: "#20372f",
    objects: [
      {
        id: "skills-display",
        title: "Skills Display",
        kind: "interactive",
        x: 860,
        y: 460,
        radius: 160,
        summary: "Pentesting, SOC foundations, Python and Linux.",
        sprite: "/sprites/chalk_board.jpg",
        scale: 1.25,
        modal: {
          title: "Skills",
          sections: [
            {
              heading: "Security practice",
              body: "Web security labs, CTFs, OSINT, email triage and static executable analysis. Tools include Burp Suite, Nmap and Wireshark.",
            },
            {
              heading: "DevOps",
              body: "Linux, shell workflows, Nginx, VPS deployment, environment setup, logs, and service-minded debugging.",
            },
            {
              heading: "Development",
              body: "Python, Django, PostgreSQL, TypeScript, Next.js and Python/Pygame. Building applications supports my understanding of security findings.",
            },
          ],
          actions: [],
        },
      },
      {
        id: "resume-terminal",
        title: "Resume Terminal",
        kind: "interactive",
        x: 540,
        y: 505,
        radius: 160,
        summary: "Resume, education, experience, and CV.",
        sprite: "/sprites/pc.png",
        hasDesk: true,
        modal: {
          title: "Resume Terminal",
          sections: [
            {
              heading: "Name",
              body: "Nurzhan Bekmurat.",
            },
            {
              heading: "Professional focus",
              body: "Junior Cybersecurity Specialist focused on penetration testing and SOC analysis. College graduate in Information Systems; continuing cybersecurity education at Astana IT University.",
            },
            {
              heading: "Experience",
              body: "Focused on Python, Django, PostgreSQL, Linux, security fundamentals, and interactive web interfaces.",
            },
          ],
          actions: [
            { label: "View professional profile", href: "/resume" },
            {
              label: "Open GitHub",
              href: "https://github.com/Scirtor",
              variant: "secondary",
            },
            {
              label: "Open LinkedIn",
              href: "https://www.linkedin.com/in/%D0%BD%D1%83%D1%80%D0%B6%D0%B0%D0%BD-%D0%B1%D0%B5%D0%BA%D0%BC%D1%83%D1%80%D0%B0%D1%82-996863316/",
              variant: "secondary",
            },
          ],
        },
      },
    ],
  },
  {
    id: "security-lab",
    title: "Security Lab",
    subtitle: "CTF practice, writeups, labs, and hidden signals.",
    color: "#241c2e",
    floorColor: "#342642",
    objects: [
      {
        id: "tool-wall",
        title: "Security Tool Wall",
        kind: "interactive",
        x: 850,
        y: 505,
        radius: 160,
        summary: "Tools and methodology.",
        sprite: "/sprites/tools_wall.png",
        spriteFill: true,
        scale: 1.2,
        modal: {
          title: "Security Tool Wall",
          sections: [
            {
              heading: "Tooling",
              body: "Linux tools, network inspection, web security basics, documentation habits, and repeatable lab workflows.",
            },
          ],
          actions: [],
        },
      },
      {
        id: "ctf-console",
        title: "Security Case Console",
        kind: "interactive",
        x: 430,
        y: 505,
        radius: 160,
        summary: "Email triage and static analysis lab reports.",
        sprite: "/sprites/pc.png",
        hasDesk: true,
        modal: {
          title: "Security Case Console",
          sections: [
            {
              heading: "Practice",
              body: "Read two completed academic case summaries: phishing email triage and static analysis of a supplied executable. Each documents the observations, reasoning and limitations of the exercise.",
            },
          ],
          actions: [
            {
              label: "Email triage case",
              href: "/cases/phishing-email-analysis",
            },
            {
              label: "Static analysis case",
              href: "/cases/static-executable-analysis",
              variant: "secondary",
            },
          ],
        },
      },
    ],
  },
];
