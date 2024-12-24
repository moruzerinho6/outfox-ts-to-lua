declare interface UIRadioList {
  Attr: AnyTable
  handler: ActorFrame
  isAbleToUse: boolean
  curChoice: number
  ToggleUse:  (this: UIRadioList, state: boolean) => void
  ShowPrompt: (this: UIRadioList) => void
  HidePrompt: (this: UIRadioList) => void
  LoadVal:    (this: UIRadioList) => void
  Create:     (this: UIRadioList) => ActorFrame
}

{
  const t = {
    Attr: null,
    handler: null,
    isAbleToUse: true,
    curChoice: 1,
    ToggleUse: function (this: UIRadioList, state: boolean) {
      this.isAbleToUse = state
    },
    ShowPrompt: function (this: UIRadioList) {
      this.handler.visible(true)
      this.ToggleUse(true)
    },
    HidePrompt: function (this: UIRadioList) {
      this.handler.visible(false)
      this.ToggleUse(false)
    },
    LoadVal: function (this: UIRadioList) {
      if (this.Attr.Load) {
        this.curChoice = this.Attr.Load(this.Attr.Choices)
      }
    },
    Create: function (this: UIRadioList) {
      const a: ActorFrame = Def.ActorFrame({
        InitCommand: function (self: ActorFrame) {
          this.handler = self
          self.visible(this.Attr.Visible || true)
        }
      })

      const transformCmd = this.Attr.TransformationCommand

      for (const [i,v] of ipairs(this.Attr.Choices)) {
        const actorFrameArg = new LuaTable()

        actorFrameArg.set('Name', 'Button' + (i as unknown as string))
        actorFrameArg.set('InitCommand', function (self: ActorFrame) {
          if (transformCmd) {
            transformCmd(self, i, (this.Attr.Choices as LuaTable).length())
          }
        })

        const subActorFrameArg = new LuaTable()
        subActorFrameArg.set('Name', 'Choice')
        subActorFrameArg.set('InitCommand', function (self: ActorFrame) {
          self.playcommand('UpdateChoice', { choice: this.curChoice })
        })
        subActorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
          Font: 'Common Normal',
          Name: 'Message',
          Text: (v as AnyTable).Message || 'No message!',
          InitCommand: function (self: BitmapText) {
            self.halign(0).x(-100)
          }
        }))

        let temporaryTable;

        if (this.Attr.RadioButton) {
          this.Attr.RadioButton.Name = 'Radio'
          this.Attr.RadioButton.InitCommand = function (self: Quad) {
            self.index = i
          }

          temporaryTable = this.Attr.RadioButton
        } else {
          temporaryTable = Def.Sprite({
            Name: 'Radio',
            Texture: THEME.GetPathG('', 'radio'),
            InitCommand: function (self: Sprite) {
              self.animate(0).zoom(0.5).x(100)
            },
            UpdateChoicesCommand: function (self: Sprite) {
              self.setstate(this.curChoice === i ? 1 : 0)
            }
          })
        }
        subActorFrameArg.set(subActorFrameArg.length() + 1, temporaryTable)
        actorFrameArg.set(actorFrameArg.length() + 1, Def.ActorFrame(subActorFrameArg))
        actorFrameArg.set(actorFrameArg.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
          Width: 40,
          Height: 40,
          Debug: true,
          Position: function (self: Quad) {
            const r = self.GetParent().GetChild('Choice').GetChild('Radio')
            self.zoomto(r.GetZoomedWidth(), r.GetZoomedHeight()).x(100)
          },
          ReturnAdjacentActorFrame: true,
          Action: function (self: Quad) {
            if (!this.isAbleToUse) {
              return
            }

            this.curChoice = i
            self.GetParent().playcommand('UpdateChoices', { choice: i })

            if (this.Attr.Save) {
              this.Attr.Save(i, this.Attr.Choices)
            }
          }
        }))
        a.set(a.length() + 1, Def.ActorFrame(actorFrameArg))
      }

      return a
    },
    __call: function (this, Attributes) {
      this.Attr = Attributes
      this.LoadVal()
      return this
    }
  }

  //@ts-ignore
  return setmetatable(t, t)
}