"use client";

import { useEffect, useRef } from "react";
import {
  Application,
  AnimatedSprite,
  Assets,
  Container,
  type FederatedPointerEvent,
  Graphics,
  Sprite,
  Text,
  TextStyle,
  type Texture,
} from "pixi.js";
import type { PortfolioObject, Room, RoomId } from "@/data/types";

const WORLD_WIDTH = 1280;
const WORLD_HEIGHT = 720;
const GROUND_Y = 560;
const PLAYER_SPEED = 5.5;
const PLAYER_START_Y = WORLD_HEIGHT - 72;
const PLAYER_MIN_Y = 170;
const PLAYER_SCALE = 1.45;
const MOBILE_BREAKPOINT = 620;
const MOBILE_OBJECT_TOP = 210;
const MOBILE_OBJECT_BOTTOM = GROUND_Y - 60;
const WALK_ARRIVE_DISTANCE = 6;

const PLAYER_ANIMATION_PATHS = {
  idle: [
    "/assets/characters/idle-1.png",
    "/assets/characters/idle-2.png",
    "/assets/characters/idle-3.png",
  ],
  down: [
    "/assets/characters/step-down-1.png",
    "/assets/characters/step-down-2.png",
    "/assets/characters/step-down-3.png",
  ],
  left: [
    "/assets/characters/step-left-1.png",
    "/assets/characters/step-left-2.png",
    "/assets/characters/step-left-3.png",
  ],
  right: [
    "/assets/characters/step-right-1.png",
    "/assets/characters/step-right-2.png",
    "/assets/characters/step-right-3.png",
  ],
  up: [
    "/assets/characters/step-up-1.png",
    "/assets/characters/step-up-2.png",
    "/assets/characters/step-up-3.png",
  ],
} as const;

type GameCanvasProps = {
  room: Room;
  rooms: Room[];
  onNavigate: (roomId: RoomId) => void;
  onOpenObject: (object: PortfolioObject) => void;
  onSecretFound: () => void;
};

type KeyState = Record<string, boolean>;
type PlayerAnimation = keyof typeof PLAYER_ANIMATION_PATHS;
type PlayerTextures = Record<PlayerAnimation, Texture[]>;

