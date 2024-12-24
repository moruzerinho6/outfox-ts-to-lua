declare interface ScreenPlayerOptions extends ScreenOptions {
  GetGoToOptions: (this: ScreenPlayerOptions) => boolean
}

declare const ScreenPlayerOptions: ScreenPlayerOptions