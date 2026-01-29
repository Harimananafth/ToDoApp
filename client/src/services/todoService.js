import api from "../api/axios";

export const todoService = {
  getAll: async () => {
    const response = await api.get("/todos");
    return response.data;
  },

  create: async (todoData) => {
    const response = await api.post("/todos", todoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  update: async (id, status) => {
    const response = await api.patch(`/todos/${id}`, { done: status });
    return response.data;
  },
};
