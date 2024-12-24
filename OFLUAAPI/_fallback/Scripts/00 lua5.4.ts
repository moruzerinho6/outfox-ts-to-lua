declare namespace math {
  const pow: (x: number, y: number) => number
  const ldexp: (x: number, exp: number) => number
  const mod: typeof math.fmod
  const atan2: typeof math.atan
  const log10: (x: number) => number
  const cosh: (x: number) => number
  const sinh: (x: number) => number
  const tanh: (x: number) => number
}

declare namespace string {
  const gfind: typeof string.gmatch
}

declare const loadstring: typeof load
declare const unpack: typeof table.unpack

declare namespace table {
  const getn: (t: AnyTable) => number
}

declare const setfenv: (f: any, t: AnyTable) => any
declare const getfenv: (f: any) => any