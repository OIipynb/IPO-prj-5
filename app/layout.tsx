import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AccessibilityProvider } from '@/lib/accessibility-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CyberEdu-K - Aprèn Ciberseguretat',
  description: 'Plataforma educativa de ciberseguretat per a totes les edats. Notícies, jocs i recursos per aprendre a protegir-te en línia.',
  generator: 'v0.app',
  keywords: ['ciberseguretat', 'educació', 'jocs', 'notícies', 'seguretat informàtica'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ca" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <AccessibilityProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </AccessibilityProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
