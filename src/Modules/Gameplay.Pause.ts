{
  let Paused = false;
  let CurSel = 1;
  const discordTools: AnyTable = LoadModule("Tools.Discord.lua");

  let Choices = new LuaTable();
  Choices.set(Choices.length() + 1, {
    Name: "continue_playing",
    Action: function (screen: ScreenGameplay) {
      screen.PauseGame(false);
    },
  });
  Choices.set(Choices.length() + 1, {
    Name: "restart_song",
    Action: function (screen: ScreenGameplay) {
      MESSAGEMAN.Broadcast("RestartSongRequest");
      (
        screen.SetPrevScreenName("ScreenGameplay") as ScreenGameplay
      ).begin_backing_out();
    },
  });
  Choices.set(Choices.length() + 1, {
    Name: "give_up",
    Action: function (screen: ScreenGameplay) {
      screen.PostScreenMessage("SM_LeaveGameplay", 0);
    },
  });
  Choices.set(Choices.length() + 1, {
    Name: "forfeit_song",
    Action: function (screen: ScreenGameplay) {
      (
        screen.SetPrevScreenName(SelectMusicOrCourse()) as ScreenGameplay
      ).begin_backing_out();
    },
  });

  if (GAMESTATE.IsCourseMode()) {
    Choices = new LuaTable();
    Choices.set(Choices.length() + 1, {
      Name: "continue_playing",
      Action: function (screen: ScreenGameplay) {
        screen.PauseGame(false);
      },
    });
    Choices.set(Choices.length() + 1, {
      Name: "skip_song",
      Action: function (screen: ScreenGameplay) {
        screen.PostScreenMessage("SM_NotesEnded", 0);
      },
    });
    Choices.set(Choices.length() + 1, {
      Name: "forfeit_course",
      Action: function (screen: ScreenGameplay) {
        (
          screen.SetPrevScreenName(SelectMusicOrCourse()) as ScreenGameplay
        ).begin_backing_out();
      },
    });
    Choices.set(Choices.length() + 1, {
      Name: "end_course",
      Action: function (screen: ScreenGameplay) {
        screen.PostScreenMessage("SM_LeaveGameplay", 0);
      },
    });
  }

  const Selections: ActorFrame = Def.ActorFrame({
    Name: "Selections",
    InitCommand: function (self: ActorFrame) {
      self.GetChild(1).playcommand("GainFocus");
    },
  });

  const ChangeSel = (self: ActorFrame, offset: number) => {
    if (!GAMESTATE.Env().get("GamePaused")) {
      return;
    }

    CurSel = CurSel + offset;

    if (CurSel < 1) {
      CurSel = 1;
    }

    if (CurSel > Choices.length()) {
      CurSel = Choices.length();
    }

    for (const i of $range(1, Choices.length())) {
      self
        .GetChild("Selections")
        .GetChild(i)
        .playcommand(i === CurSel ? "GainFocus" : "LoseFocus");
    }
  };

  const ColorTable: LuaTable = GameColor.Custom;
  const menu_item_height = 64;
  const middlepoint = menu_item_height * Choices.length();

  for (const [i, v] of ipairs(Choices)) {
    const ActorFrameArg = new LuaTable();
    ActorFrameArg.set("Name", i);
    ActorFrameArg.set("InitCommand", function (self: ActorFrame) {
      self.y(-(middlepoint * 0.6) + (menu_item_height + 8) * i);
    });
    ActorFrameArg.set(
      ActorFrameArg.length() + 1,
      LoadModule("UI/UI.ClickArea.lua")({
        Width: 280,
        Height: 50,
        ReturnAdjacentActorFrame: true,
        Action: function (self: ActorFrame) {
          if (Paused) {
            CurSel = i;
            Choices.get(CurSel).Action(SCREENMAN.GetTopScreen());
            self.GetParent().GetParent().playcommand("Start");
            Paused = false;
          }
        },
      })
    );
    const ActorFrameArgSub1 = new LuaTable();
    ActorFrameArgSub1.set("InitCommand", function (self: ActorFrame) {
      self.playcommand("LoseFocus");
    });
    ActorFrameArgSub1.set("LoseFocusCommand", function (self: ActorFrame) {
      self.diffusealpha(0.2);
    });
    ActorFrameArgSub1.set("GainFocusCommand", function (self: ActorFrame) {
      self.diffusealpha(0.8);
    });
    ActorFrameArgSub1.set(
      ActorFrameArgSub1.length() + 1,
      LoadModule("UI/UI.ButtonBox.lua")(280, 50, 4)
    );
    ActorFrameArg.set(
      ActorFrameArg.length() + 1,
      Def.ActorFrame(ActorFrameArgSub1)
    );
    ActorFrameArg.set(
      ActorFrameArg.length() + 1,
      Def.BitmapText({
        Font: "_Medium",
        Text: THEME.GetString("PauseMenu", v.Name),
        InitCommand: function (self: BitmapText) {
          self
            .diffuse(ColorTable.get("menuTextGainFocus"))
            .playcommand("LoseFocus");
        },
        LoseFocusCommand: function (self: BitmapText) {
          self.diffusealpha(0.5);
        },
        GainFocusCommand: function (self: BitmapText) {
          self.diffusealpha(1);
        },
      })
    );
    Selections.set(Selections.length() + 1, Def.ActorFrame(ActorFrameArg));
  }

  const returnActorFrameArg = new LuaTable();
  returnActorFrameArg.set("OnCommand", function (self: ActorFrame) {
    SCREENMAN.GetTopScreen().AddInputCallback(
      LoadModule("Lua.InputSystem.lua")(self)
    );
    self.visible(false).Center();
  });
  returnActorFrameArg.set(
    "CurrentSongChangedMessageCommand",
    function (self: ActorFrame) {
      if (SCREENMAN.GetTopScreen() && SCREENMAN.GetTopScreen().PauseGame) {
        (SCREENMAN.GetTopScreen() as ScreenGameplay).PauseGame(false);
      }
    }
  );
  returnActorFrameArg.set(
    "TouchPauseMenuMessageCommand",
    function (self: ActorFrame, params) {
      self.playcommand("Back", params);
    }
  );
  returnActorFrameArg.set("BackCommand", function (self: ActorFrame, params?: LuaTable & AnyTable) {
    let usePlayer = self.pn;

    if (params && params.length() > 0) {
      usePlayer = params.Player
    }

    if (!GAMESTATE.IsHumanPlayer(usePlayer)) {
      return;
    }

    if (!Paused) {
      (SCREENMAN.GetTopScreen() as ScreenGameplay).PauseGame(true);
      ChangeSel(self, 0);
      MESSAGEMAN.Broadcast("PlayerHitPause", { pn: usePlayer });
      self.visible(true);
      self.GetChild("Dim").playcommand("ShowOrHide", { state: "show" });
    }
    Paused = true;
    GAMESTATE.Env().set("GamePaused", Paused);
    (discordTools as { SendCurrentSong: (arg1: any) => void }).SendCurrentSong(
      Paused
    );
  });
  returnActorFrameArg.set("StartCommand", function (self: ActorFrame) {
    if (Paused) {
      Paused = false;
      Choices.get(CurSel).Action(SCREENMAN.GetTopScreen());
      self.visible(false);
      self.GetChild("Dim").playcommand("ShowOrHide", { state: "hide" });
      GAMESTATE.Env().set("GamePaused", Paused);
      (
        discordTools as { SendCurrentSong: (arg1: any) => void }
      ).SendCurrentSong(Paused);
    }
  });
  returnActorFrameArg.set("MenuLeftCommand", function (self: ActorFrame) {
    if (Paused) {
      ChangeSel(self, -1);
    }
  });
  returnActorFrameArg.set("MenuRightCommand", function (self: ActorFrame) {
    if (Paused) {
      ChangeSel(self, 1);
    }
  });
  returnActorFrameArg.set("MenuUpCommand", function (self: ActorFrame) {
    if (Paused) {
      ChangeSel(self, -1);
    }
  });
  returnActorFrameArg.set("MenuDownCommand", function (self: ActorFrame) {
    if (Paused) {
      ChangeSel(self, 1);
    }
  });
  returnActorFrameArg.set(
    returnActorFrameArg.length() + 1,
    Def.Quad({
      Name: "Dim",
      InitCommand: function (self: Quad) {
        self
          .stretchto(
            SCREEN_WIDTH * -1,
            SCREEN_HEIGHT * -1,
            SCREEN_WIDTH,
            SCREEN_HEIGHT
          )
          .diffuse(Color.Black)
          .diffusealpha(0);
      },
      ShowOrHideCommand: function (self: Quad, param) {
        self
          .stoptweening()
          .linear(0.2)
          .diffusealpha(param.state === "show" ? 0.5 : 0);
        if (param.state !== "show") {
          self.sleep(0.5).queuecommand("SendNewPauseState");
        }
      },
      SendNewPauseStateCommand: function (self: Quad) {
        MESSAGEMAN.Broadcast("PlayerUnpaused");
      },
    })
  );
  returnActorFrameArg.set(returnActorFrameArg.length() + 1, Selections);
  const ActorFrameArgSub2 = new LuaTable();
  ActorFrameArgSub2.set("InitCommand", function (self: ActorFrame) {
    self.y(SCREEN_HEIGHT * 0.5 - 60).zoom(0.8);
  });
  ActorFrameArgSub2.set("PauseCommand", function (self: ActorFrame) {
    const pn = GAMESTATE.GetMasterPlayerNumber()
    SCREENMAN.SystemMessage(`We're supposed to be ${pn}`)
    self.visible(
      STATSMAN.GetCurStageStats()
        .GetPlayerStageStats(GAMESTATE.GetMasterPlayerNumber())
        .IsDisqualified()
    );
  });
  ActorFrameArgSub2.set("Condition", NETMAN.IsConnectionEstablished());
  ActorFrameArgSub2.set(
    ActorFrameArgSub2.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG("MenuIcon", "Network"),
      InitCommand: function (self: Sprite) {
        self.diffusealpha(0.6);
      },
    })
  );
  ActorFrameArgSub2.set(
    ActorFrameArgSub2.length() + 1,
    Def.Sprite({
      Texture: THEME.GetPathG("NotificationIcon", "Error"),
      InitCommand: function (self: Sprite) {
        self.zoom(0.8);
      },
    })
  );
  ActorFrameArgSub2.set(
    ActorFrameArgSub2.length() + 1,
    Def.BitmapText({
      Font: "_Medium",
      Text: "Score submission is now disabled.",
      InitCommand: function (self: BitmapText) {
        self.y(36);
      },
    })
  );
  returnActorFrameArg.set(
    returnActorFrameArg.length() + 1,
    Def.ActorFrame(ActorFrameArgSub2)
  );
  return Def.ActorFrame(returnActorFrameArg);
}
