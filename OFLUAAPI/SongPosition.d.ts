declare interface SongPosition {
  GetCurBPS: () => number
  GetDelay: () => boolean
  GetFreeze: () => boolean
  GetMusicSeconds: () => number
  GetMusicSecondsVisible: () => number
  GetSongBeat: () => number
  GetSongBeatNoOffset: () => number
  GetSongBeatVisible: () => number
  GetWarpBeginRow: () => number
  GetWarpDestination: () => number
}

declare var SongPosition : SongPosition