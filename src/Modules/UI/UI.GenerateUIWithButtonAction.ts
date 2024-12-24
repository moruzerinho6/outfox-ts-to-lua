declare type UIGenerateUIWithButtonAction = (Attr: AnyTable) => ActorFrame

// @ts-ignore
return function (Attr) {
  Attr.Pos = Attr.Pos || [0, 0]
  const t: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      self.height = Attr.Height

      if (self.GetChild('BG')) {
        self.GetChild('BG').xy(Attr.Pos[1], Attr.Pos[2])
      }

      self.GetChild('Click').xy(Attr.Pos[1], Attr.Pos[2])

      if (self.GetChild('Extra')) {
        self.GetChild('Extra').xy(Attr.Pos[1], Attr.Pos[2]) // All minus one because of TSTL
      }
    }
  })

  if (Attr.UseImage) {
    Attr.UseImage.Name = 'BG'
    t.set(t.length() + 1, Attr.UseImage)
  } else {
    const temporaryModule: ButtonBoxModule = LoadModule( "UI/UI.ButtonBox.lua" )( Attr.Width, Attr.Height, Attr.Border, Attr.Player )
    temporaryModule.Name = 'BG'
    t.set(t.length() + 1, temporaryModule)
  }

  const temporaryModule = LoadModule('UI/UI.ClickArea.lua')({
    Width: Attr.Width,
    Height: Attr.Height,
    Cache: Attr.Cache,
    Debug: Attr.Debug,
    ActionIsAfterLifting: Attr.ActionIsAfterLifting,
    ReturnAdjacentActorFrame: Attr.ReturnAdjacentActorFrame,
    Active: Attr.Active,
    UseTweenTime: Attr.UseTweenTime,
    Action: function (self: Quad) {
      if (!Attr.Action) {
        error( 'No action has been defined for this button.')
      }

      if (Attr.Action(self)) {
        if (self.GetParent().GetChild('BG')) {
          const ogColor = self.GetParent().GetChild('BG').GetDiffuse()
          self.GetParent().GetChild('BG').stoptweening().diffuse(color('#777777')).easeoutquint(0.5).diffuse(ogColor)
        }
      }
    }
  })

  temporaryModule.Name = 'Click'
  t.set(t.length() + 1, temporaryModule)

  if (Attr.AddActors) {
    Attr.AddActors.Name = 'Extra'
    Attr.AddActors.ActionPlayCommand = Attr.Action

    t.set(t.length() + 1, Attr.AddActors)
  }

  return t
}