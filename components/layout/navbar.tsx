'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Tumans Medicals Logo"
              width={40}
              height={40}
              className="object-contain flex-shrink-0"
            />
            <span className="font-black uppercase tracking-tighter text-xl leading-none" style={{ color: '#9e5862' }}>
              Tumans Medicals
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold tracking-tight transition-colors"
                style={
                  pathname === link.href
                    ? { color: '#9e5862', borderBottom: '2px solid #9e5862' }
                    : { color: '#475569' }
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+237699000001"
              className="flex items-center gap-2 text-sm font-medium transition-colors text-slate-600"
            >
              <Phone className="w-4 h-4" />
              <span>+237 699 000 001</span>
            </a>
            <Link
              href="/contact"
              className="text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: '#566955' }}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-md text-sm font-bold tracking-tight transition-colors"
                  style={
                    pathname === link.href
                      ? { color: '#9e5862', backgroundColor: '#fdf2f3' }
                      : { color: '#475569' }
                  }
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="tel:+237699000001"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +237 699 000 001
                </a>
                <Link
                  href="/contact"
                  className="mx-4 text-center text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#566955' }}
                >
                  Get a Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
