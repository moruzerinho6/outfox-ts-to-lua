declare interface RageFile {
  AtEOF:      (this: RageFile) =>                                     boolean
  ClearError: (this: RageFile) =>                                     void
  Close:      (this: RageFile) =>                                     void
  destroy:    (this: RageFile) =>                                     void
  Flush:      (this: RageFile) =>                                     void
  GetError:   (this: RageFile) =>                                     string
  GetLine:    (this: RageFile) =>                                     string
  Open:       (this: RageFile, sPath: string, iAccessType: number) => boolean
  PutLine:    (this: RageFile, s: string) =>                          number
  Read:       (this: RageFile) =>                                     string
  ReadBytes:  (this: RageFile, length: number) =>                     string
  Seek:       (this: RageFile, position: number) =>                   number
  Tell:       (this: RageFile) =>                                     number
  Write:      (this: RageFile, str: string) =>                        number
}

declare const RageFile: RageFile