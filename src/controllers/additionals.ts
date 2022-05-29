import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { notFound, serverError } from "../utils/errors"
import { getFileStream } from "../s3"

export const getUploadedFile = 
async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename)
    const isExist = fs.existsSync(filePath)
    if (!isExist) return notFound(`File '${filename}' not found`, res)
    // if (req.query.stream !== undefined) {
    //   res.setHeader('Content-Type', 'application/octet-stream');
    //   return getFileStream(filePath).pipe(res)
    // }
    const awsFile: any = await getFileStream(filename)
    res.send(awsFile.Body)
  }
  catch (err) {serverError(err, res)}
}