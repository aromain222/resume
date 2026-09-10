"use client";

import { Html } from "@react-three/drei";
import Image from "next/image";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BoxGeometry, Group, Mesh, MeshStandardMaterial, Shape } from "three";
import {
  campusDistricts,
  campusPaths,
  campusZones,
  campusGardenBorders,
  CAMPUS_SPACING,
  type CampusStop,
} from "@/lib/campus";

const box = new BoxGeometry(1, 1, 1);
const zoneShapes = campusZones.map((zone) => {
  const shape = new Shape();
  zone.polygon.forEach(([x, z], index) => {
    if (index === 0) shape.moveTo(x, -z);
    else shape.lineTo(x, -z);
  });
  shape.closePath();
  return shape;
});
const palette = new Map<string, MeshStandardMaterial>();
export function Block({
  position,
  size,
  color,
  emissive = "#000000",
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive?: string;
}) {
  const key = color + emissive;
  if (!palette.has(key))
    palette.set(
      key,
      new MeshStandardMaterial({ color, emissive, roughness: 0.75 }),
    );
  return (
    <mesh
      position={position}
      scale={size}
      geometry={box}
      material={palette.get(key)}
      dispose={null}
      castShadow
      receiveShadow
    />
  );
}
function Round({
  position,
  radius,
  height,
  color,
  sides = 32,
}: {
  position: [number, number, number];
  radius: number;
  height: number;
  color: string;
  sides?: number;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, sides]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}
function Screen({
  x = 0,
  y = 1.6,
  z = 0,
  width = 1.5,
  active = false,
}: {
  x?: number;
  y?: number;
  z?: number;
  width?: number;
  active?: boolean;
}) {
  return (
    <group>
      <Block position={[x, y, z]} size={[width, 0.9, 0.12]} color="#253c48" />
      <Block
        position={[x, y, z + 0.07]}
        size={[width - 0.12, 0.72, 0.02]}
        color={active ? "#82c4bd" : "#467786"}
        emissive={active ? "#335e5b" : "#142b33"}
      />
      {[0, 1, 2].map((i) => (
        <Block
          key={i}
          position={[
            x - width * 0.28 + i * width * 0.27,
            y - 0.15 + i * 0.1,
            z + 0.09,
          ]}
          size={[width * 0.15, 0.18 + i * 0.14, 0.02]}
          color="#d3e4d1"
        />
      ))}
    </group>
  );
}
function Bench({
  position = [0, 0, 0],
}: {
  position?: [number, number, number];
}) {
  return (
    <group position={position}>
      <Block position={[0, 0.55, 0]} size={[2.2, 0.15, 0.65]} color="#ad8660" />
      <Block
        position={[0, 0.95, -0.25]}
        size={[2.2, 0.6, 0.12]}
        color="#ad8660"
      />
      {[-0.8, 0.8].map((x) => (
        <Block
          key={x}
          position={[x, 0.26, 0]}
          size={[0.12, 0.5, 0.6]}
          color="#394c49"
        />
      ))}
    </group>
  );
}

