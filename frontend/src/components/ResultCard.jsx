// import { useState } from 'react'

// // ─── Verdict configurations ────────────────────────────────────────
// const VERDICTS = {
//   true: {
//     label: 'True',
//     badgeClass: 'badge-true',
//     borderClass: 'verdict-true',
//     barClass: 'bar-true',
//     dotColor: 'bg-emerald-500',
//     Icon: () => (
//       <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//         <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//   },
//   false: {
//     label: 'False',
//     badgeClass: 'badge-false',
//     borderClass: 'verdict-false',
//     barClass: 'bar-false',
//     dotColor: 'bg-red-500',
//     Icon: () => (
//       <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//         <path d="M3 3l6 6M9 3l-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//   },
//   partial: {
//     label: 'Partially True',
//     badgeClass: 'badge-partial',
//     borderClass: 'verdict-partial',
//     barClass: 'bar-partial',
//     dotColor: 'bg-amber-500',
//     Icon: () => (
//       <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//         <circle cx="6" cy="6" r="4.5" stroke="#f59e0b" strokeWidth="1.5"/>
//         <path d="M6 4v2.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
//         <circle cx="6" cy="8.5" r="0.6" fill="#f59e0b"/>
//       </svg>
//     ),
//   },
//   unverifiable: {
//     label: 'Unverifiable',
//     badgeClass: 'badge-unverifiable',
//     borderClass: 'verdict-unverifiable',
//     barClass: 'bar-unverifiable',
//     dotColor: 'bg-slate-500',
//     Icon: () => (
//       <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//         <circle cx="6" cy="6" r="4.5" stroke="#64748b" strokeWidth="1.5"/>
//         <path d="M4.5 4.5C4.5 3.67 5.12 3 6 3s1.5.67 1.5 1.5c0 1-1.5 1.25-1.5 2.5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
//         <circle cx="6" cy="8.5" r="0.6" fill="#64748b"/>
//       </svg>
//     ),
//   },
// }

// const ExternalLinkIcon = () => (
//   <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
//     <path d="M4.5 2H2.5A1.5 1.5 0 0 0 1 3.5v5A1.5 1.5 0 0 0 2.5 10h5A1.5 1.5 0 0 0 9 8.5v-2M6.5 1H10m0 0v3.5M10 1 5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// )

// const ChevronIcon = ({ open }) => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
//     <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// )
// const getScoreColor = (score) => {
//   if (score >= 8) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
//   if (score >= 5) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
//   return "bg-red-500/10 text-red-400 border-red-500/30";
// };
// // ─────────────────────────────────────────────────────────────────
// export default function ResultCard({ index = 0, claim, verdict, confidence, explanation, sources }) {
//   const [expanded, setExpanded] = useState(true)
//   const cfg = VERDICTS[verdict] || VERDICTS.unverifiable
//   const VerdictIcon = cfg.Icon
//   console.log("SOURCES FRONTEND:", sources);
//   return (
//     <div
//       className={`card card-hover overflow-hidden animate-slide-up ${cfg.borderClass}`}
//       style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
//     >
      
//       {/* Header row — always visible */}
//       <button
//         className="w-full text-left px-5 pt-4 pb-3 flex items-start gap-4"
//         onClick={() => setExpanded((p) => !p)}
//       >
//         {/* Index badge */}
//         <span className="shrink-0 w-6 h-6 rounded-md bg-surface-600 border border-white/[0.08] flex items-center justify-center text-[10px] font-mono text-slate-500 mt-0.5">
//           {String(index + 1).padStart(2, '0')}
//         </span>

//         <div className="flex-1 min-w-0">
//           {/* Claim text */}
//           <p className="text-sm text-slate-200 leading-relaxed font-medium pr-2">{claim}</p>

//           {/* Verdict + confidence row */}
//           <div className="flex items-center flex-wrap gap-3 mt-2.5">
//             <span className={cfg.badgeClass}>
//               <VerdictIcon />
//               {cfg.label}
//             </span>

//             {/* Confidence bar */}
//             <div className="flex items-center gap-2 flex-1 min-w-[120px] max-w-[200px]">
//               <div className="flex-1 h-1.5 bg-surface-600 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full rounded-full transition-all duration-700 ${cfg.barClass}`}
//                   style={{ width: `${confidence}%` }}
//                 />
                
