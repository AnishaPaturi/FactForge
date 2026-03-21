
import ConfidenceChart from "./ConfidenceChart";
import ResultBreakdownChart from "./ResultBreakdownChart";

const styles = `
  .ff-analytics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .ff-analytics-section-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,200,255,0.6);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ff-analytics-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(0,200,255,0.1);
  }
`

export default function AnalyticsPanel({ data }) {
  return (
    <>
      <style>{styles}</style>
      <div>
        <p className="ff-analytics-section-label">Analytics</p>
        <div className="ff-analytics-grid">
          <ConfidenceChart data={data} />
          <ResultBreakdownChart data={data} />
        </div>
      </div>
    </>
  );
}