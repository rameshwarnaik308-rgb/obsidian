import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  
  const { message } = await req.json()
  
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': Deno.env.get('ANTHROPIC_KEY') ?? '',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-20240307',
      max_tokens: 500,
      system: 'You are OBSIDIAN AI, a forensic trading coach. Be direct. Give one concrete action at the end. Max 150 words.',
      messages: [{ role: 'user', content: message }]
    })
  })
  
  const data = await res.json()
  return new Response(JSON.stringify({ reply: data.content?.[0]?.text }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
})
