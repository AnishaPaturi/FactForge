import { useState, useEffect } from 'react'

const STAGES = [
  { id: 1, label: 'Parsing input',         sub: 'Segmenting claims from text'       },
  { id: 2, label: 'Cross-referencing',      sub: 'Searching knowledge base'          },
  { id: 3, label: 'Evaluating evidence',    sub: 'Weighing source credibility'       },
  { id: 4, label: 'Generating verdicts',    sub: 'Compiling fact-check report'       },
]

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5l2.5 2.5L8 2.5" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Loader() {
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const intervals = STAGES.map((_, i) =>
      setTimeout(() => setCurrentStage(i + 1), i * 650 + 300)
    )
    return () => intervals.forEach(clearTimeout)
  }, [])

  return (
    <div className="card p-6 animate-fade-in space-y-6">
      {/* Top: spinner + title */}
      <div className="flex items-center gap-4">
        {/* Dual-ring spinner */}
        <div className="relative w-11 h-11 shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
          <svg className="absolute inset-0 animate-spin-slow w-full h-full -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22" cy="22" r="19"
              fill="none"
              stroke="url(#spinGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="60 200"
            />
            <defs>
              <linearGradient id="spinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0"/>
                <stop offset="100%" stopColor="#818cf8"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse-soft" />
          </div>
        </div>

        <div>
          <p className="font-display text-base font-semibold text-slate-100">
            Forging your analysis…
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            AI is cross-checking claims against trusted sources
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStage / STAGES.length) * 100}%` }}
        />
      </div>

      {/* Stage pipeline */}
      <div className="space-y-3">
        {STAGES.map((stage, i) => {
          const done    = i < currentStage
          const active  = i === currentStage
          const pending = i > currentStage

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 transition-all duration-300 ${pending ? 'opacity-35' : 'opacity-100'}`}
            >
              {/* Status indicator */}
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                done    ? 'bg-emerald-500/20 border-emerald-500/40' :
                active  ? 'bg-indigo-500/20 border-indigo-500/50' :
                          'bg-surface-600 border-white/[0.07]'
              }`}>
                {done ? (
                  <CheckIcon />
                ) : active ? (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse-soft" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                )}
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium ${
                  done   ? 'text-slate-500 line-through decoration-slate-600' :
                  active ? 'text-slate-100' :
                           'text-slate-500'
                }`}>
                  {stage.label}
                </span>
                {active && (
                  <p className="text-xs text-indigo-400/70 mt-0.5 animate-fade-in">{stage.sub}</p>
                )}
              </div>

              {/* Active shimmer bar */}
              {active && (
                <div className="w-20 h-1 bg-surface-600 rounded-full overflow-hidden shrink-0">
                  <div className="h-full shimmer-line" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Skeleton preview cards */}
      <div className="space-y-3 pt-2 border-t border-white/[0.05]">
        <p className="text-xs text-slate-600 font-medium uppercase tracking-widest">Preview</p>
        {[1, 2].map((n) => (
          <div key={n} className="bg-surface-700/50 border border-white/[0.05] rounded-xl p-4 space-y-2.5">
            <div className="shimmer-line h-3 w-4/5" style={{ animationDelay: `${n * 0.1}s` }} />
            <div className="shimmer-line h-3 w-3/5" style={{ animationDelay: `${n * 0.15}s` }} />
            <div className="flex gap-2 mt-1">
              <div className="shimmer-line h-5 w-20 rounded-lg" style={{ animationDelay: `${n * 0.2}s` }} />
              <div className="shimmer-line h-1.5 flex-1 self-center" style={{ animationDelay: `${n * 0.25}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
