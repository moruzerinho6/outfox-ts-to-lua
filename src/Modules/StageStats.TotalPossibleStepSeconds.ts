return function () {
  let fSecs = 0

  for (const i of $range(1, 1)) {
    const s = STATSMAN.GetPlayedStageStats(i)
    for (const a of $range(1, s.GetPlayedSongs().length)) {
      fSecs = fSecs + s.GetPlayedSongs()[a - 1].GetStepsSeconds() // -1 Becaise of the +1 added by TSTL
    }
  }

  const songoptions = GAMESTATE.GetSongOptionsObject('ModsLevel_Song')

  if (!songoptions) {
    return fSecs
  }

  return fSecs / songoptions.MusicRate()
}