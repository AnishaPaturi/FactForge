import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

/* ─── UPDATED GLOBAL STYLES ───────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #000;
    color: #fff;
    min-height: 100vh;
  }

  .ff-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem; /* 🔥 more breathing space */
    position: relative;
    overflow: hidden;
    background: #05090f;
  }

  .ff-scene {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .ff-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 440px; /* 🔥 wider = less squeezed */
    animation: fadeUp .7s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .ff-card {
    background: rgba(4, 14, 28, 0.78);
    border: 1px solid rgba(0, 200, 255, 0.14);
    border-radius: 20px;
    padding: 2.8rem 2.4rem 2.4rem;
    backdrop-filter: blur(22px);
    display: flex;
    flex-direction: column;
    gap: 1.9rem; /* 🔥 more spacing */
    box-shadow:
      0 0 0 1px rgba(0,180,255,.06),
      0 30px 80px rgba(0,0,0,.75),
      inset 0 1px 0 rgba(255,255,255,.06),
      0 0 80px rgba(0,120,255,.04);
  }

  .ff-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: .05em;
    margin-bottom: 0.5rem;
    text-shadow:
      0 0 40px rgba(0,200,255,.35),
      0 0 80px rgba(0,150,255,.15);
  }

  .ff-input-wrap {
    position: relative;
  }

  .ff-input {
    width: 100%;
    background: rgba(255,255,255,.055);
    border: 1px solid rgba(255,255,255,.13);
    border-radius: 50px;
    padding: .9rem 1.4rem; /* 🔥 slightly bigger */
    font-size: .9rem;
    color: #fff;
    outline: none;
    transition: .25s;
  }

  .ff-input::placeholder {
    color: rgba(255,255,255,.38);
  }

  .ff-input:focus {
    border-color: rgba(0, 210, 255, 0.5);
    background: rgba(0, 160, 255, 0.07);
    box-shadow:
      0 0 0 3px rgba(0,190,255,.12),
      0 0 24px rgba(0,180,255,.1);
  }

  .ff-btn-primary {
    width: 100%;
    padding: .95rem;
    border-radius: 50px;
    border: none;
    font-family: 'Orbitron', sans-serif;
    background: #fff;
    cursor: pointer;
    margin-top: 0.6rem;
    transition: transform .15s, box-shadow .15s;
  }

  .ff-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255,255,255,.25);
  }

  .ff-btn-primary:disabled {
    opacity: .4;
  }

  .ff-btn-secondary {
    width: 100%;
    padding: .85rem;
    border-radius: 50px;
    border: 1px solid rgba(0, 200, 255, 0.28);
    background: rgba(0, 180, 255, 0.07);
    margin-top: 0.5rem;
    color: #fff;
    cursor: pointer;
  }

  .ff-footer {
    text-align: center;
    font-size: .7rem;
    opacity: .4;
    margin-top: 0.6rem;
  }

  .ff-footer span {
    color: #00ccff;
  }

  .ff-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid #000;
    border-top-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: spin 0.7s linear infinite;
    margin-right: 5px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

/* ─── SAME CYBER BACKGROUND (UNCHANGED LOGIC) ───────────────── */
function CyberScene() {
  const BEAMS = [
    { x: 4, h: 92, o: 0.85 },
    { x: 10, h: 70, o: 0.55 },
    { x: 17, h: 80, o: 0.65 },
    { x: 25, h: 52, o: 0.38 },
    { x: 33, h: 40, o: 0.28 },
    { x: 41, h: 28, o: 0.18 },
    { x: 59, h: 28, o: 0.18 },
    { x: 67, h: 40, o: 0.28 },
    { x: 75, h: 52, o: 0.38 },
    { x: 83, h: 80, o: 0.65 },
    { x: 90, h: 70, o: 0.55 },
    { x: 96, h: 92, o: 0.85 },
  ];

  const H = 52;

  return (
    <svg className="ff-scene" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect width="100" height="100" fill="#05090f"/>

      {BEAMS.map((b, i) => {
        const beamH = (b.h / 100) * H;
        return (
          <rect
            key={i}
            x={b.x}
            y={H - beamH}
            width="0.25"
            height={beamH}
            fill="#00d4ff"
            opacity={b.o}
          />
        );
      })}

      <rect x="0" y={H} width="100" height="0.4" fill="#00eaff" />
    </svg>
  );
}

/* ─── COMPONENT (UNCHANGED LOGIC) ───────────────── */
export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit =
    name && email && password && confirmPw && password === confirmPw;

  const handleSignup = async () => {
    if (!canSubmit) return;

    setLoading(true);

    try {
        const res = await registerUser({
        name,
        email,
        password,
        });

        console.log("Signup success:", res);

        alert("Account created successfully!");
        navigate("/login");

    } catch (err) {
        console.error("FULL ERROR:", err);

        alert(
        err.response?.data?.message ||
        err.message ||
        "Signup failed"
        );
    }

    setLoading(false);
    };
  return (
    <>
      <style>{globalStyles}</style>

      <div className="ff-root">
        <CyberScene />

        <div className="ff-wrapper">
          <div className="ff-card">

            <h1 className="ff-title">Sign Up</h1>

            <div className="ff-input-wrap">
              <input className="ff-input" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="ff-input-wrap">
              <input className="ff-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="ff-input-wrap">
              <input className="ff-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="ff-input-wrap">
              <input className="ff-input" type="password" placeholder="Confirm Password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
            </div>

            <button className="ff-btn-primary" onClick={handleSignup} disabled={!canSubmit}>
              {loading && <span className="ff-spinner" />}
              {loading ? "Creating..." : "Create Account"}
            </button>

            <button className="ff-btn-secondary" onClick={() => navigate("/login")}>
              Back to Login
            </button>

            <p className="ff-footer">
              AI-powered fact verification · <span>FactForge</span>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}