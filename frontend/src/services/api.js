import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: API_BASE,
});

// ✅ LOGIN
export const loginUser = async (data) => {
  const routes = [
    "/api/login",
    "/login",
    "/login",
    "/auth/login"
  ];

  for (let route of routes) {
    try {
      console.log("Trying route:", route);
      const res = await API.post(route, data);
      return res.data;
    } catch (err) {
      console.warn("Failed route:", route);
    }
  }

  throw new Error("All login routes failed");
};


// ✅ SIGNUP (ROBUST VERSION)
export const registerUser = async (data) => {
  const routes = [
    "/api/register",
    "/register",
    "/signup",
    "/auth/register"
  ];

  for (let route of routes) {
    try {
      console.log("Trying route:", route);
      const res = await API.post(route, data);
      return res.data;
    } catch (err) {
      console.warn("Failed route:", route);
    }
  }

  throw new Error("All register routes failed");
};

// Analyze text
export const analyzeText = async (text) => {
  const res = await API.post("/analyze", { text });
  return res.data;
};

// History
export const getHistory = async () => {
  const res = await API.get("/history");
  return res.data;
};

// PDF
export const downloadPDF = async (data) => {
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
};