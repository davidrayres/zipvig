import {Inter} from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import {SessionProvider} from 'next-auth/react'
import {PickProvider} from '@/context/GlobalContext'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'zipvig',
  description: 'ZERO VIGORISH',
}

export default function RootLayout({children}) {
  return (
    <SessionProvider>
      <PickProvider>
        <html lang='en'>
          <body className={`bg-xgraylight select-none ${inter.className}`}>
            <Navbar />
            <main>{children}</main>
          </body>
        </html>
      </PickProvider>
    </SessionProvider>
  )
}
