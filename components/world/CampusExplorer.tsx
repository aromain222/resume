"use client";

// Explore World: a compact, warm-stone campus inside the existing portfolio.
// The scene leads; walking reveals work, while the directory keeps it immediate.
// Scope: this section only. Procedural geometry, quiet camera, existing type/colors.
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, ExternalLink, Map, X } from "lucide-react";
import {
  campus,
  campusGroups,
  campusPaths,
  campusZones,
  CAMPUS_BOUNDS,
  type CampusStop,
} from "@/lib/campus";
import { useTabNavigation } from "../TabNavigationContext";
import type { TravelRequest } from "./CampusScene";
import styles from "./campus.module.css";

const Scene = dynamic(() => import("./CampusScene"), { ssr: false });
const HobbyGame = dynamic(() => import("./HobbyGame"), {
  ssr: false,
  loading: () => <p role="status">Opening game…</p>,
});

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function DetailPanel({
  stop,
  onClose,
  reducedMotion,
}: {
  stop: CampusStop;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const panel = useRef<HTMLElement>(null);
  const [gameOpen, setGameOpen] = useState(false);
  const { goTo } = useTabNavigation();
  useEffect(() => {
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => previous?.focus({ preventScroll: true });
  }, []);

  return (
    <aside
      ref={panel}
      className={styles.panel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-detail-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
        if (event.key !== "Tab") return;
        const elements = Array.from(
          panel.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), summary, [tabindex="0"]',
          ) ?? [],
        );
        const first = elements[0],
          last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <div className={styles.panelTop}>
        <span>{stop.group}</span>
        <button
          className={styles.iconButton}
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={20} />
        </button>
      </div>
      <h2 id="campus-detail-title">
        {stop.id === "about" ? "Avery Romain" : stop.title}
      </h2>
      {stop.role && (
        <p className={styles.role}>
          {stop.role} · {stop.period}
        </p>
      )}
      <p className={styles.description}>{stop.description}</p>
      {stop.game && (
        <div className={styles.gameEntry}>
          <button
            aria-expanded={gameOpen}
            aria-controls={`game-${stop.id}`}
            onClick={() => setGameOpen(!gameOpen)}
          >
            {gameOpen
              ? "Close game"
              : stop.game === "basketball"
                ? "Shoot some hoops"
                : stop.game === "pokemon"
                  ? "Play Pokémon pairs"
                  : stop.game === "cooking"
                    ? "Cook an order"
                    : "Build a bonsai"}{" "}
            {gameOpen ? <X size={15} /> : <ArrowRight size={15} />}
          </button>
          <div id={`game-${stop.id}`}>
            {gameOpen && (
              <HobbyGame game={stop.game} reducedMotion={reducedMotion} />
            )}
          </div>
        </div>
      )}
      {stop.image && (
        <Image
          src={stop.image}
          alt={stop.imageAlt ?? stop.title}
          width={800}
          height={500}
          className={styles.projectImage}
        />
      )}
      {stop.workflow && (
        <div className={styles.workflow}>
          <small>Workflow illustration — not a live feed</small>
          <p>{stop.workflow.join(" → ")}</p>
        </div>
      )}
      {stop.kind !== "hobby" && (
        <section className={styles.detailSection}>
          <h3>
            {stop.kind === "about"
              ? "Background"
              : stop.kind === "experience"
                ? "My role"
                : "What it does"}
          </h3>
          <ul className={styles.bullets}>
            {stop.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      )}
      {!!stop.technologies.length && (
        <details className={styles.technologies}>
          <summary>Tools &amp; technologies</summary>
          <p>{stop.technologies.join(" · ")}</p>
        </details>
      )}
      {!!stop.links.length && (
        <div className={styles.links}>
          {stop.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("https:") ? "_blank" : undefined}
              rel={
                link.href.startsWith("https:")
                  ? "noopener noreferrer"
                  : undefined
              }
              onClick={(event) => {
                if (link.href === "#work" || link.href === "#path") {
                  event.preventDefault();
                  onClose();
                  goTo(link.href === "#work" ? "work" : "path");
                }
              }}
            >
              {link.label}
              {link.href.startsWith("https:") ? (
                <ExternalLink size={15} />
              ) : (
                <ArrowRight size={15} />
              )}
            </a>
          ))}
        </div>
      )}
      <button className={styles.continueButton} onClick={onClose}>
        Continue exploring <ArrowRight size={16} />
      </button>
    </aside>
  );
}

