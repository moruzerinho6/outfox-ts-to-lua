declare interface CubicSplineN {
  destroy:                    (this: CubicSplineN) => void
  empty:                      (this: CubicSplineN) => boolean
  evaluate:                   (this: CubicSplineN, t: number) => LuaTable
  evalate_derivative:         (this: CubicSplineN, t: number) => LuaTable
  evaluate_second_derivative: (this: CubicSplineN, t: number) => LuaTable
  evaluate_third_derivative:  (this: CubicSplineN, t: number) => LuaTable
  get_coefficients:           (this: CubicSplineN, i: number) => LuaTable
  get_dimension:              (this: CubicSplineN) => number
  get_dirty:                  (this: CubicSplineN) => boolean
  get_loop:                   (this: CubicSplineN) => boolean
  get_max_t:                  (this: CubicSplineN) => number
  get_polygonal:              (this: CubicSplineN) => boolean
  get_size:                   (this: CubicSplineN) => number
  get_spatial_extent:         (this: CubicSplineN, d: number) => number
  set_coefficients:           (this: CubicSplineN, i: number, b: LuaTable, c: LuaTable, d: LuaTable) => void
  set_dimension:              (this: CubicSplineN, d: number) => void
  set_dirty:                  (this: CubicSplineN) => void
  set_loop:                   (this: CubicSplineN) => void
  set_point:                  (this: CubicSplineN, i: number, p: LuaTable) => void
  set_polygonal:              (this: CubicSplineN) => void
  set_size:                   (this: CubicSplineN, s: number) => void
  set_spatial_extent:         (this: CubicSplineN, d: number, e: number) => void
  solve:                      (this: CubicSplineN) => void
}

declare const CubicSplineN: CubicSplineN