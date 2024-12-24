declare interface ScreenSelectProfile extends ScreenWithMenuElements {
  Cancel:           (this: ScreenSelectProfile) =>                                          void
  Finish:           (this: ScreenSelectProfile) =>                                          boolean
  GetProfileIndex:  (this: ScreenSelectProfile, pn: PlayerNumber) =>                        number
  SetProfileIndex:  (this: ScreenSelectProfile, pn: PlayerNumber, iProfileIndex: number) => boolean
}

declare const ScreenSelectProfile: ScreenSelectProfile