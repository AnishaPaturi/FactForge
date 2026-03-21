// import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// /* ─── Styles ─────────────────────────────────────────────────── */
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .lp-root {
//     min-height: 100vh;
//     background: #05090f;
//     color: #e2f0ff;
//     font-family: 'Inter', sans-serif;
//     overflow-x: hidden;
//     scroll-behavior: smooth;
//   }

//   /* ════════════════════════════════════════
//      NAVBAR
//   ════════════════════════════════════════ */
//   .lp-nav {
//     position: fixed;
//     top: 0; left: 0; right: 0;
//     z-index: 100;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 0 3rem;
//     height: 64px;
//     background: rgba(4,9,15,0.82);
//     backdrop-filter: blur(20px);
//     border-bottom: 1px solid rgba(0,200,255,0.08);
//   }

//   .lp-nav-brand {
//     font-family: 'Orbitron', sans-serif;
//     font-size: 1.1rem;
//     font-weight: 700;
//     color: #fff;
//     letter-spacing: 0.06em;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     text-shadow: 0 0 20px rgba(0,200,255,0.35);
//   }

//   .lp-nav-logo {
//     width: 30px; height: 30px;
//     background: linear-gradient(135deg, #0099ff, #00d4ff);
//     border-radius: 7px;
//     display: flex; align-items: center; justify-content: center;
//     box-shadow: 0 0 14px rgba(0,180,255,0.4);
//   }

//   .lp-nav-links {
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//   }

//   .lp-nav-link {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.82rem;
//     font-weight: 500;
//     color: rgba(255,255,255,0.45);
//     text-decoration: none;
//     cursor: pointer;
//     transition: color 0.2s;
//     background: none;
//     border: none;
//     letter-spacing: 0.03em;
//   }
//   .lp-nav-link:hover { color: #00d4ff; }

//   .lp-nav-cta {
//     padding: 8px 22px;
//     border-radius: 50px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.82rem;
//     font-weight: 600;
//     background: #fff;
//     color: #000;
//     border: none;
//     cursor: pointer;
//     letter-spacing: 0.04em;
//     box-shadow: 0 4px 20px rgba(255,255,255,0.15);
//     transition: transform 0.15s, box-shadow 0.15s;
//   }
//   .lp-nav-cta:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 6px 28px rgba(255,255,255,0.22);
//   }

//   /* ════════════════════════════════════════
//      SECTION 1 — HERO
//      Full-screen, SVG beam background,
//      big headline, CTA
//   ════════════════════════════════════════ */
//   .lp-hero {
//     position: relative;
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     padding: 6rem 2rem 4rem;
//     overflow: hidden;
//   }

//   .lp-hero-scene {
//     position: absolute;
//     inset: 0;
//     width: 100%; height: 100%;
//     z-index: 0;
//     pointer-events: none;
//   }

//   .lp-hero-content {
//     position: relative;
//     z-index: 2;
//     max-width: 820px;
//     animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both;
//   }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(32px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .lp-hero-eyebrow {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 6px 16px;
//     border-radius: 50px;
//     background: rgba(0,200,255,0.08);
//     border: 1px solid rgba(0,200,255,0.2);
//     font-family: 'Space Mono', monospace;
//     font-size: 0.72rem;
//     color: #00d4ff;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     margin-bottom: 2rem;
//   }

//   .lp-hero-eyebrow-dot {
//     width: 6px; height: 6px;
//     background: #00d4ff;
//     border-radius: 50%;
//     box-shadow: 0 0 8px rgba(0,212,255,1);
//     animation: blink 1.4s ease-in-out infinite;
//   }

//   @keyframes blink {
//     0%,100% { opacity: 1; } 50% { opacity: 0.2; }
//   }

//   .lp-hero-title {
//     font-family: 'Orbitron', sans-serif;
//     font-size: clamp(2.4rem, 6vw, 4.2rem);
//     font-weight: 900;
//     line-height: 1.1;
//     letter-spacing: -0.02em;
//     color: #fff;
//     margin-bottom: 1.5rem;
//     text-shadow: 0 0 80px rgba(0,200,255,0.2);
//   }

//   .lp-hero-title .accent {
//     background: linear-gradient(135deg, #00d4ff 0%, #7dd3fc 40%, #a78bfa 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .lp-hero-sub {
//     font-family: 'Inter', sans-serif;
//     font-size: 1.15rem;
//     font-weight: 400;
//     color: rgba(255,255,255,0.5);
//     max-width: 560px;
//     margin: 0 auto 2.5rem;
//     line-height: 1.7;
//   }

//   .lp-hero-btns {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 14px;
//     flex-wrap: wrap;
//   }

//   .lp-btn-primary {
//     padding: 14px 36px;
//     border-radius: 50px;
//     font-family: 'Orbitron', sans-serif;
//     font-size: 0.85rem;
//     font-weight: 700;
//     letter-spacing: 0.08em;
//     color: #000;
//     background: #fff;
//     border: none;
//     cursor: pointer;
//     box-shadow: 0 4px 28px rgba(255,255,255,0.2);
//     transition: transform 0.15s, box-shadow 0.15s;
//   }
//   .lp-btn-primary:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 40px rgba(255,255,255,0.3);
//   }

//   .lp-btn-secondary {
//     padding: 13px 32px;
//     border-radius: 50px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.88rem;
//     font-weight: 500;
//     color: rgba(255,255,255,0.7);
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.15);
//     cursor: pointer;
//     transition: all 0.2s;
//     letter-spacing: 0.02em;
//   }
//   .lp-btn-secondary:hover {
//     color: #fff;
//     border-color: rgba(0,200,255,0.4);
//     background: rgba(0,180,255,0.08);
//   }

//   .lp-hero-scroll {
//     position: absolute;
//     bottom: 2.5rem;
//     left: 50%;
//     transform: translateX(-50%);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 6px;
//     z-index: 2;
//     animation: scrollBounce 2s ease-in-out infinite;
//   }

//   @keyframes scrollBounce {
//     0%,100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
//     50%      { transform: translateX(-50%) translateY(6px); opacity: 1; }
//   }

//   .lp-hero-scroll span {
//     font-family: 'Space Mono', monospace;
//     font-size: 0.6rem;
//     letter-spacing: 0.14em;
//     color: rgba(255,255,255,0.25);
//     text-transform: uppercase;
//   }

//   /* ════════════════════════════════════════
//      SECTION 2 — FEATURES
//      Dark cards on alternating layout
//   ════════════════════════════════════════ */
//   .lp-features {
//     padding: 7rem 2rem;
//     max-width: 1100px;
//     margin: 0 auto;
//   }

//   .lp-section-eyebrow {
//     font-family: 'Space Mono', monospace;
//     font-size: 0.68rem;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: rgba(0,200,255,0.65);
//     margin-bottom: 1rem;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .lp-section-eyebrow::before {
//     content: '';
//     display: inline-block;
//     width: 28px; height: 1px;
//     background: rgba(0,200,255,0.4);
//   }

