import type { Actor } from "./Actor"
import type { Character } from "./Character"
import type { Course } from "./Course"
import type { Song } from "./Song"
import type { UnlockEntry } from "./UnlockEntry"
import type { SortOrder } from "./enums"

interface BannerProperties {
  InitCommand?: (self: Banner) => unknown
  OnCommand?: (self: Banner) => unknown
  BeginCommand?: (self: Banner) => unknown
  GetScrolling: () => boolean
  GetPercentScrolling: () => number
  LoadBackgroundFromUnlockEntry: (pUE: UnlockEntry) => Banner
  LoadBannerFromUnlockEntry: (pUE: UnlockEntry) => Banner
  LoadCardFromCharacter: (pCharacter: Character) => Banner
  LoadFromCachedBanner: (sPath: string) => Banner
  LoadFromCourse: (c: Course) => Banner
  LoadFromSong: (s: Song) => Banner
  LoadFromSongGroup: (s: string) => Banner
  LoadFromSortOrder: (so: SortOrder) => Banner
  LoadIconFromCharacter: (pCharacter: Character) => Banner
  scaletoclipped: (fWidth: number, fHeight: number) => Banner
  ScaleToClipped: (fWidth: number, fHeight: number) => Banner
  SetScrolling: (bScroll: boolean) => Banner
}

interface IndexableActor {
  [key: string]: (self: Banner) => unknown
}

export type Banner = BannerProperties & IndexableActor & Actor