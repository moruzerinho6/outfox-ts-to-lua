{
  const t: ActorFrame = Def.ActorFrame({})

  const EditorLayout: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      self.xy(SCREEN_WIDTH * .5, SCREEN_BOTTOM - 20).zoom(0.8)

      type ThoseChildren = {
        Beat:         ActorFrame;
        LabelBeat:    ActorFrame;
        LabelSecond:  ActorFrame;
        LabelBPM:     ActorFrame;
        BPM:          ActorFrame;
        BG:           ActorFrame;
      }
      const c: ThoseChildren = self.GetChildren();

      c.Beat.x(-(c.BG.GetZoomedWidth() * .5) + 60)
      c.LabelBeat.xy(-(c.BG.GetZoomedWidth() * .5) + 60, -20).zoom(0.8)

      c.LabelSecond.xy(0, -20).zoom(0.8)

      c.LabelBPM.xy((c.BG.GetZoomedWidth() * .5) - 60, -20).zoom(0.8)
      c.BPM.x((c.BG.GetZoomedWidth() * .5) - 60)
    },
    EditorStateChangedMessageCommand: function (self: ActorFrame, param) {
      self.visible(param.EdtiState !== 'EditState_Playing')
    },
    EditorUpdateCommand: (self: ActorFrame, param) => {
      type ThoseChildren = {
        Beat:         BitmapText;
        Second:       BitmapText;
        BPM:          BitmapText;
      }
      const c: ThoseChildren = self.GetChildren()

      c.Beat.settext(string.format('%.3f', param.Beat))
      c.Second.settext(string.format('%.3f', param.Second))
      c.BPM.settext(string.format('%.3f', param.BPM))
    },
    EditorTimingModeChangedMessageCommand: function (self: ActorFrame, param) {

    }
  })

  EditorLayout.set(EditorLayout.length() + 1, Def.Quad({
    Name: 'BG',
    InitCommand: function (self: Quad) {
      self.zoomto(SCREEN_WIDTH * .6, 64).diffuse(color('#00000088'))
    }
  }))

  EditorLayout.set(EditorLayout.length() + 1, Def.BitmapText({ Font: 'Common Normal', Text: 'Beat', Name: 'LabelBeat' }))
  EditorLayout.set(EditorLayout.length() + 1, Def.BitmapText({ Font: 'Common Normal', Text: 'Second', Name: 'LabelSecond' }))
  EditorLayout.set(EditorLayout.length() + 1, Def.BitmapText({ Font: 'Common Normal', Text: 'BPM', Name: 'LabelBPM' }))

  EditorLayout.set(EditorLayout.length() + 1, Def.BitmapText({ Font: 'Common Normal', Name: 'Beat' }))
  EditorLayout.set(EditorLayout.length() + 1, Def.BitmapText({ Font: 'Common Normal', Name: 'Second' }))
  EditorLayout.set(EditorLayout.length() + 1, Def.BitmapText({ Font: 'Common Normal', Name: 'BPM' }))

  t.set(t.length() + 1, EditorLayout)

  let showInfo = false
  const StepsInformation: ActorFrame = Def.ActorFrame({
    StepsChangedCommand: function (self: ActorFrame) {
      self.GetChild('ChartInfo').playcommand('UpdateStep')
    },
    EditorStateChangedMessageCommand: function (self: ActorFrame, param) {
      self.visible(param.EditState !== 'EditState_Playing')
    }
  })
  StepsInformation.set(StepsInformation.length() + 1, Def.Quad({
    Name: 'BG',
    InitCommand: function (self: Quad) {
      self.zoomto(260, 200).diffuse(color('#22222277'))
    }
  }))

  const temporaryModule = LoadModule('UI/UI.ClickArea.lua')({
    Debug: true,
    Width: 60,
    Height: 60,
    Action: function (self: ActorFrame) {
      showInfo = !showInfo
      self.GetParent<ActorFrame>().stoptweening().easeoutquint(0.2).x(showInfo ? 130 : -130)
    }
  })

  temporaryModule.InitCommand = function (self: ActorFrame) {
    const BG = self.GetParent<ActorFrame>().GetChild<ActorFrame>('BG')

    self.xy(BG.GetZoomedWidth() * .5 + 30, -130)
  }

  StepsInformation.set(StepsInformation.length() + 1, temporaryModule)

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('Name', 'ChartInfo')
  actorFrameArg.set('InitCommand', function (self: ActorFrame) {
    self.RunCommandsRecursively(function (self: BitmapText) {
      if (self.settext) {
        self.maxwidth(600 * self.GetZoom())
      }
    })
  })
  actorFrameArg.set('UpdateStepCommand', function (self: ActorFrame) {
    const steps_data = GAMESTATE.GetCurrentSteps(PLAYER_1 as unknown as PlayerNumber)

    LoadModule('Color.CustomDiffToColor.lua')(self.GetChild('LevelBG'), steps_data)

    const Diff = steps_data.GetDifficulty()

    self.GetChild<BitmapText>('DifficultyName').settext(THEME.GetString('CustomDifficulty', ToEnumShortString(steps_data.GetDifficulty())))
    self.GetChild<BitmapText>('DifficultyStyle').settext(THEME.GetString('StepsType', ToEnumShortString(steps_data.GetStepsType())))
    self.GetChild<BitmapText>('DifficultyMeter').settext(steps_data.GetMeter())

    self.GetChild<Sprite>('StyleIcon').Load(THEME.GetPathG("", "_StepsVector/" + ToEnumShortString(steps_data.GetStepsType())))
  })

  actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({
    Name: 'LevelBG',
    InitCommand: function (self: Quad) {
      const BG = self.GetParent<ActorFrame>().GetChild<ActorFrame>('BG')

      self.zoomto(BG.GetZoomedWidth(), 60).valign(1).playcommand('UpdateStep')
    }
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Name: 'DifficultyName',
    Font: '_plex bold',
    InitCommand: function (self: BitmapText) {
      const BG = self.GetParent<ActorFrame>().GetChild<ActorFrame>('BG');

      (self.x(-BG.GetZoomedWidth() * .28).halign(0) as BitmapText).uppercase(true).y(-20).zoom(0.4)
    }
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Name: 'DifficultyMeter',
    Font: '_plex bold',
    InitCommand: function (self: BitmapText) {
      const BG = self.GetParent<ActorFrame>().GetChild<ActorFrame>('BG');

      self.x(BG.GetZoomedWidth() * .4).halign(1).zoom(0.8).x(-30)
    }
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
    Name: 'StyleIcon',
    InitCommand: function (self: Sprite) {
      self.xy(-self.GetParent<ActorFrame>().GetParent<ActorFrame>().GetChild<ActorFrame>('BG').GetZoomedWidth() * .38, -30).zoom(0.6)
    }
  }))

  StepsInformation.set(StepsInformation.length() + 1, Def.ActorFrame(actorFrameArg))

  const actorFrameArg2 = new LuaTable()

  actorFrameArg2.set('Name', 'Labels')
  actorFrameArg2.set('InitCommand', function (self: ActorFrame) {
    let indx = 0
    const Background = self.GetParent<ActorFrame>().GetChild<ActorFrame>('BG')

    self.RunCommandsRecursively(function (self: BitmapText) {
      self.halign(0).zoom(0.7)

      if (self.settext) {
        self.settext(THEME.GetString('PaneDisplay', self.GetName())).xy(-Background.GetZoomedWidth() * .6, -Background.GetZoomedHeight() * .56 + (32 * indx))
        indx = indx + 1
      }
    })
  })
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Steps' }))
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Jumps' }))
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Hands' }))
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Holds' }))
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Mines' }))
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Rolls' }))
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Lifts' }))
  actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Fakes' }))

  StepsInformation.set(StepsInformation.length() + 1, Def.ActorFrame(actorFrameArg2))

  const actorFrameArg3 = new LuaTable()

  actorFrameArg3.set('Name', 'Values')
  actorFrameArg3.set('InitCommand', function (self: ActorFrame) {
    let indx = 0
    const Background = self.GetParent<ActorFrame>().GetChild<ActorFrame>('BG')

    self.RunCommandsRecursively(function (self: BitmapText) {
      self.halign(1).zoom(0.7)

      if (self.settext) {
        self.settext(self.GetName()).y(-Background.GetZoomedHeight() * .56 + (32 * indx)).x(Background.GetZoomedWidth() * .6)
        indx = indx + 1
      }
    })
  })
  actorFrameArg3.set('EditorUpdateCommand', function (self: ActorFrame, params) {
    if (params.Taps) {
      self.GetChild<BitmapText>('Taps').settext(params.Taps)
      self.GetChild<BitmapText>('Jumps').settext(params.Jumps)
      self.GetChild<BitmapText>('Hands').settext(params.Hands)
      self.GetChild<BitmapText>('Holds').settext(params.Holds)
      self.GetChild<BitmapText>('Mines').settext(params.Mines)
      self.GetChild<BitmapText>('Rolls').settext(params.Rolls)
      self.GetChild<BitmapText>('Lifts').settext(params.Lifts)
      self.GetChild<BitmapText>('Fakes').settext(params.Fakes)
    }
  })
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Taps' }))
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Jumps' }))
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Hands' }))
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Holds' }))
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Mines' }))
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Rolls' }))
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Lifts' }))
  actorFrameArg3.set(actorFrameArg3.length() + 1, Def.BitmapText({ Font: '_plex bold', Name: 'Fakes' }))

  StepsInformation.set(StepsInformation.length() + 1, Def.ActorFrame(actorFrameArg3))

  // @ts-ignore
  StepsInformation.InitCommand = function (self: ActorFrame) {
    self.xy(-130, SCREEN_BOTTOM - 200)
  }

  t.set(t.length() + 1, StepsInformation)

  const buttons: ActorFrame = Def.ActorFrame({
    EditorStateChangedMessageCommand: function (self: ActorFrame, param) {
      self.visible(param.EditState !== 'EditState_Playing')
    }
  })

  buttons.set(buttons.length() + 1, LoadModule('UI/UI.GenerateUIWithButtonAction.lua')({
    Width: 70,
    Height: 40,
    Pos: [SCREEN_RIGHT - 50, 36],
    Action: function (self: ActorFrame) {
      SCREENMAN.AddNewScreenToTop('ScreenEditHelp')
    },
    AddActors: Def.ActorFrame([
      Def.BitmapText({
        Font: '_plex bold',
        Text: '?',
        OnCommand: function (self: BitmapText) {
          self.zoom(0.6).x(-16)
        }
      }),
      Def.BitmapText({
        Font: '_plex bold',
        Text: 'F1',
        OnCommand: function (self: BitmapText) {
          self.zoom(0.5).x(10)
        }
      })
    ])
  }))

  buttons.set(buttons.length() + 1, LoadModule('UI/UI.GenerateUIWithButtonAction.lua')({
    Width: 160,
    Height: 40,
    Pos: [SCREEN_RIGHT - 170, 36],
    Action: function (self: ActorFrame) {
      SCREENMAN.AddNewScreenToTop('ScreenEditorOptions')
    },
    AddActors: Def.ActorFrame([
      Def.Sprite({
        Texture: THEME.GetPathG("", "TitleMenuIcon/Settings"),
        OnCommand: function (self: Sprite) {
          self.zoom(0.08).x(-54)
        }
      }),
      Def.BitmapText({
        Font: '_plex bold',
        Text: 'SETTINGS',
        OnCommand: function (self: BitmapText) {
          self.zoom(0.4).x(-20).halign(0)
        }
      })
    ])
  }))

  t.set(t.length() + 1, buttons)

  t.set(t.length() + 1, LoadActor('./ChartInfo.lua'))

  // @ts-ignore
  return t
}