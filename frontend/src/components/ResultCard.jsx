import { useState } from 'react'

export default function ResultCard({
  index = 0,
  claim,
  verdict,
  confidence,
  explanation,
  sources = [],
  source_analysis = null
}) {
  const [expanded, setExpanded] = useState(true)

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

          {/* Explanation */}
          <p className="text-sm mb-3">{explanation}</p>

          {/* 🔥 AGREEMENT (FIXED CONDITION) */}
          {source_analysis !== null && source_analysis !== undefined && (
            <div className="mb-4">
              <p className="text-xs mb-1 font-semibold">Source Agreement</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 h-2 rounded mb-2">
                <div
                  className="bg-green-500 h-2 rounded transition-all duration-500"
                  style={{ width: `${source_analysis.agreement_score || 0}%` }}
                />
              </div>

              {/* Counts */}
              <div className="flex gap-4 text-xs">
                <span>🟢 {source_analysis.counts?.agree ?? 0}</span>
                <span>🔴 {source_analysis.counts?.disagree ?? 0}</span>
                <span>⚪ {source_analysis.counts?.neutral ?? 0}</span>
              </div>

              {/* Insight */}
              {source_analysis.insight && (
                <p className="text-xs mt-1 text-gray-400">
                  {source_analysis.insight}
                </p>
              )}
            </div>
          )}

          {/* 🔥 SOURCES */}
          <div>
            {sources.map((src, i) => {
              const stance = src.stance || "Neutral"

              const icon =
                stance === "Agree" ? "🟢" :
                stance === "Disagree" ? "🔴" : "⚪";

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
  )
}