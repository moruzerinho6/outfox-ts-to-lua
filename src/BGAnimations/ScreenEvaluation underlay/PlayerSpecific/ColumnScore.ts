{
  // @ts-ignore
  const [Args]: [any] = [...$vararg]
  const p = Args.Player
  const Name: LuaTable = Args.TapNoteNames
  const Height = Args.Height
  const Width = Args.Width
  const Length = Name.length()

  const t: ActorFrame = Def.ActorFrame({
    OffCommand: function (self: ActorFrame) {
      self.linear(0.2).diffusealpha(0)
    }
  })

  const NumCols = GAMESTATE.GetCurrentStyle(p).ColumnsPerPlayer()
  const ColumnData = STATSMAN.GetCurStageStats().GetPlayerStageStats(p).GetColumnScores()

  for (const i of $range(1, NumCols)) {
    for (const [ind, val] of ipairs(Name as unknown as Record<number, string>)) {
      const cur_line = 'JudgmentLine_' + val

      t.set(t.length() + 1, Def.BitmapText({
        Font: '_Plex Bold Large',
        OnCommand: function (self: BitmapText) {
          (self.x(scale(i, 1, NumCols, -Width*.5 + 40, Width*.5 - 40))
          .y(-Height*.25+10+((44-(Length*2))*ind)).zoom(Length > 8 ? 0.5 : scale(Length, 1, 8, 1.25, 0.5)) as BitmapText)
          .settext(ColumnData[i]['TapNoteScore_' + val]).diffuse(BoostColor(JudgmentLineToColor(cur_line), 1))
          .diffusealpha(0).sleep(0.1 * ind).decelerate(0.6).diffusealpha(0.86)
        }
      }))
    }
  }

  let noteskin = GAMESTATE.GetPlayerState(p).GetPlayerOptions('ModsLevel_Song' as unknown as ModsLevel).NoteSkin().toLowerCase()

  for (const i of $range(1, NumCols)) {
    if (!NOTESKIN.DoesNoteSkinExist(noteskin)) {
      Warn('The noteskin currently set does not exist on this game mode. Using ' + NOTESKIN.GetNoteSkinNames()[1] as string + ' instead.')
      noteskin = NOTESKIN.GetNoteSkinNames()[1]
    }

    const tcol = GAMESTATE.GetCurrentStyle().GetColumnInfo(p, i)

    const actorFrameInside = new LuaTable()

    actorFrameInside.set('InitCommand', function (self: ActorFrame) {
      self.xy(scale(i, 1, NumCols, -Width*.5 + 40, Width*.5 - 40), -Height * .25).zoom(.75)
    })

    actorFrameInside.set(actorFrameInside.length() + 1, NOTESKIN.LoadActorForNoteSkin(tcol['Name'], 'Tap Note', noteskin, null, null, null, p))
    t.set(t.length() + 1, Def.ActorFrame(actorFrameInside))
  }

  // @ts-ignore
  return t
}