function Pavilion({ stop, active }: { stop: CampusStop; active: boolean }) {
  return (
    <>
      <Round position={[0, 0.1, 0]} radius={3} height={0.2} color="#d6c9b6" />
      <Round
        position={[0, 3.6, 0]}
        radius={3.1}
        height={0.22}
        color={stop.color}
      />
      <Round
        position={[0, 3.8, 0]}
        radius={1.8}
        height={0.24}
        color="#a8c3b1"
      />
      {[-2.35, 2.35].flatMap((x) =>
        [-1.3, 1.3].map((z) => (
          <Block
            key={`${x}${z}`}
            position={[x, 1.85, z]}
            size={[0.16, 3.4, 0.16]}
            color="#d4c9b6"
          />
        )),
      )}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry
          args={[2.7, 2.7, 3, 24, 1, true, Math.PI / 2, Math.PI]}
        />
        <meshStandardMaterial
          color="#8bb2b7"
          transparent
          opacity={0.25}
          roughness={0.2}
          side={2}
          depthWrite={false}
        />
      </mesh>
      <Round position={[0, 1, 0]} radius={1.2} height={0.15} color="#9b7453" />
      <Round position={[0, 0.5, 0]} radius={0.25} height={1} color="#415c5b" />
      {[0, 1, 2, 3, 4].map((i) => (
        <group
          key={i}
          position={[Math.cos(i * 1.256) * 1.75, 0, Math.sin(i * 1.256) * 1.75]}
        >
          <Block
            position={[0, 0.5, 0]}
            size={[0.5, 0.13, 0.5]}
            color="#456569"
          />
          <Block
            position={[0, 0.85, -0.2]}
            size={[0.5, 0.7, 0.12]}
            color="#456569"
          />
        </group>
      ))}
      <Screen x={0} y={2} z={-1.8} width={2.6} active={active} />
    </>
  );
}
function Modeling({ stop, active }: { stop: CampusStop; active: boolean }) {
  return (
    <>
      <Block position={[0, 0.1, 0]} size={[6.4, 0.2, 4.3]} color="#d6c9b6" />
      <Block
        position={[-1.6, 1.75, 0]}
        size={[2.5, 3.2, 3.5]}
        color="#dfd0b6"
      />
      <Block position={[0.7, 1.1, 0]} size={[2.4, 2, 3.5]} color="#e7decc" />
      <Block position={[2.2, 0.6, 0]} size={[1.1, 1, 3.5]} color="#d9c4a5" />
      <Block
        position={[-1.6, 3.45, 0]}
        size={[2.8, 0.2, 3.8]}
        color={stop.color}
      />
      <Block
        position={[0.7, 2.2, 0]}
        size={[2.5, 0.18, 3.8]}
        color={stop.color}
      />
      <Screen x={-1.6} y={2.2} z={1.8} width={2} active={active} />
      {[-0.25, 0.4, 1.05].map((x, i) => (
        <Block
          key={x}
          position={[x, 0.8, 1.81]}
          size={[0.45, 0.3 + i * 0.3, 0.08]}
          color={active ? "#e4b86f" : "#56877c"}
        />
      ))}
      <Block
        position={[-1.55, 0.85, 1.8]}
        size={[0.65, 1.4, 0.1]}
        color="#3c585d"
      />
    </>
  );
}
function Exhibit({ stop, active }: { stop: CampusStop; active: boolean }) {
  return (
    <>
      <Block position={[0, 0.1, 0]} size={[3.8, 0.2, 2.6]} color="#d6c9b6" />
      <Block
        position={[0, 0.9, 0.15]}
        size={[2.9, 0.16, 1.1]}
        color="#ac8059"
      />
      {[-1.15, 1.15].map((x) => (
        <Block
          key={x}
          position={[x, 0.45, 0.15]}
          size={[0.13, 0.9, 0.8]}
          color="#425e58"
        />
      ))}
      {stop.visual === "evidence" ? (
        <>
          <Block
            position={[0, 1.65, -0.7]}
            size={[3, 1.8, 0.15]}
            color="#4e5e78"
          />
          {[-0.8, 0, 0.8].map((x, i) => (
            <group key={x}>
              <Block
                position={[x, 1.85 + (i % 2) * 0.2, -0.6]}
                size={[0.55, 0.5, 0.02]}
                color="#efdfbc"
              />
              <Block
                position={[x + 0.32, 1.65, -0.57]}
                size={[0.6, 0.035, 0.02]}
                color="#d48b76"
              />
            </group>
          ))}
          <Screen x={0.65} y={1.35} z={0.5} width={0.85} active={active} />
        </>
      ) : stop.visual === "scouting" ? (
        <>
          <Block
            position={[0, 2.7, 0]}
            size={[3.6, 0.15, 2.3]}
            color={stop.color}
          />
          {[-1.5, 1.5].map((x) => (
            <Block
              key={x}
              position={[x, 1.4, -0.7]}
              size={[0.12, 2.7, 0.12]}
              color="#ece0c8"
            />
          ))}
          <Block
            position={[0, 1.8, -0.8]}
            size={[2.5, 1.2, 0.1]}
            color="#41735b"
          />
          {[-0.8, 0, 0.8].map((x) => (
            <Block
              key={x}
              position={[x, 1.8, -0.73]}
              size={[0.03, 1, 0.02]}
              color="#d9e0c8"
            />
          ))}
        </>
      ) : stop.visual === "finance-kiosk" ? (
        <>
          <Block
            position={[0, 1.1, -0.55]}
            size={[1.3, 2.2, 0.8]}
            color={stop.color}
          />
          <Screen y={1.65} z={-0.1} width={1.1} active={active} />
          {[0, 1, 2].map((i) => (
            <Round
              key={i}
              position={[1, 1.04 + i * 0.12, 0.2]}
              radius={0.3}
              height={0.1}
              color="#d1a553"
            />
          ))}
        </>
      ) : (
        <>
          <Screen x={-0.65} y={1.55} z={-0.3} width={1.15} active={active} />
          <Screen x={0.7} y={1.7} z={-0.45} width={1.15} active={active} />
          <Block
            position={[0, 0.99, 0.3]}
            size={[1.2, 0.06, 0.3]}
            color="#39474f"
          />
        </>
      )}
    </>
  );
}
function Office({ stop, index }: { stop: CampusStop; index: number }) {
  const h = stop.height;
  return (
    <>
      <Block position={[0, 0.1, 0]} size={[4.2, 0.2, 3.2]} color="#d6c9b6" />
      <Block
        position={[0, h / 2, 0]}
        size={[3.8, h, 2.8]}
        color={index % 2 ? "#d8d7c5" : "#d5bd9f"}
      />
      {stop.id === "clavius" ? (
        <mesh position={[0, h + 0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[2.7, 1.2, 4]} />
          <meshStandardMaterial color={stop.color} />
        </mesh>
      ) : (
        <Block
          position={[index % 2 ? 0.4 : 0, h + 0.1, 0]}
          size={[index % 2 ? 3.4 : 4.2, 0.22, 3.2]}
          color={stop.color}
        />
      )}
      {[-1.1, 0, 1.1].map((x) => (
        <Block
          key={x}
          position={[x, h - 0.8, 1.41]}
          size={[0.65, 0.7, 0.05]}
          color="#b9d3cc"
          emissive="#3a3d25"
        />
      ))}
      <Block
        position={[0, 0.9, 1.43]}
        size={[0.8, 1.8, 0.08]}
        color="#35565b"
      />
      {stop.id === "sofi" && (
        <Block
          position={[-1.65, h / 2, 0]}
          size={[0.4, h + 0.2, 3]}
          color={stop.color}
        />
      )}
      {stop.id === "murj" && (
        <Block
          position={[1.2, h + 0.4, 0]}
          size={[1.1, 0.7, 2]}
          color={stop.color}
        />
      )}
    </>
  );
}
function School({ stop }: { stop: CampusStop }) {
  const amherst = stop.id === "amherst";
  return <group>
    <Block position={[0, 0.1, 0]} size={[6.2, 0.2, 4.6]} color="#d6c9b6" />
    <Block position={[0, 1.6, 0]} size={[5.6, 3, 3.6]} color={amherst ? "#a57463" : "#e2d2ad"} />
    <mesh position={[0, 3.45, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1.4, 1, 0.9]} castShadow>
      <coneGeometry args={[2.8, 1.15, 4]} /><meshStandardMaterial color={amherst ? "#666961" : "#9b6752"} />
    </mesh>
    {[-2, -1, 1, 2].flatMap((x) => [1, 2.35].map((y) => <Block key={`${x}:${y}`} position={[x, y, 1.81]} size={[0.46, 0.66, 0.05]} color="#485f63" />))}
    <Block position={[0, 0.86, 1.84]} size={[0.8, 1.6, 0.09]} color="#4b5146" />
    {[-1.3, -0.65, 0.65, 1.3].map((x) => <Round key={x} position={[x, 1.42, 2.02]} radius={0.12} height={2.45} color="#f0e7d4" sides={8} />)}
    <Block position={[0, 2.72, 2]} size={[3.2, 0.22, 0.5]} color="#f0e7d4" />
    {amherst ? <>
      <Block position={[0, 4.1, 0]} size={[1.1, 1.4, 1.1]} color="#ece6d7" />
      <Block position={[0, 4.3, 0.56]} size={[0.48, 0.55, 0.03]} color="#657173" />
      <mesh position={[0, 5.08, 0]} rotation={[0, Math.PI / 4, 0]} castShadow><coneGeometry args={[0.85, 0.85, 4]} /><meshStandardMaterial color="#ece6d7" /></mesh>
    </> : <>
      {[-2.3, 2.3].map((x) => <Block key={x} position={[x, 1.5, 0]} size={[0.25, 3, 3.8]} color="#f3e8cd" />)}
      <Block position={[0, 3.04, 2.02]} size={[1.5, 0.62, 0.22]} color="#e2d2ad" />
    </>}
    {stop.logo && <Html transform position={[0, 3.04, 2.15]} distanceFactor={10} style={{ pointerEvents: "none" }} zIndexRange={[3, 0]}>
      <Image src={stop.logo} alt={`${stop.title} emblem`} width={48} height={48} className="campus-school-logo" />
    </Html>}
  </group>;
}
function Hobby({ stop }: { stop: CampusStop }) {
  switch (stop.visual) {
    case "basketball":
      return (
        <>
          <Block
            position={[0, 0.04, 0]}
            size={[5.5, 0.08, 5]}
            color="#af7453"
          />
          {[-2.5, 2.5].map((x) => (
            <Block
              key={x}
              position={[x, 0.09, 0]}
              size={[0.035, 0.01, 4.7]}
              color="#ebdfc3"
            />
          ))}
          {[-2.3, 2.3].map((z) => (
            <Block
              key={z}
              position={[0, 0.09, z]}
              size={[5, 0.01, 0.035]}
              color="#ebdfc3"
            />
          ))}
          <Block
            position={[0, 1.65, -2.25]}
            size={[0.13, 3.3, 0.13]}
            color="#4c5556"
          />
          <Block
            position={[0, 3, -2.1]}
            size={[1.6, 1, 0.12]}
            color="#eee4d1"
          />
          <mesh position={[0, 2.7, -1.65]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.045, 6, 20]} />
            <meshStandardMaterial color="#d78449" />
          </mesh>
          <mesh position={[0.8, 0.3, 0.8]}>
            <sphereGeometry args={[0.27, 12, 8]} />
            <meshStandardMaterial color="#bc6c32" />
          </mesh>
        </>
      );
    case "lifting":
      return (
        <>
          <Block
            position={[0, 0.06, 0]}
            size={[3.1, 0.12, 2.3]}
            color="#536460"
          />
          {[-0.9, 0.9].map((x) => (
            <Block
              key={x}
              position={[x, 1.1, 0]}
              size={[0.13, 2.2, 0.13]}
              color="#adb4ae"
            />
          ))}
          <Block
            position={[0, 1.7, 0]}
            size={[2.6, 0.1, 0.1]}
            color="#b7c0bf"
          />
          {[-1.05, 1.05].map((x) => (
            <mesh key={x} position={[x, 1.7, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.4, 0.4, 0.25, 12]} />
              <meshStandardMaterial color="#354148" />
            </mesh>
          ))}
        </>
      );
    case "lego":
      return (
        <>
          <Bench />
          {[-0.7, 0, 0.7].map((x, i) => (
            <group key={x}>
              <Block
                position={[x, 0.8, 0]}
                size={[0.55, 0.35, 0.5]}
                color={["#7c9a70", "#d8bd56", "#9ea9b6"][i]}
              />
              {[-0.14, 0.14].map((dx) => (
                <Round
                  key={dx}
                  position={[x + dx, 1, 0]}
                  radius={0.08}
                  height={0.08}
                  color="#d6bc60"
                  sides={8}
                />
              ))}
            </group>
          ))}
        </>
      );
    case "gaming":
      return (
        <>
          <Block
            position={[0, 0.4, 0.4]}
            size={[2.5, 0.8, 0.9]}
            color="#796985"
          />
          <Block
            position={[0, 0.8, 0.8]}
            size={[2.5, 0.8, 0.2]}
            color="#796985"
          />
          <Screen y={1.5} z={-0.7} width={2} />
          <Block
            position={[0, 0.85, 0.2]}
            size={[0.5, 0.12, 0.25]}
            color="#343541"
          />
        </>
      );
    case "cooking":
      return (
        <>
          <Block
            position={[0, -0.005, 0]}
            size={[4.4, 0.07, 3.2]}
            color="#d2b995"
          />
          <Round
            position={[0, 0.9, 0]}
            radius={0.75}
            height={0.3}
            color="#424a45"
          />
          <Block
            position={[0, 0.4, 0]}
            size={[0.15, 0.8, 0.15]}
            color="#4b5753"
          />
          <Block position={[1, 0.8, 0]} size={[0.8, 0.1, 1]} color="#b18c63" />
          {[-0.3, 0, 0.3].map((x) => (
            <Block
              key={x}
              position={[x, 1.07, 0]}
              size={[0.15, 0.03, 0.8]}
              color="#bf7c43"
            />
          ))}
        </>
      );
    case "anime":
      return (
        <>
          <Block position={[0, 1, 0]} size={[2, 2, 0.15]} color="#745764" />
          <Round
            position={[0, 1.25, 0.15]}
            radius={0.55}
            height={0.1}
            color="#bca688"
          />
          <Block
            position={[0, 0.35, 0.3]}
            size={[2.3, 0.12, 0.9]}
            color="#9d7554"
          />
        </>
      );
    case "pokemon":
      return (
        <>
          <Round
            position={[0, 0.3, 0]}
            radius={0.8}
            height={0.6}
            color="#b8a17c"
          />
          <mesh position={[0, 1, 0]}>
            <sphereGeometry
              args={[0.55, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]}
            />
            <meshStandardMaterial color="#ba5350" />
          </mesh>
          <mesh position={[0, 1, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry
              args={[0.55, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]}
            />
            <meshStandardMaterial color="#ebe2c8" />
          </mesh>
          <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.54, 0.055, 6, 24]} />
            <meshStandardMaterial color="#394443" />
          </mesh>
        </>
      );
    case "hiking":
      return (
        <>
          <Block
            position={[0, 0.1, 0]}
            size={[3.6, 0.2, 2.2]}
            color="#a98e6b"
          />
          <Bench position={[0, 0, -0.4]} />
          {[-1.7, 1.7].map((x) => (
            <Block
              key={x}
              position={[x, 0.65, -1]}
              size={[0.1, 1.3, 0.1]}
              color="#655a48"
            />
          ))}
          <Block
            position={[0, 1.2, -1]}
            size={[3.5, 0.1, 0.1]}
            color="#655a48"
          />
        </>
      );
    default:
      return null;
  }
}

