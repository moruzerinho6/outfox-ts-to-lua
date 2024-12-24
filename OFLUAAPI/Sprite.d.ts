// import type { Actor } from "./Actor";
// import type { RageTexture } from "./RageTexture";
// import type { Song } from "./Song";
// import type { EffectMode } from "./enums";

interface StatePropertySpriteIndexable {
  [f: string]: number[]
}

interface StatePropertySpriteProperties {
  Frame: number
  Delay: number
}

type StatePropertySprite = StatePropertySpriteProperties & StatePropertySpriteIndexable 

// interface IndexableActor {
//   [key: string]: (self: Sprite) => unknown
// }

declare interface Sprite extends SpriteFallback, Actor<Sprite> {
  GetAnimationLengthSeconds:          (this: Sprite) =>                                                                                                         number
  GetDecodeMovie:                     (this: Sprite) =>                                                                                                         boolean
  GetNumStates:                       (this: Sprite) =>                                                                                                         number
  GetState:                           (this: Sprite) =>                                                                                                         number
  GetTexture:                         (this: Sprite) =>                                                                                                         RageTexture
  Load:                               (this: Sprite, sPath: string) =>                                                                                          Sprite
  LoadBackground:                     (this: Sprite, sPath: string) =>                                                                                          Sprite
  LoadBanner:                         (this: Sprite, sPath: string) =>                                                                                          Sprite
  LoadFromCached:                     (this: Sprite, sType: string, sPath: string) =>                                                                           Sprite
  SetCustomImageRect:                 (this: Sprite, fLeft: number, fTop: number, fRight: number, fBottom: number) =>                                           Sprite
  SetCustomPosCoords:                 (this: Sprite, ulx: number, uly: number, llx: number, lly: number, lrx: number, lry: number, urx: number, ury: number) => Sprite
  StopUsingCustomPosCoords:           (this: Sprite) =>                                                                                                         Sprite
  SetDecodeMovie:                     (this: Sprite, decode: unknown) =>                                                                                        Sprite
  SetEffectMode:                      (this: Sprite, mode: EffectMode) =>                                                                                       void
  SetSecondsIntoAnimation:            (this: Sprite, fSeconds: number) =>                                                                                       Sprite
  SetStateProperties:                 (this: Sprite, properties: StatePropertySprite[]) =>                                                                      void
  SetTexture:                         (this: Sprite, texture: RageTexture) =>                                                                                   Sprite
  addimagecoords:                     (this: Sprite, fX: number, fY: number) =>                                                                                 void
  customtexturerect:                  (this: Sprite, fLeft: number, fTop: number, fRight: number, fBottom: number) =>                                           Sprite
  get_use_effect_clock_for_texcoords: (this: Sprite) =>                                                                                                         boolean
  scaletoclipped:                     (this: Sprite, fWidth: number, fHeight: number) =>                                                                        Sprite
  setstate:                           (this: Sprite, iNewState: number) =>                                                                                      Sprite
  set_use_effect_clock_for_texcoords: (this: Sprite, use: boolean) =>                                                                                           Sprite
  stretchtexcoords:                   (this: Sprite, fX: number, fY: number) =>                                                                                 Sprite
  texcoordvelocity:                   (this: Sprite, fVelX: number, fVelY: number) =>                                                                           Sprite
  CropTo:                             (this: Sprite, fWidth: number, fHeight: number) =>                                                                        Sprite
  SetAllStateDelays:                  (this: Sprite, fRate: number) =>                                                                                          Sprite
}

declare const Sprite : Sprite// & IndexableActor