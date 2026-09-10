"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useEffect, useRef, type MutableRefObject } from "react";
import { Group, PCFShadowMap, Vector3 } from "three";
import {
  campus,
  campusStartPath,
  canWalk,
  CAMPUS_BOUNDS,
  PLAYER_START,
  type CampusStop,
} from "@/lib/campus";

import { Block, Grounds, Landmark } from "./CampusLandmarks";

export type TravelRequest = {
  x: number;
  z: number;
  sequence: number;
  walk?: boolean;
};
type Props = {
  visited: ReadonlySet<string>;
  activeId: string | null;
  onHover: (id: string | null) => void;
  paused: boolean;
  reducedMotion: boolean;
  travel: TravelRequest | null;
  onNearby: (id: string | null) => void;
  onSelect: (stop: CampusStop) => void;
  onReady: () => void;
  onFailure: () => void;
  onGround: (x: number, z: number) => void;
  viewport: MutableRefObject<HTMLDivElement | null>;
};

function RendererLifecycle({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  return null;
}

function Walker({ paused, reducedMotion, travel, onNearby, viewport }: Props) {
  const avatar = useRef<Group>(null);
  const legs = useRef<Group>(null);
  const keys = useRef(new Set<string>());
  const position = useRef(new Vector3(PLAYER_START[0], 0, PLAYER_START[1]));
  const velocity = useRef(new Vector3());
  const nearby = useRef<string | null>(null);
  const travelSequence = useRef(-1);
  const target = useRef(new Vector3());
  const destination = useRef<Vector3 | null>(null);
  const look = useRef(new Vector3(0, 0, PLAYER_START[1] * 0.65));
  const { camera, size } = useThree();

  useEffect(() => {
    const clear = () => keys.current.clear();
    const down = (event: KeyboardEvent) => {
      if (
        !viewport.current?.contains(document.activeElement) ||
        (event.target instanceof HTMLElement &&
          event.target.closest("button, a, input, textarea, select"))
      )
        return;
      const key = event.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
        ].includes(key)
      ) {
        event.preventDefault();
        keys.current.add(key);
      }
    };
    const up = (event: KeyboardEvent) =>
      keys.current.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [viewport]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (travel && travel.sequence !== travelSequence.current) {
      if (travel.walk) destination.current = new Vector3(travel.x, 0, travel.z);
      else {
        position.current.set(travel.x, 0, travel.z);
        destination.current = null;
      }
      velocity.current.set(0, 0, 0);
      travelSequence.current = travel.sequence;
    }
    const k = keys.current;
    if (paused || !viewport.current?.contains(document.activeElement))
      k.clear();
    let x =
      Number(k.has("d") || k.has("arrowright")) -
      Number(k.has("a") || k.has("arrowleft"));
    let z =
      Number(k.has("s") || k.has("arrowdown")) -
      Number(k.has("w") || k.has("arrowup"));
    const length = Math.hypot(x, z);
    if (length) {
      x /= length;
      z /= length;
    }
    if (length || paused) destination.current = null;
    // Camera-relative movement: screen right follows the ground's diagonal.
    target.current.set((x + z) * 0.707 * 6, 0, (z - x) * 0.707 * 6);
    if (destination.current) {
      target.current.copy(destination.current).sub(position.current);
      const distance = target.current.length();
      if (distance < 0.15) {
        destination.current = null;
        target.current.set(0, 0, 0);
      } else
        target.current.normalize().multiplyScalar(Math.min(6, distance * 5));
    }
    if (paused) velocity.current.set(0, 0, 0);
    else velocity.current.lerp(target.current, 1 - Math.exp(-12 * dt));
    const p = position.current;
    const previousX = p.x,
      previousZ = p.z;
    if (canWalk(p.x + velocity.current.x * dt, p.z))
      p.x += velocity.current.x * dt;
    if (canWalk(p.x, p.z + velocity.current.z * dt))
      p.z += velocity.current.z * dt;
    if (
      destination.current &&
      speedIsBlocked(previousX, previousZ, p, velocity.current)
    )
      destination.current = null;
    const speed = velocity.current.length();
    if (avatar.current) {
      avatar.current.position.copy(p);
      if (speed > 0.1) {
        const desired = Math.atan2(velocity.current.x, velocity.current.z);
        avatar.current.rotation.y +=
          Math.atan2(
            Math.sin(desired - avatar.current.rotation.y),
            Math.cos(desired - avatar.current.rotation.y),
          ) *
          (1 - Math.exp(-14 * dt));
      }
      avatar.current.position.y =
        reducedMotion || paused
          ? 0
          : speed > 0.3
            ? Math.sin(state.clock.elapsedTime * 12) * 0.025
            : 0;
    }
    if (legs.current)
      legs.current.children.forEach((leg, i) => {
        leg.rotation.x =
          reducedMotion || paused
            ? 0
            : Math.sin(state.clock.elapsedTime * 12 + i * Math.PI) *
              Math.min(speed * 0.09, 0.5);
      });
    const framing = Math.max(1, 1.7 / (size.width / size.height));
    target.current.set(
      p.x * 0.65 + 40 * framing,
      44 * framing,
      p.z * 0.65 + 40 * framing,
    );
    camera.position.lerp(
      target.current,
      reducedMotion ? 1 : 1 - Math.exp(-3 * dt),
    );
    target.current.set(p.x * 0.65, 0, p.z * 0.65);
    look.current.lerp(
      target.current,
      reducedMotion ? 1 : 1 - Math.exp(-3 * dt),
    );
    camera.lookAt(look.current);
    let closest: string | null = null;
    let distance = 2.8;
    for (const stop of campus) {
      const d = Math.hypot(p.x - stop.entrance[0], p.z - stop.entrance[1]);
      if (d < distance) {
        closest = stop.id;
        distance = d;
      }
    }
    if (nearby.current !== closest) {
      nearby.current = closest;
      onNearby(closest);
    }
    viewport.current?.setAttribute("data-player-x", p.x.toFixed(2));
    viewport.current?.setAttribute("data-player-z", p.z.toFixed(2));
  });

  return (
    <group ref={avatar}>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 20]} />
        <meshBasicMaterial color="#344138" transparent opacity={0.2} />
      </mesh>
      <Block position={[0, 0.95, 0]} size={[0.48, 0.65, 0.3]} color="#773e3c" />
      <Html transform position={[0, 1, 0.16]} scale={0.06} zIndexRange={[3, 0]}>
        <span className="campus-jersey">93</span>
      </Html>
      <mesh position={[0, 1.52, 0]} castShadow>
        <sphereGeometry args={[0.23, 10, 8]} />
        <meshStandardMaterial color="#aa7659" />
      </mesh>
      <Block
        position={[0, 1.71, -0.02]}
        size={[0.37, 0.12, 0.32]}
        color="#302c2a"
      />
      <group ref={legs} position={[0, 0.65, 0]}>
        {[-0.14, 0.14].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <Block
              position={[0, -0.3, 0]}
              size={[0.18, 0.6, 0.2]}
              color="#293942"
            />
            <Block
              position={[0, -0.59, 0.06]}
              size={[0.2, 0.1, 0.32]}
              color="#ede4d4"
            />
          </group>
        ))}
      </group>
      {[-0.32, 0.32].map((x) => (
        <Block
          key={x}
          position={[x, 0.94, 0]}
          size={[0.15, 0.6, 0.2]}
          color="#aa7659"
        />
      ))}
    </group>
  );
}

