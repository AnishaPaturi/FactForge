import { useState, useRef } from 'react'

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 2L7.5 8.5M14 2L9.5 14L7.5 8.5M14 2L2 6.5L7.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.05 3.05l1.41 1.41M9.54 9.54l1.41 1.41M3.05 10.95l1.41-1.41M9.54 4.46l1.41-1.41" stroke="#818cf8" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

const exampleClaims = [
  "The Great Wall of China is visible from space with the naked eye.",
  "Drinking 8 glasses of water per day is scientifically proven.",
  "Einstein failed his math exams as a child.",
]

export default function InputBox({ onAnalyze, isLoading }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const MAX_CHARS = 1500
  const charCount = text.length
  const overLimit = charCount > MAX_CHARS

  const handleSubmit = () => {
    if (!text.trim() || isLoading || overLimit) return
    onAnalyze(text.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  const handleExample = (claim) => {
    setText(claim)
    textareaRef.current?.focus()
  }

  return (
    <div className="space-y-3">
      {/* Main input container */}
      <div className={`relative card transition-all duration-300 ${
        text ? 'border-indigo-500/30 shadow-glow-sm' : ''
      } ${overLimit ? 'border-red-500/40' : ''}`}>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste a claim, news headline, or statement to fact-check…"
          rows={4}
          disabled={isLoading}
          className="w-full bg-transparent px-5 pt-4 pb-3 text-sm text-slate-200 placeholder-slate-500 outline-none resize-none leading-relaxed disabled:opacity-50"
        />

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-4 pb-3.5 pt-1 border-t border-white/[0.05]">
          <div className="flex items-center gap-3">
            {/* Char counter */}
            <span className={`text-xs font-mono ${
              overLimit ? 'text-red-400' : charCount > MAX_CHARS * 0.8 ? 'text-amber-400/70' : 'text-slate-600'
            }`}>
              {charCount} / {MAX_CHARS}
            </span>

            {/* Keyboard hint */}
            <span className="hidden sm:block text-xs text-slate-600">
              <kbd className="font-mono bg-surface-600 border border-white/[0.08] rounded px-1.5 py-0.5 text-slate-500">⌘ Enter</kbd>
              {' '} to analyze
            </span>
          </div>

          {/* Analyze button */}
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading || overLimit}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Analyzing…
              </>
            ) : (
              <>
                <SendIcon />
                Analyze
              </>
            )}
          </button>
        </div>
      </div>

      {/* Example claims */}
      {!text && !isLoading && (
        <div className="flex flex-wrap items-center gap-2 animate-fade-in">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <SparkleIcon /> Try:
          </span>
          {exampleClaims.map((claim, i) => (
            <button
              key={i}
              onClick={() => handleExample(claim)}
              className="text-xs text-slate-500 hover:text-indigo-400 border border-white/[0.07] hover:border-indigo-500/30 bg-surface-800 hover:bg-indigo-500/5 px-3 py-1.5 rounded-lg transition-all duration-200 truncate max-w-[240px] sm:max-w-none"
            >
              "{claim.slice(0, 42)}{claim.length > 42 ? '…' : ''}"
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
