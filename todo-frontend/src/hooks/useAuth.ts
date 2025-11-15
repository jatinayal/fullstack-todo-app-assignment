import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import api from '../utils/api';
import type { AuthResponse } from '../types';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const { login, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData): Promise<AuthResponse> => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData): Promise<AuthResponse> => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      logout();
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};