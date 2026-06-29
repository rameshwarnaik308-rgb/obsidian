import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const WALLET = 'TJC43phcfDfmjyPgCasfxQPwmEFQNsnEDC'

export default function Upgrade({ profile }) {
  const [txid, setTxid] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const isPro = profile?.role === 'pro'

  async function submit(e) {
    e.preventDefault()
    if (!txid.trim()) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('payment_requests').insert({ user_id: user.id, email: user.email, txid: txid.trim(), amount: 25, status: 'pending' })
    setSubmitted(true)
    setLoading(false)
  }

  if (isPro) return (
    <div style={{ padding: 40 }}>
      <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>MEMBERSHIP</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>You're on Pro</h1>
      <div style={{ background: '#111', border: '2px solid #e83a2e', borderRadius: 16, padding: 32, maxWidth: 400 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>◆</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: '#e83a2e' }}>PRO MEMBER</div>
        <div style={{ fontSize: 14, color: '#888' }}>Full access to OBSIDIAN AI, advanced analytics, and all Pro features.</div>
      </div>
    </div>
  )

  return (
    <div style={{ padding: 40 }}>
      <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 8 }}>UPGRADE</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Go Pro</h1>
      <p style={{ color: '#555', fontSize: 14, marginBottom: 40 }}>Unlock OBSIDIAN AI, emotional pattern detection, and advanced analytics.</p>

      {submitted ? (
        <div style={{ background: '#111', border: '1px solid #22c55e', borderRadius: 16, padding: 40, maxWidth: 500, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: '#22c55e' }}>Payment submitted</div>
          <div style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>Your payment is under review. We'll activate your Pro account within 24 hours after verifying your transaction.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 800 }}>
          {/* Plan card */}
          <div style={{ background: '#111', border: '2px solid #e83a2e', borderRadius: 16, padding: 32 }}>
            <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 16 }}>PRO PLAN</div>
            <div style={{ fontSize: 42, fontWeight: 900, marginBottom: 4 }}>$25</div>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 28 }}>per month · USDT TRC20</div>
            {['OBSIDIAN AI coach', 'Emotional pattern detection', 'Advanced analytics dashboard', 'Unlimited trade journal', 'Priority support', 'All future features'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 13, color: '#ccc' }}>
                <span style={{ color: '#e83a2e', fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
          </div>

          {/* Payment form */}
          <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 16, padding: 32 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Pay with USDT TRC20</div>

            {/* Step 1 */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 2, marginBottom: 10 }}>STEP 1 — SEND PAYMENT</div>
              <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#555', marginBottom: 6 }}>AMOUNT</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}>25 USDT <span style={{ fontSize: 12, color: '#555' }}>TRC20</span></div>
                <div style={{ fontSize: 11, color: '#555', marginBottom: 8 }}>WALLET ADDRESS</div>
                <div style={{ fontSize: 12, fontFamily: 'monospace', background: '#111', border: '1px solid #222', borderRadius: 6, padding: '10px 12px', wordBreak: 'break-all', color: '#e83a2e', lineHeight: 1.6 }}>{WALLET}</div>
                <button onClick={() => navigator.clipboard.writeText(WALLET)} style={{ marginTop: 10, background: 'transparent', border: '1px solid #2a2a2a', color: '#888', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>Copy address</button>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 2, marginBottom: 10 }}>STEP 2 — SUBMIT YOUR TXID</div>
              <form onSubmit={submit}>
                <input
                  value={txid} onChange={e => setTxid(e.target.value)} required
                  placeholder="Paste your transaction ID here..."
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', color: '#f0f0f0', fontSize: 13, outline: 'none', fontFamily: 'monospace', marginBottom: 12 }}
                />
                <button type="submit" disabled={loading} style={{ width: '100%', background: '#e83a2e', border: 'none', color: 'white', padding: '13px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                  {loading ? 'Submitting...' : 'Submit payment →'}
                </button>
              </form>
              <p style={{ marginTop: 12, fontSize: 11, color: '#444', lineHeight: 1.6 }}>After submission, your account will be upgraded within 24 hours once we verify your transaction on the blockchain.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
