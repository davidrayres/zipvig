import {auth} from '@/auth'
import dayjs from 'dayjs'
import {getGames} from '@/utils/getGames'
import GameDay from './components/GameDay'
import ConfirmPickButton from './components/ConfirmPickButton'

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
    <>
      {days.map((day, index) => (
        <GameDay key={index} day={day} games={games} />
      ))}
      {<ConfirmPickButton />}
    </>
  )
}
