declare const ThemePrefsRows: {
  IsInitted: false,
  Init: (prefs: AnyTable) => void
  GetRow: (pref: string) => any
}

declare const ThemePrefRow: typeof ThemePrefsRows.GetRow
