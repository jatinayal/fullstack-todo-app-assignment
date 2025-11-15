import React, { useState } from 'react';
import { Todo } from '../types';
import { useTodos } from '../hooks/useTodos';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description
  });

  const handleToggle = () => {
    toggleTodo(todo._id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todo._id);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editData.title.trim() && editData.description.trim()) {
      updateTodo({ 
        id: todo._id, 
        title: editData.title, 
        description: editData.description 
      });
      setIsEditModalOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      title: todo.title,
      description: todo.description
    });
    setIsEditModalOpen(false);
  };

  return (
    <>
      {/* Todo Item */}
      <div 
        className={`w-full p-5 rounded-2xl shadow-md flex justify-between items-start 
        transition-all bg-white border ${todo.completed ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
      >
        {/* LEFT SECTION */}
        <div className="flex-1">
          <h3 className={`text-xl font-semibold mb-1 ${todo.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
            {todo.title}
          </h3>

          <p className={`mb-3 ${todo.completed ? 'text-green-600 line-through' : 'text-gray-600'}`}>
            {todo.description}
          </p>

          <div className="flex items-center gap-3">
            <span className={`px-4 py-1 rounded-full text-sm font-medium 
              ${todo.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>

            <span className="text-gray-400 text-sm">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* BUTTONS ON RIGHT */}
        <div className="flex items-center gap-3">

          {/* TOGGLE COMPLETE / UNDO */}
          <button
            onClick={handleToggle}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow 
            transition-all hover:scale-110
            ${todo.completed ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {todo.completed ? (
              // ❌ CROSS ICON
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // ✅ CHECK ICON
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </button>

          {/* EDIT BUTTON */}
          <button
            onClick={handleEdit}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow hover:bg-blue-600 hover:scale-110 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
              strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" 
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={handleDelete}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600 hover:scale-110 transition-all"
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

          </button>

        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Todo</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter todo title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32 resize-none"
                  placeholder="Enter todo description"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!editData.title.trim() || !editData.description.trim()}
                className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;