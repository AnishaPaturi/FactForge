// import { useState, useMemo } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'

// // ─── Mock history data ────────────────────────────────────────────
// const MOCK_HISTORY = [
//   {
//     id: 'h1',
//     inputText: 'The Great Wall of China is visible from space with the naked eye. Humans only use 10% of their brain at any given time.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
//     aiProbability: 62,
//     claims: [
//       { text: 'The Great Wall of China is visible from space.', verdict: 'false', confidence: 94 },
//       { text: 'Humans only use 10% of their brain.', verdict: 'false', confidence: 97 },
//     ],
//   },
//   {
//     id: 'h2',
//     inputText: 'Einstein failed math in school. Humans share 50% of their DNA with bananas. The first iPhone shipped with 3G connectivity.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
//     aiProbability: 31,
//     claims: [
//       { text: 'Einstein failed math in school.', verdict: 'false', confidence: 88 },
//       { text: 'Humans share ~50% of DNA with bananas.', verdict: 'true', confidence: 91 },
//       { text: 'First iPhone shipped with 3G connectivity.', verdict: 'false', confidence: 96 },
//     ],
//   },
//   {
//     id: 'h3',
//     inputText: 'Caffeine is the most widely consumed psychoactive drug in the world. Drinking cold water burns more calories.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
//     aiProbability: 45,
//     claims: [
//       { text: 'Caffeine is the most widely consumed psychoactive drug.', verdict: 'true', confidence: 87 },
//       { text: 'Drinking cold water burns more calories.', verdict: 'partial', confidence: 58 },
//     ],
//   },
//   {
//     id: 'h4',
//     inputText: 'The COVID-19 vaccine contains microchips for government surveillance. Vitamin C cures the common cold.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
//     aiProbability: 78,
//     claims: [
//       { text: 'COVID-19 vaccines contain microchips.', verdict: 'false', confidence: 99 },
//       { text: 'Vitamin C cures the common cold.', verdict: 'partial', confidence: 61 },
//     ],
//   },
//   {
//     id: 'h5',
//     inputText: 'A previously unknown ancient civilization existed beneath the Sahara Desert 12,000 years ago with advanced technology.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
//     aiProbability: 85,
//     claims: [
//       { text: 'An advanced ancient civilization existed under the Sahara 12,000 years ago.', verdict: 'unverifiable', confidence: 29 },
//     ],
//   },
//   {
//     id: 'h6',
//     inputText: 'The Eiffel Tower grows taller in summer. Gold is the best conductor of electricity. Mount Everest is the world\'s tallest mountain measured from sea level.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
//     aiProbability: 18,
//     claims: [
//       { text: 'The Eiffel Tower grows taller in summer.', verdict: 'true', confidence: 93 },
//       { text: 'Gold is the best conductor of electricity.', verdict: 'false', confidence: 89 },
//       { text: 'Mount Everest is the tallest mountain from sea level.', verdict: 'true', confidence: 98 },
//     ],
//   },
// ]

// // ─── Verdict styles ───────────────────────────────────────────────
// const VERDICT_META = {
//   true:          { label: 'True',         class: 'badge-true',          dot: 'bg-emerald-500' },
//   false:         { label: 'False',        class: 'badge-false',         dot: 'bg-red-500'     },
//   partial:       { label: 'Partial',      class: 'badge-partial',       dot: 'bg-amber-500'   },
//   unverifiable:  { label: 'Unverifiable', class: 'badge-unverifiable',  dot: 'bg-slate-500'   },
// }

// // ─── Helpers ──────────────────────────────────────────────────────
// function relativeTime(isoStr) {
//   const diff = Date.now() - new Date(isoStr).getTime()
//   const mins  = Math.floor(diff / 60000)
//   const hours = Math.floor(diff / 3600000)
//   const days  = Math.floor(diff / 86400000)
//   if (mins < 1)   return 'Just now'
//   if (mins < 60)  return `${mins}m ago`
//   if (hours < 24) return `${hours}h ago`
//   if (days < 7)   return `${days}d ago`
//   return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
// }

// function formatDate(isoStr) {
//   return new Date(isoStr).toLocaleString('en-US', {
//     month: 'short', day: 'numeric', year: 'numeric',
//     hour: '2-digit', minute: '2-digit',
//   })
// }

// // Summarise verdicts for a session
// function verdictCounts(claims) {
//   const counts = {}
//   claims.forEach((c) => { counts[c.verdict] = (counts[c.verdict] || 0) + 1 })
//   return counts
// }

// // ─── Accordion item ───────────────────────────────────────────────
// function HistoryItem({ item, isOpen, onToggle, index }) {
//   const navigate = useNavigate()
//   const counts = verdictCounts(item.claims)
//   const verdictsOrder = ['true', 'false', 'partial', 'unverifiable']

//   return (
//     <div
//       className={`card card-hover overflow-hidden transition-all duration-300 animate-slide-up ${
//         isOpen ? 'border-indigo-500/25 shadow-glow-sm' : ''
//       }`}
//       style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
//     >
//       {/* Header */}
//       <button
//         className="w-full flex items-start gap-4 px-5 py-4 text-left"
//         onClick={onToggle}
//       >
//         {/* Left: index + dot */}
//         <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
//           <span className="text-[10px] font-mono text-slate-600">
//             {String(index + 1).padStart(2, '0')}
//           </span>
//           <div className="w-px flex-1 bg-white/[0.06]" style={{ minHeight: '20px' }} />
//         </div>

//         {/* Center: content */}
//         <div className="flex-1 min-w-0 space-y-2.5">
//           {/* Input text preview */}
//           <p className="text-sm text-slate-200 font-medium leading-relaxed line-clamp-2">
//             {item.inputText}
//           </p>

//           {/* Meta row */}
//           <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
//             {/* Timestamp */}
//             <div className="flex items-center gap-1.5 text-xs text-slate-500">
//               <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//                 <circle cx="6" cy="6" r="5" stroke="#64748b" strokeWidth="1.2"/>
//                 <path d="M6 3.5v2.5l1.5 1.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
//               </svg>
//               {relativeTime(item.timestamp)}
//             </div>

//             {/* Claim count */}
//             <span className="text-xs text-slate-500">
//               {item.claims.length} claim{item.claims.length !== 1 ? 's' : ''}
//             </span>

//             {/* Verdict dots */}
//             <div className="flex items-center gap-1.5">
//               {verdictsOrder.filter((v) => counts[v]).map((v) => (
//                 <div key={v} className="flex items-center gap-1">
//                   <span className={`w-1.5 h-1.5 rounded-full ${VERDICT_META[v].dot}`} />
//                   <span className="text-xs font-mono text-slate-500">{counts[v]}</span>
//                 </div>
//               ))}
//             </div>

