declare interface MessageManager {
  Broadcast:  (this: MessageManager, sMessage: string, paramTable?: AnyTable) => void
  SetLogging: (this: MessageManager, log: boolean) => void
}

declare const MESSAGEMAN: MessageManager
declare const MessageManager: MessageManager