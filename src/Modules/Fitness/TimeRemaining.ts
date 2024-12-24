declare interface TimeRemainingModule {
  sessionTime: boolean
  UseSessionTime: (this: TimeRemainingModule, bState: boolean) => void
  Create: (this: TimeRemainingModule) => void
}

{
  const t = new LuaTable()

  t.set('sessionTime', false)
  t.set('UseSessionTime', function (this: TimeRemainingModule, bState: boolean) {
    this.sessionTime = bState
  })
  t.set('Create', function (this: TimeRemainingModule) {
    const ActorFrameArg = new LuaTable()

    ActorFrameArg.set('InitCommand', function (self: ActorFrame) {
      self.diffusealpha(0.8)
    })

    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Sprite({
      Texture: THEME.GetPathG('', 'UI/Timer'),
      InitCommand: function (self: Sprite) {
        self.zoom(0.25).halign(1).x(-32)
      }
    }))

    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
      Font: '_plex Bold',
      InitCommand: function (self: BitmapText) {
        self.settext(SecondsToMMSS(200)).zoom(0.5).halign(0).x(-28)
      },
      TweenClockCommand: function (self: BitmapText) {
        self.settext(SecondsToHHMMSS(GetTimeSinceStart())).sleep(1).queuecommand('TweenClock')
      },
      OffCommand: function (self: BitmapText) {
        self.stoptweening()
      },
      BeginCommand: function (self: BitmapText) {
        self.playcommand('TweenClock')
      }
    }))
    return Def.ActorFrame(ActorFrameArg)
  })

  // @ts-ignore
  return setmetatable(t, t)
}