declare interface Game {
  CountNotesSeparately: () => boolean
  GetMapJudgmentTo: (tns: TapNoteScore) => unknown
  GetName: () => string
  GetSeparateStyles: () => boolean
}

declare var Game:Game