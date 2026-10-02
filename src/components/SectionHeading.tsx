import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = { eyebrow: string; title: ReactNode; copy?: string; align?: 'left' | 'center' }

export function SectionHeading({ eyebrow, title, copy, align = 'left' }: Props) {
  return (
    <motion.div className={`section-heading section-heading--${align}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.65 }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  )
}