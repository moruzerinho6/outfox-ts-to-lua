// @ts-ignore
return function (args){
  const PersonalBestBG: ButtonBoxModule = LoadModule('UI/UI.ButtonBox.lua')(args.Width + 1, 30, 2, null, true)

  const getGradeNumberState = function (Grade: string, max) {
    const state: number = Grade === 'Grade_Failed' ? max : tonumber(Grade.substring(-2))
    return state -1
  }

  const GetDifficultyObjectOffsetByIndex = function (stepsToCheck, songContainer: LuaTable, offset) {
    let curStepsIndex = null

    for (const i of $range(2, songContainer.length())) {
      const item = songContainer.get(i)

      if (item === stepsToCheck) {
        curStepsIndex = i
      }
    }

    if (!curStepsIndex) {
      return false
    }

    return songContainer.get(curStepsIndex + offset)
  }

  let DiffActorZoom = .35
  let DiffNameActor: TextFadeSlide = LoadModule('Text.NewFadeSlide.lua')({
    Width: args.Width * 2,
    Font: '_kurinto sans med/20px',
    StartLeft: true
  })

  const GenerateDiffTextInfo = (self: Actor, Diff: Steps) => {
    let match = true
    
    if (!Diff || !Diff.GetDifficulty) {
      match = false
    }

    if (!match) {
      self.GetChild<BitmapText>('Name').settext('')
      self.GetChild<BitmapText>('Meter').settext('')

      if (self.GetChild('Author')) {
        self.GetChild<BitmapText>('Author').settext('')
      }

      if (self.GetChild('Diff')) {
        ((self.GetChild<Actor>('Diff').stoptweening() as Actor).linear(0.1) as Actor).diffuse(ColorDarkTone(Alpha(Color.White,0.4)))
      }

      if (self.GetChild('Button')) {
        self.GetChild('Button').diffusealpha(0.25)
      }
      return
    }

    const colboost = BoostColor( GameColor.Difficulty[ Diff.GetDifficulty() ], 0.95)
    const newColor = Diff.IsAutogen() ? Color.Yellow : Color.White;

    (self.GetChild('Name').diffuse(newColor) as BitmapText).settext(THEME.GetString("CustomDifficulty",ToEnumShortString(Diff.GetDifficulty())))

    if (self.GetChild('Author')) {
      let finalText = ''

      if (Diff.GetChartName() !== '' && Diff.GetDescription() !== Diff.GetChartName()) {
        finalText = Diff.GetChartName()
      }

      if (finalText.length > 0) {
        finalText = finalText + ' - '
      }

      finalText = finalText + (Diff.GetAuthorCredit() || Diff.GetDescription())
      DiffNameActor.SetText(finalText)
    } else {
      self.GetChild<BitmapText>('Name').diffuse(colboost)
    }

    self.GetChild<BitmapText>('Meter').settext(Diff.GetMeter()).diffuse(newColor)

    if (self.GetChild('Diff')) {
      self.GetChild<ActorFrame>('Diff').stoptweening().linear(0.1).diffuse(colboost)
    }

    if (self.GetChild('Button')) {
      self.GetChild('Button').diffusealpha(1)
    }
  }

  const t: ActorFrame = Def.ActorFrame({
    Name: 'DiffSelector',
    InitCommand: function (self: ActorFrame) {
      self.y(118).diffusealpha(0)
    },
    ["CurrentSteps" + ToEnumShortString(args.Player) + "ChangedMessageCommand"]: function (self: ActorFrame, params) {
      if (!GAMESTATE.GetCurrentSong()) {
        self.stoptweening().linear(0.1).diffusealpha(0)
        return;
      }

      const curSteps = GAMESTATE.GetCurrentSteps(args.Player)
      if (!curSteps) {
        return;
      }

      self.stoptweening().linear(0.1).diffusealpha(1)

      const colboost = BoostColor(ColorDarkTone(GameColor.Difficulty[curSteps.GetDifficulty()]), 0.95)
      self.GetChild('MainBG').stoptweening().linear(0.1).diffuse(BoostColor(colboost, 2.2))

      PersonalBestBG.ChangeColor(ColorLightTone(colboost), ColorDarkTone(colboost))

      const stats = PROFILEMAN.GetProfile(args.Player).GetHighScoreListIfExists(GAMESTATE.GetCurrentSong(), curSteps)

      const hScore: LuaTable & AnyTable = self.GetChild<ActorFrame>('HighScore').GetChildren();

      (hScore.Grade as Actor).visible(false)

      if (stats) {
        const highscores = stats.GetHighScores()

        if (highscores.length > 0) {
          (hScore.Score as BitmapText).settext(FormatPercentScore(stats.GetHighScores()[1].GetPercentDP()));
          (hScore.Grade as ActorFrame).visible(true).setstate(getGradeNumberState(stats.GetHighScores()[1].GetGrade() as unknown as string, (hScore.Grade as Sprite).GetNumStates()))
        } else {
          (hScore.Score as BitmapText).settext('-N/A-')
        }
      } else {
        (hScore.Score as BitmapText).settext('-N/A-')
      }

      const curSongEntry = TF_WHEEL.CurrentSong

      const prevDifficulty = GetDifficultyObjectOffsetByIndex(curSteps, curSongEntry, -1)
      const nextDifficulty = GetDifficultyObjectOffsetByIndex(curSteps, curSongEntry, 1)

      GenerateDiffTextInfo(self.GetChild('Diff1'), prevDifficulty)
      GenerateDiffTextInfo(self.GetChild('Diff2'), curSteps)
      GenerateDiffTextInfo(self.GetChild('Diff3'), nextDifficulty)
      self.GetChild<ActorFrame>('Diff1').GetChild<ActorFrame>('Button').playcommand('ApplyBounce', { Stop: prevDifficulty })
      self.GetChild<ActorFrame>('Diff3').GetChild<ActorFrame>('Button').playcommand('ApplyBounce', { Stop: nextDifficulty })
    }
  })

  const tempModule = LoadModule('Object.GenCornerBox.lua')({
    Width: args.Width * 2 - 50,
    Height: 60,
    Corners: [false, false, false, false]
  })

  tempModule.Name = 'MainBG'
  tempModule.OnCommand = function (self: ActorFrame) {
    self.finishtweening().zoom(0.5)
  }

  t.set(t.length() + 1, tempModule)

  const actorFrameArg = new LuaTable()

  actorFrameArg.set('InitCommand', function (self: ActorFrame) {
    self.y(-self.GetParent<ActorFrame>().GetChild<ActorFrame>("MainBG").GetZoomedHeight() + 14)
  })
  actorFrameArg.set('Name', 'Diff1')
  actorFrameArg.set(actorFrameArg.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
    Width: args.Width,
    Height: 30,
    Action: function (self: ActorFrame) {
      args.DiffMoveFunc(args.Player, -1)
    }
  }))

  const tempModule2 = LoadModule('Object.GenCornerBox.lua')({
    Width: args.Width * 2 - 50,
    Height: 10,
    Corners: [false, true, false, false]
  })
  tempModule2.Name = 'Diff'
  tempModule2.OnCommand = function (self: ActorFrame) {
    self.finishtweening().zoom(0.5)
  }

  actorFrameArg.set(actorFrameArg.length() + 1, tempModule2)
  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Name: 'Name',
    InitCommand: function (self: BitmapText) {
      (self.halign(0).x(-args.Width * .5 + 40) as BitmapText).uppercase(true).zoom(0.8)
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Name: 'Meter',
    InitCommand: function (self: BitmapText) {
      self.x(args.Width * .5 - 30)
    }
  }))
  actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Text: '&MENUUP;',
    Name: 'Button',
    InitCommand: function (self: BitmapText) {
      self.zoom(0.6).x(-args.Width * .5 + 15)
    },
    ApplyBounceCommand: function (self: BitmapText, params) {
      if (params.Stop && !params.Stop.GetDifficulty) {
        self.stopeffect()
        return
      }

      self.bounce().effectmagnitude(0, -3, 0).effectclock('beatnooffset').effectperiod(1)
    }
  }))

  t.set(t.length() + 1, Def.ActorFrame(actorFrameArg))

  const tempModule3 = new LuaTable()

  tempModule3.set('Name', 'Diff2')
  tempModule3.set(tempModule3.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Name: 'Name',
    InitCommand: function (self: BitmapText) {
    (self.halign(0).xy(-args.Width * .5 + 20, -8) as BitmapText).uppercase(true).zoom(1).diffusealpha(0.8)
    }
  }))

  let createDiffActor = DiffNameActor.Create()

  createDiffActor.OnCommand = function (self: ActorFrame) {
    self.zoom(DiffActorZoom).xy(-args.Width * .5 + 20, 8).GetChild<ActorFrame>('Render').halign(0)
  }
  tempModule3.set(tempModule3.length() + 1, createDiffActor)
  tempModule3.set(tempModule3.length() + 1, Def.BitmapText({
    Font: '_kurinto sans med/20px',
    Name: 'Author',
    InitCommand: function (self: BitmapText) {
      self.halign(0).xy(-args.Width*.5 + 20, 8).zoom(0.6).diffusealpha(0.8)
    }
  }))
  tempModule3.set(tempModule3.length() + 1, Def.BitmapText({
    Font: '_Large',
    Name: 'Meter',
    InitCommand: function (self: BitmapText) {
      self.halign(1).x(args.Width * .5 - 20).zoom(1)
    }
  }))

  t.set(t.length() + 1, Def.ActorFrame(tempModule3))

  const actorArg2 = new LuaTable()

  actorArg2.set('InitCommand', function (self: ActorFrame) {
    self.y(self.GetParent<ActorFrame>().GetChild('MainBG').GetZoomedHeight() + 18)
  })

  actorArg2.set('Name', 'Diff3')

  let tempModule4 = LoadModule('Object.GenCornerBox.lua')({
    Width: args.Width * 2 - 50,
    Height: 10,
    Corners: [false, false, false, true]
  })

  tempModule4.Name = 'Diff'
  tempModule4.OnCommand = function (self: ActorFrame) {
    self.finishtweening().zoom(0.5)
  }

  actorArg2.set(actorArg2.length() + 1, tempModule4)

  const tempModule5 = LoadModule('UI/UI.ClickArea.lua')({
    Width: args.Width,
    Height: 30,
    Action: function (self: ActorFrame) {
      args.DiffMoveFunc(args.Player, 1)
    }
  })

  actorArg2.set(actorArg2.length() + 1, tempModule5)
  actorArg2.set(actorArg2.length() + 1, Def.BitmapText({
    InitCommand: function (self: BitmapText) {
      (self.halign(0).x(-args.Width * .5 + 40) as BitmapText).uppercase(true).zoom(0.8)
    }
  }))
  actorArg2.set(actorArg2.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Name: 'Meter',
    InitCommand: function (self: BitmapText) {
      self.x(args.Width * .5 - 30)
    }
  }))
  actorArg2.set(actorArg2.length() + 1, DiffScrollBottom)
  actorArg2.set(actorArg2.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Text: '&MENUDOWN;',
    Name: 'Button',
    InitCommand: function (self: BitmapText) {
      self.zoom(0.6).x(-args.Width * .5 + 15)
    },
    ApplyBounceCommand: function (self: BitmapText, params) {
      if (!params.Stop) {
        self.stopeffect()
        return
      }

      self.bounce().effectmagnitude(0, 3, 0).effectclock('beatnooffset').effectperiod(1)
    }
  }))

  t.set(t.length() + 1, Def.ActorFrame(actorArg2))

  const actorArg3 = new LuaTable()

  actorArg3.set('InitCommand', function (self: ActorFrame) {
    self.y(self.GetParent<ActorFrame>().GetChild<ActorFrame>('MainBG').GetZoomedHeight() - 14)
  })
  actorArg3.set('Name', 'HighScore')
  actorArg3.set(actorArg3.length() + 1, PersonalBestBG.Create())
  actorArg3.set(actorArg3.length() + 1, Def.Text({
    Font: THEME.GetPathF('', 'IBMPlexSans-Bold.ttf'),
    Size: 40,
    Text: THEME.GetString(Var('LoadingScreen'), 'PersonalBest'),
    InitCommand: function (self: Text) {
      self.xy(-args.Width * .5 + 10, 4).zoom(0.34).MainActor().halign(0)
      self.StrokeActor().halign(0)
    }
  }))
  actorArg3.set(actorArg3.length() + 1, Def.BitmapText({
    Font: '_Bold',
    Name: 'Score',
    InitCommand: function (self: BitmapText) {
      self.halign(1).x(args.Width * .5 - 70).zoom(0.8)
    }
  }))
  actorArg3.set(actorArg3.length() + 1, Def.Sprite({
    Name: 'Grade',
    Texture: THEME.GetPathG('', 'GradeDisplay/grades ITG'),
    InitCommand: function (self: Sprite) {
      self.xy(args.Width * .5 - 40, 0).animate(0).zoom(0.3)
    }
  }))

  t.set(t.length() + 1, Def.ActorFrame(actorArg3))

  return t
}