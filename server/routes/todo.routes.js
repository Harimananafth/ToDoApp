const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');


router.get('/', todoController.getAll);
router.post('/', todoController.create);
router.delete('/:id', todoController.delete);
router.patch('/:id', todoController.updateStatus);

module.exports = router;