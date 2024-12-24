import type { Actor } from "./Actor";
import type { ActorFrame } from "./ActorFrame";
import type { ActorMultiVertex } from "./ActorMultiVertex";
import type { ActorProxy } from "./ActorProxy";
import type { ActorSound } from "./ActorSound";
import type { Banner } from "./Banner";
import type { BitmapText } from "./BitmapText";
import type { HelpDisplay } from "./HelpDisplay";
import type { Model } from "./Model";
import type { Quad } from "./Quad";
import type { Sprite } from "./Sprite";

interface DefProperties {
  Actor: Actor
  ActorProxy: ActorProxy
  Sprite: Sprite
  Model: Model
  BitmapText: BitmapText
  HelpDisplay: HelpDisplay
  ActorFrame: ActorFrame
  Text: unknown
  Quad: Quad
  Sound: ActorSound
  Banner: Banner
  ActorFrameTexture: unknown
  ActorMultiVertex: ActorMultiVertex
  PercentageDisplay: unknown
}

interface THEMEProperties {
  DoesLanguageExist: (langName: string) => boolean
  DoesThemeExist: (themeName: string) => boolean
  GetCurLanguage: () => string
  GetCurThemeName: () => string
  GetCurrentThemeDirectory: () => string
  GetMetric: (ClassName: string, Element: string) => any
  GetMetricNamesInGroup: () => unknown
  GetNumSelectableThemes: () => number
  GetPathB: (ClassName: string, Element: string) => string
  GetPathF: (ClassName: string, Element: string) => string
  GetPathG: (ClassName: string, Element: string) => string
  GetPathInfoB: (ClassName: string, Element: string) => unknown
  GetPathO: (ClassName: string, Element: string) => string
  GetPathS: (ClassName: string, Element: string) => string
  GetSelectableThemeNames: () => unknown
  GetString: (str1: string, str2: string) => string
  GetStringNamesInGroup: () => string
  GetThemeAuthor: () => string
  GetThemeDisplayName: () => string
  GetLanguages: () => string
  GetLanguagesCodes: () => string
  HasMetric: (section: any, value: any) => boolean
  HasString: (section: string, value: string) => boolean
  IsThemeSelectable: (theme: string) => boolean
  ReloadMetrics: () => void
  RunLuaScripts: (sMask: string) => void
  UpdateThemeLanguage: () => void
  SetTheme: (theme: string) => void
  get_theme_fallback_list: () => string[]
}

interface THEMEFallbackProps {
  NoStroke: () => void
  PixelFont: () => BitmapText
}

interface RageColorProperties {}

interface luaProperties {
  CheckType: (sType: string, v: any) => boolean
  Flush: () => void
  GetThreadVariable: (s: any) => string
  ReadFile: (sPath: string) => string
  ReportScriptError: (str: string) => void
  RunWithThreadedVariables: (func: any, t: LuaTable, ...args: unknown[]) => unknown
  Trace: (sString: string) => void
  Warn: (sString: string) => void
}

export type Def = DefProperties
export type THEME = THEMEFallbackProps & THEMEProperties
export type RageColor = RageColorProperties
export type color = (str: string) => RageColor
export enum Color {
  Black = 0,
	White		=	1,
	Red			=	2,
	Blue		=	3,
	Green		=	4,
	Yellow		=	5,
	Orange		=	6,
	Purple		=	7,
	Outline		=	8,
	Invisible	=	9,
	Stealth		=	10,
	HoloBlue		= 11,
	HoloDarkBlue	= 12,
	HoloPurple		= 13,
	HoloDarkPurple	= 14,
	HoloGreen		= 15,
	HoloDarkGreen	= 16,
	HoloOrange		= 17,
	HoloDarkOrange	= 18,
	HoloRed			= 19,
	HoloDarkRed		= 20,
  Alpha = 21
}

export type lua = luaProperties