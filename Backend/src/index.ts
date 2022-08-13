import Express from 'express'
import routes from './routes'
import path from 'path'
import cors from 'cors'

import 'dotenv/config'

const app = Express()

declare global {
    namespace Express {
      interface Request {
        userId: any
      }
    }
  }

app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))
app.use('/files', Express.static(path.resolve(__dirname, 'database', 'uploads')))
app.use(routes)

app.listen("2000", ()=>{
    console.log('esta rodando')
})