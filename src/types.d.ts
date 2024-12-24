/// <reference types="lua-types/5.3" />
/// <reference types="@typescript-to-lua/language-extensions" />

declare const IsNetConnected: () => boolean
declare const IsNetSMOnline: () => boolean
declare const FormatNumberAndSuffix: (num: number) => string
declare const FormatPercentScore: (score: string | number) => string
declare const ProductFamily: () => string
declare const ProductVersion: () => string
declare const VersionDate: () => string
declare const VersionTime: () => string
declare const GetScreenAspectRatio: () => number
declare const GetCustomDifficulty: (st: StepsType, d: Difficulty, ct: CourseType) => string
declare const clamp: (fValue: number, fLow: number, fHigh: number) => number
declare const scale: (x: number, low1: number, high1: number, low2: number, high2: number) => number
declare const ToUpper: (s: string) => string
declare const Second: () => number
declare const SecondsToHHMMSS: (fSecs: number) => string
declare const SecondsToMMSS: (fSecs: number) => string
declare const SecondsToMMSSMsMs: (fSecs: number) => string
declare const SecondsToMMSSMsMsS: (fSecs: number) => string
declare const SecondsToMSS: (fSecs: number) => string
declare const SecondsToMSSMsMs: (fSecs: number) => string
declare const GetTimeSinceStart: () => number
declare const ToLower: (s: string) => string

// Other modules
declare const rin_inspect: (arg1: any) => any

declare const Def: AnyTable;
declare const SCREEN_TOP = 0
declare const SCREEN_WIDTH = 854
declare const SCREEN_HEIGHT = 720
declare const SCREEN_CENTER_Y = 240
declare const SCREEN_CENTER_X = 427
declare const SCREEN_BOTTOM = 480
declare const SCREEN_RIGHT = 854

declare namespace ActorUtil {
  const GetFileType: (sPath: string) => string
  const IsRegisteredClass: (sClassName: string) => boolean
  const LoadAllCommands: (a: Actor, sMetricsGroup: string) => void
  const LoadAllCommandsAndSetXY: (a: Actor) => void
  const LoadAllCommandsFromName: (a: Actor, sMetricsGroup: string, sName: string) => void
  const ResolvePath: (sPath: string, iLevel: number, optional: boolean) => string
}

declare namespace lua {
  const CheckType: (sType: string, v: any) => boolean
  const Flush: () => void
  const GetThreadVariable: (s: string) => any
  const ReadFile: (sPath: string) => string
  const ReportScriptError: (error: string, error_type?: string) => void
  const RunWithThreadVariables: (func: Function, t: AnyTable, ...args: any[]) => any
  const Trace: (sString: string) => void
  const Warn: (sString: string) => void
}

declare namespace string {
  function sub(arg1: string | number, arg2: string | number): string
  function find(arg1: string): string
}

declare namespace RageFileUtil {
  const CreateRageFile: () => RageFile
}