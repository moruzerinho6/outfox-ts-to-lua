// import type { NoteDataEntry } from "./Player"
// import type { Steps } from "./Steps"
// import type { TimingData } from "./TimingData"
// import type { Difficulty, StepsType } from "./enums"
// import type { RageColor } from "./init"

interface BGChangeEntry {
  start_beat: number
  rate: number
  transition: number
  effect: string
  file1: string
  file2: string
  color1: RageColor
  color2: RageColor
}

declare interface Song {
  GetAllSteps: () => Steps[]
  GetBackgroundPath: () => string
  GetBannerPath: () => string
  GetBGChanges: () => BGChangeEntry
  GetCDImagePath: () => string
  GetCDTitlePath: () => string
  GetCredit: () => string
  GetDiscPath: () => string
  GetDisplayArtist: () => string
  GetDisplayBpms: () => number[]
  GetDisplayFullTitle: () => string
  GetDisplayMainTitle: () => string
  GetDisplaySubTitle: () => string
  GetFirstBeat: () => number
  GetFirstSecond: () => number
  GetFGChanges: () => BGChangeEntry // According to the doc it should be the same?
  GetGenre: () => string
  GetGroupName: () => string
  GetJacketPath: () => string
  GetLastBeat: () => number
  GetLastSecond: () => number
  GetLyricsPath: () => string
  GetMainTitle: () => string
  GetMusicPath: () => string
  GetNoteData: () => NoteDataEntry[]
  GetOneSteps: () => Steps
  GetOrigin: () => string
  GetPreviewMusicPath: () => string
  GetPreviewVidPath: () => string
  GetSampleLength: () => number
  GetSampleStart: () => number
  GetSongDir: () => string
  GetSongFolder: () => string
  GetSongFilePath: () => string
  GetStepsByStepsType: (st: StepsType) => Steps[]
  GetStepsSeconds: () => number
  GetTags: () => string
  GetTimingData: () => TimingData
  GetTranslitArtist: () => string
  GetTranslitFullTitle: () => string
  GetTranslitMainTitle: () => string
  GetTranslitSubTitle: () => string
  PlayPreviewMusic: () => void
  HasAttacks: () => boolean
  HasBGChanges: () => boolean
  HasBackground: () => boolean
  HasBanner: () => boolean
  HasCDImage: () => boolean
  HasCDTitle: () => boolean
  HasDisc: () => boolean
  HasEdits: () => boolean
  HasJacket: () => boolean
  HasLyrics: () => boolean
  HasMusic: () => boolean
  HasPreviewVid: () => boolean
  HasSignificantBPMChangesOrStops: () => boolean
  HasSignificantBPMChanges: () => boolean
  HasStepsType: () => boolean
  HasStepsTypeAndDifficulty: (st: StepsType, d: Difficulty) => boolean
  IsCustomSong: () => boolean
  IsDisplayBpmRandom: () => boolean
  IsDisplayBpmSecret: () => boolean
  IsDisplayBpmSpecified: () => boolean
  IsEasy: () => boolean
  IsEnabled: () => boolean
  IsLong: () => boolean
  IsMarathon: () => boolean
  IsStepsUsingDifferentTiming: () => boolean
  IsTutorial: () => boolean
  MusicLengthSeconds: () => number
  NormallyDisplayed: () => boolean
  ShowInDemonstrationAndRanking: () => boolean
}

declare var Song: Song