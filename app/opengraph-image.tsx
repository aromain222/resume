import { ImageResponse } from "next/og";

export const alt = "Avery Romain — Amherst '27";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stage = "#161320";
const bone = "#f2f1f5";
const boneSoft = "#a9a5b3";
const purpleBright = "#b49ae0";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: stage,
          color: bone,
          padding: "72px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <div style={{ color: boneSoft, letterSpacing: 3, textTransform: "uppercase" }}>
            averyromain.com
          </div>
          <div style={{ color: purpleBright, letterSpacing: 3, textTransform: "uppercase" }}>
            Amherst &rsquo;27 · Builder
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 140,
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: -4,
            }}
          >
            Avery Romain
          </div>
          <div style={{ fontSize: 30, marginTop: 26, color: boneSoft, maxWidth: 820, lineHeight: 1.45 }}>
            Senior at Amherst. Four live apps. Also plays D-line.
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 23, color: boneSoft }}>
          <div>CapitalBase</div>
          <div>Stackwise</div>
          <div>Transfer Portal</div>
          <div>DataChat</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
