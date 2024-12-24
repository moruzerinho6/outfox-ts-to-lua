declare interface RadarValues {
  GetValue: (rc: RadarCategory) => number
}

declare interface Steps {
  GenerateDensityDataForSteps:  (this: Steps) =>                                        number[]
  GenerateStreamMeasures:       (this: Steps, iMinNotes?: number) =>                    number[]
  GetAuthorCredit:              (this: Steps) =>                                        string
  GetBannerFile:                (this: Steps) =>                                        string
  GetChartLength:               (this: Steps) =>                                        string
  GetChartName:                 (this: Steps) =>                                        string
  GetChartStyle:                (this: Steps) =>                                        string
  GetDescription:               (this: Steps) =>                                        string
  GetDifficulty:                (this: Steps) =>                                        Difficulty
  GetDisplayBpms:               (this: Steps) =>                                        number[]
  GetDisplayBPMType:            (this: Steps) =>                                        DisplayBPM
  GetFilename:                  (this: Steps) =>                                        string
  GetGeneralDensityData:        (this: Steps, iMinNotes: number) =>                     number[][]
  GetHash:                      (this: Steps) =>                                        number
  GetMaxNPS:                    (this: Steps) =>                                        number
  GetMeter:                     (this: Steps) =>                                        number
  GetNoteData:                  (this: Steps, fStartBeat: number, fEndBeat: number) =>  number[][]
  GetNumDensityMeasures:        (this: Steps) =>                                        number
  HasAttacks:                   (this: Steps) =>                                        boolean
  HasSignificantTimingChanges:  (this: Steps) =>                                        boolean
  GetRadarValues:               (this: Steps, pn: PlayerNumber) =>                      RadarValues
  GetStepsType:                 (this: Steps) =>                                        StepsType
  GetTimingData:                (this: Steps) =>                                        TimingData
  IsAnEdit:                     (this: Steps) =>                                        boolean
  IsAPlayerEdit:                (this: Steps) =>                                        boolean
  IsAutogen:                    (this: Steps) =>                                        boolean
  IsDisplayBpmConstant:         (this: Steps) =>                                        boolean
  IsDisplayBpmRandom:           (this: Steps) =>                                        boolean
  IsDisplayBpmSecret:           (this: Steps) =>                                        boolean
  PredictMeter:                 (this: Steps) =>                                        number
  GetChartKey:                  (this: Steps) =>                                        string
}

declare const Steps : Steps
declare const RadarValues : RadarValues