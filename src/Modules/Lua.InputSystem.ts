declare type LuaInputSystemModule = (self: Actor) => ((event) => void)
return function(self: Actor) {
  self.eatinput = false
  return function(event) {
    if (!event.PlayerNumber) {
      return;
    }

    if (self.eatinput) {
      return;
    }

    self.pn = event.PlayerNumber
    if (ToEnumShortString(event.type) === 'FirstPress' || ToEnumShortString(event.type) === 'Repeat') {
      self.queuecommand(event.GameButton)
    }

    if (ToEnumShortString(event.type) === 'Release') {
      self.queuecommand(event.GameButton + 'Release')
    }
  }
}