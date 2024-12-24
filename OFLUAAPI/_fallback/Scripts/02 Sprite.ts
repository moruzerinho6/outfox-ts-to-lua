declare interface SpriteFallback {
  LoadFromSongBanner:             (song: any) =>                                          Sprite
  LoadFromSongBackground:         (song: any) =>                                          Sprite
  LoadFromCurrentSongBackground:  () =>                                                   Sprite
  position:                       (f: number) =>                                          Sprite
  loop:                           (f: number) =>                                          Sprite
  rate:                           (f: number) =>                                          Sprite
  LinearFrames:                   (NumFrames: number, Seconds: number, Offset: number) => number
  cropto:                         (w: number, h: number) =>                               Sprite
}

declare const LoadSongBackground: () => Sprite