//             {/* AI probability pill */}
//             <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
//               item.aiProbability >= 70
//                 ? 'bg-red-500/10 border-red-500/25 text-red-400'
//                 : item.aiProbability >= 40
//                   ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
//                   : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
//             }`}>
//               AI {item.aiProbability}%
//             </span>
//           </div>
//         </div>

//         {/* Chevron */}
//         <svg
//           width="16" height="16" viewBox="0 0 16 16" fill="none"
//           className="shrink-0 mt-1 transition-transform duration-250"
//           style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
//         >
//           <path d="M4 6l4 4 4-4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </button>

//       {/* Expanded body */}
//       {isOpen && (
//         <div className="px-5 pb-5 border-t border-white/[0.05] animate-slide-down">
//           <div className="pt-4 space-y-4">
//             {/* Full input text */}
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
//                 Input Text
//               </p>
//               <p className="text-sm text-slate-300 leading-relaxed bg-surface-700/50 border border-white/[0.05] rounded-xl px-4 py-3">
//                 {item.inputText}
//               </p>
//             </div>

//             {/* Claims list */}
//             <div>
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
//                 Claims Verified
//               </p>
//               <div className="space-y-2">
//                 {item.claims.map((claim, i) => {
//                   const meta = VERDICT_META[claim.verdict] || VERDICT_META.unverifiable
//                   return (
//                     <div
//                       key={i}
//                       className={`flex items-start gap-3 p-3.5 rounded-xl bg-surface-700/50 border border-white/[0.05] ${
//                         claim.verdict === 'true' ? 'border-l-2 border-l-emerald-500/50' :
//                         claim.verdict === 'false' ? 'border-l-2 border-l-red-500/50' :
//                         claim.verdict === 'partial' ? 'border-l-2 border-l-amber-500/50' :
//                         'border-l-2 border-l-slate-500/50'
//                       }`}
//                     >
//                       <span className="shrink-0 text-[10px] font-mono text-slate-600 mt-1">
//                         {String(i + 1).padStart(2, '0')}
//                       </span>
//                       <div className="flex-1 min-w-0 space-y-2">
//                         <p className="text-sm text-slate-200 leading-relaxed">{claim.text}</p>
//                         <div className="flex items-center gap-3">
//                           <span className={meta.class}>{meta.label}</span>
//                           <div className="flex items-center gap-1.5">
//                             <div className="w-16 h-1 bg-surface-500 rounded-full overflow-hidden">
//                               <div
//                                 className="h-full rounded-full"
//                                 style={{
//                                   width: `${claim.confidence}%`,
//                                   background: claim.verdict === 'true' ? '#10b981' :
//                                               claim.verdict === 'false' ? '#ef4444' :
//                                               claim.verdict === 'partial' ? '#f59e0b' : '#64748b',
//                                 }}
//                               />
//                             </div>
//                             <span className="text-xs font-mono text-slate-500">{claim.confidence}%</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>

//             {/* Footer row */}
//             <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
//               <span className="text-xs text-slate-600">{formatDate(item.timestamp)}</span>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => navigate('/dashboard')}
//                   className="px-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/25 rounded-lg transition-all duration-200"
//                 >
//                   Re-analyze →
//                 </button>
//                 <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg transition-all duration-200">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // ─── Main History page ────────────────────────────────────────────
// export default function History() {
//   const [openId, setOpenId]         = useState('h1')
//   const [search, setSearch]         = useState('')
//   const [activeFilter, setFilter]   = useState('all')

//   const filters = [
//     { key: 'all',          label: 'All' },
//     { key: 'true',         label: 'True' },
//     { key: 'false',        label: 'False' },
//     { key: 'partial',      label: 'Partial' },
//     { key: 'unverifiable', label: 'Unverifiable' },
//   ]

//   const filtered = useMemo(() => {
//     return MOCK_HISTORY.filter((item) => {
//       const matchSearch = search === '' || item.inputText.toLowerCase().includes(search.toLowerCase())
//       const matchFilter = activeFilter === 'all' || item.claims.some((c) => c.verdict === activeFilter)
//       return matchSearch && matchFilter
//     })
//   }, [search, activeFilter])

//   return (
//     <div className="min-h-screen dot-grid">
//       <Navbar />

//       <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">

//         {/* Page header */}
//         <div>
//           <h1 className="font-display text-2xl font-bold text-slate-100 tracking-tight">
//             Analysis History
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Review and revisit your previous fact-checking sessions.
//           </p>
//         </div>

//         {/* Search + filters */}
//         <div className="space-y-3">
//           {/* Search bar */}
//           <div className="flex items-center gap-3 px-4 py-3 card focus-within:border-indigo-500/40 focus-within:shadow-glow-sm transition-all duration-200">
//             <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-slate-500 shrink-0">
//               <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
//               <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
//             </svg>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search your history…"
//               className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
//             />
//             {search && (
//               <button onClick={() => setSearch('')} className="text-slate-500 hover:text-slate-300 transition-colors">
//                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                   <path d="M3 3l8 8M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
//                 </svg>
//               </button>
//             )}
//           </div>

//           {/* Filter pills */}
//           <div className="flex items-center gap-2 flex-wrap">
//             {filters.map(({ key, label }) => (
//               <button
//                 key={key}
//                 onClick={() => setFilter(key)}
//                 className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
//                   activeFilter === key
//                     ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
//                     : 'text-slate-500 border-white/[0.07] hover:text-slate-200 hover:border-white/[0.12] hover:bg-surface-700'
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}

//             <span className="ml-auto text-xs text-slate-600 font-mono">
//               {filtered.length} / {MOCK_HISTORY.length} sessions
//             </span>
//           </div>
//         </div>

//         {/* History list */}
//         {filtered.length > 0 ? (
//           <div className="space-y-3">
//             {filtered.map((item, i) => (
//               <HistoryItem
//                 key={item.id}
//                 item={item}
//                 index={i}
//                 isOpen={openId === item.id}
//                 onToggle={() => setOpenId(openId === item.id ? null : item.id)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="card p-10 text-center animate-fade-in">
//             <div className="w-12 h-12 rounded-full bg-surface-600 border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
//               <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                 <circle cx="9" cy="9" r="7" stroke="#475569" strokeWidth="1.5"/>
//                 <path d="M15 15l4 4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
//               </svg>
//             </div>
//             <p className="text-sm font-semibold text-slate-300 mb-1">No results found</p>
//             <p className="text-xs text-slate-500">Try adjusting your search or filter.</p>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }



