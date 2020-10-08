import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
const { port } = require('../config/index')

const app = express()

app.set('port', port)
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'API is up 🚀' })
})

app.all('*', (req, res) => {
  res.status(404).json({ message: 'This URL can not be found' })
})

export default app
