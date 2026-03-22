import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import InputBox from "../components/InputBox";
import ProgressStepper from "../components/ProgressStepper";
import SummaryStats from "../components/SummaryStats";
import AnalyticsPanel from "../components/AnalyticsPanel";
import ClaimsList from "../components/ClaimsList";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { addSession } from "./historyStore.js";
import { downloadPDF } from "../services/api";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation(); // ✅ IMPORTANT

  const [claims, setClaims] = useState([]);
  const [step, setStep] = useState(0);
  const [uiState, setUiState] = useState("empty");
  const [aiProbability, setAiProbability] = useState(0);
  const [topic, setTopic] = useState("general");
  const [warning, setWarning] = useState(null);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const location = useLocation();

  const handleVerify = async (input) => {
    if (!input?.trim()) return;
    setInputText(input.trim());
    setUiState("loading");
    setClaims([]);

    try {
      const API_BASE = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      if (Array.isArray(data.claims)) {
        setClaims(data.claims);
        setAiProbability(data?.ai_detection?.ai_probability || 0);
        setTopic(data?.topic || "general");
        setWarning(data?.warning || null);
        addSession(input.trim(), data.claims);
        setUiState("results");
      } else {
        setUiState("empty");
      }
    } catch (err) {
      console.error(err);
      setUiState("empty");
    }
  };

  const handleReset = () => {
    setUiState("empty");
    setClaims([]);
    setInputText("");
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      {uiState !== "results" && (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1>
            {t("hero_title_line1")} <br />
            <span>{t("hero_title_line2")}</span>
          </h1>

          <p>{t("hero_sub")}</p>

          <InputBox onVerify={handleVerify} />
        </div>
      )}

      {/* LOADING */}
      {uiState === "loading" && <Loader />}

      {/* RESULTS */}
      {uiState === "results" && (
        <div style={{ padding: "2rem" }}>
          <h2>
            {t("analysis_results")} ({claims.length})
          </h2>

          <button onClick={() => downloadPDF(claims)}>
            {t("download_report")}
          </button>

          <button onClick={handleReset}>
            {t("new_analysis")}
          </button>

          <SummaryStats stats={{ total: claims.length }} />

          <div>
            <button onClick={() => setActiveTab("analysis")}>
              {t("view_analysis")}
            </button>

            <button onClick={() => setActiveTab("claims")}>
              {t("view_claims")}
            </button>
          </div>

          {activeTab === "analysis" && (
            <AnalyticsPanel data={claims} />
          )}

          {activeTab === "claims" && (
            <ClaimsList claims={claims} />
          )}
        </div>
      )}

      <Footer />
    </>
  );
}