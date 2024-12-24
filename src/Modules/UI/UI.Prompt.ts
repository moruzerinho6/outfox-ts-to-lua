declare interface UIPrompt {
  Attr: AnyTable
  handler: ActorFrame
  isAbleToUse: boolean
  ToggleUse:  (this: UIPrompt, state: boolean) => void
  ShowPrompt: (this: UIPrompt) => void
  HidePrompt: (this: UIPrompt) => void
  Create:     (this: UIPrompt) => ActorFrame
}

{
  const t = {
    Attr: null,
    handler: null,
    isAbleToUse: true,
    ToggleUse: function (this: UIPrompt, state: boolean) {
      this.isAbleToUse = state
    },
    ShowPrompt: function (this: UIPrompt) {
      this.handler.visible(true)
      this.ToggleUse(true)
    },
    HidePrompt: function (this: UIPrompt) {
      this.handler.visible(false)
      this.ToggleUse(false)
    },
    Create: function (this: UIPrompt) {
      const a: ActorFrame = Def.ActorFrame({
        InitCommand: function (self: ActorFrame) {
          this.handler = self
          self.visible(this.Attr.Visible)
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

        let temporaryTable = (v as AnyTable).Actors || Def.ActorFrame([
          Def.Sprite({
            Name: 'BG',
            Texture: THEME.GetPathG('ScreenMenu small button', 'base'),
            OnCommand: function (self: Sprite) {
              self.zoom(1.4).diffuse(color('#113472'))
            }
          }),
          Def.BitmapText({
            Font: 'Common Normal',
            Name: 'Message',
            Text: (v as AnyTable).Message || 'No message!'
          })
        ])

        actorFrameArg.set(actorFrameArg.length() + 1, temporaryTable)

        actorFrameArg.set(actorFrameArg.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
          Width: 340,
          Height: 60,
          ReturnAdjacentActorFrame: true,
          Action: function (self: Quad) {
            if (!this.isAbleTouse) {
              return;
            }

            if ((v as AnyTable).Action) {
              const res = (v as AnyTable).Action(self)

              if (res) {
                this.HidePrompt()
              }
            }
          }
        }))
        a.set(a.length() + 1, Def.ActorFrame(actorFrameArg))
      }

      if (this.Attr.Question) {
        a.set(a.length() + 1, Def.BitmapText({
          Font: 'Common Normal',
          Text: this.Attr.Question,
          InitCommand: function (self: BitmapText) {
            self.xy(SCREEN_CENTER_X, 200)
          }
        }))

        return a
      }
    },
    __call: function (this: UIPrompt, Attributes) {
      this.Attr = Attributes
      return this
    }
  }

  //@ts-ignore
  return setmetatable(t, t)
}