declare const ReadPrefFromFile: (name: string) => string | null
declare const WritePrefToFile: (name: string, value: any) => boolean
declare const GetUserPref: (name: string) => any
declare const SetUserPref: (name: string, value: any) => any
declare const GetUserPrefB: (name: string) => boolean
declare const GetUserPrefC: (name: string) => RageColor
declare const GetUserPrefN: (name: string) => number