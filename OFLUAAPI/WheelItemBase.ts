declare interface WheelItemBase extends ActorFrame {
  GetColor: (this: WheelItemBase) => RageColor
  GetText:  (this: WheelItemBase) => string
  GetType:  (this: WheelItemBase) => WheelItemDataType
  IsLoaded: (this: WheelItemBase) => boolean
}

declare const WheelItemBase: WheelItemBase