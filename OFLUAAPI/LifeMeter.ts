declare interface LifeMeter extends ActorFrame {
  GetLife: () => number
  IsFailing: () => boolean
  IsHot: () => boolean
  IsInDanger: () => boolean
}

declare const LifeMeter: LifeMeter