export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface TodoResponse {
  message: string;
  todo: Todo;
}

export interface TodosResponse {
  count: number;
  todos: Todo[];
}