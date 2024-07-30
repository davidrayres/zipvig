'use client'

export default function RulesPage() {
  getGames()
  return <div>RulesPage</div>
}

async function getGames() {
  const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&dates=20231010-20231016')
  const data = await res.json()
  const gameData = data.events
  console.log('GAMEDATA', gameData[0])
}
