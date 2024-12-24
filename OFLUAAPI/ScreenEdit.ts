declare interface ScreenEdit extends ScreenWithMenuElements {
  ChangeArtist:           (this: ScreenEdit, sName: string) =>                      void
  ChangeGenre:            (this: ScreenEdit, sName: string) =>                      void
  ChangeMainTitle:        (this: ScreenEdit, sName: string) =>                      void
  ChangeToStepTiming:     (this: ScreenEdit, newState: boolean) =>                  void
  GetEditorPosition:      (this: ScreenEdit) =>                                     SongPosition
  GetEditState:           (this: ScreenEdit) =>                                     EditState
  GetSound:               (this: ScreenEdit) =>                                     RageSound
  IsStepTiming:           (this: ScreenEdit) =>                                     boolean
  SaveChart:              (this: ScreenEdit) =>                                     void
  SetBPM:                 (this: ScreenEdit, beat: number, value: number) =>        void
  SetCurrentBeat:         (this: ScreenEdit, fBeat: number, timing: TimingData) =>  void
  SetCurrentMusicSeconds: (this: ScreenEdit, fSeconds: number) =>                   void
  SetDelay:               (this: ScreenEdit, beat: number, value: number) =>        void
  SetHighlightSelection:  (this: ScreenEdit, startBeat: number, endBeat: number) => void
  SetLabel:               (this: ScreenEdit, beat: number, value: number) =>        void
  SetScroll:              (this: ScreenEdit, beat: number, percent: number) =>      void
  SetSnapMode:            (this: ScreenEdit, newType: NoteType) =>                  void
  SetStop:                (this: ScreenEdit, beat: number, value: number) =>        void
  SetTickCount:           (this: ScreenEdit, beat: number, value: number) =>        void
  SetWarp:                (this: ScreenEdit, beat: number, value: number) =>        void
}

declare const ScreenEdit: ScreenEdit