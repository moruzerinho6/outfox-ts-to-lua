declare interface SongManager {
  DoesCourseGroupExist:             (this: SongManager, sGroup: string) => boolean
  DoesSongGroupExist:               (this: SongManager, sGroup: string) => boolean
  FindCourse:                       (this: SongManager, sCourse: string) => Course
  FindSong:                         (this: SongManager, sSong: string) => Song
  GetAllCourses:                    (this: SongManager, bIncludeAutogen: boolean) => Course[]
  GetAllSongs:                      (this: SongManager, bIncludeAutogen: boolean) => Song[]
  GetCourseColor:                   (this: SongManager, c: Course) => RageColor
  GetCourseGroupBannerPath:         (this: SongManager, sGroup: string) => string
  GetCourseGroupNames:              (this: SongManager) => string[]
  GetCoursesInGroup:                (this: SongManager, sGroup: string, bIncludeAutogen: boolean) => Course[]
  GetExtraStageInfo:                (this: SongManager, bExtra2: boolean, s: Style) => LuaMultiReturn<[Song, Steps]>
  GetNumAdditionalSongs:            (this: SongManager) => boolean
  GetNumCourseGroups:               (this: SongManager) => number
  GetNumCourses:                    (this: SongManager) => number
  GetNumSelectableAndUnlockedSongs: (this: SongManager) => number
  GetNumSongGroups:                 (this: SongManager) => number
  GetNumSongs:                      (this: SongManager) => number
  GetNumLockedSongs:                (this: SongManager) => number
  GetNumUnlockedSongs:              (this: SongManager) => number
  GetPopularCourses:                (this: SongManager, ct: CourseType) => Course[]
  GetPopularSongs:                  (this: SongManager) => Song[]
  GetPreferredSortCourses:          (this: SongManager, ct: CourseType, bIncludeAutogen: boolean) => Course[]
  GetPreferredSortSongs:            (this: SongManager) => Song[]
  GetRandomCourse:                  (this: SongManager) => Course
  GetRandomSong:                    (this: SongManager) => Song
  GetSongColor:                     (this: SongManager, s: Song) => RageColor
  GetSongGroupBannerPath:           (this: SongManager, sGroup: string) => string
  GetSongGroupColor:                (this: SongManager, sGroupName: string) => RageColor
  GetSongGroupNames:                (this: SongManager) => string[]
  GetSongRank:                      (this: SongManager, s: Song) => number
  GetSongsInGroup:                  (this: SongManager, sGroupName: string) => Song[]
  ShortenGroupName:                 (this: SongManager, sGroupName: string) => string
  SetPreferredCourses:              (this: SongManager, sListName: string) => void
  SetPreferredSongs:                (this: SongManager, sListName: string) => void
  SongToPreferredSortSectionName:   (this: SongManager, s: Song) => string
  WasLoadedFromAdditionalCourses:   (this: SongManager, c: Course) => boolean
  WasLoadedFromAdditionalSongs:     (this: SongManager, s: Song) => boolean
}

declare const SONGMAN : SongManager
declare const SongManager: SongManager