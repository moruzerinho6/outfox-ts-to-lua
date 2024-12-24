{
  const fonts = {
    Bold: THEME.GetPathF('', 'IBMPlexSans-Bold.ttf'),
    Regular: THEME.GetPathF('', 'IBMPlexSans-Regular.ttf')
  }

  const btnAction: UIGenerateUIWithButtonAction = LoadModule('UI/UI.GenerateUIWithButtonAction.lua')

  const GridValues = {
    selectionCursor: [1, 2],
    cursorPositions: [
      [
        [SCREEN_CENTER_X - 80, SCREEN_CENTER_Y + 60, 120, 48],
        [SCREEN_CENTER_X + 80, SCREEN_CENTER_Y + 60, 120, 48]
      ]
    ]
  }

  const [CheckBoundry, selectionQuad] = LoadModule('UI/UI.Grid.lua')(GridValues)

  const MoveCursor = (self: ActorFrame, offset) => {
    if (self.disabled) {
      return;
    }

    CheckBoundry(offset)

    self.playcommand('MoveCursor', { Offset: offset, Cursor: GridValues.selectionCursor})
  }

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('InitCommand', function (self: ActorFrame) {
    self.diffusealpha(0)
  })
  actorFrameArg.set('RequestSkipCommand', function (self: ActorFrame) {
    self.stoptweening().linear(0.2).diffusealpha(1).sleep(0.1).queuecommand('Unmute')
  })
  actorFrameArg.set('UnmuteCommand', function (self: ActorFrame) {
    self.disabled = false
  })
  actorFrameArg.set('CancelSkipMessageCommand', function (self: ActorFrame) {
    self.disabled = true
    self.stoptweening().linear(0.2).diffusealpha(0)
  })
  actorFrameArg.set('OnCommand', function (self: ActorFrame) {
    self.disabled = true
    self.controller = LoadModule('Lua.InputSystem.lua')(self)

    SCREENMAN.GetTopScreen().AddInputCallback(self.controller)
    MoveCursor(self, [0, 0])
  })
  actorFrameArg.set('StartCommand', function (self: ActorFrame) {
    if (self.disabled) {
      return;
    }

    if (GridValues.selectionCursor[2] === 2) {
      MESSAGEMAN.Broadcast('CancelSkip')
    }

    if (GridValues.selectionCursor[2] === 1) {
      SCREENMAN.GetTopScreen().SetNextScreenName<ScreenWithMenuElements>('ScreenOptionsManageProfiles').StartTransitioningScreen('SM_GoToNextScreen')
    }
  })
  actorFrameArg.set('MenuLeftCommand', function (self: ActorFrame) {
    MoveCursor(self, [0, -1])
  })
  actorFrameArg.set('MenuRightCommand', function (self: ActorFrame) {
    MoveCursor(self, [0, 1])
  })

  const quadArg = new LuaTable()

  quadArg.set('InitCommand', function (self: Quad) {
    self.Center()
  })

  quadArg.set(quadArg.length() + 1, Def.Quad({
    InitCommand: function (self: Quad) {
      self.zoomto(SCREEN_WIDTH, 240).diffuse(Alpha(color('#00323F'), 0.88))
    }
  }))

  quadArg.set(quadArg.length() + 1, Def.Text({
    Font: fonts.Regular,
    Size: 40,
    Text: Screen.String('WarningOnlineHeader'),
    OnCommand: function (self: Text) {
      self.zoom(0.5).y(-60)
    }
  }))

  quadArg.set(quadArg.length() + 1, Def.Text({
    Font: fonts.Regular,
    Sie: 40,
    Text: Screen.String('WarningOnlineDescription'),
    OnCommand: function (self: Text) {
      (self.zoom(0.5).y(10) as unknown as BitmapText).vertspacing(1.3).Regen()
    }
  }))

  quadArg.set(quadArg.length() + 1, btnAction({
    Width: 120,
    Height: 48,
    Pos: [-80, 60],
    Action: function (self: ActorFrame) {
      SCREENMAN.GetTopScreen().SetNextScreenName<ScreenWithMenuElements>('ScreenOptionsManageProfiles').StartTransitioningScreen('SM_GoToNextScreen')()
    },
    AddActors: Def.ActorFrame([
      Def.Text({
        Font: fonts.Bold,
        Size: 40,
        Text: THEME.GetString('PopupWindow', 'Yes'),
        OnCommand: function (self: Text) {
          self.zoom(0.7).y(8)
        }
      })
    ])
  }))

  quadArg.set(quadArg.length() + 1, btnAction({
    Width: 120,
    Height: 48,
    Pos: [80, 60],
    Action: function (self: ActorFrame) {
      MESSAGEMAN.Broadcast('CancelSkip')
    },
    AddActors: Def.ActorFrame([
      Def.Text({
        Font: fonts.Bold,
        Size: 40,
        Text: THEME.GetString('PopupWindow', 'No'),
        OnCommand: function (self: Text) {
          self.zoom(0.7).y(8)
        }
      })
    ])
  }))

  actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad(quadArg))

  const t: ActorFrame = Def.ActorFrame(actorFrameArg)

  //@ts-ignore
  return t
}