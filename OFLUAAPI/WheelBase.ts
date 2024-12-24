declare interface WheelBase extends ActorFrame {
  GetCurrentIndex:  (this: WheelBase) =>                    number
  GetNumItems:      (this: WheelBase) =>                    number
  GetSelectedType:  (this: WheelBase) =>                    WheelItemDataType
  GetWheelItem:     (this: WheelBase, iIndex: number) =>    WheelItemBase
  IsLocked:         (this: WheelBase) =>                    boolean
  IsSettled:        (this: WheelBase) =>                    boolean
  Move:             (this: WheelBase, n: number) =>         void
  SetOpenSection:   (this: WheelBase, sSection: string) =>  void
}

declare const WheelBase: WheelBase