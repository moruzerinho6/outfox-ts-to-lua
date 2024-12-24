{
  const UIHelper = LoadModule("UI/UIHelper.OptionsList.lua");
  // @ts-ignore
  return [
    {
      Name  : "DevelopmentSection",
      Type  : "label",
    },
    {
      Name      : "Go to legacy options",
      Translate : true,
      Type      : "screen",
      Value     : "ScreenOptionsGraphicsSound"
    }
  ]
}