
declare const DefMetatable: AnyTable
declare const ResolveRelativePath: (path: string, level: number, optional?: string) => string
declare const LoadActorFunc: (path: string, level: number) => unknown
declare const LoadActor: (path: string, ...args: any[]) => unknown
declare const LoadActorWithParams: (path: string, params: any, ...args: any[]) => unknown
declare const LoadFont: (a: any, b: any) => BitmapText // What the fuck is the code of this function
declare const WrapInActorFrame: (t: AnyTable) => typeof ActorFrame | Actor
declare const StandardDecorationFromTable: (MetricsName: string, t: AnyTable) => AnyTable
declare const StandardDecorationFromFile: (MetricsName: string, FileName: string) => AnyTable
declare const StandardDecorationFromFileOptional: (MetricsName: string, FileName: string) => AnyTable
declare const ShowStandardDecoration: (MetricsName: string) => boolean
declare const NullActor: {
  Class: 'Actor'
  _Source: '(null actor)'
}