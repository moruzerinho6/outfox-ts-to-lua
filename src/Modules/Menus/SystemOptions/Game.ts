{
  const UIHelper = LoadModule("UI/UIHelper.OptionList.lua")
  const Language = {
    Name    : "Language",
	  Type    : "list",
	  Choices : THEME.GetLanguages(),
	  Values  : THEME.GetLanguageCodes(),
	  Value   : "system_option_table",
	  Load    : function (self) {
	  	const lang = THEME.GetCurLanguage()
	  	return UIHelper.findInTable( self.container.Values, lang )
    },
	  NotifyOfChange: function(Container,newValue) {
	  	PREFSMAN.SetPreference( "Language", Container.Values[Container.ValueE] )
	  	if (THEME.UpdateThemeLanguage) {
	  		THEME.UpdateThemeLanguage()
      }
	  	MESSAGEMAN.Broadcast("FORCEOptionListStrings")
    },
	  Save: function(self) {
	  	PREFSMAN.SavePreferences()
	  	return "Update_Strings"
    },
	  FormatVisible: function(self, value) {
	  	if (THEME.HasString("NativeLanguageNames",self.container.Choices[value])) {
	  		return THEME.GetString("NativeLanguageNames",
	  			self.container.Choices[value]
	  		)
      }
	  	return self.container.Values[value]
    }
  }
  const NoteSkinNames = {
    Name    : "DefaultNoteSkin",
	  Type    : "list",
	  Value   : "system_option",
	  Values  : NOTESKIN.GetNoteSkinNames(),
	  Load    : function(self) {
	  	return UIHelper.findInTable( self.container.Values, "delta2019" )
    }
  }

  const OffText = THEME.GetString('OptionNames', 'Off')
  const announceritems = ANNOUNCER.GetAnnouncerNames()
  table.insert(announceritems, 1, '')
  const Announcers = {
    Name          : "Announcer",
	  Type          : "list",
	  Value         : "system_option",
	  Values        : announceritems,
	  FormatVisible : function(self,value) {
	  	if (value === 1) {
	  		return OffText
      }
	  	return self.container.Values[value]
    },
	  NotifyOfChange: function(Container,newValue,player) {
	  	ANNOUNCER.SetCurrentAnnouncer( Container.Values[newValue] )
    },
	  Load: function(self) {
	  	return UIHelper.findInTable( self.container.Values, ANNOUNCER.GetCurrentAnnouncer() )
    }
  }
  const Theme = {
    Name        : "Theme",
	  ConfigName  : "Theme",
	  Type        : "list",
	  Value       : "system_option_table",
	  Values      : THEME.GetSelectableThemeNames(),
	  Load        : function(self) {
	  	return UIHelper.findInTable( self.container.Values, THEME.GetCurThemeName() )
    },
	  Save: function() {
	  	return "Theme_Change"
    }
  }
  const t = new LuaTable()

  t.set('Name', 'Menu')
  t.set(t.length() + 1, {
    Name      : "Go to legacy options",
		Translate : true,
		Type      : "screen",
		Value     : "ScreenOptionsService"
  })
  t.set(t.length() + 1, {
    Name      : "Select Game",
		Translate : true,
		Type      : "screen",
		Value     : "ScreenSelectGameMode"
  })
  t.set(t.length() + 1, Language)
  t.set(t.length() + 1, Theme)
  t.set(t.length() + 1, Announcers)
  t.set(t.length() + 1, {
    Name: 'Connectivity',
    Type: 'label'
  })
  t.set(t.length() + 1, {
    Name: 'AutoConnectToServer',
    Type: 'boolean',
    Value: 'system_option'
  })
  t.set(t.length() + 1, {
    Name  : "EnableDiscord",
		Type  : "boolean",
		Value : "system_option"
  })
  t.set(t.length() + 1, {
    Name: 'Basic Items',
    Type: 'label'
  })
  t.set(t.length() + 1, {
    Name  : "ShowNativeLanguage",
    Type  : "boolean",
    Value : "system_option"
  })

  const normalTable = new LuaTable()

  normalTable.set(normalTable.length() + 1, Language)
  normalTable.set(normalTable.length() + 1, NoteSkinNames)
  normalTable.set(normalTable.length() + 1, {
    Name  : "ShowNativeLanguage",
    Type  : "boolean",
    Value : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name  : "ShowLyrics",
    Type  : "boolean",
    Value : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name  : "AutogenSteps",
    Type  : "boolean",
    Value : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name  : "AutogenGroupCourses",
    Type  : "boolean",
    Value : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name        : "AutoSetStyle",
		Translate   : true,
		Type        : "boolean",
		MachinePref : true,
		Value       : "outfox_pref"
  })
  normalTable.set(normalTable.length() + 1, {
    Name  : "OnlyPreferredDifficulties",
    Type  : "boolean",
    Value : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name  : "FastLoad",
    Type  : "boolean",
    Value : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name  : "FastLoadAdditionalSongs",
    Type  : "boolean",
    Value : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name  : "Background Areas",
    Type  : "label"
  })
  normalTable.set(normalTable.length() + 1, {
    Name          : "RandomBackgroundMode",
		Type          : "list",
		Choices       : ["Off","Animations","Random Movies"],
		Values        : ["RandomBackgroundMode_Off","RandomBackgroundMode_Animations","RandomBackgroundMode_RandomMovies"],
		Value         : "system_option_table",
		FormatVisible : function(self,value) {
			return THEME.GetString("OptionNames",self.container.Choices[value])
    }
  })
  normalTable.set(normalTable.length() + 1, {
    Name          : "BGBrightness",
    Type          : "number",
    Min           : 0,
    Max           : 1,
    Margin        : 0.1,
    FormatVisible : UIHelper.formatToPercent,
    Value         : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name        : "StretchBackgrounds",
		ConfigName  : "StretchBackgrounds",
		Type        : "boolean",
		Value       : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name    : "ShowDancingCharacters",
		Type    : "list",
		Choices : ["Default to Off","Default to Random","Select"],
		Values  : ["ShowDancingCharacters_Off","ShowDancingCharacters_Random","ShowDancingCharacters_Select"],
		Value   : "system_option_table"
  })
  normalTable.set(normalTable.length() + 1, {
    Name        : "ShowDanger",
    ConfigName  : "ShowDanger",
    Type        : "boolean",
    Value       : "system_option"
  })
  normalTable.set(normalTable.length() + 1, {
    Name        : "ShowBeginnerHelper",
		ConfigName  : "ShowBeginnerHelper",
		Type        : "boolean",
		Value       : "system_option"
  })

  t.set(t.length() + 1, {
    Name: 'Normal',
    Menu: normalTable
  })

  // @ts-ignore
  return t
}