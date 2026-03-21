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

const ExternalLinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M4.5 2H2.5A1.5 1.5 0 0 0 1 3.5v5A1.5 1.5 0 0 0 2.5 10h5A1.5 1.5 0 0 0 9 8.5v-2M6.5 1H10m0 0v3.5M10 1 5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
    <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const getScoreColor = (score) => {
  if (score >= 8) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  if (score >= 5) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  return "bg-red-500/10 text-red-400 border-red-500/30";
};
// ─────────────────────────────────────────────────────────────────
export default function ResultCard({ index = 0, claim, verdict, confidence, explanation, sources }) {
  const [expanded, setExpanded] = useState(true)
  const cfg = VERDICTS[verdict] || VERDICTS.unverifiable
  const VerdictIcon = cfg.Icon
  console.log("SOURCES FRONTEND:", sources);
  return (
    <div
      className={`card card-hover overflow-hidden animate-slide-up ${cfg.borderClass}`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      
      {/* Header row — always visible */}
      <button
        className="w-full text-left px-5 pt-4 pb-3 flex items-start gap-4"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Index badge */}
        <span className="shrink-0 w-6 h-6 rounded-md bg-surface-600 border border-white/[0.08] flex items-center justify-center text-[10px] font-mono text-slate-500 mt-0.5">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          {/* Claim text */}
          <p className="text-sm text-slate-200 leading-relaxed font-medium pr-2">{claim}</p>

          {/* Verdict + confidence row */}
          <div className="flex items-center flex-wrap gap-3 mt-2.5">
            <span className={cfg.badgeClass}>
              <VerdictIcon />
              {cfg.label}
            </span>

            {/* Confidence bar */}
            <div className="flex items-center gap-2 flex-1 min-w-[120px] max-w-[200px]">
              <div className="flex-1 h-1.5 bg-surface-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${cfg.barClass}`}
                  style={{ width: `${confidence}%` }}
                />
                
              </div>
              <span className="text-xs font-mono text-slate-400 shrink-0">{confidence}%</span>
            </div>
          </div>
        </div>

        <span className="shrink-0 mt-1">
          <ChevronIcon open={expanded} />
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-4 border-t border-white/[0.05] animate-fade-in">
          {/* Explanation */}
          <div className="mt-3 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              AI Analysis
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">{explanation}</p>
          </div>
          

          {/* Sources */}
          {sources && sources.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              Sources
            </p>

            <div className="flex flex-col gap-2">
              {sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-sm bg-surface-700 border border-white/[0.07] rounded-lg hover:bg-surface-600 transition"
                >
                  {/* LEFT: label */}
                  <span className="text-slate-300">
                    {src.label || "unknown"}
                  </span>

                  {/* RIGHT: score */}
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500 text-white">
                    {src.score || "N/A"}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  )
}
