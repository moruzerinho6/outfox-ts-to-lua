declare interface RageTexture {
  GetSourceWidth:       () =>               number
  GetSourceHeight:      () =>               number
  GetTextureWidth:      () =>               number
  GetTextureHeight:     () =>               number
  GetImageWidth:        () =>               number
  GetImageHeight:       () =>               number
  GetNumFrames:         () =>               number
  GetPath:              () =>               string
  GetTextureCoordRect:  () =>               LuaMultiReturn<[number, number, number, number]>
  loop:                 (bLoop: boolean) => void
  position:             (fPos: number) =>   void
  rate:                 (fRate: number) =>  void
  Reload:               () =>               void
}

declare const RageTexture : RageTexture