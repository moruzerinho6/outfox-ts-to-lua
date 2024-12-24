declare interface TimingData {
  GetActualBPM: () => number[]
  GetBeatFromElapsedTime: (fElapsedTime: number) => number
  GetBPMAtBeat: (fBeat: number) => number[]
  GetBPMs: () => number[]
  GetBPMsAndTimes: (useTable?: boolean) => number[][]
  GetElapsedTimeFromBeat: (fBeat: number) => number
  GetStops: (useTable?: boolean) => number[][]
  GetDelays: (useTable?: boolean) => number[][]
  GetLabels: (useTable?: boolean) => number[][]
  GetWarps: (useTable?: boolean) => number[][]
  GetCombos: (useTable?: boolean) => number[][]
  GetTimeSignatures: (useTable?: boolean) => number[][]
  GetTickcounts: (useTable?: boolean) => number[][]
  GetFakes: (useTable?: boolean) => number[][]
  GetScrolls: (useTable?: boolean) => number[][]
  GetXScrolls: (useTable?: boolean) => number[][]
  GetSpeeds: (useTable?: boolean) => number[][]
  HasBPMChanges: () => boolean
  HasDelays: () => boolean
  HasNegativeBPMs: () => boolean
  HasStops: () => boolean
  HasWarps: () => boolean
  HasFakes: () => boolean
  HasSpeedChanges: () => boolean
  HasScrollChanges: () => boolean
  HasXScrollChanges: () => boolean
  IsJudgableAtBeat: (fBeat: number) => boolean
}

declare var TimingData: TimingData