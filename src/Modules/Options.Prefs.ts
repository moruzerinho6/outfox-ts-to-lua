interface BaseOptionProps {
  Default:  boolean,
  Choices:  Record<number, any> & LuaTable
  Values:   Record<number, any> & LuaTable
}

return {
	AutoSetStyle: {
		Default : true,
		Choices : [
      OptionNameString('Off'),
      OptionNameString('On')
    ],
		Values  : [ false, true ]
	},
	CustomLateJoinInGame: {
		Default : true,
		Choices : [
      OptionNameString('Off'),
      OptionNameString('On') ],
		Values : [ false, true ]
	},
	GameplayReadyPrompt: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	LongFail: {
		Default : false,
		Choices : [ OptionNameString('Short'), OptionNameString('Long') ],
		Values : [ false, true ]
	},
	NotePosition: {
		Default : true,
		Choices : [ OptionNameString('Normal'), OptionNameString('Lower') ],
		Values : [ false, true ]
	},
	ComboOnRolls: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	FlashyCombo: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	ComboUnderField: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	FancyUIBG: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	ShowMascotCharacter: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	TimingDisplay: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	GameplayFooter: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	PreferredMeter: {
		Default : "old",
		Choices : [ OptionNameString('MeterClassic'), OptionNameString('MeterX'), OptionNameString('MeterPump') ],
		Values : [ "old", "X", "pump" ]
	},
	ForcedExtraMods: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	AllowAudioInEvaluation: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	ComboIsPerRow: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	CurrentStageLocation: {
		Default : "None",
		Choices : LoadModule("Characters.LoadStageNames.lua")(),
		Values : LoadModule("Characters.LoadStageNames.lua")()
	},
	ScreenFilter: {
		UserPref : true,
		Default : 0,
		Choices : [ THEME.GetString('OptionNames','Off'), '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0' ],
		Values : [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ],
  },
	ScreenFilterColor :
	{
		UserPref : true,
		Default : 2,
		Choices : [ OptionNameString('DarkPlayerScreenFilter'), OptionNameString('DarkScreenFilter'), OptionNameString('LightPlayerScreenFilter'), OptionNameString('LightScreenFilter'), OptionNameString('GrayScreenFilter') ],
		Values : [1,2,3,4,5]
  },
  MeasureCounter: {
    UserPref : true,
    Default : false,
    Choices : [ OptionNameString('Off'), OptionNameString('On') ],
    Values : [false, true]
  },
  MeasureCounterDivisions: {
    UserPref : true,
    Default : 12,
    Choices : [ THEME.GetString('OptionNames', 'Div_4ths'), THEME.GetString('OptionNames', 'Div_8ths'), THEME.GetString('OptionNames', 'Div_12ths'), THEME.GetString('OptionNames', 'Div_16ths'), THEME.GetString('OptionNames', 'Div_24ths'), THEME.GetString('OptionNames', 'Div_32nds') ],
    Values : [4, 8, 12, 16, 24, 32]
  },
  MeasureCounterBreaks: {
    UserPref : true,
    Default : false,
    Choices : [ OptionNameString('Off'), OptionNameString('On') ],
    Values : [false, true]
  },
	JudgmentItems: {
		UserPref : true,
		SelectMultiple : true,
		Default : false,
		Choices : [ OptionNameString('OffsetBar'), OptionNameString('MSTiming'), OptionNameString('Blind') ],
		Values : [ "OffsetBar", "ProTiming", "HideJudgment" ],
	},
	JudgmentEval: {
		UserPref : true,
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	StatsPane: {
		UserPref : true,
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On'), OptionNameString('DetailedStats') ],
		Values : [ false, 1, 2 ]
	},
	OverTopGraph: {
		UserPref : true,
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	SmartJudgments: {
		UserPref : true,
		OneInRow : true,
		Default : THEME.GetMetric("Common","DefaultJudgment"),
		Choices : LoadModule("Options.SmartJudgeChoices.lua")(),
		Values : LoadModule("Options.SmartJudgeChoices.lua")("Value")
	},
	SmartTimings: {
		GenForOther : ["SmartJudgments",LoadModule("Options.SmartJudgeChoices.lua")],
		GenForUserPref : true,
		Default : TimingModes[1],
		Choices : TimingModes,
		Values : TimingModes
	},
	DisableLowerWindows: {
		Default : 0,
		Choices : [ OptionNameString('Off'), THEME.GetString("JudgmentDisplay","JudgmentW5"), THEME.GetString("JudgmentDisplay","JudgmentW4") + " & " + THEME.GetString("JudgmentDisplay","JudgmentW5") ],
		Values : [ 0, 1, 2 ]
	},
	SmartToasties: {
		UserPref : true,
		Default : THEME.GetMetric("Common","DefaultToasty"),
		Choices : LoadModule("Options.SmartToastieChoices.lua")("Show"),
		Values : LoadModule("Options.SmartToastieChoices.lua")("Show")
	},
	ToastiesDraw: {
		UserPref : true,
		Default : true,
		Choices : [ OptionNameString('Front'), OptionNameString('Back') ],
		Values : [ false, true ]
	},
	MiniSelector: {
		UserPref : true,
		Default : 100,
		OneInRow : true,
		Choices : fornumrange(0,200,5),
		Values : fornumrange(0,200,5),
	},
	RotateFieldZ: {
		UserPref : true,
		Default : 0,
		OneInRow : true,
		Choices : fornumrange(0,360,10),
		Values : fornumrange(0,360,10),
	},
	RotateFieldX: {
		UserPref : true,
		Default : 0,
		OneInRow : true,
		Choices : fornumrange(0,360,10),
		Values : fornumrange(0,360,10),
	},
	NoteDensityCalculationMargin: {
		Default : 64000,
		OneInRow : true,
		Choices : [ OptionNameString('Off'),2,4,8,16,32,64,128,256,512 ],
		Values : [ false, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000 ],
	},
	NoteFieldLength: {
		Default : SCREEN_HEIGHT,
		Choices : ["Normal", "Long"],
		Values : [SCREEN_HEIGHT, 9000],
	},
	experimentNPSDiagram: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ]
	},
	NoteDrawOrder: {
		Default : "Reverse",
		Choices : [ "Reverse", "Forward" ],
		Values : [ "Reverse", "Forward" ]
	},
	LuaNoteSkins: {
		Default : "default",
		UserPref : true,
		OneInRow : true,
		Choices : NOTESKIN.GetNoteSkinNames(),
		Values : NOTESKIN.GetNoteSkinNames(),
		LoadFunction : function(this: BaseOptionProps, list: LuaTable,pn) {
      const CurNoteSkin = GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').NoteSkin()
      for (const [i, v2] of ipairs(this.Choices)) {
        if (string.lower(tostring(v2)) == string.lower(tostring(CurNoteSkin))) {
          list.set(i, true)
          return
        }
      }

      list.set(i, true)
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable,pn) {
      for (const [i, v2] of ipairs(this.Choices)) {
        if (list.get(i)) {
          GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').NoteSkin(v2)
        }
      }
    }
	},
	PlayerOptionNextScreen: {
		Default : "ScreenGameplay",
		Choices : [
			THEME.GetString("OptionNames","OptionSong"),
			THEME.GetString("OptionNames","OptionMain"),
			THEME.GetString("OptionNames","OptionSpecial"),
			THEME.GetString("OptionNames","OptionEffects"),
			THEME.GetString("OptionNames","OptionSelectMusic"),
    ],
		Values : [
			"ScreenStageInformation",
			"ScreenPlayerOptions",
			"ScreenPlayerOptions",
			"ScreenPlayerOptions",
			"ScreenSelectMusic"
    ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      list.set(1, true)
      GAMESTATE.Env().set('PlayerOptionsNextScreen', Branch.SongOptions())
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
      const entnames = ['Main', 'Special', 'Effects']

      for (const [i, v2] of ipairs(this.Values)) {
        if (list.get(i) && i !== 1) {
          setenv('DifferentScreen', true)
          if (i > 1 && i < (this.Values as LuaTable).length()) {
            setenv('NewOptions', entnames[i-2]) // -2 because of tstl
          }
        }
      }
    }
	},
	SpeedModType: {
		Default : "x",
		UserPref : true,
		Choices : [ THEME.GetString("OptionNames","SpeedX"), THEME.GetString("OptionNames","SpeedA"), THEME.GetString("OptionNames","SpeedM"), THEME.GetString("OptionNames","SpeedC") ],
		Values : ["x","a","m","c"],
		LoadFunction : function(self,list: LuaTable, pn: PlayerNumber) {
      if (GAMESTATE.IsHumanPlayer(pn)) {
        const po = GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred')

        if (po.AverageScrollBPM() > 0) {
          list.set(2, true)
          return
        } else if(po.MaxScrollBPM() > 0) {
          list.set(3, true)
        } else if (po.TimeSpacing() > 0) {
          list.set(4, true)
        } else {
          list.set(1, true)
        }
      }
    },
		SaveFunction: function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {}
	},
	SpeedModVal: {
		Default : 1,
		OneInRow : true,
		UserPref : true,
		Choices : [" "],
		Values : [" "],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {
      list.set(1, true)
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {},
	},
	SpeedMargin: {
		Default : 0.25,
		Choices : fornumrange(0.1,1,0.05),
		Values : fornumrange(0.1,1,0.05),
	},
	KirinSubTheme: {
		Default : 1,
		Choices : ["Fafnir"],
		Values : [1]
	},
	KirinGameplayLayout: {
		Default : "layered",
		Choices : ["Layered", "Classic"],
		Values : ["layered", "classic"]
	},
	LifeType: {
		Default : "Bar",
		UserPref : true,
		Choices : GAMESTATE.IsCourseMode() ? [ THEME.GetString("OptionNames","Bar"), THEME.GetString("OptionNames","Battery"), THEME.GetString("OptionNames","LifeTime") ] : [ THEME.GetString("OptionNames","Bar"), THEME.GetString("OptionNames","Battery") ],
		Values : GAMESTATE.IsCourseMode() ? [ "Bar", "Battery", "Time" ] : [ "Bar", "Battery" ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {
      const mod = GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').LifeSetting()

      for (const [i, v2] of ipairs(this.Values)) {
        if (tostring(v2) === ToEnumShortString(tostring(mod))) {
          list.set(i, true)
        }
      }

      list.set(1, true)
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {
      for (const [i, v2] of ipairs(this.Values)) {
        if (list.get(i)) {
          GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').LifeSetting((('LifeType_' + (v2 as string)) as unknown as LifeType))
        }
      }
    }
	},
	BarDrain: {
		Default : "Bar",
		UserPref : true,
		Choices : [ THEME.GetString("OptionNames","Normal"), THEME.GetString("OptionNames","NoRecover"), THEME.GetString("OptionNames","SuddenDeath") ],
		Values : [ "Normal", "NoRecover", "SuddenDeath" ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {
      const mod = GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').DrainSetting()
      for (const [i, v2] of ipairs(this.Values)) {
        if (tostring(v2) === ToEnumShortString(tostring(mod))) {
          list.set(i, true)
        }
      }
      list.set(1, true)
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {
      for (const [i, v2] of ipairs(this.Values)) {
        if (list.get(i)) {
          GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').DrainSetting((('DrainType_' + (v2 as string)) as unknown as DrainType))
        }
      }
    }
	},
	Fail: {
		Default : "Bar",
		UserPref : true,
		Choices : [ THEME.GetString("OptionNames","Immediate"), THEME.GetString("OptionNames","ImmediateContinue"), THEME.GetString("OptionNames","EndOfSong"), THEME.GetString("OptionNames","Off") ],
		Values : [ "Immediate", "ImmediateContinue", "EndOfSong", "Off" ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {
      const mod = GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').FailSetting()
      for (const [i, v2] of ipairs(this.Values)) {
        if (tostring(v2) === ToEnumShortString(tostring(mod))) {
          list.set(i, true)
        }
      }

      list.set(1, true)
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable, pn: PlayerNumber) {
      for (const [i, v2] of ipairs(this.Values)) {
        if (list.get(i)) {
          GAMESTATE.GetPlayerState(pn).GetPlayerOptions('ModsLevel_Preferred').FailSetting( (('FailType_' + (v2 as string)) as unknown as FailType) )
        }
      }
    }
	},
	Rate: {
		Default : 1,
		Choices : fornumrange(0.3,2.1,0.1),
		Values : fornumrange(0.3,2.1,0.1),
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      const msrate = string.format('%.1f', GAMESTATE.GetSongOptionsObject('ModsLevel_Preferred' as unknown as ModsLevel).MusicRate())

			setenv( "originalRate", msrate )
      for (const [k, v2] of pairs(this.Values)) {
        if (tostring(v2) === msrate) {
          list.set(k, true)
        }
      }
      list.set(8, true)
    },
		NotifyOfSelection : function(this: BaseOptionProps, pn: PlayerNumber, choice) {
      GAMESTATE.GetSongOptionsObject('ModsLevel_Preferred' as unknown as ModsLevel).MusicRate(string.format('%.1f', (this.Values as LuaTable).get(choice)))
    }
	},
	judgmentscatter: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      list.set((LoadModule("Profile.LoadFromLocalID.lua")("judgmentscatter", this.Values) || 2), true)
    },
		SaveFunction : function(this, list: LuaTable) {
      const Location = 'Save/LocalProfiles/' + GAMESTATE.GetEditLocalProfileID() + '/OutFoxPrefs.ini'

      for (const [i, _] of ipairs(this.Values)) {
        if (list.get(i) === true) {
          LoadModule('Config.Save.lua')('judgmentscatter', tostring((this.Values as LuaTable).get(i)), Location)
        }
      }
    }
	},
	npsscatter: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      list.set( (LoadModule("Profile.LoadFromLocalID.lua")("npsscatter", this.Values) || 2), true )
    },
    SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"

      for (const [i, _] of ipairs(this.Values)) {
        if (list.get(i) === true) {
          LoadModule("Config.Save.lua")("npsscatter",tostring((this.Values as LuaTable).get(i)),Location)
        }
      }
    }
	},
	lifescatter: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      list.set( (LoadModule("Profile.LoadFromLocalID.lua")("lifescatter",this.Values) || 2), true )
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
			for (const [i, _] of ipairs(this.Values)) {
        if (list.get(i) === true) {
					LoadModule("Config.Save.lua")("lifescatter",tostring((this.Values as LuaTable).get(i)),Location)

        }
      }
    }
	},
	progressquad: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      list.set( (LoadModule("Profile.LoadFromLocalID.lua")("progressquad", this.Values) || 2), true )
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
      for (const [i, _] of ipairs(this.Values)) {
        if (list.get(i) === true) {
          LoadModule("Config.Save.lua")("progressquad",tostring((this.Values as LuaTable).get(i)),Location)
        }
      }
    }
	},
	labelnps: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      list.set( (LoadModule("Profile.LoadFromLocalID.lua")("labelnps",this.Values) || 2), true )
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
      for (const [i, _] of ipairs(this.Values)) {
        if (list.get(i) === true) {
          LoadModule("Config.Save.lua")("labelnps",tostring((this.Values).get(i)),Location)
        }
      }
    },
	},
	scattery: {
		Default : 200,
		Choices : fornumrange(100,600,50),
		Values : fornumrange(100,600,50),
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
      list.set( (LoadModule("Profile.LoadFromLocalID.lua")("scattery",this.Values) || 3), true )
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
      for (const [i, _] of ipairs(this.Values)) {
        if (list.get(i) === true) {
          LoadModule("Config.Save.lua")("scattery",tostring((this.Values).get(i)),Location)
        }
      }
      list.set(36, true)
    },
	},
	judgmenty: {
		Default : -80,
		Choices : fornumrange(-300,100,20),
		Values : fornumrange(-300,100,20),
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
			const CurPref = LoadModule("Config.Load.lua")("judgmenty",Location)
      for (const [i, v2] of ipairs(this.Values)) {
        if (tostring(v2) === tostring(CurPref)) {
          list.set(i, true)
          return
        }
      }
      list.set(12, true)
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
      for (const [i,_] of ipairs(this.Values)) {
        if (list.get(i) === true) {
					LoadModule("Config.Save.lua")("judgmenty",tostring((this.Values as LuaTable).get(i)),Location)
        }
      }
    }
	},
	showmiscjud: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false, true ],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
			const CurPref = LoadModule("Config.Load.lua")("showmiscjud",Location)
			for (const [i,v2] of ipairs(this.Values)) {
				if (tostring(v2) === tostring(CurPref)) {
          list.set(i, true)
          return
        } 
      }
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
			const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
			for (const [i, _] of ipairs(this.Values)) {
        if (list.get(i) === true) {
          LoadModule("Config.Save.lua")("showmiscjud",tostring((this.Values as LuaTable).get(i)),Location)
        }
      }
    },
	},
	SongSampleMode: {
		Default : "SampleMusicPreviewMode_Normal",
		Choices : ["Normal","Screen Music","Last Song","Continuous"],
		Values : [ "SampleMusicPreviewMode_Normal","SampleMusicPreviewMode_ScreenMusic",
		"SampleMusicPreviewMode_LastSong","SampleMusicPreviewMode_Continuous" ]
	},
	SongToggleLoop: {
		Default : true,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false,true ]
	},
	CasualGameplay: {
		Default : false,
		Choices : [ OptionNameString('Off'), OptionNameString('On') ],
		Values : [ false,true ]
	},
	// System Related Options
	VideoRenderer: {
		Choices : ["GLAD", "OpenGL"],
		Values : ["glad", "opengl"],
		LoadFunction : function(this: BaseOptionProps, list: LuaTable) {
			const savedRender: string = PREFSMAN.GetPreference("VideoRenderers")
      for (const [i, v2] of ipairs(this.Values)) {
        if (string.gmatch(savedRender, v2)) {
          list.set(i, true)
          return
        }
      }
      list.set(1, true)
    },
		SaveFunction : function(this: BaseOptionProps, list: LuaTable) {
      for (const [i, v2] of ipairs(this.Values)) {
        if (list.get(i)) {
          PREFSMAN.SetPreference("VideoRenderers",v2)
					return
        }
      }
    }
	}
}
