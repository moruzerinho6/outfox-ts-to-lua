declare interface UIHelperOptionList {
  song_option(name: string, type: string, margin?: number, min?: number, max?: number, format?: string): any
  list(name: string, value: string, Items: string[], machineSetting?: boolean): any
  number(name: string, value?: number, margin?: number, min?: number, max?: number, format?: string): any
  boolean(name: string, value: boolean): any
  formatToPercent(val: number): string
  decimalNumber(val: number): string
  findInTable(table: any, value: any, def?: number): number
  GetItemFromContainerIndex(self: any): any
  ObtainSpeedType(pOptions: PlayerOptions): number
  GetSpeed(pOptions: PlayerOptions, CurType?: number): number
}

// @ts-ignore
return setmetatable({
  song_option: function (name, type, margin, min, max, format) {
    return {
      Name: name,
      Type: type,
      Value: 'song_option',
      Margin: margin,
      Min: min,
      Max: max,
      Format: format
    }
  },
  list: function (name, value, Items, machineSetting) {
    return {
      Name: name,
      Type: 'list',
      Value: value,
      Values: Items,
      MachinePref: machineSetting
    }
  },
  number: function (name, value, margin, min, max, format) {
    return {
      Name: name,
      Type: 'number',
      Value: value || 0,
      Margin: margin || 1,
      Min: min || 0,
      Max: max || 1,
      Format: format || '%d'
    }
  },
  boolean: function (name, value) {
    return {
      Name: name,
      Type: 'boolean',
      Value: value
    }
  },
  formatToPercent: function (val: number) {
    return string.format('%d%%', math.floor((val*100)+0.5))
  },
  decimalNumber: function (val) {
    return string.format('%.2f', val)
  },
  findInTable: function (table, value, def) {
    for (const [i, v] of ipairs(table)) {
      if (tostring(v) === tostring(value)) {
        return i
      }
    }

    return def || 1
  },
  GetItemFromContainerIndex: function (self) {
    return self.container.Values[self.container.ValueE]
  },
  ObtainSpeedType: function (pOptions: PlayerOptions) {
    let sptype = 1

    if (pOptions.XMod()) {
      sptype = 1
    }

    if (pOptions.CMod()) {
      sptype = 2
    }

    if (pOptions.MMod()) {
      sptype = 3
    }

    if (pOptions.AMod()) {
      sptype = 4
    }

    if (pOptions.CAMod()) {
      sptype = 5
    }

    return sptype
  },
  GetSpeed: function (pOptions: PlayerOptions, CurType?: number) {
    if (!CurType) {
      return 0
    }

    if (CurType === 1) {
      return pOptions.XMod() * 100
    }

    if (CurType === 2) {
      return pOptions.CMod()
    }

    if (CurType === 3) {
      return pOptions.MMod()
    }

    if (CurType === 4) {
      return pOptions.AMod()
    }

    if (CurType === 5) {
      return pOptions.CAMod()
    }

    return 0
  }
}, {})