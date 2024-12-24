declare interface ScreenManager {
  AddNewScreenToTop:    (this: ScreenManager, sScreenName: string, sMessage?: string) =>  void
  GetTopScreen:         (this: ScreenManager) =>                                          Screen | ScreenAttract | ScreenEdit | ScreenEvaluation | ScreenGameplay | ScreenHowToPlay | ScreenNameEntryTraditional | ScreenNetEvaluation | ScreenOptions | ScreenOptionsEditProfile | ScreenPlayerOptions | ScreenProfileLoad | ScreenProfileSave | ScreenSelectMaster | ScreenSelectMusic | ScreenSelectProfile | ScreenTextEntry
  get_input_redirected: (this: ScreenManager, pn: PlayerNumber) =>                        boolean
  PlayInvalidSound:     (this: ScreenManager) =>                                          void
  PlayStartSound:       (this: ScreenManager) =>                                          void
  PlayCoinSound:        (this: ScreenManager) =>                                          void
  PlayCancelSound:      (this: ScreenManager) =>                                          void
  PlayScreenshotSound:  (this: ScreenManager) =>                                          void
  ReloadOverlayScreens: (this: ScreenManager) =>                                          void
  ScreenClassExists:    (this: ScreenManager, s: string) =>                               boolean
  ScreenIsPrepped:      (this: ScreenManager, s: string) =>                               boolean
  SetNewScreen:         (this: ScreenManager, s: string) =>                               void
  set_input_redirected: (this: ScreenManager, pn: PlayerNumber, redit: boolean) =>        void
  SystemMessage:        (this: ScreenManager, s: string) =>                               void
}

declare const SCREENMAN : ScreenManager
declare const ScreenManager : ScreenManager