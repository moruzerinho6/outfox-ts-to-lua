declare const PrintTable: (tbl: AnyTable) => void
declare const ThemePrefs: {
  NeedsSaved: false
  Init: (prefs: AnyTable, bLoadFromDisk: boolean) => false | void
  Load: () => boolean
  Save: () => void
  ForceSave: () => boolean
  Get: (name: string) => null
  Set: (name: string, value: any) => void
  CopyPrefsFrom: (name: string) => void
  InitAll: (prefs: AnyTable) => void // Is actually on 02 ThemePrefsRows.lua
}
declare const GetThemePref: typeof ThemePrefs.Get
declare const SetThemePref: typeof ThemePrefs.Set

declare const InitUserPrefs: () => void