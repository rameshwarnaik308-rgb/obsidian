import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { to: '/journal', label: 'Journal', icon: '📖' },
  { to: '/news', label: 'News', icon: '📡' },
  { to: '/ai', label: 'OBSIDIAN AI', icon: '✦' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
  { to: '/profile', label: 'Profile', icon: '◉' },
]

export default function Layout({ children, profile }) {
  const navigate = useNavigate()

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#080808' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: '#0d0d0d', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, background: '#e83a2e', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', flexShrink: 0 }} />
            <span style={{ fontWeight: 800, letterSpacing: '3px', fontSize: 13 }}>OBSIDIAN</span>
          </div>
        </div>

        {/* Plan badge */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '2px', color: '#555', marginBottom: 6 }}>WORKSPACE</div>
          {profile?.role === 'pro' ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(232,58,46,0.15)', border: '1px solid rgba(232,58,46,0.3)', borderRadius: 4, padding: '3px 8px', fontSize: 10, color: '#e83a2e', fontWeight: 700, letterSpacing: 1 }}>
              ◆ PRO
            </div>
          ) : (
            <div onClick={() => navigate('/upgrade')} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, padding: '3px 8px', fontSize: 10, color: '#888', cursor: 'pointer', letterSpacing: 1 }}>
              FREE · Upgrade →
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, marginBottom: 2,
              textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
              background: isActive ? 'rgba(232,58,46,0.12)' : 'transparent',
              color: isActive ? '#e83a2e' : '#777',
              borderLeft: isActive ? '2px solid #e83a2e' : '2px solid transparent',
            })}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          {profile?.is_admin && (
            <NavLink to="/admin" style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, marginTop: 8,
              textDecoration: 'none', fontSize: 13, fontWeight: 700, transition: 'all 0.15s',
              background: isActive ? 'rgba(232,58,46,0.2)' : 'rgba(232,58,46,0.05)',
              color: '#e83a2e', border: '1px solid rgba(232,58,46,0.2)', letterSpacing: 1,
            })}>
              <span>⚡</span> ADMIN
            </NavLink>
          )}
        </nav>

        {/* Sign out */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #1a1a1a' }}>
          <button onClick={signOut} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: 13, width: '100%', borderRadius: 6 }}>
            ↩ Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
