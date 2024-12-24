import type { Character } from "./Character"
import type { Course } from "./Course"
import type { Song } from "./Song"
import type { Steps } from "./Steps"
import type { Style } from "./Style"
import type { Trail } from "./Trail"
import type { Difficulty, MultiPlayer, PlayMode, SortOrder } from "./enums"

interface GameCommandProperties {
  GetAnnouncer: () => string
  GetCharacter: () => Character
  GetCourse: () => Course
  GetCourseDifficulty: () => Difficulty
  GetDifficulty: () => Difficulty
  GetIndex: () => number
  GetMultiPlayer: () => MultiPlayer
  GetName: () => string
  GetPlayMode: () => PlayMode
  GetPrefferedModifiers: () => string
  GetProfileID: () => string
  GetScreen: () => string
  GetSong: () => Song
  GetSongGroup: () => string
  GetSortOrder: () => SortOrder
  GetStageModifiers: () => string
  GetSteps: () => Steps
  GetStyle: () => Style
  GetText: () => string
  GetTrail: () => Trail
  GetUrl: () => string
}

export type GameCommand = GameCommandProperties
