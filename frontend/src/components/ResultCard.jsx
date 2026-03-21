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

  // 🔥 safety: normalize data
  const agreementScore = source_analysis?.agreement_score ?? 0;
  const counts = source_analysis?.counts || {
    agree: 0,
    disagree: 0,
    neutral: 0,
  };

  return (
    <div className="card border rounded p-4 mb-4">

      {/* HEADER */}
      <div onClick={() => setExpanded(!expanded)} className="cursor-pointer">
        <p className="font-semibold">{claim}</p>

        <div className="flex gap-3 mt-1 items-center">
          <span className="text-red-400 capitalize">{verdict}</span>
          <span>{confidence}%</span>
        </div>
      </div>

      {/* BODY */}
      {expanded && (
        <div className="mt-3">

          {/* Explanation */}
          <p className="text-sm mb-3">{explanation}</p>

          {/* 🔥 AGREEMENT (ALWAYS SAFE RENDER) */}
          {source_analysis && source_analysis.agreement_score !== undefined ? (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-1">
                Source Agreement ({agreementScore}%)
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 h-2 rounded mb-2">
                <div
                  className="bg-green-500 h-2 rounded transition-all duration-500"
                  style={{ width: `${agreementScore}%` }}
                />
              </div>

              {/* Counts */}
              <div className="flex gap-4 text-xs">
                <span>🟢 {counts.agree}</span>
                <span>🔴 {counts.disagree}</span>
                <span>⚪ {counts.neutral}</span>
              </div>

              {/* Insight */}
              {source_analysis.insight && (
                <p className="text-xs text-gray-400 mt-1">
                  {source_analysis.insight}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mb-3">
              No agreement data available
            </p>
          )}

          {/* 🔥 SOURCES */}
          <div>
            {sources.length === 0 && (
              <p className="text-xs text-gray-500">No sources available</p>
            )}

            {sources.map((src, i) => {
              const stance = src?.stance || "Neutral";

              const icon =
                stance === "Agree"
                  ? "🟢"
                  : stance === "Disagree"
                  ? "🔴"
                  : "⚪";

              return (
                <div
                  key={i}
                  className="flex justify-between items-center border p-2 rounded mb-2"
                >
                  <span>
                    {icon} {src.label}
                  </span>

                  <span className="text-sm text-gray-300">
                    {stance} | {src.score ?? 0}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}