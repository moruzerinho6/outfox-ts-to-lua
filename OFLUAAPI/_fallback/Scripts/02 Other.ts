declare const SSC = true

declare const LoadFallbackB:                  () => any
declare const FormatNumSongsPlayed:           (num: number) => string
declare const JudgmentTransformCommand:       (self: any, params: any) => void
declare const JudgmentTransformSharedCommand: (self: any, params: any) => void
declare const GetEditModeSubScreens:          () => string
declare const GetCoursesToShowRanking:        () => string

declare interface ScreenFallback {
  Metric: (this: Screen, sName: string) => string | number
  String: (this: Screen, sName: string) => string
}

declare const ScreenMetric: string | number
declare const ScreenString: string
declare const TextBannerAfterSet: (self: any, param: any) => void

declare interface Song {
  GetStageCost: (this: Song) => number
}

declare const OptionsNavigationMode: () => string