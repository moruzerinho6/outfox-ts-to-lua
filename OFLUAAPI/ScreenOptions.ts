declare interface ScreenOptions extends ScreenWithMenuElements {
  AllAreOnLastRow:        (this: ScreenOptions) => boolean
  FocusedItemEndsScreen:  (this: ScreenOptions, pn: PlayerNumber) => boolean
  GetCurrentRowIndex:     (this: ScreenOptions, pn: PlayerNumber) => number
  GetNumRows:             (this: ScreenOptions) => number
  GetOptionRow:           (this: ScreenOptions, iRow: number) => OptionRow
}