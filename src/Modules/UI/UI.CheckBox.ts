{
  interface Attr extends ActorFrame {
    Width: number,
    Height: number,
    Pos?: number[],
    IsValueIncremental?: boolean,
    Choices: AnyTable & LuaTable,
    Values: AnyTable & LuaTable,
    Steps: number,
    AllowClick: boolean,
    Border: number,
    Load: (self: ActorFrame) => number,
    NotifyOfSelection: (self: ActorFrame, Value: any) => any,
    Save: (self: ActorFrame, Value: any) => any,
  }
  let enabled = false
  // @ts-ignore
  return function (Attr: Attr) {
    const width = Attr.Width || 32
    const height = Attr.Height || 32
    const allowClick = Attr.AllowClick || false

    if (Attr.Load) {
      enabled = Attr.Load()
    }

    const ActorFrameArg = new LuaTable()
    ActorFrameArg.set('OnCommand', function(self: ActorFrame) {
      const bordersize = Attr.Border || 2

      self.GetChild("Enabled").zoom( LoadModule("Lua.Resize.lua")(
				self.GetChild("Enabled").GetZoomedWidth(), self.GetChild("Enabled").GetZoomedHeight(), width-bordersize, height-bordersize)
			)
			.visible( enabled )
    })
    ActorFrameArg.set(ActorFrameArg.length() + 1, LoadModule("UI/UI.ButtonBox.lua")( width, height, Attr.Border || 2 ))
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Sprite({
      Name: 'Enabled',
      Texture: THEME.GetPathG('', 'UI/Tick')
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, LoadModule('UI/UI.ClickArea.lua')({
      Width: width - 4,
      Height: height - 4,
      Action: function(self: Actor) {
        if (!allowClick) {
          return;
        }

        enabled = !enabled
        self.GetChild('Enabled').visible(enabled)
      },
      ReturnAdjacentActorFrame: true
    }))
    const t: ActorFrame = Def.ActorFrame(ActorFrameArg)
    return t
  }
}