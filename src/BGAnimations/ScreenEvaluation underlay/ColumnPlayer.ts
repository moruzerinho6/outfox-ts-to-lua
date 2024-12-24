{
  const [Player] = [...$vararg]
  let CurPage = 1 
  let CurZoom = 1
  let CurPositionZoom = 0
  let PageWithBreakdown: any = 0
  const aspectRatio = GetScreenAspectRatio()
  let isPopUpMenu = false
  const onlineTest = NETMAN && NETMAN.IsConnectionEstablished()
  const Pages = [
    'Statistics',
    'TimingDistribution',
    'ColumnScore',
    'PlayHistory',
    'FitnessInfo'
  ]

  const colorLight = ColorLightTone(ColorLightTone(ColorLightTone(PlayerCompColor(Player))))

  let PVHandler;

  if (onlineTest) {
    table.insert(Pages, 2, 'ScoreComp')
  }

  for (const [k, v] of pairs(Pages)) {
    if (v === 'TimingDistribution') {
      PageWithBreakdown = k
    }
  }

  const genButtonAction = LoadModule('UI/UI.GenerateUiWithButtons.lua')

  const playerCanSendOnlineScore = NETMAN ? NETMAN.IsConnectionEstablished() : PROFILEMAN.GetProfile(Player as unknown as PlayerNumber).IsOnlineRegistered()

  const MoveChoice = (self: ActorFrame, offset, forceMove?) => {
    if ((Player !== self.pn && !forceMove) || !isPopUpMenu) {
      return
    }

    if (CurZoom !== 1 && CurPage === PageWithBreakdown) {
      let newpos = CurPositionZoom + offset
      const limitarea = (CurZoom * CurZoom)

      if (newpos > limitarea) {
        newpos = limitarea
      }

      if (newpos < -limitarea) {
        newpos = -limitarea
      }

      CurPositionZoom = newpos
      self.GetChild<ActorFrame>('Page' + PageWithBreakdown).playcommand('ScatterMove', { XPos: newpos, Zoom: CurZoom })
      return
    }

    CurPage = CurPage + offset

    if (CurPage > (Pages as unknown as LuaTable).length()) {
      CurPage = (Pages as unknown as LuaTable).length()
    }

    if (CurPage < 1) {
      CurPage = 1
    }

    self.playcommand('UpdateViewPort', { Current: CurPage })
  }

  const PerformZoom = (self: ActorFrame, offset) => {
    if (Player !== self.pn || !isPopUpMenu) {
      return
    }

    if (CurPage !== PageWithBreakdown) {
      return
    }

    CurZoom = CurZoom + offset

    if (CurZoom > 10) {
      CurPage = 10
    }

    if (CurZoom < 1) {
      CurZoom = 1
    }

    self.GetChild<ActorFrame>('Page' + PageWithBreakdown).playcommand('ScatterZoom', { XPos: CurPositionZoom, Zoom: CurZoom })

    if (CurZoom === 1) {
      CurPositionZoom = 0
      self.GetChild<ActorFrame>('Page' + PageWithBreakdown).playcommand('ScatterMove', { XPos: 0, Zoom: 1})
      return
    }

    let newpos = CurPositionZoom
    const limitarea = (CurZoom * CurZoom)

    if (newpos > limitarea) {
      newpos = limitarea
    }

    if (newpos < -limitarea) {
      newpos = -limitarea
    }

    CurPositionZoom = newpos

    self.GetChild<ActorFrame>('Page' + PageWithBreakdown).playcommand('ScatterMove', { XPos: newpos, Zoom: CurZoom })
  }

  const t: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      PVHandler = self
    },
    OnCommand: function (self: ActorFrame) {
      SCREENMAN.GetTopScreen().AddInputCallback(LoadModule('Lua.InputSystem.lua')(self))

      for (const [k, v] of pairs(Pages)) {
        self.GetChild<BitmapText>('Page' + (k as unknown as string)).diffusealpha(0)
      }

      self.playcommand('UpdateViewPort', { Current: CurPage })
    },
    StartCommand: function (self: ActorFrame) {
      if (self.pn !== Player) {
        return
      }
      MESSAGEMAN.Broadcast('ShowPopupMenu')
    },
    MenuLeftCommand: function (self: ActorFrame) {
      MoveChoice(self, -1)
    },
    MenuRightCommand: function (self: ActorFrame) {
      MoveChoice(self, 1)
    },
    MoveChoiceCommand: function (self: ActorFrame, param) {
      MoveChoice(self, param[1], true)
    },
    ShowPopupMenuMessageCommand: function (self: ActorFrame) {
      isPopUpMenu = true
    },
    ClosePopupMenuMessageCommand: function (self: ActorFrame) {
      isPopUpMenu = false
    },
    MenuUpCommand: function (self: ActorFrame) {
      PerformZoom(self, 1)
    },
    MenuDownCommand: function (self: ActorFrame) {
      PerformZoom(self, -1)
    },
    UpdateViewPortCommand: function (self: ActorFrame) {
      for (const [k, v] of pairs(Pages)) {
        self.GetChild<ActorFrame>('Page' + (k as unknown as string)).stoptweening().linear(0.1).diffusealpha(0)
        if (CurPage === k) {
          self.GetChild<ActorFrame>('Page' + (k as unknown as string)).diffusealpha(1).zoom(1)
        }
      }

      self.GetChild<ActorFrame>('Mods').playcommand('TogglePane', { Page: CurPage })
      self.GetChild<ActorFrame>('Background').playcommand('TogglePane', { Page: CurPage })

      if (playerCanSendOnlineScore) {
        self.GetChild<ActorFrame>('Network').playcommand('TogglePane', { Page: CurPage })
      }

      self.GetChild('InfoTab').playcommand('UpdateInfo', { Text: THEME.GetString('ScreenEvaluation', Pages[CurPage])})
    }
  })

  const OffsetTable = STATSMAN.GetCurStageStats().GetPlayerStageStats(Player as unknown as PlayerNumber).GetOffsetData()
  const sm = LoadModule('Gameplay.Medium.lua')(Player, OffsetTable, [300, 160])

  const PlayerPosition = ((aspectRatio <= 1.33) && SCREEN_CENTER_X || Player === PLAYER_1 && SCREEN_CENTER_X - 220 || SCREEN_CENTER_X + 220)
  const yOffsetForArea = 70

  const tempModule = LoadModule('Wheel/Objects/PlayerArea.lua')({
    Player,
    Width: 380
  })

  tempModule.InitCommand = function (self: ActorFrame) {
    self.xy(PlayerPosition, SCREEN_CENTER_Y - 236)
  }

  tempModule.OffCommand = function (self: ActorFrame) {
    self.stoptweening().easeinexpo(0.25).diffusealpha(0)
  }

  const JName = LoadModule('Gameplay/Timing.GetNames.lua').Names
  const arguments = {
    Player,
    Width: 370,
    Height: 460,
    Offsets: OffsetTable,
    Median: sm,
    CurTiming: LoadModule('Options.ReturnCurrentTiming.lua')(),
    TapNoteNames: JName,
    StatisticsRemainsStill: true,
    fade_out_speed: 0.2,
    fade_out_pause: 0.1,
    off_wait: 0.75
  }
  const paneHeight = 410

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('Name', 'Background')
  actorFrameArg.set('InitCommand', function (self: ActorFrame) {
    self.xy(PlayerPosition, SCREEN_CENTER_Y)
  })
  actorFrameArg.set('OffCommand', function (self: ActorFrame) {
    self.sleep(0.15).linear(0.2).diffusealpha(0)
  })
  actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({
    InitCommand: function (self: Quad) {
      self.zoomto(arguments.Width + 6, paneHeight + 60).y(yOffsetForArea).diffuse(BoostColor(ColorDarkTone(PlayerColor(Player)), 0.5))
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathF('', 'Evaluation/ConvPlayerArea'),
    OnCommand: function (self: ActorFrame) {
      self.animate(0).setstate(0).y(yOffsetForArea - paneHeight * .5).diffuse(PlayerColor(Player))
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'Evaluation/ConvPlayerArea'),
    OnCommand: function (self: ActorFrame) {
      self.animate(0).setstate(1).zoomtoheight(paneHeight).y(yOffsetForArea).diffuse(PlayerColor(Player))
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({
    InitCommand: function (self: Quad) {
      self.QuadPosition = yOffsetForArea - paneHeight * .5
      self.zoomto(arguments.Width + 6, 100).diffuse(BoostColor(PlayerColor(Player), 0.4))
    },
    TogglePaneCommand: function (self: ActorFrame, params) {
      const isMainPage = params.Page === 1

      self.stoptweening().easeoutexpo(0.2).zoomtoheight(isMainPage ? 70 : 20).y(self.QuadPosition + (isMainPage ? 70 : 40))
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'Evaluation/ConvPlayerArea'),
    OnCommand: function (self: ActorFrame) {
      self.animate(0).setstate(2).y(yOffsetForArea + paneHeight * .5).diffuse(PlayerColor(Player))
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: '_Plex Bold Large',
    Text: FormatPercentScore(STATSMAN.GetCurStageStats().GetPlayerStageStats(Player as unknown as PlayerNumber).GetPercentDancePoints()),
    InitCommand: function (self: BitmapText) {
      self.xy(arguments.Width * .45, -86).diffusebottomedge(PlayerColor(Player)).halign(1)
    },
    TogglePaneCommand: function (self: BitmapText, params) {
      const isMainPage = params.Page === 1

      self.stoptweening().easeoutexpo(0.2).y(isMainPage ? -76 : -96).zoom(isMainPage ? 1 : 0.5)
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: '_Plex Bold Large',
    InitCommand: function (self: BitmapText) {
      self.xy(arguments.Width * .45, -56).halign(1).zoom(0.4).diffusealpha(0.8)

      const stats = STATSMAN.GetCurStageStats().GetPlayerStageStats(Player as unknown as PlayerNumber)
      const sc = string.format('EX %d/%d', stats.GetActualDancePoints(), stats.GetPossibleDancePoints())
      self.settext(sc)
    },
    TogglePaneCommand: function (self: BitmapText, params) {
      const isMainPage = params.Page === 1

      self.stoptweening().easeoutexpo(0.2)
      .xy(isMainPage ? arguments.Width * .45 : 0, isMainPage ? -46 : -96)
      .halign(isMainPage ? 1 : 0.5)
    }
  }))

  t.set(t.length() + 1, Def.ActorFrame(actorFrameArg))

  const tempActor: any = LoadActor('PlayerSpecific/Objects/PageView.lua', {
    PaneColor: ColorLightTone(PlayerColor(Player)),
    BGColor: ColorDarkTone(PlayerColor(Player)),
    Width: 300
  })

  tempActor.OnCommand = function (self: ActorFrame) {
    self.xy(PlayerPosition, SCREEN_CENTER_Y - arguments.Height * .5 + 90)
  }

  t.set(t.length() + 1, tempActor)

  const tempActor2 = LoadActor('PageCount.lua', { numPages: (Pages as unknown as LuaTable).length(), Player, Width: arguments.Width, Current: CurPage })

  // @ts-ignore
  tempActor2.InitCommand = function (self: ActorFrame) {
    self.xy(PlayerPosition, SCREEN_CENTER_Y - arguments.Height * .5 + 116)
  }

  // @ts-ignore
  tempActor2.OffCommand = function (self: ActorFrame) {
    self.linear(0.2).diffusealpha(0)
  }

  t.set(t.length() + 1, tempActor2)

  const tempActor3 = LoadActor('PlayerSpecific/Objects/DiffContainer.lua', 
    Player
  )

  // @ts-ignore
  tempActor3.OnCommand = function (self: ActorFrame) {
    self.xy(PlayerPosition, SCREEN_CENTER_Y - 188)
  }

  t.set(t.length() + 1, tempActor3)

  let calcwidth = 430

  const tempActor4: any = LoadActor('PlayerSpecific/TimingInfo.lua', {
    Player,
    Width: calcwidth
  })

  tempActor4.InitCommand = function (self: ActorFrame) {
    self.xy(PlayerPosition, SCREEN_CENTER_Y+paneHeight*.5 + 92).zoom(0.8)
  }

  tempActor4.OffCommand = function (self: ActorFrame) {
    self.linear(0.2).diffusealpha(0)
  }

  t.set(t.length() + 1, tempActor4)

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'Mods',
    Text: GAMESTATE.GetPlayerState(Player as unknown as PlayerNumber).GetPlayerOptionsString('ModsLevel_Preferred' as unknown as ModsLevel),
    InitCommand: function (self: BitmapText) {
      (self.finishtweening().xy(PlayerPosition - calcwidth*.5 + 42, SCREEN_CENTER_Y+paneHeight*.5 + 70 ).zoom(0.8)
      .align(0, 1).diffuse(colorLight) as BitmapText).wrapwidthpixels(440).vertspacing(-4)

      if (self.GetNumWrapperStates() === 0) {
        self.AddWrapperState()
      }

      if (playerCanSendOnlineScore) {
        self.zoom(0.7);
        (self.GetWrapperState(1) as unknown as ActorFrame).finishtweening().xy(0, -36)
      }
    },
    OffCommand: function (self: ActorFrame) {
      self.linear(0.2).diffusealpha(0)
    },
    ViewingDataFromScoreMessageCommand: function (self: BitmapText, params) {
      if (!params.modifiers) {
        return
      }

      self.settext(params.modifiers)
    },
    ResetToPlayerScoreMessageCommand: function (self: BitmapText) {
      self.settext(GAMESTATE.GetPlayerState(Player as unknown as PlayerNumber).GetPlayerOptionsString('ModsLevel_Preferred' as unknown as ModsLevel))
    },
    FadeOutFromScoreSuccessMessageCommand: function (self: BitmapText, params) {
      if (params.Player !== Player) {
        return
      }

      if (params.NeedsRetryButton) {
        self.wrapwidthpixels(300)
      }

      (self.GetWrapperState(1) as ActorFrame).stoptweening().sleep(2).easeoutexpo(0.4).xy(38, 2)
    },
    TogglePaneCommand: function (self: BitmapText, params) {
      const isMainPage = params.Page === 1

      self.stoptweening().easeoutexpo(0.2).diffusealpha(isMainPage ? 1 : 0)
    }
  }))

  for (const [k ,v] of pairs(Pages)) {
    const tempInsideActor: any = LoadActor('PlayerSpecific/' + (v as string), arguments)

    tempInsideActor.Name = 'Page' + (k as string)
    tempInsideActor.InitCommand = function (self: ActorFrame) {
      self.xy(PlayerPosition , SCREEN_CENTER_Y + (yOffsetForArea))
    }
    tempInsideActor.OffCommand = function (self: ActorFrame) {
      self.linear(0.2).diffusealpha(0)
    }
  }

  if (playerCanSendOnlineScore) {
    const actorInsideArg = new LuaTable()

    actorInsideArg.set('Name', 'Network')
    actorInsideArg.set('InitCommand', function (self: ActorFrame) {
      self.xy(PlayerPosition, SCREEN_CENTER_Y + paneHeight*.5 + 60)

      type insideChildren = {
        Image: BitmapText
        Status: BitmapText
        loadicon: BitmapText
        joinButton: BitmapText
        Reason: BitmapText
      }

      const c: insideChildren = self.GetChildren()
      c.Image.diffuse(PlayerColor(Player)).visible(false).zoom(0.5)
      c.Status.xy(-arguments.Width*.5 + 50, 0).zoom(0.8).halign(0).settext('Submitting...')
      c.loadicon.x(c.Status.GetX() - 26).diffusealpha(1)
      c.joinButton.visible(false)
      c.Reason.visible(false).zoom(0.8).halign(0).xy(c.Status.GetX(), 6)
    })
    actorInsideArg.set('OffCommand', function (self: ActorFrame) {
      self.linear(0.2).diffusealpha(0)
    })
    actorInsideArg.set('TogglePaneCommand', function (self: ActorFrame, params) {
      const isMainPage = params.Page === 1
      self.stoptweening().easeoutexpo(0.2).diffusealpha(isMainPage ? 1 : 0)
    })

    actorInsideArg.set('ResponseScoreSaveMessageCommand', function (self: ActorFrame, params) {
      const res = params.Response
      const achieved = res ? res['metadata']['status'] === 'success' : false
      
      self.GetChild<BitmapText>('loadicon').stoptweening().linear(0.1).diffusealpha(0)
      self.GetChild<BitmapText>('Status').settext(THEME.GetString('ScreenEvaluation', 'ScoreSubmit' + (achieved ? 'Success' : 'Failure')))

      if (res.metadata && res.metadata.message && !achieved) {
        self.GetChild('Status').zoom(0.7).y(-12)
        self.GetChild<BitmapText>('Reason').settext(res.metadata.message).visible(true)
      }

      const NeedToShowRetryButton = (message) => {
        if (!message) {
          return false
        }

        const states = [
          'judgement data missing',
          'Score Already Submitted'
        ]

        for (const [i, v] of ipairs(states)) {
          if (v === message) {
            return false
          }
        }

        return true
      }

      let needsToShow = false

      if (!achieved && res.metadata) {
        needsToShow = NeedToShowRetryButton(res.metadata.message)
        self.GetChild('joinButton').visible(needsToShow)
      }

      self.GetChild<Sprite>('Image').Load(THEME.GetPathG('OnlineStatus', achieved ? 'online' : 'offline')).x(self.GetChild('Status').GetX() - 26).visible(true)
      MESSAGEMAN.Broadcast('FadeOutFromScoreSuccess', {
        Player,
        NeedsRetryButton: needsToShow
      })
    })

    actorInsideArg.set('FadeOutFromScoreSuccessMessageCommand', function (self: ActorFrame, params) {
      if (params.Player !== Player) {
        return
      }

      self.GetChild<ActorFrame>('Image').finishtweening().sleep(2).easeinexpo(0.2).diffusealpha(1)
      self.GetChild<ActorFrame>('Status').finishtweening().sleep(1.8).easeinexpo(0.2).diffusealpha(0)
      self.GetChild<ActorFrame>('Reason').finishtweening().sleep(2).easeinexpo(0.2).y(-self.GetParent().GetChild('Mods').GetZoomedHeight()).diffusealpha(0.8).zoom(0.7)
    })

    actorInsideArg.set('OnlineScoreSaveFailedMessageCommand', function (self: ActorFrame, params) {
      (self.GetChild<BitmapText>('Status').zoom(0.7).y(-12) as BitmapText).settext(THEME.GetString('ScreenEvaluation', 'ScoreSubmitFailure')).diffusealpha(1);
      self.GetChild<BitmapText>('Reason').settext(params.Reason).visible(true)
      self.GetChild<Sprite>('Image').Load(THEME.GetPathG('OnlineStatus', 'offline')).x(self.GetChild('Status').GetX() - 26).visible(true)
      self.GetChild('loadicon').stoptweening().linear(0.1).diffusealpha(0)
      MESSAGEMAN.Broadcast('FadeOutFromScoreSuccess', { Player })
    })

    actorInsideArg.set(actorInsideArg.length() + 1, Def.BitmapText({
      Name: 'Status',
      Font: 'Common Normal'
    }))

    actorInsideArg.set(actorInsideArg.length() + 1, Def.BitmapText({
      Name: 'Reason',
      Font: 'Common Normal'
    }))

    actorInsideArg.set(actorInsideArg.length() + 1, Def.Sprite({
      Name: 'Image'
    }))

    actorInsideArg.set(actorInsideArg.length() + 1, Def.Sprite({
      Name: 'loadicon',
      Texture: THEME.GetPathG('Loading', 'icon'),
      InitCommand: function (self: Sprite) {
        self.spin().zoom(0.1).effectmagnitude(0, 0, 400)
      },
      UpdateScoresCommand: function (self: Sprite) {
        self.stoptweening().linear(0.1).diffusealpha(0)
      }
    }))

    const tempButtonAction = genButtonAction({
      Width: 110,
      Height: 32,
      Border: 2,
      Pos: [arguments.Width * .5 - 60, -4],
      Action: function (self: ActorFrame) {
        if (playerCanSendOnlineScore) {
          self.GetParent().GetParent().playcommand('Init')

          const mainActorFrame = self.GetParent().GetParent().GetParent()

          mainActorFrame.GetChild('Mods').playcommand('Init')

          const timingName = LoadModule('ptions.ReturnCurrentTiming.lua')().Name
          const [didSend, reason] = NETMAN.ScoreSave(Player as unknown as PlayerNumber, timingName)

          if (!didSend) {
            MESSAGEMAN.Broadcast('OnlineScoreSaveFailed', { Reason: reason, Player })
          }
        }
      },
      AddActors: Def.ActorFrame([
        Def.BitmapText({
          Font: 'Common Normal',
          Text: 'Retry',
          InitCommand: function (self: BitmapText) {
            self.zoom(0.8)
          }
        })
      ])
    })

    tempButtonAction.Name = 'JoinButton'

    actorInsideArg.set(actorInsideArg.length() + 1, tempButtonAction)
    t.set(t.length() + 1, Def.ActorFrame(actorInsideArg))
  }

  // @ts-ignore
  return t
}