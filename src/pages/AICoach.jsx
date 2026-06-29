import React, { useState } from 'react'

export default function AICoach({ profile }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const prompts = ['Review my last losing trade and tell me what I did wrong.', 'Am I overleveraging? Analyze my risk %.', 'Detect emotional patterns in my notes from this week.', 'Summarize my performance and give one next action.']

  async function send(text) {
    const msg = text || input
    if (!msg.trim()) return
    setMessages(m => [...m, { role: 'user', content: msg }])
    setInput(''); setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-request-header': 'true'
        },
        body: JSON.stringify({
          model: 'claude-haiku-20240307',
          max_tokens: 500,
          system: 'You are OBSIDIAN AI, a forensic trading coach. Be direct. Give one concrete action at the end. Max 150 words.',
          messages: [{ role: 'user', content: msg }]
        })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.content?.[0]?.text || 'Error: ' + JSON.stringify(data) }])
    } catch(e) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error: ' + e.message }])
    }
    setLoading(false)
  }

  return (
    <div style={{padding:40,display:'flex',flexDirection:'column',height:'calc(100vh - 80px)'}}>
      <div style={{fontSize:11,color:'#e83a2e',letterSpacing:3,marginBottom:8}}>IN-HOUSE INTELLIGENCE</div>
      <h1 style={{fontSize:32,fontWeight:800,marginBottom:6}}>OBSIDIAN AI</h1>
      <p style={{color:'#555',fontSize:14,marginBottom:28}}>Forensic trade reviews. Risk and emotional pattern detection.</p>
      <div style={{flex:1,background:'#111',border:'1px solid #1a1a1a',borderRadius:16,display:'flex',flexDirection:'column',minHeight:0}}>
        <div style={{flex:1,overflowY:'auto',padding:24}}>
          {messages.length === 0 ? (
            <div style={{textAlign:'center',padding:'40px 20px'}}>
              <div style={{fontSize:32,color:'#e83a2e',marginBottom:16}}>✦</div>
              <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>How can I sharpen your edge?</div>
              <p style={{color:'#666',fontSize:13,marginBottom:28}}>Ask anything about your trades, risk, or process.</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,maxWidth:600,margin:'0 auto'}}>
                {prompts.map(p => <button key={p} onClick={() => send(p)} style={{background:'#1a1a1a',border:'1px solid #222',color:'#ccc',padding:16,borderRadius:10,cursor:'pointer',fontSize:13,textAlign:'left',lineHeight:1.4}}>{p}</button>)}
              </div>
            </div>
          ) : messages.map((m,i) => (
            <div key={i} style={{marginBottom:20,display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
              <div style={{maxWidth:'75%',background:m.role==='user'?'#e83a2e':'#1a1a1a',padding:'12px 16px',borderRadius:12,fontSize:14,lineHeight:1.6,color:'#f0f0f0'}}>{m.content}</div>
            </div>
          ))}
          {loading && <div style={{color:'#555',fontSize:13,padding:8}}>OBSIDIAN AI is analyzing...</div>}
        </div>
        <div style={{padding:'16px 20px',borderTop:'1px solid #1a1a1a',display:'flex',gap:10}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask OBSIDIAN AI..." style={{flex:1,background:'#1a1a1a',border:'1px solid #2a2a2a',borderRadius:8,padding:'10px 14px',color:'#f0f0f0',fontSize:14,outline:'none',fontFamily:'Inter,sans-serif'}} />
          <button onClick={()=>send()} style={{background:'#e83a2e',border:'none',color:'white',width:40,height:40,borderRadius:8,cursor:'pointer',fontSize:18}}>↑</button>
        </div>
      </div>
    </div>
  )
}
