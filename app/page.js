import {auth} from '@/auth'
import GameDay from './components/GameDay'
import dayjs from 'dayjs'

export default async function Page() {
  const session = await auth()
  const user = session?.user?.email
  const games = await getGames()
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
    </main>
  )
}

async function getGames() {
  const dates = '20240903-20240909'
  const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&dates=${dates}`)
  if (!res) {
    throw new Error('failed to fetch games')
  }

  const data = await res.json()
  const gameData = data.events

  return gameData
}
