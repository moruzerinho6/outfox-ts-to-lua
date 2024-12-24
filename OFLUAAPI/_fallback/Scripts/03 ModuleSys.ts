declare const LoadModule: <T = null>(ModuleName: string, ...args: any[]) => ((...args: any[]) => T extends null ? any : T) & AnyTable
declare const GetModule: (ModuleName: string) => any
declare const CheckIfUserOrMachineProfile: (pn: string) => string
declare const fornumrange: (s: any, e: any, it: any) => AnyTable