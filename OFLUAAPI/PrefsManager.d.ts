declare interface PrefsManager {
  Get:                    (this: PrefsManager, sPreference: string, defaultVal?: any) => any
  GetPreference:          (this: PrefsManager, sPreference: string) => any
  PreferenceExists:       (this: PrefsManager, sPreference: string) => boolean
  SavePreferences:        (this: PrefsManager) => void
  Set:                    (this: PrefsManager, sPreference: string, value: any) => void
  SetPreference:          (this: PrefsManager, sPreference: string, value: any) => void
  SetPreferenceToDefault: (this: PrefsManager, sPreference: string) => void
  Load:                   (this: PrefsManager, arg1: any) => void // TODO : Not documented on lua.xml
  SaveToFile:             (this: PrefsManager) => void // TODO: Not documented on lua.xml
}

declare const PREFSMAN: PrefsManager
declare const PrefsManager: PrefsManager