{
  // @ts-ignore
  const [Args]: [any] = [...$vararg]
  const Player = Args.Player
  const height = Args.Height
  const width = Args.Width

  const Stats = STATSMAN.GetCurStageStats().GetPlayerStageStats(Player)
  if (!Stats) {
    // @ts-ignore
    return Def.Actor({})
  }

  const ComboList = Stats.GetComboList()
  const LastSecond = LoadModule('StageStats.TotalPossibleStepSeconds.lua')()
  const MinComboSizeToShow = 5

  const MaxCombo = Stats.MaxCombo()

  const am = new LuaTable()
  const labl: ActorFrame = Def.ActorFrame({})

  for (const [k, v] of pairs(ComboList)) {
    if (v['StageCount'] > MinComboSizeToShow) {
      const isMax = v['StageCount'] === MaxCombo

      const Start = scale(v["StartSecond"], 0, LastSecond, 0, 1)
      const Size = scale(v["SizeSeconds"], 0, LastSecond, 0, 1)

      const col = isMax ? PlayerColor(Player) : ColorLightTone(PlayerColor(Player))

      const scset = (size: number) => {
        return scale(size, 0, 1, -width*.5, width*.5)
      }

      am.set(am.length() + 1, [[scset(Start),   -height*.5, 0], col])
      am.set(am.length() + 1, [[scset(Start), height*.5, 0], col])
      am.set(am.length() + 1, [[scset(Start + Size), height*.5, 0], col])
      am.set(am.length() + 1, [[scset(Start + Size), -height*.5, 0], col])

      if (Size > 0.03) {
        labl.set(labl.length() + 1, Def.BitmapText({
          Font: 'Common Normal',
          OnCommand: function (self: BitmapText) {
            (self.x(scale((Start + (Size*.5)), 0, 1, -width/2, width/2)).zoom(0.6).shadowlength(1)
            .diffuse(Color.Yellow) as BitmapText).settext(v['StageCount'] as string)
          }
        }))
      }
    }
  }

  // @ts-ignore
  return Def.ActorFrame([
    Def.ActorMultiVertex({
      OnCommand: function (self: ActorMultiVertex) {
        self.SetDrawState({
          // @ts-ignore
          Mode: 'DrawMode_Quads'
        }).SetVertices(am)
      }
    }),
    labl
  ])
}