'use client'
import Link from 'next/link'
import {usePickContext} from '@/context/GlobalContext'

export default function ConfirmPickButton() {
  const {pickSlip} = usePickContext()

  return (
    <>
      {pickSlip.length && (
        <Link href='/submitPicks' className='fixed mx-auto left-0 right-0 bottom-5 z-50 w-60 h-14 flex justify-center tracking-widest shadow-md shadow-xgraysmokey items-center gap-2 rounded-full text-center py-4 px-8 bg-black text-white'>
          Confirm <span className='p-2 w-10 h-10 bg-bigorange rounded-full'>{pickSlip.length}</span> Picks
        </Link>
      )}
    </>
  )
}