//               </div>
//               <span className="text-xs font-mono text-slate-400 shrink-0">{confidence}%</span>
//             </div>
//           </div>
//         </div>

//         <span className="shrink-0 mt-1">
//           <ChevronIcon open={expanded} />
//         </span>
//       </button>

//       {/* Expanded content */}
//       {expanded && (
//         <div className="px-5 pb-4 border-t border-white/[0.05] animate-fade-in">
//           {/* Explanation */}
//           <div className="mt-3 mb-4">
//             <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
//               AI Analysis
//             </p>
//             <p className="text-sm text-slate-400 leading-relaxed">{explanation}</p>
//           </div>
          

//           {/* Sources */}
//           {sources && sources.length > 0 && (
//           <div>
//             <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
//               Sources
//             </p>

//             <div className="flex flex-col gap-2">
//               {sources.map((src, i) => (
//                 <a
//                   key={i}
//                   href={src.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-between px-3 py-2 text-sm bg-surface-700 border border-white/[0.07] rounded-lg hover:bg-surface-600 transition"
//                 >
//                   {/* LEFT: label */}
//                   <span className="text-slate-300">
//                     {src.label || "unknown"}
//                   </span>

//                   {/* RIGHT: score */}
//                   <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500 text-white">
//                     {src.score}
//                   </span>
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//         </div>
//       )}
//     </div>
//   )
// }




// import { useState } from 'react'

// const VERDICTS = {
//   true: { label: 'True', badgeClass: 'badge-true', borderClass: 'verdict-true', barClass: 'bar-true' },
//   false: { label: 'False', badgeClass: 'badge-false', borderClass: 'verdict-false', barClass: 'bar-false' },
//   partial: { label: 'Partially True', badgeClass: 'badge-partial', borderClass: 'verdict-partial', barClass: 'bar-partial' },
//   unverifiable: { label: 'Unverifiable', badgeClass: 'badge-unverifiable', borderClass: 'verdict-unverifiable', barClass: 'bar-unverifiable' },
// }

// <<<<<<< HEAD
// const ChevronIcon = ({ open }) => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//     style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
//     <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// )

// =======
// >>>>>>> 075452cdcc0fc0278e1d9348118ff89d9fffb089
// export default function ResultCard({
//   index = 0,
//   claim,
//   verdict,
//   confidence,
//   explanation,
// <<<<<<< HEAD
//   sources
// =======
//   sources = [],
//   source_analysis = null
// >>>>>>> 075452cdcc0fc0278e1d9348118ff89d9fffb089
// }) {
//   const [expanded, setExpanded] = useState(true)

//   const cfg = VERDICTS[verdict] || VERDICTS.unverifiable
// <<<<<<< HEAD
//   const VerdictIcon = cfg.Icon

//   console.log("SOURCES FRONTEND:", sources)

//   return (
//     <div
//       className={`card card-hover overflow-hidden animate-slide-up ${cfg.borderClass}`}
//       style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
//     >
//       {/* Header */}
//       <button
//         className="w-full text-left px-5 pt-4 pb-3 flex items-start gap-4"
//         onClick={() => setExpanded((p) => !p)}
//       >
//         <span className="shrink-0 w-6 h-6 rounded-md bg-surface-600 border border-white/[0.08] flex items-center justify-center text-[10px] font-mono text-slate-500 mt-0.5">
//           {String(index + 1).padStart(2, '0')}
//         </span>

//         <div className="flex-1 min-w-0">
//           <p className="text-sm text-slate-200 leading-relaxed font-medium pr-2">
//             {claim}
//           </p>

//           <div className="flex items-center flex-wrap gap-3 mt-2.5">
//             <span className={cfg.badgeClass}>
//               <VerdictIcon />
//               {cfg.label}
//             </span>

//             <div className="flex items-center gap-2 flex-1 min-w-[120px] max-w-[200px]">
//               <div className="flex-1 h-1.5 bg-surface-600 rounded-full overflow-hidden">
//                 <div
//                   className={`h-full rounded-full transition-all duration-700 ${cfg.barClass}`}
//                   style={{ width: `${confidence}%` }}
//                 />
//               </div>
//               <span className="text-xs font-mono text-slate-400 shrink-0">
//                 {confidence}%
//               </span>
//             </div>
//           </div>


