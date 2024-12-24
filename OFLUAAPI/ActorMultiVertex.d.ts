interface AMVDrawState {
  Mode?: DrawMode
  First?: number
  Num?: number
}

declare interface ActorMultiVertex extends ActorFrameTexture {
  AddQuadState:             (this: ActorMultiVertex, offset: number) => ActorMultiVertex
  AddState:                 (this: ActorMultiVertex, state_date: LuaTable) => ActorMultiVertex
  ForceStateUpdate:         (this: ActorMultiVertex) => ActorMultiVertex
  GetUseAnimationState:     (this: ActorMultiVertex) => boolean
  SetUseAnimationState:     (this: ActorMultiVertex, use: boolean) => ActorMultiVertex
  GetNumStates:             (this: ActorMultiVertex) => number
  GetNumSquadStates:        (this: ActorMultiVertex) => number
  GetState:                 (this: ActorMultiVertex) => number
  GetDecodeMovie:           (this: ActorMultiVertex) => boolean
  SetDecodeMovie:           (this: ActorMultiVertex, decode: boolean) => ActorMultiVertex
  SetState:                 (this: ActorMultiVertex, id: number) => ActorMultiVertex
  GetQuadState:             (this: ActorMultiVertex, id: number) => number
  SetQuadState:             (this: ActorMultiVertex, id: number, offset: number) => ActorMultiVertex
  GetStateData:             (this: ActorMultiVertex, id: number) => LuaTable
  SetStateData:             (this: ActorMultiVertex, id: number, state_date: LuaTable) => void
  SetStateProperties:       (this: ActorMultiVertex, state_data_table: LuaTable[]) => void
  RemoveState:              (this: ActorMultiVertex, id: number) => ActorMultiVertex
  RemoveQuadState:          (this: ActorMultiVertex, id: number) => ActorMultiVertex
  SetAllStateDelays:        (this: ActorMultiVertex, delay: number) => ActorMultiVertex
  SetSecondsIntoAnimation:  (this: ActorMultiVertex, seconds: number) => ActorMultiVertex
  SetVertex:                (this: ActorMultiVertex, index: number, vertexData: LuaTable) => void
  SetVertices              (this: ActorMultiVertex, vertices: LuaTable): ActorMultiVertex
  SetVertices              (this: ActorMultiVertex, first: number, vertices: LuaTable): ActorMultiVertex
  SetVertsFromSplines:      (this: ActorMultiVertex) => ActorMultiVertex
  GetSpline:                (this: ActorMultiVertex, i: number) => CubicSplineN
  SetNumVertices:           (this: ActorMultiVertex, num: number) => ActorMultiVertex
  GetNumVertices:           (this: ActorMultiVertex) => number
  SetDrawState:             (this: ActorMultiVertex, state: AMVDrawState) => ActorMultiVertex
  GetDestDrawMode:          (this: ActorMultiVertex) => DrawMode
  GetDestFirstToDraw:       (this: ActorMultiVertex) => number
  GetDestNumToDraw:         (this: ActorMultiVertex) => number
  GetCurrDrawMode:          (this: ActorMultiVertex) => DrawMode
  GetCurrFirstToDraw:       (this: ActorMultiVertex) => number
  GetCurrNumToDraw:         (this: ActorMultiVertex) => number
  GetTexture:               (this: ActorMultiVertex) => RageTexture
  SetEffectMode:            (this: ActorMultiVertex, em: EffectMode) => ActorMultiVertex
  SetTextureMode:           (this: ActorMultiVertex, tm: TextureMode) => ActorMultiVertex
  SetLineWidth:             (this: ActorMultiVertex, width: number) => ActorMultiVertex
  SetPointSize:             (this: ActorMultiVertex, width: number) => ActorMultiVertex
  SetPointState:            (this: ActorMultiVertex, state: boolean) => void
  SetDrawMode:              (this: ActorMultiVertex, mode: DrawMode) => ActorMultiVertex
  SetTexture:               (this: ActorMultiVertex, texture: RageTexture) => ActorMultiVertex
  LoadTexture:              (this: ActorMultiVertex, path: string) => ActorMultiVertex
}

declare const ActorMultiVertex:ActorMultiVertex