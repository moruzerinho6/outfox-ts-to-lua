//@ts-ignore
return function (MenuList, QuadSize, MarginArea, ButtonAreaY, DropdownMT: UIDropDown) {
  let InputSystem;
  let allowedToMove = true

  const LimitRange = (Val: number, Start: number, Endv: number, Min: number, Max: number) => {
    const EndVal = scale(Val, Start, Endv, Min, Max)

    return clamp(EndVal, Min, Max)
  }

  const ButtonPosFunc = {
    x: function (a: number, k) {
      return LimitRange((a-1) % 3, 0 , 2, MarginArea[1], MarginArea[2])
    },
    y: function (k: number) {
      return LimitRange(k - 1, 0, k, ButtonAreaY, ButtonAreaY + QuadSize[2] * 2)
    }
  }

  const profileOrTutorial = function () {
    if (SONGMAN.GetNumSongs() === 0) {
      return 'ScreenHowToInstallSongs'
    }

    if (PROFILEMAN.GetNumLocalProfiles() === 0) {
      return 'ScreenProfileLoad'
    }

    return 'ScreenSelectProfile'
  }

  const quadWidth = tonumber(QuadSize[1] - 10)
  const quadHeight = tonumber(QuadSize[2] - 6)
  const ThreeButtonComp: boolean = PREFSMAN.GetPreference('ThreeKeyNavigation')
  // For some reason this is defined later in the .lua file, so you'll see a lot of unnecessary cast to boolean, I'm to lazy ro remove them ~ zerinho6

  const buttonInfoIndex0Index0 = new LuaTable()
  buttonInfoIndex0Index0.set(buttonInfoIndex0Index0.length() + 1, ButtonPosFunc.x(1))
  buttonInfoIndex0Index0.set(buttonInfoIndex0Index0.length() + 1, ButtonPosFunc.y(1))
  buttonInfoIndex0Index0.set(buttonInfoIndex0Index0.length() + 1, quadWidth)
  buttonInfoIndex0Index0.set(buttonInfoIndex0Index0.length() + 1, quadHeight)
  buttonInfoIndex0Index0.set('upSkip', [3,1])
  buttonInfoIndex0Index0.set('downSkip', [3,1])
  buttonInfoIndex0Index0.set('metaData', ['Play Now', profileOrTutorial(), 'Corner', 0])

  const buttonInfoIndex0Index1 = new LuaTable()
  buttonInfoIndex0Index1.set(buttonInfoIndex0Index1.length() + 1, ButtonPosFunc.x(2))
  buttonInfoIndex0Index1.set(buttonInfoIndex0Index1.length() + 1, ButtonPosFunc.y(1))
  buttonInfoIndex0Index1.set(buttonInfoIndex0Index1.length() + 1, quadWidth)
  buttonInfoIndex0Index1.set(buttonInfoIndex0Index1.length() + 1, quadHeight)
  buttonInfoIndex0Index1.set('upSkip', [3,2])
  buttonInfoIndex0Index1.set('downSkip', [3,2])
  buttonInfoIndex0Index1.set('metaData', ['Profiles', 'ScreenOptionsManagerProfiles', 'Middle'])

  const buttonInfoIndex0Index2 = new LuaTable()
  buttonInfoIndex0Index2.set(buttonInfoIndex0Index2.length() + 1, ButtonPosFunc.x(3))
  buttonInfoIndex0Index2.set(buttonInfoIndex0Index2.length() + 1, ButtonPosFunc.y(1))
  buttonInfoIndex0Index2.set(buttonInfoIndex0Index2.length() + 1, quadWidth)
  buttonInfoIndex0Index2.set(buttonInfoIndex0Index2.length() + 1, quadHeight)
  buttonInfoIndex0Index2.set('upSkip', [3,3])
  buttonInfoIndex0Index2.set('rightSkip', (ThreeButtonComp as boolean) ? [3,1] : [1,1])
  buttonInfoIndex0Index2.set('metaData', ['Fitness', 'ScreenSelectProfileFitness', 'Corner', -1])



  const buttonInfoIndex1Index0 = new LuaTable()
  buttonInfoIndex1Index0.set(buttonInfoIndex1Index0.length() + 1, ButtonPosFunc.x(3))
  buttonInfoIndex1Index0.set(buttonInfoIndex1Index0.length() + 1, ButtonPosFunc.y(1.75))
  buttonInfoIndex1Index0.set(buttonInfoIndex1Index0.length() + 1, quadWidth)
  buttonInfoIndex1Index0.set(buttonInfoIndex1Index0.length() + 1, quadHeight * .5)
  buttonInfoIndex1Index0.set('upSkip', [1,3])
  buttonInfoIndex1Index0.set('rightSkip', [3,1])
  buttonInfoIndex1Index0.set('leftSkip', [3,2])
  buttonInfoIndex1Index0.set('downSkip', [3,3])
  buttonInfoIndex1Index0.set('metaData', ['Jukebox', 'ScreenJukeboxMenu', 'Small', 0])
  


  const buttonInfoIndex2Index0 = new LuaTable()
  buttonInfoIndex2Index0.set(buttonInfoIndex2Index0.length() + 1, ButtonPosFunc.x(1))
  buttonInfoIndex2Index0.set(buttonInfoIndex2Index0.length() + 1, ButtonPosFunc.y(2))
  buttonInfoIndex2Index0.set(buttonInfoIndex2Index0.length() + 1, quadWidth)
  buttonInfoIndex2Index0.set(buttonInfoIndex2Index0.length() + 1, quadHeight)
  buttonInfoIndex2Index0.set('upSkip', [1,1])
  buttonInfoIndex2Index0.set('leftSkip', [1,3])
  buttonInfoIndex2Index0.set('downSkip', [1,1])
  buttonInfoIndex2Index0.set('metaData', ['Settings', 'OptionsMenu', 'Buttom', 0])

  const buttonInfoIndex2Index1 = new LuaTable()
  buttonInfoIndex2Index1.set(buttonInfoIndex2Index1.length() + 1, ButtonPosFunc.x(2))
  buttonInfoIndex2Index1.set(buttonInfoIndex2Index1.length() + 1, ButtonPosFunc.y(2))
  buttonInfoIndex2Index1.set(buttonInfoIndex2Index1.length() + 1, quadWidth)
  buttonInfoIndex2Index1.set(buttonInfoIndex2Index1.length() + 1, quadHeight)
  buttonInfoIndex2Index1.set('upSkip', [1,2])
  buttonInfoIndex2Index1.set('downSkip', [1,2])
  buttonInfoIndex2Index1.set('metaData', ['Editor', 'ScreenEditMenu', 'Middle'])


  const buttonInfoIndex2Index2 = new LuaTable()
  buttonInfoIndex2Index2.set(buttonInfoIndex2Index2.length() + 1, ButtonPosFunc.x(3))
  buttonInfoIndex2Index2.set(buttonInfoIndex2Index2.length() + 1, ButtonPosFunc.y(2.25))
  buttonInfoIndex2Index2.set(buttonInfoIndex2Index2.length() + 1, quadWidth)
  buttonInfoIndex2Index2.set(buttonInfoIndex2Index2.length() + 1, quadHeight * .5)
  buttonInfoIndex2Index2.set('rightSkip', (ThreeButtonComp as boolean) ? [1,1] : [3,1])
  buttonInfoIndex2Index2.set('downSkip', [1,3])
  buttonInfoIndex2Index2.set('metaData', ['Quit', 'ScreenExit', 'SmallCorner', 0])

  const buttonInfo = [
    [
      buttonInfoIndex0Index0,
      buttonInfoIndex0Index1,
      buttonInfoIndex0Index2
    ],
    [
      buttonInfoIndex1Index0
    ],
    [
      buttonInfoIndex2Index0,
      buttonInfoIndex2Index1,
      buttonInfoIndex2Index2
    ]
  ]

  const GridValues = {
    selectionCursor: [1,1],
    cursorPositions: buttonInfo
  }

  let [CheckBoundry, selectorQuad, changeCursorPos, selectionCursor, isAtOption] = LoadModule('UI/UIGrid')(GridValues)

  const t: ActorFrame = Def.ActorFrame({
    OnCommand: function (self: ActorFrame) {
      InputSystem = LoadModule('Lua.InputSystem.lua')(self)
      SCREENMAN.GetTopScreen().AddInputCallback(InputSystem)
      self.playcommand('Move', [0, 0])
    },
    DropdownMenuStateChangedMessageCommand: function (self: ActorFrame, params) {
      allowedToMove = !params.IsOpen
    },
    OffCommand: function (self: ActorFrame) {
      SCREENMAN.GetTopScreen().RemoveInputCallback(InputSystem)
    },
    MenuLeftCommand: function (self: ActorFrame) {
      self.playcommand('Move', [0, -1])
    },
    MenuRightCommand: function (self: ActorFrame) {
      self.playcommand('Move', [0, 1])
    },
    MenuUpCommand: function (self: ActorFrame) {
      self.playcommand('Move', [-1, 0])
    },
    MenuDownCommand: function (self: ActorFrame) {
      self.playcommand('Move', [1, 0])
    },
    BackCommand: function (self: ActorFrame) {
      if (!allowedToMove) {
        DropdownMT.CloseMenu()
      }
    },
    StartCommand: function (self: ActorFrame) {
      if (!allowedToMove) {
        DropdownMT.ConfirmChoice()
        return;
      }

      const pos = CheckBoundry([0, 0])

      SCREENMAN.PlayStartSound()
      GAMESTATE.JoinPlayer(self.pn || PLAYER_1);
      (SCREENMAN.GetTopScreen().SetNextScreenName(((buttonInfo[pos[1]][pos[2]] as AnyTable).metaData[2] as string)) as ScreenWithMenuElements).StartTransitioningScreen('SM_GoToNextScreen')
    },
    MoveCommand: function (self: ActorFrame, param) {
      if (!allowedToMove) {
        DropdownMT.MoveOption(param[ThreeButtonComp ? 1 : 2])
        return
      }

      const newpos = CheckBoundry(param)

      if (!param[3]) {
        self.GetChild('SoundChange').play()
      }

      for (const [k, v] of pairs(buttonInfo)) {
        for (const [a, w] of pairs(v)) {
          self.GetChild('Button' + (k as string) + (a as string)).playcommand('LoseFocus')

          if (k === newpos[1] && a === newpos[2]) {
            self.GetChild('Button' + (k as string) + (a as string)).playcommand('GainFocus')
          }
        }
      }
    }
  })

  t.set(t.length() + 1, Def.Sound({
    Name: 'SoundChange',
    File: THEME.GetPathS('Common', 'Value')
  }))

  t.set(t.length() + 1, Def.Quad({
    OnCommand: function (self: Quad) {
      self.zoomto(SCREEN_WIDTH, QuadSize[2] * (MenuList as LuaTable).length()).y(ButtonAreaY + (QuadSize[2] / 2) * ((MenuList as LuaTable).length() - 1))
      .halign(0).diffuse(Alpha(Color.Black, 0.4)).cropleft(1).decelerate(0.2).cropleft(0)
    },
    OffCommand: function (self: Quad) {
      self.easeinexpo(0.25).zoomy(0).diffusealpha(0).sleep(0.1)
    }
  }))

  for (const [k,v] of pairs (buttonInfo)) {
    for (const [a,w] of pairs(v)) {
      const ButtonActorFrame: ActorFrame = Def.ActorFrame({
        Name: 'Button' + (k as string) + (a as string),
        InitCommand: function (self: ActorFrame) {
          self.addx(200).diffusealpha(0).sleep(0.05*(k as number)).easeoutexpo(0.5).addx(-200).diffusealpha(1)
        },
        OffCommand: function (self: ActorFrame) {
          self.hurrytweening(0.2)

          const pos = CheckBoundry([0,0])

          if (k === pos[1] && a === pos[2]) {
            self.sleep(0.2).easeoutquart(0.25).diffusealpha(0)
          } else {
            self.sleep(0.02 * (a as number)).easeoutquart(0.2).diffusealpha(0)
          }
        },
        GainFocusCommand: function (self: ActorFrame) {
          self.GetChild('ObjectBox').stoptweening().easeoutquint(0.5).diffuse(Alpha(Color.White, 1))
        },
        LoseFocusCommand: function (self: ActorFrame) {
          self.GetChild('ObjectBox').stoptweening().easeoutquint(0.5).diffuse(Alpha(Color.White, 0.5))
        }
      })

      const whatKindOfButton = function() {
        return ((w as AnyTable).metaData[3] as string) + 'Button'
      }

      const temporaryModuleArg = new LuaTable()
      temporaryModuleArg.set('UseImage', Def.Sprite({
        Texture: THEME.GetPathG('Shapes/Title', whatKindOfButton()),
        InitCommand: function (self: Sprite) {
          self.zoom(1.4)
          if ((w as AnyTable).metaData[4]) {
            self.rotationy(180 * (w as AnyTable).metaData[4])
          }

          self.diffuse(GameColor.Custom['MenuButtonBorder'])

          if (((w as AnyTable).metaData[1] as string) === 'Quit') {
            self.diffuse(Color.Red)
          }
        }
      }))
      temporaryModuleArg.set('Width', w[3])
      temporaryModuleArg.set('Height', w[4])
      temporaryModuleArg.set('Pos', w)
      temporaryModuleArg.set('Cache', true)
      temporaryModuleArg.set('Action', function (self: Quad) {
        if (!allowedToMove) {
          allowedToMove = true
          DropdownMT.CloseMenu()
          return false
        }
        selectionCursor = changeCursorPos([k, a])
        const sc = self.GetParent().GetParent().GetParent()

        sc.playcommand('Move', [0, 0, 1])
        sc.playcommand('Start')
        return true
      })

      interface metadataThree {
        find: (this: metadataThree, val: string) => boolean
      }

      const actorFrameArg = new LuaTable()
      actorFrameArg.set(actorFrameArg.length() + 1, Def.Text({
        Font: THEME.GetPathF('', 'IBMPlexSans-Bold.ttf'),
        Text: ToUpper(THEME.GetString('ScreenTitleMenu', (w as AnyTable).metaData[1] as string)),
        Size: 40,
        InitCommand: function (self: Text) {
          const blockYPos = self.GetParent().GetParent().GetChild('BG').GetZoomedHeight() * .5;

          self.valign(1).y(blockYPos - 24).zoom(0.8)

          if (((w as AnyTable).metaData[3] as metadataThree).find('Small')) {
            self.xy(44, 8).zoom(LoadModule('Lua.Resize.lua')([
              self.MainActor().GetZoomedWidth(),
              self.MainActor().GetZoomedHeight(),
              quadWidth - 70,
              44
            ]))
          }
        }
      }))

      actorFrameArg.set(actorFrameArg.length() + 1, Def.Sprite({
        Texture: THEME.GetPathG('', 'TitleMenuIcon/' + (w as AnyTable).metaData[1] as string),
        OnCommand: function (self: Sprite) {
          self.y(-24).zoom(0.25)

          if (((w as AnyTable).metaData[3] as metadataThree).find('Small')) {
            self.xy(-100, 0).zoom(0.2)
          }
        }
      }))

      temporaryModuleArg.set('AddActors', Def.ActorFrame(actorFrameArg))
      const temporaryModule = LoadModule('UI/UI.GenerateUIWithButtonAction')(temporaryModuleArg)

      temporaryModule.Name = 'ObjectBox'
      ButtonActorFrame.set(ButtonActorFrame.length() + 1, temporaryModule)

      t.set(t.length() + 1, ButtonActorFrame)
    }
  }

  return t
}