import { useState } from "react";

const styles = `
/* (keep your full styles exactly as-is — no changes needed) */
`;

const VERDICTS = {
  true: { label: "True", badgeClass: "badge-true", borderClass: "verdict-true", barClass: "bar-true" },
  false: { label: "False", badgeClass: "badge-false", borderClass: "verdict-false", barClass: "bar-false" },
  partial: { label: "Partially True", badgeClass: "badge-partial", borderClass: "verdict-partial", barClass: "bar-partial" },
  unverifiable: { label: "Unverifiable", badgeClass: "badge-unverifiable", borderClass: "verdict-unverifiable", barClass: "bar-unverifiable" },
};

const STANCE_CLASS = {
  Agree: "rc-stance rc-stance-agree",
  Disagree: "rc-stance rc-stance-disagree",
  Neutral: "rc-stance rc-stance-neutral",
};

const STANCE_ICON = {
  Agree: "🟢",
  Disagree: "🔴",
  Neutral: "⚪",
};

export default function ResultCard({
  index = 0,
  claim,
  verdict,
  confidence,
  explanation,
  sources = [],
  source_analysis = null,
}) {
  const [expanded, setExpanded] = useState(true);

  const key = verdict?.toLowerCase().replace("partially true", "partial");
  const cfg = VERDICTS[key] || VERDICTS.unverifiable;

  const agreementScore = source_analysis?.agreement_score ?? 0;
  const counts = source_analysis?.counts || {
    agree: 0,
    disagree: 0,
    neutral: 0,
  };

  return (
    <>
      <style>{styles}</style>

      <div className={`rc-card ${cfg.borderClass}`}>
        {/* HEADER */}
        <button className="rc-header" onClick={() => setExpanded((p) => !p)}>
          <span className="rc-index">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="rc-header-body">
            <p className="rc-claim-text">{claim}</p>

            <div className="rc-meta-row">
              <span className={cfg.badgeClass}>{cfg.label}</span>

              <div className="rc-conf-wrap">
                <div className="rc-conf-track">
                  <div
                    className={`rc-conf-bar ${cfg.barClass}`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="rc-conf-label">{confidence}%</span>
              </div>
            </div>
          </div>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`rc-chevron${expanded ? " open" : ""}`}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* BODY */}
        {expanded && (
          <div className="rc-body">
            {/* AI Analysis */}
            <div>
              <p className="rc-section-label">AI Analysis</p>
              <p className="rc-explanation">{explanation}</p>
            </div>

            {/* AGREEMENT */}
            {source_analysis && (
              <div>
                <p className="rc-section-label">
                  Source Agreement ({agreementScore}%)
                </p>

                <div className="rc-agreement">
                  <div className="rc-agreement-track">
                    <div
                      className="rc-agreement-bar"
                      style={{ width: `${agreementScore}%` }}
                    />
                  </div>

                  <div className="rc-agreement-counts">
                    <span>🟢 {counts.agree}</span>
                    <span>🔴 {counts.disagree}</span>
                    <span>⚪ {counts.neutral}</span>
                  </div>

                  {source_analysis.insight && (
                    <p className="rc-agreement-insight">
                      "{source_analysis.insight}"
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* SOURCES */}
            {key !== "unverifiable" && sources.length > 0 && (
              <div>
                <p className="rc-section-label">Sources</p>

                {sources.map((src, i) => {
                  const stance = src?.stance || "Neutral";
                  const stanceClass =
                    STANCE_CLASS[stance] || STANCE_CLASS.Neutral;
                  const icon = STANCE_ICON[stance] || "⚪";

                  return (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rc-source-row"
                    >
                      <div className="rc-source-left">
                        <span>{icon}</span>
                        <span className="rc-source-title">
                          {src.title || src.label || src.url}
                        </span>
                      </div>

                      <div className="rc-source-right">
                        <span className={stanceClass}>{stance}</span>

                        {src.score != null && (
                          <span className="rc-score">{src.score}</span>
                        )}

                        {src.credibility != null && (
                          <span className="rc-credibility">
                            {src.credibility}
                          </span>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

