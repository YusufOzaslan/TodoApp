import { useState, useEffect } from 'react';
import { apiClient, handleApiError } from '../api';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoResponse {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

const mapTodo = (todo: TodoResponse): Todo => ({
  ...todo,
  createdAt: new Date(todo.createdAt)
});

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/todos/');
      const todoData = response.data.map(mapTodo);
      setTodos(todoData);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      setError(null);
      const response = await apiClient.post('/todos/', { 
        text, 
        completed: false 
      });
      
      const newTodo = mapTodo(response.data);
      setTodos(prev => [...prev, newTodo]);
      return true;
    } catch (err) {
      console.error('Error adding todo:', handleApiError(err));
      setError('Failed to add todo');
      return false;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await apiClient.delete(`/todos/${id}/`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting todo:', handleApiError(err));
      setError('Failed to delete todo');
      return false;
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      setError(null);
      const todo = todos.find(t => t.id === id);
      if (!todo) return false;
      
      const response = await apiClient.patch(`/todos/${id}/`, {
        completed: !todo.completed
      });
      
      const updatedTodo = mapTodo(response.data);
      
      setTodos(prev => prev.map(t => 
        t.id === id ? updatedTodo : t
      ));
      
      return true;
    } catch (err) {
      console.error('Error toggling todo:', handleApiError(err));
      setError('Failed to update todo');
      return false;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    deleteTodo,
    toggleTodo
  };
}; 