//   return (
//     <div className={`card ${cfg.borderClass}`}>

//       {/* HEADER */}
//       <div onClick={() => setExpanded(!expanded)} className="p-4 cursor-pointer">
//         <p>{claim}</p>
//         <div className="flex gap-2 items-center">
//           <span className={cfg.badgeClass}>{cfg.label}</span>
//           <span>{confidence}%</span>

//         </div>
//       </div>


//         <span className="shrink-0 mt-1">
//           <ChevronIcon open={expanded} />
//         </span>
//       </button>

//       {/* Expanded */}
//       {expanded && (
//         <div className="px-5 pb-4 border-t border-white/[0.05] animate-fade-in">

//           {/* AI Analysis */}
//           <div className="mt-3 mb-4">
//             <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
//               AI Analysis
//             </p>
//             <p className="text-sm text-slate-400 leading-relaxed">
//               {explanation}
//             </p>
//           </div>

//           {/* Sources */}
//           {sources && sources.length > 0 && (
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
//                 Sources
//               </p>

//               <div className="flex flex-col gap-2">
//                 {sources.map((src, i) => (
//                   <a
//                     key={i}
//                     href={src.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-between px-3 py-2 text-sm bg-surface-700 border border-white/[0.07] rounded-lg hover:bg-surface-600 transition"
//                   >
//                     {/* LEFT: title/url */}
//                     <span className="text-slate-300">
//                       {src.title || src.url}
//                     </span>

//                     {/* RIGHT: credibility */}
//                     <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500 text-white">
//                       {src.credibility}
//                     </span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}


//       {/* BODY */}
//       {expanded && (
//         <div className="p-4 border-t">

//           {/* Explanation */}
//           <p className="text-sm mb-3">{explanation}</p>

//           {/* 🔥 AGREEMENT */}
//           {source_analysis && (
//             <div className="mb-4">
//               <p className="text-xs mb-1">Source Agreement</p>

//               <div className="w-full bg-gray-700 h-2 rounded mb-2">
//                 <div
//                   className="bg-green-500 h-2 rounded"
//                   style={{ width: `${source_analysis.agreement_score || 0}%` }}
//                 />
//               </div>

//               <div className="flex gap-3 text-xs">
//                 <span>🟢 {source_analysis.counts?.agree || 0}</span>
//                 <span>🔴 {source_analysis.counts?.disagree || 0}</span>
//                 <span>⚪ {source_analysis.counts?.neutral || 0}</span>
//               </div>

//               <p className="text-xs mt-1">{source_analysis.insight}</p>
//             </div>
//           )}

//           {/* SOURCES */}
//           <div>
//             {sources.map((src, i) => {
//               const stanceIcon =
//                 src.stance === "Agree" ? "🟢" :
//                 src.stance === "Disagree" ? "🔴" : "⚪";

//               return (
//                 <div key={i} className="flex justify-between p-2 border rounded mb-1">
//                   <div>
//                     {stanceIcon} {src.label}
//                   </div>
//                   <div>
//                     {src.stance || "Unknown"} | {src.score}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>


//         </div>
//       )}
//     </div>
//   )

// }


// }





import { useState } from 'react'

