declare type RageColor = LuaTable<number, number>

declare const Color: {
  Black:                              RageColor
  White:                              RageColor
  Red:                                RageColor
  Blue:                               RageColor
  Green:                              RageColor
  Yellow:                             RageColor
  Orange:                             RageColor
  Purple:                             RageColor
  Outline:                            RageColor
  Invisible:                          RageColor
  Stealth:                            RageColor
  HoloBlue:                           RageColor
  HoloDarkBlue:                       RageColor
  HoloPurple:                         RageColor
  HoloDarkPurple:                     RageColor
  HoloGreen:                          RageColor
  HoloDarkGreen:                      RageColor
  HoloOrange:                         RageColor
  HoloDarkOrange:                     RageColor
  HoloRed:                            RageColor
  HoloDarkRed:                        RageColor
  Alpha: (c: any, fAlpha: number) =>  RageColor
}

declare interface GameColorFallback {
  PlayerColors: {
    PLAYER_1: RageColor
    PLAYER_2: RageColor
  },
  PlayerDarkColors: {
    PLAYER_1: RageColor
    PLAYER_2: RageColor
  },
  Difficulty: {
    Beginner:             RageColor
    Easy:                 RageColor
    Medium:               RageColor
    Hard:                 RageColor
    Challenge:            RageColor
    Edit:                 RageColor
    D7:                   RageColor
    D8:                   RageColor
    D9:                   RageColor
    D10:                  RageColor
    D11:                  RageColor
    D12:                  RageColor
    D13:                  RageColor
    D14:                  RageColor
    D15:                  RageColor
    Couple:               RageColor
    Routine:              RageColor
    Difficulty_Beginner:  RageColor
    Difficulty_Easy:      RageColor
    Difficulty_Medium:    RageColor
    Difficulty_Hard:      RageColor
    Difficulty_Challenge: RageColor
    Difficulty_Edit:      RageColor
    Difficulty_D7:        RageColor
    Difficulty_D8:        RageColor
    Difficulty_D9:        RageColor
    Difficulty_D10:       RageColor
    Difficulty_D11:       RageColor
    Difficulty_D12:       RageColor
    Difficulty_D13:       RageColor
    Difficulty_D14:       RageColor
    Difficulty_D15:       RageColor
    Difficulty_Couple:    RageColor
    Difficulty_Routine:   RageColor
    Crazy:                RageColor
    Freestyle:            RageColor
    Nightmare:            RageColor
    HalfDouble:           RageColor
  },
  Stage: {
    Stage_1st:      RageColor
    Stage_2nd:      RageColor
    Stage_3rd:      RageColor
    Stage_4th:      RageColor
    Stage_5th:      RageColor
    Stage_6th:      RageColor
    Stage_Next:     RageColor
    Stage_Final:    RageColor
    Stage_Extra1:   RageColor
    Stage_Extra2:   RageColor
    Stage_Nonstop:  RageColor
    Stage_Oni:      RageColor
    Stage_Endless:  RageColor
    Stage_Event:    RageColor
    Stage_Demo:     RageColor
  },
  Judgment: {
    JudgmentLine_ProW1:     RageColor
    JudgmentLine_ProW2:     RageColor
    JudgmentLine_ProW3:     RageColor
    JudgmentLine_ProW4:     RageColor
    JudgmentLine_ProW5:     RageColor
    JudgmentLine_W1:        RageColor
    JudgmentLine_W2:        RageColor
    JudgmentLine_W3:        RageColor
    JudgmentLine_W4:        RageColor
    JudgmentLine_W5:        RageColor
    JudgmentLine_Held:      RageColor
    JudgmentLine_Miss:      RageColor
    JudgmentLine_MaxCombo:  RageColor
  }
}

declare let GameColor: GameColorFallback & any
declare const color: (sColor: string) => RageColor
declare const BoostColor: (cColor: RageColor, fBoost: number) => RageColor
declare const ColorLightTone: (c: RageColor) => RageColor
declare const ColorMidTone: (c: RageColor) => RageColor
declare const ColorDarkTone: (c: RageColor) => RageColor
declare const PlayerColor: (pn: string) => RageColor
declare const PlayerScoreColor: (pn: string) => RageColor
declare const PlayerDarkColor: (pn: string) => RageColor
declare const CustomDifficultyToColor: (sCustomDifficulty: string) => RageColor
declare const CustomDifficultyToDarkColor: (sCustomDifficulty: string) => RageColor
declare const CustomDifficultyToLightColor: (sCustomDifficulty: string) => RageColor
declare const StepsOrTrailToColor: (StepsOrTrail: AnyTable) => RageColor
declare const StageToColor: (stage: string) => RageColor
declare const StageToStrokeColor: (stage: string) => RageColor
declare const JudgmentLineToColor: (i: string) => RageColor
declare const JudgmentLineToStrikeColor: (i: string) => RageColor
declare const HasAlpha: (c: RageColor) => number
declare const ColorToHex: (c: RageColor) => string
declare const HSVToColor: (hsv: any) => RageColor
declare const HSV: (h: number, s: number, v: number) => RageColor
declare const HSVA: (h: number, s: number, v: number, a: number) => RageColor
declare const HSVToHex: (hsv: any) => string
declare const ColorToHSV: (c: RageColor) => any
declare const Hue: (color: RageColor, newHue: number) => RageColor
declare const Saturation: (color: RageColor, percent: number) => RageColor
declare const Brightness: (color: RageColor, percent: number) => RageColor
declare const Alpha: (color: RageColor, percent: number) => RageColor