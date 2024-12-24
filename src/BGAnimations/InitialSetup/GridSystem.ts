{
  const [GridData] = [...$vararg]
  let cursorPositions = (GridData as unknown as AnyTable).cursorPositions
  let selectionCursor = (GridData as unknown as AnyTable).initialPosition || [1, 1]

  function FillNamePositions() {
    let posit = {}

    for (const [y, verticalGroups] of ipairs(cursorPositions)) {
      for (const [x, item] of ipairs(verticalGroups)) {
        if ((item as AnyTable).name) {
          posit[(item as AnyTable).name] = {
            pos: [item[1], item[2]],
            idx: [y, x]
          }
        }
      }
    }

    return posit
  }

  let itemNamePositions = FillNamePositions()

  const RegeneratePositions = (data) => {
    cursorPositions = data.cursorPositions
    itemNamePositions = FillNamePositions()
  }

  if ((GridData as unknown as AnyTable).selectionCursor) {
    selectionCursor = (GridData as unknown as AnyTable).selectionCursor
  }

  const isAtOption = (nameOption) => {
    const choice = cursorPositions[selectionCursor[1]][selectionCursor[2]]

    if (!choice) {
      return false
    }

    if (!choice.name) {
      return false
    }

    return (choice.name as string).toLowerCase() === (nameOption as string).toLowerCase()
  }

  const GetPositionFromItemName = (itemName) => {
    return itemNamePositions[itemName].pos || null
  }

  const GetIndexFromItemName = (itemName) => {
    return itemNamePositions[itemName].idx || null
  }

  const GetPositionFromSkip = (offset) => {
    const checklist = {
      up: function () {
        return offset[1] === -1
      },
      down: function () {
        return offset[1] === 1
      },
      left: function () {
        return offset[2] === -1
      },
      right: function () {
        return offset[2] === 1
      }
    }
    let pos = null

    for (const [k, v] of pairs(checklist)) {
      if (v()) {
        pos = k
      }
    }

    if (!pos) {
      return null
    }

    const curItem = cursorPositions[selectionCursor[1]][selectionCursor[2]]

    if (curItem[(pos as string) + 'Skip']) {
      return curItem[(pos as string) + 'Skip']
    }

    const curGroup = cursorPositions[selectionCursor[1]]

    if (curGroup[(pos as string) + 'Skip']) {
      return curGroup[(pos as string) + 'Skip']
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

  const quad: Quad = Def.Quad({
    InitCommand: function (self: Quad) {
      self.diffuse(Alpha(Color.White, 0.25)).xy(cursorPositions[1][1][1], cursorPositions[1][1][2])
    },
    MoveCursorCommand: function (self: Quad, params) {
      const newPos = cursorPositions[selectionCursor[1]][selectionCursor[2]]
      self.stoptweening().easeoutexpo(0.1).xy(newPos[1], newPos[2]).zoomto(newPos[3], newPos[4]).diffusealpha(newPos[5] || 0.25)
    }
  })

  const debugElements: ActorFrame = Def.ActorFrame([
    Def.Text({
      Font: THEME.GetPathF('', 'IBMPlexSans-Medium.ttf'),
      Size: 40,
      Text: 'GridSystem Debug\n(y,x): item index in grid table.',
      InitCommand: function (self: Text) {
        self.xy(SCREEN_CENTER_X, 38).zoom(0.5)
      }
    })
  ])

  for (const [_, item] of pairs(itemNamePositions)) {
    const [y, x] = [(item as unknown as any).idx[1], (item as unknown as any).idx[2]]
    const actorFrameArg = new LuaTable()
    actorFrameArg.set('InitCommand', function (self: ActorFrame) {
      self.xy((item as unknown as any).pos[1], (item as unknown as any).pos[2])
    })
    actorFrameArg.set(actorFrameArg.length() + 1, Def.Quad({OnCommand: function (self: Quad) {
      self.zoomto(80, 32).diffuse(Color.Black).diffusealpha(0.75)
    }}))
    type tstlIsABitchSometimes = {
      format: (this: ThisParameterType<string>, arg1: string, arg2: string) => string
    }
    actorFrameArg.set(actorFrameArg.length() + 1, Def.BitmapText({
      Font: 'Common Normal',
      Text: ('%d,%d' as unknown as tstlIsABitchSometimes).format(y, x),
      InitCommand: function (self: Text) {
        self.diffuse(Color.Orange)
      }
    }))
    debugElements.set(debugElements.length() + 1, Def.ActorFrame(actorFrameArg))
  }

  return $multi(CheckBoundry, quad, changeCursorPos, selectionCursor, isAtOptions, GetPositionFromItemName, RegeneratePositions, debugElements)
}