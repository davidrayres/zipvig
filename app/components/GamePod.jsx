'use client'
import {createContext, useContext, useState} from 'react'
import Image from 'next/image'

export default function GamePod({game}) {
  // const [pickSlip, setPickSlip] = useState([])
  const pickSlip = []

  const gameId = game.id
  const date = game.date
  const timeTv = game.status.type.shortDetail
  const matchup = game.shortName
  const favorite = game.competitions[0].odds?.[0].details?.split(' -')[0]
  const spread = game.competitions[0].odds?.[0].details?.split(' -')[1]
  const total = game.competitions[0].odds?.[0].overUnder
  const state = game.status.type.description

  const visitorConf = game.competitions[0].competitors[1].team.conferenceId
  const visitorLogo = game.competitions[0].competitors[1].team.logo
  const visitorRank = game.competitions[0].competitors[1].curatedRank?.current
  const visitorName = game.competitions[0].competitors[1].team.abbreviation
  const visitorRecord = game.competitions[0].competitors[1].records?.[0].summary
  const visitorScore = game.competitions[0].competitors[1].score
  const visitorWin = game.competitions[0].competitors[1].winner
  const visitorLocation = game.competitions[0].competitors[1].homeAway

  const homeConf = game.competitions[0].competitors[0].team.conferenceId
  const homeLogo = game.competitions[0].competitors[0].team.logo
  const homeRank = game.competitions[0].competitors[0].curatedRank?.current
  const homeName = game.competitions[0].competitors[0].team.abbreviation
  const homeRecord = game.competitions[0].competitors[0].records?.[0].summary
  const homeScore = game.competitions[0].competitors[0].score
  const homeWin = game.competitions[0].competitors[0].winner
  const homeLocation = game.competitions[0].competitors[0].homeAway

  const oddsOff = !spread
  const visitorPick = favorite === visitorName ? 'fav' : 'dog'
  const visitorSpread = spread ? (favorite === visitorName ? `-${spread}` : `+${spread}`) : 'off'
  const homePick = favorite === homeName ? 'fav' : 'dog'
  const homeSpread = spread ? (favorite === homeName ? `-${spread}` : `+${spread}`) : 'off'

  return (
    <div className='flex flex-col gap-2 bg-white p-4 w-full rounded'>
      <div className='flex'>
        <p className='text-sm font-bold'>{timeTv}</p>
        <p className='ml-auto mr-2 min-w-12 max-w-12 text-center text-xs py-1'>Spread</p>
        <p className='min-w-12 max-w-12 text-center text-xs py-1'>Total</p>
      </div>

      {/* VISITOR ROW*/}
      <div className={`flex gap-2 items-center ${visitorWin && 'font-bold'}`}>
        <Image src={visitorLogo} width='20' height='20' alt='' priority='true' />
        {visitorRank < 26 && <p className='text-xs'>{visitorRank}</p>}
        <p>{visitorName}</p>
        <p className='text-xs text-xgraysmokey'>({visitorRecord})</p>
        <p className='ml-auto mr-4'>{visitorScore}</p>

        {/* pick buttons */}
        <div id={`${gameId}-visitorspread`} data-pick={visitorName} data-bettype='spread' data-picktype={visitorPick} data-loc='away' onClick={e => handlePick(e)} className={`min-w-12 max-w-12 text-white border border-xgraysmokey hover:border-bigorange text-center text-sm bg-xgraysmokey rounded py-1 cursor-pointer ${!spread && 'odds-off'}`}>
          {visitorSpread}
        </div>
        <div id={`${gameId}-over`} data-pick='OVER' data-bettype='total' data-picktype='over' onClick={e => handlePick(e)} className={`min-w-12 max-w-12 text-white border border-xgraysmokey hover:border-bigorange text-center text-sm bg-xgraysmokey rounded py-1 cursor-pointer ${!total && 'odds-off'}`}>
          {(total && `o${total}`) || 'off'}
        </div>
      </div>

      {/* HOME ROW*/}
      <div className={`flex gap-2 items-center ${homeWin && 'font-bold'}`}>
        <Image src={homeLogo} width='20' height='20' alt='' priority='true' />
        {homeRank < 26 && <p className='text-xs'>{homeRank}</p>}
        <p>{homeName}</p>
        <p className='text-xs text-xgraysmokey'>({homeRecord})</p>
        <p className='ml-auto mr-4'>{homeScore}</p>

        {/* pick buttons */}
        <div id={`${gameId}-visitorspread`} data-pick={homeName} data-bettype='spread' data-picktype={homePick} data-loc='away' onClick={e => handlePick(e)} className={`min-w-12 max-w-12 text-white border border-xgraysmokey hover:border-bigorange text-center text-sm bg-xgraysmokey rounded py-1 cursor-pointer ${!spread && 'odds-off'}`}>
          {homeSpread}
        </div>
        <div id={`${gameId}-under`} data-pick='UNDER' data-bettype='total' data-picktype='under' onClick={e => handlePick(e)} className={`min-w-12 max-w-12 text-white border border-xgraysmokey hover:border-bigorange text-center text-sm bg-xgraysmokey rounded py-1 cursor-pointer ${!total && 'odds-off'}`}>
          {(total && `u${total}`) || 'off'}
        </div>
      </div>
    </div>
  )

  function handlePick(e) {
    if (e.target.innerText === 'off') return

    //remove pick if clicked on an existing pick
    if (e.target.classList.contains('pick')) {
      const idIndex = pickSlip.findIndex(pick => pick.pickId === e.target.id)
      pickSlip.splice(idIndex, 1)
      // setPickSlip(pickSlip.filter(pick => pick.pickId !== e.target.id))
      // setPickSlip(pickSlip.splice(idIndex, 1))
      e.target.classList.remove('pick')
      console.log(pickSlip)
      return
    }

    e.target.classList.add('pick')

    const pickType = e.target.dataset.pickType
    const line = pickType === 'spread' ? e.target.innerText.slice(1) : e.target.innerText

    const newPick = {
      pickId: e.target.id,
      gameId: gameId,
      gameState: timeTv,
      startDate: new Date(date),
      startTime: new Date(date).getTime().toString(),
      matchup: matchup,
      favorite: favorite || 'na',
      pick: e.target.dataset.pick,
      betType: e.target.dataset.bettype, //spread, total
      pickType: pickType, //fav, dog, over, under
      line: line,
      score: 'tbd',
      result: 'tbd',
      loc: e.target.dataset.loc || 'na',
      league: 'tbd',
      conf: 'tbd',
      logo: e.target.dataset.pick === homeName ? homeLogo : visitorLogo,
    }
    console.log(newPick)

    pickSlip.push(newPick)
    // setPickSlip(...pickSlip, newPick)
    // setPickSlip(pickSlip.push(newPick))

    console.log(pickSlip)
  }
}