// import { useState, useMemo } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'

// /* ─── Scoped styles ─────────────────────────────────────────────── */
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

//   .hist-page {
//     min-height: 100vh;
//     background:
//       radial-gradient(ellipse 65% 45% at 10% 0%, rgba(0,80,220,0.08) 0%, transparent 55%),
//       radial-gradient(ellipse 55% 40% at 90% 100%, rgba(0,160,255,0.06) 0%, transparent 55%),
//       #05090f;
//     font-family: 'Inter', sans-serif;
//     color: #dbeafe;
//   }

//   .hist-main {
//     max-width: 760px;
//     margin: 0 auto;
//     padding: 2rem 1.5rem 4rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
//   }

//   /* ── Page header ── */
//   .hist-page-title {
//     font-family: 'Orbitron', sans-serif;
//     font-size: 1.4rem;
//     font-weight: 700;
//     color: #e2f0ff;
//     letter-spacing: 0.04em;
//     text-shadow: 0 0 30px rgba(0,200,255,0.2);
//     margin-bottom: 4px;
//   }

//   .hist-page-sub {
//     font-size: 0.8rem;
//     color: rgba(255,255,255,0.35);
//     letter-spacing: 0.02em;
//   }

//   /* ── Search bar ── */
//   .hist-search {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 0.75rem 1rem;
//     background: rgba(4,14,28,0.78);
//     border: 1px solid rgba(0,200,255,0.12);
//     border-radius: 12px;
//     backdrop-filter: blur(16px);
//     transition: border-color 0.2s, box-shadow 0.2s;
//   }
//   .hist-search:focus-within {
//     border-color: rgba(0,200,255,0.35);
//     box-shadow: 0 0 0 3px rgba(0,180,255,0.08);
//   }
//   .hist-search-icon { flex-shrink: 0; opacity: 0.4; }
//   .hist-search input {
//     flex: 1;
//     background: transparent;
//     border: none;
//     outline: none;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.88rem;
//     color: #e2f0ff;
//   }
//   .hist-search input::placeholder { color: rgba(255,255,255,0.25); }
//   .hist-clear-btn {
//     background: none;
//     border: none;
//     cursor: pointer;
//     opacity: 0.45;
//     display: flex;
//     align-items: center;
//     padding: 3px;
//     transition: opacity 0.2s;
//   }
//   .hist-clear-btn:hover { opacity: 1; }

//   /* ── Filter row ── */
//   .hist-filters {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     flex-wrap: wrap;
//   }

