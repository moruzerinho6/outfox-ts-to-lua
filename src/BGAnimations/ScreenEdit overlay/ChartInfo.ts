{
  const t: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      self.xy(10, 10)

      self.RunCommandsRecursively(function (self: ActorFrame) {
        if (self.settext) {
          self.align(0, 0).zoom(0.8)
        }
      })

      self.GetChild<ActorFrame>('ChartAuthor').y(15).zoom(0.6)
    },
    OnCommand: function (self: ActorFrame) {
      self.playcommand('Set')
    },
    StepsChangedCommand: function (self: ActorFrame) {
      self.playcommand('Set')
    },
    SetCommand: function (self: ActorFrame) {
      const chart = GAMESTATE.GetCurrentSteps(PLAYER_1 as unknown as PlayerNumber)

      self.GetChild<BitmapText>('ChartName').settext(chart.GetChartName() || '')
      self.GetChild<BitmapText>('ChartAuthor').settext(chart.GetAuthorCredit() || '')
    }
  })

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'ChartName'
  }))

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'ChartAuthor'
  }))

  //@ts-ignore
  return t
}