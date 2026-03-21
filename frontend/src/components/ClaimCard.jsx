// export default function ClaimCard({ claim }) {
//   const badgeClass =
//     claim.verdict === "True"
//       ? "badge true"
//       : claim.verdict === "False"
//       ? "badge false"
//       : claim.verdict === "Partially True"
//       ? "badge partial"
//       : "badge unverifiable";

//   return (
//     <div className="card claim-card">
//       <h4>{claim.claim}</h4>

//       <span className={badgeClass}>
//         {claim.verdict}
//       </span>

//       <div className="progress">
//         <div
//           className="progress-inner"
//           style={{ width: `${claim.confidence}%` }}
//         />
//       </div>

//       <p style={{ marginTop: "10px", color: "#6b7280" }}>
//         {claim.explanation}
//       </p>
//     </div>
//   );
// }






// export default function ClaimCard({ claim }) {
//   const badgeClass =
//     claim.verdict === "True"
//       ? "badge true"
//       : claim.verdict === "False"
//       ? "badge false"
//       : claim.verdict === "Partially True"
//       ? "badge partial"
//       : "badge unverifiable";

//   return (
//     <div className="card claim-card">
//       <h4>{claim.claim}</h4>

//       <span className={badgeClass}>
//         {claim.verdict}
//       </span>

//       <div className="progress">
//         <div
//           className="progress-inner"
//           style={{ width: `${claim.confidence}%` }}
//         />
//       </div>

//       <p style={{ marginTop: "10px", color: "#6b7280" }}>
//         {claim.explanation}
//       </p>

//       {/* ✅ SOURCES SECTION */}
      
//       {claim.verdict !=="Unverifiable" && 
//       claim.sources && claim.sources.length > 0 && (
//         <div style={{ marginTop: "12px" }}>
//           <p style={{ fontSize: "12px", fontWeight: "bold", color: "#9ca3af" }}>
//             Sources
//           </p>

//           {claim.sources.map((src, i) => (
//             <div
//               key={i}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "6px 8px",
//                 marginTop: "6px",
//                 background: "#f9fafb",
//                 borderRadius: "6px",
//                 fontSize: "13px"
//               }}
//             >
//               <a
//                 href={src.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ color: "#374151", textDecoration: "none" }}
//               >
//                 {src.title || src.url}
//               </a>

//               <span style={{ color: "#4f46e5", fontWeight: "500" }}>
//                 {src.credibility}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






const styles = `
  .ff-claim-card {
    background: rgba(4, 14, 28, 0.78);
    border: 1px solid rgba(0, 200, 255, 0.12);
    border-radius: 14px;
    padding: 1.25rem 1.4rem;
    margin-bottom: 0.9rem;
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    animation: claimIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  .ff-claim-card:hover {
    border-color: rgba(0,200,255,0.25);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,180,255,0.08);
    transform: translateY(-1px);
  }

  @keyframes claimIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ff-claim-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.85rem;
  }

  .ff-claim-text {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #dbeafe;
    line-height: 1.55;
    flex: 1;
  }

  /* Verdict badges */
  .ff-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .ff-badge.true {
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.3);
    color: #4ade80;
  }

  .ff-badge.false {
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.3);
    color: #f87171;
  }

  .ff-badge.partial {
    background: rgba(245,158,11,0.12);
    border: 1px solid rgba(245,158,11,0.3);
    color: #fbbf24;
  }

  .ff-badge.unverifiable {
    background: rgba(100,116,139,0.15);
    border: 1px solid rgba(100,116,139,0.3);
    color: #94a3b8;
  }

  /* Progress bar */
  .ff-progress-wrap {
    margin-bottom: 0.75rem;
  }

  .ff-progress-label {
    display: flex;
    justify-content: space-between;
    font-family: 'Inter', monospace;
    font-size: 0.65rem;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .ff-progress-track {
    height: 4px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }

  .ff-progress-bar {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #0099ff, #00d4ff);
    box-shadow: 0 0 8px rgba(0,200,255,0.4);
    transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
  }

  /* Explanation */
  .ff-claim-explanation {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    margin-top: 0.5rem;
  }

  /* Sources */
  .ff-sources {
    margin-top: 1rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .ff-sources-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,200,255,0.55);
    margin-bottom: 0.5rem;
  }

  .ff-source-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 10px;
    margin-top: 5px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    gap: 0.5rem;
    transition: background 0.2s, border-color 0.2s;
  }

  .ff-source-row:hover {
    background: rgba(0,180,255,0.06);
    border-color: rgba(0,200,255,0.18);
  }

  .ff-source-link {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: #93c5fd;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    transition: color 0.15s;
  }

  .ff-source-link:hover {
    color: #00d4ff;
  }

  .ff-source-cred {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    color: #00d4ff;
    white-space: nowrap;
    flex-shrink: 0;
  }
`

export default function ClaimCard({ claim }) {
  const badgeClass =
    claim.verdict === "True"
      ? "ff-badge true"
      : claim.verdict === "False"
      ? "ff-badge false"
      : claim.verdict === "Partially True"
      ? "ff-badge partial"
      : "ff-badge unverifiable";

  const badgeDot =
    claim.verdict === "True" ? "●" :
    claim.verdict === "False" ? "●" :
    claim.verdict === "Partially True" ? "●" : "○";

  return (
    <>
      <style>{styles}</style>
      <div className="ff-claim-card">

        {/* Header: claim text + verdict badge */}
        <div className="ff-claim-header">
          <p className="ff-claim-text">{claim.claim}</p>
          <span className={badgeClass}>
            {badgeDot} {claim.verdict}
          </span>
        </div>

        {/* Confidence bar */}
        <div className="ff-progress-wrap">
          <div className="ff-progress-label">
            <span>Confidence</span>
            <span>{claim.confidence}%</span>
          </div>
          <div className="ff-progress-track">
            <div className="ff-progress-bar" style={{ width: `${claim.confidence}%` }} />
          </div>
        </div>

        {/* Explanation */}
        <p className="ff-claim-explanation">{claim.explanation}</p>

        {/* Sources */}
        {claim.verdict !== "Unverifiable" &&
          claim.sources && claim.sources.length > 0 && (
            <div className="ff-sources">
              <p className="ff-sources-label">Sources</p>
              {claim.sources.map((src, i) => (
                <div key={i} className="ff-source-row">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ff-source-link"
                  >
                    {src.title || src.url}
                  </a>
                  <span className="ff-source-cred">{src.credibility}</span>
                </div>
              ))}
            </div>
          )}
      </div>
    </>
  );
}