//   .hist-filter-btn {
//     padding: 5px 14px;
//     border-radius: 50px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.72rem;
//     font-weight: 500;
//     letter-spacing: 0.04em;
//     border: 1px solid rgba(255,255,255,0.1);
//     background: rgba(255,255,255,0.04);
//     color: rgba(255,255,255,0.4);
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-filter-btn:hover {
//     color: rgba(255,255,255,0.8);
//     border-color: rgba(255,255,255,0.18);
//     background: rgba(255,255,255,0.06);
//   }
//   .hist-filter-btn.active {
//     background: rgba(0,180,255,0.12);
//     border-color: rgba(0,200,255,0.35);
//     color: #00d4ff;
//     box-shadow: 0 0 12px rgba(0,200,255,0.12);
//   }

//   .hist-session-count {
//     margin-left: auto;
//     font-family: 'Inter', monospace;
//     font-size: 0.68rem;
//     color: rgba(255,255,255,0.22);
//     letter-spacing: 0.06em;
//   }

//   /* ── History card ── */
//   .hist-card {
//     background: rgba(4,14,28,0.78);
//     border: 1px solid rgba(0,200,255,0.12);
//     border-radius: 14px;
//     backdrop-filter: blur(16px);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
//     overflow: hidden;
//     transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
//     animation: histCardIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
//   }
//   .hist-card:hover {
//     border-color: rgba(0,200,255,0.22);
//     box-shadow: 0 8px 28px rgba(0,0,0,0.42), 0 0 0 1px rgba(0,180,255,0.07);
//     transform: translateY(-1px);
//   }
//   .hist-card.open {
//     border-color: rgba(0,200,255,0.28);
//     box-shadow: 0 8px 32px rgba(0,0,0,0.45), 0 0 20px rgba(0,180,255,0.06);
//   }

//   @keyframes histCardIn {
//     from { opacity: 0; transform: translateY(12px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   /* ── Card header button ── */
//   .hist-card-header {
//     width: 100%;
//     display: flex;
//     align-items: flex-start;
//     gap: 14px;
//     padding: 1.1rem 1.25rem;
//     background: none;
//     border: none;
//     cursor: pointer;
//     text-align: left;
//   }

//   .hist-index {
//     font-family: 'Inter', monospace;
//     font-size: 0.62rem;
//     color: rgba(255,255,255,0.2);
//     flex-shrink: 0;
//     padding-top: 3px;
//     min-width: 18px;
//   }

//   .hist-card-body { flex: 1; min-width: 0; }

//   .hist-input-preview {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.88rem;
//     font-weight: 500;
//     color: #dbeafe;
//     line-height: 1.55;
//     overflow: hidden;
//     display: -webkit-box;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;
//     margin-bottom: 8px;
//   }

//   .hist-meta-row {
//     display: flex;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 12px;
//   }

//   .hist-timestamp {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.72rem;
//     color: rgba(255,255,255,0.3);
//   }

//   .hist-claim-count {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.72rem;
//     color: rgba(255,255,255,0.3);
//   }

//   .hist-verdict-dots {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .hist-verdict-dot-group {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//   }
//   .hist-dot {
//     width: 6px; height: 6px;
//     border-radius: 50%;
//     flex-shrink: 0;
//   }
//   .hist-dot-true        { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.6); }
//   .hist-dot-false       { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.6); }
//   .hist-dot-partial     { background: #fbbf24; box-shadow: 0 0 6px rgba(251,191,36,0.6); }
//   .hist-dot-unverifiable{ background: #64748b; }
//   .hist-dot-count {
//     font-family: 'Inter', monospace;
//     font-size: 0.68rem;
//     color: rgba(255,255,255,0.3);
//   }

//   .hist-ai-pill {
//     font-family: 'Inter', monospace;
//     font-size: 0.68rem;
//     font-weight: 500;
//     padding: 2px 8px;
//     border-radius: 50px;
//     border: 1px solid;
//   }
//   .hist-ai-high   { background: rgba(239,68,68,0.1);   border-color: rgba(239,68,68,0.25);   color: #f87171; }
//   .hist-ai-medium { background: rgba(245,158,11,0.1);  border-color: rgba(245,158,11,0.25);  color: #fbbf24; }
//   .hist-ai-low    { background: rgba(34,197,94,0.1);   border-color: rgba(34,197,94,0.25);   color: #4ade80; }

//   .hist-chevron {
//     flex-shrink: 0;
//     margin-top: 2px;
//     transition: transform 0.25s ease;
//     opacity: 0.45;
//   }
//   .hist-chevron.open { transform: rotate(180deg); opacity: 0.7; }

//   /* ── Expanded body ── */
//   .hist-expanded {
//     border-top: 1px solid rgba(255,255,255,0.05);
//     padding: 1.1rem 1.25rem 1.25rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     animation: expandIn 0.25s ease both;
//   }
//   @keyframes expandIn {
//     from { opacity: 0; transform: translateY(-6px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .hist-section-label {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.62rem;
//     font-weight: 600;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     color: rgba(0,200,255,0.5);
//     margin-bottom: 6px;
//   }

//   .hist-input-text-box {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.82rem;
//     color: rgba(255,255,255,0.65);
//     line-height: 1.65;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.06);
//     border-radius: 10px;
//     padding: 0.75rem 1rem;
//   }

//   /* ── Claim rows ── */
//   .hist-claim-row {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     padding: 0.8rem 0.9rem;
//     border-radius: 10px;
//     background: rgba(255,255,255,0.025);
//     border: 1px solid rgba(255,255,255,0.05);
//     margin-bottom: 6px;
//     border-left: 2.5px solid;
//   }
//   .hist-claim-row.verdict-true        { border-left-color: rgba(74,222,128,0.5); }
//   .hist-claim-row.verdict-false       { border-left-color: rgba(248,113,113,0.5); }
//   .hist-claim-row.verdict-partial     { border-left-color: rgba(251,191,36,0.5); }
//   .hist-claim-row.verdict-unverifiable{ border-left-color: rgba(100,116,139,0.4); }

//   .hist-claim-num {
//     font-family: 'Inter', monospace;
//     font-size: 0.6rem;
//     color: rgba(255,255,255,0.2);
//     padding-top: 3px;
//     flex-shrink: 0;
//   }

//   .hist-claim-text {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.82rem;
//     color: rgba(255,255,255,0.75);
//     line-height: 1.5;
//     margin-bottom: 6px;
//   }

//   .hist-claim-footer {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   /* ── Verdict badges ── */
//   .hist-badge {
//     display: inline-flex;
//     align-items: center;
//     padding: 2px 9px;
//     border-radius: 50px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.65rem;
//     font-weight: 600;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     border: 1px solid;
//     flex-shrink: 0;
//   }
//   .hist-badge-true        { background: rgba(34,197,94,0.1);   border-color: rgba(34,197,94,0.3);   color: #4ade80; }
//   .hist-badge-false       { background: rgba(239,68,68,0.1);   border-color: rgba(239,68,68,0.3);   color: #f87171; }
//   .hist-badge-partial     { background: rgba(245,158,11,0.1);  border-color: rgba(245,158,11,0.3);  color: #fbbf24; }
//   .hist-badge-unverifiable{ background: rgba(100,116,139,0.12);border-color: rgba(100,116,139,0.28);color: #94a3b8; }

//   /* ── Mini confidence bar ── */
//   .hist-conf-wrap {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }
//   .hist-conf-track {
//     width: 64px;
//     height: 4px;
//     background: rgba(255,255,255,0.07);
//     border-radius: 99px;
//     overflow: hidden;
//   }
//   .hist-conf-bar {
//     height: 100%;
//     border-radius: 99px;
//   }
//   .hist-conf-label {
//     font-family: 'Inter', monospace;
//     font-size: 0.65rem;
//     color: rgba(255,255,255,0.28);
//   }

//   /* ── Expanded footer row ── */
//   .hist-footer-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.05);
//     flex-wrap: wrap;
//     gap: 8px;
//   }

//   .hist-date {
//     font-family: 'Inter', monospace;
//     font-size: 0.65rem;
//     color: rgba(255,255,255,0.2);
//   }

//   .hist-actions {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }

//   .hist-btn-reanalyze {
//     padding: 5px 14px;
//     border-radius: 8px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: rgba(0,180,255,0.1);
//     border: 1px solid rgba(0,200,255,0.25);
//     color: #00d4ff;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-btn-reanalyze:hover {
//     background: rgba(0,180,255,0.18);
//     border-color: rgba(0,200,255,0.45);
//     box-shadow: 0 0 14px rgba(0,180,255,0.15);
//   }

//   .hist-btn-delete {
//     padding: 5px 12px;
//     border-radius: 8px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: transparent;
//     border: 1px solid transparent;
//     color: rgba(255,255,255,0.3);
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-btn-delete:hover {
//     color: #f87171;
//     background: rgba(239,68,68,0.08);
//     border-color: rgba(239,68,68,0.2);
//   }

//   /* ── Empty state ── */
//   .hist-empty {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 3rem 2rem;
//     background: rgba(4,14,28,0.78);
//     border: 1px solid rgba(0,200,255,0.1);
//     border-radius: 14px;
//     text-align: center;
//     gap: 10px;
//   }
//   .hist-empty-icon {
//     width: 48px; height: 48px;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.08);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 6px;
//   }
//   .hist-empty-title {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.88rem;
//     font-weight: 600;
//     color: rgba(255,255,255,0.6);
//   }
//   .hist-empty-sub {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.75rem;
//     color: rgba(255,255,255,0.25);
//   }

//   /* ── Spacing helpers ── */
//   .hist-gap { display: flex; flex-direction: column; gap: 0.75rem; }
//   .hist-gap-sm { display: flex; flex-direction: column; gap: 0.5rem; }
// `

// /* ─── Mock data ─────────────────────────────────────────────────── */
// const MOCK_HISTORY = [
//   {
//     id: 'h1',
//     inputText: 'The Great Wall of China is visible from space with the naked eye. Humans only use 10% of their brain at any given time.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
//     aiProbability: 62,
//     claims: [
//       { text: 'The Great Wall of China is visible from space.', verdict: 'false', confidence: 94 },
//       { text: 'Humans only use 10% of their brain.', verdict: 'false', confidence: 97 },
//     ],
//   },
//   {
//     id: 'h2',
//     inputText: 'Einstein failed math in school. Humans share 50% of their DNA with bananas. The first iPhone shipped with 3G connectivity.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
//     aiProbability: 31,
//     claims: [
//       { text: 'Einstein failed math in school.', verdict: 'false', confidence: 88 },
//       { text: 'Humans share ~50% of DNA with bananas.', verdict: 'true', confidence: 91 },
//       { text: 'First iPhone shipped with 3G connectivity.', verdict: 'false', confidence: 96 },
//     ],
//   },
//   {
//     id: 'h3',
//     inputText: 'Caffeine is the most widely consumed psychoactive drug in the world. Drinking cold water burns more calories.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
//     aiProbability: 45,
//     claims: [
//       { text: 'Caffeine is the most widely consumed psychoactive drug.', verdict: 'true', confidence: 87 },
//       { text: 'Drinking cold water burns more calories.', verdict: 'partial', confidence: 58 },
//     ],
//   },
//   {
//     id: 'h4',
//     inputText: 'The COVID-19 vaccine contains microchips for government surveillance. Vitamin C cures the common cold.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
//     aiProbability: 78,
//     claims: [
//       { text: 'COVID-19 vaccines contain microchips.', verdict: 'false', confidence: 99 },
//       { text: 'Vitamin C cures the common cold.', verdict: 'partial', confidence: 61 },
//     ],
//   },
//   {
//     id: 'h5',
//     inputText: 'A previously unknown ancient civilization existed beneath the Sahara Desert 12,000 years ago with advanced technology.',
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
//     aiProbability: 85,
//     claims: [
//       { text: 'An advanced ancient civilization existed under the Sahara 12,000 years ago.', verdict: 'unverifiable', confidence: 29 },
//     ],
//   },
//   {
//     id: 'h6',
//     inputText: "The Eiffel Tower grows taller in summer. Gold is the best conductor of electricity. Mount Everest is the world's tallest mountain measured from sea level.",
//     timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
//     aiProbability: 18,
//     claims: [
//       { text: 'The Eiffel Tower grows taller in summer.', verdict: 'true', confidence: 93 },
//       { text: 'Gold is the best conductor of electricity.', verdict: 'false', confidence: 89 },
//       { text: 'Mount Everest is the tallest mountain from sea level.', verdict: 'true', confidence: 98 },
//     ],
//   },
// ]

// /* ─── Helpers ───────────────────────────────────────────────────── */
// function relativeTime(isoStr) {
//   const diff = Date.now() - new Date(isoStr).getTime()
//   const mins  = Math.floor(diff / 60000)
//   const hours = Math.floor(diff / 3600000)
//   const days  = Math.floor(diff / 86400000)
//   if (mins < 1)   return 'Just now'
//   if (mins < 60)  return `${mins}m ago`
//   if (hours < 24) return `${hours}h ago`
//   if (days < 7)   return `${days}d ago`
//   return new Date(isoStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
// }

// function formatDate(isoStr) {
//   return new Date(isoStr).toLocaleString('en-US', {
//     month: 'short', day: 'numeric', year: 'numeric',
//     hour: '2-digit', minute: '2-digit',
//   })
// }

// function verdictCounts(claims) {
//   const counts = {}
//   claims.forEach((c) => { counts[c.verdict] = (counts[c.verdict] || 0) + 1 })
//   return counts
// }

// const VERDICT_ORDER = ['true', 'false', 'partial', 'unverifiable']

// const CONF_COLORS = {
//   true: '#4ade80', false: '#f87171', partial: '#fbbf24', unverifiable: '#64748b'
// }

// /* ─── HistoryItem component ─────────────────────────────────────── */
// function HistoryItem({ item, isOpen, onToggle, index }) {
//   const navigate = useNavigate()
//   const counts = verdictCounts(item.claims)
//   const aiLevel = item.aiProbability >= 70 ? 'high' : item.aiProbability >= 40 ? 'medium' : 'low'

//   return (
//     <div
//       className={`hist-card${isOpen ? ' open' : ''}`}
//       style={{ animationDelay: `${index * 55}ms` }}
//     >
//       {/* ── Header ── */}
//       <button className="hist-card-header" onClick={onToggle}>
//         <span className="hist-index">{String(index + 1).padStart(2, '0')}</span>

//         <div className="hist-card-body">
//           <p className="hist-input-preview">{item.inputText}</p>

//           <div className="hist-meta-row">
//             {/* Timestamp */}
//             <span className="hist-timestamp">
//               <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
//                 <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
//                 <path d="M6 3.5v2.5l1.5 1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
//               </svg>
//               {relativeTime(item.timestamp)}
//             </span>

//             {/* Claim count */}
//             <span className="hist-claim-count">
//               {item.claims.length} claim{item.claims.length !== 1 ? 's' : ''}
//             </span>

//             {/* Verdict dots */}
//             <span className="hist-verdict-dots">
//               {VERDICT_ORDER.filter(v => counts[v]).map(v => (
//                 <span key={v} className="hist-verdict-dot-group">
//                   <span className={`hist-dot hist-dot-${v}`} />
//                   <span className="hist-dot-count">{counts[v]}</span>
//                 </span>
//               ))}
//             </span>

//             {/* AI pill */}
//             <span className={`hist-ai-pill hist-ai-${aiLevel}`}>
//               AI {item.aiProbability}%
//             </span>
//           </div>
//         </div>

//         {/* Chevron */}
//         <svg
//           width="16" height="16" viewBox="0 0 16 16" fill="none"
//           className={`hist-chevron${isOpen ? ' open' : ''}`}
//         >
//           <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </button>

//       {/* ── Expanded content ── */}
//       {isOpen && (
//         <div className="hist-expanded">

//           {/* Full input text */}
//           <div>
//             <p className="hist-section-label">Input Text</p>
//             <p className="hist-input-text-box">{item.inputText}</p>
//           </div>

//           {/* Claims */}
//           <div>
//             <p className="hist-section-label">Claims Verified</p>
//             <div className="hist-gap-sm">
//               {item.claims.map((claim, i) => (
//                 <div key={i} className={`hist-claim-row verdict-${claim.verdict}`}>
//                   <span className="hist-claim-num">{String(i + 1).padStart(2, '0')}</span>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <p className="hist-claim-text">{claim.text}</p>
//                     <div className="hist-claim-footer">
//                       <span className={`hist-badge hist-badge-${claim.verdict}`}>
//                         {claim.verdict === 'true' ? 'True' :
//                          claim.verdict === 'false' ? 'False' :
//                          claim.verdict === 'partial' ? 'Partial' : 'Unverifiable'}
//                       </span>
//                       <span className="hist-conf-wrap">
//                         <span className="hist-conf-track">
//                           <span
//                             className="hist-conf-bar"
//                             style={{
//                               width: `${claim.confidence}%`,
//                               background: CONF_COLORS[claim.verdict] || '#64748b',
//                             }}
//                           />
//                         </span>
//                         <span className="hist-conf-label">{claim.confidence}%</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Footer row */}
//           <div className="hist-footer-row">
//             <span className="hist-date">{formatDate(item.timestamp)}</span>
//             <div className="hist-actions">
//               <button
//                 className="hist-btn-reanalyze"
//                 onClick={() => navigate('/dashboard')}
//               >
//                 Re-analyze →
//               </button>
//               <button className="hist-btn-delete">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─── Main History page ─────────────────────────────────────────── */
// export default function History() {
//   const [openId, setOpenId]       = useState('h1')
//   const [search, setSearch]       = useState('')
//   const [activeFilter, setFilter] = useState('all')

//   const filters = [
//     { key: 'all',          label: 'All' },
//     { key: 'true',         label: 'True' },
//     { key: 'false',        label: 'False' },
//     { key: 'partial',      label: 'Partial' },
//     { key: 'unverifiable', label: 'Unverifiable' },
//   ]

//   const filtered = useMemo(() => {
//     return MOCK_HISTORY.filter((item) => {
//       const matchSearch = search === '' || item.inputText.toLowerCase().includes(search.toLowerCase())
//       const matchFilter = activeFilter === 'all' || item.claims.some((c) => c.verdict === activeFilter)
//       return matchSearch && matchFilter
//     })
//   }, [search, activeFilter])

//   return (
//     <>
//       <style>{styles}</style>

//       <div className="hist-page">
//         <Navbar />

//         <main className="hist-main">

//           {/* Page header */}
//           <div>
//             <h1 className="hist-page-title">Analysis History</h1>
//             <p className="hist-page-sub">Review and revisit your previous fact-checking sessions.</p>
//           </div>

//           {/* Search + filters */}
//           <div className="hist-gap-sm">
//             <div className="hist-search">
//               <span className="hist-search-icon">
//                 <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
//                   <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3"/>
//                   <path d="M10.5 10.5l3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
//                 </svg>
//               </span>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search your history…"
//               />
//               {search && (
//                 <button className="hist-clear-btn" onClick={() => setSearch('')}>
//                   <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
//                     <path d="M3 3l8 8M11 3L3 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
//                   </svg>
//                 </button>
//               )}
//             </div>

//             <div className="hist-filters">
//               {filters.map(({ key, label }) => (
//                 <button
//                   key={key}
//                   className={`hist-filter-btn${activeFilter === key ? ' active' : ''}`}
//                   onClick={() => setFilter(key)}
//                 >
//                   {label}
//                 </button>
//               ))}
//               <span className="hist-session-count">
//                 {filtered.length} / {MOCK_HISTORY.length} sessions
//               </span>
//             </div>
//           </div>

//           {/* List or empty state */}
//           {filtered.length > 0 ? (
//             <div className="hist-gap">
//               {filtered.map((item, i) => (
//                 <HistoryItem
//                   key={item.id}
//                   item={item}
//                   index={i}
//                   isOpen={openId === item.id}
//                   onToggle={() => setOpenId(openId === item.id ? null : item.id)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="hist-empty">
//               <div className="hist-empty-icon">
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                   <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
//                   <path d="M15 15l4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <p className="hist-empty-title">No results found</p>
//               <p className="hist-empty-sub">Try adjusting your search or filter.</p>
//             </div>
//           )}

//         </main>
//       </div>
//     </>
//   )
// }


import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getSessions, deleteSession, clearHistory } from './HistoryStore'  // ← same folder

/* ─── Scoped styles ─────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

  .hist-page {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 65% 45% at 10% 0%, rgba(0,80,220,0.08) 0%, transparent 55%),
      radial-gradient(ellipse 55% 40% at 90% 100%, rgba(0,160,255,0.06) 0%, transparent 55%),
      #05090f;
    font-family: 'Inter', sans-serif;
    color: #dbeafe;
  }

  .hist-main {
    max-width: 760px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .hist-page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .hist-page-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #e2f0ff;
    letter-spacing: 0.04em;
    text-shadow: 0 0 30px rgba(0,200,255,0.2);
    margin-bottom: 4px;
  }

  .hist-page-sub {
    font-size: 0.8rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.02em;
  }

  .hist-clear-all-btn {
    padding: 5px 14px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    background: transparent;
    border: 1px solid rgba(239,68,68,0.2);
    color: rgba(248,113,113,0.6);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .hist-clear-all-btn:hover {
    color: #f87171;
    background: rgba(239,68,68,0.08);
    border-color: rgba(239,68,68,0.35);
  }

  .hist-search {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.75rem 1rem;
    background: rgba(4,14,28,0.78);
    border: 1px solid rgba(0,200,255,0.12);
    border-radius: 12px;
    backdrop-filter: blur(16px);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .hist-search:focus-within {
    border-color: rgba(0,200,255,0.35);
    box-shadow: 0 0 0 3px rgba(0,180,255,0.08);
  }
  .hist-search-icon { flex-shrink: 0; opacity: 0.4; }
  .hist-search input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    color: #e2f0ff;
  }
  .hist-search input::placeholder { color: rgba(255,255,255,0.25); }
  .hist-clear-btn {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.45;
    display: flex;
    align-items: center;
    padding: 3px;
    transition: opacity 0.2s;
  }
  .hist-clear-btn:hover { opacity: 1; }

  .hist-filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .hist-filter-btn {
    padding: 5px 14px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    transition: all 0.2s;
  }
  .hist-filter-btn:hover {
    color: rgba(255,255,255,0.8);
    border-color: rgba(255,255,255,0.18);
  }
  .hist-filter-btn.active {
    background: rgba(0,180,255,0.12);
    border-color: rgba(0,200,255,0.35);
    color: #00d4ff;
    box-shadow: 0 0 12px rgba(0,200,255,0.12);
  }
  .hist-session-count {
    margin-left: auto;
    font-family: 'Inter', monospace;
    font-size: 0.68rem;
    color: rgba(255,255,255,0.22);
    letter-spacing: 0.06em;
  }

  .hist-card {
    background: rgba(4,14,28,0.78);
    border: 1px solid rgba(0,200,255,0.12);
    border-radius: 14px;
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    animation: histCardIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .hist-card:hover {
    border-color: rgba(0,200,255,0.22);
    box-shadow: 0 8px 28px rgba(0,0,0,0.42), 0 0 0 1px rgba(0,180,255,0.07);
    transform: translateY(-1px);
  }
  .hist-card.open { border-color: rgba(0,200,255,0.28); }

  @keyframes histCardIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hist-card-header {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 1.1rem 1.25rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .hist-index {
    font-family: 'Inter', monospace;
    font-size: 0.62rem;
    color: rgba(255,255,255,0.2);
    flex-shrink: 0;
    padding-top: 3px;
    min-width: 18px;
  }
  .hist-card-body { flex: 1; min-width: 0; }
  .hist-input-preview {
    font-size: 0.88rem;
    font-weight: 500;
    color: #dbeafe;
    line-height: 1.55;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 8px;
  }
  .hist-meta-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .hist-timestamp {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.3);
  }
  .hist-claim-count { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
  .hist-verdict-dots { display: flex; align-items: center; gap: 8px; }
  .hist-verdict-dot-group { display: flex; align-items: center; gap: 4px; }
  .hist-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .hist-dot-true        { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
  .hist-dot-false       { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.5); }
  .hist-dot-partial     { background: #fbbf24; box-shadow: 0 0 6px rgba(251,191,36,0.5); }
  .hist-dot-unverifiable{ background: #64748b; }
  .hist-dot-count { font-family: 'Inter', monospace; font-size: 0.68rem; color: rgba(255,255,255,0.3); }

  .hist-ai-pill {
    font-family: 'Inter', monospace;
    font-size: 0.68rem;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 50px;
    border: 1px solid;
  }
  .hist-ai-high   { background: rgba(239,68,68,0.1);  border-color: rgba(239,68,68,0.25);  color: #f87171; }
  .hist-ai-medium { background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.25); color: #fbbf24; }
  .hist-ai-low    { background: rgba(34,197,94,0.1);  border-color: rgba(34,197,94,0.25);  color: #4ade80; }

  .hist-chevron { flex-shrink: 0; margin-top: 2px; transition: transform 0.25s ease; opacity: 0.4; }
  .hist-chevron.open { transform: rotate(180deg); opacity: 0.7; }

  .hist-expanded {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 1.1rem 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: expandIn 0.25s ease both;
  }
  @keyframes expandIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hist-section-label {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,200,255,0.5);
    margin-bottom: 6px;
  }
  .hist-input-text-box {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.65;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 0.75rem 1rem;
  }

  .hist-claim-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 0.8rem 0.9rem;
    border-radius: 10px;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    margin-bottom: 6px;
    border-left: 2.5px solid;
  }
  .hist-claim-row.verdict-true        { border-left-color: rgba(74,222,128,0.5); }
  .hist-claim-row.verdict-false       { border-left-color: rgba(248,113,113,0.5); }
  .hist-claim-row.verdict-partial     { border-left-color: rgba(251,191,36,0.5); }
  .hist-claim-row.verdict-unverifiable{ border-left-color: rgba(100,116,139,0.4); }

  .hist-claim-num {
    font-family: 'Inter', monospace;
    font-size: 0.6rem;
    color: rgba(255,255,255,0.2);
    padding-top: 3px;
    flex-shrink: 0;
  }
  .hist-claim-text { font-size: 0.82rem; color: rgba(255,255,255,0.72); line-height: 1.5; margin-bottom: 6px; }
  .hist-claim-footer { display: flex; align-items: center; gap: 10px; }

  .hist-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 9px;
    border-radius: 50px;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1px solid;
    flex-shrink: 0;
  }
  .hist-badge-true        { background: rgba(34,197,94,0.1);    border-color: rgba(34,197,94,0.3);    color: #4ade80; }
  .hist-badge-false       { background: rgba(239,68,68,0.1);    border-color: rgba(239,68,68,0.3);    color: #f87171; }
  .hist-badge-partial     { background: rgba(245,158,11,0.1);   border-color: rgba(245,158,11,0.3);   color: #fbbf24; }
  .hist-badge-unverifiable{ background: rgba(100,116,139,0.12); border-color: rgba(100,116,139,0.28); color: #94a3b8; }

  .hist-conf-wrap  { display: flex; align-items: center; gap: 6px; }
  .hist-conf-track { width: 64px; height: 4px; background: rgba(255,255,255,0.07); border-radius: 99px; overflow: hidden; }
  .hist-conf-bar   { height: 100%; border-radius: 99px; }
  .hist-conf-label { font-family: 'Inter', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.28); }

  .hist-footer-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.05);
    flex-wrap: wrap;
    gap: 8px;
  }
  .hist-date    { font-family: 'Inter', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.2); }
  .hist-actions { display: flex; align-items: center; gap: 8px; }

  .hist-btn-reanalyze {
    padding: 5px 14px;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 500;
    background: rgba(0,180,255,0.1);
    border: 1px solid rgba(0,200,255,0.25);
    color: #00d4ff;
    cursor: pointer;
    transition: all 0.2s;
  }
  .hist-btn-reanalyze:hover { background: rgba(0,180,255,0.18); border-color: rgba(0,200,255,0.45); }

  .hist-btn-delete {
    padding: 5px 12px;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 500;
    background: transparent;
    border: 1px solid transparent;
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all 0.2s;
  }
  .hist-btn-delete:hover { color: #f87171; background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); }

  .hist-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background: rgba(4,14,28,0.78);
    border: 1px solid rgba(0,200,255,0.1);
    border-radius: 14px;
    text-align: center;
    gap: 10px;
  }
  .hist-empty-icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }
  .hist-empty-title { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.55); }
  .hist-empty-sub   { font-size: 0.75rem; color: rgba(255,255,255,0.24); }
  .hist-empty-cta {
    margin-top: 8px;
    padding: 7px 20px;
    border-radius: 50px;
    font-size: 0.78rem;
    font-weight: 600;
    background: rgba(0,180,255,0.1);
    border: 1px solid rgba(0,200,255,0.25);
    color: #00d4ff;
    cursor: pointer;
    transition: all 0.2s;
  }
  .hist-empty-cta:hover { background: rgba(0,180,255,0.18); }

  .hist-gap    { display: flex; flex-direction: column; gap: 0.75rem; }
  .hist-gap-sm { display: flex; flex-direction: column; gap: 0.5rem; }
`

/* ─── Helpers ───────────────────────────────────────────────────── */
function relativeTime(isoStr) {
  const diff  = Date.now() - new Date(isoStr).getTime()
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

function verdictCounts(claims) {
  const counts = {}
  claims.forEach((c) => { counts[c.verdict] = (counts[c.verdict] || 0) + 1 })
  return counts
}

const VERDICT_ORDER = ['true', 'false', 'partial', 'unverifiable']
const CONF_COLORS   = { true: '#4ade80', false: '#f87171', partial: '#fbbf24', unverifiable: '#64748b' }
const BADGE_LABELS  = { true: 'True', false: 'False', partial: 'Partial', unverifiable: 'Unverifiable' }

/* ─── HistoryItem ───────────────────────────────────────────────── */
function HistoryItem({ item, index, isOpen, onToggle, onDelete }) {
  const navigate = useNavigate()
  const counts   = verdictCounts(item.claims)
  const aiLevel  = item.aiProbability >= 70 ? 'high' : item.aiProbability >= 40 ? 'medium' : 'low'

  return (
    <div className={`hist-card${isOpen ? ' open' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
      <button className="hist-card-header" onClick={onToggle}>
        <span className="hist-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="hist-card-body">
          <p className="hist-input-preview">{item.inputText}</p>
          <div className="hist-meta-row">
            <span className="hist-timestamp">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
                <path d="M6 3.5v2.5l1.5 1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {relativeTime(item.timestamp)}
            </span>
            <span className="hist-claim-count">
              {item.claims.length} claim{item.claims.length !== 1 ? 's' : ''}
            </span>
            <span className="hist-verdict-dots">
              {VERDICT_ORDER.filter(v => counts[v]).map(v => (
                <span key={v} className="hist-verdict-dot-group">
                  <span className={`hist-dot hist-dot-${v}`} />
                  <span className="hist-dot-count">{counts[v]}</span>
                </span>
              ))}
            </span>
            <span className={`hist-ai-pill hist-ai-${aiLevel}`}>AI {item.aiProbability}%</span>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`hist-chevron${isOpen ? ' open' : ''}`}>
          <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="hist-expanded">
          <div>
            <p className="hist-section-label">Input Text</p>
            <p className="hist-input-text-box">{item.inputText}</p>
          </div>
          <div>
            <p className="hist-section-label">Claims Verified</p>
            <div className="hist-gap-sm">
              {item.claims.map((claim, i) => (
                <div key={i} className={`hist-claim-row verdict-${claim.verdict}`}>
                  <span className="hist-claim-num">{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="hist-claim-text">{claim.text}</p>
                    <div className="hist-claim-footer">
                      <span className={`hist-badge hist-badge-${claim.verdict}`}>
                        {BADGE_LABELS[claim.verdict] ?? claim.verdict}
                      </span>
                      <span className="hist-conf-wrap">
                        <span className="hist-conf-track">
                          <span className="hist-conf-bar" style={{
                            width: `${claim.confidence}%`,
                            background: CONF_COLORS[claim.verdict] ?? '#64748b',
                          }}/>
                        </span>
                        <span className="hist-conf-label">{claim.confidence}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hist-footer-row">
            <span className="hist-date">{formatDate(item.timestamp)}</span>
            <div className="hist-actions">
              <button className="hist-btn-reanalyze" onClick={() => navigate('/dashboard')}>
                Re-analyze →
              </button>
              <button className="hist-btn-delete"
                onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Main History page ─────────────────────────────────────────── */
export default function History() {
  const navigate = useNavigate()

  const [sessions, setSessions]       = useState(() => getSessions())
  const [openId, setOpenId]           = useState(null)
  const [search, setSearch]           = useState('')
  const [activeFilter, setFilter]     = useState('all')

  useEffect(() => { setSessions(getSessions()) }, [])

  const filters = [
    { key: 'all',          label: 'All' },
    { key: 'true',         label: 'True' },
    { key: 'false',        label: 'False' },
    { key: 'partial',      label: 'Partial' },
    { key: 'unverifiable', label: 'Unverifiable' },
  ]

  const filtered = useMemo(() => sessions.filter((item) => {
    const matchSearch = search === '' || item.inputText.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === 'all' || item.claims.some((c) => c.verdict === activeFilter)
    return matchSearch && matchFilter
  }), [sessions, search, activeFilter])

  const handleDelete = (id) => {
    deleteSession(id)
    setSessions(getSessions())
    if (openId === id) setOpenId(null)
  }

  const handleClearAll = () => {
    if (window.confirm('Clear all history? This cannot be undone.')) {
      clearHistory()
      setSessions([])
      setOpenId(null)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="hist-page">
        <Navbar />
        <main className="hist-main">

          <div className="hist-page-header">
            <div>
              <h1 className="hist-page-title">Analysis History</h1>
              <p className="hist-page-sub">
                {sessions.length === 0
                  ? 'No sessions yet — verify a claim to get started.'
                  : `${sessions.length} session${sessions.length !== 1 ? 's' : ''} recorded`}
              </p>
            </div>
            {sessions.length > 0 && (
              <button className="hist-clear-all-btn" onClick={handleClearAll}>Clear all</button>
            )}
          </div>

          {sessions.length > 0 && (
            <div className="hist-gap-sm">
              <div className="hist-search">
                <span className="hist-search-icon">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3"/>
                    <path d="M10.5 10.5l3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </span>
                <input type="text" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your history…" />
                {search && (
                  <button className="hist-clear-btn" onClick={() => setSearch('')}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M3 3l8 8M11 3L3 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className="hist-filters">
                {filters.map(({ key, label }) => (
                  <button key={key}
                    className={`hist-filter-btn${activeFilter === key ? ' active' : ''}`}
                    onClick={() => setFilter(key)}>
                    {label}
                  </button>
                ))}
                <span className="hist-session-count">{filtered.length} / {sessions.length} sessions</span>
              </div>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="hist-gap">
              {filtered.map((item, i) => (
                <HistoryItem key={item.id} item={item} index={i}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                  onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="hist-empty">
              <div className="hist-empty-icon">
                {sessions.length === 0 ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="9" stroke="rgba(0,200,255,0.35)" strokeWidth="1.5"/>
                    <path d="M11 7v4.5l3 1.8" stroke="rgba(0,200,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <path d="M15 15l4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <p className="hist-empty-title">
                {sessions.length === 0 ? 'No history yet' : 'No results found'}
              </p>
              <p className="hist-empty-sub">
                {sessions.length === 0
                  ? 'Your verified claims will appear here automatically.'
                  : 'Try adjusting your search or filter.'}
              </p>
              {sessions.length === 0 && (
                <button className="hist-empty-cta" onClick={() => navigate('/dashboard')}>
                  Start verifying →
                </button>
              )}
            </div>
          )}

        </main>
      </div>
    </>
  )
}