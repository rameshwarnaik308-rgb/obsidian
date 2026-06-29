import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Journal() {
  const [trades, setTrades] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ symbol: '', side: 'LONG', entry: '', exit: '', size: '', pnl: '', notes: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadTrades() }, [])

  async function loadTrades() {
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('trades').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    setTrades(data || [])
  }

  async function addTrade(e) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('trades').insert({ ...form, user_id: user.id, entry: +form.entry, exit: +form.exit, size: +form.size, pnl: +form.pnl })
    setForm({ symbol: '', side: 'LONG', entry: '', exit: '', size: '', pnl: '', notes: '' })
    setShowForm(false)
    loadTrades()
    setLoading(false)
  }

  async function deleteTrade(id) {
    await supabase.from('trades').delete().eq('id', id)
    loadTrades()
  }

  const inp = { width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 6, padding: '10px 12px', color: '#f0f0f0', fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif' }

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>LOG BOOK</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Trade Journal</h1>
          <p style={{ color: '#555', fontSize: 14 }}>Every entry. Every exit. Every lesson.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#e83a2e', border: 'none', color: 'white', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>+ New trade</button>
      </div>

      {showForm && (
        <form onSubmit={addTrade} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            <div><label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>SYMBOL</label><input style={inp} value={form.symbol} onChange={e => setForm({...form, symbol: e.target.value.toUpperCase()})} placeholder="XAUUSD" required /></div>
            <div><label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>SIDE</label>
              <select style={{...inp}} value={form.side} onChange={e => setForm({...form, side: e.target.value})}>
                <option>LONG</option><option>SHORT</option>
              </select>
            </div>
            <div><label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>SIZE</label><input style={inp} type="number" step="any" value={form.size} onChange={e => setForm({...form, size: e.target.value})} placeholder="1.0" required /></div>
            <div><label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>ENTRY</label><input style={inp} type="number" step="any" value={form.entry} onChange={e => setForm({...form, entry: e.target.value})} placeholder="1920.00" required /></div>
            <div><label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>EXIT</label><input style={inp} type="number" step="any" value={form.exit} onChange={e => setForm({...form, exit: e.target.value})} placeholder="1935.00" /></div>
            <div><label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>P&L ($)</label><input style={inp} type="number" step="any" value={form.pnl} onChange={e => setForm({...form, pnl: e.target.value})} placeholder="150.00" /></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>NOTES</label>
            <textarea style={{...inp, height: 80, resize: 'vertical'}} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="What happened? What would you do differently?" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" disabled={loading} style={{ background: '#e83a2e', border: 'none', color: 'white', padding: '10px 24px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>Save trade</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#888', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 80px 100px 100px 80px 120px 40px', padding: '12px 20px', fontSize: 10, color: '#555', letterSpacing: 2, borderBottom: '1px solid #1a1a1a' }}>
          <span>SYMBOL</span><span>SIDE</span><span>ENTRY</span><span>EXIT</span><span>SIZE</span><span>P&L</span><span></span>
        </div>
        {trades.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: '#444', fontSize: 14 }}>No trades yet. Add your first trade above.</div>
        ) : trades.map(t => (
          <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 80px 100px 100px 80px 120px 40px', padding: '16px 20px', borderBottom: '1px solid #111', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{t.symbol}</div>
              <div style={{ fontSize: 11, color: '#555' }}>{new Date(t.created_at).toLocaleDateString()}</div>
            </div>
            <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700, background: t.side === 'LONG' ? 'rgba(34,197,94,0.15)' : 'rgba(232,58,46,0.15)', color: t.side === 'LONG' ? '#22c55e' : '#e83a2e' }}>{t.side}</span>
            <span style={{ fontSize: 13 }}>{t.entry}</span>
            <span style={{ fontSize: 13 }}>{t.exit || '—'}</span>
            <span style={{ fontSize: 13 }}>{t.size}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: (t.pnl || 0) >= 0 ? '#22c55e' : '#e83a2e' }}>{(t.pnl || 0) >= 0 ? '+' : ''}{(t.pnl || 0).toFixed(2)}</span>
            <button onClick={() => deleteTrade(t.id)} style={{ background: 'transparent', border: 'none', color: '#333', cursor: 'pointer', fontSize: 16 }}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  )
}
