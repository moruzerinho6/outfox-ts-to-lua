declare interface ThemeColorsModule {
  CompleteBoxSet: LuaTable
  RestoreColors: (this: ThemeColorsModule, colorScheme?: string) => ThemeColorsModule
  Values: LuaTable
  GetListOfColors: (this: ThemeColorsModule) => LuaTable
}

{
  const firstTable = new LuaTable()

  firstTable.set('CompleteBoxSet', {})
  firstTable.set('RestoreColors', function (this: ThemeColorsModule, colorScheme?: string) {
    // Quite a bit lazy rn ~ zerinho6
    // @ts-expect-error
    this.CompleteBoxSet = {}
    let CurrentScheme: string = colorScheme || LoadModule('Config.Load.lua')('CurrentColorScheme', 'Save/OutFoxPrefs.ini')

    if (!CurrentScheme) {
      CurrentScheme = 'default'
      LoadModule('Config.Save.lua')('CurrentColorScheme', 'default', 'Save/OutFoxPrefs.ini')
    }

    let File = IniFile.ReadFile('/Appearance/ColorSets/' + CurrentScheme + '.ini')

    // @ts-expect-error
    if (File === {}) {
      Warn('[Theme.Colors] The colorfile for ' + CurrentScheme + ' has not been found. Using backup color.')
      File = IniFile.ReadFile(THEME.GetPathO('Color', 'default.ini'))
    }

    const fallback = IniFile.ReadFile(THEME.GetPathO('Color', 'default'))

    // @ts-expect-error
    if (fallback !== {}) {
      if (fallback) {
        for (const [k, v] of pairs(fallback['Shared'])) {
          this.CompleteBoxSet[k] = color((v as string))
        }
      }
    }

    if (File['Shared']) {
      for (const [k, v] of pairs(File['Shared'])) {
        this.CompleteBoxSet[k] = color((v as string))
      }
    }

    const ThemeName = THEME.GetCurThemeName()

    if (File[ThemeName]) {
      for (const [k, v] of pairs(File[ThemeName])) {
        this.CompleteBoxSet[k] = color((v as string))
      }
    }

    if (File['System']) {
      for (const [i, pn] of pairs(PlayerNumber)) {
        const sh = ToEnumShortString(pn)

        if (File['System']['Player' + sh]) {
          GameColor.PlayerColors['PLAYER_' + i] = color(File['System']['Player' + sh])
        }
      }
    }

    return this
  })
  firstTable.set('Values', {})
  firstTable.set('GetListOfColors', function (this: ThemeColorsModule) {
    if (this.Values.length() === 0) {
      const list = FILEMAN.GetDirListing('/Appearance/ColorSets/', false, true)
      this.Values.set(this.Values.length() + 1, 'default')
      for (const [_, v] of pairs(list)) {
        const [__, file, ___] = string.match(v, '^(.-)([^//]-)%.([^//%.]-)%.?')
        this.Values.set(this.Values.length() + 1, file)
      }
    }

    return this.Values
  })

  const secondTable = new LuaTable()
  secondTable.set('__call', function(this: ThemeColorsModule) {
    return this.RestoreColors()
  })
  secondTable.set('__index', function (this: ThemeColorsModule, Item: string) {
    if (this.CompleteBoxSet[Item]) {
      return this.CompleteBoxSet[Item]
    }

    return Color.White
  })

  return setmetatable(firstTable, secondTable)
}