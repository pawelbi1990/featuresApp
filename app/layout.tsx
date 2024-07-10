import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalStateProvider } from "../context/GlobalState"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SBB Features',
  description: 'Order and manage your features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  )
}
