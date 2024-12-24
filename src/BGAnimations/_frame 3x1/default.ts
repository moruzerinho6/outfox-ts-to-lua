{
  const [File, Width] = [...$vararg];

  assert(File)
  assert(Width)

  const FullFile = THEME.GetPathB('', '_frame files 3x1/' + File)
  const Frame = LoadActor(FullFile)

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('UpdateSizeCommand', function (self: ActorFrame, params) {
    self.GetChildAt(1).stoptweening().easeoutexpo(0.2).x(-params.Width/2)
    self.GetChildAt(2).stoptweening().easeoutexpo(0.2).zoomtowidth(params.Width)
    self.GetChildAt(3).stoptweening().easeoutexpo(0.2).x(params.Width/2)
  })

  const tempFrame: AnyTable = Frame

  tempFrame.InitCommand = function (self: ActorFrame) {
    self.setstate(0).pause().horizalign(right as unknown as HorizAlign).x(-Width/2)
  }

  const tempFrame2: AnyTable = Frame

  tempFrame2.InitCommand = function (self: ActorFrame) {
    self.setstate(1).pause().zoomtowidth(Width as unknown as HorizAlign)
  }

  const tempFrame3: AnyTable = Frame

  tempFrame3.InitCommand = function (self: ActorFrame) {
    self.setstate(2).pause().horizalign(left as unknown as HorizAlign).x(Width as unknown as number /2)
  }

  actorFrameArg.set(actorFrameArg.length() + 1, tempFrame)
  actorFrameArg.set(actorFrameArg.length() + 1, tempFrame2)
  actorFrameArg.set(actorFrameArg.length() + 1, tempFrame3)
  // @ts-ignore
  return Def.ActorFrame(actorFrameArg)
}