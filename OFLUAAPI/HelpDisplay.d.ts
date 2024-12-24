import type { Actor } from "./Actor"

interface SetHelpTextParams {
  Text: string
}

interface HelpDisplayProperties {
  Font?: string
  File?: string
  Text?: string
  Name?: string
  InitCommand?: (self: HelpDisplay) => unknown
  OnCommand?: (self: HelpDisplay) => unknown
  BeginCommand?: (self: HelpDisplay) => unknown
  SetHelpTextCommand?: (self: HelpDisplay, params: SetHelpTextParams) => unknown
  gettips: () => LuaMultiReturn<[string[], string[]]>
  setfromsongorcourse: () => HelpDisplay
  SetSecsBetweenSwitches: (fSeconds: number) => HelpDisplay
  settips: (tips: string[], altTips: string[]) => HelpDisplay
  SetTipsColonSeparated: (sTips: string) => HelpDisplay
}

interface IndexableActor {
  [key: string]: (self: HelpDisplay) => unknown
}

export type HelpDisplay = HelpDisplayProperties & IndexableActor & Actor