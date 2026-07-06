# Interactive CV

An interactive, game-like portfolio/CV for Nurzhan Bekmurat — a top-down 2D "walk around a room" experience built with Next.js and Pixi.js instead of a static resume page.

Visitors control a character with WASD/arrow keys, walk up to interactive objects (a resume terminal, a skills board, project consoles, a CTF console...), and open info panels with details, links, and actions. A mobile-friendly sidebar and tap-to-walk mode make it usable without a keyboard too.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Pixi.js](https://pixijs.com/) via `@pixi/react` for the 2D canvas scene, character animation, and input handling
- Tailwind CSS 4 for the surrounding UI (header, sidebar, modal)
- Docker (multi-stage build, Next.js standalone output) for deployment

## Project structure

```
app/                  Next.js app shell (layout, page, global styles)
components/
  GameCanvas.tsx      Pixi.js scene: rendering, movement, room transitions, interactions
  Header.tsx          Top navigation + hidden-flag input
  RoomTabs.tsx         Room switcher
  InfoModal.tsx        Modal shown when an object is opened
data/
  rooms.ts            Room and object definitions (content lives here)
  types.ts            Shared types for rooms/objects/modals
public/assets/characters/  Player sprite frames (idle + 4-directional walk cycles)
sprites/              Room object art (used by object nodes on the canvas)
```

## Rooms & objects

Content is data-driven from [data/rooms.ts](data/rooms.ts) — adding a room or object doesn't require touching the canvas code:

- **Main Room** — resume terminal, skills display
- **Projects Room** — project showcase terminals
- **Security Lab** — CTF console, security tool wall

Each object has a position, a radius (interaction range), an optional sprite, and a modal with sections/actions. There's also a small hidden pixel easter egg in the Main Room that reveals a flag to unlock a "found" state via the header's flag input.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Move with `WASD`/arrow keys, press `E` or click/tap to interact with the nearest object, and walk to a room's edge (or use the sidebar) to change rooms.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Docker

```bash
docker build -t interactive-cv .
docker run -p 3000:3000 interactive-cv
```

The image is a multi-stage build that installs dependencies, runs `next build` with standalone output, and ships only the production server, static assets, and `sprites/`.
