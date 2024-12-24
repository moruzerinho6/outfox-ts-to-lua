import type { TimingData } from "./TimingData"
import type { PlayerNumber } from "./enums"

interface SOUNDProperties {
  DimMusic: (fVolume: number, fDuration: number) => void
  GetMusicPath: () => string
  GetPlayedBalance: (pn: PlayerNumber) => number
  GetVolume: () => number
  PlayAnnouncer: (sPath: string) => void
  PlayMusicPart: (musicPath: string, musicLength: number, fadeIn: number, fadeOut: number, loop: boolean, applyRate: boolean, timing: TimingData) => void
  PlayOnce: (sPath: string, isAction: boolean) => void
  StopMusic: () => void
  IsTimingDelayed: () => boolean
  Volume: (fVolume: number, fFadeDuration: number) => void
}

export type SOUND = SOUNDProperties
