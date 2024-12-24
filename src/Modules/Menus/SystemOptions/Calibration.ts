{
  const UIHelper = LoadModule("UI/UIHelper.OptionsList.lua")
  const t = new LuaTable()

  t.set('Name', 'Menu')
  t.set(t.length() + 1, {
    Name: 'Calibrate Audio Sync',
    Translate: true,
    Type: 'screen',
    Value: 'ScreenGameplaySyncMachine'
  })
  t.set(t.length() + 1, {
    Name: 'GlobalOffsetSeconds',
    Translate: true,
    Type: 'number',
    Margin: .005,
    FormatVisible: function(val) {
      return string.format("%.3f sec", val)
    },
    Value: 'system_option'
  })

  // @ts-ignore
  return t
}