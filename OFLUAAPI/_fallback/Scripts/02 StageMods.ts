declare const AreStagePlayerModsForced: () => boolean
declare const AreStageSongModsForced: () => boolean

declare interface ScreenSelectMusicFallback {
  setupmusicstagemods: (this: ScreenSelectMusic) => ScreenSelectMusic
  setupcoursestagemods: (this: ScreenSelectMusic) => ScreenSelectMusic
}