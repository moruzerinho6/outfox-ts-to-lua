return function (k, table) {
  const Location = "Save/LocalProfiles/" + GAMESTATE.GetEditLocalProfileID() + "/OutFoxPrefs.ini"
  const CurPref = LoadModule('Config.Load.lua')(k, Location)

  for (const [i, v2] of ipairs(table)) {
    if (tostring(v2) == tostring(CurPref)) {
      return i
    }
  }
}