import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useAuth } from '../hooks/useAuth';
import { useTodos } from '../hooks/useTodos';
import TodoList from '../components/TodoList';
import { Todo } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { todos, createTodo, isLoading, isCreating } = useTodos();
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.title.trim() && newTodo.description.trim()) {
      createTodo(newTodo);
      setNewTodo({ title: '', description: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Count todos for each filter
  const todoCounts = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef5ff] to-[#dce7ff] py-8 px-4">
  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/40">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">Let’s get productive today.</p>
        </div>

        <button
          onClick={() => logout()}
          className="px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600
                     transition-all shadow-md font-medium tracking-wide"
        >
          Logout
        </button>
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">

      {/* Create Todo */}
      <div className="lg:col-span-1">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/40 sticky top-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Todo</h3>

          <form onSubmit={handleCreateTodo} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="What needs to be done?"
                value={newTodo.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-xl bg-white focus:ring-2
                           focus:ring-indigo-400 focus:border-transparent shadow-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Add some details..."
                value={newTodo.description}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-xl bg-white h-32 resize-none
                           focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 
                         disabled:opacity-50 transition-all shadow-md font-medium"
            >
              {isCreating ? "Creating..." : "Add Todo"}
            </button>
          </form>
        </div>
      </div>

      {/* Todo List */}
      <div className="lg:col-span-2">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/40">

          {/* Title Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Your Todos</h3>
            </div>

            <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm">
              {filteredTodos.length} {filteredTodos.length === 1 ? "todo" : "todos"}
            </span>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
                filter === "all"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({todoCounts.all})
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`flex-1 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
                filter === "active"
                  ? "bg-yellow-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Uncompleted ({todoCounts.active})
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`flex-1 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
                filter === "completed"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Completed ({todoCounts.completed})
            </button>
          </div>

          {/* Todo List */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin h-12 w-12 rounded-full border-4 border-indigo-300 border-t-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-3">Loading todos...</p>
            </div>
          ) : (
            <TodoList todos={filteredTodos} />
          )}
        </div>
      </div>

    </div>
  </div>
</div>

  );
};

export default Dashboard;