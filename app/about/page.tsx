import type { Metadata } from 'next'
import { AboutContent } from '@/components/about/about-content'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about Tumans Medicals SARL — our mission, values, and commitment to equipping Cameroon's healthcare system with world-class medical equipment.",
}

export default function AboutPage() {
  return <AboutContent />
}
