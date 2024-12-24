{
  interface Attr {
    Debug?: boolean
    Width?: number
    Height?: number
    ReturnAdjacentActorFrame?: boolean
    Active?: () => boolean
    Position?: (self: Actor) => void
    Action?: (self: Actor, params?) => void
    ActionUnclick?: (self: Actor, params?) => void
    ActionIsAfterLifting?: boolean
    UseTweenTime?: boolean
  }
  let MouseDetect: {
    ProcessCoords: (this: Actor, self: Actor, param?) => void,
    VerifyCollision: (this: Actor, arg1: any, param?) => boolean
  }
  // @ts-ignore
  return setmetatable(
    {
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
      _NAME: 'UI.ClickArea'
    },
    {
      __call: function (this, Attr: Attr) {
        if (type(Attr) !== 'table') {
          lua.ReportScriptError('[' + this._NAME + '] This is not a table! Returning empty actor.')
          return Def.Actor({})
        }

        let curparent;
        return (Attr.Debug ? Def.Quad : Def.Actor)({
          OnCommand: function (self: Quad) {
            self.zoomto(Attr.Width || 64, Attr.Height || 64).diffusealpha(0.2)
            curparent = self
            while ((curparent as Quad).GetParent() !== null) {
              curparent = (curparent as Quad).GetParent()
            }

            self.ActorFrameToReturn = self

            if (Attr.ReturnAdjacentActorFrame) {
              self.ActorFrameToReturn = self.GetParent()
            }

            if (Attr.Position) {
              Attr.Position(self)
            }

            MouseDetect = LoadModule('UI/UI.MouseDetect.lua')(self, true)
            // @ts-ignore
            MouseDetect.ProcessCoords(self, Attr.UseTweenTime)
          },
          CheckClickOrPressCommand: function (self: Quad, params) {
            if (SCREENMAN.GetTopScreen().IsTransitioning()) {
              return
            }

            if (Attr.Active) {
              if (!Attr.Active()) {
                return;
              }
            }

            if (!ScreenAttract.Cache && MouseDetect) {
              // @ts-ignore
              MouseDetect.ProcessCoords(self)
            }
            self.playcommand('Action', {
              State: params.IsPressed,
              Touch: params.Touch !== null
            })
          },
          MouseLeftClickMessageCommand: function (self: Actor, param) {
            self.playcommand('CheckClickOrPress', param)
          },
          FingerPressMessageCommand: function (self: Actor, param) {
            param.Touch = true
            self.playcommand('Action', param)
          },
          ActionCommand: function (self: Actor, params) {
            if (SCREENMAN.GetTopScreen() !== curparent) {
              return
            }

            // @ts-ignore
            if (MouseDetect.VerifyCollision(null, params.Touch)) {
              if (Attr.Action && ((params.State && !Attr.ActionIsAfterLifting && !self.eatinput) || (Attr.ActionIsAfterLifting && !params.State))) {
                Attr.Action(self.ActorFrameToReturn)
              }
            } else {
              if (Attr.ActionUnclick) {
                Attr.ActionUnclick(self.ActorFrameToReturn)
              }
            }
          }
        })
      }
    }
  )
}