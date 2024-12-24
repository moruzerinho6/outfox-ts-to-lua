declare interface NoteSkinManager {
  DoesNoteSkinExist:      (this: NoteSkinManager, strName: string) => boolean
  GetMetric:              (this: NoteSkinManager, sElement: string, sValue: string) => string
  GetMetricA:             (this: NoteSkinManager, sElement: string, sValue: string) => string // wtf is a ActorCommand
  GetMetricAForNoteskin:  (this: NoteSkinManager, sElement: string, sValue: string, sNoteSkin: string) => string // ^
  GetMetricB:             (this: NoteSkinManager, sElement: string, sValue: string) => boolean
  GetMetricBForNoteSkin:  (this: NoteSkinManager, sElement: string, sValue: string, sNoteSkin: string) => boolean
  GetMetricF:             (this: NoteSkinManager, sElement: string, sValue: string) => number
  GetMetricFForNoteSkin:  (this: NoteSkinManager, sElement: string, sValue: string, sNoteSkin: string) => number
  GetMetricForNoteSkin:   (this: NoteSkinManager, sElement: string, sValue: string, sNoteSkin: string) => string
  GetMetricI:             (this: NoteSkinManager, sElement: string, sValue: string) => number
  GetMetricIForNoteSkin:  (this: NoteSkinManager, sElement: string, sValue: string, sNoteSkin: string) => number
  GetNoteSkinNames:       (this: NoteSkinManager) => string[]
  GetPath:                (this: NoteSkinManager, sButton: string, sElement: string) => string
  GetPathForNoteSkin:     (this: NoteSkinManager, sElement: string, sValue: string, sNoteSkin: string) => string
  LoadActor:              (this: NoteSkinManager, sButton: string, sElement: string, sColor: string, iEffect: number) => Actor
  LoadActorForNoteSkin:   (this: NoteSkinManager, sButton: string, sElement: string, sNoteSkin?: string, sColor?: string, iEffect?: number, iArg?: any, player?: string) => Actor
}

declare const NoteSkinManager: NoteSkinManager
declare const NOTESKIN: NoteSkinManager