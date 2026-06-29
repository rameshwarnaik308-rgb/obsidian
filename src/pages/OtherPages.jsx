import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const NEWS = [
  { cat: 'ECONOMIC', title: 'Fed signals patience as inflation cools to 2.4% YoY', src: 'REUTERS', time: '12M AGO' },
  { cat: 'CRYPTO', title: 'Bitcoin reclaims $72k as ETF inflows resume', src: 'BLOOMBERG', time: '38M AGO' },
  { cat: 'STOCKS', title: 'NVIDIA tops estimates; data-center revenue jumps 154%', src: 'TRADINGVIEW', time: '1H AGO' },
  { cat: 'FOREX', title: 'USD/JPY slips below 152 after BoJ commentary', src: 'FINNHUB', time: '2H AGO' },
  { cat: 'STOCKS', title: 'Apple ships Vision Pro 2 to enterprise channels', src: 'REUTERS', time: '3H AGO' },
  { cat: 'ECONOMIC', title: 'ECB holds rates; revises growth forecast upward', src: 'BLOOMBERG', time: '5H AGO' },
  { cat: 'CRYPTO', title: 'Ethereum gas fees hit 6-month low post-upgrade', src: 'TRADINGVIEW', time: '6H AGO' },
]
const catColor = { ECONOMIC: '#3b82f6', CRYPTO: '#8b5cf6', STOCKS: '#22c55e', FOREX: '#f59e0b' }

