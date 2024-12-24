interface TextEntrySettings {
  SendOnPop: string
  Question: string
  InitialAnswer: string
  MaxInputLength: number
  Password: boolean
  Validate: null | ((answer, errorOut) => LuaMultiReturn<[boolean, string]>)
  OnOk: null | ((answer) => void)
  OnCancel: null | (() => void)
  ValidateAppend: null | ((answer, append) => boolean)
  FormatAnswerForDisplay: null | ((answer) => string)
}

declare interface ScreenTextEntry extends ScreenWithMenuElements {
  Cancel:   (this: ScreenTextEntry) => void
  Clear:    (this: ScreenTextEntry) => void
  GetText:  (this: ScreenTextEntry) => string
  Load:     (this: ScreenTextEntry, args: TextEntrySettings) => void
}

declare const ScreenTextEntry: ScreenTextEntry
// class ScreenTextEntry