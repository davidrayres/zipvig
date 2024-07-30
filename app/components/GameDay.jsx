import dayjs from 'dayjs'
import GamePod from '@/app/components/GamePod'

export default function GameDay({day, games}) {
  const thisDayGames = games.filter(game => {
    return dayjs(game.date).format('YYYY-MM-DD') === day
  })
  return (
    <>
      <div className='sticky z-50 top-0 px-2 py-1 bg-xgraysmokey text-white text-sm'>{dayjs(day).format('dddd, M/D')}</div>
      <div className='sm:px-16 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2 m-4'>
        {thisDayGames.map(game => (
          <GamePod key={game.id} game={game} />
        ))}
      </div>
    </>
  )
}

//       <div className='sm:px-16 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-2'>
//         {if(!thisDayGames.length) {
//           <div>-- No Games --</div>
//         }else{

//         }}
// }

//         {if(thisDayGames.length) {

//         }

//           games.map(game => {
//               ;<GamePod key={game.id} game={game} />
//           })}
//         {games.map(game => <GamePod key={game.id} game={game} />)}
//         )

//       </div>