{
  const TimingMode = LoadModule('Options.OverwriteTiming.lua')()
  const Names: LuaTable & AnyTable = LoadModule('Options.SmartTapNoteScore.lua')()

  // Don't want to deal with this rn ~ zerinho6
  // @ts-ignore
  table.sort(Names)

  Names.set(Names.length() + 1, 'Miss')
  // @ts-ignore
  return {
    Names,
    TimingMode
  }
}