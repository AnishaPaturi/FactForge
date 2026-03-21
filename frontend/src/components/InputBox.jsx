// import { useState, useRef } from 'react'

// const SendIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//     <path d="M14 2L7.5 8.5M14 2L9.5 14L7.5 8.5M14 2L2 6.5L7.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// )

// const SparkleIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//     <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.05 3.05l1.41 1.41M9.54 9.54l1.41 1.41M3.05 10.95l1.41-1.41M9.54 4.46l1.41-1.41" stroke="#818cf8" strokeWidth="1.4" strokeLinecap="round"/>
//   </svg>
// )

// const exampleClaims = [
//   "The Great Wall of China is visible from space with the naked eye.",
//   "Drinking 8 glasses of water per day is scientifically proven.",
//   "Einstein failed his math exams as a child.",
// ]

// export default function InputBox({ onAnalyze, isLoading }) {
//   const [text, setText] = useState('')
//   const textareaRef = useRef(null)

//   const MAX_CHARS = 1500
//   const charCount = text.length
//   const overLimit = charCount > MAX_CHARS

//   const handleSubmit = () => {
//     if (!text.trim() || isLoading || overLimit) return
//     onAnalyze(text.trim())
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
//       handleSubmit()
//     }
//   }

//   const handleExample = (claim) => {
//     setText(claim)
//     textareaRef.current?.focus()
//   }

//   return (
//     <div className="space-y-3">
//       {/* Main input container */}
//       <div className={`relative card transition-all duration-300 ${
//         text ? 'border-indigo-500/30 shadow-glow-sm' : ''
//       } ${overLimit ? 'border-red-500/40' : ''}`}>

//         {/* Textarea */}
//         <textarea
//           ref={textareaRef}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Paste a claim, news headline, or statement to fact-check…"
//           rows={4}
//           disabled={isLoading}
//           className="w-full bg-transparent px-5 pt-4 pb-3 text-sm text-slate-200 placeholder-slate-500 outline-none resize-none leading-relaxed disabled:opacity-50"
//         />

//         {/* Bottom toolbar */}
//         <div className="flex items-center justify-between px-4 pb-3.5 pt-1 border-t border-white/[0.05]">
//           <div className="flex items-center gap-3">
//             {/* Char counter */}
//             <span className={`text-xs font-mono ${
//               overLimit ? 'text-red-400' : charCount > MAX_CHARS * 0.8 ? 'text-amber-400/70' : 'text-slate-600'
//             }`}>
//               {charCount} / {MAX_CHARS}
//             </span>

//             {/* Keyboard hint */}
//             <span className="hidden sm:block text-xs text-slate-600">
//               <kbd className="font-mono bg-surface-600 border border-white/[0.08] rounded px-1.5 py-0.5 text-slate-500">⌘ Enter</kbd>
//               {' '} to analyze
//             </span>
//           </div>

//           {/* Analyze button */}
//           <button
//             onClick={handleSubmit}
//             disabled={!text.trim() || isLoading || overLimit}
//             className="btn-primary flex items-center gap-2 text-sm"
//           >
//             {isLoading ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                   <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
//                   <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
//                 </svg>
//                 Analyzing…
//               </>
//             ) : (
//               <>
//                 <SendIcon />
//                 Analyze
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Example claims */}
//       {!text && !isLoading && (
//         <div className="flex flex-wrap items-center gap-2 animate-fade-in">
//           <span className="flex items-center gap-1 text-xs text-slate-500">
//             <SparkleIcon /> Try:
//           </span>
//           {exampleClaims.map((claim, i) => (
//             <button
//               key={i}
//               onClick={() => handleExample(claim)}
//               className="text-xs text-slate-500 hover:text-indigo-400 border border-white/[0.07] hover:border-indigo-500/30 bg-surface-800 hover:bg-indigo-500/5 px-3 py-1.5 rounded-lg transition-all duration-200 truncate max-w-[240px] sm:max-w-none"
//             >
//               "{claim.slice(0, 42)}{claim.length > 42 ? '…' : ''}"
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }




// import { useState } from "react";

// export default function InputBox({ onVerify }) {
//   const [text, setText] = useState("");

//   return (
//     <div className="card input-box">
//       <textarea
//         rows="4"
//         placeholder="Paste text or URL to verify..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <button
//         className="primary-btn"
//         onClick={() => onVerify(text)}
//       >
//         Verify Claims
//       </button>
//     </div>
//   );
// }





import { useState } from "react";

const styles = `
  .ff-inputbox {
    background: rgba(4, 14, 28, 0.75);
    border: 1px solid rgba(0, 200, 255, 0.15);
    border-radius: 16px;
    padding: 1.25rem;
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color 0.25s;
  }

  .ff-inputbox:focus-within {
    border-color: rgba(0, 210, 255, 0.4);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 3px rgba(0,180,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .ff-inputbox-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0, 200, 255, 0.7);
    margin-bottom: -0.25rem;
  }

  .ff-inputbox textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 0.9rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #e2f0ff;
    outline: none;
    resize: none;
    line-height: 1.6;
    transition: border-color 0.2s, background 0.2s;
  }

  .ff-inputbox textarea::placeholder {
    color: rgba(255,255,255,0.25);
  }

  .ff-inputbox textarea:focus {
    border-color: rgba(0,200,255,0.35);
    background: rgba(0,150,255,0.05);
  }

  .ff-inputbox-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .ff-verify-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.7rem 1.6rem;
    border: none;
    border-radius: 50px;
    background: #fff;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #000;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(255,255,255,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .ff-verify-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(255,255,255,0.22);
  }

  .ff-verify-btn:active {
    transform: translateY(0);
  }

  .ff-verify-btn svg {
    flex-shrink: 0;
  }
`

export default function InputBox({ onVerify }) {
  const [text, setText] = useState("");

  return (
    <>
      <style>{styles}</style>
      <div className="ff-inputbox">
        <span className="ff-inputbox-label">Claim Input</span>
        <textarea
          rows="4"
          placeholder="Paste text or URL to verify..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="ff-inputbox-footer">
          <button className="ff-verify-btn" onClick={() => onVerify(text)}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M14 2L7.5 8.5M14 2L9.5 14L7.5 8.5M14 2L2 6.5L7.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Verify Claims
          </button>
        </div>
      </div>
    </>
  );
}