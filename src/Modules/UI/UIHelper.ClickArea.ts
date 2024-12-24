declare interface UIHelperClickArea {
  AddArea: (self: Actor, area: any) => void
  InstallListener: (this: UIHelperClickArea) => ActorFrame
}

{
  const MouseDetect = LoadModule('UI/UI.MouseDetect.lua')

  //@ts-ignore
  return setmetatable({
    _LICENSE: `
    Copyright 2021-2022 Jose Varela, Project OutFox
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
      http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    `,
    _NAME: 'UI.ClickArea',
    areas: {},
    Attr: {},
    AddArea: function (self, area) {
      const actor: Actor = Def.Actor({
        InitCommand: function (self: Actor) {
          self.Width = area.Width
          self.Height = area.Height
          self.name = area.Name
          self.zoomto(self.Width, self.Height)

          if (area.Position) {
            area.Position(self)
          }

          self.Action = area.Action
        }
      })

      self.areas[(self.areas as LuaTable).length() + 1] = actor
      return self
    },
    InstallListener: function (this) {
      let curparent;

      return Def.ActorFrame({
        children: this.areas,
        OnCommand: function (self: ActorFrame) {
          curparent = self
          while ((curparent as Actor).GetParent() !== null) {
            curparent = (curparent as Actor).GetParent()
          }

          self.ActorFrameToReturn = this.Attr.ReturnAdjacentActorFrame ? self.GetParent() : self
        },
        CheckClickOrPressCommand: function (self: ActorFrame, params) {
          if (SCREENMAN.GetTopScreen().IsTransitioning()) {
            return
          }

          if (SCREENMAN.GetTopScreen() !== curparent) {
            return
          }

          if (!params.IsPressed) {
            return
          }

          const c = self.GetChildren()['']
          let achievedAction = false

          for (const i of $range((c as LuaTable).length(), 1, -1)) {
            const v = self.GetChildren()[''][i]

            if (MouseDetect(v)) {
              if (v.Action) {
                v.Action(self.ActorFrameToReturn)
              }

              achievedAction = true
              break
            }
          }

          if (!achievedAction && this.Attr.UnclickAction) {
            this.Attr.UnclickAction(self)
          }
        },
        MouseLeftClickMessageCommand: function (self: ActorFrame, param) {
          self.playcommand('CheckClickOrPress', param)
        }
      })
    }
  }, {
    __call: function (self, attributes) {
      if (attributes) {
        self.Attr = attributes
      }

      return self
    }
  })
}