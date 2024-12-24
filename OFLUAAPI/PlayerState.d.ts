declare interface PlayerState {
  ApplyPreferredOptionsToOtherLevels: (this: PlayerState) => void
  GetCurrentPlayerOptions:            (this: PlayerState, ml?: ModsLevel) => PlayerOptions
  GetHealthState:                     (this: PlayerState) => HealthState
  GetMultiPlayerNumber:               (this: PlayerState) => MultiPlayer
  GetPlayerController:                (this: PlayerState) => PlayerController
  GetPlayerNumber:                    (this: PlayerState) => PlayerNumber
  GetPlayerOptions:                   (this: PlayerState, ml?: ModsLevel) => PlayerOptions
  GetPlayerOptionsString:             (this: PlayerState, ml?: ModsLevel) => string
  GetPlayerOptionsArray:              (this: PlayerState, ml?: ModsLevel) => string[]
  GetSongPosition:                    (this: PlayerState) => SongPosition
  GetSuperMeterLevel:                 (this: PlayerState) => number
  SetPlayerOptions:                   (this: PlayerState, ml: ModsLevel, sPlayerOptions: string) => void
}

declare const PlayerState : PlayerState