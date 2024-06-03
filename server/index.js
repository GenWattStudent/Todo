const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const routes = require('./src/router')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 5000
    this.init()
  }

  async init() {
    try {
      console.log('Connecting to database....' + process.env.MONGO_URI)
      await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'TodoList',
      })
      console.log('Connected to database')
    } catch (error) {
      console.log('Error connecting to database')
    }

    this.runMiddlewares()
  }

  runMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())

    routes.forEach((route) => {
      this.app.use("/api/", route)
    })

    this.app.get('/api/', (req, res) => {
      console.log('Hello World')
      res.send('Hello World')
    })

    this.start()
  }

  start() {
    this.app.listen(this.port, () => console.log('Server is running on port ' + this.port))
  }
}

const app = new Server()
