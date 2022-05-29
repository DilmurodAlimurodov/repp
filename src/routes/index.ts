import { Router } from 'express'
import { RouteChild, RouteConf } from '../types/route'
import * as addits from "../controllers/additionals"
const router: Router = Router()

const routes: string[] = ["book", "admin/book"]

routes.forEach((im: string) => {
  const route: RouteConf = require(`./${im}`).default;
  route.routes.forEach((ri: RouteChild) => {
    router[ri.method](route.path + ri.path, [...ri.controllers])
  })
})

router.get('/api/uploads/:filename', addits.getUploadedFile)

export default router
