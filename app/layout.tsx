import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import { SiteChrome } from '@/components/layout/site-chrome'
import '../bones/registry'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tumansmedicals.cm'),
  title: {
    default: 'Tumans Medicals SARL | Medical & Laboratory Wholesaler Cameroon',
    template: '%s | Tumans Medicals SARL',
  },
  description:
    "Cameroon's trusted full-service medical and laboratory wholesaler. Supplying surgical theaters, emergency departments, and diagnostic laboratories with world-class equipment.",
  keywords: [
    'medical wholesaler Cameroon',
    'laboratory equipment Cameroon',
    'surgical equipment',
    'diagnostic kits',
    'medical furniture',
    'Tumans Medicals SARL',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_CM',
    url: 'https://tumansmedicals.cm',
    siteName: 'Tumans Medicals SARL',
    title: 'Tumans Medicals SARL | Medical & Laboratory Wholesaler Cameroon',
    description: "Cameroon's trusted medical and laboratory equipment wholesaler.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tumans Medicals SARL',
    description: "Cameroon's trusted medical and laboratory equipment wholesaler.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <SiteChrome>
            {children}
          </SiteChrome>
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  )
}
