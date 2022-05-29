import multer from 'multer'
import { Request } from 'express'
import path from 'path'

const storage = multer.diskStorage({
  destination: async (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
    cb(null, path.join(__dirname, '..', '/uploads'))
  },
  filename: (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}__${file.originalname.replace(/\s/g, '_')}`)
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
  let ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed!'))
  }
  cb(null, true)
}

export default multer({ 
  storage, 
  fileFilter, 
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
})