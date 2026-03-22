
const STORAGE_KEY = 'factforge_history'

/** Read all sessions from localStorage (newest first). */
export function getSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Save a new session to the top of the list (max 50).
 * @param {string} inputText - raw text the user submitted
 * @param {Array}  claims    - claim objects from the API
 */
export function addSession(inputText, claims) {
  try {
    const existing = getSessions()

    const session = {
      id: `s_${Date.now()}`,
      inputText,
      timestamp: new Date().toISOString(),
      claims: claims.map((c) => ({
        text:       c.claim,
        verdict:    normalizeVerdict(c.verdict),
        confidence: c.confidence ?? 0,
      })),
      aiProbability: deriveAiProbability(claims),
    }

    const updated = [session, ...existing].slice(0, 50)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return session
  } catch (e) {
    console.error('historyStore: failed to save session', e)
    return null
  }
}

/** Delete a single session by id. */
export function deleteSession(id) {
  try {
    const updated = getSessions().filter((s) => s.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {}
}

/** Clear all history. */
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}

// ─── Internal helpers ─────────────────────────────────────────

function normalizeVerdict(v = '') {
  const map = {
    'true':           'true',
    'false':          'false',
    'partially true': 'partial',
    'partial':        'partial',
    'unverifiable':   'unverifiable',
  }
  return map[v.toLowerCase()] ?? 'unverifiable'
}

function deriveAiProbability(claims) {
  if (!claims || claims.length === 0) return 0
  const falseClaims = claims.filter((c) => c.verdict?.toLowerCase() === 'false')
  if (falseClaims.length === 0) return 10
  const avg = falseClaims.reduce((sum, c) => sum + (c.confidence ?? 0), 0) / falseClaims.length
  return Math.min(Math.round(avg * 0.85), 99)
}