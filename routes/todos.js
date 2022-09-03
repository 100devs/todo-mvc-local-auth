const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/priority', ensureAuth, todosController.changePriority)

router.post('/addTags', ensureAuth, todosController.addTags)

router.post('/deleteTags', ensureAuth, todosController.deleteTags)

router.post('/createTodo',ensureAuth, todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo',ensureAuth, todosController.deleteTodo)

module.exports = router
