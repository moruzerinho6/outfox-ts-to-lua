//@ts-ignore
return function (self: Actor, steps_data: Steps, LightTone?: boolean, BoostFactor?: number) {
  if (steps_data === null) {
    lua.ReportScriptError('[CustomDiffToColor] Steps Data is nil.')
    return;
  }

  const cd = GetCustomDifficulty(steps_data.GetStepsType(), steps_data.GetDifficulty());
  (self.diffuse(ColorMidTone(CustomDifficultyToColor(cd))) as Actor).diffusebottomedge(ColorDarkTone(CustomDifficultyToColor(cd)))

  if (LightTone) {
    self.diffuse(ColorLightTone(self.GetDiffuse()))
  }

  if (BoostFactor) {
    self.diffuse(BoostColor(self.GetDiffuse(), BoostFactor))
  }
}