import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import appswagger from './swagger'

const app = express()
const PORT: string | number = process.env.PORT || 3000
const MONGO_URL: string = process.env.MONGO_URL || 'mongodb+srv://Samandar:Samandar0321@cluster0.v86wyyu.mongodb.net/?retryWrites=true&w=majority'
app.use(cors({
  credentials: true
}))
app.use(compression())
app.use(cookieParser())

app.use(bodyParser.json())
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB')
})
mongoose.connection.on('error', (error: Error) => console.error(error))

app.use('/', router())
app.use('/api-docs/', appswagger)
