"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const PortfolioGame = dynamic(
  () => import("./PortfolioGame").then((module) => module.PortfolioGame),
  {
    ssr: false,
    loading: () => (
      <p className="room-loading" role="status">
        Opening the room…
      </p>
    ),
  },
);

export function GameExperience() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="explore-section section-wrap"
      id="explore"
      aria-labelledby="explore-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">A different way to explore</p>
          <h2 id="explore-title">Step into my workspace.</h2>
        </div>
        <p>
          A small interactive room built with Next.js and Pixi.js. The same
          projects and skills, with a little room to wander.
        </p>
      </div>
      <button
        className="button button-secondary"
        type="button"
        aria-expanded={isOpen}
        aria-controls="interactive-room"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Close interactive room" : "Enter interactive room"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      {isOpen && (
        <div id="interactive-room" className="interactive-room">
          <PortfolioGame />
        </div>
      )}
    </section>
  );
}
