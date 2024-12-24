// import type { Character } from "./Character"
// import type { Course } from "./Course"
// import type { HighScore } from "./HighScore"
// import type { HighScoreList } from "./HighScoreList"
// import type { Song } from "./Song"
// import type { Steps } from "./Steps"
// import type { Difficulty, GoalType, Grade, ProfileType, RankingCategory, StepsType } from "./enums"

declare interface Profile {
  AddCaloriesToDailyTotal:                          (this: Profile, cals: number) =>                            void
  AddScreenshot:                                    (this: Profile, hs: HighScore, filename: string) =>         void
  CalculateCaloriesFromHeartRate:                   (this: Profile, heart_bpm: number, duration: number) =>     number
  GetAge:                                           (this: Profile) =>                                          number
  GetAllUsedHighScoreNames:                         (this: Profile) =>                                          string[]
  GetBirthYear:                                     (this: Profile) =>                                          number
  GetCaloriesBurnedToday:                           (this: Profile) =>                                          number
  GetCaloriesBurnedByDate:                          (this: Profile, date: string) =>                            number
  GetCategoryHighScoreList:                         (this: Profile, st: StepsType, rc: RankingCategory) =>      HighScoreList
  GetCharacter:                                     (this: Profile) =>                                          Character
  GetCoursesActual:                                 (this: Profile, st: StepsType, d: Difficulty) =>            number
  GetCoursesPercentComplete:                        (this: Profile, st: StepsType, d: Difficulty) =>            number
  GetCoursesPossible:                               (this: Profile, st: StepsType, d: Difficulty) =>            number
  GetDisplayName:                                   (this: Profile) =>                                          string
  GetDisplayTotalCaloriesBurned:                    (this: Profile) =>                                          string
  GetGoalCalories:                                  (this: Profile) =>                                          number
  GetGoalSeconds:                                   (this: Profile) =>                                          number
  GetGoalType:                                      (this: Profile) =>                                          GoalType
  GetGUID:                                          (this: Profile) =>                                          string
  GetIgnoreStepCountCalories:                       (this: Profile) =>                                          boolean
  GetIsMale:                                        (this: Profile) =>                                          boolean
  GetHighScoreList:                                 (this: Profile, s: Song, st: Steps) =>                      HighScoreList
  GetHighScoreListIfExists:                         (this: Profile, s: Song, st: Steps) =>                      HighScoreList
  GetLastPlayedCourse:                              (this: Profile) =>                                          Course
  GetLastPlayedSong:                                (this: Profile) =>                                          Song
  GetLastUsedHighScoreName:                         (this: Profile) =>                                          string
  GetNumToasties:                                   (this: Profile) =>                                          number
  GetMostPopularCourse:                             (this: Profile) =>                                          Course
  GetMostPopularSong:                               (this: Profile) =>                                          Song
  GetNumTotalSongsPlayed:                           (this: Profile) =>                                          number
  GetPriority:                                      (this: Profile) =>                                          number
  GetSongNumTimesPlayed:                            (this: Profile, s: Song) =>                                 number
  GetSongsActual:                                   (this: Profile, st: StepsType, d: Difficulty) =>            number
  GetSongsAndCoursesPercentCompleteAllDifficulties: (this: Profile, st: StepsType) =>                           number
  GetSongsPercentComplete:                          (this: Profile, st: StepsType, d: Difficulty) =>            number
  GetSongsPossible:                                 (this: Profile, st: StepsType, d: Difficulty) =>            number
  GetTotalCaloriesBurned:                           (this: Profile) =>                                          number
  GetTotalDancePoints:                              (this: Profile) =>                                          number
  GetTotalHands:                                    (this: Profile) =>                                          number
  GetTotalHolds:                                    (this: Profile) =>                                          number
  GetTotalJumps:                                    (this: Profile) =>                                          number
  GetTotalLifts:                                    (this: Profile) =>                                          number
  GetTotalMines:                                    (this: Profile) =>                                          number
  GetTotalNumSongsPlayed:                           (this: Profile) =>                                          number
  GetTotalRolls:                                    (this: Profile) =>                                          number
  GetTotalScoresWithGrade:                          (this: Profile, g: Grade) =>                                number
  GetTotalStepsWithTopGrade:                        (this: Profile, st: StepsType, d: Difficulty, g: Grade) =>  number
  GetTotalTapsAndHolds:                             (this: Profile) =>                                          number
  GetTotalTrailsWithTopGrade:                       (this: Profile, st: StepsType, d: Difficulty, g: Grade) =>  number
  GetType:                                          (this: Profile) =>                                          ProfileType
  GetUserTable:                                     (this: Profile) =>                                          LuaTable
  GetVoomax:                                        (this: Profile) =>                                          number
  GetWeightPounds:                                  (this: Profile) =>                                          number
  HasPassedAnyStepsInSong:                          (this: Profile, s: Song) =>                                 boolean
  IsCodeUnlocked:                                   (this: Profile, sUnlockEntryID: string) =>                  boolean
  SetBirthYear:                                     (this: Profile, year: number) =>                            void
  SetCharacter:                                     (this: Profile, sCharID: string) =>                         void
  SetDisplayName:                                   (this: Profile, name: string) =>                            void
  SetGoalSeconds:                                   (this: Profile, iSecs: number) =>                           void
  SetGoalType:                                      (this: Profile, gt: GoalType) =>                            void
  SetIgnoreStepCountCalories:                       (this: Profile, ignore: boolean) =>                         void
  SetIsMale:                                        (this: Profile, male: boolean) =>                           void 
  SetLastUsedHighScoreName:                         (this: Profile, name: string) =>                            void
  SetVoomax:                                        (this: Profile, voo: number) =>                             void
  SetWeightPounds:                                  (this: Profile, weightPounds: number) =>                    void
  GetTotalGameplaySeconds:                          (this: Profile) =>                                          number
  GetTotalSessions:                                 (this: Profile) =>                                          number
  GetTotalSessionsSeconds:                          (this: Profile) =>                                          number
  get_songs:                                        (this: Profile) =>                                          Song[]
  GetLastPlayedDate:                                (this: Profile) =>                                          string
  GetLastDifficulty:                                (this: Profile) =>                                          Difficulty
  AddSongToFavorites:                               (this: Profile, pSong: Song) =>                             boolean
  RemoveSongFromFavorites:                          (this: Profile, pSong: Song) =>                             boolean
  SongIsFavorite:                                   (this: Profile, pSong: Song) =>                             boolean
  GetFavorites:                                     (this: Profile) =>                                          string[]
  IsOnlineRegistered:                               (this: Profile) =>                                          boolean // TODO: This is not documented on lua.xml
}

declare const Profile : Profile