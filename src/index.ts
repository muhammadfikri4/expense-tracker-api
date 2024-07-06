import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 8000
dotenv.config()
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json());
app.use(routes)

app.listen(port, () => {
    console.log(`Run at port ${port}🚀`)
})

export default app