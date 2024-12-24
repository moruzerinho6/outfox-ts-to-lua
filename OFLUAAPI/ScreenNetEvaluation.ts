declare interface ScreenNetEvaluation extends ScreenEvaluation {
  GetNumACtivePlayers: (this: ScreenNetEvaluation) => number
}

declare const ScreenNetEvaluation: ScreenNetEvaluation