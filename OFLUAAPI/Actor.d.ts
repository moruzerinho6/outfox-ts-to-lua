// import type { ActorFrame } from "./ActorFrame"
// import type { EditState, BlendMode, VertAlign, ZTestMode, TweenType, PolygonMode, PlayerNumber, HorizAlign, CullMode } from "./enums"
// import type { RageColor } from "./init"

interface EditorUpdateParams {
  Taps: number
  Jumps: number
  Hands: number
  Mines: number
  Rolls: number
  Lifts: number
  Fakes: number
}

interface EditorStateChangedMessageParams {
  EditState: EditState
}

declare interface Actor<T = any> extends ActorFallback<T>, AMappedActorManyNotDeclareMethodsOrProperties, LuaTable {
  Condition?:                                                                                                                                                      boolean;
  Name?:                                                                                                                                                           string;
  InitCommand?:                       (this: Actor<T>) =>                                                                                                          unknown
  OnCommand?:                         (this: Actor<T>) =>                                                                                                          unknown
  BeginCommand?:                      (this: Actor<T>) =>                                                                                                          unknown
  EditorStateChangedMessageCommand?:  (this: Actor<T>, params: EditorStateChangedMessageParams) =>                                                                 unknown
  EditorUpdateCommand?:               (this: Actor<T>, params: EditorUpdateParams) =>                                                                              unknown
  AddWrapperState:                    (this: Actor<T>) =>                                                                                                          ActorFrame
  GetNumWrapperStates:                (this: Actor<T>) =>                                                                                                          number
  GetWrapperState:                    (this: Actor<T>, cls: any, i?: number) =>                                                                                    any
  RemoveWrapperState:                 (this: Actor<T>, i: number) =>                                                                                               T | Actor<T>
  GetChild:                           <G = undefined>(this: Actor<T>, sName: string | number) =>                                                                   G extends undefined ? Actor<T> : G
  GetParent:                          <G = undefined>(this: Actor<T>) =>                                                                                           G extends undefined ? Actor<T> : G
  GetFakeParent:                      (this: Actor<T>) =>                                                                                                          T | Actor<T>
  SetFakeParent:                      (this: Actor<T>, p: Actor) =>                                                                                                void
  GetVisible:                         (this: Actor<T>) =>                                                                                                          boolean
  GetX:                               (this: Actor<T>) =>                                                                                                          number
  GetY:                               (this: Actor<T>) =>                                                                                                          number
  GetZ:                               (this: Actor<T>) =>                                                                                                          number
  GetAbsoluteX:                       (this: Actor<T>) =>                                                                                                          number
  GetAbsoluteY:                       (this: Actor<T>) =>                                                                                                          number
  GetDestX:                           (this: Actor<T>) =>                                                                                                          number
  GetDestY:                           (this: Actor<T>) =>                                                                                                          number
  GetDestZ:                           (this: Actor<T>) =>                                                                                                          number
  GetAbsoluteDestX:                   (this: Actor<T>) =>                                                                                                          number
  GetAbsoluteDestY:                   (this: Actor<T>) =>                                                                                                          number
  GetZoom:                            (this: Actor<T>, bGetCurrent?: boolean) =>                                                                                    number
  GetZoomX:                           (this: Actor<T>, bGetCurrent?: boolean) =>                                                                                    number
  GetZoomY:                           (this: Actor<T>, bGetCurrent?: boolean) =>                                                                                    number
  GetZoomZ:                           (this: Actor<T>, bGetCurrent?: boolean) =>                                                                                    number
  SetTextureFiltering:                (this: Actor<T>, b: boolean) =>                                                                                              T | Actor<T>
  accelerate:                         (this: Actor<T>, fRate: number) =>                                                                                           T | Actor<T>
  addaux:                             (this: Actor<T>, fAux: number) =>                                                                                            T | Actor<T>
  addcommand:                         (this: Actor<T>, sName: string, cmd: (...params: unknown[]) => unknown) =>                                                   void
  addrotationx:                       (this: Actor<T>, rot: number) =>                                                                                             T | Actor<T>
  addrotationy:                       (this: Actor<T>, rot: number) =>                                                                                             T | Actor<T>
  addrotationz:                       (this: Actor<T>, rot: number) =>                                                                                             T | Actor<T>
  addx:                               (this: Actor<T>, xPos: number) =>                                                                                            T | Actor<T>
  addy:                               (this: Actor<T>, yPos: number) =>                                                                                            T | Actor<T>
  addz:                               (this: Actor<T>, zPos: number) =>                                                                                            T | Actor<T>
  animate:                            (this: Actor<T>, b: boolean | number) =>                                                                                              T | Actor<T>
  aux:                                (this: Actor<T>, fAux: number) =>                                                                                            T | Actor<T>
  backfacecull:                       (this: Actor<T>, b: boolean) =>                                                                                              T | Actor<T>
  basealpha:                          (this: Actor<T>, fAlpha: number) =>                                                                                          T | Actor<T>
  baserotationx:                      (this: Actor<T>, rot: number) =>                                                                                             T | Actor<T>
  baserotationy:                      (this: Actor<T>, rot: number) =>                                                                                             T | Actor<T>
  baserotationz:                      (this: Actor<T>, rot: number) =>                                                                                             T | Actor<T>
  basezoom:                           (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  basezoomx:                          (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  basezoomy:                          (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  basezoomz:                          (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  blend:                              (this: Actor<T>, mode: BlendMode) =>                                                                                         T | Actor<T>
  bob:                                (this: Actor<T>) =>                                                                                                          T | Actor<T>
  bounce:                             (this: Actor<T>) =>                                                                                                          T | Actor<T>
  bouncebegin:                        (this: Actor<T>, time: number) =>                                                                                            T | Actor<T>
  bounceend:                          (this: Actor<T>, time: number) =>                                                                                            T | Actor<T>
  clearzbuffer:                       (this: Actor<T>, bClear: boolean) =>                                                                                         T | Actor<T>
  crop:                               (this: Actor<T>, left: number, top: number, right: number, bottom: number) =>                                                T | Actor<T>
  cropbottom:                         (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  cropleft:                           (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  cropright:                          (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  croptop:                            (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  cullmode:                           (this: Actor<T>, mode: CullMode) =>                                                                                          T | Actor<T>
  decelerate:                         (this: Actor<T>, fRate: number) =>                                                                                           T | Actor<T>
  diffuse:                            (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffusealpha:                       (this: Actor<T>, fAlpha: number) =>                                                                                          T | Actor<T>
  diffuseblink:                       (this: Actor<T>, ) =>                                                                                                        T | Actor<T>
  diffusebottomedge:                  (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffusecolor:                       (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffuseleftedge:                    (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffuselowerleft:                   (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffuselowerright:                  (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffuseramp:                        (this: Actor<T>, ) =>                                                                                                        T | Actor<T>
  diffuserightedge:                   (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffuseshift:                       (this: Actor<T>, ) =>                                                                                                        T | Actor<T>
  diffusetopedge:                     (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffuseupperleft:                   (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  diffuseupperight:                   (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  Draw:                               (this: Actor<T>, ) =>                                                                                                        T | Actor<T>
  easeinsine:                         (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutsine:                        (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinsine:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutsine:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinquad:                         (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutquad:                        (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutquad:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinquad:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeincubic:                        (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutcubic:                       (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutcubic:                     (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutincubic:                     (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinquart:                        (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutquart:                       (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutquart:                     (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinquart:                     (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinquint:                        (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutquint:                       (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutquint:                     (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinquint:                     (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinexpo:                         (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutexpo:                        (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutexpo:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinexpo:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinback:                         (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutback:                        (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutback:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinback:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinbackex:                       (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutbackex:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutbackex:                    (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinbackex:                    (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeincircle:                       (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutcircle:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutcircle:                    (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutincircle:                    (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinelastic:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutelastic:                     (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutelastic:                   (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinelastic:                   (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinelasticex:                    (this: Actor<T>, fDuration: number, fAmplitude: number, fPeriod: number) =>                                                  T | Actor<T>
  easeoutelasticex:                   (this: Actor<T>, fDuration: number, fAmplitude: number, fPeriod: number) =>                                                  T | Actor<T>
  easeinoutelasticex:                 (this: Actor<T>, fDuration: number, fAmplitude: number, fPeriod: number) =>                                                  T | Actor<T>
  easeoutinelasticex:                 (this: Actor<T>, fDuration: number, fAmplitude: number, fPeriod: number) =>                                                  T | Actor<T>
  easeinbounce:                       (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutbounce:                      (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeinoutbounce:                    (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  easeoutinbounce:                    (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  effectclock:                        (this: Actor<T>, s: string) =>                                                                                               T | Actor<T>
  effectcolor1:                       (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  effectcolor2:                       (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  effectmagnitude:                    (this: Actor<T>, fX: number, fY: number, fZ: number) =>                                                                      T | Actor<T>
  effectoffset:                       (this: Actor<T>, fTime: number) =>                                                                                           T | Actor<T>
  effectperiod:                       (this: Actor<T>, fTime: number) =>                                                                                           T | Actor<T>
  effecttiming:                       (this: Actor<T>, ramp_to_half: any, hold_at_half: any, ramp_to_full: any, hold_at_zero: any, hold_at_full: any) =>           void
  effect_hold_at_full:                (this: Actor<T>, hold_at_full: number) =>                                                                                    T | Actor<T>
  erasecommand:                       (this: Actor<T>, sCmdName: string) =>                                                                                        T | Actor<T>
  fadebottom:                         (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  fadeleft:                           (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  faderight:                          (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  fadetop:                            (this: Actor<T>, percent: number) =>                                                                                         T | Actor<T>
  finishtweening:                     (this: Actor<T>) =>                                                                                                          T | Actor<T>
  getaux:                             (this: Actor<T>) =>                                                                                                          number
  GetBaseZoomX:                       (this: Actor<T>) =>                                                                                                          number
  GetBaseZoomY:                       (this: Actor<T>) =>                                                                                                          number
  GetBaseZoomZ:                       (this: Actor<T>) =>                                                                                                          number
  GetCommand:                         (this: Actor<T>, sCmdName: string) =>                                                                                        T | Actor<T> | undefined
  GetCropLeft:                        (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetCropTop:                         (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetCropRight:                       (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetCropBottom:                      (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetCroppedWidth:                    (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetCroppedZoomedWidth:              (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetCroppedHeight:                   (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetCroppedZoomedHeight:             (this: Actor<T>, bCurrent: boolean) =>                                                                                       number
  GetDiffuse:                         (this: Actor<T>) =>                                                                                                          RageColor
  GetDiffuseAlpha:                    (this: Actor<T>) =>                                                                                                          number
  GetEffectDelta:                     (this: Actor<T>) =>                                                                                                          number
  GetEffectRotationX:                 (this: Actor<T>) =>                                                                                                          number
  GetEffectRotationY:                 (this: Actor<T>) =>                                                                                                          number
  GetEffectRotationZ:                 (this: Actor<T>) =>                                                                                                          number
  GetEffectX:                         (this: Actor<T>) =>                                                                                                          number
  GetEffectY:                         (this: Actor<T>) =>                                                                                                          number
  GetEffectZ:                         (this: Actor<T>) =>                                                                                                          number
  geteffectmagnitude:                 (this: Actor<T>) =>                                                                                                          LuaMultiReturn<[number, number, number]>
  GetGlow:                            (this: Actor<T>) =>                                                                                                          RageColor
  GetHAlign:                          (this: Actor<T>) =>                                                                                                          number
  GetHoldLength:                      (this: Actor<T>) =>                                                                                                          number
  GetName:                            (this: Actor<T>) =>                                                                                                          string
  GetNumStates:                       (this: Actor<T>) =>                                                                                                          number
  GetHeight:                          (this: Actor<T>) =>                                                                                                          number
  getrotation:                        (this: Actor<T>) =>                                                                                                          LuaMultiReturn<[number, number, number]>
  GetRotationX:                       (this: Actor<T>, bGetCurrent: boolean) =>                                                                                    number
  GetRotationY:                       (this: Actor<T>, bGetCurrent: boolean) =>                                                                                    number
  GetRotationZ:                       (this: Actor<T>, bGetCurrent: boolean) =>                                                                                    number
  GetRotAfterZoom:                    (this: Actor<T>) =>                                                                                                          boolean
  GetSkewAfterZoomRot:                (this: Actor<T>) =>                                                                                                          boolean
  GetSkewX:                           (this: Actor<T>, bGetCurrent: boolean) =>                                                                                    number
  GetSkewY:                           (this: Actor<T>, bGetCurrent: boolean) =>                                                                                    number
  GetMatrixRotOrder:                  (this: Actor<T>) =>                                                                                                          string
  SetMatrixRotOrder:                  (this: Actor<T>, sRotOrder: string) =>                                                                                       T | Actor<T>
  GetSecsIntoEffect:                  (this: Actor<T>) =>                                                                                                          number
  GetTweenTimeLeft:                   (this: Actor<T>) =>                                                                                                          number
  GetVAlign:                          (this: Actor<T>) =>                                                                                                          number
  GetWidth:                           (this: Actor<T>) =>                                                                                                          number
  GetZoomedHeight:                    (this: Actor<T>) =>                                                                                                          number
  GetZoomedWidth:                     (this: Actor<T>) =>                                                                                                          number
  get_tween_uses_effect_delta:        (this: Actor<T>) =>                                                                                                          boolean
  glow:                               (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  glowblink:                          (this: Actor<T>) =>                                                                                                          T | Actor<T>
  glowramp:                           (this: Actor<T>) =>                                                                                                          T | Actor<T>
  glowshift:                          (this: Actor<T>) =>                                                                                                          T | Actor<T>
  halign:                             (this: Actor<T>, align: number) =>                                                                                           T | Actor<T>
  heading:                            (this: Actor<T>, fHeading: any) =>                                                                                           T | Actor<T>
  hibernate:                          (this: Actor<T>, fTime: number) =>                                                                                           T | Actor<T>
  horizalign:                         (this: Actor<T>, align: HorizAlign) =>                                                                                       T | Actor<T>
  hurrytweening:                      (this: Actor<T>, fFactor: number) =>                                                                                         T | Actor<T>
  linear:                             (this: Actor<T>, fRate: number) =>                                                                                           T | Actor<T>
  luaeffect:                          (this: Actor<T>, sCommandName: string) =>                                                                                    T | Actor<T>
  name:                               (this: Actor<T>, sName: string) =>                                                                                           T | Actor<T>
  pause:                              (this: Actor<T>) =>                                                                                                          T | Actor<T>
  play:                               (this: Actor<T>) =>                                                                                                          T | Actor<T>
  playcommand:                        (this: Actor<T>, sCommandName: string, params?: LuaTable | AnyTable) =>                                                      T | Actor<T>
  polygonmode:                        (this: Actor<T>, pm: PolygonMode) =>                                                                                         T | Actor<T>
  polygonlinewidth:                   (this: Actor<T>, fWidth: number) =>                                                                                          T | Actor<T>
  pointsize:                          (this: Actor<T>, fSize: number) =>                                                                                           T | Actor<T>
  pulse:                              (this: Actor<T>) =>                                                                                                          T | Actor<T>
  pulseramp:                          (this: Actor<T>) =>                                                                                                          T | Actor<T>
  queuecommand:                       (this: Actor<T>, sCommandName: string) =>                                                                                    T | Actor<T>
  queuemessage:                       (this: Actor<T>, sMessageName: string) =>                                                                                    T | Actor<T>
  rainbow:                            (this: Actor<T>) =>                                                                                                          T | Actor<T>
  roll:                               (this: Actor<T>, fRoll: number) =>                                                                                           T | Actor<T>
  rotationx:                          (this: Actor<T>, fRotation: number) =>                                                                                       T | Actor<T>
  rotationy:                          (this: Actor<T>, fRotation: number) =>                                                                                       T | Actor<T>
  rotationz:                          (this: Actor<T>, fRotation: number) =>                                                                                       T | Actor<T>
  rotafterzoom:                       (this: Actor<T>, b: boolean) =>                                                                                              T | Actor<T>
  RunCommandsRecursively:             (this: Actor<T>, command: Function, params?: AnyTable) =>                                                                    T | Actor<T>
  scaletocover:                       (this: Actor<T>, fLeft: number, fTop: number, fRight: number, fBottom: number) =>                                            T | Actor<T>
  scaletofit:                         (this: Actor<T>, fLeft: number, fTop: number, fRight: number, fBottom: number) =>                                            T | Actor<T>
  SetHeight:                          (this: Actor<T>, height: number) =>                                                                                          T | Actor<T>
  setsize:                            (this: Actor<T>, width: number, height: number) =>                                                                           T | Actor<T>
  setstate:                           (this: Actor<T>, iNewState: number) =>                                                                                       T | Actor<T>
  SetWidth:                           (this: Actor<T>, width: number) =>                                                                                           T | Actor<T>
  set_tween_uses_effect_delta:        (this: Actor<T>, b: boolean) =>                                                                                              T | Actor<T>
  shadowcolor:                        (this: Actor<T>, c: RageColor) =>                                                                                            T | Actor<T>
  shadowlength:                       (this: Actor<T>, fLength: number) =>                                                                                         T | Actor<T>
  shadowlengthx:                      (this: Actor<T>, fLength: number) =>                                                                                         T | Actor<T>
  shadowlengthy:                      (this: Actor<T>, fLength: number) =>                                                                                         T | Actor<T>
  skewafterzoomrot:                   (this: Actor<T>) =>                                                                                                          T | Actor<T>
  skewx:                              (this: Actor<T>, fAmount: number) =>                                                                                         T | Actor<T>
  skewy:                              (this: Actor<T>, fAmount: number) =>                                                                                         T | Actor<T>
  sleep:                              (this: Actor<T>, fSeconds: number) =>                                                                                        T | Actor<T>
  smooth:                             (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  spin:                               (this: Actor<T>) =>                                                                                                          T | Actor<T>
  spring:                             (this: Actor<T>, fDuration: number) =>                                                                                       T | Actor<T>
  squish:                             (this: Actor<T>) =>                                                                                                          T | Actor<T>
  stopeffect:                         (this: Actor<T>) =>                                                                                                          T | Actor<T>
  stretchto:                          (this: Actor<T>, x1: number, x2: number, y1: number, y2: number) =>                                                          T | Actor<T>
  texturetranslate:                   (this: Actor<T>, x: number, y: number) =>                                                                                    T | Actor<T>
  texturewrapping:                    (this: Actor<T>, bWrap: boolean) =>                                                                                          T | Actor<T>
  tween:                              (this: Actor<T>, time: number, type: TweenType, params?: LuaTable) =>                                                        T | Actor<T>
  valign:                             (this: Actor<T>, fAlign: number) =>                                                                                          T | Actor<T>
  vertalign:                          (this: Actor<T>, align: VertAlign) =>                                                                                        T | Actor<T>
  vibrate:                            (this: Actor<T>) =>                                                                                                          T | Actor<T>
  visible:                            (this: Actor<T>, b: boolean) =>                                                                                              T | Actor<T>
  wag:                                (this: Actor<T>) =>                                                                                                          T | Actor<T>
  x:                                  (this: Actor<T>, actorX: number) =>                                                                                          T | Actor<T>
  y:                                  (this: Actor<T>, actorY: number) =>                                                                                          T | Actor<T>
  z:                                  (this: Actor<T>, actorZ: number) =>                                                                                          T | Actor<T>
  zbias:                              (this: Actor<T>, fBias: number) =>                                                                                           T | Actor<T>
  zbuffer:                            (this: Actor<T>, fUser: boolean) =>                                                                                          T | Actor<T>
  zoom:                               (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  zoomto:                             (this: Actor<T>, zoomX: number, zoomY: number) =>                                                                            T | Actor<T>
  zoomtowidth:                        (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  zoomtoheight:                       (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  zoomx:                              (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  zoomy:                              (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  zoomz:                              (this: Actor<T>, zoom: number) =>                                                                                            T | Actor<T>
  ztest:                              (this: Actor<T>, bTest: boolean | number) =>                                                                                 T | Actor<T>
  ztestmode:                          (this: Actor<T>, testMode: ZTestMode) =>                                                                                     T | Actor<T>
  zwrite:                             (this: Actor<T>, bWrite: boolean) =>                                                                                         T | Actor<T>
  wireframe:                          (this: Actor<T>, bWireFrame: boolean) =>                                                                                     T | Actor<T>
  xy:                                 (this: Actor<T>, actorX: number, actorY: number) =>                                                                          T | Actor<T>
  stoptweening:                       (this: Actor<T>) =>                                                                                                          T | Actor<T>
  MainActor:                          (this: Actor<T>) =>                                                                                                          T | Actor<T>
}

type AMappedActorManyNotDeclareMethodsOrProperties = {
  [S in string]: any
}

declare const Actor: Actor & AMappedActorManyNotDeclareMethodsOrProperties