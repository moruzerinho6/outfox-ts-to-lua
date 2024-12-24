// import type { HighScore } from "./HighScore"
// import type { RadarValues, Steps } from "./Steps"
// import type { Grade, HoldNoteScore, PeakComboAward, StageAward, TapNoteScore } from "./enums"

declare interface PlayerStageStats {
  FailPlayer:                     (this: PlayerStageStats) => void
  FullCombo:                      (this: PlayerStageStats) => boolean
  FullComboOfScore:               (this: PlayerStageStats, tns: TapNoteScore) => boolean
  GetActualDancePoints:           (this: PlayerStageStats) => number
  GetAliveSeconds:                (this: PlayerStageStats) => number
  GetBestFullComboTapNoteScore:   (this: PlayerStageStats) => TapNoteScore
  GetCaloriesBurned:              (this: PlayerStageStats) => number
  GetCaloriesBurnedToday:         (this: PlayerStageStats) => number
  GetColumnScores:                 (this: PlayerStageStats) => number[][]
  GetOffsetData:                  (this: PlayerStageStats) => number[][]
  GetComboList:                   (this: PlayerStageStats) => number[][]
  GetCurMaxScore:                 (this: PlayerStageStats) => number
  GetCurrentCombo:                (this: PlayerStageStats) => number
  GetCurrentLife:                 (this: PlayerStageStats) => number
  GetCurrentMissCombo:            (this: PlayerStageStats) => number
  GetCurrentPossibleDancePoints:  (this: PlayerStageStats) => number
  GetCurrentScoreMultiplier:      (this: PlayerStageStats) => number
  GetFailed:                      (this: PlayerStageStats) => boolean
  GetGrade:                       (this: PlayerStageStats) => Grade
  GetHighScore:                   (this: PlayerStageStats) => HighScore
  GetHoldNoteScore:               (this: PlayerStageStats, hns: HoldNoteScore) => number
  SetHoldNoteScores:              (this: PlayerStageStats, hns: HoldNoteScore, iNewAmt: number) => number
  GetLessonScoreActual:           (this: PlayerStageStats) => number
  GetLessonScoreNeeded:           (this: PlayerStageStats) => number
  GetLifeRecord:                  (this: PlayerStageStats, last_second: number, samples: number) => number[]
  GetTapNoteScoreRecord:          (this: PlayerStageStats, last_second: number, samples: number) => TapNoteScore[]
  GetLifeRemainingSeconds:        (this: PlayerStageStats) => number
  GetMachineHighScoreIndex:       (this: PlayerStageStats) => number
  GetNumControllerSteps:          (this: PlayerStageStats) => number
  GetPeakComboAward:              (this: PlayerStageStats) => PeakComboAward
  GetPersonalHighScoreIndex:      (this: PlayerStageStats) => number
  GetPlayedSteps:                 (this: PlayerStageStats) => Steps[]
  GetPercentageOfTaps:            (this: PlayerStageStats, tns: TapNoteScore) => Steps[]
  GetPercentDancePoints:          (this: PlayerStageStats) => number
  GetPossibleDancePoints:         (this: PlayerStageStats) => number
  GetPossibleSteps:               (this: PlayerStageStats) => Steps[]
  GetRadarActual:                 (this: PlayerStageStats) => RadarValues
  GetRadarCurrent:                (this: PlayerStageStats) => RadarValues
  GetScore:                       (this: PlayerStageStats) => number
  GetSongsPassed:                 (this: PlayerStageStats) => number
  GetSongsPlayed:                 (this: PlayerStageStats) => number
  GetStageAward:                  (this: PlayerStageStats) => StageAward
  GetSurvivalSeconds:             (this: PlayerStageStats) => number
  GetTapNoteScores:               (this: PlayerStageStats) => TapNoteScore
  SetTapNoteScores:               (this: PlayerStageStats, tns: TapNoteScore, iNewAmt: number) => number
  MaxCombo:                       (this: PlayerStageStats) => number
  IsDisqualified:                 (this: PlayerStageStats) => boolean
  SetCurMaxScore:                 (this: PlayerStageStats, iScore: number) => void
  SetDancePointLimits:            (this: PlayerStageStats, actual: number, possible: number) => void
  SetDancePoint:                  (this: PlayerStageStats, actual: number, possible: number) => void
  SetScore:                       (this: PlayerStageStats, iScore: number) => void
}

declare var PlayerStageStats : PlayerStageStats
