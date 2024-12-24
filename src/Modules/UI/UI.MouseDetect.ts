declare interface UIMouseDetect {
  startlimitx: number
  endlimitx: number
  startlimity: number
  endlimity: number
  isValidToClick: boolean
  ProcessCoords: (this: UIMouseDetect, self: Actor, useTweenTime?: boolean) => void
  VerifyCollision: (this: UIMouseDetect, requiresHold?: boolean, isTouchInput?: boolean) => boolean
}

{
  const t = {
    startlimitx: 0,
    endlimitx: 0,
    startlimity: 0,
    endlimity: 0,
    isValidToClick: true,
    ProcessCoords: function (this: UIMouseDetect, self: Actor, useTweenTime: boolean) {
      const canUseAbsolute = self.GetAbsoluteDestX
      let sumx = self.GetDestX()
      let sumy = self.GetDestY()
      let curparent = self

      this.isValidToClick = true

      while (curparent.GetParent() !== null) {
        curparent = curparent.GetParent()

        if (!canUseAbsolute) {
          sumx = sumx + curparent.GetDestX()
          sumy = sumy + curparent.GetDestY()
        }

        if (curparent.GetZoom() === 0) {
          this.isValidToClick = false
        }

        if (!curparent.GetVisible()) {
          this.isValidToClick = false
        }

        if (curparent.GetDiffuseAlpha() < 0.5) {
          this.isValidToClick = false
        }

        if (useTweenTime) {
          if (curparent.GetTweenTimeLeft() > 0) {
            this.isValidToClick = false
          }
        }
      }

      if (canUseAbsolute) {
        sumx = self.GetAbsoluteDestX()
        sumy = self.GetAbsoluteDestY()
      }

      this.startlimitx = sumx - (self.GetZoomedWidth() * self.GetHAlign())
      this.endlimitx = sumx + (self.GetZoomedWidth() * (1 - self.GetHAlign()))
      this.startlimity = sumy - (self.GetZoomedHeight() * self.GetVAlign())
      this.endlimity = sumy + (self.GetZoomedHeight() * (1 - self.GetVAlign()))
    },
    VerifyCollision: function (this: UIMouseDetect, requiresHold: boolean, isTouchInput: boolean) {
      if (!this.isValidToClick) {
        return false
      }

      let coords = {
        x: INPUTFILTER.GetMouseX(),
        y: INPUTFILTER.GetMouseY()
      }

      if (isTouchInput) {
        coords = {
          x: INPUTFILTER.GetTouchX(),
          y: INPUTFILTER.GetTouchY()
        }
      }

      if ((coords.x > this.startlimitx && coords.x < this.endlimitx) || requiresHold) {
        if ((coords.y > this.startlimity && coords.y < this.endlimity) || requiresHold) {
          return true
        }
      }

      return false
    },
    __call: function (this: UIMouseDetect, self: Actor, CacheInformation) {
      if (!CacheInformation) {
        this.ProcessCoords(self)
        this.VerifyCollision()
      }

      return this
    }
  }

  // @ts-ignore
  return setmetatable(t, t)
}