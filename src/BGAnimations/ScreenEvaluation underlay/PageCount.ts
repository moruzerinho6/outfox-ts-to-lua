{
  // @ts-ignore
  const [info]: [any] = [...$vararg]
  const t: ActorFrame = Def.ActorFrame({})
  const margin = 120

  // for (const i of $range(1, 5)) {}
  for (const i of $range(1, info.numPages)) {
    t.set(t.length() + 1, Def.Quad({
      InitCommand: function (self: Quad) {
        self.x(scale(i, 1, info.numPages, -margin*.5, margin*.5))
        self.zoomto(16, 4).diffuse(color('#ffffff55'))
      },
      UpdateViewPortCommand: function (self: Quad, params) {
        self.diffuse(params.Current === i ? Color.White : color('#ffffff55'))
      }
    }))
  }

  // @ts-ignore
  return t
}