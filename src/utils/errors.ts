import { Response } from "express"

export const serverError = (err: any, res: Response): void => {
  res.status(500).json({
    msg: err.message || 'Internal Server Error',
    details: err
  })
}

export const alreadyExist = (msg: string, res: Response): void => {
  res.status(400).json({
    msg: msg,
    details: []
  })
}

export const notFound = (msg: string, res: Response): void => {
  res.status(404).json({
    msg: msg,
    details: []
  })
}