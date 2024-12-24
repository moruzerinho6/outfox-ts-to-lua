declare const StepManiaCredits: {
  AddSection: (section: any, pos: any, insert_before: boolean) => void
  AddLineToScroller: (scroller: any, text: string, command: any) => void
  Get: () => AnyTable
  RandomCopyrightMessage: () => { name: string }
  SetLineHeight: (height: number) => void
}