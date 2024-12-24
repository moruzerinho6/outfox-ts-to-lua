// @ts-ignore
return function (Style, CurSong: Song) {
  const DiffCon = []
  const DiffStyleContainer = new LuaTable()

  for (const [sti, CurStyle] of ipairs(Style)) {
    DiffCon[CurStyle] = {}
    DiffStyleContainer[CurStyle] = {}

    for (const [i, CurStep] of ipairs(CurSong.GetAllSteps())) {
      if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), CurStyle)) {
        let Type = 4

        if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), 'single')) {
          Type = 1
        } else if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), 'half')) {
          Type = 2
        } else if (string.find((CurStep.GetStepsType() as unknown as string).toLowerCase(), 'double')) {
          Type = 3
        }

        let Meter = tonumber(CurStep.GetMeter())

        if (tonumber(CurStep.GetMeter()) < 10) {
          Meter = '0' + CurStep.GetMeter()
        }

        DiffCon[CurStyle][Type + '_' + (tonumber(TF_WHEEL.DiffTab[CurStep.GetDifficulty()]) as unknown as string) + '_' + Meter] = CurStep
      }
    }
  }

  const Keys = []

  for (const [sti, CurStyle] of ipairs(Style)) {
    Keys[CurStyle] = {}
    for (const [k] of pairs(DiffCon[CurStyle as unknown as string])) {
      table.insert(Keys[CurStyle as unknown as string], k)
    }
    table.sort(Keys[CurStyle as unknown as string])
  }

  for (const [sti, CurStyle] of ipairs(Style)) {
    for (const [_, k] of pairs(Keys[CurStyle as unknown as string])) {
      if (DiffCon[CurStyle][k]) {
        DiffStyleContainer[CurStyle][(DiffStyleContainer[CurStyle as unknown as string] as LuaTable).length() + 1] = DiffCon[CurStyle][k]
      }
    }
  }

  return DiffStyleContainer
}