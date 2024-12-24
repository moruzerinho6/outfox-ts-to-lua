

declare interface UIButtonChooser extends ActorFrame {
  UpdateCurrentOptionCommand: (self: ActorFrame, param: { Val: number }) => void
}

interface Attr extends ActorFrame {
  Width: number,
  Height: number,
  Pos?: number[],
  IsValueIncremental?: boolean,
  Choices: AnyTable & LuaTable,
  Values: AnyTable & LuaTable,
  Steps: number,
  Load: (self: ActorFrame) => number,
  NotifyOfSelection: (self: ActorFrame, Value: any) => any,
  Save: (self: ActorFrame, Value: any) => any,
}

// @ts-ignore
return function (Attr: Attr) {
  
  Attr.Pos = Attr.Pos || [0, 0]
  const isincremental = Attr.IsValueIncremental
  let curoption = 1

  if (!isincremental) {
    assert(Attr.Values , "No table with values has been found.")
  } else {
    Attr.Steps = Attr.Steps || 1
  }

  const t: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      self.xy(Attr.Pos[1], Attr.Pos[2])
      self.GetChild("ButtonL").x(-Attr.Width * .4)
      self.GetChild("ButtonR").x(Attr.Width * .4)

      if (Attr.Load) {
        curoption = Attr.Load(Attr)
      }

      self.playcommand('UpdateCurrentOption', {
        Val: 0
      })
      self.GetChild("CurrentVal").xy(0, -8).zoom(LoadModule("Lua.Resize.lua")(self.GetChild("CurrentVal")
                .GetZoomedWidth(), self.GetChild("CurrentVal").GetZoomedHeight(), Attr.Width * .34, Attr.Height))
    },
    UpdateCurrentOptionCommand: function (self: ActorFrame, param) {
      curoption = curoption + param.Val

      if (!isincremental) {
        if (curoption < 1) {
          curoption = 1
        }

        if (curoption > Attr.Values.length()) { // TODO: Define as table
          curoption = Attr.Values.length()
        }

        self.GetChild('IndexButton').playcommand('HandleInput')
      }

      let textToSet = curoption

      if (!isincremental) {
        if (Attr.Choices) {
          textToSet = Attr.Choices[curoption]
        } else {
          textToSet = Attr.Values[curoption]
        }
      }

      self.GetChild("CurrentVal").settext(textToSet)
    },
    OffCommand: function (self: ActorFrame) {
      if (Attr.Save !== null) {
        Attr.Save(Attr, curoption)
      }
    }
  })

  let moduleArg: ButtonBoxModule = LoadModule('UI/UI.ButtonBox.lua')(Attr.Width * .68, Attr.Height)
  moduleArg.Name = 'BG'
  t.set(t.length() + 1, moduleArg)

  let moduleArg2: ButtonBoxModule = LoadModule('UI/UI.ButtonBox.lua')(64, Attr.Height)
  moduleArg2.Name = 'ButtonL'
  t.set(t.length() + 1, moduleArg2)

  let moduleArg3 = LoadModule('UI/UI.ClickArea.lua')(Attr, 64, Attr.Height, function(self: Actor) {
    self.GetParent().GetChild<Quad>('ButtonR').stoptweening().diffuse(color("#777777")).easeoutquint(0.5).diffuse(Color.White)
    
    let leValue = 1

    if (isincremental) {
      leValue = Attr.Steps
    }

    self.GetParent().playcommand('UpdateCurrentOption', {
      Val: leValue
    })
  })
  moduleArg3.InitCommand = function(self: Actor) {
    self.x(Attr.Width * .4)
  }
  t.set(t.length() + 1, moduleArg3)

  let moduleArg4 = LoadModule("UI/UI.ButtonBox.lua")(64, Attr.Height)
  moduleArg4.Name = 'ButtonR'

  t.set(t.length() + 1, moduleArg4)

  let moduleArg5 = LoadModule("UI/UI.ClickArea.lua")(Attr, 64, Attr.Height, function (self: Actor) {
    self.GetParent().GetChild<Quad>('ButtonL').stoptweening().diffuse(color("#777777")).easeoutquint(0.5).diffuse(Color.White)
    let leValue = -1

    if (isincremental) {
      leValue = -Attr.Steps
    }

    self.GetParent().playcommand('UpdateCurrentOption', {
      Val: leValue
    })

    Attr.NotifyOfSelection(self, curoption)
  })
  moduleArg5.InitCommand = function (self: Actor) {
    self.x(-Attr.Width * .4)
  }
  t.set(t.length() + 1, moduleArg5)

  const VertGallery = {
    RightTriangle: [
      [[-(64 * .2), -15, 0], Color.White],
      [[(64 * .2), 0, 0], Color.White],
      [[-(64 * .2), 15, 0], Color.White]
    ],
    LeftTriangle: [
      [[(64 * .2), -15, 0], Color.White],
      [[-(64 * .2), 0, 0], Color.White],
      [[(64 * .2), 15, 0], Color.White]
    ],
    Plus: [
      [[-(72 * .2), -5, 0], Color.White],
      [[-(72 * .2), 5, 0], Color.White],
      [[(72 * .2), 5, 0], Color.White],
      [[(72 * .2), -5, 0], Color.White],
      [[-5, -(72 * .2), 0], Color.White],
      [[-5, (72 * .2), 0], Color.White],
      [[5, (72 * .2), 0], Color.White],
      [[5, -(72 * .2), 0], Color.White]
    ],
    Minus: [
      [[-(72 * .2), -5, 0], Color.White],
      [[-(72 * .2), 5, 0], Color.White],
      [[(72 * .2), 5, 0], Color.White],
      [[(72 * .2), -5, 0], Color.White]
    ]
  }

  let statetype = 'DrawMode_'

  if (isincremental) {
    statetype = statetype + 'Quads'
  } else {
    statetype = statetype + 'Triangles'
  }

  t.set(t.length() + 1, Def.ActorMultiVertex({
    InitCommand: function (self: ActorMultiVertex) {
      self.SetDrawState({
        Mode: statetype
      });
      let leVertices = VertGallery.RightTriangle;

      if (isincremental) {
        leVertices = VertGallery.Plus
      }
      (self.x(Attr.Width * .4) as ActorMultiVertex).SetVertices(leVertices)
    }
  }))

  t.set(t.length() + 1, Def.ActorMultiVertex({
    InitCommand: function (self: ActorMultiVertex) {
      self.SetDrawState({
        Mode: statetype
      })
      let leVertices = VertGallery.LeftTriangle

      if (isincremental) {
        leVertices = VertGallery.Minus
      }

      (self.x(-Attr.Width * .4) as ActorMultiVertex).SetVertices(leVertices)
    }
  }))

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'CurrentVal'
  }))

  if (!isincremental) {
    const indexbutton: ActorFrame = Def.ActorFrame({
      Name: 'IndexButton',
      InitCommand: function (self: ActorFrame) {
        self.y(12)
      },
      HandleInputCommand: function (self: ActorFrame, param) {
        if (Attr.Values.length() < 2) {
          return;
        }

        for (const i of $range(1, Attr.Values.length())) {
          let leDiffuse = color("#777777");

          if (curoption === i) {
            leDiffuse = Color.White
          }

          (self.GetChild('')[i] as Actor).diffuse(leDiffuse)
        }
      }
    })

    for (const [k,v] of pairs(Attr.Values)) {
      indexbutton.set(indexbutton.length() + 1, Def.Quad({
        InitCommand: function (self: ActorFrame) {
          self.zoomto(8, 8).x(scale((k as number), 1, Attr.Values.length(), -Attr.Width * .2, Attr.Width * .2))
        }
      }))
    }

    t.set(t.length() + 1, indexbutton)
  }

  return t
}