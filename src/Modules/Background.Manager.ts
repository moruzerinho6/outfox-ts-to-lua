declare interface BackgroundManagerModule extends LuaTable {
  BackgroundPath: string;
  List: LuaTable;
  Values: LuaTable<number, LuaTable<AnyNotNil, string>>;
  FetchBackgroundsAndTypes: (this: BackgroundManagerModule) => any;
  GetEntries: (this: BackgroundManagerModule) => any;
  GetBGFromName: (this: BackgroundManagerModule, name: string) => any;
  LoadBackgroundFromPref: (this: BackgroundManagerModule, name: string) => any;
}

{
  const t: BackgroundManagerModule = {
    BackgroundPath:
      THEME.GetCurrentThemeDirectory() + "Customs/MenuBackgrounds/",
    List: new LuaTable(),
    Values: new LuaTable(),
    FetchBackgroundsAndTypes: function (this: BackgroundManagerModule) {
      this.List = FILEMAN.GetDirListing(this.BackgroundPath, false, true);
      this.Values = new LuaTable();

      for (const [_, v] of pairs(this.List)) {
        const [__, file, ___] = string.match(v, "^(.-)([^//]-)%.([^//%.]-)%.?");

        if (file && ActorUtil.GetFileType(v) !== "FileType_Movie") {
          const vTable = new LuaTable()
          vTable.set(vTable.length() + 1, v)
          vTable.set(vTable.length() + 1, file)
          vTable.set('type', ActorUtil.GetFileType(v))
          this.Values[this.Values.length() + 1] = vTable;
        }
      }
    },
    GetEntries: function (this: BackgroundManagerModule) {
      if (this.Values.length() === 0) {
        this.FetchBackgroundsAndTypes();
      }

      return this.Values
    },
    GetBGFromName: function (this: BackgroundManagerModule, name: string) {
      if ((this.Values as LuaTable).length() === 0) {
        this.FetchBackgroundsAndTypes();
      }

      for (const [_, v] of pairs(this.Values)) {
        if (name === v[2]) {
          return this.Values[_];
        }
      }

      return this.Values[1];
    },
    LoadBackgroundFromPref: function (this: BackgroundManagerModule, name: string) {
      const BG = this.GetBGFromName(name);

      const decision = {
        FileType_Bitmap: Def.Sprite({
          Texture: BG[1],
          InitCommand: function (self: Sprite) {
            self.scale_or_crop_background().diffusealpha(0.5);
          },
        }),
        FileType_Movie: Def.Actor({}),
        FileType_Lua: LoadActor(BG[1]),
      };

      return decision[BG.type] || Def.Actor({});
    },
  };

  // @ts-ignore
  return setmetatable(t, t);
}
