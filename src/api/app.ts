import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
const { port, mongoURI } = require('../config/index')

const app = express()

app.set('port', port)
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

mongoose
  .connect(
    mongoURI,
    // `mongodb+srv://${username}:${password}@cluster0.4rzgj.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((conn) =>
    console.log(`MongoDB connection successful @: ${conn.connection.host}`)
  )
  .catch(console.error)

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'API is up 🚀' })
})

app.all('*', (req, res) => {
  res.status(404).json({ message: 'This URL can not be found' })
})

export default app
