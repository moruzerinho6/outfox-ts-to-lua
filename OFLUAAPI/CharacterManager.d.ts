interface CharacterManagerProperties {
  GetAllCharacters:   (this: CharacterManagerProperties, bIncludeDefault: boolean) => Character[]
  GetCharacter:       (this: CharacterManagerProperties, sID: string) => Character
  GetRandomCharacter: (this: CharacterManagerProperties) => Character
  GetCharacterCount:  (this: CharacterManagerProperties, bIncludeDefault: boolean) => number
}

declare const CHARMAN: CharacterManagerProperties
declare const CharacterManagerProperties: CharacterManagerProperties