export function Landmark({
  stop,
  index,
  active,
  reducedMotion,
  onSelect,
  onHover,
}: {
  stop: CampusStop;
  index: number;
  active: boolean;
  reducedMotion: boolean;
  onSelect: (stop: CampusStop) => void;
  onHover: (id: string | null) => void;
}) {
  const pulse = useRef<Group>(null);
  const model = useRef<Group>(null);
  const distance = Math.min(1, Math.hypot(stop.position[0], stop.position[1] - 4.8) / 48);
  const scale = stop.id === "about" ? 1 : 1 - distance * 0.1;
  useEffect(() => {
    if (!model.current || stop.id === "about") return;
    const restores: (() => void)[] = [];
    model.current.traverse((object) => {
      if (!(object instanceof Mesh) || !(object.material instanceof MeshStandardMaterial)) return;
      const original = object.material;
      const material = original.clone();
      const hsl = { h: 0, s: 0, l: 0 };
      material.color.getHSL(hsl);
      material.color.setHSL(hsl.h, hsl.s * (1 - distance * 0.18), hsl.l);
      object.material = material;
      restores.push(() => { object.material = original; material.dispose(); });
    });
    return () => restores.forEach((restore) => restore());
  }, [active, distance, stop.id]);
  useFrame(({ clock }) => {
    if (pulse.current)
      pulse.current.position.y =
        active && !reducedMotion ? Math.sin(clock.elapsedTime * 2) * 0.06 : 0;
  });
  const hobby = stop.kind === "hobby";
  return (
    <group
      position={[stop.position[0], 0, stop.position[1]]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(stop.id);
      }}
      onPointerOut={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(stop);
      }}
    >
      <group ref={model} scale={scale}>
      {stop.visual === "committee" ? (
        <Pavilion stop={stop} active={active} />
      ) : stop.visual === "modeling" ? (
        <Modeling stop={stop} active={active} />
      ) : stop.group === "Projects" ? (
        <Exhibit stop={stop} active={active} />
      ) : stop.visual === "college" ? (
        <School stop={stop} />
      ) : stop.visual === "office" ? (
        <Office stop={stop} index={index} />
      ) : hobby ? (
        <Hobby stop={stop} />
      ) : stop.visual === "powerwashing" ? (
        <>
          <Block
            position={[0, 0.1, 0]}
            size={[2.2, 0.2, 1.8]}
            color="#d6c9b6"
          />
          <Block
            position={[0, 0.55, 0]}
            size={[0.85, 0.8, 0.65]}
            color={stop.color}
          />
          {[-0.55, 0.55].map((x) => (
            <mesh
              key={x}
              position={[x, 0.3, 0.12]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.24, 0.24, 0.13, 12]} />
              <meshStandardMaterial color="#314943" />
            </mesh>
          ))}
          <Block
            position={[0, 1.2, -0.2]}
            size={[0.7, 0.08, 0.08]}
            color="#314943"
          />
          {[-0.31, 0.31].map((x) => (
            <Block
              key={x}
              position={[x, 0.95, -0.2]}
              size={[0.07, 0.55, 0.07]}
              color="#314943"
            />
          ))}
          <mesh position={[0.78, 0.8, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.07, 1.4, 0.07]} />
            <meshStandardMaterial color="#314943" />
          </mesh>
        </>
      ) : stop.visual === "milestone" ? (
        <><Block position={[0, 0.1, 0]} size={[1.8, 0.2, 1]} color="#d6c9b6" /><Block position={[0, 0.7, 0]} size={[1.4, 1.4, 0.6]} color="#c2ae8c" /></>
      ) : (
        <>
          <Round
            position={[0, 0.08, 0]}
            radius={4.2}
            height={0.16}
            color="#ded0b6"
          />
          <Round
            position={[0, 0.14, 0]}
            radius={3.2}
            height={0.08}
            color="#c5b697"
          />
          <Bench position={[-2.5, 0, -1]} />
          <Bench position={[2.5, 0, -1]} />
        </>
      )}
      </group>
      <group ref={pulse}>
        <mesh
          position={[
            stop.entrance[0] - stop.position[0],
            0.04,
            stop.entrance[1] - stop.position[1],
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.28, active ? 0.5 : 0.36, 24]} />
          <meshBasicMaterial color={active ? "#f5d292" : "#b9b09b"} />
        </mesh>
      </group>
      {stop.id !== "about" && (
        <Html
          position={[
            stop.id === "cooking" ? -3 : 0,
            stop.height + (stop.id === "aml" ? 0.45 : stop.group === "Projects" ? 1.15 : 0.85),
            0,
          ]}
          center
          zIndexRange={[10, 0]}
          style={{ pointerEvents: "none" }}
        >
          <button
            className={`campus-label ${stop.discoveryOnly ? "is-discovery" : ""} ${active ? "is-active" : ""}`}
            aria-label={`Explore ${stop.title}`}
            data-stop-id={stop.id}
            onPointerEnter={() => onHover(stop.id)}
            onPointerLeave={() => onHover(null)}
            onFocus={() => onHover(stop.id)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(stop)}
          >
            {stop.discoveryOnly && <span className="campus-discovery-dot" aria-hidden="true" />}
            {stop.logo && stop.group !== "Education" && (
              <Image
                src={stop.logo}
                alt=""
                width={70}
                height={24}
                className={
                  stop.id === "clavius" ? "campus-company-logo clavius-logo" : stop.id === "caprae"
                    ? "campus-company-logo caprae-logo"
                    : "campus-company-logo"
                }
              />
            )}
            {(!stop.logo || stop.group === "Education") && <span className="campus-label-title">{stop.signTitle ?? stop.title}</span>}
          </button>
        </Html>
      )}
    </group>
  );
}

