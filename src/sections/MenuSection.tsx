import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { categories, menu } from '../data/menu'
import type { MenuCategory } from '../data/menu'
import { MenuCard } from '../components/MenuCard'
import { SectionHeading } from '../components/SectionHeading'

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory>('Coffee')
  const items = menu.filter((item) => item.category === active)
  return (
    <section className="menu-section section-pad" id="menu">
      <div className="menu-heading"><SectionHeading eyebrow="A few things we love" title={<>The good<br /><em>stuff.</em></>} copy="Made here, sourced with care, best enjoyed without rushing." /><a className="inline-link menu-full-link" href="#reserve">See you at the table <ArrowUpRight size={16} /></a></div>
      <div className="menu-tabs" role="tablist" aria-label="Menu categories">{categories.map((category) => <button key={category} role="tab" aria-selected={active === category} className={active === category ? 'menu-tab is-active' : 'menu-tab'} onClick={() => setActive(category)}>{category}<span>0{categories.indexOf(category) + 1}</span></button>)}</div>
      <div className="menu-grid" role="tabpanel">{items.map((item, index) => <MenuCard key={item.name} item={item} index={index} />)}</div>
      <p className="menu-note">Our menu follows the seasons. Ask us what’s fresh today.</p>
    </section>
  )
}