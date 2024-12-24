declare type JudgeGetGraphic = (pn: string) => string

// @ts-ignore
return function(pn) {
  const CurrentTiming = LoadModule("Options.ReturnCurrentTiming.lua")()
	const judgeGraphics = LoadModule("Options.SmartJudgments.lua")()
	const judgeNames = LoadModule("Options.SmartJudgments.lua")("Show")
	const CToValue = LoadModule("Options.ChoiceToValue.lua")

	const PrefsManager: SavePlayerPrefsModule = LoadModule("Save.PlayerPrefs.lua")
  PrefsManager.Load(CheckIfUserOrMachineProfile(string.sub(pn,-1)-1) + "/OutFoxPrefs.ini")

  if (!THEME.GetMetric('Common', 'UseAdvancedJudgments')) {
    return THEME.GetPathG('Judgment', 'Normal')
  }

  const DefaultJudgment = THEME.GetMetric('Common', 'DefaultJudgment')

  if (GAMESTATE.IsDemonstration()) {
    return judgeGraphics[CToValue(judgeNames, DefaultJudgment)]
  }

  let valueToUse = DefaultJudgment

  if (PrefsManager.Get('JudgmentGraphic' + CurrentTiming.Name, null)) {
    valueToUse = PrefsManager.Get('JudgmentGraphic' + CurrentTiming.Name, null)
  } else {
    valueToUse = PrefsManager.get('SmartJudgments', DefaultJudgment)
  }

  return judgeGraphics[CToValue(judgeNames, valueToUse)]
}