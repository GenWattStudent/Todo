class TodoController {
  constructor(todoService) {
    this.todoService = todoService
  }

  async create(req, res) {
    try {
      const todo = await this.todoService.create(req.body)
      res.status(201).json(todo)
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  }

  async getAll(req, res) {
    try {
      const todos = await this.todoService.getAll()
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async getById(req, res) {
    try {
      const todo = await this.todoService.getById(req.params.id)
      res.status(200).json(todo)
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  }

  async update(req, res) {
    try {
      const todo = await this.todoService.update(req.params.id, req.body.todo)
      res.status(200).json(todo)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  async delete(req, res) {
    try {
      const todo = await this.todoService.delete(req.params.id)
      res.status(200).json(todo)
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  }

  async reorder(req, res) {
    try {
      const orderData = await this.todoService.reorder(req.body)
      res.status(200).json(orderData)
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  }

  async changeTodoTab(req, res) {
    try {
      const todo = await this.todoService.changeTodoTab(req.params.todoId, req.body)
      res.status(200).json(todo)
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  }
}

module.exports = TodoController