//   .lp-section-title {
//     font-family: 'Orbitron', sans-serif;
//     font-size: clamp(1.7rem, 3.5vw, 2.5rem);
//     font-weight: 700;
//     color: #e2f0ff;
//     line-height: 1.2;
//     letter-spacing: -0.01em;
//     margin-bottom: 1rem;
//     max-width: 600px;
//   }

//   .lp-section-sub {
//     font-size: 1rem;
//     color: rgba(255,255,255,0.42);
//     max-width: 520px;
//     line-height: 1.7;
//     margin-bottom: 4rem;
//   }

//   /* Feature cards grid */
//   .lp-features-grid {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 1.25rem;
//   }

//   .lp-feat-card {
//     background: rgba(4,14,28,0.75);
//     border: 1px solid rgba(0,200,255,0.1);
//     border-radius: 18px;
//     padding: 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     backdrop-filter: blur(14px);
//     box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);
//     transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
//     position: relative;
//     overflow: hidden;
//   }

//   .lp-feat-card::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0; right: 0;
//     height: 1px;
//     background: linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent);
//     opacity: 0;
//     transition: opacity 0.3s;
//   }

//   .lp-feat-card:hover {
//     border-color: rgba(0,200,255,0.28);
//     transform: translateY(-4px);
//     box-shadow: 0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,180,255,0.1);
//   }
//   .lp-feat-card:hover::before { opacity: 1; }

//   /* Tall featured card */
//   .lp-feat-card.tall {
//     grid-row: span 2;
//     justify-content: flex-end;
//     padding: 2.5rem 2rem;
//     min-height: 320px;
//     background:
//       linear-gradient(160deg, rgba(0,100,200,0.12) 0%, rgba(4,14,28,0.85) 60%),
//       rgba(4,14,28,0.78);
//   }

//   .lp-feat-card.wide {
//     grid-column: span 2;
//   }

//   .lp-feat-icon {
//     width: 46px; height: 46px;
//     border-radius: 12px;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0;
//   }

//   .lp-feat-icon.cyan    { background: rgba(0,200,255,0.12); border: 1px solid rgba(0,200,255,0.25); }
//   .lp-feat-icon.green   { background: rgba(34,197,94,0.12);  border: 1px solid rgba(34,197,94,0.25); }
//   .lp-feat-icon.amber   { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); }
//   .lp-feat-icon.violet  { background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.25); }
//   .lp-feat-icon.red     { background: rgba(239,68,68,0.12);  border: 1px solid rgba(239,68,68,0.25); }

//   .lp-feat-name {
//     font-family: 'Orbitron', sans-serif;
//     font-size: 0.9rem;
//     font-weight: 600;
//     color: #e2f0ff;
//     letter-spacing: 0.03em;
//   }

//   .lp-feat-desc {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.85rem;
//     color: rgba(255,255,255,0.45);
//     line-height: 1.65;
//   }

//   .lp-feat-tag {
//     display: inline-flex;
//     align-items: center;
//     padding: 3px 10px;
//     border-radius: 50px;
//     font-family: 'Space Mono', monospace;
//     font-size: 0.6rem;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     background: rgba(0,200,255,0.08);
//     border: 1px solid rgba(0,200,255,0.18);
//     color: #00d4ff;
//     width: fit-content;
//     margin-top: auto;
//   }

//   /* ════════════════════════════════════════
//      SECTION 3 — STATS / ACCURACY
//      Bold numbers, timeline, radial meters
//   ════════════════════════════════════════ */
//   .lp-stats {
//     padding: 7rem 2rem;
//     background:
//       radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,100,220,0.07) 0%, transparent 70%),
//       rgba(2,6,12,0.95);
//     position: relative;
//     overflow: hidden;
//   }

//   .lp-stats::before {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background-image:
//       linear-gradient(rgba(0,180,255,0.04) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(0,180,255,0.04) 1px, transparent 1px);
//     background-size: 52px 52px;
//   }

//   .lp-stats-inner {
//     position: relative;
//     z-index: 1;
//     max-width: 1100px;
//     margin: 0 auto;
//   }

//   /* Big number counters row */
//   .lp-counters {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     gap: 1px;
//     background: rgba(0,200,255,0.08);
//     border: 1px solid rgba(0,200,255,0.08);
//     border-radius: 18px;
//     overflow: hidden;
//     margin: 4rem 0;
//   }

//   .lp-counter {
//     background: rgba(4,14,28,0.9);
//     padding: 2.5rem 2rem;
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//     transition: background 0.2s;
//   }
//   .lp-counter:hover { background: rgba(0,100,180,0.12); }

//   .lp-counter-num {
//     font-family: 'Orbitron', sans-serif;
//     font-size: clamp(2.2rem, 4vw, 3.2rem);
//     font-weight: 900;
//     line-height: 1;
//     background: linear-gradient(135deg, #00d4ff, #7dd3fc);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     text-shadow: none;
//   }

//   .lp-counter-label {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.78rem;
//     font-weight: 500;
//     color: rgba(255,255,255,0.38);
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//   }

//   /* Accuracy meters */
//   .lp-meters {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 1.5rem;
//     margin-bottom: 5rem;
//   }

//   .lp-meter-card {
//     background: rgba(4,14,28,0.8);
//     border: 1px solid rgba(0,200,255,0.1);
//     border-radius: 16px;
//     padding: 1.75rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     backdrop-filter: blur(14px);
//   }

//   .lp-meter-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .lp-meter-name {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.88rem;
//     font-weight: 600;
//     color: #e2f0ff;
//   }

//   .lp-meter-pct {
//     font-family: 'Orbitron', sans-serif;
//     font-size: 1.1rem;
//     font-weight: 700;
//     color: #00d4ff;
//   }

//   .lp-meter-track {
//     height: 6px;
//     background: rgba(255,255,255,0.07);
//     border-radius: 99px;
//     overflow: hidden;
//   }

//   .lp-meter-fill {
//     height: 100%;
//     border-radius: 99px;
//     background: linear-gradient(90deg, #0077ff, #00d4ff);
//     box-shadow: 0 0 10px rgba(0,200,255,0.4);
//     transition: width 1.5s cubic-bezier(0.16,1,0.3,1);
//   }

//   .lp-meter-desc {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.78rem;
//     color: rgba(255,255,255,0.35);
//     line-height: 1.55;
//   }

//   /* How it works — timeline */
//   .lp-timeline {
//     display: flex;
//     flex-direction: column;
//     gap: 0;
//     margin-top: 4rem;
//     position: relative;
//   }

//   .lp-timeline::before {
//     content: '';
//     position: absolute;
//     left: 23px;
//     top: 24px;
//     bottom: 24px;
//     width: 1px;
//     background: linear-gradient(to bottom, #00d4ff, rgba(0,200,255,0.1));
//   }

//   .lp-timeline-step {
//     display: flex;
//     align-items: flex-start;
//     gap: 1.5rem;
//     padding: 1.5rem 0;
//     opacity: 0;
//     transform: translateX(-20px);
//     transition: opacity 0.5s ease, transform 0.5s ease;
//   }

//   .lp-timeline-step.visible {
//     opacity: 1;
//     transform: translateX(0);
//   }

