import type { FormEvent } from "react";
import { useState } from "react";
import { rooms } from "@/data/rooms";
import type { RoomId } from "@/data/types";

type HeaderProps = {
  flagState: "idle" | "found" | "unlocked";
  onFlagSubmit: (value: string) => boolean;
  onNavigate: (roomId: RoomId) => void;
};

export function Header({ flagState, onFlagSubmit, onNavigate }: HeaderProps) {
  const [flagValue, setFlagValue] = useState("");
  const [message, setMessage] = useState("");

  function submitFlag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const accepted = onFlagSubmit(flagValue);
    setMessage(accepted ? "Accepted" : "Try again");
  }

  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">NB</span>
        <span className="brand-text">
          <strong>Nurzhan Bekmurat</strong>
          <span>Cybersecurity Student</span>
        </span>
      </div>

      <div className="header-actions">
        <select
          aria-label="Mobile room navigation"
          className="nav-select"
          defaultValue="main-room"
          onChange={(event) => onNavigate(event.target.value as RoomId)}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.title}
            </option>
          ))}
        </select>

        <form className="flag-form" onSubmit={submitFlag}>
          <input
            aria-label="Flag input"
            className="flag-input"
            onChange={(event) => setFlagValue(event.target.value)}
            placeholder={flagState === "found" ? "Enter discovered flag" : "Flag input"}
            value={flagValue}
          />
          <button className="icon-button" type="submit">
            Check
          </button>
          <span className="flag-note">{message || (flagState === "found" ? "Flag found" : "Ready")}</span>
        </form>
      </div>
    </header>
  );
}
