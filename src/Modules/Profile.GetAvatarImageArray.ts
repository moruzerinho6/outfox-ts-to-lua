return function() {
  const result = new LuaTable()
  const dir = '/Appearance/Avatars/'

  for (const [item, name] of pairs(FILEMAN.GetDirListing(dir, false, false))) {
    if (ActorUtil.GetFileType(name) === 'FileType_Bitmap') {
      result.set(result.length() + 1, [name, dir + name])
    }
  }

  return result
}