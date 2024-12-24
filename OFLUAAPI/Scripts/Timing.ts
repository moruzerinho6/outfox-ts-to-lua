declare const TimingWindow: {
  [e in number]: {
    Name: string,
    Timings: {
      [t in string]: number
    } | ((baseDiff: any) => {
      [f in string]: number
    }),
    Scoring?: {
      [t in string]: number
    },
    Percent?: {
      [t in string]: number
    },
    Shared?: {
      [t in string]: number
    },
    Life?: {
      [t in string]: number
    }
  }
}

declare const TimingModes: {
  [mode in string]: string  
}
declare const GetWindowSeconds: (TimingWindow, Scale, JudgeScale) => number
declare const TimingOrder: (TimTab: any) => AnyTable