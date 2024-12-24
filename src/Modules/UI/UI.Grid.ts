//@ts-ignore
return function (GridData) {
  let cursorPositions = GridData.cursorPositions
  let selectionCursor = GridData.initialPosition || [1,1]

  const FillNamePositions = () => {
    const posit = []

    for (const [y, verticalGroups] of ipairs(cursorPositions)) {
      for (const [x, item] of ipairs(verticalGroups)) {
        if ((item as AnyTable).name) {
          posit[(item as AnyTable).name] = {
            pos: [item[1], item[2]], // All minus one because of TSTL
            idx: [y, x]
          }
        }
      }
    }

    return posit
  }

  let itemNamePositions = FillNamePositions()

  const RegeneratePositions = (data) => {
    cursorPositions = data.cursorPOsitions
    itemNamePositions = FillNamePositions()
  }

  if (GridData.selectionCursor) {
    selectionCursor = GridData.selectionCursor
  }

  type nameOptions = {
    lower: (this: nameOptions) => string
  }

  const isAtOptions = (nameOption: nameOptions) => {
    const choice = cursorPositions[selectionCursor[1]][selectionCursor[2]]
    if (!choice) {
      return false
    }

    if (!choice.name) {
      return false
    }

    return (choice.name as nameOptions).lower() === nameOption.lower()
  }

  const GetPositionFromItemName = (itemName: string) => {
    if (!itemNamePositions[itemName]) {
      lua.ReportScriptError('[UI.Grid]: Could not find position for item ' + itemName)
      return null
    }

    return itemNamePositions[itemName].pos
  }

  const GetIndexFromItemName = (itemName: string) => {
    return itemNamePositions[itemName].idx || null
  }

  const GetPositionFromSkip = (offset: AnyTable) => {
    const checklist = {
      up: function () { return offset[1] === -1},
      down: function () { return offset[1] === 1},
      left: function () { return offset[2] === -1},
      right: function () { return offset[2] === 1}
    }
    let pos = null

    for (const [i, v] of pairs(checklist)) {
      if (v()) {
        pos = i
      }
    }

    if (!pos) {
      return null
    }

    const curItem = cursorPositions[selectionCursor[1]][selectionCursor[2]]

    if (curItem[pos + 'Skip']) {
      return curItem[pos + 'Skip']
    }

    const curGroup = cursorPositions[selectionCursor[1]]

    if (curGroup[pos + 'Skip']) {
      return curGroup[pos + 'Skip']
    }

    return null
  }

  const CheckBoundry = (offset) => {
    const newPositionFromSkip = GetPositionFromSkip(offset)

    if (newPositionFromSkip) {
      if (type(newPositionFromSkip) === 'string') {
        selectionCursor = GetIndexFromItemName(newPositionFromSkip)
      } else {
        selectionCursor = [newPositionFromSkip[1], newPositionFromSkip[2]]
      }
    } else {
      selectionCursor[1] = selectionCursor[1] + offset[1]
      selectionCursor[2] = selectionCursor[2] + offset[2]
    }

    if (selectionCursor === null) {
      Trace('GridSystem: Reached an invalid scroll situation.')
      return;
    }

    const limitY = (cursorPositions as LuaTable).length()

    if (selectionCursor[1] > limitY) {
      selectionCursor[1] = limitY
    }

    if (selectionCursor[1] < 1) {
      selectionCursor[1] = 1
    }

    if (selectionCursor[2] < 1) {
      selectionCursor[2] = 1
    }

    const limitX = (cursorPositions[selectionCursor[1]] as LuaTable).length()

    if (selectionCursor[2] > limitX) {
      selectionCursor[2] = limitX
    }

    return selectionCursor
  }

  const changeCursorPos = (newpos) => {
    selectionCursor = newpos
    return CheckBoundry([0, 0])
  }

  const quad = Def.Quad({
    OnCommand: function (self: Quad) {
      self.diffuse(Alpha(Color.White, 0.25)).xy(cursorPositions[1][1][1], cursorPositions[1][1][2])
      .zoomto(cursorPositions[1][1][3], cursorPositions[1][1][4])
    },
    MoveCursorCommand: function (self: Quad, params) {
      const newPos = cursorPositions[selectionCursor[1]][selectionCursor[2]]
      self.stoptweening().easeoutexpo(0.1).xy(newPos[1], newPos[2]).zoomto(newPos[3], newPos[4]).diffusealpha(newPos[5] || 0.25)
    }
  })

  const debugElements = Def.ActorFrame([
    Def.Text({
      Font: THEME.GetPathF('', 'IBMPlexSans-Medium.ttf'),
      Size: 40,
      Text: 'GridSystem Debug\n(y,x): item index in grid table.',
      InitCommand: function (self: ActorFrame) {
        self.xy(SCREEN_CENTER_X, 38).zoom(0.5)
      }
    })
  ])

  for (const [_, item] of pairs(itemNamePositions)) {
    const [y, x] = [item.idx[1], item.idx[2]]
    const ActorFrameArg = new LuaTable()
    ActorFrameArg.set('InitCommand', function (self: ActorFrame) {
      self.xy(item.pos[1], item.pos[2])
    })
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Quad({
      OnCommand: function (self: Quad) {
        self.zoomto(80, 32).diffuse(Color.Black).diffusealpha(0.75)
      }
    }))
    ActorFrameArg.set(ActorFrameArg.length() + 1, Def.BitmapText({
      Font: 'Common Normal',
      Text: '%d,%d'['format'](y, x),
      InitCommand: function (self: BitmapText) {
        self.diffuse(Color.Orange)
      }
    }))
    debugElements[(debugElements as LuaTable).length() + 1] = Def.ActorFrame(ActorFrameArg)
  }

  return $multi(CheckBoundry, quad, changeCursorPos, selectionCursor, isAtOptions, GetPositionFromItemName, RegeneratePositions, debugElements)
}