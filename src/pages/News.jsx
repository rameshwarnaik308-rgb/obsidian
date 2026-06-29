import React, { useState } from 'react'
const NEWS = [
  { cat: 'ECONOMIC', title: 'Fed signals patience as inflation cools', src: 'REUTERS', time: '12M AGO' },
  { cat: 'CRYPTO', title: 'Bitcoin reclaims $72k as ETF inflows resume', src: 'BLOOMBERG', time: '38M AGO' },
  { cat: 'FOREX', title: 'USD/JPY slips below 152 after BoJ commentary', src: 'FINNHUB', time: '2H AGO' },
]
export default function News() {
  const [filter, setFilter] = useState('All')
  return (
    <div style={{padding:40}}>
      <div style={{fontSize:11,color:'#e83a2e',letterSpacing:3,marginBottom:8}}>THE WIRE</div>
      <h1 style={{fontSize:32,fontWeight:800,marginBottom:24}}>Market News</h1>
      <div style={{background:'#111',border:'1px solid #1a1a1a',borderRadius:12,overflow:'hidden'}}>
        {NEWS.map((n,i) => (
          <div key={i} style={{padding:'18px 24px',borderBottom:'1px solid #111'}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:4}}>{n.title}</div>
            <div style={{fontSize:11,color:'#555'}}>{n.src} · {n.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
