declare interface songInfoModule {
  InitCommand: (self: ActorFrame) => void
  UpdateSongInfoCommand: (self: ActorFrame) => void
  CurrentSongChangedMessageCommand: (self: ActorFrame) => void
}

{
  const ActorFrameArg = new LuaTable()
  interface selfChildren {
    Subtitle: BitmapText
    Artist: BitmapText
    Title: BitmapText
  }
  ActorFrameArg.set('InitCommand', function (self: ActorFrame) {
    const c: selfChildren = self.GetChildren()
    c.Subtitle.zoom(.525)
    c.Artist.y(16).zoom(.8)
  })
  ActorFrameArg.set('CurrentSongChangedMessageCommand', function (self: ActorFrame) {
    self.playcommand('UpdateSongInfo')
  })
  ActorFrameArg.set('UpdateSongInfoCommand', function (self: ActorFrame) {
    if (!GAMESTATE.GetCurrentSong()) {
      return;
    }

    const c: selfChildren = self.GetChildren()
    const song = GAMESTATE.GetCurrentSong()
    const hassubtitle = song.GetDisplaySubTitle() !== ''

    c.Artist.settext(song.GetDisplayArtist(), song.GetTranslitArtist()).y(hassubtitle ? 16 : 10)
    c.Subtitle.settext( song.GetDisplaySubTitle(), song.GetTranslitSubTitle() ).visible(hassubtitle)
		c.Title.settext( song.GetDisplayMainTitle(), song.GetTranslitMainTitle() ).y( hassubtitle ? -18 : -10 )
  })
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Text: 'Title',
    Name: 'Title',
    Font: '_Kurinto Semibold'
  }))
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Text: 'Subtitle',
    Name: 'Subtitle',
    Font: '_Kurinto Semibold'
  }))
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Text: 'Artist',
    Name: 'Artist',
    Font: '_Kurinto Semibold'
  }))
  // @ts-ignore
  return Def.ActorFrame(ActorFrameArg)
}