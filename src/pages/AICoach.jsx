import React from 'react'
export default function AICoach({ profile }) {
  const isPro = profile?.role === 'pro'
  return (
    <div style={{padding:40}}>
      <div style={{fontSize:11,color:'#e83a2e',letterSpacing:3,marginBottom:8}}>IN-HOUSE INTELLIGENCE</div>
      <h1 style={{fontSize:32,fontWeight:800,marginBottom:6}}>OBSIDIAN AI</h1>
      <p style={{color:'#555',fontSize:14,marginBottom:28}}>Forensic trade reviews. Risk and emotional pattern detection.</p>
      <div style={{background:'#111',border:'1px solid #1a1a1a',borderRadius:16,padding:48,textAlign:'center'}}>
        {isPro ? <p style={{color:'#888'}}>AI chat coming soon.</p> : <div><div style={{fontSize:32,color:'#e83a2e',marginBottom:16}}>✦</div><div style={{fontSize:18,fontWeight:700,marginBottom:8}}>Pro Feature</div><p style={{color:'#666',marginBottom:24}}>Upgrade to Pro for $25/month to unlock OBSIDIAN AI.</p><a href="/upgrade" style={{background:'#e83a2e',color:'white',padding:'11px 28px',borderRadius:8,textDecoration:'none',fontWeight:700}}>Upgrade to Pro →</a></div>}
      </div>
    </div>
  )
}
