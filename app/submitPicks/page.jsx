'use client'
import dayjs from 'dayjs'
import {MdDeleteForever} from 'react-icons/md'
import {usePickContext} from '@/context/GlobalContext'

export default function SubmitPicksPage() {
  const {pickSlip, setPickSlip} = usePickContext()

  function handleDelete(e) {
    console.log(e.target.id)
    setPickSlip(pickSlip.filter(pick => pick.pickId !== e.target.id))
    console.log(pickSlip)
  }

  return (
    <div className='flex flex-col gap-4 items-center p-8'>
      {pickSlip.map(pick => (
        <div key={pick.pickId} className='flex items-center justify-center p-4 rounded-md gap-2 bg-white w-1/2'>
          <div className='flex gap-2'>
            <p>{dayjs(pick.startDate).format('ddd, MMM d')}</p>
            <p>{dayjs(pick.startTime).format('hh:mm')}</p>
          </div>
          <p className='text-xgraylight'>|</p>
          <p>{pick.matchup}</p>
          <p className='text-xgraylight'>|</p>
          <p className='font-bold'>
            {pick.pick} {pick.line}
          </p>
          <p></p>
          {/* <p className='text-xs text-xgraymid'>
            ({pick.loc}-{pick.pickType})
          </p> */}
          <MdDeleteForever onClick={e => handleDelete(e)} id={pick.pickId} className='ml-auto text-xl' />
        </div>
      ))}
    </div>
  )
}
