import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { TodosResponse, TodoResponse } from '../types';
import api from '../utils/api';

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todosData, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<TodosResponse> => {
      const response = await api.get('/todos');
      return response.data;
    },
  });

  const todos = todosData?.todos || [];

  const createTodo = useMutation({
    mutationFn: async (todo: { title: string; description: string }): Promise<TodoResponse> => {
      const response = await api.post('/todos', todo);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodo = useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; description?: string }): Promise<TodoResponse> => {
      const response = await api.put(`/todos/${id}`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleTodo = useMutation({
    mutationFn: async (id: string): Promise<TodoResponse> => {
      const response = await api.patch(`/todos/${id}/toggle`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    createTodo: createTodo.mutate,
    updateTodo: updateTodo.mutate,
    toggleTodo: toggleTodo.mutate,
    deleteTodo: deleteTodo.mutate,
    isCreating: createTodo.isPending,
  };
};