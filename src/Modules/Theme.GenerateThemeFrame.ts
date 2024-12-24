// @ts-ignore
return function (itemWidth: number, player) {
  itemWidth = itemWIdth + 70
  const t = new LuaTable()

  t.set('OnCommand', function (self: ActorFrame) {
    self.zoom(0.7).SetHeight(42)
  })
  t.set('ActiveCommand', function(self: ActorFrame) {
    self.GetChild('Hover').stoptweening().linear(0.1).diffusealpha(1)
    self.GetChild('Border').stoptweening().linear(0.1).diffusealpha(1).blend('add' as unknown as BlendMode).diffuseramp().effectcolor1(color('#ffffff75')).effectclock('beatnooffset')
    self.GetChild('Item').stoptweening().linear(0.1).diffusealpha(0.25)
  })
  t.set('InactiveCommand', function(self: ActorFrame) {
    self.GetChild('Item').stoptweening().linear(0.1).diffusealpha(1)
    self.GetChild('Hover').stoptweening().linear(0.1).diffusealpha(0.25)
    self.GetChild('Border').stoptweening().linear(0.1).diffusealpha(0)
  })

  const playercolor = PlayerColor(player)
  const compcolor = PlayerCompColor(player)

  const ItemActorFrameArg = new LuaTable()

  ItemActorFrameArg.set('Name', 'Item')
  ItemActorFrameArg.set(ItemActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionItem'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(playercolor) as Sprite).setstate(0).pause().halign(1).x(-itemWidth/2)
    }
  }))
  ItemActorFrameArg.set(ItemActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionItem'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(playercolor) as Sprite).setstate(1).pause().zoomtowidth(itemWidth)
    }
  }))
  ItemActorFrameArg.set(ItemActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionItem'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(playercolor) as Sprite).setstate(2).pause().halign(0).x(itemWidth/2)
    }
  }))

  const HoverActorFrameArg = new LuaTable()

  HoverActorFrameArg.set('Name', 'Hover')
  HoverActorFrameArg.set(HoverActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionHover'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(compcolor) as Sprite).setstate(0).pause().halign(1).x(-itemWidth/2)
    }
  }))
  HoverActorFrameArg.set(HoverActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionHover'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(compcolor) as Sprite).setstate(1).pause().zoomtowidth(itemWidth)
    }
  }))
  HoverActorFrameArg.set(HoverActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionHover'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(compcolor) as Sprite).setstate(2).pause().halign(0).x(itemWidth/2)
    }
  }))

  const BorderActorFrameArg = new LuaTable()

  BorderActorFrameArg.set('Name', 'Border')
  BorderActorFrameArg.set(BorderActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionBorder'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(compcolor) as Sprite).setstate(0).pause().halign(1).x(-itemWidth/2)
    }
  }))
  BorderActorFrameArg.set(BorderActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionBorder'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(compcolor) as Sprite).setstate(1).pause().zoomtowidth(itemWidth)
    }
  }))
  BorderActorFrameArg.set(BorderActorFrameArg.length() + 1, Def.Sprite({
    Texture: THEME.GetPathG('_3x1', 'frame/OptionBorder'),
    InitCommand: function (self: Sprite) {
      (self.diffuse(compcolor) as Sprite).setstate(2).pause().halign(0).x(itemWidth/2)
    }
  }))

  t.set(t.length() + 1, Def.ActorFrame(ItemActorFrameArg))
  t.set(t.length() + 1, Def.ActorFrame(HoverActorFrameArg))
  t.set(t.length() + 1, Def.ActorFrame(BorderActorFrameArg))

  return t
}