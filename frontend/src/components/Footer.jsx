// // export default function Footer() {
// //   return (
// //     <div className="footer">
// //       © 2026 FactForge — Hackathon Project
// //     </div>
// //   );
// // }


const styles = `
  .ff-footer {
    text-align: center;
    padding: 1.25rem 1rem;
    margin-top: 2rem;
    border-top: 1px solid rgba(0,200,255,0.08);
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.22);
    letter-spacing: 0.06em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }

  .ff-footer-brand {
    color: rgba(0,200,255,0.55);
    font-weight: 600;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
  }

  .ff-footer-sep {
    color: rgba(0,200,255,0.2);
  }
`

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <div className="ff-footer">
        <span className="ff-footer-brand">FactForge</span>
        <span className="ff-footer-sep">·</span>
        <span>© 2026 Hackathon Project</span>
        <span className="ff-footer-sep">·</span>
        <span>AI-powered fact verification</span>
      </div>
    </>
  )
}