declare interface ScreenSelectMaster extends ScreenWithMenuElements {
  ConfirmPlayerStart: (this: ScreenSelectMaster, pn: PlayerNumber) => boolean
  GetSelectionIndex:  (this: ScreenSelectMaster, pn: PlayerNumber) => number
  SetSelectionIndex:  (this: ScreenSelectMaster, pn: PlayerNumber, index: number) => boolean
}

declare const ScreenSelectMaster: ScreenSelectMaster