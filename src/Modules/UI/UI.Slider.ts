declare interface UISlider extends ActorFrame {
  UpdateCurrentOptionCommand: (self: ActorFrame, param: { Val: number }) => void
}
//@ts-ignore
return function (Attr) {
  Attr.Pos = Attr.Pos || [0, 0]

  let curoption = 1
  const t: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      self.height = Attr.Height
      self.GetChild('BG').xy(Attr.Pos[1], Attr.Pos[2])
      self.GetChild('Slider').xy(Attr.Pos[1], Attr.Pos[2] + (Attr.Height * .25))
      self.GetChild('BGSlider').xy(Attr.Pos[1], Attr.Pos[2] + (Attr.Height * .25))
      self.GetChild('CurrentVal').xy(Attr.Pos[1] + (Attr.Width * .45), Attr.Pos[2] - (Attr.Height * .25))

      if (Attr.Load) {
        curoption = Attr.Load(Attr.Values)
        self.GetChild('Slider').x(Attr.Pos[1] + scale(curoption, 1, (Attr.Values as LuaTable).length(), -Attr.Width * .4, Attr.Width * .4))
      }
    },
    UpdateCurrentOptionCommand: function (self: ActorFrame, param) {
      curoption = param.Val
      self.GetChild('Slider').stoptweening().decelerate(0.1).x(Attr.Pos[1] + scale(curoption, 1, (Attr.Values as LuaTable).length(), -Attr.Width * .4, Attr.Width * .4))
      self.GetChild<BitmapText>('CurrentVal').settext(Attr.Values[param.Val])
    }
  })

  let temporaryModule = LoadModule('UI/UI.ButtonBox.lua')(Attr.Width, Attr.Height)

  temporaryModule.Name = 'BG'

  t.set(t.length() + 1, temporaryModule)

  const sliderwidth = Attr.Width * .8
  const sliderheight = Attr.height * .35

  for (const [k, v] of pairs(Attr.Values)) {
    let temporaryModule2 = LoadModule('UI/UI.ClickArea.lua')({
      Width: (Attr.Width * .85) / (Attr.Values as LuaTable).length(),
      Height: sliderheight,
      Action: function (self: Quad) {
        self.GetParent().playcommand('UpdateCurrentOption', {
          Val: k
        })
        Attr.Save(Attr.Values, k)
      },
      RequireHold: true
    })

    temporaryModule.BeginCommand = function (self: Quad) {
      self.xy(Attr.Pos[1] + scale((k as number), 1, (Attr.Values as LuaTable).length(), -Attr.Width * .4, Attr.Width * .4), Attr.Pos[2] + (Attr.Height * .25))
    }

    t.set(t.length() + 1, temporaryModule2)
  }

  t.set(t.length() + 1, Def.Quad({
    Name: "BGSlider",
    InitCommand: function (self: Quad) {
      self.zoomto(sliderwidth, sliderheight * .1)
    }
  }))

  t.set(t.length() + 1, Def.Quad({
    Name: 'Slider',
    InitCommand: function (self: Quad) {
      self.zoomto(24, sliderheight)
    }
  }))

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'CurrentVal',
    Text: 'Summy',
    InitCommand: function (self: BitmapText) {
      self.halign(1)
    }
  }))
}