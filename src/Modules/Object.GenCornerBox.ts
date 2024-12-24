return function (Options) {
  const ActorFrameArg = new LuaTable();
  // TODO: Download a version which actually works
  ActorFrameArg.set("InitCommand", function (this: ActorFrame) {
    this.SetHeight(Options.Height).SetWidth(Options.Width);

    this
      .GetChildAt(1)
      .y(-Options.Height * .5)
      .valign(1)
      .halign(1)
      .x(-Options.Width * .5);
    this
      .GetChildAt(2)
      .y(-Options.Height * .5)
      .valign(1)
      .zoomtowidth(Options.Width);
    this
      .GetChildAt(3)
      .y(-Options.Height * .5)
      .valign(1)
      .halign(1)
      .rotationy(180)
      .x(Options.Width * .5);

    this
      .GetChildAt(4)
      .zoomtoheight(Options.Height)
      .halign(1)
      .x(-Options.Width * .5);
    this
      .GetChildAt(5)
      .zoomto(Options.Width, Options.Height)
      .diffuse(color("#464646"));
    this
      .GetChildAt(6)
      .zoomtoheight(Options.Height)
      .rotationy(180)
      .halign(1)
      .x(Options.Width * .5);

    this
      .GetChildAt(7)
      .y(Options.Height * .5)
      .rotationx(180)
      .valign(1)
      .halign(1)
      .x(-Options.Width * .5);
    this
      .GetChildAt(8)
      .y(Options.Height * 0.5)
      .rotationx(180)
      .valign(1)
      .zoomtowidth(Options.Width);
    this
      .GetChildAt(9)
      .y(Options.Height * .5)
      .rotationx(180)
      .valign(1)
      .halign(1)
      .rotationy(180)
      .x(Options.Width * .5);
  });

  // Top Left
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG(
        "_tex/" + ((Options.Corners as LuaTable).get(1) ? "Diagonal" : "Box"),
        "Corner"
      ),
    })
  );

  // Top Middle
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG("_tex/Box", "Fill"),
    })
  );

  // Top Right
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG(
        "_tex/" + ((Options.Corners as LuaTable).get(2) ? "Diagonal" : "Box"),
        "Corner"
      ),
    })
  );

  // Middle Left
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG("_tex/Box", "Side"),
    })
  );

  // Middle Middle
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Quad({}));

  // Middle Right
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG("_tex/Box", "Side"),
    })
  );

  // Bottom Left
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG(
        "_tex/" + ((Options.Corners as LuaTable).get(3) ? "Diagonal" : "Box"),
        "Corner"
      ),
    })
  );

  // Bottom Middle
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG("_tex/Box", "Fill"),
    })
  );

  // Bottom Right
  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG(
        "_tex/" + ((Options.Corners as LuaTable).get(4) ? "Diagonal" : "Box"),
        "Corner"
      ),
    })
  );
  return Def.ActorFrame(ActorFrameArg);
};
