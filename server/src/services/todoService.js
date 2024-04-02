const mongoose = require('mongoose')
const Tab = require('../models/Tab.js')
const Todo = require('../models/Todo.js')

function createTodo(body, order) {
  return {
    title: body.title,
    description: body.description,
    tabId: body.tabId,
    order,
    category: body.category,
    isDaily: body.isDaily,
    endDate: body.endDate,
  }
}

class TodoService {
  constructor(todoRepository, tabRepository) {
    this.todoRepository = todoRepository
    this.tabRepository = tabRepository
  }

  async create(todo) {
    const tabTodos = await this.todoRepository.getTodosByTabId(todo.tabId)
    const order = tabTodos.length + 1

    const newTodo = createTodo(todo, order)
    const todoRes = await this.todoRepository.createTodo(newTodo)
    const tab = await this.tabRepository.getTabById(todoRes.tabId)

    tab.items.push(todoRes)

    await this.tabRepository.updateTab(tab.id, tab)
    return todoRes
  }

  async getAll() {
    return await this.todoRepository.getTodos()
  }

  async getById(id) {
    return await this.todoRepository.getTodoById(id)
  }

  async update(id, todo) {
    await this.todoRepository.updateTodo(id, todo)
    return await this.todoRepository.getTodoById(id)
  }

  async delete(id) {
    await Tab.updateMany({ items: id }, { $pull: { items: id } })
    return await this.todoRepository.deleteTodo(id)
  }

  async reorder(body) {
    body.todos.forEach(async (todo, index) => {
      await this.todoRepository.updateTodo(todo._id, { order: index + 1 })
    })
    const reorderData = await this.todoRepository.getTodosByTabId(body.tabId)

    return { tabId: body.tabId, todos: reorderData }
  }

  async changeTodoTab(todoId, body) {
    const { order, tabId } = body
    const todo = await this.todoRepository.getTodoById(todoId)
    const oldTab = await this.tabRepository.getTabById(todo.tabId)
    const newTab = await this.tabRepository.getTabById(tabId)

    // remove todo from old tab
    await Tab.updateOne({ _id: oldTab._id }, { $pull: { items: todo._id } })

    // add todo to new tab
    newTab.items.push(todo)

    // update new tab
    await this.tabRepository.updateTab(newTab._id, newTab)

    // put todo in new tab on right order position
    todo.tabId = new mongoose.Types.ObjectId(tabId)
    todo.order = order

    await Todo.updateMany({ tabId: new mongoose.Types.ObjectId(tabId), order: { $gte: order } }, { $inc: { order: 1 } })
    await this.todoRepository.updateTodo(todo._id, todo)

    return await this.tabRepository.getTabs()
  }
}

module.exports = TodoService
