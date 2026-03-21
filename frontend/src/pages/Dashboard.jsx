import { useState } from "react";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import { analyzeText, downloadPDF } from "../services/api";

// 🔥 AI Detection Box
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

// 🔥 NEW: Topic Warning Component
function TopicWarning({ topic, warning }) {
  if (!warning || warning.level === "none") return null;

  const styles = {
    high: "bg-red-500/10 border-red-500/40 text-red-300",
    medium: "bg-yellow-500/10 border-yellow-500/40 text-yellow-300",
    low: "bg-blue-500/10 border-blue-500/40 text-blue-300",
  };

  const topicIcons = {
    health: "🧬",
    politics: "🏛️",
    technology: "💻",
    general: "🌐",
  };

  return (
    <div className={`card border p-5 rounded-xl ${styles[warning.level]}`}>
      <p className="text-xs uppercase text-gray-400">Detected Topic</p>

      <div className="flex justify-between items-center mt-1">
        <h2 className="text-xl font-bold capitalize">
          {topicIcons[topic] || "🌐"} {topic}
        </h2>
        <span className="text-xs opacity-70">
          Risk: {warning.level.toUpperCase()}
        </span>
      </div>

      <p className="mt-2 text-sm">{warning.message}</p>
    </div>
  );
}

// Verdict mapping
const mapVerdict = (v) => {
  if (v === "True") return "true";
  if (v === "False") return "false";
  if (v === "Partially True") return "partial";
  return "unverifiable";
};

export default function Dashboard() {
  const [uiState, setUiState] = useState("empty");
  const [results, setResults] = useState(null);

  const handleAnalyze = async (text) => {
    if (!text?.trim()) return;

    setUiState("loading");
    setResults(null);

    try {
      const data = await analyzeText(text);

      const formatted = {
        aiProbability: data?.ai_detection?.ai_probability || 0,
        topic: data?.topic || "general",      // 🔥 NEW
        warning: data?.warning || null,       // 🔥 NEW

        claims:
          data?.claims?.map((c, index) => ({
            id: index,
            claim: c.claim,
            verdict: mapVerdict(c.verdict),
            confidence: c.confidence,
            explanation: c.explanation,
            sources: c.sources ?? [],
            source_analysis: c.source_analysis ?? null,
          })) ?? [],
      };

      setResults(formatted);
      setUiState("results");
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
      setUiState("empty");
    }
  };

  const handleReset = () => {
    setUiState("empty");
    setResults(null);
  };

  return (
    <div className="min-h-screen dot-grid">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6 space-y-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fact Analyzer</h1>
            <p className="text-sm text-gray-400">
              Enter text and verify claims instantly
            </p>
          </div>

          {uiState === "results" && (
            <div className="flex gap-3">
              <button
                onClick={() => downloadPDF(results)}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Download Report
              </button>

              <button
                onClick={handleReset}
                className="text-sm border px-3 py-1 rounded"
              >
                New Analysis
              </button>
            </div>
          )}
        </div>

        <InputBox onAnalyze={handleAnalyze} isLoading={uiState === "loading"} />

        {uiState === "loading" && <Loader />}

        {uiState === "empty" && (
          <div className="text-center text-gray-400">
            Enter text to analyze
          </div>
        )}

        {uiState === "results" && results && (
          <div className="space-y-4">

            {/* 🔥 NEW FEATURE HERE */}
            <TopicWarning topic={results.topic} warning={results.warning} />

            <AiDetectionBox probability={results.aiProbability} />

            {results.claims.map((claim, i) => (
              <ResultCard
                key={claim.id}
                index={i}
                claim={claim.claim}
                verdict={claim.verdict}
                confidence={claim.confidence}
                explanation={claim.explanation}
                sources={claim.sources}
                source_analysis={claim.source_analysis}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}