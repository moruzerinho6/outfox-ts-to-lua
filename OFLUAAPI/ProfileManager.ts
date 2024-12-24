declare interface ProfileManager {
  GetLocalProfile:                (this:ProfileManager, sProfileID: string) => Profile
  GetLocalProfileDisplayNames:    (this:ProfileManager) => LuaIterable<string>
  GetLocalProfileFromIndex:       (this:ProfileManager, iIndex: number) => Profile
  GetLocalProfileIDFromIndex:     (this:ProfileManager, iIndex: number) => string
  GetLocalProfileIDs:             (this:ProfileManager) => LuaIterable<string>
  GetLocalProfileIndexFromID:     (this:ProfileManager, sProfileID: string) => number
  GetMachineProfile:              (this:ProfileManager) => Profile
  GetNumLocalProfiles:            (this:ProfileManager) => number
  GetPlayerName:                  (this:ProfileManager, pn: PlayerNumber) => string
  GetProfile:                     (this:ProfileManager, pn: PlayerNumber) => Profile
  GetProfileDir:                  (this:ProfileManager, slot: ProfileSlot) => string
  GetSongNumTimesPlayed:          (this:ProfileManager, s: Song, ps: ProfileSlot) => number
  GetStatsPrefix:                 (this:ProfileManager) => string
  IsPersistentProfile:            (this:ProfileManager, pn: PlayerNumber) => boolean
  IsSongNew:                      (this:ProfileManager, s: Song) => boolean
  LastLoadWasTamperedOrCorrupt:   (this:ProfileManager, pn: PlayerNumber) => boolean
  LocalProfileIDToDir:            (this:ProfileManager, id: string) => string
  ProfileFromMemoryCardIsNew:     (this:ProfileManager, pn: PlayerNumber) => boolean
  ProfileWasLoadedFromMemoryCard: (this:ProfileManager, pn: PlayerNumber) => boolean
  SaveLocalProfile:               (this:ProfileManager, ID: string) => boolean
  SaveMachineProfile:             (this:ProfileManager) => void
  SaveProfile:                    (this:ProfileManager, pn: PlayerNumber) => boolean
  SetStatsPrefix:                 (this:ProfileManager) => void
}

declare const ProfileManager: ProfileManager
declare const PROFILEMAN: ProfileManager