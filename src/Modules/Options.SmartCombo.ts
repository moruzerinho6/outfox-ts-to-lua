
// @ts-ignore
return function (Mode: string) {
  const Dir: LuaTable<AnyNotNil, string> = FILEMAN.GetDirListing('Appearance/Combos/', false, true)
  const NewDir = new LuaTable()
  for (const [_, v] of pairs(Dir)) {
    if (Mode === 'Show') {
      NewDir.set(NewDir.length() + 1, string.match(v, '.+/(.+)'))
    } else {
      NewDir.set(NewDir.length() + 1, v)
    }
  }

  return NewDir
}