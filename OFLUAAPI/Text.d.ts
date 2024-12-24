declare interface Text extends Actor<Text> {
  StrokeActor: (this: Text) => Text
}

declare const Text: Text