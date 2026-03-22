import { useState, useRef } from "react";

const styles = `
  .ff-inputbox {
    background: rgba(4, 14, 28, 0.75);
    border: 1px solid rgba(0, 200, 255, 0.15);
    border-radius: 16px;
    padding: 1.25rem;
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ff-inputbox-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0, 200, 255, 0.7);
  }

  .ff-inputbox textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 0.9rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #e2f0ff;
    outline: none;
    resize: none;
  }

  .ff-inputbox-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }

  .ff-verify-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.7rem 1.6rem;
    border: none;
    border-radius: 50px;
    background: #fff;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #000;
    cursor: pointer;
  }

  /* 🔥 Voice button matches style */
  .ff-voice-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.7rem 1.4rem;
    border-radius: 50px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.2);
    font-family: 'Orbitron', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    color: #e2f0ff;
    cursor: pointer;
    transition: all 0.2s;
  }

  .ff-voice-btn:hover {
    background: rgba(255,255,255,0.15);
    transform: translateY(-1px);
  }

  .ff-voice-btn.active {
    background: rgba(239,68,68,0.15);
    border-color: rgba(239,68,68,0.4);
    color: #f87171;
    box-shadow: 0 0 18px rgba(239,68,68,0.25);
  }
`;

export default function InputBox({ onVerify }) {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const silenceTimer = useRef(null);

  const toggleListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    // Stop if already listening
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognitionRef.current = recognition;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setText(transcript);

      // auto-stop after silence
      clearTimeout(silenceTimer.current);
      silenceTimer.current = setTimeout(() => {
        recognition.stop();
        setListening(false);
      }, 3000);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };


  return (
    <>
      <style>{styles}</style>

      <div className="ff-inputbox">
        <span className="ff-inputbox-label">Claim Input</span>

        <textarea
          rows="4"
          placeholder="Paste text or URL to verify..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="ff-inputbox-footer">

          {/* 🎤 VOICE BUTTON */}
          <button
            className={`ff-voice-btn ${listening ? "active" : ""}`}
            onClick={toggleListening}
          >
            {/* ChatGPT-style mic icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V6a3 3 0 0 1 3-3Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M19 11a7 7 0 0 1-14 0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="18"
                x2="12"
                y2="21"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>

            {listening ? "Listening..." : "Voice"}
          </button>

          {/* VERIFY BUTTON */}
          <button className="ff-verify-btn" onClick={() => onVerify(text)}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 2L7.5 8.5M14 2L9.5 14L7.5 8.5M14 2L2 6.5L7.5 8.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verify Claims
          </button>

        </div>
      </div>
    </>
  );
}