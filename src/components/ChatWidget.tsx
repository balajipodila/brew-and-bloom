import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Coffee, LoaderCircle, Sparkles, X } from 'lucide-react'
import { streamBaristaReply, type ChatMessage } from '../lib/chat'

const suggestions = ['Something sweet & cold', 'A cozy coffee, no dairy', 'What goes with a latte?']

export function ChatWidget({ open, onClose, onOpen }: { open: boolean; onClose: () => void; onOpen: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: 'Hi there, I’m Bloom. Tell me what you’re craving and I’ll find a little something from our menu.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading, error])

  const send = async (value: string) => {
    const content = value.trim()
    if (!content || loading) return
    const conversation = [...messages, { role: 'user' as const, content }]
    setMessages([...conversation, { role: 'assistant', content: '' }])
    setInput(''); setError(''); setLoading(true)
    try {
      await streamBaristaReply(conversation, (chunk) => setMessages((current) => current.map((message, index) => index === current.length - 1 ? { ...message, content: message.content + chunk } : message)))
    } catch (reason) {
      setMessages((current) => current.slice(0, -1))
      setError(reason instanceof Error ? reason.message : 'The barista is taking a quick break. Please try again.')
    } finally { setLoading(false) }
  }

  return <>
    <AnimatePresence>{open && <motion.aside className="chat-panel" role="dialog" aria-modal="false" aria-label="Chat with our AI barista" initial={{ opacity: 0, y: 22, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.22 }}>
      <div className="chat-header"><span className="chat-avatar"><Coffee size={18} /></span><div><strong>Bloom, your barista</strong><small><span className="status-dot" /> Here for a little while</small></div><button className="icon-button" onClick={onClose} aria-label="Close chat"><X size={18} /></button></div>
      <div className="chat-messages" aria-live="polite">{messages.map((message, index) => <div key={`${index}-${message.role}`} className={`chat-message chat-message--${message.role}`}>{message.role === 'assistant' && <span className="chat-mini-avatar"><Sparkles size={12} /></span>}<p>{message.content || (loading && index === messages.length - 1 ? <span className="typing-dots"><i /><i /><i /></span> : '')}</p></div>)}{error && <p className="chat-error">{error}</p>}<div ref={endRef} /></div>
      {messages.length === 1 && <div className="chat-suggestions">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => void send(suggestion)}>{suggestion}</button>)}</div>}
      <form className="chat-compose" onSubmit={(event) => { event.preventDefault(); void send(input) }}><label className="sr-only" htmlFor="chat-input">Describe your mood or taste</label><input id="chat-input" value={input} maxLength={1200} onChange={(event) => setInput(event.target.value)} placeholder="I’m in the mood for…" disabled={loading} /><button type="submit" aria-label="Send message" disabled={!input.trim() || loading}>{loading ? <LoaderCircle className="spin" size={18} /> : <ArrowUp size={18} />}</button></form>
      <p className="chat-disclaimer">A little AI, a lot of good coffee.</p>
    </motion.aside>}</AnimatePresence>
    <button className={`chat-launcher ${open ? 'chat-launcher--open' : ''}`} onClick={open ? onClose : onOpen} aria-label={open ? 'Close barista chat' : 'Chat with our AI barista'} title="Meet your AI barista">{open ? <X size={22} /> : <><Sparkles size={17} /><span>Ask Bloom</span></>}</button>
  </>
}