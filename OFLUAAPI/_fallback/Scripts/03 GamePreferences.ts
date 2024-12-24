declare const ReadGamePrefFromFile: (name: string) => string | null
declare const WriteGamePrefToFile: (name: string, value: any) => boolean
declare const GetGamePref: (name: string) => string | number
declare const SetGamePref: (name: string, value: any) => boolean
declare const GetGamePrefB: (name: string) => boolean
declare const GetGamePrefC: (name: string) => RageColor
declare const GetGamePrefN: (name: string) => number