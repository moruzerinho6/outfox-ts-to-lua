declare interface ActorMultiTexture extends Actor {
  AddTexture: (tex: RageTexture) => number
  ClearTextures: () => void
  SetEffectMode: (em: EffectMode) => void
  SetSizeFromTexture: (tex: RageTexture) => void
  SetTextureCoords: (x1: number, y1: number, x2: number, y2: number) => void
  SetTextureMode: (iIndex: number, tm: TextureMode) => void
}

declare const ActorMultiTexture: ActorMultiTexture