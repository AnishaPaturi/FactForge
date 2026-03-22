import axios from "axios";

export const detectLanguage = async (text) => {
  const res = await axios.post("https://libretranslate.com/detect", {
    q: text,
  });
  return res.data[0]?.language || "en";
};

export const translateText = async (text, target = "en") => {
  const res = await axios.post("https://libretranslate.com/translate", {
    q: text,
    source: "auto",
    target,
    format: "text",
  });

  return res.data.translatedText;
};