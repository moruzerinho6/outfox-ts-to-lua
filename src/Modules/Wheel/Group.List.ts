declare type GroupList = (Songs: Song[]) => Course[]

// @ts-ignore
return function(Songs) {
  const Groups = new LuaTable()

  for (const [_, v] of ipairs(Songs)) {
    let Add = true

    for (const [_, v2] of ipairs(Groups as unknown as Record<number, string>)) {
      if (v2 === (v[1] as Course).GetGroupName()) {
        Add = false
      }
    }

    if (Add) {
      Groups.set(Groups.length() + 1, (v[1] as Course).GetGroupName())
    }
  }

  return Groups
}