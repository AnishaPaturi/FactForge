

// import { useNavigate, useLocation } from 'react-router-dom'

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

//   .ff-navbar {
//     position: sticky;
//     top: 0;
//     z-index: 50;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 0 2rem;
//     height: 62px;
//     background: rgba(4, 10, 20, 0.88);
//     border-bottom: 1px solid rgba(0, 200, 255, 0.12);
//     backdrop-filter: blur(20px);
//     -webkit-backdrop-filter: blur(20px);
//     box-shadow: 0 1px 0 rgba(0,200,255,0.06), 0 4px 24px rgba(0,0,0,0.4);
//   }

//   .ff-navbar-brand {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     cursor: pointer;
//     text-decoration: none;
//   }

//   .ff-navbar-logo {
//     width: 32px; height: 32px;
//     background: linear-gradient(135deg, #0099ff, #00d4ff);
//     border-radius: 8px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     box-shadow: 0 0 14px rgba(0,180,255,0.35);
//     flex-shrink: 0;
//   }

//   .ff-navbar-title {
//     font-family: 'Orbitron', sans-serif;
//     font-size: 1.15rem;
//     font-weight: 700;
//     color: #fff;
//     letter-spacing: 0.04em;
//     text-shadow: 0 0 20px rgba(0,200,255,0.3);
//   }

//   .ff-navbar-badge {
//     font-family: 'Inter', monospace;
//     font-size: 0.6rem;
//     font-weight: 600;
//     letter-spacing: 0.12em;
//     color: #00d4ff;
//     background: rgba(0,200,255,0.1);
//     border: 1px solid rgba(0,200,255,0.25);
//     border-radius: 4px;
//     padding: 2px 6px;
//     text-transform: uppercase;
//   }

//   /* ── Nav links (center) ── */
//   .ff-navbar-links {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//     position: absolute;
//     left: 50%;
//     transform: translateX(-50%);
//   }

//   .ff-nav-link {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     padding: 6px 14px;
//     border-radius: 8px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.82rem;
//     font-weight: 500;
//     color: rgba(255,255,255,0.42);
//     background: none;
//     border: 1px solid transparent;
//     cursor: pointer;
//     text-decoration: none;
//     transition: color 0.2s, background 0.2s, border-color 0.2s;
//     letter-spacing: 0.02em;
//   }
//   .ff-nav-link:hover {
//     color: rgba(255,255,255,0.82);
//     background: rgba(255,255,255,0.05);
//     border-color: rgba(255,255,255,0.08);
//   }
//   .ff-nav-link.active {
//     color: #00d4ff;
//     background: rgba(0,180,255,0.1);
//     border-color: rgba(0,200,255,0.22);
//   }

//   /* ── Right side ── */
//   .ff-navbar-right {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .ff-navbar-dot {
//     width: 6px; height: 6px;
//     background: #00d4ff;
//     border-radius: 50%;
//     box-shadow: 0 0 8px rgba(0,212,255,0.8);
//     animation: navDotPulse 2s ease-in-out infinite;
//     flex-shrink: 0;
//   }

//   @keyframes navDotPulse {
//     0%,100% { opacity: 1; transform: scale(1); }
//     50%      { opacity: 0.4; transform: scale(0.7); }
//   }

//   .ff-navbar-signout {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     padding: 5px 12px;
//     border-radius: 8px;
//     font-family: 'Inter', sans-serif;
//     font-size: 0.75rem;
//     font-weight: 500;
//     color: rgba(255,255,255,0.3);
//     background: none;
//     border: 1px solid transparent;
//     cursor: pointer;
//     transition: color 0.2s, background 0.2s, border-color 0.2s;
//     letter-spacing: 0.02em;
//   }
//   .ff-navbar-signout:hover {
//     color: #f87171;
//     background: rgba(239,68,68,0.07);
//     border-color: rgba(239,68,68,0.18);
//   }

//   @media (max-width: 600px) {
//     .ff-navbar { padding: 0 1rem; }
//     .ff-navbar-links { position: static; transform: none; gap: 2px; }
//     .ff-nav-link { padding: 5px 10px; font-size: 0.75rem; }
//     .ff-navbar-badge { display: none; }
//   }
// `

// export default function Navbar() {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const isActive = (path) => location.pathname === path

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="ff-navbar">

//         {/* Brand */}
//         <div className="ff-navbar-brand" onClick={() => navigate('/dashboard')}>
//           <div className="ff-navbar-logo">
//             <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//               <path d="M4 9h10M9 4l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//           <span className="ff-navbar-title">FactForge</span>
//           {/* <span className="ff-navbar-badge">Live</span> */}
//         </div>

