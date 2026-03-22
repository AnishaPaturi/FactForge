import express from "express";
import { detectLanguage, translateText } from "../utils/translate.js";
import { analyzeText } from "../services/analyzer.js"; // your existing logic

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const originalText = req.body.text;

    // 🔹 1. Detect language
    const detectedLang = await detectLanguage(originalText);

    // 🔹 2. Translate to English if needed
    let processedText = originalText;

    if (detectedLang !== "en") {
      processedText = await translateText(originalText, "en");
    }

    // 🔹 3. Run your existing pipeline
    const result = await analyzeText(processedText);

    // 🔹 4. Translate output back (important)
    let translatedClaims = result.claims;

    if (detectedLang !== "en") {
      translatedClaims = await Promise.all(
        result.claims.map(async (claim) => ({
          ...claim,
          claim: await translateText(claim.claim, detectedLang),
          explanation: await translateText(
            claim.explanation || "",
            detectedLang
          ),
        }))
      );
    }

    // 🔹 5. Send BOTH versions
    res.json({
      ...result,
      detected_language: detectedLang,
      original_text: originalText,
      processed_text: processedText,
      claims: translatedClaims,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Multilingual processing failed" });
  }
});

export default router;  