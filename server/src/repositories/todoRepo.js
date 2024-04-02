const Todo = require('../models/Todo.js')

class TodoRepo {
  async createTodo(todo) {
    return await Todo.create(todo)
  }

  async getTodos() {
    return await Todo.find().sort({ order: 1 })
  }

  async getTodosByTabId(tabId) {
    return await Todo.find({ tabId }).sort({ order: 1 })
  }

  async getTodoById(id) {
    return await Todo.findById(id)
  }

  async updateTodo(id, todo) {
    return await Todo.findByIdAndUpdate(id, todo, { new: true })
  }

  async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id)
  }
}

module.exports = TodoRepo
