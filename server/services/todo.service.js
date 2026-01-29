const { Todo } = require("../models");

class TodoService {
  // Récupérer toutes les tâches
  async getAllTodos() {
    return await Todo.findAll();
  }

  // Créer une nouvelle tâche
  async createTodo(data) {
    if (!data.title) {
      throw new Error("Le titre est requis pour créer une tâche.");
    }
    return await Todo.create(data);
  }

  // Supprimer une tâche par son ID
  async deleteTodoById(id) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new Error("Tâche non trouvée.");
    await todo.destroy();
    return todo;
  }

//   Modifier le statut d'une tâche par son ID
async updateTodoStatus(id, doneValue) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new Error("Tâche non trouvée.");

    const finalStatus = typeof doneValue === 'object' ? doneValue.done : doneValue;

    todo.done = finalStatus;
    await todo.save();
    return todo;
}
}

module.exports = new TodoService();
