import axios from "axios";

const API = axios.create({
  baseURL: "https://factforge-api.onrender.com",
});

// Analyze
export const analyzeText = async (text) => {
  const response = await API.post("/analyze", { text });
  return response.data;
};

// History
export const getHistory = async () => {
  const response = await API.get("/history");
  return response.data;
};