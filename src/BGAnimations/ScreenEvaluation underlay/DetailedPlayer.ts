{
  let [Player] = [...$vararg]
  let CurPage = 1
  let CurZoom = 1
  let CurPositionZoom = 0
  let PageWithBreakdown: any = 0
  let inPopUpMenu = false
  let onlineTest = NETMAN && NETMAN.IsConnectionEstablished()

  const Pages = [
    'TimingDistribution',
    'ColumnScore',
    'PlayHistory',
    'FitnessInfo'
  ]

  const playerCanSendOnlineScore = onlineTest && PROFILEMAN.GetProfile(Player as unknown as PlayerNumber).IsOnlineRegistered()

  const colorLight = ColorLightTone(PlayerCompColor(Player))

  const genButtonAction = LoadModule('UI/UI.GenerateUIWithButtonAction.lua')

  let PVHandler

  if (onlineTest) {
    table.insert(Pages, 2, 'ScoreComp')
  }

  for (const [k, v] of pairs(Pages)) {
    if (v === 'TimingDistribution') {
      PageWithBreakdown = k
    }
  }

  const t: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      PVHandler = self
    },
    OnCommand: function (self: ActorFrame) {
      SCREENMAN.GetTopScreen().AddInputCallback(LoadModule('Lua.InputSystem.lua')(self))
      for (const [k, v] of pairs(Pages)) {
        self.GetChild('Page' + (k as string)).diffusealpha(0)
      }
      self.playcommand('UpdateViewPort', {
        Current: CurPage
      })
    },
    MenuLeftCommand: function (self: ActorFrame) {
      self.playcommand('MoveChoice', [-1])
    },
    MenuRightCommand: function (self: ActorFrame) {
      self.playcommand('MoveChoice', [1])
    },
    StartCommand: function (self: ActorFrame) {
      MESSAGEMAN.Broadcast('ShowPopupMenu')
    },
    ShowPopupMenuMessageCommand: function (self: ActorFrame) {
      inPopUpMenu = true
    },
    ClosePopupMenuMessageCommand: function (self: ActorFrame) {
      inPopUpMenu = false
    },
    MenuUpCommand: function (self: ActorFrame) {
      self.playcommand('PerformZoom', [1])
    },
    MenuDownCommand: function (self: ActorFrame) {
      self.playcommand('PerformZoom', [-1])
    },
    ViewingDataFromScoreMessageCommand: function (self: ActorFrame) {
      CurPage = 1
      self.playcommand('MoveChoice', [0])
    },
    MoveChoiceCommand: function (self: ActorFrame, param) {
      if (inPopUpMenu) {
        return
      }

      if (CurZoom !== 1 && CurPage === PageWithBreakdown) {
        let newpos = CurPositionZoom + param[1]
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

      CurPage = CurPage + param[1]

      if (CurPage > (Pages as unknown as LuaTable).length()) {
        CurPage = 1
      }

      if (CurPage < 1) {
        CurPage = (Pages as unknown as LuaTable).length()
      }

      self.playcommand('UpdateViewPort', {
        Current: CurPage
      })
    },
    PerformZoomCommand: function (self: ActorFrame, param) {
      if (inPopUpMenu) {
        return
      }

      if (CurPage !== PageWithBreakdown) {
        return
      }

      CurZoom = CurZoom + param[1]

      if (CurZoom > 10) {
        CurZoom = 10
      }

      if (CurZoom < 1) {
        CurPage = 1
      }

      self.GetChild('Page' + PageWithBreakdown).playcommand('ScatterZoom', { XPos: CurPositionZoom, Zoom: CurZoom })

      if (CurZoom === 1) {
        CurPositionZoom = 0
        self.GetChild('Page' + PageWithBreakdown).playcommand('ScatterMove', { XPos: 0, Zoom: 1 })
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
      self.GetChild('Page' + PageWithBreakdown).playcommand('ScatterMove', { XPos: newpos, Zoom: CurZoom })
    },
    UpdateViewPortCommand: function (self: ActorFrame) {
      for (const [k, v] of pairs(Pages)) {
        self.GetChild('Page' + (k as string)).stoptweening().linear(0.1).diffusealpha(0)

        if (CurPage === k) {
          self.GetChild('Page' + (k as unknown as string)).diffusealpha(1).zoom(1)
        }
      }

      self.GetChild('InfoTab').playcommand('UpdateInfo', {
        Text: THEME.GetString('ScreenEvaluation', Pages[CurPage])
      })
    }
  })

  let calcwidth = 440
  let playerdataxpos = Player === PLAYER_1 ? 228 : -228
  let MBG: Sprite
  let arguments = []

  t.set(t.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'Evaluation/PlayerArea'),
    InitCommand: function (self: Sprite) {
      self.diffuse(PlayerColor(Player)).xy(SCREEN_CENTER_X - playerdataxpos, SCREEN_CENTER_Y + 70).zoom(1.3)
      self.rotationy(Player === PLAYER_1 ? 0 : 180)
      MBG = self
    },
    OffCommand: function (self: Sprite) {
      self.stoptweening().easeinexpo(0.25).diffusealpha(0)
    }
  }))

  const tempModule = LoadModule('Wheel/Objects/PlayerArea.lua')({
    Player,
    Width: 380
  })

  tempModule.InitCommand = function (self: ActorFrame) {
    self.xy(SCREEN_CENTER_X - (playerdataxpos), SCREEN_CENTER_Y - (MBG.GetZoomedHeight() * .5) + 2)
  }

  tempModule.OffCommand = function (self: ActorFrame) {
    self.stoptweening().easeinexpo(0.25).diffusealpha(0)
  }

  t.set(t.length() + 1, tempModule)

  let JName = LoadModule('Gameplay/Timing.GetNames.lua').Names
  let OffsetTable = STATSMAN.GetCurStageStats().GetPlayerStageStats(Player as unknown as PlayerNumber).GetOffsetData()
  let sm = LoadModule('Gameplay.Medium.lua')(Player, OffsetTable, [300, 230])

  arguments = {
    Player,
    Width: 440,
    Height: 500,
    CurTiming: LoadModule('Options.ReturnCurrentTiming.lua')(),
    TapNoteNames: JName,
    Offsets: OffsetTable,
    Median: sm,
    StatisticsRemainsStill: true,
    fade_out_speed: 0.2,
    fade_out_pause: 0.1,
    off_wait: 0.75,
    isDetailed: true
  }

  const tempActor = LoadActor('PlayerSpecific/Objects/DiffContainer.lua', { Player })

  // @ts-ignore
  tempActor.OnCommand = function (self: ActorFrame) {
    self.xy(SCREEN_CENTER_X - playerdataxpos, SCREEN_CENTER_Y - 188)
  }

  t.set(t.length() + 1, tempActor)

  const tempActor2 = LoadActor('PlayerSpecific/Statistics.lua', arguments)

  // @ts-ignore
  tempActor2.OnCommand = function (self: ActorFrame) {
    self.xy(SCREEN_CENTER_X - playerdataxpos, SCREEN_CENTER_Y + 50).playcommand('UpdateWidth', {
      Width: MBG.GetZoomedWidth()
    })
  }

  // @ts-ignore
  tempActor2.OffCommand = function (self: ActorFrame) {
    self.stoptweening().easeinexpo(0.25).diffusealpha(0)
  }

  t.set(t.length() + 1, tempActor2)

  const ogMusicRate = GAMESTATE.GetSongOptionsObject('ModsLevel_Preferred' as unknown as ModsLevel).MusicRate()

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Text: string.format('%.2fx Music Rate', ogMusicRate),
    InitCommand: function (self: BitmapText) {
      self.xy(SCREEN_CENTER_X - playerdataxpos, SCREEN_CENTER_Y + 190).zoom(0.8).visible(ogMusicRate !== 1)
    },
    OffCommand: function (self: BitmapText) {
      self.linear(0.2).diffusealpha(0)
    },
    ViewingDataFromScoreMessageCommand: function (self: BitmapText, params) {
      if (!params.rate) {
        return
      }

      self.settext(params.rate)
    },
    ResetToPlayerScoreMessageCommand: function (self: BitmapText) {
      self.settext(GAMESTATE.GetPlayerState(Player as unknown as PlayerNumber).GetPlayerOptionsString('ModsLevel_Preferred' as unknown as ModsLevel))
    }
  }))

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'Mods',
    Text: GAMESTATE.GetPlayerState(Player as unknown as PlayerNumber).GetPlayerOptionsString('ModsLevel_Preferred' as unknown as ModsLevel),
    InitCommand: function (self: BitmapText) {
      (self.finishtweening().xy(SCREEN_CENTER_X - (playerdataxpos + calcwidth * .5 - 44), SCREEN_CENTER_Y + 260).zoom(0.8)
      .align(0, 1).diffuse(colorLight) as BitmapText).wrapwidthpixels(440).vertspacing(-4)

      if (playerCanSendOnlineScore) {
        self.y(SCREEN_CENTER_Y + 230)
      }
    },
    OffCommand: function (self: BitmapText) {
      self.hurrytweening(0.05).linear(0.2).diffusealpha(0)
    },
    ViewingDataFromScoreMessageCommand: function (self: BitmapText, params) {
      if (!params.modifiers) {
        return
      }

      self.settext(params.modifiers)
    },
    FadeOutFromScoreSuccessMessageCommand: function (self: BitmapText, params) {
      if (params.Player !== Player) {
        return
      }

      self.stoptweening().sleep(2).easeoutexpo(0.4).addx(32).addy(36).zoom(0.7)
    },
    ResetToPlayerScoreMessageCommand: function (self: BitmapText) {
      self.settext(GAMESTATE.GetPlayerState(Player as unknown as PlayerNumber).GetPlayerOptionsString('ModsLevel_Preferred' as unknown as ModsLevel))
    }
  }))

  const tempActor3 = LoadActor('PlayerSpecific/TimingInfo.lua', {
    Player,
    Width: calcwidth
  })

  // @ts-ignore
  tempActor3.InitCommand = function (self: ActorFrame) {
    self.xy(SCREEN_CENTER_X - playerdataxpos, SCREEN_CENTER_Y + 292).zoom(0.8)
  }

  // @ts-ignore
  tempActor3.OffCommand = function (self: ActorFrame) {
    self.linear(0.2).diffusealpha(0)
  }

  t.set(t.length() + 1, tempActor3)

  // @ts-ignore
  arguments.IsStaticElement = false
  // @ts-ignore
  arguments.Height = 590

  const spacingX = Player === PLAYER_2 ? -34 : 34

  t.set(t.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'Evaluation/InfoArea'),
    OnCommand: function (self: Sprite) {
      self.diffuse(PlayerColor(Player)).xy(SCREEN_CENTER_X + playerdataxpos - spacingX, SCREEN_CENTER_Y + 24).zoom(1.3)
    },
    OffCommand: function (self: Sprite) {
      self.stoptweening().easeinexpo(0.25).diffusealpha(0)
    }
  }))

  const tempActor4 = LoadActor('PlayerSpecific/Objects/PageView.lua', {
    PaneColor: ColorLightTone(PlayerColor(Player)),
    BGColor: ColorDarkTone(PlayerColor(Player)),
    Width: 370
  })

  // @ts-ignore
  tempActor4.OnCommand = function (self: ActorFrame) {
    self.xy(SCREEN_CENTER_X + playerdataxpos - spacingX, SCREEN_CENTER_Y - arguments.Height * .5 + 64)
  }

  t.set(t.length() + 1, tempActor4)
  for (const [k, v] of pairs(Pages)) {
    const tempInsideActor: any = LoadActor('PlayerSpecific/' + (v as string), arguments)
    tempInsideActor.Name + `Page + ${v as string}`
    tempInsideActor.InitCommand = function (self: ActorFrame) {
      self.xy(SCREEN_CENTER_X + playerdataxpos - spacingX, SCREEN_CENTER_Y + 24).playcommand('UpdateWidth'. {
        Width: MBG.GetZoomedWidth()
      })
    }
    t.set(t.length() + 1, tempInsideActor)
  }

  const tempActor5 = LoadActor('PageCount.lua', {
    numPages: (Pages as unknown as LuaTable).length(),
    Player,
    Width: arguments.Width,
    Current: CurPage
  })

  // @ts-ignore
  tempActor5.InitCommand = function (self: ActorFrame) {
    self.xy(SCREEN_CENTER_X + playerdataxpos - spacingX, SCREEN_CENTER_Y - arguments.Height * .5 + 90)
  }

  // @ts-ignore
  tempActor5.OffCommand = function (self: ActorFrame) {
    self.linear(0.2).diffusealpha(0)
  }

  t.set(t.length() + 1, tempActor5)


  if (playerCanSendOnlineScore) {
    let hasSentScore = false
    let cornerSavePos = Player === PLAYER_1 ? 170 : (SCREEN_WIDTH - 170)

    const insideActorFrame = new LuaTable()

    insideActorFrame.set('InitCommand', function (self: ActorFrame) {
      self.xy(SCREEN_CENTER_X - playerdataxpos, SCREEN_CENTER_Y + arguments.Height * .5 - 42).zoom(0.8)

      self.GetChild<BitmapText>('Image').diffuse(PlayerColor(Player)).visible(false).zoom(0.6)
      self.GetChild<BitmapText>('Status').xy(-arguments.Width * .5 + 40, 0).zoom(1).halign(0).settext('Submitting...')
      self.GetChild<BitmapText>('loadicon').x(self.GetChild('Status').GetX() - 26).diffusealpha(1)
      self.GetChild<BitmapText>('joinButton').visible(false)
      self.GetChild<BitmapText>('Reason').visible(false).zoom(0.8).halign(8).xy(-arguments.Width * .5 + 40, 6)
    })

    insideActorFrame.set('OffCommand', function (self: ActorFrame) {
      self.hurrytweening(0.05).linear(0.2).diffusealpha(0)
    })

    insideActorFrame.set('ResponseScoreSaveMessageCommand', function (self: ActorFrame, params) {
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

        const states = ['judgment data missing', 'Score Already Submitted']

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

    insideActorFrame.set('FadeOutFromScoreSuccessMessageCommand', function (self: ActorFrame, params) {
      if (params.Player !== Player) {
        return
      }

      self.GetChild('Image').finishtweening().sleep(2).easeinexpo(0.2).diffusealpha(1)
      self.GetChild('Status').finishtweening().sleep(2).easeinexpo(0.2).diffusealpha(0)
      self.GetChild('Reason').finishtweening().sleep(2).easeinexpo(0.2).y(-self.GetParent().GetChild('Mods').GetZoomedHeight()).diffusealpha(0.8).zoom(0.7)
    })

    insideActorFrame.set('OnlineScoreSaveFailedMessageCommand', function (self: ActorFrame, params) {
      if (params.Player !== Player) {
        return
      }

      (self.GetChild<BitmapText>('Status').zoom(0.7).y(-12) as BitmapText).settext(THEME.GetString('ScreenEvaluation', 'ScoreSubmitFailure')).diffusealpha(1);

      if (params.Reason) {
        self.GetChild<BitmapText>('Reason').settext(params.Reason).visible(true)
      }

      self.GetChild<Sprite>('Image').Load(THEME.GetPathG('OnlineStatus', 'offline')).x(self.GetChild('Status').GetX() - 26).visible(true)

      self.GetChild('loadicon').stoptweening().linear(0.1).diffusealpha(0)

      MESSAGEMAN.Broadcast('FadeOutFromScoreSuccess', { Player })
    })

    insideActorFrame.set(insideActorFrame.length() + 1, Def.BitmapText({
      Name: 'Status',
      Font: 'Common Normal'
    }))

    insideActorFrame.set(insideActorFrame.length() + 1, Def.BitmapText({
      Name: 'Reason',
      Font: 'Common Normal'
    }))

    insideActorFrame.set(insideActorFrame.length() + 1, Def.Sprite({
      Name: 'Image'
    }))

    insideActorFrame.set(insideActorFrame.length() + 1, Def.Sprite({
      Name: "loadicon",
      Texture: THEME.GetPathG("Loading", "icon"),
      InitCommand: function(self: ActorFrame) {
        self.spin().zoom(0.1).effectmagnitude(0, 0, 400)
      },
      UpdateScoresCommand: function(self: ActorFrame) {
        self.stoptweening().linear(0.1).diffusealpha(0)
      }
    }))

    const tempGenButton = genButtonAction({
      Width: 130,
      Height: 38,
      Border: 2,
      Pos: [arguments.Width * .5 - 60, 0],
      Action: function (self: ActorFrame) {
        if (playerCanSendOnlineScore) {
          self.GetParent().GetParent().playcommand('Init')

          const mainActorFrame: ActorFrame = self.GetParent().GetParent().GetParent()

          mainActorFrame.GetChild('Mods').playcommand('Init')

          const timingName = LoadModule('Options.ReturnCurrentTiming.lua')().Name
          const [didSend, reason] = NETMAN.ScoreSave(Player as unknown as PlayerNumber, timingName)

          if (!didSend) {
            MESSAGEMAN.Broadcast('OnlineScoreSaveFailed', {
              Reason: reason,
              Player
            })
          }
        }
      },
      AddActors: Def.ActorFrame([
        Def.BitmapText({
          Font: 'Common Normal',
          Text: 'Retry'
        })
      ])
    })

    tempGenButton.Name = 'joinButton'

    insideActorFrame.set(insideActorFrame.length() + 1, tempGenButton)
    t.set(t.length() + 1, Def.ActorFrame(insideActorFrame))
  }

  return t
}