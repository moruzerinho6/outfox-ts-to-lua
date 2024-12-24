{
  const buttons = {
    Home:       THEME.GetString('DeviceButton', 'Home'),
    End:        THEME.GetString('DeviceButton', 'End'),
    Up:         THEME.GetString('DeviceButton', 'Up'),
    Down:       THEME.GetString('DeviceButton', 'Down'),
    Space:      THEME.GetString('DeviceButton', 'Space'),
    Shift:      THEME.GetString('DeviceButton', 'Shift'),
    Ctrl:       THEME.GetString('DeviceButton', 'Ctrl'),
    Alt:        THEME.GetString('DeviceButton', 'Alt'),
    Insert:     THEME.GetString('DeviceButton', 'Insert'),
    Delete:     THEME.GetString('DeviceButton', 'Delete'),
    PgUp:       THEME.GetString('DeviceButton', 'PgUp'),
    PgDn:       THEME.GetString('DeviceButton', 'PgDn'),
    Backslash:  THEME.GetString('DeviceButton', 'Backslash'),
    Tab:        THEME.GetString('DeviceButton', 'Tab'),
    Enter:      'Enter'
  }

  const NumColumns = GAMESTATE.GetCurrentStyle().ColumnsPerPlayer()

  const HelpLines = new LuaTable()
  HelpLines.set(HelpLines.length() + 1, 'Basic Controls')
  HelpLines.set(HelpLines.length() + 1, ['Move cursor',               buttons.Up, buttons.Down])
  HelpLines.set(HelpLines.length() + 1, ['Place Note',                1, NumColumns])
  HelpLines.set(HelpLines.length() + 1, ['Jump measure',              buttons.PgUp, buttons.PgDn])
  HelpLines.set(HelpLines.length() + 1, ['Select region',             buttons.Shift, buttons.Up + '/' + buttons.Down, true])
  HelpLines.set(HelpLines.length() + 1, ['Jump to first/last beat',   buttons.Home, buttons.End])
  HelpLines.set(HelpLines.length() + 1, ['Jump to end of song',       buttons.Shift, buttons.End, true])
  HelpLines.set(HelpLines.length() + 1, ['Change zoom',               buttons.Ctrl, buttons.Up + '/' + buttons.Down, true])
  HelpLines.set(HelpLines.length() + 1, ['Play','                     P'])
  HelpLines.set(HelpLines.length() + 1, ['Play current beat to end',  buttons.Shift, 'P', true])
  HelpLines.set(HelpLines.length() + 1, ['Play whole song',           buttons.Ctrl, 'P', true])
  HelpLines.set(HelpLines.length() + 1, ['Record',                    buttons.Ctrl, 'R', true])
  HelpLines.set(HelpLines.length() + 1, ['Go to beat',                'G'])
  HelpLines.set(HelpLines.length() + 1, ['Set selection',             buttons.Tab])

  // from new editor
  HelpLines.set(HelpLines.length() + 1, ['Preview from current beat', buttons.Space])

  HelpLines.set(HelpLines.length() + 1, 'Menus')
  HelpLines.set(HelpLines.length() + 1, ['Area Menu', buttons.Enter])
  HelpLines.set(HelpLines.length() + 1, ['Alter Menu', "A"])
  HelpLines.set(HelpLines.length() + 1, ['Timing Menu', 'F4'])
  HelpLines.set(HelpLines.length() + 1, ['Add/Edit Background Change', 'B [1]', buttons.Shift + '+' + 'B [2]'])
  HelpLines.set(HelpLines.length() + 1, ['Add/Edit Foreground Change', buttons.Alt, "B", true])

  HelpLines.set(HelpLines.length() + 1, 'Increase/Decrease manouvers')
  HelpLines.set(HelpLines.length() + 1, ['Next/prev steps of same StepsType', 'F5', 'F6'])
  HelpLines.set(HelpLines.length() + 1, ['Decrease/increase BPM at cur beat', 'F7', 'F8'])
  HelpLines.set(HelpLines.length() + 1, ['Decrease/increase stop at cur beat', 'F9', 'F10'])
  HelpLines.set(HelpLines.length() + 1, ['Decrease/increase delay at cur beat', buttons.Shift, 'F9', true])
  HelpLines.set(HelpLines.length() + 1, ['Decrease/increase music offset', 'F11', 'F12'])
  HelpLines.set(HelpLines.length() + 1, ['Decrease/increase sample music start', '[', ']'])
  HelpLines.set(HelpLines.length() + 1, ['Decrease/increase sample music length', '{', '}'])

  HelpLines.set(HelpLines.length() + 1, 'Altering operations')
  HelpLines.set(HelpLines.length() + 1, ['Insert beat and shift down', buttons.Insert])
  HelpLines.set(HelpLines.length() + 1, ['Shift BPM changes and stops down one beat', buttons.Ctrl, buttons.Insert, true])
  HelpLines.set(HelpLines.length() + 1, ['Delete beat and shift up', buttons.Delete])
  HelpLines.set(HelpLines.length() + 1, ['Shift BPM changes and stops up one beat', buttons.Ctrl, buttons.Delete, true])
  HelpLines.set(HelpLines.length() + 1, ['Add to/remove from right half', buttons.Alt, '[1 / ' + NumColumns + ']', true])

  HelpLines.set(HelpLines.length() + 1, 'Miscelaneous')
  HelpLines.set(HelpLines.length() + 1, ['Play sample music', 'L'])
  HelpLines.set(HelpLines.length() + 1, ['Cycle between tap notes', 'N', "M"])
  HelpLines.set(HelpLines.length() + 1, ['Cycle between tap source (Original / Fake)', buttons.Shift, 'N', "M", true])
  HelpLines.set(HelpLines.length() + 1, ['Switch Timing', "T"])
  HelpLines.set(HelpLines.length() + 1, ['Switch player (Routine only)', buttons.Backslash + ' ( / )'])

  const ButtonAF: LuaTable = Def.ActorFrame({
    OnCommand: function(self: ActorFrame) {
      self.y(70)
    }
  })

  const RightSideScreen = SCREEN_WIDTH * (IsUsingPortrait() ? 1 : .65)
  const textzoom = 0.6 * (SCREEN_HEIGHT/480)

  let measure = 0

  for (const [k, v] of ipairs(HelpLines)) {
    const isCategory = type(v) === 'string'
    const HelpLine: LuaTable = Def.ActorFrame({
      OnCommand: function(self: ActorFrame) {
        if (isCategory) {
          measure = measure + 1
        }

        self.y( SAFE_HEIGHT-6 + ( (14 * (SCREEN_HEIGHT/480)) * (k-1) + (24 * measure) )  )

        if (isCategory) {
          measure = measure + 0.25
        }
      }
    })

    if (isCategory) {
      HelpLine.set(HelpLine.length() + 1, Def.BitmapText({
        Font: '_Bold',
        Text: v,
        OnCommand: function(self: BitmapText) {
          self.halign(0).x(0).zoom(textzoom * 1.3)
        }
      }))
    } else {
      HelpLine.set(HelpLine.length() + 1, Def.BitmapText({
        Font: 'Common Normal',
        Text: THEME.HasString('EditHelpDescription', v[1]) ? THEME.GetString('EditHelpDescription', v[1]) : v[1],
        OnCommand: function(self: BitmapText) {
          self.halign(0).x(170).zoom(textzoom)
        }
      }))

      HelpLine.set(HelpLine.length() + 1, Def.BitmapText({
        Font: 'Common Normal',
        OnCommand: function(self: BitmapText) {
          (self.halign(v[3] ? 0.5 : 0.5).x(80).zoom(textzoom) as BitmapText).maxwidth(150)

          let text = v[2]

          if (v[3]) {
            const CombineOrLine = v[4] ? ' + ' : ' / '
            text = text + CombineOrLine + v[3]
          }

          self.settext(text)
        }
      }))
    }

    ButtonAF.set(ButtonAF.length() + 1, HelpLine)
  }

  const ActorFrameArg = new LuaTable()
  ActorFrameArg.set('InitCommand', function(self: ActorFrame) {
    self.SetHeight(600)
  })
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Title',
    Font: '_plex bold',
    Text: THEME.GetString('ScreenEditHelp', 'NavigatingAroundTitle'),
    OnCommand: function(self: BitmapText) {
      self.align(0, 0).wrapwidthpixels(RightSideScreen).zoom(0.8)
    }
  }))
  ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
    Name: 'Description',
    Font: 'Common Normal',
    Text: THEME.GetString('ScreenEditHelp', 'NavigatingAroundDesc'),
    OnCommand: function(self: BitmapText) {
      self.align(0, 0).wrapwidthpixels(RightSideScreen).y(40)
    }
  }))
  ActorFrameArg.set(ActorFrameArg.length() + 1, ButtonAF)

  return Def.ActorFrame(ActorFrameArg)
}