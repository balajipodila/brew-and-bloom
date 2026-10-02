import { motion } from 'framer-motion'
import type { MenuItem } from '../data/menu'

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const image = `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=700&q=82`
  return (
    <motion.article className="menu-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}>
      <div className="menu-card__image"><img src={image} alt={item.name} loading="lazy" />{item.tags?.[0] && <span className="menu-tag">{item.tags[0]}</span>}</div>
      <div className="menu-card__body"><div className="menu-card__title"><h3>{item.name}</h3><span>{item.price}</span></div><p>{item.description}</p>{item.tags?.includes('Vegan') && <span className="dietary-tag">Plant based</span>}</div>
    </motion.article>
  )
}