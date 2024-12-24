//@ts-ignore
return function (args) {
  const SearchBarBG: ButtonBoxModule = LoadModule('UI/UI.ButtonBox.lua')(args.Width, 42, 2, null, true, 'bar')

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('Name', 'GroupChooser')
  actorFrameArg.set('BeginSearchCommand', function (self: ActorFrame) {
    self.GetChild<ActorFrame>('Click').visible(false)
  })
  actorFrameArg.set('CurrentSongChangedCommand', function (self: ActorFrame) {
    const song = GAMESTATE.GetCurrentSong()

    self.GetChild<BitmapText>('Text').settext(song ? song.GetGroupName() : '')
  })
  actorFrameArg.set('OnCommand', function (self: ActorFrame) {
    const needsToShow = GAMESTATE.GetNumPlayersEnabled() === 1 ? 1 : 0
    self.finishtweening().addy(20).diffusealpha(0).easeoutexpo(0.5).diffusealpha(needsToShow).addy(-20)
  })
  actorFrameArg.set('OffCommand', function (self: ActorFrame) {
    self.stoptweening().easeinexpo(0.2).diffusealpha(0).addy(20)
  })
  actorFrameArg.set(actorFrameArg.length() + 1, SearchBarBG.Create())
  actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('Folder', 'Icon'),
    InitCommand: function (self: Sprite) {
      self.zoom(0.36).x(-args.Width * .5 + 30)
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Name: 'Text',
    InitCommand: function (self: BitmapText) {
      self.halign(0).x(-args.Width * .5 + 50).zoom(0.8).maxwidth(args.Width - 20)
    }
  }))

  const tempModule = LoadModule('UI/UI.ClickArea.lua')({
    Width: args.Width + 100,
    Height: 42,
    Cache: true,
    ReturnAdjacentActorFrame: true,
  })

  tempModule.Name = 'Click'
  actorFrameArg.set(actorFrameArg.length() + 1, tempModule)

  const t:ActorFrame = Def.ActorFrame(actorFrameArg)

  return t
}