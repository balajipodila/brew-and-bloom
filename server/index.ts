import 'dotenv/config'
import express from 'express'
import { menu } from '../src/data/menu'

const app = express()
const port = Number(process.env.API_PORT ?? 3001)
const rateWindows = new Map<string, { count: number; resetAt: number }>()

app.use(express.json({ limit: '12kb' }))
app.use('/api', (req, res, next) => {
  const key = req.ip ?? 'unknown'
  const now = Date.now()
  const window = rateWindows.get(key)
  if (!window || now > window.resetAt) rateWindows.set(key, { count: 1, resetAt: now + 60_000 })
  else if (window.count >= 20) return res.status(429).json({ error: 'A little too much coffee at once. Try again in a minute.' })
  else window.count += 1
  next()
})

type Message = { role: 'user' | 'assistant'; content: string }
const clean = (value: string) => value.replace(/[<>\u0000-\u001f]/g, '').trim()

async function* mockReply(message: string) {
  const text = message.toLowerCase()
  const pick = text.includes('cold') || text.includes('iced')
    ? menu.find((item) => item.name === 'Brown sugar shaken cold brew')!
    : text.includes('sweet') || text.includes('cozy') || text.includes('warm')
      ? menu.find((item) => item.name === 'Maple sea-salt mocha')!
      : text.includes('vegan') || text.includes('plant')
        ? menu.find((item) => item.name === 'Honey oat flat white')!
        : menu.find((item) => item.name === 'Rose cardamom latte')!
  const pastry = menu.find((item) => item.category === 'Pastries' && item.tags?.includes('Bestseller'))!
  const answer = `I have just the thing. Try our ${pick.name} (${pick.price}) for ${pick.description.toLowerCase()} If you fancy a little something with it, the ${pastry.name} (${pastry.price}) is a lovely pairing. Everything I recommend is on our menu; tell me what flavors you usually reach for and I can fine-tune it.`
  for (const word of answer.match(/\S+\s*/g) ?? []) {
    yield word
    await new Promise((resolve) => setTimeout(resolve, 24))
  }
}

app.post('/api/chat', async (req, res) => {
  const raw = req.body as { messages?: unknown }
  if (!Array.isArray(raw.messages) || raw.messages.length === 0 || raw.messages.length > 20) {
    return res.status(400).json({ error: 'Please send a message and keep the conversation under 20 turns.' })
  }
  const messages = raw.messages as Message[]
  if (messages.some((item) => !item || !['user', 'assistant'].includes(item.role) || typeof item.content !== 'string' || item.content.length > 1200)) {
    return res.status(400).json({ error: 'Messages must be plain text under 1,200 characters.' })
  }
  const latest = messages.at(-1)
  if (latest?.role !== 'user' || !clean(latest.content)) return res.status(400).json({ error: 'Please add a little detail so the barista can help.' })

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()
  const send = (content: string) => res.write(`data: ${JSON.stringify({ content })}\n\n`)

  try {
    if (!process.env.AI_API_KEY) {
      for await (const chunk of mockReply(clean(latest.content))) send(chunk)
    } else {
      const response = await fetch(process.env.AI_API_URL ?? 'https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.AI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: process.env.AI_MODEL ?? 'gpt-4o-mini',
          stream: true,
          messages: [
            { role: 'system', content: `You are Bloom, a warm and concise neighborhood café barista. Recommend only items in this menu; never invent items or prices. If asked for something unrelated, gently guide the conversation back to café drinks and food. Menu: ${JSON.stringify(menu)}` },
            ...messages.map((item) => ({ role: item.role, content: clean(item.content) })),
          ],
        }),
      })
      if (!response.ok || !response.body) throw new Error('The recommendation service is temporarily unavailable.')
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        buffer += decoder.decode(value, { stream: !done })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ') || line.slice(6) === '[DONE]') continue
          const event = JSON.parse(line.slice(6)) as { choices?: { delta?: { content?: string } }[] }
          const content = event.choices?.[0]?.delta?.content
          if (content) send(content)
        }
        if (done) break
      }
    }
    res.write('data: [DONE]\n\n')
    res.end()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The barista is taking a quick break.'
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`)
    res.end()
  }
})

app.listen(port, () => console.log(`Brew & Bloom API listening on http://localhost:${port}`))