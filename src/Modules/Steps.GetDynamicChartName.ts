declare type GetDynamicChartName = (steps_data: Steps) => LuaMultiReturn<[string, string]>

// @ts-expect-error
return function (steps_data: Steps) {
  if (steps_data === null) {
    error('Steps data provided is nil.', 2)
    return
  }

  let DiffName = THEME.GetString('CustomDifficulty', ToEnumShortString(steps_data.GetDifficulty()))

  // @ts-ignore
  if (steps_data.GetTrailEntry) {
    return $multi(DiffName, GAMESTATE.GetCurrentCourse().GetScripter())
  }

  if (steps_data.GetChartName() !== '') {
    DiffName = steps_data.GetChartName()
  }

  let whattouse = steps_data.GetDescription()

  if (steps_data.GetAuthorCredit() !== '') {
    whattouse = steps_data.GetAuthorCredit()
  }

  if (DiffName === whattouse) {
    DiffName = THEME.GetString('CustomDifficulty', ToEnumShortString(steps_data.GetDifficulty()))
  }

  return $multi(DiffName, whattouse)
}