{
  const UIHelper = LoadModule("UI/UIHelper.OptionsList.lua");
  let speedVal = 0;
  const song_option = function (
    name,
    type,
    margin?,
    min?,
    max?,
    format?,
    formatVis?
  ) {
    return {
      Name: name,
      Type: type,
      Value: "song_option",
      Margin: margin,
      Min: min,
      Max: max,
      Format: format,
      FormatVisible: formatVis,
    };
  };
  const speedprx = ["%.2fx", "C%d", "M%d", "A%d", "CA%d"];
  let speedType = 1;
  let speedstep = 25;
  let DetailedPaneMenuOpen = false;
  let PaceMenuOpen = false;
  const pOptions = GAMESTATE.GetPlayerState(
    GAMESTATE.GetMasterPlayerNumber()
  ).GetPlayerOptions("ModsLevel_Preferred");
  const speedFuncs = [
    pOptions.XMod,
    pOptions.CMod,
    pOptions.MMod,
    pOptions.AMod,
    pOptions.CAMod,
  ];
  let profileList = new LuaTable();
  const getProfileData: OptionsGetProfileData = LoadModule(
    "Options.GetProfileData.lua"
  );

  profileList.set(profileList.length() + 1, {
    Name: "GUEST",
    Icon: THEME.GetPathG("User Profile generic", "icon"),
    Type: "action",
    Load: function (self, player) {},
    Value: function (self, player) {
      GAMESTATE.MakePlayerGest(player);
      MESSAGEMAN.Broadcast("LeavingOptionsMenu", {
        Player: player,
        UpdateWheel: true,
      });
    },
  });

  for (const pIndex of $range(0, PROFILEMAN.GetNumLocalProfiles() - 1)) {
    const profile = PROFILEMAN.GetLocalProfileFromIndex(pIndex);
    const assignedID = PROFILEMAN.GetLocalProfileIDFromIndex(pIndex);
    const data = getProfileData(assignedID);

    profileList.set(profileList.length() + 1, {
      Name: profile.GetDisplayName(),
      Icon: data["Image"],
      Type: "action",
      Load: function (self, player) {
        self.container.Disabled = profile === PROFILEMAN.GetProfile(player);
      },
      Value: function (self, player) {
        GAMESTATE.ChangeProfileForPlayer(player, assignedID);
        MESSAGEMAN.Broadcast("LeavingOptionsMenu", {
          Player: player,
          UpdateWheel: true,
        });
      },
    });
  }

  let chosenTimingWindow = LoadModule("Options.ReturnCurrentTiming.lua")()
    .Name;
  let JudgmentTypeGraphics = LoadModule("Options.SmartJudgeChoices.lua")();
  let JudgmentValues = LoadModule("Options.SmartJudgeChoices.lua")("Value");
  const ComboTypeGraphics = LoadModule("Options.SmartCombo.lua")("Show");

  const t = new LuaTable();

  t.set("Name", "New Area!");
  t.set(t.length() + 1, {
    Name: "Search for Song",
    Type: "message",
    Value: "BeginSearch",
  });
  t.set(t.length() + 1, {
    Name: "Toggle Favorite",
    Load: function (self, player: string) {
      self.container.Disabled = GAMESTATE.GetCurrentSong() !== null;
      const playerToProfileSlot = "ProfileSlot_Player" + player["s" + "ub"](-1);
      self.container.Disabled =
        PROFILEMAN.GetProfileDir(
          playerToProfileSlot as unknown as ProfileSlot
        ) === "";
    },
    Icon: THEME.GetPathG("SelectMusic/FavouriteIcon", "on"),
    Type: "action",
    Value: function (self, player) {
      const profile = PROFILEMAN.GetProfile(player);

      if (!profile) {
        return;
      }

      let isAdding = false;

      const song = GAMESTATE.GetCurrentSong();

      if (!song) {
        return;
      }

      if (profile.SongIsFavorite(song)) {
        profile.RemoveSongFromFavorites(song);
      } else {
        profile.AddSongToFavorites(song);
        isAdding = true;
      }

      MESSAGEMAN.Broadcast("FavoriteStateChanged", {
        Player: player,
        IsAdd: isAdding,
      });
    },
  });

  const speedTable = new LuaTable()
  speedTable.set('MessageOnEntry', 'ShowSpeeds')
  speedTable.set('MessageonExit', 'HideSpeeds')
  speedTable.set(speedTable.length() + 1, {
    Name: 'Current Speed',
    Type: 'number',
    Min: 0,
    Margin: speedstep,
    Value: speedVal,
    Load: function (self, Player) {
      const pOptions = GAMESTATE.GetPlayerState(Player).GetPlayerOptions('ModsLevel_Preferred')
      const tmpp = UIHelper.ObtainSpeedType(pOptions)
      const speed = UIHelper.GetSpeed(pOptions, tmpp)

      speedVal = speed
      MESSAGEMAN.Broadcast('SpeedChange', {
        Player,
        Speed: speed,
        Type: tmpp
      })
    },
    Save: function (self, Player) {
      const pOptions = GAMESTATE.GetPlayerState(Player).GetPlayerOptions('ModsLevel_Preferred')
      let finalspeed = speedVal

      if (speedType === 1) {
        finalspeed = speedVal * 0.01
      }

      speedFuncs[speedType](pOptions, finalspeed)
      MESSAGEMAN.Broadcast('PlayerOptionChange', {
        Player
      })
    },
    FormatVisible: function (value) {
      const isXMod = speedType === 1
      return string.format(speedprx[speedType], value * (isXMod ? 0.01 : 1))
    },
    SubscribedMessage: ["Speed Mod Type", "Speed Increment"],
    UpdateFromMessage: function (Container, newValue, player) {
      Container.ValueE = Container.Load(null, player)
      Container.Margin = speedstep

      Container.Save(Container, player)
      MESSAGEMAN.Broadcast('SpeedChange', {
        Player: player,
        Speed: newValue,
        Type: speedType
      })
    },
    NotifyOfChange: function (Container, newValue, player) {
      speedVal = newValue
      if (speedVal < speedstep) {
        speedVal = speedstep
        Container.ValueE = speedVal
      }

      MESSAGEMAN.Broadcast('SpeedChange', {
        Player: player,
        Speed: speedVal,
        Type: speedType
      })
    }
  })
  speedTable.set(speedTable.length() + 1, {
    Name: 'Speed Mod Type',
    Type: 'list',
    Value: 1,
    Values: ["XMod", "CMod", "MMod", "AMod", "CAMod"],
    Load: function (self, Player) {
      const pOptions = GAMESTATE.GetPlayerState(Player).GetPlayerOptions('ModsLevel_Preferred')
      const sptype = UIHelper.ObtainSpeedType(pOptions)

      MESSAGEMAN.Broadcast('CheckForMessages', {
        Value: 'Speed Mod Type',
      })
      speedType = sptype
      return sptype
    },
    NotifyOfChange: function (Container, newValue, player) {
      const pOptions = GAMESTATE.GetPlayerState(player).GetPlayerOptions('ModsLevel_Preferred')

      speedType = newValue
      MESSAGEMAN.Broadcast('SpeedChange', {
        Player: Player,
        Speed: speedVal,
        Type: speedType
      })
    }
  })
  speedTable.set(speedTable.length() + 1, {
    Name : "Speed Increment",
    Type : "number",
    Min : 1,
    Max : 50,
    Margin : 1,
    Value : "outfox_pref",
    Default : 25,
    AfterLoad: function(self) {
      speedstep = self.container.ValueE
      MESSAGEMAN.Broadcast("CheckForMessages", {
          Value: "Speed Mod Type"
      })
    },
    NotifyOfChange: function(Container, newValue, player) {
      speedstep = newValue
    }
  })
  t.set(t.length() + 1, {
    Name: 'Speed',
    FormatVisible: function(self) {
      if (speedVal === 0) {
        const plOptions = GAMESTATE.GetPlayerState(self.player).GetPlayerOptions('ModsLevel_Preferred')
        speedType = UIHelper.ObtainSpeedType(plOptions)
        speedVal = UIHelper.GetSpeed(plOptions, speedType)
      }

      const isXMod = speedType === 1

      return string.format(speedprx[speedType], speedVal * (isXMod ? 0.01 : 1))
    },
    MessageOnEntry: 'ShowSpeeds',
    Menu: speedTable
  })
  t.set(t.length() + 1, {
    SkipIf: !NETMAN || !NETMAN.IsConnectionEstablished(),
    Name: 'AutoSaveOnlineScore',
    Type: 'boolean',
    Default: true,
    Value: 'outfox_pref',
    Icon: THEME.GetPathG('MenuIcon', 'network')
  })
  t.set(t.length() + 1, {
    SkipIf: !NETMAN || !NETMAN.IsConnectionEstablished(),
    Name: 'ShowLeaderboard',
    Icon: THEME.GetPathG('MenuIcon', 'network'),
    Type: 'action',
    Default: true,
    Value: function (self, player) {
      MESSAGEMAN.Broadcast('ToggleLeaderboard', {
        Player: player
      })
    }
  })

  const generalOptionsTable = new LuaTable()

  generalOptionsTable.set('MessageOnEntry', 'HidePreview')
  generalOptionsTable.set(generalOptionsTable.length() + 1, {
    Name: 'Mini',
    Type: 'number',
    Margin: 0.01,
    Min: -2,
    Max: 2,
    Format: '%.2f',
    FormatVisible: UIHelper.formatToPercent,
    Value: 'player_mod'
  })
  generalOptionsTable.set(generalOptionsTable.length() + 1, {
    Name: 'Persp',
    Type: 'list',
    Value: 'player_mod_table',
    Values: ["Hallway", "Incoming", "Overhead", "Space", "Distant"]
  })
  generalOptionsTable.set(generalOptionsTable.length() + 1, {
    Name: 'Reverse',
    Type: 'boolean',
    Value: 'player_mod'
  })
  generalOptionsTable.set(generalOptionsTable.length() + 1, {
    Name: 'NoteSkin',
    Type: 'list',
    Value: 'player_mod',
    Values: NOTESKIN.GetNoteSkinNames()
  })
  generalOptionsTable.set(generalOptionsTable.length() + 1, {
    Name: 'Character',
    Type: 'list',
    Value: 1,
    Values: CHARMAN.GetAllCharacters(true),
    FormatVisible: function (self, value) {
      const cur: Character = self.container.Values[value]

      if (cur.GetDisplayName() === 'default') {
        return 'Off'
      }

      return (self.container.Values[value] as Character).GetDisplayName()
    },
    Load: function (self, Player) {
      const curChar = GAMESTATE.GetCharacter(Player)
      return UIHelper.findInTable(self.container.Values, curChar, 1)
    },
    Save: function (self, Player) {
      const CharID = (self.container.Values[self.container.ValueE] as Character).GetCharacterID()
      GAMESTATE.SetCharacter(Player, CharID)
    }
  })
  generalOptionsTable.set(generalOptionsTable.length() + 1, {
    Name: 'Stage',
    Type: 'list',
    Value: 1,
    Values: CHARSTAGEMAN.GetAllStages(true),
    FormatVisible: function (self, value) {
      const cur: CharacterStage = self.container.Values[value]

      if (cur.GetName() === 'default') {
        return 'Off'
      }

      return (self.container.Values[value] as CharacterStage).GetName()
    },
    Load: function (self, Player) {
      const curChar = GAMESTATE.GetStage()
      return UIHelper.findInTable(self.container.Values, curChar, 1)
    },
    Save: function (self, Player) {
      const CharID = (self.container.Values[self.container.ValueE] as CharacterStage).GetID()
      GAMESTATE.SetStage(CharID)
    }
  })

  t.set(t.length() + 1, {
    Name: 'General Options',
    MessageOnEntry: 'ShowPreview',
    Menu: generalOptionsTable
  })

  const moreOptionsTable = new LuaTable()

  moreOptionsTable.set('MessageOnExit', 'HidePreview')
  moreOptionsTable.set(moreOptionsTable.length() + 1, {
    Name: 'Note Display',
    Menu: [
      {
        Name    : "NoteSkin",
        Type    : "list",
        Value   : "player_mod",
        Values  : NOTESKIN.GetNoteSkinNames()
      },
      {
        Name          : "Mini",
        Type          : "number",
        Margin        : 0.01,
        Format        : "%.2f",
        FormatVisible : UIHelper.formatToPercent,
        Value         : "player_mod"
      },
      {
        Name          : "NotefieldBG",
        Type          : "number",
        Margin        : 0.01,
        Format        : "%.2f",
        FormatVisible : UIHelper.formatToPercent,
        Value         : 0
      },
      {
        Name    : "Persp",
        Type    : "list",
        Value   : "player_mod_table",
        Values  : ["Hallway", "Incoming", "Overhead", "Space", "Distant"]
      },
      {
        Name  : "Dark",
        Type  : "boolean",
        Value : "player_mod"
      }
    ]
  })
  moreOptionsTable.set(moreOptionsTable.length() + 1, {
    Name: 'Chart Modifiers',
    Menu: [
      {
        Name        : "Left",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Right",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Mirror",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Backwards",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Shuffle",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "SuperShuffle",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "SoftShuffle",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      }
    ]
  })
  moreOptionsTable.set(moreOptionsTable.length() + 1, {
    Name: 'Insert Modifiers',
    Menu: [
      {
        Name        : "Wide",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Big",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Quick",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "BMRize",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Skippy",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Echo",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "Stomp",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      }
    ]
  })
  moreOptionsTable.set(moreOptionsTable.length() + 1, {
    Name: 'Remove Notes',
    Menu: [
      {
        Name        : "NoMines",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "NoRolls",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "NoLifts",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "NoFakes",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "NoQuads",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "NoJumps",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      },
      {
        Name        : "NoStretch",
        Type        : "boolean",
        Value       : "player_mod",
        LiteralBool : true
      }
    ]
  })
  moreOptionsTable.set(moreOptionsTable.length() + 1, {
    Name: 'Note Effects',
    Menu: [
      {
        Name: 'Effects',
        Menu: [
          {
            Name  : "Drunk",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Dizzy",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Twirl",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Roll",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Confusion",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name          : "Mini",
            Type          : "number",
            Margin        : 0.01,
            Format        : "%.2f",
            FormatVisible : UIHelper.formatToPercent,
            Value         : "player_mod"
          },
          {
            Name          : "Tiny",
            Type          : "number",
            Margin        : 0.01,
            Format        : "%.2f",
            FormatVisible : UIHelper.formatToPercent,
            Value         : "player_mod"
          },
          {
            Name  : "Beat",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Bumpy",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Confusion",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Dizzy",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Flip",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Invert",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Tipsy",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Tornado",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Xmode",
            Type  : "boolean",
            Value : "player_mod"
          }
        ]
      },
      {
        Name: 'Scroll',
        Menu: [
          {
            Name  : "Boost",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Boomerang",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Brake",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Expand",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Wave",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Reverse",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Split",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Alternate",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Cross",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Centered",
            Type  : "boolean",
            Value : "player_mod"
          }
        ]
      },
      {
        Name: 'Vision',
        Menu: [
          {
            Name  : "Hidden",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Sudden",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Stealth",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "Blink",
            Type  : "boolean",
            Value : "player_mod"
          },
          {
            Name  : "RandomVanish",
            Type  : "boolean",
            Value : "player_mod"
          }
        ]
      }
    ]
  })
  moreOptionsTable.set(moreOptionsTable.length() + 1, {
    Name: 'Clear All',
    Type: 'action',
    Value: function(self, player) {
      const pOptions = GAMESTATE.GetPlayerState(player).GetPlayerOptions('ModsLevel_Preferred')
      const curNoteskin = pOptions.NoteSkin()
      pOptions.FromString('clearall')

      let finalspeed = speedVal

      if (speedType === 1) {
        finalspeed = speedVal * .01
      }

      speedFuncs[speedType](pOptions, finalspeed)

      pOptions.NoteSkin(curNoteskin)
      MESSAGEMAN.Broadcast('SpeedChange', {
        Player,
        Speed: speedVal,
        Type: speedType
      })
      MESSAGEMAN.Broadcast('PlayerOptionChange', {
        Player: player
      })
    },
    Save: function (self, player) {
      const pOptions = GAMESTATE.GetPlayerState(player).GetPlayerOptions('ModsLevel_Preferred')
      let finalspeed = speedVal

      if (speedType === 1) {
        finalspeed = speedVal * .01
      }

      speedFuncs[speedType](pOptions, finalspeed)
    }
  })

  t.set(t.length() + 1, {
    Name: 'More Options',
    MessageOnEntry: 'ShowPreview',
    Menu: moreOptionsTable
  })

  const songOptionsTable = new LuaTable()

  songOptionsTable.set(songOptionsTable.length() + 1, song_option("MusicRate", "number", 0.02, 0.2, 3, "%.2f", UIHelper.decimalNumber))
  songOptionsTable.set(songOptionsTable.length() + 1, {
    Name: 'LifeSetting',
    Type: 'list',
    Value: 'player_mod',
    Values: ["LifeType_Bar", "LifeType_Battery", "LifeType_Time"],
    Strings: ["Bar", "Battery", "LifeTime"],
    FormatVisible: function (self, value) {
      return THEME.GetString('OptionNames', self.container.String[value])
    },
    Save: function (self, player) {
      const val = self.container.Values[self.container.ValueE]

      GAMESTATE.GetPlayerState(player).GetPlayerOptions("ModsLevel_Preferred").LifeSetting(val)
      GAMESTATE.GetPlayerState(player).GetPlayerOptions("ModsLevel_Song").LifeSetting(val)
      GAMESTATE.GetPlayerState(player).GetPlayerOptions("ModsLevel_Current").LifeSetting(val)
    }
  })
  songOptionsTable.set(songOptionsTable.length() + 1, {
    Name: 'FailSetting',
    Type: 'list',
    Value: 'player_mod',
    Values: ["FailType_Immediate", "FailType_ImmediateContinue", "FailType_EndOfSong", "FailType_Off"],
    Strings: ["Immediate", "ImmediateContinue", "EndOfSong", "Off"],
    FormatVisible: function (self, value) {
      return THEME.GetString('OptionNames', self.container.String[value])
    },
    Save: function (self, player) {
      const val = UIHelper.GetItemFromContainerIndex(self)
      GAMESTATE.GetPlayerState(player).GetPlayerOptions('ModsLevel_Preferred').FailSetting(val)
    }
  })
  songOptionsTable.set(songOptionsTable.length() + 1, {
    Name : "AllPlayerSettings",
    Type : "label"
  })
  songOptionsTable.set(songOptionsTable.length() + 1, song_option("AssistMetronome", "boolean"))
  songOptionsTable.set(songOptionsTable.length() + 1, {
    Name  : "ShowLyrics",
    Type  : "boolean",
    Value : "system_option"
  })

  t.set(t.length() + 1, {
    Icon: THEME.GetPathG('', 'UI/Gear'),
    Name: 'Song Options',
    Menu: songOptionsTable
  })

  const additionalOptionsTable = new LuaTable()

  additionalOptionsTable.set('MessageOnExit', 'HidePreview')
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'StatsPane',
    Type: 'boolean',
    Value: 'outfox_pref',
    AfterLoad: function (self) {
      DetailedPaneMenuOpen = self.container.ValueE
      return true
    },
    NotifyOfChange: function (Container, newValue, player) {
      DetailedPaneMenuOpen = newValue
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'StatsPane Settings',
    Disabled: !DetailedPaneMenuOpen,
    SubscribedMessage: 'StatsPane',
    UpdateFromMessage: function (Container, newValue, player) {
      Container.Disabled = !DetailedPaneMenuOpen
    },
    Menu: [
      {
        Name    : "showmiscjud",
        Type    : "boolean",
        Value   : "outfox_pref",
        Default : true
      },
      {
        Name    : "colorlifescatter",
        Type    : "boolean",
        Value   : "outfox_pref",
        Default : true
      },
      {
        Name  : "judgmentscatter",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name  : "labelnps",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name  : "alwaysmovegraph",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name  : "showfullgraph",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name    : "progressquad",
        Type    : "boolean",
        Value   : "outfox_pref",
        Default : true
      }
    ]
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'PaceMaker',
    Type: 'boolean',
    Value: 'outfox_pref',
    AfterLoad: function (self) {
      PaceMenuOpen = self.container.ValueE
      return true
    },
    NotifyOfChange: function (Container, newValue, player) {
      PaceMenuOpen = newValue
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'PaceMaker Settings',
    Disabled: !PaceMenuOpen,
    SubscribedMessage: 'PaceMaker',
    UpdateFromMessage: function (Container, newValue, player) {
      Container.Disabled = !PaceMenuOpen
    },
    Menu: [
      {
        Name : "TODO: Add specific items on this submenu",
        Type : "label"
      },
      {
        Name    : "showmiscjud",
        Type    : "boolean",
        Value   : "outfox_pref",
        Default : true
      },
      {
        Name    : "colorlifescatter",
        Type    : "boolean",
        Value   : "outfox_pref",
        Default : true
      },
      {
        Name  : "judgmentscatter",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name  : "labelnps",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name  : "alwaysmovegraph",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name  : "showfullgraph",
        Type  : "boolean",
        Value : "outfox_pref"
      },
      {
        Name    : "progressquad",
        Type    : "boolean",
        Value   : "outfox_pref",
        Default : true
      }
    ]
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'OffsetBar',
    Type: 'boolean',
    Value: 'outfox_pref',
    NotifyOfChange: function (Container, newValue, player) {
      MESSAGEMAN.Broadcast('OffsetBarChange', {
        Value: newValue,
        pn: player
      })
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'MeasureCounter',
    Type: 'boolean',
    Value: 'outfox_pref'
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'OverTopGraph',
    Type: 'boolean',
    Value: 'outfox_pref'
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'MissCounter',
    Type: 'boolean',
    Value: 'outfox_pref',
    NotifyOfChange: function (Container, newValue, player) {
      MESSAGEMAN.Broadcast('MissCounterChange', {
        Value: newValue,
        pn: player
      })
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'BeatBars',
    Type: 'boolean',
    Value: 'outfox_pref',
    NotifyOfChange: function (Container, newValue, player) {
      MESSAGEMAN.Broadcast('BeatBarsChange', {
        Value: newValue,
        pn: player
      })
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'ScreenFilter',
    Type: 'number',
    Default: 0,
    Margin: 0.1,
    Min: 0,
    Max: 1,
    Format: "%.2f",
    FormatVisible: UIHelper.formatToPercent,
    Value: 'outfox_pref',
    NotifyOfChange: function (Container, newValue, player) {
      MESSAGEMAN.Broadcast('ScreenFilterChange', {
        Value: newValue,
        pn: player
      })
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'SmartTimings',
    Type: 'list',
    Value: 'outfox_pref_table',
    MachinePref: true,
    Values: TimingModes,
    NotifyOfChange: function (Container, newValue, player) {
      const newtimingwindow = TimingModes[newValue]
      chosenTimingWindow = newtimingwindow

      JudgmentTypeGraphics = LoadModule("Options.SmartJudgeChoices.lua")(null, newtimingwindow)
      JudgmentValues = LoadModule("Options.SmartJudgeChoices.lua")("Value", newtimingwindow)
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'SmartJudgments',
    Type: 'list',
    Value: 'outfox_pref_table',
    Values: JudgmentTypeGraphics,
    UsePrefs: true,
    SubscribedMessage: 'SmartTimings',
    Save: function(self, Player, PrefsManager) {
      if (chosenTimingWindow !== null) {
        return;
      }

      (PrefsManager as PrefsManager).Set("JudgmentGraphic" + (chosenTimingWindow as string), JudgmentValues[self.container.ValueE])
    },
    UpdateFromMessage: function (Container, newValue, player, params) {
      Container.ValueE = JudgmentTypeGraphics
      (params.PrefsManager as PrefsManager).Get("JudgmentGraphic" + (chosenTimingWindow as string))
      UIHelper.findInTable(JudgmentTypeGraphics, JudgmentTypeGraphics[newValue], 1)
    },
    NotifyOfChange: function (Container, newValue, player) {
      MESSAGEMAN.Broadcast("JudgementGraphicChange", {
        Value   : newValue,
        pn      : player,
        Choices : JudgmentTypeGraphics
    })
    }
  })
  additionalOptionsTable.set(additionalOptionsTable.length() + 1, {
    Name: 'SmartCombo',
    Type: 'list',
    Value: 'outfox_pref_table',
    Values: ComboTypeGraphics,
    NotifyOfChange: function (Container, newValue, player) {
      MESSAGEMAN.Broadcast('ComboGraphicChange', {
        Value: newValue,
        pn: player,
        Choices: ComboTypeGraphics
      })
    }
  })
  t.set(t.length() + 1, {
    Icon: THEME.GetPathG('', 'UI/Gear'),
    Name: 'Additional Options',
    MessageOnEntry: 'ShowPreview',
    Menu: additionalOptionsTable
  })
  t.set(t.length() + 1, {
    Icon    : THEME.GetPathG("", "UI/Back"),
    Name    : "Change Profile",
    Menu    : profileList,
    SkipIf  : (GAMESTATE.GetCoinMode() as unknown as string) === "CoinMode_Pay" && !GAMESTATE.IsEventMode()
  })
  t.set(t.length() + 1, {
    Icon    : THEME.GetPathG("", "UI/Back"),
    Name    : "Exit Menu",
    Type    : 'message',
    Value   : 'LeavingOptionsMenu'
  })

  // @ts-ignore
  return t;
}