const trees = [
  [-23, -20],
  [-21, -12],
  [-23, 7],
  [-20, 13],
  [-17, 16],
  [-11, 17],
  [-6, 19],
  [5, 19],
  [11, 18],
  [22, 17],
  [22, 10],
  [22, 2],
  [23, -5],
  [22, -15],
  [15, -18],
  [11, -20],
  [-14, -20],
  [-22, -8],
  [-12, 0],
  [0, -12],
];
export function Grounds() {
  return (
    <>
      <Block
        position={[0, -0.55, 0]}
        size={[50 * CAMPUS_SPACING, 1, 44 * CAMPUS_SPACING]}
        color="#627d65"
      />
      {campusZones.map((zone, index) => (
        <mesh
          key={index}
          position={[0, -0.025, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <shapeGeometry args={[zoneShapes[index]]} />
          <meshStandardMaterial color={zone.color} roughness={1} />
        </mesh>
      ))}
      {campusGardenBorders.map((border, index) => (
        <group
          key={index}
          position={[border.position[0], 0, border.position[1]]}
        >
          <Block
            position={[0, 0.05, 0]}
            size={[border.size[0] + 0.15, 0.1, border.size[1] + 0.15]}
            color="#b2ac8d"
          />
          <Block
            position={[0, 0.3, 0]}
            size={[border.size[0], 0.5, border.size[1]]}
            color="#3d6349"
          />
        </group>
      ))}
      {campusPaths.map((path, index) => (
        <Block
          key={index}
          position={[
            (path.from[0] + path.to[0]) / 2,
            0.01,
            (path.from[1] + path.to[1]) / 2,
          ]}
          size={[
            Math.abs(path.to[0] - path.from[0]) + path.width,
            0.06,
            Math.abs(path.to[1] - path.from[1]) + path.width,
          ]}
          color="#cbbda2"
        />
      ))}
      <Block
        position={[17 * CAMPUS_SPACING, 0.04, -14.2 * CAMPUS_SPACING]}
        size={[8, 0.07, 3.6]}
        color="#4d7658"
      />
      {[14, 16, 18, 20].map((x) => (
        <Block
          key={x}
          position={[
            17 * CAMPUS_SPACING + x - 17,
            0.09,
            -14.2 * CAMPUS_SPACING,
          ]}
          size={[0.045, 0.01, 3.1]}
          color="#d4d6b4"
        />
      ))}
      {trees.map(([x, z], i) => (
        <group key={i} position={[x * CAMPUS_SPACING, 0, z * CAMPUS_SPACING]}>
          <Block
            position={[0, 0.8, 0]}
            size={[0.22, 1.6, 0.22]}
            color="#836b50"
          />
          <mesh position={[0, 2, 0]} castShadow>
            <icosahedronGeometry args={[1 + (i % 3) * 0.15, 0]} />
            <meshStandardMaterial
              color={i % 4 === 0 ? "#bd9a62" : "#426c55"}
              flatShading
            />
          </mesh>
        </group>
      ))}
      {[
        [-3, 6],
        [3, 2],
        [-10, -10],
        [7, -11],
        [5, 6],
        [-12, 8],
        [18, 12],
      ].map(([x, z], i) => (
        <group key={i} position={[x * CAMPUS_SPACING, 0, z * CAMPUS_SPACING]}>
          <Block position={[0, 1.5, 0]} size={[0.1, 3, 0.1]} color="#314b43" />
          <Block
            position={[0, 3, 0]}
            size={[0.4, 0.18, 0.4]}
            color="#ffda97"
            emissive="#d89946"
          />
          {i < 3 && (
            <pointLight
              position={[0, 2.8, 0]}
              intensity={4}
              distance={6}
              color="#ffd19a"
            />
          )}
        </group>
      ))}
      {campusDistricts.map((district) => <DistrictSign key={district.label} sign={district} />)}
    </>
  );
}

function DistrictSign({ sign }: { sign: (typeof campusDistricts)[number] }) {
  const { width, style } = sign;
  const boardY = 2.35;
  const posts = style === "trail" ? [0] : [-width / 2 + 0.4, width / 2 - 0.4];
  return <group position={sign.position} rotation={[0, sign.rotation, 0]}>
    {posts.map((x) => <Block key={x} position={[x, 1.5, 0]} size={[0.24, 3, 0.26]} color="#745339" />)}
    <Block position={[0, boardY, 0]} size={[width, 1.35, 0.22]} color="#684932" />
    {style === "framed" && <>
      {[-0.64, 0.64].map((y) => <Block key={y} position={[0, boardY + y, 0]} size={[width + 0.2, 0.13, 0.3]} color="#a67e54" />)}
      {[-width / 2, width / 2].map((x) => <Block key={x} position={[x, boardY, 0]} size={[0.13, 1.4, 0.3]} color="#a67e54" />)}
    </>}
    {style === "formal" && <Block position={[0, 3.05, 0]} size={[width + 0.2, 0.18, 0.38]} color="#a67e54" />}
    {style === "broad" && <Block position={[0, boardY - 0.45, 0.13]} size={[width - 0.4, 0.04, 0.02]} color="#a67e54" />}
    {style === "trail" && <Block position={[0, 3.05, 0]} size={[0.38, 0.16, 0.38]} color="#a67e54" />}
    <Html transform position={[0, boardY, 0.125]} distanceFactor={10} style={{ pointerEvents: "none" }} zIndexRange={[2, 0]}>
      <span className="campus-district" style={{ width: (width - 0.8) * 40, fontSize: sign.label === "Entrepreneurship" ? 28 : undefined }}>{sign.label}</span>
    </Html>
  </group>;
}