export function GameCanvas({
  room,
  rooms,
  onNavigate,
  onOpenObject,
  onSecretFound,
}: GameCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerXRef = useRef(WORLD_WIDTH / 2);
  const playerYRef = useRef(PLAYER_START_Y);
  const keysRef = useRef<KeyState>({});
  const roomRef = useRef(room);
  const openRef = useRef(onOpenObject);
  const navigateRef = useRef(onNavigate);
  const secretFoundRef = useRef(false);
  const walkTargetRef = useRef<{ x: number; y: number; object: PortfolioObject } | null>(null);

  useEffect(() => {
    roomRef.current = room;
    playerXRef.current = WORLD_WIDTH / 2;
    playerYRef.current = PLAYER_START_Y;
    walkTargetRef.current = null;
  }, [room]);

  useEffect(() => {
    openRef.current = onOpenObject;
    navigateRef.current = onNavigate;
  }, [onOpenObject, onNavigate]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const mountNode = host;
    let cancelled = false;
    let cleanup = () => {};

    async function boot() {
      if (typeof window.TouchEvent === "undefined") {
        // Pixi's EventSystem references TouchEvent unconditionally; some desktop
        // browsers (e.g. Firefox without touch support compiled in) never define it.
        window.TouchEvent = class TouchEvent extends UIEvent {} as unknown as typeof window.TouchEvent;
      }

      const app = new Application();
      await app.init({
        antialias: true,
        autoDensity: true,
        backgroundAlpha: 0,
        height: mountNode.clientHeight,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        width: mountNode.clientWidth,
      });

      if (cancelled) {
        app.destroy(true);
        return;
      }

      mountNode.appendChild(app.canvas);

      const world = new Container();
      const sceneLayer = new Container();
      const objectLayer = new Container();
      const playerLayer = new Container();
      const uiLayer = new Container();
      world.addChild(sceneLayer, objectLayer, playerLayer);
      app.stage.addChild(world, uiLayer);

      let isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      const objectPositions = new Map<string, { x: number; y: number }>();

      const playerTextures = await loadPlayerTextures();
      if (cancelled) {
        app.destroy(true);
        return;
      }

      const player = createPlayer(playerTextures);
      let playerAnimation: PlayerAnimation = "idle";
      playerLayer.addChild(player);

      const hintText = new Text({
        text: "",
        style: new TextStyle({
          fill: "#edf6f7",
          fontFamily: "Inter, Arial",
          fontSize: 18,
          fontWeight: "700",
        }),
      });
      uiLayer.addChild(hintText);

      function fitRoomToScreen() {
        if (isMobile) {
          const scale = app.screen.height / WORLD_HEIGHT;
          world.scale.set(scale, scale);
          world.x = (app.screen.width - WORLD_WIDTH * scale) / 2;
          world.y = 0;
          return;
        }

        world.scale.set(
          app.screen.width / WORLD_WIDTH,
          app.screen.height / WORLD_HEIGHT,
        );
        world.x = 0;
        world.y = 0;
      }

      function activateObject(object: PortfolioObject) {
        if (object.targetRoomId && object.kind === "navigation") {
          navigateRef.current(object.targetRoomId);
          return;
        }

        openRef.current(object);
      }

      async function drawScene() {
        sceneLayer.removeChildren().forEach((child) => child.destroy({ children: true }));
        objectLayer.removeChildren().forEach((child) => child.destroy({ children: true }));
        const activeRoom = roomRef.current;

        // Pre-load sprite textures
        const spriteTextures = new Map<string, Texture>();
        const spritePromises = activeRoom.objects
          .filter((obj) => obj.sprite)
          .map(async (obj) => {
            try {
              const texture = await Assets.load<Texture>(obj.sprite!);
              spriteTextures.set(obj.id, texture);
            } catch (e) {
              // Silently fail if sprite doesn't load
            }
          });
        await Promise.all(spritePromises);

        const background = new Graphics()
          .rect(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
          .fill(activeRoom.color)
          .rect(0, GROUND_Y, WORLD_WIDTH, WORLD_HEIGHT - GROUND_Y)
          .fill(activeRoom.floorColor);
        sceneLayer.addChild(background);

        drawGrid(sceneLayer);
        drawDoors(sceneLayer, activeRoom.id, rooms);

        objectPositions.clear();
        const total = activeRoom.objects.length;
        const verticalStep =
          total > 1 ? (MOBILE_OBJECT_BOTTOM - MOBILE_OBJECT_TOP) / (total - 1) : 0;

        activeRoom.objects.forEach((object, index) => {
          const position = isMobile
            ? { x: WORLD_WIDTH / 2, y: MOBILE_OBJECT_TOP + index * verticalStep }
            : { x: object.x, y: object.y };
          objectPositions.set(object.id, position);

          const spriteTexture = spriteTextures.get(object.id);
          const node = createObjectNode(object, position, spriteTexture);
          node.eventMode = "static";
          node.cursor = "pointer";
          node.on("pointertap", (event: FederatedPointerEvent) => {
            event.stopPropagation();
            if (isMobile) {
              walkTargetRef.current = {
                object,
                x: position.x,
                y: clamp(position.y + 70, PLAYER_MIN_Y, PLAYER_START_Y),
              };
            } else {
              activateObject(object);
            }
          });
          objectLayer.addChild(node);
        });

        const secret = createSecretPixel();
        secret.eventMode = "static";
        secret.cursor = "pointer";
        secret.on("pointertap", () => {
          if (!secretFoundRef.current) {
            secretFoundRef.current = true;
            onSecretFound();
            openRef.current({
              id: "hidden-flag-01",
              title: "Hidden Flag #1",
              kind: "secret",
              x: 0,
              y: 0,
              radius: 0,
              summary: "A tiny signal hidden in the main room.",
              modal: {
                title: "Hidden Flag #1",
                sections: [
                  {
                    heading: "Discovered",
                    body: "FLAG{MAIN_ROOM_SIGNAL}",
                  },
                  {
                    heading: "Use",
                    body: "Enter this value in the header flag input to mark the first secret as unlocked.",
                  },
                ],
                actions: [],
              },
            });
          }
        });
        if (activeRoom.id === "main-room") {
          objectLayer.addChild(secret);
        }
      }

      function nearestObject() {
        return roomRef.current.objects.find((object) => {
          const position = objectPositions.get(object.id) ?? { x: object.x, y: object.y };
          return (
            Math.hypot(playerXRef.current - position.x, playerYRef.current - position.y) <=
            object.radius
          );
        });
      }

      function tick() {
        const keys = keysRef.current;
        const manualHorizontal =
          Number(Boolean(keys.ArrowRight || keys.KeyD)) -
          Number(Boolean(keys.ArrowLeft || keys.KeyA));
        const manualVertical =
          Number(Boolean(keys.ArrowDown || keys.KeyS)) -
          Number(Boolean(keys.ArrowUp || keys.KeyW));

        if (manualHorizontal !== 0 || manualVertical !== 0) {
          walkTargetRef.current = null;
        }

        let horizontal = manualHorizontal;
        let vertical = manualVertical;
        const walkTarget = walkTargetRef.current;

        if (walkTarget && manualHorizontal === 0 && manualVertical === 0) {
          const dx = walkTarget.x - playerXRef.current;
          const dy = walkTarget.y - playerYRef.current;
          const distance = Math.hypot(dx, dy);

          if (distance <= WALK_ARRIVE_DISTANCE) {
            walkTargetRef.current = null;
            activateObject(walkTarget.object);
            horizontal = 0;
            vertical = 0;
          } else {
            horizontal = Math.abs(dx) > 1 ? Math.sign(dx) : 0;
            vertical = Math.abs(dy) > 1 ? Math.sign(dy) : 0;
            const step = Math.min(PLAYER_SPEED, distance);
            playerXRef.current = clamp(
              playerXRef.current + (dx / distance) * step,
              80,
              WORLD_WIDTH - 80,
            );
            playerYRef.current = clamp(
              playerYRef.current + (dy / distance) * step,
              PLAYER_MIN_Y,
              PLAYER_START_Y,
            );
          }
        } else {
          if (horizontal !== 0) {
            playerXRef.current = clamp(
              playerXRef.current + horizontal * PLAYER_SPEED,
              80,
              WORLD_WIDTH - 80,
            );
          }

          if (vertical !== 0) {
            playerYRef.current = clamp(
              playerYRef.current + vertical * PLAYER_SPEED,
              PLAYER_MIN_Y,
              PLAYER_START_Y,
            );
          }
        }

        const nextAnimation = playerAnimationForMovement(horizontal, vertical);
        if (nextAnimation !== playerAnimation) {
          playerAnimation = nextAnimation;
          player.textures = playerTextures[nextAnimation];
          player.gotoAndPlay(0);
        }

        const activeRoom = roomRef.current;
        if (playerXRef.current < 110) {
          const previousRoom = adjacentRoom(activeRoom.id, rooms, -1);
          if (previousRoom) {
            navigateRef.current(previousRoom);
          }
        }

        if (playerXRef.current > WORLD_WIDTH - 110) {
          const nextRoom = adjacentRoom(activeRoom.id, rooms, 1);
          if (nextRoom) {
            navigateRef.current(nextRoom);
          }
        }

        player.x = playerXRef.current;
        player.y = playerYRef.current;
        fitRoomToScreen();

        const nearby = nearestObject();
        hintText.text = nearby
          ? `Press E: ${nearby.title}`
          : "Move with WASD or arrows. Click objects directly.";
        hintText.x = 18;
        hintText.y = 18;
      }

      function onKeyDown(event: KeyboardEvent) {
        keysRef.current[event.code] = true;
        if (event.code === "KeyE") {
          const object = nearestObject();
          if (object) {
            activateObject(object);
          }
        }
      }

      function onKeyUp(event: KeyboardEvent) {
        keysRef.current[event.code] = false;
      }

      function resize() {
        app.renderer.resize(mountNode.clientWidth, mountNode.clientHeight);
        const nextIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        if (nextIsMobile !== isMobile) {
          isMobile = nextIsMobile;
          walkTargetRef.current = null;
          drawScene().catch(() => {});
        }
        fitRoomToScreen();
      }

      drawScene().catch(() => {});
      fitRoomToScreen();
      const tickerCallback = () => tick();
      app.ticker.add(tickerCallback);
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("resize", resize);

      const redrawInterval = window.setInterval(() => drawScene().catch(() => {}), 150);

      cleanup = () => {
        window.clearInterval(redrawInterval);
        app.ticker.remove(tickerCallback);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("resize", resize);
        app.destroy(true, { children: true });
      };
    }

    boot();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [rooms, onSecretFound]);

  return (
    <div className="game-canvas">
      <div className="canvas-host" ref={hostRef} />
      <div className="game-overlay">
        <div className="room-badge">
          <strong>{room.title}</strong>
          <span>{room.subtitle}</span>
        </div>
        <div className="control-hint">Desktop: WASD/arrows + E | Mobile: tap objects or room menu</div>
      </div>
    </div>
  );
}

async function loadPlayerTextures() {
  const entries = await Promise.all(
    Object.entries(PLAYER_ANIMATION_PATHS).map(async ([animation, paths]) => {
      const textures = await Promise.all(paths.map((path) => Assets.load<Texture>(path)));
      return [animation, textures] as const;
    }),
  );

  return Object.fromEntries(entries) as PlayerTextures;
}

function createPlayer(textures: PlayerTextures) {
  const player = new AnimatedSprite(textures.idle);
  player.anchor.set(0.5, 1);
  player.animationSpeed = 0.12;
  player.scale.set(PLAYER_SCALE);
  player.play();
  return player;
}

function playerAnimationForMovement(horizontal: number, vertical: number): PlayerAnimation {
  if (horizontal === 0 && vertical === 0) {
    return "idle";
  }

  if (Math.abs(horizontal) > Math.abs(vertical)) {
    return horizontal > 0 ? "right" : "left";
  }

  return vertical > 0 ? "down" : "up";
}

function drawGrid(layer: Container) {
  const lines = new Graphics();
  for (let x = 0; x <= WORLD_WIDTH; x += 160) {
    lines.moveTo(x, 100).lineTo(x, GROUND_Y).stroke({ color: "#ffffff", alpha: 0.035, width: 2 });
  }
  for (let y = 140; y <= GROUND_Y; y += 105) {
    lines.moveTo(0, y).lineTo(WORLD_WIDTH, y).stroke({ color: "#ffffff", alpha: 0.03, width: 2 });
  }
  layer.addChild(lines);
}

function drawDoors(layer: Container, activeRoomId: RoomId, rooms: Room[]) {
  const previous = adjacentRoom(activeRoomId, rooms, -1);
  const next = adjacentRoom(activeRoomId, rooms, 1);

  if (previous) {
    layer.addChild(createDoor(80, `To ${roomTitle(previous, rooms)}`));
  }

  if (next) {
    layer.addChild(createDoor(WORLD_WIDTH - 80, `To ${roomTitle(next, rooms)}`));
  }
}

function createDoor(x: number, labelText: string) {
  const door = new Container();
  door.x = x;
  door.y = GROUND_Y - 180;
  const panel = new Graphics()
    .roundRect(-44, 0, 88, 180, 8)
    .fill("#1f2930")
    .stroke({ color: "#70d6ff", alpha: 0.8, width: 2 })
    .circle(22, 94, 5)
    .fill("#70d6ff");
  const label = new Text({
    text: labelText,
    style: new TextStyle({
      align: "center",
      fill: "#edf6f7",
      fontFamily: "Inter, Arial",
      fontSize: 15,
      fontWeight: "700",
      wordWrap: true,
      wordWrapWidth: 150,
    }),
  });
  label.anchor.set(0.5);
  label.y = -28;
  door.addChild(panel, label);
  return door;
}

function createObjectNode(object: PortfolioObject, position: { x: number; y: number }, spriteTexture?: Texture) {
  const node = new Container();
  node.x = position.x;
  node.y = position.y;

  const color = object.kind === "navigation" ? "#70d6ff" : "#31c48d";
  const shape = new Graphics()
    .roundRect(-92, -118, 184, 150, 8)
    .fill("#172126")
    .stroke({ color, alpha: 0.84, width: 3 })
    .rect(-64, -82, 128, 68)
    .fill(object.kind === "navigation" ? "#183349" : "#17342a");

  node.addChild(shape);

  // Add sprite image if available and loaded
  if (spriteTexture) {
    const sprite = new Sprite(spriteTexture);
    sprite.width = 110;
    sprite.height = 55;
    sprite.x = -55;
    sprite.y = -27.5;
    node.addChild(sprite);
  }

  const title = new Text({
    text: object.title,
    style: new TextStyle({
      align: "center",
      fill: "#edf6f7",
      fontFamily: "Inter, Arial",
      fontSize: 18,
      fontWeight: "800",
      wordWrap: true,
      wordWrapWidth: 170,
    }),
  });
  title.anchor.set(0.5);
  title.y = 58;

  const hint = new Text({
    text: "Click / E",
    style: new TextStyle({
      fill: color,
      fontFamily: "Inter, Arial",
      fontSize: 14,
      fontWeight: "700",
    }),
  });
  hint.anchor.set(0.5);
  hint.y = 86;

  node.addChild(title, hint);
  return node;
}

function createSecretPixel() {
  const secret = new Graphics()
    .rect(0, 0, 18, 18)
    .fill({ color: "#31c48d", alpha: 0.18 })
    .stroke({ color: "#31c48d", alpha: 0.34, width: 1 });
  secret.x = 760;
  secret.y = 205;
  return secret;
}

function adjacentRoom(activeRoomId: RoomId, rooms: Room[], direction: -1 | 1) {
  const index = rooms.findIndex((item) => item.id === activeRoomId);
  return rooms[index + direction]?.id;
}

function roomTitle(roomId: RoomId, rooms: Room[]) {
  return rooms.find((item) => item.id === roomId)?.title ?? roomId;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
