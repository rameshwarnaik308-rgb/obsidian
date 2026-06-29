import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
export default function Profile({ profile }) {
  const [name, setName] = useState(profile?.display_name || '')
  const [saved, setSaved] = useState(false)
  async function save() {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('profiles').update({ display_name: name }).eq('id', user.id)
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }
  const inp = {width:'100%',background:'#1a1a1a',border:'1px solid #2a2a2a',borderRadius:8,padding:'12px 14px',color:'#f0f0f0',fontSize:14,outline:'none',fontFamily:'Inter,sans-serif'}
  return (
    <div style={{padding:40}}>
      <div style={{fontSize:11,color:'#e83a2e',letterSpacing:3,marginBottom:8}}>IDENTITY</div>
      <h1 style={{fontSize:32,fontWeight:800,marginBottom:6}}>Profile</h1>
      <div style={{background:'#111',border:'1px solid #1a1a1a',borderRadius:16,padding:32,maxWidth:500}}>
        <div style={{marginBottom:16}}><label style={{fontSize:11,color:'#666',letterSpacing:1,display:'block',marginBottom:8}}>EMAIL</label><input style={{...inp,color:'#666'}} value={profile?.email||''} disabled /></div>
        <div style={{marginBottom:24}}><label style={{fontSize:11,color:'#666',letterSpacing:1,display:'block',marginBottom:8}}>DISPLAY NAME</label><input style={inp} value={name} onChange={e=>setName(e.target.value)} /></div>
        <button onClick={save} style={{background:'#e83a2e',border:'none',color:'white',padding:'11px 28px',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:700}}>{saved?'✓ Saved':'Save'}</button>
      </div>
    </div>
  )
}
