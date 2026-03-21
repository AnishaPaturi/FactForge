import { useState } from 'react'

// ─── Verdict configurations ────────────────────────────────────────
const VERDICTS = {
  true: {
    label: 'True',
    badgeClass: 'badge-true',
    borderClass: 'verdict-true',
    barClass: 'bar-true',
    dotColor: 'bg-emerald-500',
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  false: {
    label: 'False',
    badgeClass: 'badge-false',
    borderClass: 'verdict-false',
    barClass: 'bar-false',
    dotColor: 'bg-red-500',
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  partial: {
    label: 'Partially True',
    badgeClass: 'badge-partial',
    borderClass: 'verdict-partial',
    barClass: 'bar-partial',
    dotColor: 'bg-amber-500',
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="4.5" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M6 4v2.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="6" cy="8.5" r="0.6" fill="#f59e0b"/>
      </svg>
    ),
  },
  unverifiable: {
    label: 'Unverifiable',
    badgeClass: 'badge-unverifiable',
    borderClass: 'verdict-unverifiable',
    barClass: 'bar-unverifiable',
    dotColor: 'bg-slate-500',
    Icon: () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="4.5" stroke="#64748b" strokeWidth="1.5"/>
        <path d="M4.5 4.5C4.5 3.67 5.12 3 6 3s1.5.67 1.5 1.5c0 1-1.5 1.25-1.5 2.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="6" cy="8.5" r="0.6" fill="#64748b"/>
      </svg>
    ),
  },
}

const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
    <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─────────────────────────────────────────────────────────────────

export default function ResultCard({
  index = 0,
  claim,
  verdict,
  confidence,
  explanation,
  sources,
  source_analysis   // 🔥 NEW PROP
}) {
  const [expanded, setExpanded] = useState(true)
  const cfg = VERDICTS[verdict] || VERDICTS.unverifiable
  const VerdictIcon = cfg.Icon

  return (
    <div
      className={`card card-hover overflow-hidden animate-slide-up ${cfg.borderClass}`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >

      {/* HEADER */}
      <button
        className="w-full text-left px-5 pt-4 pb-3 flex items-start gap-4"
        onClick={() => setExpanded((p) => !p)}
      >
        <span className="shrink-0 w-6 h-6 rounded-md bg-surface-600 border border-white/[0.08] flex items-center justify-center text-[10px] font-mono text-slate-500 mt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-200 leading-relaxed font-medium pr-2">{claim}</p>

          <div className="flex items-center flex-wrap gap-3 mt-2.5">
            <span className={cfg.badgeClass}>
              <VerdictIcon />
              {cfg.label}
            </span>

            <div className="flex items-center gap-2 flex-1 min-w-[120px] max-w-[200px]">
              <div className="flex-1 h-1.5 bg-surface-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${cfg.barClass}`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400">{confidence}%</span>
            </div>
          </div>
        </div>

        <ChevronIcon open={expanded} />
      </button>

      {/* EXPANDED */}
      {expanded && (
        <div className="px-5 pb-4 border-t border-white/[0.05] animate-fade-in">

          {/* Explanation */}
          <div className="mt-3 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              AI Analysis
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">{explanation}</p>
          </div>

          {/* 🔥 SOURCE AGREEMENT */}
          {source_analysis && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Source Agreement
              </p>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-surface-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${source_analysis.agreement_score || 0}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {source_analysis.agreement_score || 0}%
                </span>
              </div>

              <div className="flex gap-3 text-xs">
                <span className="text-emerald-400">
                  🟢 {source_analysis.counts?.agree || 0}
                </span>
                <span className="text-red-400">
                  🔴 {source_analysis.counts?.disagree || 0}
                </span>
                <span className="text-slate-400">
                  ⚪ {source_analysis.counts?.neutral || 0}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {source_analysis.insight}
              </p>
            </div>
          )}

          {/* SOURCES */}
          {sources && sources.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Sources
              </p>

              <div className="flex flex-col gap-2">
                {sources.map((src, i) => {
                  const stanceColor =
                    src.stance === "Agree"
                      ? "text-emerald-400"
                      : src.stance === "Disagree"
                      ? "text-red-400"
                      : "text-slate-400";

                  const stanceIcon =
                    src.stance === "Agree"
                      ? "🟢"
                      : src.stance === "Disagree"
                      ? "🔴"
                      : "⚪";

                  return (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 text-sm bg-surface-700 border border-white/[0.07] rounded-lg hover:bg-surface-600 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span>{stanceIcon}</span>
                        <span className="text-slate-300">
                          {src.label || "unknown"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${stanceColor}`}>
                          {src.stance}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500 text-white">
                          {src.score || "N/A"}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}