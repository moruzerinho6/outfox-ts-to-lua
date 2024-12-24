{
  const RightSideScreen = SCREEN_WIDTH * (IsUsingPortrait() ? 1 : 0.65);

  const ActorFrameArg = new LuaTable();
  ActorFrameArg.set("OnCommand", function (self) {
    self.MoreInfoLink = "https://outfox.wiki/dev/editor/";
  });

  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.BitmapText({
      Name: "Title",
      Font: "_plex bold",
      Text: THEME.GetString("ScreenEditHelp", "WelcomeTitle"),
      OnCommand: function (self: BitmapText) {
        self
          .align(0, 0)
          .wrapwidthpixels(SCREEN_WIDTH * 0.6)
          .zoom(0.8);
      },
    })
  );

  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.BitmapText({
      Name: "Description",
      Font: "Common Normal",
      Text: THEME.GetString("ScreenEditHelp", "WelcomeDesc"),
      OnCommand: function (self: BitmapText) {
        self
          .align(0, 0)
          .wrapwidthpixels(SCREEN_WIDTH * 0.6)
          .y(40);
      },
    })
  );

  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG("", "TitleMenuIcon/Editor"),
      OnCommand: function (self: Sprite) {
        self.xy(RightSideScreen * 0.5, 200).zoom(0.4);
      },
    })
  );

  ActorFrameArg.set(
    ActorFrameArg.length() + 1,
    Def.BitmapText({
      Name: "Description",
      Font: "Common Normal",
      Text: "That's an image :>",
      OnCommand: function (self: BitmapText) {
        self.xy(RightSideScreen * 0.5, 290).zoom(0.8);
      },
    })
  );

  const t = Def.ActorFrame(ActorFrameArg);

  return t;
}
