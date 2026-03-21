
import ClaimCard from "./ClaimCard";

const styles = `
  .ff-claims-list {
    display: flex;
    flex-direction: column;
  }

  .ff-claims-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .ff-claims-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: rgba(0,200,255,0.75);
    text-transform: uppercase;
  }

  .ff-claims-count {
    font-family: 'Inter', monospace;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 50px;
    padding: 2px 10px;
  }
`

export default function ClaimsList({ claims }) {
  return (
    <>
      <style>{styles}</style>
      <div className="ff-claims-list">
        <div className="ff-claims-header">
          <span className="ff-claims-title">Verified Claims</span>
          <span className="ff-claims-count">{claims.length} result{claims.length !== 1 ? 's' : ''}</span>
        </div>
        {claims.map((c, index) => (
          <ClaimCard key={index} claim={c} />
        ))}
      </div>
    </>
  );
}