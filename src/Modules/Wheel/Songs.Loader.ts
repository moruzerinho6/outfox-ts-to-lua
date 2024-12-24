//@ts-ignore
return function (Style) {
  const AllCompSongs = new LuaTable()

  const songlist = SONGMAN.GetAllSongs()

  for (const [i, player] of ipairs(PlayerNumber)) {
    const prof = PROFILEMAN.GetProfile(player)

    if (prof) {
      for (const [_, v] of ipairs(prof.get_songs())) {
        table.insert(songlist, v)
      }
    }
  }

  const ProcessSong = function(song: Song) {
    const DiffCon = {}

    const CurSongCon = new LuaTable()
    CurSongCon.set(CurSongCon.length() + 1, song)

    for (const [i, CurStep] of ipairs(song.GetAllSteps())) {
      if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), Style)) {
        let Type = 4

        if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), 'single')) {
          Type = 1
        } else if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), 'half')) {
          Type = 2
        } else if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), 'double')) {
          Type = 3
        }

        let Meter: string | number = tonumber(CurStep.GetMeter)

        if (tonumber(CurStep.GetMeter()) < 10) {
          Meter = '0' + CurStep.GetMeter()
        }

        DiffCon[Type + '_' + (tonumber(TF_WHEEL.DiffTab[CurStep.GetDifficulty()]) as unknown as string) + '_' + Meter] = CurStep
      }
    }

    let Keys = []

    for (const [k] of pairs(DiffCon)) {
      table.insert(Keys, k)
    }

    table.sort(Keys)

    for (const [_, k] of pairs(Keys)) {
      if (DiffCon[k]) {
        CurSongCon.set(CurSongCon.length() + 1, DiffCon[k])
      }
    }

    if (CurSongCon.get(2)) {
      return CurSongCon
    }

    return null
  }

  for (const [_, CurSong] of pairs(songlist)) {
    if ((CurSong as Song).IsEnabled()) {
      AllCompSongs.set(AllCompSongs.length() + 1, ProcessSong(CurSong))
    }
  }

  return AllCompSongs
}