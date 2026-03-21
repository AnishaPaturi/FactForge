

// import { useState, useMemo, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import { getSessions, deleteSession, clearHistory } from './HistoryStore'  // ← same folder

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

//   .hist-page-header {
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

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

//   .hist-clear-all-btn {
//     padding: 5px 14px;
//     border-radius: 8px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: transparent;
//     border: 1px solid rgba(239,68,68,0.2);
//     color: rgba(248,113,113,0.6);
//     cursor: pointer;
//     transition: all 0.2s;
//     white-space: nowrap;
//   }
//   .hist-clear-all-btn:hover {
//     color: #f87171;
//     background: rgba(239,68,68,0.08);
//     border-color: rgba(239,68,68,0.35);
//   }

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
//   .hist-card.open { border-color: rgba(0,200,255,0.28); }

//   @keyframes histCardIn {
//     from { opacity: 0; transform: translateY(12px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

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
//     font-size: 0.72rem;
//     color: rgba(255,255,255,0.3);
//   }
//   .hist-claim-count { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
//   .hist-verdict-dots { display: flex; align-items: center; gap: 8px; }
//   .hist-verdict-dot-group { display: flex; align-items: center; gap: 4px; }
//   .hist-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
//   .hist-dot-true        { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
//   .hist-dot-false       { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.5); }
//   .hist-dot-partial     { background: #fbbf24; box-shadow: 0 0 6px rgba(251,191,36,0.5); }
//   .hist-dot-unverifiable{ background: #64748b; }
//   .hist-dot-count { font-family: 'Inter', monospace; font-size: 0.68rem; color: rgba(255,255,255,0.3); }

//   .hist-ai-pill {
//     font-family: 'Inter', monospace;
//     font-size: 0.68rem;
//     font-weight: 500;
//     padding: 2px 8px;
//     border-radius: 50px;
//     border: 1px solid;
//   }
//   .hist-ai-high   { background: rgba(239,68,68,0.1);  border-color: rgba(239,68,68,0.25);  color: #f87171; }
//   .hist-ai-medium { background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.25); color: #fbbf24; }
//   .hist-ai-low    { background: rgba(34,197,94,0.1);  border-color: rgba(34,197,94,0.25);  color: #4ade80; }

//   .hist-chevron { flex-shrink: 0; margin-top: 2px; transition: transform 0.25s ease; opacity: 0.4; }
//   .hist-chevron.open { transform: rotate(180deg); opacity: 0.7; }

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
//     font-size: 0.62rem;
//     font-weight: 600;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     color: rgba(0,200,255,0.5);
//     margin-bottom: 6px;
//   }
//   .hist-input-text-box {
//     font-size: 0.82rem;
//     color: rgba(255,255,255,0.6);
//     line-height: 1.65;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.06);
//     border-radius: 10px;
//     padding: 0.75rem 1rem;
//   }

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
//   .hist-claim-text { font-size: 0.82rem; color: rgba(255,255,255,0.72); line-height: 1.5; margin-bottom: 6px; }
//   .hist-claim-footer { display: flex; align-items: center; gap: 10px; }

//   .hist-badge {
//     display: inline-flex;
//     align-items: center;
//     padding: 2px 9px;
//     border-radius: 50px;
//     font-size: 0.65rem;
//     font-weight: 600;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     border: 1px solid;
//     flex-shrink: 0;
//   }
//   .hist-badge-true        { background: rgba(34,197,94,0.1);    border-color: rgba(34,197,94,0.3);    color: #4ade80; }
//   .hist-badge-false       { background: rgba(239,68,68,0.1);    border-color: rgba(239,68,68,0.3);    color: #f87171; }
//   .hist-badge-partial     { background: rgba(245,158,11,0.1);   border-color: rgba(245,158,11,0.3);   color: #fbbf24; }
//   .hist-badge-unverifiable{ background: rgba(100,116,139,0.12); border-color: rgba(100,116,139,0.28); color: #94a3b8; }

