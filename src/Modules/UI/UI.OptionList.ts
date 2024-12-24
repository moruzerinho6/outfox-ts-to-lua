declare interface UIOptionsList {
  Handler: ActorFrame
  ActorFrame: ActorFrame
  _LICENSE: string
  Create: (this: UIOptionsList) => ActorFrame
  GetCursorIndex: (this: UIOptionsList) => number
  InSpecialMenu: (this: UIOptionsList) => boolean
  ResetCursorPosition: (this: UIOptionsList, index: number) => void
  IsCurrentOptionToggable: (this: UIOptionsList) => boolean
  LockInput: (this: UIOptionsList, state: boolean) => void
  ResetCursor: (this: UIOptionsList) => void
  ChangeValue: (this: UIOptionsList, offset: number, player: PlayerNumber) => void
  GetFirstAvailableChoiceInMenu: (this: UIOptionsList, Menu: AnyTable) => number
  UseNewMenu: (this: UIOptionsList, NewMenu: AnyTable) => void
  GetCursorVisPosition: (this: UIOptionsList, cursor: number) => number
  MoveSelection: (this: UIOptionsList, offset: number, player: PlayerNumber, IsTouch?: boolean) => void
  ConfirmSelection: (this: UIOptionsList, player: PlayerNumber) => void
  Back: (this: UIOptionsList, player: PlayerNumber) => void
  BroadcastCurMenuEnterMessage: (this: UIOptionsList, player: PlayerNumber) => void
  BroadcastCurMenuExitMessage: (this: UIOptionsList, player: PlayerNumber) => void
}

