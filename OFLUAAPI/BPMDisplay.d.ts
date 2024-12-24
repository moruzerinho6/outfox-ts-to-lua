import type { Actor } from "./Actor";
import type { Course } from "./Course";
import type { Song } from "./Song";
import type { Steps } from "./Steps";

interface BPMDisplayProperties {
  InitCommand?: (self: BPMDisplay) => unknown
  OnCommand?: (self: BPMDisplay) => unknown
  BeginCommand?: (self: BPMDisplay) => unknown
  GetText: () => string
  SetFromCourse: (c: Course) => void
  SetFromGameState: () => void
  SetFromSong: (s: Song) => void
  SetFromSteps: (s: Steps) => void
}

interface IndexableActor {
  [key: string]: (self: BPMDisplay) => unknown
}

export type BPMDisplay = BPMDisplayProperties & IndexableActor & Actor