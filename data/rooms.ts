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
            { label: "Repository", href: "https://github.com/", variant: "secondary" },
          ],
        },
      },
      {
        id: "fastdown-console",
        title: "FastDown Bot Console",
        kind: "interactive",
        x: 850,
        y: 505,
        radius: 150,
        summary: "Automation and bot work.",
        modal: {
          title: "FastDown Bot",
          sections: [
            {
              heading: "Overview",
              body: "A bot-oriented automation project focused on fast commands, simple user flow, and reliable server behavior.",
            },
            {
              heading: "Focus",
              body: "Command handling, API integration, deployment discipline, and clean operational feedback.",
            },
          ],
          actions: [
            { label: "Repository", href: "https://github.com/", variant: "secondary" },
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
        summary: "Backend, DevOps, and core tooling.",
        sprite: "/sprites/chalk_board.jpg",
        scale: 1.25,
        modal: {
          title: "Skills",
          sections: [
            {
              heading: "Backend",
              body: "Python, Django, Django REST Framework, PostgreSQL, authentication, data modeling, and API design.",
            },
            {
              heading: "DevOps",
              body: "Linux, shell workflows, Nginx, VPS deployment, environment setup, logs, and service-minded debugging.",
            },
            {
              heading: "Also",
              body: "TypeScript and Next.js. Cybersecurity practice lives in the Security Lab.",
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
              heading: "Current status",
              body: "Cybersecurity student at Astana IT University building practical web, backend, and security projects.",
            },
            {
              heading: "Experience",
              body: "Focused on Python, Django, PostgreSQL, Linux, security fundamentals, and interactive web interfaces.",
            },
          ],
          actions: [
            { label: "Download CV", href: "/cv.pdf" },
            { label: "Open GitHub", href: "https://github.com/Scirtor", variant: "secondary" },
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
        title: "CTF Console",
        kind: "interactive",
        x: 430,
        y: 505,
        radius: 160,
        summary: "Labs and security practice.",
        sprite: "/sprites/pc.png",
        hasDesk: true,
        modal: {
          title: "CTF Console",
          sections: [
            {
              heading: "Practice",
              body: "A future home for CTF achievements, writeups, lab notes, and security learning artifacts.",
            },
          ],
          actions: [],
        },
      },
    ],
  },
];
