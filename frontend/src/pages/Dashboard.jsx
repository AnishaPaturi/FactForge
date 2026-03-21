import { useState } from 'react'
import Navbar from '../components/Navbar'
import InputBox from '../components/InputBox'
import ResultCard from '../components/ResultCard'
import Loader from '../components/Loader'

// ─── Mock data ────────────────────────────────────────────────────
const MOCK_AI_PROBABILITY = 62

const MOCK_CLAIMS = [
  {
    id: 1,
    claim: 'The Great Wall of China is visible from space with the naked eye.',
    verdict: 'false',
    confidence: 94,
    explanation:
      'Multiple astronaut testimonies and NASA data confirm the Great Wall is not visible from low Earth orbit without optical aids. The wall is only 4–9 meters wide — far too narrow for the human eye to resolve from 400 km away. This myth has been debunked since the 1990s.',
    sources: [
      { label: 'NASA Earth Observatory', url: 'https://earthobservatory.nasa.gov' },
      { label: 'Scientific American', url: 'https://www.scientificamerican.com' },
      { label: 'Snopes', url: 'https://www.snopes.com' },
    ],
  },
  {
    id: 2,
    claim: 'Humans only use 10% of their brain at any given time.',
    verdict: 'false',
    confidence: 97,
    explanation:
      'Modern neuroimaging (fMRI and PET scans) consistently shows that virtually all brain regions are active throughout the day. Even during sleep, large portions of the brain remain engaged. This myth likely originates from misquoted self-help literature, not neuroscience.',
    sources: [
      { label: 'NIH Neuroscience', url: 'https://www.nih.gov' },
      { label: 'Johns Hopkins Medicine', url: 'https://www.hopkinsmedicine.org' },
    ],
  },
  {
    id: 3,
    claim: 'Drinking coffee can stunt your growth.',
    verdict: 'partial',
    confidence: 71,
    explanation:
      'No peer-reviewed studies directly link coffee consumption to reduced height in humans. The claim may stem from older animal studies using extremely high caffeine doses. However, excessive caffeine can affect calcium absorption, which has a theoretical indirect effect on bone density in developing adolescents.',
    sources: [
      { label: 'Harvard Health', url: 'https://www.health.harvard.edu' },
      { label: 'Mayo Clinic', url: 'https://www.mayoclinic.org' },
      { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
    ],
  },
  {
    id: 4,
    claim: 'A shadow government controls all major world economies.',
    verdict: 'unverifiable',
    confidence: 22,
    explanation:
      'This claim lacks verifiable evidence. While powerful geopolitical and financial networks exist (e.g., the G20, IMF, World Bank), the assertion of a singular hidden governance structure controlling all economies cannot be confirmed or refuted through credible primary sources.',
    sources: [
      { label: 'Council on Foreign Relations', url: 'https://www.cfr.org' },
    ],
  },
]

// ─── AI Detection Box ─────────────────────────────────────────────
function AiDetectionBox({ probability }) {
  const pct = probability
  const level = pct >= 70 ? 'high' : pct >= 40 ? 'medium' : 'low'
  const colors = {
    high:   { text: 'text-red-400',     bar: 'from-red-600 to-red-400',     bg: 'bg-red-500/10 border-red-500/25',   label: 'Likely AI-Generated' },
    medium: { text: 'text-amber-400',   bar: 'from-amber-600 to-amber-400', bg: 'bg-amber-500/10 border-amber-500/25', label: 'Possibly AI-Assisted' },
    low:    { text: 'text-emerald-400', bar: 'from-emerald-600 to-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/25', label: 'Likely Human-Written' },
  }
  const c = colors[level]

  return (
    <div className={`card p-5 border ${c.bg} animate-slide-up`} style={{ animationDelay: '0ms' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="5" r="3" stroke="#94a3b8" strokeWidth="1.3"/>
              <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">AI Detection</span>
          </div>
          <p className={`text-sm font-semibold ${c.text}`}>{c.label}</p>
          <p className="text-xs text-slate-500 mt-0.5">Estimated probability this text was AI-generated</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <span className={`font-display text-4xl font-bold ${c.text}`}>{pct}%</span>
        </div>
      </div>

      {/* Bar */}
      <div className="h-2 bg-surface-600 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${c.bar} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-slate-600">Human</span>
        <span className="text-[10px] text-slate-600">AI-generated</span>
      </div>
    </div>
  )
}

// ─── Summary stats strip ─────────────────────────────────────────
function SummaryStrip({ claims }) {
  const counts = { true: 0, false: 0, partial: 0, unverifiable: 0 }
  claims.forEach((c) => { if (counts[c.verdict] !== undefined) counts[c.verdict]++ })

  const stats = [
    { label: 'True',         key: 'true',         color: 'text-emerald-400', dot: 'bg-emerald-500' },
    { label: 'False',        key: 'false',         color: 'text-red-400',     dot: 'bg-red-500'     },
    { label: 'Partially True', key: 'partial',     color: 'text-amber-400',   dot: 'bg-amber-500'   },
    { label: 'Unverifiable', key: 'unverifiable',  color: 'text-slate-400',   dot: 'bg-slate-500'   },
  ]

  return (
    <div className="card px-5 py-4 flex items-center flex-wrap gap-x-6 gap-y-2 animate-slide-up" style={{ animationDelay: '80ms' }}>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        {claims.length} claim{claims.length !== 1 ? 's' : ''} found
      </span>
      <div className="flex items-center gap-5 flex-wrap">
        {stats.map(({ label, key, color, dot }) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
            <span className={`text-sm font-semibold ${color}`}>{counts[key]}</span>
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────
function EmptyState() {
  const hints = [
    'Paste a news headline or article excerpt',
    'Enter a claim you have seen on social media',
    'Check a historical or scientific statement',
    'Verify a quote attributed to a public figure',
  ]

  return (
    <div className="card p-10 text-center animate-fade-in">
      {/* Illustration */}
      <div className="flex justify-center mb-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 border border-indigo-500/20 animate-pulse-soft" />
          <div className="absolute inset-3 rounded-full bg-indigo-500/15 border border-indigo-500/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 6v10M16 20v.5" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="13" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-slate-100 mb-2">
        Enter text to analyze
      </h3>
      <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed mb-6">
        FactForge will extract all factual claims and verify each one against trusted sources.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-sm mx-auto text-left">
        {hints.map((hint, i) => (
          <div key={i} className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-surface-700/50 border border-white/[0.05]">
            <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none">
              <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs text-slate-400 leading-relaxed">{hint}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────
export default function Dashboard() {
  const [uiState, setUiState] = useState('empty')   // 'empty' | 'loading' | 'results'
  const [results, setResults] = useState(null)

  // Replace this function's body when connecting real API
  const handleAnalyze = (text) => {
    setUiState('loading')
    setResults(null)

    // Simulate async analysis — swap with real API call here
    setTimeout(() => {
      setResults({
        aiProbability: MOCK_AI_PROBABILITY,
        claims: MOCK_CLAIMS,
      })
      setUiState('results')
    }, 3000)
  }

  const handleReset = () => {
    setUiState('empty')
    setResults(null)
  }

  return (
    <div className="min-h-screen dot-grid">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* Page heading */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-100 tracking-tight">
              Fact Analyzer
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Paste a claim or text below — AI will extract and verify each statement.
            </p>
          </div>

          {uiState === 'results' && (
            <button
              onClick={handleReset}
              className="shrink-0 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:border-white/[0.15] bg-surface-800 rounded-lg transition-all duration-200"
            >
              New analysis
            </button>
          )}
        </div>

        {/* Input box */}
        <InputBox
          onAnalyze={handleAnalyze}
          isLoading={uiState === 'loading'}
        />

        {/* Content area */}
        {uiState === 'empty' && <EmptyState />}

        {uiState === 'loading' && <Loader />}

        {uiState === 'results' && results && (
          <div className="space-y-4">
            {/* AI Detection */}
            <AiDetectionBox probability={results.aiProbability} />

            {/* Summary strip */}
            <SummaryStrip claims={results.claims} />

            {/* Divider with label */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-white/[0.05]" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                Claim Verdicts
              </span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>

            {/* Result cards */}
            <div className="space-y-3">
              {results.claims.map((claim, i) => (
                <ResultCard key={claim.id} {...claim} index={i} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
