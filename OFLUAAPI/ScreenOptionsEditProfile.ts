declare interface ScreenOptionsEditProfile extends ScreenWithMenuElements {
  DeleteProfile:          (this: ScreenOptionsEditProfile) => void
  LinkAccountToOnline:    (this: ScreenOptionsEditProfile) => void
  RenameProfile:          (this: ScreenOptionsEditProfile) => void
  RequestTokenForOnline:  (this: ScreenOptionsEditProfile) => void
}

declare const ScreenOptionsEditProfile: ScreenOptionsEditProfile