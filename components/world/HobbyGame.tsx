"use client";

import { useEffect, useRef, useState } from "react";
import {
  bonsaiComplete,
  bonsaiPattern,
  brickColors,
  shuffledPairs,
  shotScores,
  shotPoint,
  cookingOrders,
  orderMatches,
} from "@/lib/campusGames";
import type { CampusStop } from "@/lib/campus";
import styles from "./hobby-game.module.css";

function Basketball({ reducedMotion }: { reducedMotion: boolean }) {
  const [phase, setPhase] = useState<"ready" | "aiming" | "flying" | "result">(
    "ready",
  );
  const [shots, setShots] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Ready for your first shot.");
  const [untimed, setUntimed] = useState(reducedMotion);
  const [aim, setAim] = useState(0);
  const [made, setMade] = useState(false);
  const marker = useRef<HTMLSpanElement>(null);
  const ball = useRef<SVGGElement>(null);
  const position = useRef(0);
  const manual = untimed || reducedMotion;
  useEffect(() => {
    if (phase !== "aiming" || manual) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      position.current = (Math.sin((now - start) / 620 - Math.PI / 2) + 1) * 50;
      if (marker.current)
        marker.current.style.transform = `translateX(${position.current}%)`;
      frame = requestAnimationFrame(tick);
    };
    const hide = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        setPhase("ready");
        setMessage("Paused. Start the shot when you’re ready.");
      }
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", hide);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [phase, manual]);
  useEffect(() => {
    if (phase !== "flying") return;
    let frame = 0,
      finished = false;
    const start = performance.now();
    const finish = () => {
      if (finished) return;
      finished = true;
      setShots((value) => value + 1);
      setScore((value) => value + Number(made));
      setPhase("result");
      setMessage(
        made
          ? "Swish. Nice shot."
          : aim < 41
            ? "A little early. Aim for the center."
            : "A little late. Aim for the center.",
      );
    };
    const tick = (now: number) => {
      const progress = reducedMotion ? 1 : Math.min(1, (now - start) / 900);
      const point = shotPoint(progress, made);
      ball.current?.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${progress * 300})`,
      );
      if (progress === 1) finish();
      else frame = requestAnimationFrame(tick);
    };
    const hide = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        finish();
      }
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", hide);
    return () => {
      finished = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [phase, made, aim, reducedMotion]);
  function shoot() {
    if (phase !== "aiming") return;
    const value = manual ? aim : position.current;
    setAim(value);
    setMade(shotScores(value));
    setPhase("flying");
    setMessage("Shot in the air…");
  }
  function next() {
    if (phase === "flying") return;
    if (shots === 5) {
      setShots(0);
      setScore(0);
    }
    setAim(0);
    position.current = 0;
    setPhase("aiming");
    setMessage(
      manual
        ? "Set the slider near 50, then shoot."
        : "Release in the green zone.",
    );
  }
  const final = shotPoint(1, made);
  return (
    <section aria-label="Basketball game">
      <h3>Five shots</h3>
      <p>
        {manual
          ? "Aim near 50, then take your shot."
          : "Press Shoot as the marker crosses the green zone."}
      </p>
      <svg
        className={styles.court}
        viewBox="0 0 300 170"
        role="img"
        aria-label={
          phase === "result"
            ? made
              ? "Basket scored"
              : "Shot missed"
            : phase === "flying"
              ? "Shot in flight"
              : "Basketball half-court"
        }
      >
        <rect width="300" height="170" fill="#be8e68" />
        <path
          d="M15 150H285V15H15ZM205 150V65H270V150M205 90H270"
          fill="none"
          stroke="#fff1d5"
          strokeWidth="2"
        />
        <path
          d="M195 80A45 45 0 0 0 280 105"
          fill="none"
          stroke="#fff1d5"
          strokeWidth="2"
        />
        <path
          d="M267 24V88M235 52H280V28H235Z"
          fill="#f2e8d5"
          stroke="#3e554b"
          strokeWidth="3"
        />
        <path
          d="M231 65L236 84H254L259 65M239 67L242 84M251 67L248 84"
          fill="none"
          stroke="#fff1d5"
          strokeWidth="1.5"
        />
        <ellipse
          cx="245"
          cy="64"
          rx="15"
          ry="4"
          fill="none"
          stroke="#823e32"
          strokeWidth="3"
        />
        <g
          ref={ball}
          transform={
            phase === "result"
              ? `translate(${final.x} ${final.y})`
              : "translate(42 138)"
          }
        >
          <circle r="9" fill="#bb6235" stroke="#4e3426" strokeWidth="1.5" />
          <path
            d="M-9 0H9M0-9V9M-6-6Q1 0-6 6M6-6Q-1 0 6 6"
            fill="none"
            stroke="#4e3426"
            strokeWidth="1"
          />
        </g>
      </svg>
      <div className={styles.controlGroup}>
        <div className={styles.meterLabels} aria-hidden="true">
          <span>Early</span>
          <strong>Release zone</strong>
          <span>Late</span>
        </div>
        <div className={styles.meter} aria-hidden="true">
          <span className={styles.zone} />
          <span
            ref={marker}
            className={styles.marker}
            style={{ transform: `translateX(${aim}%)` }}
          />
        </div>
        {manual && (
          <label className={styles.aim}>
            Aim
            <input
              aria-label="Shot aim"
              type="range"
              min="0"
              max="100"
              value={aim}
              disabled={phase !== "aiming"}
              onChange={(e) => setAim(Number(e.target.value))}
            />
            <output>{Math.round(aim)}</output>
          </label>
        )}
        {!reducedMotion && (
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={untimed}
              disabled={phase === "flying"}
              onChange={(e) => {
                setUntimed(e.target.checked);
                setPhase("ready");
              }}
            />{" "}
            Untimed aiming
          </label>
        )}
      </div>
      <div className={styles.gameStatus} role="status">
        {shots === 5 ? `Round complete: ${score} of 5.` : message}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.primary}
          aria-disabled={phase === "flying"}
          onClick={phase === "aiming" ? shoot : next}
        >
          {phase === "flying"
            ? "In the air…"
            : phase === "aiming"
              ? "Shoot"
              : shots === 5
                ? "Play again"
                : shots
                  ? "Next shot"
                  : "Start round"}
        </button>
        <span>
          {score} made · {shots}/5 shots
        </span>
      </div>
    </section>
  );
}

function Pokemon() {
  const [cards, setCards] = useState(() => shuffledPairs());
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);
  const [message, setMessage] = useState(
    "Turn over two cards to find a matching pair.",
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function reveal(index: number) {
    if (open.length === 2 || open.includes(index) || matched.includes(index))
      return;
    const next = [...open, index];
    setOpen(next);
    if (next.length === 1) {
      setMessage(cards[index] + ". Pick another card.");
      return;
    }
    setTurns(turns + 1);
    if (cards[next[0]] === cards[index]) {
      setMatched([...matched, ...next]);
      setOpen([]);
      setMessage(
        matched.length === 4
          ? `All three pairs found in ${turns + 1} turns.`
          : `Matched ${cards[index]}.`,
      );
    } else {
      setMessage(`${cards[next[0]]} and ${cards[index]}. Try another pair.`);
      timer.current = setTimeout(() => setOpen([]), 1000);
    }
  }
  function restart() {
    if (timer.current) clearTimeout(timer.current);
    setCards(shuffledPairs());
    setOpen([]);
    setMatched([]);
    setTurns(0);
    setMessage("New cards. Find the three pairs.");
  }
  return (
    <section aria-label="Pokémon game">
      <h3>Pokémon pairs</h3>
      <p>Find Infernape, Pikachu, and Squirtle’s matching cards.</p>
      <div className={styles.cards}>
        {cards.map((name, index) => {
          const shown = open.includes(index) || matched.includes(index);
          return (
            <button
              key={index}
              className={styles.card}
              aria-label={
                shown
                  ? `Card ${index + 1}: ${name}`
                  : `Reveal card ${index + 1}`
              }
              aria-disabled={matched.includes(index) || open.length === 2}
              data-revealed={shown}
              onClick={() => reveal(index)}
            >
              {shown ? (
                <span>
                  {name}
                  {matched.includes(index) && <small>Matched</small>}
                </span>
              ) : (
                <svg viewBox="0 0 60 60" aria-hidden="true">
                  <circle
                    cx="30"
                    cy="30"
                    r="23"
                    fill="#f5ead4"
                    stroke="#42554a"
                    strokeWidth="3"
                  />
                  <path d="M7 30A23 23 0 0 1 53 30Z" fill="#af6254" />
                  <path d="M7 30H53" stroke="#42554a" strokeWidth="3" />
                  <circle
                    cx="30"
                    cy="30"
                    r="7"
                    fill="#f5ead4"
                    stroke="#42554a"
                    strokeWidth="3"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      <div className={styles.gameStatus} role="status">
        {message}
      </div>
      <div className={styles.actions}>
        <button onClick={restart}>Shuffle again</button>
        <span>
          {matched.length / 2}/3 pairs · {turns} turns
        </span>
      </div>
    </section>
  );
}

function Lego() {
  const [board, setBoard] = useState<number[]>(Array(16).fill(0));
  const [color, setColor] = useState(1);
  const [history, setHistory] = useState<number[][]>([]);
  const complete = bonsaiComplete(board);
  const paint = (index: number) => {
    if (board[index] === color) return;
    setHistory([...history, board]);
    setBoard(board.map((value, i) => (i === index ? color : value)));
  };
  return (
    <section aria-label="LEGO game">
      <h3>Build a little bonsai</h3>
      <p>Pick a brick, then fill the squares to match the little tree.</p>
      <div className={styles.buildArea}>
        <figure>
          <figcaption>Reference</figcaption>
          <div
            className={styles.reference}
            role="img"
            aria-label="Bonsai pattern: row 1 empty leaf leaf empty; row 2 all leaf; row 3 empty trunk empty empty; row 4 pot pot pot empty."
          >
            {bonsaiPattern.map((value, index) => (
              <span key={index} data-brick={value} />
            ))}
          </div>
        </figure>
        <figure>
          <figcaption>Your build</figcaption>
          <div className={styles.bricks}>
            {board.map((value, index) => (
              <button
                key={index}
                data-brick={value}
                aria-label={`Row ${Math.floor(index / 4) + 1}, column ${(index % 4) + 1}: ${brickColors[value]}`}
                onClick={() => paint(index)}
              />
            ))}
          </div>
        </figure>
      </div>
      <fieldset className={styles.palette}>
        <legend>Brick color</legend>
        {brickColors.map((name, index) => (
          <label key={name}>
            <input
              type="radio"
              name="brick"
              checked={color === index}
              onChange={() => setColor(index)}
            />
            <span data-brick={index} />
            {index === 0 ? "Erase" : name}
          </label>
        ))}
      </fieldset>
      <div className={styles.gameStatus} role="status">
        {complete
          ? "Your bonsai is built. Nice work."
          : "No timer. Take your time."}
      </div>
      <div className={styles.actions}>
        <button
          disabled={!history.length}
          onClick={() => {
            setBoard(history[history.length - 1]);
            setHistory(history.slice(0, -1));
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            setHistory([...history, board]);
            setBoard(Array(16).fill(0));
          }}
        >
          Start over
        </button>
      </div>
    </section>
  );
}

function Cooking() {
  const [orderIndex, setOrderIndex] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [served, setServed] = useState(false);
  const [message, setMessage] = useState("Your first order is up.");
  const order = cookingOrders[orderIndex];
  // Mix the extras into the list so the choices are not the recipe in order.
  const choices = [
    order.ingredients[0],
    order.extras[0],
    order.ingredients[1],
    order.ingredients[2],
    order.extras[1],
    order.ingredients[3],
  ];
  function serve() {
    if (served) return;
    if (orderMatches(chosen, order.ingredients)) {
      setServed(true);
      setMessage(
        orderIndex === 2
          ? "All three orders served. Kitchen closed."
          : "Order served. Ready for the next one.",
      );
    } else {
      const missing = order.ingredients.filter(
        (item) => !chosen.includes(item),
      );
      const extra = chosen.filter((item) => !order.ingredients.includes(item));
      setMessage(
        [
          missing.length ? "Add " + missing.join(", ") + "." : "",
          extra.length ? "Remove " + extra.join(", ") + "." : "",
        ]
          .filter(Boolean)
          .join(" "),
      );
    }
  }
  function next() {
    setOrderIndex(orderIndex === 2 ? 0 : orderIndex + 1);
    setChosen([]);
    setServed(false);
    setMessage(
      orderIndex === 2 ? "Fresh orders. Let’s cook." : "Your next order is up.",
    );
  }
  return (
    <section aria-label="Cooking game">
      <h3>Cook an order</h3>
      <p>Build three plates inspired by my favorite dishes. No timer.</p>
      <div className={styles.order}>
        <div>
          <h4>Order {orderIndex + 1} of 3</h4>
          <span>{order.name}</span>
        </div>
        <p>{order.ingredients.join(" · ")}</p>
      </div>
      <fieldset className={styles.ingredients}>
        <legend>Choose ingredients</legend>
        {choices.map((item) => (
          <button
            key={item}
            aria-pressed={chosen.includes(item)}
            disabled={served}
            onClick={() => {
              setChosen(
                chosen.includes(item)
                  ? chosen.filter((value) => value !== item)
                  : [...chosen, item],
              );
              setMessage("Plate updated. Serve when you’re ready.");
            }}
          >
            {item}
            <span aria-hidden="true">
              {chosen.includes(item) ? "Added" : "Add"}
            </span>
          </button>
        ))}
      </fieldset>
      <div className={styles.plate}>
        <h4>
          Your plate <span>{chosen.length}/4 ingredients</span>
        </h4>
        <p>{chosen.length ? chosen.join(", ") : "Nothing plated yet."}</p>
      </div>
      <div className={styles.gameStatus} role="status">
        {message}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.primary}
          disabled={!served && !chosen.length}
          onClick={served ? next : serve}
        >
          {served
            ? orderIndex === 2
              ? "Play again"
              : "Next order"
            : "Serve plate"}
        </button>
        <span>{orderIndex + Number(served)}/3 served</span>
      </div>
    </section>
  );
}

export default function HobbyGame({
  game,
  reducedMotion,
}: {
  game: NonNullable<CampusStop["game"]>;
  reducedMotion: boolean;
}) {
  return (
    <div className={styles.game}>
      {game === "basketball" ? (
        <Basketball reducedMotion={reducedMotion} />
      ) : game === "pokemon" ? (
        <Pokemon />
      ) : game === "cooking" ? (
        <Cooking />
      ) : (
        <Lego />
      )}
    </div>
  );
}
