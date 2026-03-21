import { useState } from "react";

export default function ResultCard({
  claim,
  verdict,
  confidence,
  explanation,
  sources = [],
  source_analysis = null,
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="card border rounded p-4 mb-4">

      {/* HEADER */}
      <div onClick={() => setExpanded(!expanded)} className="cursor-pointer">
        <p className="font-semibold">{claim}</p>
        <div className="flex gap-3 mt-1">
          <span className="text-red-400 capitalize">{verdict}</span>
          <span>{confidence}%</span>
        </div>
      </div>

      {/* BODY */}
      {expanded && (
        <div className="mt-3">

          <p className="text-sm mb-3">{explanation}</p>

          {/* 🔥 AGREEMENT */}
          {source_analysis !== null && (
            <div className="mb-4">
              <p className="text-xs font-semibold">Source Agreement</p>

              <div className="w-full bg-gray-700 h-2 rounded my-2">
                <div
                  className="bg-green-500 h-2 rounded transition-all duration-500"
                  style={{ width: `${source_analysis.agreement_score || 0}%` }}
                />
              </div>

              <div className="flex gap-4 text-xs">
                <span>🟢 {source_analysis.counts?.agree ?? 0}</span>
                <span>🔴 {source_analysis.counts?.disagree ?? 0}</span>
                <span>⚪ {source_analysis.counts?.neutral ?? 0}</span>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {source_analysis.insight}
              </p>
            </div>
          )}

          {/* 🔥 SOURCES */}
          {sources.map((src, i) => {
            const stance = src.stance || "Neutral";

            const icon =
              stance === "Agree"
                ? "🟢"
                : stance === "Disagree"
                ? "🔴"
                : "⚪";

            return (
              <div key={i} className="flex justify-between border p-2 rounded mb-2">
                <span>
                  {icon} {src.label}
                </span>
                <span>
                  {stance} | {src.score}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}