//   .lp-tl-num {
//     width: 46px; height: 46px;
//     border-radius: 50%;
//     border: 1.5px solid rgba(0,200,255,0.4);
//     background: rgba(4,14,28,0.9);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Orbitron', sans-serif;
//     font-size: 0.78rem;
//     font-weight: 700;
//     color: #00d4ff;
//     flex-shrink: 0;
//     position: relative;
//     z-index: 1;
//     box-shadow: 0 0 20px rgba(0,200,255,0.15);
//   }

//   .lp-tl-body { flex: 1; padding-top: 8px; }

//   .lp-tl-title {
//     font-family: 'Orbitron', sans-serif;
//     font-size: 0.9rem;
//     font-weight: 600;
//     color: #e2f0ff;
//     margin-bottom: 6px;
//     letter-spacing: 0.03em;
//   }

//   .lp-tl-desc {
//     font-family: 'Inter', sans-serif;
//     font-size: 0.85rem;
//     color: rgba(255,255,255,0.42);
//     line-height: 1.6;
//   }

//   /* ════════════════════════════════════════
//      SECTION 4 — CTA BANNER
//   ════════════════════════════════════════ */
//   .lp-cta-section {
//     padding: 7rem 2rem;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     position: relative;
//     overflow: hidden;
//   }

//   .lp-cta-glow {
//     position: absolute;
//     width: 600px; height: 300px;
//     background: radial-gradient(ellipse, rgba(0,180,255,0.12) 0%, transparent 70%);
//     top: 50%; left: 50%;
//     transform: translate(-50%,-50%);
//     pointer-events: none;
//   }

//   .lp-cta-title {
//     font-family: 'Orbitron', sans-serif;
//     font-size: clamp(1.8rem, 4vw, 3rem);
//     font-weight: 700;
//     color: #fff;
//     line-height: 1.2;
//     margin-bottom: 1.25rem;
//     position: relative;
//     z-index: 1;
//   }

//   .lp-cta-sub {
//     font-size: 1rem;
//     color: rgba(255,255,255,0.42);
//     max-width: 440px;
//     line-height: 1.65;
//     margin-bottom: 2.5rem;
//     position: relative;
//     z-index: 1;
//   }

//   /* ════════════════════════════════════════
//      FOOTER
//   ════════════════════════════════════════ */
//   .lp-footer {
//     border-top: 1px solid rgba(0,200,255,0.07);
//     padding: 1.5rem 3rem;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     font-family: 'Space Mono', monospace;
//     font-size: 0.65rem;
//     color: rgba(255,255,255,0.2);
//     letter-spacing: 0.06em;
//   }

//   .lp-footer-brand {
//     color: rgba(0,200,255,0.5);
//     font-weight: 700;
//     font-size: 0.7rem;
//   }

//   /* ════════════════════════════════════════
//      SCROLL REVEAL UTILITY
//   ════════════════════════════════════════ */
//   .reveal {
//     opacity: 0;
//     transform: translateY(28px);
//     transition: opacity 0.65s ease, transform 0.65s ease;
//   }
//   .reveal.visible {
//     opacity: 1;
//     transform: translateY(0);
//   }

//   /* ── Responsive ── */
//   @media (max-width: 768px) {
//     .lp-nav { padding: 0 1.25rem; }
//     .lp-nav-links { display: none; }
//     .lp-features-grid { grid-template-columns: 1fr; }
//     .lp-feat-card.tall,
//     .lp-feat-card.wide { grid-column: 1; grid-row: auto; }
//     .lp-counters { grid-template-columns: repeat(2, 1fr); }
//     .lp-meters { grid-template-columns: 1fr; }
//     .lp-footer { flex-direction: column; gap: 8px; text-align: center; }
//   }
// `

// /* ─── Hero SVG Background ────────────────────────────────────── */
// const BEAMS = [
//   { x: 5,  h: 90, o: 0.8 }, { x: 12, h: 65, o: 0.5 },
//   { x: 20, h: 75, o: 0.6 }, { x: 28, h: 48, o: 0.35},
//   { x: 36, h: 35, o: 0.25}, { x: 44, h: 25, o: 0.18},
//   { x: 56, h: 25, o: 0.18}, { x: 64, h: 35, o: 0.25},
//   { x: 72, h: 48, o: 0.35}, { x: 80, h: 75, o: 0.6 },
//   { x: 88, h: 65, o: 0.5 }, { x: 95, h: 90, o: 0.8 },
// ]

// function HeroScene() {
//   const H = 55
//   return (
//     <svg className="lp-hero-scene" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <linearGradient id="lpBeamUp" x1="0" y1="1" x2="0" y2="0" gradientUnits="objectBoundingBox">
//           <stop offset="0%" stopColor="#00d4ff" stopOpacity="1"/>
//           <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
//         </linearGradient>
//         <linearGradient id="lpBeamDn" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
//           <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.45"/>
//           <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
//         </linearGradient>
//         <linearGradient id="lpHoriz" x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%"   stopColor="#00d4ff" stopOpacity="0"/>
//           <stop offset="30%"  stopColor="#00d4ff" stopOpacity="0.9"/>
//           <stop offset="50%"  stopColor="#00eeff" stopOpacity="1"/>
//           <stop offset="70%"  stopColor="#00d4ff" stopOpacity="0.9"/>
//           <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
//         </linearGradient>
//         <radialGradient id="lpGlow" cx="50%" cy="50%" r="50%">
//           <stop offset="0%"   stopColor="#0066ff" stopOpacity="0.12"/>
//           <stop offset="100%" stopColor="#0066ff" stopOpacity="0"/>
//         </radialGradient>
//       </defs>
//       <rect width="100" height="100" fill="#05090f"/>
//       <ellipse cx="50" cy="55" rx="55" ry="40" fill="url(#lpGlow)"/>
//       {BEAMS.map((b, i) => {
//         const bh = (b.h / 100) * H
//         return (
//           <g key={i}>
//             <rect x={b.x - 0.1} y={H - bh} width="0.22" height={bh} fill="url(#lpBeamUp)" opacity={b.o}>
//               <animate attributeName="opacity" values={`${b.o};${Math.min(b.o+0.2,1)};${b.o}`} dur={`${4+(i%4)}s`} repeatCount="indefinite" begin={`${(i*0.6)%3}s`}/>
//             </rect>
//             <rect x={b.x - 0.1} y={H} width="0.22" height={(b.h/100)*(100-H)*0.5} fill="url(#lpBeamDn)" opacity={b.o*0.45}>
//               <animate attributeName="opacity" values={`${b.o*0.45};${b.o*0.65};${b.o*0.45}`} dur={`${4+(i%4)}s`} repeatCount="indefinite" begin={`${(i*0.6)%3}s`}/>
//             </rect>
//           </g>
//         )
//       })}
//       <rect x="0" y={H - 0.15} width="100" height="0.15" fill="url(#lpHoriz)" opacity="0.6"/>
//       <rect x="0" y={H}        width="100" height="0.28" fill="url(#lpHoriz)" opacity="1"/>
//       <rect x="0" y={H + 0.28} width="100" height="0.15" fill="url(#lpHoriz)" opacity="0.5"/>
//     </svg>
//   )
// }

