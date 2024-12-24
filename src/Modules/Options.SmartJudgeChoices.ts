// @ts-ignore
return function (Mode: string, ForceTiming: LuaTable) {
  const JG: Record<number, string> = LoadModule('Options.SmartJudgments.lua')('Show')
  let TW = ForceTiming
  let Name = ''

  if (TW === null) {
    if (GAMESTATE.Env().get('SmartTimings')) {
      TW = (TimingWindow[GAMESTATE.Env().get('SmartTimings')] as unknown as Function)().Name
    } else {
      TW = LoadModule('Options.ReturnCurrentTiming.lua')().Name
    }
  }

  if (TW !== null) {
    Name = TW
  }

  let JudgmentGraphics = new LuaTable()

  for (const [_,v] of ipairs(TimingWindow)) {
    const m = (v as unknown as Function)()
    JudgmentGraphics.set(m.Name, {})
  }

  for (const [i, v] of ipairs(JG)) {
    const v2:string = string['m' + 'atch'](v, '(.-) %[')
    const typemode: string = string['m' + 'atch'](v, '%[%a*]')

    if (typemode) {
      const datatype = (Mode === 'Value' ? v : (v2 !== null ? v2 : v))
      if (string.find(Name, typemode['sub'](2, -2))) {
        table.insert(JudgmentGraphics[Name], datatype)
      }
    }
  }

  if ((JudgmentGraphics.get(Name) as LuaTable).length() === 0) {
    for (const [i, v] of ipairs(JG)) {
      const typemode: string = string['m' + 'atch'](v, '%[%a*]')
      if (!typemode) {
        table.insert(JudgmentGraphics[Name], v)
      }
    }
  }

  return JudgmentGraphics[Name]
}