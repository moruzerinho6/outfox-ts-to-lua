// import type { PlayerStageStats } from "./PlayerStageStats"
// import type { Song } from "./Song"
// import type { EarnedExtraStage, MultiPlayer, PlayerNumber, Stage } from "./enums"

declare interface StageStats {
  AllFailed:                (this: StageStats) => boolean
  GaveUp:                   (this: StageStats) => boolean
  GetEarnedExtraStage:      (this: StageStats) => EarnedExtraStage
  GetGameplaySeconds:       (this: StageStats) => number
  GetMultiPlayerStageStats: (this: StageStats, mp: MultiPlayer) => PlayerStageStats
  GetPlayedSongs:           (this: StageStats) => Song[]
  GetPlayerStageStats:      (this: StageStats, pn: PlayerNumber) => PlayerStageStats
  GetPossibleSongs:         (this: StageStats) => Song[]
  GetStage:                 (this: StageStats) => Stage
  GetStageIndex:            (this: StageStats) => number
  GetStepsSeconds:          (this: StageStats) => number
  OnePassed:                (this: StageStats) => boolean
  PlayerHasHighScore:       (this: StageStats, pn: PlayerNumber) => boolean
}

declare var StageStats : StageStats
