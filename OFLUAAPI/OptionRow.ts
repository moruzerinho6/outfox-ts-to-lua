declare interface OptionRow extends ActorFrame {
  FirstItemGoesDown:        (this: OptionRow) => boolean
  GetChoiceInRowWithFocus:  (this: OptionRow, pn: PlayerNumber) => number
  GetLayoutType:            (this: OptionRow) => LayoutType
  GetName:                  (this: OptionRow) => string
  GetNumChoices:            (this: OptionRow) => number
  GetRowTitle:              (this: OptionRow) => string
  GetSelectType:            (this: OptionRow) => SelectType
  HasFocus:                 (this: OptionRow, pn: PlayerNumber) => boolean
  OneChoiceForAllPlayers:   (this: OptionRow) => boolean
  SetChoiceInRowWithFocus:  (this: OptionRow, pn: PlayerNumber, iChoice: number) => void
}

declare const OptionRow: OptionRow