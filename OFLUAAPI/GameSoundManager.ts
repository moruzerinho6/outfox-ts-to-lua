declare interface GameSoundManager {
  DimMusic:         (this: GameSoundManager, fVolume: number, fDuration: number) => void
  GetMusicPath:     (this: GameSoundManager) => string
  GetPlayerBalance: (this: GameSoundManager, pn: PlayerNumber) => number
  GetVolume:        (this: GameSoundManager) => void
  IsTimingDelayed:  (this: GameSoundManager) => boolean
  PlayAnnouncer:    (this: GameSoundManager, sPath: string) => void
  PlayMusicPart:    (this: GameSoundManager, musicPath: string, musicStart: number, musicLength: number, fadeIn: number, loop: boolean, applyRate: boolean, alignBeat: boolean, timing: TimingData) => void
  PlayOnce:         (this: GameSoundManager, sPath: string, is_action?: boolean) => void
  StopMusic:        (this: GameSoundManager) => void
  Volume:           (this: GameSoundManager, fVolume: number, fFadeDuration: number) => void
}

declare const SOUND: GameSoundManager
declare const GameSoundManager: GameSoundManager