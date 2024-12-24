{
  const t: ActorFrame = Def.ActorFrame({
    OnCommand: function (self: ActorFrame) {
      if (!NETMAN) {
        return
      }

      for (const [_, pn] of pairs(GAMESTATE.GetEnabledPlayers())) {
        const PlayerSavePath = CheckIfUserOrMachineProfile(string['s' + 'ub'](pn, -1) - 1 as unknown as string) + '/OutFoxPrefs.ini'
        const canAutoSave = LoadModule('Config.Load.lua')('AutoSaveOnlineScore', PlayerSavePath) || true

        if (PROFILEMAN.GetProfile(pn).IsOnlineRegistered() && canAutoSave) {
          const timingName = LoadModule('Options.ReturnCurrentTiming.lua')().Name
          const [didSend, reason] = NETMAN.ScoreSave(pn, timingName)

          if (!didSend) {
            MESSAGEMAN.Broadcast('OlineScoreSaveFailed', {
              Reason: reason,
              Player: pn
            })

            LoadModule('Online.GetScoreData.lua')(GAMESTATE.GetCurrentSong(), GAMESTATE.GetCurrentSteps(pn), timingName)
          }
        }
      }
    }
  })

  type DiscordModule = {
    SendStageResults: (this: DiscordModule) => void
  }
  (LoadModule('Tools.Discord.lua') as unknown as DiscordModule).SendStageResults()

  t.set(t.length() + 1, Def.Sprite({
    OnCommand: function (self: Sprite) {
      self.LoadFromSongBackground(GAMESTATE.GetCurrentSong()).scale_or_crop_background().diffusealpha(0.25)
    },
    OffCommand: function (self: Sprite) {
      self.stoptweening().linear(0.25).diffusealpha(0)
    }
  }))

  for (const [i, pn] of pairs(GAMESTATE.GetEnabledPlayers())) {
    SCREENMAN.set_input_redirected(pn, true)
  }

  if (GAMESTATE.GetNumPlayersEnabled() === 1 && SCREEN_WIDTH >= 960) {
    t.set(t.length() + 1, LoadActor('DetailedPlayer.lua', GAMESTATE.GetMasterPlayerNumber()))
  } else {
    for (const [i, pn] of pairs(GAMESTATE.GetEnabledPlayers())) {
      t.set(t.length() + 1, LoadActor('ColumnPlayer.lua', pn))
    }
  }

  const ArtistFade: TextFadeSlide = LoadModule('Text.FadeSlide.lua')({
    Width: 1000,
    Font: '_Kurinto Semibold',
    Height: 40
  })

  const TitleFade: TextFadeSlide = LoadModule('Text.FadeSlide.lua')({
    Width: 880,
    Font: '_Kurinto Semibold',
    Height: 40
  })

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('InitCommand', function (self: ActorFrame) {
    self.xy(SCREEN_CENTER_X, 52)
    
    const width = 836
    const height = 86
    const song = GAMESTATE.GetCurrentSong()

    type InsideChildren = {
      Jacket: Sprite
      Out: Sprite
      In: Sprite
      Folder: ActorFrame
      GroupName: BitmapText
      ArtistFade: ActorFrame
      TitleFade: ActorFrame
    }
    const c: InsideChildren = self.GetChildren()

    let bpath = null

    if (song.GetJacketPath()) {
      bpath = song.GetJacketPath()
    }

    if (bpath) {
      c.Jacket.Load(bpath).scaletocover(0, 0, height - 4, height - 4).xy(-width * .5 + height * .5, 0).xy(-width * .5 + height * .5, 0)
    }

    c.Out.zoomto(width, height).diffuse(GameColor.Custom['MenuButtonBorder'])
    c.In.zoomto(width - 4, height - 4).diffuse(GameColor.Custom['BackgroundColor'])

    const offsetData = bpath ? height - 8 : 0

    c.Folder.xy(-width * .5 + 20 + offsetData, -24).halign(0).zoom(0.36);
    (c.GroupName.zoom(0.45).halign(0).xy(-width * .5 + 50 + offsetData, -24)
    .diffuse(GameColor.Custom['MenuButtonBorder']) as BitmapText).settext(song.GetGroupName());

    ArtistFade.SetText(song.GetDisplayArtist())
    c.ArtistFade.xy(offsetData + 0, 24).zoom(0.8)
    TitleFade.SetText(song.GetDisplayFullTitle())
    c.TitleFade.xy(offsetData + 40, 2)
  })

  actorFrameArg.set('OffCommand', function (self: ActorFrame) {
    self.stoptweening().easeinexpo(0.25).diffusealpha(0)
  })

  actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({
    Name: 'Out'
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({
    Name: 'In'
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
    Name: 'Folder',
    Texture: THEME.GetPathG('Folder', 'Icon')
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
    Name: 'Jacket'
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: '_plex Bold',
    Name: 'GroupName'
  }))

  const tempFadeCreate = ArtistFade.Create()
  const tempFadeCreate2 = TitleFade.Create()

  actorFrameArg.set(actorFrameArg.length() + 1, tempFadeCreate)
  actorFrameArg.set(actorFrameArg.length() + 1, tempFadeCreate2)
  t.set(t.length() + 1, Def.ActorFrame(actorFrameArg))

  // @ts-ignore
  return t
}