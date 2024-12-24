declare interface ChartDensityModule extends LuaTable {
  Data: LuaTable
  PlayerAssigned: PlayerNumber | null
  Clear:            (this: ChartDensityModule) => void
  GenerateData:     (this: ChartDensityModule, ForceData: boolean) => void
  GetCurrentData:   (this: ChartDensityModule) => any
  GetDataFromIndex: (this: ChartDensityModule, index: number) => any
  ObtainSongInformation: (this: ChartDensityModule, Steps: Steps, Song?: Song) => {
    Density: number[];
    StreamMeasures: number[];
    PeakNPS: number;
    MeasureCount: number;
    AverageNPS: number;
  },
  GetStreamSequenceForIndex: (this: ChartDensityModule, index: number, measureSequenceThreshold: number) => any[]
  GetStreamBreakDownForIndex: (this: ChartDensityModule, index: number, threshold: number) => string
  GetStreams: (this: ChartDensityModule, index: number, threshold: number) => []
}

{
  const t: ChartDensityModule = new LuaTable()

  t.set('Data', new LuaTable())
  t.set('PlayerAssigned', null)
  t.set('__call', function(this: ChartDensityModule, pn: PlayerNumber) {
    this.PlayerAssigned = pn
    return this
  })
  t.set('Clear', function(this: ChartDensityModule) {
    this.Data = new LuaTable()
  })
  t.set('GenerateData', function(this: ChartDensityModule, ForceData?: Steps) {
    if (!this.PlayerAssigned) {
      return;
    }

    if (GAMESTATE.IsCourseMode()) {
      const course = GAMESTATE.GetCurrentCourse()

      if (course) {
        const UserTrail = GAMESTATE.GetCurrentTrail(this.PlayerAssigned)

        if (UserTrail) {
          const stats = STATSMAN.GetCurStageStats()

          if (!stats) {
            return;
          }

          const mpStats = stats.GetPlayerStageStats(GAMESTATE.GetMasterPlayerNumber())

          if (GAMESTATE.GetPlayMode() === 'PlayMode_Endless') {
            if (this.Data.length() > 0) {
              return;
            }

            for (const [ind, trail] of pairs(UserTrail.GetTrailEntries())) {
              this.Data[ind] = this.ObtainSongInformation(trail.GetSteps(), trail.GetSong())
            }
            return;
          } else {
            const CurrentIndex = mpStats.GetSongsPassed()
            const trail = UserTrail.GetTrailEntry(CurrentIndex)
            this.Data[1] = this.ObtainSongInformation(trail.GetSteps(), trail.GetSong())
            return;
          }
        }
      }
    }

    let UserSteps: boolean | Steps = GAMESTATE.GetCurrentSteps(this.PlayerAssigned)

    if (ForceData) {
      UserSteps = ForceData
    }

    if (UserSteps) {
      this.Data[1] = this.ObtainSongInformation(UserSteps)
    }
  })
  t.set('GetCurrentData', function(this: ChartDensityModule) {
    if (!this.PlayerAssigned) {
      return;
    }

    const stats = STATSMAN.GetCurStageStats()

    if (!stats) {
      return;
    }

    const mpStats = stats.GetPlayerStageStats(this.PlayerAssigned || GAMESTATE.GetMasterPlayerNumber())

    return this.GetDataFromIndex(mpStats.GetSongsPassed() + 1)
  })
  t.set('GetDataFromIndex', function(itself: ChartDensityModule, index: number) {
    if (!itself.PlayerAssigned) {
      return;
    }

    if (type(index) !== 'number') {
      error('Value is not a number, must be a index.')
    }

    if (index < 1) {
      Trace('GetDataFromIndex: Returning 1st value.')
      return itself.Data[1]
    }

    if (index > itself.Data.length()) {
      Trace('GetDataFromIndex: Returning last value (' + itself.Data.length() + ').')
      return itself.Data[1]
    }

    return itself.Data[index]
  })
  t.set('ObtainSongInformation', function(this: ChartDensityModule, Steps: Steps, Song?: Song) {
    if (!this.PlayerAssigned) {
      return;
    }

    if (!Steps) {
      return;
    }

    const usesong = Song || GAMESTATE.GetCurrentSong()

    if (!usesong) {
      return;
    }

    const n = {
      Density: Steps.GenerateDensityDataForSteps(),
      StreamMeasures: Steps.GenerateStreamMeasures(),
      PeakNPS: Steps.GetMaxNPS(),
      MeasureCount: Steps.GetNumDensityMeasures(),
      AverageNPS: 0
    }

    let avgNPS = 0
    let c = 0

    for (const [k, v] of ipairs(n.Density)) {
      if (v !== 0) {
        avgNPS = avgNPS + v
        c = c + 1
      }
    }
    avgNPS = avgNPS / c

    n.AverageNPS = avgNPS

    return n
  })
  t.set('GetStreamSequenceForIndex', function(this: ChartDensityModule, index: number, measureSequenceThreshold: number) {
    const nindex = index || 1

    if (!this.Data[nindex]) {
      return;
    }

    const streamMeasures: LuaTable<number> = this.Data[nindex].StreamMeasures
    const streamSequences = []

    let counter = 1
    let streamEnd = null

    if (streamMeasures.length() > 0) {
      const breakStart = 0
      const [k, v] = next(streamMeasures)
      const breakEnd = streamMeasures[k] - 1

      if (breakEnd - breakStart >= measureSequenceThreshold) {
        table.insert(streamSequences, {
          'streamStart': breakStart,
          'streamEnd': breakEnd,
          'isBreak': true
        })
      }
    }

    for (const [k, v] of pairs(streamMeasures)) {
      const curVal = streamMeasures[k]
      const nextVal = streamMeasures[k + 1] ? streamMeasures[k + 1] : -1

      if (curVal + 1 === nextVal) {
        counter = counter + 1
        streamEnd = curVal + 1
      } else {
        if (counter >= measureSequenceThreshold) {
          const streamStart = (streamEnd - counter)

          table.insert(streamSequences, {
            'streamStart' : streamStart,
            'streamEnd': streamEnd,
            'isBreak': false
          })
        }

        const breakStart = curVal
        const breakEnd = (nextVal !== -1) ? nextVal - 1 : this.Data[nindex].MeasureCount

        if (breakEnd - breakStart >= measureSequenceThreshold) {
          table.insert(streamSequences, {
            'streamStart': breakStart,
            'streamEnd': breakEnd,
            'isBreak': true
          })
        }
        counter = 1
      }
    }

    return streamSequences
  })
  t.set('GetStreamBreakDownForIndex', function(this: ChartDensityModule, index: number, threshold: number) {
    return table.concat(this.GetStreams(index, threshold), '/')
  })
  t.set('GetStreams', function(this: ChartDensityModule, index: number, threshold: number) {
    const streams = this.GetStreamSequenceForIndex(index, threshold || 2)

    if (!streams) {
      return ''
    }

    const streamLengths = new LuaTable()

    for (const [i, stream] of ipairs(streams)) {
      const streamCount = tostring(stream.streamEnd - stream.streamStart)

      if (!stream.isBreak) {
        streamLengths[streamLengths.length() + 1] = streamCount
      }
    }

    return streamLengths
  })

  return setmetatable(t, t)
}