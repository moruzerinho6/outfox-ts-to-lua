declare interface ActorProxy extends Actor<ActorProxy> {
  GetTarget: (this: ActorProxy) => Actor<ActorProxy>
  SetTarget: (this: ActorProxy, a: Actor) => ActorProxy
}
declare const ActorProxy: ActorProxy
