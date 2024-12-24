declare interface FrameConversionModule extends LuaTable {
  Location: string | null;
  Size: number;
  Generate: (
    this: FrameConversionModule,
    Mode: string,
    Offset?: number
  ) => ActorFrame;
}

{
  const t: FrameConversionModule = new LuaTable();

  t.set("Location", null);
  t.set("Size", null);
  t.set(
    "__call",
    function (this: FrameConversionModule, file: string, length: number) {
      this.Location = file;
      this.Size = length;
      return this;
    }
  );
  t.set(
    "Generate",
    function (this: FrameConversionModule, Mode: string, Offset?: number) {
      const fr: ActorFrame = Def.ActorFrame({});
      const pos = [
        -this.Size / 2 + (Offset || 0),
        0,
        this.Size / 2 - (Offset || 0),
      ];

      for (let i = 0; i < 2; i++) {
        fr.set(
          fr.length() + 1,
          Def.Sprite({
            Texture: this.Location,
            InitCommand: function (self: Sprite) {
              self.setstate(i).pause();
              let h1 = 0.5
              
              if (Mode === 'Horizontal') {
                if (i > 0) {
                  h1 = i - (0.5 * i)
                } else {
                  h1 = 0
                }
              }
              self.align(
                h1,
                0.5
              );

              if (Mode === "Horizontal") {
                self.x(pos[i]);
                if (i === 1) {
                  self.zoomtowidth(this.Size - (Offset || 0));
                }
              } else {
                self.y(pos[i]);
                if (i === 1) {
                  self.zoomtoheight(this.Size - (Offset || 0));
                }
              }
            },
          })
        );
      }

      return fr
    }
  );

  return setmetatable(t, t);
}
