declare const ivalues: <T = undefined>(t: AnyTable) => T extends undefined ?LuaIterable<any> : LuaIterable<T>
declare const Var: (...s: any[]) => any