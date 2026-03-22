import axios from "axios";

// Use env variable instead of hardcoding
const API_BASE = import.meta.env.VITE_API_URL;

// Axios instance
const API = axios.create({
  baseURL: API_BASE,
});

export const loginUser = async (email, password) => {
  const res = await API.post("/login", { email, password });
  return res.data;
};

// Analyze text
export const analyzeText = async (text) => {
  const res = await API.post("/analyze", { text });
  return res.data;
};

// Get history
export const getHistory = async () => {
  const res = await API.get("/history");
  return res.data;
};

// Download PDF
export const downloadPDF = async (data) => {
  const response = await fetch(`${API_BASE}/generate-pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate PDF");
  }

  const blob = await response.blob();

  if (blob.type !== "application/pdf") {
    throw new Error("Invalid PDF response");
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "FactForge_Report.pdf";
  a.click();
};