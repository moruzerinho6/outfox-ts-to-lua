declare interface ScreenGameplay extends ScreenWithMenuElements {
  begin_backing_out:          (this: ScreenGameplay) => void
  Center1Player:              (this: ScreenGameplay) => boolean
  GetDummyPlayerInfo:         (this: ScreenGameplay, index: number) => PlayerInfo
  GetHasterate:               (this: ScreenGameplay) => number
  GetLifeMeter:               (this: ScreenGameplay, pn: PlayerNumber) => LifeMeter
  GetNextCourseSong:          (this: ScreenGameplay) => Song
  GetPlayerInfo:              (this: ScreenGameplay, pn: PlayerNumber) => PlayerInfo
  GetSound:                   (this: ScreenGameplay) => RageSound
  GetTrueBPS:                 (this: ScreenGameplay, pn: PlayerNumber) => number
  HasteAddAmounts:            (this: ScreenGameplay) => AnyTable // TODO: {float}
  HideGameplayElements:       (this: ScreenGameplay) => void
  IsPaused:                   (this: ScreenGameplay) => boolean
  PauseGame:                  (this: ScreenGameplay, bPause: boolean) => void
  RequestBeatCrossedMessages: (this: ScreenGameplay, bState: boolean) => void
  SetCurrentBeat:             (this: ScreenGameplay, fBeat: number, timing: TimingData) => void
  SetCurrentMusicSeconds:     (this: ScreenGameplay, fSeconds: number) => void
}

declare const ScreenGameplay: ScreenGameplay