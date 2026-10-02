import { lazy, Suspense, useState } from 'react'
import { Navbar } from './components/Navbar'
import { ChatWidget } from './components/ChatWidget'
import { useTheme } from './hooks/useTheme'
import { Hero } from './sections/Hero'
import { Story } from './sections/Story'
import { MenuSection } from './sections/MenuSection'
import { AIBarista } from './sections/AIBarista'
import { Reservation } from './sections/Reservation'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

const Gallery = lazy(() => import('./sections/Gallery').then((module) => ({ default: module.Gallery })))
const Reviews = lazy(() => import('./sections/Reviews').then((module) => ({ default: module.Reviews })))

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [chatOpen, setChatOpen] = useState(false)
  return <>
    <Navbar theme={theme} toggleTheme={toggleTheme} />
    <main>
      <Hero />
      <Story />
      <MenuSection />
      <AIBarista />
      <Suspense fallback={<div className="section-loading" aria-label="Loading gallery" />}><Gallery /></Suspense>
      <Suspense fallback={<div className="section-loading" aria-label="Loading reviews" />}><Reviews /></Suspense>
      <Reservation />
      <Contact />
    </main>
    <Footer />
    <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} onOpen={() => setChatOpen(true)} />
  </>
}