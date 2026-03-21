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