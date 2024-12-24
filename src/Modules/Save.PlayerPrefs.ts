declare interface SavePlayerPrefsModule extends LuaTable {
  Container: LuaTable
  File: string | null
  ChangesMade: boolean
  Load: (this: SavePlayerPrefsModule, file: string) => LuaMultiReturn<[SavePlayerPrefsModule, boolean]>
  Set: (this: SavePlayerPrefsModule, setting: any, value: any) => SavePlayerPrefsModule
  Get: (this: SavePlayerPrefsModule, setting: any, defaultVal: any) => any
  SaveToFile: (this: SavePlayerPrefsModule) => SavePlayerPrefsModule
}

{
  const RemoveSpaces = (str: string) => {
    return (str as  unknown as {gsub: (this: any, arg1: string, arg2: string) => string}).gsub(' ', '')
  }

  const t: LuaTable = new LuaTable()

  t.set('Container', {})
  t.set('File', null)
  t.set('ChangesMade', false)
  t.set('Load', function(this, file: string) {
    this.File = file
    if (!FILEMAN.DoesFileExist(file)) {
      Warn('[Save.PlayerPrefs] Could not find file ' + file + '.')
      return this
    }

    const configfile = RageFileUtil.CreateRageFile()
    configfile.Open(file, 1)

    const configcontent = configfile.Read()

    configfile.Close()
    configfile.destroy()

    for (const [line] of string.gmatch(configcontent + '\n', '(.-)\n')) {
      for (const [KeyVal, Val] of string.gmatch(line, '(.-)=(.+)')) {
        let value: any = Val

        if (Val === 'true') {
          value = true
        }

        if (Val === 'false') {
          value = false
        }

        this.Container[KeyVal] = value
      }
    }

    return $multi(this, true)
  })
  t.set('Set', function(this, setting, value) {
    this.ChangesMade = true
    this.Container[RemoveSpaces(setting)] = value
    return this
  })
  t.set('Get', function(this, setting, defaultVal) {
    const val = this.Container[RemoveSpaces(setting)]
    if (val === null) {
      return defaultVal
    }

    if (tonumber(val)) {
      return tonumber(val)
    }

    if (val === 'true') {
      return true
    }

    if (val === false) {
      return false
    }

    return val
  })
  t.set('SaveToFile', function(this) {
    if (!this.ChangesMade) {
      return
    }

    const configfile = RageFileUtil.CreateRageFile()
    let output = ''

    for (const [k, v] of pairs(this.Container)) {
      output = output + (k as string) + '=' + tostring(v) + '\n'
    }

    configfile.Open(this.File, 2)
    configfile.Write(output)
    configfile.Close()
    configfile.destroy()
    return this
  })
  t.set('__call', function(this) {
    return this
  })

  // @ts-ignore
  return setmetatable(t, t)
}