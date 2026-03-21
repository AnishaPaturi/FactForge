// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import InputBox from "../components/InputBox";
// import ResultCard from "../components/ResultCard";
// import Loader from "../components/Loader";
// import { analyzeText } from "../services/api";

// // ─── AI Detection Box ─────────────────────────────────────────────
// function AiDetectionBox({ probability }) {
//   const pct = probability || 0;
//   const level = pct >= 70 ? "high" : pct >= 40 ? "medium" : "low";

//   const colors = {
//     high: {
//       text: "text-red-400",
//       bar: "from-red-600 to-red-400",
//       bg: "bg-red-500/10 border-red-500/25",
//       label: "Likely AI-Generated",
//     },
//     medium: {
//       text: "text-amber-400",
//       bar: "from-amber-600 to-amber-400",
//       bg: "bg-amber-500/10 border-amber-500/25",
//       label: "Possibly AI-Assisted",
//     },
//     low: {
//       text: "text-emerald-400",
//       bar: "from-emerald-600 to-emerald-400",
//       bg: "bg-emerald-500/10 border-emerald-500/25",
//       label: "Likely Human-Written",
//     },
//   };

//   const c = colors[level];

//   return (
//     <div className={`card p-5 border ${c.bg}`}>
//       <div className="flex justify-between">
//         <div>
//           <p className="text-xs text-gray-400 uppercase">AI Detection</p>
//           <p className={`font-semibold ${c.text}`}>{c.label}</p>
//         </div>
//         <p className={`text-3xl font-bold ${c.text}`}>{pct}%</p>
//       </div>

//       <div className="mt-3 h-2 bg-gray-700 rounded">
//         <div
//           className={`h-full bg-gradient-to-r ${c.bar}`}
//           style={{ width: `${pct}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// // ─── VERDICT MAPPING FIX (IMPORTANT) ─────────────────────────────
// const mapVerdict = (v) => {
//   if (v === "True") return "true";
//   if (v === "False") return "false";
//   if (v === "Partially True") return "partial";
//   return "unverifiable";
// };

// // ─── MAIN DASHBOARD ───────────────────────────────────────────────
// export default function Dashboard() {
//   const [uiState, setUiState] = useState("empty");
//   const [results, setResults] = useState(null);

//   const handleAnalyze = async (text) => {
//     if (!text?.trim()) return;

//     setUiState("loading");
//     setResults(null);

//     try {
//       const data = await analyzeText(text);

//       // 🔥 transform backend → frontend format
//       const formatted = {
//         aiProbability: data?.ai_detection?.ai_probability || 0,
//         claims:
//           data?.claims?.map((c, index) => ({
//             id: index,
//             claim: c.claim,
//             verdict: mapVerdict(c.verdict),
//             confidence: c.confidence,
//             explanation: c.explanation,
//             sources:
//               c.sources?.map((s) => ({
//                 label: s.title,
//                 url: s.url,
//               })) || [],
//           })) || [],
//       };

//       setResults(formatted);
//       setUiState("results");
//     } catch (error) {
//       console.error(error);
//       alert("Error connecting to backend");
//       setUiState("empty");
//     }
//   };

//   const handleReset = () => {
//     setUiState("empty");
//     setResults(null);
//   };

//   return (
//     <div className="min-h-screen dot-grid">
//       <Navbar />

//       <main className="max-w-3xl mx-auto p-6 space-y-5">
//         {/* Header */}
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Fact Analyzer</h1>
//             <p className="text-sm text-gray-400">
//               Enter text and verify claims instantly
//             </p>
//           </div>

//           {uiState === "results" && (
//             <button
//               onClick={handleReset}
//               className="text-sm text-gray-300 border px-3 py-1 rounded"
//             >
//               New Analysis
//             </button>
//           )}
//         </div>

//         {/* Input */}
//         <InputBox onAnalyze={handleAnalyze} isLoading={uiState === "loading"} />

//         {/* STATES */}
//         {uiState === "loading" && <Loader />}

//         {uiState === "empty" && (
//           <div className="text-center text-gray-400">
//             Enter text to analyze
//           </div>
//         )}

//         {/* RESULTS */}
//         {uiState === "results" && results && (
//           <div className="space-y-4">
//             <AiDetectionBox probability={results.aiProbability} />

