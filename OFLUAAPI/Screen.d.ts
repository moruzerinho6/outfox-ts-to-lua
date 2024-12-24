// import type { ScreenWithMenuElements } from "./Screens/ScreenWithMenuElements"
// import type { PlayerNumber, ScreenType } from "./enums"

interface DeviceInputArgs {
  device: string
  button: string
  level: number
  z: number
  down: number
  ago: number
  is_joystick: boolean
  is_mouse: boolean
}

interface InputCallback {
  DeviceInput: DeviceInputArgs
  controller: string
  button: string
  type: string
  GameButton: string
  PlayerNumber: PlayerNumber
  MultiPlayer: string
}

declare interface Screen extends ScreenFallback, ActorFrame {
  AddInputCallback:     (this: Screen, callback: (event: InputCallback) => any) =>     void
  GetPrevScreenName:    (this: Screen) =>                                              string
  GetScreenType:        (this: Screen) =>                                              ScreenType
  lockinput:            (this: Screen, f: number) =>                                   void
  PostScreenMessage:    (this: Screen, sScreenMsg: string, fDelay: number) =>          Screen
  RemoveInputCallback:  (this: Screen, callback: any) =>                               Screen
  SetNextScreenName:    <T = Screen>(this: Screen, name: string) =>                    T | Screen | ScreenAttract | ScreenEdit | ScreenEvaluation | ScreenGameplay | ScreenHowToPlay | ScreenNameEntryTraditional | ScreenNetEvaluation | ScreenOptions | ScreenOptionsEditProfile | ScreenPlayerOptions | ScreenProfileLoad | ScreenProfileSave | ScreenSelectMaster | ScreenSelectMusic | ScreenSelectProfile | ScreenTextEntry | ScreenWithMenuElements
  SetPrevScreenName:    <T = Screen>(this: Screen, name: string) =>                    T | Screen | ScreenAttract | ScreenEdit | ScreenEvaluation | ScreenGameplay | ScreenHowToPlay | ScreenNameEntryTraditional | ScreenNetEvaluation | ScreenOptions | ScreenOptionsEditProfile | ScreenPlayerOptions | ScreenProfileLoad | ScreenProfileSave | ScreenSelectMaster | ScreenSelectMusic | ScreenSelectProfile | ScreenTextEntry
}

declare const Screen: Screen