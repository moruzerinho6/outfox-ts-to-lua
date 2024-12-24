return function (song, chart: Steps, timing, player) {
  if (!song || !chart || !NETMAN) {
    return null
  }

  const valueOverrides = {
    'FAPlus': 'itg-faplus',
    'ECFA': 'itg-ecfa'
  }

  const timingtoUse = valueOverrides[timing] || timing

  const rate = GAMESTATE.GetSongOptionsObject('ModsLevel_Preferred').MusicRate()

  if (type(chart) !== 'table') {
    const key = chart.GetChartKey()
    return NETMAN.HighScoresForChart(key, timingtoUse, rate, player)
  }

  if (player) {
    return NETMAN.HighScoresFromUser(player, chart, timingtoUse, rate)
  } else {
    return NETMAN.HighScoresFromChartList(chart, timingtoUse, rate)
  }
}