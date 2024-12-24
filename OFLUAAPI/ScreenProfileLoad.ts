declare interface ScreenProfileLoad extends ScreenWithMenuElements {
  Continue:           (this: ScreenProfileLoad) => void
  HaveProfileToLoad:  (this: ScreenProfileLoad) => boolean
}

declare const ScreenProfileLoad: ScreenProfileLoad