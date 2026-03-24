import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_BASE,
});

// ✅ LOGIN (CLEAN)
export const loginUser = async (data) => {
  try {
    const res = await API.post("/login", data);
    return res.data;
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ REGISTER (CLEAN)
export const registerUser = async (data) => {
  try {
    const res = await API.post("/register", data);
    return res.data;
  } catch (err) {
    console.error("Register Error:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ ANALYZE TEXT
export const analyzeText = async (text) => {
  try {
    const res = await API.post("/analyze", { text });
    return res.data;
  } catch (err) {
    console.error("Analyze Error:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ HISTORY
export const getHistory = async () => {
  try {
    const res = await API.get("/history");
    return res.data;
  } catch (err) {
    console.error("History Error:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ PDF DOWNLOAD
export const downloadPDF = async (data) => {
  try {
    const response = await fetch(`${API_BASE}/generate-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to generate PDF");

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "FactForge_Report.pdf";
    a.click();
  } catch (err) {
    console.error("PDF Error:", err.message);
    throw err;
  }
};