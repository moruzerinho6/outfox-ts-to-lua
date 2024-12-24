{
  const t: ActorFrame = Def.ActorFrame({});

  // @ts-ignore
  const [Args]: [any] = [...$vararg];
  const p = Args.Player;
  const Height = Args.Height;
  const Width = Args.Width;

  const StfStats = STATSMAN.GetCurStageStats().GetPlayerStageStats(p);
  const PlProfile = PROFILEMAN.GetProfile(p);
  const IsProfileMachine = PlProfile.GetDisplayName() === "";

  const Information = [
    ["CaloriesBurnedSong", StfStats.GetCaloriesBurned()],
    ["CaloriesToday", PlProfile.GetCaloriesBurnedToday()],
    ["CaloriesTotal", PlProfile.GetTotalCaloriesBurned()],
  ];

  for (const [ind, val] of ipairs(Information)) {
    const insideActorFrame = new LuaTable();

    insideActorFrame.set("InitCommand", function (self: ActorFrame) {
      self.xy(
        -Width * 0.475,
        (IsProfileMachine ? 60 : 0) - Height * 0.5 + 100 + 64 * (ind - 1)
      );
    });

    insideActorFrame.set("OffCommand", function (self: ActorFrame) {
      self.linear(0.2).diffusealpha(0);
    });

    insideActorFrame.set(
      insideActorFrame.length() + 1,
      Def.BitmapText({
        Font: "_Bold",
        Text: ToUpper(Screen.String(val[1] as string)),
        InitCommand: function (self: BitmapText) {
          (self.zoom(0.6) as BitmapText)
            .maxwidth(Width * 0.5)
            .horizalign(left as unknown as HorizAlign)
            .y(-15);

          if (GAMESTATE.GetNumPlayersEnabled() > 1) {
            // ? - Moru
          }
        },
      })
    );

    insideActorFrame.set(
      insideActorFrame.length() + 1,
      Def.BitmapText({
        Font: "_Plex Bold Large",
        InitCommand: function (self: BitmapText) {
          (self.zoom(0.75) as BitmapText)
            .maxwidth(260)
            .horizalign(left as unknown as HorizAlign)
            .y(10)
            .diffuse(ColorLightTone(PlayerColor(p)))
            .diffusetopedge(ColorLightTone(PlayerCompColor(p)));
        },
        Text: math.floor(val[2] as number),
      })
    );

    t.set(t.length() + 1, Def.ActorFrame(insideActorFrame));
  }
  const Yspace_FitnessGoal = -Height * 0.5 + 156;

  if (IsProfileMachine) {
    t.set(
      t.length() + 1,
      Def.BitmapText({
        Font: "_Bold",
        InitCommand: function (self: BitmapText) {
          (self.zoom(0.64).y(-Height * 0.5 + 100) as BitmapText)
            .wrapwidthpixels(Width + 100)
            .diffusealpha(0.8);
        },
        OffCommand: function (self: BitmapText) {
          self.linear(0.2).diffusealpha(0);
        },
        Text: Screen.String("NoProfileSet"),
      })
    );
  }

  const GoalMarking = Def.ActorFrame({
    OffCommand: function (self: ActorFrame) {
      self.linear(0.2).diffusealpha(0);
    },
    InitCommand: function (self: ActorFrame) {
      self.xy(Width * 0.5 - 20, Yspace_FitnessGoal - 24);

      type insideChildren = {
        CurrentGoalLabel: BitmapText;
        CurrentGoalProgress: BitmapText;
        GoalAmount: string;
      };
      const c: insideChildren = self.GetChildren();

      if (PlProfile.GetGoalType() < 2) {
        const achievedGoal = GAMESTATE.GetGoalPercentComplete(p, true) >= 1;

        if (achievedGoal) {
          c.CurrentGoalLabel.settext(
            THEME.GetString(Var("LoadingScreen"), "GoalAchieved")
          )
            .halign(1)
            .xy(0, 0);
          c.CurrentGoalProgress.GetChild("CurrentGoalValue").visible(false);
          c.CurrentGoalProgress.visible(false);
          return;
        }

        const stats = STATSMAN.GetAccumPlayedStageStats();

        if (PlProfile.GetGoalCalories() === 1) {
          self.GoalAmount = string.format(
            "%.2f cal",
            PlProfile.GetGoalCalories() -
              stats.GetPlayerStageStats(p).GetCaloriesBurned()
          );
        } else {
          self.goalAmount = "%s to go"["for" + "mat"](
            SecondsToMMSS(
              PlProfile.GetGoalSeconds() - stats.GetGameplaySeconds()
            )
          );
        }

        c.CurrentGoalProgress.GetChild("CurrentGoalValue").settext(
          self.GoalAmount
        );
        c.CurrentGoalProgress.GetChild<BitmapText>("Percentage").settext(
          FormatPercentScore(GAMESTATE.GetGoalPercentComplete(p, true))
        );
      } else {
        c.CurrentGoalLabel.settext(Screen.String("NoGoal"))
          .wrapwidthpixels(600)
          .diffusebottomedge(ColorLightTone(PlayerCompColor(p)))
          .diffusealpha(0.5);

        c.CurrentGoalProgress.GetChild("CurrentGoalValue").visible(false);
      }
    },
  });
}
