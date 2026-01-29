const todoService = require("../services/todo.service");

class TodoController {
  async getAll(req, res) {
    try {
      const todos = await todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const newTodo = await todoService.createTodo(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedTodo = await todoService.deleteTodoById(req.params.id);
      res.status(200).json(deletedTodo);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { done } = req.body; 

      const updatedTodo = await todoService.updateTodoStatus(id, done);
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error("ERREUR SERVEUR:", error); 
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TodoController();
