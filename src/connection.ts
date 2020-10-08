// import mongoose from 'mongoose'
// const { mongoURI } = require('./config/index')

// const username = 'admin'
// const password = 'bqAYSekLTQeWlMtr'

// mongoose
//   .connect(
//     mongoURI,
// `mongodb+srv://${username}:${password}@cluster0.4rzgj.mongodb.net/<dbname>?retryWrites=true&w=majority`,
//   { useNewUrlParser: true, useUnifiedTopology: true }
// )
// .then((conn) =>
//   console.log(`MongoDB connection successful @: ${conn.connection.host}`)
// )
// .catch(console.error)

// const db = mongoose.connection

// db.on('error', (err) => {
//   console.error(err)
// })
// db.once('open', function () {
//   // we're connected!
//   console.log('Connected')
// })
