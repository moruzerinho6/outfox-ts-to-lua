import type { Actor } from "./Actor"
import type { RageSound } from "./RageSound"
import type { PlayerNumber } from "./enums"

interface ActorSoundProperties {
  File?: string
  SupportPan?: boolean
  SupportRateChanging?: boolean
  IsAction?: boolean
  Precache?: boolean
  InitCommand?: (self: ActorSound) => unknown
  OnCommand?: (self: ActorSound) => unknown
  BeginCommand?: (self: ActorSound) => unknown
  get: () => RageSound
  get_is_action: () => boolean
  load: (sPath: string) => ActorSound
  pause: (bPause: boolean) => ActorSound
  play: () => ActorSound
  playforplayer: (pm: PlayerNumber) => ActorSound
  set_is_action: (is_action: boolean) => ActorSound
  stop: () => ActorSound
}

interface IndexableActor {
  [key: string]: (self: ActorSound) => unknown
}

export type ActorSound = ActorSoundProperties & IndexableActor & Actor