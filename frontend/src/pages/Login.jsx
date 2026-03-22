
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../services/api";


/* ─── Inline global styles ─────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #000;
    color: #fff;
    min-height: 100vh;
  }

  /* ── Root ── */
  .ff-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    background: #05090f;
  }

  /* ── SVG full-screen scene ── */
  .ff-scene {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  /* ── Card wrapper ── */
  .ff-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 390px;
    animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Card ── */
  .ff-card {
    background: rgba(4, 14, 28, 0.78);
    border: 1px solid rgba(0, 200, 255, 0.14);
    border-radius: 20px;
    padding: 2.5rem 2.25rem 2rem;
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow:
      0 0 0 1px rgba(0,180,255,.06),
      0 30px 80px rgba(0,0,0,.75),
      inset 0 1px 0 rgba(255,255,255,.06),
      0 0 80px rgba(0,120,255,.04);
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  /* ── Title ── */
  .ff-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    color: #fff;
    letter-spacing: .05em;
    text-shadow: 0 0 40px rgba(0,200,255,.35), 0 0 80px rgba(0,150,255,.15);
    margin-bottom: .4rem;
  }

  /* ── Input group ── */
  .ff-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .ff-input-icon {
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    pointer-events: none;
    z-index: 1;
    opacity: 0.5;
  }

  .ff-input {
    width: 100%;
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.13);
    border-radius: 50px;
    padding: .85rem 3rem .85rem 1.3rem;
    font-family: 'Inter', sans-serif;
    font-size: .9rem;
    font-weight: 400;
    color: #fff;
    outline: none;
    transition: border-color .25s, box-shadow .25s, background .25s;
  }

  .ff-input::placeholder {
    color: rgba(255,255,255,.38);
    font-weight: 300;
  }

  .ff-input:focus {
    border-color: rgba(0, 210, 255, 0.5);
    background: rgba(0, 160, 255, 0.07);
    box-shadow: 0 0 0 3px rgba(0,190,255,.12), 0 0 24px rgba(0,180,255,.1);
  }

  /* ── Eye toggle ── */
  .ff-eye-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px;
    opacity: .45;
    transition: opacity .2s;
  }
  .ff-eye-btn:hover { opacity: 1; }

  /* ── Divider ── */
  .ff-divider {
    display: flex;
    align-items: center;
    gap: .75rem;
    color: rgba(255,255,255,.22);
    font-size: .7rem;
    letter-spacing: .14em;
    text-transform: uppercase;
    margin: -.1rem 0;
  }
  .ff-divider::before, .ff-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,.08);
  }

  /* ── Primary button — white pill ── */
  .ff-btn-primary {
    width: 100%;
    padding: .9rem;
    border: none;
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    font-size: .85rem;
    font-weight: 700;
    letter-spacing: .1em;
    color: #000;
    cursor: pointer;
    background: #fff;
    box-shadow: 0 4px 28px rgba(255,255,255,.18), 0 2px 8px rgba(0,0,0,.4);
    transition: transform .15s, box-shadow .15s;
  }

  .ff-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 36px rgba(255,255,255,.28);
  }

  .ff-btn-primary:active:not(:disabled) { transform: translateY(0); }

  .ff-btn-primary:disabled {
    opacity: .4;
    cursor: not-allowed;
  }

  /* ── Secondary button ── */
  .ff-btn-secondary {
    width: 100%;
    padding: .84rem;
    border: 1px solid rgba(0, 200, 255, 0.28);
    border-radius: 50px;
    background: rgba(0, 180, 255, 0.07);
    font-family: 'Inter', sans-serif;
    font-size: .88rem;
    font-weight: 500;
    color: rgba(255,255,255,.78);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    transition: border-color .2s, color .2s, background .2s, box-shadow .2s;
  }

  .ff-btn-secondary:hover {
    border-color: rgba(0, 210, 255, 0.6);
    color: #fff;
    background: rgba(0, 180, 255, 0.14);
    box-shadow: 0 0 24px rgba(0,180,255,.15);
  }

  /* ── Spinner ── */
  .ff-spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid rgba(0,0,0,.25);
    border-top-color: #000;
    border-radius: 50%;
    animation: spinAnim .7s linear infinite;
    margin-right: .4rem;
    vertical-align: middle;
  }

  @keyframes spinAnim {
    to { transform: rotate(360deg); }
  }

  /* ── Footer ── */
  .ff-footer {
    text-align: center;
    font-size: .7rem;
    color: rgba(255,255,255,.28);
    letter-spacing: .04em;
    padding-top: .25rem;
  }

  .ff-footer span {
    color: #00ccff;
    font-weight: 500;
  }
