"use client";

import { useMemo, useState } from "react";
import { GameCanvas } from "@/components/GameCanvas";
import { Header } from "@/components/Header";
import { InfoModal } from "@/components/InfoModal";
import { RoomTabs } from "@/components/RoomTabs";
import { rooms } from "@/data/rooms";
import type { PortfolioObject, RoomId } from "@/data/types";

export function PortfolioGame() {
  const [activeRoomId, setActiveRoomId] = useState<RoomId>("main-room");
  const [activeObject, setActiveObject] = useState<PortfolioObject | null>(
    null,
  );
  const [flagState, setFlagState] = useState<"idle" | "found" | "unlocked">(
    "idle",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeRoom = useMemo(
    () =>
      rooms.find((room) => room.id === activeRoomId) ??
      rooms.find((room) => room.id === "main-room") ??
      rooms[0],
    [activeRoomId],
  );

  function handleFlagSubmit(value: string) {
    if (value.trim().toUpperCase() === "FLAG{MAIN_ROOM_SIGNAL}") {
      setFlagState("unlocked");
      setActiveObject({
        id: "special-room",
        title: "Special Room Signal",
        kind: "secret",
        x: 0,
        y: 0,
        radius: 0,
        summary: "The first hidden signal is accepted.",
        modal: {
          title: "Special Room Signal",
          sections: [
            {
              heading: "Unlocked",
              body: "Flag #1 is valid. Future versions can use this to unlock the Special Room.",
            },
          ],
          actions: [],
        },
      });
      return true;
    }

    return false;
  }

  return (
    <div className="site-shell">
      <Header
        flagState={flagState}
        onFlagSubmit={handleFlagSubmit}
        onNavigate={setActiveRoomId}
      />

      <section className="play-area" aria-label="Interactive portfolio game">
        <div className="scene-wrap">
          <GameCanvas
            room={activeRoom}
            rooms={rooms}
            onNavigate={setActiveRoomId}
            onOpenObject={setActiveObject}
            onSecretFound={() => setFlagState("found")}
          />
        </div>

        <button
          aria-expanded={isSidebarOpen}
          aria-label={
            isSidebarOpen ? "Close portfolio panel" : "Open portfolio panel"
          }
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        {isSidebarOpen && (
          <button
            aria-label="Close portfolio panel"
            className="sidebar-scrim"
            onClick={() => setIsSidebarOpen(false)}
            type="button"
          />
        )}

        <aside
          className={`quick-panel ${isSidebarOpen ? "is-open" : ""}`}
          aria-label="Direct portfolio access"
        >
          <div>
            <p className="eyebrow">Direct access</p>
            <h2>Nurzhan Bekmurat</h2>
            <p className="role">
              Junior Cybersecurity Specialist · Pentesting & SOC Analysis
            </p>
          </div>

          <RoomTabs
            activeRoomId={activeRoom.id}
            onNavigate={(roomId) => {
              setActiveRoomId(roomId);
              setIsSidebarOpen(false);
            }}
            rooms={rooms}
          />

          <div className="object-list">
            {activeRoom.objects.map((object) => (
              <button
                className="object-card"
                key={object.id}
                onClick={() => {
                  setActiveObject(object);
                  setIsSidebarOpen(false);
                }}
                type="button"
              >
                <span>{object.title}</span>
                <small>{object.summary}</small>
              </button>
            ))}
          </div>
        </aside>
      </section>

      <InfoModal object={activeObject} onClose={() => setActiveObject(null)} />
    </div>
  );
}
