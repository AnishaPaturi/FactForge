import ResultCard from "./ResultCard";

export default function ClaimsList({ claims = [] }) {
  return (
    <div>
      {claims.map((c, i) => (
        <ResultCard
          key={i}
          index={i}
          claim={c.claim}
          verdict={c.verdict}
          confidence={c.confidence}
          explanation={c.explanation}
          sources={c.sources || []}
        />
      ))}
    </div>
  );
}