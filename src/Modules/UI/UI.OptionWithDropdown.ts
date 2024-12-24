declare type UIOptionWithDropdown = (title: string, list: AnyTable, width: number, height: number, xpos?: number, ypos?: number, player?: PlayerNumber) => ActorFrame

// @ts-ignore
return function (title: string, list: AnyTable, width: number, height: number, xpos?: number, ypos?: number, player?: PlayerNumber) {
  xpos = xpos || 0
  ypos = ypos || 0

  const t: ActorFrame = Def.ActorFrame({
    InitCommand: function (self: ActorFrame) {
      self.height = height
    }
  })

  t.set(t.length() + 1, Def.BitmapText({
    Font: 'Common Normal',
    Text: title,
    OnCommand: function(self: BitmapText) {
      self.halign(0).xy(xpos - width *.25, ypos)
    }
  }))

  t.set(t.length() + 1, LoadModule('UI/UI.DropDown.lua')({
    Width: width * .25,
    Height: height,
    XPos: xpos + width *.25,
    YPos: ypos,
    List: list,
    perItemAction: function () {
      return 1
    },
    Player: player || GAMESTATE.GetMasterPlayerNumber()
  }))

  return t
}