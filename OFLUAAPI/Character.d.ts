declare interface Character {
  GetCardPath: () => string
  GetCharacterDir: () => string
  GetCharacterID: () => string
  GetDanceAnimationPath: () => string
  GetDisplayName: () => string
  GetIconPath: () => string
  GetModelPath: () => string
  GetRestAnimationPath: () => string
  GetSongSelectIconPath: () => string
  GetStageIconPath: () => string
  GetWarmUpAnimationPath: () => string
}

declare var Character: Character