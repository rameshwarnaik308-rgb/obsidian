import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
  const [tab, setTab] = useState('users')
  const [users, setUsers] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadData() }, [tab])

  async function loadData() {
    setLoading(true)
    if (tab === 'users' || tab === 'stats') {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
      setUsers(data || [])
    }
    if (tab === 'payments') {
      const { data } = await supabase.from('payment_requests').select('*').order('created_at', { ascending: false })
      setPayments(data || [])
    }
    setLoading(false)
  }

  async function setRole(userId, role) {
    await supabase.from('profiles').update({ role }).eq('id', userId)
    loadData()
  }

  async function setAdmin(userId, val) {
    await supabase.from('profiles').update({ is_admin: val }).eq('id', userId)
    loadData()
  }

  async function approvePayment(paymentId, userId) {
    await supabase.from('payment_requests').update({ status: 'approved' }).eq('id', paymentId)
    if (userId) await supabase.from('profiles').update({ role: 'pro' }).eq('id', userId)
    loadData()
  }

  async function rejectPayment(paymentId) {
    await supabase.from('payment_requests').update({ status: 'rejected' }).eq('id', paymentId)
    loadData()
  }

  const proUsers = users.filter(u => u.role === 'pro')
  const pending = payments.filter(p => p.status === 'pending')

  const tabs = [
    { id: 'users', label: 'Users', badge: users.length },
    { id: 'payments', label: 'Payments', badge: pending.length || null },
    { id: 'stats', label: 'Stats' },
  ]

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3 }}>COMMAND CENTER</div>
        <div style={{ background: '#e83a2e', color: 'white', fontSize: 9, fontWeight: 800, letterSpacing: 2, padding: '2px 8px', borderRadius: 3 }}>ADMIN</div>
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Admin Panel</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: 32 }}>Manage users, payments, and platform stats.</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#111', border: '1px solid #1a1a1a', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '8px 20px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#e83a2e' : 'transparent', color: tab === t.id ? 'white' : '#888', display: 'flex', alignItems: 'center', gap: 8 }}>
            {t.label}
            {t.badge ? <span style={{ background: tab === t.id ? 'rgba(255,255,255,0.3)' : '#2a2a2a', padding: '1px 7px', borderRadius: 10, fontSize: 11 }}>{t.badge}</span> : null}
          </button>
        ))}
      </div>

      {loading && <div style={{ color: '#555', fontSize: 14 }}>Loading...</div>}

      {/* USERS TAB */}
      {tab === 'users' && !loading && (
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 90px 80px 180px', padding: '12px 20px', fontSize: 10, color: '#555', letterSpacing: 2, borderBottom: '1px solid #1a1a1a' }}>
            <span>USER</span><span>PLAN</span><span>ADMIN</span><span>ACTIONS</span>
          </div>
          {users.length === 0 ? <div style={{ padding: '40px 20px', textAlign: 'center', color: '#444' }}>No users yet.</div> : users.map(u => (
            <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '2fr 90px 80px 180px', padding: '14px 20px', borderBottom: '1px solid #111', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{u.email}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{new Date(u.created_at).toLocaleDateString()}</div>
              </div>
              <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, background: u.role === 'pro' ? 'rgba(232,58,46,0.2)' : '#1a1a1a', color: u.role === 'pro' ? '#e83a2e' : '#666' }}>{(u.role || 'free').toUpperCase()}</span>
              <span style={{ fontSize: 13, color: u.is_admin ? '#22c55e' : '#444' }}>{u.is_admin ? '✓ Yes' : '—'}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {u.role !== 'pro'
                  ? <button onClick={() => setRole(u.id, 'pro')} style={{ background: 'rgba(232,58,46,0.15)', border: '1px solid rgba(232,58,46,0.3)', color: '#e83a2e', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>→ Pro</button>
                  : <button onClick={() => setRole(u.id, 'free')} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#888', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>Downgrade</button>
                }
                {!u.is_admin
                  ? <button onClick={() => setAdmin(u.id, true)} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#888', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>Make admin</button>
                  : <button onClick={() => setAdmin(u.id, false)} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#555', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', fontSize: 11 }}>Remove admin</button>
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAYMENTS TAB */}
      {tab === 'payments' && !loading && (
        <div>
          <div style={{ background: '#111', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 12, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 8 }}>
            💳 Your wallet: <span style={{ fontFamily: 'monospace', color: '#e83a2e' }}>TJC43phcfDfmjyPgCasfxQPwmEFQNsnEDC</span>
          </div>
          {payments.length === 0 ? (
            <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '48px 20px', textAlign: 'center', color: '#444' }}>No payment requests yet.</div>
          ) : payments.map(p => (
            <div key={p.id} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: 24, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{p.email}</div>
                  <div style={{ fontSize: 11, color: '#555' }}>{new Date(p.created_at).toLocaleString()}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: p.status === 'approved' ? '#22c55e' : p.status === 'rejected' ? '#e83a2e' : '#f59e0b' }}>
                  {p.status.toUpperCase()}
                </span>
              </div>
              <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px', fontFamily: 'monospace', fontSize: 12, color: '#888', marginBottom: 14, wordBreak: 'break-all' }}>
                TxID: {p.txid}
              </div>
              {p.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => approvePayment(p.id, p.user_id)} style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', borderRadius: 6, padding: '8px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>✓ Approve & Activate Pro</button>
                  <button onClick={() => rejectPayment(p.id)} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#888', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', fontSize: 13 }}>Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* STATS TAB */}
      {tab === 'stats' && !loading && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              ['TOTAL USERS', users.length, '#f0f0f0'],
              ['PRO USERS', proUsers.length, '#e83a2e'],
              ['MRR (USDT)', `$${proUsers.length * 25}`, '#22c55e'],
            ].map(([label, val, color]) => (
              <div key={label} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 10 }}>{label}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 2, marginBottom: 16 }}>CONVERSION</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>
              {users.length ? ((proUsers.length / users.length) * 100).toFixed(1) : 0}%
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>Free to Pro conversion rate</div>
          </div>
        </div>
      )}
    </div>
  )
}
