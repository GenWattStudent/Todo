const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isDaily: {
    type: Boolean,
    required: true,
  },
  endDate: {
    type: Date,
  },
  tabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tab',
    required: true,
  },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
