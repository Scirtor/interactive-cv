export type RoomId = "projects-room" | "main-room" | "security-lab";

export type ObjectKind = "interactive" | "navigation" | "transition" | "secret";

export type ModalAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type ModalSection = {
  heading: string;
  body: string;
};

export type PortfolioObject = {
  id: string;
  title: string;
  kind: ObjectKind;
  x: number;
  y: number;
  radius: number;
  summary: string;
  targetRoomId?: RoomId;
  modal: {
    title: string;
    sections: ModalSection[];
    actions: ModalAction[];
  };
};

export type Room = {
  id: RoomId;
  title: string;
  subtitle: string;
  color: string;
  floorColor: string;
  objects: PortfolioObject[];
};
