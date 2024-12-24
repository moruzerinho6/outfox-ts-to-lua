// import type { BlendMode, ColorType, CullMode, DrainType, DrawMode, FailType, LifeType, ModSplineAxis, ModSplineType, ModTimerType, TapNoteScore } from "./enums"
// import type { RageColor } from "./init"
// import type { Course } from "./Course"
// import type { Trail } from "./Trail"
// import type { Song } from "./Song"
// import type { Steps } from "./Steps"

declare interface PlayerOptions {
  AllHopos: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  AllTaps: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  Alternate: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AMod (): number
  AMod (value: number): number
  AMod (value: number, approach_speed: number, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  ApproachType: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  AttackMines: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  AttenuateX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AttenuateXOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AttenuateY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AttenuateYOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AttenuateZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AttenuateZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Asymptote: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AsymptoteOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AsymptoteScale: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  AverageScrollBPM(): number
  AverageScrollBPM(value: number): number
  AverageScrollBPM(value: number, approach_speed: number, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  BatteryLives: (num: number, chainCommand?: boolean) => number
  Backwards: (num: number, chainCommand?: boolean) => number
  Beat: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatMult: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatMultCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatYMult: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatYOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatYPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatYMultCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatYOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatYPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZMult: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZMultCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BeatZPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Big: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  Blink: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BlinkColor: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Blind: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BMRize: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  Boomerang: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Boost: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BoostCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Bounce: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BouncePeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BounceOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BounceZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BounceZPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BounceZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Brake: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BrakeCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Bumpy: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpuOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpuOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpuPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpuPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyXCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyXOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyXOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyXPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyXPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyYOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyYOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyYPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  BumpyYPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CAMod (): number
  CAMod (value: number): number
  CAMod (value: number, approach_speed: number, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  Centered: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CenteredPath: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CenteredPathCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CMod (): number
  CMod (value: number): number
  CMod (value: number, approach_speed: number, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  Confusion: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionOffsetn: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionXOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionXOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionXOffsetn: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionYOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionYOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ConfusionYOffsetn: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CAverageScrollBPM: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CosClip: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Cosecant: (value: number, chainCommand?: boolean) => number | PlayerOptions
  Cover: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Cross: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicXOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicXOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicYOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicYOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  CubicZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Dark: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DarkCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Darkn: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DiffuseGradientColor: (column: number, point: number, red: number, green: number, blue: number, alpha: number, chainCommand?: boolean) => RageColor | PlayerOptions
  DiffuseGradientPoint: (column: number, point: number, position: number, chainCommand?: boolean) => number | PlayerOptions
  DiffuseNumGradientPoints: (column: number, iNumPoints: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Digital: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DigitalOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DigitalPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DigitalSteps: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DigitalZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DigitalZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DisibleMines: (value: number, chainCommand?: boolean) => boolean | PlayerOptions
  Dizzy: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DizzyCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DizzyHolds: (value: number, chainCommand?: boolean) => boolean | PlayerOptions
  Distant: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrainSetting(): DrainType
  DrainSetting(type: DrainType): DrainType
  DrainSetting(type: DrainType, chainCommand?: boolean): DrainType
  DrawSize: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrawSizeBack: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Drunk: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkSpacing: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkSpeed: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkSpacingCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkSpeedCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYSpacing: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYSpeed: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYSpacingCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkYSpeedCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZSpacing: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZSpeed: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZSpacingCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  DrunkZSpeedCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Echo: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  Expand: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ExpandPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ExpandHolds: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ExtendHoldsCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  FailSetting (): FailType
  FailSetting (FailType: FailType): FailType
  FailSetting (FailType: FailType, chainCommand?: boolean): FailType
  Flip: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Floored: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  FromString: (mods: string) => PlayerOptions
  GetString: () => string
  GetReversePercentForColumn: (iCol: number) => number | undefined
  GetStepAttacks: (c: Course, t: Trail) => number
  IsEasierForCourseAndTrail: (so: Song, st: Steps, chainCommand?: boolean) => boolean | PlayerOptions
  IsEasierForSongAndSteps: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  Hallway: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Hidden: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  HiddenColor: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  HiddenOffset: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  HiddenOffsetColor: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  HideHoldJudgments: (column: number, value: number, chainCommand?: boolean) => boolean | PlayerOptions
  HideNoteFlashCol: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  HoldGrainMult: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  HoldLifts: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  HoldRolls: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  TapsToHopos: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  HoposToTaps: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  HoldTinyXCol: (mode: CullMode, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  HoldCullMode: (mode: CullMode, chainCommand?: boolean) => CullMode
  NoteCullMode: (value: number, approach_speed: number, chainCommand?: boolean) => CullMode
  Incoming: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Invert: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  JudgeScale: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Left: (type: LifeType, chainCommand?: boolean) => boolean | PlayerOptions
  LifeSetting (): LifeType
  LifeSetting (type: LifeType): LifeType
  LifeSetting (type: LifeType, chainCommand?: boolean): LifeType
  Little: (sNoteSkinName: string, chainCommand?: boolean) => boolean | PlayerOptions
  LoadNoteSkin: (type: ModTimerType, chainCommand?: boolean) => string
  ModTimerSettings: (value: number, approach_speed: number, chainCommand?: boolean) => ModTimerType
  ModTimerMult: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ModTimerOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  MaxScrollBPM (): number
  MaxScrollBPM (value: boolean): number
  MaxScrollBPM (value: boolean, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  Mines: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  Mini: (tns: TapNoteScore, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  MinTNSToHideNotes: (value: boolean, chainCommand?: boolean) => TapNoteScore
  Mirror: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  MMod (): number
  MMod (axis: ModSplineAxis): number
  MMod (axis: ModSplineAxis, column: number, point: number, value: number, position: number, approach_speed: number, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  ModSpline: (axis: ModSplineAxis, column: number, chainCommand?: boolean) => LuaMultiReturn<[number, number, number]>
  ModSplineReset: (axis: ModSplineAxis, enable: boolean, chainCommand?: boolean) => unknown
  ModSplineEnable: (axis: ModSplineAxis, type: ModSplineType, chainCommand?: boolean) => boolean | PlayerOptions
  ModSplineTypeSettings: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  MoveXCol: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  MoveXn: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  MoveYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  MoveYn: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  MoveZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  MoveZn: (value: boolean, chainCOmmand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  MuteOnError: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  NoAttack: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoFakes: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoHopos: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoTaps: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoHolds: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoJumps: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoHands: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoLifts: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoQuads: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoStretch: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoMines: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoRolls: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NotePath: (mode: BlendMode, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NotePathBlendMode: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => BlendMode
  NotePathCol: (mode: DrawMode, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NotePathDrawMode: (value: number, approach_speed: number, chainCommand?: boolean) => DrawMode
  NotepathDrawSize: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NotePathDrawSizeBack: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NotePathGrainMult: (column: number, point: number, green: number, blue: number, alpha: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NotePathGradientColor: (column: number, point: number, position: number, chaimCommand?: boolean) => RageColor | PlayerOptions
  NotePathGradientPoint: (column: number, iNumPoints: number, chainCommand?: boolean) => number | PlayerOptions
  NotePathNumGradientPoints: (value: number, approach_speed: number, chainCommand?: boolean) => number
  NotePathWidth: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NotePathWidthCol: (col: number, name: string, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoteSkin(): string
  NoteSkin(name: string): string
  NoteSkin<T = undefined>(name: string, chainCommand?: boolean): T extends true ? LuaMultiReturn<[string, boolean]> : string
  NoteSkinCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => string
  NoteSkewX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoteSkewXCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoteSkewY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  NoteSkewYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Orient: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  OrientCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  OrientX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  OrientXCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  OrientY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  OrientYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Overhead: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaXOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaXCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaXOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaYOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ParabolaZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Passmark: (value: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Planted: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  PlayerAutoPlay: (preserve: boolean, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  PreserveModSplines: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  PulseInner: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  PulseOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  PulseOuter: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  PulsePeriod: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Quick: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  RandAttack: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  RandomSpeed: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  RandomVanish: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Randomize: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  RandomizeOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Vanish: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  VanishSize: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  VanishOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Reverse: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ReverseCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Reversen: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Right: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  Roll: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  RollCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Sawtooth: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SawtoothPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SawtoothCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SawtoothPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SawtoothZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SawtoothZSpeedMultCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SawtoothZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ScrollSpeed: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ScrollSpeedMultCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkMult: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkLinear: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkMultX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkLinearX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkMultY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkLinearY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkMultZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ShrinkLinearZ: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Shuffle: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SinClip: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Skew: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Skippy: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SoftShuffle: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Space: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralXOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralXPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralXOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralXPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralYOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralYPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralYOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralYPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralZPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SpiralZPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Split: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Square: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquarePeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquarePeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareZPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SquareZPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Stealth: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthCol: (column: number, color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthColor: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthGlowColor: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthGlowColorCol: (column: number, color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthGlowGradientColor: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthGlowGradientPoint: (iNumPoints: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthGlowNumGradientPoints: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthHolds: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthHoldsCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthMines: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthMinesCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Stealthn: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthPastReceptors: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StealthType: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Stomp: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StraightHolds: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  StraightHoldsCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Sudden: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SuddenColor: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SuddenOffset: (color: ColorType, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SuddenOffsetColor: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  SuperShuffle: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TanClip: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TimeSpacing (): number
  TimeSpacing (value: number): number
  TimeSpacing (value: number, approach_speed: number, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  TimeSpacingCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Tilt: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Tiny: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Tinyn: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyPull: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  TinyUsesMiniCalc: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyX: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyXCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyY: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyYCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TinyZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Tipsy: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TipsyOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TipsySpacing: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TipsySpeed: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TipsyCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TipsyOffsetCol: (column:number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TipsySpacingCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TipsySpeedCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Tornado: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoZPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TornadoZPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TurnNode: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Twirl: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  TrirlCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Twister: (f: number, chainCommand?: boolean) => boolean | PlayerOptions
  UsingReverse: (value: boolean) => boolean
  UnboundedReverse: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  VariableBoomerang: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  Wave: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  WavePeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  WaveOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  WaveCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  WavePeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  WaveOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  Wide: (value: boolean, chainCommand?: boolean) => boolean | PlayerOptions
  WireFrameCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  WireFrameWidthCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  XMod (): number
  XMod (value: number): number
  XMod (value: number, approach_speed: number, chainCommand?: boolean): LuaMultiReturn<[number | PlayerOptions, number]>
  Xmode: (value: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZBuffer: (value: number, approach_speed: number, chainCommand?: boolean) => boolean | PlayerOptions
  Zigzag: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagZ: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagZOffset: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagZPeriod: (value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagZCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagZOffsetCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
  ZigzagZPeriodCol: (column: number, value: number, approach_speed: number, chainCommand?: boolean) => LuaMultiReturn<[number | PlayerOptions, number]>
}

declare var PlayerOptions : PlayerOptions