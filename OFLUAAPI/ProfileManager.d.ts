import type { Profile } from "./Profile";
import type { Song } from "./Song";
import type { PlayerNumber, ProfileSlot } from "./enums";

interface ProfileManagerProperties {
  GetLocalProfile: (sProfileID: string) => Profile
  GetLocalProfileDisplayNames: () => string[]
  GetLocalProfileFromIndex: (iIndex: number) => Profile
  GetLocalProfileIDFromIndex: (iIndex: number) => string
  GetLocalProfileIDs: () => string[]
  GetLocalProfileIndexFromID: (sProfileID: string) => string[]
  GetMachineProfile: () => Profile
  GetNumLocalProfiles: () => number
  GetPlayerName: (pn: PlayerNumber) => string
  GetProfile: (pn: PlayerNumber) => Profile
  GetProfileDir: (slot: ProfileSlot) => boolean
  GetSongNumTimesPlayed: (s: Song, ps: ProfileSlot) => boolean
  GetStatsPrefix: () => boolean
  IsPersistentProfile: (pn: PlayerNumber) => boolean
  IsSongNew: (s: Song) => boolean
  LocalProfileIDToDir: (id: any) => string
  ProfileFromMemoryCardIsNew: (pn: PlayerNumber) => boolean
  ProfileWasLoadedFromMemoryCard: (pn: PlayerNumber) => boolean
  LastLoadWasFromLastGood: (pn: PlayerNumber) => boolean
  LastLoadWasTamperedorCorrupt: (pn: PlayerNumber) => boolean
  SaveLocalProfile: (ID: string) => boolean
  SaveMachineProfile: () => boolean
  SaveProfile: (pn: PlayerNumber) => boolean
  SetStatsPrefix: (string: string) => boolean
}

export type PROFILEMAN = ProfileManagerProperties
