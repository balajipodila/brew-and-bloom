import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const stats = [['06', 'years of slow mornings'], ['12', 'origin partners'], ['48k', 'cups shared with you']]

export function Story() {
  return (
    <section className="story section-pad" id="story">
      <div className="story__image-wrap"><motion.img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85" alt="A barista carefully pouring latte art into a ceramic cup" loading="lazy" initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} /><span className="image-caption">A little care in every cup.</span><span className="story-seal">EST.<br /><b>2018</b></span></div>
      <div className="story__content"><SectionHeading eyebrow="A neighborhood kind of place" title={<>Made with care.<br /><em>Meant to be shared.</em></>} /><p className="story-lede">We opened our doors with one small idea: the everyday deserves a little more attention.</p><p className="story-copy">That means knowing the people who grow our coffee, making pastry before the city wakes, and remembering how you take your usual. Nothing complicated. Just the good stuff, done thoughtfully.</p><a className="inline-link" href="#contact">Come say hello <ArrowUpRight size={16} /></a></div>
      <div className="story-stats">{stats.map(([value, label], index) => <motion.div key={label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}><strong>{value}<span>{index === 2 ? '+' : ''}</span></strong><small>{label}</small></motion.div>)}</div>
    </section>
  )
}