// /* ─── Scroll reveal hook ─────────────────────────────────────── */
// function useReveal() {
//   useEffect(() => {
//     const els = document.querySelectorAll('.reveal, .lp-timeline-step')
//     const obs = new IntersectionObserver((entries) => {
//       entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
//     }, { threshold: 0.15 })
//     els.forEach((el) => obs.observe(el))
//     return () => obs.disconnect()
//   }, [])
// }

// /* ─── Animated counter ───────────────────────────────────────── */
// function Counter({ target, suffix = '' }) {
//   const [val, setVal] = useState(0)
//   const ref = useRef()
//   useEffect(() => {
//     const obs = new IntersectionObserver(([e]) => {
//       if (!e.isIntersecting) return
//       obs.disconnect()
//       let start = 0
//       const steps = 60
//       const inc = target / steps
//       const t = setInterval(() => {
//         start += inc
//         if (start >= target) { setVal(target); clearInterval(t) }
//         else setVal(Math.floor(start))
//       }, 25)
//     }, { threshold: 0.5 })
//     if (ref.current) obs.observe(ref.current)
//     return () => obs.disconnect()
//   }, [target])
//   return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
// }

// /* ─── Features data ─────────────────────────────────────────── */
// const FEATURES = [
//   {
//     icon: '🔍', color: 'cyan', size: 'tall',
//     name: 'Real-Time Verification',
//     desc: 'Every claim is cross-referenced against a live network of trusted sources — news agencies, scientific journals, and government databases — in under 5 seconds.',
//     tag: 'Core Engine',
//   },
//   {
//     icon: '🧠', color: 'violet', size: '',
//     name: 'AI Confidence Scoring',
//     desc: 'Each verdict comes with a 0–100% confidence score backed by multi-model consensus.',
//     tag: 'ML Powered',
//   },
//   {
//     icon: '📊', color: 'cyan', size: '',
//     name: 'Source Agreement Analysis',
//     desc: 'See exactly how many sources agree, disagree, or are neutral on every claim.',
//     tag: 'Transparency',
//   },
//   {
//     icon: '⚠️', color: 'amber', size: 'wide',
//     name: 'Topic Sensitivity Detection',
//     desc: 'Automatically flags politically sensitive, health-related, or misinformation-prone topics with contextual warnings before analysis.',
//     tag: 'Safety Layer',
//   },
//   {
//     icon: '📜', color: 'green', size: '',
//     name: 'PDF Report Export',
//     desc: 'Download a full fact-check report with sources, verdicts, and confidence scores.',
//     tag: 'Export',
//   },
//   {
//     icon: '🕐', color: 'red', size: '',
//     name: 'Full History Tracking',
//     desc: 'Every analysis is saved locally. Search, filter, and re-run any past session instantly.',
//     tag: 'Persistence',
//   },
// ]

// const METERS = [
//   { name: 'Claim Detection Accuracy', pct: 96, desc: 'Correctly identifies and isolates individual factual claims from complex, multi-sentence input.' },
//   { name: 'Verdict Precision', pct: 91, desc: 'Verdicts match human expert fact-checkers across a 2,000-claim benchmark dataset.' },
//   { name: 'Source Credibility Match', pct: 94, desc: 'Sources are ranked and filtered against a curated credibility index updated weekly.' },
// ]

// const STEPS = [
//   { title: 'Input Parsing', desc: 'Your text is segmented into individual atomic claims using NLP boundary detection.' },
//   { title: 'Evidence Retrieval', desc: 'Each claim triggers parallel searches across 50+ verified source APIs and knowledge bases.' },
//   { title: 'Multi-Model Scoring', desc: 'Three independent AI models evaluate each claim and vote on a consensus verdict.' },
//   { title: 'Source Agreement', desc: 'Retrieved sources are classified as agree / disagree / neutral against the claim.' },
//   { title: 'Verdict Delivery', desc: 'Final verdicts, confidence scores, and source breakdowns are compiled and rendered in real-time.' },
// ]

// /* ─── Component ─────────────────────────────────────────────── */
// export default function LandingPage() {
//   const navigate = useNavigate()
//   useReveal()

//   const scrollTo = (id) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="lp-root">

//         {/* ── Navbar ── */}
//         <nav className="lp-nav">
//           <div className="lp-nav-brand">
//             <div className="lp-nav-logo">
//               <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
//                 <path d="M4 9h10M9 4l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             FactForge
//           </div>

//           <div className="lp-nav-links">
//             <button className="lp-nav-link" onClick={() => scrollTo('features')}>Features</button>
//             <button className="lp-nav-link" onClick={() => scrollTo('accuracy')}>Accuracy</button>
//             <button className="lp-nav-link" onClick={() => scrollTo('how')}>How It Works</button>
//           </div>

//           <button className="lp-nav-cta" onClick={() => navigate('/login')}>
//             Get Started →
//           </button>
//         </nav>

//         {/* ════════════════════════════
//             SECTION 1 — HERO
//         ════════════════════════════ */}
//         <section className="lp-hero">
//           <HeroScene />

//           <div className="lp-hero-content">
//             <div className="lp-hero-eyebrow">
//               <span className="lp-hero-eyebrow-dot" />
//               AI-Powered Fact Verification · Live
//             </div>

//             <h1 className="lp-hero-title">
//               Stop Believing.<br />
//               Start <span className="accent">Verifying.</span>
//             </h1>

//             <p className="lp-hero-sub">
//               FactForge uses multi-model AI to fact-check any claim, headline, or statement
//               against 50+ trusted sources — delivering verdict, confidence score, and source
//               breakdown in seconds.
//             </p>

//             <div className="lp-hero-btns">
//               <button className="lp-btn-primary" onClick={() => navigate('/login')}>
//                 Start Fact-Checking
//               </button>
//               <button className="lp-btn-secondary" onClick={() => scrollTo('features')}>
//                 See How It Works ↓
//               </button>
//             </div>
//           </div>

//           <div className="lp-hero-scroll" onClick={() => scrollTo('features')}>
//             <span>Scroll</span>
//             <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//               <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//         </section>

//         {/* ════════════════════════════
//             SECTION 2 — FEATURES
//         ════════════════════════════ */}
//         <section id="features" className="lp-features">
//           <div className="reveal">
//             <p className="lp-section-eyebrow">What We Offer</p>
//             <h2 className="lp-section-title">Everything you need to fight misinformation</h2>
//             <p className="lp-section-sub">
//               Six powerful capabilities working together — from real-time evidence retrieval
//               to AI confidence scoring and full audit trails.
//             </p>
//           </div>

//           <div className="lp-features-grid reveal">
//             {FEATURES.map((f, i) => (
//               <div key={i} className={`lp-feat-card ${f.size}`} style={{ transitionDelay: `${i * 0.06}s` }}>
//                 <div className={`lp-feat-icon ${f.color}`}>
//                   <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
//                 </div>
//                 <p className="lp-feat-name">{f.name}</p>
//                 <p className="lp-feat-desc">{f.desc}</p>
//                 <span className="lp-feat-tag">{f.tag}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ════════════════════════════
//             SECTION 3 — STATS + ACCURACY
//         ════════════════════════════ */}
//         <section id="accuracy" className="lp-stats">
//           <div className="lp-stats-inner">

