import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// ─── Icons (inline SVG to avoid extra deps) ───────────────────────
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="#6366f1"/>
    <path d="M8 14h12M14 8l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DashboardIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" stroke={active ? '#818cf8' : '#64748b'} strokeWidth="1.5"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5" stroke={active ? '#818cf8' : '#64748b'} strokeWidth="1.5"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5" stroke={active ? '#818cf8' : '#64748b'} strokeWidth="1.5"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" stroke={active ? '#818cf8' : '#64748b'} strokeWidth="1.5"/>
  </svg>
)

const HistoryIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke={active ? '#818cf8' : '#64748b'} strokeWidth="1.5"/>
    <path d="M8 5v3.5l2.5 1.5" stroke={active ? '#818cf8' : '#64748b'} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 5h14M3 10h14M3 15h14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 5l10 10M15 5L5 15" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { to: '/history',   label: 'History',   Icon: HistoryIcon   },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-surface-900/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <Logo />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Fact<span className="text-indigo-400">Forge</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 ml-1">
              BETA
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${isActive(to) ? 'active' : ''}`}
              >
                <Icon active={isActive(to)} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2.5 pl-4 border-l border-white/[0.08]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-glow-sm">
                A
              </div>
              <div className="text-sm">
                <div className="text-slate-200 font-medium leading-tight">Admin</div>
                <div className="text-slate-500 text-xs leading-tight">admin@factforge.ai</div>
              </div>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] rounded-lg transition-all duration-200 border border-transparent hover:border-white/[0.08]"
            >
              Sign out
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-surface-800 animate-slide-down">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`nav-link w-full ${isActive(to) ? 'active' : ''}`}
              >
                <Icon active={isActive(to)} />
                {label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); navigate('/login') }}
              className="nav-link w-full text-left"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
