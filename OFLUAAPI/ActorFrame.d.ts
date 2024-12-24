// import type { Actor } from "./Actor"
// import type { BitmapText } from "./BitmapText"
// import type { RageColor } from "./init"

declare interface ActorFrame extends Actor<ActorFrame> {
  AddChildFrompath:         (this: ActorFrame, sPath: string) =>                          boolean
  AddChild:                 (this: ActorFrame, actors: LuaTable) =>                       boolean
  fardistz:                 (this: ActorFrame, fFarDistZ: number) =>                      ActorFrame
  fov:                      (this: ActorFrame, fFov: number) =>                           ActorFrame
  GetChild:                 <G = undefined>(this: ActorFrame, sName: string | number) =>  G extends undefined ? Actor<ActorFrame> : G // It seems the first argument cna also be a number??
  GetChildAt:               <G = undefined>(this: ActorFrame, iIndex: number) =>          G extends undefined ? Actor<ActorFrame> : G
  GetChildren:              <G = undefined>(this: ActorFrame) =>                          G extends undefined ? any : G[]// LuaMultiReturn<[LuaTable<string, ActorFrame>, LuaTable<string, Actor>, LuaTable<string, BitmapText>]>
  GetDrawFunction:          (this: ActorFrame) =>                                         any
  GetFOV:                   (this: ActorFrame) =>                                         number
  GetNumChildren:           (this: ActorFrame) =>                                         number
  GetUpdateRate:            (this: ActorFrame) =>                                         number
  playcommandonchildren:    (this: ActorFrame, sCommandName: string) =>                   ActorFrame
  playcommandonleaves:      (this: ActorFrame, sCommandName: string) =>                   ActorFrame
  propagate:                (this: ActorFrame, bPropagate: boolean) =>                    ActorFrame
  RemoveAllChildren:        (this: ActorFrame) =>                                         ActorFrame
  RemoveChild:              (this: ActorFrame, sChild: string) =>                         ActorFrame
  RunCommandsOnChildren:    (this: ActorFrame, cmds: any) =>                              ActorFrame
  runcommandsonleaves:      (this: ActorFrame, cmds: any) =>                              ActorFrame
  SetAmbientLightColor:     (this: ActorFrame, c: RageColor) =>                           ActorFrame
  SetDiffuseLightColor:     (this: ActorFrame, c: RageColor) =>                           ActorFrame
  SetDrawByZPosition:       (this: ActorFrame, b: boolean) =>                             ActorFrame
  SetDrawFunction:          (this: ActorFrame, DrawFunction: any) =>                      ActorFrame
  SetFOV:                   (this: ActorFrame, fFOV: number) =>                           ActorFrame
  SetLightDirection:        (this: ActorFrame, position: LuaTable) =>                     ActorFrame
  SetSpecularLightColor:    (this: ActorFrame, c: RageColor) =>                           ActorFrame
  SetUpdateFunction:        (this: ActorFrame, UpdateFunction: any) =>                    ActorFrame
  SetUpdateRate:            (this: ActorFrame, fRate: number) =>                          ActorFrame
  SortByDrawOrder:          (this: ActorFrame) =>                                         ActorFrame
  vanishpoint:              (this: ActorFrame, fX: number, fY: number) =>                 ActorFrame
  vanishpointx:             (this: ActorFrame, fX: number) =>                             ActorFrame
  vanishpointy:             (this: ActorFrame, fY: number) =>                             ActorFrame
}

declare var ActorFrame: ActorFrame