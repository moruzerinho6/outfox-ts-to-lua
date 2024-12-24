// @ts-expect-error
return function () {
  const Choices = new LuaTable<number, any>()
  Choices.set(Choices.length() + 1, {
    Name: 'dance',
    Styles: 'Single (4 panels)\nSolo (6 panels\nThree (3 panels)\nDouble (8panels)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'groove',
    Styles: 'Mod file-oriented variant of dance\nSingle (4 panels)\nSolo (6 panels\nThree (3 panels)\nDouble (8panels'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'pump',
    Styles: 'Single (5 panels)\nHalfDouble (6 panels)\nDouble (10 panels)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'smx',
    Styles: 'Single (5 Panel)\nDual (6 Panel)\nDouble (10 Panel)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'techno',
    Styles: 'Cross (4 panels)\nDiagonal (5 panels)\nSquare (8 panels)\nSquare+ (9 panels)\nCross Double (8 panels)\nDiagonal Double (10 panels)\nSquare Double (16 panels)\nSquare+ Double (18 panels)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'be-mu',
    Styles: 'Single 5 (5 buttons, 1 turntable)\nSingle 5 with pedal (5 buttons, 1 turntable, 1 footpedal)\nSingle 7 (7 buttons, 1 turntable)\nDouble 10 (10 buttons, 2 turntable)\nDouble 10 with pedal (10 buttons, 2 turntables, 2 footpedals)\nDouble 14 (14 buttons, 2 turntables)',
    Link: 'bemu'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'po-mu',
    Styles: '3 buttons\n4 buttons\n5 buttons\n7 buttons\n9 buttons',
    Link: 'pomu'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'gddm',
    Styles: '10-piece (8 drums, bass pedal, hi-hat pedal)\n9-piece (7 drums, bass pedal, hi-hat pedal)\n6-piece (5 drums, bass pedal)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'gdgf',
    Styles: 'Guitar 5 (5 frets)\nBass 5 (5 frets, open strum)\nGuitar 6 (6 frets)\nGuitar 3 (3 frets)\nBass 3 (3 frets, open strum)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'gh',
    Styles: 'Solo, Bass, Rhythm (5 frets)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'taiko',
    Styles: 'Single (drumhead/red, rim/blue)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'bongo',
    Styles: 'Single'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'para',
    Styles: 'Single (5 sensors)\n360 (8 sensors)\nDouble (10 sensors)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'kbx',
    Styles: '1 to 15 buttons'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'ez2',
    Styles: 'Single (3 panels, 2 sensors)\nReal (3 panels, 2 upper sensors, 2 lower sensors)\nDouble (6 panels, 4 sensors)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'ds3ddx',
    Styles: 'Single (4 panels, 4 sensors)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'maniax',
    Styles: 'Single (4 sensors)\nDouble (8 sensors)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'stepstage',
    Styles: 'Single (6 panel)'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'kickbox',
    Styles: 'Human\nQuadarm\nInsect\nArachnid'
  })
  Choices.set(Choices.length() + 1, {
    Name: 'boxing',
    Styles: 'Boxing'
  })

  const isVerticalScreen = GetScreenAspectRatio() < 1
  let isOpeningLink = false
  let linkChoice = 1
  let choice = 1
  const ySpacing = 64

  for (const [i,v] of ipairs((Choices as unknown as Record<number, AnyTable>))) {
    if (v.Name === GAMESTATE.GetCurrentGame().GetName()) {
      choice = i
    }
  }

  const ColorTable: AnyTable = LoadModule('Theme.Colors.lua')( LoadModule('Config.Load.lua')('SoundwavesSubTheme', 'Save/OutFoxPrefs.ini') )

  function MoveOption(self: ActorFrame, offset) {

    if (isOpeningLink) {
      linkChoice = linkChoice + offset

      if (linkChoice < 1) {
        linkChoice = 1
      }

      if (linkChoice > 2) {
        linkChoice = 2
      }

      self.GetParent().GetChild('DisplayWindow').playcommand('MoveCursor')
      return
    }

    choice = choice + offset

    if (choice < 1) {
      choice = 1
    }

    if (choice > Choices.length()) {
      choice = Choices.length()
    }

    for (const i of $range(1, Choices.length())) {
      self.GetChild('Container').GetChild('Selection' + i).stoptweening().easeoutquint(0.5).y(-ySpacing+(ySpacing*(i-(choice-1))) );

      if (i === choice) {
        self.GetChild<ActorFrame>('Container').GetChild('Selection' + i).GetChild('Text').stoptweening().linear(.08).diffuse(ColorTable['MenuButtonBorder']).diffusealpha(1);
        self.GetChild<ActorFrame>('Container').GetChild('Selection' + i).GetChild('GameIcon').stoptweening().linear(.08).diffuse(color('#FFFFFF'));
        self.GetChild<ActorFrame>('Container').GetChild('Selection' + i).GetChild('BG').stoptweening().linear(.08).diffuse(ColorDarkTone(ColorTable['MenuButtonBorder'])).diffusebottomedge(ColorTable['MenuButtonGradient'])
      } else {
        self.GetChild<ActorFrame>('Container').GetChild('Selection' + i).GetChild('Text').stoptweening().linear(.08).diffuse(ColorTable['MenuTextGainFocus']).diffusealpha(0.8);
        self.GetChild<ActorFrame>('Container').GetChild('Selection' + i).GetChild('GameIcon').stoptweening().linear(.08).diffuse(color('#888888'));
        self.GetChild<ActorFrame>('Container').GetChild('Selection' + i).GetChild('BG').stoptweening().linear(.08).diffuse(ColorDarkTone(ColorTable['MenuButtonBase']))
      }

      self.GetChild('Previews').GetChild('Preview_' + (Choices.get(i).Name as string)).visible(0)
      self.GetChild('Previews').GetChild('Icon_' + (Choices.get(i).Name as string)).visible(0)
    };

    self.GetChild<BitmapText>('GameTitleHeader').settext(Choices.get(choice).Name);
    self.GetChild<BitmapText>('Info').settext(Choices.get(choice).Styles);
    self.GetChild<BitmapText>('ModeDesc').settext(Choices.get(choice).Description || '');
    self.GetChild('Previews').GetChild('Preview_' + (Choices.get(choice).Name as string)).visible(1);
    self.GetChild('Previews').GetChild('Icon_' + (Choices.get(choice).Name as string)).visible(1);

    if (offset !== 0) {
      self.GetChild('Change').play()
    }
  }

  const Container: ActorFrame = Def.ActorFrame({ Name: 'Container' })
  const Previews: ActorFrame = Def.ActorFrame({ Name: 'Previews' })

  for (const [i, v] of ipairs(Choices as unknown as Record<number, any>)) {
    const ActorFrameArg = new LuaTable()

    ActorFrameArg.set('Name', 'Selection' + i)
    ActorFrameArg.set('InitCommand', function(this: ActorFrame) {
      this.y(-ySpacing+(ySpacing*(i-(choice-1))))
      this.GetChild('Border').visible(choice === i).diffuse(ColorTable['MenuButtonBorder'])
      this.GetChild('BaseBorder').diffuse(ColorTable['MenuButtonBorder']).diffusealpha(0.25)

      if (choice === i) {
        this.GetChild('Text').diffuse(ColorTable['MenuButtonBorder'])
        this.GetChild('BG').diffuse(ColorDarkTone(ColorTable['MenuButtonBorder'])).diffusebottomedge(ColorTable['MenuButtonGradient'])
      } else {
        this.GetChild('Text').diffuse(ColorTable['MenuTextGainFocus']).diffusealpha(0.8)
        this.GetChild('GameIcon').diffuse(color('#888888'))
        this.GetChild('BG').diffuse(ColorDarkTone(ColorTable['MenuButtonBase']))
      }
    })
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Sprite({
      Name: 'BG',
      Texture: THEME.GetPathG('', 'UI/gametypeSide')
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Sprite({
      Name: 'BaseBorder',
      Texture: THEME.GetPathG('', 'UI/gametypeBorder')
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Sprite({
      Name: 'Border',
      Texture: THEME.GetPathG('', 'UI/gametypeBorder')
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
      Width: 340,
      Height: 60,
      Action: function(this: Actor) {
        if (isOpeningLink) {
          return;
        }

        if (choice === i) {
          this.GetParent().GetParent().GetParent().playcommand('Start')
          return
        }

        choice = i
        MoveOption(this.GetParent().GetParent().GetParent<ActorFrame>(), 0)
      }
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Sprite({
      Name: 'GameIcon',
      Texture: THEME.GetPathG('', '_StyleVector/' + ((v.Graphic || v.Name) as string)),
      InitCommand: function(this: Sprite) {
        this.zoom(.1).x(-120)
      }
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
      Name: 'Text',
      Text: v.Name,
      Font: 'Common Normal',
      InitCommand: function(this: BitmapText) {
        this.maxwidth(320).x(-70).halign(0).zoom(1.25)
      }
    }))

    Container.set(Container.length() + 1, Def.ActorFrame(ActorFrameArg))

    Previews.set(Previews.length() + 1, Def.Sprite({
      Name: 'Preview_' + (v.Name as string),
      Texture: THEME.GetPathG('ScreenSelectGame', 'Types/' + (v.Name as string)),
      OnCommand: function(this: Sprite) {
        (this.zoom(.3) as Sprite).texcoordvelocity(.1, 0).xy(SCREEN_WIDTH*.345 ,-SCREEN_HEIGHT*.25).SetTextureFiltering(false).visible(i === choice)
      }
    }))

    Previews.set(Previews.length() + 1, Def.Sprite({
      Name: 'Icon_' + v.Name,
      Texture: THEME.GetPathG('', '_StyleVector/' + ((v.Graphic || v.Name) as string)),
      OnCommand: function(this: Sprite) {
        (this.zoom(0.3) as Sprite).xy(SCREEN_WIDTH*.046 ,-SCREEN_HEIGHT*.25).ztest(0).visible(i === choice)

        if (isVerticalScreen) {
          this.x(-SCREEN_WIDTH * .25)
        }
      }
    }))
  }

  const isInitialSetup = GAMESTATE.GetCurrentGame().GetName() === 'SelectGameMode'
  const ActorFrameMainArg = new LuaTable()

  const ActorFrameSub1 = new LuaTable()
  ActorFrameSub1.set('OnCommand', function(this: ActorFrame) {
    if (isVerticalScreen) {
      this.GetChild('Controller').x(SCREEN_WIDTH*.25)
      this.GetChild('NoteField').x(SCREEN_WIDTH*.75)
      this.GetChild('SliderBG').y(SCREEN_CENTER_Y + 38).zoomtowidth(SCREEN_WIDTH)
    }

    SOUND.PlayAnnouncer('ScreenSelectGameMode intro')
  })
  ActorFrameSub1.set(ActorFrameSub1.length() + 1, Def.Quad({
    Name: 'SliderBG',
    InitCommand: function(this: Quad) {
      (this.zoomto(SCREEN_WIDTH *.38 ,SCREEN_HEIGHT).align(0, 0).diffuse(ColorMidTone(GameColor.Custom['BackgroundColor'])) as Actor).diffusealpha(0.6)
    }
  }))
  ActorFrameSub1.set(ActorFrameSub1.length() + 1, Def.Quad({
    Name: 'Controller',
    InitCommand: function(this: Quad) {
      this.zoomto(280, 160).xy(SCREEN_WIDTH*.54, 180).diffuse(GameColor.Custom['BackgroundElement'])
    }
  }))
  ActorFrameSub1.set(ActorFrameSub1.length() + 1, Def.Quad({
    Name: 'NoteField',
    InitCommand: function(this: Quad) {
      this.zoomto(280, 160).xy(SCREEN_WIDTH*.84, 180).diffuse(GameColor.Custom['BackgroundElement'])
    }
  }))

  const ActorFrameSub2 = new LuaTable

  ActorFrameSub2.set('InitCommand', function(this: ActorFrame) {
    this.xy(SCREEN_WIDTH*.8, SCREEN_HEIGHT*.9)
  })
  ActorFrameSub2.set(ActorFrameSub2.length() + 1, LoadModule('UI/UI.ButtonBox.lua')(340, 68))
  ActorFrameSub2.set(ActorFrameSub2.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
    Width: 340,
    Height: 60,
    Action: function(this: ActorFrame) {
      isOpeningLink = true
      this.GetParent().GetParent().GetChild('DisplayWindow').playcommand('UpdateDisplay', { Show: true })
    }
  }))
  ActorFrameSub2.set(ActorFrameSub2.length() + 1, Def.BitmapText({
    Font: '_plex bold',
    Text: Screen['S' + 'tring']('MoreInfo'),
    OnCommand: function(this: BitmapText) {
      this.zoom(0.5).y(-8)
    }
  }))
  ActorFrameSub2.set(ActorFrameSub2.length() + 1, Def.BitmapText({
    Font: '_plex bold',
    Text: '(outfox.wiki)',
    OnCommand: function(this: BitmapText) {
      this.zoom(0.4).y(10)
    }
  }))
  ActorFrameSub2.set(ActorFrameSub2.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('', 'UI/ExternalLink'),
    OnCommand: function(this: Sprite) {
      this.zoom(0.6).x(-130)
    }
  }))

  const ActorFrameSub3 = new LuaTable()

  ActorFrameSub3.set('OnCommand', function(this: ActorFrame) {
    this.Center()
    SCREENMAN.GetTopScreen().AddInputCallback(LoadModule('Lua.InputSystem.lua')(this))

    if (isVerticalScreen) {
      this.GetChild('GameTitleHeader').xy(0, -SCREEN_HEIGHT*.4 + 8).halign(.5)
      this.GetChild('StyleHeader').xy(0, -SCREEN_HEIGHT*.11).zoom(0.4)
      this.GetChild('ModeDesc').xy(-SCREEN_WIDTH *.475, -SCREEN_HEIGHT*.12).zoom(0.7)
      this.GetChild('Info').xy(60 , -SCREEN_HEIGHT*.11 - 10).zoom(0.6)
    }

    this.diffusealpha(0).linear(0.1).diffusealpha(1)

    MoveOption(this, 0)
  })

  ActorFrameSub3.set('MenuUpCommand', function(this: ActorFrame) {
    MoveOption(this, -1)
  })

  ActorFrameSub3.set('MenuDownCommand', function(this: ActorFrame) {
    MoveOption(this, 1)
  })

  ActorFrameSub3.set('MenuLeftCommand', function(this: ActorFrame) {
    MoveOption(this, -1)
  })

  ActorFrameSub3.set('MenuRightCommand', function(this: ActorFrame) {
    MoveOption(this, 1)
  })

  ActorFrameSub3.set('MouseWheelUpMessageCommand', function(this: ActorFrame) {
    MoveOption(this, -1)
  })

  ActorFrameSub3.set('MouseWheelDownMessageCommand', function(this: ActorFrame) {
    MoveOption(this, 1)
  })

  ActorFrameSub3.set('BackCommand', function(this: ActorFrame) {
    if (!isInitialSetup) {
      SOUND.PlayOnce(THEME.GetPathS('Common', 'Cancel'));
      (SCREENMAN.GetTopScreen().SetNextScreenName(SCREENMAN.GetTopScreen().GetPrevScreenName()) as ScreenWithMenuElements).StartTransitioningScreen('SM_GotoNextScreen')
    }
  })

  ActorFrameSub3.set('StartCommand', function(this: ActorFrame) {
    if (isOpeningLink) {
      if (linkChoice === 2) {
        SOUND.PlayOnce(THEME.GetPathS('Common', 'start'))
        const linktoUse: string = Choices.get(choice).Link || Choices.get(choice).Name
        GAMESTATE.ApplyGameCommand('urlnoexit,https://outfox.wiki/user-guide/games/' + linktoUse)
      } else {
        isOpeningLink = false
      }
      this.GetParent().GetChild('DisplayWindow').playcommand('UpdateDisplay', {Show: false})
      return
    }

    if (GAMESTATE.GetCurrentGame().GetName() === Choices.get(choice).Name) {
      (SCREENMAN.GetTopScreen().SetNextScreenName(SCREENMAN.GetTopScreen().GetPrevScreenName()) as ScreenWithMenuElements).StartTransitioningScreen('SM_GotoNextScreen')
      return
    }
    SOUND.PlayOnce(THEME.GetPathS('Common', 'start'))
    GAMEMAN.SetGame(Choices.get(choice).Name)
  })

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.Sound({
    Name: 'Change',
    File: THEME.GetPathS('ScreenOptions', 'change')
  }))

  Container.InitCommand = function(this: ActorFrame) {
    let leX = -SCREEN_WIDTH*.31
    let leY = 0

    if (isVerticalScreen) {
      leX = 0
      leY = SCREEN_HEIGHT*.25 + 20
    }
    this.xy(leX, leY)
  }

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Container)

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.Quad({
    Condition: isVerticalScreen,
    InitCommand: function(this: Quad) {
      this.zoomto(SCREEN_WIDTH * (isVerticalScreen ? 1 : .38), SCREEN_HEIGHT).y(48).align(0.5, 1).diffuse(ColorDarkTone(GameColor.Custom['BackgroundColor']))
    }
  }))

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.BitmapText({
    Font: '_plex bold',
    Name: 'GameTitleHeader',
    InitCommand: function(this: BitmapText) {
      (this.xy(-SCREEN_WIDTH*.1,-SCREEN_HEIGHT*.5+30) as BitmapText).uppercase(true).halign(0)
    }
  }))

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.BitmapText({
    Font: '_plex bold',
    Text: Screen['S' + 'tring']('StylesHeader'),
    Name: 'StyleHeader',
    InitCommand: function(this: BitmapText) {
      this.xy(-SCREEN_WIDTH*.1,0).halign(0).zoom(0.6)
    }
  }))

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.Quad({
    InitCommand: function(this: Quad) {
      this.zoomto(1024, 512).x(SCREEN_WIDTH*.345 - 140).halign(1).MaskSource()
    }
  }))

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.Quad({
    InitCommand: function(this: Quad) {
      this.zoomto(1024, 512).x(SCREEN_WIDTH*.345 + 120).halign(0).MaskSource()
    }
  }))

  Previews.OnCommand = function(this: Quad) {
    this.MaskDest()
  }

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Previews)

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.BitmapText({
    Name: 'Info',
    Text: Choices.get(choice).Styles,
    Font: 'Common Normal',
    InitCommand: function (this: BitmapText) {
      this.xy(-SCREEN_WIDTH*.1,30).zoom(0.8).align(0,0)
    }
  }))

  ActorFrameSub3.set(ActorFrameSub3.length() + 1, Def.BitmapText({
    Name: 'ModeDesc',
    Font: 'Common Normal',
    InitCommand: function(this: BitmapText) {
      this.xy(-SCREEN_WIDTH*.1,-80).zoom(0.8).align(0, 0).wrapwidthpixels(SCREEN_WIDTH * .7)
    }
  }))

  const ActorFrameSub4 = new LuaTable()

  ActorFrameSub4.set(ActorFrameSub4.length() + 1, Def.Quad({
    InitCommand: function(this: Quad) {
      this.zoomto(SCREEN_WIDTH * (isVerticalScreen ? 1 : .38), 58).align(0,0).diffuse(GameColor.Custom['BackgroundColor'])
    }
  }))

  ActorFrameSub4.set(ActorFrameSub4.length() + 1, Def.BitmapText({
    Font: '_plex bold',
    Name: 'MainHeader',
    Text: ToUpper(THEME.GetString(Var('LoadingScreen'), 'HeaderText')),
    OnCommand: function(this: BitmapText) {
      this.xy(20,20).align(0, 0).zoom(0.6)

      if (!isInitialSetup) {
        (this.xy(120, 22) as BitmapText).maxwidth(SCREEN_WIDTH * (isVerticalScreen ? 1 : .45))
      }
    }
  }))

  ActorFrameSub4.set(ActorFrameSub4.length() + 1, LoadModule('UI/UI.GenerateUIWithButtonAction.lua')({
    UseImage: Def.Sprite({
      Texture: THEME.GetPathG('', 'BackButton'),
      InitCommand: function(this: Sprite) {
        this.diffuse(GameColor.Custom['MenuButtonBorder']).zoom(0.7)
      }
    }),
    Width: 300,
    Height: 100,
    Pos: [60, 30],
    Action: function(this: ActorFrame) {
      (SCREENMAN.GetTopScreen() as ScreenWithMenuElements).Cancel()
    },
    AddActors: Def.ActorFrame([Def.BitmapText({
      Font: '_Plex Bold Large',
      Text: ToUpper(THEME.GetString('GameButton', 'Back')),
      OnCommand: function (this: BitmapText) {
        this.zoom(0.4).xy(20, 2).diffuse(GameColor.Custom['MenuButtonBorder'])
      }
    })]),
    Condition: !isInitialSetup
  }))

  ActorFrameSub4.set(ActorFrameSub4.length() + 1, Def.Quad({
    InitCommand: function (this: Quad) {
      let leXZoomMultiply = .38
      let leY = 58

      if (isVerticalScreen) {
        leXZoomMultiply = 1
        leY = SCREEN_CENTER_Y + 40
      }
      this.zoomto(SCREEN_WIDTH * leXZoomMultiply, 32).y(leY).align(0, 0).diffuse(GameColor.Custom['MenuButtonGradient'])
    }
  }))

  ActorFrameSub4.set(ActorFrameSub4.length() + 1, Def.Quad({
    InitCommand: function (this: Quad) {
      this.zoomto(SCREEN_WIDTH * (isVerticalScreen ? 1 : .38), 32).y(SCREEN_BOTTOM).align(0,1).diffuse(GameColor.Custom['MenuButtonGradient'])
    }
  }))

  const ActorFrameSub5 = new LuaTable()

  ActorFrameSub5.set('Name', 'DisplayWindow')
  ActorFrameSub5.set('InitCommand', function(this: ActorFrame) {
    this.diffusealpha(0)
  })
  ActorFrameSub5.set('UpdateDisplayCommand', function(this: ActorFrame, params: AnyTable) {
    let leDiffuse = 0

    if (params.Show) {
      leDiffuse = 1
    }

    this.stoptweening().easeoutexpo(0.3).diffusealpha(leDiffuse)
  })

  ActorFrameSub5.set('DisableCommand', function(this: ActorFrame) {
    this.playcommand('UpdateDisplay', {Show: false}).sleep(0.3).queuecommand('Turnoff')
  })

  ActorFrameSub5.set('TurnoffCommand', function(this: ActorFrame) {
    isOpeningLink = false
  })

  ActorFrameSub5.set('MoveCursorCommand', function(this: ActorFrame) {
    this.GetChild<ActorFrame>('Window').GetChild<ActorFrame>('Button1').GetChild<ActorFrame>('BG').diffuse(color('#113472'))
    this.GetChild<ActorFrame>('Window').GetChild<ActorFrame>('Button2').GetChild<ActorFrame>('BG').diffuse(color('#113472'))

    this.GetChild<ActorFrame>('Window').GetChild<ActorFrame>('Button' + (linkChoice as unknown as string)).GetChild<ActorFrame>('BG').diffuse(color('#1F5BCA'))
  })

  ActorFrameSub5.set(ActorFrameSub5.length() + 1, Def.Quad({
    InitCommand: function(this: Quad) {
      this.FullScreen().diffuse(color('#00000077'))
    }
  }))

  const ActorFrameSub5Sub1 = new LuaTable()
  ActorFrameSub5Sub1.set('Name', 'Window')
  ActorFrameSub5Sub1.set('InitCommand', function (this: ActorFrame) {
    this.Center()
  })
  ActorFrameSub5Sub1.set(ActorFrameSub5Sub1.length() + 1, Def.Quad({
    InitCommand: function (this: Quad) {
      this.zoomto(SCREEN_WIDTH, 300).diffuse(color('#112F69'))
    }
  }))
  ActorFrameSub5Sub1.set(ActorFrameSub5Sub1.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'Message',
    InitCommand: function(this: BitmapText) {
      this.y(-40)
    },
    UpdateDisplayCommand: function(this: BitmapText) {
      this.settextf(THEME.GetString('ScreenSelectGameMode', 'LinkTransfer'), Choices.get(choice).Name)
    }
  }))

  const ActorFrameSub5Sub1Sub1 = new LuaTable()

  ActorFrameSub5Sub1Sub1.set('Name', 'Button1')
  ActorFrameSub5Sub1Sub1.set('InitCommand', function(this: ActorFrame) {
    this.xy(-200, 80)
  })
  ActorFrameSub5Sub1Sub1.set(ActorFrameSub5Sub1Sub1.length() + 1, Def.Sprite({
    Name: 'BG',
    Texture: THEME.GetPathG('ScreenMenu small button', 'base'),
    OnCommand: function (this: Sprite) {
      this.zoom(1.4).diffuse(color('#1F5BCA'))
    }
  }))
  ActorFrameSub5Sub1Sub1.set(ActorFrameSub5Sub1Sub1.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'Message',
    Text: THEME.GetString('ScreenSelectGameMode', 'LinkNo')
  }))
  ActorFrameSub5Sub1Sub1.set(ActorFrameSub5Sub1Sub1.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
    Width: 340,
    Height: 60,
    Action: function (this: ActorFrame) {
      if (!isOpeningLink) {
        return;
      }

      isOpeningLink = false
      this.GetParent().GetParent().GetParent().playcommand('UpdateDisplay', {Show: false})
    }
  }))

  const ActorFrameSub5Sub1Sub2 = new LuaTable()

  ActorFrameSub5Sub1Sub2.set('Name', 'Button2')
  ActorFrameSub5Sub1Sub2.set('InitCommand', function(this: ActorFrame) {
    this.xy(200, 80)
  })
  ActorFrameSub5Sub1Sub2.set(ActorFrameSub5Sub1Sub2.length() + 1, Def.Sprite({
    Name: 'BG',
    Texture: THEME.GetPathG('ScreenMenu small button', 'base'),
    OnCommand: function (this: Sprite) {
      this.zoom(1.4).diffuse(color('#113472'))
    }
  }))
  ActorFrameSub5Sub1Sub2.set(ActorFrameSub5Sub1Sub2.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Name: 'Message',
    Text: THEME.GetString('ScreenSelectGameMode', 'LinkYes')
  }))
  ActorFrameSub5Sub1Sub2.set(ActorFrameSub5Sub1Sub2.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
    Width: 340,
    Height: 60,
    Action: function(this: ActorFrame) {
      if (!isOpeningLink) {
        return;
      }

      SOUND.PlayOnce(THEME.GetPathS('Common', 'start'))
      GAMESTATE.ApplyGameCommand('urlnoexit,https://outfox.wiki/user-guide/games/' + (Choices.get(choice).Name as string))

      isOpeningLink = false
      this.GetParent().GetParent().GetParent().playcommand('UpdateDisplay', {Show: false})
    }
  }))

  ActorFrameSub5Sub1.set(ActorFrameSub5Sub1.length() + 1, Def.ActorFrame(ActorFrameSub5Sub1Sub1))
  ActorFrameSub5Sub1.set(ActorFrameSub5Sub1.length() + 1, Def.ActorFrame(ActorFrameSub5Sub1Sub2))

  ActorFrameSub5.set(ActorFrameSub5.length() + 1, Def.ActorFrame(ActorFrameSub5Sub1))

  ActorFrameMainArg.set(ActorFrameMainArg.length() + 1, Def.ActorFrame(ActorFrameSub1))
  ActorFrameMainArg.set(ActorFrameMainArg.length() + 1, Def.ActorFrame(ActorFrameSub2))
  ActorFrameMainArg.set(ActorFrameMainArg.length() + 1, Def.ActorFrame(ActorFrameSub3))
  ActorFrameMainArg.set(ActorFrameMainArg.length() + 1, Def.ActorFrame(ActorFrameSub4))
  ActorFrameMainArg.set(ActorFrameMainArg.length() + 1, Def.ActorFrame(ActorFrameSub5))
  const t = Def.ActorFrame(ActorFrameMainArg)

  return t
}