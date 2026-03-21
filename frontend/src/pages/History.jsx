import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

// ─── Mock history data ────────────────────────────────────────────
const MOCK_HISTORY = [
  {
    id: 'h1',
    inputText: 'The Great Wall of China is visible from space with the naked eye. Humans only use 10% of their brain at any given time.',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    aiProbability: 62,
    claims: [
      { text: 'The Great Wall of China is visible from space.', verdict: 'false', confidence: 94 },
      { text: 'Humans only use 10% of their brain.', verdict: 'false', confidence: 97 },
    ],
  },
  {
    id: 'h2',
    inputText: 'Einstein failed math in school. Humans share 50% of their DNA with bananas. The first iPhone shipped with 3G connectivity.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
    aiProbability: 31,
    claims: [
      { text: 'Einstein failed math in school.', verdict: 'false', confidence: 88 },
      { text: 'Humans share ~50% of DNA with bananas.', verdict: 'true', confidence: 91 },
      { text: 'First iPhone shipped with 3G connectivity.', verdict: 'false', confidence: 96 },
    ],
  },
  {
    id: 'h3',
    inputText: 'Caffeine is the most widely consumed psychoactive drug in the world. Drinking cold water burns more calories.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    aiProbability: 45,
    claims: [
      { text: 'Caffeine is the most widely consumed psychoactive drug.', verdict: 'true', confidence: 87 },
      { text: 'Drinking cold water burns more calories.', verdict: 'partial', confidence: 58 },
    ],
  },
  {
    id: 'h4',
    inputText: 'The COVID-19 vaccine contains microchips for government surveillance. Vitamin C cures the common cold.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    aiProbability: 78,
    claims: [
      { text: 'COVID-19 vaccines contain microchips.', verdict: 'false', confidence: 99 },
      { text: 'Vitamin C cures the common cold.', verdict: 'partial', confidence: 61 },
    ],
  },
  {
    id: 'h5',
    inputText: 'A previously unknown ancient civilization existed beneath the Sahara Desert 12,000 years ago with advanced technology.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    aiProbability: 85,
    claims: [
      { text: 'An advanced ancient civilization existed under the Sahara 12,000 years ago.', verdict: 'unverifiable', confidence: 29 },
    ],
  },
  {
    id: 'h6',
    inputText: 'The Eiffel Tower grows taller in summer. Gold is the best conductor of electricity. Mount Everest is the world\'s tallest mountain measured from sea level.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    aiProbability: 18,
    claims: [
      { text: 'The Eiffel Tower grows taller in summer.', verdict: 'true', confidence: 93 },
      { text: 'Gold is the best conductor of electricity.', verdict: 'false', confidence: 89 },
      { text: 'Mount Everest is the tallest mountain from sea level.', verdict: 'true', confidence: 98 },
    ],
  },
]

// ─── Verdict styles ───────────────────────────────────────────────
const VERDICT_META = {
  true:          { label: 'True',         class: 'badge-true',          dot: 'bg-emerald-500' },
  false:         { label: 'False',        class: 'badge-false',         dot: 'bg-red-500'     },
  partial:       { label: 'Partial',      class: 'badge-partial',       dot: 'bg-amber-500'   },
  unverifiable:  { label: 'Unverifiable', class: 'badge-unverifiable',  dot: 'bg-slate-500'   },
}

