{
  const UIHelper = require('UI/UIHelper.OptionList.lua');
  // @ts-ignore
  return [
    {
      Name : "HereBeDragons",
      Type : "label"
    },
    {
      Name : "VideoRenderer",
      Type : "list",
      FormatVisible : function() {
        return ToUpper(PREFSMAN.GetPreference("VideoRenderers"))
      },
      Values  : ["opengl", "glad"],
      Value   : "ScreenBackgroundChooser",
      Load : function(self) {
        const rend = PREFSMAN.GetPreference("VideoRenderers")
        return UIHelper.findInTable(self.container.Values, rend)
      },
      NotifyOfChange: function(Container, newValue) {
        PREFSMAN.SetPreference("VideoRenderers", Container.Values[Container.ValueE])
      }
    },
    {
      Name        : "ShowJacketsInWheel",
      Type        : "boolean",
      MachinePref : true,
      Value       : "outfox_pref"
    },
    {
      Name  : "GimmickMode",
      Type  : "boolean",
      Value : "system_option"
    },
    {
      Name          : "NoteFieldLength",
      Default       : SCREEN_HEIGHT,
      Type          : "list",
      MachinePref   : true,
      FormatVisible : function(self, value) {
        return THEME.GetString("OptionNames", self.container.Choices[value])
      },
      Choices : ["Normal", "Long"],
      Value   : "outfox_pref_table",
      Values  : [SCREEN_HEIGHT, 9000]
    },
    {
      Name          : "SongSampleMode",
      Default       : "SampleMusicPreviewMode_Normal",
      Type          : "list",
      MachinePref   : true,
      Value         : "outfox_pref_table",
      FormatVisible : function(self, value) {
        return self.container.Choices[value]
      },
      Choices : ["Normal", "Screen Music", "Last Song", "Continuous"],
      Values  : ["SampleMusicPreviewMode_Normal", "SampleMusicPreviewMode_ScreenMusic", "SampleMusicPreviewMode_LastSong", "SampleMusicPreviewMode_Continuous"]
    },
    {
      Name        : "SongToggleLoop",
      Type        : "boolean",
      MachinePref : true,
      Value       : "outfox_pref"
    },
    {
      Name  : "UseOldJoystickMapping",
      Type  : "boolean",
      Value : "system_option"
    },
    {
      Name  : "ShowMouseCursor",
      Type  : "boolean",
      Value : "system_option"
    },
    {
      Name  : "UsePointsandBlending",
      Type  : "boolean",
      Value : "system_option"
    },
    {
      Name          : "AutoKeySoundBMS",
      Type          : "number",
      Min           : 0,
      Max           : 2,
      Margin        : 1,
      FormatVisible : function(value) {
        const values = ["OutFox", "BMS", "Full"]
        return values[value + 1 - 1]
      },
      Value : "system_option"
    },
    {
      Name    : "MissLayerSeconds",
      Type    : "number",
      Min     : 0.0,
      Max     : 1.0,
      Margin  : 0.1,
      FormatVisible : function(value) {
        return ("%.1f")['f' + 'ormat'](value)
      },
      Value : "system_option"
    },
    {
      Name        : "UseOTOHitsounds",
      Type        : "boolean",
      MachinePref : true,
      Value       : "system_option"
    },
    {
      Name        : "DrawHoldsAndTapsInSameLoop",
      Type        : "boolean",
      MachinePref : true,
      Value       : "system_option"
    }
  ]
}