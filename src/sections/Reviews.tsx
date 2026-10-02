import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const reviews = [
  { quote: 'The kind of place that remembers your name and somehow makes Tuesday feel like a small occasion.', name: 'Mara L.', note: 'A regular since 2020' },
  { quote: 'Best morning bun in Hyderabad, and the people behind the counter make the whole neighbourhood feel warmer.', name: 'Elliot R.', note: 'Local guide' },
  { quote: 'I came in for a coffee and stayed three hours. The light, the playlist, the cardamom latte. All of it.', name: 'June K.', note: 'Visited last week' },
]

export function Reviews() {
  const [active, setActive] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % reviews.length), 6500); return () => window.clearInterval(timer) }, [])
  const move = (delta: number) => setActive((value) => (value + delta + reviews.length) % reviews.length)
  return <section className="reviews-section section-pad" id="reviews"><div className="reviews-head"><SectionHeading eyebrow="Kind words, over coffee" title={<>The feeling’s<br /><em>mutual.</em></>} /><div className="review-controls"><button className="icon-button" onClick={() => move(-1)} aria-label="Previous review"><ArrowLeft size={18} /></button><button className="icon-button" onClick={() => move(1)} aria-label="Next review"><ArrowRight size={18} /></button></div></div><div className="review-stage"><AnimatePresence mode="wait"><motion.article key={active} className="review-quote" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}><div className="stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><blockquote>“{reviews[active].quote}”</blockquote><div className="review-byline"><strong>{reviews[active].name}</strong><span>{reviews[active].note}</span></div></motion.article></AnimatePresence><div className="review-count">0{active + 1}<span> / 0{reviews.length}</span></div></div><div className="review-dots" role="tablist" aria-label="Choose a review">{reviews.map((review, index) => <button key={review.name} onClick={() => setActive(index)} aria-label={`Show review ${index + 1}`} aria-selected={active === index} className={active === index ? 'is-active' : ''} />)}</div></section>
}