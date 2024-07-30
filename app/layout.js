import {Inter} from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import {SessionProvider} from 'next-auth/react'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'zipvig',
  description: 'BRING DOWN THE HOUSE',
}

export default function RootLayout({children}) {
  return (
    <SessionProvider>
      <html lang='en'>
        <body className={`bg-xgraylight ${inter.className}`}>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </SessionProvider>
  )
}
