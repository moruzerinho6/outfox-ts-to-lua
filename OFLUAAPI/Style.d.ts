declare interface Style {
  ColumnsPerPlayer: () => number
  GetName: () => string
  GetStepsType: () => StepsType
  GetStyleType: () => StyleType
  GetColumnInfo: (arg1?: number, arg2?: number) => LuaTable
  GetColumnDrawOrder: () => number
  GetWidth: () => number
  LockedDifficulty: () => boolean
  /**
   * 
   * @deprecated
   */
  NeedsZoomOutWith2Players: () => boolean
}

declare var Style: Style