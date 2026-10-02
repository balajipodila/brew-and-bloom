import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

const photos = [
  { id: 'photo-1495474472287-4d71bcdd2085', alt: 'A freshly brewed cup of coffee in the morning light', shape: 'gallery-tall' },
  { id: 'photo-1555507036-ab1f4038808a', alt: 'Golden flaky pastries fresh from the oven', shape: '' },
  { id: 'photo-1442512595331-e89e73853f31', alt: 'A barista pouring latte art at the counter', shape: '' },
  { id: 'photo-1445116572660-236099ec97a0', alt: 'A sunlit neighborhood café interior', shape: 'gallery-wide' },
  { id: 'photo-1501339847302-ac426a4a7cbb', alt: 'A quiet table ready for a slow brunch', shape: '' },
  { id: 'photo-1461023058943-07fcbe16d735', alt: 'Espresso and steamed milk in a ceramic cup', shape: 'gallery-tall' },
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const move = (delta: number) => setActive((index) => index === null ? null : (index + delta + photos.length) % photos.length)
  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setActive(null); if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [active])
  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="gallery-heading"><SectionHeading eyebrow="A peek through our window" title={<>Little moments,<br /><em>kept close.</em></>} /><p>Good light, good people, and the occasional pastry that didn’t make it to the plate.</p></div>
      <div className="gallery-grid">{photos.map((photo, index) => <motion.button key={photo.id} className={`gallery-tile ${photo.shape}`} onClick={() => setActive(index)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.07 }} aria-label={`View photo: ${photo.alt}`}><img src={`https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=900&q=82`} alt={photo.alt} loading="lazy" /><span className="gallery-zoom">View ↗</span></motion.button>)}</div>
      <AnimatePresence>{active !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}><button className="lightbox-close" aria-label="Close gallery" onClick={() => setActive(null)}><X /></button><button className="lightbox-arrow lightbox-prev" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); move(-1) }}><ArrowLeft /></button><motion.img key={photos[active].id} src={`https://images.unsplash.com/${photos[active].id}?auto=format&fit=crop&w=1800&q=90`} alt={photos[active].alt} initial={{ scale: 0.96 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()} /><button className="lightbox-arrow lightbox-next" aria-label="Next image" onClick={(event) => { event.stopPropagation(); move(1) }}><ArrowRight /></button><p>{photos[active].alt}</p></motion.div>}</AnimatePresence>
    </section>
  )
}