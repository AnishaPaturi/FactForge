import { useState } from "react";

const VERDICTS = {
  true: { label: "TRUE", color: "#4ade80" },
  false: { label: "FALSE", color: "#f87171" },
  partial: { label: "PARTIAL", color: "#fbbf24" },
  unverifiable: { label: "UNVERIFIABLE", color: "#64748b" },
};

export default function ResultCard({
  index = 0,
  claim,
  verdict,
  confidence = 0,
  explanation = "",
  sources = [],
}) {
  const [open, setOpen] = useState(true);

  const key = verdict?.toLowerCase() || "unverifiable";
  const cfg = VERDICTS[key] || VERDICTS.unverifiable;

  // normalize backend score
  const normalizeScore = (src) => {
    let raw =
      src.score ??
      src.credibility ??
      src.relevance ??
      src.rating ??
      null;

    if (raw === null) return 65;

    if (raw <= 10) return Math.round(raw * 10);
    if (raw <= 100) return Math.round(raw);

    return 65;
  };

  return (
    <div
      style={{
        background: "rgba(4,14,28,0.85)",
        border: `1px solid ${cfg.color}40`,
        borderRadius: 16,
        padding: "1.2rem",
        marginBottom: "1.2rem",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* HEADER */}
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        <p style={{ fontWeight: 600, fontSize: 16 }}>
          {index + 1}. {claim}
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <span
            style={{
              background: cfg.color + "20",
              color: cfg.color,
              padding: "4px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {cfg.label}
          </span>

          <span style={{ fontSize: 12 }}>🎯 {confidence}%</span>
        </div>

        {/* CONFIDENCE BAR */}
        <div
          style={{
            height: 6,
            borderRadius: 10,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
            marginTop: 8,
          }}
        >
          <div
            style={{
              width: `${confidence}%`,
              height: "100%",
              background: "linear-gradient(90deg, #00d4ff, #7dd3fc)",
              boxShadow: "0 0 10px rgba(0,212,255,0.5)",
            }}
          />
        </div>
      </div>

      {/* BODY */}
      {open && (
        <div style={{ marginTop: 14 }}>
          {/* EXPLANATION */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#00d4ff",
              marginBottom: 6,
            }}
          >
            AI EXPLANATION
          </p>

          <p
            style={{
              fontSize: 14,
              color: "#cbd5f5",
              lineHeight: 1.6,
            }}
          >
            🧠 {explanation}
          </p>

          {/* 🔥 PREMIUM SOURCES */}
          {sources.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#00d4ff",
                  marginBottom: 12,
                }}
              >
                SOURCES
              </p>

              {sources.map((src, i) => {
                const score = normalizeScore(src);

                const getColor = (score) => {
                  if (score >= 80) return "#4ade80";
                  if (score >= 60) return "#fbbf24";
                  return "#f87171";
                };

                const color = getColor(score);

                // extract domain
                const domain = (() => {
                  try {
                    return new URL(src.url).hostname.replace("www.", "");
                  } catch {
                    return "source";
                  }
                })();

                // badge logic
                const getBadge = () => {
                  if (domain.includes("gov"))
                    return { label: "GOV", color: "#22c55e" };
                  if (domain.includes("edu"))
                    return { label: "EDU", color: "#3b82f6" };
                  if (domain.includes("org"))
                    return { label: "ORG", color: "#a855f7" };
                  return { label: "WEB", color: "#64748b" };
                };

                const badge = getBadge();

                return (
                  <div
                    key={i}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.035)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      marginBottom: 10,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(0,200,255,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* TOP ROW */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          overflow: "hidden",
                        }}
                      >
                        {/* favicon */}
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${domain}`}
                          alt=""
                          style={{ width: 16, height: 16 }}
                        />

                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: 13,
                            color: "#7dd3fc",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "220px",
                          }}
                        >
                          {src.label || src.title || domain}
                        </a>
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        {/* badge */}
                        <span
                          style={{
                            fontSize: 10,
                            padding: "3px 8px",
                            borderRadius: 20,
                            background: badge.color + "20",
                            color: badge.color,
                            fontWeight: 700,
                          }}
                        >
                          {badge.label}
                        </span>

                        {/* score */}
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color,
                          }}
                        >
                          ⭐ {score}%
                        </span>
                      </div>
                    </div>

                    {/* GRADIENT BAR */}
                    <div
                      style={{
                        height: 5,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.06)",
                        marginTop: 8,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${score}%`,
                          height: "100%",
                          borderRadius: 10,
                          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                          boxShadow: `0 0 10px ${color}55`,
                        }}
                      />
                    </div>

                    {/* snippet */}
                    {src.snippet && (
                      <p
                        style={{
                          fontSize: 12,
                          marginTop: 8,
                          color: "#94a3b8",
                        }}
                      >
                        {src.snippet}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}