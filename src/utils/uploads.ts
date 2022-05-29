import fs from 'fs';
import path from 'path'

export const remove = (filename: string): null | Error => {
  try {
    fs.unlinkSync(path.join(__dirname, '../uploads', filename))
    return null
  }
  catch (err) {return err as Error}
}