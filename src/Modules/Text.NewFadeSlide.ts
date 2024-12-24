declare interface TextNewFadeSlide {
  Height: number
  ActorFrame: ActorFrame
  AftContainer: ActorFrameTexture
  Name: string
  Font: string
  StartLeft: boolean
  Width: number
  SpeedFactor: number
  SleepBeforeStart: number
  GapBetweenText: number
  Text?: string
  IsTextScrollable: (this: TextNewFadeSlide) => boolean
  SetText: (this: TextNewFadeSlide, newStr: string, altText: string) => void
  SetWidth: (this: TextNewFadeSlide, newStr: string, altText: string) => void
  Create: (this: TextNewFadeSlide) => ActorFrame
}

{
  let xPosNow = 0;
  let waitTimeNow = 0;
  let isScrollable = false;

  const commands = new LuaTable();
  commands.set("Height", 42);
  commands.set("ActorFrame", null);
  commands.set("AftContainer", null);
  commands.set("StartLeft", false);
  commands.set("Width", 300);
  commands.set("SpeedFactor", 200);
  commands.set("SleepBeforeStart", 1);
  commands.set("GapBetweenText", 20);
  commands.set("IsTextScrollable", function (this) {
    return isScrollable;
  });
  commands.set("SetText", function (this: TextNewFadeSlide, newStr: string, altText: string) {
    if (
      newStr ===
      this.AftContainer.GetChild("TextContainer")
        .GetChild<BitmapText>("Main")
        .GetText()
    ) {
      return;
    }
    this.Text = newStr;
    this.ActorFrame.playcommand("UpdateText", {
      Text: newStr,
      AltText: altText,
    });
  });
  commands.set("SetWidth", function (this: TextNewFadeSlide, newWidth: number) {
    this.Width = newWidth;
    this.ActorFrame.playcommand("Change");
    this.ActorFrame.playcommand("UpdateText", {
      Text: null,
      AltText: null,
    });
  });
  commands.set('Create', function (this: TextNewFadeSlide) {
    const ActorFrameArg = new LuaTable()
    ActorFrameArg.set('InitCommand', function (self: ActorFrame) {
      this.ActorFrame = self
    })
    ActorFrameArg.set('UpdateTextCommand', function(this: TextNewFadeSlide, self: ActorFrame, params: AnyTable) {
      const ctn = this.AftContainer.GetChild<ActorFrame>('TextContainer').GetChildren()

      if (params.Text) {
        (ctn.Main as BitmapText).settext(params.Text, params.AltText || '').x(2);
        (ctn.Second as BitmapText).settext(params.Text, params.AltText || '').visible(false)
      }
      isScrollable = (ctn.Main as BitmapText).GetZoomedWidth() > this.Width
      xPosNow = (ctn.Main as BitmapText).GetZoomedWidth() + this.GapBetweenText;

      (ctn.Second as BitmapText).x((ctn.Main as BitmapText).GetZoomedWidth() + this.GapBetweenText).visible(isScrollable)

      if ((ctn.Main as BitmapText).GetZoomedWidth() > this.Width) {
        self.GetChild('Render').fadeleft(0.02).faderight(0.02)
      } else {
        self.GetChild('Render').fadeleft(0).faderight(0)
      }

      this.AftContainer.playcommand('AttachUpdate')
    })

    const t: ActorFrame = Def.ActorFrame(ActorFrameArg)

    const font = 'Common Normal'
    const text = 'Connected to OutFox Online.'
    const xoffset = this.StartLeft ? 0 : SCREEN_CENTER_X - this.Width * .5

    const ScrollerUpdate = (self: ActorFrame, delta: number) => {
      const widthItem = self.GetChild('TextContainer').GetChild('Main').GetZoomedWidth()

      if (widthItem < this.Width) {
        self.GetChild('TextContainer').x(xoffset)
        self.GetChild('TextContainer').GetChild('Second').visible(false)
        self.playcommand('DetachUpdate')
        isScrollable = false
        return;
      }

      isScrollable = true

      if (xPosNow >= widthItem + this.GapBetweenText) {
        waitTimeNow = waitTimeNow - delta
        
        if (waitTimeNow > 0) {
          return
        }

        xPosNow = 0
        waitTimeNow = this.SleepBeforeStart
        MESSAGEMAN.Broadcast('FadeSlideTextReset', {Name: this.Name})
      }
      xPosNow = xPosNow + (delta * this.SpeedFactor)
      self.GetChild('TextContainer').x(xoffset - xPosNow)
    }

    const ActorFrameTextureArg = new LuaTable()
    ActorFrameTextureArg.set('Name', 'AFT')
    ActorFrameTextureArg.set('InitCommand', function (self: ActorFrameTexture) {
      this.AftContainer = self;
      (self.SetWidth(SCREEN_WIDTH).SetHeight(this.Height) as ActorFrameTexture).EnableAlphaBuffer(true).Create()
      self.SetUpdateFunction(ScrollerUpdate)
    })
    ActorFrameTextureArg.set('AttachUpdateCommand', function (self: ActorFrameTexture) {
      self.SetUpdateFunction(ScrollerUpdate)
    })
    ActorFrameTextureArg.set('DetachUpdateCommand', function (self: ActorFrameTexture) {
      self.SetUpdateFunction(null)
    })

    const ActorFrameTextureSubActorFrame = new LuaTable()

    ActorFrameTextureSubActorFrame.set('Name', 'TextContainer')
    ActorFrameTextureSubActorFrame.set('InitCommand', function (self: ActorFrame) {
      self.GetChild('Main').x(2)
      self.RunCommandsRecursively(function (self: BitmapText) {
        if (self.settext) {
          self.y(this.Height * .5).zoom(2).halign(0).shadowlength(4)
        }
      })
      self.playcommand('AdjustTextPosition')
    })
    ActorFrameTextureSubActorFrame.set('AdjustTextPositionCommand', function (self: ActorFrame) {
      self.GetChild('Second').x(self.GetChild('Main').GetZoomedWidth() + this.GapBetweenText)
    })
    ActorFrameTextureSubActorFrame.set(ActorFrameTextureSubActorFrame.length() + 1, Def.BitmapText({
      Font: this.Font,
      Text: text,
      Name: 'Main'
    }))
    ActorFrameTextureSubActorFrame.set(ActorFrameTextureSubActorFrame.length() + 1, Def.BitmapText({
      Font: this.Font,
      Text: text,
      Name: 'Second'
    }))

    ActorFrameTextureArg.set(ActorFrameTextureArg.length() + 1, Def.ActorFrame(ActorFrameTextureSubActorFrame))
    t.set(t.length() + 1, Def.ActorFrameTexture(ActorFrameTextureArg))
    t.set(t.length() + 1, Def.Sprite({
      Name: 'Render',
      InitCommand: function (self: Sprite) {

      },
      OnCommand: function (self: Sprite) {
        self.SetTexture(self.GetParent().GetChild<ActorFrameTexture>('AFT').GetTexture()).playcommand('Change')
      },
      ChangeCommand: function(self: Sprite) {
        self.stoptweening().easeoutexpo(0.2)

        if (this.StartLeft) {
          self.cropright(1 - (this.Width / SCREEN_WIDTH)).cropleft(0)
        } else {
          self.cropleft(0.5 - ((this.Width/SCREEN_WIDTH) * .5)).cropright(0.5 - ( (this.Width / SCREEN_WIDTH)*.5))
        }
      }
    }))

    return t
  })

  // @ts-expect-error
  return setmetatable(commands, {
    // @ts-ignore
    __call: function (this: TextNewFadeSlide, Attr) {
      this.Width = Attr.Width || 300
      this.SpeedFactor = Attr.SpeedFactor || 100
      this.SleepBeforeStart = Attr.SleepBeforeStart || 1
      this.GapBetweenText = Attr.GapBetweenText || 20
      this.Font = Attr.Font || 'Common Normal'
      this.StartLeft = Attr.StartLeft || false
      this.Name = Attr.Name || 'FadeSlide'
  
      waitTimeNow = this.SleepBeforeStart
      return this
    }
  })
}