const mongoose = require('mongoose')

const tabSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
})

const Tab = mongoose.model('Tab', tabSchema)

module.exports = Tab
