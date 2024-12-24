import type { CharacterStage } from "./CharacterStage"

interface CharacterStageManagerProperties {
  GetStage: (sStageName: string) => CharacterStage
  GetRandomStage: () => CharacterStage
  GetAllStages: (bIncludeDefault: boolean) => CharacterStage[]
  GetStageCount: (bIncludeDefault: boolean) => number
}

export type CHARSTAGEMAN = CharacterStageManagerProperties