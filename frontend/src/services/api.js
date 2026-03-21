import axios from "axios";

const API = axios.create({
  baseURL: "https://factforge-api.onrender.com",
});

export const analyzeText = async (text) => {
  const res = await API.post("/analyze", { text });
  return res.data;
};

export const getHistory = async () => {
  const res = await API.get("/history");
  return res.data;
};

export const downloadPDF = async (data) => {
  const response = await fetch("https://factforge-api.onrender.com/generate-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "FactForge_Report.pdf";
  a.click();
};