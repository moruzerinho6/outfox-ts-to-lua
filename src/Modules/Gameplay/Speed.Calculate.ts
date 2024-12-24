// @ts-ignore
return function (Player, Type, Speed) {
  const ObtainSpeedType = (pOptions: PlayerOptions) => {
    let sptype = 1

    if (pOptions.XMod()) {
      sptype = 1
    }

    if (pOptions.CMod()) {
      sptype = 2
    }

    if (pOptions.MMod()) {
      sptype = 3
    }

    if (pOptions.AMod()) {
      sptype = 4
    }

    if (pOptions.CAMod()) {
      sptype = 5
    }

    return sptype
  }

  const GetSpeed = (pOptions: PlayerOptions, CurType?: number) => {
    let stype = CurType || ObtainSpeedType(pOptions)

    if (stype === 1) {
      return pOptions.XMod() * 100
    }

    if (stype === 2) {
      return pOptions.CMod()
    }

    if (stype === 3) {
      return pOptions.MMod()
    }

    if (stype === 4) {
      return pOptions.AMod()
    }

    if (stype === 5) {
      return pOptions.CAMod()
    }

    return 0
  }

  let tmp = ''
  let CSpeedRated = ''
  let CurSpeedTxt = ''

  if (!GAMESTATE.GetCurrentSong()) {
    return $multi(tmp + 'BPM', CurSpeedTxt, CSpeedRated + 'BPM')
  }

  if (!GAMESTATE.GetCurrentSteps(Player)) {
    return $multi(tmp + 'BPM', CurSpeedTxt, CSpeedRated + 'BPM')
  }

  const format_bpm = (bpm: number) => {
    return '%.0f'['format'](bpm)
  }

  const speedtypes = ["X","C","M","A","CA"]
  const song_bpms = GAMESTATE.GetCurrentSteps(Player).GetDisplayBpms()
  const PlayerOptions = GAMESTATE.GetPlayerState(Player).GetPlayerOptions('ModsLevel_Preferred')
  const speedType = Type || ObtainSpeedType(PlayerOptions)
  const speedVal = Speed || GetSpeed(PlayerOptions, speedType)
  const isXMod = speedType === 1
  const speed = speedVal * 0.01
  const musicRate = GAMESTATE.GetSongOptionsObject('ModsLevel_Preferred' as unknown as ModsLevel).MusicRate()

  if (!isXMod) {
    return $multi(speedVal + 'BPM', (speedType[speedType] as string) + '' + speedVal)
  }

  CurSpeedTxt = string.format('%.2f', speed) + 'x'

  if (song_bpms[1 - 1] === song_bpms[2 - 1]) {
    tmp = format_bpm(song_bpms[1 - 1] * speed)
    CSpeedRated = format_bpm((song_bpms[1 - 1] * speed) * musicRate)
  } else {
    tmp = format_bpm((song_bpms[1 - 1] * speed)) + ' - ' + format_bpm((song_bpms[2 - 1] * speed))
    CSpeedRated = format_bpm((song_bpms[1] * speed) * musicRate) + " - " + format_bpm((song_bpms[2] * speed) * musicRate)
  }

  return $multi(tmp + 'BPM', CurSpeedTxt, CSpeedRated + 'BPM')
}