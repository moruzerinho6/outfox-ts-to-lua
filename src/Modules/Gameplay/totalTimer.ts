{
  let total = 0
  const ReportViaTime = (timeamount: number) => {
    if (timeamount > 3600) {
      return SecondsToHHMMSS(timeamount)
    }
    return SecondsToMMSS(timeamount)
  }

  const t = new LuaTable()

  t.set('Font', '_Bold')
  t.set('CurrentSongChangedMessageCommand', function(self: BitmapText) {
    total = GAMESTATE.GetCurrentSong().GetLastSecond()
    self.playcommand('UpdateTime')
  })
  t.set('UpdateTimeCommand', function(self: BitmapText) {
    let current = math.ceil(GAMESTATE.GetSongPosition().GetMusicSeconds())

    if (current < 0) {
      current = 0
    }

    self.settext( string.format( "%s/%s (-%s)", ReportViaTime( current ), ReportViaTime(total), ReportViaTime( total-current )  ) )
		self.sleep(0.2).queuecommand("UpdateTime")
  })

  // @ts-ignore
  return t
}