// ─── Helpers ──────────────────────────────────────────────────────
function relativeTime(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7)   return `${days}d ago`
  return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDate(isoStr) {
  return new Date(isoStr).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// Summarise verdicts for a session
function verdictCounts(claims) {
  const counts = {}
  claims.forEach((c) => { counts[c.verdict] = (counts[c.verdict] || 0) + 1 })
  return counts
}

// ─── Accordion item ───────────────────────────────────────────────
function HistoryItem({ item, isOpen, onToggle, index }) {
  const navigate = useNavigate()
  const counts = verdictCounts(item.claims)
  const verdictsOrder = ['true', 'false', 'partial', 'unverifiable']

  return (
    <div
      className={`card card-hover overflow-hidden transition-all duration-300 animate-slide-up ${
        isOpen ? 'border-indigo-500/25 shadow-glow-sm' : ''
      }`}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      {/* Header */}
      <button
        className="w-full flex items-start gap-4 px-5 py-4 text-left"
        onClick={onToggle}
      >
        {/* Left: index + dot */}
        <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
          <span className="text-[10px] font-mono text-slate-600">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="w-px flex-1 bg-white/[0.06]" style={{ minHeight: '20px' }} />
        </div>

        {/* Center: content */}
        <div className="flex-1 min-w-0 space-y-2.5">
          {/* Input text preview */}
          <p className="text-sm text-slate-200 font-medium leading-relaxed line-clamp-2">
            {item.inputText}
          </p>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
            {/* Timestamp */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#64748b" strokeWidth="1.2"/>
                <path d="M6 3.5v2.5l1.5 1.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {relativeTime(item.timestamp)}
            </div>

            {/* Claim count */}
            <span className="text-xs text-slate-500">
              {item.claims.length} claim{item.claims.length !== 1 ? 's' : ''}
            </span>

            {/* Verdict dots */}
            <div className="flex items-center gap-1.5">
              {verdictsOrder.filter((v) => counts[v]).map((v) => (
                <div key={v} className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${VERDICT_META[v].dot}`} />
                  <span className="text-xs font-mono text-slate-500">{counts[v]}</span>
                </div>
              ))}
            </div>

            {/* AI probability pill */}
            <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
              item.aiProbability >= 70
                ? 'bg-red-500/10 border-red-500/25 text-red-400'
                : item.aiProbability >= 40
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
            }`}>
              AI {item.aiProbability}%
            </span>
          </div>
        </div>

        {/* Chevron */}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="shrink-0 mt-1 transition-transform duration-250"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M4 6l4 4 4-4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Expanded body */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-white/[0.05] animate-slide-down">
          <div className="pt-4 space-y-4">
            {/* Full input text */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Input Text
              </p>
              <p className="text-sm text-slate-300 leading-relaxed bg-surface-700/50 border border-white/[0.05] rounded-xl px-4 py-3">
                {item.inputText}
              </p>
            </div>

            {/* Claims list */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Claims Verified
              </p>
              <div className="space-y-2">
                {item.claims.map((claim, i) => {
                  const meta = VERDICT_META[claim.verdict] || VERDICT_META.unverifiable
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3.5 rounded-xl bg-surface-700/50 border border-white/[0.05] ${
                        claim.verdict === 'true' ? 'border-l-2 border-l-emerald-500/50' :
                        claim.verdict === 'false' ? 'border-l-2 border-l-red-500/50' :
                        claim.verdict === 'partial' ? 'border-l-2 border-l-amber-500/50' :
                        'border-l-2 border-l-slate-500/50'
                      }`}
                    >
                      <span className="shrink-0 text-[10px] font-mono text-slate-600 mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0 space-y-2">
                        <p className="text-sm text-slate-200 leading-relaxed">{claim.text}</p>
                        <div className="flex items-center gap-3">
                          <span className={meta.class}>{meta.label}</span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 h-1 bg-surface-500 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${claim.confidence}%`,
                                  background: claim.verdict === 'true' ? '#10b981' :
                                              claim.verdict === 'false' ? '#ef4444' :
                                              claim.verdict === 'partial' ? '#f59e0b' : '#64748b',
                                }}
                              />
                            </div>
                            <span className="text-xs font-mono text-slate-500">{claim.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
              <span className="text-xs text-slate-600">{formatDate(item.timestamp)}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/25 rounded-lg transition-all duration-200"
                >
                  Re-analyze →
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg transition-all duration-200">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main History page ────────────────────────────────────────────
export default function History() {
  const [openId, setOpenId]         = useState('h1')
  const [search, setSearch]         = useState('')
  const [activeFilter, setFilter]   = useState('all')

  const filters = [
    { key: 'all',          label: 'All' },
    { key: 'true',         label: 'True' },
    { key: 'false',        label: 'False' },
    { key: 'partial',      label: 'Partial' },
    { key: 'unverifiable', label: 'Unverifiable' },
  ]

  const filtered = useMemo(() => {
    return MOCK_HISTORY.filter((item) => {
      const matchSearch = search === '' || item.inputText.toLowerCase().includes(search.toLowerCase())
      const matchFilter = activeFilter === 'all' || item.claims.some((c) => c.verdict === activeFilter)
      return matchSearch && matchFilter
    })
  }, [search, activeFilter])

  return (
    <div className="min-h-screen dot-grid">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* Page header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-100 tracking-tight">
            Analysis History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and revisit your previous fact-checking sessions.
          </p>
        </div>

        {/* Search + filters */}
        <div className="space-y-3">
          {/* Search bar */}
          <div className="flex items-center gap-3 px-4 py-3 card focus-within:border-indigo-500/40 focus-within:shadow-glow-sm transition-all duration-200">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-slate-500 shrink-0">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your history…"
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-300 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3l8 8M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                    : 'text-slate-500 border-white/[0.07] hover:text-slate-200 hover:border-white/[0.12] hover:bg-surface-700'
                }`}
              >
                {label}
              </button>
            ))}

            <span className="ml-auto text-xs text-slate-600 font-mono">
              {filtered.length} / {MOCK_HISTORY.length} sessions
            </span>
          </div>
        </div>

        {/* History list */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <HistoryItem
                key={item.id}
                item={item}
                index={i}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-surface-600 border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#475569" strokeWidth="1.5"/>
                <path d="M15 15l4 4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-300 mb-1">No results found</p>
            <p className="text-xs text-slate-500">Try adjusting your search or filter.</p>
          </div>
        )}
      </main>
    </div>
  )
}
