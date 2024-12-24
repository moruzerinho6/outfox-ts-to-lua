declare interface TextFadeSlide {
  Font: string;
  Width: number;
  Height: number;
  Text: string;
  SpeedFactor: number;
  SleepBeforeStart: number;
  OverflowSpacing: number;
  SlideFade: number;
  SprHandler: Sprite;
  handler: BitmapText;
  Debug: boolean;
  ActorFrame: ActorFrame;
  sechandler: BitmapText;
  SlideLength: number;
  HorizAlignVal: number;
  UseAbsZoom: number;
  AbsZoom: (this: TextFadeSlide) => number;
  SetText: (this: TextFadeSlide, newStr: string, altText?: string) => void;
  SetWidth: (this: TextFadeSlide, newWidth: number) => void;
  ApplyToText: (this: TextFadeSlide, func: Function) => void;
  GetTextSlideLength: (this: TextFadeSlide) => number;
  IsTextScrollable: (this: TextFadeSlide) => boolean;
  IsOverflowing: (this: TextFadeSlide, text: BitmapText) => boolean;
  Create: (this: TextFadeSlide) => ActorFrame;
}

{
  const commands = new LuaTable();

  commands.set("Font", "Common Bold");
  commands.set("Width", 100);
  commands.set("Height", 32);
  commands.set("Text", "");
  commands.set("SpeedFactor", 0.2);
  commands.set("SleepBeforeStart", 2);
  commands.set("OverflowSpacing", 32);
  commands.set("SideFade", 0.02);
  commands.set("SprHandler", null);
  commands.set("handler", null);
  commands.set("Debug", false);
  commands.set("ActorFrame", null);
  commands.set("sechandler", null);
  commands.set("SlideLength", 0);
  commands.set("HorizAlignVal", 0.5);
  commands.set("UseAbsZoom", null);
  commands.set("AbsZoom", function (this) {
    return this.UseAbsZoom || this.Width * 2;
  });
  commands.set(
    "SetText",
    function (this: TextFadeSlide, newStr: string, altText: string) {
      if (newStr === this.handler.GetText()) {
        // BitmapText
        return;
      }

      this.Text = newStr;
      this.ActorFrame.playcommand("UpdateText", {
        Text: newStr,
        AltText: altText,
      });
      this.SprHandler.playcommand("CheckSizeForSideFades");
    }
  );
  commands.set("SetWidth", function (this: TextFadeSlide, newWidth: number) {
    this.Width = newWidth;
    this.ActorFrame.playcommand("UpdateText", { Text: this.handler.GetText() });
    this.SprHandler.playcommand("CheckSizeForSideFades");
  });
  commands.set("ApplyToText", function (this: TextFadeSlide, func: Function) {
    func(this.handler);
    func(this.sechandler);
  });
  commands.set("GetTextSlideLength", function (this: TextFadeSlide) {
    return this.SlideLength;
  });
  commands.set("IsTextScrollable", function (this: TextFadeSlide) {
    return this.IsOverflowing(this.ActorFrame.GetChild("Main"));
  });
  commands.set(
    "IsOverFlowing",
    function (this: TextFadeSlide, text: BitmapText) {
      return text.GetZoomedWidth() > this.AbsZoom();
    }
  );
  commands.set("Create", function (this: TextFadeSlide) {
    const ActorFrameTextureArg = new LuaTable();
    ActorFrameTextureArg.set("Name", "AFT");
    ActorFrameTextureArg.set("InitCommand", function (self: ActorFrameTexture) {
      (
        self
          .SetWidth(this.Width * 2)
          .SetHeight(this.Height * 2) as ActorFrameTexture
      )
        .EnableAlphaBuffer(!this.Debug)
        .Create();
    });
    ActorFrameTextureArg.set(
      ActorFrameTextureArg.length() + 1,
      Def.ActorFrame({
        Name: "TextContainer",
        InitCommand: function (self: ActorFrame) {
          this.ActorFrame = self;
          self.GetChild("Main").x(2);
          self.RunCommandsRecursively(function (self: ActorFrame) {
            if (self.settext) {
              self
                .y(this.Height * 2 * 0.5)
                .zoom(2)
                .halign(0);
            }
          });
          self
            .GetChild("Second")
            .x(self.GetChild("Main").GetZoomedWidth() + this.OverflowSpacing);
        },
      })
    );
    ActorFrameTextureArg.set(
      "UpdateTextCommand",
      function (self: ActorFrame, params: AnyTable) {
        self.finishtweening().x(2);
        self
          .GetChild<BitmapText>("Main")
          .settext(params.Text, params.AltText || params.Text);
        self
          .GetChild<BitmapText>("Second")
          .settext(params.Text, params.AltText || params.Text)
          .x(self.GetChild("Main").GetZoomedWidth() + this.OverflowSpacing);

        const IsOverflowing = this.IsOverflowing(self.GetChild("Main"));
        self.GetChild("Second").visible(IsOverflowing);

        if (IsOverflowing) {
          self.playcommand("BeginSlide");
        }
      }
    );
    ActorFrameTextureArg.set("BeginSlideCommand", function (self: ActorFrame) {
      const slideLength =
        string.len(self.GetChild<BitmapText>("Main").GetText()) *
        this.SpeedFactor;
      // const returnSpeedRate = clamp(slideLength * .25, 2, slideLength) // Lmao this is literally not used. ~ zerinho6
      this.SlideLength = slideLength + this.SleepBeforeStart;
      self
        .sleep(this.SleepBeforeStart)
        .linear(slideLength)
        .x(
          -self.GetChild<BitmapText>("Main").GetZoomedWidth() -
            (this.OverflowSpacing - 2)
        )
        .sleep(0)
        .x(2)
        .queuecommand("BeginSlide");
    });
    ActorFrameTextureArg.set("OffCommand", function (self: ActorFrame) {
      self.finishtweening();
    });
    ActorFrameTextureArg.set("CancelCommand", function (self: ActorFrame) {
      self.finishtweening();
    });
    ActorFrameTextureArg.set(
      ActorFrameTextureArg.length() + 1,
      Def.BitmapText({
        Font: this.Font,
        Text: this.Text,
        Name: "Main",
        InitCommand: function (self: BitmapText) {
          this.handler = self;
        },
      })
    );
    ActorFrameTextureArg.set(
      ActorFrameTextureArg.length() + 1,
      Def.BitmapText({
        Font: this.Font,
        Text: this.Text,
        Name: "Second",
        InitCommand: function (self: BitmapText) {
          this.sechandler = self;
        },
      })
    );

    const AFT: ActorFrameTexture = Def.ActorFrameTexture(ActorFrameTextureArg);
    const t: ActorFrame = Def.ActorFrame({});

    t.set(t.length() + 1, AFT);
    t.set(
      t.length() + 1,
      Def.Sprite({
        Name: "Sprite",
        InitCommand: function (self: Sprite) {
          this.SprHandler = self;
        },
        OnCommand: function (self: Sprite) {
          self
            .SetTexture(
              self.GetParent<ActorFrame>().GetChild<Sprite>("AFT").GetTexture()
            )
            .zoom(0.5)
            .halign(this.HorizAlignVal);
        },
        CheckSizeForSidesCommand: function (self: Sprite) {
          let side = 0;

          if (this.handler.GetZoomedWidth() > this.Width * 2) {
            side = this.SideFade;
          }
          self.fadeleft(side).faderight(side);
          self.cropright(1 - 0.9);
        },
      })
    );

    return t;
  });

  const secondTable = new LuaTable();
  secondTable.set("__call", function (this: TextFadeSlide, Attr: AnyTable) {
    this.Text = Attr.Text || "";
    this.Font = Attr.Font || "Common Bold";
    this.Width = Attr.Width || 100;
    this.Height = Attr.Height || 32;
    this.SpeedFactor = Attr.SpeedFactor || 0.2;
    this.SleepBeforeStart = Attr.SleepBeforeStart || 2;
    this.OverflowSpacing = Attr.OverflowSpacing || 32;
    this.SlideFade = Attr.Fade || 0.02;
    this.UseAbsZoom = Attr.AbsZoom || null;
    this.HorizAlignVal = Attr.HorizAlign || 0.5;
    this.Debug = Attr.Debug || false;
    return this;
  });

  // @ts-ignore
  return setmetatable(commands, secondTable);
}
