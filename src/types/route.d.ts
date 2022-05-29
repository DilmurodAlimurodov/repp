export type Methods = "get" | "post" | "put" | "delete"

export interface RouteChild {
  path: string
  method: Methods
  controllers: FunctionStringCallback[]
}

export interface RouteConf {
  routes: RouteChild[]
  path: string
  defaultMethod?: Methods
}