const styles = `
  .rc-card {
    background: rgba(4, 14, 28, 0.78);
    border: 1px solid rgba(0, 200, 255, 0.12);
    border-radius: 14px;
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
    overflow: hidden;
    margin-bottom: 0.85rem;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    animation: rcIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .rc-card:hover {
    border-color: rgba(0,200,255,0.22);
    box-shadow: 0 8px 30px rgba(0,0,0,0.42);
    transform: translateY(-1px);
  }
  @keyframes rcIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Verdict left-border accents */
  .verdict-true        { border-left: 2.5px solid rgba(74,222,128,0.55) !important; }
  .verdict-false       { border-left: 2.5px solid rgba(248,113,113,0.55) !important; }
  .verdict-partial     { border-left: 2.5px solid rgba(251,191,36,0.55) !important; }
  .verdict-unverifiable{ border-left: 2.5px solid rgba(100,116,139,0.45) !important; }

  /* Header */
  .rc-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 1rem 1.25rem;
    cursor: pointer;
    width: 100%;
    background: none;
    border: none;
    text-align: left;
  }

  .rc-index {
    font-family: 'Inter', monospace;
    font-size: 0.62rem;
    color: rgba(255,255,255,0.2);
    flex-shrink: 0;
    padding-top: 3px;
    min-width: 18px;
  }

  .rc-header-body { flex: 1; min-width: 0; }

  .rc-claim-text {
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: #dbeafe;
    line-height: 1.55;
    margin-bottom: 8px;
  }

  .rc-meta-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  /* Verdict badges */
  .badge-true        { display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:50px;font-size:0.68rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;border:1px solid;background:rgba(34,197,94,0.1);border-color:rgba(34,197,94,0.3);color:#4ade80; }
  .badge-false       { display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:50px;font-size:0.68rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;border:1px solid;background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#f87171; }
  .badge-partial     { display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:50px;font-size:0.68rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;border:1px solid;background:rgba(245,158,11,0.1);border-color:rgba(245,158,11,0.3);color:#fbbf24; }
  .badge-unverifiable{ display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:50px;font-size:0.68rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;border:1px solid;background:rgba(100,116,139,0.12);border-color:rgba(100,116,139,0.28);color:#94a3b8; }

  /* Confidence bar */
  .rc-conf-wrap {
    display: flex;
    align-items: center;
    gap: 7px;
    flex: 1;
    min-width: 100px;
    max-width: 200px;
  }
  .rc-conf-track {
    flex: 1;
    height: 5px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }
  .rc-conf-bar { height: 100%; border-radius: 99px; transition: width 0.6s cubic-bezier(0.16,1,0.3,1); }
  .bar-true        { background: #22d3ee; box-shadow: 0 0 8px rgba(34,211,238,0.4); }
  .bar-false       { background: #f87171; box-shadow: 0 0 8px rgba(248,113,113,0.4); }
  .bar-partial     { background: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,0.4); }
  .bar-unverifiable{ background: #64748b; }
  .rc-conf-label {
    font-family: 'Inter', monospace;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.35);
    flex-shrink: 0;
  }

  /* Chevron */
  .rc-chevron {
    flex-shrink: 0;
    margin-top: 2px;
    opacity: 0.4;
    transition: transform 0.25s ease, opacity 0.2s;
  }
  .rc-chevron.open { transform: rotate(180deg); opacity: 0.7; }

  /* Expanded body */
  .rc-body {
    padding: 1rem 1.25rem 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: rcBodyIn 0.25s ease both;
  }
  @keyframes rcBodyIn {
    from { opacity: 0; transform: translateY(-5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rc-section-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,200,255,0.5);
    margin-bottom: 6px;
  }

  .rc-explanation {
    font-family: 'Inter', sans-serif;
    font-size: 0.83rem;
    color: rgba(255,255,255,0.55);
    line-height: 1.65;
  }

  /* Source agreement block */
  .rc-agreement {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 0.85rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .rc-agreement-track {
    height: 5px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }
  .rc-agreement-bar {
    height: 100%;
    background: linear-gradient(90deg, #22d3ee, #4ade80);
    border-radius: 99px;
    box-shadow: 0 0 8px rgba(74,222,128,0.3);
    transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
  }

  .rc-agreement-counts {
    display: flex;
    gap: 14px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.45);
  }

  .rc-agreement-insight {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.38);
    line-height: 1.55;
    font-style: italic;
  }

  /* Source rows */
  .rc-source-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 7px 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    margin-bottom: 5px;
    transition: background 0.2s, border-color 0.2s;
    text-decoration: none;
  }
  .rc-source-row:hover {
    background: rgba(0,180,255,0.06);
    border-color: rgba(0,200,255,0.16);
  }

  .rc-source-left {
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
    flex: 1;
  }

  .rc-source-title {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: #93c5fd;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.15s;
  }
  .rc-source-row:hover .rc-source-title { color: #00d4ff; }

  .rc-source-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .rc-stance {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 50px;
    border: 1px solid;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .rc-stance-agree    { background: rgba(34,197,94,0.1);  border-color: rgba(34,197,94,0.25);  color: #4ade80; }
  .rc-stance-disagree { background: rgba(239,68,68,0.1);  border-color: rgba(239,68,68,0.25);  color: #f87171; }
  .rc-stance-neutral  { background: rgba(100,116,139,0.1);border-color: rgba(100,116,139,0.25);color: #94a3b8; }

  .rc-score {
    font-family: 'Inter', monospace;
    font-size: 0.7rem;
    color: #00d4ff;
    font-weight: 600;
  }

  .rc-credibility {
    font-family: 'Inter', monospace;
    font-size: 0.68rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.25);
    color: #a5b4fc;
  }
`

