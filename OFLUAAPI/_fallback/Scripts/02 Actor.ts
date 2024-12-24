declare interface ActorFallback<T = any> {
  xyz:                              (this: Actor, xpos: number, ypos: number, zpos: number) =>    Actor & T;
  ease:                             (this: Actor, t: any, fEase: number) =>                       Actor & T;
  drop:                             (this: Actor, t: any) =>                                      Actor & T;
  compoud:                          (this: Actor, length: number, ...args: any[]) =>              Actor & T;
  hide_if:                          (this: Actor, b: boolean) =>                                  Actor & T;
  player:                           (this: Actor, p: string) =>                                   Actor & T;
  propagatecommand:                 (this: Actor, ...args: any[]) =>                              Actor & T;
  align:                            (this: Actor, h: number, v: number) =>                        Actor & T;
  FullScreen:                       (this: Actor) =>                                              Actor & T;
  scale_or_crop_background_no_move: (this: Actor) =>                                              Actor & T;
  scale_or_crop_background:         (this: Actor) =>                                              Actor & T;
  CenterX:                          (this: Actor) =>                                              Actor & T;
  CenterY:                          (this: Actor) =>                                              Actor & T;
  Center:                           (this: Actor) =>                                              Actor & T;
  bezier:                           (this: Actor) =>                                              Actor & T;
  Real:                             (this: Actor) =>                                              Actor & T;
  RealInverse:                      (this: Actor) =>                                              Actor & T;
  MaskSource:                       (this: Actor) =>                                              Actor & T;
  MaskDest:                         (this: Actor) =>                                              Actor & T;
  thumb:                            (this: Actor, fEffectPeriod: number) =>                       Actor & T;
  heartbeat:                        (this: Actor, fEffectPeriod: number) =>                       Actor & T;
  LyricCommand:                     (this: Actor, side: string) =>                                Actor & T;
  SetSize:                          (this: Actor, w: number, h: number) =>                        Actor & T;
  hidden:                           (this: Actor, bHide: boolean) =>                              void;
}

declare interface BitmapTextFallback {
  NoStroke: (this: BitmapText) =>                                       BitmapText;
  settextf: (this: BitmapText, ...args: any[]) =>                       BitmapText;
  DiffuseAndStroke: (this: BitmapText, diffuseC: any, strokeC: any) =>  BitmapText;
}

interface HelpDisplay {
  setfromsongorcourse: () => HelpDisplay;
}

interface ActorSound {
  playforplayer: (pn: string) => ActorSound;
}

declare const left: string;
declare const center: string;
declare const right: string;
declare const top: string;
declare const middle: string;
declare const bottom: string;
declare const bg_fit_functions: {
  BackgroundFitMode_CoverDistort: (
    self: Actor,
    width: number,
    height: number
  ) => void;
  BackgroundFitMode_CoverPreserve: (
    self: Actor,
    width: number,
    height: number
  ) => void;
  BackgroundFitMode_FitInside: (
    self: Actor,
    width: number,
    height: number
  ) => void;
  BackgroundFitMode_FitInsideAvoidLetter: (
    self: Actor,
    width: number,
    height: number
  ) => void;
  BackgroundFitMode_FitInsideAvoidPillar: (
    self: Actor,
    width: number,
    height: number
  ) => void;
};
declare const PositionPerPlayer: (player: string, p1X: number, p2X: number) => boolean;
declare const GetReal: () => number;
declare const GetRealInverse: () => number;
declare const DrawOrder: {
  Background: -100;
  Underlay: 0;
  Decorations: 100;
  Content: 105;
  Screen: 120;
  Overlay: 200;
};
