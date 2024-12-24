// import type { Song } from "./Song"
// import type { Steps } from "./Steps"

declare interface TrailEntry {
  GetNormalModifiers: () => string
  GetSong: () => Song
  GetSteps: () => Steps
  IsSecret: () => boolean
}

declare var TrailEntry : TrailEntry