{
  let CurrentMenu;
  let allowedToMove = true;
  let InputTiedTo = null;
  let ThreeButtonComp = PREFSMAN.GetPreference("ThreeKeyNavigation");

  let UseDescription = true;

  let ItemWidth = 0;
  let ItemHeight = 0;

  let cursorVis = 1;
  let YOffset = 0;

  let modifiedSystemPref = false;

  let numObjects = 13;
  let containerYPos = 0;
  let RequiresThemeRestart = null;
  let PrefsManager = LoadModule("Save.PlayerPrefs.lua");
  let buttonBoxGen = LoadModule("UI.UI.ButtonBox.lua");
  let needsColorBoolean = false;

  const CheckForSkippableItems = (Menu: LuaTable) => {
    let ind = 0;

    while (ind < Menu.length() + 1) {
      ind = ind + 1;
      const item = Menu.get(ind);

      if (item.SkipIf) {
        table.remove(Menu as unknown as unknown[], ind);
        ind = ind - 1;
      }

      if (item.Menu && !item.SkipIf) {
        CheckForSkippableItems(item.Menu);
      }
    }
  };

  const ValueTypeHandler = {
    nil: function (self: Actor, value) {
      self.GetChild("image").visible(false);
      self.GetChild("Label").visible(false);
      self.GetChild("Value").visible(false);
      self.playcommand("ToggleButtons", { Visible: false });
      self.GetChild("BG").visible(false);
    },
    action: function (self: Actor, value) {
      self.GetChild<BitmapText>("Value").settext("");
      self.GetChild("image").visible(false);
      self.playcommand("ToggleButtons", { Visible: false });
    },
    boolean: function (self: Actor, value) {
      self.GetChild<BitmapText>("Value").settext("");
      self.playcommand("ToggleButtons", { Visible: false });

      const image = self.GetChild<Actor>("image");

      (
        self
          .GetChild("ClickACtion")
          .zoomtowidth(image.GetZoomedWidth()) as Actor
      ).x(image.GetX());
      (image.visible(true) as Actor).setstate((value as boolean) ? 1 : 0);

      return image;
    },
    menu: function (self: ActorFrame, value) {
      const c = self.GetChildren();

      (c.image as Actor).visible(false);

      const BGWidth = ItemWidth;

      self.player = InputTiedTo;

      // Gaslight typescript speed run.
      const extraval: string = (self.container.FormatVisible as boolean)
        ? self.container.FormatVisible(self)
        : "";
      ((c.Value as Actor).visible(true) as BitmapText)
        .settext(extraval + " " + "→")
        .x(BGWidth * 0.5 - 20);
      self.playcommand("ToggleButtons", { Visible: false });
      (
        (c.ClickAction as Actor).x((c.Value as Actor).GetX() - 12) as Actor
      ).zoomtowidth((c.Value as Actor).GetZoomedWidth());
    },
    label: function (self: Actor, value) {
      self.playcommand("ToggleButtons", { Visible: false });
      self.GetChild("image").visible(false);
      (
        (self.GetChild<Actor>("Label").visible(true) as Actor).zoom(
          0.8
        ) as BitmapText
      ).maxwidth(ItemWidth + 20);
      self.GetChild("Value").visible(false);
      self.GetChild("BG").visible(false);
    },
    message: function (self: Actor, value, params) {
      self.GetChild("image").visible(false);
      self.GetChild("Value").visible(false);
      self.playcommand("ToggleButtons", { Visible: false });
      if (!value) {
        return self;
      }

      return self;
    },
    screen: function (self: Actor, value) {
      const BGWidth = ItemWidth;

      self.GetChild("image").visible(false);
      (self.GetChild<BitmapText>("Value").visible(true) as BitmapText)
        .settext("→")
        .x(BGWidth * 0.5 - 20);

      if (self.container.FormatVisible) {
        self
          .GetChild<BitmapText>("Value")
          .settext((self.container.FormatVisible() as string) + " →");
      }

      self.playcommand("ToggleButtons", { Visible: false });
      return self;
    },
    url: function (self: Actor, value) {
      const BGWidth = ItemWidth;
      self.GetChild("image").visible(false);
      (self.GetChild<BitmapText>("Value").visible(true) as BitmapText)
        .settext("→")
        .x(BGWidth * 0.5 - 20);

      self.playcommand("ToggleButtons", { Visible: false });

      return self;
    },
    cancel: function (self: Actor, value) {
      self.GetChild("image").visible(false);
      self.GetChild("Value").visible(false);
      self.playcommand("ToggleButtons", { Visible: false });
      return self;
    },
    list: function (self: ActorFrame, value) {
      self.GetChild("image").visible(false);

      const c = self.GetChildren();
      const BGWidth = ItemWidth;
      const dim = color("#AAAAAA");

      self.GetChild<BitmapText>("Label").maxwidth(BGWidth * 0.35);
      self
        .GetChild("Next")
        .visible(true)
        .diffuse(
          value === (self.container.Values as LuaTable).length()
            ? dim
            : Color.White
        );
      self
        .GetChild("Prev")
        .visible(true)
        .diffuse(value === 1 ? dim : Color.White);
      (
        (c.ClickAction as Actor).x((c.Next as Actor).GetX()) as Actor
      ).zoomtowidth((c.Next as Actor).GetZoomedWidth() + 20);

      (
        self
          .GetChild<BitmapText>("Value")
          .visible(true)
          .x(BGWidth * 0.5 - 50) as BitmapText
      ).maxwidth(BGWidth * 0.35 - 10);

      if (value === null) {
        return self;
      }

      self
        .GetChild<BitmapText>("Value")
        .settext(
          (self.container.FormatVisible as boolean)
            ? self.container.FormatVisible(self, value)
            : tostring(self.container.Values[value])
        );

      return self;
    },
    number: function (self: Actor, value) {
      const BGWidth = ItemWidth;
      self.GetChild("image").visible(false);
      self.playcommand("ToggleButtons", { Visible: true });
      self.GetChild<BitmapText>("Label").maxwidth(BGWidth * 0.35);

      (
        self.GetChild("ClickAction").x(self.GetChild("Next").GetX()) as Actor
      ).zoomtowidth(30);

      if (!value) {
        return;
      }

      self.player = InputTiedTo;

      (
        (self.GetChild("Value").visible(true) as Actor).x(
          BGWidth * 0.5 - 50
        ) as BitmapText
      ).settext(
        (self.container.FormatVisible as unknown as boolean)
          ? self.container.FormatVisible(value)
          : string.format("%d", value)
      );
    },
    default: function (self: Actor, value) {
      self.GetChild("image").visible(false);
      self.playcommand("ToggleButtons", { Visible: false });
      return self.GetChild<BitmapText>("Value").settext(tostring(value));
    },
  };

  const GetCPlayerOptions = function (pn: PlayerNumber) {
    return GAMESTATE.GetPlayerState(pn).GetCurrentPlayerOptions(
      "ModsLevel_Preferred" as unknown as ModsLevel
    );
  };

  const GetPlayerOptions = function (pn: PlayerNumber) {
    return GAMESTATE.GetPlayerState(pn).GetPlayerOptions(
      "ModsLevel_Preferred" as unknown as ModsLevel
    );
  };

  const ConvertValueFromDataType = function (
    dataType,
    value,
    tableToIterate: AnyTable & LuaTable
  ) {
    if (dataType === "list") {
      for (const [k, v] of ipairs(tableToIterate)) {
        if (v === value) {
          return k;
        }
      }
    }

    if (dataType === "number") {
      return tonumber(value);
    }

    if (dataType === "boolean") {
      if (type(value) === "number") {
        return value > 0;
      }
      return value;
    }

    return value;
  };

  let DataGet;
  let DataSet;

  DataGet = {
    player_mod: function (self: Actor, pn: PlayerNumber, ModObject) {
      const PlrOptions: PlayerOptions =
        ModObject ||
        GAMESTATE.GetPlayerState(pn).GetPlayerOptions(
          "ModsLevel_Preferred" as unknown as ModsLevel
        );
      const option: string = self.container.Name;

      if (PlrOptions) {
        if (!PlrOptions[option]) {
          return "-nil-";
        }
        return ConvertValueFromDataType(
          self.valueType,
          PlrOptions[option](PlrOptions),
          self.container.Values
        );
      }
      return "-nil-";
    },
    song_option: function (self: Actor, pn: PlayerNumber) {
      return DataGet.player_mod(
        self,
        pn,
        GAMESTATE.GetSongOptionsObject(
          "ModsLevel_Preferred" as unknown as ModsLevel
        )
      );
    },
    player_mod_table: function (self: Actor, pn: PlayerNumber) {
      const PlrOptions = GetPlayerOptions(pn);

      if (PlrOptions) {
        for (const [k, v] of ipairs(self.container.Values)) {
          const val: string = PlrOptions[v as string](PlrOptions);

          if (val) {
            return k;
          }
        }
        return 1;
      }
      return 1;
    },
    outfox_pref: function (self: Actor, pn: PlayerNumber) {
      let arg = (string.sub(pn, -1) as unknown as number) - 1;
      let preflist = CheckIfUserOrMachineProfile(
        arg as unknown as PlayerNumber
      );

      if (self.container.MachinePref) {
        preflist = "Save";
      }

      const Location = preflist + "/OutFoxPrefs.ini";

      if (self.container.MachinePref) {
        return LoadModule("Config.Load.lua")(self.container.Name, Location);
      }

      return (PrefsManager as unknown as PrefsManager).Get(
        self.container.Name,
        self.container.Default
      );
    },
    outfox_pref_table: function (self: Actor, pn: PlayerNumber) {
      const currentPref: string = DataGet.outfox_pref(self, pn);

      for (const [k, v] of ipairs(self.container.Values)) {
        if ((v as string) === currentPref) {
          return k;
        }
      }

      return 1;
    },
    system_option: function (self: Actor) {
      const pref: string = (self.container.Load as boolean)
        ? self.container.Load(self)
        : PREFSMAN.GetPreference(self.container.Name);

      return ConvertValueFromDataType(
        self.valueType,
        pref,
        self.container.Values
      );
    },
    system_option_table: function (self: Actor) {
      const pref: string = PREFSMAN.GetPreference(self.container.Name);
      return ConvertValueFromDataType(
        self.valueType,
        pref,
        self.container.Values
      );
    },
    default: function (self: Actor, pn: PlayerNumber) {
      const valtype = type(self.container.Value);

      if (valtype === "boolean" || valtype === "number") {
        return self.container.Value;
      }

      return self.container.ValueE;
    },
  };

  DataSet = {
    player_mod: function (
      self: Actor,
      pn: PlayerNumber,
      ModObject,
      isBoolLiteral: boolean
    ) {
      const PlrOptions: PlayerOptions =
        ModObject ||
        GAMESTATE.GetPlayerState(pn).GetPlayerOptions(
          "ModsLevel_Preferred" as unknown as ModsLevel
        );
      const option: string = self.container.Name;
      const value = self.container.ValueE;

      if (PlrOptions) {
        if (!PlrOptions[option]) {
          return false;
        }

        let oprdone = false;

        if (self.valueType === "list") {
          const choice = self.container.Values[value];
          PlrOptions[option](PlrOptions, tostring(choice));
          oprdone = true;
        }

        if (self.valueType === "boolean") {
          if (isBoolLiteral || self.container.LiteralBool) {
            PlrOptions[option](PlrOptions, value);
          } else {
            PlrOptions[option](PlrOptions, value === true ? 1 : 0);
          }

          oprdone = true;
        }

        if (self.valueType === "number") {
          PlrOptions[option](
            PlrOptions,
            tonumber(string.format(self.container.Format || "%.2f", value))
          );
          oprdone = true;
        }

        if (!oprdone) {
          PlrOptions[option](PlrOptions, value);
        }

        MESSAGEMAN.Broadcast("PlayerOptionsChanged", {
          Player: pn,
          Option: self.container.Name,
        });
        return true;
      }
      return false;
    },
    player_mod_table: function (self: Actor, pn: PlayerNumber) {
      const PlrOptions = GAMESTATE.GetPlayerState(pn).GetPlayerOptions(
        "ModsLevel_Preferred" as unknown as ModsLevel
      );
      const value = self.container.ValueE;

      if (PlrOptions) {
        if (self.valueType === "list") {
          const choice = self.container.Values[value];
          PlrOptions[choice](PlrOptions, 1);
          MESSAGEMAN.Broadcast("PlayerOptionsChanged", { Player: pn });
          return true;
        }
      }
      return false;
    },
    song_option: function (self: Actor, pn: PlayerNumber) {
      DataSet.player_mod(
        self,
        pn,
        GAMESTATE.GetSongOptionsObject(
          "ModsLevel_Preferred" as unknown as ModsLevel
        ),
        self.valueType === "boolean"
      );
    },
    outfox_pref: function (
      self: Actor,
      pn: PlayerNumber,
      forceOption?: string
    ) {
      let preflist = (self.container.MachinePref as boolean) ? "Save" : "";

      if (pn && !self.container.MachinePref) {
        const tempArg: number = string["s" + "ub"](pn, -1);
        preflist = CheckIfUserOrMachineProfile(
          (tempArg - 1) as unknown as PlayerNumber
        );
      }

      const Location = preflist + "/OutFoxPrefs.ini";

      if (self.container.MachinePref) {
        return LoadModule("Config.Load.lua")(
          self.container.Name,
          tostring(forceOption || self.container.ValueE),
          Location
        );
      }
      (PrefsManager as unknown as PrefsManager).Set(
        self.container.Name,
        forceOption || self.container.ValueE
      );
    },
    outfox_pref_table: function (self: Actor, pn: PlayerNumber) {
      const nameOption: string = self.container.Values[self.container.ValueE];

      DataSet.outfox_pref(self, pn, nameOption);
    },
    system_option: function (self: Actor) {
      modifiedSystemPref = true;
      PREFSMAN.SetPreference(self.container.Name, self.container.ValueE);
    },
  };

  const CheckNotify = function (index: number, player) {
    if (CurrentMenu[index].NotifyOfChange) {
      CurrentMenu[index].NotifyOfChange(
        CurrentMenu[index],
        CurrentMenu[index].ValueE,
        player
      );
    }

    MESSAGEMAN.Broadcast("CheckForMessages", {
      Value: CurrentMenu[index].Name,
      Item: CurrentMenu[index].Values || null,
      Player: player,
    });
  };

  const PerformSetCall = function (func, InputTied) {
    if (func.container.UsePrefs) {
      return func.set(func, InputTied, PrefsManager);
    }

    return func.set(func, InputTied);
  };

  const ChangeValue = function (
    self: Actor,
    index: number,
    visualizedCursor: string,
    offset: number,
    player
  ) {
    if (!allowedToMove || index === 0) {
      return;
    }

    if (
      CurrentMenu[index].Type !== "number" &&
      CurrentMenu[index].Type !== "list"
    ) {
      return;
    }

    if (InputTiedTo && InputTiedTo !== player) {
      return;
    }

    if (CurrentMenu[index].Margin) {
      const margin: number = CurrentMenu[index].Margin;
      let newval: number = math["r" + "ound"](
        CurrentMenu[index].ValueE + margin * offset,
        5
      );

      const OFBVal = newval % margin;

      if (OFBVal > 0.1) {
        newval = newval - OFBVal;
      }

      if (CurrentMenu[index].Min && CurrentMenu[index].Max) {
        newval = clamp(newval, CurrentMenu[index].Min, CurrentMenu[index].Max);
      }

      CurrentMenu[index].ValueE = newval;
    } else {
      let val = CurrentMenu[index].ValueE + offset;

      if (val > (CurrentMenu[index].Values as LuaTable).length()) {
        val = 1;
      }

      if (val < 1) {
        val = (CurrentMenu[index].Values as LuaTable).length();
      }

      CurrentMenu[index].ValueE = val;
    }

    CheckNotify(index, player);

    const cursor = self.GetChild("Item" + visualizedCursor);
    cursor.playcommand("DisplayInformation", CurrentMenu[index]);

    if (cursor["s" + "et"]) {
      const a = PerformSetCall(cursor, InputTiedTo);

      const sets = {
        Update_Strings: function () {
          for (const i of $range(1, numObjects)) {
            self
              .GetChild("Item" + (i as unknown as string))
              .playcommand("DisplayInformation", CurrentMenu[i + YOffset]);
            self
              .GetChild("Item" + (i as unknown as string))
              .playcommand("UpdateControllers", CurrentMenu[i]);
          }
          MESSAGEMAN.Broadcast("LanguageStringsUpdate");
        },
        Theme_Change: function () {
          RequiresThemeRestart =
            THEME.GetCurThemeName() !==
            (cursor.container.Values[cursor.container.ValueE] as string)
              ? cursor.container.Values[cursor.container.ValueE]
              : null;
        },
      };

      if (sets[a]) {
        sets[a]();
      }
    }
  };

  const handleAction = {
    action: function (self: Actor) {
      if (self.container.Value) {
        self.container.Value(self, InputTiedTo);
      }
    },
    screen: function (self: Actor, value: string) {
      (
        SCREENMAN.GetTopScreen().SetNextScreenName(
          self.container.Value
        ) as ScreenWithMenuElements
      ).StartTransitioningScreen("SM_GoToNextScreen");
    },
    url: function (self: Actor, value: string) {
      GAMESTATE.ApplyGameCommand("urlnoexit," + self.container.Value);
    },
    cancel: function (self: Actor) {
      const screen = SCREENMAN.GetTopScreen();

      if (self.container.Value) {
        screen.SetPrevScreenName(self.container.Value);
      }

      if (self.container.ForceSave) {
        (PrefsManager as unknown as PrefsManager).SaveToFile();
      }

      screen.Cancel();
    },
    menu: function (self: Actor, value: string) {
      return self
        .GetParent()
        .playcommand("CreateNewMenu", { NewMenu: CurrentMenu[value] });
    },
    message: function (self: Actor, value: string, params) {
      if (!value) {
        return self;
      }

      MESSAGEMAN.Broadcast(self.container.Value, { Player: InputTiedTo });
      return self;
    },
    list: function (self: Actor, value: number, isLeft: boolean) {
      ChangeValue(
        self.GetParent(),
        value,
        self.cursorVis,
        isLeft ? -1 : 0,
        self.pn
      );
    },
    number: function (self: Actor, value: number, isLeft: boolean) {
      ChangeValue(
        self.GetParent(),
        value,
        self.cursorVis,
        isLeft ? -1 : 0,
        self.pn
      );
    },
    boolean: function (self: Actor, value: number) {
      CurrentMenu[value].ValueE = !CurrentMenu[value].ValueE;
      return self.handler(self, self.container.ValueE);
    },
    nil: function (self: Actor) {
      return false;
    },
    default: function (self: Actor) {
      return false;
    },
  };

  let OriginalY = 0;
  let cursor = 1;
  let insideSpecialMenu = false;
  let Touch_PressedButton = false;

  //@ts-ignore
  return setmetatable(
    {
      _LICENSE: `
    Copyright 2021-2022 Jose Varela, Project OutFox
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
      http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    `,
      Handler: null,
      ActorFrame: null,
      Create: function (this: UIOptionsList) {
        return this.ActorFrame;
      },
      GetCursorIndex: function (this: UIOptionsList) {
        return cursor;
      },
      InSpecialMenu: function (this: UIOptionsList) {
        return insideSpecialMenu;
      },
      IsCurrentOptionToggable: function (this: UIOptionsList) {
        const choices = {
          number: true,
          list: true,
        };

        return CurrentMenu[cursor] ? choices[CurrentMenu[cursor].Type] : false;
      },
      LockInput: function (this: UIOptionsList, state: boolean) {
        allowedToMove = !state;
      },
      ResetCursor: function (this: UIOptionsList) {
        this.Handler.playcommand("ResetCursor");
      },
      ChangeValue: function (this: UIOptionsList, offset: number, player) {
        ChangeValue(
          this.Handler,
          cursor,
          cursorVis as unknown as string,
          offset,
          player
        );
      },
      GetFirstAvailableChoiceInMenu: function (this: UIOptionsList, Menu: AnyTable) {
        let attemps = 0;
        let cursorpos = 1;

        while (Menu[cursorpos].Type === "label" || Menu[cursorpos].Disabled) {
          if (attemps > (Menu as LuaTable).length() * 2) {
            return null;
          }

          cursorpos = cursorpos + 1;
          attemps = attemps + 1;

          if (cursorpos > (Menu as LuaTable).length()) {
            cursorpos = 1;
          }
        }

        return cursorpos;
      },
      UseNewMenu: function (this: UIOptionsList, NewMenu) {
        if (type(NewMenu) !== "table") {
          return;
        }

        if (NewMenu === CurrentMenu) {
          return;
        }

        const newcursorpos = this.GetFirstAvailableChoiceInMenu(NewMenu);
        if (newcursorpos) {
          insideSpecialMenu = false;
          cursor = newcursorpos;
          CurrentMenu = NewMenu;
          cursorVis = this.GetCursorVisPosition(newcursorpos);
          let self: ActorFrame = this.Handler;
          self.playcommand("UpdateContainer");
        } else {
          Trace(
            "[OptionList] This menu has no available choices to move around in!"
          );
        }
      },
      GetCursorVisPosition: function (this: UIOptionsList, cursor: number) {
        let newpos = cursor;
        const midPoint = math.floor(numObjects / 2);

        if ((CurrentMenu as LuaTable).length() > numObjects) {
          if (cursor > numObjects / 2) {
            if (cursor < (CurrentMenu as LuaTable).length() - midPoint) {
              newpos = midPoint;
            } else {
              newpos = cursor - (CurrentMenu as LuaTable).length() - midPoint;
            }
          }
        }

        return newpos;
      },
      MoveSelection: function (this: UIOptionsList, offset: number, player, IsTouch: boolean) {
        let self: ActorFrame = this.Handler;

        if (insideSpecialMenu && !allowedToMove) {
          return;
        }

        if (InputTiedTo && InputTiedTo !== player) {
          return;
        }

        cursor = cursor + offset;

        let forcenewOffset = [false, false];

        if (cursor > (CurrentMenu as LuaTable).length()) {
          cursor = 1;
          forcenewOffset = [true, false];
        }

        if (cursor < 0) {
          cursor = (CurrentMenu as LuaTable).length();
          forcenewOffset = [true, false];
        }

        if (CurrentMenu[cursor]) {
          if (
            IsTouch &&
            (CurrentMenu[cursor].Type === "label" ||
              CurrentMenu[cursor].Disabled)
          ) {
            return;
          }

          let attemps = 0;
          while (
            cursor !== 0 &&
            (CurrentMenu[cursor].Type === "label" ||
              CurrentMenu[cursor].Disabled)
          ) {
            if (attemps > (CurrentMenu as LuaTable).length() * 2) {
              break;
            }

            cursor = cursor + offset;
            attemps = attemps + 1;

            const isLabel: boolean =
              CurrentMenu[cursor].Type === "label" ||
              CurrentMenu[cursor].Disabled;
            forcenewOffset = [
              offset === -1 || (isLabel && offset === 1 && cursor !== 1),
              offset === -1,
            ];

            if (cursor > (CurrentMenu as LuaTable).length()) {
              cursor = 1;
            }

            if (cursor < 0) {
              cursor = (CurrentMenu as LuaTable).length();
            }
          }
        }

        cursorVis = cursor;

        const midPoint = math.floor(numObjects / 2);

        if ((CurrentMenu as LuaTable).length() > numObjects) {
          if (cursor > numObjects / 2) {
            if (cursor < (CurrentMenu as LuaTable).length() - midPoint) {
              cursorVis = midPoint;
              YOffset = cursor - midPoint;
            } else {
              if (cursor === (CurrentMenu as LuaTable).length() - midPoint) {
                forcenewOffset = [true, false];
              }

              const mid = (CurrentMenu as LuaTable).length() - midPoint;
              YOffset = mid;
              cursorVis = cursor - mid;
            }
          } else {
            cursorVis = cursor;
            YOffset = 0;
          }

          const itemsNeedToMove =
            cursor > numObjects / 2 &&
            cursor < (CurrentMenu as LuaTable).length() - midPoint;
          const movefoward = offset > 0;
          const moveback = offset < 0;

          if (itemsNeedToMove) {
            self
              .GetChild("Item" + (movefoward ? numObjects : 1))
              .stoptweening()
              .diffusealpha(0);
          }

          for (const i of $range(numObjects, 1, -1)) {
            if (
              itemsNeedToMove ||
              (forcenewOffset[1] && forcenewOffset[2]) ||
              (YOffset >= 0 &&
                cursor >= midPoint &&
                cursor < (CurrentMenu as LuaTable).length() - midPoint &&
                moveback)
            ) {
              self
                .GetChild("Item" + (i as unknown as string))
                .stoptweening()
                .y(containerYPos * (i + offset));

              self
                .GetChild("Item" + (i as unknown as string))
                .linear(0.1)
                .y(containerYPos * i)
                .diffusealpha(1);

              self
                .GetChild("Item" + (i as unknown as string))
                .playcommand("DisplayInformation", CurrentMenu[i + YOffset]);
              self
                .GetChild("Item" + (i as unknown as string))
                .playcommand("UpdateControllers", CurrentMenu[i + YOffset]);
            }

            if (forcenewOffset[1]) {
              self
                .GetChild("Item" + (i as unknown as string))
                .playcommand("DisplayInformation", CurrentMenu[i + YOffset]);
              self
                .GetChild("Item" + (i as unknown as string))
                .playcommand("UpdateControllers", CurrentMenu[i + YOffset]);
            }
          }
        }

        for (const i of $range(1, numObjects)) {
          self
            .GetChild("Item" + (i as unknown as string))
            .playcommand((cursorVis as number) === i ? "Active" : "Inactive");
        }

        self
          .GetChild("Cursor")
          .playcommand("MovePosition", { Offset: cursorVis });

        if (UseDescription) {
          self
            .GetChild("Explanation")
            .playcommand("MovePosition", { Offset: cursorVis });
        }
      },
      ResetCursorPosition: function (this: UIOptionsList, index: number) {
        cursor = index;
        cursorVis = this.GetCursorVisPosition(index);
        let self: ActorFrame = this.Handler;
        self.playcommand("UpdateContainer");
      },
      ConfirmSelection: function (this: UIOptionsList, player) {
        let self: ActorFrame = this.Handler;
        self.playcommand("Start", { Player: player });
      },
      Back: function (this: UIOptionsList, player) {
        let self: ActorFrame = this.Handler;
        self.playcommand("Back", { Player: player });
      },
      BroadcastCurMenuEnterMessage: function (this: UIOptionsList, player) {
        if (CurrentMenu.MessageOnEntry) {
          MESSAGEMAN.Broadcast(CurrentMenu.MessageOnEntry, { pn: player });
        }
      },
      BroadcastCurMenuExitMessage: function (this: UIOptionsList, player) {
        if (CurrentMenu.MessageOnExit) {
          MESSAGEMAN.Broadcast(CurrentMenu.MessageOnExit, { pn: player });
        }
      },
    },
    {
      __call: function (this: UIOptionsList, Container) {
        CurrentMenu = Container.List;
        CheckForSkippableItems(CurrentMenu);
        InputTiedTo =
          Container.InputTiedTo || GAMESTATE.GetMasterPlayerNumber();
        ItemWidth = Container.ItemWidth || 360;
        ItemHeight = Container.ItemHeight || 42;
        numObjects = Container.NumChoices || 13;
        needsColorBoolean = Container.ColorBoooleanSwitches;

        if (Container.UseDescription !== null) {
          UseDescription = Container.UseDescription;
        }

        const t: ActorFrame = Def.ActorFrame({
          InitCommand: function (self: ActorFrame) {
            this.Handler = self;
          },
          OnCommand: function (self: ActorFrame) {
            const tempArg: number = string["s" + "ub"](InputTiedTo, -1);
            (PrefsManager as unknown as PrefsManager).Load(
              CheckIfUserOrMachineProfile(
                (((tempArg - 1) as unknown as string) +
                  "OutFoxPrefs.ini") as unknown as PlayerNumber
              )
            );

            if (!Container.UseDedicatedController) {
              self.Controller = LoadModule("Loa.InputSystem.lua")(self);
              SCREENMAN.GetTopScreen().AddInputCallback(self.Controller);
            }

            self.playcommand("UpdateContainer");
          },
          CancelCommand: function (self: ActorFrame) {
            if (Container.SaveOnCancel) {
              (PrefsManager as unknown as PrefsManager).SaveToFile();
            }
          },
          OffCommand: function (self: ActorFrame) {
            (PrefsManager as unknown as PrefsManager).SaveToFile();

            if (modifiedSystemPref) {
              PREFSMAN.SavePreferences();
            }

            if (!Container.UseDedicatedController) {
              SCREENMAN.GetTopScreen().RemoveInputCallback(self.Controller);
            }
          },
          MenuDownCommand: function (this: UIOptionsList,self: ActorFrame) {
            this.MoveSelection(1, self.pn);
          },
          MenuUpCommand: function (this: UIOptionsList, self: ActorFrame) {
            this.MoveSelection(-1, self.pn);
          },
          MenuLeftCommand: function (this: UIOptionsList, self: ActorFrame) {
            if (ThreeButtonComp && !insideSpecialMenu) {
              this.MoveSelection(-1, self.pn);
            } else {
              ChangeValue(
                self,
                cursor,
                cursorVis as unknown as string,
                -1,
                self.pn
              );
            }
          },
          MenuRightCommand: function (this: UIOptionsList, self: ActorFrame) {
            if (ThreeButtonComp && !insideSpecialMenu) {
              this.MoveSelection(1, self.pn);
            } else {
              ChangeValue(
                self,
                cursor,
                cursorVis as unknown as string,
                1,
                self.pn
              );
            }
          },
          SelectCommand: function (self: ActorFrame) {
            if (!allowedToMove) {
              return;
            }

            if (Container.InputTiedTo && Container.InputTiedTo !== self.pn) {
              return;
            }

            MESSAGEMAN.Broadcast("OptionListTopOfTree", { Player: self.pn });
          },
          StartCommand: function (self: ActorFrame, params?: AnyTable) {
            if (!allowedToMove) {
              return;
            }
            const player = params ? params.Player : self.pn;

            if (Container.InputTiedTo && Container.InputTiedTo !== player) {
              return;
            }

            if (RequiresThemeRestart) {
              THEME.SetTheme(RequiresThemeRestart);
              return;
            }

            if (cursor === 0) {
              self.playcommand("ReturnMenu", { NewMenu: CurrentMenu });
            }

            if (insideSpecialMenu) {
              insideSpecialMenu = false;
              self
                .GetChild("Item" + (cursorVis as unknown as string))
                .playcommand("LoseFocus");
              return;
            }

            const needSpecial = {
              list: true,
              number: true,
            };

            if (
              ThreeButtonComp &&
              needSpecial[
                self.GetChild("Item" + (cursorVis as unknown as string))
                  .valueType
              ]
            ) {
              insideSpecialMenu = true;
              self
                .GetChild("Item" + (cursorVis as unknown as string))
                .playcommand("GainFocus");
              return;
            }

            if (
              self.GetChild("Item" + (cursorVis as unknown as string))
                .valueType === "menu"
            ) {
              self
                .GetChild("Item" + (cursorVis as unknown as string))
                .action(
                  self.GetChild("Item" + (cursorVis as unknown as string)),
                  cursor
                );
              return;
            }

            if (
              self
                .GetChild("Item" + (cursorVis as unknown as string))
                .action(
                  self.GetChild("Item" + (cursorVis as unknown as string)),
                  cursor
                )
            ) {
              const cursorActor = self.GetChild(
                "Item" + (cursorVis as unknown as string)
              );

              if (cursorActor["s" + "et"]) {
                PerformSetCall(cursorActor, InputTiedTo);
              }

              cursorActor.playcommand(
                "DisplayInformation",
                CurrentMenu[cursor]
              );
              CheckNotify(cursor, InputTiedTo);
            }
          },
          BackCommand: function (self: ActorFrame, params?: AnyTable) {
            if (RequiresThemeRestart) {
              SCREENMAN.SystemMessage("A popup message shows up here.");
              return;
            }

            const player = params.Player || InputTiedTo;

            if (!allowedToMove) {
              return;
            }

            if (Container.InputTiedTo && Container.InputTiedTo !== player) {
              return;
            }

            if (insideSpecialMenu) {
              insideSpecialMenu = false;
            } else {
              self.playcommand("ReturnMenu", { NewMenu: CurrentMenu });
            }
          },
          AllowInputCommand: function (self: ActorFrame, params?: AnyTable) {
            allowedToMove = params.State;
            return;
          },
          ResetCursorCommand: function (self: ActorFrame) {
            self.playcommand("UpdateContainer");
          },
          CreateNewMenuCommand: function (this: UIOptionsList, self: ActorFrame, params?: AnyTable) {
            if (!params.NewMenu.Menu) {
              return;
            }

            const npos = this.GetFirstAvailableChoiceInMenu(
              params.NewMenu.Menu
            );

            if (!npos) {
              return;
            }

            const old = CurrentMenu;
            if (params.NewMenu.MessageOnEntry) {
              MESSAGEMAN.Broadcast(params.NewMenu.MessageOnEntry, {
                pn: InputTiedTo,
              });
            }

            CurrentMenu = params.NewMenu.Menu;
            CurrentMenu.Back = old;
            CurrentMenu.Pos = cursor;
            cursor = npos;
            cursorVis = this.GetCursorVisPosition(cursor);
            self.playcommand("UpdateContainer");
          },
          ReturnMenuCommand: function (this: UIOptionsList, self: ActorFrame, params?: AnyTable) {
            if (params.NewMenu.Back) {
              if (CurrentMenu.MessageOnExit) {
                MESSAGEMAN.Broadcast(CurrentMenu.MessageOnExit, {
                  pn: InputTiedTo,
                });
              }

              cursor = CurrentMenu.Pos;
              CurrentMenu = params.NewMenu.Back;
              cursorVis = this.GetCursorVisPosition(cursor);
              self.playcommand("UpdateContainer");
              this.MoveSelection(0, InputTiedTo);
            } else {
              const p = Container.UseDedicatedController
                ? InputTiedTo
                : self.pn;

              MESSAGEMAN.Broadcast("OptionListTopOfTree", {
                Player: p,
                UsedBack: true,
              });

              if (Container.BackExitsScreen) {
                SCREENMAN.GetTopScreen().Cancel();
              }
            }
          },
          UpdateContainerCommand: function (self: ActorFrame) {
            YOffset = 0;
            self
              .GetChild("Cursor")
              .playcommand("MovePosition", { Offset: cursor });

            if (UseDescription) {
              self
                .GetChild("Explanation")
                .playcommand("MovePosition", { Offset: cursorVis });
            }

            for (const i of $range(numObjects, 1, -1)) {
              self
                .GetChild("Item" + i)
                .playcommand("DisplayInformation", CurrentMenu[i]);
              self
                .GetChild("Item" + i)
                .playcommand("UpdateControllers", CurrentMenu[i]);
              self
                .GetChild("Item" + i)
                .playcommand(cursorVis === i ? "Active" : "Inactive");
            }

            Touch_PressedButton = false;
          },
          UpdateYCoordinateCommand: function (self: ActorFrame) {},
        });

        const AllowedToClickArea = function (self: ActorFrame) {
          return (
            !Touch_PressedButton &&
            allowedToMove &&
            self.valueType !== null &&
            self.valueType !== "label" &&
            !self.container.Disabled
          );
        };

        const UpdateContainerFromMessage = function (self: ActorFrame) {
          if (self.container.UpdateFromMessage) {
            const params: any = {};

            if (self.container.UsePrefs) {
              params.PrefsManager = PrefsManager;
            }
            self.container.UpdateFromMessage(
              self.container,
              self.container.ValueE,
              InputTiedTo,
              params
            );
            self
              .linear(0.1)
              .diffuse(
                self.container.Disabled ? color("#777777") : Color.White
              );
            self.handler(self, self.container.ValueE);
          }
        };

        const temporaryModule = LoadModule("UI/UI.ClickArea.lua")({
          Width: 40,
          Height: 40,
          ReturnAdjacentActorFrame: true,
          Position: function (self: Quad) {
            self.xy(-ItemWidth * 0.5 + 24, -6);
          },
          Action: function (self: Quad) {
            if (!allowedToMove) {
              return;
            }
            Touch_PressedButton = true;
            self.playcommand("Back", { Player: InputTiedTo });
          },
        });
        temporaryModule.Name = "BackButton";

        t.set(t.length() + 1, temporaryModule);

        for (const i of $range(1, numObjects)) {
          const actorFrameArg = new LuaTable();
          actorFrameArg.set("Name", "Item" + (i as unknown as string));
          actorFrameArg.set("InitCommand", function (self: ActorFrame) {
            self.handler = null;
            self.y(32 * i);

            const BGWidth = ItemWidth;
            const c = self.GetChildren();
            (c.Value as BitmapText)
              .halign(1)
              .x(BGWidth * 2)
              .visible(false)
              .maxwidth(100);
            ((c.Label as BitmapText).halign(0) as BitmapText)
              .maxwidth(BGWidth * 2)
              .x(-BGWidth * 0.5 + 20)
              .zoom(0.5);

            (c.Next as ActorFrame)
              .visible(false)
              .x(BGWidth * 0.5 - 24)
              .zoom(0.7)
              .rotationy(180);
            (c.Prev as ActorFrame).visible(false).x(-10).zoom(0.125).zoom(0.7);

            self.cursorVis = i;

            if (Container.TransformationCommand) {
              Container.TransformationCommand(self, i);
            }

            if (i === 1) {
              containerYPos = self.GetY();
            }
          });

          actorFrameArg.set(
            "ToggleButtonsCommand",
            function (self: ActorFrame, params: AnyTable) {
              self.GetChild("Next").visible(params.Visible);
              self.GetChild("Prev").visible(params.Visible);
            }
          );

          actorFrameArg.set(
            "CheckForMessagesMessageCommand",
            function (self: ActorFrame, params: AnyTable) {
              if (!self.container) {
                return;
              }

              if (self.container.SubscribedMessage) {
                if (type(self.container.SubscribedMessage) === "table") {
                  for (const [i, v] of ipairs(
                    self.container.SubscribedMessage
                  )) {
                    if (v === params.Value) {
                      UpdateContainerFromMessage(self);
                      break;
                    }
                  }
                } else {
                  if (self.container.SubscribedMessage === params.Value) {
                    UpdateContainerFromMessage(self);
                  }
                }
              }
            }
          );

          actorFrameArg.set(
            "DisplayInformationCommand",
            function (self: ActorFrame, container) {
              self.container = container;
              const c = self.GetChildren();

              if (!self.container) {
                ValueTypeHandler["n" + "il"](self);
                self.valueType = null;
                self.action = handleAction.default;
                (c.icon as Actor).visible(false);
                (c.PrevAction as Actor).visible(false);
                (c.ClickACtion as Actor).visible(false);
                (c.MainClickArea as Actor).visible(false);
                return;
              }

              self.valueType = self.container.Type || null;

              if (self.container.Menu) {
                self.valueType = "menu";
              }

              self.diffuse(
                self.container.Disabled ? color("#777777") : Color.White
              );

              self.handler =
                ValueTypeHandler[self.valueType] || ValueTypeHandler.default;
              self.handler(self, self.container.ValueE);
              self.action =
                handleAction[self.valueType] || handleAction.default;

              const needsshrinking = { list: true, number: true };

              (c.PrevAction as ActorFrame).visible(
                needsshrinking[self.valueType] !== null
              );
              (c.ClickAction as ActorFrame).visible(
                needsshrinking[self.valueType] !== null ||
                  self.valueType === "boolean"
              );
              (c.MainClickArea as ActorFrame).visible(
                self.valueType !== null && self.valueType !== "label"
              );

              (c.icon as ActorFrame).visible(false);

              if (self.container.Icon) {
                ((c.icon as Sprite).visible(true) as Sprite)
                  .Load(self.container.Icon)
                  .zoom(
                    TF_WHEEL.Resize(
                      (c.icon as ActorFrame).GetWidth(),
                      (c.icon as ActorFrame).GetHeight(),
                      28,
                      28
                    )
                  );
              }
              (c.BG as ActorFrame).visible(self.valueType !== "label");

              const BGWidth = ItemWidth;

              ((c.Label as BitmapText).visible(true) as BitmapText).settext(
                container.Name || ""
              );

              if (Container.TranslateValueNames && container.Name) {
                const translationTypes = {
                  song_option: "OptionTitles",
                  system_option: "OptionTitles",
                  system_option_table: "OptionTitles",
                  player_mod: "OptionNames",
                };

                const typeTrs: string = container.Translate
                  ? "OptionTitles"
                  : translationTypes[container.Value] || "OptionTitles";

                if (typeTrs) {
                  if (THEME.HasString(typeTrs, container.Name)) {
                    const TranslatedValue = THEME.GetString(
                      typeTrs,
                      container.Name
                    );
                    (c.Label as BitmapText).settext(TranslatedValue);
                  }
                }
              }

              (c.Label as BitmapText)
                .maxwidth(
                  ItemWidth * (needsshrinking[self.valueType] ? 0.35 : 1.6)
                )
                .x(-BGWidth * 0.5 + (self.container.Icon ? 60 : 20))
                .zoom(
                  self.valueType === "label"
                    ? 0.8
                    : TF_WHEEL.Resize(
                        (c.Label as ActorFrame).GetWidth(),
                        (c.Label as ActorFrame).GetHeight(),
                        ItemWidth * 1.6,
                        15
                      )
                );
            }
          );

          actorFrameArg.set(
            "FORCEOptionListStringsMessageCommand",
            function (self: ActorFrame) {
              self.playcommand("DisplayInformation", CurrentMenu[i + YOffset]);
            }
          );

          actorFrameArg.set(
            "UpdateControllersCommand",
            function (self: ActorFrame, container) {
              if (!self.container) {
                return;
              }

              let LookUp;

              if (self.container.Load) {
                LookUp = self.container.Load;
              } else {
                LookUp = DataGet[self.container.Value] || DataGet.default;
              }

              self["s" + "et"] = DataSet[self.container.Value] || null;

              if (self.container.Save) {
                self["s" + "et"] = self.container.Save;
              }

              self.container.ValueE = LookUp(self, InputTiedTo);

              if (self.container.AfterLoad) {
                if (self.container.AfterLoad(self)) {
                  MESSAGEMAN.Broadcast("CheckForMessages", {
                    Value: self.container.Name,
                  });
                }
              }
            }
          );

          actorFrameArg.set("ActiveCommand", function (self: ActorFrame) {}),
            actorFrameArg.set(
              "InactiveCommand",
              function (self: ActorFrame) {}
            ),
            actorFrameArg.set("GainFocusCommand", function (self: ActorFrame) {
              self
                .stoptweening()
                .decelerate(0.2)
                .zoom(1)
                .diffuse(BoostColor(GameColor.Custom["MenuButtonBorder"], 1));
            });
          actorFrameArg.set("LoseFocusCommand", function (self: ActorFrame) {
            self.stoptweening().decelerate(0.2).zoom(1).diffuse(Color.White);
          });

          if (Container.Frame) {
            const temporaryTable: ActorFrame = Container.Frame(
              ItemWidth,
              InputTiedTo
            );

            temporaryTable.Name = "BG";

            actorFrameArg.set(actorFrameArg.length() + 1, temporaryTable);
          } else {
            actorFrameArg.set(
              actorFrameArg.length() + 1,
              Def.Quad({
                Name: "BG",
                InitCommand: function (self: Quad) {
                  self
                    .diffuse(
                      BoostColor(GameColor.Custom["MeuButtonBorder"], 0.5)
                    )
                    .zoomto(ItemWidth, 40);
                },
                ColorSchemeChangedMessageCommand: function (self: Quad) {
                  self
                    .finishtweening()
                    .diffuse(
                      BoostColor(GameColor.Custom["MeuButtonBorder"], 0.5)
                    )
                    .zoomto(ItemWidth, 40);
                },
              })
            );
          }

          actorFrameArg.set(
            actorFrameArg.length() + 1,
            Def.Sprite({
              Name: "icon",
              InitCommand: function (self: Sprite) {
                self.x(-ItemWidth * 0.5 + 34);
              },
            })
          );

          actorFrameArg.set(
            actorFrameArg.length() + 1,
            Def.BitmapText({
              Name: "Label",
              Font: "_Bold",
            })
          );

          actorFrameArg.set(
            actorFrameArg.length() + 1,
            Def.BitmapText({
              Name: "Value",
              Font: "Common Normal",
            })
          );

          const subActorFrameArg = new LuaTable();
          subActorFrameArg.set("Name", "Next");
          subActorFrameArg.set("InitCommand", function (self: ActorFrame) {
            self.SetWidth(24);
          });
          subActorFrameArg.set(
            subActorFrameArg.length() + 1,
            buttonBoxGen(50, 50, 2, InputTiedTo)
          );
          subActorFrameArg.set(
            subActorFrameArg.length() + 1,
            Def.Sprite({
              Texture: THEME.GetPathG("", "UI/Back"),
            })
          );

          actorFrameArg.set(
            actorFrameArg.length() + 1,
            Def.ActorFrame(subActorFrameArg)
          );

          const subActorFrameArg2 = new LuaTable();

          subActorFrameArg2.set("Name", "Prev");
          subActorFrameArg2.set("InitCommand", function (self: ActorFrame) {
            self.SetWidth(24);
          });
          subActorFrameArg2.set(
            subActorFrameArg.length() + 1,
            buttonBoxGen(50, 50, 2, InputTiedTo)
          );
          subActorFrameArg2.set(
            subActorFrameArg2.length() + 1,
            Def.Sprite({
              Texture: THEME.GetPathG("", "UI/Back"),
            })
          );

          actorFrameArg.set(actorFrameArg.length() + 1, subActorFrameArg2);
          actorFrameArg.set(
            actorFrameArg.length() + 1,
            Def.Sprite({
              Name: "image",
              Texture: Container.BoolImage || THEME.GetPathG("", "switch"),
              InitCommand: function (self: Sprite) {
                self
                  .setstate(0)
                  .animate(0)
                  .zoom(0.25)
                  .x(ItemWidth * 0.5 - 50);

                if (needsColorBoolean) {
                  self.diffuse(PlayerColor(InputTiedTo));
                }
              },
            })
          );

          const temporaryModule = LoadModule("UI/UI.ClickArea.lua")({
            Width: 60,
            Height: 30,
            ReturnAdjacentActorFrame: true,
            Position: function (self: ActorFrame) {
              const bg = self.GetParent().GetChild("BG");

              self.zoomto(ItemWidth, bg.GetZoomedHeight());
            },
            Action: function (this: UIOptionsList, self: ActorFrame) {
              if (!AllowedToClickArea(self)) {
                return;
              }

              const allowed = {
                action: true,
                screen: true,
                cancel: true,
                menu: true,
                message: true,
              };

              if (allowed[self.valueType]) {
                self.pn = InputTiedTo;
                self.action(self, i + YOffset);
                self.pn = null;
              } else {
                cursor = i + YOffset;
                this.MoveSelection(0, InputTiedTo, true);
              }
            },
          });

          temporaryModule.Name = "MainClickArea";

          t.set(t.length() + 1, temporaryModule);

          const temporaryModule1 = LoadModule("UI/UI.ClickArea.lua")({
            Width: 24,
            Height: 34,
            ReturnAdjacentActorFrame: true,
            Position: function (self: ActorFrame) {
              self.x(ItemWidth * 0.5 - 50);
            },
            Action: function (self: ActorFrame) {
              if (!AllowedToClickArea(self)) {
                return;
              }

              const allowed = {
                boolean: true,
                number: true,
                list: true,
              };

              if (!allowed[self.valueType]) {
                return;
              }

              self.pn = InputTiedTo;
              self.action(self, i + YOffset);
              self.pn = null;

              if (self["s" + "et"]) {
                PerformSetCall(self, InputTiedTo);
              }
              CheckNotify(i + YOffset, InputTiedTo);
            },
          });

          temporaryModule1.Name = "ClickAction";

          t.set(t.length() + 1, temporaryModule1);

          const temporaryModule2 = LoadModule("UI/UI.ClickArea.lua")({
            Width: 60,
            Height: 30,
            ReturnAdjacentActorFrame: true,
            Position: function (self: ActorFrame) {
              self
                .x(self.GetParent().GetChild("Prev").GetX())
                .zoomtowidth(
                  self.GetParent().GetChild("Prev").GetZoomedWidth() + 20
                );
            },
            Action: function (self: ActorFrame) {
              if (!AllowedToClickArea(self)) {
                return;
              }

              const allowed = {
                number: true,
                list: true,
              };

              if (!allowed[self.valueType]) {
                return;
              }

              self.pn = InputTiedTo;
              self.action(self, i + YOffset, true);
              self.pn = null;

              if (self["s" + "et"]) {
                PerformSetCall(self, InputTiedTo);
              }
              CheckNotify(i + YOffset, InputTiedTo);
            },
          });

          temporaryModule2.Name = "PrevAction";

          t.set(t.length() + 1, temporaryModule2);

          t.set(t.length() + 1, Def.ActorFrame(actorFrameArg));
        }
        const actorFrameArg1 = new LuaTable();
        actorFrameArg1.set("Name", "BackBG");
        actorFrameArg1.set("InitCommand", function (self: ActorFrame) {
          self.xy(-ItemWidth * 0.5 + 24, -6);
        });
        actorFrameArg1.set(
          actorFrameArg1.length() + 1,
          LoadModule("UI/UI.ButtonBox.lua")(40, 40, 2)
        );
        actorFrameArg1.set(
          actorFrameArg1.length() + 1,
          Def.Sprite({
            Texture: THEME.GetPathG("", "UI/Back"),
          })
        );
        const temporaryModule3: ActorFrame = Def.ActorFrame(actorFrameArg1);

        t.set(t.length() + 1, temporaryModule3);
        t.set(
          t.length() + 1,
          Def.Quad({
            Name: "Scroller",
            InitCommand: function (self: Quad) {
              self
                .zoomto(16, 30)
                .x(-ItemWidth * 0.5 - 10)
                .visible(Container.ShowScroller || true);
            },
            MovePositionCommand: function (self: Quad, param) {
              if ((CurrentMenu as LuaTable).length() < numObjects) {
                self.visible(false);
                return;
              }

              self.visible(true).stoptweening().easeoutexpo(0.2);

              const midPoint = math.floor(numObjects / 2);

              if (
                cursor >= midPoint &&
                cursor <= (CurrentMenu as LuaTable).length() - midPoint
              ) {
                self.y(
                  scale(
                    cursor,
                    midPoint,
                    (CurrentMenu as LuaTable).length() - midPoint - 1,
                    12,
                    42 * numObjects
                  )
                );
              }
            },
          })
        );

        let temporaryTable;

        if (Container.Cursor) {
          temporaryTable = Container.Cursor(ItemWidth, InputTiedTo);
        } else {
          temporaryTable = Def.Quad({
            InitCommand: function (self: Quad) {
              self.y(32).zoomto(ItemWidth, 40).diffusealpha(0.5);
            },
          });
        }

        temporaryTable.Name = "Cursor";
        temporaryTable.InitCommand = function (self: Quad) {
          self.OGWidth = ItemWidth;
          self.OGHeight = ItemHeight;
        };
        temporaryTable.MovePosition = function (self: Quad, param) {
          self.stoptweening().easeoutexpo(0.2);

          if (Container.TransformationCommand) {
            Container.TransformationCommand(self, param.Offset);
          } else {
            self.y(32 + 32 * (param.offset - 1));
          }

          if (param.Offset === 0) {
            self.xy(
              self.GetParent().GetChild("BackButton").GetX(),
              self.GetParent().GetChild("BackButton").GetY()
            );
          }

          if (Container.Cursor !== null) {
            self.playcommand("CursorFrameChange", {
              Width: ItemWidth,
              isMenuButton: param.offset === 0,
            });
          } else {
            self.zoomto(self.OGWidth, self.OGheight);

            if (param.Offset === 0) {
              self.zoomto(46, 46);
            }
          }

          self
            .GetParent()
            .GetChild("Scroller")
            .playcommand("MovePosition", { Offset: param.Offset });
        };

        t.set(t.length() + 1, temporaryTable);

        const actorFrameArg2 = new LuaTable()

        actorFrameArg2.set('Name', 'Explanation')
        actorFrameArg2.set('Condition', UseDescription)
        actorFrameArg2.set('InitCommand', function (self: ActorFrame) {
          self.OGWidth = ItemWidth
          self.OGHeight = ItemHeight
          self.diffusealpha(0)
        })
        actorFrameArg2.set('MovePositionCommand', function (self: ActorFrame, param) {
          self.stoptweening().easeoutexpo(0.2)

          if (Container.TransformationCommand) {
            Container.TransformationCommand(self, cursorVis)
          } else {
            self.y(32 + (32 * (cursorVis - 1)))
          }

          const offsetToApply = cursorVis > numObjects/2 ? (-ItemHeight - 112) : (ItemHeight - 16)
          self.addy(offsetToApply)

          self.diffusealpha(0)

          if (CurrentMenu[cursor] && THEME.HasString('OptionsExplanations', CurrentMenu[cursor].Name)) {
            self.GetChild<BitmapText>('Text').settext(THEME.GetString('OptionsExplanations', CurrentMenu[cursor].Name))
            self.sleep(0.2).easeoutexpo(0.1).diffusealpha(1)
          }
        })
        actorFrameArg2.set(actorFrameArg2.length() + 1, Def.Quad({
          OnCommand: function (self: ActorFrame) {
            self.zoomto(self.GetParent().OGWidth, 128).valign(0).diffuse(color('#000000C0'))
          }
        }))
        actorFrameArg2.set(actorFrameArg2.length() + 1, Def.BitmapText({
          Font: 'Common Normal',
          Name: 'Text',
          InitCommand: function (self: BitmapText) {
            self.wrapwidthpixels(ItemWidth - 50).valign(0).y(20)
          }
        }))

        t.set(t.length() + 1, Def.ActorFrame(actorFrameArg2))

        if (Container.UseMetatable) {
          this.ActorFrame = t
          return this
        }

        return t
      },
    }
  );
}
