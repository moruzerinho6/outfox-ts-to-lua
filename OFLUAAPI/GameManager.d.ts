// import type { Game } from "./Game";
// import type { Style } from "./Style";
// import type { StepsType } from "./enums";

declare interface GameManager {
  GetFirstStepsTypeForGame: (Game: Game) => StepsType
  IsGameEnabled: (s: string) => boolean
  StepsTypeToLocalizedString: (st: StepsType) => string
  GetEnabledGames: () => string[]
  GetStylesForGame: (game: string) => Style[]
  SetGame: (Game: string, Theme: string) => void
}

declare var GAMEMAN: GameManager
declare var GameManager: typeof GAMEMAN