`

/* ─── Icons ─────────────────────────────────────────────────── */
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
    <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="white" strokeWidth="1.3"/>
    <path d="M1.5 5.5l6 3.5 6-3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
    <rect x="3" y="6.5" width="9" height="7" rx="1.5" stroke="white" strokeWidth="1.3"/>
    <path d="M5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="7.5" cy="10" r="1" fill="white"/>
  </svg>
)

const EyeIcon = ({ show }) => (
  <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
    {show ? (
      <>
        <path d="M1.5 7.5C2.5 4.5 5 2.5 7.5 2.5s5 2 6 5c-1 3-3.5 5-6 5s-5-2-6-5z" stroke="white" strokeWidth="1.3"/>
        <circle cx="7.5" cy="7.5" r="1.8" stroke="white" strokeWidth="1.3"/>
      </>
    ) : (
      <>
        <path d="M2 2l11 11" stroke="white" strokeWidth="1.3"/>
        <path d="M1.5 7.5c.6-2 2-3.6 3.7-4.5" stroke="white" strokeWidth="1.3"/>
      </>
    )}
  </svg>
)

const DemoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <polygon points="4,2 12,7 4,12" fill="rgba(0,210,255,0.9)"/>
  </svg>
)

/* ─── Cyber Background Scene ────────────────────────────────── */
// Beams: x positions (%), heights (% of half-screen), opacities
const BEAMS = [
  { x: 4,   h: 92, o: 0.85 },
  { x: 10,  h: 70, o: 0.55 },
  { x: 17,  h: 80, o: 0.65 },
  { x: 25,  h: 52, o: 0.38 },
  { x: 33,  h: 40, o: 0.28 },
  { x: 41,  h: 28, o: 0.18 },
  { x: 59,  h: 28, o: 0.18 },
  { x: 67,  h: 40, o: 0.28 },
  { x: 75,  h: 52, o: 0.38 },
  { x: 83,  h: 80, o: 0.65 },
  { x: 90,  h: 70, o: 0.55 },
  { x: 96,  h: 92, o: 0.85 },
]

function CyberScene() {
  // horizon sits at 52% from top
  const H = 52
  return (
    <svg className="ff-scene" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Beam gradient: bright at bottom (horizon), fades upward */}
        <linearGradient id="beamUp" x1="0" y1="1" x2="0" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="1"/>
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
        </linearGradient>
        {/* Reflection gradient: bright at top (horizon), fades downward */}
        <linearGradient id="beamDown" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#00aaff" stopOpacity="0"/>
        </linearGradient>
        {/* Horizon glow mask */}
        <linearGradient id="horizGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0"/>
          <stop offset="25%"  stopColor="#00d4ff" stopOpacity="0.9"/>
          <stop offset="50%"  stopColor="#00eeff" stopOpacity="1"/>
          <stop offset="75%"  stopColor="#00d4ff" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
        </linearGradient>
        {/* Subtle floor tint */}
        <linearGradient id="floorTint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#001830" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#000508" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Dark background */}
      <rect width="100" height="100" fill="#05090f"/>

      {/* Subtle upper dark vignette */}
      <rect width="100" height={H} fill="url(#floorTint)" transform={`scale(1,-1) translate(0,-${H})`}/>

      {/* Floor tint below horizon */}
      <rect y={H} width="100" height={100 - H} fill="url(#floorTint)"/>

      {/* ── Upward beams (above horizon) ── */}
      {BEAMS.map((b, i) => {
        const beamH = (b.h / 100) * H   // height in SVG units above horizon
        const y1 = H - beamH
        return (
          <rect
            key={`up-${i}`}
            x={b.x - 0.12} y={y1}
            width="0.24" height={beamH}
            fill="url(#beamUp)"
            opacity={b.o}
          >
            <animate
              attributeName="opacity"
              values={`${b.o};${Math.min(b.o + 0.25, 1)};${b.o}`}
              dur={`${4 + (i % 4)}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.7) % 3}s`}
            />
          </rect>
        )
      })}

      {/* ── Mirror reflection beams (below horizon) ── */}
      {BEAMS.map((b, i) => {
        const beamH = (b.h / 100) * (100 - H) * 0.55
        return (
          <rect
            key={`dn-${i}`}
            x={b.x - 0.12} y={H}
            width="0.24" height={beamH}
            fill="url(#beamDown)"
            opacity={b.o * 0.55}
          >
            <animate
              attributeName="opacity"
              values={`${b.o * 0.55};${Math.min(b.o * 0.8, 0.7)};${b.o * 0.55}`}
              dur={`${4 + (i % 4)}s`}
              repeatCount="indefinite"
              begin={`${(i * 0.7) % 3}s`}
            />
          </rect>
        )
      })}

      {/* ── Horizon line — bright cyan glow ── */}
      <rect x="0" y={H - 0.18} width="100" height="0.18" fill="url(#horizGlow)" opacity="0.6"/>
      <rect x="0" y={H} width="100" height="0.28" fill="url(#horizGlow)" opacity="1"/>
      <rect x="0" y={H + 0.28} width="100" height="0.18" fill="url(#horizGlow)" opacity="0.5"/>

      {/* Soft bloom around horizon */}
      <rect x="0" y={H - 1.5} width="100" height="3" fill="url(#horizGlow)" opacity="0.08"/>
    </svg>
  )
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const canSubmit = email.trim() && password.trim() && !loading

  // ─── REAL LOGIN ─────────────────────────────────────────────
  const handleLogin = async () => {
    if (!canSubmit) return;
    setLoading(true);

    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }

    setLoading(false);
  };

  const handleDemo = () => {
    navigate("/dashboard")
  }

  return (
    <>
      <style>{globalStyles}</style>

      <div className="ff-root">

        {/* Full-screen SVG scene: beams + horizon + reflection */}
        <CyberScene />

        {/* Login card */}
        <div className="ff-wrapper">
          <div className="ff-card">

            {/* Title */}
            <h1 className="ff-title">FactForge</h1>

            {/* Email */}
            <div className="ff-input-wrap">
              <input
                className="ff-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <span className="ff-input-icon"><MailIcon /></span>
            </div>

            {/* Password */}
            <div className="ff-input-wrap">
              <input
                className="ff-input"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button className="ff-eye-btn" onClick={() => setShowPw(!showPw)}>
                <EyeIcon show={showPw} />
              </button>
            </div>

            {/* Sign in */}
            <button
              className="ff-btn-primary"
              onClick={handleLogin}
              disabled={!canSubmit}
            >
              {loading && <span className="ff-spinner" />}
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="ff-divider">or</div>

            {/* Demo */}
            <button className="ff-btn-secondary" onClick={handleDemo}>
              <DemoIcon />
              Continue with Demo
            </button>

            {/* Footer */}
            <p className="ff-footer">
              AI-powered fact verification · <span>FactForge</span>
            </p>

          </div>
        </div>
      </div>
    </>
  )
}
