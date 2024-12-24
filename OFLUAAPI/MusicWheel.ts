declare interface MusicWheel extends WheelBase {
  ChangeSort:         (this: MusicWheel, so: SortOrder) =>      boolean
  GetCurrentSections: (this: MusicWheel) =>                     AnyTable // TODO: {string}
  GetSelectedSection: (this: MusicWheel) =>                     string
  IsRouletting:       (this: MusicWheel) =>                     boolean
  Move:               (this: MusicWheel, direction: number) =>  void
  SelectCourse:       (this: MusicWheel, sCourse: Course) =>    boolean
  SelectSong:         (this: MusicWheel, sSong: Song) =>        boolean
}

declare const MusicWheel: MusicWheel