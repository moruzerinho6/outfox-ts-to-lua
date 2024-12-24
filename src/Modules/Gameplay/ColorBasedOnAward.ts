// @ts-ignore

declare type ColorBasedOnAward = (enum_StageAward: string) => RageColor

// @ts-ignore
return function (enum_StageAward) {
  const available = {
    ["StageAward_FullComboW1"]    : color("0,1,1,1"),
		["StageAward_FullComboW2"]    : color("1,1,0,1"),
		["StageAward_FullComboW3"]    : color("0,1,0,1"),
		["StageAward_SingleDigitW2"]  : color("1,1,0,1"),
		["StageAward_SingleDigitW3"]  : color("0,1,0,1"),
		["StageAward_OneW3"]          : color("0,1,0,1")
  }

  return available[enum_StageAward] || null
}