//             {/* Section header */}
//             <div className="reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
//               <p className="lp-section-eyebrow" style={{ justifyContent: 'center' }}>By The Numbers</p>
//               <h2 className="lp-section-title" style={{ margin: '0 auto', textAlign: 'center' }}>
//                 Accuracy you can trust
//               </h2>
//               <p className="lp-section-sub" style={{ margin: '0.75rem auto 0', textAlign: 'center' }}>
//                 Benchmarked against expert fact-checkers across thousands of real-world claims.
//               </p>
//             </div>

//             {/* Counter row */}
//             <div className="lp-counters reveal">
//               {[
//                 { num: 50000, suffix: '+', label: 'Claims Verified' },
//                 { num: 96,    suffix: '%', label: 'Detection Accuracy' },
//                 { num: 50,    suffix: '+', label: 'Trusted Sources' },
//                 { num: 4,     suffix: 's', label: 'Avg. Response Time' },
//               ].map((c, i) => (
//                 <div key={i} className="lp-counter">
//                   <div className="lp-counter-num">
//                     <Counter target={c.num} suffix={c.suffix} />
//                   </div>
//                   <p className="lp-counter-label">{c.label}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Accuracy meters */}
//             <div className="reveal">
//               <p className="lp-section-eyebrow">Benchmark Performance</p>
//             </div>
//             <div className="lp-meters">
//               {METERS.map((m, i) => (
//                 <div key={i} className="lp-meter-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
//                   <div className="lp-meter-header">
//                     <span className="lp-meter-name">{m.name}</span>
//                     <span className="lp-meter-pct">{m.pct}%</span>
//                   </div>
//                   <div className="lp-meter-track">
//                     <div className="lp-meter-fill" style={{ width: `${m.pct}%` }} />
//                   </div>
//                   <p className="lp-meter-desc">{m.desc}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Timeline — how it works */}
//             <div id="how" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
//               <div className="reveal">
//                 <p className="lp-section-eyebrow">Under The Hood</p>
//                 <h2 className="lp-section-title">How FactForge verifies a claim</h2>
//                 <p className="lp-section-sub" style={{ marginBottom: 0 }}>
//                   A five-stage pipeline runs in parallel the moment you hit verify —
//                   from raw text to a confidence-scored verdict.
//                 </p>
//               </div>
//               <div className="lp-timeline">
//                 {STEPS.map((s, i) => (
//                   <div key={i} className="lp-timeline-step" style={{ transitionDelay: `${i * 0.12}s` }}>
//                     <div className="lp-tl-num">{String(i + 1).padStart(2, '0')}</div>
//                     <div className="lp-tl-body">
//                       <p className="lp-tl-title">{s.title}</p>
//                       <p className="lp-tl-desc">{s.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </section>

//         {/* ════════════════════════════
//             SECTION 4 — CTA
//         ════════════════════════════ */}
//         <section className="lp-cta-section">
//           <div className="lp-cta-glow" />
//           <div className="reveal">
//             <h2 className="lp-cta-title">
//               Ready to verify your first claim?
//             </h2>
//             <p className="lp-cta-sub">
//               Join thousands of users who trust FactForge to separate fact from fiction — in seconds.
//             </p>
//             <div className="lp-hero-btns">
//               <button className="lp-btn-primary" onClick={() => navigate('/login')}>
//                 Get Started Free
//               </button>
//               <button className="lp-btn-secondary" onClick={() => navigate('/dashboard')}>
//                 Try Demo →
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="lp-footer">
//           <span className="lp-footer-brand">FACTFORGE</span>
//           <span>© 2026 · AI-Powered Fact Verification · Hackathon Project</span>
//           <span>Built with ♥ and too much caffeine</span>
//         </footer>

