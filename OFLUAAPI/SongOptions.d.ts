// import type { AutosyncType, SoundEffectType } from "./enums"

declare interface SongOptions {
  AssistClap: (b: boolean) => boolean
  AssistMetronome: (b: boolean) => boolean
  AutosyncSettings: (type: AutosyncType) => AutosyncType
  FromString: (mods: string) => void
  Haste (): number
  Haste (h: number, approach_speed: number): LuaMultiReturn<[number, number]>
  MusicRate (): number
  MusicRate (rate: number | string): number
  MusicRate (rate: number | string, approach_speed: number): LuaMultiReturn<[number, number]>
  PitchRate: (b: boolean) => boolean
  RandomBGOnly: (b: boolean) => boolean
  SaveReplay: (b: boolean) => boolean
  SaveScore: (b: boolean) => boolean
  SoundEffectSettings: (type: SoundEffectType) => SoundEffectType
  StaticBackground: (b: boolean) => boolean
}

declare var SongOptions : SongOptions