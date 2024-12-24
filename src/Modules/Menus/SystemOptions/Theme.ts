// @ts-ignore
return [
  {
		Name          : "Switch Background",
		Type          : "screen",
		FormatVisible : function() {
			return LoadModule("Config.Load.lua")("SoundwavesMenuBG","/Save/OutFoxPrefs.ini")
    },
		Value: "ScreenBackgroundChooser"
	},
	{
		Name        : "UseTwoStepDiff",
		Type        : "boolean",
		MachinePref : true,
		Value       : "outfox_pref"
	},
	{
		Name            : "CurrentColorScheme",
		Type            : "list",
		MachinePref     : true,
		Value           : "outfox_pref_table",
		Values          : (LoadModule("Theme.Colors.lua") as unknown as ThemeColorsModule).GetListOfColors(),
		NotifyOfChange  : function(Container,newValue,_) {
      const themeColors: ThemeColors = LoadModule("Theme.Colors.lua")()
			GameColor.Custom = themeColors.RestoreColors(Container.Values[newValue])
			MESSAGEMAN.Broadcast("ColorSchemeChanged")
    }
	},
	{
		Name        : "SkipHomeEvaluationChoices",
		Type        : "boolean",
		MachinePref : true,
		Value       : "outfox_pref"
	},
	{
		Name        : "CustomLateJoinInGame",
		Type        : "boolean",
		MachinePref : true,
		Value       : "outfox_pref"
	},
	{
		Name        : "ShowMascotCharacter",
		Type        : "boolean",
		MachinePref : true,
		Value       : "outfox_pref"
	}
]