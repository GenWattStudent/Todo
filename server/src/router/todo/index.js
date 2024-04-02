const router = require('express').Router()
const TodoRepo = require('../../repositories/todoRepo')
const TodoService = require('../../services/todoService')
const TabRepo = require('../../repositories/tabRepo')
const TodoController = require('../../controllers/todoController')

const todoRepo = new TodoRepo()
const tabRepo = new TabRepo()
const todoService = new TodoService(todoRepo, tabRepo)
const todoController = new TodoController(todoService)

router.get('/todo', (req, res) => todoController.getAll(req, res))

router.get('/todo/:id', (req, res) => todoController.getById(req, res))

router.post('/todo', (req, res) => todoController.create(req, res))

router.put('/todo/:id', (req, res) => todoController.update(req, res))

router.delete('/todo/:id', (req, res) => todoController.delete(req, res))

router.put('/todos/reorder', (req, res) => todoController.reorder(req, res))

router.put('/todo/reorder/:todoId', (req, res) => todoController.changeTodoTab(req, res))

module.exports = router
