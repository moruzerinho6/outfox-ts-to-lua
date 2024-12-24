declare interface ScreenEvaluation extends ScreenWithMenuElements {
  GetStageStats: (this: ScreenEvaluation) => StageStats
}

declare const ScreenEvaluation: ScreenEvaluation