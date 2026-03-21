import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Inline Icons ─────────────────────────────────────────────────
const LogoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#6366f1"/>
    <path d="M10 18h16M18 10l8 8-8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="#475569" strokeWidth="1.3"/>
    <path d="M1.5 5.5l6 3.5 6-3.5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="3" y="6.5" width="9" height="7" rx="1.5" stroke="#475569" strokeWidth="1.3"/>
    <path d="M5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="7.5" cy="10" r="1" fill="#475569"/>
  </svg>
)

const EyeIcon = ({ show }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    {show ? (
      <>
        <path d="M1.5 7.5C2.5 4.5 5 2.5 7.5 2.5s5 2 6 5c-1 3-3.5 5-6 5s-5-2-6-5z" stroke="#475569" strokeWidth="1.3"/>
        <circle cx="7.5" cy="7.5" r="1.8" stroke="#475569" strokeWidth="1.3"/>
      </>
    ) : (
      <>
        <path d="M2 2l11 11M6 4.5A5.5 5.5 0 0 1 7.5 4.2c2.5 0 5 2 6 5a9 9 0 0 1-1.6 2.3M5 11.5A7 7 0 0 1 1.5 7.5c.6-2 2-3.6 3.7-4.5" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/>
      </>
    )}
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4.5L10.5 7 8 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ─────────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [focused, setFocused]   = useState(null)

  const canSubmit = email.trim() && password.trim() && !loading

  const handleLogin = () => {
    if (!canSubmit) return
    setLoading(true)
    setTimeout(() => navigate('/dashboard'), 900)
  }

  const handleDemo = () => {
    setLoading(true)
    setTimeout(() => navigate('/dashboard'), 500)
  }

  return (
    <div className="min-h-screen dot-grid mesh-overlay flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] space-y-5 animate-slide-up">

        {/* Logo + title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-800 border border-white/[0.1] shadow-card shadow-indigo-500/10">
            <LogoIcon />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">
              Fact<span className="text-indigo-400">Forge</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">AI-powered fact verification</p>
          </div>
        </div>

        {/* Card */}
        <div className="card p-7 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Sign in</h2>
            <p className="text-sm text-slate-500 mt-0.5">Access your workspace</p>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Email address
            </label>
            <div className={`flex items-center gap-3 px-3.5 py-3 bg-surface-700 border rounded-xl transition-all duration-200 ${
              focused === 'email' ? 'border-indigo-500/60 ring-2 ring-indigo-500/15' : 'border-white/[0.07]'
            }`}>
              <MailIcon />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="you@example.com"
                autoComplete="email"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </button>
            </div>
            <div className={`flex items-center gap-3 px-3.5 py-3 bg-surface-700 border rounded-xl transition-all duration-200 ${
              focused === 'password' ? 'border-indigo-500/60 ring-2 ring-indigo-500/15' : 'border-white/[0.07]'
            }`}>
              <LockIcon />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••••"
                autoComplete="current-password"
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <EyeIcon show={showPw} />
              </button>
            </div>
          </div>

          {/* Sign in button */}
          <button
            onClick={handleLogin}
            disabled={!canSubmit}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <ArrowIcon />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-slate-600">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Demo access */}
          <button
            onClick={handleDemo}
            className="w-full py-3 rounded-xl border border-white/[0.1] bg-surface-700/50 hover:bg-surface-700 hover:border-white/[0.15] text-sm font-medium text-slate-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>🚀</span>
            Continue with Demo
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600">
          By signing in, you agree to FactForge's{' '}
          <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">Terms</span>
          {' & '}
          <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
