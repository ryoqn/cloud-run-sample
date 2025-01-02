import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Provider } from '@/components/ui/provider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Provider>
          <main
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
