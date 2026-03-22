
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    transition: border-color 0.25s;
  }

  .ff-inputbox:focus-within {
    border-color: rgba(0, 210, 255, 0.4);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 3px rgba(0,180,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .ff-inputbox-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0, 200, 255, 0.7);
    margin-bottom: -0.25rem;
  }

  .ff-inputbox textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 0.9rem 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: #e2f0ff;
    outline: none;
    resize: none;
    line-height: 1.6;
    transition: border-color 0.2s, background 0.2s;
  }

  .ff-inputbox textarea::placeholder {
    color: rgba(255,255,255,0.25);
  }

  .ff-inputbox textarea:focus {
    border-color: rgba(0,200,255,0.35);
    background: rgba(0,150,255,0.05);
  }

  .ff-inputbox-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    letter-spacing: 0.08em;
    color: #000;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(255,255,255,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .ff-verify-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(255,255,255,0.22);
  }

  .ff-verify-btn:active {
    transform: translateY(0);
  }

  .ff-verify-btn svg {
    flex-shrink: 0;
  }
`

export default function InputBox({ onVerify }) {
  const [text, setText] = useState("");
  const { t } = useTranslation();

  return (
    <>
      <style>{styles}</style>
      <div className="ff-inputbox">
        <span className="ff-inputbox-label">Claim Input</span>
        <textarea
          rows="4"
          placeholder={t("input_placeholder")}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="ff-inputbox-footer">
          <button className="ff-verify-btn" onClick={() => onVerify(text)}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M14 2L7.5 8.5M14 2L9.5 14L7.5 8.5M14 2L2 6.5L7.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Verify Claims
          </button>
        </div>
      </div>
    </>
  );
}