export default function CampusScene(props: Props) {
  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      dpr={[1, 1.5]}
      camera={{
        position: [40, 44, 40 + PLAYER_START[1] * 0.65],
        fov: 48,
        near: 0.1,
        far: 220,
      }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={props.onReady}
      fallback={<p>3D is unavailable. Use the destination list to explore.</p>}
    >
      <RendererLifecycle onFailure={props.onFailure} />
      <color attach="background" args={["#b9c6bd"]} />
      <fog attach="fog" args={["#b9c6bd", 85, 170]} />
      <ambientLight intensity={0.6} />
      <hemisphereLight args={["#d5e4f2", "#a99572", 1.1]} />
      <directionalLight
        position={[-16, 18, 8]}
        intensity={2}
        color="#ffd39a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-48}
        shadow-camera-right={48}
        shadow-camera-top={48}
        shadow-camera-bottom={-48}
        shadow-camera-far={150}
        shadow-bias={-0.0005}
      />
      <Grounds />
      {!props.visited.has("amherst") && campusStartPath.flatMap((path, segment) => {
        const count = Math.ceil(Math.hypot(path.to[0] - path.from[0], path.to[1] - path.from[1]));
        return Array.from({ length: count }, (_, i) => <Block key={`${segment}:${i}`} position={[path.from[0] + (path.to[0] - path.from[0]) * i / count, 0.18, path.from[1] + (path.to[1] - path.from[1]) * i / count]} size={[0.18, 0.06, 0.18]} color="#f5d292" emissive="#b99347" />);
      })}
      <mesh
        position={[0, 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          if (!props.paused && canWalk(event.point.x, event.point.z))
            props.onGround(event.point.x, event.point.z);
        }}
      >
        <planeGeometry args={[CAMPUS_BOUNDS.x * 2, CAMPUS_BOUNDS.z * 2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {campus.map((stop, index) => (
        <Landmark
          key={stop.id}
          stop={stop}
          index={index}
          active={props.activeId === stop.id}
          reducedMotion={props.reducedMotion}
          onHover={props.onHover}
          onSelect={props.onSelect}
        />
      ))}
      <Walker {...props} />
    </Canvas>
  );
}

function speedIsBlocked(
  x: number,
  z: number,
  position: Vector3,
  velocity: Vector3,
) {
  return x === position.x && z === position.z && velocity.lengthSq() > 0.01;
}
