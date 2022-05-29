import { Sequelize } from 'sequelize-typescript'
import * as models from '../models'

const connection = new Sequelize('postgres', 'postgres', '2004', {
  dialect: 'postgres',
  host: 'localhost',
  port: 1234,
  models: [models.default.Book, models.default.Category],
  // dialectOptions: {
  //   ssl: {
  //     require: true, 
  //     rejectUnauthorized: false 
  //   }
  // },
})

export default connection