//         {/* Center nav links */}
//         <nav className="ff-navbar-links">
//           <button
//             className={`ff-nav-link${isActive('/dashboard') ? ' active' : ''}`}
//             onClick={() => navigate('/dashboard')}
//           >
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <rect x="1" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
//               <rect x="8" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
//               <rect x="1" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
//               <rect x="8" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
//             </svg>
//             Dashboard
//           </button>

//           <button
//             className={`ff-nav-link${isActive('/history') ? ' active' : ''}`}
//             onClick={() => navigate('/history')}
//           >
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//               <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
//               <path d="M7 4.5v2.8l2 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
//             </svg>
//             History
//           </button>
//         </nav>

//         {/* Right side */}
//         <div className="ff-navbar-right">
//           <div className="ff-navbar-dot" />
//           <button
//             className="ff-navbar-signout"
//             onClick={() => navigate('/login')}
//           >
//             <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//               <path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v6A1.5 1.5 0 0 0 2.5 11H5M8.5 9.5L12 6.5l-3.5-3M12 6.5H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Sign out
//           </button>
//         </div>

//       </div>
//     </>
//   )
// }


import { useNavigate, useLocation } from 'react-router-dom'
import i18n from "i18next"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

  .ff-navbar {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    height: 62px;
    background: rgba(4, 10, 20, 0.88);
    border-bottom: 1px solid rgba(0, 200, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 rgba(0,200,255,0.06), 0 4px 24px rgba(0,0,0,0.4);
  }

  .ff-navbar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-decoration: none;
  }

  .ff-navbar-logo {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, #0099ff, #00d4ff);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 14px rgba(0,180,255,0.35);
    flex-shrink: 0;
  }

  .ff-navbar-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.04em;
    text-shadow: 0 0 20px rgba(0,200,255,0.3);
  }

  .ff-navbar-badge {
    font-family: 'Inter', monospace;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: #00d4ff;
    background: rgba(0,200,255,0.1);
    border: 1px solid rgba(0,200,255,0.25);
    border-radius: 4px;
    padding: 2px 6px;
    text-transform: uppercase;
  }

  /* ── Nav links (center) ── */
  .ff-navbar-links {
    display: flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .ff-nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255,255,255,0.52);
    background: none;
    border: 1px solid transparent;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s, background 0.2s, border-color 0.2s;
    letter-spacing: 0.02em;
  }
  .ff-nav-link:hover {
    color: rgba(255,255,255,0.82);
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.08);
  }
  .ff-nav-link.active {
    color: #00d4ff;
    background: rgba(0,180,255,0.1);
    border-color: rgba(0,200,255,0.22);
  }

  /* ── Right side ── */
  .ff-navbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ff-navbar-dot {
    width: 6px; height: 6px;
    background: #00d4ff;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0,212,255,0.8);
    animation: navDotPulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes navDotPulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(0.7); }
  }

  .ff-navbar-signout {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px 20px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    color: rgba(255,255,255,0.65);
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.14);
    cursor: pointer;
    transition: color 0.2s, background 0.2s, border-color 0.2s;
    letter-spacing: 0.02em;
  }
  .ff-navbar-signout:hover {
    color: #f87171;
    background: rgba(239,68,68,0.09);
    border-color: rgba(239,68,68,0.28);
  }

  @media (max-width: 600px) {
    .ff-navbar { padding: 0 1rem; }
    .ff-navbar-links { position: static; transform: none; gap: 2px; }
    .ff-nav-link { padding: 5px 10px; font-size: 0.75rem; }
    .ff-navbar-badge { display: none; }
  }
`

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{styles}</style>
      <div className="ff-navbar">

        {/* Brand */}
        <div className="ff-navbar-brand" onClick={() => navigate('/dashboard')}>
          <div className="ff-navbar-logo">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M9 4l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="ff-navbar-title">FactForge</span>
          <span className="ff-navbar-badge">Live</span>
        </div>

        {/* Center nav links */}
        <nav className="ff-navbar-links">
          <button
            className={`ff-nav-link${isActive('/dashboard') ? ' active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>

          <button
            className={`ff-nav-link${isActive('/history') ? ' active' : ''}`}
            onClick={() => navigate('/history')}
          >
            History
          </button>
        </nav>

        {/* Right side */}
        <div className="ff-navbar-right">

          {/* 🔥 LANGUAGE SWITCHER */}
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer"
            }}
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="te">TE</option>
          </select>

          <div className="ff-navbar-dot" />

          <button
            className="ff-navbar-signout"
            onClick={() => navigate('/login')}
          >
            Sign out
          </button>

        </div>

      </div>
    </>
  )
}