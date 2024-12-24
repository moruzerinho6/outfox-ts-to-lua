{
  const availablePlayers = GAMESTATE.GetEnabledPlayers()

  const t = new LuaTable()

  t.set('DrawGlyphsCommand', function (self: ActorFrame) {
    const MusicRate = GAMESTATE.GetSongOptionsObject('ModsLevel_Preferred' as unknown as ModsLevel).MusicRate()

    if (MusicRate > 1) {
      self.GetChild<BitmapText>('RateModeDisplay').settext("%.2fx rate"['format'](MusicRate))

      for (const [ _, pn] of ipairs(availablePlayers)) {
        self.GetChild(pn).y(-7)
      }
    }
  })
  t.set('InitCommand', function (self: ActorFrame) {
    self.playcommand('DrawGlyphs')
  })
  t.set(t.length() + 1 , Def.BitmapText({
    Font: '_Bold',
    Name: 'RateModeDisplay',
    InitCommand: function(self: BitmapText) {
      self.zoom(0.7).y(18)
    }
  }))

  let isDifferenTiming = false
  let CurTiming = null

  if (availablePlayers.length() !== 1 && !GAMESTATE.IsCourseMode()) {
    for (const [_, pn] of ipairs(availablePlayers)) {
      const Steps = GAMESTATE.GetCurrentSteps(pn)

      if (!CurTiming) {
        CurTiming = Steps.GetTimingData()
      }

      if (Steps.GetTimingData() !== CurTiming) {
        isDifferenTiming = true
      }
    }
  }

  for (const [i, pn] of ipairs(availablePlayers)) {
    type SongBPMDisplayModern = BitmapText
    t.set(t.length() + 1, Def.SongBPMDisplayModern({
      Font: '_Plex Numbers 40px',
      Player: pn,
      Name: pn,
      InitCommand: function(self: SongBPMDisplayModern) {
        if (isDifferenTiming) {
          self.x(scale(i, 1, availablePlayers.length(), -40, 40)).zoom(0.8).diffuse(ColorLightTone(PlayerColor(pn)))
        }
      }
    }))
  }

  // @ts-ignore
  return t
}