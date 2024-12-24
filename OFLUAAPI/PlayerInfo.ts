declare interface PlayerInfo {
  GetLifeMeter: () => LifeMeter
  GetStepsQueueWrapped: (index: number) => Steps
}

declare const PlayerInfo: PlayerInfo