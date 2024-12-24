// import type { StageStats } from "./StageStats";
// import type { Grade, PlayerNumber } from "./enums";

declare interface StatsManager {
  GetAccumPlayedStageStats: (this: StatsManager) => StageStats
  GetBestFinalGrade:        (this: StatsManager) => Grade
  GetBestGrade:             (this: StatsManager) => Grade
  GetCurStageStats:         (this: StatsManager) => StageStats
  GetFinalEvalStageStats:   (this: StatsManager) => StageStats
  GetFinalGrade:            (this: StatsManager, pn: PlayerNumber) => Grade
  GetPlayedStageStats:      (this: StatsManager, iAgo: number) => StageStats
  GetStagesPlayed:          (this: StatsManager) => number
  GetWorstGrade:            (this: StatsManager) => Grade
  Reset:                    (this: StatsManager) => void
}

declare var STATSMAN : StatsManager