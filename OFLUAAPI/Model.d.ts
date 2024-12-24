import type { Actor } from "./Actor"
import type { EffectMode } from "./enums"

interface ModelProperties {
  Meshes: string
  Material: string
  Bones: string
  InitCommand?: (self: Model) => unknown
  OnCommand?: (self: Model) => unknown
  BeginCommand?: (self: Model) => unknown
  GetDefaultAnimation: () => string
  loop: (bLoop: boolean) => Model
  playanimation: (sAniName: string, fPlayRate: number) => Model
  position: (fSeconds: number) => Model
  rate: (fRate: number) => Model
  SetDefaultAnimation: (sAnimation: string, fPlayRate: number) => Model
  GetNumStates: () => number
  CelShading: (bCelShade: boolean) => Model
  LoadBones: (name: string, sPath: string) => void
  GetPosition: () => number
  GetTotalFrames: () => number
  SetEffectMode: (em: EffectMode) => void
  UpdateMeshPosition: (iMesh: number, meshPos: LuaTable) => void
  MaterialRate: (fRate: number) => void
}

interface IndexableActor {
  [key: string]: (self: Model) => unknown
}

export type Model = ModelProperties & Actor