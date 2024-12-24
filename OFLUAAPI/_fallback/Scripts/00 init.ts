declare const Trace: (string: string) => void
declare const Warn: (string: string) => void
declare const MersenneTwister: {
  Random: number,
  Seed: number
}
declare const PLAYER_1: string
declare const PLAYER_2: string
declare const NUM_PLAYERS: number
declare const OtherPlayer: {
  [k in string]: string
}

declare namespace string {
  const find_last: (text: string) => number
}

declare namespace math {
  const round: (n: number) => number
}

declare const split: (delimiter: number, text: string) => AnyTable
declare const join: (delimiter: any, list: any) => AnyTable

interface ArrowEffectsInterface {
  Update: any
  GetYOffset: number
  GetYPos: number
  GetYOffsetFromYPos: number
  GetXPos: number
  GetZPos: number
  GetRotationX: number
  GetRotationY: number
  GetRotationZ: number
  ReceptorGetRotationZ: number
  GetAlpha: number
  GetGlow: number
  GetBrightness: number
  NeedZBuffer: number
  GetZoom: number
  GetFrameWidthScale: number
}

declare const ArrowEffects: ArrowEffectsInterface