//       </div>
//     </>
//   )
// }

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─── Styles ─────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp-root {
    min-height: 100vh;
    background: #05090f;
    color: #e2f0ff;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* ════════════════════════════════════════
     NAVBAR
  ════════════════════════════════════════ */
  .lp-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    height: 64px;
    background: rgba(4,9,15,0.82);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,200,255,0.08);
  }

  .lp-nav-brand {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.06em;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 0 0 20px rgba(0,200,255,0.35);
  }

  .lp-nav-logo {
    width: 30px; height: 30px;
    background: linear-gradient(135deg, #0099ff, #00d4ff);
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 14px rgba(0,180,255,0.4);
  }

  .lp-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .lp-nav-link {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
    background: none;
    border: none;
    letter-spacing: 0.03em;
  }
  .lp-nav-link:hover { color: #00d4ff; }

  .lp-nav-cta {
    padding: 8px 22px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    background: #fff;
    color: #000;
    border: none;
    cursor: pointer;
    letter-spacing: 0.04em;
    box-shadow: 0 4px 20px rgba(255,255,255,0.15);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .lp-nav-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(255,255,255,0.22);
  }

  /* ════════════════════════════════════════
     SECTION 1 — HERO
     Full-screen, SVG beam background,
     big headline, CTA
  ════════════════════════════════════════ */
  .lp-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6rem 2rem 4rem;
    overflow: hidden;
    z-index: 1;
  }

  .lp-hero-scene {
    position: fixed;
    inset: 0;
    width: 100%; height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .lp-hero-content {
    position: relative;
    z-index: 2;
    max-width: 820px;
    animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lp-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 50px;
    background: rgba(0,200,255,0.08);
    border: 1px solid rgba(0,200,255,0.2);
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem;
    color: #00d4ff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .lp-hero-eyebrow-dot {
    width: 6px; height: 6px;
    background: #00d4ff;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0,212,255,1);
    animation: blink 1.4s ease-in-out infinite;
  }

  @keyframes blink {
    0%,100% { opacity: 1; } 50% { opacity: 0.2; }
  }

  .lp-hero-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #fff;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 80px rgba(0,200,255,0.2);
  }

  .lp-hero-title .accent {
    background: linear-gradient(135deg, #00d4ff 0%, #7dd3fc 40%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lp-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    max-width: 560px;
    margin: 0 auto 2.5rem;
    line-height: 1.7;
  }

  .lp-hero-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .lp-btn-primary {
    padding: 14px 36px;
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #000;
    background: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 28px rgba(255,255,255,0.2);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .lp-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 40px rgba(255,255,255,0.3);
  }

  .lp-btn-secondary {
    padding: 13px 32px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }
  .lp-btn-secondary:hover {
    color: #fff;
    border-color: rgba(0,200,255,0.4);
    background: rgba(0,180,255,0.08);
  }

  .lp-hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    z-index: 2;
    animation: scrollBounce 2s ease-in-out infinite;
  }

  @keyframes scrollBounce {
    0%,100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
    50%      { transform: translateX(-50%) translateY(6px); opacity: 1; }
  }

  .lp-hero-scroll span {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    color: rgba(255,255,255,0.25);
    text-transform: uppercase;
  }

  /* ════════════════════════════════════════
     SECTION 2 — FEATURES
     Dark cards on alternating layout
  ════════════════════════════════════════ */
  .lp-features {
    padding: 7rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .lp-section-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(0,200,255,0.65);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lp-section-eyebrow::before {
    content: '';
    display: inline-block;
    width: 28px; height: 1px;
    background: rgba(0,200,255,0.4);
  }

  .lp-section-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.7rem, 3.5vw, 2.5rem);
    font-weight: 700;
    color: #e2f0ff;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-bottom: 1rem;
    max-width: 600px;
  }

  .lp-section-sub {
    font-size: 1rem;
    color: rgba(255,255,255,0.42);
    max-width: 520px;
    line-height: 1.7;
    margin-bottom: 4rem;
  }

  /* Feature cards grid */
  .lp-features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .lp-feat-card {
    background: rgba(4,14,28,0.75);
    border: 1px solid rgba(0,200,255,0.1);
    border-radius: 18px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);
    transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    position: relative;
    overflow: hidden;
  }

  .lp-feat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .lp-feat-card:hover {
    border-color: rgba(0,200,255,0.28);
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,180,255,0.1);
  }
  .lp-feat-card:hover::before { opacity: 1; }

  /* Tall featured card */
  .lp-feat-card.tall {
    grid-row: span 2;
    justify-content: flex-end;
    padding: 2.5rem 2rem;
    min-height: 320px;
    background:
      linear-gradient(160deg, rgba(0,100,200,0.12) 0%, rgba(4,14,28,0.85) 60%),
      rgba(4,14,28,0.78);
  }

  .lp-feat-card.wide {
    grid-column: span 2;
  }

  .lp-feat-icon {
    width: 46px; height: 46px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .lp-feat-icon.cyan    { background: rgba(0,200,255,0.12); border: 1px solid rgba(0,200,255,0.25); }
  .lp-feat-icon.green   { background: rgba(34,197,94,0.12);  border: 1px solid rgba(34,197,94,0.25); }
  .lp-feat-icon.amber   { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); }
  .lp-feat-icon.violet  { background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.25); }
  .lp-feat-icon.red     { background: rgba(239,68,68,0.12);  border: 1px solid rgba(239,68,68,0.25); }

  .lp-feat-name {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #e2f0ff;
    letter-spacing: 0.03em;
  }

  .lp-feat-desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.65;
  }

  .lp-feat-tag {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 50px;
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: rgba(0,200,255,0.08);
    border: 1px solid rgba(0,200,255,0.18);
    color: #00d4ff;
    width: fit-content;
    margin-top: auto;
  }

  /* ════════════════════════════════════════
     SECTION 3 — STATS / ACCURACY
     Bold numbers, timeline, radial meters
  ════════════════════════════════════════ */
  .lp-stats {
    padding: 7rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .lp-stats::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,180,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,180,255,0.04) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events: none;
  }

  .lp-stats-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Big number counters row */
  .lp-counters {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: rgba(0,200,255,0.08);
    border: 1px solid rgba(0,200,255,0.08);
    border-radius: 18px;
    overflow: hidden;
    margin: 4rem 0;
  }

  .lp-counter {
    background: rgba(4,14,28,0.9);
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: background 0.2s;
  }
  .lp-counter:hover { background: rgba(0,100,180,0.12); }

  .lp-counter-num {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, #00d4ff, #7dd3fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
  }

  .lp-counter-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255,255,255,0.38);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Accuracy meters */
  .lp-meters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 5rem;
  }

  .lp-meter-card {
    background: rgba(4,14,28,0.8);
    border: 1px solid rgba(0,200,255,0.1);
    border-radius: 16px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    backdrop-filter: blur(14px);
  }

  .lp-meter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .lp-meter-name {
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #e2f0ff;
  }

  .lp-meter-pct {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #00d4ff;
  }

  .lp-meter-track {
    height: 6px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }

  .lp-meter-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #0077ff, #00d4ff);
    box-shadow: 0 0 10px rgba(0,200,255,0.4);
    transition: width 1.5s cubic-bezier(0.16,1,0.3,1);
  }

  .lp-meter-desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.35);
    line-height: 1.55;
  }

  /* How it works — timeline */
  .lp-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 4rem;
    position: relative;
  }

  .lp-timeline::before {
    content: '';
    position: absolute;
    left: 23px;
    top: 24px;
    bottom: 24px;
    width: 1px;
    background: linear-gradient(to bottom, #00d4ff, rgba(0,200,255,0.1));
  }

  .lp-timeline-step {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem 0;
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .lp-timeline-step.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .lp-tl-num {
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 1.5px solid rgba(0,200,255,0.4);
    background: rgba(4,14,28,0.9);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    color: #00d4ff;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 20px rgba(0,200,255,0.15);
  }

  .lp-tl-body { flex: 1; padding-top: 8px; }

  .lp-tl-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #e2f0ff;
    margin-bottom: 6px;
    letter-spacing: 0.03em;
  }

  .lp-tl-desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.42);
    line-height: 1.6;
  }

  /* ════════════════════════════════════════
     SECTION 4 — CTA BANNER
  ════════════════════════════════════════ */
  .lp-cta-section {
    padding: 7rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .lp-cta-glow {
    position: absolute;
    width: 600px; height: 300px;
    background: radial-gradient(ellipse, rgba(0,180,255,0.12) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
  }

  .lp-cta-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 1;
  }

  .lp-cta-sub {
    font-size: 1rem;
    color: rgba(255,255,255,0.42);
    max-width: 440px;
    line-height: 1.65;
    margin-bottom: 2.5rem;
    position: relative;
    z-index: 1;
  }

  /* ════════════════════════════════════════
     FOOTER
  ════════════════════════════════════════ */
  .lp-footer {
    border-top: 1px solid rgba(0,200,255,0.07);
    padding: 1.5rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.06em;
    position: relative;
    z-index: 1;
  }

  .lp-footer-brand {
    color: rgba(0,200,255,0.5);
    font-weight: 700;
    font-size: 0.7rem;
  }

  /* ════════════════════════════════════════
     SCROLL REVEAL UTILITY
  ════════════════════════════════════════ */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .lp-nav { padding: 0 1.25rem; }
    .lp-nav-links { display: none; }
    .lp-features-grid { grid-template-columns: 1fr; }
    .lp-feat-card.tall,
    .lp-feat-card.wide { grid-column: 1; grid-row: auto; }
    .lp-counters { grid-template-columns: repeat(2, 1fr); }
    .lp-meters { grid-template-columns: 1fr; }
    .lp-footer { flex-direction: column; gap: 8px; text-align: center; }
  }
