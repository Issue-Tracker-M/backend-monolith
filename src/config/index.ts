require('dotenv').config()

const port = process.env.PORT || 5000
const { DB_CONNECTION, NODE_ENV, DB_CONNECTION_TEST } = process.env
let mongoURI: any = ''

if (NODE_ENV === 'test') {
  mongoURI = DB_CONNECTION_TEST
} else {
  mongoURI = DB_CONNECTION
}

module.exports = {
  port,
  mongoURI,
}