export default function CampusExplorer() {
  const viewport = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [listMode, setListMode] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdPreview = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);
  const hover = useCallback((id: string | null) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (id) setHovered(id);
    else
      hoverTimer.current = setTimeout(() => {
        const focused =
          document.activeElement instanceof HTMLElement
            ? document.activeElement.closest<HTMLElement>("[data-stop-id]")
                ?.dataset.stopId
            : null;
        setHovered(focused ?? null);
      }, 450);
  }, []);
  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );
  const [nearby, setNearby] = useState<string | null>(null);
  const [visited, setVisited] = useState<ReadonlySet<string>>(() => new Set());
  const visit = useCallback((id: string | null) => {
    if (id) setVisited((previous) => previous.has(id) ? previous : new Set([...previous, id]));
  }, []);
  const approach = useCallback((id: string | null) => { setNearby(id); visit(id); }, [visit]);
  const [selected, setSelected] = useState<CampusStop | null>(null);
  const [travel, setTravel] = useState<TravelRequest | null>(null);
  const sequence = useRef(0);
  const show3D = desktop && !failed && !listMode;
  const active = campus.find(
    (stop) => stop.id === (hovered ?? (engaged ? nearby : null)),
  );
  const fail = useCallback(() => setFailed(true), []);
  const sceneReady = useCallback(() => setReady(true), []);
  const select = useCallback((stop: CampusStop) => {
    visit(stop.id);
    setSelected(stop);
    setHovered(null);
    setMapOpen(false);
  }, [visit]);
  const ground = useCallback((x: number, z: number) => {
    setTravel({ x, z, sequence: ++sequence.current, walk: true });
    viewport.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const size = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setDesktop(size.matches);
      setReducedMotion(motion.matches);
    };
    update();
    size.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      size.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!show3D) return;
    const frame = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        if (!gl) setFailed(true);
        else gl.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        setFailed(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [show3D]);

  const close = useCallback(() => {
    setSelected(null);
    viewport.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    if (!mapOpen) return;
    const closeMap = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMapOpen(false);
      viewport.current?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", closeMap);
    return () => window.removeEventListener("keydown", closeMap);
  }, [mapOpen]);
  useEffect(() => {
    if (!selected) return;
    // A docked modal keeps focus on the project without changing site navigation.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);

  return (
    <section className={styles.world} aria-label="Explore World">
      <div className={styles.heading}>
        <div>
          <h1>Avery’s campus</h1>
          <p>Explore my work and the things I enjoy outside it.</p>
        </div>
        <a href="/resume">
          View resume <ArrowRight size={16} />
        </a>
      </div>
      <div className={styles.toolbar}>
        {show3D && !visited.has("amherst") ? <button onClick={() => {
          const stop = campus.find((item) => item.id === "amherst")!;
          setTravel({ x: stop.entrance[0], z: stop.entrance[1], sequence: ++sequence.current });
          setEngaged(true);
          viewport.current?.focus({ preventScroll: true });
        }}>Start here: Amherst College <ArrowRight size={14} /></button> : <span>{show3D ? "Explore at your own pace" : "Find a place"}</span>}
        <div>
          {desktop && !failed && (
            <button
              onClick={() => {
                setListMode(!listMode);
                setReady(false);
                setMapOpen(false);
              }}
            >
              {listMode ? "Explore in 3D" : "Browse as a list"}
            </button>
          )}
          {show3D && (
            <button
              aria-expanded={mapOpen}
              onClick={() => setMapOpen(!mapOpen)}
            >
              <Map size={16} /> Map <kbd>M</kbd>
            </button>
          )}
        </div>
      </div>
      {show3D ? (
        <div
          ref={viewport}
          className={styles.viewport}
          tabIndex={0}
          role="region"
          aria-label="Interactive campus. Click here, then use WASD or arrow keys to move, E to explore, M for map."
          onPointerDown={(event) => {
            setEngaged(true);
            if (
              event.target === event.currentTarget ||
              event.target instanceof HTMLCanvasElement
            )
              viewport.current?.focus({ preventScroll: true });
          }}
          onKeyDown={(event) => {
            setEngaged(true);
            const key = event.key.toLowerCase();
            if (key === "escape") {
              setMapOpen(false);
              setSelected(null);
              viewport.current?.focus({ preventScroll: true });
              return;
            }
            if (key === "e" && active && !mapOpen && !selected) {
              event.preventDefault();
              select(active);
              return;
            }
            if (
              event.target instanceof HTMLElement &&
              event.target.closest("button,a")
            )
              return;
            if (key === "m") {
              event.preventDefault();
              setMapOpen(!mapOpen);
            }
          }}
        >
          <SceneBoundary onFailure={fail}>
            <Scene
              visited={visited}
              activeId={selected?.id ?? active?.id ?? null}
              onHover={hover}
              viewport={viewport}
              paused={!!selected || mapOpen}
              reducedMotion={reducedMotion}
              travel={travel}
              onNearby={approach}
              onSelect={select}
              onReady={sceneReady}
              onFailure={fail}
              onGround={ground}
            />
          </SceneBoundary>
          <div className={styles.edgeMist} aria-hidden="true" />
          {!ready && (
            <div className={styles.loading} role="status">
              Preparing the campus…
            </div>
          )}
          <div className={styles.sceneCaption} aria-hidden="true">
            AMHERST ’27 · AVERY ROMAIN
          </div>
          {active && !mapOpen && !selected && (
            <aside
              className={styles.preview}
              aria-label="Destination preview"
              onPointerEnter={holdPreview}
              onPointerLeave={() => hover(null)}
              onFocusCapture={holdPreview}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  hover(null);
              }}
            >
              <h2>{active.title}</h2>
              {active.role && (
                <p className={styles.previewRole}>
                  {active.role} · {active.period}
                </p>
              )}
              <ul>
                {active.bullets.slice(0, 3).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div>
                <button onClick={() => select(active)}>
                  {active.game ? "Take a break" : "Read more"} <kbd>E</kbd>
                </button>
                {active.links.find((link) =>
                  link.href.startsWith("https:"),
                ) && (
                  <a
                    href={
                      active.links.find((link) =>
                        link.href.startsWith("https:"),
                      )!.href
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {
                      active.links.find((link) =>
                        link.href.startsWith("https:"),
                      )!.label
                    }{" "}
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </aside>
          )}
          {mapOpen && (
            <div className={styles.map} aria-label="Campus map">
              <div className={styles.mapHeading}>
                <h2>Where to?</h2>
                <button
                  className={styles.iconButton}
                  aria-label="Close map"
                  onClick={() => {
                    setMapOpen(false);
                    viewport.current?.focus();
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <p>Choose a destination to travel there.</p>
              <div className={styles.mapDiagram} aria-hidden="true">
                <svg
                  viewBox={`${-CAMPUS_BOUNDS.x - 2} ${-CAMPUS_BOUNDS.z - 2} ${CAMPUS_BOUNDS.x * 2 + 4} ${CAMPUS_BOUNDS.z * 2 + 4}`}
                >
                  {campusZones.map((zone, index) => (
                    <polygon
                      key={index}
                      points={zone.polygon
                        .map((point) => point.join(","))
                        .join(" ")}
                      fill={zone.color}
                      opacity={0.7}
                    />
                  ))}
                  {campusPaths.map((path, index) => (
                    <line
                      key={index}
                      x1={path.from[0]}
                      y1={path.from[1]}
                      x2={path.to[0]}
                      y2={path.to[1]}
                      stroke="#c9c3b6"
                      strokeWidth={path.width}
                    />
                  ))}
                  {campus.map((stop) => (
                    <rect
                      key={stop.id}
                      x={stop.position[0] - 1.5}
                      y={stop.position[1] - 1.5}
                      width="3"
                      height="3"
                      rx="0.4"
                      fill={stop.color}
                    />
                  ))}
                </svg>
              </div>
              {campusGroups.map((group) => (
                <section key={group}>
                  <h3 className={styles.groupTitle}>{group}</h3>
                  {campus
                    .filter((stop) => stop.group === group)
                    .map((stop) => (
                      <button
                        key={stop.id}
                        className={styles.mapDestination}
                        onClick={() => {
                          setEngaged(true);
                          setTravel({
                            x: stop.entrance[0],
                            z: stop.entrance[1],
                            sequence: ++sequence.current,
                          });
                          setHovered(null);
                          setMapOpen(false);
                          viewport.current?.focus({ preventScroll: true });
                        }}
                      >
                        {stop.title}
                        <ArrowRight size={15} />
                      </button>
                    ))}
                </section>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.directory}>
          {failed && (
            <p role="status">
              Your browser couldn’t display the 3D world. Every destination is
              available below.
            </p>
          )}
          {campusGroups.map((group) => (
            <section key={group} className={styles.directoryGroup}>
              <h2 className={styles.groupTitle}>{group}</h2>
              {campus
                .filter((stop) => stop.group === group)
                .map((stop) => (
                  <button key={stop.id} onClick={() => select(stop)}>
                    <span>
                      <strong>{stop.title}</strong>
                      {stop.role && (
                        <span>
                          {stop.role} · {stop.period}
                        </span>
                      )}
                      <span>{stop.description}</span>
                    </span>
                    <ArrowRight size={20} />
                  </button>
                ))}
            </section>
          ))}
        </div>
      )}
      {show3D && (
        <div className={styles.footer}>
          <span>Hover a dot to discover a place. Click the campus to walk.</span>
          <span>
            <kbd>WASD</kbd> / arrows · Move <kbd>E</kbd> Explore <kbd>M</kbd>{" "}
            Map <kbd>Esc</kbd> Close
          </span>
        </div>
      )}
      {show3D && (
        <nav
          className={styles.quickLinks}
          aria-label="Explore a destination directly"
        >
          {campusGroups.map((group) => (
            <details key={group}>
              <summary>{group}</summary>
              <div>
                {campus
                  .filter((stop) => stop.group === group)
                  .map((stop) => (
                    <button
                      key={stop.id}
                      onClick={() => select(stop)}
                      onFocus={() => hover(stop.id)}
                      onBlur={() => hover(null)}
                      onPointerEnter={() => hover(stop.id)}
                      onPointerLeave={() => hover(null)}
                    >
                      {stop.title}
                    </button>
                  ))}
              </div>
            </details>
          ))}
        </nav>
      )}
      {selected && (
        <>
          <div className={styles.scrim} onClick={close} />
          <DetailPanel
            key={selected.id}
            stop={selected}
            onClose={close}
            reducedMotion={reducedMotion}
          />
        </>
      )}
    </section>
  );
}
