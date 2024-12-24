{
  let isNowHolding = false
  let MouseDetect: {
    ProcessCoords: (this: Actor, self: Actor, param?) => void,
    VerifyCollision: (this: Actor, arg1?: any, param?) => boolean
  }
  //@ts-ignore
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
      _NAME: 'UI.HoldClickArea'
    },
    {
      __call: function (this, Attr) {
        if (type(Attr) !== 'table') {
          lua.ReportScriptError('[' + this._NAME + '] This is not a table! Returning empty actor.')
          return Def.Actor({})
        }

        let curparent;
        let ActorFrameArg = new LuaTable()

        ActorFrameArg.set('OnCommand', function (self: ActorFrame) {
          curparent = self
          while ((curparent as ActorFrame).GetParent() !== null) {
            curparent = (curparent as ActorFrame).GetParent()
          }

          if (Attr.Position) {
            Attr.Position(self)
          }

          self.ActorFrameToReturn = Attr.ReturnADjacentActorFrame ? self.GetParent() : self

          MouseDetect = LoadModule('UI/UI.MouseDetect.lua')(self, true)
          // @ts-ignore
          MouseDetect.ProcessCoords(self.GetChild('Detection'))

          self.SetUpdateFunction(function (self: ActorFrame, deltaTime) {
            if (!isNowHolding) {
              return;
            }

            if (SCREENMAN.GetTopScreen() !== curparent) {
              return;
            }

            if (!Attr.Cache) {
              // @ts-ignore
              MouseDetect.ProcessCoords(self.GetChild('Detection'))
            }

            self.playcommand('Action', { delta: deltaTime })
          })
        })

        ActorFrameArg.set('MouseLeftClickMessageCommand', function (self: ActorFrame, param) {
          self.playcommand('CheckClickOrPress', param)
        })

        ActorFrameArg.set('FingerPressMessageCommand', function (self: ActorFrame, param) {
          self.playcommand('CheckClickOrPress', param)
        })

        ActorFrameArg.set('CheckClickOrPress', function (self: ActorFrame, param) {
          if (param.IsPressed) {
            // @ts-ignore
            if (MouseDetect.VerifyCollision()) {
              isNowHolding = true
            }
          } else {
            isNowHolding = false
            if (Attr.ActionUnclick) {
              Attr.ActionUnclick(self.ActorFrameToReturn)
              return;
            }
          }
        })

        ActorFrameArg.set('ActionCommand', function (self: ActorFrame, param) {
          // @ts-ignore
          if (MouseDetect.VerifyCollision(isNowHolding)) {
            if (Attr.Action && !self.eatinput) {
              Attr.Action(self.ActorFrameToReturn, param)
            }
          } else {
            if (Attr.ActionUnclick) {
              Attr.ActionUnclick(self.ActorFrameToReturn, param)
              return;
            }
          }
        })

        ActorFrameArg.set(ActorFrameArg.length() + 1, Def.Quad({
          Name: 'Detection',
          InitCommand: function (self: Quad) {
            self.visible((Attr.Debug as boolean) || false).diffusealpha(0.1).zoomto((Attr.Width as number) || 64, (Attr.Height as number) || 64)
          }
        }))

        return Def.ActorFrame(ActorFrameArg)
      }
    }
  )
}