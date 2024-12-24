declare const SMOnlineScreen: () => string
declare var SelectMusicOrCourse: () => string
declare const GameOverOrContinue: () => string

type BranchBs = {
  [S in string]: () => string
}

declare interface Branch {
  Init:                       () => string
  AfterInit:                  () => string
  NoiseTrigger:               () => string
  TitleMenu:                  () => string
  AfterTitleMenu:             () => string
  StartGame:                  () => string
  OptionsEdit:                () => string
  AfterSelectStyle:           () => string
  AfterSelectProfile:         () => string
  AfterProfileLoad:           () => string
  AfterProfileSave:           () => string
  GetGameInformationScreen:   () => string
  AfterSMOLogin:              () => string
  BackOutOfPlayerOptions:     () => string
  BackOutOfStageInformation:  () => string
  AfterSelectMusic:           () => string
  PlayerOptions:              () => string
  SongOptions:                () => string
  GameplayScreen:             () => string
  EvaluationScreen:           () => string
  AfterGameplay:              () => string
  AfterHeartEntry:            () => string
  AfterEvaluation:            () => string
  AfterSummary:               () => string
  Network:                    () => string
  AfterSaveSummary:           () => string
  AfterContinue:              () => string
}

declare const Branch: Branch & BranchBs