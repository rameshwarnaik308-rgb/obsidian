import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: '#f0f0f0' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #111' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, background: '#e83a2e', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <span style={{ fontWeight: 800, letterSpacing: '3px', fontSize: 12 }}>OBSIDIAN</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 13, color: '#888' }}>
          <span style={{ cursor: 'pointer' }}>Platform</span>
          <span style={{ cursor: 'pointer' }}>Discipline</span>
          <span style={{ cursor: 'pointer' }}>AI</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={() => navigate('/auth')} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: 13 }}>Sign in</button>
          <button onClick={() => navigate('/auth')} style={{ background: '#e83a2e', border: 'none', color: 'white', padding: '9px 20px', borderRadius: 50, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Enter Platform →</button>
        </div>
      </nav>

      {/* Hero with car image */}
      <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 48px 60px', overflow: 'hidden' }}>
        {/* Car background image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/car-hero.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.55 }} />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,8,0.95) 40%, rgba(8,8,8,0.3) 100%)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.6)', border: '1px solid #222', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#888', letterSpacing: 2, marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, background: '#e83a2e', borderRadius: '50%', display: 'inline-block' }} />
            TRADING JOURNAL · V1.0
          </div>
          <h1 style={{ fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
            Precision.<br />Discipline.<br /><span style={{ color: '#e83a2e' }}>Performance.</span>
          </h1>
          <p style={{ fontSize: 16, color: '#999', lineHeight: 1.7, marginBottom: 40, maxWidth: 460 }}>
            OBSIDIAN is a private trading journal engineered for traders who treat risk like an engineer. Track every trade. Quantify every mistake. Coach your edge with an in-house AI.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button onClick={() => navigate('/auth')} style={{ background: '#e83a2e', border: 'none', color: 'white', padding: '13px 28px', borderRadius: 50, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>Launch Dashboard →</button>
            <button style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: 14 }}>Explore the platform →</button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 1, marginTop: 80, maxWidth: 500 }}>
          {[['WIN RATE', '68.4%'], ['AVG R', '2.14'], ['DISCIPLINE', '94']].map(([label, val], i) => (
            <div key={label} style={{ flex: 1, background: 'rgba(17,17,17,0.9)', border: '1px solid #1a1a1a', padding: '16px 20px', borderRadius: i === 0 ? '8px 0 0 8px' : i === 2 ? '0 8px 8px 0' : 0 }}>
              <div style={{ fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform section */}
      <div style={{ padding: '80px 48px', borderTop: '1px solid #111' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, maxWidth: 1100, margin: '0 auto', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 16 }}>01 — THE PLATFORM</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>A cockpit built like a <span style={{ color: '#e83a2e' }}>telemetry system.</span></h2>
            <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 36 }}>Dashboard, journal, AI coaching — unified in one obsidian interface inspired by Formula telemetry and Bloomberg terminals.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Live Dashboard','Equity curve, R-distribution, discipline score.'],['Trade Journal','Every entry, exit, stop, take-profit, tag.'],['OBSIDIAN AI','Forensic trade reviews and emotional patterns.'],['Risk Guardrails','Per-trade and daily loss limits.']].map(([t,d]) => (
                <div key={t} style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{t}</div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Side car image */}
          <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
            <img src="/car-side.jpeg" alt="OBSIDIAN" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,8,8,0.2), rgba(232,58,46,0.05))' }} />
          </div>
        </div>
      </div>

      {/* Discipline section */}
      <div style={{ padding: '80px 48px', borderTop: '1px solid #111', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 20 }}>02 — DISCIPLINE</div>
        <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
          Discipline is the <span style={{ color: '#e83a2e' }}>only edge</span> the<br />market can't take back.
        </h2>
        <p style={{ color: '#666', fontSize: 15, maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.7 }}>OBSIDIAN tracks R-multiple, risk %, drawdown, expectancy, and emotional tags on every trade.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', maxWidth: 900, margin: '0 auto' }}>
          {[['RISK PER TRADE','0.50%','Locked rule'],['MAX DAILY LOSS','-2.00%','Auto pause'],['R-MULTIPLE AVG','+2.1R','30-day rolling']].map(([label,val,sub]) => (
            <div key={label} style={{ flex: 1, background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '28px 24px', textAlign: 'left' }}>
              <div style={{ fontSize: 10, color: '#555', letterSpacing: 2, marginBottom: 12 }}>{label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>{val}</div>
              <div style={{ fontSize: 12, color: '#e83a2e' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Section */}
      <div style={{ padding: '80px 48px', borderTop: '1px solid #111', background: 'linear-gradient(135deg, #0a0a0a, #110000)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 20 }}>03 — OBSIDIAN AI</div>
          <h2 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>An in-house coach. <span style={{ color: '#e83a2e' }}>Trained on discipline.</span></h2>
          <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>Paste a trade. Get a forensic breakdown — entry quality, risk sizing, emotional fingerprint, one concrete next action.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button onClick={() => navigate('/auth')} style={{ background: '#e83a2e', border: 'none', color: 'white', padding: '13px 28px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>Open OBSIDIAN</button>
            <button onClick={() => navigate('/auth')} style={{ background: 'transparent', border: '1px solid #333', color: '#ccc', padding: '13px 28px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>Create account</button>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '80px 48px', background: '#0a0a0a', borderTop: '1px solid #111' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#e83a2e', letterSpacing: 3, marginBottom: 16 }}>PRICING</div>
          <h2 style={{ fontSize: 40, fontWeight: 800 }}>One plan. Full access.</h2>
        </div>
        <div style={{ display: 'flex', gap: 20, maxWidth: 700, margin: '0 auto', justifyContent: 'center' }}>
          <div style={{ flex: 1, background: '#111', border: '1px solid #222', borderRadius: 16, padding: 32 }}>
            <div style={{ fontSize: 12, color: '#666', letterSpacing: 2, marginBottom: 12 }}>FREE</div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4 }}>$0</div>
            <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>forever</div>
            {['Trade journal', 'Basic dashboard', 'Market news'].map(f => <div key={f} style={{ fontSize: 13, color: '#777', marginBottom: 8 }}>✓ {f}</div>)}
            <button onClick={() => navigate('/auth')} style={{ marginTop: 24, width: '100%', background: 'transparent', border: '1px solid #333', color: '#888', padding: 11, borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>Get started</button>
          </div>
          <div style={{ flex: 1, background: '#111', border: '2px solid #e83a2e', borderRadius: 16, padding: 32, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#e83a2e', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: 2, padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>RECOMMENDED</div>
            <div style={{ fontSize: 12, color: '#e83a2e', letterSpacing: 2, marginBottom: 12 }}>PRO</div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4 }}>$25</div>
            <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>per month · USDT TRC20</div>
            {['Everything in Free', 'OBSIDIAN AI coach', 'Emotional pattern detection', 'Advanced analytics', 'Priority support'].map(f => <div key={f} style={{ fontSize: 13, color: '#ccc', marginBottom: 8 }}>✓ {f}</div>)}
            <button onClick={() => navigate('/upgrade')} style={{ marginTop: 24, width: '100%', background: '#e83a2e', border: 'none', color: 'white', padding: 11, borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>Upgrade to Pro →</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '28px 48px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 16, height: 16, background: '#e83a2e', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: '#555' }}>OBSIDIAN</span>
        </div>
        <div style={{ fontSize: 11, color: '#444' }}>© 2026 OBSIDIAN · TRADE WITH INTENT.</div>
      </div>
    </div>
  )
}
