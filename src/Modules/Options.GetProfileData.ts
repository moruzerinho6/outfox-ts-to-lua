declare interface GetProfileDataModule {
  Name: string,
  Image: string
}

declare type OptionsGetProfileData = (PData: string) => GetProfileDataModule 

// @ts-ignore
return function (PData: string) {
  // TODO: Is this how we should document tables?
  const Dir: Record<number, string> = FILEMAN.GetDirListing('/Appearance/Avatars/')
  const profile = PROFILEMAN.GetProfile(PData as unknown as PlayerNumber) || PROFILEMAN.GetMachineProfile()
  const pDirectory = CheckIfUserOrMachineProfile(string.sub(PData, -1))
  const configLocation = pDirectory + 'OutFoxPrefs.ini'
  const Info = {
    Name: '',
    Image: ''
  }

  interface PrefsManagerFake {
    Load: (this: PrefsManagerFake, arg1: any) => void
    Get: (this: PrefsManagerFake, arg1: string) => string
    Set: (this: PrefsManagerFake, arg1: string, arg2: any) => PrefsManagerFake
    SaveToFile: (this: PrefsManagerFake) => void
  }

  // TODO: This is a table with properties and function
  const PrefsManager: PrefsManagerFake = LoadModule('Save.PlayerPrefs.lua')
  PrefsManager.Load(configLocation)

  const AvatarImageLoc = PrefsManager.Get('AvatarImage')

  Info.Image = THEME.GetPathG('UserProfile', 'generic icon')

  if (profile && profile.GetDisplayName() !== '') {
    Info.Name = profile.GetDisplayName()

    if (!AvatarImageLoc) {
      for (const [_, v] of ipairs(Dir)) {
        if (string['m' + 'atch'](v, '(%w+)') === profile.GetDisplayName()) {
          Info.Image = '/Appearance/Avatars/' + v
          PrefsManager.Set('AvatarImage', Info.Image).SaveToFile()
        }
      }
    } else {
      if (string['f' + 'ind'](AvatarImageLoc, '/mem/') !== null) {
        const loc = CheckIfUserOrMachineProfile(string.sub(PData, -1)) + string.sub(AvatarImageLoc, 6)

        if (FILEMAN.DoesFileExist(loc)) {
          Info.Image = loc
        }
      } else {
        Info.Image = AvatarImageLoc
      }
    }
  } else {
    Info.Name = string['f' + 'ind'](PData, 'P1') !== null ? THEME.GetString('GameState', 'Player 1') : THEME.GetString('GameState', 'Player 2')
  }

  return Info
}