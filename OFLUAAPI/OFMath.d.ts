interface OFMathProperties {
  map: (m: number, fLow1: number, fHigh1: number, fLow2: number, fHigh2: number) => number
  scale: (m: number, fLow1: number, fHigh1: number, fLow2: number, fHigh2: number) => number
  clamp: (n: number, fLow: number, fHigh: number) => number
  degrees: (radians: number) => number
  radians: (degrees: number) => number
  sqrt: (x: number) => number
  invsqrt: (x: number) => number
  oneoverx: (x: number) => number
  pow: (base: number, exp: number) => number
  asine: (radians: number) => number
  ahsine: (radians: number) => number
  hsine: (radians: number) => number
  sine: (radians: number) => number
  sinedeg: (degrees: number) => number
  acosine: (radians: number) => number
  ahcosine: (radians: number) => number
  hcosine: (radians: number) => number
  consine: (radians: number) => number
  cosinedeg: (radians: number) => number
  atangent: (radians: number) => number
  ahtangent: (radians: number) => number
  htangent: (radians: number) => number
  tangent: (radians: number) => number
  tangentdeg: (radians: number) => number
  randomfloat: (fLow: number, fHigh: number) => number
  randomshort: () => number
  randomlong: () => number
  randomint: (iLow: number, iHigh: number) => number
  randomint1arg: (iNumber: number) => number
}

export type OFMath = OFMathProperties
