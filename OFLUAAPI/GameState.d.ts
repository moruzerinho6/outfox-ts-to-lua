// import type { Character } from "./Character";
// import type { Course } from "./Course";
// import type { Game } from "./Game";
// import type { CoinMode, Difficulty, EarnedExtraStage, ModsLevel, MultiPlayer, PlayMode, PlayerNumber, Premium, SortOrder, Stage, StageResult, StepsType } from "./enums";
// import type { CharacterStage } from "./CharacterStage";
// import type { Profile } from "./Profile";
// import type { PlayerState } from "./PlayerState";
// import type { Steps } from "./Steps";
// import type { Song } from "./Song";
// import type { Style } from "./Style";
// import type { Trail } from "./Trail";
// import type { SongPosition } from "./SongPosition";
// import type { SongOptions } from "./SongOptions";

declare interface GAMESTATE {
  AddStageToPlayer:                           (this: GAMESTATE, pn: PlayerNumber) => void
  ApplyPreferredModifiers:                    (this: GAMESTATE, pn: PlayerNumber, mods: string) => void
  ApplyPreferredSongOptionsToOtherLevels:     (this: GAMESTATE) => void
  ApplyStageModifiers:                        (this: GAMESTATE, pn: PlayerNumber, mods: string) => void
  AnyPlayerHasRankingFeats:                   (this: GAMESTATE) => boolean
  ApplyGameCommand:                           (this: GAMESTATE, sCommand: string, pn?: PlayerNumber) => void
  CanSafelyEnterGameplay:                     (this: GAMESTATE) => string | boolean
  ClearStageModifiersIllegalForCourse:        (this: GAMESTATE) => void
  CurrentOptionsDisqualifyPlayer:             (this: GAMESTATE, pn: PlayerNumber) => boolean
  DeleteKeysounds:                            (this: GAMESTATE) => void
  EnoughCreditsToJoin:                        (this: GAMESTATE) => boolean
  DopeFish:                                   (this: GAMESTATE) => boolean // You're a DopeFish
  Env:                                        (this: GAMESTATE) => LuaTable
  GetAutoGenFarg:                             (this: GAMESTATE, i: number) => unknown
  GetCharacter:                               (this: GAMESTATE, pn: PlayerNumber) => Character
  GetCoinMode:                                (this: GAMESTATE) => CoinMode
  GetCoins:                                   (this: GAMESTATE) => number
  GetCoinsNeededToJoin:                       (this: GAMESTATE) => number
  GetCourseSongIndex:                         (this: GAMESTATE) => number
  GetCurMusicSeconds:                         (this: GAMESTATE) => number
  GetCurrentCourse:                           (this: GAMESTATE) => Course
  GetCurrentGame:                             (this: GAMESTATE) => Game
  GetCurrentSong:                             (this: GAMESTATE) => Song | undefined
  GetCurrentStage:                            (this: GAMESTATE) => Stage
  GetCurrentStageIndex:                       (this: GAMESTATE) => number
  GetCurrentSteps:                            (this: GAMESTATE, pn: PlayerNumber) => Steps
  GetCurrentStepsCredits:                     (this: GAMESTATE) => LuaTable
  GetCurrentStyle:                            (this: GAMESTATE, pn?: PlayerNumber) => Style | undefined
  GetCurrentTrail:                            (this: GAMESTATE, pn: PlayerNumber) => Trail
  GetDefaultSongOptions:                      (this: GAMESTATE) => string
  GetEarnedExtraStage:                        (this: GAMESTATE) => EarnedExtraStage
  GetEasiestStepsDifficulty:                  (this: GAMESTATE, res: boolean) => Difficulty
  GetEditCourseEntryIndex:                    (this: GAMESTATE) => number
  GetEditLocalProfile:                        (this: GAMESTATE) => Profile
  GetEditLocalProfileID:                      (this: GAMESTATE) => string
  SetEditLocalProfileID:                      (this: GAMESTATE, sID: string) => string
  GetEditSourceSteps:                         (this: GAMESTATE) => Steps | undefined
  GetEnabledPlayers:                          (this: GAMESTATE) => LuaTable & AnyTable// PlayerNumber[]
  GetExpandedSectionName:                     (this: GAMESTATE) => string
  GetGameSeed:                                (this: GAMESTATE) => string
  GetGameplayLeadIn:                          (this: GAMESTATE) => boolean
  GetHardestStepsDifficulty:                  (this: GAMESTATE, res: boolean) => Difficulty
  GetHumanPlayers:                            (this: GAMESTATE) => PlayerNumber[]
  GetIsFieldCentered:                         (this: GAMESTATE, pn: PlayerNumber) => boolean
  GetIsFieldReversed:                         (this: GAMESTATE, pn: PlayerNumber) => boolean
  GetLastGameplayDuration:                    (this: GAMESTATE) => number
  GetLoadingCourseSongIndex:                  (this: GAMESTATE) => number
  GetMasterPlayerNumber:                      (this: GAMESTATE) => PlayerNumber
  GetMultiplayer:                             (this: GAMESTATE) => boolean
  GetMultiPlayerState:                        (this: GAMESTATE, mp: MultiPlayer) => PlayerState
  GetNumMultiplayerNoteFields:                (this: GAMESTATE) => number
  GetNumPlayersEnabled:                       (this: GAMESTATE) => number
  GetNumSidesJoined:                          (this: GAMESTATE) => number
  GetNumStagesForCurrentSongAndStepsOrCourse: (this: GAMESTATE) => number
  GetNumStagesLeft:                           (this: GAMESTATE, pn: PlayerNumber) => number
  GetPlayerDisplayName:                       (this: GAMESTATE, pn: PlayerNumber) => string
  GetPlayerState:                             (this: GAMESTATE, pn: PlayerNumber) => PlayerState
  GetPlayMode:                                (this: GAMESTATE) => PlayMode
  GetPreferredDifficulty:                     (this: GAMESTATE, pn: PlayerNumber) => Difficulty
  GetPreferredSong:                           (this: GAMESTATE) => Song
  GetPremium:                                 (this: GAMESTATE) => Premium
  GetSmallestNumStagesLeftForAnyHumanPlayer:  (this: GAMESTATE) => number
  GetSongOptions:                             (this: GAMESTATE, ml: ModsLevel) => string
  GetSongOptionsString:                       (this: GAMESTATE) => string
  GetSongOptionsObject:                       (this: GAMESTATE, ml: ModsLevel) => SongOptions
  GetSongPercent:                             (this: GAMESTATE, fBeat: number) => number
  GetSongPosition:                            (this: GAMESTATE) => SongPosition
  GetSortOrder:                               (this: GAMESTATE) => SortOrder
  GetStageResult:                             (this: GAMESTATE, pn: PlayMode) => StageResult
  GetStageSeed:                               (this: GAMESTATE) => number
  GetStyleFieldSize:                          (this: GAMESTATE, pn: PlayerNumber) => number
  GetWorkoutGoalComplete:                     (this: GAMESTATE) => boolean
  HasEarnedExtraStage:                        (this: GAMESTATE) => boolean
  HaveProfileToLoad:                          (this: GAMESTATE) => boolean
  GaveProfileToSave:                          (this: GAMESTATE) => boolean
  InStepEditor:                               (this: GAMESTATE) => boolean
  InsertCoin:                                 (this: GAMESTATE, iCoins: number) => void
  InsertCredit:                               (this: GAMESTATE) => void
  IsAnExtraStage:                             (this: GAMESTATE) => boolean
  IsAnyHumanPlayerUsingMemoryCard:            (this: GAMESTATE) => boolean
  IsBattleMode:                               (this: GAMESTATE) => boolean
  IsCourseMode:                               (this: GAMESTATE) => boolean
  IsDemonstration:                            (this: GAMESTATE) => boolean
  IsDraw:                                     (this: GAMESTATE) => boolean
  IsEventMode:                                (this: GAMESTATE) => boolean
  IsExtraStage:                               (this: GAMESTATE) => boolean
  IsExtraStage2:                              (this: GAMESTATE) => boolean
  IsGoalComplete:                             (this: GAMESTATE, pn: PlayerNumber) => boolean
  GetGoalPercentComplete:                     (this: GAMESTATE, pn: PlayerNumber, UseAccumulated: boolean) => number
  IsHumanPlayer:                              (this: GAMESTATE, pn: PlayerNumber) => boolean
  IsPlayerEnabled:                            (this: GAMESTATE, pn: PlayerNumber) => boolean
  IsSideJoined:                               (this: GAMESTATE, pn: PlayerNumber) => boolean
  IsWinner:                                   (this: GAMESTATE, pn: PlayerNumber) => boolean
  JoinPlayer:                                 (this: GAMESTATE, pn: PlayerNumber) => void
  JoinInput:                                  (this: GAMESTATE, pn: PlayerNumber) => void
  LoadProfiles:                               (this: GAMESTATE, LoadEdits: boolean) => void
  PlayerIsUsingModifier:                      (this: GAMESTATE, pn: PlayerNumber, sModifier: string) => boolean
  PlayersCanJoin:                             (this: GAMESTATE) => boolean
  prepare_song_for_gameplay:                  (this: GAMESTATE) => void
  Reset:                                      (this: GAMESTATE) => void
  ResetPlayerOptions:                         (this: GAMESTATE, pn: PlayerNumber) => void
  SaveLocalDate:                              (this: GAMESTATE) => void
  SaveProfiles:                               (this: GAMESTATE) => void
  SetAutoGenFarg:                             (this: GAMESTATE, i: number, value: number) => void
  SetCharacter:                               (this: GAMESTATE, pn: PlayerNumber, sCharID: string) => void
  SetCurrentCourse:                           (this: GAMESTATE, course: Course) => void
  SetCurrentPlayMode:                         (this: GAMESTATE, mode: PlayMode | string) => void
  SetCurrentSong:                             (this: GAMESTATE, song: Song | undefined) => void
  SetCurrentSteps:                            (this: GAMESTATE, pn: PlayerNumber, steps: Steps | undefined) => void
  SetCurrentStyle:                            (this: GAMESTATE, style: Style | string) => void
  SetCurrentTrail:                            (this: GAMESTATE, pn: PlayerNumber, trail: Trail) => void
  SetFailTypeExplicitelySet:                  (this: GAMESTATE, ) => void
  SetJukeboxUsesModifiers:                    (this: GAMESTATE, bUseMods: boolean) => void
  SetMultiplayer:                             (this: GAMESTATE, b: boolean) => void
  SetNumMultiplayerNoteFields:                (this: GAMESTATE, iFields: number) => void
  SetPreferredDifficulty:                     (this: GAMESTATE, pn: PlayerNumber, dc: Difficulty) => void
  SetPreferredSong:                           (this: GAMESTATE, song: Song) => void
  SetPreferredSongGroup:                      (this: GAMESTATE, sGroup: string) => void
  SetSongOptions:                             (this: GAMESTATE, m: ModsLevel, so: string) => void
  SetStageSeed:                               (this: GAMESTATE, iStageSeed: number) => void
  SetStepsForEditMode:                        (this: GAMESTATE, song: Song, steps: StepsType, stepstype: StepsType, difficulty: Difficulty) => void
  SetTemporaryEventMode:                      (this: GAMESTATE, bOn: boolean) => void
  StoreRankingName:                           (this: GAMESTATE, pn: PlayerNumber, name: string) => void
  ShowW1:                                     (this: GAMESTATE) => boolean
  UpdateDiscordGameMode:                      (this: GAMESTATE, sGameMode: string) => void
  UpdateDiscordProfile:                       (this: GAMESTATE, sProfile: string) => void
  UpdateDiscordScreenInfo:                    (this: GAMESTATE, sScreen: string, sStates: string, sStartTime: string) => void
  UpdateDiscordSongPlaying:                   (this: GAMESTATE, sScreen: string, sStates: string, sStartTime: string | number) => void
  UnjoinPlayer:                               (this: GAMESTATE, pn: PlayerNumber) => void
  ChangeProfileForPlayer:                     (this: GAMESTATE, pn: PlayerNumber, profileID: string) => void
  MakePlayerGest:                             (this: GAMESTATE, pn: PlayerNumber) => void
  GetStage:                                   (this: GAMESTATE) => CharacterStage
  SetStage:                                   (this: GAMESTATE, sStageID: string) => void
}

declare var GAMESTATE: GAMESTATE