import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Forever Clean — Servicii de curățenie în Chișinău',
  description: 'Găsește servicii de curățenie profesionale în Chișinău. Rezervă online, prețuri transparente.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#7b8cc4" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
