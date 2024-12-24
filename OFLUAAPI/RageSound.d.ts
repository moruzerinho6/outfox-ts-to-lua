declare interface RageSound {
  get_length:   (this: RageSound) => number
  pitch:        (this: RageSound, fPitch: number) =>                  void
  position:     (this: RageSound, fSecs: number) =>                   void
  SetParam:     (this: RageSound, sProperty: string, fVal: number) => void
  SetProperty:  (this: RageSound, sProperty: string, fVal: number) => void
  speed:        (this: RageSound, fSpeed: number) =>                  void
  volume:       (this: RageSound, fVolume: number) =>                 void
}

declare const RageSound: RageSound