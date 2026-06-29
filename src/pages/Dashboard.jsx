import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard({ profile }) {
  const [trades, setTrades] = useState([])

  useEffect(() => {
    supabase.from('trades').select('*').then(({ data }) => setTrades(data || []))
  }, [])

  const pnl = trades.reduce((s, t) => s + (t.pnl || 0), 0)
  const wins = trades.filter(t => (t.pnl || 0) > 0).length
  const winRate = trades.length ? ((wins / trades.length) * 100).toFixed(1) : '0.0'
  const avgPnl = trades.length ? (pnl / trades.length).toFixed(2) : '0.00'

  return (
    <div style={{ padding: 40 }}>
      <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>TELEMETRY</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: '#555', marginBottom: 36, fontSize: 14 }}>Your trading edge, instrumented in real time.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          ['NET P&L', `$${pnl.toFixed(2)}`, '↗', '#22c55e'],
          ['WIN RATE', `${winRate}%`, '◎', '#e83a2e'],
          ['TRADES', trades.length, '🔥', '#e83a2e'],
          ['AVG P&L / TRADE', `$${avgPnl}`, '↗', '#e8932e'],
        ].map(([label, val, icon, color]) => (
          <div key={label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 10, color: '#555', letterSpacing: 2 }}>{label}</span>
              <span style={{ color }}>{icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{val}</div>
          </div>
        ))}
      </div>

      {/* F1 Car Banner */}
      <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24, position: 'relative', minHeight: 220 }}>
        <img src="/car-f1.jpeg" alt="Formula Performance" style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 32, left: 36 }}>
          <div style={{ fontSize: 10, color: '#e83a2e', letterSpacing: 3, marginBottom: 10 }}>FORMULA PERFORMANCE</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1 }}>Discipline is built lap by lap.<br /><span style={{ color: '#e83a2e' }}>So is your edge.</span></h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 16 }}>RECENT TRADES</div>
          {trades.length === 0 ? (
            <div style={{ color: '#444', fontSize: 13 }}>No trades yet. Add your first in Journal.</div>
          ) : trades.slice(0, 5).map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #1a1a1a' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.symbol}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{t.side} · {new Date(t.created_at).toLocaleDateString()}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: (t.pnl || 0) >= 0 ? '#22c55e' : '#e83a2e' }}>
                {(t.pnl || 0) >= 0 ? '+' : ''}{(t.pnl || 0).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 16 }}>DISCIPLINE ENGINE</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Risk guardrails active</div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>Max risk / trade</div>
          <div style={{ padding: 16, background: '#0d0d0d', borderRadius: 8, border: '1px solid #1a1a1a' }}>
            <div style={{ fontSize: 11, color: '#555', marginBottom: 6, letterSpacing: 1 }}>ACCOUNT STATUS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, background: profile?.role === 'pro' ? '#22c55e' : '#e83a2e', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{profile?.role === 'pro' ? 'PRO — Full access' : 'FREE — Upgrade for AI coaching'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
