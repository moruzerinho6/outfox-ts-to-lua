declare interface ScreenProfileSave extends ScreenWithMenuElements {
  Continue:           (this: ScreenProfileSave) => void
  HaveProfileToSave:  (this: ScreenProfileSave) => boolean
}

declare const ScreenProfileSave: ScreenProfileSave