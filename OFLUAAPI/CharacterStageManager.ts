// This class doesn't seem to be documented yet, so everything here is a guess. ~ zerinho6

declare interface CharacterStageManager {
  GetAllStages(this: CharacterStageManager, bIncludeDefault: boolean): CharacterStage[]
}

declare const CharacterStageManager: CharacterStageManager
declare const CHARSTAGEMAN: CharacterStageManager