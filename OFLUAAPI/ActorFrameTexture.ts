declare interface ActorFrameTexture extends ActorFrame {
  Create:                 (this: ActorFrameTexture) => void
  EnableAlphaBuffer:      (this: ActorFrameTexture, bEnable: boolean) => ActorFrameTexture
  EnableDepthBuffer:      (this: ActorFrameTexture, bEnable: boolean) => void
  EnableFloat:            (this: ActorFrameTexture, bEnable: boolean) => void
  EnablePreserveTexture:  (this: ActorFrameTexture, bEnable: boolean) => void
  GetTexture:             (this: ActorFrameTexture) => RageTexture
  SetTextureName:         (this: ActorFrameTexture, sName: string) => void
}

declare const ActorFrameTexture: ActorFrameTexture