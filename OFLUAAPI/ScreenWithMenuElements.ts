declare interface ScreenWithMenuElements extends Screen {
  Cancel:                   (this: ScreenWithMenuElements) =>                   void
  IsTransitioning:          (this: ScreenWithMenuElements) =>                   boolean
  SetAllowLateJoin:         (this: ScreenWithMenuElements) =>                   void
  StartTransitioningScreen: (this: ScreenWithMenuElements, sScreenMsg: string) => void
}

declare const ScreenWithMenuElements: ScreenWithMenuElements