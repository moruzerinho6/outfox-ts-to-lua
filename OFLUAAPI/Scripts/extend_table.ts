declare namespace string {
  const split: (self: any, sSeparator: string, nMax: number, bRegexp: boolean) => AnyTable
}

declare namespace table {
  const join: typeof table.concat
  const push: (self: any, ...args: any[]) => void
}