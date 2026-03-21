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
          <span className="text-red-400">{verdict}</span>
          <span>{confidence}%</span>
        </div>
      </div>

      {/* BODY */}
      {expanded && (
        <div className="mt-3">

          <p className="text-sm mb-3">{explanation}</p>

          {/* 🔥 AGREEMENT */}
          {source_analysis && (
            <div className="mb-3">
              <p className="text-xs mb-1">Agreement</p>

              <div className="w-full bg-gray-700 h-2 rounded mb-2">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${source_analysis.agreement_score || 0}%` }}
                />
              </div>

              <div className="flex gap-3 text-xs">
                <span>🟢 {source_analysis.counts?.agree}</span>
                <span>🔴 {source_analysis.counts?.disagree}</span>
                <span>⚪ {source_analysis.counts?.neutral}</span>
              </div>

              <p className="text-xs mt-1">{source_analysis.insight}</p>
            </div>
          )}

          {/* SOURCES */}
          {sources.map((src, i) => {
            const icon =
              src.stance === "Agree" ? "🟢" :
              src.stance === "Disagree" ? "🔴" : "⚪";

            return (
              <div key={i} className="flex justify-between border p-2 rounded mb-1">
                <span>{icon} {src.label}</span>
                <span>{src.stance} | {src.score}</span>
              </div>
            );
          })}

        </div>
      )}
    </div>
  )
}