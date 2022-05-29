import express, { Application } from 'express';
import 'reflect-metadata'
import cors, { CorsOptions } from 'cors'
import routes from './routes'
import connection from './utils/db'

const app: Application = express();
app.use(cors(<CorsOptions>{
  origin: '*'
}))
app.use(express.json())
app.use(routes)

const PORT: number | string = process.env.PORT  || 3000;

const start = async (): Promise<void> => {
  try {
    await connection.sync({ force: false });
    app.listen(PORT, () => {
      console.log("Server started on port -", PORT);
    })
  }
  catch (err) {
    console.log(err);
    process.exit(1)
  }
}

void start()