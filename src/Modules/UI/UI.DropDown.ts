declare interface UIDropDown {
  width: number
  height: number
  xpos: number
  ypos: number
  List: LuaTable
  currentitem: number
  peritemaction: Function
  player: PlayerNumber
  handler: ActorFrame
  ListHandler: ActorFrame
  AllowInput: (this: UIDropDown, state: boolean) => void
  MoveOption: (this: UIDropDown, offset: number) => void
  OpenMenu: (this: UIDropDown, offset: number) => void
  CloseMenu: (this: UIDropDown) => void
  ConfirmChoice: (this: UIDropDown) => void
  IsOpen: (this: UIDropDown) => boolean
  Create: (this: UIDropDown) => ActorFrame
}

{
  let yspacing = 32
  let indexcur = 1
  let isOpen = false
  let allowInput = false
  let TEMPChosenOptionMouse = false
  let mettable = {
    width: 0,
    height: 0,
    xpos: 0,
    ypos: 0,
    List: new LuaTable(),
    currentitem: 1,
    peritemaction: null,
    player: null,
    handler: null,
    ListHandler: null,
    __call: function (this: UIDropDown, Attr: AnyTable) {
      this.width = Attr.Width || 200
      this.height = Attr.Height || 32
      this.xpos = Attr.XPos || 0
      this.ypos = Attr.YPos || 0
      this.List = Attr.List || {}
      this.currentitem = Attr.currentItem || 1
      this.peritemaction = Attr.perItemAction || null
      this.player = Attr.player || null
      return this
    },
    AllowInput: function (this: UIDropDown, state: boolean) {
      allowInput = state
      MESSAGEMAN.Broadcast('DropdownMenuStateChanged', {IsOpen: state})
    },
    MoveOption: function (this: UIDropDown, offset: number) {
      indexcur = indexcur + offset
      if (indexcur > (this.List as LuaTable).length()) {
        indexcur = 1
      }

      if (indexcur < 1) {
        indexcur = (this.List as LuaTable).length()
      }

      this.handler.GetChild('ChildrenList').playcommand('ShowMenu')
    },
    OpenMenu: function (this: UIDropDown, offset: number) {
      isOpen = true
      this.AllowInput(true)
      this.handler.GetChild('ChildrenList').playcommand('ShowMenu')
      MESSAGEMAN.Broadcast('DropdownMenuToggle', this)
    },
    CloseMenu: function (this: UIDropDown) {
      this.ListHandler.pos = 0
      this.ListHandler.playcommand('MoveArea', {loc: 0})

      isOpen = false
      this.AllowInput(false)
      this.handler.GetChild('ChildrenList').playcommand('ShowMenu')
    },
    ConfirmChoice: function (this: UIDropDown) {
      this.handler.playcommand('ConfirmSelection')

      this.ListHandler.pos = 0
      this.ListHandler.playcommand('MoveArea', { loc: 0 })

      isOpen = false
      this.AllowInput(false)
      this.handler.GetChild('ChildrenList').playcommand('ShowMenu')
    },
    IsOpen: function (this: UIDropDown) {
      return isOpen
    },
    Create: function (this: UIDropDown) {
      const t: ActorFrame = Def.ActorFrame({
        InitCommand: function (self: ActorFrame) {
          for (const [k, v] of pairs(self.GetChildren())) {
            (v as Actor).xy(this.xpos, this.ypos)
          }

          indexcur = this.currentitem(self, this.List, this.player)
          this.handler = self
        },
        ConfirmSelectionCommand: function (self: ActorFrame, param) {
          if (!this.IsOpen) {
            return;
          }

          self.GetChild('ChildrenList').playcommand('ShowMenu')
          self.GetChild('LabelText').settext(self.GetChild('ChildrenList').GetChild(indexcur).itemname)

          const curItem = self.GetChild('ChildrenList').GetChild('indexcur').GetChild('')

          if (curItem) {
            if (curItem.GetChild('Icon')) {
              self.GetChild<ActorProxy>('ObjectHolder').visible(true).SetTarget(curItem.GetChild('Icon'))
            }
            self.GetChild<BitmapText>('LabelText').x(this.xpos - this.width * .2).maxwidth(this.width * .6)
          } else {
            self.GetChild<ActorProxy>('ObjectHolder').visible(false)
            self.GetChild<BitmapText>('LabelText').x(this.xpos - this.width * .425).maxwidth(this.width * .6)
          }

          if (this.peritemaction) {
            this.peritemaction(self.GetChild('ChildrenList').GetChild(indexcur).GetChild('Click'), this.List, indexcur, this.player)
          }
        }
      })

      const maxypos = yspacing * this.List.length()
      const ActorFrameArg = new LuaTable()
      ActorFrameArg.set('Name', 'ChildrenList')
      ActorFrameArg.set('InitCommand', function (self: ActorFrame) {
        this.ListHandler = self
        this.pos = 0
        for (const [k,v] of pairs(this.List)) {
          self.GetChild((k as unknown as string)).y(this.height).diffusealpha(this.IsOpen() ? 1 : 0)
        }
      })
      ActorFrameArg.set('ShowMenuCommand', function (self: ActorFrame) {
        self.pos = this.List.length() > 20 ? yspacing * (indexcur-1) : 0

        const openset = this.IsOpen()

        self.GetParent().GetChild('BG').stoptweening()

        for (const [k,v] of pairs(this.List)) {
          self.GetChild((k as unknown as string)).stoptweening().easeoutquint(0.25).y(openset ? (8 + (yspacing * (k as unknown as number))) : this.height).diffusealpha(openset ? 1 : 0)
        }
        self.GetParent().GetChild('Click').eatinput = openset

        self.GetChild('BGPlane').stoptweening().easeoutquint(0.25).zoomy(openset ? (maxypos + yspacing) : 0)
        self.GetChild('BGPlane2').stoptweening().easeoutquint(0.25).zoomy(openset ? (maxypos + yspacing - 8) : 0)
        self.GetChild('Highlight').stoptweening().easeoutquint(0.25).diffusealpha(openset ? 0.5 : 0).y(-8 + (yspacing * (indexcur)))

        self.GetParent().GetChild('LabelText').finishtweening().easeoutquint(0.125).y(this.IsOpen() ? (this.ypos - self.pos) : this.ypos)
        self.GetParent().GetChild('ObjectHolder').finishtweening().easeoutquint(0.125).y(this.IsOpen() ? (this.ypos-self.pos) : this.ypos)
        self.GetParent().GetChild('BG').finishtweening().easeoutquint(0.125).y(this.IsOpen() ? (this.ypos - self.pos) : this.ypos)
        self.GetParent().GetChild('Overflow').finishtweening().easeoutquint(0.125).diffusealpha(this.IsOpen() ? 0 : 1)
        self.playcommand('MoveArea', { loc: 0 })
      })
      ActorFrameArg.set('MoveAreaCommand', function (self: ActorFrame, param) {
        if (!this.IsOpen()) {
          return;
        }

        if (this.List.length() < 18 || ((this.ypos + maxypos) < SCREEN_BOTTOM)) {
          return;
        }

        self.pos = self.pos + param.loc

        if (self.pos < 0) {
          self.pos = 0
        }

        if (self.pos > (maxypos - yspacing)) {
          self.pos = (maxypos - yspacing)
        }

        self.hurrytweening(0.75).decelerate(0.05).y(this.ypos - self.pos)
        self.GetParent().GetChild('LabelText').hurrytweening(0.75).easeoutquint(0.05).y(this.ypos - self.pos)
        self.GetParent().GetChild('ObjectHolder').hurrytweening(0.75).easeoutquint(0.05).y(this.ypos - self.pos)
      })
      ActorFrameArg.set('MouseWheeldownMessageCommand', function (self: ActorFrame) {
        self.playcommand('MoveArea', { loc: -20 })
      })
      ActorFrameArg.set('MouseWheelUpMessageCommand', function (self: ActorFrame) {
        self.playcommand('MoveArea', { loc: 20 })
      })
      ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Quad({
        Name: 'BGPlane',
        OnCommand: function (self: Quad) {
          self.zoomto(this.width - 8, 0).valign(0).diffuse(GameColor.Custom['MenuButtonBorder'])
        }
      }))
      ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Quad({
        Name: 'BGPlane2',
        OnCommand: function (self: Quad) {
          self.zoomto(this.width - 12, 0).y(4).valign(0).diffuse(ColorDarkTone(GameColor.Custom['MenuButtonGradient']))
        }
      }))
      ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Quad({
        Name: 'Highlight',
        OnCommand: function (self: Quad) {
          self.zoomto(this.width - 12, yspacing).valign(0).y(yspacing * (indexcur - 1)).diffusealpha(0)
        }
      }))
      const ListActorFrame: ActorFrame = Def.ActorFrame(ActorFrameArg)

      for (const [k,v] of pairs(this.List)) {
        let itemname;
        let itemicon;

        const temp: ActorFrame = Def.ActorFrame({
          Name: k,
          InitCommand: function (self: ActorFrame) {
            self.y(8 + (yspacing * (k as unknown as number)))
          }
        })

        if (type(v) === 'table') {
          itemname = v.Name || ''
          itemicon = v.Icon || null

          if (itemicon) {
            if (type(itemicon) !== 'table') {
              itemicon = Def.Sprite({
                Texture: itemicon
              })
            }
          }

          const tempObject: ActorFrame = Def.ActorFrame({})

          if (itemicon) {
            itemicon.Name = 'Icon'
            itemicon.OnCommand = function (self: Sprite) {
              self.zoom(LoadModule('lua.Resize.lua')(self.GetZoomedWidth(), self.GetZoomedHeight(), this.width, this.height - (v.Margin || 6))).x(-(this.width/2) + 32)
            }

            tempObject.set(tempObject.length() + 1, itemicon)
          }

          tempObject.set(tempObject.length() + 1, Def.BitmapText({
            Name: 'Text',
            Font: 'Common Normal',
            Text: itemname,
            InitCommand: function (self: BitmapText) {
              (self.halign(0).x(-(this.width/2) + 60) as BitmapText).maxwidth(this.width - 72)
            }
          }))

          temp.set(temp.length() + 1, tempObject)
        } else {
          itemname = v
          temp.set(temp.length() + 1, Def.BitmapText({
            Name: 'Text',
            Font: 'Common Normal',
            Text: itemname,
            InitCommand: function (self: BitmapText) {
              (self.halign(0).x(-(this.width/2) + 16)as BitmapText).maxwidth(this.width - 30)
            }
          }))
        }

        temp.set(temp.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
          Name: 'Click',
          Width: this.width,
          Height: yspacing - 2,
          Action: function (self: Quad) {
            if (!this.IsOpen()) {
              return;
            }

            TEMPChosenOptionMouse = true
            indexcur = k as number
            this.ConfirmChoice()
          }
        }))

        temp.set('OnCommand', function (self) {
          self.itemname = itemname
        })

        ListActorFrame.set(ListActorFrame.length() + 1, temp)
      }

      t.set(t.length() + 1, ListActorFrame)

      let temporaryModule = LoadModule('UI/UI.ButtonBox.lua')(this.width, this.height)
      temporaryModule.Name = 'BG'
      t.set(t.length() + 1, temporaryModule)

      let temporaryModule2 = LoadModule('UI/UI.ClickArea.lua')({
        Width: this.width,
        Height: this.height,
        Action: function (self: Quad) {
          if (this.IsOpen()) {
            return;
          }

          if (TEMPChosenOptionMouse) {
            TEMPChosenOptionMouse = false
            return
          }

          isOpen = !isOpen
          this.AllowInput(!allowInput)
          self.GetParent().GetChild('ChildrenList').playcommand('ShowMenu')
          MESSAGEMAN.Broadcast('DropdownMenuToggle', this)
        }
      })
      temporaryModule2.Name = 'Click'

      t.set(t.length() + 1, temporaryModule2)

      t.set(t.length() + 1, Def.BitmapText({
        Name: 'LabelText',
        Font: 'Common Normal',
        OnCommand: function (self: BitmapText) {
          let isTable = type(this.List[indexcur]) === 'table';
          (self.halign(0).x(this.xpos - this.width * .425) as BitmapText).maxwidth(this.width - self.GetParent().GetChild('Overflow').GetZoomedWidth() - 6)
          self.settext(isTable ? this.List[indexcur].Name : this.List[indexcur])

          if (self.GetParent().GetChild('ChildrenList').GetChild(indexcur).GetChild('')) {
            self.x(this.xpos - this.width *.2).maxwidth(this.width*.4)
          }
        }
      }))

      t.set(t.length() + 1, Def.ActorProxy({
        Name: 'ObjectHolder',
        OnCommand: function (self: ActorProxy) {
          self.x(this.xpos)
          const curItem = self.GetParent().GetChild('ChildrenList').GetChild(indexcur).GetChild('')

          if (curItem && curItem.GetChild('Icon')) {
            self.SetTarget(curItem.GetChild('Icon'))
          }
        }
      }))

      t.set(t.length() + 1, Def.Sprite({
        Name: 'Overflow',
        Texture: THEME.GetPathG('MenuIcon', 'dropdown'),
        OnCommand: function (self: Sprite) {
          self.halign(1).x(this.xpos + this.width * .45).zoom(0.25)
        }
      }))

      return t
    }
  }

  //@ts-ignore
  return setmetatable(mettable, mettable)
}