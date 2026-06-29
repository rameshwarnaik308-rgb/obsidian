import React from 'react'
export default function Settings() {
  return (
    <div style={{padding:40}}>
      <div style={{fontSize:11,color:'#e83a2e',letterSpacing:3,marginBottom:8}}>CONFIGURATION</div>
      <h1 style={{fontSize:32,fontWeight:800,marginBottom:6}}>Settings</h1>
      <p style={{color:'#555',fontSize:14,marginBottom:32}}>Tune OBSIDIAN to your style.</p>
      <div style={{background:'#111',border:'1px solid #1a1a1a',borderRadius:16,padding:28}}>
        <div style={{fontSize:11,color:'#e83a2e',letterSpacing:2,marginBottom:12}}>THEME</div>
        <div style={{fontSize:18,fontWeight:700}}>Obsidian Dark — Active</div>
      </div>
    </div>
  )
}
