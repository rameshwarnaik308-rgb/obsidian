import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Journal from './pages/Journal'
import News from './pages/News'
import AICoach from './pages/AICoach'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Upgrade from './pages/Upgrade'
import Layout from './components/Layout'

export default function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
    setLoading(false)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#080808' }}>
      <div style={{ width: 32, height: 32, background: '#e83a2e', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={session ? <Navigate to="/dashboard" /> : <Auth />} />
      <Route path="/dashboard" element={session ? <Layout profile={profile}><Dashboard profile={profile} /></Layout> : <Navigate to="/auth" />} />
      <Route path="/journal" element={session ? <Layout profile={profile}><Journal /></Layout> : <Navigate to="/auth" />} />
      <Route path="/news" element={session ? <Layout profile={profile}><News /></Layout> : <Navigate to="/auth" />} />
      <Route path="/ai" element={session ? <Layout profile={profile}><AICoach profile={profile} /></Layout> : <Navigate to="/auth" />} />
      <Route path="/settings" element={session ? <Layout profile={profile}><Settings /></Layout> : <Navigate to="/auth" />} />
      <Route path="/profile" element={session ? <Layout profile={profile}><Profile profile={profile} setProfile={setProfile} /></Layout> : <Navigate to="/auth" />} />
      <Route path="/upgrade" element={session ? <Layout profile={profile}><Upgrade profile={profile} /></Layout> : <Navigate to="/auth" />} />
      <Route path="/admin" element={session && profile?.is_admin ? <Layout profile={profile}><Admin /></Layout> : <Navigate to="/dashboard" />} />
    </Routes>
  )
}
