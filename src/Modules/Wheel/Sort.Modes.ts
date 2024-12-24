//@ts-ignore
return function (PremadeData, Groups, SongSetContainer, SortTypeGroup, SortTypeSongs) {
  let songMatches = 0
  let hideUnjoinableSongs = false

  const isAbleToJoin = (song: Song) => {
    if (GAMESTATE.IsEventMode()) {
      return true
    }

    if (!song.IsEnabled()) {
      return false
    }

    if (song.GetStageCost() > GAMESTATE.GetNumStagesLeft(GAMESTATE.GetMasterPlayerNumber())) {
      return hideUnjoinableSongs
    }

    return true
  }

  let newGroups = Groups
  let GroupsAndSongs = []

  const Songsorts = {
    title: function (ToSort) {
      table.sort(ToSort, function (a, b) {
        return (a[1] as Course).GetDisplayFullTitle().toLowerCase() < (b[1] as Course).GetDisplayFullTitle().toLowerCase()
      })

      return ToSort
    },
    artist: function (ToSort) {
      table.sort(ToSort, function (a, b) {
        return (a[1] as Song).GetDisplayArtist().toLowerCase() < (b[1] as Song).GetDisplayArtist().toLowerCase()
      })

      return ToSort
    },
    genre: function (ToSort) {
      table.sort(ToSort, function (a, b) {
        return (a[1] as Song).GetGenre().toLowerCase() < (b[1] as Song).GetGenre().toLowerCase()
      })

      return ToSort
    },
    bpm: function (ToSort) {
      table.sort(ToSort, function (a, b) {
        return (a[1] as Song).GetDisplayBpms()[2] < (b[1] as Song).GetDisplayBpms()[2]
      })

      return ToSort
    },
    length: function (ToSort) {
      table.sort(ToSort, function (a, b) {
        return (a[1] as Song).MusicLengthSeconds() < (b[1] as Song).MusicLengthSeconds()
      })

      return ToSort
    }
  }

  const GenerateSongEntriesFromArray = (arr, orderArray) => {
    table.sort(orderArray, function(a: string, b: string) {
      return a.toLowerCase() < b.toLowerCase();
    })
    
    const result = new LuaTable()

    for (const [i, v] of ipairs(orderArray)) {
      result.set(result.length() + 1, v)

      // @ts-ignore
      if (CurGroup === v) {
        let tempsong = arr[v as unknown as number]
        tempsong = Songsorts[SortTypeSongs](tempsong)

        for (const [q, z] of ipairs(tempsong)) {
          if (isAbleToJoin(z[1])) {
            result.set(result.length() + 1, z)
          }
        }
      }
    }

    return result
  }

  const GroupSorts = {
    group: function (ToSort) {
      newGroups = ToSort
      table.sort(newGroups, function (a: string, b: string) {
        return a.toLowerCase() < b.toLowerCase()
      })

      const result = GenerateSongEntriesFromArray(SongSetContainer, newGroups)

      table.insert((result as unknown as string[]),1, '-RANDOM-')
      table.insert((result as unknown as string[]),2, '-RANDOM-')
      return result
    },
    title: function (ToSort) {
      const LetterSet = new LuaTable()
      const letters = new LuaTable()

      for (const [i, v] of pairs(SongSetContainer)) {
        for (const [q, z] of ipairs(v)) {
          let ltr = ToLower((z[1] as Song).GetDisplayMainTitle()).substring(1, 1)

          if (ltr.match('%W')) {
            ltr = tonumber(ltr) ? 'number' : 'other'
          }

          if (!LetterSet[ltr]) {
            LetterSet[ltr] = new LuaTable()
            letters.set(letters.length() + 1, ltr)
          }

          LetterSet[ltr].set((LetterSet[ltr] as LuaTable).length() + 1, z)
        }
      }

      return GenerateSongEntriesFromArray(LetterSet, letters)
    },
    artist: function (ToSort) {
      const LetterSet = new LuaTable()
      const artistNames = new LuaTable()

      for (const [i, v] of pairs(SongSetContainer)) {
        for (const [q, z] of ipairs(v)) {
          let title = ToLower((z[1] as Song).GetDisplayArtist()).substring(1, 1)

          if (!LetterSet[title]) {
            LetterSet.set(title, {})
            artistNames.set(artistNames.length() + 1, title)
          }

          LetterSet[title].set((LetterSet[title] as LuaTable).length() + 1, z)
        }
      }

      return GenerateSongEntriesFromArray(LetterSet, artistNames)
    }
  }

  if (!PremadeData) {
    GroupsAndSongs = GroupSorts[SortTypeGroup](Groups)
  } else {
    GroupsAndSongs = Songsorts[SortTypeGroup](PremadeData)
  }

  return GroupsAndSongs
}