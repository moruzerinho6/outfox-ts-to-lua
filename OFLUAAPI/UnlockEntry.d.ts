import type { Course } from "./Course"
import type { Song } from "./Song"
import type { Steps } from "./Steps"
import type { StepsType, UnlockRequirement, UnlockRewardType } from "./enums"

interface UnlockEntryProperties {
  code: (m_sEntryID: string) => void
  course: (sCourseName: string) => void
  GetCode: () => string
  GetCourse: () => Course
  GetDescription: () => string
  GetRequirement: () => UnlockRequirement
  GetRequirePassChallengeSteps: () => boolean
  GetRequirePassHardSteps: () => boolean
  GetSong: () => Song
  GetStepByStepsType: () => LuaTable<StepsType, Steps>
  GetUnlockRewardType: () => UnlockRewardType
  IsLocked: () => boolean
  mod: (sModifier: string) => void
  require: (ut: UnlockRequirement, m_fRequirement: number) => void
  requirepasschallengesteps: () => void
  requirepasshardsteps : () => void
  roulette: () => void
  song: (sSongName: string) => void
  steps: (sSong: string, sSteps: string) => void
  steps_type: (sSong: string, sSteps: string, sStepsType: string) => void
}

export type UnlockEntry = UnlockEntryProperties