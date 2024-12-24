{
  const UIHelper = LoadModule("UI/UIHelper.OptionsList.lua");
  const t = new LuaTable();

  t.set('Name', 'Menu')
  t.set(t.length() + 1, {
    Name          : "SoundVolume",
    Type          : "number",
    Min           : 0,
    Max           : 1,
    Margin        : 0.1,
    FormatVisible : UIHelper.formatToPercent,
    Value         : "system_option"
  })
  t.set(t.length() + 1, {
    Name          : "SongPreviewVolume",
    Type          : "number",
    Min           : 0,
    Max           : 1,
    Margin        : 0.1,
    FormatVisible : UIHelper.formatToPercent,
    Value         : "system_option"
  })
  t.set(t.length() + 1, {
    Name          : "EffectVolume",
    Type          : "number",
    Min           : 0,
    Max           : 1,
    Margin        : 0.1,
    FormatVisible : UIHelper.formatToPercent,
    Value         : "system_option"
  })
  t.set(t.length() + 1, {
    Name          : "AttractVolume",
    Type          : "number",
    Min           : 0,
    Max           : 1,
    Margin        : 0.1,
    FormatVisible : UIHelper.formatToPercent,
    Value         : "system_option"
  })
  t.set(t.length() + 1, {
    Name  : "EnableAttackSounds",
    Type  : "boolean",
    Value : "system_option"
  })
  t.set(t.length() + 1, {
    Name  : "EnableMineHitSound",
    Type  : "boolean",
    Value : "system_option"
  })
  t.set(t.length() + 1, {
    Name      : "MuteActions",
    Translate : true,
    Type      : "boolean",
    Value     : "system_option"
  })
  // @ts-ignore
  return t
}