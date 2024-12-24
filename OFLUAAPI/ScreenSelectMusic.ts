declare interface ScreenSelectMusic extends ScreenWithMenuElements, ScreenSelectMusicFallback {
  CanOpenOptionsList: (this: ScreenSelectMusic, pn: PlayerNumber) => boolean
  GetGoToOptions:     (this: ScreenSelectMusic) =>                   boolean
  GetMusicWheel:      (this: ScreenSelectMusic) =>                   MusicWheel
  OpenOptionsList:    (this: ScreenSelectMusic) =>                   void
}

declare const ScreenSelectMusic: ScreenSelectMusic