//@ts-ignore
return function (Songs, CurGroup, SearchTerm, Sort1, Sort2) {
  const SortModeLoader = LoadModule('Wheel/Sort.Modes.lua')

  if (!GAMESTATE.Env()['containerStringSongSet']) {
    const gen = {}

    for (const [_, v] of ipairs(Songs as Record<number, Song[]>)) {
      if (!gen[v[1].GetGroupName()]) {
        gen[v[1].GetGroupName()] = {}
      }

      gen[v[1].GetGroupName()][(gen[v[1].GetGroupName()] as LuaTable).length() + 1] = v

      for (const [i, player] of ipairs(GAMESTATE.GetHumanPlayers())) {
        const PlayerProfile = PROFILEMAN.GetProfile(player)
        const PlrGroupPath = '--P' + (i as unknown as string) + 'FAV--'


        if (PlayerProfile.SongIsFavorite(v[1])) {
          if (!gen[PlrGroupPath]) {
            gen[PlrGroupPath] = {}
          }
          gen[PlrGroupPath][(gen[PlrGroupPath] as LuaTable).length() + 1] = v
        }
      }
    }

    GAMESTATE.Env()['containerStringSongSet'] = gen
  }

  const containerStringSongSet = GAMESTATE.Env()['containerStringSongSet']
  const Groups = new LuaTable()

  for (const [packname, _] of pairs(containerStringSongSet)) {
    Groups.set(Groups.length() + 1, packname)
  }

  const GroupsAndSongs = new LuaTable()

  let searchMatches = 0

  if (SearchTerm && SearchTerm !== '') {
    SearchTerm = ToLower(SearchTerm) + ';'

    let foundAnyState = false
    let methodToUse = new LuaTable()

    for (const [key, value] of SearchTerm['gmatch']('(%S-):(.-);')) {
      methodToUse.set(key, value)
      foundAnyState = true
    }

    if (!foundAnyState) {
      for (const [i, v] of pairs(TF_WHEEL.SearchStates as Record<string, unknown>)) {
        if (v) {
          methodToUse.set(ToLower(i), (SearchTerm as string)['s' + 'ub'](1, -2))
          TF_WHEEL.SearchStates[i] = (SearchTerm as string)['s' + 'ub'](1, -2)
          foundAnyState = true
        }
      }

      if (!foundAnyState) {
        TF_WHEEL.SearchStates.title = true
        methodToUse.set('title', (SearchTerm as string)['s' + 'ub'](1, -2))
      }
    }

    const searchmethods = {
      artist: (song: Song[], searchString: string) => {
        return ToLower(song[1].GetDisplayArtist())['f' + 'ind'](searchString)
      },
      title: (song: Song[], searchString: string) => {
        const [_, __, pack, title] = string['f' + 'ind'](searchString, '(.+)/(.+)')
        if (pack && title) {
          return ToLower(song[1].GetGroupName())['f' + 'ind'](ToLower(pack)) && ToLower(song[1].GetDisplayMainTitle())['f' + 'ind'](ToLower(title))
        }

        return ToLower(song[1].GetDisplayMainTitle())['f' + 'ind'](searchString)
      },
      subtitle:    (song: Song[], searchString: string) => {
        return ToLower(song[1].GetDisplaySubTitle())['f' + 'ind'](searchString)
      },
      group:       (song: Song[], searchString: string) => {
        return ToLower(song[1].GetGroupName())['f' + 'ind'](searchString)
      },
      genre:       (song: Song[], searchString: string) => {
        return ToLower(song[1].GetGenre())['f' + 'ind'](searchString)
      },
      bpm:         (song: Song[], searchString: string) => {
        const [_, __, low, high] = string.find(searchString, '(%d*)-(%d*)')

        if (low && high) {
          return math.floor(song[1].GetDisplayBpms()[1]) >= tonumber(low) && math.floor(song[1].GetDisplayBpms()[2]) <= tonumber(high)
        }

        return math.floor(song[1].GetDisplayBpms()[2]) >= tonumber(searchString)
      },
      meter:       (v, searchString: string) => {
        const [_, __, low, high] = string.find(searchString, '(%d*)-(%d*)')

        if (low && high) {
          for (const i of $range(2, (v as LuaTable).length())) {
            if ((v[i] as Steps).GetMeter() >= tonumber(low) && (v[i] as Steps).GetMeter() <= tonumber(high)) {
              return true
            }
          }
        }

        for (const i of $range(2, (v as LuaTable).length())) {
          if ((v[i] as Steps).GetMeter() >= tonumber(searchString)) {
            return true
          }
        }

        return false
      },
      description: (v, searchString: string) => {
        for (const i of $range(2, (v as LuaTable).length())) {
          if (string['f' + 'ind'](ToLower((v[i] as Steps).GetDescription()), searchString)) {
            return true
          }
        }

        return false
      },
      stepcharter: (v, searchString: string) => {
        for (const i of $range(2, (v as LuaTable).length())) {
          if (string['f' + 'ind'](ToLower((v[i] as Steps).GetAuthorCredit()), searchString)) {
            return true
          }
        }
        return false
      }
    }

    for (const [itm, mtd] of pairs(methodToUse)) {
      if (searchmethods[itm]) {
        TF_WHEEL.SearchStates[itm] = mtd
      }
    }

    for (const [_, v2] of ipairs(Songs)) {
      let matched = true

      for (const [itm, mtd] of pairs(methodToUse)) {
        if (!searchmethods[itm]) {
          matched = false
          continue
        }

        if (!searchmethods[itm](v2, mtd)) {
          matched = false
          continue
        }
      }

      if (matched) {
        GroupsAndSongs[GroupsAndSongs.length() + 1] = v2
        searchMatches = searchMatches + 1
      }
    }

    if (GroupsAndSongs.length() > 0) {
      return $multi(SortModeLoader(GroupsAndSongs, Groups, GAMESTATE.Env()['containerStringSongSet'], Sort1 || 'group', Sort2 || 'title'), searchMatches)
    }
  }

  const groups = SortModeLoader(null, Groups, GAMESTATE.Env()['containerStringSongSet'], Sort1 || 'group', Sort2 || 'title')
  return $multi(groups, searchMatches)
}