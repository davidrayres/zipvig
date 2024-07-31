import {auth} from '@/auth'
import GameDay from './components/GameDay'
import dayjs from 'dayjs'

export default async function Page() {
  const session = await auth()
  const user = session?.user?.email
  const games = await getGames('20240903-20240909')
  const startDate = '20240903'
  const days = []

  for (let i = 0; i <= 6; i++) {
    const day = dayjs(startDate).add(i, 'day').format('YYYY-MM-DD')
    days.push(day)
  }

  return (
    <main>
      {days.map((day, index) => (
        <GameDay key={index} day={day} games={games} />
      ))}
      <button className='fixed mx-auto left-0 right-0 bottom-5 z-50 w-60 h-14 flex justify-center tracking-widest shadow-md shadow-xgraysmokey items-center gap-2 rounded-full text-center py-4 px-8 bg-black text-white'>
        Confirm <span className='p-2 w-10 h-10 bg-bigorange rounded-full'>22</span> Picks
      </button>
    </main>
  )
}

async function getGames(dates) {
  const ncaaUrl = fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&dates=${dates}`)
  const nflUrl = fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=${dates}`)
  const results = await Promise.all([ncaaUrl, nflUrl])
  const data = await Promise.all(results.map(result => result.json()))
  const games = [...data[0].events, ...data[1].events]
  console.log('GAMES', games)
  return games
}
