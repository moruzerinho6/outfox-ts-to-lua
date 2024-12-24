// @ts-ignore
return function (args) {
  const SearchBarBG: ButtonBoxModule = LoadModule('UI/UI.ButtonBox.lua')(args.Width, 42, 2, null, true)

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('Name', 'SortingMethodsInsideFolder')
  actorFrameArg.set('BeginCommand', function (self: ActorFrame) {
    self.addx(-20).diffusealpha(0).easeoutexpo(0.5).diffusealpha(1).addx(20)
  })
  actorFrameArg.set('OffCommand', function (self: ActorFrame) {
    self.stoptweening().easeinexpo(0.2).diffusealpha(0).addx(20)
  })
  actorFrameArg.set('UpdateSongSortCommand', function (self: ActorFrame, params) {
    self.GetChild<BitmapText>('Name').settext(THEME.GetString('SortingModes', params.Mode))
  })
  actorFrameArg.set(actorFrameArg.length() + 1, SearchBarBG.Create())
  actorFrameArg.set(actorFrameArg.length() + 1, Def.Text({
    Font: THEME.GetPathF('', 'IBMPlexSans-Bold.ttf'),
    Size: 40,
    Text: THEME.GetString('LuaSelectMusic', 'SortContentFoldersBy'),
    InitCommand: function (self: Text) {
      self.xy(-args.Width * .5 + 10, -6).zoom(0.26).skewx(-0.2).diffusealpha(0.8).MainActor().halign(0).zoomtowidth(480)
      self.StrokeActor().visible(false)
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Name: 'Name',
    InitCommand: function (self: BitmapText) {
      ((self.halign(0) as BitmapText).uppercase(true).y(6).zoom(0.8) as BitmapText).maxwidth(760).x(-args.Width * .5 + 10)
    }
  }))

  const tempModule = LoadModule('UI/UI.ClickArea.lua')({
    Width: args.Width,
    Height: 42,
    Cache: true,
    Action: function (self: ActorFrame) {
      args.Action()
    }
  })
  actorFrameArg.set(actorFrameArg.length() + 1, tempModule)
  const t: ActorFrame = Def.ActorFrame(actorFrameArg)
}