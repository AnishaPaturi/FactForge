
import { useState, useEffect } from 'react'

const styles = `
  .ff-loader {
    background: rgba(4, 14, 28, 0.78);
    border: 1px solid rgba(0, 200, 255, 0.15);
    border-radius: 14px;
    padding: 1.75rem 1.5rem;
    backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
    animation: loaderIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes loaderIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ff-loader-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  /* Spinning ring */
  .ff-loader-ring {
    position: relative;
    width: 44px; height: 44px;
    flex-shrink: 0;
  }

  .ff-loader-ring-track {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid rgba(0,200,255,0.12);
  }

  .ff-loader-ring-spin {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #00d4ff;
    border-right-color: rgba(0,180,255,0.4);
    animation: ffSpin 0.9s linear infinite;
    box-shadow: 0 0 12px rgba(0,200,255,0.25);
  }

  @keyframes ffSpin {
    to { transform: rotate(360deg); }
  }

  .ff-loader-ring-dot {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ff-loader-ring-dot::after {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #00d4ff;
    box-shadow: 0 0 10px rgba(0,200,255,0.8);
    animation: dotPulse 1.2s ease-in-out infinite;
  }

  @keyframes dotPulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.6); }
  }

  .ff-loader-heading {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    color: #e2f0ff;
    letter-spacing: 0.04em;
    margin-bottom: 3px;
  }

  .ff-loader-sub {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    color: rgba(0,200,255,0.55);
    letter-spacing: 0.02em;
  }

  /* Progress bar */
  .ff-loader-progress-track {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 99px;
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  .ff-loader-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #0077ff, #00d4ff);
    border-radius: 99px;
    box-shadow: 0 0 8px rgba(0,200,255,0.5);
    transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
  }

  /* Stages */
  .ff-loader-stages {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .ff-loader-stage {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: opacity 0.3s;
  }

  .ff-loader-stage.pending { opacity: 0.3; }
  .ff-loader-stage.done    { opacity: 0.55; }
  .ff-loader-stage.active  { opacity: 1; }

  .ff-stage-icon {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1.5px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 9px;
  }

  .ff-stage-icon.done {
    border-color: rgba(34,197,94,0.5);
    background: rgba(34,197,94,0.1);
    color: #4ade80;
  }

  .ff-stage-icon.active {
    border-color: rgba(0,200,255,0.5);
    background: rgba(0,200,255,0.08);
  }

  .ff-stage-icon.pending {
    border-color: rgba(255,255,255,0.1);
    background: transparent;
  }

  .ff-stage-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #00d4ff;
    animation: dotPulse 1s ease-in-out infinite;
  }

  .ff-stage-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
  }

  .ff-stage-label.done   { color: rgba(255,255,255,0.3); text-decoration: line-through; text-decoration-color: rgba(255,255,255,0.15); }
  .ff-stage-label.active { color: #e2f0ff; }
  .ff-stage-label.pending{ color: rgba(255,255,255,0.35); }

  .ff-stage-sub {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    color: rgba(0,200,255,0.6);
    margin-top: 1px;
  }

  /* Shimmer skeleton */
  .ff-loader-skeletons {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ff-skeleton-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ff-shimmer {
    border-radius: 6px;
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(0,180,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: shimmerAnim 1.8s ease-in-out infinite;
  }

  @keyframes shimmerAnim {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

const STAGES = [
  { id: 1, label: 'Parsing input',       sub: 'Segmenting claims from text'  },
  { id: 2, label: 'Cross-referencing',   sub: 'Searching knowledge base'     },
  { id: 3, label: 'Evaluating evidence', sub: 'Weighing source credibility'  },
  { id: 4, label: 'Generating verdicts', sub: 'Compiling fact-check report'  },
]

export default function Loader() {
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    const timers = STAGES.map((_, i) =>
      setTimeout(() => setCurrentStage(i + 1), i * 700 + 300)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const progress = (currentStage / STAGES.length) * 100

  return (
    <>
      <style>{styles}</style>
      <div className="ff-loader">

        {/* Top row */}
        <div className="ff-loader-top">
          <div className="ff-loader-ring">
            <div className="ff-loader-ring-track" />
            <div className="ff-loader-ring-spin" />
            <div className="ff-loader-ring-dot" />
          </div>
          <div>
            <p className="ff-loader-heading">Forging Analysis…</p>
            <p className="ff-loader-sub">Cross-checking against trusted sources</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="ff-loader-progress-track">
          <div className="ff-loader-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Stages */}
        <div className="ff-loader-stages">
          {STAGES.map((stage, i) => {
            const done    = i < currentStage
            const active  = i === currentStage
            const pending = i > currentStage
            const stateClass = done ? 'done' : active ? 'active' : 'pending'

            return (
              <div key={stage.id} className={`ff-loader-stage ${stateClass}`}>
                <div className={`ff-stage-icon ${stateClass}`}>
                  {done   ? '✓' :
                   active ? <div className="ff-stage-dot" /> :
                            null}
                </div>
                <div>
                  <p className={`ff-stage-label ${stateClass}`}>{stage.label}</p>
                  {active && <p className="ff-stage-sub">{stage.sub}</p>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Skeleton preview */}
        <div className="ff-loader-skeletons">
          {[1, 2].map((n) => (
            <div key={n} className="ff-skeleton-card">
              <div className="ff-shimmer" style={{ height: 11, width: '78%', animationDelay: `${n * 0.1}s` }} />
              <div className="ff-shimmer" style={{ height: 11, width: '56%', animationDelay: `${n * 0.15}s` }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <div className="ff-shimmer" style={{ height: 20, width: 72, borderRadius: 50, animationDelay: `${n * 0.2}s` }} />
                <div className="ff-shimmer" style={{ height: 4, flex: 1, alignSelf: 'center', animationDelay: `${n * 0.25}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}