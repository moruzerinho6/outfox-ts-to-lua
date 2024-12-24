declare const _screen: {
  w: number,
  h: number,
  cx: number,
  cy: number
}

declare const GetTitleSafeH: (fPerc: number) => number
declare const GetTitleSafeV: (fPerc: number) => number

declare const SAFE_WIDTH: number
declare const SAFE_HEIGHT: number

declare const _safe: {
  w: number,
  h: number
}

declare const alias_one: (cls: any, main_name: string, alt_name: string) => void
declare const alias_set: (cls: any, set: any) => void
declare const make_camel_aliases: (cls: any) => void

declare namespace GameState {
  const GetSongBeat: number
  const GetSongBeatNoOffset: number
  const GetSongBPS: number
  const GetSongDelay: number
  const GetSongFreeze: number
}

declare const Condition: {
  Hour: number
  IsDemonstration: boolean
  CurSong: string
  DayOfMonth: number
  MonthOfYear: number
  UsingModifier: boolean
}

declare const Blend: {
  Normal: string
  Add: string
  Subtract: string
  Modulate: string
  CopySource: string
  AlphaMask: string
  AlphaKnockOut: string
  AlphaMultiply: string
  Multiply: string
  Invert: string
  NoEffect: string
}

declare const StrintToBlend: (s: string) => string

declare const Health: {
  Max: string
  Alive: string
  Dangher: string
  Dead: string
}