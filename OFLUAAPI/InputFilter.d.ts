declare interface INPUTFILTER {
  GameButtonToKeyMapped:  (this: INPUTFILTER, sButton: string, pn: PlayerNumber) => void
  GetMouseWheel:          (this: INPUTFILTER) => number
  GetMouseX:              (this: INPUTFILTER) => number
  GetMouseY:              (this: INPUTFILTER) => number
  GetTouchX:              (this: INPUTFILTER) => number // TODO: Missing fron lua.xml
  GetTouchY:              (this: INPUTFILTER) => number // TODO: Missing fron lua.xml
  ResetMaping:            (this: INPUTFILTER) => void
  MapButton:              (this: INPUTFILTER, GUID: string, Name: string, Controller: number, XButton: string, Button: number) => void
  SaveMapping:            (this: INPUTFILTER) => void
  OpenController:         (this: INPUTFILTER, device: number) => void
}

declare const INPUTFILTER: INPUTFILTER