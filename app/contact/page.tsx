import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/contact/contact-page-content'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Tumans Medicals SARL for product inquiries and customised supply solutions. Reach us at any of our branches in Yaounde, Douala, Maroua, or Tchad.',
}

export default function ContactPage() {
  return <ContactPageContent />
}
