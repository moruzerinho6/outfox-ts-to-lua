{
  const RightSideScreen = SCREEN_WIDTH * (IsUsingPortrait() ? 1 : .65)
  const curNoteskin = GAMESTATE.GetPlayerState(GAMESTATE.GetMasterPlayerNumber()).GetPlayerOptions('ModsLevel_Preferred').NoteSkin()
  const ActorFrameArg = new LuaTable()

  ActorFrameArg.set('OnCommand', function(self: ActorFrame) {
    self.SetHeight(300)
    self.MoreInfoLink = 'https://outfox.wiki/dev/editor/'
  })

  const NumColumns = GAMESTATE.GetCurrentStyle().ColumnsPerPlayer()

  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Title',
    Font: '_plex bold',
    Text: 'Placing Notes',
    OnCommand: function(self: BitmapText) {
      self.align(0,0).wrapwidthpixels(SCREEN_WIDTH * .6).zoom(0.8)
    }
  }))

  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Description',
    Font: 'Common Normal',
    Text: string.format(THEME.GetString('PlacingNotes', 'SingleNote'), NumColumns),
    OnCommand: function(self: BitmapText) {
      self.align(0,0).wrapwidthpixels( RightSideScreen - 40).y(40)
    }
  }))

  const ActorFrameChild1Arg = new LuaTable()
  ActorFrameChild1Arg.set('OnCommand', function (self: ActorFrame) {
    self.playcommand('Animation')
  })

  ActorFrameChild1Arg.set('InitCommand', function (self: ActorFrame) {
    self.xy(RightSideScreen * .5 - 90, 130)
  })

  ActorFrameChild1Arg.set('AnimationCommand', function(self: ActorFrame) {
    self.GetChild('Note').visible(!self.GetChild('Note').GetVisible())
    self.GetChild('Button').zoom(0.8).sleep(0.1).easeoutquint(0.6).zoom(1)

    self.sleep(3).queuecommand('Animation')
  })

  const noteReceptor = NOTESKIN.LoadActorForNoteSkin('Left', 'Receptor', curNoteskin)
  noteReceptor.Name = 'Receptor'

  const noteTap = NOTESKIN.LoadActorForNoteSkin('Left', 'Tap Note', curNoteskin)
  noteTap.Name = 'Note'

  ActorFrameChild1Arg.set(ActorFrameChild1Arg.length() + 1, noteReceptor)
  ActorFrameChild1Arg.set(ActorFrameChild1Arg.length() + 1, noteTap)

  const ActorFrameChild2Arg = new LuaTable()
  ActorFrameChild2Arg.set('Name', 'Button')
  ActorFrameChild2Arg.set('InitCommand', function(self: ActorFrame) {
    self.GetChildAt(1).animate(false).zoom(0.5)
    self.x(80)
  })
  ActorFrameChild2Arg.set(ActorFrameChild2Arg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'check')
  }))
  ActorFrameChild2Arg.set(ActorFrameChild2Arg.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Text: 1
  }))

  ActorFrameChild1Arg.set(ActorFrameChild1Arg.length() + 1, Def.ActorFrame(ActorFrameChild2Arg))
  
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.ActorFrame(ActorFrameChild1Arg))
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Description',
    Font: "Common Normal",
    Text: string.format(THEME.GetString('PlacingNotes', 'Hold'), NumColumns),
    OnCommand: function(self: BitmapText) {
      self.align(0, 0).wrapwidthpixels(RightSideScreen - 40).y(180)
    }
  }))

  const ActorFrameChild3Arg = new LuaTable()
  ActorFrameChild3Arg.set('OnCommand', function (self: ActorFrame) {
    self.playcommand('Animation')
  })

  interface NoteSkinObject {
    Head:     Sprite
    Button:   Sprite
    Body:     Sprite
    Tail:     Sprite
    Receptor: Sprite
    Button2:  Sprite
  }

  ActorFrameChild3Arg.set('InitCommand', function (self: ActorFrame) {
    self.xy(RightSideScreen * .2, 300 + self.GetParent().GetChild('Description').GetHeight() + 20)

    
    const c: NoteSkinObject = self.GetChildren()
    const bodyScale = c.Body.GetHeight() / 128;

    (c.Body.y(0).setsize(64, 128).valign(0) as Sprite).customtexturerect(0, 3.5, 1, bodyScale / 4)
    c.Tail.y(c.Body.GetHeight()).valign(0)
  })

  ActorFrameChild3Arg.set('AnimationCommand', function(self: ActorFrame) {
    const c: NoteSkinObject = self.GetChildren()

    c.Head.visible(true)
    c.Button.easeoutquint(0.6).zoom(0.8)

    c.Body.visible(!c.Body.GetVisible())
    c.Tail.visible(c.Body.GetVisible())
    c.Receptor.y(c.Body.GetVisible() ? 128 : 0)

    self.sleep(1).queuecommand('Animation2')
  })

  ActorFrameChild3Arg.set('Animation2Command', function(self: ActorFrame) {
    const c: NoteSkinObject = self.GetChildren()

    c.Button2.zoom(0.8).sleep(0.1).easeoutquint(0.6).zoom(1)
    c.Button.sleep(0.3).easeoutquint(0.6).zoom(1)
    c.Body.visible(!c.Body.GetVisible())
    c.Tail.visible(c.Body.GetVisible())
    c.Receptor.y(c.Body.GetVisible() ? 128 : 0)
    
    self.sleep(2).queuecommand('Animation')
  })

  const leftReceptor = NOTESKIN.LoadActorForNoteSkin('Left', 'Receptor', curNoteskin)
  leftReceptor.Name = 'Receptor'

  const leftHoldBodyActive = NOTESKIN.LoadActorForNoteSkin('Left', 'Hold Body Active', curNoteskin)
  leftHoldBodyActive.Name = 'Body'

  const leftHoldHeadActive = NOTESKIN.LoadActorForNoteSkin('Left', 'Hold Head Active', curNoteskin)
  leftHoldHeadActive.Name = 'Head'

  const leftHoldBottomcapActive = NOTESKIN.LoadActorForNoteSkin('Left', 'Hold Bottomcap Active', curNoteskin)
  leftHoldBottomcapActive.Name = 'Tail'

  ActorFrameChild3Arg.set(ActorFrameChild3Arg.length() + 1, leftReceptor)
  ActorFrameChild3Arg.set(ActorFrameChild3Arg.length() + 1, leftHoldBodyActive)
  ActorFrameChild3Arg.set(ActorFrameChild3Arg.length() + 1, leftHoldHeadActive)
  ActorFrameChild3Arg.set(ActorFrameChild3Arg.length() + 1, leftHoldBottomcapActive)

  const ActorFrameChild3Child1 = new LuaTable()
  ActorFrameChild3Child1.set('Name', 'Button')
  ActorFrameChild3Child1.set('InitCommand', function(self: ActorFrame) {
    self.GetChildAt(1).animate(false).zoom(0.5)
    self.x(80)
  })
  ActorFrameChild3Child1.set(ActorFrameChild3Child1.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'check')
  }))
  ActorFrameChild3Child1.set(ActorFrameChild3Child1.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Text: 1
  }))

  ActorFrameChild3Arg.set(ActorFrameChild3Arg.length() + 1, Def.ActorFrame(ActorFrameChild3Child1))

  const ActorFrameChild3Child2 = new LuaTable()
  ActorFrameChild3Child2.set('Name', 'Button2')
  ActorFrameChild3Child2.set('InitCommand', function(self: ActorFrame) {
    self.x(130)
    self.GetChildAt(1).animate(false).zoom(0.5)
    self.GetChildAt(2).rotationz(-90)
  })
  ActorFrameChild3Child2.set(ActorFrameChild3Child2.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'check')
  }))
  ActorFrameChild3Child2.set(ActorFrameChild3Child2.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'UI/back')
  }))

  ActorFrameChild3Arg.set(ActorFrameChild3Arg.length() + 1, Def.ActorFrame(ActorFrameChild3Child2))
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.ActorFrame(ActorFrameChild3Arg))
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Description',
    Font: 'Common Normal',
    Text: string.format(THEME.GetString('PlacingNotes', 'AddingRollsNote'), NumColumns),
    OnCommand: function(self: BitmapText) {
      self.wrapwidthpixels(300).xy(RightSideScreen * .5, 370 + self.GetParent().GetChild('Description').GetHeight() - 20).zoom(0.8)
    }
  }))

  const ActorFrameChild4Arg = new LuaTable()

  ActorFrameChild4Arg.set('OnCommand', function(self: ActorFrame) {
    self.playcommand('Animation')
  })

  ActorFrameChild4Arg.set('InitCommand', function(self: ActorFrame) {
    self.xy(RightSideScreen * .8, 300 + self.GetParent().GetChild('Description').GetHeight() + 20)

    const c: NoteSkinObject = self.GetChildren()

    const bodyScale = c.Body.GetHeight() / 128;

    (c.Body.y(0).setsize(64, 128).valign(0) as Sprite).customtexturerect(0, 3.5, 1, bodyScale / 4)
    c.Tail.y(c.Body.GetHeight()).valign(0)
  })

  ActorFrameChild4Arg.set('AnimationCommand', function(self: ActorFrame) {
    const c: NoteSkinObject = self.GetChildren()

    c.Head.visible(true)
    c.Body.visible(!c.Body.GetVisible())
    c.Tail.visible(c.Body.GetVisible())
    c.Receptor.y(c.Body.GetVisible() ? 128 : 0)

    self.sleep(1).queuecommand('Animation2')
  })

  ActorFrameChild4Arg.set('Animation2Command', function(self: ActorFrame) {
    const c: NoteSkinObject = self.GetChildren()

    c.Body.visible(!c.Body.GetVisible())
    c.Tail.visible(c.Body.GetVisible())
    c.Receptor.y(c.Body.GetVisible() ? 128 : 0)

    self.sleep(2).queuecommand('Animation')
  })

  const anotherOne = NOTESKIN.LoadActorForNoteSkin('Left', 'Receptor', curNoteskin)
  anotherOne.Name = 'Receptor'

  const leftRollBodyActive = NOTESKIN.LoadActorForNoteSkin('Left', 'Roll Body Active', curNoteskin)
  leftRollBodyActive.Name = 'Body'

  const leftRollHeadActive = NOTESKIN.LoadActorForNoteSkin('Left', 'Roll Head Active', curNoteskin)
  leftRollHeadActive.Name = 'Head'

  const leftRollBottomcapActive = NOTESKIN.LoadActorForNoteSkin('Left', 'Roll Bottomcap Active', curNoteskin)
  leftRollBottomcapActive.Name = 'Tail'

  ActorFrameChild4Arg.set(ActorFrameChild4Arg.length() + 1, anotherOne)
  ActorFrameChild4Arg.set(ActorFrameChild4Arg.length() + 1, leftRollBodyActive)
  ActorFrameChild4Arg.set(ActorFrameChild4Arg.length() + 1, leftRollHeadActive)
  ActorFrameChild4Arg.set(ActorFrameChild4Arg.length() + 1, leftRollBottomcapActive)

  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.ActorFrame(ActorFrameChild4Arg))

  const t = Def.ActorFrame(ActorFrameArg)

  // FIXME: This isn't working, the error isn't helpful, will ask jose later
  return t
}