interface NetworkServicesManager {
  IsConnectionEstablished:  (this: NetworkServicesManager) => boolean
  MachineLogin:             (this: NetworkServicesManager) => boolean
  ClientLogin:              (this: NetworkServicesManager, pn: PlayerNumber) => boolean
  ScoreLoad:                (this: NetworkServicesManager, scoreID: number, timing: string) => boolean
  ScoreSave:                (this: NetworkServicesManager, pn: PlayerNumber, timing: string) => LuaMultiReturn<[boolean, string]>
  ProfileSave:              (this: NetworkServicesManager, pn: PlayerNumber) => void
  ProfileLoad:              (this: NetworkServicesManager, pn: PlayerNumber) => boolean
  HighScoresFromChartList:  (this: NetworkServicesManager, ChartKeys: any, TimingName: string, fRate: number) => unknown
  HighScoresFromUser:       (this: NetworkServicesManager) => unknown
  HighScoresForChart:       (this: NetworkServicesManager, ChartKey: string, TimingName: string, fRate: number, pn: PlayerNumber) => LuaTable
  Disconnect:               (this: NetworkServicesManager) => void
}

declare const NETMAN : NetworkServicesManager
declare const NetworkServicesManager: NetworkServicesManager