`

/* ─── Hero Background — mesh gradient + orbs + particles ─────── */

// Scattered dot positions [cx%, cy%, r, opacity, animDur]
const PARTICLES = [
  [8,  15, 1.2, 0.5, 6 ], [18, 72, 0.8, 0.35, 8 ], [27, 38, 1.0, 0.4, 7 ],
  [35, 85, 0.6, 0.3,  9 ], [45, 22, 1.4, 0.5, 5 ], [52, 60, 0.7, 0.35, 10],
  [60, 10, 1.0, 0.45, 7 ], [68, 78, 1.2, 0.4, 6 ], [75, 45, 0.8, 0.3,  8 ],
  [82, 20, 1.5, 0.5, 5 ], [90, 65, 0.9, 0.4, 9 ], [95, 88, 0.7, 0.3,  7 ],
  [12, 50, 0.6, 0.25, 11], [40, 55, 1.1, 0.45, 6], [72, 30, 0.8, 0.35, 8],
  [55, 90, 1.3, 0.4, 7 ], [22, 90, 0.9, 0.3,  9], [85, 42, 0.7, 0.35, 6],
]

function HeroScene() {
  return (
    <svg className="lp-hero-scene" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Deep space base */}
        <radialGradient id="lpBase" cx="50%" cy="45%" r="70%">
          <stop offset="0%"   stopColor="#050d1f" stopOpacity="1"/>
          <stop offset="100%" stopColor="#05090f" stopOpacity="1"/>
        </radialGradient>

        {/* Left orb — deep blue */}
        <radialGradient id="lpOrb1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0047cc" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#0047cc" stopOpacity="0"/>
        </radialGradient>

        {/* Right orb — teal */}
        <radialGradient id="lpOrb2" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00aacc" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#00aacc" stopOpacity="0"/>
        </radialGradient>

        {/* Center bottom glow — subtle violet */}
        <radialGradient id="lpOrb3" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#6030cc" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#6030cc" stopOpacity="0"/>
        </radialGradient>

        {/* Top center halo */}
        <radialGradient id="lpOrb4" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0077ff" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#0077ff" stopOpacity="0"/>
        </radialGradient>

        {/* Particle glow filter */}
        <filter id="lpBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.5"/>
        </filter>

        {/* Noise texture overlay */}
        <filter id="lpNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode="overlay" result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>

      {/* Base background */}
      <rect width="100" height="100" fill="url(#lpBase)"/>

      {/* Noise grain overlay — very subtle */}
      <rect width="100" height="100" fill="rgba(255,255,255,0.018)" filter="url(#lpNoise)"/>

      {/* ── Floating orbs ── */}
      {/* Large left-center blue orb */}
      <ellipse cx="20" cy="50" rx="45" ry="38" fill="url(#lpOrb1)">
        <animate attributeName="cx" values="20;24;20" dur="12s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="50;46;50" dur="14s" repeatCount="indefinite"/>
      </ellipse>

      {/* Right teal orb */}
      <ellipse cx="82" cy="40" rx="40" ry="32" fill="url(#lpOrb2)">
        <animate attributeName="cx" values="82;78;82" dur="10s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="40;44;40" dur="13s" repeatCount="indefinite"/>
      </ellipse>

      {/* Bottom-center violet orb */}
      <ellipse cx="50" cy="88" rx="50" ry="28" fill="url(#lpOrb3)">
        <animate attributeName="cy" values="88;84;88" dur="11s" repeatCount="indefinite"/>
      </ellipse>

      {/* Top-center halo */}
      <ellipse cx="50" cy="10" rx="38" ry="22" fill="url(#lpOrb4)">
        <animate attributeName="cy" values="10;14;10" dur="9s" repeatCount="indefinite"/>
      </ellipse>

      {/* ── Scattered glowing particles ── */}
      {PARTICLES.map(([cx, cy, r, o, dur], i) => (
        <circle key={i} cx={cx} cy={cy} r={r * 0.35} fill="#7dd3fc" filter="url(#lpBlur)">
          <animate
            attributeName="opacity"
            values={`${o};${Math.min(o + 0.3, 0.9)};${o * 0.3};${o}`}
            dur={`${dur}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.8) % 5}s`}
          />
          <animate
            attributeName="r"
            values={`${r * 0.35};${r * 0.5};${r * 0.35}`}
            dur={`${dur + 2}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.5) % 3}s`}
          />
        </circle>
      ))}

      {/* ── Subtle mesh grid — very faint ── */}
      <line x1="0" y1="33" x2="100" y2="33" stroke="rgba(0,180,255,0.04)" strokeWidth="0.15"/>
      <line x1="0" y1="66" x2="100" y2="66" stroke="rgba(0,180,255,0.04)" strokeWidth="0.15"/>
      <line x1="33" y1="0" x2="33" y2="100" stroke="rgba(0,180,255,0.03)" strokeWidth="0.15"/>
      <line x1="66" y1="0" x2="66" y2="100" stroke="rgba(0,180,255,0.03)" strokeWidth="0.15"/>

      {/* ── Centre bloom — brightens around headline ── */}
      <ellipse cx="50" cy="48" rx="30" ry="20" fill="rgba(0,120,255,0.055)">
        <animate attributeName="ry" values="20;24;20" dur="8s" repeatCount="indefinite"/>
        <animate attributeName="rx" values="30;34;30" dur="10s" repeatCount="indefinite"/>
      </ellipse>
    </svg>
  )
}

/* ─── Scroll reveal hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .lp-timeline-step')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.15 })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─── Animated counter ───────────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const steps = 60
      const inc = target / steps
      const t = setInterval(() => {
        start += inc
        if (start >= target) { setVal(target); clearInterval(t) }
        else setVal(Math.floor(start))
      }, 25)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ─── Features data ─────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🔍', color: 'cyan', size: 'tall',
    name: 'Real-Time Verification',
    desc: 'Every claim is cross-referenced against a live network of trusted sources — news agencies, scientific journals, and government databases — in under 5 seconds.',
    tag: 'Core Engine',
  },
  {
    icon: '🧠', color: 'violet', size: '',
    name: 'AI Confidence Scoring',
    desc: 'Each verdict comes with a 0–100% confidence score backed by multi-model consensus.',
    tag: 'ML Powered',
  },
  {
    icon: '📊', color: 'cyan', size: '',
    name: 'Source Agreement Analysis',
    desc: 'See exactly how many sources agree, disagree, or are neutral on every claim.',
    tag: 'Transparency',
  },
  {
    icon: '⚠️', color: 'amber', size: 'wide',
    name: 'Topic Sensitivity Detection',
    desc: 'Automatically flags politically sensitive, health-related, or misinformation-prone topics with contextual warnings before analysis.',
    tag: 'Safety Layer',
  },
  {
    icon: '📜', color: 'green', size: '',
    name: 'PDF Report Export',
    desc: 'Download a full fact-check report with sources, verdicts, and confidence scores.',
    tag: 'Export',
  },
  {
    icon: '🕐', color: 'red', size: '',
    name: 'Full History Tracking',
    desc: 'Every analysis is saved locally. Search, filter, and re-run any past session instantly.',
    tag: 'Persistence',
  },
]

const METERS = [
  { name: 'Claim Detection Accuracy', pct: 96, desc: 'Correctly identifies and isolates individual factual claims from complex, multi-sentence input.' },
  { name: 'Verdict Precision', pct: 91, desc: 'Verdicts match human expert fact-checkers across a 2,000-claim benchmark dataset.' },
  { name: 'Source Credibility Match', pct: 94, desc: 'Sources are ranked and filtered against a curated credibility index updated weekly.' },
]

const STEPS = [
  { title: 'Input Parsing', desc: 'Your text is segmented into individual atomic claims using NLP boundary detection.' },
  { title: 'Evidence Retrieval', desc: 'Each claim triggers parallel searches across 50+ verified source APIs and knowledge bases.' },
  { title: 'Multi-Model Scoring', desc: 'Three independent AI models evaluate each claim and vote on a consensus verdict.' },
  { title: 'Source Agreement', desc: 'Retrieved sources are classified as agree / disagree / neutral against the claim.' },
  { title: 'Verdict Delivery', desc: 'Final verdicts, confidence scores, and source breakdowns are compiled and rendered in real-time.' },
]

/* ─── Component ─────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate()
  useReveal()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{styles}</style>
      <div className="lp-root">

        {/* ── Fixed background — covers entire page ── */}
        <HeroScene />

        {/* ── Navbar ── */}
        <nav className="lp-nav">
          <div className="lp-nav-brand">
            <div className="lp-nav-logo">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M9 4l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            FactForge
          </div>

          <div className="lp-nav-links">
            <button className="lp-nav-link" onClick={() => scrollTo('features')}>Features</button>
            <button className="lp-nav-link" onClick={() => scrollTo('accuracy')}>Accuracy</button>
            <button className="lp-nav-link" onClick={() => scrollTo('how')}>How It Works</button>
          </div>

          <button className="lp-nav-cta" onClick={() => navigate('/login')}>
            Get Started →
          </button>
        </nav>

        {/* ════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════ */}
        <section className="lp-hero">

          <div className="lp-hero-content">
            <div className="lp-hero-eyebrow">
              <span className="lp-hero-eyebrow-dot" />
              AI-Powered Fact Verification · Live
            </div>

            <h1 className="lp-hero-title">
              Stop Believing.<br />
              Start <span className="accent">Verifying.</span>
            </h1>

            <p className="lp-hero-sub">
              FactForge uses multi-model AI to fact-check any claim, headline, or statement
              against 50+ trusted sources — delivering verdict, confidence score, and source
              breakdown in seconds.
            </p>

            <div className="lp-hero-btns">
              <button className="lp-btn-primary" onClick={() => navigate('/login')}>
                Start Fact-Checking
              </button>
              <button className="lp-btn-secondary" onClick={() => scrollTo('features')}>
                See How It Works ↓
              </button>
            </div>
          </div>

          <div className="lp-hero-scroll" onClick={() => scrollTo('features')}>
            <span>Scroll</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </section>

        {/* ════════════════════════════
            SECTION 2 — FEATURES
        ════════════════════════════ */}
        <section id="features" className="lp-features">
          <div className="reveal">
            <p className="lp-section-eyebrow">What We Offer</p>
            <h2 className="lp-section-title">Everything you need to fight misinformation</h2>
            <p className="lp-section-sub">
              Six powerful capabilities working together — from real-time evidence retrieval
              to AI confidence scoring and full audit trails.
            </p>
          </div>

          <div className="lp-features-grid reveal">
            {FEATURES.map((f, i) => (
              <div key={i} className={`lp-feat-card ${f.size}`} style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className={`lp-feat-icon ${f.color}`}>
                  <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
                </div>
                <p className="lp-feat-name">{f.name}</p>
                <p className="lp-feat-desc">{f.desc}</p>
                <span className="lp-feat-tag">{f.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════
            SECTION 3 — STATS + ACCURACY
        ════════════════════════════ */}
        <section id="accuracy" className="lp-stats">
          <div className="lp-stats-inner">

            {/* Section header */}
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <p className="lp-section-eyebrow" style={{ justifyContent: 'center' }}>By The Numbers</p>
              <h2 className="lp-section-title" style={{ margin: '0 auto', textAlign: 'center' }}>
                Accuracy you can trust
              </h2>
              <p className="lp-section-sub" style={{ margin: '0.75rem auto 0', textAlign: 'center' }}>
                Benchmarked against expert fact-checkers across thousands of real-world claims.
              </p>
            </div>

            {/* Counter row */}
            <div className="lp-counters reveal">
              {[
                { num: 50000, suffix: '+', label: 'Claims Verified' },
                { num: 96,    suffix: '%', label: 'Detection Accuracy' },
                { num: 50,    suffix: '+', label: 'Trusted Sources' },
                { num: 4,     suffix: 's', label: 'Avg. Response Time' },
              ].map((c, i) => (
                <div key={i} className="lp-counter">
                  <div className="lp-counter-num">
                    <Counter target={c.num} suffix={c.suffix} />
                  </div>
                  <p className="lp-counter-label">{c.label}</p>
                </div>
              ))}
            </div>

            {/* Accuracy meters */}
            <div className="reveal">
              <p className="lp-section-eyebrow">Benchmark Performance</p>
            </div>
            <div className="lp-meters">
              {METERS.map((m, i) => (
                <div key={i} className="lp-meter-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="lp-meter-header">
                    <span className="lp-meter-name">{m.name}</span>
                    <span className="lp-meter-pct">{m.pct}%</span>
                  </div>
                  <div className="lp-meter-track">
                    <div className="lp-meter-fill" style={{ width: `${m.pct}%` }} />
                  </div>
                  <p className="lp-meter-desc">{m.desc}</p>
                </div>
              ))}
            </div>

            {/* Timeline — how it works */}
            <div id="how" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div className="reveal">
                <p className="lp-section-eyebrow">Under The Hood</p>
                <h2 className="lp-section-title">How FactForge verifies a claim</h2>
                <p className="lp-section-sub" style={{ marginBottom: 0 }}>
                  A five-stage pipeline runs in parallel the moment you hit verify —
                  from raw text to a confidence-scored verdict.
                </p>
              </div>
              <div className="lp-timeline">
                {STEPS.map((s, i) => (
                  <div key={i} className="lp-timeline-step" style={{ transitionDelay: `${i * 0.12}s` }}>
                    <div className="lp-tl-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="lp-tl-body">
                      <p className="lp-tl-title">{s.title}</p>
                      <p className="lp-tl-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════
            SECTION 4 — CTA
        ════════════════════════════ */}
        <section className="lp-cta-section">
          <div className="lp-cta-glow" />
          <div className="reveal">
            <h2 className="lp-cta-title">
              Ready to verify your first claim?
            </h2>
            <p className="lp-cta-sub">
              Join thousands of users who trust FactForge to separate fact from fiction — in seconds.
            </p>
            <div className="lp-hero-btns">
              <button className="lp-btn-primary" onClick={() => navigate('/login')}>
                Get Started Free
              </button>
              <button className="lp-btn-secondary" onClick={() => navigate('/dashboard')}>
                Try Demo →
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="lp-footer">
          <span className="lp-footer-brand">FACTFORGE</span>
          <span>© 2026 · AI-Powered Fact Verification · Hackathon Project</span>
          <span>Built with ♥ and too much caffeine</span>
        </footer>

      </div>
    </>
  )
}