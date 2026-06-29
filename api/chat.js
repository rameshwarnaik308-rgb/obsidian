export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { message } = req.body
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-20240307',
      max_tokens: 500,
      system: 'You are OBSIDIAN AI, a forensic trading coach. Be direct. Give one concrete action at the end. Max 150 words.',
      messages: [{ role: 'user', content: message }]
    })
  })
  const data = await response.json()
  res.status(200).json({ reply: data.content?.[0]?.text || 'Error' })
}
