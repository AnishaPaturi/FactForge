

import { useState, useEffect } from "react";
import { useLocation, useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";
import ProgressStepper from "../components/ProgressStepper";
import SummaryStats from "../components/SummaryStats";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ClaimsList from "../components/ClaimsList";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { addSession } from "./historyStore";
import { downloadPDF } from "../services/api";

/* ─── Scoped styles ─────────────────────────────────────────────── */
const styles = `
 

  /* ── Fixed animated background ── */
  .db-bg {
    position: fixed;
    inset: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  /* Ensure all dashboard content sits above bg */
  .db-above {
    position: relative;
    z-index: 1;
  }

  /* ── Hero section ── */
  .db-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3.5rem 1rem 1.5rem;
    gap: 1rem;
    animation: heroIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes heroIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .db-greeting {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(0,200,255,0.75);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .db-greeting-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #00d4ff;
    box-shadow: 0 0 10px rgba(0,212,255,0.9);
    animation: dotBlink 2s ease-in-out infinite;
  }

  @keyframes dotBlink {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }

  .db-hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.01em;
    line-height: 1.2;
    text-shadow: 0 0 60px rgba(0,200,255,0.25), 0 0 120px rgba(0,150,255,0.1);
  }

  .db-hero-title span {
    background: linear-gradient(135deg, #00d4ff 0%, #7dd3fc 50%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .db-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    font-weight: 400;
    color: rgba(255,255,255,0.55);
    max-width: 520px;
    line-height: 1.65;
  }

  /* ── Search area (Claude/ChatGPT style) ── */
  .db-search-area {
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    padding: 0 1.5rem 2rem;
    animation: heroIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
  }

  /* ── Example prompts ── */
  .db-examples {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 1rem;
  }

  .db-example-chip {
    padding: 6px 14px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .db-example-chip:hover {
    color: #00d4ff;
    border-color: rgba(0,200,255,0.3);
    background: rgba(0,180,255,0.08);
  }

  /* ── Results area ── */
  .db-results {
    width: 100%;
    max-width: 860px;
    margin: 0 auto;
    padding: 0 1.5rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    animation: heroIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* ── Results header bar ── */
  .db-results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid rgba(0,200,255,0.08);
  }

  .db-results-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(0,200,255,0.65);
  }

  .db-results-actions {
    display: flex;
    gap: 8px;
  }

  .db-btn-download {
    padding: 10px 22px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    background: rgba(34,197,94,0.12);
    border: 1px solid rgba(34,197,94,0.35);
    color: #4ade80;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }
  .db-btn-download:hover {
    background: rgba(34,197,94,0.2);
    border-color: rgba(34,197,94,0.55);
    box-shadow: 0 0 18px rgba(34,197,94,0.18);
    transform: translateY(-1px);
  }

  .db-btn-reset {
    padding: 10px 22px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.65);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }
  .db-btn-reset:hover {
    color: rgba(255,255,255,0.92);
    border-color: rgba(255,255,255,0.28);
    background: rgba(255,255,255,0.09);
    transform: translateY(-1px);
  }

  /* ── AI Detection card ── */
  .db-ai-card {
    background: rgba(4,14,28,0.78);
    border: 1px solid;
    border-radius: 14px;
    padding: 1.2rem 1.4rem;
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
  }
  .db-ai-card.high   { border-color: rgba(239,68,68,0.28); }
  .db-ai-card.medium { border-color: rgba(245,158,11,0.28); }
  .db-ai-card.low    { border-color: rgba(34,197,94,0.22); }

  .db-ai-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.9rem;
  }

  .db-ai-label-tag {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 4px;
  }

  .db-ai-verdict {
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
  }
  .db-ai-verdict.high   { color: #f87171; }
  .db-ai-verdict.medium { color: #fbbf24; }
  .db-ai-verdict.low    { color: #4ade80; }

  .db-ai-pct {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }
  .db-ai-pct.high   { color: #f87171; text-shadow: 0 0 20px rgba(248,113,113,0.4); }
  .db-ai-pct.medium { color: #fbbf24; text-shadow: 0 0 20px rgba(251,191,36,0.4); }
  .db-ai-pct.low    { color: #4ade80; text-shadow: 0 0 20px rgba(74,222,128,0.4); }

  .db-ai-track {
    height: 5px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }

  .db-ai-bar {
    height: 100%;
    border-radius: 99px;
    transition: width 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .db-ai-bar.high   { background: linear-gradient(90deg, #dc2626, #f87171); box-shadow: 0 0 10px rgba(239,68,68,0.4); }
  .db-ai-bar.medium { background: linear-gradient(90deg, #d97706, #fbbf24); box-shadow: 0 0 10px rgba(245,158,11,0.4); }
  .db-ai-bar.low    { background: linear-gradient(90deg, #16a34a, #4ade80); box-shadow: 0 0 10px rgba(34,197,94,0.4); }

  /* ── Topic warning card ── */
  .db-topic-card {
    background: rgba(4,14,28,0.78);
    border-radius: 14px;
    padding: 1.1rem 1.4rem;
    backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .db-topic-card.high   { border: 1px solid rgba(239,68,68,0.35); }
  .db-topic-card.medium { border: 1px solid rgba(245,158,11,0.35); }
  .db-topic-card.low    { border: 1px solid rgba(59,130,246,0.35); }

  .db-topic-tag {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

  .db-topic-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #e2f0ff;
    text-transform: capitalize;
  }

  .db-topic-msg {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.55);
    line-height: 1.55;
  }

  /* ── Empty state ── */
  .db-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 1.5rem 1rem 4rem;
    text-align: center;
  }

  .db-empty-hint {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.18);
    letter-spacing: 0.05em;
  }

  /* ── Stepper / loader area ── */
  .db-process-area {
    max-width: 760px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1.5rem;
  }

  /* ── Tab bar ── */
  .db-tab-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(0,200,255,0.1);
    border-radius: 14px;
    width: fit-content;
  }

  .db-tab-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.02em;
    color: rgba(255,255,255,0.45);
    background: transparent;
  }
  .db-tab-btn:hover:not(.active) {
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.05);
  }
  .db-tab-btn.active {
    color: #fff;
    background: rgba(0,180,255,0.15);
    border: 1px solid rgba(0,200,255,0.3);
    box-shadow: 0 0 18px rgba(0,180,255,0.15);
  }
  .db-tab-btn.active.green {
    background: rgba(34,197,94,0.14);
    border-color: rgba(34,197,94,0.35);
    box-shadow: 0 0 18px rgba(34,197,94,0.12);
    color: #4ade80;
  }

  .db-tab-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 7px;
    border-radius: 50px;
    font-size: 0.72rem;
    font-weight: 700;
    background: rgba(0,200,255,0.15);
    color: #00d4ff;
  }
  .db-tab-btn.active.green .db-tab-badge {
    background: rgba(34,197,94,0.18);
    color: #4ade80;
  }

  .db-tab-content {
    animation: tabFadeIn 0.3s ease both;
  }
  @keyframes tabFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .db-results .ff-claim-text,
  .db-results .rc-claim-text {
    font-size: 0.95rem !important;
    color: #e2f0ff !important;
  }

  .db-results .rc-explanation,
  .db-results .ff-claim-explanation {
    font-size: 0.88rem !important;
    color: rgba(255,255,255,0.65) !important;
  }

  .db-results .stat-box h3 {
    font-size: 1.8rem !important;
  }

  .db-results .stat-box p {
    font-size: 0.72rem !important;
    color: rgba(255,255,255,0.45) !important;
  }
`

/* ─── Helpers ───────────────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return { text: "Good Morning", emoji: "☀️" }
  if (h < 17) return { text: "Good Afternoon", emoji: "🌤️" }
  return { text: "Good Evening", emoji: "🌙" }
}

const CLAIM_POOL = [
  "The Great Wall of China is visible from space",
  "Einstein failed his math exams as a child",
  "Humans only use 10% of their brain",
  "Lightning never strikes the same place twice",
  "We swallow 8 spiders a year in our sleep",
  "Drinking coffee stunts your growth",
  "The Eiffel Tower grows taller in summer",
  "Goldfish have a 3-second memory",
  "Vitamin C prevents the common cold",
  "Bats are completely blind",
]

function pickRandom(n = 4) {
  return [...CLAIM_POOL].sort(() => Math.random() - 0.5).slice(0, n)
}

/* ─── Dashboard Background — aurora streaks + hex dot grid ─────── */
function DashboardBg() {
  return (
    <svg className="db-bg" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dbBase" cx="50%" cy="30%" r="80%">
          <stop offset="0%"   stopColor="#060d1c" stopOpacity="1"/>
          <stop offset="100%" stopColor="#05090f" stopOpacity="1"/>
        </radialGradient>
        <linearGradient id="dbAurora1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0077cc" stopOpacity="0"/>
          <stop offset="40%"  stopColor="#00aaff" stopOpacity="0.07"/>
          <stop offset="60%"  stopColor="#00ccff" stopOpacity="0.09"/>
          <stop offset="100%" stopColor="#0055aa" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="dbAurora2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#4400cc" stopOpacity="0"/>
          <stop offset="45%"  stopColor="#6633ff" stopOpacity="0.05"/>
          <stop offset="55%"  stopColor="#8855ff" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#3300aa" stopOpacity="0"/>
        </linearGradient>
        <radialGradient id="dbTopGlow" cx="50%" cy="0%" r="60%">
          <stop offset="0%"   stopColor="#003399" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#003399" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="dbCorner" cx="100%" cy="100%" r="50%">
          <stop offset="0%"   stopColor="#002255" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#002255" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill="url(#dbBase)"/>
      <rect width="100" height="60"  fill="url(#dbTopGlow)"/>
      <rect width="100" height="100" fill="url(#dbCorner)"/>

      {/* Aurora sweeps */}
      <rect width="100" height="100" fill="url(#dbAurora1)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="9s" repeatCount="indefinite"/>
      </rect>
      <rect width="100" height="100" fill="url(#dbAurora2)">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="13s" repeatCount="indefinite"/>
      </rect>

      {/* Hex dot grid rows — faint pulsing dots */}
      {[8,24,40,56,72,88].map((x,i) => (
        <circle key={`a${i}`} cx={x} cy="12" r="0.32" fill="rgba(0,180,255,0.18)">
          <animate attributeName="opacity" values="0.18;0.45;0.18" dur={`${5+i}s`} repeatCount="indefinite" begin={`${i*0.4}s`}/>
        </circle>
      ))}
      {[16,32,48,64,80,96].map((x,i) => (
        <circle key={`b${i}`} cx={x} cy="22" r="0.32" fill="rgba(0,180,255,0.14)">
          <animate attributeName="opacity" values="0.14;0.38;0.14" dur={`${6+i}s`} repeatCount="indefinite" begin={`${i*0.5+0.3}s`}/>
        </circle>
      ))}
      {[8,24,40,56,72,88].map((x,i) => (
        <circle key={`c${i}`} cx={x} cy="32" r="0.32" fill="rgba(0,180,255,0.1)">
          <animate attributeName="opacity" values="0.1;0.28;0.1" dur={`${7+i}s`} repeatCount="indefinite" begin={`${i*0.6}s`}/>
        </circle>
      ))}
      {[16,32,48,64,80].map((x,i) => (
        <circle key={`d${i}`} cx={x} cy="50" r="0.28" fill="rgba(100,150,255,0.09)">
          <animate attributeName="opacity" values="0.09;0.22;0.09" dur={`${8+i}s`} repeatCount="indefinite" begin={`${i*0.7}s`}/>
        </circle>
      ))}
      {[8,24,40,56,72,88].map((x,i) => (
        <circle key={`e${i}`} cx={x} cy="68" r="0.28" fill="rgba(100,150,255,0.07)">
          <animate attributeName="opacity" values="0.07;0.18;0.07" dur={`${9+i}s`} repeatCount="indefinite" begin={`${i*0.4+1}s`}/>
        </circle>
      ))}
      {[16,32,48,64,80].map((x,i) => (
        <circle key={`f${i}`} cx={x} cy="85" r="0.28" fill="rgba(100,150,255,0.06)">
          <animate attributeName="opacity" values="0.06;0.15;0.06" dur={`${7+i}s`} repeatCount="indefinite" begin={`${i*0.5+2}s`}/>
        </circle>
      ))}

      {/* Diagonal accent lines — barely visible */}
      <line x1="0"   y1="35" x2="45"  y2="0"   stroke="rgba(0,150,255,0.045)" strokeWidth="0.25"/>
      <line x1="55"  y1="100" x2="100" y2="65"  stroke="rgba(0,150,255,0.045)" strokeWidth="0.25"/>
      <line x1="100" y1="20" x2="70"  y2="0"   stroke="rgba(120,80,255,0.035)" strokeWidth="0.25"/>
      <line x1="0"   y1="80" x2="30"  y2="100" stroke="rgba(120,80,255,0.035)" strokeWidth="0.25"/>
    </svg>
  )
}

const mapVerdict = (v = "") => {
  if (v === "True")           return "true"
  if (v === "False")          return "false"
  if (v === "Partially True") return "partial"
  return "unverifiable"
}

/* ─── AI Detection Box ──────────────────────────────────────────── */
function AiDetectionBox({ probability }) {
  const pct   = probability || 0
  const level = pct >= 70 ? "high" : pct >= 40 ? "medium" : "low"
  const label = { high: "Likely AI-Generated", medium: "Possibly AI-Assisted", low: "Likely Human-Written" }

  return (
    <div className={`db-ai-card ${level}`}>
      <div className="db-ai-top">
        <div>
          <p className="db-ai-label-tag">AI Detection</p>
          <p className={`db-ai-verdict ${level}`}>{label[level]}</p>
        </div>
        <p className={`db-ai-pct ${level}`}>{pct}%</p>
      </div>
      <div className="db-ai-track">
        <div className={`db-ai-bar ${level}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

/* ─── Topic Warning ─────────────────────────────────────────────── */
function TopicWarning({ topic, warning }) {
  if (!warning || warning.level === "none") return null
  return (
    <div className={`db-topic-card ${warning.level}`}>
      <p className="db-topic-tag">Detected Topic</p>
      <p className="db-topic-name">{topic}</p>
      <p className="db-topic-msg">{warning.message}</p>
    </div>
  )
}

/* ─── Main Dashboard ────────────────────────────────────────────── */
export default function Dashboard() {
  const [claims, setClaims]             = useState([])
  const [step, setStep]                 = useState(0)
  const [uiState, setUiState]           = useState("empty")
  const [aiProbability, setAiProbability] = useState(0)
  const [topic, setTopic]               = useState("general")
  const [warning, setWarning]           = useState(null)
  const [inputText, setInputText]       = useState("")
  const [activeTab, setActiveTab]       = useState("overview") // "overview" | "analysis" | "claims"
  const [suggestions, setSuggestions]   = useState(() => pickRandom())

  const [reportId, setReportId] = useState(null)

  const location = useLocation()

  const { id } = useParams()

  const { text: greetText, emoji } = getGreeting()

  // Auto-trigger when navigated from History with re-analyze text
  useEffect(() => {
    if (location.state?.reanalyze) {
      handleVerify(location.state.reanalyze)
      window.history.replaceState({}, '')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



  useEffect(() => {
  if (id) {
    const API_BASE = import.meta.env.VITE_API_URL

    fetch(`${API_BASE}/report/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.claims) return

        setReportId(id)

        const normalized = data.claims.map((c) => ({
          ...c,
          verdict: mapVerdict(c.verdict),
        }))

        setClaims(normalized)
        setAiProbability(data.ai_probability || 0)
        setTopic(data.topic || "general")
        setWarning(data.warning || null)
        setUiState("results")
      })
  }
}, [id])




  const handleVerify = async (input) => {
    if (!input?.trim()) return
    setInputText(input.trim())
    setUiState("loading")
    setClaims([])
    setStep(1)

    try {
      setStep(2)
      const API_BASE = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      })
      const data = await response.json()
      setReportId(data.report_id)
      setStep(3)

      if (Array.isArray(data.claims)) {
        const normalized = data.claims.map((c) => ({
          ...c,
          verdict: mapVerdict(c.verdict),
        }))
        setClaims(normalized)
        setAiProbability(data?.ai_detection?.ai_probability || 0)
        setTopic(data?.topic || "general")
        setWarning(data?.warning || null)
        addSession(input.trim(), data.claims)
        setUiState("results")
      } else {
        setClaims([])
        setUiState("empty")
      }
    } catch (err) {
      console.error(err)
      setClaims([])
      setUiState("empty")
    }
  }

  const handleReset = () => {
    setUiState("empty")
    setClaims([])
    setStep(0)
    setInputText("")
    setActiveTab("overview")
    setSuggestions(pickRandom())   // fresh random set each time
  }

  const stats = {
    total:       claims.length,
    true:        claims.filter((c) => c.verdict === "true").length,
    false:       claims.filter((c) => c.verdict === "false").length,
    reliability: claims.length > 0
      ? Math.round((claims.filter((c) => c.verdict === "true").length / claims.length) * 100)
      : 0,
  }

  return (
    <>
      <style>{styles}</style>

      <div style={{ minHeight: "100vh", background: "#05090f", display: "flex", flexDirection: "column" }}>

        {/* Fixed animated background */}
        <DashboardBg />

        <div className="db-above">
          <Navbar />
        </div>

        {/* ── Main content (flex: 1 pushes footer to bottom) ── */}
        <div style={{ flex: 1 }} className="db-above">

        {/* ── Hero + Search (shown only in empty/loading state) ── */}
        {uiState !== "results" && (
          <>
            <div className="db-hero">
              {/* Live status indicator */}
              <div className="db-greeting">
                <span className="db-greeting-dot" />
                {emoji} {greetText}
              </div>

              {/* Main headline */}
              <h1 className="db-hero-title">
                Your one-stop destination<br />
                for <span>AI-powered fact checks</span>
              </h1>

              {/* Subtitle */}
              <p className="db-hero-sub">
                Paste any claim, news headline, or statement below.
                FactForge will verify it against trusted sources and give you
                a confidence-scored verdict — instantly.
              </p>
            </div>

            {/* Search box */}
            <div className="db-search-area">
              <InputBox onVerify={handleVerify} />

              {/* Example chips — only in empty state */}
              {uiState === "empty" && (
                <div className="db-examples">
                  {suggestions.map((claim, i) => (
                    <button
                      key={i}
                      className="db-example-chip"
                      onClick={() => handleVerify(claim)}
                    >
                      "{claim}"
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Loading state ── */}
        {uiState === "loading" && (
          <div className="db-process-area">
            <ProgressStepper step={step} />
            <Loader />
          </div>
        )}

        {/* ── Results ── */}
        {uiState === "results" && (
          <div className="db-results">

            {/* Results header */}
            <div className="db-results-header">
              <span className="db-results-label">
                Analysis Results · {claims.length} claim{claims.length !== 1 ? "s" : ""} verified
              </span>
              <div className="db-results-actions">
                <button className="db-btn-download" onClick={() => downloadPDF({
                                                                    claims: claims,
                                                                    aiProbability: aiProbability
                                                                  })}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1v8M3.5 6.5l3 3 3-3M1 10.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Report
                </button>
                <button
                  className="db-btn-reset"
                  onClick={() => {
                    if (!reportId) {
                      alert("Report not ready")
                      return
                    }

                    const shareUrl = `${window.location.origin}/report/${reportId}`
                    navigator.clipboard.writeText(shareUrl)
                    alert("Copied to clipboard!")
                  }}
                >
                  🔗 Share
                </button>
                <button className="db-btn-reset" onClick={handleReset}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 6.5a4.5 4.5 0 1 1 1.2 3M2 10V7h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  New Analysis
                </button>
              </div>
            </div>

            {/* Query echo */}
            {inputText && (
              <div style={{
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.55,
              }}>
                <span style={{ color: "rgba(0,200,255,0.6)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 10, fontWeight: 600 }}>
                  Analyzed
                </span>
                {inputText.length > 160 ? inputText.slice(0, 160) + "…" : inputText}
              </div>
            )}

            {/* Topic warning */}
            <TopicWarning topic={topic} warning={warning} />

            {/* AI Detection + Stats — always visible */}
            <AiDetectionBox probability={aiProbability} />
            <SummaryStats stats={stats} />

            {/* ── Tab bar ── */}
            <div className="db-tab-bar">
              <button
                className={`db-tab-btn${activeTab === "analysis" ? " active" : ""}`}
                onClick={() => setActiveTab("analysis")}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="1" y="8" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="6" y="5" width="3" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="11" y="1" width="3" height="13" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                View Analysis
              </button>

              <button
                className={`db-tab-btn${activeTab === "claims" ? " active green" : ""}`}
                onClick={() => setActiveTab("claims")}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2 4h11M2 7.5h8M2 11h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M11 11l.8.8 1.2-1.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Verified Claims
                <span className="db-tab-badge">{claims.length}</span>
              </button>
            </div>

            {/* ── Tab content ── */}
            {activeTab === "analysis" && (
              <div className="db-tab-content">
                <AnalyticsPanel data={claims} />
              </div>
            )}

            {activeTab === "claims" && (
              <div className="db-tab-content">
                <ClaimsList claims={claims} />
              </div>
            )}

            {/* Prompt to pick a tab if none chosen yet */}
            {activeTab === "overview" && (
              <div style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}>
                {/* Analysis preview card */}
                <div
                  onClick={() => setActiveTab("analysis")}
                  style={{
                    flex: 1, minWidth: 220,
                    padding: "1.4rem",
                    background: "rgba(0,100,200,0.07)",
                    border: "1px solid rgba(0,200,255,0.18)",
                    borderRadius: 14,
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", gap: 10,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,120,220,0.13)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,100,200,0.07)"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(0,180,255,0.12)", border: "1px solid rgba(0,200,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
                        <rect x="1" y="8" width="3" height="6" rx="1" stroke="#00d4ff" strokeWidth="1.3"/>
                        <rect x="6" y="5" width="3" height="9" rx="1" stroke="#00d4ff" strokeWidth="1.3"/>
                        <rect x="11" y="1" width="3" height="13" rx="1" stroke="#00d4ff" strokeWidth="1.3"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#e2f0ff", letterSpacing: "0.04em" }}>View Analysis</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.6, margin: 0 }}>
                    Confidence distribution charts, verification breakdown, and visual analytics.
                  </p>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#00d4ff", fontWeight: 600 }}>Open charts →</span>
                </div>

                {/* Claims preview card */}
                <div
                  onClick={() => setActiveTab("claims")}
                  style={{
                    flex: 1, minWidth: 220,
                    padding: "1.4rem",
                    background: "rgba(34,197,94,0.05)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    borderRadius: 14,
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", gap: 10,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(34,197,94,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(34,197,94,0.05)"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
                        <path d="M2 4h11M2 7.5h8M2 11h6" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round"/>
                        <circle cx="12" cy="11" r="2.5" stroke="#4ade80" strokeWidth="1.3"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#e2f0ff", letterSpacing: "0.04em" }}>View Verified Claims</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.6, margin: 0 }}>
                    {claims.length} claim{claims.length !== 1 ? "s" : ""} with verdicts, confidence scores, and source citations.
                  </p>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#4ade80", fontWeight: 600 }}>View claims →</span>
                </div>
              </div>
            )}

          </div>
        )}

        </div>{/* end flex-1 main content */}

        <div className="db-above">
          <Footer />
        </div>
      </div>
    </>
  )
}


