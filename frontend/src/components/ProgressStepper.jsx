
export default function ProgressStepper({ step }) {
  const steps = [
    { id: 1, label: "Extracting Claims" },
    { id: 2, label: "Searching Evidence" },
    { id: 3, label: "Verifying" }
  ];

  return (
    <div className="progress-stepper">
      {steps.map((s, i) => (
        <div key={s.id} className="step-wrapper" style={{ flex: 1, maxWidth: 160 }}>
          <div className={`step-circle ${step >= s.id ? "active-step" : ""}`}>
            {step > s.id ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7l3 3 5-5" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : s.id}
          </div>
          <p className="step-label">{s.label}</p>
        </div>
      ))}
    </div>
  );
}