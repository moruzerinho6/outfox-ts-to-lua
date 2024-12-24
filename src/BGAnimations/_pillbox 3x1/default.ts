{
  const [Width, BaseFill, BaseGradient, BorderFill] = [...$vararg]

  assert(Width)
  assert(BaseFill)
  assert(BaseGradient)
  assert(BorderFill)

  const BaseActor = THEME.GetPathB('', '_pillbox files 3x1/base')
  const BorderActor = THEME.GetPathB('', '_pillbox files 3x1/border')
  const Frame = LoadActor(BaseActor)
  const Border = LoadActor(BorderActor)

  const actorFrameArg = new LuaTable()

  const tempFrame: AnyTable = Frame

  tempFrame.InitCommand = function (self: ActorFrame) {
    self.setstate(0).pause().horizalign(right as unknown as HorizAlign).x(-Width/2).diffuse(BaseFill as unknown as RageColor)
  }

  const tempFrame2: AnyTable = Frame

  tempFrame2.InitCommand = function (self: ActorFrame) {
    self.setstate(1).pause().zoomtowidth(Width as unknown as HorizAlign).diffuse(BaseFill as unknown as RageColor)
  }

  const tempFrame3: AnyTable = Frame

  tempFrame3.InitCommand = function (self: ActorFrame) {
    self.setstate(2).pause().horizalign(left as unknown as HorizAlign).x(Width as unknown as number/2).diffuse(BaseFill as unknown as RageColor)
  }

  const tempBorder: AnyTable = Border

  tempBorder.InitCommand = function (self: ActorFrame) {
    self.setstate(0).pause().horizalign(right as unknown as HorizAlign).x(-Width/2).diffuse(BorderFill as unknown as RageColor)
  }

  const tempBorder2: AnyTable = Border

  tempBorder2.InitCommand = function (self: ActorFrame) {
    self.setstate(1).pause().zoomtowidth(Width as unknown as number).diffuse(BorderFill as unknown as RageColor)
  }

  const tempBorder3: AnyTable = Border

  tempBorder3.InitCommand = function (self: ActorFrame) {
    self.setstate(2).pause().horizalign(left as unknown as HorizAlign).x(Width as unknown as number/2).diffuse(BorderFill as unknown as RageColor)
  }

  actorFrameArg.set(actorFrameArg.length() + 1, tempFrame)
  actorFrameArg.set(actorFrameArg.length() + 1, tempFrame2)
  actorFrameArg.set(actorFrameArg.length() + 1, tempFrame3)
  actorFrameArg.set(actorFrameArg.length() + 1, tempBorder)
  actorFrameArg.set(actorFrameArg.length() + 1, tempBorder2)
  actorFrameArg.set(actorFrameArg.length() + 1, tempBorder3)

  // @ts-ignore
  return Def.ActorFrame(actorFrameArg)
}