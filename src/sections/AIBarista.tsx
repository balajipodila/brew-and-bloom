import { useState } from 'react'
import { ArrowRight, ChevronRight, Coffee, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { menu } from '../data/menu'
import { streamBaristaReply } from '../lib/chat'
import { SectionHeading } from '../components/SectionHeading'

const questions = [
  { title: 'What sounds good right now?', options: ['Something cozy', 'Cool & refreshing', 'A little sweet', 'Bright & lively'] },
  { title: 'Pick a flavor note.', options: ['Chocolate', 'Floral', 'Citrus', 'Warm spice'] },
  { title: 'How do you take your milk?', options: ['Oat, please', 'Dairy is lovely', 'Keep it black', 'Surprise me'] },
  { title: 'Any little something with it?', options: ['A flaky pastry', 'Something savory', 'Just the drink', 'Dealer’s choice'] },
]

export function AIBarista() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState('')
  const submitQuiz = async (nextAnswers: string[]) => {
    setLoading(true); setError(''); setResult('')
    try {
      await streamBaristaReply([{ role: 'user', content: `Recommend from the café menu for my tastes: ${nextAnswers.join('; ')}. Name the best matching drink and food, include menu prices, and explain briefly why.` }], (chunk) => setResult((value) => value + chunk))
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not find your brew just now.') }
    finally { setLoading(false) }
  }
  const choose = (answer: string) => {
    const next = [...answers, answer]
    setAnswers(next); setSelected(answer)
    if (step === questions.length - 1) { setStep(questions.length); void submitQuiz(next) }
    else { window.setTimeout(() => { setStep((value) => value + 1); setSelected('') }, 180) }
  }
  const reset = () => { setAnswers([]); setStep(0); setResult(''); setError(''); setSelected('') }
  return (
    <section className="barista-section section-pad" id="barista">
      <div className="barista-intro"><span className="barista-orbit"><Coffee size={23} /><Sparkles size={14} /></span><SectionHeading eyebrow="A little help from our friend" title={<>Meet your<br /><em>AI barista.</em></>} copy="Tell us what you’re in the mood for. We’ll find something lovely on the menu." /></div>
      <div className="quiz-panel">
        <div className="quiz-top"><span className="quiz-label"><span className="status-dot" /> YOUR PERSONAL BREW GUIDE</span><span className="quiz-step">{step < questions.length ? `0${step + 1} / 04` : 'YOUR MATCH'}</span></div>
        {step < questions.length ? <motion.div key={step} className="quiz-question" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}><h3>{questions[step].title}</h3><div className="quiz-options">{questions[step].options.map((option) => <button key={option} className={selected === option ? 'quiz-option is-selected' : 'quiz-option'} onClick={() => choose(option)}>{option}<ChevronRight size={16} /></button>)}</div><div className="quiz-progress">{questions.map((_, index) => <span key={index} className={index <= step ? 'is-filled' : ''} />)}</div></motion.div> : <div className="quiz-result">{loading && !result && <div className="typing-dots" aria-label="Finding your brew"><i /><i /><i /></div>}{result && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{result}</motion.p>}{error && <p className="form-error">{error}</p>}{!loading && <button className="inline-link" onClick={reset}>{error ? 'Try again' : 'Start over'} <ArrowRight size={16} /></button>}</div>}
        <p className="quiz-footnote">Thoughtful suggestions, always from our real menu of {menu.length} good things.</p>
      </div>
    </section>
  )
}