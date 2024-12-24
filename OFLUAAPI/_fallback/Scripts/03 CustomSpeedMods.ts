declare const LoadProfileCustom: (profile: string, dir: string) => void
declare const SaveProfileCustom: (profile: string, dir: string) => void
declare const SpeedMods: {
  Name: 'Speed',
  LayoutType: 'ShowAllInRow'
  SelectType: 'SelectOne'
  OneChoiceForAllPlayers: false
  ExportOnChange: false
  Choices: string[]
  LoadSelections: (self: any, list: AnyTable, pn: string) => void
  SaveSelections: (self: any, list: AnyTable, pn: string) => void
}
declare const SpeedModIncSize: {
  Name: 'Speed Increment',
  LayoutType: 'ShowAllInRow'
  SelectType: 'SelectMultiple'
  OneChoiceForAllPlayers: true
  LoadSelections: (self: any, list: AnyTable, pn: string) => void
  SaveSelections: (self: any, list: AnyTable, pn: string) => void
  NotifyOfSelection: (self: any, list: AnyTable, pn: string) => boolean
  GenChoices: (self: any) => AnyTable
}

declare const SpeedModIncLarge: () => {
  Name: 'Speed Increment Large',
  LayoutType: 'ShowAllInRow'
  SelectType: 'SelectMultiple'
  OneChoiceForAllPlayers: true
  LoadSelections: (self: any, list: AnyTable, pn: string) => void
  SaveSelections: (self: any, list: AnyTable, pn: string) => void
  NotifyOfSelection: (self: any, list: AnyTable, pn: string) => boolean
  GenChoices: (self: any) => AnyTable
}

declare const GetSpeedModeAndValueFromPoptions: (pn: string) => LuaMultiReturn<[number, string]>

declare const ArbitrarySpeedMods: () => AnyTable // I'm a bit lazy rn