//             {results.claims.map((claim, i) => (
//               <ResultCard key={claim.id} {...claim} index={i} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import InputBox from "../components/InputBox";
// import ProgressStepper from "../components/ProgressStepper";
// import SummaryStats from "../components/SummaryStats";
// import AnalyticsPanel from "../components/AnalyticsPanel";
// import ClaimsList from "../components/ClaimsList";
// import Footer from "../components/Footer";

// export default function Dashboard() {
//   const [claims, setClaims] = useState([]);
//   const [step, setStep] = useState(0);

//   // const handleVerify = async (input) => {
//   //   setStep(1);

//   //   // simulate pipeline steps
//   //   setTimeout(() => setStep(2), 800);
//   //   setTimeout(() => setStep(3), 1500);

//   //   // replace with API call later
//   //   const mockData = [
//   //     {
//   //       claim: "India has 30 states",
//   //       verdict: "False",
//   //       confidence: 92,
//   //       explanation: "India currently has 28 states."
//   //     },
//   //     {
//   //       claim: "Earth revolves around Sun",
//   //       verdict: "True",
//   //       confidence: 98,
//   //       explanation: "Scientific consensus confirms this."
//   //     }
//   //   ];

//   //   setTimeout(() => {
//   //     setClaims(mockData);
//   //     setStep(3);
//   //   }, 1800);
//   // };
//   const handleVerify = async (input) => {
//   setStep(1);

//   try {
//     setStep(2);

//     const response = await fetch("http://localhost:8000/analyze", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ text: input })
//     });

//     const data = await response.json();

//     setStep(3);

//     // ensure claims is always array
//     if (Array.isArray(data.claims)) {
//       setClaims(data.claims);
//     } else {
//       setClaims([]);
//     }

//   } catch (error) {
//     console.error(error);
//     setClaims([]);
//   }
// };

//   const stats = {
//     total: claims.length,
//     true: claims.filter((c) => c.verdict === "True").length,
//     false: claims.filter((c) => c.verdict === "False").length,
//     reliability:
//       claims.length > 0
//         ? Math.round(
//             (claims.filter((c) => c.verdict === "True").length /
//               claims.length) *
//               100
//           )
//         : 0
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="container">
//         <InputBox onVerify={handleVerify} />

//         {step > 0 && <ProgressStepper step={step} />}

//         {claims.length > 0 && (
//           <>
//             <SummaryStats stats={stats} />
//             <AnalyticsPanel data={claims} />
//             <ClaimsList claims={claims} />
//           </>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }





// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import InputBox from "../components/InputBox";
// import ProgressStepper from "../components/ProgressStepper";
// import SummaryStats from "../components/SummaryStats";
// import AnalyticsPanel from "../components/AnalyticsPanel";
// import ClaimsList from "../components/ClaimsList";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [claims, setClaims] = useState([]);
//   const [step, setStep] = useState(0);
//   const navigate = useNavigate();

//   const handleVerify = async (input) => {
//     setStep(1);
//     try {
//       setStep(2);
//       const response = await fetch("http://localhost:8000/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: input })
//       });
//       const data = await response.json();
//       setStep(3);
//       if (Array.isArray(data.claims)) {
//         setClaims(data.claims);
//       } else {
//         setClaims([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setClaims([]);
//     }
//   };

//   const stats = {
//     total: claims.length,
//     true: claims.filter((c) => c.verdict === "True").length,
//     false: claims.filter((c) => c.verdict === "False").length,
//     reliability:
//       claims.length > 0
//         ? Math.round(
//             (claims.filter((c) => c.verdict === "True").length / claims.length) * 100
//           )
//         : 0
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "#05090f" }}>
//       <Navbar />
//       <div className="container">
//         <InputBox onVerify={handleVerify} />
//         {step > 0 && <ProgressStepper step={step} />}
//         {claims.length > 0 && (
//           <>
//             <SummaryStats stats={stats} />
//             <AnalyticsPanel data={claims} />
//             <ClaimsList claims={claims} />
//           </>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }



// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import InputBox from "../components/InputBox";
// <<<<<<< HEAD
// import ProgressStepper from "../components/ProgressStepper";
// import SummaryStats from "../components/SummaryStats";
// import AnalyticsPanel from "../components/AnalyticsPanel";
// import ClaimsList from "../components/ClaimsList";
// import Footer from "../components/Footer";
// import { addSession } from "./HistoryStore";  // ← same folder
// =======
// import ResultCard from "../components/ResultCard";
// import Loader from "../components/Loader";
// import { analyzeText } from "../services/api";
// import { downloadPDF } from "../services/api";
// >>>>>>> 075452cdcc0fc0278e1d9348118ff89d9fffb089

// export default function Dashboard() {
//   const [claims, setClaims] = useState([]);
//   const [step, setStep] = useState(0);

//   const handleVerify = async (input) => {
//     if (!input?.trim()) return;
//     setStep(1);
//     try {
//       setStep(2);
//       const response = await fetch("http://localhost:8000/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: input })
//       });
//       const data = await response.json();
//       setStep(3);

// <<<<<<< HEAD
//       if (Array.isArray(data.claims)) {
//         setClaims(data.claims);
//         addSession(input.trim(), data.claims); // ← save to history
//       } else {
//         setClaims([]);
//       }
// =======
//       // 🔥 transform backend → frontend format
//       const formatted = {
//         aiProbability: data?.ai_detection?.ai_probability || 0,
//         claims:
//           data?.claims?.map((c, index) => ({
//             id: index,
//             claim: c.claim,
//             verdict: mapVerdict(c.verdict),
//             confidence: c.confidence,
//             explanation: c.explanation,
//             sources:
//               c.sources?.map((s) => ({
//                 label: s.label,
//                 url: s.url,
//                 score: s.score,
//               })) || [],
//           })) || [],
//       };

//       setResults(formatted);
//       setUiState("results");
// >>>>>>> 075452cdcc0fc0278e1d9348118ff89d9fffb089
//     } catch (error) {
//       console.error(error);
//       setClaims([]);
//     }
//   };

//   const stats = {
//     total: claims.length,
//     true: claims.filter((c) => c.verdict === "True").length,
//     false: claims.filter((c) => c.verdict === "False").length,
//     reliability:
//       claims.length > 0
//         ? Math.round(
//             (claims.filter((c) => c.verdict === "True").length / claims.length) * 100
//           )
//         : 0
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "#05090f" }}>
//       <Navbar />
// <<<<<<< HEAD
//       <div className="container">
//         <InputBox onVerify={handleVerify} />
//         {step > 0 && <ProgressStepper step={step} />}
//         {claims.length > 0 && (
//           <>
//             <SummaryStats stats={stats} />
//             <AnalyticsPanel data={claims} />
//             <ClaimsList claims={claims} />
//           </>
// =======

//       <main className="max-w-3xl mx-auto p-6 space-y-5">
//         {/* Header */}
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Fact Analyzer</h1>
//             <p className="text-sm text-gray-400">
//               Enter text and verify claims instantly
//             </p>
//           </div>

//           {uiState === "results" && (
//           <div className="flex gap-3">
//             <button
//               onClick={() => downloadPDF(results)}
//               className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
//             >
//               Download Report
//             </button>

//             <button
//               onClick={handleReset}
//               className="text-sm text-gray-300 border px-3 py-1 rounded"
//             >
//               New Analysis
//             </button>
//           </div>
//         )}
//         </div>

//         {/* Input */}
//         <InputBox onAnalyze={handleAnalyze} isLoading={uiState === "loading"} />

//         {/* STATES */}
//         {uiState === "loading" && <Loader />}

//         {uiState === "empty" && (
//           <div className="text-center text-gray-400">
//             Enter text to analyze
//           </div>
// >>>>>>> 075452cdcc0fc0278e1d9348118ff89d9fffb089
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import InputBox from "../components/InputBox";
// import ProgressStepper from "../components/ProgressStepper";
// import SummaryStats from "../components/SummaryStats";
// import AnalyticsPanel from "../components/AnalyticsPanel";
// import ClaimsList from "../components/ClaimsList";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer";
// import { addSession } from "/historyStore";
// import { downloadPDF } from "../services/api";

// // ─── Verdict normalizer ───────────────────────────────────────────
// const mapVerdict = (v = '') => {
//   const map = {
//     'True':           'true',
//     'False':          'false',
//     'Partially True': 'partial',
//   }
//   return map[v] ?? 'unverifiable'
// }

