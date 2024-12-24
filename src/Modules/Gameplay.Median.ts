return function (player, offsetInfo: LuaTable<string, LuaTable<number, AnyTable>>, dimensions: LuaTable<number, number>, isOnlineData?: boolean) {
  const JudgNames = LoadModule('Options.SmartTapNoteScore.lua')()
  table.sort(JudgNames)

  const [LowestWindow, HighestWindow] = LoadModule<LuaMultiReturn<[any, any]>>('Gameplay.TimingMargins.lua')()
  const n: any = LoadModule('Options.ReturnCurrentTiming.lua')()
  let worst_timing_window = 0
  let worst_timing_window_name: string;
  const TimingWindowByValue = (time, notcheck?) => {
    for (const [k, v] of pairs(JudgNames)) {
      if (math.abs(time) <= n.Timings['TapNoteScore_' + (v as string)]) {
        return v
      }
    }
    return 'W5'
  }

  const offsets = new LuaTable()
  let val: number;

  if (!isOnlineData) {
    for (const t of ivalues<LuaTable>(offsetInfo)) {
      if (type(t.get(2)) === 'number') {
        val = t.get(2)

        if (val) {
          val = (math.floor(val * 1000))/1000

          if (!offsets.has(val)) {
            offsets.set(val, 1)
          } else {
            offsets.set(val, offsets.get(val) + 1)
          }
        }

        const absval = math.round(math.abs(t.get(2)), 3)

        if (absval >= worst_timing_window) {
          worst_timing_window = absval
        }
      }
    }
  } else {
    for (const t of ivalues<LuaTable & AnyTable>(offsetInfo)) {
      if (type(t.offset) === 'number') {
        val = t.offset

        if (val) {
          val = (math.floor(val * 1000))/1000

          if (!offsets.has(val)) {
            offsets.set(val, 1)
          } else {
            offsets.set(val, offsets.get(val) + 1)
          }
        }

        const absval = math.round(math.abs(t.offset), 3)
        if (absval >= worst_timing_window) {
          worst_timing_window = absval
        }
      }
    }
  }

  worst_timing_window_name = TimingWindowByValue(worst_timing_window, true)
  worst_timing_window = n.Timings['TapNoteScore_' + worst_timing_window_name]

  let worst_offset = 0

  for (const [offset, count] of pairs(offsets)) {
    if (math.abs(offset) > worst_offset) {
      worst_offset = math.abs(offset)
    }
  }

  const smooth_offsets = new LuaTable()
  const ScaleFactor = [ 0.045, 0.090, 0.180, 0.370, 0.180, 0.090, 0.045 ]

  let y, index;
  for (let offset of $range(-worst_timing_window, worst_timing_window, 0.001)) {
    offset = math.round(offset, 3)
    y = 0

    for (let j of $range(-3, 3)) {
      index = clamp(offset + (j*0.001), -worst_timing_window, worst_timing_window)
      index = math.round(index, 3)

      if (offsets.has(index)) {
        y += offsets[index] * ScaleFactor[j + 3] // 3 because tstl compile will add +1
      }
    }

    smooth_offsets.set(offset, y)
  }

  let mode_offset = 0

  let median_offset = 0

  let highest_offset_count = 0

  let sum_timing_error = 0
  let avg_timing_error = 0

  for (const [k, v] of pairs(offsets)) {
    if (v> highest_offset_count) {
      highest_offset_count = v
      mode_offset = math.round(k, 3)
    }
  }

  const list = new LuaTable()

  for (let offset of $range(-worst_timing_window, worst_timing_window, 0.001)) {
    offset = math.round(offset,3)

    if (offsets.has(offset)) {
      for (let i of $range(1, offsets.get(offset))) {
        list.set(list.length() + 1, offset)
      }
    }
  }

  if (list.length() > 0) {
    if (list.length() % 2 === 1) {
      median_offset = list.get(math.ceil(list.length() / 2))
    } else {
      median_offset = (list.get(list.length() / 2) + list.get(list.length() / 2 + 1)) / 2
    }

    for (let i of $range(1, list.length())) {
      sum_timing_error = sum_timing_error + math.abs(list.get(i))
    }

    avg_timing_error = math.round(sum_timing_error / list.length(), 3)
  }

  const verts = new LuaTable()

  const pane_width = dimensions[1]
  const pane_height = dimensions[2]

  const total_width = worst_timing_window * 2 * 1000 + 1
  const w = pane_width / total_width
  let x, c;
  let i = 1

  for (let offset of $range(-worst_timing_window, worst_timing_window, 0.001)) {
    offset = math.round(offset, 3)
    x = i * w
    y = smooth_offsets.get(offset) || 0

    if (math.abs(offset) <= worst_offset) {
      y = -1 * scale(y, 0, highest_offset_count, 0, pane_height)
      const tm = TimingWindowByValue(offset)
      c = JudgmentLineToColor('JudgmentLine_' + tm)

      verts.set(verts.length() + 1, [[x, 0, 0], c])
      verts.set(verts.length() + 1, [[x, y, 0], c])
    }

    i = i + 1
  }

  const returnTable = new LuaTable()
  returnTable.set('TimingList', [JudgNames, n.Timings])
  returnTable.set('HighWindow', HighestWindow)
  returnTable.set('LowWindow', LowestWindow)
  returnTable.set('WorstOffset', worst_offset)
  returnTable.set('WorstTimingWindow', worst_timing_window)
  returnTable.set('WorstTimingWindowName', worst_timing_window_name)
  returnTable.set('Vertex', verts)
  returnTable.set(returnTable.length() + 1, avg_timing_error * 1000)
  returnTable.set(returnTable.length() + 1, median_offset * 1000)
  returnTable.set(returnTable.length() + 1, mode_offset * 1000)
  rec_print_table(returnTable.Vertex)
  return returnTable
  // TODO: This file is tiresome
}