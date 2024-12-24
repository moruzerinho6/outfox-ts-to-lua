declare interface ActorScroller extends ActorFrame {
  GetCurrentItem: () => number
  GetDestinationItem: () => number
  GetFullScrollLengthSeconds: () => number
  GetNumItems: () => number
  GetSecondsPauseBetweenItems: () => number
  GetSecondsToDestination: () => number
  // getsecondstodestination: () => number // [01 alias.lua]
  PositionItems: () => void
  ScrollThroughAllItems: () => void
  // scrollthroughallitems: () => void // [01 alias.lua]
  ScrollWithPadding: (fItemPaddingStart: number, fItemPaddingEnd: number) => void
  // ^ [01 alias.lua]
  SetCurrentAndDestinationItem: (fItemIndex: number) => void
  SetDestinationItem: (fItemIndex: number) => void
  SetFastCatchup: (bOn: boolean) => void
  // setfastcatchup
  SetLoop: (bLoop: boolean) => void
  SetMask: (fWidth: number, fHeight: number) => void
  SetNumItemsToDraw: (fNumItems: number) => void
  SetNumSubdivisions: (iNumSubdivisions: number) => void
  // ^
  SetPauseCountdownSeconds: (fSecs: number) => void
  SetSecondsPauseBetweenItems: (fSeconds: number) => void
  SetSecondsPerItem: (fSeconds: number) => void
  // ^
  SetTransformFromFunction: (ScrollerFunction: any /*LuaReference*/) => void
  SetTransformFromHeight: (fItemHeight: number) => void
  SetTransformFromWidth: (fItemWidth: number) => void
  SetWrap: (bLoop: boolean) => void
}

declare const ActorScroller: ActorScroller