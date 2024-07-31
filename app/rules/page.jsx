'use client'

export default function RulesPage() {
  getData('20240903-20240909')
  return <div>RulesPage</div>
}

async function getData(dates) {
  const ncaaUrl = fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=1000&dates=${dates}`)
  const nflUrl = fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=${dates}`)
  const results = await Promise.all([ncaaUrl, nflUrl])
  const data = await Promise.all(results.map(result => result.json()))
  const games = [...data[0].events, ...data[1].events]
  console.log('GAMES', games)
  return games
}
