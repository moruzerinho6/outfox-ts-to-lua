declare interface ThemeManager {
  DoesLanguageExists:       (this: ThemeManager, langName: string) =>                   boolean
  DoesThemeExists:          (this: ThemeManager, themeName: string) =>                  boolean
  get_theme_fallback_list:  (this: ThemeManager) =>                                     string[]
  GetCurLanguage:           (this: ThemeManager) =>                                     string
  GetCurrentThemeDirectory: (this: ThemeManager) =>                                     string
  GetCurThemeName:          (this: ThemeManager) =>                                     string
  GetLanguages:             (this: ThemeManager) =>                                     string[]
  GetLanguageCodes:        (this: ThemeManager) =>                                     string[]
  GetMetric:                (this: ThemeManager, ClassName: string, Element: string) => any
  GetMetricNamesInGroup:    (this: ThemeManager, ClassName: string) =>                  string[]
  GetNumSelectableThemes:   (this: ThemeManager) =>                                     number
  GetPathB:                 (this: ThemeManager, ClassName: string, Element: string) => string
  GetPathF:                 (this: ThemeManager, ClassName: string, Element: string) => string
  GetPathG:                 (this: ThemeManager, ClassName: string, Element: string) => string
  GetPathInfoB:             (this: ThemeManager, ClassName: string, Element: string) => string
  GetPathO:                 (this: ThemeManager, ClassName: string, Element: string) => string
  GetPathS:                 (this: ThemeManager, ClassName: string, Element: string) => string
  GetSelectableThemeNames:  (this: ThemeManager) =>                                     string[]
  GetString:                (this: ThemeManager, ClassName: string, Element?: string) => string
  GetStringNamesInGroup:    (this: ThemeManager, ClassName: string) =>                  string[]
  GetThemeAuthor:           (this: ThemeManager) =>                                     string
  GetThemeDisplayName:      (this: ThemeManager) =>                                     string
  HasMetric:                (this: ThemeManager, section: string, value: string) =>     boolean
  HasString:                (this: ThemeManager, section: string, value: string) =>     boolean
  IsThemeSelectable:        (this: ThemeManager, theme: string) =>                      boolean
  ReloadMetrics:            (this: ThemeManager) =>                                     void
  RunLuaScripts:            (this: ThemeManager, sMask: string) =>                      void
  SetTheme:                 (this: ThemeManager, theme: string) =>                      void
  UpdateThemeLanguage:      (this: ThemeManager) =>                                     void
}


declare var THEME: ThemeManager & ThemeManagerFallback
declare var ThemeManager: typeof THEME