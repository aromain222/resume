import { ImageResponse } from "next/og";

export const alt = "Avery Romain — Amherst student-athlete building tools for finance, data, and football";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#f4f7fb",
          color: "#0f0f0f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", opacity: 0.55 }}>
            averyromain.com
          </div>
          <div
            style={{
              fontSize: 22,
              border: "2px solid #0f0f0f",
              padding: "8px 20px",
              borderRadius: 999,
            }}
          >
            Amherst · Football · Builder
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>Avery Romain</div>
          <div style={{ fontSize: 34, marginTop: 24, opacity: 0.75, maxWidth: 900, lineHeight: 1.35 }}>
            I build useful things for finance, data, and college football.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
          <div style={{ background: "#101d33", color: "#f4f7fb", padding: "10px 22px", borderRadius: 999 }}>
            CapitalBase
          </div>
          <div style={{ border: "2px solid #0f0f0f", padding: "10px 22px", borderRadius: 999 }}>
            Stackwise
          </div>
          <div style={{ border: "2px solid #0f0f0f", padding: "10px 22px", borderRadius: 999 }}>
            Transfer Portal
          </div>
          <div style={{ border: "2px solid #0f0f0f", padding: "10px 22px", borderRadius: 999 }}>
            DataChat
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
