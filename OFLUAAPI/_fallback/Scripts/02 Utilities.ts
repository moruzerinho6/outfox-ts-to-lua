declare const FindValue: (tab: AnyTable, value: string) => string | null
declare const FindSelection: (list: AnyTable) => number | null
declare const TableStringLookup: (t: AnyTable, group: string) => AnyTable
declare const wrap: (val: number, n: number) => number
declare const fapproach: (val: any, other_val: any, to_move: any) => any
declare const tableshuffle: (t: AnyTable) => AnyTable
declare const tableslice: (t: AnyTable, num?: number) => AnyTable

declare namespace table {
  const sum: (t: AnyTable) => number
  const average: (t: AnyTable) => number
  const deviation: (t: AnyTable) => number
  const search: (t: AnyTable, sFind: string) => boolean
  const find: (t: AnyTable, sFind: string) => any
  const itemcount: (t: AnyTable) => number
  const round: (num: number, pre: number) => number
}

declare namespace math {
  const gcd: (a: number, b: number) => number
}

declare const round: (val: number, decimal: number) => number
declare const GetRandomSongBackground: () => string
declare const GetSongBackground: () => string
declare const StepsOrTrailCustomDifficulty: (stepsOrTrail: AnyTable) => AnyTable
declare const IsArcade: () => boolean
declare const IsHome: () => boolean
declare const IsFreePlay: () => boolean
declare const IsCourse: () => boolean
declare const ArgsIfPlayerJoinedOrNil: (arg1: any, arg2: any) => any
declare const Center1Player: () => boolean
declare const IsRoutine: () => boolean
declare const Time: {
  Now: () => string
}
declare const File: {
  Write: (path: string, buf: any) => boolean
  Read: (path: string) => string | null
}
declare const setenv: (name: string, value: any) => void
declare const getenv: (name: string) => any
declare const tobool: (v: any) => boolean
declare const GetPlayerOrMachineProfile: (pn: string) => AnyTable
declare const pname: (pn: string) => string

declare interface ThemeManagerFallback {
  GetAbsolutePath: (this: ThemeManager, sPath: string) => string
}

declare const AspectRatios: {
  OneOne: 1.0
  ThreeFour: 0.75
  FourThree: 1.33333
  FiveFour: 1.25
  ThreeTwo: 1.5
  SixteenTen: 1.6
  SyxteenNine: 1.77778
  TwentyOneNine: 2.37
  EightThree: 2.66666
  ThirtyTwoNine: 3.55555
}

declare const WideScale: (AR4_3: number, AR16: number) => number
declare const IsUsingWideScreen: () => boolean
declare const IsUsingPortrait: () => boolean
declare const rec_print_children: (parent: any, indent: any) => void
declare const rec_print_table: (t: AnyTable, indent?: any) => void
declare const rec_count_children: (parent: any) => number
declare const width_clip_text: (text: string, limit: number) => void
declare const width_clip_limit_text: (text: string, limit: number, natural_zoom: number) => void
declare const convert_text_to_indented_lines: (text: string, indent: any, width: number, text_zoom: number) => AnyTable