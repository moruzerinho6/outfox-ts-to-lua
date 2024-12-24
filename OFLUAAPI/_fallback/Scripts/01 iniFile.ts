declare const foreach_by_sorted_keys: (tbl: AnyTable, keys: any, func: Function) => void
declare const foreach_ordered: (tbl: AnyTable, func: Function) => void
declare const IniFile: {
  StrToKeyVal: (str: string) => LuaMultiReturn<[string, number | boolean | null | unknown]>
  ReadFile: (file_path: string) => AnyTable
  WriteFile: (file_path: string, tbl: AnyTable) => boolean
}