declare interface ComboFindTextureModule {
  Setting: string
  DefaultFont: string
  FindTexture:      (this: ComboFindTextureModule) => string
  GetTexture:       (this: ComboFindTextureModule) => string
  GetComboUserName: (this: ComboFindTextureModule) => string
  GetDefaultFont:   (this: ComboFindTextureModule) => string
  GetPathToTexture: (this: ComboFindTextureModule) => string
  HasCustomJudgmentScript: (this: ComboFindTextureModule) => boolean
  GetPathFolder: (this: ComboFindTextureModule) => string
}

{
  const t = new LuaTable()
  t.set('Setting', null)
  t.set('DefaultFont', THEME.GetPathF('Combo', 'numbers'))
  t.set('GetDefaultFont', function (this: ComboFindTextureModule) {
    return THEME.HasMetric('Common', 'DefaultCombo') ? THEME.GetMetric('Common', 'DefaultCombo') : this.DefaultFont
  })
  t.set('GetComboUserName', function (this: ComboFindTextureModule) {
    return this.Setting || this.GetDefaultFont()
  })
  t.set('FindTexture', function (this: ComboFindTextureModule) {
    if (THEME.GetMetric('Common', 'UseAdvancedJudgments')) {
      if (GAMESTATE.IsDemonstration()) {
        return LoadModule("Options.SmartCombo.lua")()[LoadModule("Options.ChoiceToValue.lua")(LoadModule("Options.SmartCombo.lua")("Show"),this.GetDefaultFont())] 
      }

      return LoadModule("Options.SmartCombo.lua")()[LoadModule("Options.ChoiceToValue.lua")(LoadModule("Options.SmartCombo.lua")("Show"),this.GetComboUserName())]
    }

    return this.GetDefaultFont()
  })
  t.set('GetTexture', function (this: ComboFindTextureModule) {
    const result = this.FindTexture()

    if (!result) {
      return this.GetDefaultFont()
    }

    return result
  })
  t.set('GetPathToTexture', function (this: ComboFindTextureModule) {
    if (FILEMAN.DoesFileExist(this.GetTexture() + "/" + this.GetComboUserName() + ".ini")) {
      return this.GetTexture() + "/" + this.GetComboUserName() + ".ini"
    }

    return this.DefaultFont
  })
  t.set('HasCustomJudgmentScript', function (this) {
    return FILEMAN.DoesFileExist( this.GetPathFolder() + "commands.lua" )
  })
  t.set('GetPathFolder', function (this) {
    if (this.GetTexture()) {
      return this.GetTexture() + '/'
    }

    return this.DefaultFont
  })
  t.set('__call', function (this: ComboFindTextureModule, SmartComboSetting: string, DefaultFont: string) {
    this.Setting = SmartComboSetting
    this.DefaultFont = DefaultFont
    return this
  })

  // @ts-ignore
  return setmetatable(t, t)
}