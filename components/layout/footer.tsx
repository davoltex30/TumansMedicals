import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Plus } from 'lucide-react'

const productLinks = [
  { label: 'Surgical Equipment', href: '/categories/surgical' },
  { label: 'Laboratory Equipment', href: '/categories/laboratory' },
  { label: 'Diagnostic Kits', href: '/categories/diagnostic' },
  { label: 'Medical Furniture', href: '/categories/furniture' },
  { label: 'Emergency Equipment', href: '/categories/emergency' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'All Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Contact Us', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#131b2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#00288e] rounded-full flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="font-black text-white uppercase tracking-tighter text-xl leading-none">
                Tumans Medicals SARL
              </span>
            </div>
            <p className="text-[#9498a8] text-sm leading-relaxed mb-6">
              Cameroon&apos;s trusted full-service medical and laboratory wholesaler.
              Equipping surgical theaters, emergency departments, and diagnostic laboratories
              with world-class equipment.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4 text-[#9498a8]" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4 text-[#9498a8]" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4 text-[#9498a8]" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#b8c4ff] mb-4">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#9498a8] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#b8c4ff] mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#9498a8] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#b8c4ff] mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9498a8] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#9498a8]">Douala, Cameroon (Head Office)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#9498a8] flex-shrink-0" />
                <a href="tel:+237699000001" className="text-sm text-[#9498a8] hover:text-white transition-colors">
                  +237 699 000 001
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#9498a8] flex-shrink-0" />
                <a href="mailto:info@tumansmedicals.cm" className="text-sm text-[#9498a8] hover:text-white transition-colors">
                  info@tumansmedicals.cm
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9498a8]/60">
            © {new Date().getFullYear()} Tumans Medicals SARL. All rights reserved.
          </p>
          <p className="text-sm text-[#9498a8]/60">
            Medical &amp; Laboratory Wholesaler · Cameroon
          </p>
        </div>
      </div>
    </footer>
  )
}
