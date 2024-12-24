declare interface ButtonBoxModule extends AnyTable {
  actorFrame: ActorFrame,
  width: number,
  handle: Actor,
  Generate: (this: ButtonBoxModule, width: number, height: number, border: number, plr: PlayerNumber, actorname: string) => void,
  UpdateSize: (this: ButtonBoxModule, width: number, height: number, border: number, ease: string, duration: number) => void,
  ChangeColor: (this: ButtonBoxModule, OutColor: RageColor, InColor: RageColor, ease?: string, duration?: number) => void,
  RunCommand: (this: ButtonBoxModule, commands: (self: Actor) => void) => void,
  RunRecursively: (this: ButtonBoxModule, commands: (self: Actor) => void) => void,
  GetTotalWidth: (self: Actor) => number,
  GetTotalHeight: (self: Actor) => number,
  Handle: (this: ButtonBoxModule) => Actor,
  Create: (this: ButtonBoxModule) => ActorFrame
}

{
  const a = new LuaTable()
  a.set('actorFrame', null)
  a.set('width', 0)
  a.set('handle', null)
  a.set('Generate', function(this: ButtonBoxModule, width, height, border, plr, actorname) {
    const bsize = border || 6
    const colortextHighlight = ColorLightTone(BoostColor(PlayerColor(plr), 1.2))
    const actorFrameArg = new LuaTable()
    actorFrameArg.set('Name', actorname)
    actorFrameArg.set('InitCommand', function(self: ActorFrame) {
      this.handle = self
    })
    actorFrameArg.set('UpdateSizeCommand', function(self: ActorFrame, params) {
      if (!this.handle) {
        return;
      }

      if (!params.Width || !params.Height) {
        return;
      }

      self.GetChild('BGOut').hurrytweening(0).tween(params.Length || 0, params.Ease || 'linear').zoomto(params.Width, params.Height)

      self.GetChild('BGIn').hurrytweening(0).tween(params.Length || 0, params.Ease || 'linear').zoomto(params.Width - (params.Border || bsize), params.Height - (params.Border || bsize))
    })
    actorFrameArg.set('ChangeColorCommand', function(self: ActorFrame, params) {
      if (!this.handle) {
        return ;
      }

      self.GetChild("BGOut").hurrytweening(0).tween(params.Length || 0,params.Ease || "linear").diffuse( params.Out );
      self.GetChild("BGIn").hurrytweening(0).tween(params.Length || 0,params.Ease || "linear").diffuse( params.In )
    })
    actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({
      Name: 'BGOut',
      InitCommand: function (self: Quad) {
        let leDiffuse = GameColor.Custom["MenuButtonBorder"]

        if (plr) {
          leDiffuse = colortextHighlight
        }

        self.zoomto(width, height).diffuse(leDiffuse)
      }
    }))
    actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({
      Name: 'BGIn',
      InitCommand: function (self: Quad) {
        let leDiffuseTopEdge = GameColor.Custom["MenuButtonBase"]
        let leDiffuseBottomEdge = ColorDarkTone( GameColor.Custom["MenuButtonGradient"] )

        if (plr) {
          leDiffuseTopEdge = ColorDarkTone(PlayerColor(plr))
          leDiffuseBottomEdge = ColorDarkTone(PlayerColor(plr))
        }
        self.zoomto(width - bsize, height - bsize).diffusetopedge(leDiffuseTopEdge).diffusebottomedge(leDiffuseBottomEdge)
      }
    }))
    const t: ActorFrame = Def.ActorFrame(actorFrameArg)
    this.actorFrame = t
    return this
  })
  a.set('UpdateSize', function (this: ButtonBoxModule, width, height, border, ease, duration) {
    this.actorFrame.UpdateSizeCommand(this.handle, { Width: width, Height: height, Border: border, Ease: ease, Length: duration })
  })
  a.set('ChangeColor', function (this: ButtonBoxModule, OutColor, InColor, ease, duration) {
    this.actorFrame.ChangeColorCommand(this.handle, { Out : OutColor, In : InColor, Ease : ease, Length : duration })
  })
  a.set('RunCommand', function (this: ButtonBoxModule, commands) {
    commands(this.handle)
  })
  a.set('RunRecursively', function (this: ButtonBoxModule, commands) {
    (this.handle as Actor).RunCommandsRecursively(function(self) {
      commands(self)
    })
  })
  a.set('GetTotalWidth', function(self: ButtonBoxModule) {
    return (this.handle as Actor).GetChild<Quad>('BGOut').GetZoomedWidth()
  })
  a.set('GetTotalHeight', function (self: ButtonBoxModule) {
    return (this.handle as Actor).GetChild<Quad>('BGOut').GetZoomedHeight()
  })
  a.set('Handle', function (this: ButtonBoxModule) {
    return this.handle
  })
  a.set('Create', function (this: ButtonBoxModule) {
    return this.actorFrame
  })
  a.set('__call', function (this: ButtonBoxModule, width, height, border, plr, metatab, actorname) {
    this.width = width || 0
		this.Generate( width, height, border, plr, actorname )
		if (metatab) {
			return this
    }
		return this.Create()
  })

  // @ts-ignore
  return setmetatable(a, a)
}