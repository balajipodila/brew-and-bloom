import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import { useRef } from 'react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '23%'])
  return (
    <section className="hero" id="home" ref={ref}>
      <motion.div className="hero__backdrop" style={{ y }} />
      <div className="hero__shade" />
      <div className="hero__grain" />
      <div className="hero__content">
        <motion.div className="hero__copy" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <span className="hero-kicker"><span /> YOUR NEIGHBORHOOD, A LITTLE SLOWER</span>
          <h1>A softer start<br />to <em>every day.</em></h1>
          <p>Thoughtfully sourced coffee, something lovely from the oven, and room to stay a while.</p>
          <div className="hero-actions"><a className="button button--light" href="#menu">Find your favorite <ArrowUpRight size={16} /></a><a className="hero-text-link" href="#story">Our little story <span>↗</span></a></div>
        </motion.div>
      </div>
      <motion.div className="hero-stamp" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, duration: 0.7 }}>
        <Sparkles size={15} /><span>GOOD COFFEE.<br />GOOD COMPANY.</span>
      </motion.div>
      <div className="hero-bottom"><span>PORTLAND, OREGON · EST. 2018</span><a href="#story" aria-label="Scroll to our story"><ArrowDown size={18} /></a><span>45°31' N&nbsp; 122°40' W</span></div>
      <div className="steam steam--one" /><div className="steam steam--two" />
    </section>
  )
}