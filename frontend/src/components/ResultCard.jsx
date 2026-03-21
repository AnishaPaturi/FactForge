import { useState } from 'react'

const VERDICTS = {
  true: { label: 'True', badgeClass: 'badge-true', borderClass: 'verdict-true', barClass: 'bar-true' },
  false: { label: 'False', badgeClass: 'badge-false', borderClass: 'verdict-false', barClass: 'bar-false' },
  partial: { label: 'Partially True', badgeClass: 'badge-partial', borderClass: 'verdict-partial', barClass: 'bar-partial' },
  unverifiable: { label: 'Unverifiable', badgeClass: 'badge-unverifiable', borderClass: 'verdict-unverifiable', barClass: 'bar-unverifiable' },
}

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
  const cfg = VERDICTS[verdict] || VERDICTS.unverifiable

  return (
    <div className={`card ${cfg.borderClass}`}>

      {/* HEADER */}
      <div onClick={() => setExpanded(!expanded)} className="p-4 cursor-pointer">
        <p>{claim}</p>
        <div className="flex gap-2 items-center">
          <span className={cfg.badgeClass}>{cfg.label}</span>
          <span>{confidence}%</span>
        </div>
      </div>

      {/* BODY */}
      {expanded && (
        <div className="p-4 border-t">

          {/* Explanation */}
          <p className="text-sm mb-3">{explanation}</p>

          {/* 🔥 AGREEMENT */}
          {source_analysis && (
            <div className="mb-4">
              <p className="text-xs mb-1">Source Agreement</p>

              <div className="w-full bg-gray-700 h-2 rounded mb-2">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${source_analysis.agreement_score || 0}%` }}
                />
              </div>

              <div className="flex gap-3 text-xs">
                <span>🟢 {source_analysis.counts?.agree || 0}</span>
                <span>🔴 {source_analysis.counts?.disagree || 0}</span>
                <span>⚪ {source_analysis.counts?.neutral || 0}</span>
              </div>

              <p className="text-xs mt-1">{source_analysis.insight}</p>
            </div>
          )}

          {/* SOURCES */}
          <div>
            {sources.map((src, i) => {
              const stanceIcon =
                src.stance === "Agree" ? "🟢" :
                src.stance === "Disagree" ? "🔴" : "⚪";

              return (
                <div key={i} className="flex justify-between p-2 border rounded mb-1">
                  <div>
                    {stanceIcon} {src.label}
                  </div>
                  <div>
                    {src.stance || "Unknown"} | {src.score}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  )
}