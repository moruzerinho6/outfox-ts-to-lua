// import type { Grade, HoldNoteScore, PeakComboAward, StageAward, TapNoteScore } from "./enums"

declare interface HighScore {
  GetDate: () => string
  GetGrade: () => Grade
  GetHoldNoteScore: (hns: HoldNoteScore) => number
  GetMaxCombo: () => number
  GetModifiers: () => string
  GetName: () => string
  GetPeakComboAward: () => PeakComboAward
  GetPercentDP: () => number
  GetScore: () => number
  GetStageAward: () => StageAward
  GetSurvivalSeconds: () => number
  GetTapNoteScore: (tns: TapNoteScore) => number
  IsFillInMarker: () => number
}

declare var HighScore : HighScore