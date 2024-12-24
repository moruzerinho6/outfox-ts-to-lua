{
  const UIHelper = require('"UI/UIHelper.OptionList.lua')
  // @ts-ignore
  return [
    { Name:"Key Joy Mappings",      Translate : true, Type : "screen", Value:"ScreenMapControllers" },
	  { Name:"Calibrate Audio Sync",  Translate : true, Type : "screen", Value:"ScreenGameplaySyncMachine" },
	  { Name:"Test Input",            Translate : true, Type : "screen", Value:"ScreenTestInput" },
	  { Name:"Test Analog Input",     Translate : true, Type : "screen", Value:"ScreenTestLuaAnalog" },
	  { Name:"Input Options",         Type : "label" },
	  { Name:"UseTouchControls",      Type : "boolean", Value : "outfox_pref", MachinePref : true },
	  { Name:"AutoMapOnJoyChange",    Translate : true, Type  : "boolean",     Value : "system_option" },
	  {
	  	Name : "Advanced",
	  	Menu : [
	  		{
	  			Name      : "OnlyDedicatedMenuButtons",
	  			Translate : true,
	  			Type      : "boolean",
	  			Choices   : ["Use Gameplay Buttons","Only Dedicated Buttons"],
	  			Value     : "system_option"
	  		},
	  		{ Name:"AllowHoldForOptions", Translate : true, Type : "boolean", Value : "system_option" },
	  		{ Name:"ThreeKeyNavigation",  Translate : true, Type : "boolean", Value : "system_option" },
	  		{ Name:"Map Controller",      Translate : true, Type : "screen",  Value : "ScreenOptionsMapping" },
      ]
	  }
  ]
}