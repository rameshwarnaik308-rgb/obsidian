import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setMsg('')
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMsg(error.message)
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) { setMsg(error.message) }
      else {
        await supabase.from('profiles').upsert({ id: data.user.id, email, role: 'free', is_admin: false })
        setMsg('Account created! You can now sign in.')
        setMode('signin')
      }
    }
    setLoading(false)
  }

  async function googleSignIn() {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/dashboard' } })
  }

  const inp = { width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', color: '#f0f0f0', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', background: '#080808' }}>
      {/* Left */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 70%, rgba(120,0,0,0.3), transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: 48, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 16 }}>INSIDE OBSIDIAN</div>
          <h2 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1 }}>The trader's edge<br />is the trader's <span style={{ color: '#e83a2e' }}>log book.</span></h2>
          <p style={{ marginTop: 16, color: '#666', fontSize: 14, lineHeight: 1.7 }}>Every great driver studies telemetry. Every great trader studies their journal.</p>
        </div>
      </div>
      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: '100%', maxWidth: 400, background: '#111', border: '1px solid #1a1a1a', borderRadius: 16, padding: 36 }}>
          <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 12 }}>ACCESS</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>Enter the platform</h2>
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: 8, padding: 3, marginBottom: 24 }}>
            {['signin','signup'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '8px', background: mode === m ? '#e83a2e' : 'transparent', border: 'none', color: mode === m ? 'white' : '#888', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.15s' }}>
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 8 }}>EMAIL</label>
              <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 8 }}>PASSWORD</label>
              <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {msg && <div style={{ fontSize: 12, color: msg.includes('created') ? '#22c55e' : '#e83a2e', marginBottom: 16 }}>{msg}</div>}
            <button type="submit" disabled={loading} style={{ width: '100%', background: '#e83a2e', border: 'none', color: 'white', padding: '13px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
              {loading ? 'Loading...' : mode === 'signin' ? 'Enter →' : 'Create account →'}
            </button>
          </form>
          <div style={{ textAlign: 'center', color: '#444', fontSize: 12, margin: '16px 0' }}>OR</div>
          <button onClick={googleSignIn} style={{ width: '100%', background: 'transparent', border: '1px solid #2a2a2a', color: '#ccc', padding: '12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{ fontWeight: 700, color: '#e83a2e' }}>G</span> Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
