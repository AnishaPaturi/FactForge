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



import { useState } from "react";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";
import ProgressStepper from "../components/ProgressStepper";
import SummaryStats from "../components/SummaryStats";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ClaimsList from "../components/ClaimsList";
import Footer from "../components/Footer";
import { addSession } from "./HistoryStore";  // ← same folder

export default function Dashboard() {
  const [claims, setClaims] = useState([]);
  const [step, setStep] = useState(0);

  const handleVerify = async (input) => {
    if (!input?.trim()) return;
    setStep(1);
    try {
      setStep(2);
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input })
      });
      const data = await response.json();
      setStep(3);

      if (Array.isArray(data.claims)) {
        setClaims(data.claims);
        addSession(input.trim(), data.claims); // ← save to history
      } else {
        setClaims([]);
      }
    } catch (error) {
      console.error(error);
      setClaims([]);
    }
  };

  const stats = {
    total: claims.length,
    true: claims.filter((c) => c.verdict === "True").length,
    false: claims.filter((c) => c.verdict === "False").length,
    reliability:
      claims.length > 0
        ? Math.round(
            (claims.filter((c) => c.verdict === "True").length / claims.length) * 100
          )
        : 0
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05090f" }}>
      <Navbar />
      <div className="container">
        <InputBox onVerify={handleVerify} />
        {step > 0 && <ProgressStepper step={step} />}
        {claims.length > 0 && (
          <>
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