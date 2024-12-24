interface RageFileManager {
  DoesFileExist: (this: RageFileManager, sPath: string) => boolean
  GetDirListing: (this: RageFileManager, sPath: string, bOnlyDirs: boolean, bReturnPathToo: boolean) => LuaTable<number, string>
  GetFileSizeBytes: (this: RageFileManager, sPath: string) => number
  GetHashForFile: (this: RageFileManager, sPath: string) => number
}

declare const FILEMAN: RageFileManager
declare const RageFileManager: RageFileManager