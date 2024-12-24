declare interface ScreenNameEntryTraditional extends ScreenWithMenuElements {
  Backspace:            (this: ScreenNameEntryTraditional, pn: PlayerNumber) => boolean
  EnterKey:             (this: ScreenNameEntryTraditional, pn: PlayerNumber, sKey: string) => boolean
  Finish:               (this: ScreenNameEntryTraditional, pn: PlayerNumber) => boolean
  GetAnyEntering:       (this: ScreenNameEntryTraditional) => boolean
  GetAnyStillEntering:  (this: ScreenNameEntryTraditional) => boolean
  GetEnteringName:      (this: ScreenNameEntryTraditional, pn: PlayerNumber) => boolean
  GetFinalized:         (this: ScreenNameEntryTraditional, pn: PlayerNumber) => boolean
  GetSelection:         (this: ScreenNameEntryTraditional, pn: PlayerNumber) => string
}

declare const ScreenNameEntryTraditional: ScreenNameEntryTraditional