import { useState } from 'react'

// ─── Verdict configurations ────────────────────────────────────────
const VERDICTS = {
  true: {
    label: 'True',
    badgeClass: 'badge-true',
    borderClass: 'verdict-true',
    barClass: 'bar-true',
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
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
  >
    <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Score 0–10: green ≥ 8, amber ≥ 5, red < 5
const getScoreColor = (score) => {
  if (score >= 8) return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
  if (score >= 5) return 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
  return 'bg-red-500/10 text-red-400 border border-red-500/30'
}

// Score bar color (inline style)
const getScoreBarColor = (score) => {
  if (score >= 8) return '#10b981'
  if (score >= 5) return '#f59e0b'
  return '#ef4444'
}

// Extract clean domain from URL
const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

// Domain type badge (GOV / EDU / ORG / WEB)
const getDomainBadge = (domain) => {
  if (domain.includes('gov')) return { label: 'GOV', cls: 'bg-emerald-500/20 text-emerald-400' }
  if (domain.includes('edu')) return { label: 'EDU', cls: 'bg-blue-500/20 text-blue-400' }
  if (domain.includes('org')) return { label: 'ORG', cls: 'bg-purple-500/20 text-purple-400' }
  return { label: 'WEB', cls: 'bg-slate-500/20 text-slate-400' }
}

// ─────────────────────────────────────────────────────────────────
export default function ResultCard({
  index = 0,
  claim,
  verdict,
  confidence = 0,
  explanation = '',
  sources = [],
}) {
  const [expanded, setExpanded] = useState(true)

  // Normalize verdict key
  const key = verdict?.toLowerCase().replace('partially true', 'partial')
  const cfg = VERDICTS[key] || VERDICTS.unverifiable
  const VerdictIcon = cfg.Icon

  return (
    <div
      className={`card card-hover overflow-hidden animate-slide-up ${cfg.borderClass}`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      {/* ── HEADER (always visible) ─────────────────────────── */}
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

      {/* ── EXPANDED BODY ───────────────────────────────────── */}
      {expanded && (
        <div className="px-5 pb-4 border-t border-white/[0.05] animate-fade-in">

          {/* AI Analysis */}
          <div className="mt-3 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              AI Analysis
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">{explanation}</p>
          </div>

          {/* Sources */}
          {sources.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Sources
              </p>

              <div className="flex flex-col gap-2">
                {sources.map((src, i) => {
                  const domain = getDomain(src.url)
                  const label = src.label || src.title || domain
                  const badge = getDomainBadge(domain)
                  const score = src.score ?? null
                  const barColor = score != null ? getScoreBarColor(score) : '#64748b'

                  return (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2.5 text-sm bg-surface-700 border border-white/[0.07] rounded-lg hover:bg-surface-600 transition"
                    >
                      {/* TOP ROW: favicon + label + badges */}
                      <div className="flex items-center justify-between gap-2">
                        {/* LEFT: favicon + label */}
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${domain}`}
                            alt=""
                            className="w-4 h-4 shrink-0"
                          />
                          <span className="text-slate-300 truncate">{label}</span>
                        </div>

                        {/* RIGHT: domain badge + score */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.cls}`}>
                            {badge.label}
                          </span>
                          {score != null && (
                            <span className={`text-xs font-mono px-2 py-0.5 rounded ${getScoreColor(score)}`}>
                              {score}/10
                            </span>
                          )}
                        </div>
                      </div>

                      {/* SCORE BAR */}
                      {score != null && (
                        <div className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(score / 10) * 100}%`,
                              background: barColor,
                              boxShadow: `0 0 6px ${barColor}88`,
                            }}
                          />
                        </div>
                      )}

                      {/* Snippet */}
                      {src.snippet && (
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                          {src.snippet}
                        </p>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
