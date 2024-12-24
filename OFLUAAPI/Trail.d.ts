// import type { Song } from "./Song";
// import type { RadarValues } from "./Steps";
// import type { TrailEntry } from "./TrailEntry";
// import type { Difficulty } from "./enums";

declare interface Trail {
  ContainsSong: (s: Song) => boolean
  GetArtists: () => LuaMultiReturn<[string[], string[]]>
  GetDifficulty: () => Difficulty
  GetLengthSeconds: () => number
  GetTrailEntries: () => LuaTable<number, TrailEntry>//TrailEntry[]
  GetMeter: () => number
  GetRadarValues: () => RadarValues
  GetStepsType: () => number
  GetTotalMeter: () => number
  GetTrailEntry: (iEntry: number) => TrailEntry
  IsSecret: () => boolean
}

declare var Trail: Trail