const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./src/router')

class Server {
  constructor() {
    this.app = express()
    this.port = 3000
    this.init()
  }

  async init() {
    try {
      await mongoose.connect('mongodb://localhost:27017/TodoList')
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
      this.app.use('/', route)
    })

    this.start()
  }

  start() {
    this.app.listen(this.port, () => console.log('Server is running on port ' + this.port))
  }
}

const app = new Server()
