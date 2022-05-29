import { Sequelize } from 'sequelize-typescript'
import * as models from '../models'

const connection = new Sequelize('d172m3vvm1p2i4', 'mkenisucqnunnd', 'f85a26d92439c0edb43c84cd70aae4e4c74fa7e1197301048a5f922154a083c9', {
  dialect: 'postgres',
  host: 'ec2-44-196-174-238.compute-1.amazonaws.com',
  port: 5432,
  models: [models.default.Book, models.default.Category],
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  },
})

export default connection