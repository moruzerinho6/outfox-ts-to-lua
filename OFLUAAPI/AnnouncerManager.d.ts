declare interface AnnouncerManager{
  DoesAnnouncerExist:   (this: AnnouncerManager, sAnnouncer: string) => boolean
  GetAnnouncerNames:    (this: AnnouncerManager) => string[]
  GetCurrentAnnouncer:  (this: AnnouncerManager) => string
  SetCurrentAnnouncer:  (this: AnnouncerManager, sNewAnnouncer: string) => void
}

declare const ANNOUNCER : AnnouncerManager
declare const AnnouncerManager: AnnouncerManager