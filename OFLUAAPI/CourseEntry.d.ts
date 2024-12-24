// import type { Song } from "./Song"

declare interface CourseEntry {
  GetSong: () => Song
  GetGainLives: () => number
  GetGainSeconds: () => number
  GetNormalModifiers: () => string
  GetNumModChanges: () => number
  GetTextDescription: () => string
  IsFixedSong: () => boolean
  IsSecret: () => boolean
}

declare var CourseEntry : CourseEntry