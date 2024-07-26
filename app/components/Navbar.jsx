'use client'
import {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/images/z-logo.png'
import profileDefault from '@/public/images/profile.png'
import {FaGoogle, FaApple, FaFacebook, FaXTwitter} from 'react-icons/fa6'

import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import {FaTwitterSquare} from 'react-icons/fa'

export default function Navbar() {
  const {data: session} = useSession()
  const profileImage = session?.user?.image
  console.log()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [providers, setProviders] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setAuthProviders()
  }, [])

  return (
    <nav className='px-10 bg-smokeygray text-white h-12 flex relative items-center justify-between border-b border-b-white/20'>
      <div className='flex items-center justify-center'>
        <Link href='/' className='mr-12'>
          <Image className='w-auto h-10' src={logo} alt='' />
        </Link>

        <div className='flex items-center'>
          <Link href='/' className={`${pathname === '/' ? 'border-b-2 border-b-bigorange bg-bigorange/10' : ''} leading-[44px] hover:bg-black/15 px-6 hover:transition-all hover:ease-linear`}>
            Games
          </Link>
          {session && (
            <>
              <Link href='/standings' className={`${pathname === '/standings' ? 'border-b-2 border-b-bigorange bg-bigorange/10' : ''} leading-[44px] hover:bg-black/15 px-6 hover:transition-all hover:ease-linear`}>
                Standings
              </Link>

              <Link href='/book' className={`${pathname === '/book' ? 'border-b-2 border-b-bigorange bg-bigorange/10' : ''} leading-[44px] hover:bg-black/15 px-6 hover:transition-all hover:ease-linear`}>
                Book
              </Link>
            </>
          )}
        </div>
      </div>

      {/* <!-- Right Side Menu (Logged Out) --> */}
      {!session && (
        <div className='hidden md:block md:ml-6'>
          <div className='flex items-center gap-2'>
            <span className='mr-2'>Login with:</span>
            <button onClick={() => signIn('google')} title='Google' className='rounded-md bg-black border border-black px-3 py-2 hover:border-white'>
              <FaGoogle />
            </button>
            <button onClick={() => signIn('twitter')} title='Twitter' className='rounded-md bg-black border border-black px-3 py-2 hover:border-white'>
              <FaXTwitter />
            </button>
            <button onClick={() => signIn('apple')} title='Apple' className='rounded-md bg-black border border-black px-3 py-2 hover:border-white'>
              <FaApple />
            </button>
            <button onClick={() => signIn('facebook')} title='Facebook' className='rounded-md bg-black border border-black px-3 py-2 hover:border-white'>
              <FaFacebook />
            </button>
          </div>
        </div>
      )}

      {/* <!-- Right Side Menu (Logged In) --> */}
      {session && (
        <div>
          {/* <!-- Profile dropdown button --> */}
          <div className='ml-4'>
            <button type='button' className='flex items-center ml-auto' onClick={() => setIsProfileMenuOpen(prev => !prev)}>
              <span className='mr-2'>{session?.user.name}</span>
              <Image className='rounded-full' src={session?.user?.image || profileDefault} width={40} height={40} alt='' />
            </button>

            {/* <!-- Profile dropdown --> */}
            {isProfileMenuOpen && (
              <div id='user-menu' className='absolute right-0 py-1 mt-2 bg-white rounded-md shadow-lg z-10w-48 border' tabIndex='-1'>
                <Link href='/profile' onClick={() => setIsProfileMenuOpen(false)} className='whitespace-nowrap px-4 py-2 text-sm text-gray-700' tabIndex='-1'>
                  Profile
                </Link>

                <button
                  className='block whitespace-nowrap px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex='-1'
                  id='user-menu-item-2'
                  onClick={() => {
                    setIsProfileMenuOpen(false)
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