export function News() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'Forex', 'Stocks', 'Crypto', 'Economic']
  const filtered = filter === 'All' ? NEWS : NEWS.filter(n => n.cat.toLowerCase() === filter.toLowerCase())

  return (
    <div style={{ padding: 40 }}>
      <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>THE WIRE</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Market News</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: 28 }}>Curated from Reuters, Bloomberg, TradingView and Finnhub.</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '7px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, background: filter === c ? '#e83a2e' : '#1a1a1a', color: filter === c ? 'white' : '#888', fontWeight: filter === c ? 700 : 400 }}>{c}</button>
        ))}
      </div>
      <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden' }}>
        {filtered.map((n, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', borderBottom: '1px solid #111' }}>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 4, background: catColor[n.cat] + '22', color: catColor[n.cat], letterSpacing: 1, flexShrink: 0, minWidth: 80, textAlign: 'center' }}>{n.cat}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{n.title}</div>
              <div style={{ fontSize: 11, color: '#555', letterSpacing: 1 }}>{n.src} · {n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AICoach({ profile }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const isPro = profile?.role === 'pro'
  const prompts = ['Review my last losing trade and tell me what I did wrong.', 'Am I overleveraging? Analyze my risk %.', 'Detect emotional patterns in my notes from this week.', 'Summarize my performance and give one next action.']

  async function send(text) {
    if (!isPro) return
    const msg = text || input
    if (!msg.trim()) return
    setMessages(m => [...m, { role: 'user', content: msg }])
    setInput(''); setLoading(true)
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY || '', 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-20240307', max_tokens: 800, system: 'You are OBSIDIAN AI, a forensic trading coach. Be direct, analytical, and give one concrete action at the end. Keep responses under 200 words.', messages: [{ role: 'user', content: msg }] })
    })
    const data = await res.json()
    setMessages(m => [...m, { role: 'assistant', content: data.content?.[0]?.text || 'Error — check your API key.' }])
    setLoading(false)
  }

  return (
    <div style={{ padding: 40, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 0px)' }}>
      <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>IN-HOUSE INTELLIGENCE</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>OBSIDIAN AI</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: 28 }}>Forensic trade reviews. Risk and emotional pattern detection. One clear next action.</p>
      <div style={{ flex: 1, background: '#111', border: '1px solid #1a1a1a', borderRadius: 16, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {!isPro ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>✦</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Pro feature</div>
              <div style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Upgrade to Pro for $25/month to unlock OBSIDIAN AI coaching.</div>
              <a href="/upgrade" style={{ background: '#e83a2e', color: 'white', padding: '11px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Upgrade to Pro →</a>
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: 32, color: '#e83a2e', marginBottom: 16 }}>✦</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>How can I sharpen your edge?</div>
              <p style={{ color: '#666', fontSize: 13, marginBottom: 28 }}>Ask anything about your trades, risk, or process. Try one of these:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 600, margin: '0 auto' }}>
                {prompts.map(p => <button key={p} onClick={() => send(p)} style={{ background: '#1a1a1a', border: '1px solid #222', color: '#ccc', padding: '16px', borderRadius: 10, cursor: 'pointer', fontSize: 13, textAlign: 'left', lineHeight: 1.4 }}>{p}</button>)}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 20, display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '75%', background: m.role === 'user' ? '#e83a2e' : '#1a1a1a', padding: '12px 16px', borderRadius: 12, fontSize: 14, lineHeight: 1.6, color: m.role === 'user' ? 'white' : '#e0e0e0' }}>{m.content}</div>
              </div>
            ))
          )}
          {loading && <div style={{ color: '#555', fontSize: 13 }}>OBSIDIAN AI is analyzing...</div>}
        </div>
        {isPro && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: 10 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask OBSIDIAN AI..." style={{ flex: 1, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 14px', color: '#f0f0f0', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }} />
            <button onClick={() => send()} style={{ background: '#e83a2e', border: 'none', color: 'white', width: 40, height: 40, borderRadius: 8, cursor: 'pointer', fontSize: 18 }}>↑</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function Settings() {
  return (
    <div style={{ padding: 40 }}>
      <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>CONFIGURATION</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Settings</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: 32 }}>Tune OBSIDIAN to your style.</p>
      <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 2, marginBottom: 16 }}>THEME</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Visual identity</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[['Obsidian Dark', 'Default · deepest black', true], ['Carbon Black', 'Carbon weave tones', false], ['Rosso Theme', 'Accentuated red', false]].map(([name, desc, active]) => (
            <div key={name} style={{ background: '#0d0d0d', border: `1px solid ${active ? '#e83a2e' : '#1a1a1a'}`, borderRadius: 10, padding: 20, cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {['#1a1a1a', '#2a2a2a', '#e83a2e'].map(c => <div key={c} style={{ width: 20, height: 20, borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{desc}</div>
              {active && <div style={{ marginTop: 10, fontSize: 11, color: '#e83a2e', letterSpacing: 1 }}>✓ ACTIVE</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Profile({ profile, setProfile }) {
  const [name, setName] = useState(profile?.display_name || '')
  const [saved, setSaved] = useState(false)

  async function save() {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('profiles').update({ display_name: name }).eq('id', user.id)
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const initials = (name || profile?.email || 'U').slice(0, 2).toUpperCase()
  const inp = { width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', color: '#f0f0f0', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }

  return (
    <div style={{ padding: 40 }}>
      <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>IDENTITY</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Profile</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: 32 }}>How OBSIDIAN knows you.</p>
      <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 16, padding: 32, maxWidth: 500 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, background: '#e83a2e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800 }}>{initials}</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{name || 'Trader'}</div>
            <div style={{ fontSize: 13, color: '#666' }}>{profile?.email}</div>
            <div style={{ fontSize: 11, color: '#e83a2e', marginTop: 4, letterSpacing: 1 }}>{profile?.role === 'pro' ? '◆ PRO MEMBER' : 'FREE MEMBER'}</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 8 }}>DISPLAY NAME</label>
          <input style={inp} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 8 }}>EMAIL</label>
          <input style={{...inp, color: '#666'}} value={profile?.email || ''} disabled />
        </div>
        <button onClick={save} style={{ background: '#e83a2e', border: 'none', color: 'white', padding: '11px 28px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>{saved ? '✓ Saved' : 'Save'}</button>
      </div>
    </div>
  )
}
