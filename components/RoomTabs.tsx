import type { Room, RoomId } from "@/data/types";

type RoomTabsProps = {
  rooms: Room[];
  activeRoomId: RoomId;
  onNavigate: (roomId: RoomId) => void;
};

export function RoomTabs({ rooms, activeRoomId, onNavigate }: RoomTabsProps) {
  return (
    <nav className="room-tabs" aria-label="Rooms">
      {rooms.map((room) => (
        <button
          aria-current={room.id === activeRoomId}
          className="room-tab"
          key={room.id}
          onClick={() => onNavigate(room.id)}
          type="button"
        >
          <strong>{room.title}</strong>
          <small>{room.subtitle}</small>
        </button>
      ))}
    </nav>
  );
}
