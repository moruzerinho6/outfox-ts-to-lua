{
  const RightSideScreen = SCREEN_WIDTH * (IsUsingPortrait() ? 1 : .65)
  const curNoteskin = GAMESTATE.GetPlayerState(GAMESTATE.GetMasterPlayerNumber()).GetPlayerOptions('ModsLevel_Preferred').NoteSkin()
  const Types = new LuaTable()
  Types.set(Types.length() + 1, 'Note')
  Types.set(Types.length() + 1, 'Mine')
  Types.set(Types.length() + 1, 'Lift')
  Types.set(Types.length() + 1, 'Fake')

  const ActorFrameArg = new LuaTable()

  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Title',
    Font: '_plex bold',
    Text: 'Note Types',
    OnCommand: function(self: BitmapText) {
      self.align(0,0).wrapwidthpixels(RightSideScreen).zoom(0.8)
    }
  }))

  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Description',
    Font: 'Common Normal',
    Text: THEME.GetString('NoteTypesHelp', 'Intro'),
    InitCommand: function(self: BitmapText) {
      self.align(0, 0).wrapwidthpixels(RightSideScreen).y(40)
    }
  }))

  for (const [i, v] of ipairs(Types)) {
    const ActorFrameType = new LuaTable()
    ActorFrameType.set('Name', 'Description')
    ActorFrameType.set('Font', 'Common Normal')
    ActorFrameType.set('Text', THEME.GetString('NoteTypesHelp', 'Intro'))
    ActorFrameType.set('InitCommand', function(self: ActorFrame) {
      self.xy(50, self.GetParent().GetChild('Description').GetZoomedHeight() + (100 * i))
    })
    ActorFrameType.set(ActorFrameType.length() + 1, NOTESKIN.LoadActorForNoteSkin('Left', 'Tap ' + v, curNoteskin))
    ActorFrameType.set(ActorFrameType.length() + 1, Def.BitmapText({
      Name: 'Description',
      Font: '_Bold',
      Text: v,
      OnCommand: function(self: BitmapText) {
        self.align(0, 0.5).wrapwidthpixels(SCREEN_WIDTH * .6).xy(50, 0).zoom(1.5)
      }
    }))
    ActorFrameType.set(ActorFrameType.length() + 1, Def.BitmapText({
      Name: 'Description',
      Font: 'Common Normal',
      Text: THEME.GetString('NoteTypesHelp', v),
      OnCommand: function(self: BitmapText) {
        self.align(0, 0.5).wrapwidthpixels(SCREEN_WIDTH * .6).xy(50, 40)
      }
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.ActorFrame(ActorFrameType))
  }

  const t = Def.ActorFrame(ActorFrameArg)
  return t
}