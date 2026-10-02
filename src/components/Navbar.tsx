import { useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'

type Props = { theme: 'light' | 'dark'; toggleTheme: () => void }

const links = [['Menu', '#menu'], ['Our story', '#story'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Visit', '#contact']]

export function Navbar({ theme, toggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <header className="navbar-wrap">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Brew and Bloom home"><span className="brand-mark">b<span>.</span></span><span className="brand-name">brew <i>&</i> bloom</span></a>
        <div className={`nav-links ${open ? 'nav-links--open' : ''}`}>
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
        <div className="nav-actions">
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a href="#reserve" className="nav-reserve">Reserve a table <ArrowUpRight size={15} /></a>
          <button className="icon-button mobile-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
    </header>
  )
}