// import type { CourseEntry } from "./CourseEntry"
// import type { Trail } from "./Trail"
// import type { CourseType, PlayMode, StepsType } from "./enums"

declare interface Course {
  AllSongsAreFixed: () => boolean
  GetAllTrails: () => Trail[]
  GetBackgroundPath: () => string
  GetBannerPath: () => string
  GetCourseDir: () => string
  GetCourseEntries: () => CourseEntry[]
  GetCourseEntry: (iIndex: number) => CourseEntry
  GetCourseType: () => CourseType
  GetDescription: () => string
  GetDisplayFullTitle: () => string
  GetEstimatedNumStages: () => number
  GetGoalSeconds: () => number
  GetGroupName: () => string
  GetNumCourseEntries: () => number
  GetPlayMode: () => PlayMode
  GetScripter: () => string
  GetTotalSeconds: (st: StepsType) => number
  GetTranslitFullTitle: () => string
  HasBackground: () => boolean
  HasBanner: () => boolean
  HasMods: () => boolean
  HasTimedMods: () => boolean
  IsAnEdit: () => boolean
  IsAutogen: () => boolean
  IsEndless: () => boolean
  IsNonstop: () => boolean
  IsOni: () => boolean
  IsPlayableIn: (st: StepsType) => boolean
  IsRanking: () => boolean
}

declare var Course: Course