const VERDICTS = {
  true:         { label: 'True',          badgeClass: 'badge-true',         borderClass: 'verdict-true',         barClass: 'bar-true'         },
  false:        { label: 'False',         badgeClass: 'badge-false',        borderClass: 'verdict-false',        barClass: 'bar-false'        },
  partial:      { label: 'Partially True',badgeClass: 'badge-partial',      borderClass: 'verdict-partial',      barClass: 'bar-partial'      },
  unverifiable: { label: 'Unverifiable',  badgeClass: 'badge-unverifiable', borderClass: 'verdict-unverifiable', barClass: 'bar-unverifiable' },
}

const STANCE_CLASS = {
  Agree:    'rc-stance rc-stance-agree',
  Disagree: 'rc-stance rc-stance-disagree',
  Neutral:  'rc-stance rc-stance-neutral',
}

const STANCE_ICON = { Agree: '🟢', Disagree: '🔴', Neutral: '⚪' }

export default function ResultCard({
  index = 0,
  claim,
  verdict,
  confidence,
  explanation,
  sources = [],
  source_analysis = null,
}) {
  const [expanded, setExpanded] = useState(true)
  const cfg = VERDICTS[verdict] || VERDICTS.unverifiable

  return (
    <>
      <style>{styles}</style>
      <div
        className={`rc-card ${cfg.borderClass}`}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* ── Header ── */}
        <button className="rc-header" onClick={() => setExpanded((p) => !p)}>
          <span className="rc-index">{String(index + 1).padStart(2, '0')}</span>

          <div className="rc-header-body">
            <p className="rc-claim-text">{claim}</p>
            <div className="rc-meta-row">
              <span className={cfg.badgeClass}>{cfg.label}</span>
              <div className="rc-conf-wrap">
                <div className="rc-conf-track">
                  <div
                    className={`rc-conf-bar ${cfg.barClass}`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="rc-conf-label">{confidence}%</span>
              </div>
            </div>
          </div>

          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className={`rc-chevron${expanded ? ' open' : ''}`}
          >
            <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Expanded body ── */}
        {expanded && (
          <div className="rc-body">

            {/* AI Analysis */}
            <div>
              <p className="rc-section-label">AI Analysis</p>
              <p className="rc-explanation">{explanation}</p>
            </div>

            {/* Source Agreement */}
            {source_analysis && (
              <div>
                <p className="rc-section-label">Source Agreement</p>
                <div className="rc-agreement">
                  <div className="rc-agreement-track">
                    <div
                      className="rc-agreement-bar"
                      style={{ width: `${source_analysis.agreement_score || 0}%` }}
                    />
                  </div>
                  <div className="rc-agreement-counts">
                    <span>🟢 {source_analysis.counts?.agree || 0} agree</span>
                    <span>🔴 {source_analysis.counts?.disagree || 0} disagree</span>
                    <span>⚪ {source_analysis.counts?.neutral || 0} neutral</span>
                  </div>
                  {source_analysis.insight && (
                    <p className="rc-agreement-insight">"{source_analysis.insight}"</p>
                  )}
                </div>
              </div>
            )}

            {/* Sources */}
            {sources && sources.length > 0 && (
              <div>
                <p className="rc-section-label">Sources</p>
                {sources.map((src, i) => {
                  const stanceClass = STANCE_CLASS[src.stance] || 'rc-stance rc-stance-neutral'
                  const stanceIcon  = STANCE_ICON[src.stance]  || '⚪'
                  return (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rc-source-row"
                    >
                      <div className="rc-source-left">
                        <span>{stanceIcon}</span>
                        <span className="rc-source-title">
                          {src.title || src.label || src.url}
                        </span>
                      </div>
                      <div className="rc-source-right">
                        {src.stance && (
                          <span className={stanceClass}>{src.stance}</span>
                        )}
                        {src.score != null && (
                          <span className="rc-score">{src.score}</span>
                        )}
                        {src.credibility && (
                          <span className="rc-credibility">{src.credibility}</span>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            )}

          </div>
        )}
      </div>
    </>
  )
}