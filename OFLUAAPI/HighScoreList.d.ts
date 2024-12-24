// import type { HighScore } from "./HighScore";

declare interface HighScoreList {
  GetHighScores:          (this: HighScoreList) => HighScore[]
  GetHighestScoreOfName:  (this: HighScoreList, name: string) => HighScore
  GetRankOfName:          (this: HighScoreList, name: string) => number
}

declare const HighScoreList : HighScoreList