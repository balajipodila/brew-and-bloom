export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export async function streamBaristaReply(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  })
  if (!response.ok || !response.body) {
    const detail = await response.json().catch(() => null) as { error?: string } | null
    throw new Error(detail?.error ?? 'The barista is taking a quick break. Please try again.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  while (true) {
    const { done, value } = await reader.read()
    buffer += decoder.decode(value, { stream: !done })
    const events = buffer.split('\n\n')
    buffer = events.pop() ?? ''
    for (const event of events) {
      const payload = event.split('\n').find((line) => line.startsWith('data: '))?.slice(6)
      if (!payload || payload === '[DONE]') continue
      const parsed = JSON.parse(payload) as { content?: string; error?: string }
      if (parsed.error) throw new Error(parsed.error)
      if (parsed.content) onChunk(parsed.content)
    }
    if (done) break
  }
}