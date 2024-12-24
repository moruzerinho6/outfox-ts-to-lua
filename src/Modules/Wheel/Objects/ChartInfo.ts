// @ts-ignore
return function (args) {
  const t: ActorFrame = Def.ActorFrame({
    Name: 'ChartInfo',
    ['CurrentSteps' + ToEnumShortString(args.Player) + 'ChangedMessageCommand']: function(self: ActorFrame, params) {
      if (!GAMESTATE.GetCurrentSong()) {
        self.stoptweening().linear(0.1).diffusealpha(0)
        return;
      }

      if (self.IsLocked) {
        return;
      }
      self.stoptweening().linear(0.1).diffusealpha(1)
    }
  })

  const maxNotesAllowed = THEME.GetMetric('Common', 'NoteDataLimit')
  const npsdata: ChartDensityModule = LoadModule('Chart.Density.lua')(args.Player)
  let border = 2
  let maxwidth = (args.Width - 30) - border
  let maxheight = 70 - border

  let yPosExpandedGraph = 40

  const GraphBG: ButtonBoxModule = LoadModule('UI/UI.ButtonBox.lua')(args.Width, args.Height, border, null, true)

  t.TweakInfoCommand = function(self: ActorFrame, params) {
    GraphBG.UpdateSize(args.Width, params.ShowMininal ? 100 : args.Height, 2, 'easeoutexpo', 0.2)
    self.GetChild('Graph').y(params.ShowMinimal ? 0 : yPosExpandedGraph)
    .zoom(params.ShowMinimal ? 1.08 : 1)
    self.GetChild('ChartInfo').diffusealpha(params.ShowMinimal ? 0 : 1)
  }

  t.set(t.length() + 1, GraphBG.Create())

  const actorArgument = new LuaTable()

  actorArgument.set('Name', 'AMV')
  actorArgument.set('InitCommand', function (self: ActorMultiVertex) {
    (self.EnableAlphaBuffer(true).SetWidth(maxwidth).SetHeight(maxheight) as ActorFrameTexture).Create()
  })
  actorArgument.set(actorArgument.length() + 1, Def.Quad({
    Name: 'BG',
    OnCommand: function (self: Quad) {
      self.zoomto(maxwidth, maxheight).align(0, 0).diffuse(GameColor.Custom['MenuButtonBase'])
    }
  }))
  actorArgument.set(actorArgument.length() + 1, Def.ActorMultiVertex({
    Name: 'Graph',
    OnCommand: function (self: ActorMultiVertex) {
      self.xy(maxwidth * .5, maxheight * .5)
      self.verts = {}
      // @ts-ignore
      self.SetDrawState({ Mode: 'DrawMode_QuadStrip' })
    },
    ['CurrentSteps' + ToEnumShortString(args.Player) + 'ChangedMessageCommand']: function (self: ActorMultiVertex, params) {
      if (!GAMESTATE.GetCurrentSong()) {
        return;
      }

      const steps = GAMESTATE.GetCurrentSteps(args.Player)

      if (!steps) {
        return
      }

      const colboost = BoostColor(ColorDarkTone(GameColor.Difficulty[steps.GetDifficulty()]), 0.95)

      GraphBG.ChangeColor(ColorLightTone(colboost), ColorDarkTone(colboost))
      self.GetParent().GetChild('BG').diffuse(Alpha(ColorLightTone(colboost), 0.5))

      const song = GAMESTATE.GetCurrentSong()

      if (!song) {
        return
      }

      if (steps.GetRadarValues(args.Player).GetValue('RadarCategory_TapsAndHolds' as unknown as RadarCategory) > maxNotesAllowed) {
        self.GetParent().GetParent().GetChild('NPSData').settext(THEME.GetString('LuaSelectMusic', 'NPSDataNotLoaded'))
        self.SetNumVertices(1).SetVertices(new LuaTable())
        return
      }

      const data = npsdata.ObtainSongInformation(steps, song)

      if (!data && steps) {
        return
      }

      const [tnp, npst] = [data.PeakNPS, data.Density]
      const SongMargin = {
        Start: 0,
        End: song.GetLastSecond()
      }

      self.verts = {}
      if (!npst) {
        return
      }

      for (const [k, v] of pairs(npst)) {
        const t = steps.GetTimingData().GetElapsedTimeFromBeat(((k as number)-1) * 4)
        const x = scale( t, SongMargin.Start, SongMargin.End, -maxwidth*.5, maxwidth*.5 )
        // The error bellow is so long I can't care less about it
        const y = math.round( (v as number) > tnp ? (-maxheight*.5) : scale( (v as number), 0, tnp, maxheight*.5, -maxheight*.5 ) )

        if (x <= args.Width) {
          if ((self.verts as LuaTable).length() > 2 && self.verts[(self.verts as LuaTable).length()][1][2] === y && self.verts[(self.verts as LuaTable).length() - 2][1][2] === y) {
            self.verts[(self.verts as LuaTable).length()][1][1] = x
            self.verts[(self.verts as LuaTable).length() - 1][1][1] = x
          } else {
            self.verts[(self.verts as LuaTable).length() + 1] = [[x, maxheight/2, 0], PlayerColor(args.Player)]
            self.verts[(self.verts as LuaTable).length() + 1] = [[x, y, 0], ColorLightTone(PlayerColor(args.Player))]
          }
        }
      }

      self.SetNumVertices((self.verts as LuaTable).length()).SetVertices(self.verts)

      self.GetParent().GetParent().GetChild<BitmapText>('NPSData').settext(string.format( THEME.GetString("ScreenGameplay","MaxNPS"), data.PeakNPS ))
    }
  }))

  actorArgument.set(actorArgument.length() + 1, Def.SongMeterDisplay({
    StreamWidth: maxwidth,
    Stream: Def.Actor({}),
    StartFromZero: 0,
    Tip: Def.Quad({
      InitCommand: function (self: Quad) {
        self.zoomtoheight(maxheight)
      }
    }),
    OnCommand: function (self: Actor) {
      self.xy(maxwidth * .5, maxheight * .5)
    }
  }))

  const amv: ActorMultiVertex = Def.ActorMultiVertex(actorArgument)

  const stepStats= ["TapsAndHolds","Jumps","Holds","Mines","Hands","Rolls","Lifts","Fakes"]

  const chartinfo: ActorFrame = Def.ActorFrame({
    Name: 'ChartInfo',
    InitCommand: function (self: ActorFrame) {
      self.y(-80).zoom(0.76)
    }
  })

  for (const [i,v] of ipairs(stepStats)) {
    const actorFrameArgument = new LuaTable()
    actorFrameArgument.set('Name', v)
    actorFrameArgument.set('InitCommand', function (self: ActorFrame) {
      (self.GetChild<BitmapText>('Label').x(-100).halign(0) as BitmapText).settext(ToUpper(THEME.GetString("RadarCategoryShort",v)) + ":").Regen();
      (self.GetChild<BitmapText>('Number').x(70).halign(1) as BitmapText).settext('0');

      self.xy(-90 + 200 * (i > 4 ? 1 : 0), 20 + 46 * ((i-1) % 4))
    })
    actorFrameArgument.set("CurrentSteps" + ToEnumShortString(args.Player) + "ChangedMessageCommand", function(self: ActorFrame, params) {
      if (!GAMESTATE.GetCurrentSong()) {
        return;
      }

      const steps = GAMESTATE.GetCurrentSteps(args.Player)
      if (!steps) {
        return;
      }

      // @ts-ignore
      const stats = steps.GetRadarValues(pn).GetValue('RadarCategory_' + (v as string))
      const darkcolor = color('#444444')

      self.GetChild<BitmapText>('Number').settext(stats)
      self.stoptweening().decelerate(0.2).diffuse(stats > 0 ? Color.White : darkcolor)
    })
    actorFrameArgument.set(actorFrameArgument.length() + 1, Def.Text({
      Name: 'Label',
      Font: THEME.GetPathF('', 'IBMPlexSans-Bold.ttf'),
      Size: 30,
      InitCommand: function (self: Text) {
        self.MainActor().halign(0)
        self.StrokeActor().visible(false)
        self.y(6).zoom(0.65)
      }
    }))
    actorFrameArgument.set(actorFrameArgument.length() + 1, Def.BitmapText({
      Font: '_Medium',
      Name: 'Number'
    }))
    chartinfo.set(chartinfo.length() + 1, Def.ActorFrame(actorFrameArgument))
  }

  t.set(t.length() + 1, chartinfo)
  t.set(t.length() + 1, amv)

  t.set(t.length() + 1, Def.Sprite({
    Name: 'Graph',
    OnCommand: function (self: Sprite) {
      self.SetTexture(self.GetParent().GetChild<ActorMultiVertex>('AMV').GetTexture()).y(yPosExpandedGraph)
    }
  }))

  t.set(t.length() + 1, Def.BitmapText({
    Name: 'NPSData',
    Font: 'Common Normal',
    InitCommand: function (self: BitmapText) {
      self.uppercase(true).diffusealpha(0.7)
    },
    OnCommand: function (self: BitmapText) {
      (self.xy(-maxwidth/2 + 4, yPosExpandedGraph + (-maxheight*.5 + 6)).align(0, 0).shadowlengthy(2) as Actor).zoom(0.6)
    }
  }))

  return t
}