//   .hist-conf-wrap  { display: flex; align-items: center; gap: 6px; }
//   .hist-conf-track { width: 64px; height: 4px; background: rgba(255,255,255,0.07); border-radius: 99px; overflow: hidden; }
//   .hist-conf-bar   { height: 100%; border-radius: 99px; }
//   .hist-conf-label { font-family: 'Inter', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.28); }

//   .hist-footer-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.05);
//     flex-wrap: wrap;
//     gap: 8px;
//   }
//   .hist-date    { font-family: 'Inter', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.2); }
//   .hist-actions { display: flex; align-items: center; gap: 8px; }

//   .hist-btn-reanalyze {
//     padding: 5px 14px;
//     border-radius: 8px;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: rgba(0,180,255,0.1);
//     border: 1px solid rgba(0,200,255,0.25);
//     color: #00d4ff;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-btn-reanalyze:hover { background: rgba(0,180,255,0.18); border-color: rgba(0,200,255,0.45); }

//   .hist-btn-delete {
//     padding: 5px 12px;
//     border-radius: 8px;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: transparent;
//     border: 1px solid transparent;
//     color: rgba(255,255,255,0.3);
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-btn-delete:hover { color: #f87171; background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); }

//   .hist-empty {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 4rem 2rem;
//     background: rgba(4,14,28,0.78);
//     border: 1px solid rgba(0,200,255,0.1);
//     border-radius: 14px;
//     text-align: center;
//     gap: 10px;
//   }
//   .hist-empty-icon {
//     width: 52px; height: 52px;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.07);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 6px;
//   }
//   .hist-empty-title { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.55); }
//   .hist-empty-sub   { font-size: 0.75rem; color: rgba(255,255,255,0.24); }
//   .hist-empty-cta {
//     margin-top: 8px;
//     padding: 7px 20px;
//     border-radius: 50px;
//     font-size: 0.78rem;
//     font-weight: 600;
//     background: rgba(0,180,255,0.1);
//     border: 1px solid rgba(0,200,255,0.25);
//     color: #00d4ff;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-empty-cta:hover { background: rgba(0,180,255,0.18); }

//   .hist-gap    { display: flex; flex-direction: column; gap: 0.75rem; }
//   .hist-gap-sm { display: flex; flex-direction: column; gap: 0.5rem; }
// `

// /* ─── Helpers ───────────────────────────────────────────────────── */
// function relativeTime(isoStr) {
//   const diff  = Date.now() - new Date(isoStr).getTime()
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
// const CONF_COLORS   = { true: '#4ade80', false: '#f87171', partial: '#fbbf24', unverifiable: '#64748b' }
// const BADGE_LABELS  = { true: 'True', false: 'False', partial: 'Partial', unverifiable: 'Unverifiable' }

// /* ─── HistoryItem ───────────────────────────────────────────────── */
// function HistoryItem({ item, index, isOpen, onToggle, onDelete }) {
//   const navigate = useNavigate()
//   const counts   = verdictCounts(item.claims)
//   const aiLevel  = item.aiProbability >= 70 ? 'high' : item.aiProbability >= 40 ? 'medium' : 'low'

//   return (
//     <div className={`hist-card${isOpen ? ' open' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
//       <button className="hist-card-header" onClick={onToggle}>
//         <span className="hist-index">{String(index + 1).padStart(2, '0')}</span>
//         <div className="hist-card-body">
//           <p className="hist-input-preview">{item.inputText}</p>
//           <div className="hist-meta-row">
//             <span className="hist-timestamp">
//               <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
//                 <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
//                 <path d="M6 3.5v2.5l1.5 1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
//               </svg>
//               {relativeTime(item.timestamp)}
//             </span>
//             <span className="hist-claim-count">
//               {item.claims.length} claim{item.claims.length !== 1 ? 's' : ''}
//             </span>
//             <span className="hist-verdict-dots">
//               {VERDICT_ORDER.filter(v => counts[v]).map(v => (
//                 <span key={v} className="hist-verdict-dot-group">
//                   <span className={`hist-dot hist-dot-${v}`} />
//                   <span className="hist-dot-count">{counts[v]}</span>
//                 </span>
//               ))}
//             </span>
//             <span className={`hist-ai-pill hist-ai-${aiLevel}`}>AI {item.aiProbability}%</span>
//           </div>
//         </div>
//         <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//           className={`hist-chevron${isOpen ? ' open' : ''}`}>
//           <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="hist-expanded">
//           <div>
//             <p className="hist-section-label">Input Text</p>
//             <p className="hist-input-text-box">{item.inputText}</p>
//           </div>
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
//                         {BADGE_LABELS[claim.verdict] ?? claim.verdict}
//                       </span>
//                       <span className="hist-conf-wrap">
//                         <span className="hist-conf-track">
//                           <span className="hist-conf-bar" style={{
//                             width: `${claim.confidence}%`,
//                             background: CONF_COLORS[claim.verdict] ?? '#64748b',
//                           }}/>
//                         </span>
//                         <span className="hist-conf-label">{claim.confidence}%</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="hist-footer-row">
//             <span className="hist-date">{formatDate(item.timestamp)}</span>
//             <div className="hist-actions">
//               <button className="hist-btn-reanalyze" onClick={() => navigate('/dashboard')}>
//                 Re-analyze →
//               </button>
//               <button className="hist-btn-delete"
//                 onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─── Main History page ─────────────────────────────────────────── */
// export default function History() {
//   const navigate = useNavigate()

//   const [sessions, setSessions]       = useState(() => getSessions())
//   const [openId, setOpenId]           = useState(null)
//   const [search, setSearch]           = useState('')
//   const [activeFilter, setFilter]     = useState('all')

//   useEffect(() => { setSessions(getSessions()) }, [])

//   const filters = [
//     { key: 'all',          label: 'All' },
//     { key: 'true',         label: 'True' },
//     { key: 'false',        label: 'False' },
//     { key: 'partial',      label: 'Partial' },
//     { key: 'unverifiable', label: 'Unverifiable' },
//   ]

//   const filtered = useMemo(() => sessions.filter((item) => {
//     const matchSearch = search === '' || item.inputText.toLowerCase().includes(search.toLowerCase())
//     const matchFilter = activeFilter === 'all' || item.claims.some((c) => c.verdict === activeFilter)
//     return matchSearch && matchFilter
//   }), [sessions, search, activeFilter])

//   const handleDelete = (id) => {
//     deleteSession(id)
//     setSessions(getSessions())
//     if (openId === id) setOpenId(null)
//   }

//   const handleClearAll = () => {
//     if (window.confirm('Clear all history? This cannot be undone.')) {
//       clearHistory()
//       setSessions([])
//       setOpenId(null)
//     }
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="hist-page">
//         <Navbar />
//         <main className="hist-main">

//           <div className="hist-page-header">
//             <div>
//               <h1 className="hist-page-title">Analysis History</h1>
//               <p className="hist-page-sub">
//                 {sessions.length === 0
//                   ? 'No sessions yet — verify a claim to get started.'
//                   : `${sessions.length} session${sessions.length !== 1 ? 's' : ''} recorded`}
//               </p>
//             </div>
//             {sessions.length > 0 && (
//               <button className="hist-clear-all-btn" onClick={handleClearAll}>Clear all</button>
//             )}
//           </div>

//           {sessions.length > 0 && (
//             <div className="hist-gap-sm">
//               <div className="hist-search">
//                 <span className="hist-search-icon">
//                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
//                     <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3"/>
//                     <path d="M10.5 10.5l3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
//                   </svg>
//                 </span>
//                 <input type="text" value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search your history…" />
//                 {search && (
//                   <button className="hist-clear-btn" onClick={() => setSearch('')}>
//                     <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
//                       <path d="M3 3l8 8M11 3L3 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
//                     </svg>
//                   </button>
//                 )}
//               </div>
//               <div className="hist-filters">
//                 {filters.map(({ key, label }) => (
//                   <button key={key}
//                     className={`hist-filter-btn${activeFilter === key ? ' active' : ''}`}
//                     onClick={() => setFilter(key)}>
//                     {label}
//                   </button>
//                 ))}
//                 <span className="hist-session-count">{filtered.length} / {sessions.length} sessions</span>
//               </div>
//             </div>
//           )}

//           {filtered.length > 0 ? (
//             <div className="hist-gap">
//               {filtered.map((item, i) => (
//                 <HistoryItem key={item.id} item={item} index={i}
//                   isOpen={openId === item.id}
//                   onToggle={() => setOpenId(openId === item.id ? null : item.id)}
//                   onDelete={handleDelete} />
//               ))}
//             </div>
//           ) : (
//             <div className="hist-empty">
//               <div className="hist-empty-icon">
//                 {sessions.length === 0 ? (
//                   <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
//                     <circle cx="11" cy="11" r="9" stroke="rgba(0,200,255,0.35)" strokeWidth="1.5"/>
//                     <path d="M11 7v4.5l3 1.8" stroke="rgba(0,200,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
//                   </svg>
//                 ) : (
//                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                     <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
//                     <path d="M15 15l4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
//                   </svg>
//                 )}
//               </div>
//               <p className="hist-empty-title">
//                 {sessions.length === 0 ? 'No history yet' : 'No results found'}
//               </p>
//               <p className="hist-empty-sub">
//                 {sessions.length === 0
//                   ? 'Your verified claims will appear here automatically.'
//                   : 'Try adjusting your search or filter.'}
//               </p>
//               {sessions.length === 0 && (
//                 <button className="hist-empty-cta" onClick={() => navigate('/dashboard')}>
//                   Start verifying →
//                 </button>
//               )}
//             </div>
//           )}

//         </main>
//       </div>
//     </>
//   )
// }



// import { useState, useMemo, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
// import { getSessions, deleteSession, clearHistory } from './historyStore'  // ← same folder

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

//   .hist-page-header {
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

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

//   .hist-clear-all-btn {
//     padding: 5px 14px;
//     border-radius: 8px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: transparent;
//     border: 1px solid rgba(239,68,68,0.2);
//     color: rgba(248,113,113,0.6);
//     cursor: pointer;
//     transition: all 0.2s;
//     white-space: nowrap;
//   }
//   .hist-clear-all-btn:hover {
//     color: #f87171;
//     background: rgba(239,68,68,0.08);
//     border-color: rgba(239,68,68,0.35);
//   }

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
//   .hist-card.open { border-color: rgba(0,200,255,0.28); }

//   @keyframes histCardIn {
//     from { opacity: 0; transform: translateY(12px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

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
//     font-size: 0.72rem;
//     color: rgba(255,255,255,0.3);
//   }
//   .hist-claim-count { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
//   .hist-verdict-dots { display: flex; align-items: center; gap: 8px; }
//   .hist-verdict-dot-group { display: flex; align-items: center; gap: 4px; }
//   .hist-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
//   .hist-dot-true        { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
//   .hist-dot-false       { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.5); }
//   .hist-dot-partial     { background: #fbbf24; box-shadow: 0 0 6px rgba(251,191,36,0.5); }
//   .hist-dot-unverifiable{ background: #64748b; }
//   .hist-dot-count { font-family: 'Inter', monospace; font-size: 0.68rem; color: rgba(255,255,255,0.3); }

//   .hist-ai-pill {
//     font-family: 'Inter', monospace;
//     font-size: 0.68rem;
//     font-weight: 500;
//     padding: 2px 8px;
//     border-radius: 50px;
//     border: 1px solid;
//   }
//   .hist-ai-high   { background: rgba(239,68,68,0.1);  border-color: rgba(239,68,68,0.25);  color: #f87171; }
//   .hist-ai-medium { background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.25); color: #fbbf24; }
//   .hist-ai-low    { background: rgba(34,197,94,0.1);  border-color: rgba(34,197,94,0.25);  color: #4ade80; }

//   .hist-chevron { flex-shrink: 0; margin-top: 2px; transition: transform 0.25s ease; opacity: 0.4; }
//   .hist-chevron.open { transform: rotate(180deg); opacity: 0.7; }

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
//     font-size: 0.62rem;
//     font-weight: 600;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     color: rgba(0,200,255,0.5);
//     margin-bottom: 6px;
//   }
//   .hist-input-text-box {
//     font-size: 0.82rem;
//     color: rgba(255,255,255,0.6);
//     line-height: 1.65;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.06);
//     border-radius: 10px;
//     padding: 0.75rem 1rem;
//   }

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
//   .hist-claim-text { font-size: 0.82rem; color: rgba(255,255,255,0.72); line-height: 1.5; margin-bottom: 6px; }
//   .hist-claim-footer { display: flex; align-items: center; gap: 10px; }

//   .hist-badge {
//     display: inline-flex;
//     align-items: center;
//     padding: 2px 9px;
//     border-radius: 50px;
//     font-size: 0.65rem;
//     font-weight: 600;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     border: 1px solid;
//     flex-shrink: 0;
//   }
//   .hist-badge-true        { background: rgba(34,197,94,0.1);    border-color: rgba(34,197,94,0.3);    color: #4ade80; }
//   .hist-badge-false       { background: rgba(239,68,68,0.1);    border-color: rgba(239,68,68,0.3);    color: #f87171; }
//   .hist-badge-partial     { background: rgba(245,158,11,0.1);   border-color: rgba(245,158,11,0.3);   color: #fbbf24; }
//   .hist-badge-unverifiable{ background: rgba(100,116,139,0.12); border-color: rgba(100,116,139,0.28); color: #94a3b8; }

//   .hist-conf-wrap  { display: flex; align-items: center; gap: 6px; }
//   .hist-conf-track { width: 64px; height: 4px; background: rgba(255,255,255,0.07); border-radius: 99px; overflow: hidden; }
//   .hist-conf-bar   { height: 100%; border-radius: 99px; }
//   .hist-conf-label { font-family: 'Inter', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.28); }

//   .hist-footer-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.05);
//     flex-wrap: wrap;
//     gap: 8px;
//   }
//   .hist-date    { font-family: 'Inter', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.2); }
//   .hist-actions { display: flex; align-items: center; gap: 8px; }

//   .hist-btn-reanalyze {
//     padding: 5px 14px;
//     border-radius: 8px;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: rgba(0,180,255,0.1);
//     border: 1px solid rgba(0,200,255,0.25);
//     color: #00d4ff;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-btn-reanalyze:hover { background: rgba(0,180,255,0.18); border-color: rgba(0,200,255,0.45); }

//   .hist-btn-delete {
//     padding: 5px 12px;
//     border-radius: 8px;
//     font-size: 0.72rem;
//     font-weight: 500;
//     background: transparent;
//     border: 1px solid transparent;
//     color: rgba(255,255,255,0.3);
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-btn-delete:hover { color: #f87171; background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); }

//   .hist-empty {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 4rem 2rem;
//     background: rgba(4,14,28,0.78);
//     border: 1px solid rgba(0,200,255,0.1);
//     border-radius: 14px;
//     text-align: center;
//     gap: 10px;
//   }
//   .hist-empty-icon {
//     width: 52px; height: 52px;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.03);
//     border: 1px solid rgba(255,255,255,0.07);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 6px;
//   }
//   .hist-empty-title { font-size: 0.9rem; font-weight: 600; color: rgba(255,255,255,0.55); }
//   .hist-empty-sub   { font-size: 0.75rem; color: rgba(255,255,255,0.24); }
//   .hist-empty-cta {
//     margin-top: 8px;
//     padding: 7px 20px;
//     border-radius: 50px;
//     font-size: 0.78rem;
//     font-weight: 600;
//     background: rgba(0,180,255,0.1);
//     border: 1px solid rgba(0,200,255,0.25);
//     color: #00d4ff;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .hist-empty-cta:hover { background: rgba(0,180,255,0.18); }

//   .hist-gap    { display: flex; flex-direction: column; gap: 0.75rem; }
//   .hist-gap-sm { display: flex; flex-direction: column; gap: 0.5rem; }
// `

// /* ─── Helpers ───────────────────────────────────────────────────── */
// function relativeTime(isoStr) {
//   const diff  = Date.now() - new Date(isoStr).getTime()
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
// const CONF_COLORS   = { true: '#4ade80', false: '#f87171', partial: '#fbbf24', unverifiable: '#64748b' }
// const BADGE_LABELS  = { true: 'True', false: 'False', partial: 'Partial', unverifiable: 'Unverifiable' }

// /* ─── HistoryItem ───────────────────────────────────────────────── */
// function HistoryItem({ item, index, isOpen, onToggle, onDelete }) {
//   const navigate = useNavigate()
//   const counts   = verdictCounts(item.claims)
//   const aiLevel  = item.aiProbability >= 70 ? 'high' : item.aiProbability >= 40 ? 'medium' : 'low'

//   return (
//     <div className={`hist-card${isOpen ? ' open' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
//       <button className="hist-card-header" onClick={onToggle}>
//         <span className="hist-index">{String(index + 1).padStart(2, '0')}</span>
//         <div className="hist-card-body">
//           <p className="hist-input-preview">{item.inputText}</p>
//           <div className="hist-meta-row">
//             <span className="hist-timestamp">
//               <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
//                 <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
//                 <path d="M6 3.5v2.5l1.5 1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
//               </svg>
//               {relativeTime(item.timestamp)}
//             </span>
//             <span className="hist-claim-count">
//               {item.claims.length} claim{item.claims.length !== 1 ? 's' : ''}
//             </span>
//             <span className="hist-verdict-dots">
//               {VERDICT_ORDER.filter(v => counts[v]).map(v => (
//                 <span key={v} className="hist-verdict-dot-group">
//                   <span className={`hist-dot hist-dot-${v}`} />
//                   <span className="hist-dot-count">{counts[v]}</span>
//                 </span>
//               ))}
//             </span>
//             <span className={`hist-ai-pill hist-ai-${aiLevel}`}>AI {item.aiProbability}%</span>
//           </div>
//         </div>
//         <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
//           className={`hist-chevron${isOpen ? ' open' : ''}`}>
//           <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </button>

//       {isOpen && (
//         <div className="hist-expanded">
//           <div>
//             <p className="hist-section-label">Input Text</p>
//             <p className="hist-input-text-box">{item.inputText}</p>
//           </div>
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
//                         {BADGE_LABELS[claim.verdict] ?? claim.verdict}
//                       </span>
//                       <span className="hist-conf-wrap">
//                         <span className="hist-conf-track">
//                           <span className="hist-conf-bar" style={{
//                             width: `${claim.confidence}%`,
//                             background: CONF_COLORS[claim.verdict] ?? '#64748b',
//                           }}/>
//                         </span>
//                         <span className="hist-conf-label">{claim.confidence}%</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="hist-footer-row">
//             <span className="hist-date">{formatDate(item.timestamp)}</span>
//             <div className="hist-actions">
//               <button className="hist-btn-reanalyze" onClick={() => navigate('/dashboard', { state: { reanalyze: item.inputText } })}>
//                 Re-analyze →
//               </button>
//               <button className="hist-btn-delete"
//                 onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─── Main History page ─────────────────────────────────────────── */
// export default function History() {
//   const navigate = useNavigate()

//   const [sessions, setSessions]       = useState(() => getSessions())
//   const [openId, setOpenId]           = useState(null)
//   const [search, setSearch]           = useState('')
//   const [activeFilter, setFilter]     = useState('all')

//   useEffect(() => { setSessions(getSessions()) }, [])

//   const filters = [
//     { key: 'all',          label: 'All' },
//     { key: 'true',         label: 'True' },
//     { key: 'false',        label: 'False' },
//     { key: 'partial',      label: 'Partial' },
//     { key: 'unverifiable', label: 'Unverifiable' },
//   ]

//   const filtered = useMemo(() => sessions.filter((item) => {
//     const matchSearch = search === '' || item.inputText.toLowerCase().includes(search.toLowerCase())
//     const matchFilter = activeFilter === 'all' || item.claims.some((c) => c.verdict === activeFilter)
//     return matchSearch && matchFilter
//   }), [sessions, search, activeFilter])

//   const handleDelete = (id) => {
//     deleteSession(id)
//     setSessions(getSessions())
//     if (openId === id) setOpenId(null)
//   }

//   const handleClearAll = () => {
//     if (window.confirm('Clear all history? This cannot be undone.')) {
//       clearHistory()
//       setSessions([])
//       setOpenId(null)
//     }
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="hist-page">
//         <Navbar />
//         <main className="hist-main">

//           <div className="hist-page-header">
//             <div>
//               <h1 className="hist-page-title">Analysis History</h1>
//               <p className="hist-page-sub">
//                 {sessions.length === 0
//                   ? 'No sessions yet — verify a claim to get started.'
//                   : `${sessions.length} session${sessions.length !== 1 ? 's' : ''} recorded`}
//               </p>
//             </div>
//             {sessions.length > 0 && (
//               <button className="hist-clear-all-btn" onClick={handleClearAll}>Clear all</button>
//             )}
//           </div>

//           {sessions.length > 0 && (
//             <div className="hist-gap-sm">
//               <div className="hist-search">
//                 <span className="hist-search-icon">
//                   <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
//                     <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3"/>
//                     <path d="M10.5 10.5l3 3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round"/>
//                   </svg>
//                 </span>
//                 <input type="text" value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search your history…" />
//                 {search && (
//                   <button className="hist-clear-btn" onClick={() => setSearch('')}>
//                     <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
//                       <path d="M3 3l8 8M11 3L3 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
//                     </svg>
//                   </button>
//                 )}
//               </div>
//               <div className="hist-filters">
//                 {filters.map(({ key, label }) => (
//                   <button key={key}
//                     className={`hist-filter-btn${activeFilter === key ? ' active' : ''}`}
//                     onClick={() => setFilter(key)}>
//                     {label}
//                   </button>
//                 ))}
//                 <span className="hist-session-count">{filtered.length} / {sessions.length} sessions</span>
//               </div>
//             </div>
//           )}

//           {filtered.length > 0 ? (
//             <div className="hist-gap">
//               {filtered.map((item, i) => (
//                 <HistoryItem key={item.id} item={item} index={i}
//                   isOpen={openId === item.id}
//                   onToggle={() => setOpenId(openId === item.id ? null : item.id)}
//                   onDelete={handleDelete} />
//               ))}
//             </div>
//           ) : (
//             <div className="hist-empty">
//               <div className="hist-empty-icon">
//                 {sessions.length === 0 ? (
//                   <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
//                     <circle cx="11" cy="11" r="9" stroke="rgba(0,200,255,0.35)" strokeWidth="1.5"/>
//                     <path d="M11 7v4.5l3 1.8" stroke="rgba(0,200,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
//                   </svg>
//                 ) : (
//                   <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//                     <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
//                     <path d="M15 15l4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
//                   </svg>
//                 )}
//               </div>
//               <p className="hist-empty-title">
//                 {sessions.length === 0 ? 'No history yet' : 'No results found'}
//               </p>
//               <p className="hist-empty-sub">
//                 {sessions.length === 0
//                   ? 'Your verified claims will appear here automatically.'
//                   : 'Try adjusting your search or filter.'}
//               </p>
//               {sessions.length === 0 && (
//                 <button className="hist-empty-cta" onClick={() => navigate('/dashboard')}>
//                   Start verifying →
//                 </button>
//               )}
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
import { getSessions, deleteSession, clearHistory } from './historyStore'  // ← same folder

/* ─── Scoped styles ─────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

  .hist-page {
    min-height: 100vh;
    background: #05090f;
    font-family: 'Inter', sans-serif;
    color: #dbeafe;
    position: relative;
  }

  /* Fixed background sits behind everything */
  .hist-bg {
    position: fixed;
    inset: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  /* All content above background */
  .hist-above {
    position: relative;
    z-index: 1;
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
              <button className="hist-btn-reanalyze" onClick={() => navigate('/dashboard', { state: { reanalyze: item.inputText } })}>
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

/* ─── History Background — concentric rings + scan line ─────────── */
function HistoryBg() {
  return (
    <svg className="hist-bg" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Base dark */}
        <radialGradient id="hbBase" cx="50%" cy="50%" r="75%">
          <stop offset="0%"   stopColor="#070e1d" stopOpacity="1"/>
          <stop offset="100%" stopColor="#05090f" stopOpacity="1"/>
        </radialGradient>

        {/* Centre radial bloom */}
        <radialGradient id="hbBloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0044bb" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#0044bb" stopOpacity="0"/>
        </radialGradient>

        {/* Top-left accent */}
        <radialGradient id="hbTL" cx="0%" cy="0%" r="60%">
          <stop offset="0%"   stopColor="#003399" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#003399" stopOpacity="0"/>
        </radialGradient>

        {/* Bottom-right accent */}
        <radialGradient id="hbBR" cx="100%" cy="100%" r="55%">
          <stop offset="0%"   stopColor="#330066" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#330066" stopOpacity="0"/>
        </radialGradient>

        {/* Scan line gradient */}
        <linearGradient id="hbScan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0"/>
          <stop offset="45%"  stopColor="#00d4ff" stopOpacity="0.06"/>
          <stop offset="50%"  stopColor="#00d4ff" stopOpacity="0.12"/>
          <stop offset="55%"  stopColor="#00d4ff" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Base */}
      <rect width="100" height="100" fill="url(#hbBase)"/>
      <rect width="100" height="100" fill="url(#hbBloom)"/>
      <rect width="100" height="100" fill="url(#hbTL)"/>
      <rect width="100" height="100" fill="url(#hbBR)"/>

      {/* ── Concentric rings centred mid-right ── */}
      {[42, 34, 26, 18, 11].map((r, i) => (
        <circle
          key={i}
          cx="72" cy="38" r={r}
          fill="none"
          stroke="rgba(0,180,255,0.055)"
          strokeWidth="0.3"
        >
          <animate
            attributeName="r"
            values={`${r};${r + 1.5};${r}`}
            dur={`${8 + i * 1.5}s`}
            repeatCount="indefinite"
            begin={`${i * 0.8}s`}
          />
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur={`${7 + i}s`}
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          />
        </circle>
      ))}

      {/* ── Second ring cluster — bottom-left ── */}
      {[28, 20, 13].map((r, i) => (
        <circle
          key={`bl-${i}`}
          cx="22" cy="72" r={r}
          fill="none"
          stroke="rgba(100,80,255,0.045)"
          strokeWidth="0.25"
        >
          <animate
            attributeName="r"
            values={`${r};${r + 1.2};${r}`}
            dur={`${10 + i * 2}s`}
            repeatCount="indefinite"
            begin={`${i * 1.2}s`}
          />
        </circle>
      ))}

      {/* ── Horizontal scan line sweeping top→bottom ── */}
      <rect x="0" y="-8" width="100" height="16" fill="url(#hbScan)">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 -10"
          to="0 115"
          dur="7s"
          repeatCount="indefinite"
        />
      </rect>

      {/* ── Fine dot grid ── */}
      {Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => (
          <circle
            key={`g-${row}-${col}`}
            cx={col * 9 + 4}
            cy={row * 14 + 8}
            r="0.22"
            fill="rgba(0,160,255,0.1)"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.28;0.1"
              dur={`${6 + ((row + col) % 5)}s`}
              repeatCount="indefinite"
              begin={`${((row * 3 + col) * 0.3) % 4}s`}
            />
          </circle>
        ))
      )}

      {/* ── Corner accent lines ── */}
      <line x1="0" y1="0" x2="18" y2="0"  stroke="rgba(0,200,255,0.12)" strokeWidth="0.3"/>
      <line x1="0" y1="0" x2="0"  y2="12" stroke="rgba(0,200,255,0.12)" strokeWidth="0.3"/>
      <line x1="100" y1="100" x2="82"  y2="100" stroke="rgba(0,200,255,0.08)" strokeWidth="0.3"/>
      <line x1="100" y1="100" x2="100" y2="88"  stroke="rgba(0,200,255,0.08)" strokeWidth="0.3"/>
    </svg>
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
        <HistoryBg />
        <div className="hist-above">
          <Navbar />
        </div>
        <main className="hist-main hist-above">

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