// export default function Dashboard() {
//   const [claims, setClaims]   = useState([]);
//   const [step, setStep]       = useState(0);
//   const [uiState, setUiState] = useState("empty"); // "empty" | "loading" | "results"

//   const handleVerify = async (input) => {
//     if (!input?.trim()) return;

//     setUiState("loading");
//     setClaims([]);
//     setStep(1);

//     try {
//       setStep(2);

//       const response = await fetch("http://localhost:8000/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: input })
//       });

//       const data = await response.json();
//       setStep(3);

//       if (Array.isArray(data.claims)) {
//         // Normalise verdict casing for downstream components
//         const normalised = data.claims.map((c) => ({
//           ...c,
//           verdict: mapVerdict(c.verdict),
//         }));
//         setClaims(normalised);
//         addSession(input.trim(), data.claims); // save raw API data to history
//         setUiState("results");
//       } else {
//         setClaims([]);
//         setUiState("empty");
//       }
//     } catch (error) {
//       console.error(error);
//       setClaims([]);
//       setUiState("empty");
//     }
//   };

//   const handleReset = () => {
//     setUiState("empty");
//     setClaims([]);
//     setStep(0);
//   };

//   const stats = {
//     total: claims.length,
//     true:  claims.filter((c) => c.verdict === "true").length,
//     false: claims.filter((c) => c.verdict === "false").length,
//     reliability:
//       claims.length > 0
//         ? Math.round(
//             (claims.filter((c) => c.verdict === "true").length / claims.length) * 100
//           )
//         : 0,
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "#05090f" }}>
//       <Navbar />

//       <div className="container">

//         {/* Page header */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <div>
//             <h1 style={{
//               fontFamily: "'Orbitron', sans-serif",
//               fontSize: "1.4rem",
//               fontWeight: 700,
//               color: "#e2f0ff",
//               letterSpacing: "0.04em",
//               marginBottom: 4,
//               textShadow: "0 0 30px rgba(0,200,255,0.2)"
//             }}>
//               Fact Analyzer
//             </h1>
//             <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
//               Enter text and verify claims instantly
//             </p>
//           </div>

//           {uiState === "results" && (
//             <div style={{ display: "flex", gap: 10 }}>
//               <button
//                 onClick={() => downloadPDF(claims)}
//                 style={{
//                   padding: "7px 16px",
//                   borderRadius: 8,
//                   fontSize: "0.75rem",
//                   fontWeight: 600,
//                   background: "rgba(34,197,94,0.12)",
//                   border: "1px solid rgba(34,197,94,0.3)",
//                   color: "#4ade80",
//                   cursor: "pointer",
//                   fontFamily: "'Inter', sans-serif",
//                 }}
//               >
//                 Download Report
//               </button>
//               <button
//                 onClick={handleReset}
//                 style={{
//                   padding: "7px 16px",
//                   borderRadius: 8,
//                   fontSize: "0.75rem",
//                   fontWeight: 500,
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   color: "rgba(255,255,255,0.5)",
//                   cursor: "pointer",
//                   fontFamily: "'Inter', sans-serif",
//                 }}
//               >
//                 New Analysis
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <InputBox onVerify={handleVerify} />

//         {/* Progress stepper — only while processing */}
//         {step > 0 && uiState !== "empty" && <ProgressStepper step={step} />}

//         {/* Loading */}
//         {uiState === "loading" && <Loader />}

//         {/* Empty state */}
//         {uiState === "empty" && (
//           <div style={{
//             textAlign: "center",
//             padding: "3rem 1rem",
//             color: "rgba(255,255,255,0.22)",
//             fontFamily: "'Inter', sans-serif",
//             fontSize: "0.85rem",
//             letterSpacing: "0.04em",
//           }}>
//             Enter text above to start verifying claims
//           </div>
//         )}

//         {/* RESULTS */}
//         {uiState === "results" && results && (
//           <div className="space-y-4">
//             <AiDetectionBox probability={results.aiProbability} />

//             {results.claims.map((claim, i) => (
//               <ResultCard key={claim.id} {...claim} index={i} />
//             ))}
//           </div>
//         )}
//       </main>
      
