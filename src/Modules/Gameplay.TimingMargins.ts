return function() {
  const JudgNames: LuaTable<string, string> & AnyTable = LoadModule('Options.SmartTapNoteScore.lua')()
  table.sort(JudgNames)
  let LowestWindow = null
  let HighestWindow = null
  const n = LoadModule('Options.ReturnCurrentTiming.lua')()

  for (const [k, v] of pairs(JudgNames)) {
    if ((n.Timings as LuaTable).get('TapNoteScore_' + v) > 0) {
      const ConvertedTime = GetWindowSeconds((n.Timings as LuaTable).get('TapNoteScore_' + v), 1, 0)

      if (!HighestWindow) {
        HighestWindow = ConvertedTime
      }

      LowestWindow = ConvertedTime
    }
  }

  return $multi(LowestWindow, HighestWindow)
}