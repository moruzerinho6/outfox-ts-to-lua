interface BitmapTextAttribute {
  Length: number
  Diffuse?: RageColor
  Diffuses?: RageColor[]
  Glow?: RageColor
}

declare interface BitmapText extends Actor<BitmapText>, BitmapTextFallback {
  AddAttribute:                 (this: BitmapText, iPos: number, attr: BitmapTextAttribute) =>            BitmapText
  ClearAttributes:              (this: BitmapText) =>                                                     void
  DiffuseAndStroke:             (this: BitmapText, diffuseColor: RageColor, strokeColor: RageColor) =>    BitmapText
  GetText:                      (this: BitmapText) =>                                                     string
  distort:                      (this: BitmapText, distortion_percentage: number) =>                      void
  undistort:                    (this: BitmapText) =>                                                     void
  get_mult_attrs_with_diffuse:  (this: BitmapText) =>                                                     boolean
  set_mult_attrs_with_diffuse:  (this: BitmapText, mult: boolean) =>                                      void
  jitter:                       (this: BitmapText, bJitter: boolean) =>                                   void
  max_dimension_use_zoom:       (this: BitmapText, use_zoom: boolean) =>                                  void
  maxheight:                    (this: BitmapText, fHeight: number) =>                                    BitmapText
  maxwidth:                     (this: BitmapText, fWidth: number) =>                                     BitmapText
  rainbowscroll:                (this: BitmapText, bRainbowScroll: boolean) =>                            void
  settext:                      (this: BitmapText, sText: string | number, sAltText?: string | number) => BitmapText
  Stroke:                       (this: BitmapText, c: RageColor) =>                                       BitmapText
  strokecolor:                  (this: BitmapText, c: RageColor) =>                                       BitmapText
  getstrokecolor:               (this: BitmapText) =>                                                     void
  textglowmode:                 (this: BitmapText, tgm: TextGlowMode) =>                                  BitmapText
  LoadFromFont:                 (this: BitmapText, sPath: string) =>                                      BitmapText
  uppercase:                    (this: BitmapText, b: boolean) =>                                         BitmapText
  vertspacing:                  (this: BitmapText, iSpacing: number) =>                                   BitmapText
  wrapwidthpixels:              (this: BitmapText, iWidth: number) =>                                     BitmapText
  Regen:                        (this: BitmapText) =>                                                     BitmapText // Don't know where this is defined but it's used on alphav/modules/UI/Wheel/Objects/ChartInfo L142
}

declare const BitmapText: BitmapText