//     </div>
//   );
// }





import { useState } from "react";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";
import ProgressStepper from "../components/ProgressStepper";
import SummaryStats from "../components/SummaryStats";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ClaimsList from "../components/ClaimsList";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { addSession } from "./HistoryStore";
import { downloadPDF } from "../services/api";

/* AI Detection Box */
function AiDetectionBox({ probability }) {
  const pct = probability || 0;
  const level = pct >= 70 ? "high" : pct >= 40 ? "medium" : "low";

  const colors = {
    high: {
      text: "text-red-400",
      bar: "from-red-600 to-red-400",
      bg: "bg-red-500/10 border-red-500/25",
      label: "Likely AI-Generated",
    },
    medium: {
      text: "text-amber-400",
      bar: "from-amber-600 to-amber-400",
      bg: "bg-amber-500/10 border-amber-500/25",
      label: "Possibly AI-Assisted",
    },
    low: {
      text: "text-emerald-400",
      bar: "from-emerald-600 to-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/25",
      label: "Likely Human-Written",
    },
  };

  const c = colors[level];

  return (
    <div className={`card p-5 border ${c.bg}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase">AI Detection</p>
          <p className={`font-semibold ${c.text}`}>{c.label}</p>
        </div>
        <p className={`text-3xl font-bold ${c.text}`}>{pct}%</p>
      </div>

      <div className="mt-3 h-2 bg-gray-700 rounded">
        <div
          className={`h-full bg-gradient-to-r ${c.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* Topic Warning */
function TopicWarning({ topic, warning }) {
  if (!warning || warning.level === "none") return null;

  const styles = {
    high: "bg-red-500/10 border-red-500/40 text-red-300",
    medium: "bg-yellow-500/10 border-yellow-500/40 text-yellow-300",
    low: "bg-blue-500/10 border-blue-500/40 text-blue-300",
  };

  return (
    <div className={`card border p-5 rounded-xl ${styles[warning.level]}`}>
      <p className="text-xs uppercase text-gray-400">Detected Topic</p>
      <h2 className="text-xl font-bold capitalize">{topic}</h2>
      <p className="mt-2 text-sm">{warning.message}</p>
    </div>
  );
}

/* Verdict mapping */
const mapVerdict = (v = "") => {
  if (v === "True") return "true";
  if (v === "False") return "false";
  if (v === "Partially True") return "partial";
  return "unverifiable";
};

export default function Dashboard() {
  const [claims, setClaims] = useState([]);
  const [step, setStep] = useState(0);
  const [uiState, setUiState] = useState("empty");
  const [aiProbability, setAiProbability] = useState(0);
  const [topic, setTopic] = useState("general");
  const [warning, setWarning] = useState(null);

  const handleVerify = async (input) => {
    if (!input?.trim()) return;

    setUiState("loading");
    setClaims([]);
    setStep(1);

    try {
      setStep(2);

      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      setStep(3);

      if (Array.isArray(data.claims)) {
        const normalized = data.claims.map((c) => ({
          ...c,
          verdict: mapVerdict(c.verdict),
        }));

        setClaims(normalized);
        setAiProbability(data?.ai_detection?.ai_probability || 0);
        setTopic(data?.topic || "general");
        setWarning(data?.warning || null);

        addSession(input.trim(), data.claims);
        setUiState("results");
      } else {
        setClaims([]);
        setUiState("empty");
      }
    } catch (err) {
      console.error(err);
      setClaims([]);
      setUiState("empty");
    }
  };

  const stats = {
    total: claims.length,
    true: claims.filter((c) => c.verdict === "true").length,
    false: claims.filter((c) => c.verdict === "false").length,
    reliability:
      claims.length > 0
        ? Math.round(
            (claims.filter((c) => c.verdict === "true").length /
              claims.length) *
              100
          )
        : 0,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05090f" }}>
      <Navbar />

      <div className="container">
        <InputBox onVerify={handleVerify} />

        {uiState === "loading" && <Loader />}

        {uiState === "results" && (
          <>
            <TopicWarning topic={topic} warning={warning} />
            <AiDetectionBox probability={aiProbability} />
            <SummaryStats stats={stats} />
            <AnalyticsPanel data={claims} />
            <ClaimsList claims={claims} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

