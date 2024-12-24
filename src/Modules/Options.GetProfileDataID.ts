return function (PData) {
  const Dir: Record<number, string> = FILEMAN.GetDirListing('/Appearance/Avatars/')
  const profile = PROFILEMAN.GetLocalProfileFromIndex(PData)
  const config_loc = '/Save/LocalProfiles/' + PROFILEMAN.GetLocalProfileIDFromIndex(PData) + 'OutFoxPrefs.ini'
  const Info = {
    Name: '',
    Image: ''
  }

  Info.Image = THEME.GetPathG('UserProfile', 'generic icon')

  if (profile && profile.GetDisplayName() !== '') {
    Info.Name = profile.GetDisplayName()

    if (!LoadModule('Config.Load.lua')('AvatarImage', config_loc)) {
      for (const [_, v] of ipairs(Dir)) {
        if (string['m' + 'atch'](v, '(%w+)') === profile.GetDisplayName()) {
          Info.Image = '/Appearance/Avatars/' + v
          LoadModule('Config.Save.lua')('AvatarImage', Info.Image, config_loc)
        }
      }
    } else {
      if (FILEMAN.DoesFileExist( LoadModule('Config.Load.lua')('AvatarImage', config_loc) )) {
        Info.Image = LoadModule('Config.Load.lua')('AvatarImage', config_loc)
      }
    }
  }

  return Info
}